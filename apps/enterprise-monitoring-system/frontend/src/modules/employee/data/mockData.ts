// ─────────────────────────────────────────────────────────────
// Employee Module — Enterprise Mock Data
// Realistic data for all dashboard features
// ─────────────────────────────────────────────────────────────

import type * as T from '../types';

// ── Current Employee Profile ────────────────────────────────

export const currentEmployee: T.EmployeeProfile = {
  id: 'emp-100',
  employeeId: 'WS-2024-0100',
  name: 'Gagan Chaudhary',
  email: 'gagan.c@worksphere.io',
  phone: '+91 98765 43210',
  role: 'EMPLOYEE',
  designation: 'Senior Software Engineer',
  department: 'Engineering',
  team: 'Platform Core',
  location: 'Bangalore, India',
  timezone: 'IST (UTC+5:30)',
  joinDate: '2023-03-15',
  currentProject: 'AuraHR Enterprise Platform',
  bio: 'Full-stack engineer specializing in React, TypeScript, and enterprise-grade distributed systems. Passionate about building scalable HRMS platforms.',
  reportingManager: { id: 'emp-010', name: 'Rajesh Kumar', designation: 'Engineering Manager', email: 'rajesh.k@worksphere.io' },
  techLead: { id: 'emp-011', name: 'Ananya Sharma', designation: 'Principal Engineer', email: 'ananya.s@worksphere.io' },
  hrAssigned: { id: 'emp-050', name: 'Priya Menon', designation: 'HR Business Partner', email: 'priya.m@worksphere.io' },
  status: 'online',
  workHistory: [
    { id: 'wh-1', role: 'Senior Software Engineer', department: 'Engineering', project: 'AuraHR Enterprise Platform', from: '2024-06-01', to: null, description: 'Leading frontend architecture for the next-gen HRMS dashboard. Implemented real-time analytics, RBAC, and work delegation systems.' },
    { id: 'wh-2', role: 'Software Engineer II', department: 'Engineering', project: 'Cloud Infrastructure', from: '2023-03-15', to: '2024-05-31', description: 'Built microservice APIs for attendance tracking and leave management. Reduced API latency by 40%.' },
  ],
  skills: [
    { name: 'React / Next.js', level: 95, benchmark: 80, category: 'Frontend' },
    { name: 'TypeScript', level: 92, benchmark: 78, category: 'Language' },
    { name: 'Node.js', level: 88, benchmark: 75, category: 'Backend' },
    { name: 'PostgreSQL', level: 82, benchmark: 72, category: 'Database' },
    { name: 'System Design', level: 85, benchmark: 70, category: 'Architecture' },
    { name: 'Docker / K8s', level: 78, benchmark: 68, category: 'DevOps' },
  ],
  certifications: [
    { id: 'cert-1', name: 'AWS Solutions Architect – Professional', issuer: 'Amazon Web Services', date: '2024-08-20', expiryDate: '2027-08-20', credentialUrl: '#' },
    { id: 'cert-2', name: 'Google Cloud Professional Data Engineer', issuer: 'Google Cloud', date: '2024-02-10', credentialUrl: '#' },
  ],
  achievements: [
    { id: 'ach-1', title: 'Q1 2026 Star Performer', description: 'Recognized for delivering critical HRMS features ahead of schedule.', date: '2026-04-15', type: 'award', icon: '🏆' },
    { id: 'ach-2', title: '100-Day Streak', description: 'Maintained 100 consecutive days of on-time attendance.', date: '2026-01-10', type: 'milestone', icon: '🔥' },
    { id: 'ach-3', title: 'Innovation Award', description: 'Developed AI-powered attendance anomaly detection module.', date: '2025-11-22', type: 'recognition', icon: '💡' },
  ],
};

// ── Team ────────────────────────────────────────────────────

