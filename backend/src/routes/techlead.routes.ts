import { Router, Request, Response } from 'express';
import { authenticate } from '../middleware/auth';

const router = Router();

router.use(authenticate);

const generateTimeSeries = (days: number, base: number, variance: number) => {
  const data: { date: string; value: number }[] = [];
  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    data.push({
      date: date.toISOString().split('T')[0],
      value: Math.round((base + Math.random() * variance) * 10) / 10,
    });
  }
  return data;
};

const generateTrend = (points: number, min: number, max: number) => {
  return Array.from({ length: points }, (_, i) => ({
    label: `Week ${i + 1}`,
    value: Math.floor(min + Math.random() * (max - min)),
  }));
};

router.get('/dashboard', (_req: Request, res: Response) => {
  const healthScore = Math.floor(85 + Math.random() * 12);
  res.json({
    healthScore,
    healthStatus: healthScore >= 92 ? 'excellent' : healthScore >= 80 ? 'good' : 'needs-attention',
    currentSprint: {
      name: 'Sprint 24',
      progress: Math.floor(65 + Math.random() * 20),
      startDate: '2026-07-14',
      endDate: '2026-07-27',
      totalTasks: 42,
      completedTasks: 28,
      inProgressTasks: 10,
      pendingTasks: 4,
    },
    velocity: {
      current: Math.floor(38 + Math.random() * 10),
      average: 42,
      trend: 'up',
    },
    activeProjects: Math.floor(6 + Math.random() * 4),
    pendingReviews: Math.floor(8 + Math.random() * 7),
    openBugs: Math.floor(12 + Math.random() * 8),
    criticalBugs: Math.floor(1 + Math.random() * 3),
    buildStatus: 'passing',
    deploymentStatus: 'healthy',
    infrastructureHealth: 97,
    apiStatus: 'operational',
    databaseHealth: 'healthy',
    recentActivities: [
      { id: '1', type: 'deploy', message: 'Backend v2.4.1 deployed to production', user: 'Sarah Chen', time: '2m ago' },
      { id: '2', type: 'pr', message: 'PR #1423 merged - Fix payment gateway timeout', user: 'Mike Johnson', time: '15m ago' },
      { id: '3', type: 'build', message: 'Frontend build passed (commit a3f2b1c)', user: 'CI/CD', time: '28m ago' },
      { id: '4', type: 'bug', message: 'Critical bug #487 opened - Login fails on Safari', user: 'Emily Davis', time: '1h ago' },
      { id: '5', type: 'review', message: 'Code review requested for PR #1425', user: 'Alex Kim', time: '2h ago' },
      { id: '6', type: 'deploy', message: 'Database migration v7.2 completed', user: 'DevOps', time: '3h ago' },
    ],
    upcomingMeetings: [
      { id: '1', title: 'Sprint Planning', time: '10:00 AM', attendees: 8 },
      { id: '2', title: 'Architecture Review', time: '2:00 PM', attendees: 5 },
      { id: '3', title: 'Daily Standup', time: '9:30 AM', attendees: 12 },
    ],
    recentCommits: [
      { id: '1', message: 'fix: resolve WebSocket reconnection issue', author: 'Sarah Chen', repo: 'backend-api', hash: 'a1b2c3d', time: '5m ago' },
      { id: '2', message: 'feat: add real-time dashboard widgets', author: 'Mike Johnson', repo: 'frontend-web', hash: 'e4f5g6h', time: '18m ago' },
      { id: '3', message: 'chore: update dependencies', author: 'Alex Kim', repo: 'shared-lib', hash: 'i7j8k9l', time: '42m ago' },
    ],
    teamStandups: [
      { name: 'Sarah Chen', status: 'completed', tasks: 3, blockers: false },
      { name: 'Mike Johnson', status: 'completed', tasks: 2, blockers: true, blockerText: 'Waiting for API key' },
      { name: 'Alex Kim', status: 'pending', tasks: 0, blockers: false },
      { name: 'Emily Davis', status: 'completed', tasks: 4, blockers: false },
    ],
    sprintProgressData: generateTimeSeries(14, 40, 30),
    velocityData: generateTrend(8, 30, 55),
  });
});

router.get('/live', (_req: Request, res: Response) => {
  res.json({
    cpu: Math.floor(35 + Math.random() * 55),
    memory: Math.floor(45 + Math.random() * 40),
    disk: Math.floor(55 + Math.random() * 30),
    network: Math.floor(20 + Math.random() * 60),
    apiResponseTime: Math.floor(80 + Math.random() * 200),
    buildQueue: Math.floor(1 + Math.random() * 5),
    deploymentQueue: Math.floor(0 + Math.random() * 3),
    pipelineStatus: Math.random() > 0.2 ? 'passing' : 'failing',
    serverHealth: Math.floor(92 + Math.random() * 8),
    microservices: [
      { name: 'Auth Service', status: Math.random() > 0.1 ? 'healthy' : 'degraded', uptime: 99.9, pods: 3 },
      { name: 'API Gateway', status: 'healthy', uptime: 99.8, pods: 5 },
      { name: 'Payment Service', status: Math.random() > 0.15 ? 'healthy' : 'degraded', uptime: 99.7, pods: 4 },
      { name: 'Notification Service', status: 'healthy', uptime: 99.9, pods: 2 },
      { name: 'Search Service', status: 'healthy', uptime: 100, pods: 3 },
      { name: 'Analytics Service', status: Math.random() > 0.2 ? 'healthy' : 'down', uptime: 98.5, pods: 2 },
    ],
    containers: {
      total: 24,
      running: 22,
      stopped: 2,
      healthy: 21,
    },
    database: {
      connections: Math.floor(45 + Math.random() * 30),
      activeQueries: Math.floor(3 + Math.random() * 12),
      replicationLag: Math.floor(0 + Math.random() * 3),
    },
    redis: { connected: true, memory: Math.floor(30 + Math.random() * 40), hitRate: Math.floor(92 + Math.random() * 7) },
    kafka: { connected: true, lag: Math.floor(5 + Math.random() * 50), throughput: Math.floor(1000 + Math.random() * 2000) },
    rabbitmq: { connected: true, queues: 12, messages: Math.floor(100 + Math.random() * 500) },
    kubernetes: {
      pods: { total: 47, running: 45, pending: 1, failed: 1 },
      nodes: { total: 6, ready: 6, cpu: Math.floor(45 + Math.random() * 35), memory: Math.floor(50 + Math.random() * 30) },
    },
    timestamp: new Date().toISOString(),
  });
});

router.get('/team/members', (_req: Request, res: Response) => {
  const members = [
    { id: '1', name: 'Sarah Chen', role: 'Senior Backend Engineer', avatar: null, status: 'online', email: 'sarah@worksphere.com', tasksCompleted: 24, tasksAssigned: 28, load: 86, department: 'Backend' },
    { id: '2', name: 'Mike Johnson', role: 'Frontend Lead', avatar: null, status: 'online', email: 'mike@worksphere.com', tasksCompleted: 18, tasksAssigned: 22, load: 82, department: 'Frontend' },
    { id: '3', name: 'Alex Kim', role: 'Full Stack Engineer', avatar: null, status: 'away', email: 'alex@worksphere.com', tasksCompleted: 15, tasksAssigned: 25, load: 60, department: 'Full Stack' },
    { id: '4', name: 'Emily Davis', role: 'QA Engineer', avatar: null, status: 'online', email: 'emily@worksphere.com', tasksCompleted: 30, tasksAssigned: 30, load: 100, department: 'QA' },
    { id: '5', name: 'James Wilson', role: 'DevOps Engineer', avatar: null, status: 'offline', email: 'james@worksphere.com', tasksCompleted: 12, tasksAssigned: 15, load: 80, department: 'DevOps' },
    { id: '6', name: 'Priya Patel', role: 'Data Engineer', avatar: null, status: 'online', email: 'priya@worksphere.com', tasksCompleted: 20, tasksAssigned: 22, load: 91, department: 'Data' },
    { id: '7', name: 'Tom Brown', role: 'Mobile Developer', avatar: null, status: 'online', email: 'tom@worksphere.com', tasksCompleted: 10, tasksAssigned: 18, load: 56, department: 'Mobile' },
    { id: '8', name: 'Lisa Wang', role: 'Security Engineer', avatar: null, status: 'away', email: 'lisa@worksphere.com', tasksCompleted: 8, tasksAssigned: 12, load: 67, department: 'Security' },
  ];
  res.json(members);
});

