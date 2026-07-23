// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Rocket, Server, GitBranch, CheckCircle, Activity } from 'lucide-react';
import CtoPageShell from '../CtoPageShell';
import DataTable, { StatusBadge } from '../../../components/common/DataTable/DataTable';

const kpiData = [
  { label: 'Total Deployments', value: '847', sub: 'All environments', icon: Rocket, color: 'text-blue-500' },
  { label: 'Production', value: '342', sub: 'Live deployments', icon: Server, color: 'text-emerald-500' },
  { label: 'GitBranch', value: '505', sub: 'Pre-prod deployments', icon: GitBranch, color: 'text-amber-500' },
  { label: 'Success Rate', value: '99.2%', sub: 'Last 30 days', icon: CheckCircle, color: 'text-indigo-500' },
];

const deploymentFrequency = [
  { month: 'Jan', production: 18, GitBranch: 35 },
  { month: 'Feb', production: 22, GitBranch: 40 },
  { month: 'Mar', production: 20, GitBranch: 38 },
  { month: 'Apr', production: 25, GitBranch: 42 },
  { month: 'May', production: 19, GitBranch: 36 },
  { month: 'Jun', production: 24, GitBranch: 44 },
];

const columns = [
  { key: 'id', label: 'Deploy ID' },
  { key: 'service', label: 'Service' },
  { key: 'environment', label: 'Environment' },
  { key: 'version', label: 'Version' },
  { key: 'status', label: 'Status', render: (v) => <StatusBadge status={v} /> },
  { key: 'deployedBy', label: 'Deployed By' },
  { key: 'time', label: 'Time' },
];

const data = [
  { id: 'DEP-3842', service: 'user-service', environment: 'Production', version: 'v3.2.1', status: 'Active', deployedBy: 'Sarah Chen', time: '14:32 UTC' },
  { id: 'DEP-3841', service: 'order-service', environment: 'GitBranch', version: 'v2.8.5', status: 'Active', deployedBy: 'Mike Johnson', time: '13:15 UTC' },
  { id: 'DEP-3840', service: 'payment-service', environment: 'Production', version: 'v4.1.0', status: 'Active', deployedBy: 'Lisa Park', time: '12:00 UTC' },
  { id: 'DEP-3839', service: 'notification-service', environment: 'GitBranch', version: 'v1.9.4', status: 'Failed', deployedBy: 'Tom Wilson', time: '10:45 UTC' },
  { id: 'DEP-3838', service: 'inventory-service', environment: 'Production', version: 'v5.0.2', status: 'Active', deployedBy: 'Anna Davis', time: '09:30 UTC' },
  { id: 'DEP-3837', service: 'auth-service', environment: 'GitBranch', version: 'v3.5.1', status: 'Pending', deployedBy: 'James Lee', time: '08:20 UTC' },
  { id: 'DEP-3836', service: 'search-service', environment: 'Production', version: 'v2.2.1', status: 'Active', deployedBy: 'Rachel Kim', time: '07:10 UTC' },
];

const Deployments = () => (
  <CtoPageShell title="Deployments" description="Deployment dashboard with frequency tracking and environment breakdown" breadcrumbs={[{ label: 'CTO Dashboard', path: '/cto/executive-overview' }, { label: 'Deployments' }]}>
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
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-6">Deployment Frequency</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={deploymentFrequency}>
              <defs>
                <linearGradient id="prodGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/><stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/></linearGradient>
                <linearGradient id="stageGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#f59e0b" stopOpacity={0.1}/><stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/></linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dx={-10} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
              <Area type="monotone" dataKey="production" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#prodGrad)" name="Production" />
              <Area type="monotone" dataKey="GitBranch" stroke="#f59e0b" strokeWidth={2} fillOpacity={1} fill="url(#stageGrad)" name="GitBranch" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-6">Recent Deployments</h3>
        <DataTable columns={columns} data={data} pageSize={5} searchable />
      </div>
    </div>
  </CtoPageShell>
);

export default Deployments;



