import { getLiveDate, getLiveTime } from '../../../utils/liveDataHelpers';
// ═══════════════════════════════════════════════════════════
// WorkSphere Manager Dashboard — Centralized Mock Data
// Enterprise-grade realistic workforce data
// ═══════════════════════════════════════════════════════════

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  avatar: string;
  designation: string;
  department: string;
  status: 'online' | 'away' | 'offline' | 'on-leave';
  workload: number;
  productivityScore: number;
  currentTask: string;
  joinDate: string;
  phone: string;
  skills: string[];
  performanceRating: number;
  tasksCompleted: number;
  tasksAssigned: number;
  attendanceRate: number;
  reportingTo: string;
}

export interface Project {
  id: string;
  name: string;
  status: 'active' | 'on-hold' | 'completed' | 'at-risk';
  progress: number;
  deadline: string;
  startDate: string;
  team: string[];
  budget: number;
  spent: number;
  priority: 'critical' | 'high' | 'medium' | 'low';
  milestones: { name: string; date: string; completed: boolean }[];
  description: string;
  health: 'green' | 'yellow' | 'red';
}

export interface Task {
  id: string;
  title: string;
  description: string;
  assignee: string;
  assigneeAvatar: string;
  status: 'pending' | 'in-progress' | 'review' | 'blocked' | 'completed';
  priority: 'critical' | 'high' | 'medium' | 'low';
  dueDate: string;
  project: string;
  subtasks: { title: string; completed: boolean }[];
  tags: string[];
  createdAt: string;
  estimatedHours: number;
  loggedHours: number;
  comments: number;
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  employeeAvatar: string;
  type: 'annual' | 'sick' | 'personal' | 'maternity' | 'paternity' | 'unpaid' | 'compensatory';
  from: string;
  to: string;
  days: number;
  status: 'pending' | 'approved' | 'rejected';
  reason: string;
  appliedOn: string;
  backup: string;
  conflicts: string[];
  leaveBalance: number;
}

export interface AttendanceRecord {
  id: string;
  employeeName: string;
  employeeId: string;
  date: string;
  checkIn: string;
  checkOut: string;
  workHours: number;
  status: 'present' | 'late' | 'absent' | 'remote' | 'half-day' | 'on-leave';
  overtime: number;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'leave' | 'task' | 'performance' | 'meeting' | 'system' | 'attendance';
  priority: 'high' | 'medium' | 'low';
  timestamp: string;
  read: boolean;
  actionable: boolean;
  actionType?: 'approve' | 'reject' | 'view' | 'review';
  referenceId?: string;
}

export interface ChatChannel {
  id: string;
  name: string;
  type: 'team' | 'project' | 'direct' | 'announcement';
  unread: number;
  lastMessage: string;
  lastMessageTime: string;
  members: number;
  avatar?: string;
}

export interface Document {
  id: string;
  name: string;
  type: 'pdf' | 'doc' | 'xls' | 'ppt' | 'img' | 'folder';
  size: string;
  modified: string;
  owner: string;
  shared: boolean;
  folder: string;
}

export interface PerformanceRecord {
  employeeId: string;
  employeeName: string;
  taskCompletionRate: number;
  attendanceScore: number;
  productivityScore: number;
  collaborationScore: number;
  qualityScore: number;
  overallRating: number;
  trend: 'up' | 'down' | 'stable';
  goals: { name: string; progress: number; deadline: string }[];
  lastReview: string;
  nextReview: string;
}

