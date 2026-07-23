import { Router, Request, Response } from 'express';
import { authenticate } from '../middleware/auth';

const router = Router();

router.use(authenticate);

const now = new Date();
const today = now.toISOString().split('T')[0];
const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const randomPick = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const randomBool = () => Math.random() > 0.5;

const names = ['Sarah Chen', 'Mike Johnson', 'Alex Kim', 'Emily Davis', 'James Wilson', 'Priya Patel', 'Tom Brown', 'Lisa Wang', 'David Lee', 'Rachel Green'];
const priorities = ['critical', 'high', 'medium', 'low'] as const;
const statuses = ['todo', 'in-progress', 'review', 'done'] as const;
const taskTypes = ['feature', 'bug', 'chore', 'perf', 'test', 'design'] as const;
const severities = ['critical', 'high', 'medium', 'low'] as const;

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

const tasks = [
  { id: 'T-101', title: 'Implement OAuth2 SSO', priority: 'high', status: 'todo', assignee: 'Sarah Chen', sprint: 'Sprint 24', storyPoints: 8, type: 'feature', dueDate: '2026-07-25' },
  { id: 'T-102', title: 'Design system color tokens', priority: 'medium', status: 'todo', assignee: 'Mike Johnson', sprint: 'Sprint 24', storyPoints: 5, type: 'design', dueDate: '2026-07-26' },
  { id: 'T-103', title: 'API rate limiting middleware', priority: 'high', status: 'todo', assignee: 'Alex Kim', sprint: 'Sprint 24', storyPoints: 6, type: 'feature', dueDate: '2026-07-27' },
  { id: 'T-89', title: 'WebSocket reconnection logic', priority: 'critical', status: 'in-progress', assignee: 'Sarah Chen', sprint: 'Sprint 24', storyPoints: 8, type: 'feature', dueDate: '2026-07-23' },
  { id: 'T-92', title: 'Dashboard performance optimization', priority: 'high', status: 'in-progress', assignee: 'Mike Johnson', sprint: 'Sprint 24', storyPoints: 6, type: 'perf', dueDate: '2026-07-25' },
  { id: 'T-95', title: 'Search indexing pipeline', priority: 'medium', status: 'in-progress', assignee: 'Priya Patel', sprint: 'Sprint 24', storyPoints: 7, type: 'feature', dueDate: '2026-07-26' },
  { id: 'T-97', title: 'Regression test suite', priority: 'high', status: 'in-progress', assignee: 'Emily Davis', sprint: 'Sprint 24', storyPoints: 5, type: 'test', dueDate: '2026-07-24' },
  { id: 'T-85', title: 'Payment gateway integration', priority: 'critical', status: 'review', assignee: 'Sarah Chen', sprint: 'Sprint 24', storyPoints: 10, type: 'feature', dueDate: '2026-07-24' },
  { id: 'T-88', title: 'Mobile responsive nav', priority: 'medium', status: 'review', assignee: 'Tom Brown', sprint: 'Sprint 24', storyPoints: 4, type: 'feature', dueDate: '2026-07-25' },
  { id: 'T-76', title: 'User avatar upload', priority: 'low', status: 'done', assignee: 'Mike Johnson', sprint: 'Sprint 24', storyPoints: 3, type: 'feature', dueDate: '2026-07-21' },
  { id: 'T-78', title: 'Log aggregation setup', priority: 'medium', status: 'done', assignee: 'James Wilson', sprint: 'Sprint 24', storyPoints: 5, type: 'chore', dueDate: '2026-07-20' },
  { id: 'T-80', title: 'Unit test coverage reports', priority: 'medium', status: 'done', assignee: 'Emily Davis', sprint: 'Sprint 24', storyPoints: 4, type: 'test', dueDate: '2026-07-19' },
  { id: 'T-82', title: 'Docker compose for dev env', priority: 'low', status: 'done', assignee: 'Alex Kim', sprint: 'Sprint 24', storyPoints: 3, type: 'chore', dueDate: '2026-07-18' },
  { id: 'T-104', title: 'Database backup automation', priority: 'low', status: 'todo', assignee: 'James Wilson', sprint: 'Sprint 24', storyPoints: 3, type: 'chore', dueDate: '2026-07-28' },
  { id: 'T-105', title: 'Multi-factor authentication', priority: 'high', status: 'todo', assignee: null, sprint: 'Backlog', storyPoints: 13, type: 'feature', dueDate: null },
  { id: 'T-106', title: 'Real-time collaboration', priority: 'high', status: 'todo', assignee: null, sprint: 'Backlog', storyPoints: 21, type: 'feature', dueDate: null },
  { id: 'T-107', title: 'Dark mode support', priority: 'medium', status: 'todo', assignee: null, sprint: 'Backlog', storyPoints: 5, type: 'feature', dueDate: null },
];

const repos = [
  { id: 'R-1', name: 'backend-api', language: 'TypeScript', stars: 24, forks: 8, prs: 3, issues: 5, lastCommit: '2m ago', branchCount: 8, description: 'Core backend API service' },
  { id: 'R-2', name: 'frontend-web', language: 'TypeScript', stars: 18, forks: 6, prs: 5, issues: 8, lastCommit: '15m ago', branchCount: 12, description: 'Web application frontend' },
  { id: 'R-3', name: 'mobile-app', language: 'Kotlin', stars: 12, forks: 3, prs: 2, issues: 4, lastCommit: '1h ago', branchCount: 5, description: 'Android mobile application' },
  { id: 'R-4', name: 'shared-lib', language: 'TypeScript', stars: 8, forks: 12, prs: 1, issues: 2, lastCommit: '3h ago', branchCount: 6, description: 'Shared utilities and types' },
  { id: 'R-5', name: 'infrastructure', language: 'HCL', stars: 6, forks: 2, prs: 0, issues: 1, lastCommit: '5h ago', branchCount: 4, description: 'Terraform infrastructure as code' },
];

const branches = [
  { name: 'main', commits: 342, lastCommit: '2m ago', author: 'Sarah Chen', protection: true, ci: 'passing' },
  { name: 'develop', commits: 528, lastCommit: '5m ago', author: 'Mike Johnson', protection: true, ci: 'passing' },
  { name: 'feature/ws-reconnect', commits: 12, lastCommit: '2h ago', author: 'Sarah Chen', protection: false, ci: 'passing' },
  { name: 'feature/dashboard-perf', commits: 8, lastCommit: '5h ago', author: 'Mike Johnson', protection: false, ci: 'pending' },
  { name: 'fix/safari-login', commits: 3, lastCommit: '1d ago', author: 'Tom Brown', protection: false, ci: 'failing' },
  { name: 'release/v2.4.0', commits: 15, lastCommit: '3d ago', author: 'Alex Kim', protection: true, ci: 'passing' },
  { name: 'feature/data-pipeline', commits: 22, lastCommit: '4h ago', author: 'Priya Patel', protection: false, ci: 'passing' },
  { name: 'fix/payment-timeout', commits: 5, lastCommit: '6h ago', author: 'Sarah Chen', protection: false, ci: 'pending' },
];

const commits = [
  { hash: 'a1b2c3d', message: 'fix: resolve WebSocket reconnection issue', author: 'Sarah Chen', repo: 'backend-api', timestamp: new Date(Date.now() - 5 * 60000).toISOString() },
  { hash: 'e4f5g6h', message: 'feat: add real-time dashboard widgets', author: 'Mike Johnson', repo: 'frontend-web', timestamp: new Date(Date.now() - 18 * 60000).toISOString() },
  { hash: 'i7j8k9l', message: 'chore: update dependencies', author: 'Alex Kim', repo: 'shared-lib', timestamp: new Date(Date.now() - 42 * 60000).toISOString() },
  { hash: 'm9n0o1p', message: 'feat: implement payment gateway integration', author: 'Sarah Chen', repo: 'backend-api', timestamp: new Date(Date.now() - 2 * 3600000).toISOString() },
  { hash: 'q2r3s4t', message: 'test: add integration tests for search API', author: 'Emily Davis', repo: 'backend-api', timestamp: new Date(Date.now() - 4 * 3600000).toISOString() },
  { hash: 'u5v6w7x', message: 'fix: date picker timezone bug', author: 'Tom Brown', repo: 'mobile-app', timestamp: new Date(Date.now() - 6 * 3600000).toISOString() },
  { hash: 'y8z9a0b', message: 'feat: search indexing pipeline', author: 'Priya Patel', repo: 'backend-api', timestamp: new Date(Date.now() - 8 * 3600000).toISOString() },
  { hash: 'c1d2e3f', message: 'docs: update API documentation', author: 'Alex Kim', repo: 'backend-api', timestamp: new Date(Date.now() - 24 * 3600000).toISOString() },
  { hash: 'g4h5i6j', message: 'perf: optimize dashboard chart rendering', author: 'Mike Johnson', repo: 'frontend-web', timestamp: new Date(Date.now() - 30 * 3600000).toISOString() },
  { hash: 'k7l8m9n', message: 'chore: configure CI/CD pipeline', author: 'James Wilson', repo: 'infrastructure', timestamp: new Date(Date.now() - 48 * 3600000).toISOString() },
];

