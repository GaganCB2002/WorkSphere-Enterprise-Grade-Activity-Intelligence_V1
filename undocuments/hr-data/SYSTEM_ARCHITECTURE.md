# System Architecture Documentation

> [!NOTE]
> This document details the technology stack and macro-architecture of the WorkSphere Enterprise Monitoring System.

## 1. High-Level System Architecture

The architecture utilizes a loosely coupled, highly cohesive microservices design pattern. Each domain is isolated, allowing independent scaling and deployment.

```mermaid
graph TD
    subgraph frontend [Frontend Client Apps]
        hrDash[Next.js HR Dashboard]
        empApp[React Employee Portal]
    end
    
    subgraph edge [Edge Network]
        apiGw[Kong API Gateway]
        wss[WebSocket Cluster]
    end
    
    subgraph backend [Backend Microservices]
        nodeApp[Node.js/Express APIs]
        trackSvc[Tracking Engine]
        aiSvc[AI Analytics Engine]
    end
    
    subgraph data [Data Persistence]
        pgSql[(PostgreSQL HR DB)]
        redis[(Redis Cache)]
        kafka{Kafka Event Stream}
    end
    
    hrDash -->|REST| apiGw
    empApp -->|REST| apiGw
    empApp -->|WebSocket| wss
    
    apiGw -->|Route| nodeApp
    apiGw -->|Route| trackSvc
    wss -->|Publish| kafka
    
    nodeApp -->|Read/Write| pgSql
    nodeApp -->|Cache| redis
    trackSvc -->|Publish| kafka
    
    kafka -->|Consume| aiSvc
    aiSvc -->|Write Metrics| pgSql
```

## 2. Technology Stack Breakdown

### Frontend Tier
- **React Frontend**: Utilized for the Employee Desktop application and lightweight web portal. Focused on capturing UI events and providing self-service HR tools.
- **Next.js Dashboard**: Powers the HR and Super Admin portals. Server-Side Rendering (SSR) ensures fast initial load times for heavy data tables, improving SEO and perceived performance.

### API & Gateway Tier
- **API Gateway**: Handles SSL termination, rate limiting, and JWT validation. Routes traffic to appropriate microservices based on URL paths (`/api/v1/hr`, `/api/v1/track`).
- **WebSocket**: Maintains persistent connections with the Employee App for live telemetry pushing, and with the HR Dashboard for real-time metric updates.

### Backend Microservices
- **Node.js & Express**: The core API layer handling business logic for HR management, leave requests, and tenant configuration. Chosen for its non-blocking I/O, perfect for high-throughput API requests.
- **Kafka / RabbitMQ**: The backbone of the event-driven architecture. Telemetry data, audit logs, and async tasks are published to topics, decoupling producers (like the Tracking Service) from consumers (like the Analytics Engine).

### Persistence & Data Layer
- **PostgreSQL**: The primary relational database handling ACID-compliant operations. Stores Employee profiles, Payroll data, Organization hierarchies, and Tenant configurations.
- **Redis**: Serves as a distributed cache for frequently accessed data (e.g., RBAC policies) and manages distributed WebSocket sessions.

### Infrastructure & Orchestration
- **Docker**: All services are containerized, ensuring consistency across Dev, Staging, and Production environments.
- **Kubernetes**: Orchestrates the Docker containers. Manages auto-scaling based on CPU/Memory usage, self-healing (restarting failed pods), and rolling deployments to ensure zero-downtime updates.
