// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, CalendarCheck, CalendarClock, CheckCircle, Clock, User } from 'lucide-react';
import CtoPageShell from '../CtoPageShell';
import DataTable, { StatusBadge } from '../../../components/common/DataTable/DataTable';

const kpiData = [
  { label: 'Scheduled', value: '8', sub: 'Upcoming releases', icon: Calendar, color: 'text-blue-500' },
  { label: 'This Week', value: '3', sub: 'Releases this week', icon: CalendarClock, color: 'text-amber-500' },
  { label: 'Approved', value: '5', sub: 'Ready to deploy', icon: CheckCircle, color: 'text-emerald-500' },
  { label: 'Pending Approval', value: '3', sub: 'Awaiting sign-off', icon: Clock, color: 'text-indigo-500' },
];

const upcomingReleases = [
  { date: '2026-07-24', version: 'v3.2.2', service: 'user-service', environment: 'Production', owner: 'Sarah Chen' },
  { date: '2026-07-25', version: 'v2.8.5', service: 'order-service', environment: 'Production', owner: 'Mike Johnson' },
  { date: '2026-07-26', version: 'v4.1.1', service: 'payment-service', environment: 'GitBranch', owner: 'Lisa Park' },
  { date: '2026-07-28', version: 'v1.9.4', service: 'notification-service', environment: 'Production', owner: 'Tom Wilson' },
  { date: '2026-07-30', version: 'v5.0.3', service: 'inventory-service', environment: 'Production', owner: 'Anna Davis' },
  { date: '2026-08-02', version: 'v3.5.1', service: 'auth-service', environment: 'GitBranch', owner: 'James Lee' },
  { date: '2026-08-05', version: 'v2.2.2', service: 'search-service', environment: 'Production', owner: 'Rachel Kim' },
  { date: '2026-08-10', version: 'v6.0.0', service: 'web-app', environment: 'Production', owner: 'Sarah Chen' },
];

const columns = [
  { key: 'version', label: 'Version' },
  { key: 'service', label: 'Service' },
  { key: 'environment', label: 'Environment' },
  { key: 'scheduledDate', label: 'Scheduled Date' },
  { key: 'status', label: 'Status', render: (v) => <StatusBadge status={v} /> },
  { key: 'owner', label: 'Owner' },
];

const data = [
  { version: 'v3.2.2', service: 'user-service', environment: 'Production', scheduledDate: '2026-07-24', status: 'Approved', owner: 'Sarah Chen' },
  { version: 'v2.8.5', service: 'order-service', environment: 'Production', scheduledDate: '2026-07-25', status: 'Approved', owner: 'Mike Johnson' },
  { version: 'v4.1.1', service: 'payment-service', environment: 'GitBranch', scheduledDate: '2026-07-26', status: 'Pending', owner: 'Lisa Park' },
  { version: 'v1.9.4', service: 'notification-service', environment: 'Production', scheduledDate: '2026-07-28', status: 'Pending', owner: 'Tom Wilson' },
  { version: 'v5.0.3', service: 'inventory-service', environment: 'Production', scheduledDate: '2026-07-30', status: 'Approved', owner: 'Anna Davis' },
  { version: 'v3.5.1', service: 'auth-service', environment: 'GitBranch', scheduledDate: '2026-08-02', status: 'Pending', owner: 'James Lee' },
  { version: 'v2.2.2', service: 'search-service', environment: 'Production', scheduledDate: '2026-08-05', status: 'Approved', owner: 'Rachel Kim' },
  { version: 'v6.0.0', service: 'web-app', environment: 'Production', scheduledDate: '2026-08-10', status: 'Pending', owner: 'Sarah Chen' },
];

const ReleaseCalendar = () => (
  <CtoPageShell title="Release Calendar" description="Release scheduling, approvals, and upcoming deployments" breadcrumbs={[{ label: 'CTO Dashboard', path: '/cto/executive-overview' }, { label: 'Release Calendar' }]}>
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData.map((kpi, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{kpi.label}</div>
                <div className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">{kpi.value}</div>
              </div>
              <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
            </div>
            <div className="text-xs font-semibold text-slate-500 mt-4">{kpi.sub}</div>
          </motion.div>
        ))}
      </motion.div>

      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-4">Upcoming Releases</h3>
        <div className="space-y-2">
          {upcomingReleases.map((r, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-900 dark:text-white">{r.version} — {r.service}</div>
                  <div className="text-xs text-slate-500">{r.environment} • {r.owner}</div>
                </div>
              </div>
              <div className="text-sm font-medium text-slate-700 dark:text-slate-300">{r.date}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-6">Scheduled Releases</h3>
        <DataTable columns={columns} data={data} pageSize={5} searchable />
      </div>
    </div>
  </CtoPageShell>
);

export default ReleaseCalendar;