/* ---- Dashboard ---- */

router.get('/dashboard', (_req: Request, res: Response) => {
  res.json({
    activeTasks: randomInt(8, 16),
    pendingPRs: randomInt(3, 8),
    sprintProgress: randomInt(55, 85),
    focusTime: randomInt(4, 8),
    velocity: randomInt(30, 50),
    tasksCompletedToday: randomInt(2, 6),
    storyPointsCompleted: randomInt(8, 20),
    currentSprint: {
      name: 'Sprint 24',
      progress: randomInt(60, 80),
      startDate: '2026-07-14',
      endDate: '2026-07-27',
      totalTasks: 42,
      completedTasks: 28,
      inProgressTasks: 10,
      pendingTasks: 4,
    },
    activityFeed: [
      { id: '1', type: 'deploy', message: 'Backend v2.4.1 deployed to production', user: 'Sarah Chen', time: '2m ago' },
      { id: '2', type: 'pr', message: 'PR #1423 merged - Fix payment gateway timeout', user: 'Mike Johnson', time: '15m ago' },
      { id: '3', type: 'build', message: 'Frontend build passed (commit a3f2b1c)', user: 'CI/CD', time: '28m ago' },
      { id: '4', type: 'bug', message: 'Bug #487 opened - Login fails on Safari', user: 'Emily Davis', time: '1h ago' },
      { id: '5', type: 'review', message: 'Code review requested for PR #1425', user: 'Alex Kim', time: '2h ago' },
    ],
    notifications: [
      { id: 'N-1', type: 'review', message: 'PR #1425 requires your review', time: '5m ago', read: false },
      { id: 'N-2', type: 'build', message: 'Frontend build failed (commit e4f5g6h)', time: '15m ago', read: false },
      { id: 'N-3', type: 'deploy', message: 'Backend v2.4.1 deployed to production', time: '30m ago', read: false },
    ],
  });
});

/* ---- My Work ---- */

router.get('/my-work', (_req: Request, res: Response) => {
  res.json({
    todaysTasks: tasks.filter(t => t.status === 'in-progress' || t.status === 'review').slice(0, 4),
    upcomingDeadlines: tasks.filter(t => t.dueDate && t.status !== 'done').sort((a, b) => (a.dueDate || '').localeCompare(b.dueDate || '')).slice(0, 5),
    recentActivity: [
      { id: 'A-1', action: 'pushed to', target: 'feature/ws-reconnect', repo: 'backend-api', time: '2h ago' },
      { id: 'A-2', action: 'commented on', target: 'PR #1423', repo: 'backend-api', time: '4h ago' },
      { id: 'A-3', action: 'opened', target: 'PR #1425', repo: 'backend-api', time: '1d ago' },
    ],
    workSummary: {
      totalCommits: randomInt(8, 20),
      linesChanged: randomInt(200, 800),
      filesModified: randomInt(10, 30),
      reviewsCompleted: randomInt(2, 6),
      prsOpened: randomInt(1, 4),
      prsMerged: randomInt(1, 3),
    },
  });
});

/* ---- Tasks ---- */

router.get('/tasks', (req: Request, res: Response) => {
  const { status: filterStatus, priority: filterPriority, assignee: filterAssignee, sprint: filterSprint } = req.query;
  let filtered = [...tasks];
  if (filterStatus) filtered = filtered.filter(t => t.status === filterStatus);
  if (filterPriority) filtered = filtered.filter(t => t.priority === filterPriority);
  if (filterAssignee) filtered = filtered.filter(t => t.assignee === filterAssignee);
  if (filterSprint) filtered = filtered.filter(t => t.sprint === filterSprint);
  res.json(filtered);
});

router.post('/tasks', (req: Request, res: Response) => {
  const { title, priority, assignee, storyPoints, type } = req.body;
  res.status(201).json({
    id: `T-${randomInt(200, 999)}`,
    title: title || 'New Task',
    priority: priority || 'medium',
    status: 'todo',
    assignee: assignee || null,
    sprint: 'Sprint 24',
    storyPoints: storyPoints || 3,
    type: type || 'feature',
    dueDate: null,
    createdAt: new Date().toISOString(),
  });
});

router.put('/tasks/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, priority, status, assignee, storyPoints } = req.body;
  const existing = tasks.find(t => t.id === id);
  res.json({
    id,
    title: title || (existing ? existing.title : 'Updated Task'),
    priority: priority || (existing ? existing.priority : 'medium'),
    status: status || (existing ? existing.status : 'todo'),
    assignee: assignee || (existing ? existing.assignee : null),
    sprint: existing ? existing.sprint : 'Sprint 24',
    storyPoints: storyPoints || (existing ? existing.storyPoints : 3),
    type: existing ? existing.type : 'feature',
    dueDate: existing ? existing.dueDate : null,
    updatedAt: new Date().toISOString(),
  });
});

router.delete('/tasks/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `Task ${id} deleted successfully`, deleted: true });
});

/* ---- Sprint Board ---- */

router.get('/sprints/board', (_req: Request, res: Response) => {
  res.json({
    columns: [
      {
        title: 'To Do', limit: 10, tasks: tasks.filter(t => t.status === 'todo'),
      },
      {
        title: 'In Progress', tasks: tasks.filter(t => t.status === 'in-progress'),
      },
      {
        title: 'Code Review', tasks: tasks.filter(t => t.status === 'review'),
      },
      {
        title: 'Done', tasks: tasks.filter(t => t.status === 'done'),
      },
    ],
    sprint: { name: 'Sprint 24', progress: 68, startDate: '2026-07-14', endDate: '2026-07-27' },
  });
});

router.get('/sprints/active', (_req: Request, res: Response) => {
  res.json({
    sprint: { name: 'Sprint 24', goal: 'Complete payment integration and dashboard optimizations', daysRemaining: 5, totalDays: 14, progress: 68 },
    burndown: generateTimeSeries(14, 42, 5).map(d => ({ ...d, ideal: 42 - (42 / 14) * (14 - Math.abs(new Date(d.date).getDate() - new Date().getDate())) })),
    tasksRemaining: 14,
    tasksCompleted: 28,
    totalStoryPoints: 142,
    completedPoints: 96,
    goals: [
      { id: 'G-1', title: 'Payment gateway integration', status: 'in-progress', progress: 70 },
      { id: 'G-2', title: 'Dashboard performance optimization', status: 'in-progress', progress: 50 },
      { id: 'G-3', title: 'Regression test suite completion', status: 'in-progress', progress: 40 },
    ],
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
    ],
    epics: ['Security', 'Collaboration', 'UI/UX', 'Reports', 'Notifications', 'Integrations', 'Monitoring'],
  });
});

/* ---- Kanban ---- */

router.get('/kanban', (_req: Request, res: Response) => {
  res.json({
    columns: [
      { title: 'Backlog', color: 'slate', tasks: tasks.filter(t => t.status === 'todo' && t.sprint === 'Backlog').map(t => ({ id: t.id, title: t.title, priority: t.priority, type: t.type })) },
      { title: 'Ready', color: 'blue', tasks: tasks.filter(t => t.status === 'todo' && t.sprint !== 'Backlog').map(t => ({ id: t.id, title: t.title, priority: t.priority, type: t.type })) },
      { title: 'In Progress', color: 'amber', tasks: tasks.filter(t => t.status === 'in-progress').map(t => ({ id: t.id, title: t.title, priority: t.priority, type: t.type })) },
      { title: 'Review', color: 'purple', tasks: tasks.filter(t => t.status === 'review').map(t => ({ id: t.id, title: t.title, priority: t.priority, type: t.type })) },
      { title: 'Done', color: 'green', tasks: tasks.filter(t => t.status === 'done').map(t => ({ id: t.id, title: t.title, priority: t.priority, type: t.type })) },
    ],
    swimlanes: [
      { name: 'Features', tasks: ['T-101', 'T-89', 'T-85', 'T-76', 'T-105'] },
      { name: 'Bugs', tasks: ['T-103', 'T-92', 'T-104'] },
      { name: 'Tech Debt', tasks: ['T-78', 'T-82'] },
    ],
  });
});

/* ---- Bugs ---- */

