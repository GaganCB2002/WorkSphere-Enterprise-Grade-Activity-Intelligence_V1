import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import KpiCard from '../../components/common/Card/KpiCard'
import DataTable, { StatusBadge } from '../../components/common/DataTable/DataTable'
import { API_URL } from '../../api/client'

export default function DashboardOverview() {
  const user = useSelector(state => state.auth.user)
  const role = user?.role || 'EMPLOYEE'
  const [stats, setStats] = useState(null)
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem('token')
        const headers = token ? { Authorization: `Bearer ${token}` } : {}

        const [statsRes, empRes] = await Promise.allSettled([
          fetch(`${API_URL}/api/hr/stats`, { headers }).then(r => r.ok ? r.json() : null),
          fetch(`${API_URL}/api/employees`, { headers }).then(r => r.ok ? r.json() : null),
        ])

        if (statsRes.status === 'fulfilled' && statsRes.value) setStats(statsRes.value)
        if (empRes.status === 'fulfilled' && empRes.value) setEmployees(empRes.value.employees || [])
      } catch { } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-xl font-semibold text-primary">
          {role === 'CEO' ? 'Executive Overview' :
            role === 'HR_MANAGER' || role === 'HR_EXECUTIVE' ? 'HR Dashboard' :
            role === 'FINANCE_MANAGER' ? 'Finance Dashboard' :
            'Dashboard'}
        </h1>
        <p className="text-sm text-secondary mt-0.5">
          Welcome back, {user?.name?.split(' ')[0] || 'User'} · {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
        </p>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Total Employees"
          value={stats?.totalEmployees ?? employees.length ?? '—'}
          subtitle="Active full-time"
          trend="+12 this month"
          trendType="up"
          icon="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          loading={loading}
        />
        <KpiCard
          title="Present Today"
          value={stats?.presentToday ?? '—'}
          subtitle={`${stats?.presentToday ? Math.round(stats.presentToday / (stats.totalEmployees || 1) * 100) : '—'}% attendance`}
          trend={`${stats?.presentToday ?? 0} on-site`}
          trendType="up"
          icon="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          loading={loading}
        />
        <KpiCard
          title="Open Positions"
          value={stats?.openPositions ?? '—'}
          subtitle="Active requisitions"
          trend={stats?.newApplicants ? `${stats.newApplicants} new applicants` : undefined}
          trendType="up"
          icon="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
          loading={loading}
        />
        <KpiCard
          title="Pending Approvals"
          value={stats?.pendingApprovals ?? '—'}
          subtitle="Requires your action"
          trend="3 urgent"
          trendType="down"
          icon="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          loading={loading}
        />
      </div>

      {/* Secondary KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard.SMALL title="On Leave" value={stats?.onLeave ?? '—'} trend="2 more than avg" trendType="down" loading={loading} />
        <KpiCard.SMALL title="Late Today" value={stats?.lateToday ?? '—'} trend="-1 from yesterday" trendType="up" loading={loading} />
        <KpiCard.SMALL title="New Hires" value={stats?.newHires ?? '—'} trend="This quarter" trendType="up" loading={loading} />
        <KpiCard.SMALL title="Attrition Rate" value={stats?.attritionRate ? `${stats.attritionRate}%` : '—'} trend={stats?.attritionRate && stats.attritionRate > 10 ? 'Above target' : 'Healthy'} trendType={stats?.attritionRate > 10 ? 'down' : 'up'} loading={loading} />
      </div>

      {/* Employee Table */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-semibold text-primary">Recent Employees</h2>
          <button className="text-xs font-medium text-link hover:underline">View all</button>
        </div>
        <DataTable
          columns={[
            { key: 'name', label: 'Name', minWidth: 160 },
            { key: 'email', label: 'Email', minWidth: 200 },
            { key: 'title', label: 'Title', minWidth: 160 },
            { key: 'department', label: 'Department', minWidth: 120 },
            {
              key: 'status',
              label: 'Status',
              width: 100,
              render: (val) => <StatusBadge status={val || 'Active'} />,
            },
            {
              key: 'performanceRating',
              label: 'Rating',
              width: 80,
              align: 'center',
              render: (val) => val ? (
                <span className={`font-medium ${val >= 4.5 ? 'text-[var(--color-success-600)]' : val >= 3.5 ? 'text-[var(--color-warning-600)]' : 'text-[var(--color-error-600)]'}`}>
                  {val}
                </span>
              ) : '—',
            },
          ]}
          data={employees.slice(0, 50)}
          loading={loading}
          searchable
          pageSize={10}
          onRowClick={(row) => window.open(`/profile?id=${row.id}`, '_self')}
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <QuickActionCard
          title="Create Employee"
          description="Add a new team member to the organization"
          icon="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
          onClick={() => { }}
        />
        <QuickActionCard
          title="Submit Leave Request"
          description="Apply for annual, sick, or personal leave"
          icon="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          onClick={() => { }}
        />
        <QuickActionCard
          title="View Reports"
          description="Access analytics and performance reports"
          icon="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          onClick={() => { }}
        />
      </div>
    </div>
  )
}

function QuickActionCard({ title, description, icon, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-start gap-3 p-4 bg-surface-elevated border border-subtle rounded-lg hover:border-border-strong hover:shadow-sm transition-all duration-150 text-left"
    >
      <div className="w-9 h-9 rounded bg-brand-50 dark:bg-brand-950/30 flex items-center justify-center flex-shrink-0">
        <svg className="w-4 h-4 text-[var(--color-brand-600)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
        </svg>
      </div>
      <div>
        <div className="text-sm font-medium text-primary">{title}</div>
        <div className="text-xs text-secondary mt-0.5">{description}</div>
      </div>
    </button>
  )
}
