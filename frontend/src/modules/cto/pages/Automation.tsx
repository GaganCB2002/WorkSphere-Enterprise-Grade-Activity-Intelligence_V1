import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Play, CheckCircle2, BookOpen, Clock } from 'lucide-react';
import CtoPageShell from '../CtoPageShell';
import DataTable, { StatusBadge } from '../../../components/common/DataTable/DataTable';

const kpis = [
  { label: 'Automated Tasks', value: '84', sub: 'Active automations', icon: Play, color: 'text-blue-500' },
  { label: 'Success Rate', value: '98.7%', sub: '+0.5% from last month', icon: CheckCircle2, color: 'text-emerald-500' },
  { label: 'Runbooks', value: '24', sub: 'Available for execution', icon: BookOpen, color: 'text-purple-500' },
  { label: 'Saved Hours', value: '1,247', sub: 'This month', icon: Clock, color: 'text-indigo-500' },
];

const successData = [
  { month: 'Feb', rate: 96.2 }, { month: 'Mar', rate: 97.1 }, { month: 'Apr', rate: 97.8 },
  { month: 'May', rate: 98.2 }, { month: 'Jun', rate: 98.5 }, { month: 'Jul', rate: 98.7 },
];

const columns = [
  { key: 'name', label: 'Job Name' },
  { key: 'type', label: 'Type' },
  { key: 'schedule', label: 'Schedule' },
  { key: 'lastRun', label: 'Last Run' },
  { key: 'status', label: 'Status', render: (v: string) => <StatusBadge status={v} /> },
  { key: 'duration', label: 'Duration' },
];

const data = [
  { name: 'Database Backup', type: 'Backup', schedule: 'Daily 02:00', lastRun: '2h ago', status: 'Completed', duration: '24m 12s' },
  { name: 'Log Rotation', type: 'Maintenance', schedule: 'Hourly', lastRun: '18m ago', status: 'Completed', duration: '2m 48s' },
  { name: 'Security Scan', type: 'Security', schedule: 'Daily 04:00', lastRun: '6h ago', status: 'Completed', duration: '14m 24s' },
  { name: 'Report Generation', type: 'Reporting', schedule: 'Daily 08:00', lastRun: '6h ago', status: 'Completed', duration: '4m 12s' },
  { name: 'Cache Warmup', type: 'Maintenance', schedule: 'Every 6h', lastRun: '4h ago', status: 'Completed', duration: '8m 36s' },
  { name: 'DB Index Rebuild', type: 'Maintenance', schedule: 'Weekly Sun 02:00', lastRun: '2d ago', status: 'Failed', duration: '24m 18s' },
  { name: 'User Sync', type: 'Integration', schedule: 'Every 30min', lastRun: '8m ago', status: 'Completed', duration: '1m 24s' },
  { name: 'Report Generation', type: 'Reporting', schedule: 'Daily 08:00', lastRun: '6h ago', status: 'Completed', duration: '4m 48s' },
];

const Automation: React.FC = () => {
  return (
    <CtoPageShell
      title="Automation"
      description="Automated tasks, runbooks, and operational efficiency metrics"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{kpi.label}</div>
                <div className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">{kpi.value}</div>
              </div>
              <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
            </div>
            <div className="text-xs font-semibold text-slate-500 mt-4">{kpi.sub}</div>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-6">Automation Success Rate</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={successData}>
              <defs>
                <linearGradient id="autoGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
              <YAxis domain={[95, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dx={-10} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              <Area type="monotone" dataKey="rate" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#autoGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <DataTable columns={columns} data={data} searchable pageSize={10} />
    </CtoPageShell>
  );
};

export default Automation;