router.get('/bugs', (_req: Request, res: Response) => {
  res.json([
    { id: 'BUG-487', title: 'Login fails on Safari browser', severity: 'critical', status: 'open', reporter: 'Emily Davis', assignee: null, created: '2026-07-22', environment: 'production', affectedVersion: 'v2.4.0' },
    { id: 'BUG-486', title: 'WebSocket disconnects after 5 min', severity: 'high', status: 'in-progress', reporter: 'Alex Kim', assignee: 'Sarah Chen', created: '2026-07-21', environment: 'staging', affectedVersion: 'v2.4.0' },
    { id: 'BUG-485', title: 'Date picker shows wrong timezone', severity: 'medium', status: 'resolved', reporter: 'Mike Johnson', assignee: 'Tom Brown', created: '2026-07-20', environment: 'production', affectedVersion: 'v2.3.2' },
    { id: 'BUG-484', title: 'Memory leak in dashboard charts', severity: 'high', status: 'open', reporter: 'Priya Patel', assignee: null, created: '2026-07-19', environment: 'production', affectedVersion: 'v2.4.0' },
    { id: 'BUG-483', title: 'Search results not paginating', severity: 'medium', status: 'in-progress', reporter: 'Sarah Chen', assignee: 'Priya Patel', created: '2026-07-18', environment: 'production', affectedVersion: 'v2.4.0' },
    { id: 'BUG-482', title: 'CSS overflow in mobile nav', severity: 'low', status: 'open', reporter: 'Tom Brown', assignee: null, created: '2026-07-17', environment: 'production', affectedVersion: 'v2.3.2' },
    { id: 'BUG-481', title: 'Payment API returns 500 on timeout', severity: 'critical', status: 'open', reporter: 'James Wilson', assignee: 'Sarah Chen', created: '2026-07-16', environment: 'production', affectedVersion: 'v2.4.0' },
  ]);
});

router.post('/bugs', (req: Request, res: Response) => {
  const { title, severity, description, environment } = req.body;
  res.status(201).json({
    id: `BUG-${randomInt(488, 999)}`,
    title: title || 'New Bug',
    severity: severity || 'medium',
    status: 'open',
    reporter: 'You',
    assignee: null,
    created: today,
    environment: environment || 'production',
    description: description || '',
  });
});

/* ---- Features ---- */

router.get('/features', (_req: Request, res: Response) => {
  res.json([
    { id: 'FR-22', title: 'Real-time collaboration editor', status: 'proposed', priority: 'high', votes: 12, submittedBy: 'Alex Kim', date: '2026-07-15', department: 'Engineering' },
    { id: 'FR-21', title: 'Slack/Discord integration', status: 'approved', priority: 'high', votes: 24, submittedBy: 'Sarah Chen', date: '2026-07-10', department: 'Product' },
    { id: 'FR-20', title: 'Advanced filtering in tables', status: 'in-progress', priority: 'medium', votes: 8, submittedBy: 'Mike Johnson', date: '2026-07-05', department: 'Engineering' },
    { id: 'FR-19', title: 'Voice message support in chat', status: 'proposed', priority: 'low', votes: 5, submittedBy: 'Emily Davis', date: '2026-06-28', department: 'Product' },
    { id: 'FR-18', title: 'Dark mode with custom themes', status: 'completed', priority: 'medium', votes: 18, submittedBy: 'Tom Brown', date: '2026-06-20', department: 'Design' },
    { id: 'FR-17', title: 'AI-powered code suggestions', status: 'approved', priority: 'high', votes: 32, submittedBy: 'Priya Patel', date: '2026-06-15', department: 'Engineering' },
  ]);
});

/* ---- Code Reviews ---- */

router.get('/code-reviews', (_req: Request, res: Response) => {
  res.json([
    { id: 'PR-1425', title: 'fix: WebSocket reconnection with exponential backoff', repo: 'backend-api', author: 'Sarah Chen', status: 'open', createdAt: '2h ago', comments: 5, reviewers: ['Mike Johnson', 'Alex Kim'], ci: 'passing', conflicts: false, additions: 124, deletions: 32, files: 8 },
    { id: 'PR-1424', title: 'feat: Dashboard performance optimization', repo: 'frontend-web', author: 'Mike Johnson', status: 'open', createdAt: '5h ago', comments: 3, reviewers: ['Sarah Chen'], ci: 'pending', conflicts: false, additions: 245, deletions: 67, files: 12 },
    { id: 'PR-1422', title: 'feat: Search indexing pipeline', repo: 'backend-api', author: 'Priya Patel', status: 'open', createdAt: '1d ago', comments: 2, reviewers: ['Sarah Chen'], ci: 'failing', conflicts: true, additions: 89, deletions: 12, files: 6 },
    { id: 'PR-1421', title: 'chore: Update dependencies', repo: 'shared-lib', author: 'Alex Kim', status: 'draft', createdAt: '2d ago', comments: 1, reviewers: [], ci: 'pending', conflicts: false, additions: 15, deletions: 15, files: 3 },
  ]);
});

router.post('/code-reviews/:id/approve', (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `Review approved for ${id}`, approved: true, approvedBy: 'You', approvedAt: new Date().toISOString() });
});

router.post('/code-reviews/:id/comment', (req: Request, res: Response) => {
  const { id } = req.params;
  const { comment } = req.body;
  res.json({ message: `Comment added to ${id}`, comment: comment || 'Looks good!', author: 'You', createdAt: new Date().toISOString() });
});

/* ---- Pull Requests ---- */

router.get('/pull-requests', (_req: Request, res: Response) => {
  res.json([
    { id: 'PR-1425', title: 'fix: WebSocket reconnection with exponential backoff', repo: 'backend-api', author: 'Sarah Chen', status: 'open', sourceBranch: 'feature/ws-reconnect', targetBranch: 'develop', createdAt: '2h ago', comments: 5, reviewers: ['Mike Johnson', 'Alex Kim'], ci: 'passing', conflicts: false },
    { id: 'PR-1424', title: 'feat: Dashboard performance optimization', repo: 'frontend-web', author: 'Mike Johnson', status: 'open', sourceBranch: 'feature/dashboard-perf', targetBranch: 'develop', createdAt: '5h ago', comments: 3, reviewers: ['Sarah Chen'], ci: 'pending', conflicts: false },
    { id: 'PR-1423', title: 'fix: Payment gateway timeout handling', repo: 'backend-api', author: 'Sarah Chen', status: 'merged', sourceBranch: 'fix/payment-timeout', targetBranch: 'main', createdAt: '1d ago', comments: 8, reviewers: ['Alex Kim', 'Priya Patel'], ci: 'passing', conflicts: false, mergedBy: 'Alex Kim', mergedAt: '2026-07-22T14:00:00Z' },
    { id: 'PR-1422', title: 'feat: Search indexing pipeline', repo: 'backend-api', author: 'Priya Patel', status: 'open', sourceBranch: 'feature/data-pipeline', targetBranch: 'develop', createdAt: '1d ago', comments: 2, reviewers: ['Sarah Chen'], ci: 'failing', conflicts: true },
    { id: 'PR-1421', title: 'chore: Update dependencies', repo: 'shared-lib', author: 'Alex Kim', status: 'draft', sourceBranch: 'chore/deps', targetBranch: 'main', createdAt: '2d ago', comments: 0, reviewers: [], ci: 'pending', conflicts: false },
  ]);
});

router.post('/pull-requests', (req: Request, res: Response) => {
  const { title, repo, sourceBranch, targetBranch, description } = req.body;
  res.status(201).json({
    id: `PR-${randomInt(1426, 1500)}`,
    title: title || 'New Pull Request',
    repo: repo || 'backend-api',
    author: 'You',
    status: 'open',
    sourceBranch: sourceBranch || 'feature/new',
    targetBranch: targetBranch || 'develop',
    description: description || '',
    createdAt: new Date().toISOString(),
    comments: 0,
    reviewers: [],
    ci: 'pending',
    conflicts: false,
  });
});

/* ---- Repositories ---- */

router.get('/repositories', (_req: Request, res: Response) => {
  res.json(repos);
});

router.get('/repositories/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const repo = repos.find(r => r.id === id) || repos[0];
  res.json({
    ...repo,
    owner: { name: 'WorkSphere Inc.', avatar: null },
    defaultBranch: 'main',
    createdAt: '2025-01-15',
    updatedAt: today,
    topics: ['typescript', 'api', 'enterprise'],
    license: 'MIT',
    contributors: names.slice(0, randomInt(3, 6)),
    openIssues: randomInt(2, 10),
    openPRs: randomInt(1, 5),
  });
});

router.get('/repositories/:id/commits', (req: Request, res: Response) => {
  const { id } = req.params;
  const repo = repos.find(r => r.id === id);
  res.json({
    repo: repo ? repo.name : 'unknown',
    branch: 'main',
    commits: commits.slice(0, randomInt(3, 8)).map(c => ({
      ...c,
      message: c.message,
      author: c.author,
      hash: c.hash,
      timestamp: c.timestamp,
    })),
  });
});

/* ---- Branches ---- */

router.get('/branches', (_req: Request, res: Response) => {
  res.json(branches);
});

/* ---- Commits ---- */

router.get('/commits', (req: Request, res: Response) => {
  const { repo: filterRepo, author: filterAuthor } = req.query;
  let filtered = [...commits];
  if (filterRepo) filtered = filtered.filter(c => c.repo === filterRepo);
  if (filterAuthor) filtered = filtered.filter(c => c.author === filterAuthor);
  res.json(filtered);
});