// ── Team Members ────────────────────────────────────────────
export const teamMembers: TeamMember[] = [
  {
    id: 'EMP001', name: 'Arjun Mehta', email: 'arjun.mehta@worksphere.io', avatar: 'AM',
    designation: 'Senior Frontend Engineer', department: 'Engineering', status: 'online',
    workload: 82, productivityScore: 94, currentTask: 'Dashboard UI Refactor',
    joinDate: '2023-03-15', phone: '+91-9876543210', skills: ['React', 'TypeScript', 'Node.js'],
    performanceRating: 4.6, tasksCompleted: 156, tasksAssigned: 12, attendanceRate: 97, reportingTo: 'You'
  },
  {
    id: 'EMP002', name: 'Priya Sharma', email: 'priya.sharma@worksphere.io', avatar: 'PS',
    designation: 'Backend Developer', department: 'Engineering', status: 'online',
    workload: 68, productivityScore: 91, currentTask: 'API Gateway Optimization',
    joinDate: '2022-08-22', phone: '+91-9876543211', skills: ['Java', 'Spring Boot', 'PostgreSQL'],
    performanceRating: 4.4, tasksCompleted: 189, tasksAssigned: 8, attendanceRate: 95, reportingTo: 'You'
  },
  {
    id: 'EMP003', name: 'Ravi Kumar', email: 'ravi.kumar@worksphere.io', avatar: 'RK',
    designation: 'DevOps Engineer', department: 'Infrastructure', status: 'away',
    workload: 90, productivityScore: 88, currentTask: 'CI/CD Pipeline Migration',
    joinDate: '2023-01-10', phone: '+91-9876543212', skills: ['Docker', 'Kubernetes', 'AWS'],
    performanceRating: 4.2, tasksCompleted: 134, tasksAssigned: 15, attendanceRate: 93, reportingTo: 'You'
  },
  {
    id: 'EMP004', name: 'Sneha Patel', email: 'sneha.patel@worksphere.io', avatar: 'SP',
    designation: 'UI/UX Designer', department: 'Design', status: 'online',
    workload: 55, productivityScore: 96, currentTask: 'Design System v3.0',
    joinDate: '2023-06-01', phone: '+91-9876543213', skills: ['Figma', 'Adobe XD', 'CSS'],
    performanceRating: 4.8, tasksCompleted: 98, tasksAssigned: 6, attendanceRate: 98, reportingTo: 'You'
  },
  {
    id: 'EMP005', name: 'Vikram Singh', email: 'vikram.singh@worksphere.io', avatar: 'VS',
    designation: 'QA Lead', department: 'Quality Assurance', status: 'on-leave',
    workload: 0, productivityScore: 87, currentTask: 'On Annual Leave',
    joinDate: '2021-11-20', phone: '+91-9876543214', skills: ['Selenium', 'Jest', 'Cypress'],
    performanceRating: 4.1, tasksCompleted: 210, tasksAssigned: 0, attendanceRate: 91, reportingTo: 'You'
  },
  {
    id: 'EMP006', name: 'Ananya Reddy', email: 'ananya.reddy@worksphere.io', avatar: 'AR',
    designation: 'Full Stack Developer', department: 'Engineering', status: 'online',
    workload: 75, productivityScore: 92, currentTask: 'Payment Module Integration',
    joinDate: '2023-09-14', phone: '+91-9876543215', skills: ['React', 'Node.js', 'MongoDB'],
    performanceRating: 4.5, tasksCompleted: 78, tasksAssigned: 10, attendanceRate: 96, reportingTo: 'You'
  },
  {
    id: 'EMP007', name: 'Karthik Nair', email: 'karthik.nair@worksphere.io', avatar: 'KN',
    designation: 'Data Engineer', department: 'Data', status: 'online',
    workload: 60, productivityScore: 89, currentTask: 'ETL Pipeline Refactor',
    joinDate: '2022-05-08', phone: '+91-9876543216', skills: ['Python', 'Spark', 'Airflow'],
    performanceRating: 4.3, tasksCompleted: 145, tasksAssigned: 7, attendanceRate: 94, reportingTo: 'You'
  },
  {
    id: 'EMP008', name: 'Meera Joshi', email: 'meera.joshi@worksphere.io', avatar: 'MJ',
    designation: 'Product Analyst', department: 'Product', status: 'away',
    workload: 45, productivityScore: 93, currentTask: 'Q2 Market Analysis Report',
    joinDate: getLiveDate(-23), phone: '+91-9876543217', skills: ['SQL', 'Tableau', 'Python'],
    performanceRating: 4.7, tasksCompleted: 42, tasksAssigned: 5, attendanceRate: 99, reportingTo: 'You'
  },
  {
    id: 'EMP009', name: 'Rohan Desai', email: 'rohan.desai@worksphere.io', avatar: 'RD',
    designation: 'Mobile Developer', department: 'Engineering', status: 'online',
    workload: 88, productivityScore: 85, currentTask: 'React Native App v2.1',
    joinDate: '2023-04-20', phone: '+91-9876543218', skills: ['React Native', 'Swift', 'Kotlin'],
    performanceRating: 4.0, tasksCompleted: 112, tasksAssigned: 14, attendanceRate: 92, reportingTo: 'You'
  },
  {
    id: 'EMP010', name: 'Divya Iyer', email: 'divya.iyer@worksphere.io', avatar: 'DI',
    designation: 'Security Engineer', department: 'Security', status: 'online',
    workload: 72, productivityScore: 90, currentTask: 'Vulnerability Assessment Q2',
    joinDate: '2022-10-05', phone: '+91-9876543219', skills: ['Pentest', 'SIEM', 'Cloud Security'],
    performanceRating: 4.4, tasksCompleted: 167, tasksAssigned: 9, attendanceRate: 95, reportingTo: 'You'
  },
  {
    id: 'EMP011', name: 'Aditya Rao', email: 'aditya.rao@worksphere.io', avatar: 'AR2',
    designation: 'Technical Writer', department: 'Documentation', status: 'offline',
    workload: 35, productivityScore: 86, currentTask: 'API Documentation Update',
    joinDate: getLiveDate(-16), phone: '+91-9876543220', skills: ['Markdown', 'API Docs', 'Confluence'],
    performanceRating: 3.9, tasksCompleted: 34, tasksAssigned: 4, attendanceRate: 90, reportingTo: 'You'
  },
  {
    id: 'EMP012', name: 'Nisha Gupta', email: 'nisha.gupta@worksphere.io', avatar: 'NG',
    designation: 'Scrum Master', department: 'Engineering', status: 'online',
    workload: 65, productivityScore: 95, currentTask: 'Sprint 24 Planning',
    joinDate: '2022-03-18', phone: '+91-9876543221', skills: ['Agile', 'Jira', 'Confluence'],
    performanceRating: 4.6, tasksCompleted: 220, tasksAssigned: 8, attendanceRate: 97, reportingTo: 'You'
  },
];

