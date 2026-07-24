import React from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Cpu, Thermometer, HardDrive, Activity } from 'lucide-react';
import CtoPageShell from '../CtoPageShell';
import DataTable, { StatusBadge } from '../../../components/common/DataTable/DataTable';

const kpis = [
  { label: 'GPU Instances', value: '24', icon: Cpu, color: 'text-blue-500' },
  { label: 'Utilization', value: '72%', icon: Activity, color: 'text-emerald-500' },
  { label: 'Memory Used', value: '847GB', icon: HardDrive, color: 'text-purple-500' },
  { label: 'Temperature', value: '64°C', icon: Thermometer, color: 'text-amber-500' },
];

const chartData = [
  { time: '00:00', utilization: 45 }, { time: '02:00', utilization: 52 },
  { time: '04:00', utilization: 38 }, { time: '06:00', utilization: 55 },
  { time: '08:00', utilization: 78 }, { time: '10:00', utilization: 85 },
  { time: '12:00', utilization: 91 }, { time: '14:00', utilization: 88 },
  { time: '16:00', utilization: 82 }, { time: '18:00', utilization: 74 },
  { time: '20:00', utilization: 63 }, { time: '22:00', utilization: 50 },
];

const columns = [
  { key: 'name', label: 'GPU Name', sortable: true },
  { key: 'model', label: 'Model', sortable: true },
  { key: 'memory', label: 'Memory', sortable: true },
  { key: 'utilization', label: 'Utilization', sortable: true, render: (v: any) => <span className="text-emerald-600 font-semibold">{v}</span> },
  { key: 'temperature', label: 'Temp', sortable: true },
  { key: 'status', label: 'Status', render: (v: any) => <StatusBadge status={v} /> },
];

const data = [
  { id: 1, name: 'GPU-A100-01', model: 'NVIDIA A100', memory: '80GB', utilization: '78%', temperature: '62°C', status: 'Active' },
  { id: 2, name: 'GPU-A100-02', model: 'NVIDIA A100', memory: '80GB', utilization: '85%', temperature: '67°C', status: 'Active' },
  { id: 3, name: 'GPU-A100-03', model: 'NVIDIA A100', memory: '80GB', utilization: '45%', temperature: '55°C', status: 'Active' },
  { id: 4, name: 'GPU-V100-01', model: 'NVIDIA V100', memory: '32GB', utilization: '92%', temperature: '71°C', status: 'Active' },
  { id: 5, name: 'GPU-V100-02', model: 'NVIDIA V100', memory: '32GB', utilization: '88%', temperature: '69°C', status: 'Active' },
  { id: 6, name: 'GPU-H100-01', model: 'NVIDIA H100', memory: '80GB', utilization: '34%', temperature: '48°C', status: 'Idle' },
  { id: 7, name: 'GPU-H100-02', model: 'NVIDIA H100', memory: '80GB', utilization: '67%', temperature: '58°C', status: 'Active' },
  { id: 8, name: 'GPU-A10-01', model: 'NVIDIA A10', memory: '24GB', utilization: '95%', temperature: '74°C', status: 'Active' },
  { id: 9, name: 'GPU-A10-02', model: 'NVIDIA A10', memory: '24GB', utilization: '71%', temperature: '63°C', status: 'Active' },
  { id: 10, name: 'GPU-T4-01', model: 'NVIDIA T4', memory: '16GB', utilization: '56%', temperature: '52°C', status: 'Idle' },
];

const GpuUsage = () => (
  <CtoPageShell title="GPU Usage" description="Monitor GPU cluster utilization, memory, and thermal metrics">
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
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-6">GPU Utilization Over Time (24h)</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs><linearGradient id="gpuGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/><stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/></linearGradient></defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dx={-10} tickFormatter={(v) => `${v}%`} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
              <Area type="monotone" dataKey="utilization" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#gpuGrad)" name="Utilization" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-4">GPU Resources</h3>
        <DataTable columns={columns} data={data} searchable pageSize={8} />
      </div>
    </div>
  </CtoPageShell>
);

export default GpuUsage;