/* ---- CI/CD ---- */

router.get('/cicd/pipelines', (_req: Request, res: Response) => {
  res.json({
    pipelines: [
      { id: 'P-1001', name: 'Backend CI/CD', status: 'running', branch: 'develop', commit: 'a1b2c3d', author: 'Sarah Chen', started: '5m ago', duration: '4m 30s', stages: [
        { name: 'Lint', status: 'passed', duration: '45s' },
        { name: 'Build', status: 'passed', duration: '2m 15s' },
        { name: 'Unit Tests', status: 'running', duration: '1m 30s' },
        { name: 'Integration Tests', status: 'pending', duration: '-' },
      ]},
      { id: 'P-1000', name: 'Frontend CI/CD', status: 'failed', branch: 'feature/dashboard-perf', commit: 'e4f5g6h', author: 'Mike Johnson', started: '15m ago', duration: '1m 40s', stages: [
        { name: 'Lint', status: 'passed', duration: '30s' },
        { name: 'Build', status: 'failed', duration: '1m 10s', error: 'TypeScript compilation error' },
      ]},
      { id: 'P-999', name: 'Backend CI/CD', status: 'passed', branch: 'main', commit: 'i7j8k9l', author: 'Alex Kim', started: '1h ago', duration: '18m 49s', stages: [
        { name: 'Lint', status: 'passed', duration: '42s' },
        { name: 'Build', status: 'passed', duration: '2m 5s' },
        { name: 'Unit Tests', status: 'passed', duration: '4m 12s' },
        { name: 'Integration Tests', status: 'passed', duration: '8m 30s' },
      ]},
      { id: 'P-998', name: 'Mobile CI/CD', status: 'passed', branch: 'main', commit: 'u5v6w7x', author: 'Tom Brown', started: '3h ago', duration: '12m 20s', stages: [
        { name: 'Lint', status: 'passed', duration: '35s' },
        { name: 'Build', status: 'passed', duration: '5m 10s' },
        { name: 'Unit Tests', status: 'passed', duration: '3m 15s' },
      ]},
    ],
    summary: { total: 52, passed: 42, failed: 6, running: 4 },
  });
});

router.get('/cicd/builds', (_req: Request, res: Response) => {
  res.json([
    { id: 'BL-1001', pipeline: 'Backend CI/CD', commit: 'a1b2c3d', branch: 'develop', status: 'running', started: '5m ago', duration: '4m 30s', author: 'Sarah Chen' },
    { id: 'BL-1000', pipeline: 'Frontend CI/CD', commit: 'e4f5g6h', branch: 'feature/dashboard-perf', status: 'failed', started: '15m ago', duration: '1m 40s', author: 'Mike Johnson', error: 'TypeScript compilation error in src/components/Chart.tsx:124' },
    { id: 'BL-999', pipeline: 'Backend CI/CD', commit: 'i7j8k9l', branch: 'main', status: 'passed', started: '1h ago', duration: '18m 49s', author: 'Alex Kim' },
    { id: 'BL-998', pipeline: 'Mobile CI/CD', commit: 'u5v6w7x', branch: 'main', status: 'passed', started: '3h ago', duration: '12m 20s', author: 'Tom Brown' },
    { id: 'BL-997', pipeline: 'Backend CI/CD', commit: 'c1d2e3f', branch: 'develop', status: 'passed', started: '5h ago', duration: '16m 5s', author: 'Priya Patel' },
  ]);
});

router.get('/cicd/deployments', (_req: Request, res: Response) => {
  res.json([
    { id: 'D-1042', version: 'v2.4.1', environment: 'production', status: 'live', deployedAt: '2026-07-22T10:30:00Z', deployedBy: 'Sarah Chen', duration: '4m 20s', rollback: false, commit: 'i7j8k9l' },
    { id: 'D-1041', version: 'v2.4.0', environment: 'staging', status: 'live', deployedAt: '2026-07-21T14:00:00Z', deployedBy: 'Mike Johnson', duration: '3m 45s', rollback: false, commit: 'a1b2c3d' },
    { id: 'D-1040', version: 'v2.4.0-rc.1', environment: 'production', status: 'rolled-back', deployedAt: '2026-07-20T09:00:00Z', deployedBy: 'Alex Kim', duration: '2m 30s', rollback: true, rollbackReason: 'API timeout issues', commit: 'e4f5g6h' },
    { id: 'D-1039', version: 'v2.3.2', environment: 'production', status: 'live', deployedAt: '2026-07-18T11:00:00Z', deployedBy: 'Sarah Chen', duration: '3m 10s', rollback: false, commit: 'm9n0o1p' },
    { id: 'D-1038', version: 'v2.3.1', environment: 'staging', status: 'superseded', deployedAt: '2026-07-17T16:00:00Z', deployedBy: 'Priya Patel', duration: '2m 55s', rollback: false, commit: 'q2r3s4t' },
  ]);
});

/* ---- Testing ---- */

router.get('/tests/unit', (_req: Request, res: Response) => {
  res.json({
    total: 256,
    passed: 248,
    failed: 6,
    skipped: 2,
    duration: '3m 42s',
    coverage: randomInt(78, 92),
    timestamp: new Date().toISOString(),
    failures: [
      { test: 'PaymentService.processRefund should handle timeout', file: '__tests__/services/payment.test.ts', line: 124, message: 'Expected 200, got 500' },
      { test: 'AuthService.validateToken should reject expired token', file: '__tests__/services/auth.test.ts', line: 87, message: 'Expected error, got undefined' },
    ],
  });
});

router.get('/tests/integration', (_req: Request, res: Response) => {
  res.json({
    total: 84,
    passed: 80,
    failed: 3,
    skipped: 1,
    duration: '8m 15s',
    timestamp: new Date().toISOString(),
    failures: [
      { test: 'User signup flow with MFA', file: '__tests__/integration/auth-flow.test.ts', line: 45, message: 'Timeout waiting for MFA code' },
    ],
  });
});

router.get('/tests/e2e', (_req: Request, res: Response) => {
  res.json({
    total: 36,
    passed: 33,
    failed: 2,
    skipped: 1,
    duration: '15m 30s',
    timestamp: new Date().toISOString(),
    failures: [
      { test: 'Payment checkout flow', file: '__tests__/e2e/payment.spec.ts', line: 1, message: 'Element not found: .payment-confirm' },
    ],
  });
});

router.get('/tests/api', (_req: Request, res: Response) => {
  res.json({
    total: 142,
    passed: 138,
    failed: 3,
    skipped: 1,
    duration: '5m 20s',
    timestamp: new Date().toISOString(),
    failures: [
      { test: 'POST /api/payments/refund returns 200', file: '__tests__/api/payment.test.ts', line: 78, message: 'Expected status 200, got 500' },
    ],
  });
});

router.get('/tests/coverage', (_req: Request, res: Response) => {
  res.json({
    overall: randomInt(78, 88),
    statements: randomInt(80, 90),
    branches: randomInt(72, 85),
    functions: randomInt(75, 88),
    lines: randomInt(78, 90),
    files: [
      { path: 'src/services/payment.ts', coverage: 68, lines: 245 },
      { path: 'src/services/auth.ts', coverage: 92, lines: 180 },
      { path: 'src/services/notification.ts', coverage: 85, lines: 120 },
      { path: 'src/components/Dashboard.tsx', coverage: 72, lines: 320 },
      { path: 'src/utils/helpers.ts', coverage: 95, lines: 88 },
    ],
    timestamp: new Date().toISOString(),
  });
});

router.get('/tests/history', (_req: Request, res: Response) => {
  res.json({
    unit: generateTrend(12, 85, 98),
    integration: generateTrend(12, 80, 95),
    e2e: generateTrend(12, 75, 92),
    coverage: generateTrend(12, 70, 88),
  });
});

/* ---- Code Quality ---- */

router.get('/code-quality/sonarqube', (_req: Request, res: Response) => {
  res.json({
    overall: 'A',
    bugs: 3,
    vulnerabilities: 2,
    codeSmells: 45,
    coverage: 82,
    duplication: 3.2,
    maintainability: 'A',
    reliability: 'A',
    security: 'A',
    lastAnalyzed: '2026-07-22T14:00:00Z',
    newIssues: 5,
    remediations: 12,
  });
});

router.get('/code-quality/coverage', (_req: Request, res: Response) => {
  res.json({
    current: 82,
    target: 85,
    trend: 'up',
    byModule: [
      { name: 'backend-api', coverage: 84 },
      { name: 'frontend-web', coverage: 78 },
      { name: 'shared-lib', coverage: 92 },
      { name: 'mobile-app', coverage: 72 },
      { name: 'infrastructure', coverage: 65 },
    ],
    history: generateTrend(12, 74, 84),
  });
});

