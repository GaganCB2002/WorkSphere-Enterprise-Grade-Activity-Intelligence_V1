import React, { useState } from 'react';
import InternPageShell from '../../InternPageShell';
import { motion } from 'framer-motion';
import {
  ListChecks, Clock, CheckCircle2, AlertTriangle, Search, ArrowUpDown,
  ChevronDown, MoreHorizontal, Eye, UserCheck, Calendar, ArrowUpRight, ArrowDownRight
} from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const assignedTasks = [
  { id: 'T-101', title: 'Implement user auth flow', project: 'Portal Redesign', assignedBy: 'Alice Chen', priority: 'High', dueDate: '2026-07-25', status: 'In Progress' },
  { id: 'T-102', title: 'Write API documentation', project: 'API Gateway', assignedBy: 'Bob Smith', priority: 'Medium', dueDate: '2026-07-28', status: 'To Do' },
  { id: 'T-103', title: 'Fix login page bug', project: 'Portal Redesign', assignedBy: 'Alice Chen', priority: 'High', dueDate: '2026-07-20', status: 'Done' },
  { id: 'T-104', title: 'Design dashboard mockups', project: 'Analytics Tool', assignedBy: 'Carol Davis', priority: 'Low', dueDate: '2026-08-01', status: 'Done' },
  { id: 'T-105', title: 'Set up CI/CD pipeline', project: 'DevOps', assignedBy: 'Bob Smith', priority: 'Medium', dueDate: '2026-07-22', status: 'In Progress' },
  { id: 'T-106', title: 'Database optimization', project: 'API Gateway', assignedBy: 'Alice Chen', priority: 'High', dueDate: '2026-07-18', status: 'Overdue' },
  { id: 'T-107', title: 'Create unit tests', project: 'Analytics Tool', assignedBy: 'Carol Davis', priority: 'Low', dueDate: '2026-08-05', status: 'To Do' },
  { id: 'T-108', title: 'Review PR #234', project: 'Portal Redesign', assignedBy: 'Bob Smith', priority: 'Medium', dueDate: '2026-07-23', status: 'Done' },
];

function PriorityBadge({ priority }: { priority: string }) {
  const map: Record<string, string> = {
    High: 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400',
    Medium: 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400',
    Low: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400',
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold ${map[priority] || ''}`}>
      {priority}
    </span>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    'To Do': 'bg-slate-100 text-slate-700 dark:bg-slate-500/10 dark:text-slate-400',
    'In Progress': 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400',
    'Done': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400',
    'Overdue': 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400',
  };
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold ${map[status] || ''}`}>
      {status === 'Done' && <CheckCircle2 className="w-3 h-3" />}
      {status === 'Overdue' && <AlertTriangle className="w-3 h-3" />}
      {status}
    </span>
  );
}

