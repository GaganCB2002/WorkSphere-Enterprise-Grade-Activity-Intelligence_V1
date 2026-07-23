import React, { useState } from 'react';
import InternPageShell from '../../InternPageShell';
import { motion } from 'framer-motion';
import {
  Clock, AlertTriangle, Calendar, CalendarDays, Search,
  ArrowUpDown, Eye, Play, ArrowUpRight, ArrowDownRight
} from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const pendingTasks = [
  { id: 'T-501', title: 'Implement payment gateway', daysOverdue: 3, priority: 'High', assignedDate: '2026-07-10', dueDate: '2026-07-20' },
  { id: 'T-502', title: 'Fix navigation bug', daysOverdue: null, priority: 'Medium', assignedDate: '2026-07-15', dueDate: '2026-07-25' },
  { id: 'T-503', title: 'Write API contract docs', daysOverdue: null, priority: 'Low', assignedDate: '2026-07-18', dueDate: '2026-08-02' },
  { id: 'T-504', title: 'Optimize frontend bundle', daysOverdue: 1, priority: 'High', assignedDate: '2026-07-12', dueDate: '2026-07-22' },
  { id: 'T-505', title: 'Setup logging infrastructure', daysOverdue: null, priority: 'Medium', assignedDate: '2026-07-20', dueDate: '2026-07-23' },
  { id: 'T-506', title: 'Create user onboarding guide', daysOverdue: null, priority: 'Low', assignedDate: '2026-07-22', dueDate: '2026-08-05' },
  { id: 'T-507', title: 'Integrate search service', daysOverdue: 5, priority: 'High', assignedDate: '2026-07-08', dueDate: '2026-07-18' },
  { id: 'T-508', title: 'Implement data export feature', daysOverdue: null, priority: 'Medium', assignedDate: '2026-07-19', dueDate: '2026-07-23' },
];

function PriorityBadge({ priority }: { priority: string }) {
  const map: Record<string, string> = {
    High: 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400',
    Medium: 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400',
    Low: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400',
  };
  return <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold ${map[priority] || ''}`}>{priority}</span>;
}

export default function PendingTasks() {
  const [search, setSearch] = useState('');
  const [sortUrgency, setSortUrgency] = useState(false);

  const now = new Date();
  const todayStr = now.toISOString().split('T')[0];
  const weekLater = new Date(now); weekLater.setDate(now.getDate() + 7);

  const kpis = [
    { label: 'Pending Tasks', value: pendingTasks.length, icon: Clock, color: 'text-amber-600 bg-amber-100 dark:bg-amber-500/10 dark:text-amber-400', trend: 'Awaiting action', trendUp: false },
    { label: 'Overdue', value: pendingTasks.filter(t => t.daysOverdue !== null).length, icon: AlertTriangle, color: 'text-red-600 bg-red-100 dark:bg-red-500/10 dark:text-red-400', trend: 'Needs attention', trendUp: false },
    { label: 'Due Today', value: pendingTasks.filter(t => t.dueDate === todayStr).length, icon: Calendar, color: 'text-blue-600 bg-blue-100 dark:bg-blue-500/10 dark:text-blue-400', trend: 'Act now', trendUp: true },
    { label: 'Due This Week', value: pendingTasks.filter(t => { const d = new Date(t.dueDate); return d >= now && d <= weekLater; }).length, icon: CalendarDays, color: 'text-violet-600 bg-violet-100 dark:bg-violet-500/10 dark:text-violet-400', trend: 'Plan ahead', trendUp: true },
  ];

  let filtered = pendingTasks.filter(t =>
    t.title.toLowerCase().includes(search.toLowerCase()) || t.id.toLowerCase().includes(search.toLowerCase())
  );

  if (sortUrgency) {
    filtered.sort((a, b) => {
      const aOverdue = a.daysOverdue ?? -1;
      const bOverdue = b.daysOverdue ?? -1;
      if (aOverdue !== bOverdue) return bOverdue - aOverdue;
      const pO = { High: 3, Medium: 2, Low: 1 };
      return (pO[b.priority as keyof typeof pO] || 0) - (pO[a.priority as keyof typeof pO] || 0);
    });
  }

  return (
    <InternPageShell title="Pending Tasks" description="Tasks awaiting action">
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
              <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search pending tasks..." className="w-full pl-9 pr-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" />
            </div>
            <label className="flex items-center gap-2 text-xs font-medium text-slate-500 cursor-pointer">
              <input type="checkbox" checked={sortUrgency} onChange={e => setSortUrgency(e.target.checked)} className="rounded border-slate-300 dark:border-slate-600 text-blue-600 focus:ring-blue-500" />
              Sort by urgency
            </label>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/40">
                  <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Task ID</th>
                  <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Title</th>
                  <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Days Overdue</th>
                  <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Priority</th>
                  <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Assigned Date</th>
                  <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Due Date</th>
                  <th className="text-right px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/40">
                {filtered.map((task, i) => (
                  <motion.tr key={task.id} variants={item} className={`hover:bg-slate-50 dark:hover:bg-slate-700/20 transition-colors ${task.daysOverdue ? 'bg-red-50/30 dark:bg-red-500/5' : ''}`}>
                    <td className="px-5 py-3.5 font-mono text-xs font-bold text-blue-600 dark:text-blue-400">{task.id}</td>
                    <td className="px-5 py-3.5 font-medium text-slate-800 dark:text-slate-200">{task.title}</td>
                    <td className="px-5 py-3.5">
                      {task.daysOverdue ? (
                        <span className="inline-flex items-center gap-1 text-red-600 dark:text-red-400 font-bold text-xs">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          {task.daysOverdue}d overdue
                        </span>
                      ) : (
                        <span className="text-slate-400 text-xs">—</span>
                      )}
                    </td>
                    <td className="px-5 py-3.5"><PriorityBadge priority={task.priority} /></td>
                    <td className="px-5 py-3.5 text-slate-500">{task.assignedDate}</td>
                    <td className="px-5 py-3.5 text-slate-500">{task.dueDate}</td>
                    <td className="px-5 py-3.5 text-right">
                      <button className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 transition-colors inline-flex items-center gap-1.5 shadow-sm">
                        <Play className="w-3 h-3" /> Take Action
                      </button>
                    </td>
                  </motion.tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={7} className="px-5 py-8 text-center text-sm text-slate-400">No pending tasks found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </motion.div>
    </InternPageShell>
  );
}