// ── Projects ────────────────────────────────────────────────
export const projects: Project[] = [
  {
    id: 'PRJ001', name: 'WorkSphere Platform v3.0', status: 'active', progress: 68,
    deadline: getLiveDate(-9), startDate: getLiveDate(-2), team: ['EMP001', 'EMP002', 'EMP006', 'EMP009'],
    budget: 450000, spent: 285000, priority: 'critical',
    description: 'Major platform overhaul with new architecture, enhanced security, and AI-powered features.',
    health: 'green',
    milestones: [
      { name: 'Architecture Design', date: getLiveDate(5), completed: true },
      { name: 'Core API Development', date: getLiveDate(12), completed: true },
      { name: 'Frontend Rebuild', date: getLiveDate(19), completed: false },
      { name: 'Beta Release', date: getLiveDate(26), completed: false },
      { name: 'Production Launch', date: getLiveDate(-28), completed: false },
    ]
  },
  {
    id: 'PRJ002', name: 'Mobile App Redesign', status: 'active', progress: 45,
    deadline: getLiveDate(-21), startDate: getLiveDate(-14), team: ['EMP004', 'EMP009'],
    budget: 180000, spent: 92000, priority: 'high',
    description: 'Complete redesign of mobile applications for iOS and Android with new design system.',
    health: 'yellow',
    milestones: [
      { name: 'UI/UX Research', date: getLiveDate(-7), completed: true },
      { name: 'Design Mockups', date: getLiveDate(0), completed: true },
      { name: 'Development Phase 1', date: getLiveDate(7), completed: false },
      { name: 'QA & Testing', date: getLiveDate(14), completed: false },
    ]
  },
  {
    id: 'PRJ003', name: 'Cloud Migration - Phase 2', status: 'active', progress: 32,
    deadline: getLiveDate(21), startDate: getLiveDate(28), team: ['EMP003', 'EMP010'],
    budget: 320000, spent: 98000, priority: 'critical',
    description: 'Migration of remaining on-premise services to AWS with zero-downtime deployment.',
    health: 'green',
    milestones: [
      { name: 'Infrastructure Audit', date: getLiveDate(-26), completed: true },
      { name: 'Migration Plan', date: getLiveDate(-19), completed: false },
      { name: 'Staging Migration', date: getLiveDate(-12), completed: false },
      { name: 'Production Cutover', date: getLiveDate(-5), completed: false },
    ]
  },
  {
    id: 'PRJ004', name: 'Data Analytics Pipeline', status: 'active', progress: 78,
    deadline: getLiveDate(2), startDate: getLiveDate(9), team: ['EMP007', 'EMP008'],
    budget: 150000, spent: 118000, priority: 'high',
    description: 'Real-time data analytics pipeline with ML-powered insights and automated reporting.',
    health: 'green',
    milestones: [
      { name: 'Data Model Design', date: getLiveDate(16), completed: true },
      { name: 'ETL Development', date: getLiveDate(23), completed: true },
      { name: 'Dashboard Integration', date: getLiveDate(30), completed: true },
      { name: 'ML Model Training', date: getLiveDate(-24), completed: false },
    ]
  },
  {
    id: 'PRJ005', name: 'Security Compliance Audit', status: 'at-risk', progress: 55,
    deadline: getLiveDate(-17), startDate: getLiveDate(-10), team: ['EMP010', 'EMP005'],
    budget: 90000, spent: 62000, priority: 'critical',
    description: 'SOC 2 Type II compliance audit and implementation of required security controls.',
    health: 'red',
    milestones: [
      { name: 'Gap Analysis', date: getLiveDate(-3), completed: true },
      { name: 'Control Implementation', date: getLiveDate(4), completed: true },
      { name: 'Internal Audit', date: getLiveDate(11), completed: false },
      { name: 'External Audit', date: getLiveDate(18), completed: false },
    ]
  },
  {
    id: 'PRJ006', name: 'API Documentation Overhaul', status: 'active', progress: 85,
    deadline: getLiveDate(25), startDate: getLiveDate(-29), team: ['EMP011', 'EMP002'],
    budget: 45000, spent: 38000, priority: 'medium',
    description: 'Complete rewrite of public and internal API documentation with interactive examples.',
    health: 'green',
    milestones: [
      { name: 'Content Audit', date: getLiveDate(-22), completed: true },
      { name: 'Writing Phase', date: getLiveDate(-15), completed: true },
      { name: 'Review & Publish', date: getLiveDate(-8), completed: false },
    ]
  },
  {
    id: 'PRJ007', name: 'Employee Self-Service Portal', status: 'on-hold', progress: 20,
    deadline: getLiveDate(-1), startDate: getLiveDate(6), team: ['EMP001', 'EMP004'],
    budget: 200000, spent: 35000, priority: 'medium',
    description: 'Self-service portal for employees to manage HR tasks, leave, expenses, and documents.',
    health: 'yellow',
    milestones: [
      { name: 'Requirements Gathering', date: getLiveDate(13), completed: true },
      { name: 'Wireframes', date: getLiveDate(20), completed: false },
      { name: 'Development', date: getLiveDate(27), completed: false },
      { name: 'Launch', date: getLiveDate(-27), completed: false },
    ]
  },
  {
    id: 'PRJ008', name: 'Performance Review System', status: 'completed', progress: 100,
    deadline: getLiveDate(-20), startDate: getLiveDate(-13), team: ['EMP006', 'EMP012'],
    budget: 120000, spent: 108000, priority: 'high',
    description: '360-degree performance review system with AI-powered insights and goal tracking.',
    health: 'green',
    milestones: [
      { name: 'System Design', date: getLiveDate(-6), completed: true },
      { name: 'Core Development', date: getLiveDate(1), completed: true },
      { name: 'Testing & QA', date: getLiveDate(8), completed: true },
      { name: 'Deployment', date: getLiveDate(15), completed: true },
    ]
  },
];

