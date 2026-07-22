import { motion } from 'framer-motion'
import DashboardShell from '../DashboardShell'
import KpiCard from '../../components/common/Card/KpiCard'
import DataTable from '../../components/common/DataTable/DataTable'
import { useSelector } from 'react-redux'

const kpis = [
  { title: 'Total Headcount', value: '1,248', subtitle: 'Active employees', trend: '+28 this quarter', trendType: 'up', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
  { title: 'Present Today', value: '1,142', subtitle: '91.5% attendance', trend: '12 on leave', trendType: 'up', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
  { title: 'Open Positions', value: '18', subtitle: 'Active requisitions', trend: '124 applicants', trendType: 'up', icon: 'M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z' },
  { title: 'Pending Approvals', value: '23', subtitle: 'Requires your action', trend: '7 urgent', trendType: 'down', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
]

const recentHires = [
  { name: 'Priya Sharma', position: 'Senior Developer', dept: 'Engineering', startDate: '2026-07-01', status: 'Onboarding' },
  { name: 'James Wilson', position: 'Marketing Manager', dept: 'Marketing', startDate: '2026-06-15', status: 'Active' },
  { name: 'Ananya Gupta', position: 'UX Designer', dept: 'Design', startDate: '2026-07-15', status: 'Pending' },
  { name: 'Robert Kim', position: 'DevOps Engineer', dept: 'DevOps', startDate: '2026-06-01', status: 'Active' },
]

export default function HrManagerDashboard() {
  const user = useSelector(state => state.auth.user)
  return (
    <DashboardShell title="HR Operations Dashboard" subtitle="Workforce metrics, recruitment pipeline & people operations" userName={user?.name}>
      <motion.div variants={{ hidden: {}, visible: {} }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
            <KpiCard {...kpi} />
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-surface-elevated border border-subtle rounded-lg p-4">
          <h2 className="text-base font-semibold text-primary mb-3">Recent Hires</h2>
          <DataTable
            columns={[
              { key: 'name', label: 'Name', minWidth: 140 },
              { key: 'position', label: 'Position', minWidth: 140 },
              { key: 'dept', label: 'Department', minWidth: 100 },
              { key: 'startDate', label: 'Start Date', width: 110 },
              { key: 'status', label: 'Status', width: 100 },
            ]}
            data={recentHires}
            pageSize={10}
          />
        </div>

        <div className="bg-surface-elevated border border-subtle rounded-lg p-4 space-y-3">
          <h2 className="text-base font-semibold text-primary">Quick Actions</h2>
          {[
            { title: 'Post New Job', desc: 'Create a new job requisition' },
            { title: 'Review Applicants', desc: '24 new applications to review' },
            { title: 'Approve Leave', desc: '5 pending leave requests' },
            { title: 'Run Payroll', desc: 'Monthly payroll processing' },
          ].map((a, i) => (
            <button key={i} className="w-full text-left p-3 rounded-lg border border-subtle hover:border-brand-400 transition-colors bg-surface">
              <div className="text-sm font-semibold text-primary">{a.title}</div>
              <div className="text-xs text-secondary mt-0.5">{a.desc}</div>
            </button>
          ))}
        </div>
      </div>
    </DashboardShell>
  )
}
