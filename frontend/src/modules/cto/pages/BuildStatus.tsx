import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Play, PauseCircle, XCircle, CheckCircle, Activity } from 'lucide-react';
import CtoPageShell from '../CtoPageShell';
import DataTable, { StatusBadge } from '../../../components/common/DataTable/DataTable';

const kpiData = [
  { label: 'Running', value: '3', sub: 'Active builds', icon: Play, color: 'text-blue-500' },
  { label: 'Queued', value: '7', sub: 'Awaiting execution', icon: PauseCircle, color: 'text-amber-500' },
  { label: 'Failed', value: '2', sub: 'Build failures today', icon: XCircle, color: 'text-red-500' },
  { label: 'Success Rate', value: '94%', sub: 'Last 7 days', icon: CheckCircle, color: 'text-emerald-500' },
];

const columns = [
  { key: 'id', label: 'Build ID' },
  { key: 'project', label: 'Project' },
  { key: 'branch', label: 'Branch' },
  { key: 'status', label: 'Status', render: (v) => <StatusBadge status={v} /> },
  { key: 'progress', label: 'Progress' },
  { key: 'duration', label: 'Duration' },
  { key: 'triggeredBy', label: 'Triggered By' },
];

const data = [
  { id: '#8923', project: 'web-app', branch: 'main', status: 'Active', progress: '68%', duration: '4m 12s', triggeredBy: 'Sarah Chen' },
  { id: '#8922', project: 'api-gateway', branch: 'develop', status: 'Active', progress: '32%', duration: '2m 48s', triggeredBy: 'Mike Johnson' },
  { id: '#8921', project: 'mobile-app', branch: 'feature/auth', status: 'Active', progress: '15%', duration: '1m 05s', triggeredBy: 'Lisa Park' },
  { id: '#8920', project: 'data-pipeline', branch: 'main', status: 'Pending', progress: '—', duration: '—', triggeredBy: 'Tom Wilson' },
  { id: '#8919', project: 'web-app', branch: 'release/v3.2', status: 'Pending', progress: '—', duration: '—', triggeredBy: 'Anna Davis' },
  { id: '#8918', project: 'inventory-svc', branch: 'hotfix/stock', status: 'Failed', progress: '42%', duration: '3m 22s', triggeredBy: 'James Lee' },
  { id: '#8917', project: 'notification-svc', branch: 'develop', status: 'Active', progress: '91%', duration: '6m 37s', triggeredBy: 'Rachel Kim' },
  { id: '#8916', project: 'search-service', branch: 'main', status: 'Pending', progress: '—', duration: '—', triggeredBy: 'Sarah Chen' },
  { id: '#8915', project: 'payment-svc', branch: 'fix/refund', status: 'Failed', progress: '12%', duration: '0m 58s', triggeredBy: 'Mike Johnson' },
  { id: '#8914', project: 'auth-service', branch: 'main', status: 'Pending', progress: '—', duration: '—', triggeredBy: 'Lisa Park' },
];

const BuildStatus = () => (
  <CtoPageShell title="Build Status" description="Build monitoring with queue management and success tracking" breadcrumbs={[{ label: 'CTO Dashboard', path: '/cto/executive-overview' }, { label: 'Build Status' }]}>
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
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-6">Build Queue</h3>
        <DataTable columns={columns} data={data} pageSize={8} searchable />
      </div>
    </div>
  </CtoPageShell>
);

export default BuildStatus;

