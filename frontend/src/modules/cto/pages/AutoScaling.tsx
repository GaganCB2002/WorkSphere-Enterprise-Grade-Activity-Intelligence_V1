import React from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, Minus, Plus, BarChart3, TrendingUp, Clock, Target } from 'lucide-react';
import CtoPageShell from '../CtoPageShell';
import DataTable, { StatusBadge } from '../../../components/common/DataTable/DataTable';

const kpiData = [
  { label: 'Auto Scaling Groups', value: '12', sub: 'Across all services', icon: Activity, color: 'text-blue-500' },
  { label: 'Min Instances', value: '24', sub: 'Baseline capacity', icon: Minus, color: 'text-emerald-500' },
  { label: 'Max Instances', value: '84', sub: 'Burst capacity', icon: Plus, color: 'text-amber-500' },
  { label: 'Current', value: '48', sub: 'Actively running', icon: BarChart3, color: 'text-indigo-500' },
];

const scalingHistory = [
  { time: '00:00', instances: 24, cpu: 42 },
  { time: '02:00', instances: 24, cpu: 38 },
  { time: '04:00', instances: 24, cpu: 35 },
  { time: '06:00', instances: 28, cpu: 52 },
  { time: '08:00', instances: 42, cpu: 72 },
  { time: '10:00', instances: 48, cpu: 78 },
  { time: '12:00', instances: 46, cpu: 74 },
  { time: '14:00', instances: 48, cpu: 82 },
  { time: '16:00', instances: 44, cpu: 76 },
  { time: '18:00', instances: 38, cpu: 68 },
  { time: '20:00', instances: 32, cpu: 56 },
  { time: '22:00', instances: 26, cpu: 45 },
];

const policyColumns = [
  { key: 'name', label: 'Policy Name' },
  { key: 'resource', label: 'Resource' },
  { key: 'min', label: 'Min' },
  { key: 'max', label: 'Max' },
  { key: 'desired', label: 'Desired' },
  { key: 'metric', label: 'Metric' },
  { key: 'cooldown', label: 'Cooldown' },
];

const policyData = [
  { name: 'web-tier-scaling', resource: 'Web Server ASG', min: 3, max: 12, desired: 6, metric: 'CPU > 70%', cooldown: '120s' },
  { name: 'app-tier-scaling', resource: 'App Server ASG', min: 2, max: 10, desired: 4, metric: 'Memory > 75%', cooldown: '180s' },
  { name: 'worker-pool-scaling', resource: 'Worker ASG', min: 4, max: 16, desired: 8, metric: 'Queue Depth > 500', cooldown: '60s' },
  { name: 'cache-cluster-scaling', resource: 'Redis ASG', min: 3, max: 8, desired: 5, metric: 'CPU > 60%', cooldown: '300s' },
  { name: 'db-read-replicas', resource: 'PostgreSQL Read Replicas', min: 1, max: 5, desired: 2, metric: 'Connections > 200', cooldown: '600s' },
  { name: 'kafka-broker-scaling', resource: 'Kafka ASG', min: 3, max: 9, desired: 5, metric: 'Disk Usage > 80%', cooldown: '300s' },
  { name: 'scheduled-scale-up', resource: 'Web Server ASG', min: 6, max: 12, desired: 8, metric: 'Time-based (08:00)', cooldown: '0s' },
  { name: 'scheduled-scale-down', resource: 'Web Server ASG', min: 2, max: 6, desired: 3, metric: 'Time-based (22:00)', cooldown: '0s' },
];

const AutoScaling = () => (
  <CtoPageShell title="Auto Scaling" description="Auto scaling policies, capacity management, and scaling history" breadcrumbs={[{ label: 'CTO Dashboard', path: '/cto/executive-overview' }, { label: 'Auto Scaling' }]}>
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
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-6">Scaling History (Last 24h)</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={scalingHistory}>
              <defs>
                <linearGradient id="instGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/><stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/></linearGradient>
                <linearGradient id="cpuGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.1}/><stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/></linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dx={-10} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
              <Area type="monotone" dataKey="instances" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#instGrad)" name="Instances" />
              <Area type="monotone" dataKey="cpu" stroke="#8b5cf6" strokeWidth={2} fillOpacity={1} fill="url(#cpuGrad)" name="CPU %" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-6">Scaling Policies</h3>
        <DataTable columns={policyColumns} data={policyData} pageSize={5} searchable />
      </div>
    </div>
  </CtoPageShell>
);

export default AutoScaling;


