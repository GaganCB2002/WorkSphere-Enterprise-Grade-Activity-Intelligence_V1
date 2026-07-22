import { useState } from 'react'
import { motion } from 'framer-motion'
import DashboardShell from '../DashboardShell'
import KpiCard from '../../components/common/Card/KpiCard'
import DataTable from '../../components/common/DataTable/DataTable'
import { useSelector } from 'react-redux'

const kpis = [
  { title: 'Total User Accounts', value: '1,248', subtitle: 'Active full-time', trend: '+15 this week', trendType: 'up', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
  { title: 'MFA Adoption', value: '94.2%', subtitle: 'Security compliance', trend: '+3.1% increase', trendType: 'up', icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' },
  { title: 'Active Sessions', value: '892', subtitle: 'Current peak', trend: 'Peak hours', trendType: 'neutral', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
  { title: 'Flagged Users', value: '3', subtitle: 'Action required', trend: 'Needs review', trendType: 'down', icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z' },
]

const usersData = [
  { id: '1', name: 'Sarah Jenkins', email: 'sarah.j@worksphere.com', role: 'Software Engineer', department: 'Engineering', status: 'Active', lastActive: 'Just now' },
  { id: '2', name: 'Michael Chang', email: 'michael.c@worksphere.com', role: 'Tech Lead', department: 'Engineering', status: 'Active', lastActive: '2m ago' },
  { id: '3', name: 'Elena Rostova', email: 'elena.r@worksphere.com', role: 'QA Engineer', department: 'QA', status: 'Idle', lastActive: '10m ago' },
  { id: '4', name: 'David Ross', email: 'david.r@worksphere.com', role: 'DevOps Engineer', department: 'DevOps', status: 'Offline', lastActive: '2h ago' },
  { id: '5', name: 'Alex Patel', email: 'alex.p@worksphere.com', role: 'Sales Manager', department: 'Sales', status: 'Active', lastActive: 'Just now' },
]

export default function AdminDashboard() {
  const user = useSelector(state => state.auth.user)
  const [search, setSearch] = useState('')

  const filtered = usersData.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    u.role.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <DashboardShell
      title="System Administration Hub"
      subtitle="User management, role assignments, system settings & audit logs"
      userName={user?.name}
    >
      <motion.div variants={{ hidden: {}, visible: {} }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
            <KpiCard {...kpi} />
          </motion.div>
        ))}
      </motion.div>

      <div className="bg-surface-elevated border border-subtle rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-semibold text-primary">User Accounts</h2>
            <p className="text-xs text-secondary mt-0.5">Manage employee accounts and access control</p>
          </div>
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="px-3 py-1.5 text-sm border border-subtle rounded-md bg-surface text-primary focus:outline-none focus:border-brand-400"
          />
        </div>
        <DataTable
          columns={[
            { key: 'name', label: 'Name', minWidth: 160 },
            { key: 'email', label: 'Email', minWidth: 200 },
            { key: 'role', label: 'Role', minWidth: 140 },
            { key: 'department', label: 'Department', minWidth: 120 },
            { key: 'status', label: 'Status', width: 100 },
            { key: 'lastActive', label: 'Last Active', width: 120 },
          ]}
          data={filtered}
          searchable={false}
          pageSize={10}
        />
      </div>
    </DashboardShell>
  )
}
