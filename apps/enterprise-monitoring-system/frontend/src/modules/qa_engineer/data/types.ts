export type Severity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
export type BugStatus = 'Open' | 'In Progress' | 'Resolved' | 'Closed' | 'Reopened';
export type SprintStatus = 'Done' | 'In Progress' | 'Blocked' | 'Not Started';
export type ProjectStatus = 'In Testing' | 'Blocked' | 'QA Sign-off';
export type TeamMemberStatus = 'Online' | 'In Meeting' | 'Offline' | 'On Leave';
export type ApprovalStatus = 'Pending' | 'Approved' | 'Rejected';
export type NotificationType = 'alert' | 'success' | 'warning' | 'info';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  module: string;
  velocity: string;
  status: TeamMemberStatus;
  avatar?: string;
  scriptsWritten: number;
  bugsFound: number;
  reviewScore: number;
  email: string;
}

export interface Bug {
  id: string;
  title: string;
  status: BugStatus;
  severity: Severity;
  module: string;
  assignee: { name: string; avatar: string | null };
  isClosed: boolean;
  createdAt: string;
  description: string;
  reporter: string;
  environment: string;
}

export interface Project {
  id: string;
  name: string;
  status: ProjectStatus;
  coverage: number;
  bugs: number;
  description: string;
  releaseDate: string;
  lead: string;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
}

export interface SprintTask {
  id: string;
  title: string;
  description: string;
  status: SprintStatus;
  assignee: string;
  priority: 'P0' | 'P1' | 'P2' | 'P3';
  sprintId: string;
}

export interface Sprint {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  tasks: SprintTask[];
}

export interface LeaveRequest {
  id: string;
  employeeName: string;
  startDate: string;
  endDate: string;
  type: 'PTO' | 'Sick' | 'Personal';
  status: 'Pending' | 'Approved' | 'Rejected';
  avatar?: string;
}

export interface Meeting {
  id: string;
  title: string;
  description: string;
  time: string;
  duration: string;
  date: string;
  participants: number;
  organizer: string;
  type: 'Daily' | 'Weekly' | 'Ad-hoc';
}

export interface ChatMessage {
  id: string;
  sender: string;
  senderAvatar?: string;
  initials: string;
  message: string;
  timestamp: Date;
  channel: string;
}

export interface ChatChannel {
  id: string;
  name: string;
  unread: number;
}

export interface Approval {
  id: string;
  title: string;
  description: string;
  status: ApprovalStatus;
  requestedBy: string;
  date: string;
  priority: 'High' | 'Medium' | 'Low';
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  timestamp: Date;
  isRead: boolean;
}

export interface PerformanceEntry {
  id: string;
  name: string;
  role: string;
  scriptsWritten: number;
  bugsFound: number;
  reviewScore: number;
  automationCoverage: number;
  avatar?: string;
  initials: string;
}

export interface DashboardMetrics {
  releaseScore: number;
  releaseTrend: number;
  totalTestCases: number;
  passRate: number;
  failRate: number;
  skipRate: number;
  activeBugs: number;
  criticalBugs: number;
  highBugs: number;
  mediumBugs: number;
  lowBugs: number;
  automationCoverage: number;
  automationTarget: number;
  automationTrend: number;
  avgFixTime: number;
  criticalFixTime: string;
  criticalPathCoverage: number;
  regressionPassRate: number;
}

export interface TestExecution {
  week: string;
  automation: number;
  manual: number;
}

export interface DefectCategory {
  module: string;
  critical: number;
  high: number;
  medium: number;
  low: number;
}
