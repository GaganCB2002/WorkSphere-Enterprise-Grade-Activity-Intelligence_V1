import React, { useState } from 'react';
import InternPageShell from '../../InternPageShell';
import { motion } from 'framer-motion';
import {
  CheckCircle2, Clock, CalendarDays, Trophy, Search,
  ArrowUpDown, Eye, UserCheck, ArrowUpRight
} from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const completedTasks = [
  { id: 'T-401', title: 'Implement login page', project: 'Portal Redesign', completedDate: '2026-07-18', completedBy: 'You', priority: 'High' },
  { id: 'T-402', title: 'Set up CI/CD', project: 'DevOps', completedDate: '2026-07-19', completedBy: 'You', priority: 'Medium' },
  { id: 'T-403', title: 'Write unit tests for auth', project: 'API Gateway', completedDate: '2026-07-20', completedBy: 'You', priority: 'High' },
  { id: 'T-404', title: 'Create user dashboard', project: 'Portal Redesign', completedDate: '2026-07-15', completedBy: 'Mentor', priority: 'Low' },
  { id: 'T-405', title: 'Setup error monitoring', project: 'DevOps', completedDate: '2026-07-22', completedBy: 'You', priority: 'Medium' },
  { id: 'T-406', title: 'Design email templates', project: 'Analytics Tool', completedDate: '2026-07-10', completedBy: 'You', priority: 'Low' },
  { id: 'T-407', title: 'API rate limiting', project: 'API Gateway', completedDate: '2026-07-21', completedBy: 'You', priority: 'High' },
  { id: 'T-408', title: 'Database backup script', project: 'DevOps', completedDate: '2026-07-05', completedBy: 'Mentor', priority: 'Medium' },
];

function PriorityBadge({ priority }: { priority: string }) {
  const map: Record<string, string> = {
    High: 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400',
    Medium: 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400',
    Low: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400',
  };
  return <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold ${map[priority] || ''}`}>{priority}</span>;
}

export default function CompletedTasks() {
  const [search, setSearch] = useState('');
  const [dateRange, setDateRange] = useState('all');

  const now = new Date();
  const thisWeekStart = new Date(now); thisWeekStart.setDate(now.getDate() - now.getDay());
  const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);

  const kpis = [
    { label: 'Completed This Week', value: completedTasks.filter(t => new Date(t.completedDate) >= thisWeekStart).length, icon: Clock, color: 'text-blue-600 bg-blue-100 dark:bg-blue-500/10 dark:text-blue-400' },
    { label: 'Completed This Month', value: completedTasks.filter(t => new Date(t.completedDate) >= thisMonthStart).length, icon: CalendarDays, color: 'text-violet-600 bg-violet-100 dark:bg-violet-500/10 dark:text-violet-400' },
    { label: 'Total Completed', value: completedTasks.length, icon: Trophy, color: 'text-emerald-600 bg-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400' },
  ];

  const filtered = completedTasks.filter(t => {
    const matchSearch = t.title.toLowerCase().includes(search.toLowerCase()) || t.id.toLowerCase().includes(search.toLowerCase()) || t.project.toLowerCase().includes(search.toLowerCase());
    if (!matchSearch) return false;
    const d = new Date(t.completedDate);
    if (dateRange === 'week') return d >= thisWeekStart;
    if (dateRange === 'month') return d >= thisMonthStart;
    return true;
  });

  return (
    <InternPageShell title="Completed Tasks" description="Tasks you have finished">
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {kpis.map((kpi, i) => {
            const Icon = kpi.icon;
            return (
              <motion.div key={kpi.label} variants={item} className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className={`p-2.5 rounded-lg ${kpi.color}`}><Icon className="w-5 h-5" /></div>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full text-emerald-700 bg-emerald-50 dark:bg-emerald-500/10 dark:text-emerald-400">
                    <ArrowUpRight className="w-3 h-3" />+{kpi.value > 0 ? kpi.value : 0}
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
              <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search completed tasks..." className="w-full pl-9 pr-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" />
            </div>
            <select value={dateRange} onChange={e => setDateRange(e.target.value)} className="px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 focus:outline-none focus:border-blue-500">
              <option value="all">All Time</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/40">
                  <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Task ID</th>
                  <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Title</th>
                  <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Project</th>
                  <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Completed Date</th>
                  <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Completed By</th>
                  <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Priority</th>
                  <th className="text-right px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/40">
                {filtered.map((task, i) => (
                  <motion.tr key={task.id} variants={item} className="hover:bg-slate-50 dark:hover:bg-slate-700/20 transition-colors">
                    <td className="px-5 py-3.5 font-mono text-xs font-bold text-blue-600 dark:text-blue-400">{task.id}</td>
                    <td className="px-5 py-3.5 font-medium text-slate-800 dark:text-slate-200">{task.title}</td>
                    <td className="px-5 py-3.5 text-slate-500">{task.project}</td>
                    <td className="px-5 py-3.5 text-slate-500">{task.completedDate}</td>
                    <td className="px-5 py-3.5">
                      <span className="inline-flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                        <UserCheck className="w-3.5 h-3.5 text-slate-400" />
                        {task.completedBy}
                      </span>
                    </td>
                    <td className="px-5 py-3.5"><PriorityBadge priority={task.priority} /></td>
                    <td className="px-5 py-3.5 text-right">
                      <button className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700/60 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </motion.tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={7} className="px-5 py-8 text-center text-sm text-slate-400">No completed tasks found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </motion.div>
    </InternPageShell>
  );
}