export const teamMembers: T.TeamMember[] = [
  { id: 'emp-100', name: 'Gagan Chaudhary', designation: 'Senior Software Engineer', role: 'EMPLOYEE', status: 'online', currentTask: 'Employee Dashboard Redesign', workload: 78, email: 'gagan.c@worksphere.io', skills: ['React', 'TypeScript', 'Node.js'], department: 'Engineering' },
  { id: 'emp-101', name: 'Arjun Patel', designation: 'Software Engineer II', role: 'EMPLOYEE', status: 'online', currentTask: 'API Gateway Optimization', workload: 65, email: 'arjun.p@worksphere.io', skills: ['Java', 'Spring Boot', 'PostgreSQL'], department: 'Engineering' },
  { id: 'emp-102', name: 'Kavitha Reddy', designation: 'Senior QA Engineer', role: 'EMPLOYEE', status: 'away', currentTask: 'Regression Test Suite', workload: 82, email: 'kavitha.r@worksphere.io', skills: ['Selenium', 'Cypress', 'API Testing'], department: 'Engineering' },
  { id: 'emp-103', name: 'Vikram Singh', designation: 'DevOps Engineer', role: 'EMPLOYEE', status: 'online', currentTask: 'CI/CD Pipeline Enhancement', workload: 70, email: 'vikram.s@worksphere.io', skills: ['Docker', 'Kubernetes', 'Terraform'], department: 'Engineering' },
  { id: 'emp-104', name: 'Meera Iyer', designation: 'UI/UX Designer', role: 'EMPLOYEE', status: 'busy', currentTask: 'Design System v3.0', workload: 90, email: 'meera.i@worksphere.io', skills: ['Figma', 'Design Systems', 'Prototyping'], department: 'Design' },
  { id: 'emp-105', name: 'Rohit Desai', designation: 'Software Engineer I', role: 'EMPLOYEE', status: 'online', currentTask: 'Leave Module Unit Tests', workload: 55, email: 'rohit.d@worksphere.io', skills: ['React', 'Jest', 'TypeScript'], department: 'Engineering' },
  { id: 'emp-106', name: 'Sneha Gupta', designation: 'Data Engineer', role: 'EMPLOYEE', status: 'offline', currentTask: 'Analytics Pipeline', workload: 45, email: 'sneha.g@worksphere.io', skills: ['Python', 'Spark', 'Airflow'], department: 'Data' },
  { id: 'emp-011', name: 'Ananya Sharma', designation: 'Principal Engineer', role: 'TECH_LEAD', status: 'online', currentTask: 'Architecture Review', workload: 85, email: 'ananya.s@worksphere.io', skills: ['System Design', 'React', 'Go'], department: 'Engineering' },
];

export const teamInfo: T.TeamInfo = {
  id: 'team-platform-core',
  name: 'Platform Core',
  department: 'Engineering',
  manager: currentEmployee.reportingManager,
  techLead: currentEmployee.techLead,
  hrAssigned: currentEmployee.hrAssigned,
  members: teamMembers,
  totalMembers: 8,
  activeProjects: 3,
  avgWorkload: 71,
};

// ── Leave ───────────────────────────────────────────────────

export const leaveBalances: T.LeaveBalance[] = [
  { type: 'annual', label: 'Annual Leave', total: 24, used: 6, remaining: 18, pending: 0, color: '#3b82f6' },
  { type: 'sick', label: 'Sick Leave', total: 12, used: 2, remaining: 10, pending: 0, color: '#ef4444' },
  { type: 'casual', label: 'Casual Leave', total: 8, used: 3, remaining: 5, pending: 1, color: '#f59e0b' },
  { type: 'compensatory', label: 'Comp Off', total: 4, used: 1, remaining: 3, pending: 0, color: '#8b5cf6' },
  { type: 'wfh', label: 'Work From Home', total: 24, used: 8, remaining: 16, pending: 0, color: '#06b6d4' },
  { type: 'optional_holiday', label: 'Optional Holiday', total: 3, used: 1, remaining: 2, pending: 0, color: '#10b981' },
];

