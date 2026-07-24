import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Rocket, Clock, CheckCircle, RotateCcw, Activity } from 'lucide-react';
import CtoPageShell from '../CtoPageShell';
import DataTable, { StatusBadge } from '../../../components/common/DataTable/DataTable';

const kpiData = [
  { label: 'Total Releases', value: '342', sub: 'All-time releases', icon: Rocket, color: 'text-blue-500' },
  { label: 'Pending', value: '12', sub: 'Awaiting deployment', icon: Clock, color: 'text-amber-500' },
  { label: 'Success Rate', value: '98.7%', sub: 'Last 30 days', icon: CheckCircle, color: 'text-emerald-500' },
  { label: 'Rollbacks', value: '8', sub: 'This quarter', icon: RotateCcw, color: 'text-red-500' },
];

const timelineData = [
  { month: 'Jan', releases: 28, success: 27, failed: 1 },
  { month: 'Feb', releases: 32, success: 31, failed: 1 },
  { month: 'Mar', releases: 30, success: 30, failed: 0 },
  { month: 'Apr', releases: 35, success: 34, failed: 1 },
  { month: 'May', releases: 29, success: 29, failed: 0 },
  { month: 'Jun', releases: 34, success: 33, failed: 1 },
];

const columns = [
  { key: 'version', label: 'Version' },
  { key: 'service', label: 'Service' },
  { key: 'environment', label: 'Environment' },
  { key: 'status', label: 'Status', render: (v: any) => <StatusBadge status={v} /> },
  { key: 'deployedBy', label: 'Deployed By' },
  { key: 'date', label: 'Date' },
  { key: 'rollback', label: 'Rollback' },
];

const data = [
  { version: 'v3.2.1', service: 'user-service', environment: 'Production', status: 'Active', deployedBy: 'Sarah Chen', date: '2026-07-22', rollback: 'No' },
  { version: 'v2.8.4', service: 'order-service', environment: 'Production', status: 'Active', deployedBy: 'Mike Johnson', date: '2026-07-21', rollback: 'No' },
  { version: 'v4.1.0', service: 'payment-service', environment: 'GitBranch', status: 'Active', deployedBy: 'Lisa Park', date: '2026-07-20', rollback: 'No' },
  { version: 'v1.9.3', service: 'notification-service', environment: 'Production', status: 'Rolled Back', deployedBy: 'Tom Wilson', date: '2026-07-19', rollback: 'Yes' },
  { version: 'v5.0.2', service: 'inventory-service', environment: 'GitBranch', status: 'Pending', deployedBy: 'Anna Davis', date: '2026-07-18', rollback: 'No' },
  { version: 'v3.5.0', service: 'auth-service', environment: 'Production', status: 'Active', deployedBy: 'James Lee', date: '2026-07-17', rollback: 'No' },
  { version: 'v2.2.1', service: 'search-service', environment: 'Production', status: 'Failed', deployedBy: 'Rachel Kim', date: '2026-07-16', rollback: 'Yes' },
];

const Releases = () => (
  <CtoPageShell title="Releases" description="Release management, timeline view, and deployment tracking" breadcrumbs={[{ label: 'CTO Dashboard', path: '/cto/executive-overview' }, { label: 'Releases' }]}>
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
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-6">Release Timeline</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={timelineData}>
              <defs>
                <linearGradient id="relGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/><stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/></linearGradient>
                <linearGradient id="failGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#ef4444" stopOpacity={0.1}/><stop offset="95%" stopColor="#ef4444" stopOpacity={0}/></linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dx={-10} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
              <Area type="monotone" dataKey="releases" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#relGrad)" name="Total Releases" />
              <Area type="monotone" dataKey="failed" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#failGrad)" name="Failed" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-6">Recent Releases</h3>
        <DataTable columns={columns} data={data} pageSize={5} searchable />
      </div>
    </div>
  </CtoPageShell>
);

export default Releases;



