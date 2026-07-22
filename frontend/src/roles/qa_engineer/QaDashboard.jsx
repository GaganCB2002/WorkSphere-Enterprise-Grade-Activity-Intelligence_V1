import { motion } from 'framer-motion'
import DashboardShell from '../DashboardShell'
import KpiCard from '../../components/common/Card/KpiCard'
import DataTable from '../../components/common/DataTable/DataTable'
import { useSelector } from 'react-redux'

const kpis = [
  { title: 'Test Pass Rate', value: '96.8%', subtitle: 'Last 10K tests', trend: '+1.2% improvement', trendType: 'up', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
  { title: 'Open Bugs', value: '47', subtitle: 'Across all products', trend: '12 critical', trendType: 'down', icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z' },
  { title: 'Test Coverage', value: '87.5%', subtitle: 'Automated coverage', trend: '+2.3% this sprint', trendType: 'up', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
  { title: 'Automation Ratio', value: '72.4%', subtitle: 'Automated vs manual', trend: '+5% target next Q', trendType: 'up', icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15' },
]

const bugs = [
  { id: 'BUG-847', title: 'Login timeout on Safari', severity: 'Critical', status: 'Open', assignee: 'Elena R.', created: '2h ago' },
  { id: 'BUG-846', title: 'Dashboard chart misalignment', severity: 'Medium', status: 'In Progress', assignee: 'Ananya G.', created: '1d ago' },
  { id: 'BUG-845', title: 'API returns 500 on empty payload', severity: 'High', status: 'Fixed', assignee: 'Sarah J.', created: '3d ago' },
  { id: 'BUG-844', title: 'Notification delay > 30s', severity: 'Low', status: 'Open', assignee: 'Michael C.', created: '5d ago' },
]

export default function QaDashboard() {
  const user = useSelector(state => state.auth.user)
  return (
    <DashboardShell title="Quality Assurance Center" subtitle="Test metrics, bug tracking & automation coverage" userName={user?.name}>
      <motion.div variants={{ hidden: {}, visible: {} }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
            <KpiCard {...kpi} />
          </motion.div>
        ))}
      </motion.div>

      <div className="bg-surface-elevated border border-subtle rounded-lg p-4">
        <h2 className="text-base font-semibold text-primary mb-3">Open Bugs</h2>
        <DataTable
          columns={[
            { key: 'id', label: 'ID', width: 100 },
            { key: 'title', label: 'Title', minWidth: 200 },
            { key: 'severity', label: 'Severity', width: 100 },
            { key: 'status', label: 'Status', width: 110 },
            { key: 'assignee', label: 'Assignee', width: 100 },
            { key: 'created', label: 'Created', width: 100 },
          ]}
          data={bugs}
          pageSize={10}
        />
      </div>
    </DashboardShell>
  )
}
