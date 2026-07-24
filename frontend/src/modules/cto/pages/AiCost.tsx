import React from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { DollarSign, Cpu, Globe, Database, TrendingUp } from 'lucide-react';
import CtoPageShell from '../CtoPageShell';
import DataTable, { StatusBadge } from '../../../components/common/DataTable/DataTable';

const kpis = [
  { label: 'Total AI Cost', value: '$84,247', icon: DollarSign, color: 'text-blue-500' },
  { label: 'Compute', value: '$42,000', icon: Cpu, color: 'text-emerald-500' },
  { label: 'API', value: '$28,000', icon: Globe, color: 'text-purple-500' },
  { label: 'Storage', value: '$14,247', icon: Database, color: 'text-amber-500' },
];

const trendData = [
  { month: 'Jan', cost: 62.1 }, { month: 'Feb', cost: 65.4 }, { month: 'Mar', cost: 70.2 },
  { month: 'Apr', cost: 68.5 }, { month: 'May', cost: 74.8 }, { month: 'Jun', cost: 78.3 },
  { month: 'Jul', cost: 72.6 }, { month: 'Aug', cost: 80.1 }, { month: 'Sep', cost: 84.2 },
];

const pieData = [
  { name: 'Compute', value: 42000 }, { name: 'API Costs', value: 28000 }, { name: 'Storage', value: 14247 },
];
const COLORS = ['#3b82f6', '#8b5cf6', '#f59e0b'];

const columns = [
  { key: 'service', label: 'Service', sortable: true },
  { key: 'compute', label: 'Compute', sortable: true },
  { key: 'api', label: 'API', sortable: true },
  { key: 'storage', label: 'Storage', sortable: true },
  { key: 'total', label: 'Total', sortable: true, render: (v: any) => <span className="text-blue-600 font-semibold">{v}</span> },
  { key: 'trend', label: 'Trend', render: (v: any) => <StatusBadge status={v} /> },
];

const data = [
  { id: 1, service: 'GPT-4 API', compute: '$12,400', api: '$18,200', storage: '$2,100', total: '$32,700', trend: 'Up 12%' },
  { id: 2, service: 'Claude 3 API', compute: '$8,700', api: '$5,800', storage: '$1,500', total: '$16,000', trend: 'Up 8%' },
  { id: 3, service: 'Model Training', compute: '$14,200', api: '$1,200', storage: '$4,800', total: '$20,200', trend: 'Stable' },
  { id: 4, service: 'Vector Database', compute: '$3,400', api: '$800', storage: '$3,200', total: '$7,400', trend: 'Down 3%' },
  { id: 5, service: 'Inference Serving', compute: '$3,300', api: '$2,000', storage: '$2,647', total: '$7,947', trend: 'Up 5%' },
];

const AiCost = () => (
  <CtoPageShell title="AI Cost" description="Track AI infrastructure spending across compute, API, and storage">
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-6">AI Cost Trend ($K)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs><linearGradient id="aiCostGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/><stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dx={-10} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
                <Area type="monotone" dataKey="cost" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#aiCostGrad)" name="Cost ($K)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-6">Cost Distribution</h3>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} innerRadius={50} paddingAngle={4}>
                  {pieData.map((_, index) => <Cell key={index} fill={COLORS[index]} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} formatter={(v: any) => `$${(Number(v) / 1000).toFixed(1)}K`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-4">AI Cost Breakdown</h3>
        <DataTable columns={columns} data={data} searchable pageSize={8} />
      </div>
    </div>
  </CtoPageShell>
);

export default AiCost;


