import { useState, useCallback, useEffect, useRef } from 'react';
import { getLiveDate, getLiveTime } from '../../../utils/liveDataHelpers';

import type {
  Bug, TeamMember, Project, Sprint, SprintTask, LeaveRequest,
  Meeting, ChatMessage, ChatChannel, Approval, Notification,
  PerformanceEntry, DashboardMetrics, TestExecution, DefectCategory
} from './types';

const STORAGE_PREFIX = 'qa_engineer_';

function persist<T>(key: string, value: T): T {
  try { localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value)); } catch { /* noop */ }
  return value;
}

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + key);
    if (raw) return JSON.parse(raw) as T;
  } catch { /* noop */ }
  return fallback;
}

const initialTeam: TeamMember[] = [
  { id: '1', name: 'Sarah Chen', role: 'Senior SDET', module: 'Analytics UI', velocity: '42 pts', status: 'Online', scriptsWritten: 45, bugsFound: 12, reviewScore: 4.8, email: 'sarah.chen@sahara.com' },
  { id: '2', name: 'Michael Chang', role: 'Security QA', module: 'Core Auth', velocity: '38 pts', status: 'In Meeting', scriptsWritten: 32, bugsFound: 8, reviewScore: 4.5, email: 'michael.chang@sahara.com' },
  { id: '3', name: 'David Kim', role: 'QA Engineer', module: 'Reporting', velocity: '45 pts', status: 'Online', scriptsWritten: 38, bugsFound: 15, reviewScore: 4.6, email: 'david.kim@sahara.com' },
  { id: '4', name: 'Elena Rodriguez', role: 'Manual Tester', module: 'Auth UI', velocity: '30 pts', status: 'Offline', scriptsWritten: 12, bugsFound: 22, reviewScore: 4.2, email: 'elena.r@sahara.com' },
  { id: '5', name: 'James Wilson', role: 'Automation Engineer', module: 'Payment Core', velocity: '40 pts', status: 'Online', scriptsWritten: 52, bugsFound: 6, reviewScore: 4.9, email: 'james.wilson@sahara.com' },
];

