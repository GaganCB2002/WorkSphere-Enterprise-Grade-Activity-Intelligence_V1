# WorkSphere Enterprise — Flow Diagrams

---

## 1. System Architecture Flow (7-Tier)

```mermaid
graph TB
    subgraph Tier1["TIER 1: CLIENTS"]
        B[Browser React SPA]
        E[Electron Desktop Agent]
        M[React Native Mobile App]
        API[External API Consumers]
    end

    subgraph Tier2["TIER 2: API GATEWAY :8080"]
        GW[Spring Cloud Gateway]
        JWT[JWT Validation Filter]
        RL[Rate Limiter]
        GW --> JWT --> RL
    end

    subgraph Tier3["TIER 3: MICROSERVICES"]
        AS[auth-service :8081]
        ES[employee-service :8082]
        HS[hr-service :8083]
        ANS[analytics-service :8084]
        AIS[ai-service :8085]
        NS[notification-service :8086]
        MS[monitoring-service :8087]
        GS[gps-service :8088]
        RS[report-service :8089]
    end

    subgraph Tier4["TIER 4: AI INFERENCE"]
        PY[Python FastAPI :5000]
        AD[anomaly_detection]
        FR[face_recognition]
        PP[productivity_prediction]
        SA[sentiment_analysis]
        VD[violence_detection]
        TA[tracking_analysis]
        RA[report_ai]
        PY --> AD
        PY --> FR
        PY --> PP
        PY --> SA
        PY --> VD
        PY --> TA
        PY --> RA
    end

    subgraph Tier5["TIER 5: DATA LAYER"]
        PG[(PostgreSQL 15)]
        RD[(Redis 7)]
        KF[Apache Kafka]
    end

    subgraph Tier6["TIER 6: ANALYTICS ENGINE"]
        AE[Aggregation Engine]
        SC[Cron Scheduler]
        RP[Report Generator]
    end

    subgraph Tier7["TIER 7: OBSERVABILITY"]
        PM[Prometheus]
        GF[Grafana]
        EL[ELK Stack]
    end

    B -->|HTTPS/WSS| GW
    E -->|HTTP| GW
    M -->|HTTPS| GW
    API -->|HTTPS| GW

    RL -->|/api/v1/auth/*| AS
    RL -->|/api/v1/employee/*| ES
    RL -->|/api/v1/hr/*| HS
    RL -->|/api/v1/analytics/*| ANS
    RL -->|/api/v1/ai/*| AIS
    RL -->|/api/v1/notification/*| NS
    RL -->|/api/v1/monitoring/*| MS
    RL -->|/api/v1/gps/*| GS
    RL -->|/api/v1/report/*| RS

    AIS -->|Feign Client| PY
    MS -->|Ingest Telemetry| PG
    GS -->|Store GPS| PG
    AS -->|Store Users| PG
    ES -->|Store Employees| PG

    AS -->|Cache Sessions| RD
    ES -->|Cache Lookups| RD
    MS -->|Pub/Sub Events| RD

    MS -->|Produce Telemetry| KF
    GS -->|Produce Location| KF
    NS -->|Consume Events| KF
    ANS -->|Consume Analytics| KF

    PG -->|Daily Aggregation| AE
    KF -->|Stream Events| AE
    AE -->|Store Results| PG
    SC -->|Trigger Schedules| AE
    AE -->|Generate Reports| RP

    PM -->|Scrape Metrics| GW
    PM -->|Scrape Metrics| MS
    GF -->|Query| PM
    EL -->|Ingest Logs| MS
    EL -->|Ingest Logs| AS
```

---

## 2. User Authentication & RBAC Flow

