import { motion } from 'framer-motion'
import DashboardShell from '../DashboardShell'
import KpiCard from '../../components/common/Card/KpiCard'
import DataTable from '../../components/common/DataTable/DataTable'
import { useSelector } from 'react-redux'

const kpis = [
  { title: 'Avg Resolution Time', value: '14.2m', subtitle: 'Target: 20m', trend: '-2.4m vs target', trendType: 'up', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
  { title: 'Customer Satisfaction', value: '98.2%', subtitle: 'CSAT score', trend: 'Highly rated', trendType: 'up', icon: 'M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5' },
  { title: 'Active Tickets', value: '12', subtitle: 'In your queue', trend: '4 unassigned', trendType: 'neutral', icon: 'M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z' },
  { title: 'SLA Compliance', value: '96.5%', subtitle: 'Within SLA', trend: '+1.2% improvement', trendType: 'up', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
]

const tickets = [
  { id: 'TCK-501', client: 'Acme Corp', subject: 'Unable to verify TOTP authenticator code', priority: 'High', status: 'In Progress', time: '12m' },
  { id: 'TCK-502', client: 'Global Dynamics', subject: 'Invoice breakdown for EKS cluster', priority: 'Medium', status: 'Open', time: '28m' },
  { id: 'TCK-503', client: 'Vortex Cloud', subject: 'Agent failing on macOS Sonoma', priority: 'Critical', status: 'In Progress', time: '5m' },
  { id: 'TCK-504', client: 'NexGen Ltd', subject: 'New user onboarding assistance', priority: 'Low', status: 'Open', time: '45m' },
]

export default function SupportDashboard() {
  const user = useSelector(state => state.auth.user)
  return (
    <DashboardShell title="Customer Support Center" subtitle="Ticket queue, resolution metrics & customer satisfaction" userName={user?.name}>
      <motion.div variants={{ hidden: {}, visible: {} }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
            <KpiCard {...kpi} />
          </motion.div>
        ))}
      </motion.div>

      <div className="bg-surface-elevated border border-subtle rounded-lg p-4">
        <h2 className="text-base font-semibold text-primary mb-3">Active Ticket Queue</h2>
        <DataTable
          columns={[
            { key: 'id', label: 'ID', width: 90 },
            { key: 'client', label: 'Client', minWidth: 120 },
            { key: 'subject', label: 'Subject', minWidth: 240 },
            { key: 'priority', label: 'Priority', width: 90 },
            { key: 'status', label: 'Status', width: 110 },
            { key: 'time', label: 'Wait Time', width: 100 },
          ]}
          data={tickets}
          pageSize={10}
        />
      </div>
    </DashboardShell>
  )
}
