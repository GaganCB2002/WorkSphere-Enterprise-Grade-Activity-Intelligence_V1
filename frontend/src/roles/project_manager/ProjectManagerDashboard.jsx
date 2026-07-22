import { motion } from 'framer-motion'
import DashboardShell from '../DashboardShell'
import KpiCard from '../../components/common/Card/KpiCard'
import DataTable from '../../components/common/DataTable/DataTable'
import { useSelector } from 'react-redux'

const kpis = [
  { title: 'Active Projects', value: '18', subtitle: 'Across 6 departments', trend: '92% on schedule', trendType: 'up', icon: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z' },
  { title: 'Tasks Completed', value: '342', subtitle: 'This sprint', trend: '+15% vs last sprint', trendType: 'up', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
  { title: 'Team Utilization', value: '87.3%', subtitle: 'Resource efficiency', trend: 'Optimal range', trendType: 'up', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z' },
  { title: 'On-Time Delivery', value: '84.6%', subtitle: 'Projects on schedule', trend: '+5.2% QoQ', trendType: 'up', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
]

const tasks = [
  { task: 'API Rate Limiting', project: 'Platform Migration', assignee: 'Sarah J.', status: 'In Progress', priority: 'High', due: '2026-07-25' },
  { task: 'Dashboard Redesign', project: 'UX Refresh', assignee: 'Ananya G.', status: 'Review', priority: 'Medium', due: '2026-07-20' },
  { task: 'Database Migration', project: 'Platform Migration', assignee: 'David R.', status: 'Blocked', priority: 'Critical', due: '2026-07-18' },
  { task: 'Test Suite Coverage', project: 'AI Copilot', assignee: 'Elena R.', status: 'In Progress', priority: 'High', due: '2026-07-30' },
  { task: 'Documentation', project: 'API v2', assignee: 'Michael C.', status: 'Todo', priority: 'Low', due: '2026-08-15' },
]

export default function ProjectManagerDashboard() {
  const user = useSelector(state => state.auth.user)
  return (
    <DashboardShell title="Project Management Hub" subtitle="Project tracking, task management & resource allocation" userName={user?.name}>
      <motion.div variants={{ hidden: {}, visible: {} }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
            <KpiCard {...kpi} />
          </motion.div>
        ))}
      </motion.div>

      <div className="bg-surface-elevated border border-subtle rounded-lg p-4">
        <h2 className="text-base font-semibold text-primary mb-3">Sprint Tasks</h2>
        <DataTable
          columns={[
            { key: 'task', label: 'Task', minWidth: 160 },
            { key: 'project', label: 'Project', minWidth: 140 },
            { key: 'assignee', label: 'Assignee', width: 100 },
            { key: 'status', label: 'Status', width: 110 },
            { key: 'priority', label: 'Priority', width: 90 },
            { key: 'due', label: 'Due Date', width: 110 },
          ]}
          data={tasks}
          pageSize={10}
        />
      </div>
    </DashboardShell>
  )
}
