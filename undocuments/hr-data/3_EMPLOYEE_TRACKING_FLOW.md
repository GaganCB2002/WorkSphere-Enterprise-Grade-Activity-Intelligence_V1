# Employee Tracking Flow

> [!TIP]
> This outlines the end-to-end journey of telemetry data originating from the employee's device up to the global HR Dashboard.

## 1. Tracking Data Journey

The tracking agent must be incredibly lightweight. It captures 12 specific data points and routes them through the decentralized pipeline.

```mermaid
sequenceDiagram
    autonumber
    actor Employee
    participant Agent as Monitoring Agent (Electron/Rust)
    participant Node as Department Tracking Node
    participant DeptAI as Department Analytics
    participant Queue as Event System
    participant Aggr as HR Aggregator
    participant HR as HR Dashboard

    Employee->>Agent: Works on device (Types, Clicks, Apps)
    
    loop Every 10 Seconds
        Agent->>Agent: Capture active window, idle time, screenshots
        Agent->>Node: POST /api/v1/telemetry (Encrypted)
        
        Node->>Node: Buffer in Local DB
        Node-->>Agent: 202 Accepted
    end

    loop Every 1 Minute
        Node->>DeptAI: Batch process raw telemetry
        DeptAI->>DeptAI: Calculate Productivity & Focus Score
        DeptAI->>Queue: Publish Processed Analytics Event
    end
    
    Queue->>Aggr: Consume Analytics Event
    Aggr->>Aggr: Merge with Enterprise Warehouse
    
    loop Realtime
        Aggr--)HR: Push Live Update via WebSocket
        HR->>HR: Update UI (Department Heatmaps, Timelines)
    end
```

## 2. Tracked Data Points

The Monitoring Agent (built in Rust for minimal CPU footprint) tracks:
1. **Keyboard Activity**: Keystroke velocity (not the actual keys logged).
2. **Mouse Activity**: Click rates and movement metrics.
3. **Active Window**: The foreground application title.
4. **Browser Usage**: Active URLs (via browser extensions).
5. **App Usage**: Process executable names (e.g., `excel.exe`).
6. **Attendance**: Machine unlock/lock events tied to shift timing.
7. **Idle Detection**: Time since last hardware interrupt.
8. **Productivity**: Mapped locally by the Department AI.
9. **Screenshots**: Captured based on policy (e.g., every 5 mins).
10. **Internet Usage**: Network bandwidth monitoring.
11. **Device Information**: IP address, MAC, OS version.
12. **Login/Logout**: Explicit session tracking.
