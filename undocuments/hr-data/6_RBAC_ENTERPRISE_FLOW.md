# Enterprise Role-Based Access Control (RBAC)

> [!CAUTION]
> In a decentralized topology, RBAC must enforce strict department-level isolation while allowing the HR Aggregator to provide a unified cross-department view.

## 1. Decentralized Access Isolation Flow

```mermaid
graph TD
    subgraph Roles
        SA[Super Admin]
        HR[Enterprise HR]
        MGR_ENG[Engineering Manager]
        MGR_SALES[Sales Manager]
        EMP[Employee]
    end

    subgraph API_Gateways
        AGGR_GW[HR Aggregator Gateway]
        ENG_GW[Engineering Node Gateway]
        SALES_GW[Sales Node Gateway]
    end

    subgraph Data_Stores
        WH[(Enterprise Analytics Warehouse)]
        DB_ENG[(Engineering DB)]
        DB_SALES[(Sales DB)]
    end

    %% Routing
    SA -->|Full Access| AGGR_GW
    HR -->|Full Access| AGGR_GW
    
    MGR_ENG -->|Restricted| ENG_GW
    MGR_SALES -->|Restricted| SALES_GW
    EMP -->|Self Only| ENG_GW

    %% Isolation Fencing
    AGGR_GW -->|Read All| WH
    ENG_GW -->|Read/Write Local| DB_ENG
    SALES_GW -->|Read/Write Local| DB_SALES
    
    %% Denied access examples (Implicitly restricted by network/token)
    MGR_ENG -.-x|Blocked| SALES_GW
    MGR_SALES -.-x|Blocked| ENG_GW
```

## 2. Role Capabilities

1. **Super Admin**: Connects to the HR Aggregator. Can manage system topology, add new Department Nodes, configure Kafka cluster keys, and view global audit logs.
2. **HR Manager**: Connects to the HR Aggregator. Has access to all employee analytics across all departments, cross-department productivity comparisons, and global attendance registers.
3. **Department Manager / Team Lead**: Connects directly to their specific **Department Node** dashboard. They cannot query the HR Aggregator. An Engineering Lead only sees Engineering data hitting `DB_ENG`.
4. **Employee**: Connects to their Department Node to view self-analytics and timesheets. RLS (Row Level Security) prevents them from viewing peer data within the same local DB.
