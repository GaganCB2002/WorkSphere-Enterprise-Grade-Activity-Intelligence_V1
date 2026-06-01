# ⚡ WorkSphere Enterprise — Activity & Project Guide

> **AI-Powered Activity Intelligence Platform for MNC Organizations (5000+ employees)**
> This file is automatically updated every time the project is run or updated.

---

## 🟢 Live Session Status

| Metric | Details |
| :--- | :--- |
| **Last Open / Run Time** | `6/1/2026, 12:15:59 PM GMT+5:30` |
| **Active OS User** | `gagan` |
| **Operating System** | `Windows_NT 10.0.26200 (x64)` |
| **Node.js Version** | `v25.9.0` |
| **Active Git Branch** | `main` |
| **Last Commit** | `c3cf9fd` by **Gagan** on *Mon Jun 1 12:14:18 2026 +0530* |
| **Commit Message** | `feat(devops): implement DevOps Command Center dashboard with full-screen layout, collapsible sidebar, worker profile, and live telemetry integrations` |
| **Uncommitted Changes** | `No changes` |

### 🔌 Project Services & Ports

| Service | Port | Status | Address |
| :--- | :--- | :--- | :--- |
| **Frontend UI (Vite)** | `3005` | 🔴 OFFLINE | [http://localhost:3005](http://localhost:3005) |
| **Backend Telemetry Server** | `4000` | 🔴 OFFLINE | [http://localhost:4000](http://localhost:4000) |
| **Enterprise Backend API** | `5001` | 🔴 OFFLINE | [http://localhost:5001](http://localhost:5001) |
| **Unified Services (Trackinh)** | `5002` | 🔴 OFFLINE | [http://localhost:5002](http://localhost:5002) |

---

## 🪵 Project Run & Open History

<!-- START_HISTORY_TABLE -->
| Date & Time | User | Git Branch | Last Commit | Uncommitted Changes? |
| :--- | :--- | :--- | :--- | :--- |
| 2026-06-01 06:45:59 | **gagan** | `main` | `c3cf9fd` - feat(devops): implement DevOps Command Center dashboard with full-screen layout, collapsible sidebar, worker profile, and live telemetry integrations | No changes |
| 2026-06-01 05:40:32 | **gagan** | `main` | `4f0b074` - Apply Skeuomorphic Design to HR Executive Module | ⚠️ Yes (10 file(s) modified/untracked) |
<!-- END_HISTORY_TABLE -->

---

## 🏛️ System Overview & Architecture

### 7-Tier Architecture Map
```
                    ┌────────────────────┐
                    │   Web Frontend     │
                    │ React (Vite / TS)  │
                    └─────────┬──────────┘
                              │
                    ┌─────────▼──────────┐
                    │    API Gateway     │
                    │ Nginx / JWT Auth   │
                    └─────────┬──────────┘
                              │
 ┌────────────────────────────────────────────────────────────┐
 │                    Backend Services                       │
 ├────────────────────────────────────────────────────────────┤
 │                                                            │
 │ Express Telemetry Server (:4000)                           │
 │ Prisma Backend API (:5001)                                 │
 │ Trackinh Unified Services (:5002)                          │
 │                                                            │
 └────────────────────────────────────────────────────────────┘
                              │
               ┌──────────────┴──────────────┐
               │                             │
      ┌────────▼────────┐         ┌──────────▼──────────┐
      │ PostgreSQL DB   │         │ Redis / Kafka       │
      │ Prisma Schema   │         │ Cache + Queue       │
      └─────────────────┘         └─────────────────────┘
```

---

## 🛠️ Complete Technology Stack

### Frontend UI Tier
* **Core:** React 18.3, TypeScript, Vite 6
* **Styling:** TailwindCSS 4 (or custom vanilla CSS fallback)
* **State Management:** Redux Toolkit & Redux Saga
* **Routing:** React Router 7
* **Charts:** Recharts
* **Animations:** Framer Motion
* **WebSockets:** Socket.IO Client
* **Utility Libraries:** Lucide React, jsPDF, @xyflow/react

### Backend Tiers
1. **Telemetry Server (Node.js/Express):** Port `4000`
   - Captures real-time workstation snapshots from desktop agent.
2. **Unified Services (Node.js/Express):** Port `5002`
   - Under `trackinh/` directory, provides core coordination.
3. **Enterprise Backend API (Node.js/Express/TypeScript/Prisma):** Port `5001`
   - Located in `apps/enterprise-monitoring-system/backend/`.
   - Utilizes Prisma ORM with PostgreSQL database connection.

### Desktop Agent (Electron)
* Cross-platform tracking runtime.
* Handles active window tracking (`active-win`), screenshot utility, malware scan heuristic signatures, and GPS reporting.

---

## 👥 18 Enterprise Roles & RBAC Matrix
The system enforces strict Role-Based Access Control (RBAC) across 18 departments:
1. **SUPER_ADMIN**: Tenant Orchestration & full access.
2. **ADMIN**: Workspace configuration and user provisioning.
3. **CEO**: Corporate macro KPI oversight.
4. **CTO**: Engineering velocity & infrastructure spend.
5. **HR_MANAGER**: Recruitment pipeline & employee relations.
6. **HR_EXECUTIVE**: Employee onboarding & grievance tracking.
7. **FINANCE_MANAGER**: Invoices, payroll, and OPEX/CAPEX monitoring.
8. **MARKETING_MANAGER**: Campaign analytics & ROI tracking.
9. **SALES_MANAGER**: Pipeline velocity, ARR, and sales dashboards.
10. **PROJECT_MANAGER**: Burndown charts & sprint allocations.
11. **TECH_LEAD**: PR queues, git metrics, and code reviews.
12. **DEVOPS_ENGINEER**: Kubernetes nodes & system latency metrics.
13. **QA_ENGINEER**: Test coverage, bug logging.
14. **SECURITY_ANALYST**: Malware quarantines, system threat monitoring.
15. **SOFTWARE_ENGINEER**: Personal tasks, commits, activity timeline.
16. **SUPPORT_AGENT**: Support queue, tickets, SLA charts.
17. **EMPLOYEE**: Clock-in/out, personal productivity analytics.
18. **INTERN**: Mentorship goals and workspace assignments.

---

## 💾 Core PostgreSQL Tables
Managed via Prisma in `apps/enterprise-monitoring-system/backend/prisma/schema.prisma`:
* **users**: Credentials, emails, roles.
* **roles** & **permissions**: Enforces the granular RBAC definitions.
* **employees**: Organization structures and records.
* **workstation_telemetry**: Logged active windows, mouse click frequency, keystroke speeds, and screenshot URLs.
* **live_tracking**: Dynamic coordinates mapped to Leaflet fleet views.
* **productivity_analytics**: Burnout, active working hours.
* **forensic_reports**: Document repository for administrative compliance audit trails.