router.get('/team/availability', (_req: Request, res: Response) => {
  res.json({
    today: [
      { name: 'Sarah Chen', status: 'available', hours: 8, type: 'full-day' },
      { name: 'Mike Johnson', status: 'available', hours: 6, type: 'half-day', note: 'Doctor appointment 2-4pm' },
      { name: 'Alex Kim', status: 'available', hours: 8, type: 'full-day' },
      { name: 'Emily Davis', status: 'available', hours: 8, type: 'full-day' },
      { name: 'James Wilson', status: 'on-leave', hours: 0, type: 'leave', note: 'Vacation' },
      { name: 'Priya Patel', status: 'available', hours: 8, type: 'full-day' },
      { name: 'Tom Brown', status: 'available', hours: 7, type: 'half-day', note: 'Team offsite' },
      { name: 'Lisa Wang', status: 'available', hours: 8, type: 'full-day' },
    ],
    thisWeek: [
      { date: 'Mon', available: 7, onLeave: 1, capacity: 88 },
      { date: 'Tue', available: 7, onLeave: 1, capacity: 88 },
      { date: 'Wed', available: 6, onLeave: 2, capacity: 75 },
      { date: 'Thu', available: 8, onLeave: 0, capacity: 100 },
      { date: 'Fri', available: 7, onLeave: 1, capacity: 88 },
    ],
  });
});

router.get('/team/workload', (_req: Request, res: Response) => {
  res.json({
    distribution: [
      { name: 'Sarah Chen', tasks: 28, completed: 24, storyPoints: 42, capacity: 86, status: 'high' },
      { name: 'Mike Johnson', tasks: 22, completed: 18, storyPoints: 35, capacity: 82, status: 'high' },
      { name: 'Alex Kim', tasks: 25, completed: 15, storyPoints: 30, capacity: 60, status: 'medium' },
      { name: 'Emily Davis', tasks: 30, completed: 30, storyPoints: 38, capacity: 100, status: 'critical' },
      { name: 'James Wilson', tasks: 15, completed: 12, storyPoints: 20, capacity: 80, status: 'medium' },
      { name: 'Priya Patel', tasks: 22, completed: 20, storyPoints: 28, capacity: 91, status: 'high' },
      { name: 'Tom Brown', tasks: 18, completed: 10, storyPoints: 22, capacity: 56, status: 'low' },
      { name: 'Lisa Wang', tasks: 12, completed: 8, storyPoints: 15, capacity: 67, status: 'low' },
    ],
    averageLoad: 78,
    overCapacity: 1,
    atRisk: 2,
  });
});

router.get('/team/performance', (_req: Request, res: Response) => {
  res.json({
    members: [
      { name: 'Sarah Chen', velocity: 42, quality: 95, commits: 128, reviews: 32, bugsIntroduced: 3, rating: 'excellent' },
      { name: 'Mike Johnson', velocity: 38, quality: 88, commits: 95, reviews: 45, bugsIntroduced: 5, rating: 'good' },
      { name: 'Alex Kim', velocity: 30, quality: 82, commits: 72, reviews: 18, bugsIntroduced: 7, rating: 'good' },
      { name: 'Emily Davis', quality: 98, testCoverage: 92, bugsFound: 45, automationTests: 230, rating: 'excellent' },
      { name: 'James Wilson', velocity: 25, quality: 90, deployments: 34, incidents: 2, rating: 'good' },
      { name: 'Priya Patel', velocity: 35, quality: 92, commits: 88, reviews: 22, bugsIntroduced: 4, rating: 'excellent' },
    ],
    teamVelocity: generateTrend(12, 30, 55),
    sprintCompletion: 88,
    reviewTurnaround: 4.2,
  });
});

router.get('/sprints/board', (_req: Request, res: Response) => {
  res.json({
    columns: [
      {
        title: 'To Do', limit: 10, tasks: [
          { id: 'T-101', title: 'Implement OAuth2 SSO', priority: 'high', assignee: 'Sarah Chen', storyPoints: 8, type: 'feature', labels: ['auth', 'security'] },
          { id: 'T-102', title: 'Design system color tokens', priority: 'medium', assignee: 'Mike Johnson', storyPoints: 5, type: 'design', labels: ['ui', 'design-system'] },
          { id: 'T-103', title: 'API rate limiting middleware', priority: 'high', assignee: 'Alex Kim', storyPoints: 6, type: 'feature', labels: ['backend', 'security'] },
          { id: 'T-104', title: 'Database backup automation', priority: 'low', assignee: 'James Wilson', storyPoints: 3, type: 'chore', labels: ['devops'] },
        ]
      },
      {
        title: 'In Progress', tasks: [
          { id: 'T-89', title: 'WebSocket reconnection logic', priority: 'critical', assignee: 'Sarah Chen', storyPoints: 8, type: 'feature', labels: ['backend', 'realtime'] },
          { id: 'T-92', title: 'Dashboard performance optimization', priority: 'high', assignee: 'Mike Johnson', storyPoints: 6, type: 'perf', labels: ['frontend', 'performance'] },
          { id: 'T-95', title: 'Search indexing pipeline', priority: 'medium', assignee: 'Priya Patel', storyPoints: 7, type: 'feature', labels: ['data', 'search'] },
          { id: 'T-97', title: 'Regression test suite', priority: 'high', assignee: 'Emily Davis', storyPoints: 5, type: 'test', labels: ['qa', 'automation'] },
        ]
      },
      {
        title: 'Code Review', tasks: [
          { id: 'T-85', title: 'Payment gateway integration', priority: 'critical', assignee: 'Sarah Chen', storyPoints: 10, type: 'feature', labels: ['backend', 'payments'] },
          { id: 'T-88', title: 'Mobile responsive nav', priority: 'medium', assignee: 'Tom Brown', storyPoints: 4, type: 'feature', labels: ['mobile', 'ui'] },
        ]
      },
      {
        title: 'Done', tasks: [
          { id: 'T-76', title: 'User avatar upload', priority: 'low', assignee: 'Mike Johnson', storyPoints: 3, type: 'feature', labels: ['frontend'] },
          { id: 'T-78', title: 'Log aggregation setup', priority: 'medium', assignee: 'James Wilson', storyPoints: 5, type: 'chore', labels: ['devops', 'monitoring'] },
          { id: 'T-80', title: 'Unit test coverage reports', priority: 'medium', assignee: 'Emily Davis', storyPoints: 4, type: 'test', labels: ['qa'] },
          { id: 'T-82', title: 'Docker compose for dev env', priority: 'low', assignee: 'Alex Kim', storyPoints: 3, type: 'chore', labels: ['devops'] },
        ]
      },
    ],
    sprint: { name: 'Sprint 24', progress: 68, startDate: '2026-07-14', endDate: '2026-07-27' },
  });
});

router.get('/sprints/backlog', (_req: Request, res: Response) => {
  res.json({
    items: [
      { id: 'T-105', title: 'Multi-factor authentication', priority: 'high', status: 'backlog', storyPoints: 13, assignee: null, epic: 'Security' },
      { id: 'T-106', title: 'Real-time collaboration', priority: 'high', status: 'backlog', storyPoints: 21, assignee: null, epic: 'Collaboration' },
      { id: 'T-107', title: 'Dark mode support', priority: 'medium', status: 'backlog', storyPoints: 5, assignee: null, epic: 'UI/UX' },
      { id: 'T-108', title: 'Export to PDF reports', priority: 'medium', status: 'backlog', storyPoints: 8, assignee: null, epic: 'Reports' },
      { id: 'T-109', title: 'Email notification templates', priority: 'low', status: 'backlog', storyPoints: 4, assignee: null, epic: 'Notifications' },
      { id: 'T-110', title: 'Webhook integrations', priority: 'high', status: 'ready', storyPoints: 10, assignee: 'Sarah Chen', epic: 'Integrations' },
      { id: 'T-111', title: 'Performance monitoring dashboard', priority: 'medium', status: 'ready', storyPoints: 8, assignee: 'James Wilson', epic: 'Monitoring' },
      { id: 'T-112', title: 'API versioning strategy', priority: 'high', status: 'ready', storyPoints: 6, assignee: 'Alex Kim', epic: 'Architecture' },
    ],
    epics: ['Security', 'Collaboration', 'UI/UX', 'Reports', 'Notifications', 'Integrations', 'Monitoring', 'Architecture'],
  });
});

