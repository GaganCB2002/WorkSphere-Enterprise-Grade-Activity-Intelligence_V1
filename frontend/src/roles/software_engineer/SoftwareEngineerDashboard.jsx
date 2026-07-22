import { motion } from 'framer-motion'
import DashboardShell from '../DashboardShell'
import KpiCard from '../../components/common/Card/KpiCard'
import DataTable from '../../components/common/DataTable/DataTable'
import { useSelector } from 'react-redux'

const kpis = [
  { title: 'My Tasks', value: '8', subtitle: 'Active assignments', trend: '3 due this week', trendType: 'down', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
  { title: 'PRs Open', value: '3', subtitle: 'Awaiting review', trend: '1 critical', trendType: 'neutral', icon: 'M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z' },
  { title: 'Sprint Progress', value: '72%', subtitle: 'Current sprint', trend: 'On track', trendType: 'up', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
  { title: 'Focus Time', value: '32.5h', subtitle: 'Deep work this week', trend: '+4h vs last week', trendType: 'up', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
]

const tasks = [
  { task: 'Implement rate limiting', project: 'API Gateway', priority: 'High', status: 'In Progress', due: '2026-07-25' },
  { task: 'Fix auth redirect bug', project: 'Auth Service', priority: 'Critical', status: 'In Progress', due: '2026-07-18' },
  { task: 'Add unit tests for cache', project: 'Core Lib', priority: 'Medium', status: 'Todo', due: '2026-07-30' },
  { task: 'Update API documentation', project: 'Docs', priority: 'Low', status: 'Todo', due: '2026-08-05' },
]

export default function SoftwareEngineerDashboard() {
  const user = useSelector(state => state.auth.user)
  return (
    <DashboardShell title="Software Engineer Workspace" subtitle="My tasks, pull requests & sprint progress" userName={user?.name}>
      <motion.div variants={{ hidden: {}, visible: {} }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
            <KpiCard {...kpi} />
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-surface-elevated border border-subtle rounded-lg p-4">
          <h2 className="text-base font-semibold text-primary mb-3">My Tasks</h2>
          <DataTable
            columns={[
              { key: 'task', label: 'Task', minWidth: 160 },
              { key: 'project', label: 'Project', minWidth: 120 },
              { key: 'priority', label: 'Priority', width: 90 },
              { key: 'status', label: 'Status', width: 110 },
              { key: 'due', label: 'Due', width: 100 },
            ]}
            data={tasks}
            pageSize={10}
          />
        </div>

        <div className="space-y-3">
          <div className="bg-surface-elevated border border-subtle rounded-lg p-4">
            <h3 className="text-sm font-semibold text-primary mb-2">Quick Actions</h3>
            <div className="space-y-2">
              {[
                { label: 'View Pull Requests', desc: '3 PRs awaiting review' },
                { label: 'Start Focus Session', desc: '2h deep work block' },
                { label: 'Log Hours', desc: 'Track your time' },
              ].map((a, i) => (
                <button key={i} className="w-full text-left p-2.5 rounded-lg border border-subtle hover:border-brand-400 transition-colors bg-surface">
                  <div className="text-sm font-medium text-primary">{a.label}</div>
                  <div className="text-xs text-secondary mt-0.5">{a.desc}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  )
}