```mermaid
sequenceDiagram
    participant U as User (Browser)
    participant F as React Frontend
    participant GW as API Gateway :8080
    participant AS as Auth Service :8081
    participant RD as Redis Cache
    participant PG as PostgreSQL

    U->>F: Enter credentials
    F->>F: Validate form
    F->>GW: POST /api/v1/auth/login
    GW->>AS: Route to auth-service
    AS->>PG: SELECT * FROM users WHERE username=?
    PG-->>AS: User record + hashed password
    AS->>AS: BCrypt.verify(password, hash)
    
    alt Invalid credentials
        AS-->>F: 401 Unauthorized
        F-->>U: Show error message
    else Valid credentials
        AS->>PG: SELECT roles, permissions via JOINs
        PG-->>AS: User roles & permission list
        AS->>AS: Generate JWT (subject=userId, roles, permissions, exp=24h)
        AS->>RD: SETEX session:{userId} 86400 userData
        AS-->>GW: { token, user, roles, permissions }
        GW-->>F: 200 OK with JWT
        F->>F: Store JWT in httpOnly cookie + Redux store
        F->>F: Decode JWT, extract role
        F->>F: Redirect to role-specific dashboard
        F-->>U: Render dashboard
    end

    Note over U,F: Subsequent requests
    F->>GW: GET /api/v1/employee/* (Authorization: Bearer JWT)
    GW->>GW: Validate JWT signature + expiry
    GW->>GW: Extract roles/permissions from JWT claims
    GW->>RD: Check rate limit for userId
    
    alt Missing/invalid JWT
        GW-->>F: 401 Unauthorized
        F->>F: Redirect to /login
    else Valid JWT
        GW->>AS: Forward request with userId + roles
        AS->>AS: @PreAuthorize("hasRole('HR_MANAGER')")
        
        alt Insufficient permissions
            AS-->>GW: 403 Forbidden
            GW-->>F: 403 Forbidden
            F-->>U: Access denied notification
        else Sufficient permissions
            AS->>AS: Execute business logic
            AS-->>GW: 200 OK with data
            GW-->>F: 200 OK
            F->>F: Update Redux store
            F-->>U: Render data
        end
    end
```

---

## 3. Desktop Agent Telemetry Flow

```mermaid
sequenceDiagram
    participant Agent as Electron Agent
    participant WinRT as WinRT GPS API
    participant FS as Local JSONL File
    participant NS as Node.js Telemetry Server :4000
    participant WS as WebSocket Server
    participant F as React Frontend
    participant MS as Monitoring Service :8087

    loop Every 1 second (Activity Poll)
        Agent->>Agent: active-win.activeWindow()
        Agent->>Agent: Parse app name + window title
        Agent->>Agent: Calculate keystrokeVelocity, mouseClicks
        Agent->>Agent: Check idle > 60s → break detection
        Agent->>FS: Append JSONL log entry
    end

    loop Every 10 seconds (GPS Poll)
        Agent->>WinRT: powershell get_gps.ps1
        WinRT-->>Agent: lat, lng, accuracy, network
        
        alt Accuracy < 500m
            Agent->>Agent: Mark as "Hardware (High)"
        else Accuracy < 2500m
            Agent->>Agent: Mark as "Hardware (Low)"
        else Accuracy > 35000m
            Agent->>Agent: REJECT - signal untrustworthy
        end

        Agent->>Agent: Send GPS payload with trust level
        Agent->>FS: Append GPS JSONL entry
        Agent->>NS: POST /api/telemetry/location
        NS->>WS: Broadcast to monitoring dashboard
        WS-->>F: Update GPS marker on Leaflet map
        NS->>MS: POST /api/v1/monitoring/gps
        MS->>MS: Persist to live_tracking table
        MS->>MS: Check geofence boundaries
        
        alt Geofence breach detected
            MS->>MS: Create security alert event
            MS->>KF: Produce geofence-breach event
            KF->>NS: Consume alert
            NS->>WS: Broadcast threat alert
            WS-->>F: Show security toast notification
        end
    end

    loop Every 5 seconds (Remote Control)
        Agent->>NS: GET /api/tracking/suspended-status?nodeId=EMP-XXX
        NS-->>Agent: { suspended: true/false }
        
        alt Suspended
            Agent->>Agent: Stop tracking, update tray icon
        else Active
            Agent->>Agent: Resume tracking
        end
    end

    Note over Agent,FS: On Threat Detection (On Demand)
    Agent->>Agent: Scan directories for malware patterns
    Agent->>FS: Append THREAT_DETECTED JSONL entry
    Agent->>NS: POST /api/telemetry/security
    NS->>WS: Broadcast threat to security dashboard
    WS-->>F: Auto-rectification UI update
```

---

## 4. Kafka Event Streaming Flow

