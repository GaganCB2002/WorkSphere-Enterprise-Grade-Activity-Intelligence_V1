// ─────────────────────────────────────────────────────────────
// Employee Module — Type Definitions
// Enterprise HRMS + Workforce Management Platform
// ─────────────────────────────────────────────────────────────

// ── Enums ───────────────────────────────────────────────────

export type UserRole = 'EMPLOYEE' | 'MANAGER' | 'TECH_LEAD' | 'HR' | 'ADMIN' | 'CEO';

export type LeaveType = 'annual' | 'sick' | 'casual' | 'compensatory' | 'wfh' | 'optional_holiday' | 'emergency' | 'maternity' | 'paternity';

export type LeaveStatus = 'pending' | 'approved' | 'rejected' | 'cancelled' | 'escalated';

export type LeaveDayType = 'full' | 'first_half' | 'second_half';

export type TaskStatus = 'backlog' | 'todo' | 'in_progress' | 'review' | 'done' | 'blocked';

export type TaskPriority = 'critical' | 'high' | 'medium' | 'low';

export type AttendanceStatus = 'present' | 'absent' | 'late' | 'half_day' | 'wfh' | 'on_leave' | 'holiday';

export type OnlineStatus = 'online' | 'away' | 'busy' | 'offline';

export type NotificationType = 'leave' | 'task' | 'mention' | 'deadline' | 'attendance' | 'system' | 'team' | 'approval';

export type NotificationPriority = 'high' | 'medium' | 'low';

export type ChatMessageType = 'text' | 'file' | 'system' | 'announcement';

// ── Employee & Profile ──────────────────────────────────────

export interface EmployeeProfile {
  id: string;
  employeeId: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  role: UserRole;
  designation: string;
  department: string;
  team: string;
  location: string;
  timezone: string;
  joinDate: string;
  reportingManager: ManagerInfo;
  techLead: ManagerInfo;
  hrAssigned: ManagerInfo;
  status: OnlineStatus;
  currentProject: string;
  workHistory: WorkHistoryEntry[];
  skills: Skill[];
  certifications: Certification[];
  achievements: Achievement[];
  bio: string;
}

export interface ManagerInfo {
  id: string;
  name: string;
  designation: string;
  avatar?: string;
  email: string;
}

export interface WorkHistoryEntry {
  id: string;
  role: string;
  department: string;
  project: string;
  from: string;
  to: string | null;
  description: string;
}

export interface Skill {
  name: string;
  level: number;       // 0-100
  benchmark: number;   // 0-100
  category: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expiryDate?: string;
  credentialUrl?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  type: 'award' | 'recognition' | 'milestone';
  icon: string;
}

// ── Team ────────────────────────────────────────────────────

export interface TeamInfo {
  id: string;
  name: string;
  department: string;
  manager: ManagerInfo;
  techLead: ManagerInfo;
  hrAssigned: ManagerInfo;
  members: TeamMember[];
  totalMembers: number;
  activeProjects: number;
  avgWorkload: number;
}

export interface TeamMember {
  id: string;
  name: string;
  avatar?: string;
  designation: string;
  role: UserRole;
  status: OnlineStatus;
  currentTask: string;
  workload: number;  // 0-100
  email: string;
  skills: string[];
  department: string;
}

// ── Leave ───────────────────────────────────────────────────

export interface LeaveBalance {
  type: LeaveType;
  label: string;
  total: number;
  used: number;
  remaining: number;
  pending: number;
  color: string;
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  type: LeaveType;
  dayType: LeaveDayType;
  from: string;
  to: string;
  totalDays: number;
  reason: string;
  status: LeaveStatus;
  appliedDate: string;
  backupEmployeeId?: string;
  backupEmployeeName?: string;
  attachments: string[];
  managerComments?: string;
  isEmergency: boolean;
  delegations: DelegationItem[];
}

export interface DelegationItem {
  id: string;
  taskId: string;
  taskTitle: string;
  project: string;
  delegatedTo: string;
  delegatedToName: string;
  status: 'pending' | 'accepted' | 'rejected';
  skillMatch: number;   // 0-100
  workloadImpact: number; // percentage
}

// ── Attendance ──────────────────────────────────────────────

