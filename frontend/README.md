# WorkSphere Frontend

## Structure

| Directory | Source | Description |
|-----------|--------|-------------|
| `enterprise-frontend/` | `apps/enterprise-monitoring-system/frontend/` | React 18 + Vite + Tailwind 4 SPA (35 role-based modules) |
| `nextjs-dashboard/` | `temp_liveguard/apps/dashboard/web/` | Next.js 16.2 App Router variant |
| `desktop-agent/` | `apps/agent/` | Electron desktop monitoring agent |
| `liveguard-agent/` | `apps/liveguard-agent/` | Legacy Electron desktop agent |
| `mobile-app/` | `apps/enterprise-monitoring-system/mobile-app/` | React Native mobile client |

## Tech Stack
- React 18.3, Vite 6, TypeScript 6.0, Tailwind CSS 4.0
- Redux Toolkit 2.5 + Redux Saga
- Recharts 2.15, Leaflet 1.9, Framer Motion 12.38
- Socket.io-client 4.8, Axios 1.16
