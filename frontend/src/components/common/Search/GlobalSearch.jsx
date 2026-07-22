import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const roleNavMap = {
  SUPER_ADMIN: ['Dashboard', 'Employees', 'Attendance', 'Payroll', 'Recruitment', 'Projects', 'Assets', 'Compliance', 'Performance', 'Reports', 'Administration', 'Settings'],
  ADMIN: ['Dashboard', 'Employees', 'Attendance', 'Payroll', 'Recruitment', 'Projects', 'Assets', 'Compliance', 'Performance', 'Reports', 'Administration', 'Settings'],
  CEO: ['Dashboard', 'Employees', 'Finance', 'Projects', 'Reports', 'Performance', 'Analytics'],
  CTO: ['Dashboard', 'Engineering', 'Projects', 'DevOps', 'Analytics', 'Reports'],
  HR_MANAGER: ['Dashboard', 'Employees', 'Attendance', 'Payroll', 'Recruitment', 'Leave', 'Performance', 'Reports'],
  HR_EXECUTIVE: ['Dashboard', 'Employees', 'Attendance', 'Leave', 'Payroll', 'Recruitment'],
  FINANCE_MANAGER: ['Dashboard', 'Payroll', 'Budget', 'Expenses', 'Tax', 'Reports'],
  MARKETING_MANAGER: ['Dashboard', 'Campaigns', 'Analytics', 'Content', 'Reports'],
  SALES_MANAGER: ['Dashboard', 'Pipeline', 'Clients', 'Revenue', 'Reports'],
  PROJECT_MANAGER: ['Dashboard', 'Projects', 'Tasks', 'Team', 'Timeline'],
  TECH_LEAD: ['Dashboard', 'Sprints', 'Code Reviews', 'Team', 'DevOps', 'Analytics'],
  DEVOPS_ENGINEER: ['Dashboard', 'CI/CD', 'Infrastructure', 'Monitoring', 'Security'],
  QA_ENGINEER: ['Dashboard', 'Test Plans', 'Test Runs', 'Bugs', 'Automation'],
  SOFTWARE_ENGINEER: ['Dashboard', 'Tasks', 'Pull Requests', 'Sprints'],
  SECURITY_ANALYST: ['Dashboard', 'Threats', 'Audit Logs', 'Vulnerabilities', 'Compliance'],
  SUPPORT_AGENT: ['Dashboard', 'Tickets', 'Knowledge Base', 'SLA'],
  EMPLOYEE: ['Dashboard', 'Profile', 'Attendance', 'Leave', 'Payroll', 'Tasks'],
  INTERN: ['Dashboard', 'Tasks', 'Learning', 'Attendance'],
}

const quickActions = [
  { label: 'Create employee', icon: 'M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z', action: 'create-employee' },
  { label: 'Generate report', icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', action: 'create-report' },
  { label: 'Submit leave request', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', action: 'leave-request' },
  { label: 'Create project', icon: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z', action: 'create-project' },
]

const recentSearches = [
  'Annual budget review',
  'Employee onboarding checklist',
  'Q3 performance metrics',
  'Sprint planning board',
]

export default function GlobalSearch({ open, onClose }) {
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef(null)
  const navigate = useNavigate()
  const user = useSelector(state => state.auth.user)
  const role = user?.role || 'EMPLOYEE'
  const allowedNav = roleNavMap[role] || roleNavMap.EMPLOYEE

  useEffect(() => {
    if (open) {
      setQuery('')
      setSelectedIndex(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open])

  const navItems = allowedNav.map(label => ({
    label,
    path: '/' + label.toLowerCase().replace(/\s+/g, '-'),
    type: 'page',
    icon: getNavIcon(label),
  }))

  const filtered = query.trim()
    ? [
        ...navItems.filter(item => item.label.toLowerCase().includes(query.toLowerCase())),
        ...quickActions.filter(a => a.label.toLowerCase().includes(query.toLowerCase())).map(a => ({ ...a, type: 'action' })),
      ].slice(0, 8)
    : [
        ...navItems.slice(0, 3).map(item => ({ ...item, type: 'page' })),
        ...quickActions.map(a => ({ ...a, type: 'action' })),
      ]

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex(i => Math.min(i + 1, filtered.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex(i => Math.max(i - 1, 0))
    } else if (e.key === 'Enter' && filtered[selectedIndex]) {
      handleSelect(filtered[selectedIndex])
    } else if (e.key === 'Escape') {
      onClose?.()
    }
  }, [filtered, selectedIndex, onClose])

  const handleSelect = (item) => {
    if (item.type === 'page') {
      navigate(item.path)
    }
    onClose?.()
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[12vh]" onClick={onClose}>
      <div className="fixed inset-0 bg-surface-overlay" />
      <div
        className="relative w-full max-w-xl bg-surface-elevated border border-subtle rounded-xl shadow-xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-subtle">
          <svg className="w-5 h-5 text-tertiary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => { setQuery(e.target.value); setSelectedIndex(0) }}
            onKeyDown={handleKeyDown}
            placeholder="Search pages, actions, employees..."
            className="flex-1 bg-transparent border-0 outline-none text-sm text-primary placeholder:text-tertiary"
          />
          <span className="text-[11px] text-tertiary bg-surface-tertiary px-1.5 py-0.5 rounded flex items-center gap-1">
            <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            ESC
          </span>
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto py-2">
          {!query.trim() && (
            <div className="px-4 py-1.5 text-[11px] font-medium uppercase tracking-wider text-tertiary">Quick actions</div>
          )}
          {filtered.length === 0 ? (
            <div className="px-4 py-8 text-center text-sm text-secondary">
              No results found for "<span className="text-primary font-medium">{query}</span>"
            </div>
          ) : (
            filtered.map((item, i) => (
              <button
                key={`${item.label}-${i}`}
                onClick={() => handleSelect(item)}
                className={`w-full text-left flex items-center gap-3 px-4 py-2.5 text-sm transition-colors duration-100 ${i === selectedIndex ? 'bg-brand-50 dark:bg-brand-950/30 text-primary' : 'text-primary hover:bg-surface-hover'
                  }`}
              >
                <span className={`w-4 h-4 flex-shrink-0 ${i === selectedIndex ? 'text-[var(--color-brand-500)]' : 'text-tertiary'}`}>
                  <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={item.icon || getNavIcon(item.label)} />
                  </svg>
                </span>
                <span className="flex-1 truncate">{item.label}</span>
                {item.type === 'action' && (
                  <span className="text-[11px] text-tertiary bg-surface-tertiary px-1.5 py-0.5 rounded">Action</span>
                )}
                {item.type === 'page' && (
                  <span className="text-[11px] text-tertiary">Page</span>
                )}
              </button>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center gap-4 px-4 py-2.5 border-t border-subtle bg-surface-secondary">
          <div className="flex items-center gap-1.5 text-[11px] text-tertiary">
            <kbd className="px-1 py-0.5 rounded bg-surface-tertiary border border-subtle text-[10px] font-mono">↑↓</kbd>
            <span>Navigate</span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-tertiary">
            <kbd className="px-1 py-0.5 rounded bg-surface-tertiary border border-subtle text-[10px] font-mono">↵</kbd>
            <span>Open</span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-tertiary">
            <kbd className="px-1 py-0.5 rounded bg-surface-tertiary border border-subtle text-[10px] font-mono">Esc</kbd>
            <span>Close</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function getNavIcon(label) {
  const icons = {
    Dashboard: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
    Employees: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
    Attendance: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
    Payroll: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    Leave: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
    Profile: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
  }
  return icons[label] || 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
}
