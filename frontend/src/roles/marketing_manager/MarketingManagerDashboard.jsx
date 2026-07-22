import { motion } from 'framer-motion'
import DashboardShell from '../DashboardShell'
import KpiCard from '../../components/common/Card/KpiCard'
import { useSelector } from 'react-redux'

const kpis = [
  { title: 'Campaign ROI', value: '324%', subtitle: 'Average across campaigns', trend: '+18% vs last quarter', trendType: 'up', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
  { title: 'Lead Generation', value: '2,847', subtitle: 'This month', trend: '+12.4% MoM', trendType: 'up', icon: 'M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z' },
  { title: 'Conversion Rate', value: '8.4%', subtitle: 'Lead to opportunity', trend: '+1.2% improvement', trendType: 'up', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
  { title: 'Website Traffic', value: '184K', subtitle: 'Unique visitors', trend: '+22% vs last month', trendType: 'up', icon: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9' },
]

const campaigns = [
  { name: 'Q2 Product Launch', budget: '$120K', spent: '$98K', leads: 1240, roi: '412%' },
  { name: 'Brand Awareness', budget: '$80K', spent: '$72K', leads: 890, roi: '286%' },
  { name: 'Retargeting Q2', budget: '$40K', spent: '$38K', leads: 520, roi: '198%' },
  { name: 'Enterprise Webinar', budget: '$25K', spent: '$18K', leads: 340, roi: '524%' },
]

export default function MarketingManagerDashboard() {
  const user = useSelector(state => state.auth.user)
  return (
    <DashboardShell title="Marketing Operations Center" subtitle="Campaign performance, lead generation & marketing analytics" userName={user?.name}>
      <motion.div variants={{ hidden: {}, visible: {} }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
            <KpiCard {...kpi} />
          </motion.div>
        ))}
      </motion.div>

      <div className="bg-surface-elevated border border-subtle rounded-lg p-4">
        <h2 className="text-base font-semibold text-primary mb-3">Active Campaigns</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-xs font-medium text-secondary uppercase tracking-wider border-b border-subtle">
                <th className="pb-3 pr-4">Campaign</th>
                <th className="pb-3 pr-4">Budget</th>
                <th className="pb-3 pr-4">Spent</th>
                <th className="pb-3 pr-4">Leads</th>
                <th className="pb-3 pr-4">ROI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-subtle">
              {campaigns.map((c, i) => (
                <tr key={i} className="text-sm">
                  <td className="py-3 pr-4 font-medium text-primary">{c.name}</td>
                  <td className="py-3 pr-4 text-secondary">{c.budget}</td>
                  <td className="py-3 pr-4 text-secondary">{c.spent}</td>
                  <td className="py-3 pr-4 text-primary">{c.leads}</td>
                  <td className="py-3 pr-4 text-emerald-600 font-semibold">{c.roi}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardShell>
  )
}
