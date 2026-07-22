import { useLocation, Link } from 'react-router-dom'

const breadcrumbMap = {
  dashboard: { label: 'Dashboard' },
  employees: { label: 'Employees' },
  attendance: { label: 'Attendance' },
  payroll: { label: 'Payroll' },
  recruitment: { label: 'Recruitment' },
  projects: { label: 'Projects' },
  assets: { label: 'Assets' },
  compliance: { label: 'Compliance' },
  performance: { label: 'Performance' },
  administration: { label: 'Administration' },
  settings: { label: 'Settings' },
  leave: { label: 'Leave' },
  finance: { label: 'Finance' },
  budget: { label: 'Budget' },
  expenses: { label: 'Expenses' },
  tax: { label: 'Tax' },
  campaigns: { label: 'Campaigns' },
  content: { label: 'Content' },
  pipeline: { label: 'Pipeline' },
  clients: { label: 'Clients' },
  revenue: { label: 'Revenue' },
  engineering: { label: 'Engineering' },
  devops: { label: 'DevOps' },
  'code-reviews': { label: 'Code Reviews' },
  'pull-requests': { label: 'Pull Requests' },
  'ci/cd': { label: 'CI/CD' },
  infrastructure: { label: 'Infrastructure' },
  monitoring: { label: 'Monitoring' },
  'test-plans': { label: 'Test Plans' },
  'test-runs': { label: 'Test Runs' },
  bugs: { label: 'Bugs' },
  automation: { label: 'Automation' },
  tasks: { label: 'Tasks' },
  sprints: { label: 'Sprints' },
  threats: { label: 'Threats' },
  'audit-logs': { label: 'Audit Logs' },
  vulnerabilities: { label: 'Vulnerabilities' },
  tickets: { label: 'Tickets' },
  'knowledge-base': { label: 'Knowledge Base' },
  sla: { label: 'SLA' },
  learning: { label: 'Learning' },
  timeline: { label: 'Timeline' },
  team: { label: 'Team' },
  analytics: { label: 'Analytics' },
  security: { label: 'Security' },
  allocations: { label: 'Allocations' },
  'org-chart': { label: 'Org Chart' },
  // employee sub-routes
  profile: { label: 'Employee Profile' },
  users: { label: 'User Management' },
  rbac: { label: 'RBAC Matrix' },
  'ai-config': { label: 'AI & System Config' },
  audit: { label: 'Global Audit Logs' },
  tracking: { label: 'Global Tracking' },
  reports: { label: 'Activity Reports' },
}

export default function Breadcrumbs() {
  const location = useLocation()
  const segments = location.pathname.split('/').filter(Boolean)

  if (segments.length === 0) return null

  const crumbs = segments.map((seg, i) => {
    const entry = breadcrumbMap[seg]
    return {
      label: entry?.label || seg.charAt(0).toUpperCase() + seg.slice(1).replace(/-/g, ' '),
      path: '/' + segments.slice(0, i + 1).join('/'),
      isLast: i === segments.length - 1,
    }
  })

  return (
    <nav className="flex items-center gap-1.5 text-xs text-tertiary mb-3" aria-label="Breadcrumb">
      <Link to="/dashboard" className="hover:text-link transition-colors duration-150">
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      </Link>
      {crumbs.map((crumb, i) => (
        <span key={crumb.path} className="flex items-center gap-1.5">
          <svg className="w-3 h-3 text-tertiary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
          {crumb.isLast ? (
            <span className="text-primary font-medium">{crumb.label}</span>
          ) : (
            <Link to={crumb.path} className="hover:text-link transition-colors duration-150">{crumb.label}</Link>
          )}
        </span>
      ))}
    </nav>
  )
}
