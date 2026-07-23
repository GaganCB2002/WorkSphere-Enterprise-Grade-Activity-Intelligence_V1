import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Zap, Activity, AlertTriangle, BarChart3 } from 'lucide-react';
import CtoPageShell from '../CtoPageShell';
import DataTable, { StatusBadge } from '../../../components/common/DataTable/DataTable';

const kpis = [
  { label: 'Avg Response', value: '124ms', sub: '-8ms from last week', icon: Zap, color: 'text-emerald-500' },
  { label: 'P95', value: '342ms', sub: 'Within target', icon: Activity, color: 'text-blue-500' },
  { label: 'P99', value: '847ms', sub: 'Needs attention', icon: AlertTriangle, color: 'text-amber-500' },
  { label: 'Throughput', value: '12,847 req/s', sub: '+5% from last week', icon: BarChart3, color: 'text-indigo-500' },
];

const responseData = [
  { time: '00:00', avg: 118, p95: 320, p99: 810 },
  { time: '04:00', avg: 98, p95: 280, p99: 720 },
  { time: '08:00', avg: 142, p95: 380, p99: 890 },
  { time: '12:00', avg: 156, p95: 410, p99: 920 },
  { time: '16:00', avg: 134, p95: 360, p99: 860 },
  { time: '20:00', avg: 108, p95: 290, p99: 740 },
  { time: 'Now', avg: 124, p95: 342, p99: 847 },
];

const columns = [
  { key: 'endpoint', label: 'Endpoint' },
  { key: 'method', label: 'Method' },
  { key: 'avg', label: 'Avg (ms)' },
  { key: 'p95', label: 'P95 (ms)' },
  { key: 'p99', label: 'P99 (ms)' },
  { key: 'throughput', label: 'Throughput' },
  { key: 'errorRate', label: 'Error Rate' },
];

const data = [
  { endpoint: '/api/users', method: 'GET', avg: '42ms', p95: '98ms', p99: '245ms', throughput: '3,421 req/s', errorRate: '0.02%' },
  { endpoint: '/api/orders', method: 'POST', avg: '124ms', p95: '342ms', p99: '847ms', throughput: '1,247 req/s', errorRate: '0.08%' },
  { endpoint: '/api/products', method: 'GET', avg: '28ms', p95: '72ms', p99: '184ms', throughput: '5,842 req/s', errorRate: '0.01%' },
  { endpoint: '/api/auth/login', method: 'POST', avg: '84ms', p95: '210ms', p99: '520ms', throughput: '2,147 req/s', errorRate: '0.04%' },
  { endpoint: '/api/search', method: 'GET', avg: '245ms', p95: '680ms', p99: '1,240ms', throughput: '847 req/s', errorRate: '0.12%' },
  { endpoint: '/api/payments', method: 'POST', avg: '184ms', p95: '420ms', p99: '980ms', throughput: '524 req/s', errorRate: '0.06%' },
  { endpoint: '/api/notifications', method: 'POST', avg: '62ms', p95: '145ms', p99: '380ms', throughput: '2,847 req/s', errorRate: '0.03%' },
];

const Performance: React.FC = () => {
  return (
    <CtoPageShell
      title="Performance Monitoring"
      description="Track API response times, throughput, and error rates"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-6">Response Time Trend</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={responseData}>
              <defs>
                <linearGradient id="avgGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dx={-10} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              <Area type="monotone" dataKey="avg" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#avgGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <DataTable columns={columns} data={data} searchable pageSize={10} />
    </CtoPageShell>
  );
};

export default Performance;
