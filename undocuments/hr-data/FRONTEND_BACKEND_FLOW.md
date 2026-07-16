# Frontend to Backend Communication Flow

> [!TIP]
> This document explains the API request lifecycle and real-time update flow from the Next.js/React frontend to the backend microservices.

## 1. API Request Lifecycle

```mermaid
sequenceDiagram
    participant UI as Next.js / React Client
    participant API as API Gateway (Nginx/Kong)
    participant Auth as Auth Middleware
    participant Service as Target Microservice
    participant DB as PostgreSQL

    UI->>API: 1. HTTP GET /api/v1/hr/employees (with JWT in Auth Header)
    API->>Auth: 2. Validate JWT & Extract User Info
    
    alt Invalid Token
        Auth--xAPI: 401 Unauthorized
        API--xUI: 401 Unauthorized (Trigger redirect to Login)
    else Valid Token
        Auth-->>API: Append `x-user-id` & `x-roles` to Headers
        API->>Service: 3. Route to HR Service based on `/hr` path
        
        Service->>Service: 4. Role/RBAC Check (Does user have 'hr_manager' role?)
        
        alt Unauthorized Role
            Service--xAPI: 403 Forbidden
            API--xUI: 403 Forbidden
        else Authorized Role
            Service->>DB: 5. Execute Query (SELECT * FROM employees WHERE org_id = ?)
            DB-->>Service: Result Set
            Service-->>API: 200 OK + JSON Payload
            API-->>UI: 200 OK + JSON Payload
        end
    end
    UI->>UI: 6. Update Local State (Redux/Zustand) & Re-render Components
```

## 2. Real-Time Update Lifecycle (WebSockets)

For live monitoring, polling is inefficient. We use WebSockets for bi-directional communication.

1. **Connection Initiation**: Upon successful login, the React client initiates a `wss://` connection to the Gateway.
2. **Upgrade**: The Gateway upgrades the HTTP connection to WebSocket and passes it to the WebSocket Cluster.
3. **Authentication**: The first message sent by the client must be an authentication payload (`{ "type": "AUTH", "token": "jwt_here" }`).
4. **Subscription**: Once authenticated, the WebSocket server subscribes the user to specific Redis Pub/Sub channels based on their role and organization (e.g., `channel:org:123:alerts`).
5. **Pushing Data**: When backend services (like the AI Engine) detect an anomaly, they publish to Redis. The WebSocket server receives this and pushes a JSON event (`{ "type": "ANOMALY_DETECTED", "data": {...} }`) down to the specific connected client.
6. **Frontend Handling**: The React application listens to these socket events and dispatches actions to update the UI without requiring a page refresh.