```mermaid
graph LR
    subgraph Producers
        MS[Monitoring Service]
        GS[GPS Service]
        AS[Auth Service]
        HS[HR Service]
    end

    subgraph Kafka_Cluster["Apache Kafka Cluster"]
        T1[telemetry-events]
        T2[location-updates]
        T3[security-threats]
        T4[notification-queue]
        T5[analytics-stream]
        T6[audit-log]
    end

    subgraph Consumers
        NS[Notification Service]
        ANS[Analytics Service]
        RS[Report Service]
        WS[WebSocket Server]
        EL[ELK Logger]
    end

    MS -->|Produce| T1
    GS -->|Produce| T2
    MS -->|Produce| T3
    HS -->|Produce| T4
    MS -->|Produce| T5
    AS -->|Produce| T6
    MS -->|Produce| T6

    T1 -->|Consume| ANS
    T1 -->|Consume| WS
    T2 -->|Consume| ANS
    T2 -->|Consume| WS
    T3 -->|Consume| NS
    T3 -->|Consume| WS
    T3 -->|Consume| EL
    T4 -->|Consume| NS
    T4 -->|Consume| WS
    T5 -->|Consume| ANS
    T5 -->|Consume| RS
    T6 -->|Consume| EL
```

---

## 5. Database Migration & Schema Flow

```mermaid
flowchart TD
    A[Database Schema Files] --> B[users.sql]
    A --> C[roles.sql]
    A --> D[permissions.sql]
    A --> E[employees.sql]
    A --> F[monitoring.sql]
    A --> G[tracking.sql]
    A --> H[reports.sql]
    A --> I[analytics.sql]
    A --> J[seed.sql]

    B --> K[Execute DDL]
    C --> K
    D --> K
    E --> K
    F --> K
    G --> K
    H --> K
    I --> K
    J --> K

    K --> L[(PostgreSQL 15 Database)]

    L --> M[Stored Procedures]
    L --> N[Triggers]
    L --> O[Indexes]

    M --> P[Daily KPI Aggregation]
    M --> Q[Attendance Compliance Calc]
    M --> R[Report Generation]

    N --> S[Auto Audit Logging]
    N --> T[Alert on Anomaly]
    N --> U[Update updated_at Timestamp]

    O --> V[Fast Login Lookups]
    O --> W[Efficient Telemetry Queries]
    O --> X[Quick Location History]

    P --> Y[productivity_analytics Table]
    Q --> Z[Attendance Summary Reports]
    R --> AA[forensic_reports Table]
```

---

## 6. CI/CD Pipeline Flow

```mermaid
flowchart LR
    A[Developer Push] --> B[GitHub Repository]
    B --> C[GitHub Actions Trigger]

    subgraph CI["CI Pipeline"]
        C --> D[Checkout Code]
        D --> E[Setup Java 17 + Node 18 + Python 3.10]
        E --> F[Install Dependencies]
        F --> G1[Maven Build backend/]
        F --> G2[npm Build frontend/]
        F --> G3[pip Install ai-services/]
        G1 --> H1[Run Unit Tests JUnit 5]
        G2 --> H2[Run Lint ESLint]
        G3 --> H3[Run Python Tests pytest]
        H1 --> I1[SonarQube Analysis]
        H2 --> I1
        H3 --> I1
        I1 --> J{Quality Gate Pass?}
        J -->|No| K[Fail Build - Notify Team]
        J -->|Yes| L[Build Docker Images]
    end

    subgraph CD["CD Pipeline"]
        L --> M[Push to Container Registry]
        M --> N[Deploy to Dev K8s Cluster]
        N --> O[Run Integration Tests]
        O --> P{Tests Pass?}
        P -->|No| Q[Rollback Dev]
        P -->|Yes| R[Deploy to Staging]
        R --> S[Smoke Tests]
        S --> T{Smoke Pass?}
        T -->|No| U[Rollback Staging]
        T -->|Yes| V[Approve Production Deploy]
        V --> W[Blue/Green Deploy to Prod]
        W --> X[Health Check]
        X --> Y{Healthy?}
        Y -->|No| Z[Rollback to Green]
        Y -->|Yes| AA[Switch Traffic to Blue]
    end

    subgraph PostDeploy["Post-Deployment"]
        AA --> AB[Send Slack Notification]
        AB --> AC[Update Jira Tickets]
        AC --> AD[Prometheus Scrape New Version]
        AD --> AE[Grafana Dashboards Auto-Update]
    end
```

---

## 7. Frontend Component Data Flow