export interface AttendanceRecord {
  date: string;
  status: AttendanceStatus;
  clockIn?: string;
  clockOut?: string;
  workedHours: number;
  breakMinutes: number;
  overtimeMinutes: number;
  isLate: boolean;
  lateMinutes: number;
  productivity: number;  // 0-100
}

export interface ClockSession {
  id: string;
  clockIn: string;
  clockOut?: string;
  workedMinutes: number;
  breakMinutes: number;
  isActive: boolean;
  breaks: BreakEntry[];
}

export interface BreakEntry {
  id: string;
  startedAt: string;
  endedAt?: string;
  durationMinutes: number;
  type: 'lunch' | 'short' | 'personal';
}

export interface AttendanceHeatmapDay {
  date: string;
  intensity: number;  // 0-4 for heatmap coloring
  hours: number;
  status: AttendanceStatus;
}

// ── Tasks & Projects ────────────────────────────────────────

export interface Task {
  id: string;
  title: string;
  description: string;
  project: string;
  projectColor: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignee: string;
  assigneeName: string;
  assigneeAvatar?: string;
  reporter: string;
  reporterName: string;
  labels: string[];
  deadline: string;
  createdAt: string;
  updatedAt: string;
  progress: number;  // 0-100
  comments: TaskComment[];
  attachments: string[];
  sprintId?: string;
  storyPoints: number;
  subtasks: SubTask[];
}

export interface SubTask {
  id: string;
  title: string;
  completed: boolean;
}

export interface TaskComment {
  id: string;
  author: string;
  authorName: string;
  authorAvatar?: string;
  content: string;
  timestamp: string;
  mentions: string[];
}

export interface Sprint {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  totalPoints: number;
  completedPoints: number;
  status: 'active' | 'planning' | 'completed';
}

// ── Chat & Communication ────────────────────────────────────

export interface ChatChannel {
  id: string;
  name: string;
  type: 'team' | 'direct' | 'department' | 'announcement';
  members: string[];
  lastMessage?: ChatMessage;
  unreadCount: number;
  avatar?: string;
  isOnline?: boolean;
}

export interface ChatMessage {
  id: string;
  channelId: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  content: string;
  type: ChatMessageType;
  timestamp: string;
  isMe: boolean;
  reactions?: { emoji: string; count: number }[];
  attachments?: { name: string; size: string; type: string }[];
}

// ── Notifications ───────────────────────────────────────────

export interface Notification {
  id: string;
  type: NotificationType;
  priority: NotificationPriority;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  actionUrl?: string;
  actorName?: string;
  actorAvatar?: string;
  groupId?: string;
}

// ── Analytics ───────────────────────────────────────────────

export interface ProductivityMetrics {
  score: number;
  trend: number;
  workEfficiency: number;
  attendanceRatio: number;
  collaborationScore: number;
  taskCompletionRate: number;
  onTimeDelivery: number;
  codeQuality?: number;
}

export interface WeeklyMetric {
  day: string;
  value: number;
  target?: number;
}

export interface MonthlyMetric {
  month: string;
  productivity: number;
  attendance: number;
  tasks: number;
}

export interface AIInsight {
  id: string;
  type: 'suggestion' | 'warning' | 'achievement' | 'prediction';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  actionable: boolean;
  actionLabel?: string;
  icon: string;
}

// ── Dashboard Widgets ───────────────────────────────────────

export interface DashboardStat {
  id: string;
  label: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  trend: 'up' | 'down' | 'neutral';
  icon: string;
  color: string;
  bgColor: string;
}

export interface UpcomingMeeting {
  id: string;
  title: string;
  time: string;
  duration: string;
  attendees: { name: string; avatar?: string }[];
  type: 'standup' | 'review' | 'planning' | '1on1' | 'client';
  link?: string;
}

export interface QuickAction {
  id: string;
  label: string;
  icon: string;
  variant: 'primary' | 'secondary' | 'danger' | 'success';
  shortcut?: string;
}

// ── RBAC ────────────────────────────────────────────────────

export interface RBACPermission {
  module: string;
  actions: ('read' | 'write' | 'delete' | 'approve')[];
}

export interface UserSession {
  userId: string;
  token: string;
  role: UserRole;
  permissions: RBACPermission[];
  lastLogin: string;
  device: string;
  ipAddress: string;
}
