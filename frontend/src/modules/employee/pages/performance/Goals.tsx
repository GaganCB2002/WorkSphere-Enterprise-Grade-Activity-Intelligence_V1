import React, { useState, useMemo } from 'react';
import { EmployeePageLayout } from '../../components/EmployeePageLayout';
import { GlassPanel } from '../../components/ui/GlassPanel';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Target, Flag, Filter, Download, RefreshCw, Search } from 'lucide-react';

const goals = [
  { name: 'Complete Q4 Product Launch', category: 'Project', targetDate: '2026-03-15', progress: 75, status: 'On Track' },
  { name: 'Reduce Bug Resolution Time', category: 'Performance', targetDate: '2026-02-28', progress: 60, status: 'On Track' },
  { name: 'Mentor 3 Junior Developers', category: 'Development', targetDate: '2026-06-01', progress: 33, status: 'At Risk' },
  { name: 'Achieve 95% Code Coverage', category: 'Quality', targetDate: '2026-04-30', progress: 70, status: 'On Track' },
  { name: 'Complete AWS Certification', category: 'Learning', targetDate: '2026-05-15', progress: 40, status: 'Behind' },
  { name: 'Improve Sprint Velocity by 20%', category: 'Performance', targetDate: '2026-03-01', progress: 50, status: 'On Track' },
  { name: 'Document API Architecture', category: 'Project', targetDate: '2026-02-15', progress: 90, status: 'On Track' },
  { name: 'Lead Cross-Functional Initiative', category: 'Leadership', targetDate: '2026-07-01', progress: 20, status: 'At Risk' },
  { name: 'Reduce Technical Debt', category: 'Quality', targetDate: '2026-04-01', progress: 45, status: 'Behind' },
  { name: 'Publish Technical Blog Post', category: 'Development', targetDate: '2026-02-10', progress: 100, status: 'On Track' },
];

const statusVariant = (s: string) => s === 'On Track' ? 'active' : s === 'At Risk' ? 'pending' : 'leave';
const barColor = (p: number) => p >= 80 ? 'bg-emerald-500' : p >= 50 ? 'bg-amber-500' : 'bg-rose-500';

export default function Goals() {
  const [searchQuery, setSearchQuery] = useState('');
  const filtered = useMemo(() => goals.filter(g =>
    g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    g.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    g.status.toLowerCase().includes(searchQuery.toLowerCase())
  ), [searchQuery]);

  return (
    <EmployeePageLayout
      title="Goals"
      description="Objectives and key results tracking"
      breadcrumbs={[{ label: 'Employee', href: '/employee/dashboard' }, { label: 'Performance' }, { label: 'Goals' }]}
      searchPlaceholder="Search goals..."
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
        <div className="space-y-3">
          {filtered.map((g, i) => (
            <div key={i} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-white/[0.04]">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <Target className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">{g.name}</p>
                    <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                      <span>{g.category}</span>
                      <span>•</span>
                      <span>Due: {g.targetDate}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4 flex-shrink-0">
                  <div className="w-24">
                    <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                      <span>{g.progress}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                      <div className={`h-full rounded-full ${barColor(g.progress)} transition-all`} style={{ width: `${g.progress}%` }} />
                    </div>
                  </div>
                  <StatusBadge label={g.status} variant={statusVariant(g.status)} />
                </div>
              </div>
            </div>
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
            <p className="text-sm text-slate-400">No goals match your search</p>
          </div>
        )}
      </GlassPanel>
    </EmployeePageLayout>
  );
}