// ── Tasks ────────────────────────────────────────────────────
export const tasks: Task[] = [
  { id: 'TSK001', title: 'Implement dashboard analytics widgets', description: 'Build interactive chart components for the manager dashboard overview', assignee: 'Arjun Mehta', assigneeAvatar: 'AM', status: 'in-progress', priority: 'high', dueDate: getLiveDate(22), project: 'WorkSphere Platform v3.0', subtasks: [{ title: 'Line chart component', completed: true }, { title: 'Pie chart component', completed: true }, { title: 'Heatmap component', completed: false }], tags: ['frontend', 'ui'], createdAt: getLiveDate(29), estimatedHours: 24, loggedHours: 16, comments: 5 },
  { id: 'TSK002', title: 'API rate limiting middleware', description: 'Implement rate limiting for all public API endpoints', assignee: 'Priya Sharma', assigneeAvatar: 'PS', status: 'review', priority: 'critical', dueDate: getLiveDate(-25), project: 'WorkSphere Platform v3.0', subtasks: [{ title: 'Token bucket implementation', completed: true }, { title: 'Redis integration', completed: true }, { title: 'Load testing', completed: false }], tags: ['backend', 'security'], createdAt: getLiveDate(-18), estimatedHours: 16, loggedHours: 14, comments: 8 },
  { id: 'TSK003', title: 'Kubernetes cluster auto-scaling', description: 'Configure HPA and VPA for production cluster', assignee: 'Ravi Kumar', assigneeAvatar: 'RK', status: 'in-progress', priority: 'high', dueDate: getLiveDate(-11), project: 'Cloud Migration - Phase 2', subtasks: [{ title: 'HPA configuration', completed: true }, { title: 'VPA setup', completed: false }, { title: 'Load testing', completed: false }], tags: ['devops', 'infrastructure'], createdAt: getLiveDate(-4), estimatedHours: 20, loggedHours: 12, comments: 3 },
  { id: 'TSK004', title: 'Design system component library v3', description: 'Create reusable component library with new design tokens', assignee: 'Sneha Patel', assigneeAvatar: 'SP', status: 'in-progress', priority: 'medium', dueDate: getLiveDate(3), project: 'Mobile App Redesign', subtasks: [{ title: 'Color tokens', completed: true }, { title: 'Typography scale', completed: true }, { title: 'Button components', completed: true }, { title: 'Form components', completed: false }], tags: ['design', 'ui'], createdAt: getLiveDate(10), estimatedHours: 32, loggedHours: 22, comments: 12 },
  { id: 'TSK005', title: 'Regression test suite for payment module', description: 'Comprehensive E2E test suite for all payment flows', assignee: 'Vikram Singh', assigneeAvatar: 'VS', status: 'blocked', priority: 'high', dueDate: getLiveDate(17), project: 'WorkSphere Platform v3.0', subtasks: [{ title: 'Test plan document', completed: true }, { title: 'Test scripts', completed: false }], tags: ['qa', 'testing'], createdAt: getLiveDate(24), estimatedHours: 28, loggedHours: 8, comments: 4 },
  { id: 'TSK006', title: 'Payment gateway integration', description: 'Integrate Razorpay and Stripe payment gateways', assignee: 'Ananya Reddy', assigneeAvatar: 'AR', status: 'in-progress', priority: 'critical', dueDate: getLiveDate(-30), project: 'WorkSphere Platform v3.0', subtasks: [{ title: 'Razorpay SDK setup', completed: true }, { title: 'Stripe SDK setup', completed: true }, { title: 'Webhook handlers', completed: false }, { title: 'Error handling', completed: false }], tags: ['backend', 'payments'], createdAt: getLiveDate(-23), estimatedHours: 40, loggedHours: 28, comments: 9 },
  { id: 'TSK007', title: 'ETL pipeline performance optimization', description: 'Optimize Spark jobs for 3x throughput improvement', assignee: 'Karthik Nair', assigneeAvatar: 'KN', status: 'review', priority: 'medium', dueDate: getLiveDate(-16), project: 'Data Analytics Pipeline', subtasks: [{ title: 'Query optimization', completed: true }, { title: 'Partition strategy', completed: true }, { title: 'Benchmark tests', completed: true }], tags: ['data', 'performance'], createdAt: getLiveDate(-9), estimatedHours: 18, loggedHours: 17, comments: 6 },
  { id: 'TSK008', title: 'Q2 competitive analysis report', description: 'Detailed market analysis with competitor benchmarking', assignee: 'Meera Joshi', assigneeAvatar: 'MJ', status: 'pending', priority: 'medium', dueDate: getLiveDate(-2), project: 'Data Analytics Pipeline', subtasks: [{ title: 'Data collection', completed: false }, { title: 'Analysis', completed: false }, { title: 'Report writing', completed: false }], tags: ['analytics', 'report'], createdAt: getLiveDate(5), estimatedHours: 14, loggedHours: 0, comments: 1 },
  { id: 'TSK009', title: 'React Native performance profiling', description: 'Profile and optimize app startup time and memory usage', assignee: 'Rohan Desai', assigneeAvatar: 'RD', status: 'in-progress', priority: 'high', dueDate: getLiveDate(12), project: 'Mobile App Redesign', subtasks: [{ title: 'Startup profiling', completed: true }, { title: 'Memory leak detection', completed: false }, { title: 'Bundle optimization', completed: false }], tags: ['mobile', 'performance'], createdAt: getLiveDate(19), estimatedHours: 22, loggedHours: 14, comments: 7 },
  { id: 'TSK010', title: 'SIEM rule tuning and alerting', description: 'Fine-tune SIEM detection rules to reduce false positives', assignee: 'Divya Iyer', assigneeAvatar: 'DI', status: 'completed', priority: 'high', dueDate: getLiveDate(26), project: 'Security Compliance Audit', subtasks: [{ title: 'Rule audit', completed: true }, { title: 'Alert thresholds', completed: true }, { title: 'Documentation', completed: true }], tags: ['security', 'monitoring'], createdAt: getLiveDate(-28), estimatedHours: 16, loggedHours: 15, comments: 4 },
  { id: 'TSK011', title: 'OpenAPI 3.1 spec migration', description: 'Migrate all API specs from OpenAPI 3.0 to 3.1', assignee: 'Aditya Rao', assigneeAvatar: 'AR2', status: 'pending', priority: 'low', dueDate: getLiveDate(-21), project: 'API Documentation Overhaul', subtasks: [{ title: 'Schema audit', completed: false }, { title: 'Migration', completed: false }], tags: ['docs', 'api'], createdAt: getLiveDate(-14), estimatedHours: 10, loggedHours: 0, comments: 2 },
  { id: 'TSK012', title: 'Sprint 24 retrospective & planning', description: 'Facilitate retro and plan next sprint with team', assignee: 'Nisha Gupta', assigneeAvatar: 'NG', status: 'completed', priority: 'medium', dueDate: getLiveDate(-7), project: 'WorkSphere Platform v3.0', subtasks: [{ title: 'Retro facilitation', completed: true }, { title: 'Sprint planning', completed: true }, { title: 'Board setup', completed: true }], tags: ['agile', 'planning'], createdAt: getLiveDate(0), estimatedHours: 6, loggedHours: 5, comments: 3 },
  { id: 'TSK013', title: 'Database index optimization', description: 'Analyze slow queries and add composite indexes', assignee: 'Priya Sharma', assigneeAvatar: 'PS', status: 'pending', priority: 'high', dueDate: getLiveDate(7), project: 'WorkSphere Platform v3.0', subtasks: [{ title: 'Query analysis', completed: false }, { title: 'Index creation', completed: false }, { title: 'Performance testing', completed: false }], tags: ['backend', 'database'], createdAt: getLiveDate(14), estimatedHours: 12, loggedHours: 0, comments: 0 },
  { id: 'TSK014', title: 'Accessibility audit - WCAG 2.1', description: 'Full accessibility audit of all customer-facing pages', assignee: 'Sneha Patel', assigneeAvatar: 'SP', status: 'pending', priority: 'medium', dueDate: getLiveDate(21), project: 'WorkSphere Platform v3.0', subtasks: [{ title: 'Automated scan', completed: false }, { title: 'Manual testing', completed: false }, { title: 'Remediation plan', completed: false }], tags: ['design', 'a11y'], createdAt: getLiveDate(28), estimatedHours: 20, loggedHours: 0, comments: 1 },
];

