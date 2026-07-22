# WorkSphere Enterprise — Activity Intelligence Platform

Enterprise workforce monitoring, analytics, and management platform with role-based dashboards for 18 roles.

## Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (for user auth & employee data)
- PostgreSQL (for CEO/financial dashboards — optional, falls back to SQLite)

### 1. Frontend (Vite + React)

```bash
cd apps/enterprise-monitoring-system/frontend
npm install
npm run dev
# Opens at http://localhost:3005
```

### 2. Backend (Express + Socket.io)

```bash
cd backend/enterprise-backend
npm install
cp .env.example .env    # Configure your DB connections
npm run dev
# Starts at http://localhost:5001
```

### 3. Login Credentials
- **Super Admin:** `admin@worksphere.com` / `Admin@123`
- **CEO:** `ceo@worksphere.com` / `123456`
- **HR Manager:** `hr@worksphere.com` / `123456`
- **Employee:** `employee@worksphere.com` / `123456`
- 14 more roles available on the login page

---

## Deploying to Production

### Frontend → Vercel

1. Push to GitHub
2. In Vercel, create a new project → import your repo
3. Set **Root Directory** to `apps/enterprise-monitoring-system/frontend`
4. Set **Framework Preset** to `Vite`
5. Add these **Environment Variables**:
   - `VITE_API_BASE_URL` → your backend URL (e.g., `https://your-api.railway.app/api`)
   - `VITE_MAIN_AUTH_API_URL` → same backend URL
   - `VITE_WEBSOCKET_URL` → `wss://your-api.railway.app`
6. Deploy — Vite SPA rewrites are handled automatically by the provided `vercel.json`

### Backend → Railway / Render

1. Create a new Railway/Render project from `backend/enterprise-backend`
2. Set **Build Command:** `npm install && npm run build`
3. Set **Start Command:** `npm start`
4. Add a **MongoDB** add-on (or set `MONGO_URI` env var)
5. Add `JWT_SECRET` environment variable
6. Deploy

### Database Options

| Database | Used For | Hosting |
|----------|----------|---------|
| MongoDB | Users, employees, attendance, leaves | MongoDB Atlas |
| PostgreSQL (via Prisma) | CEO dashboards, finances, OKRs | Railway / Supabase |
| SQLite (local fallback) | Development | Local file (`dev.db`) |

---

## Project Structure

```
apps/enterprise-monitoring-system/frontend/    ← Deploy this to Vercel
  ├── src/pages/LandingPage.tsx                ← Marketing landing page
  ├── src/auth/Login.jsx                       ← Role selection + login
  ├── src/routes/AppRoutes.jsx                 ← All routes + role-based dashboards
  └── src/modules/                             ← 18 role dashboard modules

backend/enterprise-backend/                    ← Deploy this to Railway/Render
  ├── src/server.ts                            ← Express + Socket.io entry
  ├── src/routes/                              ← Auth, HR, CEO, location APIs
  ├── src/services/                            ← Business logic layer
  └── prisma/schema.prisma                     ← Database schema
```
