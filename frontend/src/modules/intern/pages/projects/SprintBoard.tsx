import React from 'react';
import InternPageShell from '../../InternPageShell';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Clock, Target, Calendar, MoreHorizontal, Zap } from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const burndownData = [
  { day: 'Mon', ideal: 48, actual: 48 },
  { day: 'Tue', ideal: 40, actual: 42 },
  { day: 'Wed', ideal: 32, actual: 33 },
  { day: 'Thu', ideal: 24, actual: 28 },
  { day: 'Fri', ideal: 16, actual: 18 },
  { day: 'Sat', ideal: 8, actual: 10 },
  { day: 'Sun', ideal: 0, actual: 0 },
];

const columns = [
  {
    title: 'Backlog',
    color: 'border-t-slate-400',
    bg: 'bg-slate-50/50 dark:bg-slate-800/20',
    tasks: [
      { id: 'S-101', title: 'User profile page', priority: 'Medium', points: 5, assignee: 'Y' },
      { id: 'S-102', title: 'Password reset flow', priority: 'High', points: 8, assignee: 'Y' },
      { id: 'S-103', title: 'Email notification service', priority: 'Low', points: 3, assignee: 'Y' },
    ],
  },
  {
    title: 'In Progress',
    color: 'border-t-blue-400',
    bg: 'bg-blue-50/30 dark:bg-blue-500/5',
    tasks: [
      { id: 'S-104', title: 'Dashboard widgets', priority: 'High', points: 8, assignee: 'Y' },
      { id: 'S-105', title: 'API integration layer', priority: 'Medium', points: 5, assignee: 'Y' },
    ],
  },
  {
    title: 'In Review',
    color: 'border-t-amber-400',
    bg: 'bg-amber-50/30 dark:bg-amber-500/5',
    tasks: [
      { id: 'S-106', title: 'Login page redesign', priority: 'High', points: 5, assignee: 'Y' },
    ],
  },
  {
    title: 'Done',
    color: 'border-t-emerald-400',
    bg: 'bg-emerald-50/30 dark:bg-emerald-500/5',
    tasks: [
      { id: 'S-107', title: 'Navigation refactor', priority: 'Medium', points: 3, assignee: 'Y' },
      { id: 'S-108', title: 'Footer component', priority: 'Low', points: 2, assignee: 'Y' },
      { id: 'S-109', title: 'Theme configuration', priority: 'Medium', points: 3, assignee: 'Y' },
      { id: 'S-110', title: 'Error boundary setup', priority: 'High', points: 5, assignee: 'Y' },
    ],
  },
];

function PriorityBadge({ priority }: { priority: string }) {
  const map: Record<string, string> = {
    High: 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400',
    Medium: 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400',
    Low: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400',
  };
  return <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold ${map[priority] || ''}`}>{priority}</span>;
}

function TaskCard({ task }: { task: typeof columns[0]['tasks'][0] }) {
  return (
    <div className="bg-white dark:bg-slate-800/80 rounded-lg border border-slate-200 dark:border-slate-700/60 p-3 shadow-sm hover:shadow-md transition-all">
      <div className="flex items-start justify-between mb-1.5">
        <span className="font-mono text-[10px] font-bold text-blue-600 dark:text-blue-400">{task.id}</span>
        <button className="p-0.5 rounded hover:bg-slate-100 dark:hover:bg-slate-700/60 text-slate-400 transition-colors">
          <MoreHorizontal className="w-3.5 h-3.5" />
        </button>
      </div>
      <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-100 mb-2">{task.title}</h4>
      <div className="flex items-center justify-between">
        <PriorityBadge priority={task.priority} />
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-bold text-slate-400">{task.points}pts</span>
          <span className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 flex items-center justify-center text-[9px] font-bold">
            {task.assignee}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function SprintBoard() {
  const totalPoints = 48;
  const completedPoints = columns[3].tasks.reduce((s, t) => s + t.points, 0);
  const daysRemaining = 2;

  return (
    <InternPageShell title="Sprint Board" description="Active sprint tasks and progress">
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
        {/* Sprint Header */}
        <motion.div variants={item} className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl p-5 shadow-sm">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Zap className="w-5 h-5 text-amber-500" />
                <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Sprint 7 — Dashboard Overhaul</h2>
              </div>
              <p className="text-xs text-slate-400 flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5" />
                Jul 17 – Jul 23, 2026
              </p>
            </div>
            <div className="flex items-center gap-5">
              <div className="text-center">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Days Left</p>
                <p className="text-xl font-bold text-slate-800 dark:text-slate-100">{daysRemaining}</p>
              </div>
              <div className="text-center">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Pts</p>
                <p className="text-xl font-bold text-slate-800 dark:text-slate-100">{totalPoints}</p>
              </div>
              <div className="text-center">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Completed</p>
                <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">{completedPoints}</p>
              </div>
              <div className="text-center">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Progress</p>
                <p className="text-xl font-bold text-blue-600 dark:text-blue-400">{Math.round((completedPoints / totalPoints) * 100)}%</p>
              </div>
            </div>
          </div>
          <div className="mt-4 w-full h-2.5 bg-slate-100 dark:bg-slate-700/60 rounded-full overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-emerald-500 transition-all duration-500" style={{ width: `${(completedPoints / totalPoints) * 100}%` }} />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Board */}
          <motion.div variants={item} className="lg:col-span-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {columns.map(col => (
              <div key={col.title} className={`rounded-xl border border-slate-200 dark:border-slate-700/60 border-t-[3px] ${col.color} ${col.bg} shadow-sm`}>
                <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-slate-200 dark:border-slate-700/60">
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-xs font-bold text-slate-700 dark:text-slate-200">{col.title}</h3>
                    <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-slate-200 dark:bg-slate-700 text-[9px] font-bold text-slate-500 dark:text-slate-300">{col.tasks.length}</span>
                  </div>
                </div>
                <div className="p-2.5 space-y-2 min-h-[120px]">
                  {col.tasks.map(task => (
                    <TaskCard key={task.id} task={task} />
                  ))}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Burndown Chart */}
          <motion.div variants={item} className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">Burndown Chart</h3>
              <span className="text-xs text-slate-400">Story Points</span>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={burndownData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                  labelStyle={{ fontWeight: 600, fontSize: 13 }}
                />
                <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
                <Line type="monotone" dataKey="ideal" stroke="#94a3b8" strokeWidth={2} strokeDasharray="5 5" dot={false} name="Ideal" />
                <Line type="monotone" dataKey="actual" stroke="#3b82f6" strokeWidth={2.5} dot={{ r: 4, fill: '#3b82f6' }} name="Actual" />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </motion.div>
    </InternPageShell>
  );
}