export const leaveHistory: T.LeaveRequest[] = [
  { id: 'lv-1', employeeId: 'emp-100', employeeName: 'Gagan Chaudhary', type: 'annual', dayType: 'full', from: '2026-06-10', to: '2026-06-15', totalDays: 4, reason: 'Family vacation — summer break', status: 'approved', appliedDate: '2026-05-01', backupEmployeeId: 'emp-101', backupEmployeeName: 'Arjun Patel', attachments: [], managerComments: 'Approved. Enjoy your vacation!', isEmergency: false, delegations: [
    { id: 'del-1', taskId: 'task-102', taskTitle: 'Frontend Component Refactoring', project: 'AuraHR Core', delegatedTo: 'emp-101', delegatedToName: 'Arjun Patel', status: 'accepted', skillMatch: 85, workloadImpact: 12 },
    { id: 'del-2', taskId: 'task-105', taskTitle: 'Code Review Backlog', project: 'AuraHR Core', delegatedTo: 'emp-105', delegatedToName: 'Rohit Desai', status: 'accepted', skillMatch: 78, workloadImpact: 8 },
  ]},
  { id: 'lv-2', employeeId: 'emp-100', employeeName: 'Gagan Chaudhary', type: 'sick', dayType: 'full', from: '2026-04-12', to: '2026-04-13', totalDays: 2, reason: 'Dental appointment & recovery', status: 'approved', appliedDate: '2026-04-11', attachments: ['medical_certificate.pdf'], isEmergency: false, delegations: [] },
  { id: 'lv-3', employeeId: 'emp-100', employeeName: 'Gagan Chaudhary', type: 'wfh', dayType: 'full', from: '2026-05-25', to: '2026-05-25', totalDays: 1, reason: 'Internet service technician visit', status: 'pending', appliedDate: '2026-05-20', isEmergency: false, delegations: [], attachments: [] },
  { id: 'lv-4', employeeId: 'emp-100', employeeName: 'Gagan Chaudhary', type: 'casual', dayType: 'first_half', from: '2026-03-14', to: '2026-03-14', totalDays: 0.5, reason: 'Personal errands', status: 'approved', appliedDate: '2026-03-12', isEmergency: false, delegations: [], attachments: [] },
];

// ── Attendance ──────────────────────────────────────────────

const generateAttendanceData = (): T.AttendanceRecord[] => {
  const records: T.AttendanceRecord[] = [];
  const now = new Date(2026, 4, 21); // May 21, 2026
  for (let i = 30; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const dayOfWeek = d.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      records.push({ date: d.toISOString().split('T')[0], status: 'holiday', workedHours: 0, breakMinutes: 0, overtimeMinutes: 0, isLate: false, lateMinutes: 0, productivity: 0 });
      continue;
    }
    const isLate = Math.random() > 0.85;
    const hours = 7.5 + Math.random() * 2;
    records.push({
      date: d.toISOString().split('T')[0],
      status: i === 8 || i === 9 ? 'on_leave' : (Math.random() > 0.9 ? 'wfh' : 'present'),
      clockIn: isLate ? '09:45 AM' : '09:00 AM',
      clockOut: '06:30 PM',
      workedHours: Math.round(hours * 10) / 10,
      breakMinutes: 45 + Math.floor(Math.random() * 30),
      overtimeMinutes: hours > 9 ? Math.floor((hours - 9) * 60) : 0,
      isLate,
      lateMinutes: isLate ? 15 + Math.floor(Math.random() * 30) : 0,
      productivity: 75 + Math.floor(Math.random() * 20),
    });
  }
  return records;
};

export const attendanceRecords: T.AttendanceRecord[] = generateAttendanceData();

export const currentSession: T.ClockSession = {
  id: 'session-today',
  clockIn: '09:02 AM',
  workedMinutes: 482,
  breakMinutes: 45,
  isActive: true,
  breaks: [
    { id: 'brk-1', startedAt: '12:30 PM', endedAt: '01:15 PM', durationMinutes: 45, type: 'lunch' },
  ],
};

export const heatmapData: T.AttendanceHeatmapDay[] = (() => {
  const data: T.AttendanceHeatmapDay[] = [];
  const start = new Date(2026, 0, 1);
  for (let i = 0; i < 141; i++) {
    const d = new Date(start);
    d.setDate(d.getDate() + i);
    const dayOfWeek = d.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const hours = isWeekend ? 0 : (6 + Math.random() * 4);
    data.push({
      date: d.toISOString().split('T')[0],
      intensity: isWeekend ? 0 : (hours < 7 ? 1 : hours < 8 ? 2 : hours < 9 ? 3 : 4),
      hours: Math.round(hours * 10) / 10,
      status: isWeekend ? 'holiday' : 'present',
    });
  }
  return data;
})();

// ── Tasks ───────────────────────────────────────────────────

