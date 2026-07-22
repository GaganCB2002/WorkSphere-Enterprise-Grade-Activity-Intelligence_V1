import { motion } from 'framer-motion'
import DashboardShell from '../DashboardShell'
import KpiCard from '../../components/common/Card/KpiCard'
import { useSelector } from 'react-redux'

const kpis = [
  { title: 'Attendance Rate', value: '94.2%', subtitle: 'This month', trend: '+1.2% vs last', trendType: 'up', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
  { title: 'On Leave Today', value: '48', subtitle: 'Across departments', trend: '3 more than avg', trendType: 'neutral', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
  { title: 'Late Arrivals', value: '12', subtitle: 'Today', trend: '-4 from yesterday', trendType: 'up', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
  { title: 'Pending Review', value: '15', subtitle: 'Timesheets to verify', trend: 'Due today', trendType: 'down', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
]

export default function HrExecutiveDashboard() {
  const user = useSelector(state => state.auth.user)
  return (
    <DashboardShell title="HR Executive Dashboard" subtitle="Attendance tracking, leave management & daily HR operations" userName={user?.name}>
      <motion.div variants={{ hidden: {}, visible: {} }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
            <KpiCard {...kpi} />
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { title: 'Process Leave', desc: 'Review and approve pending leave requests', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
          { title: 'Verify Timesheets', desc: 'Approve employee time entries for payroll', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
          { title: 'Attendance Report', desc: 'Generate daily attendance summary', icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
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
