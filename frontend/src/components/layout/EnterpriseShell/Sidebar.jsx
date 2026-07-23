import { useState, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const roleNavMap = {
  SUPER_ADMIN: ['Dashboard', 'Employees', 'Attendance', 'Payroll', 'Recruitment', 'Projects', 'Assets', 'Compliance', 'Performance', 'Reports', 'Administration', 'Settings'],
  ADMIN: ['Dashboard', 'Employees', 'Attendance', 'Payroll', 'Recruitment', 'Projects', 'Assets', 'Compliance', 'Performance', 'Reports', 'Administration', 'Settings'],
  CEO: ['Dashboard', 'Employees', 'Finance', 'Projects', 'Reports', 'Performance', 'Analytics'],
  CTO: ['Dashboard', 'Engineering', 'Projects', 'DevOps', 'Analytics', 'Reports'],
  HR_MANAGER: ['Dashboard', 'Employees', 'Attendance', 'Payroll', 'Recruitment', 'Leave', 'Performance', 'Reports'],
  HR_EXECUTIVE: ['Dashboard', 'Employees', 'Attendance', 'Leave', 'Payroll', 'Recruitment'],
  FINANCE_MANAGER: ['Dashboard', 'Payroll', 'Budget', 'Expenses', 'Tax', 'Reports'],
  MARKETING_MANAGER: ['Dashboard', 'Campaigns', 'Analytics', 'Content', 'Reports'],
  SALES_MANAGER: ['Dashboard', 'Pipeline', 'Clients', 'Revenue', 'Reports'],
  PROJECT_MANAGER: ['Dashboard', 'Projects', 'Tasks', 'Team', 'Timeline'],
  TECH_LEAD: ['Dashboard', 'Sprints', 'Code Reviews', 'Team', 'DevOps', 'Analytics'],
  DEVOPS_ENGINEER: ['Dashboard', 'CI/CD', 'Infrastructure', 'Monitoring', 'Security'],
  QA_ENGINEER: ['Dashboard', 'Test Plans', 'Test Runs', 'Bugs', 'Automation'],
  SOFTWARE_ENGINEER: ['Dashboard', 'Tasks', 'Pull Requests', 'Sprints'],
  SECURITY_ANALYST: ['Dashboard', 'Threats', 'Audit Logs', 'Vulnerabilities', 'Compliance'],
  SUPPORT_AGENT: ['Dashboard', 'Tickets', 'Knowledge Base', 'SLA'],
  EMPLOYEE: ['EMPLOYEE HUB', 'Help Desk', 'Settings'],
  INTERN: ['Dashboard', 'Tasks', 'Learning', 'Attendance'],
}

const navIcons = {
  'Team Chat': 'M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z',
  Documents: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
  Travel: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064',
  Notifications: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9',
  'Help Desk': 'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z',

  Dashboard: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
  Employees: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
  Attendance: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
  Payroll: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  Recruitment: 'M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z',
  Projects: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z',
  Assets: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
  Compliance: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
  Performance: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
  Reports: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
  Administration: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
  Settings: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
  Finance: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  Engineering: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
  'DevOps': 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4',
  Leave: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
  Budget: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  Expenses: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z',
  Tax: 'M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z',
  Campaigns: 'M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z',
  Content: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z',
  Pipeline: 'M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z',
  Clients: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
  Revenue: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
  Sprints: 'M13 10V3L4 14h7v7l9-11h-7z',
  'Code Reviews': 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z',
  Team: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
  Timeline: 'M9 5l7 7-7 7',
  Analytics: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
  'CI/CD': 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
  Infrastructure: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
  Monitoring: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',
  Security: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
  'Test Plans': 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
  'Test Runs': 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
  Bugs: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z',
  Automation: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
  Tasks: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4',
  'Pull Requests': 'M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z',
  Threats: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z',
  'Audit Logs': 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
  Vulnerabilities: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
  'Knowledge Base': 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
  SLA: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
  Profile: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
  Learning: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
  'Org Chart': 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064',
  'Employee Directory': 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
  'Employee Profile': 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
  'User Management': 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
  'RBAC Matrix': 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
  'AI & System Configuration': 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
  'Global Tracking': 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
  'Activity Reports': 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
  Calendar: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
  Chat: 'M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z',
  Email: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
  Training: 'M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z',
  'Leave Management': 'M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4m14-8l-5 5-3-3m-5-4h14a2 2 0 012 2v3H3V6a2 2 0 012-2z',
}

const navGroups = [
  {
    label: 'EMPLOYEE HUB',
    icon: navIcons.Dashboard,
    items: [
      { label: 'Dashboard', path: '/employee/dashboard' },
      { label: 'Leave Management', path: '/employee/leave' },
      { label: 'Attendance', path: '/employee/attendance' },
      { label: 'Tasks', path: '/employee/tasks' },
      { label: 'Calendar', path: '/employee/calendar' },
      { label: 'Chat', path: '/employee/chat' },
      { label: 'Email', path: '/employee/email' },
      { label: 'Documents', path: '/employee/documents' },
      { label: 'Training', path: '/employee/training' },
      { label: 'Performance', path: '/employee/performance' },
      { label: 'Notifications', path: '/employee/notifications' },
    ]
  },

  {
    label: 'Employees',
    icon: navIcons.Employees,
    items: [
      { label: 'Employee Directory', path: '/employees/directory' },
      { label: 'Employee Profile', path: '/employees/profile' },
      { label: 'User Management', path: '/employees/users' },
      { label: 'RBAC Matrix', path: '/employees/rbac' },
      { label: 'Global Tracking', path: '/employees/tracking' },
      { label: 'Activity Reports', path: '/employees/reports' },
      { label: 'Audit Logs', path: '/employees/audit' },
      { label: 'AI & System Configuration', path: '/employees/ai-config' },
    ]
  },
  {
    label: 'Attendance',
    icon: navIcons.Attendance,
    items: [
      { label: 'Live Attendance', path: '/attendance/live' },
      { label: 'Shifts', path: '/attendance/shifts' },
      { label: 'Leave Management', path: '/attendance/leave' },
    ]
  },
  {
    label: 'Recruitment',
    icon: navIcons.Recruitment,
    items: [
      { label: 'Candidates', path: '/recruitment/candidates' },
      { label: 'Interviews', path: '/recruitment/interviews' },
      { label: 'Job Openings', path: '/recruitment/jobs' },
    ]
  },
  {
    label: 'Payroll',
    icon: navIcons.Payroll,
    items: [
      { label: 'Salary', path: '/payroll/salary' },
      { label: 'Payslips', path: '/payroll/payslips' },
      { label: 'Tax', path: '/payroll/tax' },
    ]
  },
  {
    label: 'Projects',
    icon: navIcons.Projects,
    items: [
      { label: 'Projects', path: '/projects/list' },
      { label: 'Tasks', path: '/projects/tasks' },
      { label: 'Sprint Board', path: '/projects/sprint-board' },
    ]
  },
  {
    label: 'Assets',
    icon: navIcons.Assets,
    items: [
      { label: 'Inventory', path: '/assets/inventory' },
      { label: 'Devices', path: '/assets/devices' },
      { label: 'Licenses', path: '/assets/licenses' },
    ]
  },
  {
    label: 'Compliance',
    icon: navIcons.Compliance,
    items: [
      { label: 'Policies', path: '/compliance/policies' },
      { label: 'Documents', path: '/compliance/documents' },
      { label: 'Audit Center', path: '/compliance/audit' },
    ]
  },
  {
    label: 'Performance',
    icon: navIcons.Performance,
    items: [
      { label: 'Reviews', path: '/performance/reviews' },
      { label: 'KPIs', path: '/performance/kpis' },
      { label: 'Analytics', path: '/performance/analytics' },
    ]
  },
  {
    label: 'Administration',
    icon: navIcons.Administration,
    items: [
      { label: 'Company Settings', path: '/admin/settings' },
      { label: 'Roles', path: '/admin/roles' },
      { label: 'Permissions', path: '/admin/permissions' },
      { label: 'Security', path: '/admin/security' },
      { label: 'AI Configuration', path: '/admin/ai-config' },
      { label: 'System Logs', path: '/admin/system-logs' },
    ]
  }
]

const pinLabels = []

export default function Sidebar({ collapsed, onToggle }) {
  const user = useSelector(state => state.auth.user)
  const location = useLocation()
  const navigate = useNavigate()
  const role = user?.role || 'EMPLOYEE'
  const allowedNav = roleNavMap[role] || roleNavMap.EMPLOYEE
  const [quickActionsExpanded, setQuickActionsExpanded] = useState(true)
  const [expandedGroups, setExpandedGroups] = useState(() => {
    const initial = {}
    navGroups.forEach(g => { initial[g.label] = true })
    return initial
  })
  const [pinned, setPinned] = useState(() => {
    try { return JSON.parse(localStorage.getItem('sidebarPinned') || '[]') }
    catch { return [] }
  })

  const toggleGroup = useCallback((label) => {
    setExpandedGroups(prev => ({ ...prev, [label]: !prev[label] }))
  }, [])

  const togglePinned = useCallback((label) => {
    setPinned(prev => {
      const next = prev.includes(label) ? prev.filter(p => p !== label) : [...prev, label]
      localStorage.setItem('sidebarPinned', JSON.stringify(next))
      return next
    })
  }, [])

  const visibleItems = navGroups.filter(g => role === 'SUPER_ADMIN' || role === 'ADMIN' || allowedNav.includes(g.label))
  const pinnedItems = pinLabels.filter(l => pinned.includes(l))

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/')
  }

  const handleActionClick = (actionName, targetPath) => {
    if (targetPath) {
      navigate(targetPath)
    } else {
      alert(`Action Triggered: ${actionName}`)
    }
  }

  return (
    <motion.aside
      initial={{ x: -12, opacity: 0 }}
      animate={{ 
        x: 0, 
        opacity: 1, 
        width: collapsed ? 'var(--color-sidebar-width-collapsed, 64px)' : 'var(--color-sidebar-width, 240px)' 
      }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="flex-shrink-0 flex flex-col bg-sidebar-bg h-full overflow-hidden border-r border-sidebar-border relative"
      style={{ backgroundColor: 'var(--color-sidebar-bg)' }}
    >
      {/* Logo */}
      <div className="flex items-center h-14 px-4 border-b border-sidebar-border flex-shrink-0">
        {!collapsed && (
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-7 h-7 rounded bg-[var(--color-brand-500)] flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-sm font-semibold tracking-tight text-white whitespace-nowrap">WorkSphere</span>
          </div>
        )}
        {collapsed && (
          <div className="w-full flex justify-center">
            <div className="w-7 h-7 rounded bg-[var(--color-brand-500)] flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* Collapse toggle */}
      <button
        onClick={onToggle}
        className="flex items-center justify-center h-8 mx-2 mt-2 rounded hover:bg-sidebar-item-hover text-sidebar-text transition-colors duration-150 flex-shrink-0"
        title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        <svg className={`w-4 h-4 transition-transform duration-200 ${collapsed ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
        </svg>
      </button>

      {/* Pinned favorites */}
      {!collapsed && pinnedItems.length > 0 && (
        <div className="px-3 pt-3 pb-1 flex-shrink-0">
          <div className="flex items-center gap-1 px-2 mb-1">
            <svg className="w-3 h-3 text-sidebar-text opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            <span className="text-[11px] font-medium uppercase tracking-wider text-sidebar-text opacity-50">Pinned</span>
          </div>
          {pinnedItems.map(label => (
            <SidebarItem
              key={label}
              label={label}
              icon={navIcons[label]}
              active={isActive(label)}
              collapsed={collapsed}
              onPin={() => togglePinned(label)}
              isPinned={true}
            />
          ))}
          <div className="border-t border-sidebar-border my-1" />
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-2 pb-4 scrollbar-thin space-y-1">
        
        {/* Top-level Dashboard Item */}
        <div className="mt-2">
          <SidebarItem
            label="Dashboard"
            icon={navIcons.Dashboard}
            active={location.pathname === '/' || location.pathname === '/dashboard'}
            collapsed={collapsed}
            to="/dashboard"
            badge="Page"
          />
        </div>

        {/* Quick Pages below Dashboard: Tasks & Pull Requests */}
        <div className="space-y-0.5">
          <SidebarItem
            label="Tasks"
            icon={navIcons.Tasks}
            active={location.pathname.includes('/tasks')}
            collapsed={collapsed}
            to="/projects/tasks"
            badge="Page"
          />
          <SidebarItem
            label="Pull Requests"
            icon={navIcons['Pull Requests']}
            active={location.pathname.includes('/sprint-board') || location.pathname.includes('/reviews')}
            collapsed={collapsed}
            to="/projects/sprint-board"
            badge="Page"
          />
        </div>

        {/* Quick Actions Section (Below Dashboard & Quick Pages) */}
        <div className="my-2 pt-2 border-t border-sidebar-border/60">
          {!collapsed ? (
            <button
              onClick={() => setQuickActionsExpanded(!quickActionsExpanded)}
              className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider text-indigo-400 hover:bg-sidebar-item-hover transition-colors"
            >
              <div className="flex items-center gap-2">
                <svg className="w-3.5 h-3.5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>Quick Actions</span>
              </div>
              <svg
                className={`w-3.5 h-3.5 text-sidebar-text opacity-60 transition-transform duration-200 ${quickActionsExpanded ? 'rotate-180' : ''}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          ) : (
            <div className="flex justify-center py-1">
              <svg className="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          )}

          <AnimatePresence>
            {(quickActionsExpanded || collapsed) && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mt-1 space-y-0.5"
              >
                {[
                  { label: 'Create employee', icon: 'M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z', target: '/employees/directory' },
                  { label: 'Generate report', icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', target: '/employees/reports' },
                  { label: 'Submit leave request', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', target: '/employee/leave' },
                  { label: 'Create project', icon: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z', target: '/projects/list' },
                ].map((act, i) => (
                  <button
                    key={i}
                    onClick={() => handleActionClick(act.label, act.target)}
                    className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-indigo-600/20 transition-all text-left ${collapsed ? 'justify-center px-0' : ''}`}
                    title={act.label}
                  >
                    <svg className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={act.icon} />
                    </svg>
                    {!collapsed && (
                      <span className="truncate flex-1 flex items-center justify-between">
                        {act.label}
                        <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                          Action
                        </span>
                      </span>
                    )}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="border-t border-sidebar-border/60 my-2" />

        {/* Existing Navigation Groups */}
        {visibleItems.map(group => (
          <div key={group.label} className="mb-1">
            {!collapsed ? (
              <button
                onClick={() => toggleGroup(group.label)}
                className={`group/btn w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${expandedGroups[group.label] ? 'bg-sidebar-item-hover' : 'hover:bg-sidebar-item-hover'}`}
              >
                <div className="flex items-center gap-3">
                  <svg className={`w-4 h-4 text-[var(--color-brand-400)] opacity-80`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={group.icon || navIcons.Employees} />
                  </svg>
                  <span className={`text-sm font-medium ${expandedGroups[group.label] ? 'text-white' : 'text-sidebar-text'}`}>
                    {group.label}
                  </span>
                </div>
                <svg
                  className={`w-4 h-4 text-sidebar-text opacity-50 transition-transform duration-200 ${expandedGroups[group.label] ? 'rotate-180' : ''}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            ) : (
               <div className="flex justify-center py-2 relative group/tooltip cursor-pointer" onClick={() => toggleGroup(group.label)}>
                  <svg className={`w-5 h-5 text-[var(--color-brand-400)] opacity-80`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={group.icon || navIcons.Employees} />
                  </svg>
               </div>
            )}
            
            <AnimatePresence>
              {expandedGroups[group.label] && !collapsed && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="pl-9 pr-2 py-1 space-y-0.5">
                    {group.items.map(item => (
                      <SidebarChildItem
                        key={item.path}
                        label={item.label}
                        icon={navIcons[item.label] || navIcons.Dashboard}
                        active={isActive(item.path)}
                        collapsed={collapsed}
                        to={item.path}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </nav>

      {/* User section */}
      {!collapsed && (
        <div className="border-t border-sidebar-border p-3 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-[var(--color-brand-600)] flex items-center justify-center text-[11px] font-medium text-white flex-shrink-0">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-medium text-white truncate">{user?.name || 'User'}</div>
              <div className="text-[11px] text-sidebar-text opacity-60 truncate">{role}</div>
            </div>
          </div>
        </div>
      )}
    </motion.aside>
  )
}

function SidebarItem({ label, icon, active, collapsed, onPin, isPinned, to, badge }) {
  const path = to || `/${label.toLowerCase().replace(/\s+/g, '-')}`

  return (
    <NavLink
      to={path}
      end={path === '/employees'}
      className={`group relative flex items-center gap-2.5 px-2 py-1.5 rounded text-sm transition-all duration-150 ${active
        ? 'text-white font-medium bg-indigo-600/20'
        : 'text-sidebar-text hover:bg-sidebar-item-hover hover:text-sidebar-text-hover'
      } ${collapsed ? 'justify-center mx-0' : 'mx-0'}`}
      title={label}
    >
      {active && (
        <motion.div
          layoutId="sidebarActiveIndicator"
          className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 bg-brand-500 rounded-r-full"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
      <motion.div
        animate={active ? { scale: 1.05 } : { scale: 1 }}
        transition={{ duration: 0.15 }}
        className="flex-shrink-0 z-10"
      >
        <svg className={`w-4 h-4 ${active ? 'text-[var(--color-brand-400)]' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={active ? 2 : 1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
        </svg>
      </motion.div>
      
      <AnimatePresence>
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "auto" }}
            exit={{ opacity: 0, width: 0 }}
            className="flex flex-1 items-center justify-between overflow-hidden"
          >
            <span className="truncate flex-1">{label}</span>
            {badge && (
              <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 border border-slate-700">
                {badge}
              </span>
            )}
            {onPin && (
              <button
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); onPin?.() }}
                className={`ml-auto opacity-0 group-hover:opacity-100 transition-opacity ${isPinned ? 'text-[var(--color-warning-400)]' : 'text-sidebar-text opacity-30'} hover:opacity-100`}
                title={isPinned ? 'Unpin' : 'Pin to favorites'}
              >
                <svg className="w-3 h-3" fill={isPinned ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </NavLink>
  )
}

function SidebarChildItem({ label, icon, active, collapsed, to }) {
  return (
    <NavLink
      to={to}
      end
      className={`group relative flex items-center gap-2.5 px-3 py-1.5 rounded-md text-[13px] transition-all duration-150 ${active
        ? 'text-white font-medium bg-brand-500/10 text-brand-400'
        : 'text-sidebar-text hover:bg-sidebar-item-hover hover:text-sidebar-text-hover'
      }`}
      title={label}
    >
      {active && (
        <motion.div
          layoutId="sidebarChildActiveIndicator"
          className="absolute -left-3 top-1/2 -translate-y-1/2 w-1 h-1 bg-brand-500 rounded-full"
        />
      )}
      
      <AnimatePresence>
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "auto" }}
            exit={{ opacity: 0, width: 0 }}
            className="text-xs truncate"
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </NavLink>
  )
}
