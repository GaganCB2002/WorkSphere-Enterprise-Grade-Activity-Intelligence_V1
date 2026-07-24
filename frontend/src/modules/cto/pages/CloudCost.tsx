import React from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { DollarSign, Cloud, TrendingDown, BarChart3, TrendingUp } from 'lucide-react';
import CtoPageShell from '../CtoPageShell';
import DataTable, { StatusBadge } from '../../../components/common/DataTable/DataTable';

const kpiData = [
  { label: 'Total Cloud Cost', value: '$284,500', sub: 'All providers combined', icon: DollarSign, color: 'text-blue-500' },
  { label: 'AWS', value: '$142,000', sub: '49.9% of total', icon: Cloud, color: 'text-amber-500' },
  { label: 'Azure', value: '$84,200', sub: '29.6% of total', icon: Cloud, color: 'text-sky-500' },
  { label: 'GCP', value: '$58,300', sub: '20.5% of total', icon: Cloud, color: 'text-indigo-500' },
];

const costTrend = [
  { month: 'Aug', aws: 128, azure: 72, gcp: 48 },
  { month: 'Sep', aws: 132, azure: 75, gcp: 50 },
  { month: 'Oct', aws: 126, azure: 78, gcp: 52 },
  { month: 'Nov', aws: 135, azure: 80, gcp: 54 },
  { month: 'Dec', aws: 138, azure: 82, gcp: 56 },
  { month: 'Jan', aws: 142, azure: 84.2, gcp: 58.3 },
];

const costDistribution = [
  { name: 'AWS', value: 49.9, color: '#ff9900' },
  { name: 'Azure', value: 29.6, color: '#0078d4' },
  { name: 'GCP', value: 20.5, color: '#4285f4' },
];

const costColumns = [
  { key: 'service', label: 'Service' },
  { key: 'provider', label: 'Provider' },
  { key: 'monthlyCost', label: 'Monthly Cost' },
  { key: 'trend', label: 'Trend', render: (v: any) => {
    const isUp = v.startsWith('+');
    return <span className={`inline-flex items-center gap-1 text-xs font-bold ${isUp ? 'text-red-500' : 'text-emerald-500'}`}>{isUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}{v}</span>;
  } },
  { key: 'pct', label: '% of Total' },
];

const costData = [
  { service: 'EC2 Compute', provider: 'AWS', monthlyCost: '$42,500', trend: '+3.2%', pct: '14.9%' },
  { service: 'RDS Databases', provider: 'AWS', monthlyCost: '$18,200', trend: '+1.8%', pct: '6.4%' },
  { service: 'S3 Storage', provider: 'AWS', monthlyCost: '$24,800', trend: '-2.1%', pct: '8.7%' },
  { service: 'Lambda', provider: 'AWS', monthlyCost: '$12,400', trend: '+5.6%', pct: '4.4%' },
  { service: 'VM Compute', provider: 'Azure', monthlyCost: '$28,400', trend: '+2.4%', pct: '10.0%' },
  { service: 'SQL Database', provider: 'Azure', monthlyCost: '$14,600', trend: '+1.2%', pct: '5.1%' },
  { service: 'Azure Storage', provider: 'Azure', monthlyCost: '$8,200', trend: '-0.8%', pct: '2.9%' },
  { service: 'Compute Engine', provider: 'GCP', monthlyCost: '$18,600', trend: '+4.2%', pct: '6.5%' },
  { service: 'Cloud SQL', provider: 'GCP', monthlyCost: '$8,400', trend: '+2.8%', pct: '3.0%' },
  { service: 'Cloud Storage', provider: 'GCP', monthlyCost: '$6,200', trend: '+1.5%', pct: '2.2%' },
];

const CloudCost = () => (
  <CtoPageShell title="Cloud Cost" description="Multi-cloud cost tracking, optimization, and provider comparison" breadcrumbs={[{ label: 'CTO Dashboard', path: '/cto/executive-overview' }, { label: 'Cloud Cost' }]}>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-6">Cloud Cost Trend ($K)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={costTrend}>
                <defs>
                  <linearGradient id="awsGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#ff9900" stopOpacity={0.1}/><stop offset="95%" stopColor="#ff9900" stopOpacity={0}/></linearGradient>
                  <linearGradient id="azGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#0078d4" stopOpacity={0.1}/><stop offset="95%" stopColor="#0078d4" stopOpacity={0}/></linearGradient>
                  <linearGradient id="gcpGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#4285f4" stopOpacity={0.1}/><stop offset="95%" stopColor="#4285f4" stopOpacity={0}/></linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dx={-10} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
                <Area type="monotone" dataKey="aws" stroke="#ff9900" strokeWidth={2} fillOpacity={1} fill="url(#awsGrad)" name="AWS" />
                <Area type="monotone" dataKey="azure" stroke="#0078d4" strokeWidth={2} fillOpacity={1} fill="url(#azGrad)" name="Azure" />
                <Area type="monotone" dataKey="gcp" stroke="#4285f4" strokeWidth={2} fillOpacity={1} fill="url(#gcpGrad)" name="GCP" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-6">Cost Distribution by Provider</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={costDistribution} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={4} dataKey="value">
                  {costDistribution.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} formatter={(v) => `${v}%`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-6">Cost by Service</h3>
        <DataTable columns={costColumns} data={costData} pageSize={5} searchable />
      </div>
    </div>
  </CtoPageShell>
);

export default CloudCost;


