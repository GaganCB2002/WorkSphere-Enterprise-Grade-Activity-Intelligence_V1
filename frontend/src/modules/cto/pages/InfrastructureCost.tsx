import React from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { DollarSign, Cpu, HardDrive, Wifi, TrendingUp } from 'lucide-react';
import CtoPageShell from '../CtoPageShell';
import DataTable, { StatusBadge } from '../../../components/common/DataTable/DataTable';

const kpis = [
  { label: 'Total', value: '$184,200', icon: DollarSign, color: 'text-blue-500' },
  { label: 'Compute', value: '$84,000', icon: Cpu, color: 'text-emerald-500' },
  { label: 'Storage', value: '$42,000', icon: HardDrive, color: 'text-purple-500' },
  { label: 'Network', value: '$58,200', icon: Wifi, color: 'text-amber-500' },
];

const trendData = [
  { month: 'Jan', cost: 168.2 }, { month: 'Feb', cost: 172.4 }, { month: 'Mar', cost: 175.8 },
  { month: 'Apr', cost: 178.1 }, { month: 'May', cost: 181.3 }, { month: 'Jun', cost: 184.2 },
];

const pieData = [
  { name: 'Compute', value: 84000 }, { name: 'Storage', value: 42000 }, { name: 'Network', value: 58200 },
];
const COLORS = ['#3b82f6', '#8b5cf6', '#f59e0b'];

const columns = [
  { key: 'category', label: 'Category', sortable: true },
  { key: 'service', label: 'Service', sortable: true },
  { key: 'monthlyCost', label: 'Monthly Cost', sortable: true, render: (v) => <span className="text-blue-600 font-semibold">{v}</span> },
  { key: 'trend', label: 'Trend', render: (v) => <StatusBadge status={v} /> },
  { key: 'pctTotal', label: '% of Total' },
];

const data = [
  { id: 1, category: 'Compute', service: 'EC2 / VMs', monthlyCost: '$42,000', trend: 'Up 3.2%', pctTotal: '22.8%' },
  { id: 2, category: 'Compute', service: 'ECS / Kubernetes', monthlyCost: '$24,000', trend: 'Up 5.1%', pctTotal: '13.0%' },
  { id: 3, category: 'Compute', service: 'Lambda / Functions', monthlyCost: '$18,000', trend: 'Stable', pctTotal: '9.8%' },
  { id: 4, category: 'Storage', service: 'S3 / Blob Storage', monthlyCost: '$22,000', trend: 'Up 2.4%', pctTotal: '11.9%' },
  { id: 5, category: 'Storage', service: 'EBS / Block Storage', monthlyCost: '$12,000', trend: 'Down 1.1%', pctTotal: '6.5%' },
  { id: 6, category: 'Storage', service: 'Backup / Archive', monthlyCost: '$8,000', trend: 'Stable', pctTotal: '4.3%' },
  { id: 7, category: 'Network', service: 'Data Transfer', monthlyCost: '$28,000', trend: 'Up 8.4%', pctTotal: '15.2%' },
  { id: 8, category: 'Network', service: 'Load Balancers', monthlyCost: '$16,200', trend: 'Stable', pctTotal: '8.8%' },
  { id: 9, category: 'Network', service: 'CDN / CloudFront', monthlyCost: '$14,000', trend: 'Up 4.6%', pctTotal: '7.6%' },
];

const InfrastructureCost = () => (
  <CtoPageShell title="Infrastructure Cost" description="Track infrastructure spending across compute, storage, and network">
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
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-6">Cost Trend ($K)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs><linearGradient id="ifGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/><stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dx={-10} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
                <Area type="monotone" dataKey="cost" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#ifGrad)" name="Cost ($K)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-6">Cost by Category</h3>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} innerRadius={50} paddingAngle={4}>
                  {pieData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} formatter={(v) => `$${(v / 1000).toFixed(1)}K`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-4">Cost Breakdown</h3>
        <DataTable columns={columns} data={data} searchable pageSize={8} />
      </div>
    </div>
  </CtoPageShell>
);

export default InfrastructureCost;