```mermaid
graph TB
    subgraph State_Mgmt["State Management"]
        RTK[Redux Toolkit Store]
        SAGA[Redux Saga]
        CTX[React Context]
    end

    subgraph API_Layer["API Layer"]
        AXIOS[Axios Instance]
        WS[Socket.IO Client]
        INT[Axios Interceptors]
        INT -->|Attach JWT| AXIOS
        INT -->|Handle 401 → Logout| AXIOS
    end

    subgraph Services["Service Modules"]
        AUTH[authService]
        EMP[employeeService]
        HR[hrService]
        MON[monitoringService]
        GPS[gpsService]
        AI[aiService]
        RPT[reportService]
    end

    subgraph Components["React Components"]
        DASH[Dashboard Layouts]
        CHART[Recharts Charts]
        MAP[Leaflet Tracking Map]
        KANBAN[Kanban Boards]
        TABLE[Data Tables]
        FORM[Forms & Modals]
        NOTIF[Toast Notifications]
    end

    subgraph Hooks["Custom Hooks"]
        HP[usePermissions]
        HT[useTelemetry]
        HL[useLocation]
        HA[useAuth]
        HW[useWebSocket]
    end

    subgraph Pages["Role Pages"]
        SA[super_admin/]
        CEO[ceo/]
        HRM[hr_manager/]
        EMPP[employee/]
        SEC[security_analyst/]
        DEV[devops_engineer/]
    end

    AXIOS -->|API Calls| AUTH
    AXIOS -->|API Calls| EMP
    AXIOS -->|API Calls| HR
    AXIOS -->|API Calls| MON
    AXIOS -->|API Calls| GPS
    AXIOS -->|API Calls| AI
    AXIOS -->|API Calls| RPT

    WS -->|Real-time Events| MON
    WS -->|Real-time Events| GPS

    AUTH -->|dispatch| RTK
    EMP -->|dispatch| RTK
    HR -->|dispatch| RTK
    MON -->|dispatch| RTK
    GPS -->|dispatch| RTK
    AI -->|dispatch| RTK
    RPT -->|dispatch| RTK

    RTK -->|selectors| Hooks
    SAGA -->|side effects| AXIOS
    CTX -->|theme, socket| Hooks

    Hooks --> Components
    RTK -->|state| Components
    WS -->|events| Components

    Components --> Pages
    Pages --> DASH
    DASH --> CHART
    DASH --> MAP
    DASH --> KANBAN
    DASH --> TABLE
    DASH --> FORM
    DASH --> NOTIF
```

---

## 8. WebSocket Real-Time Event Flow

```mermaid
sequenceDiagram
    participant Agent as Electron Agent
    participant NS as Node.js Telemetry Server
    participant WS as WebSocket Server
    participant F as Frontend Browser
    participant KF as Apache Kafka
    participant MS as Monitoring Service

    Note over Agent,MS: Connection Establishment
    F->>WS: Connect (socket.io-client)
    WS->>F: Connection acknowledged
    F->>F: Join room based on user role

    Note over Agent,MS: Telemetry Stream
    Agent->>NS: POST /api/telemetry/activity { employeeId, app, title, cpu, ... }
    NS->>WS: Broadcast to role-specific rooms
    WS->>F: "telemetry:snapshot" { app, cpu, memory, etc. }
    F->>F: Update SystemMonitor gauges in real-time

    Note over Agent,MS: GPS Location Stream
    Agent->>NS: POST /api/telemetry/location { lat, lng, accuracy }
    NS->>WS: Broadcast to tracking room
    WS->>F: "location:update" { employeeId, lat, lng }
    F->>F: Update Leaflet map marker position

    Note over Agent,MS: Security Event Stream
    Agent->>NS: POST /api/telemetry/security { threatName, severity, filePath }
    NS->>KF: Produce security-threats event
    KF->>MS: Consume and store threat
    NS->>WS: Broadcast to security room
    WS->>F: "security:threat" { threatName, status: "QUARANTINED" }
    F->>F: Show toast + update SecurityAnalyst dashboard

    Note over Agent,MS: Notification Stream
    MS->>KF: Produce notification-queue event
    KF->>NS: Consume notification
    NS->>WS: Broadcast to user-specific room
    WS->>F: "notification:toast" { title, message, type }
    F->>F: Show toast notification

    Note over Agent,MS: Role Switch
    F->>WS: "role:switch" { newRole: "CEO" }
    WS->>F: Leave current room, join new role room
    WS->>F: "dashboard:refresh" { widgets, permissions }
    F->>F: Re-render dashboard for new role
    F->>Agent: IPC "rbac-role-changed" { role: "CEO" }
    Agent->>Agent: Update tray icon visibility
```

