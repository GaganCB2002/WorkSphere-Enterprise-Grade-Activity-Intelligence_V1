# WorkSphere Backend

## Structure

| Directory | Source | Description |
|-----------|--------|-------------|
| `enterprise-backend/` | `apps/enterprise-monitoring-system/backend/` | Spring Boot 3 (Java 17) + Node.js/Express + Prisma |
| `dashboard-backend/` | `apps/dashboard/backend/` | Node.js/Express telemetry hub (Socket.io) |
| `tracking-hub/` | `trackinh/` | Express + JWT unified tracking API |
| `microservices/` | `apps/enterprise-monitoring-system/microservices/` | 10 Spring Boot microservices |
| `ai-services/` | `apps/enterprise-monitoring-system/ai-services/` | Python FastAPI AI inference cluster (9 models) |
| `database/` | `apps/enterprise-monitoring-system/database/` | PostgreSQL schema, procedures, triggers |
| `gateway/` | `apps/enterprise-monitoring-system/gateway/` | API gateway config |
| `websocket-server/` | `apps/enterprise-monitoring-system/websocket-server/` | Standalone WebSocket broadcast |
| `nginx/` | `apps/enterprise-monitoring-system/nginx/` | Reverse proxy config |
| `web-page-backend/` | `apps/enterprise-monitoring-system/web-page/backend/` | Web page backend |

## Tech Stack
- Spring Boot 3.2.5 / Java 17 (Maven)
- Express.js 5.x + TypeScript
- Prisma ORM 6.19, PostgreSQL 15, Redis 7, Kafka
- Python FastAPI + PyTorch
- JWT + OAuth2 + Spring Security