router.get('/code-quality/technical-debt', (_req: Request, res: Response) => {
  res.json({
    ratio: 4.5,
    totalDays: 12,
    issues: 128,
    byCategory: [
      { category: 'Code Smells', count: 78, effort: '6d' },
      { category: 'Bugs', count: 12, effort: '3d' },
      { category: 'Vulnerabilities', count: 8, effort: '2d' },
      { category: 'Security Hotspots', count: 30, effort: '1d' },
    ],
  });
});

router.get('/code-quality/trends', (_req: Request, res: Response) => {
  res.json(generateTrend(12, 70, 95).map(t => ({ label: t.label, qualityScore: t.value, coverage: randomInt(72, 88), debt: Math.round((Math.random() * 5 + 2) * 10) / 10 })));
});

/* ---- Performance ---- */

router.get('/performance', (_req: Request, res: Response) => {
  res.json({
    responseTime: {
      p50: randomInt(45, 80),
      p95: randomInt(120, 250),
      p99: randomInt(300, 600),
      average: randomInt(60, 120),
    },
    throughput: randomInt(800, 2000),
    errorRate: Math.round(Math.random() * 2 * 100) / 100,
    requestsPerMinute: randomInt(500, 1500),
    activeUsers: randomInt(120, 350),
    apdex: Math.round((0.92 + Math.random() * 0.07) * 100) / 100,
    history: generateTimeSeries(60, 80, 60),
  });
});

/* ---- Documentation ---- */

router.get('/docs/api', (_req: Request, res: Response) => {
  res.json([
    { id: 'DOC-1', title: 'Authentication API', version: 'v2', lastUpdated: '2026-07-20', author: 'Sarah Chen', status: 'published', category: 'API Reference' },
    { id: 'DOC-2', title: 'User Management API', version: 'v2', lastUpdated: '2026-07-18', author: 'Mike Johnson', status: 'published', category: 'API Reference' },
    { id: 'DOC-3', title: 'Payment Gateway Integration', version: 'v1', lastUpdated: '2026-07-15', author: 'Sarah Chen', status: 'draft', category: 'Integration Guides' },
    { id: 'DOC-4', title: 'WebSocket Events Reference', version: 'v1', lastUpdated: '2026-07-12', author: 'Alex Kim', status: 'published', category: 'API Reference' },
    { id: 'DOC-5', title: 'Webhook API', version: 'v1', lastUpdated: '2026-07-10', author: 'Priya Patel', status: 'published', category: 'API Reference' },
  ]);
});

router.get('/docs/architecture', (_req: Request, res: Response) => {
  res.json([
    { id: 'ARCH-1', title: 'System Architecture Overview', lastUpdated: '2026-07-01', author: 'Tech Lead', status: 'published', tags: ['architecture', 'overview'] },
    { id: 'ARCH-2', title: 'Microservices Communication', lastUpdated: '2026-06-28', author: 'Sarah Chen', status: 'published', tags: ['microservices', 'communication'] },
    { id: 'ARCH-3', title: 'Data Flow Architecture', lastUpdated: '2026-06-25', author: 'Priya Patel', status: 'published', tags: ['data', 'pipeline'] },
    { id: 'ARCH-4', title: 'Security Architecture', lastUpdated: '2026-06-20', author: 'Lisa Wang', status: 'published', tags: ['security', 'architecture'] },
    { id: 'ARCH-5', title: 'Deployment Architecture', lastUpdated: '2026-06-15', author: 'James Wilson', status: 'draft', tags: ['deployment', 'kubernetes'] },
  ]);
});

router.get('/docs/knowledge-base', (_req: Request, res: Response) => {
  res.json([
    { id: 'KB-1', title: 'Getting Started Guide', lastUpdated: '2026-07-20', author: 'Mike Johnson', status: 'published', reads: 245, tags: ['onboarding', 'guide'] },
    { id: 'KB-2', title: 'Common Debugging Techniques', lastUpdated: '2026-07-18', author: 'Sarah Chen', status: 'published', reads: 189, tags: ['debugging', 'tips'] },
    { id: 'KB-3', title: 'Database Migration Best Practices', lastUpdated: '2026-07-15', author: 'Priya Patel', status: 'published', reads: 132, tags: ['database', 'migration'] },
    { id: 'KB-4', title: 'CI/CD Pipeline Setup', lastUpdated: '2026-07-12', author: 'James Wilson', status: 'published', reads: 98, tags: ['ci-cd', 'devops'] },
    { id: 'KB-5', title: 'Code Review Checklist', lastUpdated: '2026-07-10', author: 'Alex Kim', status: 'published', reads: 210, tags: ['code-review', 'best-practices'] },
    { id: 'KB-6', title: 'Performance Optimization Tips', lastUpdated: '2026-07-08', author: 'Mike Johnson', status: 'draft', reads: 56, tags: ['performance', 'optimization'] },
  ]);
});

/* ---- AI Assistant ---- */

const aiResponses: Record<string, any> = {
  'generate-code': { code: '// Generated code\nfunction hello(): string {\n  return "Hello, World!";\n}' },
  'explain-code': { explanation: 'This code defines a function that returns a greeting string. It is written in TypeScript and uses a simple return statement.' },
  'generate-sql': { sql: 'SELECT * FROM users WHERE active = true ORDER BY created_at DESC LIMIT 10;', explanation: 'This query retrieves the 10 most recently created active users.' },
  'review-pr': { summary: 'PR looks good overall. Found 2 minor issues: 1) Missing error handling for edge case in line 45. 2) Consider using optional chaining in line 78.', rating: 'approved', suggestions: ['Add null check on line 45', 'Use optional chaining for nested property access'] },
  'generate-tests': { code: 'import { describe, it, expect } from "vitest";\n\ndescribe("hello", () => {\n  it("should return greeting", () => {\n    expect(hello()).toBe("Hello, World!");\n  });\n});', framework: 'vitest' },
  'fix-bugs': { fixes: [{ file: 'src/services/payment.ts', line: 42, issue: 'Unhandled promise rejection', suggestion: 'Wrap the call in try-catch block' }] },
  'explain-errors': { error: 'TypeError: Cannot read properties of undefined', explanation: 'This occurs when trying to access a property on an undefined value. Check that the object is properly initialized before accessing its properties.', solution: 'Add optional chaining or a null check before accessing the property.' },
  'generate-docs': { content: '# API Documentation\n\n## Overview\nThis endpoint handles user authentication.\n\n## Endpoint\n`POST /api/auth/login`' },
  'optimize-queries': { original: 'SELECT * FROM users WHERE deleted_at IS NULL', optimized: 'SELECT id, name, email FROM users WHERE deleted_at IS NULL', improvement: 'Reduced column selection from * to specific columns, improving query performance and reducing network transfer.' },
  'search-codebase': { results: [{ file: 'src/services/auth.ts', line: 45, match: 'authenticateUser', context: 'async function authenticateUser(credentials)' }] },
  'summarize-logs': { summary: 'Found 3 error logs in the last hour. 2 are related to payment gateway timeouts, 1 is a database connection issue.', criticalIssues: 1, warnings: 5 },
  'suggest-refactoring': { suggestions: [{ file: 'src/services/payment.ts', line: 80, suggestion: 'Extract the payment validation logic into a separate function to improve testability and reduce complexity.' }] },
};

router.post('/ai/generate-code', (req: Request, res: Response) => {
  const { prompt, language } = req.body;
  res.json({ ...aiResponses['generate-code'], prompt, language: language || 'typescript', generatedAt: new Date().toISOString() });
});

router.post('/ai/explain-code', (req: Request, res: Response) => {
  const { code, language } = req.body;
  res.json({ ...aiResponses['explain-code'], code: code || 'No code provided', language: language || 'typescript' });
});

router.post('/ai/generate-sql', (req: Request, res: Response) => {
  const { prompt } = req.body;
  res.json({ ...aiResponses['generate-sql'], prompt: prompt || 'default query' });
});

router.post('/ai/review-pr', (req: Request, res: Response) => {
  const { prId, repo, changes } = req.body;
  res.json({ ...aiResponses['review-pr'], prId: prId || 'PR-1425', repo: repo || 'backend-api', filesReviewed: changes ? changes.length : 5 });
});

router.post('/ai/generate-tests', (req: Request, res: Response) => {
  const { functionName, filePath } = req.body;
  res.json({ ...aiResponses['generate-tests'], functionName: functionName || 'hello', filePath: filePath || 'src/index.ts' });
});

router.post('/ai/fix-bugs', (req: Request, res: Response) => {
  const { code, error } = req.body;
  res.json({ ...aiResponses['fix-bugs'], originalCode: code, error: error || 'Unknown error' });
});

router.post('/ai/explain-errors', (req: Request, res: Response) => {
  const { error } = req.body;
  res.json({ ...aiResponses['explain-errors'], error: error || 'TypeError: Cannot read properties of undefined' });
});

