import React, { useState } from 'react';
import { EmployeePageLayout } from '../../components/EmployeePageLayout';
import { GlassPanel } from '../../components/ui/GlassPanel';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Filter, Download, RefreshCw, Search, Plus, Clock, CheckCircle2 } from 'lucide-react';

const todo = [
  { id: 'T-101', title: 'Design login flow', assignee: 'Rahul Verma', priority: 'High', points: 5 },
  { id: 'T-102', title: 'Set up CI/CD', assignee: 'Neha Gupta', priority: 'Critical', points: 8 },
  { id: 'T-103', title: 'Write unit tests', assignee: 'Arjun Nair', priority: 'Medium', points: 3 },
  { id: 'T-104', title: 'Create onboarding docs', assignee: 'Sneha Kapoor', priority: 'Low', points: 2 },
  { id: 'T-105', title: 'Email template redesign', assignee: 'Gagan Chaudhary', priority: 'Low', points: 3 },
];
const inProgress = [
  { id: 'T-106', title: 'WebSocket notifications', assignee: 'Gagan Chaudhary', priority: 'High', points: 8 },
  { id: 'T-107', title: 'Analytics dashboard', assignee: 'Priya Patel', priority: 'High', points: 13 },
  { id: 'T-108', title: 'Refactor payment module', assignee: 'Karan Mehta', priority: 'Critical', points: 5 },
  { id: 'T-109', title: 'API rate limiting', assignee: 'Arjun Nair', priority: 'Critical', points: 8 },
];
const done = [
  { id: 'T-110', title: 'Database schema migration', assignee: 'Vikram Singh', priority: 'High', points: 5 },
  { id: 'T-111', title: 'User auth flow', assignee: 'Ananya Sharma', priority: 'Critical', points: 8 },
  { id: 'T-112', title: 'Mobile responsive layout', assignee: 'Rohit Sharma', priority: 'Medium', points: 3 },
  { id: 'T-113', title: 'Error tracking setup', assignee: 'Gagan Chaudhary', priority: 'Low', points: 2 },
];

const priorityColors: Record<string, string> = { Critical: 'text-rose-500', High: 'text-amber-500', Medium: 'text-blue-500', Low: 'text-slate-400' };

export default function KanbanBoard() {
  return (
    <EmployeePageLayout title="Kanban Board" description="Drag and drop tasks across workflow stages" breadcrumbs={['Employee', 'Tasks', 'Kanban Board']} actions={
      <div className="flex items-center gap-2">
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium shadow-sm transition-colors"><Plus className="w-4 h-4" /><span>Add Task</span></button>
        <button className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/[0.04] flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"><Filter className="w-4 h-4" /></button>
        <button className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/[0.04] flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"><RefreshCw className="w-4 h-4" /></button>
      </div>
    }>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[{ title: 'To Do', icon: Clock, tasks: todo, color: 'text-slate-400' },
          { title: 'In Progress', icon: Clock, tasks: inProgress, color: 'text-amber-500' },
          { title: 'Done', icon: CheckCircle2, tasks: done, color: 'text-emerald-500' },
        ].map(col => (
          <GlassPanel key={col.title} className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <col.icon className={`w-4 h-4 ${col.color}`} />
              <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">{col.title}</h3>
              <span className="text-[10px] text-slate-400 ml-auto">{col.tasks.length}</span>
            </div>
            <div className="space-y-3">
              {col.tasks.map(t => (
                <div key={t.id} className="rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-white/[0.04] p-3 cursor-pointer hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] text-slate-400 font-mono">{t.id}</span>
                    <span className={`text-[10px] font-semibold ${priorityColors[t.priority]}`}>{t.priority}</span>
                  </div>
                  <p className="text-xs font-medium text-slate-900 dark:text-white mb-2">{t.title}</p>
                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span>{t.assignee}</span>
                    <span>{t.points} SP</span>
                  </div>
                </div>
              ))}
            </div>
          </GlassPanel>
        ))}
      </div>
    </EmployeePageLayout>
  );
}