export const tasks: T.Task[] = [
  { id: 'task-101', title: 'Implement Employee Dashboard Redesign', description: 'Complete overhaul of the employee self-service portal with modern enterprise UX patterns.', project: 'AuraHR Core', projectColor: '#3b82f6', status: 'in_progress', priority: 'critical', assignee: 'emp-100', assigneeName: 'Gagan Chaudhary', reporter: 'emp-011', reporterName: 'Ananya Sharma', labels: ['frontend', 'ui/ux', 'epic'], deadline: '2026-05-30', createdAt: '2026-05-10', updatedAt: '2026-05-21', progress: 65, storyPoints: 13, subtasks: [
    { id: 'st-1', title: 'Design System Tokens', completed: true },
    { id: 'st-2', title: 'Dashboard Page', completed: true },
    { id: 'st-3', title: 'Leave Management', completed: false },
    { id: 'st-4', title: 'Attendance Module', completed: false },
    { id: 'st-5', title: 'Task Board (Kanban)', completed: false },
  ], comments: [
    { id: 'c-1', author: 'emp-011', authorName: 'Ananya Sharma', content: 'Great progress on the dashboard layout. Let\'s add the AI insights panel next.', timestamp: '2026-05-20T14:30:00Z', mentions: [] },
  ], attachments: ['dashboard_wireframe_v3.fig'], sprintId: 'sprint-8' },
  { id: 'task-102', title: 'Frontend Component Refactoring', description: 'Migrate legacy class components to functional components with hooks and TypeScript.', project: 'AuraHR Core', projectColor: '#3b82f6', status: 'in_progress', priority: 'high', assignee: 'emp-100', assigneeName: 'Gagan Chaudhary', reporter: 'emp-010', reporterName: 'Rajesh Kumar', labels: ['refactor', 'tech-debt'], deadline: '2026-06-05', createdAt: '2026-05-08', updatedAt: '2026-05-19', progress: 40, storyPoints: 8, subtasks: [], comments: [], attachments: [], sprintId: 'sprint-8' },
  { id: 'task-103', title: 'Unit Test Coverage — Leave Module', description: 'Increase test coverage for leave management module to 85%.', project: 'AuraHR Core', projectColor: '#3b82f6', status: 'todo', priority: 'medium', assignee: 'emp-100', assigneeName: 'Gagan Chaudhary', reporter: 'emp-011', reporterName: 'Ananya Sharma', labels: ['testing', 'quality'], deadline: '2026-06-10', createdAt: '2026-05-15', updatedAt: '2026-05-15', progress: 0, storyPoints: 5, subtasks: [], comments: [], attachments: [], sprintId: 'sprint-8' },
  { id: 'task-104', title: 'WebSocket Real-time Notifications', description: 'Integrate Socket.IO for live notification delivery and presence indicators.', project: 'Cloud Infrastructure', projectColor: '#8b5cf6', status: 'review', priority: 'high', assignee: 'emp-100', assigneeName: 'Gagan Chaudhary', reporter: 'emp-010', reporterName: 'Rajesh Kumar', labels: ['backend', 'real-time'], deadline: '2026-05-22', createdAt: '2026-05-05', updatedAt: '2026-05-20', progress: 90, storyPoints: 8, subtasks: [], comments: [], attachments: [], sprintId: 'sprint-8' },
  { id: 'task-105', title: 'Code Review Backlog', description: 'Review and approve pending PRs from junior engineers.', project: 'AuraHR Core', projectColor: '#3b82f6', status: 'todo', priority: 'low', assignee: 'emp-100', assigneeName: 'Gagan Chaudhary', reporter: 'emp-011', reporterName: 'Ananya Sharma', labels: ['review'], deadline: '2026-05-28', createdAt: '2026-05-18', updatedAt: '2026-05-18', progress: 0, storyPoints: 3, subtasks: [], comments: [], attachments: [], sprintId: 'sprint-8' },
  { id: 'task-106', title: 'Performance Optimization — Bundle Size', description: 'Reduce main bundle size by 30% through code splitting and lazy loading.', project: 'Cloud Infrastructure', projectColor: '#8b5cf6', status: 'backlog', priority: 'medium', assignee: 'emp-100', assigneeName: 'Gagan Chaudhary', reporter: 'emp-010', reporterName: 'Rajesh Kumar', labels: ['performance', 'optimization'], deadline: '2026-06-20', createdAt: '2026-05-12', updatedAt: '2026-05-12', progress: 0, storyPoints: 5, subtasks: [], comments: [], attachments: [] },
  { id: 'task-107', title: 'API Documentation Update', description: 'Update Swagger docs for all employee module endpoints.', project: 'AuraHR Core', projectColor: '#3b82f6', status: 'done', priority: 'low', assignee: 'emp-100', assigneeName: 'Gagan Chaudhary', reporter: 'emp-011', reporterName: 'Ananya Sharma', labels: ['documentation'], deadline: '2026-05-18', createdAt: '2026-05-10', updatedAt: '2026-05-17', progress: 100, storyPoints: 2, subtasks: [], comments: [], attachments: [], sprintId: 'sprint-8' },
];

