# WorkSphere Enterprise Activity Intelligence System

> [!IMPORTANT]
> **Confidential & Proprietary**
> This documentation package contains the enterprise architectural blueprints for the WorkSphere Enterprise Monitoring System. Distribution is restricted to authorized personnel.

## 1. Project Overview
The WorkSphere Enterprise Monitoring System is a highly scalable, distributed HR Data and Activity Intelligence Hub. Designed with a microservices-oriented architecture, it handles thousands of concurrent telemetry streams, silent employee activity monitoring, AI-based leave and performance analytics, and real-time dashboarding for enterprise HR and executive roles.

## 2. Master Architecture Flow

```mermaid
graph TD
    subgraph Client_Layer [Client & Edge Layer]
        EMP_APP[Employee Native App / Desktop Agent]
        HR_DASH[HR Manager Dashboard Next.js]
        ADMIN_DASH[Super Admin Portal Next.js]
    end

    subgraph Edge_Gateway [API Gateway & Load Balancer]
        API_GW[Enterprise API Gateway NGINX/Kong]
        WSS[WebSocket Real-Time Server]
    end

    subgraph Services_Layer [Microservices Backend]
        TRACK_SVC[Telemetry & Tracking Service]
        HR_SVC[Core HR Data Service]
        AUTH_SVC[IAM & Auth Service]
        ANALYTICS_SVC[AI & Analytics Engine]
    end

    subgraph Event_Bus [Event Streaming]
        KAFKA{Kafka / RabbitMQ Event Bus}
    end

    subgraph Persistence_Layer [Database & Cache]
        PG[(PostgreSQL Primary DB)]
        TSDB[(Time-Series DB Monitoring Data)]
        REDIS[(Redis Cache / Sessions)]
    end

    %% Edge Connections
    EMP_APP -->|REST / gRPC| API_GW
    EMP_APP -->|Live Telemetry| WSS
    HR_DASH -->|REST / GraphQL| API_GW
    ADMIN_DASH -->|REST| API_GW

    %% Internal Routing
    API_GW --> AUTH_SVC
    API_GW --> TRACK_SVC
    API_GW --> HR_SVC
    WSS --> KAFKA

    %% Service to Bus
    TRACK_SVC -->|Raw Events| KAFKA
    HR_SVC -->|HR Events| KAFKA
    AUTH_SVC -->|Audit Logs| KAFKA

    %% Bus to Consumers
    KAFKA -->|Consume Raw Data| ANALYTICS_SVC
    KAFKA -->|Live Sync| HR_SVC

    %% DB Connections
    TRACK_SVC --> TSDB
    HR_SVC --> PG
    AUTH_SVC --> PG
    ANALYTICS_SVC --> PG
    ANALYTICS_SVC --> TSDB

    %% Caching
    API_GW -.-> REDIS
    HR_SVC -.-> REDIS
```

## 3. Enterprise Architecture
The architecture is built on a multi-tier, event-driven pattern designed for resilience and low latency:
- **Frontend**: React and Next.js applications for highly responsive, SSR-capable dashboards.
- **Backend APIs**: Node.js and Express services providing RESTful endpoints, alongside gRPC for high-speed inter-service communication.
- **Real-Time Layer**: WebSockets powered by Redis Pub/Sub for immediate data propagation.
- **Data Persistence**: PostgreSQL for relational ACID transactions, Redis for session state, and a Time-Series Database (TSDB) for telemetry data.

## 4. Folder Structure Overview
The `hr-data` documentation repository is structured as follows:
- `/diagrams`: Mermaid sequence, state, and component diagram source files.
- `/flows`: Detailed flow documentation (Employee, HR, Super Admin).
- `/architecture`: Infrastructure and deployment topology documents.
- `/schemas`: Database ERDs and API schema definitions.
- `/images`: Output placeholder directory for rendered architectural graphics.
- `/docs`: Auxiliary reference material.

## 5. Security & Deployment Architecture
- **Security**: JWT-based stateless authentication, strict Role-Based Access Control (RBAC), and tenant-isolation at the schema level.
- **Deployment**: Fully containerized using Docker, orchestrated via Kubernetes across multi-AZ clusters for high availability.

## 6. Real-Time Monitoring & AI Analytics
The system employs an AI Monitoring Engine that silently ingests tracking data via the Event Bus, calculates productivity metrics, identifies anomalies, and pushes actionable insights to the HR Dashboard via WebSockets.

---
*For detailed breakdowns of specific domains, please refer to the specialized documentation files within this package.*
