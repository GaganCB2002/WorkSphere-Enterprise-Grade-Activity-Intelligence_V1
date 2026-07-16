# 🏢 WorkSphere Enterprise: Frontend Modular Command Ecosystem

Welcome to the frontend application for the **WorkSphere Enterprise-Grade Activity Intelligence Platform**. This is a React, TypeScript, and Vite-powered application designed for multinational organizations to manage employee tracking, telemetry analytics, and department-specific workflows.

---

## 🎯 The WorkSphere Mantra (Mandate)

The core mission of **WorkSphere Enterprise** is to provide a **"Single Pane of Glass"** operational ecosystem. The platform is designed around four key principles:

1. **Role-Tailored Intelligence**: Avoid generic one-size-fits-all dashboards. Every role in the company—from the CEO to an Intern—receives a distinct dashboard fine-tuned to their KPIs, tasks, and data permissions.
2. **Forensic Telemetry & Auditing**: Bridge the gap between low-level system metrics (CPU, memory, geofencing, keystroke velocity) and high-level productivity analytics.
3. **Resilience & Offline Autonomy**: Maintain zero-data-loss capabilities. The system supports full live websocket streaming, and falls back to a high-performance local JSON database when network services or databases are unavailable.
4. **Modern, Arousing Design (The Sahara Theme)**: Elevate workspace tools beyond dry spreadsheets. By using curated design themes like the **Sahara Warm Minimalism** dark mode (`#c2652a` Burnt Sienna accents, `#1a1930` card surfaces, `EB Garamond` for serif headlines, and `Manrope` for body font), the platform turns daily utility into an engaging, visual experience.

---

## 👥 The 18 Enterprise Roles & Modules

WorkSphere implements a robust Role-Based Access Control (RBAC) hierarchy. The 18 active roles in the frontend include:

### 1. Executive Suite
*   **CEO**: Macro-level corporate health, strategic revenue burn rates, overall productivity indicators, and executive privacy-shield management.
*   **CTO**: Global engineering velocity, cloud infrastructure burn rates, service availability metrics, and technical lead review queues.

### 2. Administrative & Security Operations
*   **SUPER_ADMIN**: Root tenant provisioning, master permission assignment matrix, and global security logs.
*   **ADMIN**: Desktop agent telemetry configurations, hardware node discovery, active session overrides, and geofencing management.
*   **SECURITY_ANALYST**: Deep-kernel malware scans, threat quarantining, active network signals, IP anomaly heatmaps, and live signal telemetry consoles.

### 3. Human Resources & Finance
*   **HR_MANAGER**: Headcount telemetry charts, ATS recruitment funnel, leave request verification, and payroll disbursement logs.
*   **HR_EXECUTIVE**: Employee onboarding checkers, check-in compliance logs, and employee grievance ticketing.
*   **FINANCE_MANAGER**: Real-time OPEX/CAPEX budget monitoring, invoice processing, and payroll execution telemetry.

### 4. Technical Development Team
*   **TECH_LEAD**: PR code review grids, daily commit and lines-of-code (LOC) statistics, and squad-wide sprint velocity charts.
*   **DEVOPS_ENGINEER**: Kubernetes pod health grids, CI/CD pipeline deployment logs, and server resource pressure gauges.
*   **SOFTWARE_ENGINEER**: Personal sprint task lists, daily git commit charts, and active workstation hours tracking.
*   **QA_ENGINEER**: Test suite coverage analytics, Selenium/Cypress automation run logs, and active bug ticket boards.

### 5. Sales, Support, & Marketing
*   **SALES_MANAGER**: Regional deal pipelines, ARR/MRR quota trackers, and rep-by-rep deal velocity dashboards.
*   **MARKETING_MANAGER**: Campaign ROI telemetry, Google/Meta ad-spend allocation charts, and MQL/SQL lead generation funnels.
*   **SUPPORT_AGENT**: Support ticket triage tables, SLA compliance gauges, average resolution times (ART), and live-chat customer queues.
*   **EMPLOYEE**: Personal clock-in widgets, task checklists, and individual productivity dashboards.