---

## 9. Deployment Architecture Flow

```mermaid
graph TB
    subgraph Local["Local Development"]
        DEV[Developer Machine]
        DC[Docker Compose]
        DEV -->|npm run dev| FE[Vite Dev Server :5173]
        DEV -->|mvn spring-boot:run| BE[Spring Boot :8080]
        DC --> PG[(Postgres :5432)]
        DC --> RD[(Redis :6379)]
        DC --> KF[Kafka :9092]
        DC --> PM[Prometheus :9090]
        DC --> GF[Grafana :3000]
    end

    subgraph K8s_Dev["Kubernetes - Development"]
        INGR[Ingress Controller]
        GW[Gateway Service :8080]
        PODS[All Microservices Pods]
        DB[(RDS PostgreSQL)]
        RC[(ElastiCache Redis)]
        MK[MSK Kafka]
        INGR --> GW --> PODS
        PODS --> DB
        PODS --> RC
        PODS --> MK
    end

    subgraph K8s_Prod["Kubernetes - Production (Multi-AZ)"]
        CDN[CloudFront CDN]
        WAF[AWS WAF]
        ALB[ALB Load Balancer]
        INGR2[Nginx Ingress]
        GW2[Gateway Service :8080 - 3 replicas]
        MS_PODS[All Microservices - 5 replicas each]
        HPA[Horizontal Pod Autoscaler]
        RDS[(RDS Multi-AZ)]
        ECR[(ElastiCache Cluster)]
        MSK2[MSK Multi-AZ]
        S3[S3 Static Assets]
        
        CDN -->|Static| S3
        User --> CDN
        User --> WAF --> ALB --> INGR2 --> GW2
        GW2 --> MS_PODS
        HPA --> MS_PODS
        MS_PODS --> RDS
        MS_PODS --> ECR
        MS_PODS --> MSK2
    end

    subgraph IaC["Infrastructure as Code"]
        TF[Terraform Root Module]
        VPC[VPC Module]
        EKS[EKS Module]
        RDS_M[RDS Module]
        RC_M[Redis Module]
        KFK_M[Kafka Module]
        TF --> VPC
        TF --> EKS
        TF --> RDS_M
        TF --> RC_M
        TF --> KFK_M
        VPC -->|outputs| EKS
        VPC -->|outputs| RDS_M
    end

    Local -->|docker tag & push| Reg[Container Registry]
    Reg -->|kubectl apply| K8s_Dev
    K8s_Dev -->|promote| K8s_Prod
    IaC -->|terraform apply| K8s_Dev
    IaC -->|terraform apply| K8s_Prod
```

---

## 10. Role-Based Dashboard Navigation Flow

