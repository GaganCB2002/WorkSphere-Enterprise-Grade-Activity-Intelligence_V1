import { motion } from 'framer-motion'
import DashboardShell from '../DashboardShell'
import KpiCard from '../../components/common/Card/KpiCard'
import DataTable from '../../components/common/DataTable/DataTable'
import { useSelector } from 'react-redux'

const kpis = [
  { title: 'System Uptime', value: '99.97%', subtitle: 'Last 30 days', trend: '1 incident', trendType: 'up', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
  { title: 'Deployments', value: '847', subtitle: 'This quarter', trend: '+23% vs last', trendType: 'up', icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15' },
  { title: 'Tech Debt Ratio', value: '18.3%', subtitle: 'Codebase quality', trend: '-2.1% improved', trendType: 'up', icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z' },
  { title: 'Engineering Velocity', value: '94.2%', subtitle: 'Sprint completion', trend: '+5% MoM', trendType: 'up', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
]

const services = [
  { name: 'API Gateway', status: 'Operational', uptime: '99.99%', latency: '12ms', pods: 24 },
  { name: 'Auth Service', status: 'Operational', uptime: '99.95%', latency: '8ms', pods: 16 },
  { name: 'Data Pipeline', status: 'Degraded', uptime: '98.70%', latency: '340ms', pods: 32 },
  { name: 'ML Inference', status: 'Operational', uptime: '99.90%', latency: '45ms', pods: 48 },
  { name: 'WebSocket Hub', status: 'Operational', uptime: '99.99%', latency: '5ms', pods: 12 },
]

export default function CtoDashboard() {
  const user = useSelector(state => state.auth.user)
  return (
    <DashboardShell title="Engineering Command Center" subtitle="System health, deployment metrics & engineering velocity" userName={user?.name}>
      <motion.div variants={{ hidden: {}, visible: {} }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
            <KpiCard {...kpi} />
          </motion.div>
        ))}
      </motion.div>

      <div className="bg-surface-elevated border border-subtle rounded-lg p-4">
        <h2 className="text-base font-semibold text-primary mb-3">Service Health Overview</h2>
        <DataTable
          columns={[
            { key: 'name', label: 'Service', minWidth: 160 },
            { key: 'status', label: 'Status', width: 120 },
            { key: 'uptime', label: 'Uptime', width: 100 },
            { key: 'latency', label: 'Latency', width: 100 },
            { key: 'pods', label: 'Pod Count', width: 100 },
          ]}
          data={services}
          pageSize={10}
        />
      </div>
    </DashboardShell>
  )
}
