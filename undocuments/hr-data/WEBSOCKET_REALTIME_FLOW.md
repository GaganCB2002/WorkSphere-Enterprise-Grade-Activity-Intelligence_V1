# WebSocket Real-Time Push Flow

> [!TIP]
> To achieve a "live" HR dashboard, the system utilizes WebSockets backed by Redis Pub/Sub to instantly push monitoring updates to clients.

## 1. Real-Time Push Architecture

```mermaid
graph TD
    subgraph Data_Generation [Data Generators]
        AI[AI Engine - Anomaly Detetion]
        TRACK[Tracking Service - Presence Update]
        CHAT[Internal Chat Service]
    end

    subgraph Messaging_Layer [Pub/Sub Broker]
        REDIS[(Redis Pub/Sub)]
    end

    subgraph Edge_Servers [WebSocket Cluster]
        WS1[Node.js WebSocket Node 1]
        WS2[Node.js WebSocket Node 2]
    end

    subgraph Connected_Clients [Clients]
        HR1[HR Manager A - Dashboard]
        HR2[HR Manager B - Dashboard]
    end

    %% Publish flows
    AI -->|Publish 'alert:org1'| REDIS
    TRACK -->|Publish 'presence:org1'| REDIS
    CHAT -->|Publish 'chat:userX'| REDIS

    %% Subscribe flows
    REDIS -.->|Broadcast| WS1
    REDIS -.->|Broadcast| WS2

    %% Push to client
    WS1 -->|Push JSON 'Alert'| HR1
    WS2 -->|Push JSON 'Presence'| HR2
```

## 2. How WebSockets Push Live Updates

1. **Stateful Connections**: Unlike HTTP, a WebSocket connection remains open. The client (HR Dashboard) holds a persistent TCP connection to one of the WebSocket Nodes (`WS1` or `WS2`).
2. **Distributed Architecture**: Because WebSockets are stateful, a load balancer cannot easily move a connection. If `HR1` is connected to `WS1`, only `WS1` can push data to `HR1`.
3. **The Pub/Sub Solution**: To solve the distributed problem, all WebSocket Nodes subscribe to the central Redis Pub/Sub cluster.
4. **The Push Event**: 
   - The AI Engine detects an employee using a restricted app. It publishes an event to Redis: `PUBLISH "org:123:alerts" "{"type": "APP_VIOLATION", ...}"`.
   - Redis broadcasts this to all connected WebSocket nodes.
   - Every node checks its internal memory mapping: "Do I have any active connections subscribed to `org:123:alerts`?"
   - `WS1` sees `HR1` is connected and authorized. It pushes the JSON payload through the open socket.
   - The React UI receives the message and triggers a Redux action to display an alert toast.

## 3. Handling Disconnects

- **Ping/Pong**: The server sends a Ping every 30 seconds. If the client fails to Pong, the connection is dropped to save resources.
- **Auto-Reconnect**: The React client uses libraries like `Socket.io` or ReconnectingWebsocket to automatically attempt reconnection with exponential backoff if the network drops.
- **Missed Messages**: WebSockets are fire-and-forget. If HR loses connection, they might miss an alert. Upon reconnection, the UI performs a standard REST API fetch to "sync up" any missed historical data, then resumes listening for live events.
