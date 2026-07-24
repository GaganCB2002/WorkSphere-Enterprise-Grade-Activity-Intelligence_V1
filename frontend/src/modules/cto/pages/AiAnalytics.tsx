import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, CheckCircle2, Clock, DollarSign } from 'lucide-react';
import CtoPageShell from '../CtoPageShell';
import DataTable, { StatusBadge } from '../../../components/common/DataTable/DataTable';

const kpis = [
  { label: 'Inference Requests', value: '1.2M', sub: '+15% from last month', icon: Activity, color: 'text-blue-500' },
  { label: 'Success Rate', value: '99.2%', sub: '+0.3% from last month', icon: CheckCircle2, color: 'text-emerald-500' },
  { label: 'Avg Latency', value: '847ms', sub: 'P95: 1.2s', icon: Clock, color: 'text-indigo-500' },
  { label: 'Cost', value: '$24,847', sub: 'MTD spend', icon: DollarSign, color: 'text-amber-500' },
];

const usageData = [
  { month: 'Feb', requests: 850 }, { month: 'Mar', requests: 920 }, { month: 'Apr', requests: 980 },
  { month: 'May', requests: 1050 }, { month: 'Jun', requests: 1120 }, { month: 'Jul', requests: 1200 },
];

const columns = [
  { key: 'model', label: 'Model' },
  { key: 'requests', label: 'Requests' },
  { key: 'tokens', label: 'Tokens' },
  { key: 'latency', label: 'Latency' },
  { key: 'errors', label: 'Errors' },
  { key: 'cost', label: 'Cost' },
];

const data = [
  { model: 'GPT-4o', requests: '524,847', tokens: '847M', latency: '245ms', errors: '0.02%', cost: '$12,847' },
  { model: 'Claude 3.5', requests: '342,847', tokens: '524M', latency: '312ms', errors: '0.01%', cost: '$8,247' },
  { model: 'BERT Classifier', requests: '184,247', tokens: '124M', latency: '84ms', errors: '0.05%', cost: '$2,847' },
  { model: 'ResNet-50', requests: '84,247', tokens: '42M', latency: '142ms', errors: '0.03%', cost: '$1,247' },
  { model: 'YOLOv8', requests: '47,847', tokens: '24M', latency: '68ms', errors: '0.04%', cost: '$847' },
  { model: 'T5-Summarizer', requests: '24,847', tokens: '84M', latency: '342ms', errors: '0.06%', cost: '$847' },
  { model: 'Recommendation', requests: '184,247', tokens: '124M', latency: '124ms', errors: '0.03%', cost: '$2,847' },
  { model: 'Anomaly Detector', requests: '847,247', tokens: '42M', latency: '28ms', errors: '0.01%', cost: '$847' },
];

const AiAnalytics: React.FC = () => {
  return (
    <CtoPageShell
      title="AI Analytics"
      description="AI usage analytics, cost tracking, and performance metrics"
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
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-6">AI Usage Trend</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={usageData}>
              <defs>
                <linearGradient id="aiGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dx={-10} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              <Area type="monotone" dataKey="requests" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#aiGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <DataTable columns={columns} data={data} searchable pageSize={10} />
    </CtoPageShell>
  );
};

export default AiAnalytics;

