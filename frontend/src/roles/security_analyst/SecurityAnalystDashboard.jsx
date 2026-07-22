import { motion } from 'framer-motion'
import DashboardShell from '../DashboardShell'
import KpiCard from '../../components/common/Card/KpiCard'
import DataTable from '../../components/common/DataTable/DataTable'
import { useSelector } from 'react-redux'

const kpis = [
  { title: 'Threats Blocked', value: '2,847', subtitle: 'This month', trend: '+12.4% vs last', trendType: 'up', icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' },
  { title: 'Vulnerabilities', value: '18', subtitle: 'Open findings', trend: '3 critical', trendType: 'down', icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z' },
  { title: 'Compliance Score', value: '94.2%', subtitle: 'SOC 2 readiness', trend: '+2.1% this quarter', trendType: 'up', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
  { title: 'Incident Response', value: '4.2m', subtitle: 'Mean detection time', trend: 'Within SLA', trendType: 'up', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
]

const threats = [
  { type: 'Brute Force Attack', source: '45.83.102.4', target: 'SSH Gateway', severity: 'Critical', status: 'Blocked', time: '2m ago' },
  { type: 'SQL Injection', source: '103.45.208.19', target: 'API v2', severity: 'High', status: 'Blocked', time: '15m ago' },
  { type: 'Suspicious Login', source: 'Unknown Device', target: 'Admin Portal', severity: 'Medium', status: 'Investigating', time: '1h ago' },
  { type: 'Port Scan', source: '78.92.15.33', target: 'Network Edge', severity: 'Low', status: 'Logged', time: '3h ago' },
]

export default function SecurityAnalystDashboard() {
  const user = useSelector(state => state.auth.user)
  return (
    <DashboardShell title="Security Operations Center" subtitle="Threat monitoring, vulnerability management & compliance tracking" userName={user?.name}>
      <motion.div variants={{ hidden: {}, visible: {} }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
            <KpiCard {...kpi} />
          </motion.div>
        ))}
      </motion.div>

      <div className="bg-surface-elevated border border-subtle rounded-lg p-4">
        <h2 className="text-base font-semibold text-primary mb-3">Recent Security Events</h2>
        <DataTable
          columns={[
            { key: 'type', label: 'Event Type', minWidth: 160 },
            { key: 'source', label: 'Source', minWidth: 140 },
            { key: 'target', label: 'Target', minWidth: 120 },
            { key: 'severity', label: 'Severity', width: 100 },
            { key: 'status', label: 'Status', width: 110 },
            { key: 'time', label: 'Time', width: 100 },
          ]}
          data={threats}
          pageSize={10}
        />
      </div>
    </DashboardShell>
  )
}