router.get('/sprints/active', (_req: Request, res: Response) => {
  res.json({
    sprint: { name: 'Sprint 24', goal: 'Complete payment integration and dashboard optimizations', daysRemaining: 5, totalDays: 14, progress: 68 },
    burndown: generateTimeSeries(14, 42, 5).map(d => ({ ...d, ideal: 42 - (42 / 14) * (14 - Math.abs(new Date(d.date).getDate() - new Date().getDate())) })),
    tasksRemaining: 14,
    tasksCompleted: 28,
    blockers: [
      { id: 'B-1', title: 'Payment gateway API key rotation', affected: ['T-85'], severity: 'critical', raisedBy: 'Sarah Chen' },
      { id: 'B-2', title: 'Test environment DB out of sync', affected: ['T-97'], severity: 'high', raisedBy: 'Emily Davis' },
    ],
  });
});

router.get('/sprints/reports', (_req: Request, res: Response) => {
  res.json({
    sprints: [
      { name: 'Sprint 24', planned: 42, completed: 28, velocity: 70, quality: 88, bugsFound: 5, date: '2026-07-14' },
      { name: 'Sprint 23', planned: 38, completed: 35, velocity: 92, quality: 95, bugsFound: 2, date: '2026-06-30' },
      { name: 'Sprint 22', planned: 40, completed: 32, velocity: 80, quality: 87, bugsFound: 6, date: '2026-06-16' },
      { name: 'Sprint 21', planned: 35, completed: 33, velocity: 94, quality: 92, bugsFound: 3, date: '2026-06-02' },
      { name: 'Sprint 20', planned: 45, completed: 30, velocity: 67, quality: 82, bugsFound: 8, date: '2026-05-19' },
    ],
    averageVelocity: 81,
    averageQuality: 89,
  });
});

router.get('/tasks/kanban', (_req: Request, res: Response) => {
  res.json({
    columns: [
      { title: 'Backlog', color: 'slate', tasks: [{ id: 'F-1', title: 'User mentions in comments', priority: 'medium', type: 'feature' }, { id: 'F-2', title: 'Bulk task operations', priority: 'low', type: 'feature' }] },
      { title: 'Ready', color: 'blue', tasks: [{ id: 'F-3', title: 'File preview in chat', priority: 'high', type: 'feature' }, { id: 'B-12', title: 'Fix memory leak in WebSocket', priority: 'critical', type: 'bug' }] },
      { title: 'In Progress', color: 'amber', tasks: [{ id: 'F-4', title: 'Rich text editor', priority: 'high', type: 'feature' }, { id: 'B-15', title: 'Safari login crash', priority: 'critical', type: 'bug' }] },
      { title: 'Review', color: 'purple', tasks: [{ id: 'F-5', title: 'Notification preferences UI', priority: 'medium', type: 'feature' }] },
      { title: 'Done', color: 'green', tasks: [{ id: 'F-6', title: 'Dark mode toggle', priority: 'low', type: 'feature' }, { id: 'B-10', title: 'Date picker timezone bug', priority: 'medium', type: 'bug' }] },
    ],
  });
});

router.get('/tasks/assigned', (_req: Request, res: Response) => {
  res.json([
    { id: 'T-101', title: 'Implement OAuth2 SSO', priority: 'high', status: 'in-progress', assignee: 'Sarah Chen', dueDate: '2026-07-25', storyPoints: 8 },
    { id: 'T-89', title: 'WebSocket reconnection logic', priority: 'critical', status: 'in-progress', assignee: 'Sarah Chen', dueDate: '2026-07-23', storyPoints: 8 },
    { id: 'T-85', title: 'Payment gateway integration', priority: 'critical', status: 'review', assignee: 'Sarah Chen', dueDate: '2026-07-24', storyPoints: 10 },
    { id: 'T-92', title: 'Dashboard performance optimization', priority: 'high', status: 'in-progress', assignee: 'Mike Johnson', dueDate: '2026-07-25', storyPoints: 6 },
    { id: 'T-95', title: 'Search indexing pipeline', priority: 'medium', status: 'in-progress', assignee: 'Priya Patel', dueDate: '2026-07-26', storyPoints: 7 },
    { id: 'T-97', title: 'Regression test suite', priority: 'high', status: 'in-progress', assignee: 'Emily Davis', dueDate: '2026-07-24', storyPoints: 5 },
  ]);
});

router.get('/tasks/bugs', (_req: Request, res: Response) => {
  res.json([
    { id: 'BUG-487', title: 'Login fails on Safari browser', severity: 'critical', status: 'open', reporter: 'Emily Davis', assignee: null, created: '2026-07-22', environment: 'production' },
    { id: 'BUG-486', title: 'WebSocket disconnects after 5 min', severity: 'high', status: 'in-progress', reporter: 'Alex Kim', assignee: 'Sarah Chen', created: '2026-07-21', environment: 'staging' },
    { id: 'BUG-485', title: 'Date picker shows wrong timezone', severity: 'medium', status: 'resolved', reporter: 'Mike Johnson', assignee: 'Tom Brown', created: '2026-07-20', environment: 'production' },
    { id: 'BUG-484', title: 'Memory leak in dashboard charts', severity: 'high', status: 'open', reporter: 'Priya Patel', assignee: null, created: '2026-07-19', environment: 'production' },
    { id: 'BUG-483', title: 'Search results not paginating', severity: 'medium', status: 'in-progress', reporter: 'Sarah Chen', assignee: 'Priya Patel', created: '2026-07-18', environment: 'production' },
    { id: 'BUG-482', title: 'CSS overflow in mobile nav', severity: 'low', status: 'open', reporter: 'Tom Brown', assignee: null, created: '2026-07-17', environment: 'production' },
  ]);
});

router.get('/tasks/features', (_req: Request, res: Response) => {
  res.json([
    { id: 'FR-22', title: 'Real-time collaboration editor', status: 'proposed', priority: 'high', votes: 12, submittedBy: 'Alex Kim', date: '2026-07-15' },
    { id: 'FR-21', title: 'Slack/Discord integration', status: 'approved', priority: 'high', votes: 24, submittedBy: 'Sarah Chen', date: '2026-07-10' },
    { id: 'FR-20', title: 'Advanced filtering in tables', status: 'in-progress', priority: 'medium', votes: 8, submittedBy: 'Mike Johnson', date: '2026-07-05' },
    { id: 'FR-19', title: 'Voice message support in chat', status: 'proposed', priority: 'low', votes: 5, submittedBy: 'Emily Davis', date: '2026-06-28' },
    { id: 'FR-18', title: 'Dark mode with custom themes', status: 'completed', priority: 'medium', votes: 18, submittedBy: 'Tom Brown', date: '2026-06-20' },
  ]);
});

router.get('/projects', (_req: Request, res: Response) => {
  res.json([
    { id: 'P-1', name: 'Platform Redesign', status: 'active', progress: 72, sprintCount: 6, teamSize: 8, startDate: '2026-04-01', endDate: '2026-09-30', priority: 'high', health: 'good' },
    { id: 'P-2', name: 'Mobile App v2', status: 'active', progress: 45, sprintCount: 4, teamSize: 5, startDate: '2026-05-15', endDate: '2026-11-15', priority: 'high', health: 'at-risk' },
    { id: 'P-3', name: 'Data Pipeline Migration', status: 'active', progress: 88, sprintCount: 3, teamSize: 3, startDate: '2026-06-01', endDate: '2026-08-15', priority: 'medium', health: 'good' },
    { id: 'P-4', name: 'Security Audit & Hardening', status: 'active', progress: 55, sprintCount: 2, teamSize: 4, startDate: '2026-07-01', endDate: '2026-08-30', priority: 'critical', health: 'good' },
    { id: 'P-5', name: 'API Gateway v2', status: 'planning', progress: 15, sprintCount: 0, teamSize: 3, startDate: '2026-08-01', endDate: '2026-10-31', priority: 'medium', health: 'on-track' },
  ]);
});

