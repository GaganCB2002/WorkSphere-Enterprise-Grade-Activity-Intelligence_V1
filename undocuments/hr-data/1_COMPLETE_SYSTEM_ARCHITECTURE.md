# Complete Decentralized System Architecture

> [!IMPORTANT]
> This diagram illustrates the enterprise-wide transition from a centralized monitoring monolith to a highly scalable, decentralized hub-and-spoke architecture.

## 1. Enterprise Hub-and-Spoke Flow

Instead of thousands of employees hammering a single tracking server, traffic is distributed to isolated Department Nodes. The HR Aggregator acts as the intelligence hub.

```mermaid
graph TD
    %% Edge Devices
    subgraph Edge [Employee Devices]
        E1[Eng Employee]
        E2[Sales Employee]
        E3[Finance Employee]
    end

    %% Decentralized Nodes (The Spokes)
    subgraph Dept_Nodes [Decentralized Department Nodes]
        NODE_ENG[Engineering Node :8081]
        NODE_SALES[Sales Node :8082]
        NODE_FIN[Finance Node :8083]
        
        DB_ENG[(Eng DB & Cache)]
        DB_SALES[(Sales DB & Cache)]
        DB_FIN[(Finance DB & Cache)]
        
        NODE_ENG <--> DB_ENG
        NODE_SALES <--> DB_SALES
        NODE_FIN <--> DB_FIN
    end

    %% Event Bus
    subgraph Sync [Enterprise Event Bus]
        KAFKA{Kafka / Event Queue}
    end

    %% Centralized Hub
    subgraph Core [HR Aggregator Hub]
        AGGR[HR Aggregator Service]
        WH[(Analytics Warehouse)]
        RT[Realtime Engine]
        
        AGGR <--> WH
        AGGR --> RT
    end

    %% Outputs
    subgraph Dashboards [Enterprise Dashboards]
        HR_DASH[HR Dashboard]
        SA_DASH[Super Admin Dashboard]
    end

    %% Connections
    E1 -->|Live Telemetry| NODE_ENG
    E2 -->|Live Telemetry| NODE_SALES
    E3 -->|Live Telemetry| NODE_FIN

    NODE_ENG -->|Push Analytics| KAFKA
    NODE_SALES -->|Push Analytics| KAFKA
    NODE_FIN -->|Push Analytics| KAFKA

    KAFKA -->|Consume & Merge| AGGR
    RT -->|WebSocket Push| HR_DASH
    RT -->|WebSocket Push| SA_DASH
```

## 2. Core Architectural Pillars

1. **Decentralized Tracking**: Every department manages its own tracking ingress and data processing. Engineering traffic never impacts Sales traffic.
2. **Department-Level Autonomy**: If the HR Aggregator goes offline, department nodes continue to monitor, process, and buffer data locally using their independent databases.
3. **Cross-Department Aggregation**: The HR Aggregator subscribes to the Kafka streams from all departments, merging the data into the unified Analytics Warehouse.
4. **Fault Isolation**: A spike in traffic (e.g., thousands of support staff clocking in simultaneously) is isolated to the `Support Node` and its dedicated DB.
