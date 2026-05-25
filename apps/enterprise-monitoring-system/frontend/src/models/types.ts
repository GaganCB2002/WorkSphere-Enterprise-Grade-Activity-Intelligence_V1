export type EnterpriseRole =
  | 'SUPER_ADMIN'
  | 'ADMIN'
  | 'CEO'
  | 'CTO'
  | 'HR_MANAGER'
  | 'HR_EXECUTIVE'
  | 'FINANCE_MANAGER'
  | 'MARKETING_MANAGER'
  | 'SALES_MANAGER'
  | 'PROJECT_MANAGER'
  | 'TECH_LEAD'
  | 'DEVOPS_ENGINEER'
  | 'QA_ENGINEER'
  | 'SOFTWARE_ENGINEER'
  | 'SECURITY_ANALYST'
  | 'SUPPORT_AGENT'
  | 'EMPLOYEE'
  | 'INTERN';

export interface User {
  id: string;
  email: string;
  name: string;
  role: EnterpriseRole | string;
  department?: string;
  employeeId?: string;
  avatar?: string;
  manager?: string;
  location?: string;
  skills?: string[];
  status?: 'online' | 'offline' | 'away' | 'in_meeting';
}

export interface Profile extends User {
  title: string;
  bio: string;
  week: number;
  totalWeeks: number;
  managerName: string;
  certifications: Certification[];
  achievements: Achievement[];
  milestones: Milestone[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  status: 'completed' | 'in_progress';
  icon?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  status: 'completed' | 'active' | 'upcoming';
  phase: string;
  subtasks?: Subtask[];
}

export interface Subtask {
  id: string;
  label: string;
  completed: boolean;
}

export interface StatCardData {
  title: string;
  value: string | number;
  trend: string;
  trendType: 'up' | 'down' | 'neutral';
  icon: string;
  color: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  managerId: string;
  managerName: string;
  startDate: string;
  endDate: string;
  status: string;
  budget: number;
  spent: number;
  progress?: number;
  members?: TeamMember[];
  phases?: ProjectPhase[];
}

export interface ProjectPhase {
  id: string;
  name: string;
  description: string;
  quarter: string;
  status: 'completed' | 'active' | 'upcoming';
  progress?: number;
}

export type TaskPriority = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'REVIEW' | 'DONE';

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description: string;
  assigneeId: string;
  assigneeName: string;
  priority: TaskPriority;
  status: TaskStatus | string;
  dueDate: string;
  estimatedHours: number;
}

export type BoardTaskPriority = 'Low Priority' | 'Medium Priority' | 'High Priority';
export type BoardColumn = 'backlog' | 'todo' | 'progress' | 'review' | 'completed';

export interface BoardTask {
  id: string;
  title: string;
  desc?: string;
  priority: BoardTaskPriority;
  date?: string;
  assignee: string;
  column: BoardColumn;
  progress: number;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department?: string;
  avatar?: string;
  initials?: string;
  status: 'online' | 'offline' | 'in_meeting';
  isMentor?: boolean;
  mentorName?: string;
  bio?: string;
}

export interface MentorSession {
  id: string;
  date: string;
  month: string;
  day: string;
  title: string;
  description: string;
  duration: string;
  type: 'video_call' | 'in_person';
  status: 'completed' | 'upcoming';
}

export interface ChatMessage {
  id: string;
  sender: string;
  avatar?: string;
  initials?: string;
  time: string;
  content: string;
  isSystem?: boolean;
  isCode?: boolean;
  isInitial?: string;
  channel?: string;
  dmRecipient?: string;
}

export interface AIMessage {
  id: string;
  sender: string;
  time: string;
  content: string;
  isCode?: boolean;
}

export interface EvaluationRecord {
  id: string;
  period: string;
  mentor: string;
  mentorInitials: string;
  score: number;
  maxScore: number;
  status: 'completed' | 'archived' | 'pending';
}

export interface MentorReview {
  id: string;
  reviewer: string;
  reviewerRole: string;
  reviewerInitials: string;
  content: string;
  date: string;
  type: 'mentor' | 'hr';
}

export interface Course {
  id: string;
  title: string;
  description: string;
  module: number;
  totalModules: number;
  progress: number;
  timeLeft: string;
  status: 'in_progress' | 'just_started';
  imageUrl?: string;
  color?: string;
}

export interface LearningPath {
  id: string;
  title: string;
  courseCount: number;
  totalHours: number;
  icon: string;
  color: string;
}

export interface AttendanceRecord {
  id: string;
  date: string;
  hoursLogged: string;
  status: 'checked_in' | 'checked_out' | 'on_break';
  day: string;
}

export interface WorkHourTrend {
  day: string;
  hours: number;
  isToday?: boolean;
}

export interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  type: 'ai_insight' | 'deadline' | 'feedback' | 'system';
  icon?: string;
  color?: string;
  actionable?: boolean;
  actionLabel?: string;
}

export interface Intern {
  id: string;
  name: string;
  initials: string;
  department: string;
  mentor: string;
  mentorInitials?: string;
  performance: 'exceeding' | 'meeting' | 'needs_review';
  week: number;
  totalWeeks: number;
  avatar?: string;
}

export interface Cohort {
  id: string;
  name: string;
  totalApplied: number;
  totalScreened: number;
  totalInterviewed: number;
  totalOffers: number;
  totalHired: number;
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  timeAgo: string;
  type: string;
}

export interface Deadline {
  id: string;
  date: number;
  month: string;
  title: string;
  team: string;
  priority: 'high' | 'normal';
}

export type UserStatus = 'ONLINE' | 'IDLE' | 'OFFLINE';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: EnterpriseRole | string;
  department: string;
  avatar?: string;
  mfaEnabled?: boolean;
  status: UserStatus;
  lastActive: string;
}

export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  role: string;
  action: string;
  target: string;
  ipAddress: string;
  timestamp: string;
}

export interface DashboardMetrics {
  productivityScore: number;
  completedTasks: number;
  activeProjects: number;
  attendancePercent: number;
}