router.get('/projects/roadmap', (_req: Request, res: Response) => {
  res.json({
    quarters: [
      { label: 'Q3 2026', items: [{ name: 'Platform Redesign', progress: 72, start: '2026-07', end: '2026-09' }, { name: 'Mobile App v2', progress: 45, start: '2026-07', end: '2026-11' }] },
      { label: 'Q4 2026', items: [{ name: 'API Gateway v2', progress: 15, start: '2026-08', end: '2026-10' }, { name: 'AI Assistant', progress: 0, start: '2026-10', end: '2026-12' }] },
    ],
  });
});

router.get('/projects/milestones', (_req: Request, res: Response) => {
  res.json([
    { id: 'M-1', name: 'Beta Release', project: 'Platform Redesign', dueDate: '2026-08-15', status: 'on-track', progress: 72, deliverables: ['Auth system', 'Dashboard', 'User management'] },
    { id: 'M-2', name: 'MVP Launch', project: 'Mobile App v2', dueDate: '2026-09-30', status: 'at-risk', progress: 45, deliverables: ['Login flow', 'Main feed', 'Notifications'] },
    { id: 'M-3', name: 'Data Migration Complete', project: 'Data Pipeline Migration', dueDate: '2026-08-01', status: 'on-track', progress: 88, deliverables: ['Schema migration', 'ETL scripts', 'Validation'] },
    { id: 'M-4', name: 'Security Certification', project: 'Security Audit', dueDate: '2026-08-30', status: 'on-track', progress: 55, deliverables: ['Pen test report', 'Remediation', 'Compliance doc'] },
  ]);
});

router.get('/projects/releases', (_req: Request, res: Response) => {
  res.json([
    { id: 'R-6', version: 'v2.4.1', date: '2026-07-22', status: 'deployed', changes: ['Fix WebSocket reconnect', 'Optimize chart rendering'], author: 'Sarah Chen' },
    { id: 'R-5', version: 'v2.4.0', date: '2026-07-15', status: 'deployed', changes: ['Payment gateway', 'Search indexing', 'Dashboard widgets'], author: 'Mike Johnson' },
    { id: 'R-4', version: 'v2.3.2', date: '2026-07-08', status: 'deployed', changes: ['Security patches', 'Dependency updates'], author: 'Alex Kim' },
    { id: 'R-3', version: 'v2.4.0-rc.1', date: '2026-07-20', status: 'rolled-back', changes: ['Payment gateway integration'], author: 'Sarah Chen', rollbackReason: 'API timeout issues' },
  ]);
});

router.get('/code/repositories', (_req: Request, res: Response) => {
  res.json([
    { id: 'R-1', name: 'backend-api', language: 'TypeScript', branch: 'main', stars: 24, forks: 8, prs: 3, issues: 5, lastCommit: '2m ago', description: 'Core backend API service' },
    { id: 'R-2', name: 'frontend-web', language: 'TypeScript', branch: 'develop', stars: 18, forks: 6, prs: 5, issues: 8, lastCommit: '15m ago', description: 'Web application frontend' },
    { id: 'R-3', name: 'mobile-app', language: 'Kotlin', branch: 'main', stars: 12, forks: 3, prs: 2, issues: 4, lastCommit: '1h ago', description: 'Android mobile application' },
    { id: 'R-4', name: 'shared-lib', language: 'TypeScript', branch: 'main', stars: 8, forks: 12, prs: 1, issues: 2, lastCommit: '3h ago', description: 'Shared utilities and types' },
    { id: 'R-5', name: 'infrastructure', language: 'HCL', branch: 'main', stars: 6, forks: 2, prs: 0, issues: 1, lastCommit: '5h ago', description: 'Terraform infrastructure as code' },
  ]);
});

router.get('/code/pull-requests', (_req: Request, res: Response) => {
  res.json([
    { id: 'PR-1425', title: 'fix: WebSocket reconnection with exponential backoff', repo: 'backend-api', author: 'Sarah Chen', status: 'open', createdAt: '2h ago', comments: 5, reviewers: ['Mike Johnson', 'Alex Kim'], ci: 'passing', conflicts: false },
    { id: 'PR-1424', title: 'feat: Dashboard performance optimization', repo: 'frontend-web', author: 'Mike Johnson', status: 'open', createdAt: '5h ago', comments: 3, reviewers: ['Sarah Chen'], ci: 'pending', conflicts: false },
    { id: 'PR-1423', title: 'fix: Payment gateway timeout handling', repo: 'backend-api', author: 'Sarah Chen', status: 'merged', createdAt: '1d ago', comments: 8, reviewers: ['Alex Kim', 'Priya Patel'], ci: 'passing', conflicts: false, mergedBy: 'Alex Kim' },
    { id: 'PR-1422', title: 'feat: Search indexing pipeline', repo: 'backend-api', author: 'Priya Patel', status: 'open', createdAt: '1d ago', comments: 2, reviewers: ['Sarah Chen'], ci: 'failing', conflicts: true },
    { id: 'PR-1421', title: 'chore: Update dependencies', repo: 'shared-lib', author: 'Alex Kim', status: 'draft', createdAt: '2d ago', comments: 0, reviewers: [], ci: 'pending', conflicts: false },
  ]);
});

router.get('/code/reviews', (_req: Request, res: Response) => {
  res.json({
    pending: [
      { id: 'PR-1425', title: 'WebSocket reconnection', author: 'Sarah Chen', repo: 'backend-api', waitTime: '2h', files: 8, additions: 124, deletions: 32, ciPassing: true },
      { id: 'PR-1424', title: 'Dashboard performance', author: 'Mike Johnson', repo: 'frontend-web', waitTime: '5h', files: 12, additions: 245, deletions: 67, ciPassing: null },
      { id: 'PR-1422', title: 'Search indexing pipeline', author: 'Priya Patel', repo: 'backend-api', waitTime: '1d', files: 6, additions: 89, deletions: 12, ciPassing: false },
    ],
    completed: [
      { id: 'PR-1420', title: 'User avatar upload API', author: 'Tom Brown', repo: 'backend-api', approvedBy: 'Sarah Chen', completedAt: '3h ago' },
      { id: 'PR-1419', title: 'Notification preferences UI', author: 'Mike Johnson', repo: 'frontend-web', approvedBy: 'Alex Kim', completedAt: '1d ago' },
    ],
    stats: { avgWaitTime: '4.2h', approvalRate: 88, totalPending: 3 },
  });
});

router.get('/code/branches', (_req: Request, res: Response) => {
  res.json([
    { name: 'main', commits: 342, lastCommit: '2m ago', author: 'Sarah Chen', protection: true, ci: 'passing' },
    { name: 'develop', commits: 528, lastCommit: '5m ago', author: 'Mike Johnson', protection: true, ci: 'passing' },
    { name: 'feature/ws-reconnect', commits: 12, lastCommit: '2h ago', author: 'Sarah Chen', protection: false, ci: 'passing' },
    { name: 'feature/dashboard-perf', commits: 8, lastCommit: '5h ago', author: 'Mike Johnson', protection: false, ci: 'pending' },
    { name: 'fix/safari-login', commits: 3, lastCommit: '1d ago', author: 'Tom Brown', protection: false, ci: 'failing' },
    { name: 'release/v2.4.0', commits: 15, lastCommit: '3d ago', author: 'Alex Kim', protection: true, ci: 'passing' },
  ]);
});

