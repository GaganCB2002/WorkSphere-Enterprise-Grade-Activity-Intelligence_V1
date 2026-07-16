# 🚀 Antigravity Project Brain

> **CRITICAL SYSTEM INSTRUCTION FOR ANTIGRAVITY AI:**
> You are Antigravity, the AI assistant for this project. Whenever you start a new conversation or session in this workspace, you **MUST** read this file first to understand the complete architecture, goals, and role-based access control of the project before writing any code. Do not proceed with execution until you have referenced this architecture map.

---

## 🏢 Project Overview
**Name:** WorkSphere Enterprise-Grade Activity Intelligence
**Goal:** To build a robust, enterprise-grade application (target: 5000+ employees) that tracks, monitors, and optimizes workforce productivity, cloud infrastructure, and security using advanced telemetry and role-based dashboards.

---

## 🏛️ System Architecture

The system operates on a highly decoupled microservices-inspired architecture:

### 1. Frontend UI (Port: 3005)
- **Tech Stack:** React 18, TypeScript, Vite, Tailwind CSS, Redux Toolkit, Redux Saga, React Router v7, Framer Motion, Recharts.
- **Structure:** Divided into massive modular dashboards based on 18 different Enterprise Roles (e.g., `devops_engineer`, `ceo`, `hr_executive`, `qa_engineer`).
- **Layouts:** Uses conditional rendering (`isFullScreenRole`) in `AppRoutes.jsx` to determine if a role gets a global `MainLayout` or a dedicated full-screen layout (like `DevOpsLayout`).

### 2. Enterprise Backend API (Port: 5001)
- **Tech Stack:** Node.js, Express, TypeScript, Prisma ORM.
- **Database:** PostgreSQL.
- **Functionality:** Handles core business logic, user authentication (JWT), RBAC enforcement, employee data, and database CRUD operations.

### 3. Telemetry Server (Port: 4000)
- **Tech Stack:** Node.js, Express, WebSockets.
- **Functionality:** Ingests high-frequency data from the Electron desktop agents (screenshots, active window titles, GPS locations, keystroke metrics) and queues it for the database.

### 4. Unified Services (Port: 5002)
- **Functionality:** Handles integrated communications, email routing, and microservice orchestration.

### 5. Desktop Agent
- **Tech Stack:** Electron.js
- **Functionality:** A cross-platform desktop application installed on employee machines that tracks active time, application usage, and generates security forensic reports.

---

## 👥 Role-Based Access Control (RBAC) Matrix
The application heavily relies on the `Role` union type defined in `frontend/src/types.ts`.
Each role gets a completely custom, tailor-made dashboard.

**Key Roles Built:**
1. **DEVOPS_ENGINEER**: Manages Kubernetes, CI/CD, cloud costs, live server telemetry, and views specific "Foreign Worker" profiles. Uses a custom collapsible sidebar.
2. **CEO**: High-level macro metrics, company ARR, enterprise growth.
3. **HR_MANAGER / HR_EXECUTIVE**: Employee onboarding, webmail, chat, directory management, and compliance tracking.
4. **MANAGER**: Team oversight and basic metrics.
5. **MARKETING_MANAGER**: Lead management and campaign ROI.
6. **QA_ENGINEER**: Test suites, bug tracking, and automated pipeline metrics.

---

## 🎨 UI/UX Design System & Aesthetics
- **Theme:** "Dark Mode First" with highly vibrant accents (emerald, purple, blue).
- **Core Principles:** Glassmorphism (`backdrop-blur`), subtle glowing shadows (`shadow-brand/20`), micro-animations (Framer Motion page transitions, hover effects), and dense, data-rich dashboards.
- **Icons:** Relies exclusively on `lucide-react`.

---

## 📜 Development Rules & Gotchas
1. **Routing:** Routes are managed in `AppRoutes.jsx`. If a new role is added, ensure it is added to the `isFullScreenRole` array if it requires a custom sidebar (like DevOps), otherwise it will inherit the default top-bar layout.
2. **Icons:** Always use `lucide-react` for icons. Do not use FontAwesome or HeroIcons.
3. **TypeScript:** Always enforce strict typings. If modifying a mock user object (e.g., for `ChatPage`), ensure it satisfies the global `User` interface in `types.ts`.
4. **Git:** This file (`antigravity.md`) is safely ignored in `.gitignore`. It is strictly for AI context persistence.

---

**End of Brain Document.** You may now proceed with the user's request using this context!