export const currentSprint: T.Sprint = {
  id: 'sprint-8',
  name: 'Sprint 8 — Dashboard Overhaul',
  startDate: '2026-05-12',
  endDate: '2026-05-30',
  totalPoints: 44,
  completedPoints: 28,
  status: 'active',
};

// ── Chat ────────────────────────────────────────────────────

export const chatChannels: T.ChatChannel[] = [
  { id: 'ch-general', name: 'Platform Core', type: 'team', members: ['emp-100','emp-101','emp-102','emp-103','emp-104','emp-105'], unreadCount: 3, lastMessage: { id: 'm-1', channelId: 'ch-general', senderId: 'emp-101', senderName: 'Arjun Patel', content: 'PR #247 is ready for review. Updated the leave API.', type: 'text', timestamp: '2026-05-21T14:20:00Z', isMe: false } },
  { id: 'ch-design', name: 'Design System', type: 'team', members: ['emp-100','emp-104'], unreadCount: 1, lastMessage: { id: 'm-2', channelId: 'ch-design', senderId: 'emp-104', senderName: 'Meera Iyer', content: 'New component library exports are live in Figma 🎨', type: 'text', timestamp: '2026-05-21T13:45:00Z', isMe: false } },
  { id: 'ch-dm-ananya', name: 'Ananya Sharma', type: 'direct', members: ['emp-100','emp-011'], unreadCount: 0, isOnline: true },
  { id: 'ch-dm-rajesh', name: 'Rajesh Kumar', type: 'direct', members: ['emp-100','emp-010'], unreadCount: 2, isOnline: true },
  { id: 'ch-announcements', name: 'Announcements', type: 'announcement', members: [], unreadCount: 0 },
];

export const chatMessages: T.ChatMessage[] = [
  { id: 'm-10', channelId: 'ch-general', senderId: 'emp-011', senderName: 'Ananya Sharma', content: 'Good morning team! Sprint planning at 10 AM today.', type: 'text', timestamp: '2026-05-21T09:00:00Z', isMe: false },
  { id: 'm-11', channelId: 'ch-general', senderId: 'emp-100', senderName: 'Gagan Chaudhary', content: 'On it. I\'ll have the dashboard prototype ready by then.', type: 'text', timestamp: '2026-05-21T09:05:00Z', isMe: true },
  { id: 'm-12', channelId: 'ch-general', senderId: 'emp-103', senderName: 'Vikram Singh', content: 'Deployment pipeline fix is live. No more flaky builds 🎉', type: 'text', timestamp: '2026-05-21T10:30:00Z', isMe: false },
  { id: 'm-13', channelId: 'ch-general', senderId: 'emp-102', senderName: 'Kavitha Reddy', content: 'Regression suite passed. All 847 tests green ✅', type: 'text', timestamp: '2026-05-21T12:15:00Z', isMe: false },
  { id: 'm-14', channelId: 'ch-general', senderId: 'emp-101', senderName: 'Arjun Patel', content: 'PR #247 is ready for review. Updated the leave API.', type: 'text', timestamp: '2026-05-21T14:20:00Z', isMe: false },
];

// ── Notifications ───────────────────────────────────────────

