# Department Node Architecture

> [!NOTE]
> This document details the internal architecture of a single Department Node (e.g., the Engineering Department). Every department runs an identical, isolated instance of this stack.

## 1. Node Topology

A Department Node is a self-contained micro-ecosystem capable of ingesting, analyzing, and storing telemetry without external dependencies.

```mermaid
graph TD
    subgraph External
        AGENT[Employee Monitoring Agent]
        LEAD[Team Lead Dashboard]
    end

    subgraph Node_Ingress [API & Gateway]
        API[Department API Gateway]
        WSS[Local WebSocket Server]
    end

    subgraph Node_Services [Department Microservices]
        TRACK[Tracking Service]
        ATTEND[Attendance Service]
        PROD[Productivity Engine]
        SCREEN[Screenshot Storage Service]
    end

    subgraph Node_Data [Local Persistence]
        PG[(Local PostgreSQL)]
        REDIS[(Local Redis Cache)]
        LOGS[(Local Logs / S3)]
    end

    subgraph Node_Egress [Sync Layer]
        QUEUE[Local Queue Processor]
        KAFKA{Enterprise Event Stream}
    end

    %% Routing
    AGENT -->|Live Telemetry| WSS
    AGENT -->|REST Pings| API
    LEAD -->|Fetch Stats| API

    API --> TRACK
    API --> ATTEND
    API --> SCREEN
    
    WSS --> TRACK

    %% Service to DB
    TRACK --> PG
    ATTEND --> PG
    PROD --> PG
    SCREEN --> LOGS
    
    %% Processing
    TRACK --> PROD
    PROD -.-> REDIS

    %% Egress
    TRACK --> QUEUE
    ATTEND --> QUEUE
    PROD --> QUEUE
    SCREEN --> QUEUE

    QUEUE -->|Push to Core| KAFKA
```

## 2. Component Responsibilities

1. **Tracking Service**: Ingests raw telemetry (keyboard, mouse, active window). High-throughput, low-latency API.
2. **Attendance Service**: Calculates clock-in, clock-out, and shift timings. Handles late login flags.
3. **Productivity Engine**: Processes the raw tracking data locally to calculate focus scores and map application usage (e.g., `vscode.exe` = Productive for Engineering).
4. **Screenshot Storage**: Saves encrypted screenshot captures locally or to a department-specific S3 bucket to ensure data privacy.
5. **Local Queue Processor**: Batches the processed analytics (not raw keystrokes) and securely publishes them to the Enterprise Kafka cluster for the HR Aggregator to consume.
6. **Local Database (PostgreSQL)**: Stores all granular data for that specific department, maintaining strict data isolation.