router.get('/cicd/pipeline', (_req: Request, res: Response) => {
  res.json({
    pipelines: [
      { id: 'P-1001', name: 'Backend CI/CD', status: 'running', branch: 'develop', commit: 'a1b2c3d', author: 'Sarah Chen', started: '5m ago', stages: [
        { name: 'Lint', status: 'passed', duration: '45s' },
        { name: 'Build', status: 'passed', duration: '2m 15s' },
        { name: 'Unit Tests', status: 'running', duration: '1m 30s' },
        { name: 'Integration Tests', status: 'pending', duration: '-' },
        { name: 'Deploy', status: 'pending', duration: '-' },
      ]},
      { id: 'P-1000', name: 'Frontend CI/CD', status: 'failed', branch: 'feature/dashboard-perf', commit: 'e4f5g6h', author: 'Mike Johnson', started: '15m ago', stages: [
        { name: 'Lint', status: 'passed', duration: '30s' },
        { name: 'Build', status: 'failed', duration: '1m 10s', error: 'TypeScript compilation error' },
      ]},
      { id: 'P-999', name: 'Backend CI/CD', status: 'passed', branch: 'main', commit: 'i7j8k9l', author: 'Alex Kim', started: '1h ago', stages: [
        { name: 'Lint', status: 'passed', duration: '42s' },
        { name: 'Build', status: 'passed', duration: '2m 5s' },
        { name: 'Unit Tests', status: 'passed', duration: '4m 12s' },
        { name: 'Integration Tests', status: 'passed', duration: '8m 30s' },
        { name: 'Deploy', status: 'passed', duration: '3m 20s' },
      ]},
    ],
    summary: { total: 48, passed: 38, failed: 6, running: 4 },
  });
});

router.get('/cicd/deployments', (_req: Request, res: Response) => {
  res.json([
    { id: 'D-1042', version: 'v2.4.1', environment: 'production', status: 'live', deployedAt: '2026-07-22T10:30:00Z', deployedBy: 'Sarah Chen', duration: '4m 20s', rollback: false },
    { id: 'D-1041', version: 'v2.4.0', environment: 'staging', status: 'live', deployedAt: '2026-07-21T14:00:00Z', deployedBy: 'Mike Johnson', duration: '3m 45s', rollback: false },
    { id: 'D-1040', version: 'v2.4.0-rc.1', environment: 'production', status: 'rolled-back', deployedAt: '2026-07-20T09:00:00Z', deployedBy: 'Alex Kim', duration: '2m 30s', rollback: true, rollbackReason: 'API timeout issues' },
    { id: 'D-1039', version: 'v2.3.2', environment: 'production', status: 'live', deployedAt: '2026-07-18T11:00:00Z', deployedBy: 'Sarah Chen', duration: '3m 10s', rollback: false },
    { id: 'D-1038', version: 'v2.3.1', environment: 'staging', status: 'superseded', deployedAt: '2026-07-17T16:00:00Z', deployedBy: 'Priya Patel', duration: '2m 55s', rollback: false },
  ]);
});

router.get('/cicd/releases', (_req: Request, res: Response) => {
  res.json([
    { version: 'v2.4.1', date: '2026-07-22', type: 'patch', author: 'Sarah Chen', changes: ['Bug fixes', 'Performance improvements'] },
    { version: 'v2.4.0', date: '2026-07-15', type: 'minor', author: 'Mike Johnson', changes: ['Payment gateway', 'Search indexing', 'New dashboard widgets'] },
    { version: 'v2.3.2', date: '2026-07-08', type: 'patch', author: 'Alex Kim', changes: ['Security patches', 'Dependency updates'] },
    { version: 'v2.3.1', date: '2026-07-01', type: 'patch', author: 'Sarah Chen', changes: ['Hotfix: Login redirect'] },
    { version: 'v2.3.0', date: '2026-06-20', type: 'minor', author: 'Mike Johnson', changes: ['Dark mode', 'New API endpoints', 'UI refresh'] },
  ]);
});

router.get('/cicd/build-logs', (_req: Request, res: Response) => {
  res.json([
    { id: 'BL-1001', pipeline: 'Backend CI/CD', commit: 'a1b2c3d', branch: 'develop', status: 'running', started: '5m ago', duration: '4m 30s', logs: ['[INFO] Cloning repository...', '[INFO] Installing dependencies...', '[INFO] Running linter... [PASSED]', '[INFO] Building project... [PASSED]', '[INFO] Running unit tests... [IN PROGRESS]'] },
    { id: 'BL-1000', pipeline: 'Frontend CI/CD', commit: 'e4f5g6h', branch: 'feature/dashboard-perf', status: 'failed', started: '15m ago', duration: '1m 40s', logs: ['[INFO] Cloning repository...', '[INFO] Installing dependencies...', '[INFO] Running linter... [PASSED]', '[ERROR] Build failed: TypeScript compilation error in src/components/Chart.tsx:124', '[ERROR] Type \'undefined\' is not assignable to type \'number\''] },
    { id: 'BL-999', pipeline: 'Backend CI/CD', commit: 'i7j8k9l', branch: 'main', status: 'passed', started: '1h ago', duration: '18m 49s', logs: ['[INFO] Cloning repository...', '[INFO] Installing dependencies...', '[INFO] Running linter... [PASSED]', '[INFO] Building project... [PASSED]', '[INFO] Running unit tests... [PASSED] (142/142)', '[INFO] Running integration tests... [PASSED] (36/36)', '[INFO] Deploying to production... [PASSED]'] },
  ]);
});

router.get('/infra/servers', (_req: Request, res: Response) => {
  res.json([
    { id: 'S-1', name: 'api-prod-01', type: 'Application', ip: '10.0.1.10', cpu: 62, memory: 71, disk: 54, status: 'healthy', uptime: '45d', os: 'Ubuntu 22.04' },
    { id: 'S-2', name: 'api-prod-02', type: 'Application', ip: '10.0.1.11', cpu: 48, memory: 55, disk: 42, status: 'healthy', uptime: '45d', os: 'Ubuntu 22.04' },
    { id: 'S-3', name: 'db-prod-01', type: 'Database', ip: '10.0.2.10', cpu: 35, memory: 82, disk: 78, status: 'healthy', uptime: '90d', os: 'Ubuntu 22.04' },
    { id: 'S-4', name: 'cache-prod-01', type: 'Cache', ip: '10.0.3.10', cpu: 28, memory: 45, disk: 22, status: 'healthy', uptime: '90d', os: 'Ubuntu 22.04' },
    { id: 'S-5', name: 'worker-prod-01', type: 'Worker', ip: '10.0.4.10', cpu: 75, memory: 68, disk: 35, status: 'degraded', uptime: '30d', os: 'Ubuntu 22.04' },
    { id: 'S-6', name: 'monitor-prod-01', type: 'Monitoring', ip: '10.0.5.10', cpu: 22, memory: 38, disk: 44, status: 'healthy', uptime: '60d', os: 'Ubuntu 22.04' },
  ]);
});

router.get('/infra/kubernetes', (_req: Request, res: Response) => {
  res.json({
    clusters: [
      { name: 'production', version: '1.28', nodes: 6, pods: 47, cpu: 62, memory: 55, status: 'healthy' },
      { name: 'staging', version: '1.28', nodes: 3, pods: 18, cpu: 35, memory: 40, status: 'healthy' },
      { name: 'development', version: '1.27', nodes: 2, pods: 12, cpu: 20, memory: 25, status: 'healthy' },
    ],
    namespaces: [
      { name: 'default', pods: 8, cpu: 15, memory: 20 },
      { name: 'backend', pods: 15, cpu: 35, memory: 30 },
      { name: 'frontend', pods: 10, cpu: 20, memory: 18 },
      { name: 'data', pods: 6, cpu: 18, memory: 25 },
      { name: 'monitoring', pods: 8, cpu: 12, memory: 15 },
    ],
  });
});

router.get('/infra/docker', (_req: Request, res: Response) => {
  res.json({
    containers: [
      { name: 'api-gateway', image: 'worksphere/gateway:2.4.1', status: 'running', ports: ['443', '80'], created: '2d ago', cpu: 0.5, memory: '128MB' },
      { name: 'auth-service', image: 'worksphere/auth:2.3.0', status: 'running', ports: ['9001'], created: '5d ago', cpu: 0.3, memory: '96MB' },
      { name: 'payment-service', image: 'worksphere/payment:2.4.0', status: 'running', ports: ['9002'], created: '7d ago', cpu: 0.8, memory: '256MB' },
      { name: 'notification-service', image: 'worksphere/notify:2.2.1', status: 'running', ports: ['9003'], created: '10d ago', cpu: 0.2, memory: '64MB' },
      { name: 'redis-cache', image: 'redis:7.2-alpine', status: 'running', ports: ['6379'], created: '30d ago', cpu: 0.4, memory: '32MB' },
      { name: 'postgres-db', image: 'postgres:16-alpine', status: 'running', ports: ['5432'], created: '90d ago', cpu: 1.2, memory: '512MB' },
    ],
    images: [
      { name: 'worksphere/gateway', tag: '2.4.1', size: '245MB', created: '2d ago' },
      { name: 'worksphere/backend', tag: '2.4.1', size: '380MB', created: '2d ago' },
      { name: 'worksphere/frontend', tag: '2.3.2', size: '180MB', created: '5d ago' },
      { name: 'postgres', tag: '16-alpine', size: '95MB', created: '90d ago' },
    ],
  });
});

