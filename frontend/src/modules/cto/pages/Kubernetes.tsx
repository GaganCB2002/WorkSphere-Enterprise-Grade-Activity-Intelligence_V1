import React from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Container, Server, Layers, Box, Cpu, HardDrive, Activity } from 'lucide-react';
import CtoPageShell from '../CtoPageShell';
import DataTable, { StatusBadge } from '../../../components/common/DataTable/DataTable';

const kpiData = [
  { label: 'Clusters', value: '3', sub: 'Prod, GitBranch, Dev', icon: Container, color: 'text-blue-500' },
  { label: 'Nodes', value: '24', sub: '8 per cluster avg', icon: Server, color: 'text-indigo-500' },
  { label: 'Pods', value: '342', sub: 'Across all namespaces', icon: Layers, color: 'text-emerald-500' },
  { label: 'Deployments', value: '84', sub: 'Rollout status tracked', icon: Box, color: 'text-amber-500' },
];

const clusterUsage = [
  { month: 'Jan', cpu: 62, memory: 58, storage: 42 },
  { month: 'Feb', cpu: 65, memory: 61, storage: 45 },
  { month: 'Mar', cpu: 68, memory: 59, storage: 48 },
  { month: 'Apr', cpu: 72, memory: 64, storage: 52 },
  { month: 'May', cpu: 70, memory: 66, storage: 55 },
  { month: 'Jun', cpu: 75, memory: 70, storage: 58 },
];

const podColumns = [
  { key: 'name', label: 'Pod Name' },
  { key: 'namespace', label: 'Namespace' },
  { key: 'status', label: 'Status', render: (v) => <StatusBadge status={v} /> },
  { key: 'restarts', label: 'Restarts' },
  { key: 'cpu', label: 'CPU' },
  { key: 'memory', label: 'Memory' },
  { key: 'node', label: 'Node' },
];

const podData = [
  { name: 'user-svc-7d8f9c4b6f-abc1', namespace: 'production', status: 'Running', restarts: 0, cpu: '120m', memory: '256Mi', node: 'node-01' },
  { name: 'order-svc-5f2e8a1d3c-xyz2', namespace: 'production', status: 'Running', restarts: 1, cpu: '250m', memory: '512Mi', node: 'node-02' },
  { name: 'payment-svc-9a4b2c7d0e-pqr3', namespace: 'production', status: 'Running', restarts: 0, cpu: '180m', memory: '384Mi', node: 'node-03' },
  { name: 'notification-svc-3e1f8a6b2d-lmn4', namespace: 'production', status: 'CrashLoopBackOff', restarts: 12, cpu: '0m', memory: '0Mi', node: 'node-01' },
  { name: 'redis-cache-6b8a2c4d1f-def5', namespace: 'infra', status: 'Running', restarts: 0, cpu: '80m', memory: '1Gi', node: 'node-04' },
  { name: 'kafka-broker-2d7e9f1a5c-ghi6', namespace: 'infra', status: 'Running', restarts: 2, cpu: '450m', memory: '2Gi', node: 'node-05' },
  { name: 'postgres-primary-4a1c8b3e5f-jkl7', namespace: 'data', status: 'Running', restarts: 0, cpu: '600m', memory: '4Gi', node: 'node-06' },
];

const Kubernetes = () => (
  <CtoPageShell title="Kubernetes" description="Kubernetes cluster overview, resource usage, and pod management" breadcrumbs={[{ label: 'CTO Dashboard', path: '/cto/executive-overview' }, { label: 'Kubernetes' }]}>
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
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-6">Cluster Resource Usage (Last 6 Months)</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={clusterUsage}>
              <defs>
                <linearGradient id="cpuGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/><stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/></linearGradient>
                <linearGradient id="memGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.1}/><stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/></linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dx={-10} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
              <Area type="monotone" dataKey="cpu" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#cpuGrad)" name="CPU %" />
              <Area type="monotone" dataKey="memory" stroke="#8b5cf6" strokeWidth={2} fillOpacity={1} fill="url(#memGrad)" name="Memory %" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-6">Running Pods</h3>
        <DataTable columns={podColumns} data={podData} pageSize={5} searchable />
      </div>
    </div>
  </CtoPageShell>
);

export default Kubernetes;


