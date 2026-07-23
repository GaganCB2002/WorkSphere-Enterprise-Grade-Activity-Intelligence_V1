import React from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CheckCircle2, AlertTriangle, TrendingUp, Shield } from 'lucide-react';
import CtoPageShell from '../CtoPageShell';
import DataTable, { StatusBadge } from '../../../components/common/DataTable/DataTable';

const kpis = [
  { label: 'Active SLAs', value: '18', icon: Shield, color: 'text-blue-500' },
  { label: 'Met', value: '16', icon: CheckCircle2, color: 'text-emerald-500' },
  { label: 'Breached', value: '2', icon: AlertTriangle, color: 'text-red-500' },
  { label: 'Compliance Rate', value: '94.2%', icon: TrendingUp, color: 'text-purple-500' },
];

const chartData = [
  { month: 'Jan', compliance: 96.2 }, { month: 'Feb', compliance: 95.8 }, { month: 'Mar', compliance: 94.5 },
  { month: 'Apr', compliance: 93.2 }, { month: 'May', compliance: 94.8 }, { month: 'Jun', compliance: 94.2 },
];

const columns = [
  { key: 'vendor', label: 'Vendor', sortable: true },
  { key: 'service', label: 'Service', sortable: true },
  { key: 'uptimeTarget', label: 'Uptime Target', sortable: true },
  { key: 'actual', label: 'Actual', sortable: true, render: (v) => <span className="text-emerald-600 font-semibold">{v}%</span> },
  { key: 'responseTime', label: 'Response Time' },
  { key: 'status', label: 'Status', render: (v) => <StatusBadge status={v} /> },
];

const data = [
  { id: 1, vendor: 'AWS', service: 'EC2 Compute', uptimeTarget: '99.99%', actual: 99.99, responseTime: '< 1 min', status: 'Met' },
  { id: 2, vendor: 'AWS', service: 'RDS Database', uptimeTarget: '99.95%', actual: 99.97, responseTime: '< 2 min', status: 'Met' },
  { id: 3, vendor: 'Azure', service: 'Virtual Machines', uptimeTarget: '99.95%', actual: 99.92, responseTime: '< 3 min', status: 'Met' },
  { id: 4, vendor: 'Azure', service: 'Azure SQL', uptimeTarget: '99.99%', actual: 99.98, responseTime: '< 1 min', status: 'Met' },
  { id: 5, vendor: 'GCP', service: 'Compute Engine', uptimeTarget: '99.95%', actual: 99.88, responseTime: '< 5 min', status: 'Breached' },
  { id: 6, vendor: 'Datadog', service: 'Monitoring', uptimeTarget: '99.9%', actual: 99.94, responseTime: '< 2 min', status: 'Met' },
  { id: 7, vendor: 'Cloudflare', service: 'CDN', uptimeTarget: '99.99%', actual: 99.99, responseTime: '< 1 min', status: 'Met' },
  { id: 8, vendor: 'Snowflake', service: 'Data Warehouse', uptimeTarget: '99.9%', actual: 99.82, responseTime: '< 10 min', status: 'Breached' },
  { id: 9, vendor: 'GitHub', service: 'Git Hosting', uptimeTarget: '99.95%', actual: 99.97, responseTime: '< 2 min', status: 'Met' },
  { id: 10, vendor: 'Atlassian', service: 'Jira Cloud', uptimeTarget: '99.9%', actual: 99.93, responseTime: '< 3 min', status: 'Met' },
];

const Sla = () => (
  <CtoPageShell title="SLA Monitoring" description="Track vendor SLA compliance, uptime, and response time adherence">
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{kpi.label}</div>
                <div className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">{kpi.value}</div>
              </div>
              <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
            </div>
          </motion.div>
        ))}
      </motion.div>
      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-6">SLA Compliance Trend</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs><linearGradient id="slaGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/><stop offset="95%" stopColor="#10b981" stopOpacity={0}/></linearGradient></defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dx={-10} domain={[90, 100]} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} formatter={(v) => `${v}%`} />
              <Area type="monotone" dataKey="compliance" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#slaGrad)" name="Compliance %" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-4">SLA Details</h3>
        <DataTable columns={columns} data={data} searchable pageSize={10} />
      </div>
    </div>
  </CtoPageShell>
);

export default Sla;

