import { useState } from 'react'
import { Users, UserPlus, Activity, TrendingUp, Briefcase, Calendar, Clock, Filter, Search } from 'lucide-react'
import PageHeader from '../../components/layout/PageHeader'

const employees = [
  { id: 'USR-001', name: 'Gagan CB', email: 'super_admin@worksphere.com', role: 'SUPER_ADMIN', department: 'Executive', status: 'Active' },
  { id: 'USR-002', name: 'Alice Systems', email: 'admin@worksphere.com', role: 'ADMIN', department: 'Administration', status: 'Active' },
  { id: 'USR-003', name: 'Bob Finance', email: 'finance@worksphere.com', role: 'FINANCE_MANAGER', department: 'Finance', status: 'Suspended' },
  { id: 'EMP-001', name: 'Kabir Rao', email: 'kabir@worksphere.com', role: 'SOFTWARE_ENGINEER', department: 'Engineering', status: 'Active' },
  { id: 'EMP-002', name: 'Priya Sharma', email: 'priya@worksphere.com', role: 'HR_MANAGER', department: 'Human Resources', status: 'Active' },
  { id: 'EMP-003', name: 'Raj Patel', email: 'raj@worksphere.com', role: 'MARKETING_MANAGER', department: 'Marketing', status: 'Active' },
]

export default function EmployeeDirectoryPage() {
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  const filtered = employees.filter(e => {
    const matchSearch = e.name.toLowerCase().includes(search.toLowerCase()) || e.email.toLowerCase().includes(search.toLowerCase())
    const matchStatus = filterStatus === 'all' || e.status.toLowerCase() === filterStatus
    return matchSearch && matchStatus
  })

  return (
    <div className="space-y-5">
      <PageHeader
        title="Employee Directory"
        description="Comprehensive view of all active and suspended personnel across departments."
        status="System Wide"
        quickActions={
          <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md bg-brand-500 text-white hover:bg-brand-600 transition-colors">
            <UserPlus className="w-4 h-4" />
            Add Employee
          </button>
        }
        onSearch={setSearch}
        onExport={() => alert('Exporting...')}
        onRefresh={() => alert('Refreshing...')}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface-elevated border border-subtle rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-secondary uppercase tracking-wider">Total Employees</p>
              <p className="text-2xl font-bold text-primary mt-1">{employees.length}</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-brand-500/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-brand-500" />
            </div>
          </div>
        </div>
        <div className="bg-surface-elevated border border-subtle rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-secondary uppercase tracking-wider">Active</p>
              <p className="text-2xl font-bold text-primary mt-1">{employees.filter(e => e.status === 'Active').length}</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-success-500/10 flex items-center justify-center">
              <Activity className="w-5 h-5 text-success-500" />
            </div>
          </div>
        </div>
        <div className="bg-surface-elevated border border-subtle rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-secondary uppercase tracking-wider">Departments</p>
              <p className="text-2xl font-bold text-primary mt-1">{new Set(employees.map(e => e.department)).size}</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-warning-500/10 flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-warning-500" />
            </div>
          </div>
        </div>
        <div className="bg-surface-elevated border border-subtle rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-secondary uppercase tracking-wider">New Joiners</p>
              <p className="text-2xl font-bold text-primary mt-1">3</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-info-500/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-info-500" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-surface-elevated border border-subtle rounded-lg">
        <div className="p-4 border-b border-subtle flex justify-between items-center">
          <h3 className="text-sm font-semibold text-primary">Directory Listing</h3>
          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            className="px-3 py-1.5 text-sm bg-surface-hover border border-subtle rounded text-primary outline-none focus:border-brand-500 transition-colors"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-xs text-secondary uppercase tracking-wider border-b border-subtle">
                <th className="p-3 font-medium">Name</th>
                <th className="p-3 font-medium">Email</th>
                <th className="p-3 font-medium">Role</th>
                <th className="p-3 font-medium">Department</th>
                <th className="p-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-subtle">
              {filtered.map(emp => (
                <tr key={emp.id} className="hover:bg-surface-hover transition-colors">
                  <td className="p-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-brand-600 flex items-center justify-center text-xs font-medium text-white">
                        {emp.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-primary">{emp.name}</p>
                        <p className="text-xs text-secondary">{emp.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-3 text-sm text-secondary">{emp.email}</td>
                  <td className="p-3"><span className="px-2 py-0.5 text-[11px] font-medium rounded bg-surface-hover border border-subtle text-secondary">{emp.role}</span></td>
                  <td className="p-3 text-sm text-secondary">{emp.department}</td>
                  <td className="p-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-medium rounded-full ${
                      emp.status === 'Active' ? 'bg-success-500/10 text-success-600' : 'bg-danger-500/10 text-danger-600'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${emp.status === 'Active' ? 'bg-success-500' : 'bg-danger-500'}`} />
                      {emp.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