// ── Leave Requests ──────────────────────────────────────────
export const leaveRequests: LeaveRequest[] = [
  { id: 'LV001', employeeId: 'EMP005', employeeName: 'Vikram Singh', employeeAvatar: 'VS', type: 'annual', from: getLiveDate(-26), to: getLiveDate(-19), days: 5, status: 'approved', reason: 'Family vacation planned to Goa.', appliedOn: getLiveDate(-12), backup: 'Divya Iyer', conflicts: [], leaveBalance: 12 },
  { id: 'LV002', employeeId: 'EMP003', employeeName: 'Ravi Kumar', employeeAvatar: 'RK', type: 'sick', from: getLiveDate(-5), to: getLiveDate(2), days: 2, status: 'pending', reason: 'Medical appointment and recovery.', appliedOn: getLiveDate(9), backup: '', conflicts: ['Cloud Migration sprint deadline'], leaveBalance: 8 },
  { id: 'LV003', employeeId: 'EMP008', employeeName: 'Meera Joshi', employeeAvatar: 'MJ', type: 'personal', from: getLiveDate(16), to: getLiveDate(23), days: 1, status: 'pending', reason: 'Personal errand - bank work.', appliedOn: getLiveDate(30), backup: 'Karthik Nair', conflicts: [], leaveBalance: 15 },
  { id: 'LV004', employeeId: 'EMP001', employeeName: 'Arjun Mehta', employeeAvatar: 'AM', type: 'annual', from: getLiveDate(-24), to: getLiveDate(-17), days: 5, status: 'pending', reason: 'Annual family trip to Rajasthan.', appliedOn: getLiveDate(-10), backup: 'Ananya Reddy', conflicts: ['Dashboard sprint overlap'], leaveBalance: 10 },
  { id: 'LV005', employeeId: 'EMP012', employeeName: 'Nisha Gupta', employeeAvatar: 'NG', type: 'compensatory', from: getLiveDate(-3), to: getLiveDate(4), days: 1, status: 'pending', reason: 'Comp-off for weekend production support.', appliedOn: getLiveDate(11), backup: '', conflicts: [], leaveBalance: 3 },
  { id: 'LV006', employeeId: 'EMP006', employeeName: 'Ananya Reddy', employeeAvatar: 'AR', type: 'sick', from: getLiveDate(18), to: getLiveDate(25), days: 2, status: 'pending', reason: 'Dental surgery and recovery.', appliedOn: getLiveDate(-29), backup: 'Arjun Mehta', conflicts: ['Payment module deadline near'], leaveBalance: 7 },
  { id: 'LV007', employeeId: 'EMP009', employeeName: 'Rohan Desai', employeeAvatar: 'RD', type: 'annual', from: getLiveDate(-22), to: getLiveDate(-15), days: 5, status: 'pending', reason: 'Wedding in family.', appliedOn: getLiveDate(-8), backup: 'Arjun Mehta', conflicts: ['Mobile app release timeline'], leaveBalance: 14 },
  { id: 'LV008', employeeId: 'EMP007', employeeName: 'Karthik Nair', employeeAvatar: 'KN', type: 'personal', from: getLiveDate(-1), to: getLiveDate(6), days: 1, status: 'approved', reason: 'House registration work.', appliedOn: getLiveDate(13), backup: 'Meera Joshi', conflicts: [], leaveBalance: 11 },
];

// ── Attendance Data ──────────────────────────────────────────
export const todayAttendance: AttendanceRecord[] = [
  { id: 'ATT001', employeeName: 'Arjun Mehta', employeeId: 'EMP001', date: getLiveDate(20), checkIn: '09:02', checkOut: '18:15', workHours: 9.2, status: 'present', overtime: 0.2 },
  { id: 'ATT002', employeeName: 'Priya Sharma', employeeId: 'EMP002', date: getLiveDate(27), checkIn: '09:15', checkOut: '18:30', workHours: 9.25, status: 'present', overtime: 0.25 },
  { id: 'ATT003', employeeName: 'Ravi Kumar', employeeId: 'EMP003', date: getLiveDate(-27), checkIn: '09:45', checkOut: '—', workHours: 6.5, status: 'late', overtime: 0 },
  { id: 'ATT004', employeeName: 'Sneha Patel', employeeId: 'EMP004', date: getLiveDate(-20), checkIn: '08:55', checkOut: '17:55', workHours: 9.0, status: 'present', overtime: 0 },
  { id: 'ATT005', employeeName: 'Vikram Singh', employeeId: 'EMP005', date: getLiveDate(-13), checkIn: '—', checkOut: '—', workHours: 0, status: 'on-leave', overtime: 0 },
  { id: 'ATT006', employeeName: 'Ananya Reddy', employeeId: 'EMP006', date: getLiveDate(-6), checkIn: '09:00', checkOut: '19:00', workHours: 10.0, status: 'present', overtime: 1.0 },
  { id: 'ATT007', employeeName: 'Karthik Nair', employeeId: 'EMP007', date: getLiveDate(1), checkIn: '08:50', checkOut: '18:00', workHours: 9.15, status: 'remote', overtime: 0.15 },
  { id: 'ATT008', employeeName: 'Meera Joshi', employeeId: 'EMP008', date: getLiveDate(8), checkIn: '10:30', checkOut: '—', workHours: 5.75, status: 'late', overtime: 0 },
  { id: 'ATT009', employeeName: 'Rohan Desai', employeeId: 'EMP009', date: getLiveDate(15), checkIn: '09:05', checkOut: '20:00', workHours: 10.9, status: 'present', overtime: 1.9 },
  { id: 'ATT010', employeeName: 'Divya Iyer', employeeId: 'EMP010', date: getLiveDate(22), checkIn: '09:10', checkOut: '18:20', workHours: 9.15, status: 'present', overtime: 0.15 },
  { id: 'ATT011', employeeName: 'Aditya Rao', employeeId: 'EMP011', date: getLiveDate(29), checkIn: '—', checkOut: '—', workHours: 0, status: 'absent', overtime: 0 },
  { id: 'ATT012', employeeName: 'Nisha Gupta', employeeId: 'EMP012', date: getLiveDate(-25), checkIn: '08:45', checkOut: '18:45', workHours: 10.0, status: 'present', overtime: 1.0 },
];

