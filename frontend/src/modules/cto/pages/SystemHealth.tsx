import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, Server, Zap, AlertCircle, Cpu, HardDrive as Memory, AlertTriangle } from 'lucide-react';
import CtoPageShell from '../CtoPageShell';
import DataTable, { StatusBadge } from '../../../components/common/DataTable/DataTable';

const kpis = [
  { label: 'Overall Health', value: '97%', sub: 'Excellent condition', icon: Activity, color: 'text-emerald-500' },
  { label: 'Services Up', value: '22/24', sub: '2 services degraded', icon: Server, color: 'text-blue-500' },
  { label: 'Avg Response', value: '124ms', sub: 'Within SLA', icon: Zap, color: 'text-indigo-500' },
  { label: 'Error Rate', value: '0.3%', sub: 'Below threshold', icon: AlertTriangle, color: 'text-amber-500' },
  { label: 'CPU Avg', value: '47%', sub: 'Normal load', icon: Cpu, color: 'text-purple-500' },
  { label: 'Memory Avg', value: '62%', sub: 'Stable', icon: Memory, color: 'text-rose-500' },
];

const healthData = [
  { name: 'Mon', health: 96 }, { name: 'Tue', health: 97 }, { name: 'Wed', health: 98 },
  { name: 'Thu', health: 95 }, { name: 'Fri', health: 97 }, { name: 'Sat', health: 96 },
  { name: 'Sun', health: 97 },
];

const columns = [
  { key: 'name', label: 'Service Name' },
  { key: 'status', label: 'Status', render: (v: string) => <StatusBadge status={v} /> },
  { key: 'uptime', label: 'Uptime' },
  { key: 'latency', label: 'Latency' },
  { key: 'cpu', label: 'CPU' },
  { key: 'memory', label: 'Memory' },
  { key: 'alerts', label: 'Alerts' },
];

const data = [
  { name: 'API Gateway', status: 'Healthy', uptime: '99.99%', latency: '45ms', cpu: '32%', memory: '48%', alerts: '0' },
  { name: 'Auth Service', status: 'Healthy', uptime: '99.97%', latency: '12ms', cpu: '28%', memory: '44%', alerts: '0' },
  { name: 'Database Primary', status: 'Healthy', uptime: '99.99%', latency: '8ms', cpu: '64%', memory: '78%', alerts: '1' },
  { name: 'Redis Cache', status: 'Healthy', uptime: '99.99%', latency: '2ms', cpu: '22%', memory: '55%', alerts: '0' },
  { name: 'Message Queue', status: 'Degraded', uptime: '98.2%', latency: '245ms', cpu: '72%', memory: '81%', alerts: '3' },
  { name: 'CDN Edge', status: 'Healthy', uptime: '99.99%', latency: '8ms', cpu: '18%', memory: '35%', alerts: '0' },
  { name: 'Load Balancer', status: 'Healthy', uptime: '99.99%', latency: '3ms', cpu: '24%', memory: '42%', alerts: '0' },
  { name: 'DNS Servers', status: 'Healthy', uptime: '99.99%', latency: '5ms', cpu: '15%', memory: '28%', alerts: '0' },
  { name: 'Monitoring Stack', status: 'Degraded', uptime: '97.5%', latency: '342ms', cpu: '88%', memory: '92%', alerts: '2' },
  { name: 'Backup Service', status: 'Healthy', uptime: '99.95%', latency: '18ms', cpu: '35%', memory: '52%', alerts: '0' },
];

const SystemHealth: React.FC = () => {
  return (
    <CtoPageShell
      title="System Health"
      description="Real-time system health monitoring and service status"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-6">System Health Over Time</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={healthData}>
              <defs>
                <linearGradient id="healthGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
              <YAxis domain={[90, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dx={-10} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              <Area type="monotone" dataKey="health" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#healthGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <DataTable columns={columns} data={data} searchable pageSize={10} />
    </CtoPageShell>
  );
};

export default SystemHealth;


