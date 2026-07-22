import { useState } from 'react'
import { Shield, Check, X } from 'lucide-react'
import PageHeader from '../../components/layout/PageHeader'

const allRoles = [
  'SUPER_ADMIN', 'ADMIN', 'CEO', 'CTO', 'HR_MANAGER', 'HR_EXECUTIVE',
  'FINANCE_MANAGER', 'MARKETING_MANAGER', 'SALES_MANAGER', 'PROJECT_MANAGER',
  'TECH_LEAD', 'DEVOPS_ENGINEER', 'QA_ENGINEER', 'SOFTWARE_ENGINEER',
  'SECURITY_ANALYST', 'SUPPORT_AGENT', 'EMPLOYEE', 'INTERN'
]

const allPermissions = [
  'CREATE_USER', 'UPDATE_USER', 'DELETE_USER', 'VIEW_REPORT', 'MANAGE_EMPLOYEE',
  'TRACK_EMPLOYEE', 'VIEW_ANALYTICS', 'MANAGE_FINANCE', 'MANAGE_PROJECT',
  'VIEW_GPS', 'EXPORT_REPORT', 'AI_ACCESS', 'ADMIN_ACCESS'
]

function initMatrix() {
  const initial = {}
  allRoles.forEach(role => {
    initial[role] = {}
    allPermissions.forEach(perm => {
      if (role === 'SUPER_ADMIN') {
        initial[role][perm] = true
      } else if (role === 'CEO') {
        initial[role][perm] = perm !== 'CREATE_USER' && perm !== 'DELETE_USER' && perm !== 'ADMIN_ACCESS'
      } else if (role.includes('MANAGER') || role === 'CTO') {
        initial[role][perm] = perm !== 'DELETE_USER' && perm !== 'ADMIN_ACCESS'
      } else {
        initial[role][perm] = perm === 'VIEW_REPORT' || perm === 'VIEW_ANALYTICS'
      }
    })
  })
  return initial
}

export default function RbacPage() {
  const [matrix, setMatrix] = useState(initMatrix)

  const handleTogglePerm = (role, perm) => {
    if (role === 'SUPER_ADMIN') return
    setMatrix(prev => ({
      ...prev,
      [role]: {
        ...prev[role],
        [perm]: !prev[role][perm]
      }
    }))
  }

  return (
    <div className="flex-1 flex flex-col space-y-5 h-full bg-surface-secondary">
      <PageHeader
        title="Role-Based Access Control (RBAC)"
        description="Granular access control matrix for all enterprise roles."
        status="Security"
      />

      <div className="bg-surface-elevated border border-subtle rounded-lg">

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-hover border-b border-subtle">
              <th className="p-3 text-xs font-semibold text-secondary uppercase tracking-wider sticky left-0 bg-surface-hover z-20 border-r border-subtle min-w-[180px]">
                Enterprise Role
              </th>
              {allPermissions.map(perm => (
                <th key={perm} className="p-3 text-[11px] font-semibold text-secondary uppercase tracking-wider text-center min-w-[120px] border-r border-subtle">
                  {perm.replace(/_/g, ' ')}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-subtle">
            {allRoles.map(role => (
              <tr key={role} className="hover:bg-surface-hover transition-colors">
                <td className="p-3 text-sm font-medium text-primary sticky left-0 bg-surface z-10 border-r border-subtle flex items-center gap-2">
                  {role}
                  {role === 'SUPER_ADMIN' && <Shield className="w-3.5 h-3.5 text-brand-500" />}
                </td>
                {allPermissions.map(perm => {
                  const hasPerm = matrix[role]?.[perm] || false
                  return (
                    <td key={perm} className="p-2 text-center border-r border-subtle">
                      <button
                        onClick={() => handleTogglePerm(role, perm)}
                        disabled={role === 'SUPER_ADMIN'}
                        className={`w-7 h-7 rounded-lg flex items-center justify-center mx-auto transition-all ${
                          hasPerm
                            ? 'bg-success-500/10 border border-success-500/30 text-success-600'
                            : 'bg-surface-hover border border-subtle text-secondary hover:text-primary'
                        }`}
                      >
                        {hasPerm ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                      </button>
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
