import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine, Cell } from 'recharts';
import { Activity, Zap, CheckCircle2, Clock, Calendar, TrendingUp, Users, GitPullRequest } from 'lucide-react';
import CtoPageShell from '../CtoPageShell';
import DataTable, { StatusBadge } from '../../../components/common/DataTable/DataTable';

const kpiData = [
  { label: 'Active Sprint', value: 'Sprint 24', sub: 'Feb 12 - Feb 25, 2024', icon: Calendar, color: 'text-blue-500' },
  { label: 'Story Points', value: '85 / 120', sub: 'Completed / Total', icon: Zap, color: 'text-indigo-500' },
  { label: 'Velocity (Avg)', value: '118 pts', sub: 'Over last 6 sprints', icon: TrendingUp, color: 'text-emerald-500' },
  { label: 'Burndown', value: '71%', sub: 'Day 8 of 10', icon: Activity, color: 'text-amber-500' },
];

const burndownData = [
  { day: 'Day 1', ideal: 120, actual: 120 }, { day: 'Day 2', ideal: 108, actual: 115 },
  { day: 'Day 3', ideal: 96, actual: 105 }, { day: 'Day 4', ideal: 84, actual: 96 },
  { day: 'Day 5', ideal: 72, actual: 88 }, { day: 'Day 6', ideal: 60, actual: 74 },
  { day: 'Day 7', ideal: 48, actual: 62 }, { day: 'Day 8', ideal: 36, actual: 50 },
  { day: 'Day 9', ideal: 24, actual: 35 }, { day: 'Day 10', ideal: 12, actual: 20 },
];

const pointsByStatus = [
  { status: 'To Do', points: 18 }, { status: 'In Progress', points: 24 },
  { status: 'In Review', points: 16 }, { status: 'Testing', points: 14 },
  { status: 'Done', points: 48 },
];

const backlog = [
  { id: 'SP-101', task: 'Implement user authentication flow', assignee: 'Alice Chen', status: 'Done', points: 8, priority: 'High' },
  { id: 'SP-102', task: 'Design dashboard analytics widgets', assignee: 'Bob Kumar', status: 'In Review', points: 13, priority: 'Medium' },
  { id: 'SP-103', task: 'Optimize database query performance', assignee: 'Carol Davis', status: 'In Progress', points: 8, priority: 'High' },
  { id: 'SP-104', task: 'Add dark mode support to settings', assignee: 'David Lee', status: 'To Do', points: 3, priority: 'Low' },
  { id: 'SP-105', task: 'Write API integration tests', assignee: 'Eve Martinez', status: 'Testing', points: 5, priority: 'Medium' },
  { id: 'SP-106', task: 'Set up CI/CD pipeline for mobile', assignee: 'Frank Zhang', status: 'Done', points: 13, priority: 'High' },
  { id: 'SP-107', task: 'Refactor notification service', assignee: 'Grace Kim', status: 'In Progress', points: 8, priority: 'Medium' },
  { id: 'SP-108', task: 'Update dependency graph library', assignee: 'Henry Park', status: 'To Do', points: 5, priority: 'Low' },
  { id: 'SP-109', task: 'Implement rate limiting middleware', assignee: 'Alice Chen', status: 'Done', points: 8, priority: 'High' },
  { id: 'SP-110', task: 'Create user onboarding tour', assignee: 'Bob Kumar', status: 'In Review', points: 5, priority: 'Medium' },
];

const COLORS: Record<string, string> = { 'To Do': '#94a3b8', 'In Progress': '#3b82f6', 'In Review': '#f59e0b', Testing: '#8b5cf6', Done: '#10b981' };

const backlogColumns = [
  { key: 'id', label: 'ID' },
  { key: 'task', label: 'Task' },
  { key: 'assignee', label: 'Assignee' },
  { key: 'status', label: 'Status', render: (v: any) => <StatusBadge status={v} /> },
  { key: 'points', label: 'Points' },
  { key: 'priority', label: 'Priority', render: (v: any) => <StatusBadge status={v} /> },
];

const SprintDashboard = () => (
  <CtoPageShell title="Sprint Dashboard" description="Active sprint tracking, burndown, and backlog management">
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
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-6">Sprint Burndown</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={burndownData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dx={-10} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
                <Line type="monotone" dataKey="ideal" stroke="#94a3b8" strokeWidth={2} strokeDasharray="5 5" dot={false} name="Ideal" />
                <Line type="monotone" dataKey="actual" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: '#3b82f6' }} name="Actual" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-6">Story Points by Status</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={pointsByStatus}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="status" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dx={-10} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
                <Bar dataKey="points" radius={[4, 4, 0, 0]}>
                  {pointsByStatus.map((entry, i) => <Cell key={i} fill={COLORS[entry.status]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <DataTable columns={backlogColumns} data={backlog} pageSize={10} searchable />
    </div>
  </CtoPageShell>
);

export default SprintDashboard;



