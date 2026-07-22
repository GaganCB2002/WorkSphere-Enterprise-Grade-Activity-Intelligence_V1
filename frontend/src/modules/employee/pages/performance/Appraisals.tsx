import React, { useState, useMemo } from 'react';
import { EmployeePageLayout } from '../../components/EmployeePageLayout';
import { GlassPanel } from '../../components/ui/GlassPanel';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { ClipboardCheck, BarChart3, Filter, Download, RefreshCw, Search } from 'lucide-react';

const appraisals = [
  { cycle: 'Q4 2025', rating: 4.5, reviewer: 'Ananya Sharma', comments: 'Exceeded expectations in all metrics', status: 'Completed', date: '2025-12-20' },
  { cycle: 'Q3 2025', rating: 4.2, reviewer: 'Ananya Sharma', comments: 'Strong technical delivery and team collaboration', status: 'Completed', date: '2025-09-18' },
  { cycle: 'Q2 2025', rating: 3.8, reviewer: 'Rahul Verma', comments: 'Good progress on leadership skills', status: 'Completed', date: '2025-06-22' },
  { cycle: 'Q1 2025', rating: 4.0, reviewer: 'Rahul Verma', comments: 'Consistent performer with quality output', status: 'Completed', date: '2025-03-15' },
  { cycle: 'Annual 2024', rating: 4.3, reviewer: 'Priya Patel', comments: 'Promotion recommended based on performance', status: 'Completed', date: '2024-12-30' },
  { cycle: 'Q2 2024', rating: 3.5, reviewer: 'Priya Patel', comments: 'Needs improvement in stakeholder communication', status: 'Completed', date: '2024-06-10' },
  { cycle: 'Q1 2026', rating: 0, reviewer: 'Ananya Sharma', comments: 'Mid-cycle review scheduled', status: 'Pending', date: '2026-03-01' },
  { cycle: 'Q2 2026', rating: 0, reviewer: 'TBD', comments: 'Not yet initiated', status: 'Pending', date: '2026-06-01' },
];

export default function Appraisals() {
  const [searchQuery, setSearchQuery] = useState('');
  const filtered = useMemo(() => appraisals.filter(a =>
    a.cycle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.reviewer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.status.toLowerCase().includes(searchQuery.toLowerCase())
  ), [searchQuery]);

  const ratingColor = (r: number) => r >= 4 ? 'text-emerald-500' : r >= 3 ? 'text-amber-500' : 'text-slate-400';

  return (
    <EmployeePageLayout
      title="Appraisals"
      description="Performance review cycles and ratings"
      breadcrumbs={[{ label: 'Employee', href: '/employee/dashboard' }, { label: 'Performance' }, { label: 'Appraisals' }]}
      searchPlaceholder="Search appraisals..."
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
        <div className="space-y-4">
          {filtered.map((a, i) => (
            <div key={i} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-white/[0.04] flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0">
                <ClipboardCheck className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{a.cycle}</h3>
                  <div className="flex items-center gap-2">
                    {a.rating > 0 && <span className={`text-sm font-bold ${ratingColor(a.rating)}`}>{a.rating.toFixed(1)}</span>}
                    <StatusBadge label={a.status} variant={a.status === 'Completed' ? 'done' : 'pending'} />
                  </div>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{a.comments}</p>
                <div className="flex items-center gap-3 mt-2 text-[10px] text-slate-400">
                  <span>Reviewer: {a.reviewer}</span>
                  <span>•</span>
                  <span>{a.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
            <p className="text-sm text-slate-400">No appraisals match your search</p>
          </div>
        )}
      </GlassPanel>
    </EmployeePageLayout>
  );
}
