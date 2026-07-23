import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Monitor, Database, FolderOpen, Code, Cloud, Globe, DollarSign } from 'lucide-react';
import CtoPageShell from '../CtoPageShell';
import DataTable, { StatusBadge } from '../../../components/common/DataTable/DataTable';

const kpiData = [
  { label: 'VMs', value: '18', sub: 'Azure Virtual Machines', icon: Monitor, color: 'text-blue-500' },
  { label: 'SQL Databases', value: '6', sub: 'Azure SQL & Managed Instances', icon: Database, color: 'text-emerald-500' },
  { label: 'Storage Accounts', value: '12', sub: 'Blob, Files, Queues', icon: FolderOpen, color: 'text-amber-500' },
  { label: 'Functions', value: '64', sub: 'Azure Functions', icon: Code, color: 'text-indigo-500' },
];

const azureCost = [
  { service: 'VMs', cost: 28.4 },
  { service: 'SQL Database', cost: 14.6 },
  { service: 'Storage', cost: 8.2 },
  { service: 'Functions', cost: 6.8 },
  { service: 'AKS', cost: 10.4 },
  { service: 'CDN', cost: 4.2 },
  { service: 'Other', cost: 11.6 },
];

const azureColumns = [
  { key: 'name', label: 'Resource Name' },
  { key: 'type', label: 'Type' },
  { key: 'region', label: 'Region' },
  { key: 'status', label: 'Status', render: (v) => <StatusBadge status={v} /> },
  { key: 'cost', label: 'Cost/Month' },
];

const azureData = [
  { name: 'vm-web-01', type: 'VM', region: 'eastus', status: 'Running', cost: '$840' },
  { name: 'vm-web-02', type: 'VM', region: 'eastus', status: 'Running', cost: '$840' },
  { name: 'vm-app-01', type: 'VM', region: 'westeurope', status: 'Running', cost: '$1,240' },
  { name: 'sql-primary', type: 'SQL Database', region: 'eastus', status: 'Active', cost: '$4,200' },
  { name: 'sql-standby', type: 'SQL Database', region: 'westus', status: 'Active', cost: '$2,100' },
  { name: 'data-lake', type: 'Storage Account', region: 'eastus', status: 'Active', cost: '$1,850' },
  { name: 'backup-storage', type: 'Storage Account', region: 'westus', status: 'Active', cost: '$980' },
  { name: 'order-processor', type: 'Function App', region: 'eastus', status: 'Active', cost: '$340' },
  { name: 'aks-cluster-prod', type: 'AKS', region: 'eastus', status: 'Active', cost: '$3,200' },
];

const Azure = () => (
  <CtoPageShell title="Azure" description="Microsoft Azure resource inventory and cost tracking" breadcrumbs={[{ label: 'CTO Dashboard', path: '/cto/executive-overview' }, { label: 'Azure' }]}>
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
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-6">Monthly Cost by Service ($K)</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={azureCost} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
              <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
              <YAxis type="category" dataKey="service" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} width={110} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
              <Bar dataKey="cost" fill="#0078d4" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-6">Azure Resources</h3>
        <DataTable columns={azureColumns} data={azureData} pageSize={5} searchable />
      </div>
    </div>
  </CtoPageShell>
);

export default Azure;