const initialBugs: Bug[] = [
  { id: 'DEF-4092', title: 'Payment gateway timeout during enterprise checkout', status: 'Open', severity: 'CRITICAL', module: 'Payment Core', assignee: { name: 'Unassigned', avatar: null }, isClosed: false, createdAt: '2026-05-24T08:30:00Z', description: 'Enterprise customers with >50 items experience timeout during payment processing due to insufficient connection pool size.', reporter: 'Priya Sharma', environment: 'Production' },
  { id: 'DEF-4088', title: 'Memory leak in analytics dashboard background refresh', status: 'In Progress', severity: 'HIGH', module: 'Analytics UI', assignee: { name: 'Sarah Chen', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' }, isClosed: false, createdAt: '2026-05-22T14:15:00Z', description: 'Background polling in analytics dashboard causes ~200MB memory leak over 4 hours of continuous use.', reporter: 'David Kim', environment: 'Staging' },
  { id: 'DEF-4071', title: 'Misaligned columns in export PDF when filter applied', status: 'Resolved', severity: 'MEDIUM', module: 'Reporting', assignee: { name: 'David Kim', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' }, isClosed: false, createdAt: '2026-05-20T10:00:00Z', description: 'PDF export renders misaligned table columns when date range filter is applied to the report.', reporter: 'Elena Rodriguez', environment: 'Production' },
  { id: 'DEF-4015', title: "Typo in 'Authentication' on the secondary login screen", status: 'Closed', severity: 'LOW', module: 'Auth UI', assignee: { name: 'Elena Rodriguez', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' }, isClosed: true, createdAt: '2026-05-18T09:00:00Z', description: 'The secondary login page displays "Autentication" instead of "Authentication" in the header.', reporter: 'UX Team', environment: 'Production' },
  { id: 'DEF-4095', title: 'SSO token refresh fails after 55 minutes', status: 'Open', severity: 'CRITICAL', module: 'Core Auth', assignee: { name: 'Michael Chang', avatar: null }, isClosed: false, createdAt: '2026-05-25T11:00:00Z', description: 'OAuth token refresh fails silently causing session loss exactly 55 minutes after login.', reporter: 'Security Team', environment: 'Production' },
  { id: 'DEF-4085', title: 'Report export crashes on datasets >10MB', status: 'In Progress', severity: 'HIGH', module: 'Reporting', assignee: { name: 'David Kim', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' }, isClosed: false, createdAt: '2026-05-21T16:30:00Z', description: 'Exporting reports larger than 10MB causes browser tab to crash with out-of-memory error.', reporter: 'Operations', environment: 'Staging' },
  { id: 'DEF-4062', title: 'Mobile responsive layout broken on tablet', status: 'Open', severity: 'MEDIUM', module: 'Analytics UI', assignee: { name: 'Unassigned', avatar: null }, isClosed: false, createdAt: '2026-05-19T13:45:00Z', description: 'Dashboard grid layout collapses on iPad Pro portrait mode, overlapping chart elements.', reporter: 'UX Team', environment: 'Production' },
  { id: 'DEF-4008', title: 'Incorrect currency symbol in invoice PDF', status: 'Closed', severity: 'LOW', module: 'Reporting', assignee: { name: 'James Wilson', avatar: null }, isClosed: true, createdAt: '2026-05-16T08:15:00Z', description: 'JPY invoices display $ instead of ¥ symbol in generated PDF.', reporter: 'Finance', environment: 'Production' },
];

const initialProjects: Project[] = [
  { id: 'P1', name: 'Payment Core Migration', status: 'In Testing', coverage: 85, bugs: 12, description: 'Migrating legacy payment processing to new microservices architecture with improved throughput.', releaseDate: getLiveDate(-23), lead: 'James Wilson', priority: 'Critical' },
  { id: 'P2', name: 'Analytics Dashboard UI', status: 'Blocked', coverage: 60, bugs: 28, description: 'Next-gen analytics dashboard with real-time data streaming and interactive visualizations.', releaseDate: getLiveDate(-16), lead: 'Sarah Chen', priority: 'High' },
  { id: 'P3', name: 'Auth V2 Rollout', status: 'QA Sign-off', coverage: 98, bugs: 2, description: 'OAuth 2.0 + SSO upgrade with biometric support and hardware key integration.', releaseDate: getLiveDate(-9), lead: 'Michael Chang', priority: 'Critical' },
  { id: 'P4', name: 'Mobile App Redesign', status: 'In Testing', coverage: 72, bugs: 15, description: 'Complete React Native rewrite with offline-first architecture and real-time sync.', releaseDate: getLiveDate(-2), lead: 'Elena Rodriguez', priority: 'High' },
];

const initialSprints: Sprint[] = [
  {
    id: 'S42', name: 'Sprint 42', startDate: getLiveDate(5), endDate: getLiveDate(12), isActive: true,
    tasks: [
      { id: 'T1', title: 'Test Plan Creation: Analytics V2', description: 'Create comprehensive test plan for new analytics dashboard features', status: 'Done', assignee: 'Sarah Chen', priority: 'P1', sprintId: 'S42' },
      { id: 'T2', title: 'Automate E2E Payment Flow', description: 'Write Cypress E2E tests for complete payment checkout flow', status: 'In Progress', assignee: 'Unassigned', priority: 'P0', sprintId: 'S42' },
      { id: 'T3', title: 'Security Audit: Auth Module', description: 'Run penetration testing and security scanning on Auth V2', status: 'Not Started', assignee: 'Michael Chang', priority: 'P0', sprintId: 'S42' },
      { id: 'T4', title: 'Regression Suite Optimization', description: 'Reduce regression suite runtime from 4h to 2h', status: 'Not Started', assignee: 'James Wilson', priority: 'P2', sprintId: 'S42' },
      { id: 'T5', title: 'Load Testing: Payment API', description: 'Run k6 load tests targeting 10K concurrent users', status: 'Blocked', assignee: 'David Kim', priority: 'P1', sprintId: 'S42' },
    ]
  },
  {
    id: 'S41', name: 'Sprint 41', startDate: getLiveDate(19), endDate: getLiveDate(26), isActive: false,
    tasks: [
      { id: 'T6', title: 'API Contract Testing Setup', description: 'Set up Pact contract tests for payment microservices', status: 'Done', assignee: 'David Kim', priority: 'P1', sprintId: 'S41' },
      { id: 'T7', title: 'Cross-browser Testing Matrix', description: 'Create automated cross-browser test matrix for 12 browsers', status: 'Done', assignee: 'Elena Rodriguez', priority: 'P2', sprintId: 'S41' },
    ]
  },
];

const initialLeaves: LeaveRequest[] = [
  { id: 'L1', employeeName: 'Sarah Chen', startDate: getLiveDate(-28), endDate: getLiveDate(-21), type: 'PTO', status: 'Approved' },
  { id: 'L2', employeeName: 'Michael Chang', startDate: getLiveDate(-14), endDate: getLiveDate(-7), type: 'Personal', status: 'Pending' },
];

const initialMeetings: Meeting[] = [
  { id: 'M1', title: 'Daily Bug Triage', description: 'Review and prioritize new bugs from the last 24 hours', time: '10:00 AM', duration: '30 min', date: getLiveDate(0), participants: 8, organizer: 'Alex Mercer', type: 'Daily' },
  { id: 'M2', title: 'Sprint Review', description: 'Demo completed work for Sprint 42 to stakeholders', time: '2:00 PM', duration: '60 min', date: getLiveDate(7), participants: 15, organizer: 'Alex Mercer', type: 'Weekly' },
  { id: 'M3', title: 'Test Automation Workshop', description: 'Hands-on workshop on Playwright best practices', time: '11:00 AM', duration: '45 min', date: getLiveDate(14), participants: 6, organizer: 'James Wilson', type: 'Ad-hoc' },
];

const initialChannels: ChatChannel[] = [
  { id: 'C1', name: 'qa-automation-sync', unread: 0 },
  { id: 'C2', name: 'qa-manual-testing', unread: 0 },
  { id: 'C3', name: 'bug-triage', unread: 0 },
  { id: 'C4', name: 'general', unread: 0 },
];

const initialApprovals: Approval[] = [
  { id: 'A1', title: 'Release Candidate v2.4.0', description: 'All tests passed. Awaiting QA Director signature for production deployment.', status: 'Pending', requestedBy: 'DevOps Team', date: getLiveDate(21), priority: 'High' },
  { id: 'A2', title: 'Auth V2 Hotfix Rollout', description: 'Urgent hotfix for SSO token refresh issue. Pre-approved by security team.', status: 'Approved', requestedBy: 'Security Team', date: getLiveDate(28), priority: 'High' },
  { id: 'A3', title: 'Staging Environment Cleanup', description: 'Request to reset staging DB and redeploy all microservices for fresh test run.', status: 'Rejected', requestedBy: 'Infrastructure', date: getLiveDate(-26), priority: 'Low' },
];

const initialNotifications: Notification[] = [
  { id: 'N1', title: 'Nightly Cypress Run Failed', message: "3 tests failed in the 'Payment Checkout' suite on staging-v2 environment.", type: 'alert', timestamp: new Date(Date.now() - 10 * 60 * 1000), isRead: false },
  { id: 'N2', title: 'Release Candidate Approved', message: 'All tests passed for Auth V2 rollout. Ready for production deployment.', type: 'success', timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), isRead: false },
  { id: 'N3', title: 'CI Pipeline Warning', message: 'Build time exceeded 15 min threshold for payment-core-service.', type: 'warning', timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), isRead: true },
  { id: 'N4', title: 'New Vulnerability Detected', message: 'CVE-2026-1234 affects lodash dependency. Patch available.', type: 'alert', timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), isRead: true },
];

const initialPerformances: PerformanceEntry[] = [
  { id: 'P1', name: 'James Wilson', role: 'Automation Engineer', scriptsWritten: 52, bugsFound: 6, reviewScore: 4.9, automationCoverage: 92, initials: 'JW' },
  { id: 'P2', name: 'Sarah Chen', role: 'Senior SDET', scriptsWritten: 45, bugsFound: 12, reviewScore: 4.8, automationCoverage: 88, initials: 'SC' },
  { id: 'P3', name: 'David Kim', role: 'QA Engineer', scriptsWritten: 38, bugsFound: 15, reviewScore: 4.6, automationCoverage: 78, initials: 'DK' },
  { id: 'P4', name: 'Michael Chang', role: 'Security QA', scriptsWritten: 32, bugsFound: 8, reviewScore: 4.5, automationCoverage: 65, initials: 'MC' },
  { id: 'P5', name: 'Elena Rodriguez', role: 'Manual Tester', scriptsWritten: 12, bugsFound: 22, reviewScore: 4.2, automationCoverage: 35, initials: 'ER' },
];

const initialMetrics: DashboardMetrics = {
  releaseScore: 94, releaseTrend: 2.4,
  totalTestCases: 12450, passRate: 88, failRate: 4, skipRate: 8,
  activeBugs: 142, criticalBugs: 2, highBugs: 18, mediumBugs: 45, lowBugs: 77,
  automationCoverage: 76.4, automationTarget: 80, automationTrend: 5,
  avgFixTime: 1.2, criticalFixTime: '4.5 hours',
  criticalPathCoverage: 100, regressionPassRate: 98.2,
};

const initialTestExecutions: TestExecution[] = [
  { week: 'Week 1', automation: 65, manual: 120 },
  { week: 'Week 2', automation: 75, manual: 90 },
  { week: 'Week 3', automation: 85, manual: 60 },
  { week: 'Week 4', automation: 95, manual: 40 },
];

const initialDefectCategories: DefectCategory[] = [
  { module: 'Payment Core', critical: 2, high: 5, medium: 8, low: 12 },
  { module: 'Analytics UI', critical: 0, high: 4, medium: 12, low: 18 },
  { module: 'Auth UI', critical: 1, high: 3, medium: 6, low: 15 },
  { module: 'Reporting', critical: 0, high: 6, medium: 19, low: 32 },
  { module: 'Core Auth', critical: 2, high: 4, medium: 10, low: 8 },
];

let bugCounter = 4095;
let messageCounter = 0;
let approvalCounter = 3;

export function useTeam() {
  const [team, setTeam] = useState<TeamMember[]>(() => load('team', initialTeam));
  const [search, setSearch] = useState('');

  const updateSearch = useCallback((s: string) => setSearch(s), []);

  const filtered = team.filter(m =>
    !search || m.name.toLowerCase().includes(search.toLowerCase()) || m.role.toLowerCase().includes(search.toLowerCase())
  );

  const addMember = useCallback((member: Omit<TeamMember, 'id'>) => {
    setTeam(prev => persist('team', [...prev, { ...member, id: String(Date.now()) }]));
  }, []);

  const removeMember = useCallback((id: string) => {
    setTeam(prev => persist('team', prev.filter(m => m.id !== id)));
  }, []);

  return { team: filtered, allTeam: team, search, updateSearch, addMember, removeMember };
}

export function useBugs() {
  const [bugs, setBugs] = useState<Bug[]>(() => load('bugs', initialBugs));
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [severityFilter, setSeverityFilter] = useState<string>('All');
  const [moduleFilter, setModuleFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const perPage = 5;

  const filtered = bugs.filter(b => {
    if (statusFilter !== 'All' && b.status !== statusFilter) return false;
    if (severityFilter !== 'All' && b.severity !== severityFilter) return false;
    if (moduleFilter !== 'All' && b.module !== moduleFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      if (!b.assignee.name.toLowerCase().includes(q) && !b.title.toLowerCase().includes(q)) return false;
    }
    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const addBug = useCallback((bug: Omit<Bug, 'id' | 'isClosed' | 'createdAt'>) => {
    bugCounter++;
    const newBug: Bug = { ...bug, id: `DEF-${bugCounter}`, isClosed: false, createdAt: new Date().toISOString() };
    setBugs(prev => persist('bugs', [newBug, ...prev]));
    return newBug;
  }, []);

  const updateBugStatus = useCallback((id: string, status: Bug['status']) => {
    setBugs(prev => persist('bugs', prev.map(b => b.id === id ? { ...b, status, isClosed: status === 'Closed' } : b)));
  }, []);

  const assignBug = useCallback((id: string, assignee: { name: string; avatar: string | null }) => {
    setBugs(prev => persist('bugs', prev.map(b => b.id === id ? { ...b, assignee, status: b.status === 'Open' ? 'In Progress' as const : b.status } : b)));
  }, []);

  return {
    bugs: paginated, total: filtered.length, page, totalPages, perPage,
    setPage, statusFilter, setStatusFilter, severityFilter, setSeverityFilter,
    moduleFilter, setModuleFilter, searchQuery, setSearchQuery,
    addBug, updateBugStatus, assignBug, allBugs: bugs,
  };
}

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>(() => load('projects', initialProjects));

  const updateStatus = useCallback((id: string, status: Project['status']) => {
    setProjects(prev => persist('projects', prev.map(p => p.id === id ? { ...p, status } : p)));
  }, []);

  const updateCoverage = useCallback((id: string, coverage: number) => {
    setProjects(prev => persist('projects', prev.map(p => p.id === id ? { ...p, coverage } : p)));
  }, []);

  return { projects, updateStatus, updateCoverage };
}

export function useSprints() {
  const [sprints, setSprints] = useState<Sprint[]>(() => load('sprints', initialSprints));

  const updateTaskStatus = useCallback((sprintId: string, taskId: string, status: SprintTask['status']) => {
    setSprints(prev => persist('sprints', prev.map(s => s.id === sprintId ? {
      ...s, tasks: s.tasks.map(t => t.id === taskId ? { ...t, status } : t)
    } : s)));
  }, []);

  const addTask = useCallback((sprintId: string, task: Omit<SprintTask, 'id' | 'sprintId'>) => {
    setSprints(prev => persist('sprints', prev.map(s => s.id === sprintId ? {
      ...s, tasks: [...s.tasks, { ...task, id: `T${Date.now()}`, sprintId }]
    } : s)));
  }, []);

  return { sprints, updateTaskStatus, addTask };
}

export function useLeaves() {
  const [leaves, setLeaves] = useState<LeaveRequest[]>(() => load('leaves', initialLeaves));

  const addLeave = useCallback((leave: Omit<LeaveRequest, 'id'>) => {
    setLeaves(prev => persist('leaves', [...prev, { ...leave, id: `L${Date.now()}` }]));
  }, []);

  const updateStatus = useCallback((id: string, status: LeaveRequest['status']) => {
    setLeaves(prev => persist('leaves', prev.map(l => l.id === id ? { ...l, status } : l)));
  }, []);

  return { leaves, addLeave, updateStatus };
}

export function useMeetings() {
  const [meetings, setMeetings] = useState<Meeting[]>(() => load('meetings', initialMeetings));

  const addMeeting = useCallback((meeting: Omit<Meeting, 'id'>) => {
    setMeetings(prev => persist('meetings', [...prev, { ...meeting, id: `M${Date.now()}` }]));
  }, []);

  return { meetings, addMeeting };
}

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>(() => load('chat_messages', [
    { id: 'MSG1', sender: 'Sarah Chen', initials: 'SC', message: "I've updated the Cypress scripts for the new Auth V2 flow. Can someone review the PR?", timestamp: new Date(Date.now() - 120000), channel: 'qa-automation-sync' },
    { id: 'MSG2', sender: 'David Kim', initials: 'DK', message: 'Sure, I\'ll take a look. Got the link?', timestamp: new Date(Date.now() - 60000), channel: 'qa-automation-sync' },
    { id: 'MSG3', sender: 'Sarah Chen', initials: 'SC', message: 'Thanks! https://github.com/sahara/pull/428', timestamp: new Date(Date.now() - 30000), channel: 'qa-automation-sync' },
  ]));
  const [channels] = useState<ChatChannel[]>(initialChannels);
  const [activeChannel, setActiveChannel] = useState('qa-automation-sync');

  const channelMessages = messages.filter(m => m.channel === activeChannel);

  const sendMessage = useCallback((text: string) => {
    if (!text.trim()) return;
    messageCounter++;
    const msg: ChatMessage = {
      id: `MSG${messageCounter}`,
      sender: 'Alex Mercer',
      initials: 'AM',
      message: text.trim(),
      timestamp: new Date(),
      channel: activeChannel,
    };
    setMessages(prev => persist('chat_messages', [...prev, msg]));
  }, [activeChannel]);

  return { messages: channelMessages, allMessages: messages, channels, activeChannel, setActiveChannel, sendMessage };
}

export function useApprovals() {
  const [approvals, setApprovals] = useState<Approval[]>(() => load('approvals', initialApprovals));

  const approve = useCallback((id: string) => {
    setApprovals(prev => persist('approvals', prev.map(a => a.id === id ? { ...a, status: 'Approved' as const } : a)));
  }, []);

  const reject = useCallback((id: string) => {
    setApprovals(prev => persist('approvals', prev.map(a => a.id === id ? { ...a, status: 'Rejected' as const } : a)));
  }, []);

  const addApproval = useCallback((approval: Omit<Approval, 'id'>) => {
    approvalCounter++;
    setApprovals(prev => persist('approvals', [...prev, { ...approval, id: `A${approvalCounter}` }]));
  }, []);

  return { approvals, approve, reject, addApproval };
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>(() => load('notifications', initialNotifications));

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAsRead = useCallback((id: string) => {
    setNotifications(prev => persist('notifications', prev.map(n => n.id === id ? { ...n, isRead: true } : n)));
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications(prev => persist('notifications', prev.map(n => ({ ...n, isRead: true }))));
  }, []);

  return { notifications, unreadCount, markAsRead, markAllAsRead };
}

export function usePerformance() {
  const [performances] = useState<PerformanceEntry[]>(initialPerformances);
  return { performances };
}

export function useDashboardMetrics() {
  const [metrics] = useState<DashboardMetrics>(initialMetrics);
  const [executions] = useState<TestExecution[]>(initialTestExecutions);
  const [defectCategories] = useState<DefectCategory[]>(initialDefectCategories);
  return { metrics, executions, defectCategories };
}

export function useSettings() {
  const [settings, setSettings] = useState<Record<string, any>>(() => load('settings', {
    deviceFarm: 'AWS Device Farm',
    alertRouting: true,
    darkMode: false,
    emailNotifications: true,
    autoAssignBugs: false,
    sprintVelocityTarget: 42,
  }));

  const updateSetting = useCallback((key: string, value: any) => {
    setSettings(prev => persist('settings', { ...prev, [key]: value }));
  }, []);

  return { settings, updateSetting };
}

export function useToast() {
  const [toasts, setToasts] = useState<Array<{ id: string; message: string; type: 'success' | 'error' | 'info' | 'warning' }>>([]);

  const addToast = useCallback((message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info') => {
    const id = String(Date.now());
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return { toasts, addToast, removeToast };
}
