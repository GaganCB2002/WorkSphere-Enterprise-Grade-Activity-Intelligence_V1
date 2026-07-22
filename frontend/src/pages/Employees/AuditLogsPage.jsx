import { Terminal } from 'lucide-react'
import PageHeader from '../../components/layout/PageHeader'

const logEntries = [
  { time: '2026-06-01T12:01:00Z', type: 'SUCCESS', message: 'Admin Gagan CB logged in from IP 192.168.1.1', color: 'text-success-600' },
  { time: '2026-06-01T12:05:22Z', type: 'INFO', message: 'DB Snapshot requested by ROOT', color: 'text-info-500' },
  { time: '2026-06-01T12:15:00Z', type: 'SUCCESS', message: 'RBAC Matrix updated for role MARKETING_MANAGER', color: 'text-success-600' },
  { time: '2026-06-01T12:30:11Z', type: 'CRITICAL', message: 'Unauthorized API access attempt from IP 45.22.11.9', color: 'text-danger-500' },
  { time: '2026-06-01T12:31:00Z', type: 'WARN', message: 'User USR-003 status changed to SUSPENDED', color: 'text-warning-500' },
]

export default function AuditLogsPage() {
  return (
    <div className="flex-1 flex flex-col space-y-5 h-full bg-surface-secondary">
      <PageHeader
        title="Global Audit Logs (WORM Storage)"
        description="Immutable ledger of all administrative and security events."
        status="Immutable"
      />

      <div className="bg-surface-elevated border border-subtle rounded-lg flex flex-col h-[70vh]">

      <div className="flex-1 overflow-y-auto p-5 font-mono text-xs space-y-2">
        <div className="text-secondary mb-2">Connected to global log stream...</div>
        {logEntries.map((entry, i) => (
          <div key={i} className={entry.color}>
            <span className="text-secondary">[{entry.time}]</span>{' '}
            <span className="font-semibold">{entry.type}:</span>{' '}
            {entry.message}
          </div>
        ))}
        <div className="text-secondary mt-4">Waiting for new events...</div>
      </div>
      </div>
    </div>
  )
}
