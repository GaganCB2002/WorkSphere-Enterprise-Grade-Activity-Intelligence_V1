# Realtime WebSocket Flow

> [!TIP]
> This outlines the decentralized WebSocket architecture, showing how events jump from the employee's machine, through the department node, to the global HR dashboard seamlessly.

## 1. Decentralized Realtime Data Relay

```mermaid
sequenceDiagram
    autonumber
    participant Agent as Eng Employee Agent
    participant NodeWS as Eng Dept WebSocket
    participant NodeK as Eng Kafka Producer
    participant AggrWS as HR Aggregator WSS
    participant HR as HR Dashboard

    Agent->>NodeWS: Emit { type: "IDLE_START", user: "E123" }
    
    %% Department Level
    NodeWS->>NodeWS: Update local Redis presence state
    NodeWS->>NodeK: Publish "IDLE_EVENT" to Kafka Topic 'dept.eng.live'
    
    %% Relay to Core
    NodeK->>AggrWS: Kafka Consumer pulls event
    
    %% Core Level
    AggrWS->>AggrWS: Map 'E123' to Global Org Chart
    AggrWS->>AggrWS: Check connected HR sockets authorized for Eng Dept
    
    AggrWS--)HR: Push { type: "DEPT_UPDATE", dept: "Engineering", user: "E123", status: "Idle" }
    
    HR->>HR: UI Redux State Update (Yellow Dot)
```

## 2. WebSocket Responsibilities

### Department Level (Edge WebSockets)
- Handles the massive ingress of ping/pong traffic from thousands of tracking agents.
- Operates primarily to receive data.
- If the global Aggregator connection drops, the edge WebSocket server continues updating the local Department Redis Cache so department-level real-time views still function.

### HR Aggregator Level (Core WebSockets)
- Does **not** communicate directly with employee tracking agents.
- Subscribes to the Kafka event streams from all Department Nodes.
- Manages connections only from HR Managers and Super Admins.
- Broadcasts high-level events like "Department X Productivity dropping" or global anomaly alerts.