router.get('/infra/cloud', (_req: Request, res: Response) => {
  res.json({
    providers: [
      { name: 'AWS', region: 'us-east-1', services: [
        { name: 'EC2', instances: 12, status: 'healthy' },
        { name: 'RDS', instances: 3, status: 'healthy' },
        { name: 'ECS', tasks: 8, status: 'healthy' },
        { name: 'ElastiCache', clusters: 2, status: 'healthy' },
        { name: 'S3', buckets: 15, status: 'healthy' },
      ], cost: { current: 12500, projected: 14800 }},
      { name: 'Cloudflare', region: 'global', services: [
        { name: 'DNS', zones: 3, status: 'healthy' },
        { name: 'CDN', bandwidth: '2.5 TB', status: 'healthy' },
        { name: 'WAF', rules: 24, status: 'healthy' },
      ], cost: { current: 200, projected: 200 }},
    ],
    totalCost: 12700,
  });
});

router.get('/analytics/velocity', (_req: Request, res: Response) => {
  res.json({
    current: 42,
    average: 38,
    trend: 'up',
    data: generateTrend(12, 28, 52),
    byMember: [
      { name: 'Sarah Chen', velocity: 48 },
      { name: 'Mike Johnson', velocity: 42 },
      { name: 'Priya Patel', velocity: 38 },
      { name: 'Alex Kim', velocity: 35 },
      { name: 'Tom Brown', velocity: 28 },
    ],
  });
});

router.get('/analytics/burndown', (_req: Request, res: Response) => {
  res.json({
    sprint: 'Sprint 24',
    totalPoints: 142,
    remainingPoints: 45,
    idealBurnRate: 10.14,
    actualBurnRate: 9.8,
    data: generateTimeSeries(14, 142, 10).map((d, i, arr) => ({
      date: d.date,
      remaining: Math.max(0, 142 - (142 / 14) * i + (Math.random() * 10 - 5)),
      ideal: Math.max(0, 142 - (142 / 14) * i),
    })),
  });
});

router.get('/analytics/productivity', (_req: Request, res: Response) => {
  res.json({
    score: 84,
    data: generateTrend(12, 60, 95),
    metrics: [
      { label: 'Code Reviews/Dev', value: 4.2, benchmark: 3.5 },
      { label: 'Commits/Dev/Day', value: 3.8, benchmark: 3.0 },
      { label: 'PR Merge Time (hrs)', value: 6.5, benchmark: 8.0 },
      { label: 'Bug Fix Rate (%)', value: 88, benchmark: 85 },
      { label: 'Test Coverage (%)', value: 82, benchmark: 80 },
    ],
  });
});

router.get('/analytics/code-quality', (_req: Request, res: Response) => {
  res.json({
    overall: 88,
    coverage: 82,
    technicalDebt: 4.5,
    securityRating: 'A',
    metrics: [
      { name: 'Duplication', value: 3.2, benchmark: '< 5%', status: 'good' },
      { name: 'Maintainability', value: 85, benchmark: '> 75', status: 'good' },
      { name: 'Reliability', value: 92, benchmark: '> 85', status: 'good' },
      { name: 'Security', value: 95, benchmark: '> 90', status: 'good' },
    ],
    recent: [
      { date: 'Week 1', coverage: 78, bugs: 12, codeSmells: 45 },
      { date: 'Week 2', coverage: 80, bugs: 8, codeSmells: 38 },
      { date: 'Week 3', coverage: 82, bugs: 6, codeSmells: 32 },
      { date: 'Week 4', coverage: 82, bugs: 5, codeSmells: 28 },
    ],
  });
});

router.get('/monitoring/servers', (_req: Request, res: Response) => {
  res.json({
    overall: 96,
    servers: [
      { name: 'api-prod-01', cpu: 62, memory: 71, disk: 54, responseTime: 45, status: 'healthy' },
      { name: 'api-prod-02', cpu: 48, memory: 55, disk: 42, responseTime: 38, status: 'healthy' },
      { name: 'db-prod-01', cpu: 35, memory: 82, disk: 78, responseTime: 12, status: 'healthy' },
      { name: 'cache-prod-01', cpu: 28, memory: 45, disk: 22, responseTime: 2, status: 'healthy' },
      { name: 'worker-prod-01', cpu: 75, memory: 68, disk: 35, responseTime: 120, status: 'degraded' },
    ],
  });
});

router.get('/monitoring/api', (_req: Request, res: Response) => {
  res.json({
    overall: 'operational',
    endpoints: [
      { path: '/api/auth', status: 'healthy', latency: 45, uptime: 99.9, requests: 1200 },
      { path: '/api/users', status: 'healthy', latency: 32, uptime: 99.8, requests: 850 },
      { path: '/api/projects', status: 'healthy', latency: 55, uptime: 99.7, requests: 420 },
      { path: '/api/payments', status: 'degraded', latency: 245, uptime: 98.5, requests: 180 },
      { path: '/api/analytics', status: 'healthy', latency: 120, uptime: 99.5, requests: 320 },
    ],
  });
});

router.get('/monitoring/database', (_req: Request, res: Response) => {
  res.json({
    overall: 'healthy',
    databases: [
      { name: 'PostgreSQL (Main)', status: 'healthy', connections: 45, queries: 120, lag: '0s', size: '245 GB' },
      { name: 'PostgreSQL (Analytics)', status: 'healthy', connections: 12, queries: 35, lag: '2s', size: '180 GB' },
      { name: 'Redis (Cache)', status: 'healthy', connections: 8, hitRate: 94, memory: '45%', size: '2.8 GB' },
      { name: 'MongoDB (Logs)', status: 'degraded', connections: 22, queries: 68, lag: '5s', size: '520 GB' },
    ],
  });
});

router.get('/monitoring/logs', (_req: Request, res: Response) => {
  res.json([
    { timestamp: '2026-07-22T14:32:00Z', level: 'error', service: 'payment-service', message: 'Payment gateway timeout after 30s', trace: 'pay-0a8f3' },
    { timestamp: '2026-07-22T14:30:00Z', level: 'warn', service: 'api-gateway', message: 'High latency on /api/payments endpoint (245ms)', trace: 'gw-b7e22' },
    { timestamp: '2026-07-22T14:28:00Z', level: 'info', service: 'auth-service', message: 'New user registration: user@example.com', trace: 'auth-c9d41' },
    { timestamp: '2026-07-22T14:25:00Z', level: 'error', service: 'api-gateway', message: '5xx error rate exceeding threshold (2.5%)', trace: 'gw-a1b2c' },
    { timestamp: '2026-07-22T14:20:00Z', level: 'info', service: 'deploy-service', message: 'Deployment v2.4.1 completed successfully', trace: 'dep-d3e4f' },
    { timestamp: '2026-07-22T14:15:00Z', level: 'warn', service: 'notification-service', message: 'Email queue backlog: 145 messages', trace: 'notif-g5h6i' },
    { timestamp: '2026-07-22T14:00:00Z', level: 'info', service: 'search-service', message: 'Search index rebuilt: 1.2M documents', trace: 'sch-j7k8l' },
    { timestamp: '2026-07-22T13:45:00Z', level: 'error', service: 'payment-service', message: 'Failed to process refund: invoice INV-2024-8921', trace: 'pay-m9n0o' },
  ]);
});

