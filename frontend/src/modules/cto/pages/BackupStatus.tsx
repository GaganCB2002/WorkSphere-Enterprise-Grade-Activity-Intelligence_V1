// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { HardDrive, CheckCircle2, AlertTriangle, Shield } from 'lucide-react';
import CtoPageShell from '../CtoPageShell';
import DataTable, { StatusBadge } from '../../../components/common/DataTable/DataTable';

const kpis = [
  { label: 'Total Backups', value: '342', icon: HardDrive, color: 'text-blue-500' },
  { label: 'Success Rate', value: '99.2%', icon: CheckCircle2, color: 'text-emerald-500' },
  { label: 'Failed', value: '3', icon: AlertTriangle, color: 'text-red-500' },
  { label: 'Data Protected', value: '847TB', icon: Shield, color: 'text-purple-500' },
];

const chartData = [
  { month: 'Jan', size: 780 }, { month: 'Feb', size: 795 }, { month: 'Mar', size: 812 },
  { month: 'Apr', size: 808 }, { month: 'May', size: 834 }, { month: 'Jun', size: 847 },
];

const columns = [
  { key: 'name', label: 'Job Name', sortable: true },
  { key: 'type', label: 'Type', sortable: true },
  { key: 'database', label: 'Database', sortable: true },
  { key: 'lastBackup', label: 'Last Backup' },
  { key: 'size', label: 'Size', sortable: true },
  { key: 'status', label: 'Status', render: (v) => <StatusBadge status={v} /> },
  { key: 'retention', label: 'Retention' },
];

const data = [
  { id: 1, name: 'Full-DB-Backup', type: 'Full', database: 'CoreDB-Primary', lastBackup: '2 hr ago', size: '1.2TB', status: 'Completed', retention: '30 days' },
  { id: 2, name: 'Incremental-DB', type: 'Incremental', database: 'CoreDB-Primary', lastBackup: '15 min ago', size: '84GB', status: 'Completed', retention: '7 days' },
  { id: 3, name: 'WAL-Archive', type: 'Continuous', database: 'All PostgreSQL', lastBackup: '1 min ago', size: '12GB', status: 'Completed', retention: '14 days' },
  { id: 4, name: 'Mongo-Snapshot', type: 'Snapshot', database: 'CatalogDB', lastBackup: '6 hr ago', size: '210GB', status: 'Completed', retention: '30 days' },
  { id: 5, name: 'Redis-Dump', type: 'Full', database: 'SessionStore', lastBackup: '1 hr ago', size: '64GB', status: 'Completed', retention: '3 days' },
  { id: 6, name: 'Warehouse-Export', type: 'Full', database: 'Snowflake', lastBackup: '12 hr ago', size: '3.8TB', status: 'Completed', retention: '90 days' },
  { id: 7, name: 'Config-Backup', type: 'Incremental', database: 'Etcd Cluster', lastBackup: '4 hr ago', size: '2GB', status: 'Failed', retention: '30 days' },
  { id: 8, name: 'Weekly-Archive', type: 'Full', database: 'All Systems', lastBackup: '2 days ago', size: '8.4TB', status: 'Completed', retention: '1 year' },
];

const BackupStatus = () => (
  <CtoPageShell title="Backup Status" description="Monitor backup jobs, success rates, and data protection metrics">
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
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-6">Backup Size Trend (TB)</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs><linearGradient id="backupGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/><stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/></linearGradient></defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dx={-10} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
              <Area type="monotone" dataKey="size" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#backupGrad)" name="Size (TB)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-4">Backup Jobs</h3>
        <DataTable columns={columns} data={data} searchable pageSize={8} />
      </div>
    </div>
  </CtoPageShell>
);

export default BackupStatus;