// ── Notifications ────────────────────────────────────────────
export const notifications: Notification[] = [
  { id: 'N001', title: 'Leave Request: Ravi Kumar', message: 'Sick leave for May 26-27. Review and take action.', type: 'leave', priority: 'high', timestamp: '2 min ago', read: false, actionable: true, actionType: 'approve', referenceId: 'LV002' },
  { id: 'N002', title: 'Task Overdue: Regression Test Suite', message: 'TSK005 assigned to Vikram Singh is blocked and overdue.', type: 'task', priority: 'high', timestamp: '15 min ago', read: false, actionable: true, actionType: 'view', referenceId: 'TSK005' },
  { id: 'N003', title: 'Security Audit at Risk', message: 'Project PRJ005 health turned RED. External audit deadline approaching.', type: 'system', priority: 'high', timestamp: '1 hr ago', read: false, actionable: true, actionType: 'view', referenceId: 'PRJ005' },
  { id: 'N004', title: 'Leave Request: Arjun Mehta', message: 'Annual leave Jun 2-6. Conflicts with Dashboard sprint.', type: 'leave', priority: 'medium', timestamp: '3 hrs ago', read: false, actionable: true, actionType: 'approve', referenceId: 'LV004' },
  { id: 'N005', title: 'Performance Review Due', message: 'Q2 performance reviews for 4 team members are due next week.', type: 'performance', priority: 'medium', timestamp: '5 hrs ago', read: true, actionable: true, actionType: 'review' },
  { id: 'N006', title: 'Sprint 24 Completed', message: 'Sprint 24 retrospective completed by Nisha Gupta. Velocity: 42 pts.', type: 'task', priority: 'low', timestamp: '1 day ago', read: true, actionable: false },
  { id: 'N007', title: 'Late Arrival: Meera Joshi', message: 'Checked in at 10:30 AM today. Second late arrival this week.', type: 'attendance', priority: 'medium', timestamp: '6 hrs ago', read: false, actionable: true, actionType: 'view' },
  { id: 'N008', title: 'Meeting: Q2 Review', message: 'Scheduled for tomorrow at 3:00 PM. 8 attendees confirmed.', type: 'meeting', priority: 'medium', timestamp: '1 day ago', read: true, actionable: false },
  { id: 'N009', title: 'Budget Alert: Engineering', message: 'Engineering department has used 83% of Q2 budget allocation.', type: 'system', priority: 'high', timestamp: '2 days ago', read: true, actionable: true, actionType: 'view' },
  { id: 'N010', title: 'Code Review Completed', message: 'Priya Sharma completed review for TSK002 - API rate limiting.', type: 'task', priority: 'low', timestamp: '2 days ago', read: true, actionable: false },
];

// ── Chat Channels ────────────────────────────────────────────
export const chatChannels: ChatChannel[] = [
  { id: 'CH001', name: 'Engineering Team', type: 'team', unread: 8, lastMessage: 'Arjun: PR #1247 is ready for review', lastMessageTime: '5 min ago', members: 8 },
  { id: 'CH002', name: 'Platform v3.0', type: 'project', unread: 3, lastMessage: 'Priya: API endpoints are deployed to staging', lastMessageTime: '22 min ago', members: 5 },
  { id: 'CH003', name: 'Design Sync', type: 'team', unread: 0, lastMessage: 'Sneha: Design tokens finalized ✅', lastMessageTime: '2 hrs ago', members: 3 },
  { id: 'CH004', name: 'Announcements', type: 'announcement', unread: 1, lastMessage: 'Team outing scheduled for June 15th', lastMessageTime: '1 day ago', members: 12 },
  { id: 'CH005', name: 'Ravi Kumar', type: 'direct', unread: 2, lastMessage: 'Ravi: Can we discuss the scaling issue?', lastMessageTime: '30 min ago', members: 2 },
  { id: 'CH006', name: 'DevOps Channel', type: 'team', unread: 0, lastMessage: 'Karthik: Pipeline runs stable now', lastMessageTime: '4 hrs ago', members: 4 },
  { id: 'CH007', name: 'Security Alerts', type: 'team', unread: 5, lastMessage: 'Divya: New CVE detected in dependency', lastMessageTime: '1 hr ago', members: 3 },
];

