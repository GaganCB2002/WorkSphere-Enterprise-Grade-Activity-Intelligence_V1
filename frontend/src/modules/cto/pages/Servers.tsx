import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Server, Monitor, Wifi, Activity, Cpu, HardDrive, HardDrive as Memory } from 'lucide-react';
import CtoPageShell from '../CtoPageShell';
import DataTable, { StatusBadge } from '../../../components/common/DataTable/DataTable';

const kpiData = [
  { label: 'Total Servers', value: '64', sub: 'Bare metal & virtualized', icon: Server, color: 'text-blue-500' },
  { label: 'Online', value: '62', sub: 'All services operational', icon: Monitor, color: 'text-emerald-500' },
  { label: 'Offline', value: '2', sub: 'Under maintenance', icon: Wifi, color: 'text-red-500' },
  { label: 'Avg Load', value: '47%', sub: 'Within acceptable range', icon: Activity, color: 'text-amber-500' },
];

const resourceByGroup = [
  { group: 'Web Servers', cpu: 52, memory: 48, disk: 38 },
  { group: 'App Servers', cpu: 68, memory: 72, disk: 42 },
  { group: 'DB Servers', cpu: 45, memory: 82, disk: 76 },
  { group: 'Cache Nodes', cpu: 28, memory: 55, disk: 22 },
  { group: 'Worker Nodes', cpu: 72, memory: 65, disk: 35 },
  { group: 'Storage Nodes', cpu: 18, memory: 32, disk: 88 },
];

const serverColumns = [
  { key: 'name', label: 'Server Name' },
  { key: 'ip', label: 'IP Address' },
  { key: 'os', label: 'OS' },
  { key: 'cpu', label: 'CPU' },
  { key: 'memory', label: 'Memory' },
  { key: 'disk', label: 'Disk' },
  { key: 'load', label: 'Load' },
  { key: 'status', label: 'Status', render: (v: any) => <StatusBadge status={v} /> },
];

const serverData = [
  { name: 'web-01', ip: '10.0.1.10', os: 'Ubuntu 22.04', cpu: '8 vCPU', memory: '32GB', disk: '256GB SSD', load: '45%', status: 'Online' },
  { name: 'web-02', ip: '10.0.1.11', os: 'Ubuntu 22.04', cpu: '8 vCPU', memory: '32GB', disk: '256GB SSD', load: '52%', status: 'Online' },
  { name: 'web-03', ip: '10.0.1.12', os: 'Ubuntu 22.04', cpu: '8 vCPU', memory: '32GB', disk: '256GB SSD', load: '38%', status: 'Online' },
  { name: 'app-01', ip: '10.0.2.10', os: 'Debian 12', cpu: '16 vCPU', memory: '64GB', disk: '512GB NVMe', load: '72%', status: 'Online' },
  { name: 'app-02', ip: '10.0.2.11', os: 'Debian 12', cpu: '16 vCPU', memory: '64GB', disk: '512GB NVMe', load: '68%', status: 'Online' },
  { name: 'db-01', ip: '10.0.3.10', os: 'RHEL 9', cpu: '32 vCPU', memory: '128GB', disk: '4TB SSD', load: '42%', status: 'Online' },
  { name: 'db-02', ip: '10.0.3.11', os: 'RHEL 9', cpu: '32 vCPU', memory: '128GB', disk: '4TB SSD', load: '0%', status: 'Offline' },
  { name: 'cache-01', ip: '10.0.4.10', os: 'Alpine 3.19', cpu: '4 vCPU', memory: '64GB', disk: '128GB SSD', load: '28%', status: 'Online' },
];

const Servers = () => (
  <CtoPageShell title="Servers" description="Server infrastructure inventory, health, and resource utilization" breadcrumbs={[{ label: 'CTO Dashboard', path: '/cto/executive-overview' }, { label: 'Servers' }]}>
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
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-6">CPU / Memory / Disk by Server Group (%)</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={resourceByGroup}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="group" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dx={-10} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
              <Legend />
              <Bar dataKey="cpu" fill="#3b82f6" radius={[4, 4, 0, 0]} name="CPU" />
              <Bar dataKey="memory" fill="#8b5cf6" radius={[4, 4, 0, 0]} name="Memory" />
              <Bar dataKey="disk" fill="#10b981" radius={[4, 4, 0, 0]} name="Disk" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-6">Servers</h3>
        <DataTable columns={serverColumns} data={serverData} pageSize={5} searchable />
      </div>
    </div>
  </CtoPageShell>
);

export default Servers;



