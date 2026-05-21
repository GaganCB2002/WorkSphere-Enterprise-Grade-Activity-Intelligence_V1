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
}

export interface StatCardData {
  title: string;
  value: string;
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
}

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description: string;
  assigneeId: string;
  assigneeName: string;
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  status: 'TODO' | 'IN_PROGRESS' | 'REVIEW' | 'DONE';
  dueDate: string;
  estimatedHours: number;
}