router.get('/monitoring/alerts', (_req: Request, res: Response) => {
  res.json([
    { id: 'AL-101', severity: 'critical', title: 'Payment service latency spike', service: 'payment-service', status: 'triggered', triggeredAt: '2026-07-22T14:30:00Z', value: '245ms', threshold: '100ms', acknowledged: false },
    { id: 'AL-100', severity: 'warning', title: 'High memory on db-prod-01', service: 'database', status: 'triggered', triggeredAt: '2026-07-22T13:00:00Z', value: '82%', threshold: '80%', acknowledged: false },
    { id: 'AL-99', severity: 'warning', title: 'Email queue backlog', service: 'notification-service', status: 'acknowledged', triggeredAt: '2026-07-22T12:00:00Z', value: '145 messages', threshold: '100', acknowledged: true, acknowledgedBy: 'Sarah Chen' },
    { id: 'AL-98', severity: 'info', title: 'Deployment v2.4.1 completed', service: 'deploy-service', status: 'resolved', triggeredAt: '2026-07-22T10:30:00Z', resolvedAt: '2026-07-22T10:35:00Z', value: 'OK', threshold: '-' },
    { id: 'AL-97', severity: 'critical', title: '5xx error rate exceeded', service: 'api-gateway', status: 'resolved', triggeredAt: '2026-07-22T09:00:00Z', resolvedAt: '2026-07-22T09:45:00Z', value: '2.5%', threshold: '1%', acknowledgedBy: 'Mike Johnson' },
  ]);
});

router.get('/ai/engineering', (_req: Request, res: Response) => {
  res.json({
    analysis: [
      { type: 'suggestion', message: 'Consider implementing connection pooling to reduce database connection overhead by up to 40%', priority: 'high', area: 'database' },
      { type: 'warning', message: 'WebSocket reconnection logic may cause memory leaks. Consider using WeakRef patterns.', priority: 'high', area: 'backend' },
      { type: 'suggestion', message: 'Bundle size increased by 12% this sprint. Consider code splitting for dashboard components.', priority: 'medium', area: 'frontend' },
      { type: 'optimization', message: 'API response times can be improved by 30% with Redis caching for frequently accessed endpoints.', priority: 'medium', area: 'backend' },
      { type: 'suggestion', message: 'Test coverage dropped to 82%. Focus on edge case coverage for payment flows.', priority: 'high', area: 'qa' },
    ],
    stats: { suggestions: 12, warnings: 3, optimizations: 8 },
  });
});

router.post('/ai/code-generator', (req: Request, res: Response) => {
  const { prompt, language } = req.body;
  const snippets: Record<string, string> = {
    typescript: '// Generated TypeScript code\ninterface User {\n  id: string;\n  name: string;\n  email: string;\n  role: Role;\n}\n\nasync function fetchUsers(): Promise<User[]> {\n  const response = await fetch(\'/api/users\');\n  if (!response.ok) throw new Error(\'Failed to fetch users\');\n  return response.json();\n}',
    python: '# Generated Python code\nfrom typing import List, Optional\nfrom pydantic import BaseModel\n\nclass User(BaseModel):\n    id: str\n    name: str\n    email: str\n    role: str\n\nasync def fetch_users() -> List[User]:\n    async with aiohttp.ClientSession() as session:\n        async with session.get(\'/api/users\') as response:\n            if response.status != 200:\n                raise Exception(\'Failed to fetch users\')\n            return [User(**u) for u in await response.json()]',
    javascript: '// Generated JavaScript code\nasync function fetchUsers() {\n  const response = await fetch(\'/api/users\');\n  if (!response.ok) throw new Error(\'Failed to fetch users\');\n  return response.json();\n}',
  };
  res.json({ code: snippets[language || 'typescript'] || snippets.typescript, language: language || 'typescript' });
});

router.post('/ai/sql-generator', (req: Request, res: Response) => {
  const { prompt } = req.body;
  res.json({
    sql: `-- Generated SQL based on: "${prompt || 'default query'}"\nSELECT \n  u.id,\n  u.name,\n  u.email,\n  COUNT(t.id) as task_count,\n  AVG(t.story_points) as avg_story_points\nFROM users u\nLEFT JOIN tasks t ON t.assignee_id = u.id\nWHERE t.created_at >= NOW() - INTERVAL '30 days'\nGROUP BY u.id, u.name, u.email\nORDER BY task_count DESC\nLIMIT 10;`,
    explanation: 'This query fetches the top 10 users by task count in the last 30 days, along with their average story points.',
  });
});

router.post('/ai/documentation', (req: Request, res: Response) => {
  const { topic, type } = req.body;
  res.json({
    title: `${topic || 'API'} Documentation`,
    content: `# ${topic || 'API'} Documentation\n\n## Overview\nThis documentation covers the ${topic || 'API'} implementation in the WorkSphere Enterprise platform.\n\n## Getting Started\n\n### Prerequisites\n- Node.js 18+\n- Access to the WorkSphere repository\n- Appropriate environment variables configured\n\n### Installation\n\`\`\`bash\nnpm install @worksphere/${(topic || 'api').toLowerCase().replace(/\\s+/g, '-')}\n\`\`\`\n\n## Usage\n\n### Basic Example\n\`\`\`typescript\nimport { ${(topic || 'api').replace(/\\s+/g, '')} } from '@worksphere/sdk';\n\nconst client = new ${(topic || 'api').replace(/\\s+/g, '')}({\n  apiKey: process.env.WORKSPHERE_API_KEY,\n});\n\nconst result = await client.query({ limit: 10 });\nconsole.log(result);\n\`\`\`\n\n## API Reference\n\n### Endpoints\n\n#### GET /api/v1/resource\nReturns a list of resources.\n\n**Query Parameters:**\n- \`limit\` (number): Maximum number of results\n- \`offset\` (number): Pagination offset\n- \`sort\` (string): Sort field and direction\n\n**Response:**\n\`\`\`json\n{\n  "data": [],\n  "total": 100,\n  "limit": 10,\n  "offset": 0\n}\n\`\`\`\n\n## Best Practices\n1. Always handle errors appropriately\n2. Use pagination for large result sets\n3. Cache responses when possible\n4. Monitor API usage and rate limits`,
    type: type || 'markdown',
  });
});

router.get('/docs/api', (_req: Request, res: Response) => {
  res.json({
    title: 'WorkSphere API Reference',
    version: 'v2.4.0',
    baseUrl: 'https://api.worksphere.com/v2',
    endpoints: [
      { method: 'GET', path: '/auth/login', description: 'Authenticate user', auth: false },
      { method: 'GET', path: '/users', description: 'List all users', auth: true },
      { method: 'GET', path: '/users/:id', description: 'Get user by ID', auth: true },
      { method: 'POST', path: '/users', description: 'Create new user', auth: true, roles: ['ADMIN'] },
      { method: 'PUT', path: '/users/:id', description: 'Update user', auth: true, roles: ['ADMIN'] },
      { method: 'DELETE', path: '/users/:id', description: 'Delete user', auth: true, roles: ['ADMIN'] },
      { method: 'GET', path: '/projects', description: 'List projects', auth: true },
      { method: 'POST', path: '/projects', description: 'Create project', auth: true, roles: ['MANAGER'] },
      { method: 'GET', path: '/tasks', description: 'List tasks', auth: true },
      { method: 'POST', path: '/tasks', description: 'Create task', auth: true },
      { method: 'GET', path: '/sprints/:id', description: 'Get sprint details', auth: true },
      { method: 'GET', path: '/analytics/velocity', description: 'Team velocity data', auth: true },
    ],
  });
});

router.get('/docs/technical', (_req: Request, res: Response) => {
  res.json({
    sections: [
      { title: 'Architecture Overview', content: 'WorkSphere follows a microservices architecture with an API gateway pattern. The frontend is built with React 18 + Vite, while the backend uses Express.js with both MongoDB and PostgreSQL for data storage.' },
      { title: 'Authentication Flow', content: 'JWT-based authentication with refresh tokens. Tokens expire after 24 hours. MFA support via TOTP. Role-based access control (RBAC) enforced at both route and component level.' },
      { title: 'WebSocket Architecture', content: 'Socket.IO for real-time communication. Used for chat, notifications, live monitoring, and collaborative features. Auto-reconnect with exponential backoff.' },
      { title: 'Data Pipeline', content: 'Event-driven architecture using Kafka for async processing. RabbitMQ for task queues. Data flows from services through the event bus to analytics and storage layers.' },
      { title: 'Deployment Strategy', content: 'Blue-green deployments via Kubernetes. Canary releases for high-risk changes. Automated rollback on health check failures. Infrastructure as Code using Terraform.' },
    ],
  });
});

