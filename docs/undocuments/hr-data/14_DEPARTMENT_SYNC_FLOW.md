# Department Synchronization Flow

> [!IMPORTANT]
> A decentralized system must handle network partitions gracefully. This document details the local queuing mechanism that ensures zero data loss if a Department Node loses connection to the HR Aggregator.

## 1. Resilient Synchronization Pipeline

```mermaid
sequenceDiagram
    participant Agent as Tracking Agent
    participant DeptAPI as Dept API
    participant LocalDB as Local PostgreSQL (Outbox)
    participant SyncWorker as Local Sync Worker
    participant EnterpriseQ as Enterprise Kafka
    participant Aggr as HR Aggregator

    Agent->>DeptAPI: Submit Analytics Payload
    DeptAPI->>LocalDB: Transaction Start
    DeptAPI->>LocalDB: Upsert Analytics Table
    DeptAPI->>LocalDB: Insert into `outbox_events`
    DeptAPI->>LocalDB: Transaction Commit
    DeptAPI-->>Agent: 200 OK

    loop Every 1 Second
        SyncWorker->>LocalDB: SELECT * FROM `outbox_events` WHERE status='PENDING'
        LocalDB-->>SyncWorker: List of events
        
        SyncWorker->>EnterpriseQ: Publish Batch to Kafka
        
        alt Network Success
            EnterpriseQ-->>SyncWorker: ACK
            SyncWorker->>LocalDB: UPDATE `outbox_events` SET status='PROCESSED'
        else Network Partition (Offline)
            EnterpriseQ--xSyncWorker: Timeout / Connection Refused
            SyncWorker->>SyncWorker: Exponential Backoff. Data safely waits in LocalDB.
        end
    end
    
    EnterpriseQ->>Aggr: Consume synced events when available
```

## 2. The Transactional Outbox Pattern

The **Transactional Outbox Pattern** is critical for this architecture. 

If the Department API updated its local analytics table and then immediately tried to publish to Kafka, a network failure halfway through would result in the local DB being updated, but the HR Aggregator never receiving the update.

By wrapping both the local update and the creation of an "Outbox Event" in a single ACID-compliant PostgreSQL database transaction, we guarantee that if the data is saved locally, it *will* eventually be synced to the HR Aggregator. The background `Sync Worker` acts as the reliable delivery mechanism.
