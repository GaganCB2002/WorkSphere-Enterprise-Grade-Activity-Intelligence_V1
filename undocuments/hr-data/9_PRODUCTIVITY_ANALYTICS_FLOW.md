# Productivity Analytics Flow

> [!TIP]
> Productivity scoring is highly contextual. "VS Code" is productive for Engineering but unproductive for Sales. The decentralized model allows each Department Node to apply its own local AI categorization rules.

## 1. Localized Productivity Calculation

```mermaid
sequenceDiagram
    autonumber
    participant Agent as Tracking Agent
    participant Dept_Track as Dept Tracking Engine
    participant Dept_DB as Local PostgreSQL
    participant Dept_AI as Local Productivity Engine
    participant Sync as Event Queue
    participant Aggr as Enterprise Aggregator

    Agent->>Dept_Track: Submit raw app usage (`github.com`, `slack.exe`)
    Dept_Track->>Dept_DB: Store raw records
    
    %% Async Cron Job at the Edge
    loop Every 5 Minutes
        Dept_AI->>Dept_DB: Query raw records for past 5m
        Dept_AI->>Dept_AI: Apply Department-Specific App Mapping Rules
        
        alt Engineering Node
            Dept_AI->>Dept_AI: Score `github.com` = +100% (Productive)
        else Sales Node
            Dept_AI->>Dept_AI: Score `github.com` = +0% (Unproductive)
        end
        
        Dept_AI->>Dept_DB: Upsert calculated Focus Score (e.g., 85%)
        Dept_AI->>Sync: Publish `AnalyticsUpdated` Event (Score: 85%)
    end
    
    Sync->>Aggr: Consume Analytics Score
    Aggr->>Aggr: Merge into Global Database for HR Dash
```

## 2. Department Comparison Flow

Once the local scores are synced to the HR Aggregator, HR can run enterprise-wide analytics without crunching raw data.

- **The Problem with Centralization**: If HR wanted to compare Engineering vs. Sales in the old model, the central server had to run MapReduce across millions of raw tracking rows, applying contextual `if/else` statements for every department, leading to massive database locks.
- **The Decentralized Solution**: The heavy lifting is already done at the edge. The HR Aggregator simply runs an average on the pre-calculated `Focus Score` integers.
- **Result**: The HR Dashboard renders heatmaps comparing 5,000 employees across 10 departments in under 50ms.
