// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { HardDrive, Database, Server, TrendingUp, Folder } from 'lucide-react';
import CtoPageShell from '../CtoPageShell';
import DataTable, { StatusBadge } from '../../../components/common/DataTable/DataTable';

const kpiData = [
  { label: 'Total Storage', value: '1.2PB', sub: 'Raw capacity provisioned', icon: HardDrive, color: 'text-blue-500' },
  { label: 'Used', value: '847TB', sub: '70.6% utilized', icon: Database, color: 'text-amber-500' },
  { label: 'Available', value: '377TB', sub: '29.4% free capacity', icon: Server, color: 'text-emerald-500' },
  { label: 'Growth Rate', value: '12%/mo', sub: '+8TB forecast next month', icon: TrendingUp, color: 'text-indigo-500' },
];

const storageUsage = [
  { month: 'Aug', used: 620, available: 604 },
  { month: 'Sep', used: 680, available: 544 },
  { month: 'Oct', used: 710, available: 514 },
  { month: 'Nov', used: 755, available: 469 },
  { month: 'Dec', used: 798, available: 426 },
  { month: 'Jan', used: 847, available: 377 },
];

const storageColumns = [
  { key: 'name', label: 'Volume Name' },
  { key: 'type', label: 'Type' },
  { key: 'capacity', label: 'Capacity' },
  { key: 'used', label: 'Used' },
  { key: 'mount', label: 'Mount Point' },
  { key: 'status', label: 'Status', render: (v) => <StatusBadge status={v} /> },
];

const storageData = [
  { name: 'nas-primary-01', type: 'NAS', capacity: '500TB', used: '380TB', mount: '/mnt/nas01', status: 'Online' },
  { name: 'san-prod-01', type: 'SAN', capacity: '256TB', used: '210TB', mount: '/mnt/san01', status: 'Online' },
  { name: 'san-prod-02', type: 'SAN', capacity: '256TB', used: '165TB', mount: '/mnt/san02', status: 'Online' },
  { name: 'object-store-01', type: 'Object', capacity: '120TB', used: '52TB', mount: 's3://data', status: 'Online' },
  { name: 'backup-nas-01', type: 'NAS', capacity: '100TB', used: '40TB', mount: '/mnt/backup', status: 'Degraded' },
  { name: 'cache-ssd-pool', type: 'NVMe', capacity: '24TB', used: '18TB', mount: '/mnt/cache', status: 'Online' },
  { name: 'archive-tape-01', type: 'Tape', capacity: '64TB', used: '42TB', mount: '/mnt/archive', status: 'Online' },
];

const Storage = () => (
  <CtoPageShell title="Storage" description="Storage infrastructure, capacity tracking, and usage trends" breadcrumbs={[{ label: 'CTO Dashboard', path: '/cto/executive-overview' }, { label: 'Storage' }]}>
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
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-6">Storage Usage Over Time (TB)</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={storageUsage}>
              <defs>
                <linearGradient id="usedGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/><stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/></linearGradient>
                <linearGradient id="availGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/><stop offset="95%" stopColor="#10b981" stopOpacity={0}/></linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dx={-10} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
              <Area type="monotone" dataKey="used" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#usedGrad)" name="Used" />
              <Area type="monotone" dataKey="available" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#availGrad)" name="Available" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-6">Storage Volumes</h3>
        <DataTable columns={storageColumns} data={storageData} pageSize={5} searchable />
      </div>
    </div>
  </CtoPageShell>
);

export default Storage;


