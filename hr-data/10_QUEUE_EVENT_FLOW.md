# Queue & Event Sync Flow

> [!IMPORTANT]
> The backbone of the decentralized architecture is the Enterprise Event Bus (Kafka/RabbitMQ). It ensures data flows seamlessly from isolated department nodes to the central HR Hub without data loss.

## 1. Distributed Event Architecture

```mermaid
graph TD
    subgraph Edge_Producers [Department Nodes]
        ENG_Q[Eng Node Publisher]
        SALES_Q[Sales Node Publisher]
        FIN_Q[Finance Node Publisher]
    end

    subgraph Kafka_Cluster [Enterprise Event Bus]
        T_ATTEND([Topic: sys.attendance])
        T_PROD([Topic: sys.productivity])
        T_ALERT([Topic: sys.alerts])
    end

    subgraph Core_Consumers [HR Aggregator Hub]
        C_ATTEND[Attendance Sync Worker]
        C_PROD[Analytics Sync Worker]
        C_ALERT[Notification Worker]
    end

    %% Publishing
    ENG_Q -->|Publish| T_ATTEND
    ENG_Q -->|Publish| T_PROD
    ENG_Q -->|Publish| T_ALERT

    SALES_Q -->|Publish| T_ATTEND
    SALES_Q -->|Publish| T_PROD

    %% Consuming
    T_ATTEND -->|Consume| C_ATTEND
    T_PROD -->|Consume| C_PROD
    T_ALERT -->|Consume| C_ALERT

    %% Scaling
    style C_PROD stroke-dasharray: 5 5
    style C_ATTEND stroke-dasharray: 5 5
```

## 2. Synchronization Mechanisms

1. **At-Least-Once Delivery**: Department nodes publish events using acknowledgments. If the Kafka cluster goes down, the node buffers events in its local Postgres Outbox table and retries until success.
2. **Schema Registry**: To prevent malformed data from crashing the HR Aggregator, all JSON payloads must conform to an Apache Avro/Protobuf schema registry before being published to the queue.
3. **Consumer Groups**: The HR Aggregator scales horizontally. `C_PROD` represents a consumer group; if traffic spikes, Kubernetes spins up more instances of the Analytics Sync Worker to drain the queue faster.
4. **Data Isolation in Topics**: Topics can optionally be partitioned by `department_id`, ensuring strict message ordering for a single department's timeline.
