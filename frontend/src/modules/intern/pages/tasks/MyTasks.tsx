import React, { useState } from 'react';
import InternPageShell from '../../InternPageShell';
import { motion } from 'framer-motion';
import {
  ListChecks, Clock, CheckCircle2, AlertTriangle, Search, Plus,
  ArrowUpDown, Trash2, CheckSquare, Calendar, ArrowUpRight, ArrowDownRight
} from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const myTasks = [
  { id: 'T-201', title: 'Build notification system', status: 'In Progress', priority: 'High', dueDate: '2026-07-28', createdDate: '2026-07-10' },
  { id: 'T-202', title: 'Refactor sidebar component', status: 'To Do', priority: 'Medium', dueDate: '2026-08-02', createdDate: '2026-07-12' },
  { id: 'T-203', title: 'Add dark mode toggle', status: 'Done', priority: 'Low', dueDate: '2026-07-15', createdDate: '2026-07-05' },
  { id: 'T-204', title: 'Optimize image loading', status: 'In Progress', priority: 'Medium', dueDate: '2026-07-25', createdDate: '2026-07-11' },
  { id: 'T-205', title: 'Write migration script', status: 'To Do', priority: 'High', dueDate: '2026-07-30', createdDate: '2026-07-14' },
  { id: 'T-206', title: 'Setup error boundary', status: 'Done', priority: 'Low', dueDate: '2026-07-18', createdDate: '2026-07-08' },
  { id: 'T-207', title: 'Implement search api', status: 'To Do', priority: 'Medium', dueDate: '2026-08-05', createdDate: '2026-07-15' },
  { id: 'T-208', title: 'Create onboarding flow', status: 'In Progress', priority: 'High', dueDate: '2026-07-22', createdDate: '2026-07-09' },
];

function PriorityBadge({ priority }: { priority: string }) {
  const map: Record<string, string> = {
    High: 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400',
    Medium: 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400',
    Low: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400',
  };
  return <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold ${map[priority] || ''}`}>{priority}</span>;
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    'To Do': 'bg-slate-100 text-slate-700 dark:bg-slate-500/10 dark:text-slate-400',
    'In Progress': 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400',
    'Done': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400',
  };
  return <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold ${map[status] || ''}`}>{status}</span>;
}