router.post('/ai/generate-docs', (req: Request, res: Response) => {
  const { topic, type } = req.body;
  res.json({ ...aiResponses['generate-docs'], topic: topic || 'API', type: type || 'markdown' });
});

router.post('/ai/optimize-queries', (req: Request, res: Response) => {
  const { query } = req.body;
  res.json({ ...aiResponses['optimize-queries'], original: query || 'SELECT * FROM users' });
});

router.post('/ai/search-codebase', (req: Request, res: Response) => {
  const { query, repo } = req.body;
  res.json({ ...aiResponses['search-codebase'], query: query || 'authenticate', repo: repo || 'all' });
});

router.post('/ai/summarize-logs', (req: Request, res: Response) => {
  const { logs, timeRange } = req.body;
  res.json({ ...aiResponses['summarize-logs'], logCount: logs ? logs.length : 45, timeRange: timeRange || '1h' });
});

router.post('/ai/suggest-refactoring', (req: Request, res: Response) => {
  const { filePath, code } = req.body;
  res.json({ ...aiResponses['suggest-refactoring'], filePath: filePath || 'src/services/payment.ts', codePreview: code ? code.substring(0, 100) : '' });
});

/* ---- Chat ---- */

const channels = [
  { id: 'C-1', name: 'general', type: 'team', unread: 2, lastMessage: 'Updated deployment schedule for v2.4.1', lastActive: '2m ago', members: 12 },
  { id: 'C-2', name: 'backend-team', type: 'team', unread: 5, lastMessage: 'WebSocket reconnection PR is ready for review', lastActive: '15m ago', members: 6 },
  { id: 'C-3', name: 'frontend-team', type: 'team', unread: 0, lastMessage: 'Dashboard perf test results are looking good', lastActive: '1h ago', members: 5 },
  { id: 'C-4', name: 'project-redesign', type: 'project', unread: 3, lastMessage: 'Updated the design tokens PR', lastActive: '30m ago', members: 8 },
  { id: 'C-5', name: 'incidents', type: 'team', unread: 1, lastMessage: 'Payment service latency alert triggered', lastActive: '5m ago', members: 12 },
  { id: 'C-6', name: 'announcements', type: 'team', unread: 0, lastMessage: 'Welcome to the team, Lisa!', lastActive: '2d ago', members: 20 },
];

router.get('/chat/channels', (_req: Request, res: Response) => {
  res.json(channels);
});

router.get('/chat/channels/:id/messages', (req: Request, res: Response) => {
  const { id } = req.params;
  const msgs: Record<string, any[]> = {
    'C-1': [
      { id: 'M-101', userId: 'U-1', name: 'Sarah Chen', message: 'Updated deployment schedule for v2.4.1', time: '2m ago', reactions: [{ emoji: '+1', count: 3 }] },
      { id: 'M-100', userId: 'U-2', name: 'Mike Johnson', message: 'PR #1424 is ready for review. Dashboard performance improved by 40%.', time: '10m ago', reactions: [] },
      { id: 'M-99', userId: 'U-3', name: 'Alex Kim', message: 'Has anyone looked at the WebSocket reconnection PR?', time: '15m ago', reactions: [{ emoji: 'eyes', count: 2 }] },
      { id: 'M-98', userId: 'U-1', name: 'Sarah Chen', message: 'Yes, I\'ll review it this afternoon.', time: '18m ago', reactions: [] },
    ],
    'C-2': [
      { id: 'M-200', userId: 'U-1', name: 'Sarah Chen', message: 'WebSocket reconnection PR is ready for review in #general', time: '15m ago', reactions: [] },
      { id: 'M-201', userId: 'U-3', name: 'Alex Kim', message: 'I\'ll take a look after standup', time: '12m ago', reactions: [] },
    ],
  };
  const channelId = id as string;
  res.json(msgs[channelId] || msgs['C-1']);
});

router.post('/chat/channels/:id/messages', (req: Request, res: Response) => {
  const { id } = req.params;
  const { message } = req.body;
  res.status(201).json({
    id: `M-${Date.now()}`,
    userId: 'U-1',
    name: 'You',
    message: message || '',
    time: 'just now',
    reactions: [],
    channelId: id,
  });
});

router.get('/chat/direct', (_req: Request, res: Response) => {
  res.json([
    { userId: 'U-1', name: 'Sarah Chen', status: 'online', lastMessage: 'Can you review my PR?', lastActive: '5m ago', unread: 2 },
    { userId: 'U-2', name: 'Mike Johnson', status: 'online', lastMessage: 'Dashboard perf improvements are ready', lastActive: '10m ago', unread: 0 },
    { userId: 'U-3', name: 'Alex Kim', status: 'away', lastMessage: 'Thanks for the review!', lastActive: '1h ago', unread: 1 },
    { userId: 'U-4', name: 'Emily Davis', status: 'online', lastMessage: 'Test suite is complete', lastActive: '30m ago', unread: 0 },
    { userId: 'U-5', name: 'James Wilson', status: 'offline', lastMessage: 'Deploying v2.4.1 to prod', lastActive: '2h ago', unread: 0 },
  ]);
});

router.get('/chat/direct/:userId/messages', (req: Request, res: Response) => {
  const { userId } = req.params;
  const name = names.find((_, i) => `U-${i + 1}` === userId) || 'User';
  res.json([
    { id: `DM-${Date.now()}-1`, userId: 'U-0', name: 'You', message: 'Hey, do you have a moment to review my PR?', time: '10m ago' },
    { id: `DM-${Date.now()}-2`, userId, name, message: 'Sure, let me take a look right now', time: '8m ago' },
    { id: `DM-${Date.now()}-3`, userId: 'U-0', name: 'You', message: 'Thanks! The PR is #1425', time: '7m ago' },
  ]);
});

router.post('/chat/direct/:userId/messages', (req: Request, res: Response) => {
  const { userId } = req.params;
  const { message } = req.body;
  res.status(201).json({
    id: `DM-${Date.now()}`,
    userId: 'U-0',
    name: 'You',
    message: message || '',
    time: 'just now',
    recipientId: userId,
  });
});

router.get('/chat/announcements', (_req: Request, res: Response) => {
  res.json([
    { id: 'AN-1', title: 'Team Offsite Next Week', content: 'Reminder: Team offsite is scheduled for July 28-29. Please RSVP by Friday.', author: 'Tech Lead', postedAt: '2026-07-22T09:00:00Z', priority: 'high', pinned: true, comments: 5 },
    { id: 'AN-2', title: 'Production Deployment Window Changed', content: 'Starting next sprint, production deployments will be Mon-Wed only.', author: 'James Wilson', postedAt: '2026-07-21T14:00:00Z', priority: 'medium', pinned: true, comments: 3 },
    { id: 'AN-3', title: 'Welcome Lisa Wang!', content: 'Please join me in welcoming Lisa to the security team!', author: 'Tech Lead', postedAt: '2026-07-20T10:00:00Z', priority: 'low', pinned: false, comments: 8 },
  ]);
});

router.post('/chat/announcements', (req: Request, res: Response) => {
  const { title, content, priority } = req.body;
  res.status(201).json({
    id: `AN-${Date.now()}`,
    title: title || 'New Announcement',
    content: content || '',
    author: 'You',
    postedAt: new Date().toISOString(),
    priority: priority || 'medium',
    pinned: false,
    comments: 0,
  });
});

router.get('/chat/search', (req: Request, res: Response) => {
  const q = (req.query.q as string) || '';
  res.json({
    query: q,
    results: [
      { id: 'M-101', channelId: 'C-1', channelName: 'general', message: 'Updated deployment schedule for v2.4.1', author: 'Sarah Chen', time: '2m ago' },
      { id: 'M-100', channelId: 'C-1', channelName: 'general', message: 'PR #1424 is ready for review', author: 'Mike Johnson', time: '10m ago' },
    ],
    total: 2,
  });
});

/* ---- Meetings ---- */

router.get('/meetings', (_req: Request, res: Response) => {
  res.json({
    today: [
      { id: 'M-1', title: 'Daily Standup', time: '09:30 AM', duration: '15m', attendees: 12, type: 'standup', room: 'Team Standup', organizer: 'Tech Lead' },
      { id: 'M-2', title: 'Sprint Planning', time: '10:00 AM', duration: '1h', attendees: 8, type: 'planning', room: 'Sprint Room', organizer: 'Tech Lead' },
      { id: 'M-3', title: 'Architecture Review', time: '02:00 PM', duration: '45m', attendees: 5, type: 'review', room: 'Architecture', organizer: 'Sarah Chen' },
      { id: 'M-4', title: '1:1 with Sarah Chen', time: '04:00 PM', duration: '30m', attendees: 2, type: 'one-on-one', room: 'Private', organizer: 'You' },
    ],
    upcoming: [
      { id: 'M-5', title: 'Retrospective', date: '2026-07-24', time: '11:00 AM', duration: '1h', attendees: 10, type: 'retro', organizer: 'Tech Lead' },
      { id: 'M-6', title: 'Demo Day', date: '2026-07-25', time: '02:00 PM', duration: '1h', attendees: 20, type: 'demo', organizer: 'Mike Johnson' },
    ],
  });
});