export default function AssignedTasks() {
  const [search, setSearch] = useState('');
  const [filterPriority, setFilterPriority] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [sortBy, setSortBy] = useState<'dueDate' | 'priority'>('dueDate');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  const toggleSort = (field: 'dueDate' | 'priority') => {
    if (sortBy === field) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortBy(field); setSortDir('asc'); }
  };

  const kpis = [
    { label: 'Total Assigned', value: assignedTasks.length, icon: ListChecks, color: 'text-blue-600 bg-blue-100 dark:bg-blue-500/10 dark:text-blue-400', trend: '+2 this week', trendUp: true },
    { label: 'In Progress', value: assignedTasks.filter(t => t.status === 'In Progress').length, icon: Clock, color: 'text-amber-600 bg-amber-100 dark:bg-amber-500/10 dark:text-amber-400', trend: '1 due soon', trendUp: false },
    { label: 'Completed', value: assignedTasks.filter(t => t.status === 'Done').length, icon: CheckCircle2, color: 'text-emerald-600 bg-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400', trend: '3 total', trendUp: true },
    { label: 'Overdue', value: assignedTasks.filter(t => t.status === 'Overdue').length, icon: AlertTriangle, color: 'text-red-600 bg-red-100 dark:bg-red-500/10 dark:text-red-400', trend: 'Needs attention', trendUp: false },
  ];

  const filtered = assignedTasks.filter(t => {
    const matchSearch = t.title.toLowerCase().includes(search.toLowerCase()) || t.id.toLowerCase().includes(search.toLowerCase()) || t.project.toLowerCase().includes(search.toLowerCase());
    const matchPriority = filterPriority === 'All' || t.priority === filterPriority;
    const matchStatus = filterStatus === 'All' || t.status === filterStatus;
    return matchSearch && matchPriority && matchStatus;
  });

  filtered.sort((a, b) => {
    const dir = sortDir === 'asc' ? 1 : -1;
    if (sortBy === 'dueDate') return dir * (new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
    const priorityOrder = { High: 3, Medium: 2, Low: 1 };
    return dir * ((priorityOrder[a.priority as keyof typeof priorityOrder] || 0) - (priorityOrder[b.priority as keyof typeof priorityOrder] || 0));
  });

  return (
    <InternPageShell title="Assigned Tasks" description="Tasks assigned to you by your mentor or team">
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map((kpi, i) => {
            const Icon = kpi.icon;
            return (
              <motion.div key={kpi.label} variants={item} className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className={`p-2.5 rounded-lg ${kpi.color}`}><Icon className="w-5 h-5" /></div>
                  <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${kpi.trendUp ? 'text-emerald-700 bg-emerald-50 dark:bg-emerald-500/10 dark:text-emerald-400' : 'text-amber-700 bg-amber-50 dark:bg-amber-500/10 dark:text-amber-400'}`}>
                    {kpi.trendUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {kpi.trend}
                  </span>
                </div>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">{kpi.label}</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{kpi.value}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div variants={item} className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 dark:border-slate-700/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search tasks..." className="w-full pl-9 pr-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <select value={filterPriority} onChange={e => setFilterPriority(e.target.value)} className="px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 focus:outline-none focus:border-blue-500">
                <option value="All">All Priorities</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
              <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 focus:outline-none focus:border-blue-500">
                <option value="All">All Statuses</option>
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/40">
                  <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Task ID</th>
                  <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Title</th>
                  <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Project</th>
                  <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Assigned By</th>
                  <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">
                    <button onClick={() => toggleSort('priority')} className="inline-flex items-center gap-1 hover:text-slate-600 dark:hover:text-slate-200">
                      Priority <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">
                    <button onClick={() => toggleSort('dueDate')} className="inline-flex items-center gap-1 hover:text-slate-600 dark:hover:text-slate-200">
                      Due Date <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                  <th className="text-right px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/40">
                {filtered.map((task, i) => (
                  <motion.tr key={task.id} variants={item} className="hover:bg-slate-50 dark:hover:bg-slate-700/20 transition-colors">
                    <td className="px-5 py-3.5 font-mono text-xs font-bold text-blue-600 dark:text-blue-400">{task.id}</td>
                    <td className="px-5 py-3.5 font-medium text-slate-800 dark:text-slate-200">{task.title}</td>
                    <td className="px-5 py-3.5 text-slate-500">{task.project}</td>
                    <td className="px-5 py-3.5">
                      <span className="inline-flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                        <UserCheck className="w-3.5 h-3.5 text-slate-400" />
                        {task.assignedBy}
                      </span>
                    </td>
                    <td className="px-5 py-3.5"><PriorityBadge priority={task.priority} /></td>
                    <td className="px-5 py-3.5">
                      <span className="inline-flex items-center gap-1.5 text-slate-500">
                        <Calendar className="w-3.5 h-3.5" />
                        {task.dueDate}
                      </span>
                    </td>
                    <td className="px-5 py-3.5"><StatusBadge status={task.status} /></td>
                    <td className="px-5 py-3.5 text-right">
                      <button className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700/60 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </motion.tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={8} className="px-5 py-8 text-center text-sm text-slate-400">No tasks found matching your filters.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </motion.div>
    </InternPageShell>
  );
}
