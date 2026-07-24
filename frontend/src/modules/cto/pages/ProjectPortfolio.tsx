import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { DollarSign, Kanban, CheckCircle, AlertTriangle, Activity } from 'lucide-react';
import CtoPageShell from '../CtoPageShell';
import DataTable, { StatusBadge } from '../../../components/common/DataTable/DataTable';

const kpiData = [
  { label: 'Total Portfolio', value: '$14.2M', sub: 'Total project value', icon: DollarSign, color: 'text-blue-500' },
  { label: 'Active', value: '12', sub: 'Active projects', icon: Kanban, color: 'text-indigo-500' },
  { label: 'On Track', value: '8', sub: 'Projects on schedule', icon: CheckCircle, color: 'text-emerald-500' },
  { label: 'At Risk', value: '2', sub: 'Requires attention', icon: AlertTriangle, color: 'text-red-500' },
];

const statusDistribution = [
  { name: 'On Track', value: 8, color: '#22c55e' },
  { name: 'Delayed', value: 2, color: '#f59e0b' },
  { name: 'Blocked', value: 1, color: '#ef4444' },
  { name: 'Pending', value: 1, color: '#64748b' },
];

const columns = [
  { key: 'name', label: 'Project Name' },
  { key: 'budget', label: 'Budget' },
  { key: 'spent', label: 'Spent' },
  { key: 'status', label: 'Status', render: (v: any) => <StatusBadge status={v} /> },
  { key: 'health', label: 'Health', render: (v: any) => <StatusBadge status={v} /> },
  { key: 'timeline', label: 'Timeline' },
];

const data = [
  { name: 'Platform Modernization', budget: '$1.2M', spent: '$864K', status: 'Active', health: 'On_Track', timeline: 'Q3 2026' },
  { name: 'Data Lake Migration', budget: '$890K', spent: '$401K', status: 'Active', health: 'On_Track', timeline: 'Q4 2026' },
  { name: 'Mobile App v3', budget: '$650K', spent: '$442K', status: 'Active', health: 'Delayed', timeline: 'Q3 2026' },
  { name: 'Microservices Refactor', budget: '$1.5M', spent: '$465K', status: 'Active', health: 'On_Track', timeline: 'Q1 2027' },
  { name: 'Security Audit Program', budget: '$420K', spent: '$370K', status: 'Active', health: 'On_Track', timeline: 'Q3 2026' },
  { name: 'Cloud Cost Optimization', budget: '$280K', spent: '$154K', status: 'Active', health: 'Blocked', timeline: 'Q3 2026' },
  { name: 'AI/ML Platform', budget: '$2.1M', spent: '$483K', status: 'Active', health: 'On_Track', timeline: 'Q2 2027' },
  { name: 'Legacy Decommission', budget: '$750K', spent: '$458K', status: 'Active', health: 'On_Track', timeline: 'Q4 2026' },
  { name: 'API Gateway Redesign', budget: '$530K', spent: '$212K', status: 'Active', health: 'Delayed', timeline: 'Q1 2027' },
  { name: 'DevOps Toolchain', budget: '$340K', spent: '$313K', status: 'Active', health: 'On_Track', timeline: 'Q3 2026' },
  { name: 'Compliance Automation', budget: '$560K', spent: '$95K', status: 'Active', health: 'On_Track', timeline: 'Q4 2026' },
  { name: 'Customer Portal v2', budget: '$920K', spent: '$718K', status: 'Active', health: 'On_Track', timeline: 'Q3 2026' },
];

const ProjectPortfolio = () => (
  <CtoPageShell title="Project Portfolio" description="Portfolio-wide project tracking with budget, status, and health distribution" breadcrumbs={[{ label: 'CTO Dashboard', path: '/cto/executive-overview' }, { label: 'Project Portfolio' }]}>
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
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-6">Status Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={statusDistribution} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={4} dataKey="value">
                  {statusDistribution.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-6">Portfolio Summary</h3>
          <div className="space-y-4">
            {statusDistribution.map((s, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: s.color }} />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{s.name}</span>
                </div>
                <span className="text-sm font-bold text-slate-900 dark:text-white">{s.value} projects</span>
              </div>
            ))}
            <div className="pt-3 border-t border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-800 dark:text-slate-200">Total</span>
                <span className="text-sm font-extrabold text-slate-900 dark:text-white">12 projects</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-6">Portfolio Projects</h3>
        <DataTable columns={columns} data={data} pageSize={6} searchable />
      </div>
    </div>
  </CtoPageShell>
);

export default ProjectPortfolio;



