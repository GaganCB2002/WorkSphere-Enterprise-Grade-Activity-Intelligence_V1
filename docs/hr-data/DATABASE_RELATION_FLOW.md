# Database Relation Flow & Architecture

> [!WARNING]
> Schema definitions and database relationships are crucial for data integrity. The system strictly adheres to foreign-key constraints across the primary PostgreSQL instances.

## 1. Core Entity Relationship Diagram (ERD)

The enterprise architecture separates relational data from high-volume telemetry data.

```mermaid
erDiagram
    TENANT ||--o{ ORGANIZATION : owns
    ORGANIZATION ||--o{ USER : employs
    USER ||--o{ ROLE : assigned
    USER ||--o{ SESSION : creates
    
    USER ||--o{ LEAVE_REQUEST : submits
    USER ||--o{ TASK : assigned_to
    
    ORGANIZATION ||--o{ DEPARTMENT : contains
    DEPARTMENT ||--o{ USER : "assigned to"

    %% Telemetry link
    USER ||--o{ TRACKING_LOG : generates

    TENANT {
        uuid id PK
        string name
        string tier
    }
    ORGANIZATION {
        uuid id PK
        uuid tenant_id FK
        string name
    }
    USER {
        uuid id PK
        uuid org_id FK
        uuid role_id FK
        string email
        string password_hash
    }
    LEAVE_REQUEST {
        uuid id PK
        uuid user_id FK
        string type
        string status
        date dates
    }
    TRACKING_LOG {
        uuid id PK
        uuid user_id FK
        timestamp time
        string active_window
        int idle_seconds
    }
```

## 2. Polyglot Persistence Architecture

1. **PostgreSQL (Primary DB)**
   - **Role**: Source of truth for relational state.
   - **Data**: Users, Roles, Permissions, Leave, Payroll, Hierarchy.
   - **Integrity**: Enforces ACID properties and strict referential integrity.

2. **Time-Series Database (TSDB - e.g., TimescaleDB or InfluxDB)**
   - **Role**: Handling massive write volumes of telemetry.
   - **Data**: `TRACKING_LOG` containing active window, idle time, and screenshot metadata.
   - **Linkage**: Correlated to the primary DB via the `user_id` uuid. It does not enforce foreign keys to maintain ultra-fast write speeds.

3. **Redis (Cache & State DB)**
   - **Role**: Ephemeral storage.
   - **Data**: User Sessions (`SESSION`), JWT blacklists, WebSocket connection mappings, and cached RBAC policies.
   - **Persistence**: AOF (Append Only File) configured for recovery, but data is treated as reconstructible.

## 3. Data Synchronization Flow

- **Write Operations**: Standard writes go directly to PostgreSQL. Telemetry goes to TSDB.
- **Cache Invalidation**: If an HR Manager updates an Employee's Role in PostgreSQL, a CDC (Change Data Capture) event triggers an invalidation of that user's session cache in Redis, forcing a re-fetch of permissions on their next request.
