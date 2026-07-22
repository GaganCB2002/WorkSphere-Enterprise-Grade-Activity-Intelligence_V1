import { motion } from 'framer-motion'
import DashboardShell from '../DashboardShell'
import KpiCard from '../../components/common/Card/KpiCard'
import { useSelector } from 'react-redux'

const kpis = [
  { title: 'My Attendance', value: '94.2%', subtitle: 'This month', trend: '8 days present', trendType: 'up', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
  { title: 'Tasks Due', value: '5', subtitle: 'This week', trend: '2 overdue', trendType: 'down', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
  { title: 'Leave Balance', value: '14', subtitle: 'Days remaining', trend: 'Request planned', trendType: 'neutral', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
  { title: 'Upcoming Events', value: '3', subtitle: 'This week', trend: '1 team meeting', trendType: 'up', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
]

export default function EmployeeDashboard() {
  const user = useSelector(state => state.auth.user)
  return (
    <DashboardShell title="My Workspace" subtitle="Personal dashboard, tasks & attendance overview" userName={user?.name}>
      <motion.div variants={{ hidden: {}, visible: {} }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
            <KpiCard {...kpi} />
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { title: 'Clock In / Out', desc: 'Track your daily attendance', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
          { title: 'View Tasks', desc: 'Check your pending assignments', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
          { title: 'Apply Leave', desc: 'Submit time-off request', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
        ].map((a, i) => (
          <button key={i} className="group flex items-start gap-3 p-4 bg-surface-elevated border border-subtle rounded-xl hover:border-brand-400 transition-all text-left">
            <div className="w-10 h-10 rounded-lg bg-brand-50 dark:bg-brand-950/30 flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d={a.icon} />
              </svg>
            </div>
            <div>
              <div className="text-sm font-semibold text-primary">{a.title}</div>
              <div className="text-xs text-secondary mt-0.5">{a.desc}</div>
            </div>
          </button>
        ))}
      </div>
    </DashboardShell>
  )
}
