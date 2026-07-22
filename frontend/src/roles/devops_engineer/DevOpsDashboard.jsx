import { motion } from 'framer-motion'
import DashboardShell from '../DashboardShell'
import KpiCard from '../../components/common/Card/KpiCard'
import DataTable from '../../components/common/DataTable/DataTable'
import { useSelector } from 'react-redux'

const kpis = [
  { title: 'Pipeline Success', value: '98.2%', subtitle: 'Last 1000 runs', trend: '18 failed', trendType: 'up', icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15' },
  { title: 'Infra Cost', value: '$124.8K', subtitle: 'Monthly cloud spend', trend: '+8% vs budget', trendType: 'down', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
  { title: 'Pod Health', value: '156/160', subtitle: 'Running pods', trend: '4 degraded', trendType: 'neutral', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
  { title: 'MTTR', value: '12.4m', subtitle: 'Mean time to resolve', trend: '-3m improvement', trendType: 'up', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
]

const pipelines = [
  { name: 'api-build-pipeline', branch: 'main', status: 'Passing', duration: '4m 12s', commit: 'a3f2b1c' },
  { name: 'frontend-deploy', branch: 'staging', status: 'Passing', duration: '6m 34s', commit: 'b7e4d8f' },
  { name: 'data-etl-job', branch: 'production', status: 'Failed', duration: '12m 08s', commit: 'f1a9c3e' },
  { name: 'ml-inference-test', branch: 'develop', status: 'Running', duration: '—', commit: 'd4e5f6a' },
]

export default function DevOpsDashboard() {
  const user = useSelector(state => state.auth.user)
  return (
    <DashboardShell title="DevOps Engineering Center" subtitle="CI/CD pipelines, infrastructure monitoring & cloud operations" userName={user?.name}>
      <motion.div variants={{ hidden: {}, visible: {} }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
            <KpiCard {...kpi} />
          </motion.div>
        ))}
      </motion.div>

      <div className="bg-surface-elevated border border-subtle rounded-lg p-4">
        <h2 className="text-base font-semibold text-primary mb-3">CI/CD Pipeline Status</h2>
        <DataTable
          columns={[
            { key: 'name', label: 'Pipeline', minWidth: 180 },
            { key: 'branch', label: 'Branch', width: 110 },
            { key: 'status', label: 'Status', width: 100 },
            { key: 'duration', label: 'Duration', width: 100 },
            { key: 'commit', label: 'Commit', width: 100 },
          ]}
          data={pipelines}
          pageSize={10}
        />
      </div>
    </DashboardShell>
  )
}