router.get('/docs/architecture', (_req: Request, res: Response) => {
  res.json({
    diagrams: [
      { name: 'System Architecture', layers: ['Client Layer', 'CDN', 'Load Balancer', 'API Gateway', 'Microservices', 'Data Layer', 'Cache Layer'] },
      { name: 'Data Flow', stages: ['Client Request', 'API Gateway', 'Auth Service', 'Business Logic', 'Database', 'Response'] },
    ],
    principles: [
      'Microservices with single responsibility',
      'Stateless services for horizontal scaling',
      'Asynchronous communication via message queues',
      'CQRS for read/write separation',
      'Event sourcing for audit trails',
      'Infrastructure as Code',
      'Security by design',
      'Observability first',
    ],
    technologies: {
      frontend: ['React 18', 'TypeScript', 'Vite', 'Tailwind CSS', 'Framer Motion'],
      backend: ['Node.js', 'Express', 'TypeScript', 'Socket.IO'],
      databases: ['PostgreSQL', 'MongoDB', 'Redis', 'Elasticsearch'],
      devops: ['Docker', 'Kubernetes', 'Terraform', 'GitHub Actions', 'ArgoCD'],
      monitoring: ['Prometheus', 'Grafana', 'Datadog', 'ELK Stack'],
    },
  });
});

router.get('/meetings', (_req: Request, res: Response) => {
  res.json({
    today: [
      { id: 'M-1', title: 'Daily Standup', time: '09:30 AM', duration: '15m', attendees: 12, type: 'standup', room: 'Team Standup' },
      { id: 'M-2', title: 'Sprint Planning', time: '10:00 AM', duration: '1h', attendees: 8, type: 'planning', room: 'Sprint Room' },
      { id: 'M-3', title: 'Architecture Review', time: '02:00 PM', duration: '45m', attendees: 5, type: 'review', room: 'Architecture' },
    ],
    upcoming: [
      { id: 'M-4', title: 'Retrospective', date: '2026-07-24', time: '11:00 AM', duration: '1h', attendees: 10, type: 'retro' },
      { id: 'M-5', title: '1:1 with Sarah Chen', date: '2026-07-25', time: '10:00 AM', duration: '30m', attendees: 2, type: 'one-on-one' },
    ],
  });
});

router.get('/chat/channels', (_req: Request, res: Response) => {
  res.json([
    { id: 'C-1', name: 'general', type: 'team', unread: 2, lastMessage: 'Updated deployment schedule for v2.4.1', lastActive: '2m ago' },
    { id: 'C-2', name: 'backend-team', type: 'team', unread: 5, lastMessage: 'WebSocket reconnection PR is ready for review', lastActive: '15m ago' },
    { id: 'C-3', name: 'frontend-team', type: 'team', unread: 0, lastMessage: 'Dashboard perf test results are looking good', lastActive: '1h ago' },
    { id: 'C-4', name: 'project-redesign', type: 'project', unread: 3, lastMessage: 'Updated the design tokens PR', lastActive: '30m ago' },
    { id: 'C-5', name: 'incidents', type: 'team', unread: 1, lastMessage: 'Payment service latency alert triggered', lastActive: '5m ago' },
    { id: 'C-6', name: 'announcements', type: 'team', unread: 0, lastMessage: 'Welcome to the team, Lisa!', lastActive: '2d ago' },
  ]);
});

router.get('/chat/messages/:channelId', (req: Request, res: Response) => {
  const messages = {
    'C-1': [
      { id: 'M-101', userId: 'U-1', name: 'Sarah Chen', message: 'Updated deployment schedule for v2.4.1', time: '2m ago', reactions: [{ emoji: '+1', count: 3 }] },
      { id: 'M-100', userId: 'U-2', name: 'Mike Johnson', message: 'PR #1424 is ready for review. Dashboard performance improved by 40%.', time: '10m ago', reactions: [] },
      { id: 'M-99', userId: 'U-3', name: 'Alex Kim', message: 'Has anyone looked at the WebSocket reconnection PR?', time: '15m ago', reactions: [{ emoji: 'eyes', count: 2 }] },
      { id: 'M-98', userId: 'U-1', name: 'Sarah Chen', message: 'Yes, I\'ll review it this afternoon. Just finishing up the payment gateway integration.', time: '18m ago', reactions: [] },
      { id: 'M-97', userId: 'U-4', name: 'Emily Davis', message: 'Test suite for regression is complete. Ready for CI.', time: '30m ago', reactions: [{ emoji: 'rocket', count: 4 }] },
    ],
    'C-5': [
      { id: 'M-200', userId: 'U-5', name: 'James Wilson', message: 'Payment service latency alert triggered. Investigating now.', time: '5m ago', reactions: [] },
      { id: 'M-199', userId: 'U-1', name: 'Sarah Chen', message: 'I noticed the timeout in the payment gateway. Looking at the logs.', time: '3m ago', reactions: [] },
    ],
  };
  const channelId = req.params.channelId as string;
  res.json((messages as Record<string, any>)[channelId] || messages['C-1']);
});

router.post('/chat/send', (req: Request, res: Response) => {
  const { channelId, message, userId, userName } = req.body;
  res.json({
    id: `M-${Date.now()}`,
    userId: userId || 'U-1',
    name: userName || 'You',
    message,
    time: 'just now',
    reactions: [],
  });
});

router.get('/notifications', (_req: Request, res: Response) => {
  res.json([
    { id: 'N-1', type: 'task', message: 'PR #1425 requires your review', time: '5m ago', read: false },
    { id: 'N-2', type: 'build', message: 'Frontend build failed (commit e4f5g6h)', time: '15m ago', read: false },
    { id: 'N-3', type: 'deploy', message: 'Backend v2.4.1 deployed to production', time: '30m ago', read: false },
    { id: 'N-4', type: 'alert', message: 'Payment service latency alert', time: '1h ago', read: false },
    { id: 'N-5', type: 'mention', message: 'Sarah Chen mentioned you in #general', time: '2h ago', read: true },
    { id: 'N-6', type: 'meeting', message: 'Sprint Planning starts in 15 minutes', time: '3h ago', read: true },
    { id: 'N-7', type: 'security', message: 'Security scan completed - 2 vulnerabilities found', time: '5h ago', read: true },
  ]);
});

router.get('/reports', (_req: Request, res: Response) => {
  res.json({
    sprint: {
      current: { name: 'Sprint 24', completion: 68, velocity: 42, bugsFound: 5, storiesCompleted: 28 },
      historical: [
        { name: 'Sprint 23', completion: 92, velocity: 38, bugsFound: 2, storiesCompleted: 35 },
        { name: 'Sprint 22', completion: 80, velocity: 35, bugsFound: 6, storiesCompleted: 32 },
        { name: 'Sprint 21', completion: 94, velocity: 40, bugsFound: 3, storiesCompleted: 33 },
      ],
    },
    team: {
      members: 8,
      avgProductivity: 84,
      avgVelocity: 38,
      sprintCompletion: 88,
      reviewTurnaround: '4.2h',
    },
    project: {
      total: 5,
      active: 4,
      onTrack: 3,
      atRisk: 1,
      avgProgress: 55,
    },
  });
});

router.get('/settings', (_req: Request, res: Response) => {
  res.json({
    profile: { name: 'Tech Lead', email: 'techlead@worksphere.com', role: 'TECH_LEAD', team: 'Platform Engineering' },
    preferences: { notifications: true, emailReports: true, slackIntegration: false, autoRefresh: true, refreshInterval: 10 },
    integrations: [
      { name: 'GitHub', connected: true, lastSync: '2m ago' },
      { name: 'Jira', connected: true, lastSync: '5m ago' },
      { name: 'Slack', connected: false },
      { name: 'Datadog', connected: true, lastSync: '1m ago' },
      { name: 'PagerDuty', connected: true, lastSync: '3m ago' },
    ],
  });
});

export default router;