// ── Documents ────────────────────────────────────────────────
export const documents: Document[] = [
  { id: 'DOC001', name: 'Q2 Engineering Roadmap.pdf', type: 'pdf', size: '2.4 MB', modified: getLiveDate(-18), owner: 'You', shared: true, folder: 'Engineering' },
  { id: 'DOC002', name: 'Team Performance Report - April.xls', type: 'xls', size: '1.1 MB', modified: getLiveDate(-11), owner: 'You', shared: false, folder: 'Reports' },
  { id: 'DOC003', name: 'Architecture Decision Record.doc', type: 'doc', size: '890 KB', modified: getLiveDate(-4), owner: 'Arjun Mehta', shared: true, folder: 'Engineering' },
  { id: 'DOC004', name: 'Security Compliance Checklist.pdf', type: 'pdf', size: '340 KB', modified: getLiveDate(3), owner: 'Divya Iyer', shared: true, folder: 'Security' },
  { id: 'DOC005', name: 'Sprint Retrospective Notes.doc', type: 'doc', size: '220 KB', modified: getLiveDate(10), owner: 'Nisha Gupta', shared: true, folder: 'Agile' },
  { id: 'DOC006', name: 'Budget Allocation FY26.xls', type: 'xls', size: '3.2 MB', modified: getLiveDate(17), owner: 'You', shared: false, folder: 'Finance' },
  { id: 'DOC007', name: 'Mobile App Wireframes.pdf', type: 'pdf', size: '8.7 MB', modified: getLiveDate(24), owner: 'Sneha Patel', shared: true, folder: 'Design' },
  { id: 'DOC008', name: 'API Migration Guide v2.doc', type: 'doc', size: '450 KB', modified: getLiveDate(-30), owner: 'Aditya Rao', shared: true, folder: 'Engineering' },
  { id: 'DOC009', name: 'Leave Policy 2026.pdf', type: 'pdf', size: '180 KB', modified: getLiveDate(-23), owner: 'HR', shared: true, folder: 'Policies' },
  { id: 'DOC010', name: 'Onboarding Handbook.pdf', type: 'pdf', size: '5.3 MB', modified: getLiveDate(-16), owner: 'HR', shared: true, folder: 'Policies' },
];

// ── Performance Records ──────────────────────────────────────
export const performanceRecords: PerformanceRecord[] = [
  { employeeId: 'EMP001', employeeName: 'Arjun Mehta', taskCompletionRate: 94, attendanceScore: 97, productivityScore: 94, collaborationScore: 88, qualityScore: 92, overallRating: 4.6, trend: 'up', goals: [{ name: 'Complete Platform v3 frontend', progress: 68, deadline: getLiveDate(-9) }, { name: 'Mentor 2 junior developers', progress: 50, deadline: getLiveDate(-2) }], lastReview: getLiveDate(5), nextReview: getLiveDate(12) },
  { employeeId: 'EMP002', employeeName: 'Priya Sharma', taskCompletionRate: 91, attendanceScore: 95, productivityScore: 91, collaborationScore: 90, qualityScore: 93, overallRating: 4.4, trend: 'stable', goals: [{ name: 'Optimize API response times by 40%', progress: 75, deadline: getLiveDate(19) }, { name: 'Complete AWS certification', progress: 30, deadline: getLiveDate(26) }], lastReview: getLiveDate(-28), nextReview: getLiveDate(-21) },
  { employeeId: 'EMP003', employeeName: 'Ravi Kumar', taskCompletionRate: 88, attendanceScore: 93, productivityScore: 88, collaborationScore: 82, qualityScore: 86, overallRating: 4.2, trend: 'up', goals: [{ name: 'Zero-downtime deployment pipeline', progress: 55, deadline: getLiveDate(-14) }, { name: 'Reduce infrastructure costs 20%', progress: 40, deadline: getLiveDate(-7) }], lastReview: getLiveDate(0), nextReview: getLiveDate(7) },
  { employeeId: 'EMP004', employeeName: 'Sneha Patel', taskCompletionRate: 96, attendanceScore: 98, productivityScore: 96, collaborationScore: 95, qualityScore: 97, overallRating: 4.8, trend: 'up', goals: [{ name: 'Launch Design System v3', progress: 80, deadline: getLiveDate(14) }, { name: 'Conduct 4 design workshops', progress: 75, deadline: getLiveDate(21) }], lastReview: getLiveDate(28), nextReview: getLiveDate(-26) },
  { employeeId: 'EMP005', employeeName: 'Vikram Singh', taskCompletionRate: 87, attendanceScore: 91, productivityScore: 87, collaborationScore: 80, qualityScore: 89, overallRating: 4.1, trend: 'down', goals: [{ name: 'Achieve 95% test coverage', progress: 60, deadline: getLiveDate(-19) }, { name: 'Automate regression suite', progress: 45, deadline: getLiveDate(-12) }], lastReview: getLiveDate(-5), nextReview: getLiveDate(2) },
  { employeeId: 'EMP006', employeeName: 'Ananya Reddy', taskCompletionRate: 92, attendanceScore: 96, productivityScore: 92, collaborationScore: 91, qualityScore: 90, overallRating: 4.5, trend: 'up', goals: [{ name: 'Ship payment module v2', progress: 65, deadline: getLiveDate(9) }, { name: 'Learn GraphQL', progress: 20, deadline: getLiveDate(16) }], lastReview: getLiveDate(23), nextReview: getLiveDate(30) },
  { employeeId: 'EMP007', employeeName: 'Karthik Nair', taskCompletionRate: 89, attendanceScore: 94, productivityScore: 89, collaborationScore: 85, qualityScore: 88, overallRating: 4.3, trend: 'stable', goals: [{ name: 'Real-time analytics pipeline', progress: 78, deadline: getLiveDate(-24) }, { name: 'Data quality framework', progress: 35, deadline: getLiveDate(-17) }], lastReview: getLiveDate(-10), nextReview: getLiveDate(-3) },
  { employeeId: 'EMP008', employeeName: 'Meera Joshi', taskCompletionRate: 93, attendanceScore: 99, productivityScore: 93, collaborationScore: 92, qualityScore: 95, overallRating: 4.7, trend: 'up', goals: [{ name: 'Deliver 3 market reports', progress: 66, deadline: getLiveDate(4) }, { name: 'Implement OKR tracking', progress: 40, deadline: getLiveDate(11) }], lastReview: getLiveDate(18), nextReview: getLiveDate(25) },
  { employeeId: 'EMP009', employeeName: 'Rohan Desai', taskCompletionRate: 85, attendanceScore: 92, productivityScore: 85, collaborationScore: 78, qualityScore: 82, overallRating: 4.0, trend: 'down', goals: [{ name: 'Ship mobile app v2.1', progress: 50, deadline: getLiveDate(-29) }, { name: 'Reduce app crash rate to <0.1%', progress: 60, deadline: getLiveDate(-22) }], lastReview: getLiveDate(-15), nextReview: getLiveDate(-8) },
  { employeeId: 'EMP010', employeeName: 'Divya Iyer', taskCompletionRate: 90, attendanceScore: 95, productivityScore: 90, collaborationScore: 88, qualityScore: 91, overallRating: 4.4, trend: 'stable', goals: [{ name: 'SOC 2 compliance', progress: 55, deadline: getLiveDate(-1) }, { name: 'Implement SAST pipeline', progress: 70, deadline: getLiveDate(6) }], lastReview: getLiveDate(13), nextReview: getLiveDate(20) },
  { employeeId: 'EMP011', employeeName: 'Aditya Rao', taskCompletionRate: 86, attendanceScore: 90, productivityScore: 86, collaborationScore: 83, qualityScore: 88, overallRating: 3.9, trend: 'stable', goals: [{ name: 'Complete API docs migration', progress: 85, deadline: getLiveDate(27) }, { name: 'Launch developer portal', progress: 25, deadline: getLiveDate(-27) }], lastReview: getLiveDate(-20), nextReview: getLiveDate(-13) },
  { employeeId: 'EMP012', employeeName: 'Nisha Gupta', taskCompletionRate: 95, attendanceScore: 97, productivityScore: 95, collaborationScore: 96, qualityScore: 94, overallRating: 4.6, trend: 'up', goals: [{ name: 'Improve team velocity by 15%', progress: 70, deadline: getLiveDate(-6) }, { name: 'Implement SAFe framework', progress: 45, deadline: getLiveDate(1) }], lastReview: getLiveDate(8), nextReview: getLiveDate(15) },
];