router.post('/meetings', (req: Request, res: Response) => {
  const { title, date, time, duration, attendees, type } = req.body;
  res.status(201).json({
    id: `M-${Date.now()}`,
    title: title || 'New Meeting',
    date: date || today,
    time: time || '10:00 AM',
    duration: duration || '30m',
    attendees: attendees || 2,
    type: type || 'standup',
    organizer: 'You',
    room: 'TBD',
  });
});

/* ---- Calendar ---- */

router.get('/calendar/events', (req: Request, res: Response) => {
  const { start, end } = req.query;
  res.json([
    { id: 'E-1', title: 'Daily Standup', date: today, startTime: '09:30', endTime: '09:45', type: 'standup', attendees: 12, color: 'blue' },
    { id: 'E-2', title: 'Sprint Planning', date: today, startTime: '10:00', endTime: '11:00', type: 'planning', attendees: 8, color: 'green' },
    { id: 'E-3', title: 'Architecture Review', date: today, startTime: '14:00', endTime: '14:45', type: 'review', attendees: 5, color: 'purple' },
    { id: 'E-4', title: 'Code Review Session', date: today, startTime: '15:00', endTime: '16:00', type: 'focus', attendees: 3, color: 'amber' },
    { id: 'E-5', title: 'Retrospective', date: '2026-07-24', startTime: '11:00', endTime: '12:00', type: 'retro', attendees: 10, color: 'red' },
    { id: 'E-6', title: 'Lunch & Learn: WebSockets', date: '2026-07-25', startTime: '12:00', endTime: '13:00', type: 'learning', attendees: 15, color: 'teal' },
  ]);
});

router.post('/calendar/events', (req: Request, res: Response) => {
  const { title, date, startTime, endTime, type } = req.body;
  res.status(201).json({
    id: `E-${Date.now()}`,
    title: title || 'New Event',
    date: date || today,
    startTime: startTime || '10:00',
    endTime: endTime || '11:00',
    type: type || 'meeting',
    attendees: 2,
    color: 'blue',
  });
});

/* ---- Reports ---- */

router.get('/reports', (_req: Request, res: Response) => {
  res.json([
    { id: 'sprint', name: 'Sprint Report', type: 'sprint', description: 'Detailed sprint progress, velocity, and completion metrics', formats: ['pdf', 'csv', 'html'] },
    { id: 'productivity', name: 'Productivity Report', type: 'analytics', description: 'Individual and team productivity metrics', formats: ['pdf', 'csv'] },
    { id: 'code-quality', name: 'Code Quality Report', type: 'analytics', description: 'Test coverage, technical debt, and code smells', formats: ['pdf', 'html'] },
    { id: 'deployment', name: 'Deployment Report', type: 'ops', description: 'Deployment frequency, success rate, and rollback history', formats: ['pdf', 'csv'] },
    { id: 'bugs', name: 'Bug Report', type: 'qa', description: 'Bug trends, severity distribution, and resolution times', formats: ['pdf', 'csv', 'html'] },
    { id: 'performance', name: 'Performance Report', type: 'ops', description: 'API response times, error rates, and resource utilization', formats: ['pdf', 'html'] },
  ]);
});

router.get('/reports/:type', (req: Request, res: Response) => {
  const { type } = req.params;
  res.json({
    reportType: type,
    generatedAt: new Date().toISOString(),
    period: { start: '2026-07-01', end: today },
    summary: {
      totalItems: randomInt(20, 50),
      completed: randomInt(15, 35),
      inProgress: randomInt(5, 15),
      metrics: {
        velocity: randomInt(30, 50),
        quality: randomInt(78, 95),
        coverage: randomInt(72, 90),
      },
    },
    data: generateTrend(8, 20, 80),
  });
});

/* ---- Notifications ---- */

router.get('/notifications', (_req: Request, res: Response) => {
  res.json([
    { id: 'N-1', type: 'review', message: 'PR #1425 requires your review', time: '5m ago', read: false, actionable: true, actionUrl: '/code-reviews/PR-1425' },
    { id: 'N-2', type: 'build', message: 'Frontend build failed (commit e4f5g6h)', time: '15m ago', read: false, actionable: false },
    { id: 'N-3', type: 'deploy', message: 'Backend v2.4.1 deployed to production', time: '30m ago', read: false, actionable: false },
    { id: 'N-4', type: 'alert', message: 'Payment service latency alert triggered', time: '1h ago', read: false, actionable: true, actionUrl: '/monitoring/alerts' },
    { id: 'N-5', type: 'mention', message: 'Sarah Chen mentioned you in #general', time: '2h ago', read: true, actionable: true, actionUrl: '/chat/C-1' },
    { id: 'N-6', type: 'meeting', message: 'Sprint Planning starts in 15 minutes', time: '3h ago', read: true, actionable: false },
    { id: 'N-7', type: 'security', message: 'Security scan completed - 2 vulnerabilities found', time: '5h ago', read: true, actionable: true, actionUrl: '/code-quality/security' },
    { id: 'N-8', type: 'assign', message: 'Task T-101 has been assigned to you', time: '6h ago', read: true, actionable: true, actionUrl: '/tasks/T-101' },
  ]);
});

router.put('/notifications/:id/read', (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `Notification ${id} marked as read`, read: true, updatedAt: new Date().toISOString() });
});

router.post('/notifications/read-all', (_req: Request, res: Response) => {
  res.json({ message: 'All notifications marked as read', read: true, updatedAt: new Date().toISOString(), count: 8 });
});

/* ---- Settings ---- */

router.get('/settings', (_req: Request, res: Response) => {
  res.json({
    profile: { name: 'Software Engineer', email: 'engineer@worksphere.com', role: 'SOFTWARE_ENGINEER', team: 'Platform Engineering', department: 'Engineering' },
    preferences: {
      notifications: true,
      emailReports: true,
      slackIntegration: false,
      autoRefresh: true,
      refreshInterval: 30,
      theme: 'system',
      language: 'en',
      timezone: 'UTC',
    },
    integrations: [
      { name: 'GitHub', connected: true, lastSync: '2m ago' },
      { name: 'Jira', connected: true, lastSync: '5m ago' },
      { name: 'Slack', connected: false },
      { name: 'VS Code', connected: true, lastSync: '1m ago' },
      { name: 'Datadog', connected: true, lastSync: '3m ago' },
    ],
    editor: {
      fontSize: 14,
      tabSize: 2,
      theme: 'dark',
      fontFamily: 'JetBrains Mono',
      wordWrap: true,
      minimap: true,
      linting: true,
    },
  });
});

router.put('/settings', (req: Request, res: Response) => {
  const { preferences, integrations, editor } = req.body;
  res.json({
    message: 'Settings updated successfully',
    updatedAt: new Date().toISOString(),
    settings: {
      profile: { name: 'Software Engineer', email: 'engineer@worksphere.com', role: 'SOFTWARE_ENGINEER', team: 'Platform Engineering' },
      preferences: preferences || { theme: 'dark' },
      integrations: integrations || [],
      editor: editor || { fontSize: 14 },
    },
  });
});

/* ---- Search ---- */

router.get('/search', (req: Request, res: Response) => {
  const q = (req.query.q as string) || '';
  const type = (req.query.type as string) || 'all';
  res.json({
    query: q,
    type,
    results: {
      tasks: type === 'all' || type === 'tasks' ? tasks.filter(t => t.title.toLowerCase().includes(q.toLowerCase())).slice(0, 3) : [],
      repos: type === 'all' || type === 'repos' ? repos.filter(r => r.name.toLowerCase().includes(q.toLowerCase())).slice(0, 3) : [],
      docs: type === 'all' || type === 'docs' ? [{ id: 'DOC-1', title: 'Authentication API', match: q }] : [],
      commits: type === 'all' || type === 'commits' ? commits.filter(c => c.message.toLowerCase().includes(q.toLowerCase())).slice(0, 3) : [],
    },
    totalResults: randomInt(1, 15),
    time: `${Math.round(Math.random() * 200 + 50)}ms`,
  });
});

/* ---- Activity ---- */

