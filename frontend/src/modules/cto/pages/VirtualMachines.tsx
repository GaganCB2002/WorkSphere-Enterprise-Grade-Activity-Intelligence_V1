import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Monitor, Play, Square, BarChart3, Cpu, HardDrive, HardDrive as Memory } from 'lucide-react';
import CtoPageShell from '../CtoPageShell';
import DataTable, { StatusBadge } from '../../../components/common/DataTable/DataTable';

const kpiData = [
  { label: 'Total VMs', value: '84', sub: 'Across all hosts', icon: Monitor, color: 'text-blue-500' },
  { label: 'Running', value: '72', sub: 'Active workloads', icon: Play, color: 'text-emerald-500' },
  { label: 'Stopped', value: '12', sub: 'Deallocated', icon: Square, color: 'text-slate-500' },
  { label: 'Avg Utilization', value: '62%', sub: 'CPU + Memory avg', icon: BarChart3, color: 'text-amber-500' },
];

const resourceByVM = [
  { name: 'VM-Web-01', vcpu: 8, ram: 32, disk: 100 },
  { name: 'VM-Web-02', vcpu: 8, ram: 32, disk: 100 },
  { name: 'VM-App-01', vcpu: 16, ram: 64, disk: 256 },
  { name: 'VM-App-02', vcpu: 16, ram: 64, disk: 256 },
  { name: 'VM-DB-01', vcpu: 32, ram: 128, disk: 1024 },
  { name: 'VM-Cache-01', vcpu: 4, ram: 64, disk: 64 },
];

const vmColumns = [
  { key: 'name', label: 'VM Name' },
  { key: 'vcpu', label: 'vCPU' },
  { key: 'ram', label: 'RAM' },
  { key: 'disk', label: 'Disk' },
  { key: 'os', label: 'OS' },
  { key: 'status', label: 'Status', render: (v) => <StatusBadge status={v} /> },
  { key: 'host', label: 'Host' },
];

const vmData = [
  { name: 'VM-WEB-01', vcpu: 8, ram: '32GB', disk: '100GB', os: 'Ubuntu 22.04', status: 'Running', host: 'esxi-01' },
  { name: 'VM-WEB-02', vcpu: 8, ram: '32GB', disk: '100GB', os: 'Ubuntu 22.04', status: 'Running', host: 'esxi-01' },
  { name: 'VM-APP-01', vcpu: 16, ram: '64GB', disk: '256GB', os: 'Debian 12', status: 'Running', host: 'esxi-02' },
  { name: 'VM-APP-02', vcpu: 16, ram: '64GB', disk: '256GB', os: 'Debian 12', status: 'Running', host: 'esxi-02' },
  { name: 'VM-DB-01', vcpu: 32, ram: '128GB', disk: '1TB', os: 'RHEL 9', status: 'Running', host: 'esxi-03' },
  { name: 'VM-DB-02', vcpu: 32, ram: '128GB', disk: '1TB', os: 'RHEL 9', status: 'Stopped', host: 'esxi-03' },
  { name: 'VM-CACHE-01', vcpu: 4, ram: '64GB', disk: '64GB', os: 'Alpine 3.19', status: 'Running', host: 'esxi-01' },
  { name: 'VM-BUILD-01', vcpu: 16, ram: '32GB', disk: '500GB', os: 'Ubuntu 22.04', status: 'Stopped', host: 'esxi-04' },
];

const VirtualMachines = () => (
  <CtoPageShell title="Virtual Machines" description="VM inventory, resource allocation, and utilization monitoring" breadcrumbs={[{ label: 'CTO Dashboard', path: '/cto/executive-overview' }, { label: 'Virtual Machines' }]}>
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
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-6">Resource by VM</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={resourceByVM}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dx={-10} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
              <Bar dataKey="vcpu" fill="#3b82f6" radius={[4, 4, 0, 0]} name="vCPU" />
              <Bar dataKey="ram" fill="#8b5cf6" radius={[4, 4, 0, 0]} name="RAM (GB)" />
              <Bar dataKey="disk" fill="#10b981" radius={[4, 4, 0, 0]} name="Disk (GB)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-6">Virtual Machines</h3>
        <DataTable columns={vmColumns} data={vmData} pageSize={5} searchable />
      </div>
    </div>
  </CtoPageShell>
);

export default VirtualMachines;


