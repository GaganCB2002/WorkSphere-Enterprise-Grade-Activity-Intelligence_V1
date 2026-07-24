import React from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Shield, Activity, AlertTriangle, BarChart3, Clock, Globe, Lock, Zap } from 'lucide-react';
import CtoPageShell from '../CtoPageShell';
import DataTable, { StatusBadge } from '../../../components/common/DataTable/DataTable';

const kpiData = [
  { label: 'Total APIs', value: '147', sub: 'REST, gRPC, GraphQL', icon: Shield, color: 'text-blue-500' },
  { label: 'Avg Latency', value: '45ms', sub: 'P99: 128ms', icon: Clock, color: 'text-emerald-500' },
  { label: 'Error Rate', value: '0.02%', sub: 'Below 0.1% threshold', icon: AlertTriangle, color: 'text-amber-500' },
  { label: 'Requests/min', value: '12,847', sub: '+8.2% vs last week', icon: BarChart3, color: 'text-indigo-500' },
];

const requestVolume = [
  { hour: '00:00', requests: 4200 }, { hour: '02:00', requests: 2800 }, { hour: '04:00', requests: 1900 },
  { hour: '06:00', requests: 3400 }, { hour: '08:00', requests: 8900 }, { hour: '10:00', requests: 12400 },
  { hour: '12:00', requests: 11800 }, { hour: '14:00', requests: 13200 }, { hour: '16:00', requests: 12800 },
  { hour: '18:00', requests: 14200 }, { hour: '20:00', requests: 9800 }, { hour: '22:00', requests: 6200 },
];

const apiColumns = [
  { key: 'path', label: 'Path' },
  { key: 'method', label: 'Method', render: (v: any) => {
    const colors: Record<string, string> = { GET: `text-emerald-600 bg-emerald-50 dark:bg-emerald-950`, POST: `text-blue-600 bg-blue-50 dark:bg-blue-950`, PUT: `text-amber-600 bg-amber-50 dark:bg-amber-950`, DELETE: `text-red-600 bg-red-50 dark:bg-red-950` };
    return <span className={`px-2 py-0.5 rounded text-xs font-bold font-mono ${colors[v] || 'text-slate-600 bg-slate-50'}`}>{v}</span>;
  } },
  { key: 'service', label: 'Service' },
  { key: 'latency', label: 'Latency' },
  { key: 'rateLimit', label: 'Rate Limit' },
  { key: 'status', label: 'Status', render: (v: any) => <StatusBadge status={v} /> },
];

const apiData = [
  { path: '/api/v1/users', method: 'GET', service: 'User Service', latency: '12ms', rateLimit: '1000/min', status: 'Active' },
  { path: '/api/v1/users', method: 'POST', service: 'User Service', latency: '24ms', rateLimit: '500/min', status: 'Active' },
  { path: '/api/v1/orders', method: 'GET', service: 'Order Service', latency: '18ms', rateLimit: '800/min', status: 'Active' },
  { path: '/api/v1/orders', method: 'POST', service: 'Order Service', latency: '45ms', rateLimit: '300/min', status: 'Active' },
  { path: '/api/v1/payments', method: 'POST', service: 'Payment Service', latency: '120ms', rateLimit: '200/min', status: 'Active' },
  { path: '/api/v1/notifications', method: 'POST', service: 'Notification Service', latency: '85ms', rateLimit: '500/min', status: 'Degraded' },
  { path: '/api/v1/inventory', method: 'GET', service: 'Inventory Service', latency: '8ms', rateLimit: '2000/min', status: 'Active' },
  { path: '/api/v1/auth/login', method: 'POST', service: 'Auth Service', latency: '35ms', rateLimit: '100/min', status: 'Down' },
];

const ApiGateway = () => (
  <CtoPageShell title="API Gateway" description="API gateway performance, endpoints, and traffic analysis" breadcrumbs={[{ label: 'CTO Dashboard', path: '/cto/executive-overview' }, { label: 'API Gateway' }]}>
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
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-6">API Request Volume (Last 24h)</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={requestVolume}>
              <defs><linearGradient id="reqGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/><stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/></linearGradient></defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="hour" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dx={-10} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
              <Area type="monotone" dataKey="requests" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#reqGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-6">API Endpoints</h3>
        <DataTable columns={apiColumns} data={apiData} pageSize={5} searchable />
      </div>
    </div>
  </CtoPageShell>
);

export default ApiGateway;



