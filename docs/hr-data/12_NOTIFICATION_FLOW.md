# Enterprise Notification Flow

> [!WARNING]
> Alerts must be generated efficiently. Localized issues (e.g., a single employee idling) should be handled by the Department Node, while systemic issues (e.g., cross-department data exfiltration) must be handled by the HR Aggregator.

## 1. Split-Level Notification Architecture

```mermaid
sequenceDiagram
    participant Agent as Tracking Agent
    participant DeptAI as Dept Node (AI)
    participant Lead as Team Lead Dash
    participant EventBus as Kafka
    participant AggrAI as HR Aggregator (AI)
    participant HR as HR Dashboard

    %% Local Level Notification
    Agent->>DeptAI: Submit Telemetry (Idle for 3 hours)
    DeptAI->>DeptAI: Trigger `IdleThresholdBreached` Rule
    DeptAI->>Lead: WebSocket Push (Yellow Alert: Employee Idle)
    
    %% Global Level Escalation
    DeptAI->>EventBus: Publish `SecurityEvent: USB Storage Attached`
    EventBus->>AggrAI: Consume Event
    
    AggrAI->>AggrAI: Correlate across departments
    alt Same USB ID detected in Engineering AND Sales
        AggrAI->>HR: WebSocket Push (CRITICAL: Potential Coordinated Breach)
        AggrAI->>AggrAI: Trigger automated lockdown via Auth Service
    end
```

## 2. Notification Tiering

1. **Edge Alerts (Department Node)**
   - Processed instantly on local data.
   - Pushed directly to the Team Lead or Department Manager.
   - Examples: Extended idle time, late clock-in, localized unproductive app usage.
   - Benefit: Does not clog the global HR pipeline with micro-management alerts.

2. **Core Alerts (HR Aggregator)**
   - Processed by analyzing the combined dataset from all departments.
   - Pushed to Enterprise HR and Super Admins.
   - Examples: Multi-department credential sharing, unusual geographical login patterns across the enterprise, global productivity trends dropping 20% week-over-week.