```mermaid
flowchart TD
    A[User visits /] --> B{Has JWT Token?}
    B -->|No| C[Show Login Page]
    B -->|Yes| D[Decode JWT - Extract Role]
    
    C --> E[Enter credentials]
    E --> F[POST /api/v1/auth/login]
    F --> G{Valid?}
    G -->|No| C
    G -->|Yes| H[Store JWT + Redirect to /dashboard]
    H --> D

    D --> I{Route Role to Dashboard}
    
    I -->|SUPER_ADMIN| SA[super_admin/dashboard]
    I -->|ADMIN| AD[admin/dashboard]
    I -->|CEO| CEO[ceo/dashboard]
    I -->|CTO| CTO[cto/dashboard]
    I -->|HR_MANAGER| HRM[hr_manager/dashboard]
    I -->|HR_EXECUTIVE| HRE[hr_executive/dashboard]
    I -->|FINANCE_MANAGER| FM[finance_manager/dashboard]
    I -->|MARKETING_MANAGER| MM[marketing_manager/dashboard]
    I -->|SALES_MANAGER| SM[sales_manager/dashboard]
    I -->|PROJECT_MANAGER| PM[project_manager/dashboard]
    I -->|TECH_LEAD| TL[tech_lead/dashboard]
    I -->|DEVOPS_ENGINEER| DE[devops_engineer/dashboard]
    I -->|QA_ENGINEER| QA[qa_engineer/dashboard]
    I -->|SECURITY_ANALYST| SA2[security_analyst/dashboard]
    I -->|SOFTWARE_ENGINEER| SWE[software_engineer/dashboard]
    I -->|SUPPORT_AGENT| SUA[support_agent/dashboard]
    I -->|EMPLOYEE| EMP[employee/dashboard]
    I -->|INTERN| INT[intern/dashboard]

    SA --> SA_W[System-Wide Metrics + RBAC Matrix + Tenant Config]
    AD --> AD_W[User Provisioning + Audit Logs + Infrastructure]
    CEO --> CEO_W[Revenue + Headcount + Executive KPIs]
    CTO --> CTO_W[Engineering Velocity + Cloud Costs]
    HRM --> HRM_W[Headcount Charts + ATS Pipeline + Payroll]
    HRE --> HRE_W[Onboarding + Attendance + Grievances]
    FM --> FM_W[Budget Burn + Invoices + OPEX/CAPEX]
    MM --> MM_W[Campaign ROI + Ad Spend + MQL/SQL Funnel]
    SM --> SM_W[Sales Pipeline + ARR/MRR Quota + Deal Kanban]
    PM --> PM_W[Sprint Planning + Burndown + Resources]
    TL --> TL_W[PR Reviews + Git Velocity + Squad Metrics]
    DE --> DE_W[CI/CD + K8s Pods + Server Uptime]
    QA --> QA_W[Test Coverage + Bug Triage + RC Status]
    SA2 --> SA2_W[Live Signal Stream + Threat Console + Audit]
    SWE --> SWE_W[Personal Tasks + Git Commits + Work Hours]
    SUA --> SUA_W[Ticket Queue + SLA + Live Chat]
    EMP --> EMP_W[Attendance + Productivity + Task Checklist]
    INT --> INT_W[Learning Path + Mentor Feedback + Tasks]

    subgraph RoleSwitcher["Role Switcher (Top Nav)"]
        J[User clicks Role Switcher] --> K[Show role dropdown]
        K --> L[User selects new role]
        L --> M{Has Permission?}
        M -->|No| N[Show 403 - Access Denied]
        M -->|Yes| O[Update Redux role state]
        O --> P[WS emit role:switch]
        P --> Q[Re-render dashboard layout]
        Q --> I
    end
```

---

## 11. Microservices Inter-Communication Flow

```mermaid
graph TB
    subgraph Gateway["API Gateway :8080"]
        GW[Spring Cloud Gateway]
    end

    subgraph Auth["Auth Domain"]
        AUTH[auth-service :8081]
        AUTH_DB[(auth-db)]
    end

    subgraph Core["Core Domain"]
        EMP[employee-service :8082]
        HR[hr-service :8083]
        EMP_DB[(employee-db)]
        HR_DB[(hr-db)]
    end

    subgraph Intel["Intelligence Domain"]
        AN[analytics-service :8084]
        AI[ai-service :8085]
        AN_DB[(analytics-db)]
    end

    subgraph Comm["Communication Domain"]
        NOTIF[notification-service :8086]
        WS[WebSocket Server]
    end

    subgraph Data["Data Domain"]
        MON[monitoring-service :8087]
        GPS[gps-service :8088]
        RPT[report-service :8089]
        MON_DB[(monitoring-db)]
        GPS_DB[(gps-db)]
    end

    subgraph Infra["Infrastructure"]
        RD[(Redis Cache)]
        KF{Apache Kafka}
    end

    GW --> AUTH
    GW --> EMP
    GW --> HR
    GW --> AN
    GW --> AI
    GW --> NOTIF
    GW --> MON
    GW --> GPS
    GW --> RPT

    AUTH --> AUTH_DB
    EMP --> EMP_DB
    HR --> HR_DB
    AN --> AN_DB
    MON --> MON_DB
    GPS --> GPS_DB

    AUTH -->|Cache Tokens| RD
    EMP -->|Cache Lookups| RD
    GPS -->|Cache Geofences| RD

    MON -->|Produce Telemetry| KF
    GPS -->|Produce Location| KF
    AUTH -->|Produce Audit| KF

    KF -->|Consume| AN
    KF -->|Consume| NOTIF
    KF -->|Consume| RPT

    EMP -->|Feign Client| HR
    HR -->|Feign Client| AUTH
    AN -->|Feign Client| AI
    NOTIF -->|WebSocket| WS
    MON -->|WebSocket| WS
    GPS -->|WebSocket| WS
```