### 6. Intern & Mentorship Module
*   **INTERN**: Customized learning paths, mentor reviews, task Kanban, and feedback progress logs.

---

## 🧡 The Intern Ecosystem Dashboard: Feature Guide

The Intern Dashboard is styled using the **Sahara Warm Minimalism** dark mode. Its interface consists of 12 integrated pages:

### 1. Dashboard Overview ([InternOverview.tsx](file:///d:/WorkSphere%20Enterprise-Grade%20Activity%20Intelligence/apps/enterprise-monitoring-system/frontend/src/modules/intern/pages/InternOverview.tsx))
*   **Welcome Banner**: Dynamic greeting displaying the current week of the internship and midpoint check-in progress.
*   **Streak Widget**: Shows a visual learning streak flame (e.g. `12` consecutive days) and weekly check-in indicators.
*   **Productivity Charts**: Interactive Recharts area graphs displaying daily active hours, task outputs, and focus scores.
*   **Daily Goals Checklist**: Add, toggle, and manage quick tasks for the day.

### 2. Learning Hub ([LearningHub.tsx](file:///d:/WorkSphere%20Enterprise-Grade%20Activity%20Intelligence/apps/enterprise-monitoring-system/frontend/src/modules/intern/pages/LearningHub.tsx))
*   **Skill Matrix Radar Chart**: Displays visual ratings for engineering, communication, design, leadership, and strategy.
*   **Enrolled Courses**: Visual course cards showing progression badges ("In Progress", "Completed", "Locked") and burnt sienna progress trackers.
*   **AI Recommendations**: Intelligent learning paths (e.g., "Data Storytelling for Leaders") with course counts and hours.

### 3. My Profile ([InternProfile.tsx](file:///d:/WorkSphere%20Enterprise-Grade%20Activity%20Intelligence/apps/enterprise-monitoring-system/frontend/src/modules/intern/pages/InternProfile.tsx))
*   **User Details Grid**: Quick reference info (degree, duration, email, location, manager) styled with Sahara outlines.
*   **Journey Roadmap**: A vertical milestone timeline showing onboarded steps, midpoints, and final project deliveries.
*   **Certifications & Achievements**: Lists earned badges (e.g. "Clean Coder") and credentials.
*   **Resume Downloader**: Instant access to download profile credentials in PDF format.

### 4. Tasks Board ([TaskBoard.tsx](file:///d:/WorkSphere%20Enterprise-Grade%20Activity%20Intelligence/apps/enterprise-monitoring-system/frontend/src/modules/intern/pages/TaskBoard.tsx))
*   **4-Column Kanban**: Columns for *To Do*, *In Progress*, *In Review*, and *Done* cards.
*   **Task Cards**: Details priority markers (High, Medium, Low) in warm gradient labels, checklist counts, and due-dates.
*   **Draggable Interface**: Simulates state transition triggers (`updateTaskStatus`) upon status shifts.
*   **Task Creation Form**: Dialog for adding tasks.

### 5. Mentor & Team ([MentorTeam.tsx](file:///d:/WorkSphere%20Enterprise-Grade%20Activity%20Intelligence/apps/enterprise-monitoring-system/frontend/src/modules/intern/pages/MentorTeam.tsx))
*   **Mentor Spotlight Card**: Display card for assigned mentor containing bio, role, and actions (Schedule meeting, Send chat).
*   **Peer Squad Directory**: Group photo-list showing fellow interns, active departments, and indicators.
*   **Session Scheduler**: Visual time-slot booking card integrated with topic options.

### 6. Attendance & Time Tracking ([AttendanceLeave.tsx](file:///d:/WorkSphere%20Enterprise-Grade%20Activity%20Intelligence/apps/enterprise-monitoring-system/frontend/src/modules/intern/pages/AttendanceLeave.tsx))
*   **Live Clock Widget**: High-fidelity clock displaying active status, check-in logs, and a real-time elapsed timer.
*   **Time Statistics**: Visual cards tracking Present days, Average hours, and Leave balances.
*   **Monthly Calendar Grid**: Compact visual grid marking presence, half-days, and holidays.
*   **Leave Application Manager**: Form to submit leave requests and track historic approvals.

