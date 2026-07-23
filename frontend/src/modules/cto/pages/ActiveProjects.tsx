// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';
import { Kanban, AlertTriangle, CheckCircle, DollarSign, Activity } from 'lucide-react';
import CtoPageShell from '../CtoPageShell';
import DataTable, { StatusBadge } from '../../../components/common/DataTable/DataTable';

const kpiData = [
  { label: 'Active Projects', value: '12', sub: 'Currently in flight', icon: Kanban, color: 'text-blue-500' },
  { label: 'At Risk', value: '2', sub: 'Requires attention', icon: AlertTriangle, color: 'text-red-500' },
  { label: 'Completed This Q', value: '8', sub: 'Delivered this quarter', icon: CheckCircle, color: 'text-emerald-500' },
  { label: 'Budget Util', value: '74%', sub: 'Of allocated budget', icon: DollarSign, color: 'text-amber-500' },
];

const columns = [
  { key: 'name', label: 'Project Name' },
  { key: 'manager', label: 'Manager' },
  { key: 'status', label: 'Status', render: (v) => <StatusBadge status={v} /> },
  { key: 'progress', label: 'Progress' },
  { key: 'budget', label: 'Budget' },
  { key: 'timeline', label: 'Timeline' },
  { key: 'health', label: 'Health', render: (v) => <StatusBadge status={v} /> },
];

const data = [
  { name: 'Platform Modernization', manager: 'Sarah Chen', status: 'Active', progress: '72%', budget: '$1.2M', timeline: 'Q3 2026', health: 'On_Track' },
  { name: 'Data Lake Migration', manager: 'Mike Johnson', status: 'Active', progress: '45%', budget: '$890K', timeline: 'Q4 2026', health: 'On_Track' },
  { name: 'Mobile App v3', manager: 'Lisa Park', status: 'Active', progress: '68%', budget: '$650K', timeline: 'Q3 2026', health: 'Delayed' },
  { name: 'Microservices Refactor', manager: 'Tom Wilson', status: 'Active', progress: '31%', budget: '$1.5M', timeline: 'Q1 2027', health: 'On_Track' },
  { name: 'Security Audit Program', manager: 'Anna Davis', status: 'Active', progress: '88%', budget: '$420K', timeline: 'Q3 2026', health: 'On_Track' },
  { name: 'Cloud Cost Optimization', manager: 'James Lee', status: 'Active', progress: '55%', budget: '$280K', timeline: 'Q3 2026', health: 'Blocked' },
  { name: 'AI/ML Platform', manager: 'Rachel Kim', status: 'Active', progress: '23%', budget: '$2.1M', timeline: 'Q2 2027', health: 'On_Track' },
  { name: 'Legacy System Decommission', manager: 'Sarah Chen', status: 'Active', progress: '61%', budget: '$750K', timeline: 'Q4 2026', health: 'On_Track' },
  { name: 'API Gateway Redesign', manager: 'Mike Johnson', status: 'Active', progress: '40%', budget: '$530K', timeline: 'Q1 2027', health: 'Delayed' },
  { name: 'DevOps Toolchain', manager: 'Lisa Park', status: 'Active', progress: '92%', budget: '$340K', timeline: 'Q3 2026', health: 'On_Track' },
  { name: 'Compliance Automation', manager: 'Tom Wilson', status: 'Active', progress: '17%', budget: '$560K', timeline: 'Q4 2026', health: 'On_Track' },
  { name: 'Customer Portal v2', manager: 'Anna Davis', status: 'Active', progress: '78%', budget: '$920K', timeline: 'Q3 2026', health: 'On_Track' },
];

const ActiveProjects = () => (
  <CtoPageShell title="Active Projects" description="Track active engineering projects, budgets, timelines, and health status" breadcrumbs={[{ label: 'CTO Dashboard', path: '/cto/executive-overview' }, { label: 'Active Projects' }]}>
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
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-6">Active Projects</h3>
        <DataTable columns={columns} data={data} pageSize={8} searchable />
      </div>
    </div>
  </CtoPageShell>
);

export default ActiveProjects;