export const notifications: T.Notification[] = [
  { id: 'n-1', type: 'leave', priority: 'high', title: 'Leave Request Approved', message: 'Your annual leave from Jun 10-15 has been approved by Rajesh Kumar.', timestamp: '2026-05-21T10:30:00Z', isRead: false, actorName: 'Rajesh Kumar' },
  { id: 'n-2', type: 'task', priority: 'medium', title: 'New Task Assigned', message: 'You\'ve been assigned "Unit Test Coverage — Leave Module" by Ananya Sharma.', timestamp: '2026-05-21T09:15:00Z', isRead: false, actorName: 'Ananya Sharma' },
  { id: 'n-3', type: 'mention', priority: 'medium', title: 'Mentioned in Comment', message: 'Arjun Patel mentioned you in PR #247 discussion.', timestamp: '2026-05-21T14:22:00Z', isRead: false, actorName: 'Arjun Patel' },
  { id: 'n-4', type: 'deadline', priority: 'high', title: 'Deadline Tomorrow', message: 'WebSocket Real-time Notifications is due tomorrow (May 22).', timestamp: '2026-05-21T08:00:00Z', isRead: true },
  { id: 'n-5', type: 'attendance', priority: 'low', title: 'Perfect Attendance', message: 'You\'ve completed 15 consecutive days of on-time attendance! 🎯', timestamp: '2026-05-20T18:00:00Z', isRead: true },
  { id: 'n-6', type: 'team', priority: 'low', title: 'Team Update', message: 'Rohit Desai completed the Leave Module Unit Tests setup.', timestamp: '2026-05-20T16:30:00Z', isRead: true, actorName: 'Rohit Desai' },
  { id: 'n-7', type: 'system', priority: 'low', title: 'System Maintenance', message: 'Scheduled maintenance on Saturday, May 24 from 2-4 AM IST.', timestamp: '2026-05-19T12:00:00Z', isRead: true },
];

// ── Dashboard Stats ─────────────────────────────────────────

export const dashboardStats: T.DashboardStat[] = [
  { id: 'stat-1', label: 'Today\'s Status', value: 'Clocked In', change: undefined, changeLabel: '8h 02m worked', trend: 'up', icon: 'clock', color: '#10b981', bgColor: 'rgba(16,185,129,0.08)' },
  { id: 'stat-2', label: 'Weekly Hours', value: '38.4h', change: 4.2, changeLabel: 'vs last week', trend: 'up', icon: 'timer', color: '#3b82f6', bgColor: 'rgba(59,130,246,0.08)' },
  { id: 'stat-3', label: 'Leave Balance', value: '18 days', change: undefined, changeLabel: 'Annual leave remaining', trend: 'neutral', icon: 'calendar', color: '#8b5cf6', bgColor: 'rgba(139,92,246,0.08)' },
  { id: 'stat-4', label: 'Productivity', value: '94.2%', change: 2.1, changeLabel: 'vs team avg', trend: 'up', icon: 'trending', color: '#f59e0b', bgColor: 'rgba(245,158,11,0.08)' },
  { id: 'stat-5', label: 'Sprint Progress', value: '64%', change: undefined, changeLabel: '28/44 story pts', trend: 'up', icon: 'target', color: '#06b6d4', bgColor: 'rgba(6,182,212,0.08)' },
  { id: 'stat-6', label: 'Active Tasks', value: '6', change: -1, changeLabel: 'vs yesterday', trend: 'down', icon: 'tasks', color: '#ec4899', bgColor: 'rgba(236,72,153,0.08)' },
];

// ── Analytics ───────────────────────────────────────────────

export const productivityMetrics: T.ProductivityMetrics = {
  score: 94.2,
  trend: 2.1,
  workEfficiency: 91,
  attendanceRatio: 97,
  collaborationScore: 88,
  taskCompletionRate: 86,
  onTimeDelivery: 92,
  codeQuality: 95,
};

export const weeklyProductivity: T.WeeklyMetric[] = [
  { day: 'Mon', value: 92, target: 85 },
  { day: 'Tue', value: 88, target: 85 },
  { day: 'Wed', value: 95, target: 85 },
  { day: 'Thu', value: 91, target: 85 },
  { day: 'Fri', value: 86, target: 85 },
];

export const monthlyTrends: T.MonthlyMetric[] = [
  { month: 'Jan', productivity: 89, attendance: 95, tasks: 18 },
  { month: 'Feb', productivity: 91, attendance: 97, tasks: 22 },
  { month: 'Mar', productivity: 87, attendance: 93, tasks: 19 },
  { month: 'Apr', productivity: 93, attendance: 98, tasks: 25 },
  { month: 'May', productivity: 94, attendance: 97, tasks: 21 },
];