### 7. Projects Workspace ([ProjectWorkspace.tsx](file:///d:/WorkSphere%20Enterprise-Grade%20Activity%20Intelligence/apps/enterprise-monitoring-system/frontend/src/modules/intern/pages/ProjectWorkspace.tsx))
*   **Active Project Spotlight**: Displays current deliverables, milestones, and progress bars.
*   **Initiative Roadmaps**: Stages (Planning, Dev, QA, Deployment) with visual check indicators.
*   **Blocker Board**: Warns of unresolved code repository conflicts and technical blockers.
*   **Repository Access Link**: Custom action buttons directing to GitHub repos and staging domains.

### 8. Evaluations Hub ([Evaluations.tsx](file:///d:/WorkSphere%20Enterprise-Grade%20Activity%20Intelligence/apps/enterprise-monitoring-system/frontend/src/modules/intern/pages/Evaluations.tsx))
*   **Competency Scores**: Detailed bar-graph indicators mapping communication, engineering, and teamwork skills.
*   **Feedback Review Logs**: Chronological review meeting logs highlighting mentor comments and star-ratings.
*   **Assigned Growth Goals**: Checklist of concrete action-items assigned by the mentor.

### 9. Chat & Messaging ([InternChat.tsx](file:///d:/WorkSphere%20Enterprise-Grade%20Activity%20Intelligence/apps/enterprise-monitoring-system/frontend/src/modules/intern/pages/InternChat.tsx))
*   **Active Contacts Sidebar**: Fast switching between Mentors, Admin Support, and Peers.
*   **Sahara Chat Bubbles**: Modern dark chat history area using burnt sienna background for the user's messages and charcoal slate for incoming messages.
*   **Typing Bubble & Attachments**: Micro-animations for live typing signals.

### 10. Settings & Security ([InternSettings.tsx](file:///d:/WorkSphere%20Enterprise-Grade%20Activity%20Intelligence/apps/enterprise-monitoring-system/frontend/src/modules/intern/pages/InternSettings.tsx))
*   **Categorized Panel Tabs**: Personal info forms, security password controls, and notification preferences.
*   **Custom Toggle Toggles**: Built-in toggle indicators for email subscriptions, slack Webhooks, and push alerts.

### 11. HR / Admin Portal ([AdminDashboard.tsx](file:///d:/WorkSphere%20Enterprise-Grade%20Activity%20Intelligence/apps/enterprise-monitoring-system/frontend/src/modules/intern/pages/AdminDashboard.tsx))
*   **Administrative Stats**: Tracking headcount, overall scores, and project delivery indexes.
*   **Directory Roster Roster**: Renders interns in a table format with search, department filtering, and status badges.
*   **Funnel Stage Indicators**: High-level visual indicators showing the distribution of candidates from Application to Active and Alumni stages.

### 12. Knowledge Base ([KnowledgeBase.tsx](file:///d:/WorkSphere%20Enterprise-Grade%20Activity%20Intelligence/apps/enterprise-monitoring-system/frontend/src/modules/intern/pages/KnowledgeBase.tsx))
*   **Smart Document Search**: Search bar with category filter tag rows.
*   **Resource Preview Cards**: List items showing resource titles, reading times, tags, and summary contents.
*   **Preview Modal**: Visual popup box for reading guides and policy sheets directly.

---

## 🛠️ Technology Stack (Frontend)

*   **Runtime Environment**: Node.js v18+
*   **Framework & Language**: React 18 & TypeScript
*   **Build Bundler**: Vite 6.1 (strict mode, custom configuration)
*   **Styling Engine**: TailwindCSS 4.0 & PostCSS
*   **State Management**: React Redux Toolkit, Redux Saga, and Context API
*   **Routing**: React Router DOM (v7)
*   **Data Visualization**: Recharts (fully responsive SVG and Canvas charting)
*   **HTTP & Real-Time Sync**: Axios (with interceptors) & Socket.io Client