// ── Chart / Analytics Data ───────────────────────────────────
export const productivityTrend = [
  { label: 'Jan', value: 78, target: 80 }, { label: 'Feb', value: 82, target: 80 },
  { label: 'Mar', value: 79, target: 82 }, { label: 'Apr', value: 85, target: 82 },
  { label: 'May', value: 91, target: 85 },
];

export const attendanceTrend = [
  { label: 'Week 1', present: 11, late: 1, absent: 0 },
  { label: 'Week 2', present: 10, late: 2, absent: 0 },
  { label: 'Week 3', present: 9, late: 2, absent: 1 },
  { label: 'Week 4', present: 10, late: 1, absent: 1 },
];

export const departmentStats = [
  { name: 'Engineering', count: 6, productivity: 90, budget: 450000 },
  { name: 'Design', count: 1, productivity: 96, budget: 80000 },
  { name: 'Data', count: 1, productivity: 89, budget: 120000 },
  { name: 'Product', count: 1, productivity: 93, budget: 60000 },
  { name: 'QA', count: 1, productivity: 87, budget: 70000 },
  { name: 'Security', count: 1, productivity: 90, budget: 90000 },
  { name: 'Documentation', count: 1, productivity: 86, budget: 45000 },
];

export const workloadDistribution = teamMembers.map(m => ({
  name: m.name.split(' ')[0],
  workload: m.workload,
  capacity: 100 - m.workload,
}));

export const taskStatusSummary = [
  { name: 'Completed', value: tasks.filter(t => t.status === 'completed').length, color: '#10b981' },
  { name: 'In Progress', value: tasks.filter(t => t.status === 'in-progress').length, color: '#6366f1' },
  { name: 'Review', value: tasks.filter(t => t.status === 'review').length, color: '#f59e0b' },
  { name: 'Blocked', value: tasks.filter(t => t.status === 'blocked').length, color: '#ef4444' },
  { name: 'Pending', value: tasks.filter(t => t.status === 'pending').length, color: '#94a3b8' },
];

export const monthlyAttendanceHeatmap = Array.from({ length: 12 }, (_, empIdx) => ({
  employee: teamMembers[empIdx]?.name.split(' ')[0] || '',
  days: Array.from({ length: 21 }, () => {
    const r = Math.random();
    return r > 0.92 ? 0 : r > 0.85 ? 1 : 2;  // 0=absent, 1=late, 2=present
  }),
}));

// ── AI Insights ──────────────────────────────────────────────
export const aiInsights = {
  workloadBalancing: [
    { employee: 'Ravi Kumar', currentLoad: 90, suggested: 75, action: 'Redistribute CI/CD tasks to Karthik Nair' },
    { employee: 'Rohan Desai', currentLoad: 88, suggested: 70, action: 'Defer non-critical mobile optimizations to next sprint' },
  ],
  productivityPredictions: [
    { metric: 'Team Velocity', current: 42, predicted: 48, confidence: 85, trend: 'up' as const },
    { metric: 'Sprint Completion', current: 88, predicted: 92, confidence: 78, trend: 'up' as const },
    { metric: 'Bug Rate', current: 3.2, predicted: 2.8, confidence: 72, trend: 'down' as const },
  ],
  riskAlerts: [
    { employee: 'Vikram Singh', risk: 'Disengagement', score: 72, factors: ['Decreased task completion', 'Increased leave frequency'] },
    { employee: 'Aditya Rao', risk: 'Burnout', score: 65, factors: ['Low attendance score', 'Declining productivity trend'] },
  ],
  recommendations: [
    'Schedule 1-on-1 with Vikram Singh to discuss workload and career development.',
    'Consider cross-training Ananya Reddy on DevOps to reduce single-point dependency on Ravi Kumar.',
    'The security audit project needs immediate attention — consider allocating additional resources.',
    'Team productivity is trending upward. Recognize top performers Sneha Patel and Arjun Mehta.',
  ],
};
