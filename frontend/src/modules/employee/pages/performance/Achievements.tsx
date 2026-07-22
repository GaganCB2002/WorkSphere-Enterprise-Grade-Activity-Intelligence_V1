import React, { useState, useMemo } from 'react';
import { EmployeePageLayout } from '../../components/EmployeePageLayout';
import { GlassPanel } from '../../components/ui/GlassPanel';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Award, Trophy, Star, Filter, Download, RefreshCw, Search } from 'lucide-react';

const achievements = [
  { title: 'Employee of the Month', description: 'Outstanding performance in Q1 2026', date: '2026-01-15', type: 'Award', icon: '🏆' },
  { title: '5 Years Service Milestone', description: 'Completed 5 years of dedicated service', date: '2025-11-20', type: 'Milestone', icon: '🎖️' },
  { title: 'Best Team Player', description: 'Voted by peers for exceptional collaboration', date: '2025-09-10', type: 'Recognition', icon: '🌟' },
  { title: 'Innovation Champion', description: 'Ideas that saved 20% operational costs', date: '2025-07-05', type: 'Award', icon: '💡' },
  { title: 'Perfect Attendance', description: '100% attendance for FY 2024-25', date: '2025-03-31', type: 'Milestone', icon: '📅' },
  { title: 'Client Appreciation', description: 'Commended by client for project delivery', date: '2025-02-14', type: 'Recognition', icon: '👏' },
  { title: 'Mentor of the Year', description: 'Guided 5 new hires through onboarding', date: '2024-12-20', type: 'Award', icon: '🎓' },
  { title: 'Spot Award', description: 'Quick turnaround on critical production issue', date: '2024-10-08', type: 'Recognition', icon: '⚡' },
  { title: 'Leadership Excellence', description: 'Led team to deliver ahead of schedule', date: '2024-08-15', type: 'Award', icon: '👑' },
  { title: 'Customer Satisfaction Hero', description: 'Achieved 100% CSAT score for 6 months', date: '2024-03-22', type: 'Recognition', icon: '😊' },
];

export default function Achievements() {
  const [searchQuery, setSearchQuery] = useState('');
  const filtered = useMemo(() => achievements.filter(a =>
    a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.type.toLowerCase().includes(searchQuery.toLowerCase())
  ), [searchQuery]);

  return (
    <EmployeePageLayout
      title="Achievements"
      description="Recognitions, awards and milestones"
      breadcrumbs={[{ label: 'Employee', href: '/employee/dashboard' }, { label: 'Performance' }, { label: 'Achievements' }]}
      searchPlaceholder="Search achievements..."
      onSearch={setSearchQuery}
      actions={
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition-colors"><Filter className="w-4 h-4" /></button>
          <button className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition-colors"><Download className="w-4 h-4" /></button>
          <button className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition-colors"><RefreshCw className="w-4 h-4" /></button>
        </div>
      }
    >
      <GlassPanel className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((a, i) => (
            <div key={i} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-white/[0.04] flex items-start gap-3">
              <span className="text-2xl">{a.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white truncate">{a.title}</h3>
                  <StatusBadge label={a.type} variant={a.type === 'Award' ? 'active' : a.type === 'Milestone' ? 'working' : 'pending'} />
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">{a.description}</p>
                <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-2">{a.date}</p>
              </div>
            </div>
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
            <p className="text-sm text-slate-400">No achievements match your search</p>
          </div>
        )}
      </GlassPanel>
    </EmployeePageLayout>
  );
}
