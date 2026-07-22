import { motion } from 'framer-motion'
import DashboardShell from '../DashboardShell'
import KpiCard from '../../components/common/Card/KpiCard'
import { useSelector } from 'react-redux'

const kpis = [
  { title: 'Pipeline Value', value: '$18.4M', subtitle: 'Total weighted pipeline', trend: '+$2.1M this month', trendType: 'up', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
  { title: 'Win Rate', value: '42.3%', subtitle: 'Closed-won ratio', trend: '+3.8% vs Q1', trendType: 'up', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
  { title: 'Active Deals', value: '64', subtitle: 'In negotiation', trend: '12 closing this week', trendType: 'up', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z' },
  { title: 'Monthly Target', value: '87%', subtitle: '$4.8M of $5.5M goal', trend: 'On track to hit', trendType: 'up', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
]

const deals = [
  { client: 'Acme Corp', value: '$2.4M', stage: 'Negotiation', probability: '80%', rep: 'Alex Patel', eta: 'Q3 2026' },
  { client: 'Global Dynamics', value: '$1.8M', stage: 'Proposal', probability: '60%', rep: 'Maria Lopez', eta: 'Q3 2026' },
  { client: 'Vortex Cloud', value: '$3.2M', stage: 'Discovery', probability: '30%', rep: 'James Chen', eta: 'Q4 2026' },
  { client: 'NexGen Ltd', value: '$890K', stage: 'Closing', probability: '90%', rep: 'Alex Patel', eta: 'Q2 2026' },
  { client: 'Stellar Tech', value: '$1.1M', stage: 'Proposal', probability: '55%', rep: 'Sarah Kim', eta: 'Q3 2026' },
]

export default function SalesManagerDashboard() {
  const user = useSelector(state => state.auth.user)
  return (
    <DashboardShell title="Sales Pipeline Dashboard" subtitle="Deal tracking, revenue forecasting & sales performance" userName={user?.name}>
      <motion.div variants={{ hidden: {}, visible: {} }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
            <KpiCard {...kpi} />
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-surface-elevated border border-subtle rounded-lg p-4">
          <h2 className="text-base font-semibold text-primary mb-3">Active Deals</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-xs font-medium text-secondary uppercase tracking-wider border-b border-subtle">
                  <th className="pb-3 pr-4">Client</th>
                  <th className="pb-3 pr-4">Value</th>
                  <th className="pb-3 pr-4">Stage</th>
                  <th className="pb-3 pr-4">Probability</th>
                  <th className="pb-3 pr-4">Rep</th>
                  <th className="pb-3 pr-4">ETA</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-subtle">
                {deals.map((d, i) => (
                  <tr key={i} className="text-sm">
                    <td className="py-3 pr-4 font-medium text-primary">{d.client}</td>
                    <td className="py-3 pr-4 text-primary">{d.value}</td>
                    <td className="py-3 pr-4">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                        d.stage === 'Closing' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400' :
                        d.stage === 'Negotiation' ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400' :
                        d.stage === 'Proposal' ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400' :
                        'bg-slate-50 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                      }`}>{d.stage}</span>
                    </td>
                    <td className="py-3 pr-4 text-primary">{d.probability}</td>
                    <td className="py-3 pr-4 text-secondary">{d.rep}</td>
                    <td className="py-3 pr-4 text-secondary">{d.eta}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-surface-elevated border border-subtle rounded-lg p-4">
          <h2 className="text-base font-semibold text-primary mb-3">Pipeline by Stage</h2>
          <div className="space-y-3">
            {[
              { stage: 'Discovery', value: '$5.2M', pct: 28 },
              { stage: 'Proposal', value: '$4.8M', pct: 26 },
              { stage: 'Negotiation', value: '$5.1M', pct: 28 },
              { stage: 'Closing', value: '$3.3M', pct: 18 },
            ].map(s => (
              <div key={s.stage}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-secondary">{s.stage}</span>
                  <span className="text-primary font-medium">{s.value}</span>
                </div>
                <div className="h-2 bg-subtle rounded-full overflow-hidden">
                  <div className="h-full bg-brand-500 rounded-full" style={{ width: `${s.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardShell>
  )
}
