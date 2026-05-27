# WorkSphere Enterprise — Project Summary

**WorkSphere Enterprise (formerly LiveGuard Pro)** is an AI-Powered Activity Intelligence Platform built for MNC-scale organizations (5000+ employees). It provides a unified, single-pane-of-glass operational experience across 18 enterprise departments for real-time employee monitoring, productivity analytics, biometric security, GPS fleet tracking, and AI-driven insights.

## Core Capabilities
- **Desktop Agent:** Zero-latency workstation tracking, kernel-level window telemetry, and malware scanning via Electron.
- **AI Intelligence:** Productivity scoring, anomaly detection, biometric facial recognition, and sentiment analysis powered by a Python FastAPI cluster.
- **Real-time Tracking:** Multi-node GPS fleet tracking and websocket event streaming.
- **Role-Based Access (RBAC):** Modular command center tailored for 18 distinct enterprise roles (e.g., SUPER_ADMIN, CEO, HR_MANAGER).

## System Architecture
The platform is built on a comprehensive 7-tier architecture:
1. **Client Tier:** React 18 frontend (Vite, TailwindCSS 4), Electron desktop agent, React Native mobile app.
2. **API Gateway Tier:** NGINX or Spring Cloud Gateway managing routing.
3. **Application Tier:** 10 decoupled Spring Boot microservices and Node.js telemetry backends.
4. **AI & Inference Tier:** 8 Python microservices for deep learning, NLP, and computer vision.
5. **Streaming & Cache Tier:** Apache Kafka for event streaming and Redis 7 for distributed caching.
6. **Data Storage Tier:** PostgreSQL 15 for relational data and MongoDB for unstructured logs.
7. **Infrastructure & DevOps:** Docker, Kubernetes, Terraform across multi-cloud deployments (AWS/Azure/GCP) with Prometheus/Grafana monitoring.

## Database & Data Flow
- **PostgreSQL** handles core operational data (users, organizations, attendance, roles).
- **Kafka / WebSockets** power real-time data flow from the desktop agent to the backend and immediately broadcast updates to the frontend dashboards.

## Phased Rollout
- **Phase 1 (MVP):** Core monitoring, basic dashboard, desktop agent, and essential telemetry.
- **Phase 2 (Enhancement):** Integration of the AI cluster (facial recognition, productivity scoring, sentiment analysis).
- **Phase 3 (Enterprise Scale):** Microservices rollout, Kubernetes orchestration, CI/CD, and the mobile companion app.
