import { useState } from 'react'
import { Users, Plus, Pencil, Trash2 } from 'lucide-react'
import PageHeader from '../../components/layout/PageHeader'

export default function UserManagementPage() {
  const [users, setUsers] = useState([
    { id: 'USR-001', name: 'Gagan CB', email: 'super_admin@worksphere.com', role: 'SUPER_ADMIN', status: 'ACTIVE' },
    { id: 'USR-002', name: 'Alice Systems', email: 'admin@worksphere.com', role: 'ADMIN', status: 'ACTIVE' },
    { id: 'USR-003', name: 'Bob Finance', email: 'finance@worksphere.com', role: 'FINANCE_MANAGER', status: 'SUSPENDED' },
  ])

  const removeUser = (id) => {
    if (id === 'USR-001') {
      alert('CRITICAL ERROR: Cannot remove root Super Admin account.')
      return
    }
    setUsers(prev => prev.filter(u => u.id !== id))
  }

  return (
    <div className="flex-1 flex flex-col space-y-5 h-full bg-surface-secondary">
      <PageHeader
        title="User Management"
        description="Manage user provisioning, suspension, and enterprise roles."
        status="Administration"
        quickActions={
          <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md bg-brand-500 text-white hover:bg-brand-600 transition-colors">
            <Plus className="w-4 h-4" />
            Provision New User
          </button>
        }
      />

      <div className="bg-surface-elevated border border-subtle rounded-lg">

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-xs text-secondary uppercase tracking-wider border-b border-subtle bg-surface-hover">
              <th className="p-3 font-medium">User ID</th>
              <th className="p-3 font-medium">Name & Email</th>
              <th className="p-3 font-medium">Assigned Role</th>
              <th className="p-3 font-medium text-center">Status</th>
              <th className="p-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-subtle">
            {users.map(u => (
              <tr key={u.id} className="hover:bg-surface-hover transition-colors">
                <td className="p-3 text-sm font-mono text-brand-500">{u.id}</td>
                <td className="p-3">
                  <p className="text-sm font-medium text-primary">{u.name}</p>
                  <p className="text-xs text-secondary">{u.email}</p>
                </td>
                <td className="p-3">
                  <span className="px-2 py-0.5 text-[11px] font-medium rounded bg-surface-hover border border-subtle text-secondary">
                    {u.role}
                  </span>
                </td>
                <td className="p-3 text-center">
                  <span className={`px-2 py-0.5 text-[11px] font-medium rounded-full ${
                    u.status === 'ACTIVE' ? 'bg-success-500/10 text-success-600' : 'bg-danger-500/10 text-danger-600'
                  }`}>
                    {u.status}
                  </span>
                </td>
                <td className="p-3 text-right space-x-2">
                  <button className="px-2.5 py-1 text-xs font-medium rounded bg-surface-hover border border-subtle text-secondary hover:text-primary transition-colors">
                    <Pencil className="w-3.5 h-3.5 inline mr-1" />
                    Edit
                  </button>
                  <button onClick={() => removeUser(u.id)} className="px-2.5 py-1 text-xs font-medium rounded bg-danger-500/10 border border-danger-500/20 text-danger-600 hover:bg-danger-500/20 transition-colors">
                    <Trash2 className="w-3.5 h-3.5 inline mr-1" />
                    Revoke
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