export default function MyTasks() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [sortField, setSortField] = useState<'dueDate' | 'priority'>('dueDate');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  const toggleSort = (field: 'dueDate' | 'priority') => {
    if (sortField === field) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortField(field); setSortDir('asc'); }
  };

  const toggleSelect = (id: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    if (selected.size === filtered.length) setSelected(new Set());
    else setSelected(new Set(filtered.map(t => t.id)));
  };

  const kpis = [
    { label: 'Total Tasks', value: myTasks.length, icon: ListChecks, color: 'text-blue-600 bg-blue-100 dark:bg-blue-500/10 dark:text-blue-400', trend: '4 created this week', trendUp: true },
    { label: 'In Progress', value: myTasks.filter(t => t.status === 'In Progress').length, icon: Clock, color: 'text-amber-600 bg-amber-100 dark:bg-amber-500/10 dark:text-amber-400', trend: '2 active', trendUp: false },
    { label: 'Completed', value: myTasks.filter(t => t.status === 'Done').length, icon: CheckCircle2, color: 'text-emerald-600 bg-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400', trend: '2 total', trendUp: true },
    { label: 'Overdue', value: myTasks.filter(t => new Date(t.dueDate) < new Date() && t.status !== 'Done').length, icon: AlertTriangle, color: 'text-red-600 bg-red-100 dark:bg-red-500/10 dark:text-red-400', trend: 'Needs attention', trendUp: false },
  ];

  const filtered = myTasks.filter(t => t.title.toLowerCase().includes(search.toLowerCase()) || t.id.toLowerCase().includes(search.toLowerCase()));

  filtered.sort((a, b) => {
    const dir = sortDir === 'asc' ? 1 : -1;
    if (sortField === 'dueDate') return dir * (new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
    const pO = { High: 3, Medium: 2, Low: 1 };
    return dir * ((pO[a.priority as keyof typeof pO] || 0) - (pO[b.priority as keyof typeof pO] || 0));
  });

  return (
    <InternPageShell
      title="My Tasks"
      description="All tasks you have created or own"
      actions={
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-sm">
          <Plus className="w-4 h-4" /> Create Task
        </button>
      }
    >
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
              <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search my tasks..." className="w-full pl-9 pr-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" />
            </div>
            {selected.size > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-slate-500">{selected.size} selected</span>
                <button className="px-3 py-1.5 bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400 border border-red-200 dark:border-red-800 rounded-lg text-xs font-semibold hover:bg-red-100 dark:hover:bg-red-500/20 transition-colors flex items-center gap-1.5">
                  <Trash2 className="w-3.5 h-3.5" /> Delete
                </button>
                <button className="px-3 py-1.5 bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400 border border-blue-200 dark:border-blue-800 rounded-lg text-xs font-semibold hover:bg-blue-100 dark:hover:bg-blue-500/20 transition-colors flex items-center gap-1.5">
                  <CheckSquare className="w-3.5 h-3.5" /> Mark Done
                </button>
              </div>
            )}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/40">
                  <th className="w-10 px-4 py-3">
                    <input type="checkbox" checked={selected.size === filtered.length && filtered.length > 0} onChange={toggleAll} className="rounded border-slate-300 dark:border-slate-600 text-blue-600 focus:ring-blue-500" />
                  </th>
                  <th className="text-left px-2 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Task ID</th>
                  <th className="text-left px-2 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Title</th>
                  <th className="text-left px-2 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                  <th className="text-left px-2 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">
                    <button onClick={() => toggleSort('priority')} className="inline-flex items-center gap-1 hover:text-slate-600 dark:hover:text-slate-200">
                      Priority <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </th>
                  <th className="text-left px-2 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">
                    <button onClick={() => toggleSort('dueDate')} className="inline-flex items-center gap-1 hover:text-slate-600 dark:hover:text-slate-200">
                      Due Date <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </th>
                  <th className="text-left px-2 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Created Date</th>
                  <th className="text-right px-4 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/40">
                {filtered.map((task, i) => (
                  <motion.tr key={task.id} variants={item} className={`hover:bg-slate-50 dark:hover:bg-slate-700/20 transition-colors ${selected.has(task.id) ? 'bg-blue-50/50 dark:bg-blue-500/5' : ''}`}>
                    <td className="px-4 py-3.5">
                      <input type="checkbox" checked={selected.has(task.id)} onChange={() => toggleSelect(task.id)} className="rounded border-slate-300 dark:border-slate-600 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td className="px-2 py-3.5 font-mono text-xs font-bold text-blue-600 dark:text-blue-400">{task.id}</td>
                    <td className="px-2 py-3.5 font-medium text-slate-800 dark:text-slate-200">{task.title}</td>
                    <td className="px-2 py-3.5"><StatusBadge status={task.status} /></td>
                    <td className="px-2 py-3.5"><PriorityBadge priority={task.priority} /></td>
                    <td className="px-2 py-3.5">
                      <span className="inline-flex items-center gap-1 text-slate-500">
                        <Calendar className="w-3.5 h-3.5" />
                        {task.dueDate}
                      </span>
                    </td>
                    <td className="px-2 py-3.5 text-slate-400 text-xs">{task.createdDate}</td>
                    <td className="px-4 py-3.5 text-right">
                      <button className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700/60 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                        <ArrowUpDown className="w-4 h-4" />
                      </button>
                    </td>
                  </motion.tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={8} className="px-5 py-8 text-center text-sm text-slate-400">No tasks found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </motion.div>
    </InternPageShell>
  );
}
