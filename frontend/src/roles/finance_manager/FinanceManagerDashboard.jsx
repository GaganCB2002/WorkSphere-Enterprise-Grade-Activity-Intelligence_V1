import { motion } from 'framer-motion'
import DashboardShell from '../DashboardShell'
import KpiCard from '../../components/common/Card/KpiCard'
import DataTable from '../../components/common/DataTable/DataTable'
import { useSelector } from 'react-redux'

const kpis = [
  { title: 'Monthly Revenue', value: '$4.2M', subtitle: 'Current month', trend: '+8.3% vs budget', trendType: 'up', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
  { title: 'Operating Expenses', value: '$3.1M', subtitle: 'Month to date', trend: 'Within budget', trendType: 'neutral', icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z' },
  { title: 'Net Profit Margin', value: '26.2%', subtitle: 'This quarter', trend: '+2.1% vs target', trendType: 'up', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
  { title: 'Payroll Run', value: '$1.8M', subtitle: 'This month', trend: 'Processing', trendType: 'neutral', icon: 'M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z' },
]

const invoices = [
  { id: 'INV-1042', client: 'Acme Corp', amount: '$124,500', status: 'Paid', dueDate: '2026-07-15' },
  { id: 'INV-1043', client: 'Global Dynamics', amount: '$89,200', status: 'Pending', dueDate: '2026-07-20' },
  { id: 'INV-1044', client: 'Vortex Cloud', amount: '$245,000', status: 'Overdue', dueDate: '2026-06-30' },
  { id: 'INV-1045', client: 'NexGen Ltd', amount: '$56,800', status: 'Draft', dueDate: '2026-08-01' },
]

export default function FinanceManagerDashboard() {
  const user = useSelector(state => state.auth.user)
  return (
    <DashboardShell title="Finance & Treasury Dashboard" subtitle="Revenue tracking, expense management & financial planning" userName={user?.name}>
      <motion.div variants={{ hidden: {}, visible: {} }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
            <KpiCard {...kpi} />
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-surface-elevated border border-subtle rounded-lg p-4">
          <h2 className="text-base font-semibold text-primary mb-3">Recent Invoices</h2>
          <DataTable
            columns={[
              { key: 'id', label: 'Invoice', width: 110 },
              { key: 'client', label: 'Client', minWidth: 140 },
              { key: 'amount', label: 'Amount', width: 110 },
              { key: 'status', label: 'Status', width: 100 },
              { key: 'dueDate', label: 'Due Date', width: 110 },
            ]}
            data={invoices}
            pageSize={10}
          />
        </div>

        <div className="space-y-3">
          <div className="bg-surface-elevated border border-subtle rounded-lg p-4">
            <h3 className="text-sm font-semibold text-primary mb-2">Budget Utilization</h3>
            <div className="space-y-2">
              {[
                { dept: 'Engineering', pct: 72 },
                { dept: 'Marketing', pct: 91 },
                { dept: 'Operations', pct: 45 },
                { dept: 'Sales', pct: 63 },
              ].map(b => (
                <div key={b.dept}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-secondary">{b.dept}</span>
                    <span className="text-primary font-medium">{b.pct}%</span>
                  </div>
                  <div className="h-1.5 bg-subtle rounded-full overflow-hidden">
                    <div className="h-full bg-brand-500 rounded-full" style={{ width: `${b.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  )
}