export const aiInsights: T.AIInsight[] = [
  { id: 'ai-1', type: 'achievement', title: 'Top 10% Productivity', description: 'Your productivity score of 94.2% places you in the top 10% of your department this month.', impact: 'high', actionable: false, icon: '🏅' },
  { id: 'ai-2', type: 'suggestion', title: 'Optimal Break Pattern', description: 'Taking a 10-minute break every 90 minutes could improve your afternoon productivity by 12%.', impact: 'medium', actionable: true, actionLabel: 'Set Reminder', icon: '☕' },
  { id: 'ai-3', type: 'warning', title: 'Sprint Deadline Approaching', description: 'At current velocity, 2 tasks may miss the Sprint 8 deadline. Consider re-prioritizing.', impact: 'high', actionable: true, actionLabel: 'View Tasks', icon: '⚠️' },
  { id: 'ai-4', type: 'prediction', title: 'Leave Impact Forecast', description: 'Your June leave will not affect sprint velocity. Arjun has capacity for task delegation.', impact: 'low', actionable: false, icon: '📊' },
];

// ── Upcoming Meetings ───────────────────────────────────────

export const upcomingMeetings: T.UpcomingMeeting[] = [
  { id: 'mtg-1', title: 'Daily Standup', time: '10:00 AM', duration: '15 min', attendees: [{ name: 'Ananya Sharma' }, { name: 'Arjun Patel' }, { name: 'Kavitha Reddy' }], type: 'standup', link: '#' },
  { id: 'mtg-2', title: 'Sprint Review', time: '02:00 PM', duration: '1 hr', attendees: [{ name: 'Rajesh Kumar' }, { name: 'Ananya Sharma' }], type: 'review', link: '#' },
  { id: 'mtg-3', title: '1:1 with Rajesh', time: '04:30 PM', duration: '30 min', attendees: [{ name: 'Rajesh Kumar' }], type: '1on1', link: '#' },
];

// ── Activity Timeline ───────────────────────────────────────

export const activityTimeline = [
  { time: '09:02 AM', event: 'Clocked in — Biometric verified', type: 'attendance', color: '#10b981' },
  { time: '09:30 AM', event: 'Started work on Employee Dashboard Redesign', type: 'task', color: '#3b82f6' },
  { time: '10:00 AM', event: 'Attended Daily Standup (15 min)', type: 'meeting', color: '#8b5cf6' },
  { time: '11:15 AM', event: 'Committed 340 LOC to feature/employee-dashboard branch', type: 'git', color: '#f59e0b' },
  { time: '12:30 PM', event: 'Lunch break (45 min)', type: 'break', color: '#64748b' },
  { time: '02:00 PM', event: 'Sprint Review meeting (1 hr)', type: 'meeting', color: '#8b5cf6' },
  { time: '03:30 PM', event: 'Resolved code review comments on PR #245', type: 'review', color: '#06b6d4' },
  { time: '04:15 PM', event: 'Active coding session — VS Code (92% focus)', type: 'productivity', color: '#10b981' },
];

// ── Quick Actions ───────────────────────────────────────────

export const quickActions: T.QuickAction[] = [
  { id: 'qa-1', label: 'Apply Leave', icon: 'calendar-plus', variant: 'primary', shortcut: 'Alt+L' },
  { id: 'qa-2', label: 'Clock Out', icon: 'log-out', variant: 'danger', shortcut: 'Alt+O' },
  { id: 'qa-3', label: 'New Task', icon: 'plus-circle', variant: 'secondary', shortcut: 'Alt+T' },
  { id: 'qa-4', label: 'Start Timer', icon: 'timer', variant: 'success', shortcut: 'Alt+S' },
  { id: 'qa-5', label: 'Open Chat', icon: 'message-square', variant: 'secondary', shortcut: 'Alt+C' },
  { id: 'qa-6', label: 'Schedule Meeting', icon: 'video', variant: 'secondary', shortcut: 'Alt+M' },
];

// ── Team Leave Calendar ─────────────────────────────────────

export const teamLeaveCalendar = [
  { employeeId: 'emp-102', name: 'Kavitha Reddy', dates: ['2026-05-26', '2026-05-27'], type: 'annual' as T.LeaveType },
  { employeeId: 'emp-106', name: 'Sneha Gupta', dates: ['2026-05-28', '2026-05-29', '2026-05-30'], type: 'wfh' as T.LeaveType },
  { employeeId: 'emp-100', name: 'Gagan Chaudhary', dates: ['2026-06-10', '2026-06-11', '2026-06-12', '2026-06-13', '2026-06-14', '2026-06-15'], type: 'annual' as T.LeaveType },
];
