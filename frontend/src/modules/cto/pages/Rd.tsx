// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FlaskConical, DollarSign, TrendingUp, Users } from 'lucide-react';
import CtoPageShell from '../CtoPageShell';
import DataTable, { StatusBadge } from '../../../components/common/DataTable/DataTable';

const kpis = [
  { label: 'Active Projects', value: '8', icon: FlaskConical, color: 'text-blue-500' },
  { label: 'Budget', value: '$2.4M', icon: DollarSign, color: 'text-emerald-500' },
  { label: 'Spent', value: '$1.8M', icon: TrendingUp, color: 'text-purple-500' },
  { label: 'Team Members', value: '24', icon: Users, color: 'text-amber-500' },
];

const chartData = [
  { project: 'AI Platform', budget: 600, spent: 420 }, { project: 'Data Mesh', budget: 450, spent: 380 },
  { project: 'Edge Computing', budget: 350, spent: 210 }, { project: 'DevOps 2.0', budget: 300, spent: 280 },
  { project: 'Security Suite', budget: 280, spent: 190 }, { project: 'Mobile SDK', budget: 240, spent: 160 },
  { project: 'IoT Gateway', budget: 120, spent: 90 }, { project: 'ML Pipeline', budget: 60, spent: 50 },
];

const columns = [
  { key: 'name', label: 'Project', sortable: true },
  { key: 'lead', label: 'Lead', sortable: true },
  { key: 'budget', label: 'Budget', sortable: true },
  { key: 'spent', label: 'Spent', sortable: true, render: (v) => <span className="text-blue-600 font-semibold">{v}</span> },
  { key: 'status', label: 'Status', render: (v) => <StatusBadge status={v} /> },
  { key: 'phase', label: 'Phase', sortable: true },
  { key: 'timeline', label: 'Timeline' },
];

const data = [
  { id: 1, name: 'AI Platform', lead: 'Dr. Sarah Chen', budget: '$600K', spent: '$420K', status: 'On Track', phase: 'Development', timeline: 'Q2 2025' },
  { id: 2, name: 'Data Mesh', lead: 'James Wilson', budget: '$450K', spent: '$380K', status: 'On Track', phase: 'Testing', timeline: 'Q3 2025' },
  { id: 3, name: 'Edge Computing', lead: 'Maria Lopez', budget: '$350K', spent: '$210K', status: 'At Risk', phase: 'Research', timeline: 'Q4 2025' },
  { id: 4, name: 'DevOps 2.0', lead: 'Alex Kim', budget: '$300K', spent: '$280K', status: 'On Track', phase: 'Deployment', timeline: 'Q1 2025' },
  { id: 5, name: 'Security Suite', lead: 'Raj Patel', budget: '$280K', spent: '$190K', status: 'On Track', phase: 'Development', timeline: 'Q3 2025' },
  { id: 6, name: 'Mobile SDK', lead: 'Lisa Anderson', budget: '$240K', spent: '$160K', status: 'Delayed', phase: 'Testing', timeline: 'Q2 2025' },
  { id: 7, name: 'IoT Gateway', lead: 'Tom Harrison', budget: '$120K', spent: '$90K', status: 'On Track', phase: 'Research', timeline: 'Q4 2025' },
  { id: 8, name: 'ML Pipeline', lead: 'Nancy Wu', budget: '$60K', spent: '$50K', status: 'Completed', phase: 'Production', timeline: 'Q1 2025' },
];

const Rd = () => (
  <CtoPageShell title="R&D" description="Track research and development projects, budgets, and team allocation">
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
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-6">R&D Budget by Project ($K)</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="project" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dx={-10} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
              <Bar dataKey="budget" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Budget ($K)" />
              <Bar dataKey="spent" fill="#10b981" radius={[4, 4, 0, 0]} name="Spent ($K)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-4">R&D Projects</h3>
        <DataTable columns={columns} data={data} searchable pageSize={8} />
      </div>
    </div>
  </CtoPageShell>
);

export default Rd;



