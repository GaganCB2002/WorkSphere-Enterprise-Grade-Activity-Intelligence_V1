import React, { useState } from 'react';
import { EmployeePageLayout } from '../../components/EmployeePageLayout';
import { GlassPanel } from '../../components/ui/GlassPanel';
import { Filter, Download, RefreshCw, Search, AlertTriangle } from 'lucide-react';

const alerts = [
  { id: 1, title: 'Server Outage Detected', message: 'The production server is experiencing connectivity issues. IT team has been notified and is investigating.', severity: 'Critical', timestamp: '2026-04-14 09:23', read: false },
  { id: 2, title: 'Password Expiry Reminder', message: 'Your password will expire in 7 days. Please update it to avoid access issues.', severity: 'Warning', timestamp: '2026-04-14 08:00', read: false },
  { id: 3, title: 'Payroll Processing Complete', message: 'March payroll has been processed. Payslips are now available in the Finance portal.', severity: 'Info', timestamp: '2026-04-13 17:30', read: true },
  { id: 4, title: 'Firewall Breach Attempt', message: 'Multiple unauthorized access attempts detected from external IPs. Security team has blocked the sources.', severity: 'Critical', timestamp: '2026-04-13 04:15', read: false },
  { id: 5, title: 'Quarterly Review Deadline', message: 'Self-assessments for Q2 are due by April 30. Please complete your submissions on time.', severity: 'Warning', timestamp: '2026-04-12 14:00', read: true },
  { id: 6, title: 'New Company Policy Update', message: 'The remote work policy has been updated. Please review the changes in the HR documents section.', severity: 'Info', timestamp: '2026-04-12 10:00', read: true },
  { id: 7, title: 'Database Migration Notice', message: 'Scheduled maintenance for database migration on April 16 from 2-4 AM. Systems will be unavailable.', severity: 'Warning', timestamp: '2026-04-11 11:30', read: false },
  { id: 8, title: 'License Expiration Warning', message: 'Adobe Creative Suite license expires in 14 days. Contact IT for renewal.', severity: 'Warning', timestamp: '2026-04-11 09:00', read: true },
  { id: 9, title: 'Office Closure Notice', message: 'The office will remain closed on April 18 for a public holiday.', severity: 'Info', timestamp: '2026-04-10 16:00', read: true },
  { id: 10, title: 'Data Backup Failure', message: 'Overnight backup for the HR database failed. Manual backup is required.', severity: 'Critical', timestamp: '2026-04-10 06:45', read: true },
];

const severityColors: Record<string, string> = {
  Critical: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  Warning: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  Info: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
};

const severityDots: Record<string, string> = {
  Critical: 'bg-red-500',
  Warning: 'bg-amber-500',
  Info: 'bg-blue-500',
};

export default function Alerts() {
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = alerts.filter(a =>
    a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <EmployeePageLayout
      title="Alerts"
      description="System alerts and notifications"
      breadcrumbs={['Employee', 'Notifications', 'Alerts']}
      actions={
        <div className="flex items-center gap-2">
          {[Filter, Download, RefreshCw].map((Icon, i) => (
            <button key={i} className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/[0.04] text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors">
              <Icon className="w-4 h-4" />
            </button>
          ))}
        </div>
      }
    >
      <GlassPanel className="p-4 flex items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/[0.04] rounded-xl flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400" />
          <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search alerts..." className="w-full text-xs bg-transparent text-slate-900 dark:text-white outline-none placeholder:text-slate-400" />
        </div>
      </GlassPanel>

      <div className="space-y-3">
        {filtered.map(a => (
          <GlassPanel key={a.id} className={`p-4 ${!a.read ? 'border-l-2 border-l-blue-500' : ''} ${a.severity === 'Critical' ? 'ring-1 ring-red-500/20' : ''}`}>
            <div className="flex items-start gap-3">
              <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${severityDots[a.severity]}`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className={`text-xs font-bold ${!a.read ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-400'}`}>{a.title}</span>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-lg ${severityColors[a.severity]}`}>{a.severity}</span>
                  {!a.read && <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />}
                </div>
                <p className={`text-xs ${!a.read ? 'text-slate-700 dark:text-slate-300' : 'text-slate-500 dark:text-slate-400'}`}>{a.message}</p>
                <p className="text-[10px] text-slate-400 mt-1">{a.timestamp}</p>
              </div>
            </div>
          </GlassPanel>
        ))}
      </div>
    </EmployeePageLayout>
  );
}
