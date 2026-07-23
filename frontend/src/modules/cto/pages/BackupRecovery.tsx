import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { HardDrive, CheckCircle2, AlertTriangle, Database, Clock, Shield } from 'lucide-react';
import CtoPageShell from '../CtoPageShell';
import DataTable, { StatusBadge } from '../../../components/common/DataTable/DataTable';

const kpis = [
  { label: 'Last Backup', value: '2h ago', sub: 'Full backup completed', icon: Clock, color: 'text-blue-500' },
  { label: 'Backup Success Rate', value: '99.8%', sub: '+0.1% from last month', icon: CheckCircle2, color: 'text-emerald-500' },
  { label: 'Recovery Tests', value: '12/12', sub: 'All tests passed', icon: Shield, color: 'text-purple-500' },
  { label: 'Data Protected', value: '847TB', sub: 'Across 12 data centers', icon: HardDrive, color: 'text-indigo-500' },
];

const timelineData = [
  { time: '00:00', rpo: 0 }, { time: '04:00', rpo: 15 }, { time: '08:00', rpo: 5 },
  { time: '12:00', rpo: 10 }, { time: '16:00', rpo: 0 }, { time: '20:00', rpo: 8 },
  { time: 'Now', rpo: 2 },
];

const columns = [
  { key: 'name', label: 'Job Name' },
  { key: 'type', label: 'Type' },
  { key: 'frequency', label: 'Frequency' },
  { key: 'lastBackup', label: 'Last Backup' },
  { key: 'size', label: 'Size' },
  { key: 'status', label: 'Status', render: (v: string) => <StatusBadge status={v} /> },
  { key: 'retention', label: 'Retention' },
];

const data = [
  { name: 'Full Database Backup', type: 'Full', frequency: 'Daily', lastBackup: '2h ago', size: '2.4TB', status: 'Completed', retention: '30 days' },
  { name: 'Transaction Logs', type: 'Incremental', frequency: 'Every 15min', lastBackup: '12m ago', size: '128GB', status: 'Completed', retention: '7 days' },
  { name: 'File Server Backup', type: 'Full', frequency: 'Weekly', lastBackup: '2d ago', size: '4.7TB', status: 'Completed', retention: '90 days' },
  { name: 'Configuration Backup', type: 'Full', frequency: 'Daily', lastBackup: '4h ago', size: '12GB', status: 'Completed', retention: '30 days' },
  { name: 'Database Logs', type: 'Incremental', frequency: 'Hourly', lastBackup: '45m ago', size: '84GB', status: 'Completed', retention: '48 hours' },
  { name: 'VM Snapshots', type: 'Snapshot', frequency: 'Weekly', lastBackup: '3d ago', size: '12TB', status: 'Completed', retention: '4 weeks' },
  { name: 'Application Config', type: 'Full', frequency: 'Daily', lastBackup: '6h ago', size: '8GB', status: 'Failed', retention: '14 days' },
];

const BackupRecovery: React.FC = () => {
  return (
    <CtoPageShell
      title="Backup & Recovery"
      description="Monitor backup jobs, recovery points, and data protection status"
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-6">Recovery Point Timeline (RPO in minutes)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={timelineData}>
                <defs>
                  <linearGradient id="rpoGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dx={-10} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Area type="monotone" dataKey="rpo" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#rpoGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="lg:col-span-1 bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-4">Recovery Summary</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-emerald-50 dark:bg-emerald-500/10 rounded-lg border border-emerald-100 dark:border-emerald-500/20">
              <div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">RPO</div>
                <div className="text-lg font-extrabold text-slate-900 dark:text-white mt-1">2 min</div>
              </div>
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            </div>
            <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-500/10 rounded-lg border border-blue-100 dark:border-blue-500/20">
              <div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">RTO</div>
                <div className="text-lg font-extrabold text-slate-900 dark:text-white mt-1">15 min</div>
              </div>
              <Clock className="w-5 h-5 text-blue-500" />
            </div>
            <div className="flex justify-between items-center p-3 bg-purple-50 dark:bg-purple-500/10 rounded-lg border border-purple-100 dark:border-purple-500/20">
              <div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Last Recovery Test</div>
                <div className="text-lg font-extrabold text-slate-900 dark:text-white mt-1">Passed</div>
              </div>
              <CheckCircle2 className="w-5 h-5 text-purple-500" />
            </div>
          </div>
        </div>
      </div>

      <DataTable columns={columns} data={data} searchable pageSize={10} />
    </CtoPageShell>
  );
};

export default BackupRecovery;