router.get('/activity', (_req: Request, res: Response) => {
  res.json([
    { id: 'A-1', type: 'push', user: 'Sarah Chen', repo: 'backend-api', branch: 'feature/ws-reconnect', message: 'Fixed WebSocket reconnection logic', time: '2m ago', commits: 3 },
    { id: 'A-2', type: 'pr', user: 'Mike Johnson', repo: 'frontend-web', message: 'Opened PR #1424: Dashboard performance optimization', time: '10m ago' },
    { id: 'A-3', type: 'merge', user: 'Alex Kim', repo: 'shared-lib', message: 'Merged PR #1421: Update dependencies', time: '25m ago' },
    { id: 'A-4', type: 'build', user: 'CI/CD', repo: 'backend-api', message: 'Build #1001 passed (main: i7j8k9l)', time: '30m ago' },
    { id: 'A-5', type: 'deploy', user: 'James Wilson', repo: 'infrastructure', message: 'Deployed v2.4.1 to production', time: '35m ago' },
    { id: 'A-6', type: 'bug', user: 'Emily Davis', repo: 'backend-api', message: 'Opened BUG-487: Login fails on Safari', time: '1h ago' },
    { id: 'A-7', type: 'review', user: 'Sarah Chen', repo: 'backend-api', message: 'Approved PR #1420: User avatar upload API', time: '1h ago' },
    { id: 'A-8', type: 'commit', user: 'Priya Patel', repo: 'backend-api', message: 'feat: add search indexing pipeline', time: '2h ago', commits: 5 },
    { id: 'A-9', type: 'comment', user: 'Tom Brown', repo: 'mobile-app', message: 'Commented on PR #1418: Date picker fix', time: '3h ago' },
    { id: 'A-10', type: 'push', user: 'Alex Kim', repo: 'shared-lib', message: 'chore: update npm dependencies', time: '4h ago', commits: 2 },
  ]);
});

router.get('/activity/live', (_req: Request, res: Response) => {
  res.json({
    events: [
      { id: `LE-${Date.now()}`, type: randomPick(['push', 'pr', 'build', 'deploy', 'comment']), user: randomPick(names), message: `${randomPick(['Updated', 'Fixed', 'Added', 'Deployed'])} ${randomPick(['WebSocket', 'dashboard', 'payment', 'auth', 'build'])}`, time: 'just now', timestamp: new Date().toISOString() },
    ],
    activeUsers: randomInt(4, 10),
    eventsPerMinute: randomInt(3, 15),
  });
});

/* ---- Live Engineering Data ---- */

router.get('/live', (_req: Request, res: Response) => {
  res.json({
    openPRs: randomInt(3, 10),
    pendingReviews: randomInt(2, 8),
    currentBranch: randomPick(branches).name,
    lastCommit: commits[0],
    sprint: {
      name: 'Sprint 24',
      progress: randomInt(55, 80),
      daysRemaining: randomInt(3, 7),
      totalTasks: 42,
      completedTasks: randomInt(22, 30),
    },
    builds: {
      running: randomInt(1, 3),
      queued: randomInt(0, 2),
      lastBuild: { id: 'BL-1001', status: 'passed', duration: '4m 20s' },
    },
    deploymentQueue: randomInt(0, 3),
    activeIncidents: randomInt(0, 2),
    ciStatus: Math.random() > 0.15 ? 'passing' : 'failing',
    codeCoverage: randomInt(78, 90),
    pendingDeployments: randomInt(0, 2),
    timestamp: new Date().toISOString(),
  });
});

/* ---- Charts ---- */

router.get('/charts/velocity', (_req: Request, res: Response) => {
  res.json({
    labels: ['Sprint 18', 'Sprint 19', 'Sprint 20', 'Sprint 21', 'Sprint 22', 'Sprint 23', 'Sprint 24'],
    datasets: [
      { label: 'Planned', data: [35, 40, 45, 35, 40, 38, 42] },
      { label: 'Completed', data: [30, 36, 30, 33, 32, 35, 28] },
      { label: 'Average', data: [33, 33, 33, 33, 33, 33, 33] },
    ],
  });
});

router.get('/charts/commits', (_req: Request, res: Response) => {
  const weeks = ['Jul 3', 'Jul 10', 'Jul 17', 'Jul 24', 'Jul 31', 'Aug 7'];
  res.json({
    labels: weeks,
    datasets: [
      { label: 'Commits', data: weeks.map(() => randomInt(45, 120)) },
      { label: 'Authors', data: weeks.map(() => randomInt(4, 8)) },
    ],
  });
});

router.get('/charts/productivity', (_req: Request, res: Response) => {
  res.json({
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8'],
    data: generateTrend(8, 60, 95).map(t => t.value),
    benchmark: 80,
  });
});

router.get('/charts/task-distribution', (_req: Request, res: Response) => {
  const statusCounts = {
    todo: tasks.filter(t => t.status === 'todo').length,
    'in-progress': tasks.filter(t => t.status === 'in-progress').length,
    review: tasks.filter(t => t.status === 'review').length,
    done: tasks.filter(t => t.status === 'done').length,
  };
  const typeCounts = {
    feature: tasks.filter(t => t.type === 'feature').length,
    bug: tasks.filter(t => t.type === 'bug').length,
    chore: tasks.filter(t => t.type === 'chore').length,
    test: tasks.filter(t => t.type === 'test').length,
    perf: tasks.filter(t => t.type === 'perf').length,
    design: tasks.filter(t => t.type === 'design').length,
  };
  res.json({
    byStatus: [
      { name: 'To Do', value: statusCounts.todo, color: '#94a3b8' },
      { name: 'In Progress', value: statusCounts['in-progress'], color: '#f59e0b' },
      { name: 'Review', value: statusCounts.review, color: '#8b5cf6' },
      { name: 'Done', value: statusCounts.done, color: '#10b981' },
    ],
    byType: [
      { name: 'Feature', value: typeCounts.feature, color: '#3b82f6' },
      { name: 'Bug', value: typeCounts.bug, color: '#ef4444' },
      { name: 'Chore', value: typeCounts.chore, color: '#6b7280' },
      { name: 'Test', value: typeCounts.test, color: '#10b981' },
      { name: 'Perf', value: typeCounts.perf, color: '#f59e0b' },
      { name: 'Design', value: typeCounts.design, color: '#ec4899' },
    ],
  });
});

router.get('/charts/burndown', (_req: Request, res: Response) => {
  const days = ['Jul 14', 'Jul 15', 'Jul 16', 'Jul 17', 'Jul 18', 'Jul 19', 'Jul 20', 'Jul 21', 'Jul 22', 'Jul 23', 'Jul 24', 'Jul 25', 'Jul 26', 'Jul 27'];
  const total = 142;
  const dailyBurn = total / days.length;
  res.json({
    labels: days,
    datasets: [
      { label: 'Ideal', data: days.map((_, i) => Math.round(total - dailyBurn * i)) },
      { label: 'Actual', data: days.map((_, i) => Math.max(0, Math.round(total - dailyBurn * i + (Math.random() * 15 - 7)))) },
    ],
  });
});

router.get('/charts/developer-activity', (_req: Request, res: Response) => {
  const devs = ['Sarah Chen', 'Mike Johnson', 'Alex Kim', 'Emily Davis', 'Priya Patel', 'Tom Brown'];
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  res.json({
    developers: devs,
    days: weekDays,
    data: devs.map(() => weekDays.map(() => randomInt(0, 10))),
  });
});

router.get('/charts/repo-commits', (_req: Request, res: Response) => {
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  res.json({
    repos: repos.map(r => r.name),
    days: weekDays,
    data: repos.map(() => weekDays.map(() => randomInt(0, 15))),
  });
});

router.get('/charts/bug-trend', (_req: Request, res: Response) => {
  res.json({
    labels: generateTrend(12, 0, 0).map(t => true).map((_, i) => `Week ${i + 1}`),
    datasets: [
      { label: 'Critical', data: generateTrend(12, 0, 5).map(t => t.value) },
      { label: 'High', data: generateTrend(12, 1, 8).map(t => t.value) },
      { label: 'Medium', data: generateTrend(12, 2, 12).map(t => t.value) },
      { label: 'Low', data: generateTrend(12, 1, 6).map(t => t.value) },
    ],
  });
});

router.get('/charts/code-quality-trend', (_req: Request, res: Response) => {
  res.json({
    labels: generateTrend(12, 0, 0).map((_, i) => `Week ${i + 1}`),
    datasets: [
      { label: 'Coverage', data: generateTrend(12, 72, 88).map(t => t.value) },
      { label: 'Maintainability', data: generateTrend(12, 75, 92).map(t => t.value) },
      { label: 'Reliability', data: generateTrend(12, 80, 95).map(t => t.value) },
    ],
  });
});

router.get('/charts/deployment-trend', (_req: Request, res: Response) => {
  res.json({
    labels: generateTrend(12, 0, 0).map((_, i) => `Week ${i + 1}`),
    datasets: [
      { label: 'Deployments', data: generateTrend(12, 2, 10).map(t => t.value) },
      { label: 'Success Rate', data: generateTrend(12, 85, 100).map(t => t.value) },
    ],
  });
});

router.get('/charts/build-success', (_req: Request, res: Response) => {
  res.json({
    labels: generateTrend(12, 0, 0).map((_, i) => `Week ${i + 1}`),
    datasets: [
      { label: 'Passed', data: generateTrend(12, 15, 35).map(t => t.value) },
      { label: 'Failed', data: generateTrend(12, 1, 8).map(t => t.value) },
    ],
  });
});

export default router;
