# Screenshot Processing Flow

> [!CAUTION]
> Screenshots contain highly sensitive data. The decentralized architecture ensures screenshots are stored locally within the department's dedicated infrastructure, minimizing the blast radius of a potential breach.

## 1. Distributed Screenshot Lifecycle

```mermaid
graph TD
    subgraph Employee_Device [Employee Desktop]
        AGENT[Tracking Agent]
        ENC[Local Encryption Module]
    end

    subgraph Department_Node [Department Edge Node]
        REC[Screenshot Receiver API]
        S3_DEPT[(Department AWS S3 Bucket)]
        DB_DEPT[(Local Postgres DB)]
        QUEUE[Kafka Producer]
    end

    subgraph HR_Hub [HR Aggregator Hub]
        AGGR[HR Master API]
        DASH[HR Dashboard UI]
    end

    %% Capture Flow
    AGENT -->|Capture Screen| ENC
    ENC -->|AES-256 Encrypted Payload| REC
    
    %% Storage Flow
    REC -->|Store Image BLOB| S3_DEPT
    REC -->|Save Metadata (URL, Time)| DB_DEPT
    
    %% Sync Flow
    DB_DEPT -->|Extract Metadata| QUEUE
    QUEUE -->|Sync Metadata ONLY| AGGR
    
    %% Viewing Flow
    DASH -->|Request View| AGGR
    AGGR -->|Provide Temporary Signed URL| DASH
    DASH -.->|Fetch Image Directly| S3_DEPT
```

## 2. Screenshot Service Responsibilities

### Department Screenshot Service
- Receives the encrypted image buffers from the employee agents.
- Uploads the physical image file to a securely isolated, department-specific object store (e.g., `s3://worksphere-eng-screenshots/`).
- Writes the metadata (Timestamp, S3 URI, Active App at time of capture) to the local database.
- **Critical Policy**: Image blobs are *never* sent over Kafka. Only the metadata JSON is synced to the HR Aggregator to preserve bandwidth and queue performance.

### HR Aggregator
- Receives the metadata indicating a screenshot was taken.
- If an HR Manager wishes to view a screenshot, the Aggregator API reads the metadata, generates a short-lived AWS Presigned URL for that specific department's S3 bucket, and returns it to the UI.
- This ensures the heavy image data routes directly from S3 to the HR Manager's browser, completely bypassing the backend microservices.
