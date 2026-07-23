import React, { useState } from 'react';
import InternPageShell from '../../InternPageShell';
import { motion } from 'framer-motion';
import { Plus, Calendar, User, MoreHorizontal, GripVertical } from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const columnConfig = [
  {
    title: 'To Do',
    color: 'border-t-slate-400',
    bg: 'bg-slate-50/50 dark:bg-slate-800/20',
    tasks: [
      { id: 'T-301', title: 'Design landing page hero', priority: 'High', dueDate: '2026-07-28', assignee: 'You', avatar: 'Y' },
      { id: 'T-302', title: 'Set up staging environment', priority: 'Medium', dueDate: '2026-08-01', assignee: 'You', avatar: 'Y' },
      { id: 'T-303', title: 'Write E2E tests for checkout', priority: 'Low', dueDate: '2026-08-05', assignee: 'You', avatar: 'Y' },
      { id: 'T-304', title: 'Create API rate limiter', priority: 'Medium', dueDate: '2026-07-30', assignee: 'You', avatar: 'Y' },
    ],
  },
  {
    title: 'In Progress',
    color: 'border-t-blue-400',
    bg: 'bg-blue-50/30 dark:bg-blue-500/5',
    tasks: [
      { id: 'T-305', title: 'Implement real-time notifications', priority: 'High', dueDate: '2026-07-25', assignee: 'You', avatar: 'Y' },
      { id: 'T-306', title: 'Refactor user profile page', priority: 'Medium', dueDate: '2026-07-27', assignee: 'You', avatar: 'Y' },
      { id: 'T-307', title: 'Optimize database queries', priority: 'High', dueDate: '2026-07-24', assignee: 'You', avatar: 'Y' },
    ],
  },
  {
    title: 'Done',
    color: 'border-t-emerald-400',
    bg: 'bg-emerald-50/30 dark:bg-emerald-500/5',
    tasks: [
      { id: 'T-308', title: 'Setup CI/CD pipeline', priority: 'Medium', dueDate: '2026-07-20', assignee: 'You', avatar: 'Y' },
      { id: 'T-309', title: 'Create login page', priority: 'High', dueDate: '2026-07-18', assignee: 'You', avatar: 'Y' },
      { id: 'T-310', title: 'Write documentation for API', priority: 'Low', dueDate: '2026-07-22', assignee: 'You', avatar: 'Y' },
      { id: 'T-311', title: 'Setup monitoring dashboard', priority: 'Medium', dueDate: '2026-07-19', assignee: 'You', avatar: 'Y' },
      { id: 'T-312', title: 'Implement dark mode', priority: 'Low', dueDate: '2026-07-21', assignee: 'You', avatar: 'Y' },
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

function TaskCard({ task }: { task: typeof columnConfig[0]['tasks'][0] }) {
  return (
    <div className="bg-white dark:bg-slate-800/80 rounded-lg border border-slate-200 dark:border-slate-700/60 p-3.5 shadow-sm hover:shadow-md transition-all cursor-grab active:cursor-grabbing">
      <div className="flex items-start justify-between mb-2">
        <span className="font-mono text-[10px] font-bold text-blue-600 dark:text-blue-400">{task.id}</span>
        <button className="p-0.5 rounded hover:bg-slate-100 dark:hover:bg-slate-700/60 text-slate-400 transition-colors">
          <MoreHorizontal className="w-3.5 h-3.5" />
        </button>
      </div>
      <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-100 mb-2.5 leading-snug">{task.title}</h4>
      <div className="flex items-center justify-between">
        <PriorityBadge priority={task.priority} />
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span className="inline-flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {task.dueDate}
          </span>
          <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 flex items-center justify-center text-[10px] font-bold">
            {task.avatar}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function TaskBoard() {
  return (
    <InternPageShell title="Task Board" description="Kanban board view of your tasks">
      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {columnConfig.map((col, ci) => (
          <motion.div key={col.title} variants={container} className={`rounded-xl border border-slate-200 dark:border-slate-700/60 border-t-[3px] ${col.color} ${col.bg} shadow-sm`}>
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-slate-700/60">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200">{col.title}</h3>
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-700 text-[10px] font-bold text-slate-500 dark:text-slate-300">
                  {col.tasks.length}
                </span>
              </div>
              <button className="p-1.5 rounded-lg hover:bg-white dark:hover:bg-slate-700/60 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="p-3 space-y-3 min-h-[200px]">
              {col.tasks.map(task => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </InternPageShell>
  );
}
