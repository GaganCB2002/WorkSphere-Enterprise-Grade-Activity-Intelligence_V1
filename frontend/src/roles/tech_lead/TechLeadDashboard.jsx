import { motion } from 'framer-motion'
import DashboardShell from '../DashboardShell'
import KpiCard from '../../components/common/Card/KpiCard'
import DataTable from '../../components/common/DataTable/DataTable'
import { useSelector } from 'react-redux'

const kpis = [
  { title: 'Sprint Velocity', value: '124', subtitle: 'Story points completed', trend: '+8 vs last sprint', trendType: 'up', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
  { title: 'Code Reviews', value: '18', subtitle: 'Pending review', trend: '3 critical', trendType: 'down', icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' },
  { title: 'PRs Merged', value: '47', subtitle: 'This sprint', trend: '+22% vs average', trendType: 'up', icon: 'M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z' },
  { title: 'Test Coverage', value: '87.5%', subtitle: 'Codebase coverage', trend: '+2.3% this sprint', trendType: 'up', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
]

const reviews = [
  { pr: '#342 API Gateway', author: 'Sarah J.', reviewer: 'You', lines: '+842/-124', status: 'Changes Requested', age: '2h' },
  { pr: '#343 Cache Layer', author: 'Michael C.', reviewer: 'You', lines: '+356/-89', status: 'Approved', age: '30m' },
  { pr: '#344 Auth Refactor', author: 'David R.', reviewer: 'You', lines: '+1,204/-567', status: 'Open', age: '4h' },
  { pr: '#345 Logging Fix', author: 'Ananya G.', reviewer: 'You', lines: '+45/-12', status: 'Approved', age: '15m' },
]

export default function TechLeadDashboard() {
  const user = useSelector(state => state.auth.user)
  return (
    <DashboardShell title="Tech Lead Command Center" subtitle="Sprint tracking, code reviews & team productivity" userName={user?.name}>
      <motion.div variants={{ hidden: {}, visible: {} }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
            <KpiCard {...kpi} />
          </motion.div>
        ))}
      </motion.div>

      <div className="bg-surface-elevated border border-subtle rounded-lg p-4">
        <h2 className="text-base font-semibold text-primary mb-3">Pending Code Reviews</h2>
        <DataTable
          columns={[
            { key: 'pr', label: 'Pull Request', minWidth: 160 },
            { key: 'author', label: 'Author', width: 100 },
            { key: 'reviewer', label: 'Reviewer', width: 100 },
            { key: 'lines', label: 'Changes', width: 110 },
            { key: 'status', label: 'Status', width: 140 },
            { key: 'age', label: 'Age', width: 80 },
          ]}
          data={reviews}
          pageSize={10}
        />
      </div>
    </DashboardShell>
  )
}