---

## 12. Data Flow: End-to-End Request Example

```mermaid
sequenceDiagram
    participant U as HR Manager User
    participant F as React Frontend
    participant GW as API Gateway :8080
    participant HS as HR Service :8083
    participant ES as Employee Service :8082
    participant PG as PostgreSQL
    participant RD as Redis

    U->>F: Open HR Dashboard → View Attendance
    F->>F: Dispatch action to Redux Saga
    F->>GW: GET /api/v1/hr/attendance?department=engineering&date=2026-05-27
    Note over F,GW: Authorization: Bearer eyJhbG...

    GW->>GW: Validate JWT signature
    GW->>GW: Extract roles: [HR_MANAGER]
    GW->>GW: Check permissions: hasPermission(MANAGE_EMPLOYEE)
    GW->>RD: INCR rate:limit:{userId}:attendance
    
    alt Rate limit exceeded
        RD-->>GW: 101 → limit reached
        GW-->>F: 429 Too Many Requests
        F-->>U: "Please wait before refreshing"
    end

    GW->>HS: Forward request with userId + roles

    HS->>HS: @PreAuthorize("hasRole('HR_MANAGER')")
    HS->>RD: GET cache:attendance:engineering:2026-05-27
    
    alt Cache Hit
        RD-->>HS: Cached attendance data
    else Cache Miss
        HS->>ES: Feign Client GET /api/v1/employee/department/engineering
        ES->>PG: SELECT id, employee_id FROM employees WHERE department='engineering'
        PG-->>ES: [emp1, emp2, ...]
        ES-->>HS: Employee list with IDs
        
        HS->>PG: SELECT * FROM workstation_telemetry WHERE employee_id IN (...) AND recorded_at::date = '2026-05-27'
        PG-->>HS: Telemetry records
        
        HS->>HS: Calculate productive_hours, idle_hours, attendance_compliance
        HS->>RD: SETEX cache:attendance:engineering:2026-05-27 300 serializedData
    end

    HS-->>GW: 200 OK { attendance: [...], summary: {...} }
    GW-->>F: Response data
    F->>F: Saga dispatches success action
    F->>F: Redux store updated
    F->>F: Recharts components re-render
    F-->>U: View bar charts + attendance table

    Note over U,PG: Real-time updates via WebSocket
    WS->>F: "telemetry:snapshot" { employeeId, app, focused }
    F->>F: Update live activity feed in sidebar
    F-->>U: See live employee status changes
```

---

## Diagram Index

| # | Diagram | File Location | Description |
|---|---------|---------------|-------------|
| 1 | System Architecture (7-Tier) | `FLOW_DIAGRAMS.md` §1 | Full component topology from clients → observability |
| 2 | Auth & RBAC Flow | `FLOW_DIAGRAMS.md` §2 | Login sequence, JWT validation, role checking |
| 3 | Desktop Agent Telemetry | `FLOW_DIAGRAMS.md` §3 | Agent polling, GPS verification, threat detection |
| 4 | Kafka Event Streaming | `FLOW_DIAGRAMS.md` §4 | Producers, topics, consumers |
| 5 | Database Schema Flow | `FLOW_DIAGRAMS.md` §5 | DDL execution, procedures, triggers, indexes |
| 6 | CI/CD Pipeline | `FLOW_DIAGRAMS.md` §6 | Build → Test → Deploy → Monitor |
| 7 | Frontend Component Flow | `FLOW_DIAGRAMS.md` §7 | Redux, services, hooks, components |
| 8 | WebSocket Real-Time Events | `FLOW_DIAGRAMS.md` §8 | Live telemetry, GPS, security, notifications |
| 9 | Deployment Architecture | `FLOW_DIAGRAMS.md` §9 | Local → Dev K8s → Prod K8s → IaC |
| 10 | Role-Based Navigation | `FLOW_DIAGRAMS.md` §10 | Route resolution, 18 dashboards, role switcher |
| 11 | Microservices Communication | `FLOW_DIAGRAMS.md` §11 | Gateway routing, Feign clients, Kafka, Redis |
| 12 | End-to-End Data Flow | `FLOW_DIAGRAMS.md` §12 | HR attendance request: UI → Gateway → Services → DB → Cache → UI |
