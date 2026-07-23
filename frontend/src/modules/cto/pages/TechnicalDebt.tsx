import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Clock, DollarSign, AlertTriangle, FileText, TrendingUp, Code, Bug, Server, Shield, Database } from 'lucide-react';
import CtoPageShell from '../CtoPageShell';
import DataTable, { StatusBadge } from '../../../components/common/DataTable/DataTable';

const kpiData = [
  { label: 'Total Tech Debt', value: '12,847 hrs', sub: 'Estimated effort to fix', icon: Clock, color: 'text-rose-500' },
  { label: 'Debt Ratio', value: '8.5%', sub: 'Of total codebase', icon: TrendingUp, color: 'text-amber-500' },
  { label: 'Critical Items', value: '47', sub: 'Requires immediate attention', icon: AlertTriangle, color: 'text-red-500' },
  { label: 'Estimated Cost', value: '$1.2M', sub: 'At avg $95/hr engineering rate', icon: DollarSign, color: 'text-indigo-500' },
];

const debtByCategory = [
  { category: 'Code Complexity', hours: 3200, color: '#ef4444' },
  { category: 'Test Coverage', hours: 2400, color: '#f59e0b' },
  { category: 'Deprecated APIs', hours: 1800, color: '#3b82f6' },
  { category: 'Security Issues', hours: 1500, color: '#8b5cf6' },
  { category: 'Performance', hours: 1200, color: '#10b981' },
  { category: 'Documentation', hours: 900, color: '#94a3b8' },
  { category: 'Infrastructure', hours: 850, color: '#ec4899' },
  { category: 'Dependency Mgmt', hours: 997, color: '#6366f1' },
];

const debtTrend = [
  { month: 'Oct', total: 12400, critical: 52 }, { month: 'Nov', total: 12600, critical: 50 },
  { month: 'Dec', total: 12500, critical: 51 }, { month: 'Jan', total: 12800, critical: 48 },
  { month: 'Feb', total: 12700, critical: 49 }, { month: 'Mar', total: 12847, critical: 47 },
];

const debtItems = [
  { id: 'TD-101', module: 'core-api', type: 'Code Complexity', severity: 'Critical', hours: 120, status: 'In Progress', assignedTo: 'Alice Chen' },
  { id: 'TD-102', module: 'auth-service', type: 'Security Issue', severity: 'Critical', hours: 80, status: 'To Do', assignedTo: 'Bob Kumar' },
  { id: 'TD-103', module: 'frontend-web', type: 'Test Coverage', severity: 'Major', hours: 60, status: 'In Progress', assignedTo: 'Carol Davis' },
  { id: 'TD-104', module: 'data-pipeline', type: 'Deprecated APIs', severity: 'Major', hours: 45, status: 'To Do', assignedTo: 'David Lee' },
  { id: 'TD-105', module: 'mobile-app', type: 'Performance', severity: 'Minor', hours: 30, status: 'Done', assignedTo: 'Eve Martinez' },
  { id: 'TD-106', module: 'infra-ops', type: 'Infrastructure', severity: 'Major', hours: 55, status: 'In Progress', assignedTo: 'Frank Zhang' },
  { id: 'TD-107', module: 'api-gateway', type: 'Dependency Mgmt', severity: 'Minor', hours: 25, status: 'To Do', assignedTo: 'Grace Kim' },
  { id: 'TD-108', module: 'core-api', type: 'Documentation', severity: 'Info', hours: 15, status: 'Done', assignedTo: 'Henry Park' },
  { id: 'TD-109', module: 'auth-service', type: 'Code Complexity', severity: 'Major', hours: 40, status: 'To Do', assignedTo: 'Alice Chen' },
  { id: 'TD-110', module: 'frontend-web', type: 'Performance', severity: 'Critical', hours: 35, status: 'In Progress', assignedTo: 'Bob Kumar' },
];

const debtColumns = [
  { key: 'id', label: 'ID' },
  { key: 'module', label: 'Module' },
  { key: 'type', label: 'Type' },
  { key: 'severity', label: 'Severity', render: (v) => <StatusBadge status={v} /> },
  { key: 'hours', label: 'Est. Hours' },
  { key: 'status', label: 'Status', render: (v) => <StatusBadge status={v} /> },
  { key: 'assignedTo', label: 'Assigned To' },
];

const priorityMatrix = [
  { quadrant: 'Critical & Easy', priority: 'Do First', items: 12, color: 'bg-rose-100 border-rose-200 text-rose-700' },
  { quadrant: 'Critical & Hard', priority: 'Schedule', items: 35, color: 'bg-amber-100 border-amber-200 text-amber-700' },
  { quadrant: 'Trivial & Easy', priority: 'Quick Wins', items: 28, color: 'bg-emerald-100 border-emerald-200 text-emerald-700' },
  { quadrant: 'Trivial & Hard', priority: 'Deprioritize', items: 18, color: 'bg-slate-100 border-slate-200 text-slate-600' },
];

const TechnicalDebt = () => (
  <CtoPageShell title="Technical Debt" description="Track, prioritize, and manage technical debt across the engineering organization">
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
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-6">Tech Debt by Category (Hours)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={debtByCategory} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <YAxis type="category" dataKey="category" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} width={110} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} formatter={(v) => `${v}h`} />
                <Bar dataKey="hours" radius={[0, 4, 4, 0]}>
                  {debtByCategory.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-6">Tech Debt Trend (6 Months)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={debtTrend}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dx={-10} domain={[11000, 14000]} />
                <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dx={10} domain={[30, 70]} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
                <Line yAxisId="left" type="monotone" dataKey="total" stroke="#f59e0b" strokeWidth={3} dot={{ fill: '#f59e0b' }} name="Total Hours" />
                <Line yAxisId="right" type="monotone" dataKey="critical" stroke="#ef4444" strokeWidth={2} dot={{ fill: '#ef4444' }} name="Critical Items" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {priorityMatrix.map((item, i) => (
          <div key={i} className={`${item.color} border rounded-xl p-4 dark:bg-opacity-10`}>
            <div className="text-xs font-bold uppercase tracking-wider mb-1">{item.priority}</div>
            <div className="text-2xl font-extrabold">{item.items}</div>
            <div className="text-xs font-semibold opacity-70 mt-1">{item.quadrant}</div>
          </div>
        ))}
      </div>

      <DataTable columns={debtColumns} data={debtItems} pageSize={10} searchable />
    </div>
  </CtoPageShell>
);

export default TechnicalDebt;

