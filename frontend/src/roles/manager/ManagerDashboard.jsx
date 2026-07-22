import { motion } from 'framer-motion'
import DashboardShell from '../DashboardShell'
import KpiCard from '../../components/common/Card/KpiCard'
import DataTable from '../../components/common/DataTable/DataTable'
import { useSelector } from 'react-redux'

const kpis = [
  { title: 'Team Size', value: '14', subtitle: 'Direct reports', trend: '2 new this quarter', trendType: 'up', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z' },
  { title: 'Team Performance', value: '87.3%', subtitle: 'Avg rating', trend: '+2.1% this quarter', trendType: 'up', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
  { title: 'Project Status', value: '4/6', subtitle: 'On track', trend: '1 at risk', trendType: 'neutral', icon: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z' },
  { title: 'Pending Approvals', value: '7', subtitle: 'Leave & timesheets', trend: '3 urgent', trendType: 'down', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
]

const team = [
  { name: 'Sarah Jenkins', role: 'Software Engineer', status: 'Online', project: 'Platform Migration', performance: '4.8' },
  { name: 'Ananya Gupta', role: 'UX Designer', status: 'Online', project: 'UX Refresh', performance: '4.5' },
  { name: 'Robert Kim', role: 'DevOps Engineer', status: 'Idle', project: 'Infra Upgrade', performance: '4.2' },
  { name: 'James Wilson', role: 'Marketing Manager', status: 'Offline', project: 'Q3 Campaign', performance: '4.0' },
]

export default function ManagerDashboard() {
  const user = useSelector(state => state.auth.user)
  return (
    <DashboardShell title="Manager Dashboard" subtitle="Team oversight, performance tracking & project management" userName={user?.name}>
      <motion.div variants={{ hidden: {}, visible: {} }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
            <KpiCard {...kpi} />
          </motion.div>
        ))}
      </motion.div>

      <div className="bg-surface-elevated border border-subtle rounded-lg p-4">
        <h2 className="text-base font-semibold text-primary mb-3">Team Members</h2>
        <DataTable
          columns={[
            { key: 'name', label: 'Name', minWidth: 150 },
            { key: 'role', label: 'Role', minWidth: 140 },
            { key: 'status', label: 'Status', width: 100 },
            { key: 'project', label: 'Project', minWidth: 140 },
            { key: 'performance', label: 'Rating', width: 90 },
          ]}
          data={team}
          pageSize={10}
        />
      </div>
    </DashboardShell>
  )
}
