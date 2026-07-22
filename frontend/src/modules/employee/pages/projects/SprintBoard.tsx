import React, { useState } from 'react';
import { EmployeePageLayout } from '../../components/EmployeePageLayout';
import { GlassPanel } from '../../components/ui/GlassPanel';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Filter, Download, RefreshCw, Search, Plus, Clock, CheckCircle2 } from 'lucide-react';

const todoTasks = [
  { id: 'SP-101', title: 'Design login flow', assignee: 'Rahul Verma', priority: 'High', points: 5 },
  { id: 'SP-102', title: 'Set up CI/CD pipeline', assignee: 'Neha Gupta', priority: 'Critical', points: 8 },
  { id: 'SP-103', title: 'Write unit tests for API', assignee: 'Arjun Nair', priority: 'Medium', points: 3 },
  { id: 'SP-104', title: 'Create onboarding docs', assignee: 'Sneha Kapoor', priority: 'Low', points: 2 },
];

const inProgressTasks = [
  { id: 'SP-105', title: 'Implement WebSocket notifications', assignee: 'Gagan Chaudhary', priority: 'High', points: 8 },
  { id: 'SP-106', title: 'Build analytics dashboard', assignee: 'Priya Patel', priority: 'High', points: 13 },
  { id: 'SP-107', title: 'Refactor payment module', assignee: 'Karan Mehta', priority: 'Critical', points: 5 },
];

const doneTasks = [
  { id: 'SP-108', title: 'Database schema migration', assignee: 'Vikram Singh', priority: 'High', points: 5 },
  { id: 'SP-109', title: 'User authentication flow', assignee: 'Ananya Sharma', priority: 'Critical', points: 8 },
  { id: 'SP-110', title: 'Mobile responsive layout', assignee: 'Rohit Sharma', priority: 'Medium', points: 3 },
  { id: 'SP-111', title: 'Setup error tracking', assignee: 'Gagan Chaudhary', priority: 'Low', points: 2 },
];

const priorityColors: Record<string, string> = { Critical: 'text-rose-500', High: 'text-amber-500', Medium: 'text-blue-500', Low: 'text-slate-400' };

export default function SprintBoard() {
  return (
    <EmployeePageLayout title="Sprint Board" description="Current sprint — Sprint 24 (Jul 14 – Jul 27)" breadcrumbs={['Employee', 'Projects', 'Sprint Board']} actions={
      <div className="flex items-center gap-2">
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium shadow-sm transition-colors"><Plus className="w-4 h-4" /><span>Add Task</span></button>
        <button className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/[0.04] flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"><Filter className="w-4 h-4" /></button>
        <button className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/[0.04] flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"><RefreshCw className="w-4 h-4" /></button>
      </div>
    }>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <GlassPanel className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-4 h-4 text-slate-400" />
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">To Do</h3>
            <span className="text-[10px] text-slate-400 ml-auto">{todoTasks.length}</span>
          </div>
          <div className="space-y-3">
            {todoTasks.map(t => (
              <div key={t.id} className="rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-white/[0.04] p-3">
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
        <GlassPanel className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-amber-400" />
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">In Progress</h3>
            <span className="text-[10px] text-slate-400 ml-auto">{inProgressTasks.length}</span>
          </div>
          <div className="space-y-3">
            {inProgressTasks.map(t => (
              <div key={t.id} className="rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-white/[0.04] p-3">
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
        <GlassPanel className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Done</h3>
            <span className="text-[10px] text-slate-400 ml-auto">{doneTasks.length}</span>
          </div>
          <div className="space-y-3">
            {doneTasks.map(t => (
              <div key={t.id} className="rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-white/[0.04] p-3">
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
      </div>
    </EmployeePageLayout>
  );
}
