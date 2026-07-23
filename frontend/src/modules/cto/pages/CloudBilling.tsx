// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { DollarSign, Cloud, TrendingUp, BarChart3 } from 'lucide-react';
import CtoPageShell from '../CtoPageShell';
import DataTable, { StatusBadge } from '../../../components/common/DataTable/DataTable';

const kpis = [
  { label: 'Total MTD', value: '$284,500', icon: DollarSign, color: 'text-blue-500' },
  { label: 'AWS', value: '$142,000', icon: Cloud, color: 'text-amber-500' },
  { label: 'Azure', value: '$84,200', icon: Cloud, color: 'text-indigo-500' },
  { label: 'GCP', value: '$58,300', icon: Cloud, color: 'text-emerald-500' },
];

const trendData = [
  { month: 'Jan', total: 245.2 }, { month: 'Feb', total: 252.8 }, { month: 'Mar', total: 268.4 },
  { month: 'Apr', total: 278.1 }, { month: 'May', total: 265.3 }, { month: 'Jun', total: 284.5 },
];

const pieData = [
  { name: 'AWS', value: 142000 }, { name: 'Azure', value: 84200 }, { name: 'GCP', value: 58300 },
];
const COLORS = ['#f59e0b', '#6366f1', '#10b981'];

const columns = [
  { key: 'service', label: 'Service', sortable: true },
  { key: 'provider', label: 'Provider', sortable: true },
  { key: 'cost', label: 'Cost', sortable: true, render: (v) => <span className="text-blue-600 font-semibold">{v}</span> },
  { key: 'budget', label: 'Budget', sortable: true },
  { key: 'forecast', label: 'Forecast', sortable: true },
  { key: 'variance', label: 'Variance', render: (v) => <StatusBadge status={v} /> },
];

const data = [
  { id: 1, service: 'EC2 Compute', provider: 'AWS', cost: '$52,400', budget: '$55,000', forecast: '$54,200', variance: 'Under Budget' },
  { id: 2, service: 'RDS Databases', provider: 'AWS', cost: '$31,200', budget: '$30,000', forecast: '$33,800', variance: 'Over Budget' },
  { id: 3, service: 'S3 Storage', provider: 'AWS', cost: '$28,100', budget: '$30,000', forecast: '$29,400', variance: 'On Track' },
  { id: 4, service: 'Lambda Functions', provider: 'AWS', cost: '$18,300', budget: '$20,000', forecast: '$19,100', variance: 'Under Budget' },
  { id: 5, service: 'Virtual Machines', provider: 'Azure', cost: '$34,200', budget: '$35,000', forecast: '$35,800', variance: 'On Track' },
  { id: 6, service: 'Azure SQL', provider: 'Azure', cost: '$28,400', budget: '$28,000', forecast: '$30,200', variance: 'Over Budget' },
  { id: 7, service: 'Blob Storage', provider: 'Azure', cost: '$21,600', budget: '$22,000', forecast: '$22,400', variance: 'Under Budget' },
  { id: 8, service: 'Compute Engine', provider: 'GCP', cost: '$24,100', budget: '$25,000', forecast: '$24,800', variance: 'On Track' },
  { id: 9, service: 'BigQuery', provider: 'GCP', cost: '$18,700', budget: '$20,000', forecast: '$19,200', variance: 'Under Budget' },
  { id: 10, service: 'Cloud Storage', provider: 'GCP', cost: '$15,500', budget: '$16,000', forecast: '$15,800', variance: 'On Track' },
];

const CloudBilling = () => (
  <CtoPageShell title="Cloud Billing" description="Track multi-cloud spending across AWS, Azure, and GCP">
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
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-6">Monthly Billing Trend ($K)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs><linearGradient id="billGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/><stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dx={-10} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
                <Area type="monotone" dataKey="total" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#billGrad)" name="Total ($K)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-6">Cost by Provider</h3>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} innerRadius={50} paddingAngle={4}>
                  {pieData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} formatter={(v: any) => `$${(Number(v) / 1000).toFixed(1)}K`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-4">Billing Details</h3>
        <DataTable columns={columns} data={data} searchable pageSize={8} />
      </div>
    </div>
  </CtoPageShell>
);

export default CloudBilling;


