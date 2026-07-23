import { useState, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const roleNavMap = {
  SUPER_ADMIN: ['Dashboard', 'Employees', 'Attendance', 'Payroll', 'Recruitment', 'Projects', 'Assets', 'Compliance', 'Performance', 'Reports', 'Administration', 'Settings'],
  ADMIN: ['Dashboard', 'Employees', 'Attendance', 'Payroll', 'Recruitment', 'Projects', 'Assets', 'Compliance', 'Performance', 'Reports', 'Administration', 'Settings'],
  CEO: ['Dashboard', 'Employees', 'Finance', 'Projects', 'Reports', 'Performance', 'Analytics'],
  CTO: ['CTO Dashboard', 'Engineering', 'Software Delivery', 'Projects', 'Architecture', 'Infrastructure', 'Cloud Operations', 'Monitoring', 'Cyber Security', 'DevOps', 'AI Platform', 'Data Platform', 'Technology Finance', 'Innovation', 'Vendor Management', 'Reports', 'Approvals', 'Meetings', 'Notifications', 'Settings'],
  HR_MANAGER: ['Dashboard', 'Employees', 'Attendance', 'Payroll', 'Recruitment', 'Leave', 'Performance', 'Reports'],
  HR_EXECUTIVE: ['Dashboard', 'Employees', 'Attendance', 'Leave', 'Payroll', 'Recruitment'],
  FINANCE_MANAGER: ['Dashboard', 'Payroll', 'Budget', 'Expenses', 'Tax', 'Reports'],
  MARKETING_MANAGER: ['Dashboard', 'Campaigns', 'Analytics', 'Content', 'Reports'],
  SALES_MANAGER: ['Dashboard', 'Pipeline', 'Clients', 'Revenue', 'Reports'],
  PROJECT_MANAGER: ['Dashboard', 'Projects', 'Tasks', 'Team', 'Timeline'],
  TECH_LEAD: ['Tech Lead Dashboard', 'Engineering Overview', 'Team Management', 'Sprint Management', 'Task Management', 'Projects', 'Code Management', 'CI/CD', 'Infrastructure', 'Engineering Analytics', 'AI Assistant', 'Documentation', 'Meetings', 'Team Chat', 'Live Monitoring', 'Reports', 'Notifications', 'Settings'],
  DEVOPS_ENGINEER: ['Dashboard', 'CI/CD', 'Infrastructure', 'Monitoring', 'Security'],
  QA_ENGINEER: ['Dashboard', 'Test Plans', 'Test Runs', 'Bugs', 'Automation'],
  SOFTWARE_ENGINEER: ['Dashboard', 'Tasks', 'Pull Requests', 'Sprints'],
  SECURITY_ANALYST: ['Dashboard', 'Threats', 'Audit Logs', 'Vulnerabilities', 'Compliance'],
  SUPPORT_AGENT: ['Dashboard', 'Tickets', 'Knowledge Base', 'SLA'],
  EMPLOYEE: ['EMPLOYEE HUB', 'Help Desk', 'Settings'],
  INTERN: ['Intern Dashboard', 'My Profile', 'Attendance', 'Leave', 'Learning Center', 'Tasks', 'Projects', 'Mentorship', 'Knowledge Base', 'Documents', 'Performance', 'Team', 'Communication', 'Meetings', 'Help Desk', 'Notifications', 'Reports', 'Settings'],
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
    label: 'CTO Dashboard',
    icon: navIcons.Dashboard,
    ctoOnly: true,
    items: [
      { label: 'Executive Overview', path: '/cto/executive-overview' },
    ]
  },
  {
    label: 'Engineering',
    icon: navIcons.Engineering,
    ctoOnly: true,
    items: [
      { label: 'Engineering Overview', path: '/cto/engineering' },
      { label: 'Team Performance', path: '/cto/team-performance' },
      { label: 'Engineering Analytics', path: '/cto/engineering-analytics' },
      { label: 'Sprint Dashboard', path: '/cto/sprint-dashboard' },
      { label: 'Code Quality', path: '/cto/code-quality' },
      { label: 'Code Coverage', path: '/cto/code-coverage' },
      { label: 'Technical Debt', path: '/cto/technical-debt' },
    ]
  },
  {
    label: 'Software Delivery',
    icon: navIcons['CI/CD'],
    ctoOnly: true,
    items: [
      { label: 'Releases', path: '/cto/releases' },
      { label: 'CI/CD Pipelines', path: '/cto/cicd-pipelines' },
      { label: 'Deployments', path: '/cto/deployments' },
      { label: 'Build Status', path: '/cto/build-status' },
      { label: 'Rollbacks', path: '/cto/rollbacks' },
      { label: 'Release Calendar', path: '/cto/release-calendar' },
    ]
  },
  {
    label: 'Projects',
    icon: navIcons.Projects,
    ctoOnly: true,
    items: [
      { label: 'Active Projects', path: '/cto/active-projects' },
      { label: 'Project Portfolio', path: '/cto/project-portfolio' },
      { label: 'Sprint Board', path: '/cto/sprint-board' },
      { label: 'Roadmap', path: '/cto/roadmap' },
      { label: 'Milestones', path: '/cto/milestones' },
      { label: 'Resource Allocation', path: '/cto/resource-allocation' },
    ]
  },
  {
    label: 'Architecture',
    icon: navIcons.Infrastructure,
    ctoOnly: true,
    items: [
      { label: 'System Architecture', path: '/cto/system-architecture' },
      { label: 'Microservices', path: '/cto/microservices' },
      { label: 'API Gateway', path: '/cto/api-gateway' },
      { label: 'Service Dependencies', path: '/cto/service-dependencies' },
      { label: 'Database Architecture', path: '/cto/database-architecture' },
    ]
  },
  {
    label: 'Infrastructure',
    icon: navIcons.Infrastructure,
    ctoOnly: true,
    items: [
      { label: 'Servers', path: '/cto/servers' },
      { label: 'Kubernetes', path: '/cto/kubernetes' },
      { label: 'Docker', path: '/cto/docker' },
      { label: 'Virtual Machines', path: '/cto/virtual-machines' },
      { label: 'Storage', path: '/cto/storage' },
      { label: 'Network', path: '/cto/network' },
    ]
  },
  {
    label: 'Cloud Operations',
    icon: navIcons.Monitoring,
    ctoOnly: true,
    items: [
      { label: 'AWS', path: '/cto/cloud/aws' },
      { label: 'Azure', path: '/cto/cloud/azure' },
      { label: 'Google Cloud', path: '/cto/cloud/gcp' },
      { label: 'Cloud Cost', path: '/cto/cloud-cost' },
      { label: 'Auto Scaling', path: '/cto/auto-scaling' },
      { label: 'Backup & Recovery', path: '/cto/backup-recovery' },
    ]
  },
  {
    label: 'Monitoring',
    icon: navIcons.Monitoring,
    ctoOnly: true,
    items: [
      { label: 'System Health', path: '/cto/system-health' },
      { label: 'Application Health', path: '/cto/application-health' },
      { label: 'Uptime', path: '/cto/uptime' },
      { label: 'Performance', path: '/cto/performance' },
      { label: 'Error Logs', path: '/cto/error-logs' },
      { label: 'Alert Center', path: '/cto/alert-center' },
    ]
  },
  {
    label: 'Cyber Security',
    icon: navIcons.Security,
    ctoOnly: true,
    items: [
      { label: 'Security Dashboard', path: '/cto/security-dashboard' },
      { label: 'Vulnerabilities', path: '/cto/vulnerabilities' },
      { label: 'Threat Intelligence', path: '/cto/threat-intelligence' },
      { label: 'SIEM', path: '/cto/siem' },
      { label: 'Audit Logs', path: '/cto/audit-logs' },
      { label: 'Zero Trust', path: '/cto/zero-trust' },
    ]
  },
  {
    label: 'DevOps',
    icon: navIcons['DevOps'],
    ctoOnly: true,
    items: [
      { label: 'CI/CD', path: '/cto/devops/cicd' },
      { label: 'Infrastructure as Code', path: '/cto/infrastructure-as-code' },
      { label: 'Automation', path: '/cto/automation' },
      { label: 'Containers', path: '/cto/containers' },
      { label: 'Secrets Management', path: '/cto/secrets-management' },
    ]
  },
  {
    label: 'AI Platform',
    icon: navIcons['AI & System Configuration'],
    ctoOnly: true,
    items: [
      { label: 'AI Models', path: '/cto/ai-models' },
      { label: 'LLM Configuration', path: '/cto/llm-configuration' },
      { label: 'AI Analytics', path: '/cto/ai-analytics' },
      { label: 'Prompt Management', path: '/cto/prompt-management' },
      { label: 'GPU Usage', path: '/cto/gpu-usage' },
      { label: 'AI Cost', path: '/cto/ai-cost' },
    ]
  },
  {
    label: 'Data Platform',
    icon: navIcons.Infrastructure,
    ctoOnly: true,
    items: [
      { label: 'Databases', path: '/cto/databases' },
      { label: 'Data Warehouse', path: '/cto/data-warehouse' },
      { label: 'ETL Jobs', path: '/cto/etl-jobs' },
      { label: 'Backup Status', path: '/cto/backup-status' },
      { label: 'Data Quality', path: '/cto/data-quality' },
    ]
  },
  {
    label: 'Technology Finance',
    icon: navIcons.Finance,
    ctoOnly: true,
    items: [
      { label: 'Cloud Billing', path: '/cto/cloud-billing' },
      { label: 'Software Licenses', path: '/cto/software-licenses' },
      { label: 'Infrastructure Cost', path: '/cto/infrastructure-cost' },
      { label: 'Vendor Contracts', path: '/cto/vendor-contracts' },
    ]
  },
  {
    label: 'Innovation',
    icon: navIcons['R&D'] || navIcons.Dashboard,
    ctoOnly: true,
    items: [
      { label: 'R&D', path: '/cto/rd' },
      { label: 'Proof of Concepts', path: '/cto/proof-of-concepts' },
      { label: 'Technology Roadmap', path: '/cto/technology-roadmap' },
      { label: 'Emerging Technologies', path: '/cto/emerging-technologies' },
    ]
  },
  {
    label: 'Vendor Management',
    icon: navIcons.Clients,
    ctoOnly: true,
    items: [
      { label: 'Vendors', path: '/cto/vendors' },
      { label: 'Contracts', path: '/cto/contracts' },
      { label: 'Renewals', path: '/cto/renewals' },
      { label: 'SLA', path: '/cto/sla' },
    ]
  },
  {
    label: 'Reports',
    icon: navIcons.Reports,
    ctoOnly: true,
    items: [
      { label: 'Executive Reports', path: '/cto/executive-reports' },
      { label: 'Engineering Reports', path: '/cto/engineering-reports' },
      { label: 'Infrastructure Reports', path: '/cto/infrastructure-reports' },
      { label: 'Cost Reports', path: '/cto/cost-reports' },
      { label: 'Security Reports', path: '/cto/security-reports' },
    ]
  },
  {
    label: 'Approvals',
    icon: navIcons['Compliance'] || navIcons.Dashboard,
    ctoOnly: true,
    items: [
      { label: 'Infrastructure Requests', path: '/cto/infrastructure-requests' },
      { label: 'Production Deployments', path: '/cto/production-deployments' },
      { label: 'Software Purchases', path: '/cto/software-purchases' },
      { label: 'Cloud Budget Requests', path: '/cto/cloud-budget-requests' },
    ]
  },
  {
    label: 'Meetings',
    icon: navIcons['Calendar'] || navIcons.Dashboard,
    ctoOnly: true,
    items: [
      { label: 'Engineering Meetings', path: '/cto/engineering-meetings' },
      { label: 'Architecture Reviews', path: '/cto/architecture-reviews' },
      { label: 'Sprint Planning', path: '/cto/sprint-planning' },
      { label: 'Executive Meetings', path: '/cto/executive-meetings' },
    ]
  },
  {
    label: 'Notifications',
    icon: navIcons.Notifications,
    ctoOnly: true,
    items: [
      { label: 'Notifications', path: '/cto/notifications' },
    ]
  },
  {
    label: 'Settings',
    icon: navIcons.Settings,
    ctoOnly: true,
    items: [
      { label: 'Settings', path: '/cto/settings' },
    ]
  },
  {
    label: 'Tech Lead Dashboard',
    icon: navIcons.Dashboard,
    items: [
      { label: 'Home Dashboard', path: '/tech-lead/dashboard' },
      { label: 'Live Dashboard', path: '/tech-lead/live' },
    ]
  },
  {
    label: 'Engineering Overview',
    icon: navIcons.Engineering,
    items: [
      { label: 'Engineering Overview', path: '/tech-lead/engineering' },
    ]
  },
  {
    label: 'Team Management',
    icon: navIcons.Team,
    items: [
      { label: 'Team Members', path: '/tech-lead/team/members' },
      { label: 'Team Availability', path: '/tech-lead/team/availability' },
      { label: 'Workload', path: '/tech-lead/team/workload' },
      { label: 'Team Performance', path: '/tech-lead/team/performance' },
    ]
  },
  {
    label: 'Sprint Management',
    icon: navIcons['Sprints'],
    items: [
      { label: 'Sprint Board', path: '/tech-lead/sprints/board' },
      { label: 'Backlog', path: '/tech-lead/sprints/backlog' },
      { label: 'Active Sprint', path: '/tech-lead/sprints/active' },
      { label: 'Sprint Reports', path: '/tech-lead/sprints/reports' },
    ]
  },
  {
    label: 'Task Management',
    icon: navIcons.Tasks,
    items: [
      { label: 'Kanban Board', path: '/tech-lead/tasks/kanban' },
      { label: 'Assigned Tasks', path: '/tech-lead/tasks/assigned' },
      { label: 'Bug Tracking', path: '/tech-lead/tasks/bugs' },
      { label: 'Feature Requests', path: '/tech-lead/tasks/features' },
    ]
  },
  {
    label: 'Projects',
    icon: navIcons.Projects,
    items: [
      { label: 'Active Projects', path: '/tech-lead/projects' },
      { label: 'Roadmap', path: '/tech-lead/projects/roadmap' },
      { label: 'Milestones', path: '/tech-lead/projects/milestones' },
      { label: 'Releases', path: '/tech-lead/projects/releases' },
    ]
  },
  {
    label: 'Code Management',
    icon: navIcons['Code Reviews'],
    items: [
      { label: 'Git Repositories', path: '/tech-lead/code/repositories' },
      { label: 'Pull Requests', path: '/tech-lead/code/pull-requests' },
      { label: 'Merge Requests', path: '/tech-lead/code/merge-requests' },
      { label: 'Code Reviews', path: '/tech-lead/code/reviews' },
      { label: 'Branch Management', path: '/tech-lead/code/branches' },
    ]
  },
  {
    label: 'CI/CD',
    icon: navIcons['CI/CD'],
    items: [
      { label: 'Build Pipeline', path: '/tech-lead/cicd/pipeline' },
      { label: 'Deployments', path: '/tech-lead/cicd/deployments' },
      { label: 'Release History', path: '/tech-lead/cicd/releases' },
      { label: 'Build Logs', path: '/tech-lead/cicd/build-logs' },
    ]
  },
  {
    label: 'Infrastructure',
    icon: navIcons.Infrastructure,
    items: [
      { label: 'Servers', path: '/tech-lead/infra/servers' },
      { label: 'Kubernetes', path: '/tech-lead/infra/kubernetes' },
      { label: 'Docker', path: '/tech-lead/infra/docker' },
      { label: 'Cloud Resources', path: '/tech-lead/infra/cloud' },
    ]
  },
  {
    label: 'Engineering Analytics',
    icon: navIcons.Analytics,
    items: [
      { label: 'Velocity', path: '/tech-lead/analytics/velocity' },
      { label: 'Burndown', path: '/tech-lead/analytics/burndown' },
      { label: 'Productivity', path: '/tech-lead/analytics/productivity' },
      { label: 'Code Quality', path: '/tech-lead/analytics/code-quality' },
    ]
  },
  {
    label: 'AI Assistant',
    icon: navIcons['AI & System Configuration'],
    items: [
      { label: 'Engineering AI', path: '/tech-lead/ai/engineering' },
      { label: 'Code Generator', path: '/tech-lead/ai/code-generator' },
      { label: 'SQL Generator', path: '/tech-lead/ai/sql-generator' },
      { label: 'Documentation AI', path: '/tech-lead/ai/documentation' },
    ]
  },
  {
    label: 'Documentation',
    icon: navIcons.Documents,
    items: [
      { label: 'API Docs', path: '/tech-lead/docs/api' },
      { label: 'Technical Docs', path: '/tech-lead/docs/technical' },
      { label: 'Architecture', path: '/tech-lead/docs/architecture' },
    ]
  },
  {
    label: 'Meetings',
    icon: navIcons.Calendar,
    items: [
      { label: 'Daily Standup', path: '/tech-lead/meetings/standup' },
      { label: 'Sprint Planning', path: '/tech-lead/meetings/planning' },
      { label: 'Retrospective', path: '/tech-lead/meetings/retro' },
      { label: 'Team Calendar', path: '/tech-lead/meetings/calendar' },
    ]
  },
  {
    label: 'Team Chat',
    icon: navIcons.Chat,
    items: [
      { label: 'Direct Messages', path: '/tech-lead/chat/direct' },
      { label: 'Team Channels', path: '/tech-lead/chat/team' },
      { label: 'Project Channels', path: '/tech-lead/chat/projects' },
      { label: 'Voice Calls', path: '/tech-lead/chat/voice' },
      { label: 'Video Meetings', path: '/tech-lead/chat/video' },
    ]
  },
  {
    label: 'Live Monitoring',
    icon: navIcons.Monitoring,
    items: [
      { label: 'Server Health', path: '/tech-lead/monitoring/servers' },
      { label: 'API Health', path: '/tech-lead/monitoring/api' },
      { label: 'Database', path: '/tech-lead/monitoring/database' },
      { label: 'Logs', path: '/tech-lead/monitoring/logs' },
      { label: 'Alerts', path: '/tech-lead/monitoring/alerts' },
    ]
  },
  {
    label: 'Reports',
    icon: navIcons.Reports,
    items: [
      { label: 'Sprint Reports', path: '/tech-lead/reports/sprints' },
      { label: 'Team Reports', path: '/tech-lead/reports/team' },
      { label: 'Project Reports', path: '/tech-lead/reports/projects' },
    ]
  },
  {
    label: 'Notifications',
    icon: navIcons.Notifications,
    items: [
      { label: 'Notifications', path: '/tech-lead/notifications' },
    ]
  },
  {
    label: 'Settings',
    icon: navIcons.Settings,
    items: [
      { label: 'Settings', path: '/tech-lead/settings' },
    ]
  },
  {
    label: 'Intern Dashboard',
    icon: navIcons.Dashboard,
    internOnly: true,
    items: [
      { label: 'Dashboard', path: '/intern/dashboard' },
    ]
  },
  {
    label: 'My Profile',
    icon: navIcons['Employee Profile'] || navIcons.Dashboard,
    internOnly: true,
    items: [
      { label: 'Personal Information', path: '/intern/profile/personal' },
      { label: 'Internship Details', path: '/intern/profile/internship' },
      { label: 'Contact Information', path: '/intern/profile/contact' },
      { label: 'Emergency Contacts', path: '/intern/profile/emergency' },
      { label: 'Documents', path: '/intern/profile/documents' },
      { label: 'Bank Details', path: '/intern/profile/bank' },
    ]
  },
  {
    label: 'Attendance',
    icon: navIcons.Attendance,
    internOnly: true,
    items: [
      { label: 'Clock In', path: '/intern/attendance/clock-in' },
      { label: 'Clock Out', path: '/intern/attendance/clock-out' },
      { label: 'Attendance Calendar', path: '/intern/attendance/calendar' },
      { label: 'Attendance History', path: '/intern/attendance/history' },
      { label: 'Work Hours', path: '/intern/attendance/work-hours' },
    ]
  },
  {
    label: 'Leave',
    icon: navIcons.Leave,
    internOnly: true,
    items: [
      { label: 'Apply Leave', path: '/intern/leave/apply' },
      { label: 'Leave Balance', path: '/intern/leave/balance' },
      { label: 'Leave History', path: '/intern/leave/history' },
      { label: 'Holiday Calendar', path: '/intern/leave/holidays' },
    ]
  },
  {
    label: 'Learning Center',
    icon: navIcons.Learning,
    internOnly: true,
    items: [
      { label: 'Assigned Courses', path: '/intern/learning/courses' },
      { label: 'Learning Paths', path: '/intern/learning/paths' },
      { label: 'Certifications', path: '/intern/learning/certifications' },
      { label: 'Assessments', path: '/intern/learning/assessments' },
      { label: 'Quizzes', path: '/intern/learning/quizzes' },
      { label: 'Progress Tracking', path: '/intern/learning/progress' },
    ]
  },
  {
    label: 'Tasks',
    icon: navIcons.Tasks,
    internOnly: true,
    items: [
      { label: 'Assigned Tasks', path: '/intern/tasks/assigned' },
      { label: 'My Tasks', path: '/intern/tasks/my' },
      { label: 'Task Board', path: '/intern/tasks/board' },
      { label: 'Completed Tasks', path: '/intern/tasks/completed' },
      { label: 'Pending Tasks', path: '/intern/tasks/pending' },
    ]
  },
  {
    label: 'Projects',
    icon: navIcons.Projects,
    internOnly: true,
    items: [
      { label: 'Assigned Projects', path: '/intern/projects/assigned' },
      { label: 'Project Timeline', path: '/intern/projects/timeline' },
      { label: 'Sprint Board', path: '/intern/projects/sprint-board' },
      { label: 'Project Files', path: '/intern/projects/files' },
    ]
  },
  {
    label: 'Mentorship',
    icon: navIcons.Team,
    internOnly: true,
    items: [
      { label: 'My Mentor', path: '/intern/mentor/profile' },
      { label: 'Meetings', path: '/intern/mentor/meetings' },
      { label: 'Feedback', path: '/intern/mentor/feedback' },
      { label: '1-on-1 Sessions', path: '/intern/mentor/sessions' },
    ]
  },
  {
    label: 'Knowledge Base',
    icon: navIcons['Knowledge Base'],
    internOnly: true,
    items: [
      { label: 'Company Policies', path: '/intern/knowledge/policies' },
      { label: 'Documentation', path: '/intern/knowledge/docs' },
      { label: 'Coding Standards', path: '/intern/knowledge/standards' },
      { label: 'SOPs', path: '/intern/knowledge/sops' },
    ]
  },
  {
    label: 'Documents',
    icon: navIcons.Documents,
    internOnly: true,
    items: [
      { label: 'Offer Letter', path: '/intern/documents/offer-letter' },
      { label: 'Internship Letter', path: '/intern/documents/internship-letter' },
      { label: 'Completion Certificate', path: '/intern/documents/completion' },
      { label: 'HR Documents', path: '/intern/documents/hr' },
      { label: 'Policies', path: '/intern/documents/policies' },
    ]
  },
  {
    label: 'Performance',
    icon: navIcons.Performance,
    internOnly: true,
    items: [
      { label: 'Goals', path: '/intern/performance/goals' },
      { label: 'Weekly Reviews', path: '/intern/performance/weekly' },
      { label: 'Monthly Reviews', path: '/intern/performance/monthly' },
      { label: 'Final Evaluation', path: '/intern/performance/final' },
    ]
  },
  {
    label: 'Team',
    icon: navIcons.Team,
    internOnly: true,
    items: [
      { label: 'Team Members', path: '/intern/team/members' },
      { label: 'Organization Chart', path: '/intern/team/org-chart' },
      { label: 'Directory', path: '/intern/team/directory' },
    ]
  },
  {
    label: 'Communication',
    icon: navIcons.Chat,
    internOnly: true,
    items: [
      { label: 'Team Chat', path: '/intern/chat/team' },
      { label: 'Direct Messages', path: '/intern/chat/direct' },
      { label: 'Announcements', path: '/intern/chat/announcements' },
      { label: 'Webmail', path: '/intern/chat/webmail' },
    ]
  },
  {
    label: 'Meetings',
    icon: navIcons['Calendar'] || navIcons.Dashboard,
    internOnly: true,
    items: [
      { label: 'Calendar', path: '/intern/meetings/calendar' },
      { label: 'Schedule', path: '/intern/meetings/schedule' },
      { label: 'Meeting Notes', path: '/intern/meetings/notes' },
    ]
  },
  {
    label: 'Help Desk',
    icon: navIcons['Help Desk'],
    internOnly: true,
    items: [
      { label: 'IT Support', path: '/intern/helpdesk/it' },
      { label: 'HR Support', path: '/intern/helpdesk/hr' },
      { label: 'Raise Ticket', path: '/intern/helpdesk/ticket' },
    ]
  },
  {
    label: 'Notifications',
    icon: navIcons.Notifications,
    internOnly: true,
    items: [
      { label: 'Notifications', path: '/intern/notifications' },
    ]
  },
  {
    label: 'Reports',
    icon: navIcons.Reports,
    internOnly: true,
    items: [
      { label: 'Attendance Report', path: '/intern/reports/attendance' },
      { label: 'Learning Report', path: '/intern/reports/learning' },
      { label: 'Task Report', path: '/intern/reports/tasks' },
      { label: 'Performance Report', path: '/intern/reports/performance' },
    ]
  },
  {
    label: 'Settings',
    icon: navIcons.Settings,
    internOnly: true,
    items: [
      { label: 'Profile Settings', path: '/intern/settings/profile' },
      { label: 'Security', path: '/intern/settings/security' },
      { label: 'Password', path: '/intern/settings/password' },
      { label: 'Notification Preferences', path: '/intern/settings/notifications' },
    ]
  },
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
  const visibleItems = navGroups.filter(g => {
    if (g.ctoOnly) return role === 'CTO'
    if (g.internOnly) return role === 'INTERN'
    return role === 'SUPER_ADMIN' || role === 'ADMIN' || allowedNav.includes(g.label)
  })

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
