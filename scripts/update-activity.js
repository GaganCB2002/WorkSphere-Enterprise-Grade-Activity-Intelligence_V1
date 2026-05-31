const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const os = require('os');
const net = require('net');

// Define targets
const rootDir = path.resolve(__dirname, '..');
const activityFile = path.join(rootDir, 'activity.md');

// Helper to check if a TCP port is active (non-blocking)
function checkPort(port, host = '127.0.0.1', timeout = 150) {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    socket.setTimeout(timeout);
    socket.on('connect', () => {
      socket.destroy();
      resolve('🟢 ONLINE');
    });
    socket.on('timeout', () => {
      socket.destroy();
      resolve('🔴 OFFLINE');
    });
    socket.on('error', () => {
      socket.destroy();
      resolve('🔴 OFFLINE');
    });
    socket.connect(port, host);
  });
}

async function main() {
  console.log('🔄 Checking system status and updating activity.md...');

  // 1. Gather System Details
  const now = new Date();
  const formattedTime = now.toLocaleString('en-US', { timeZoneName: 'short' });
  const localTimeStr = now.toISOString().replace('T', ' ').substring(0, 19);
  const username = os.userInfo().username || process.env.USERNAME || 'Unknown User';
  const osInfo = `${os.type()} ${os.release()} (${os.arch()})`;
  const nodeVersion = process.version;

  // 2. Gather Git Details
  let branch = 'N/A';
  let commitHash = 'N/A';
  let commitMsg = 'N/A';
  let commitAuthor = 'N/A';
  let commitDate = 'N/A';
  let changesSummary = 'No changes';
  let hasChanges = false;

  try {
    branch = execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] }).trim();
    commitHash = execSync('git log -1 --format=%h', { encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] }).trim();
    commitMsg = execSync('git log -1 --format=%s', { encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] }).trim();
    commitAuthor = execSync('git log -1 --format=%an', { encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] }).trim();
    commitDate = execSync('git log -1 --format=%ad', { encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] }).trim();
    
    const status = execSync('git status --porcelain', { encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] }).trim();
    if (status) {
      hasChanges = true;
      const count = status.split('\n').filter(Boolean).length;
      changesSummary = `⚠️ Yes (${count} file(s) modified/untracked)`;
    }
  } catch (e) {
    console.log('⚠️ Git information not available or not a git repo.');
  }

  // 3. Scan Port Statuses
  const ports = {
    'Frontend UI (Vite)': { port: 3005, url: 'http://localhost:3005' },
    'Backend Telemetry Server (Express)': { port: 4000, url: 'http://localhost:4000' },
    'Enterprise Backend API (Prisma/Express)': { port: 5001, url: 'http://localhost:5001' },
    'Unified Services Server (Trackinh)': { port: 5002, url: 'http://localhost:5002' }
  };

  const portStatuses = {};
  for (const [name, info] of Object.entries(ports)) {
    portStatuses[name] = await checkPort(info.port);
  }

  // 4. Read existing history log from activity.md if it exists
  let historyRows = [];
  if (fs.existsSync(activityFile)) {
    try {
      const content = fs.readFileSync(activityFile, 'utf8');
      const startMarker = '<!-- START_HISTORY_TABLE -->';
      const endMarker = '<!-- END_HISTORY_TABLE -->';
      
      const startIndex = content.indexOf(startMarker);
      const endIndex = content.indexOf(endMarker);

      if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
        const tableContent = content.substring(startIndex + startMarker.length, endIndex).trim();
        const lines = tableContent.split('\n');
        // Extract existing rows (skip header and separator if they exist)
        for (const line of lines) {
          if (line.trim().startsWith('|') && !line.includes('Date & Time') && !line.includes('---') && !line.includes(':---')) {
            historyRows.push(line.trim());
          }
        }
      }
    } catch (err) {
      console.warn('⚠️ Could not parse existing activity.md history:', err.message);
    }
  }

  // Limit history to last 20 sessions to prevent bloat
  if (historyRows.length > 20) {
    historyRows = historyRows.slice(0, 20);
  }

  // Create the new history row
  const shortCommit = commitHash !== 'N/A' ? `\`${commitHash}\`` : 'N/A';
  const newRow = `| ${localTimeStr} | **${username}** | \`${branch}\` | ${shortCommit} - ${commitMsg.replace(/\|/g, '\\|')} | ${changesSummary} |`;
  
  // Prepend to history
  historyRows.unshift(newRow);

  // 5. Generate entire activity.md content
  const mdContent = `# ⚡ WorkSphere Enterprise — Activity & Project Guide

> **AI-Powered Activity Intelligence Platform for MNC Organizations (5000+ employees)**
> This file is automatically updated every time the project is run or updated.

---

## 🟢 Live Session Status

| Metric | Details |
| :--- | :--- |
| **Last Open / Run Time** | \`${formattedTime}\` |
| **Active OS User** | \`${username}\` |
| **Operating System** | \`${osInfo}\` |
| **Node.js Version** | \`${nodeVersion}\` |
| **Active Git Branch** | \`${branch}\` |
| **Last Commit** | \`${commitHash}\` by **${commitAuthor}** on *${commitDate}* |
| **Commit Message** | \`${commitMsg}\` |
| **Uncommitted Changes** | \`${changesSummary}\` |

### 🔌 Project Services & Ports

| Service | Port | Status | Address |
| :--- | :--- | :--- | :--- |
| **Frontend UI (Vite)** | \`3005\` | ${portStatuses['Frontend UI (Vite)']} | [http://localhost:3005](http://localhost:3005) |
| **Backend Telemetry Server** | \`4000\` | ${portStatuses['Backend Telemetry Server (Express)']} | [http://localhost:4000](http://localhost:4000) |
| **Enterprise Backend API** | \`5001\` | ${portStatuses['Enterprise Backend API (Prisma/Express)']} | [http://localhost:5001](http://localhost:5001) |
| **Unified Services (Trackinh)** | \`5002\` | ${portStatuses['Unified Services Server (Trackinh)']} | [http://localhost:5002](http://localhost:5002) |

---

## 🪵 Project Run & Open History

<!-- START_HISTORY_TABLE -->
| Date & Time | User | Git Branch | Last Commit | Uncommitted Changes? |
| :--- | :--- | :--- | :--- | :--- |
${historyRows.join('\n')}
<!-- END_HISTORY_TABLE -->

---

## 🏛️ System Overview & Architecture

### 7-Tier Architecture Map
\`\`\`
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
\`\`\`

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
1. **Telemetry Server (Node.js/Express):** Port \`4000\`
   - Captures real-time workstation snapshots from desktop agent.
2. **Unified Services (Node.js/Express):** Port \`5002\`
   - Under \`trackinh/\` directory, provides core coordination.
3. **Enterprise Backend API (Node.js/Express/TypeScript/Prisma):** Port \`5001\`
   - Located in \`apps/enterprise-monitoring-system/backend/\`.
   - Utilizes Prisma ORM with PostgreSQL database connection.

### Desktop Agent (Electron)
* Cross-platform tracking runtime.
* Handles active window tracking (\`active-win\`), screenshot utility, malware scan heuristic signatures, and GPS reporting.

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
Managed via Prisma in \`apps/enterprise-monitoring-system/backend/prisma/schema.prisma\`:
* **users**: Credentials, emails, roles.
* **roles** & **permissions**: Enforces the granular RBAC definitions.
* **employees**: Organization structures and records.
* **workstation_telemetry**: Logged active windows, mouse click frequency, keystroke speeds, and screenshot URLs.
* **live_tracking**: Dynamic coordinates mapped to Leaflet fleet views.
* **productivity_analytics**: Burnout, active working hours.
* **forensic_reports**: Document repository for administrative compliance audit trails.
`;

  fs.writeFileSync(activityFile, mdContent, 'utf8');
  console.log(`✅ activity.md updated successfully at: ${activityFile}`);
}

main().catch((err) => {
  console.error('❌ Error executing activity updater:', err);
  process.exit(1);
});
