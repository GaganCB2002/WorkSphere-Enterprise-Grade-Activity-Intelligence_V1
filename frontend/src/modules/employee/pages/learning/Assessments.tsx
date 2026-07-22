import React, { useState } from 'react';
import { EmployeePageLayout } from '../../components/EmployeePageLayout';
import { GlassPanel } from '../../components/ui/GlassPanel';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Filter, Download, RefreshCw, Search, ClipboardCheck } from 'lucide-react';

const assessments = [
  { id: 1, title: 'JavaScript Fundamentals Quiz', course: 'Web Development 101', type: 'Quiz', score: 85, maxScore: 100, status: 'Passed', date: '2026-04-10' },
  { id: 2, title: 'Python Midterm Exam', course: 'Advanced Python', type: 'Test', score: 72, maxScore: 100, status: 'Passed', date: '2026-04-08' },
  { id: 3, title: 'Database Design Project', course: 'Data Engineering', type: 'Assignment', score: 90, maxScore: 100, status: 'Passed', date: '2026-04-05' },
  { id: 4, title: 'React Hooks Assessment', course: 'React Mastery', type: 'Quiz', score: 45, maxScore: 100, status: 'Failed', date: '2026-04-12' },
  { id: 5, title: 'Machine Learning Final', course: 'ML Foundations', type: 'Test', score: 0, maxScore: 100, status: 'Pending', date: '2026-04-20' },
  { id: 6, title: 'Docker Compose Lab', course: 'DevOps Essentials', type: 'Assignment', score: 78, maxScore: 100, status: 'Passed', date: '2026-04-07' },
  { id: 7, title: 'Agile Methodology Quiz', course: 'Project Management', type: 'Quiz', score: 92, maxScore: 100, status: 'Passed', date: '2026-04-03' },
  { id: 8, title: 'Cloud Architecture Case Study', course: 'AWS Certification Prep', type: 'Assignment', score: 0, maxScore: 100, status: 'Pending', date: '2026-04-22' },
  { id: 9, title: 'Data Structures Exam', course: 'CS Fundamentals', type: 'Test', score: 34, maxScore: 100, status: 'Failed', date: '2026-04-06' },
  { id: 10, title: 'Git Workflow Practical', course: 'Version Control', type: 'Assignment', score: 95, maxScore: 100, status: 'Passed', date: '2026-04-01' },
];

const typeColors: Record<string, string> = {
  Quiz: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  Test: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  Assignment: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400',
};

const statusColors: Record<string, string> = {
  Passed: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  Failed: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  Pending: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
};

export default function Assessments() {
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = assessments.filter(a =>
    a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.course.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <EmployeePageLayout
      title="Assessments"
      description="View and track your assessment results"
      breadcrumbs={['Employee', 'Learning', 'Assessments']}
      actions={
        <div className="flex items-center gap-2">
          {[Filter, Download, RefreshCw].map((Icon, i) => (
            <button key={i} className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/[0.04] text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors">
              <Icon className="w-4 h-4" />
            </button>
          ))}
        </div>
      }
    >
      <GlassPanel className="p-4 flex items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/[0.04] rounded-xl flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400" />
          <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search assessments..." className="w-full text-xs bg-transparent text-slate-900 dark:text-white outline-none placeholder:text-slate-400" />
        </div>
      </GlassPanel>

      <div className="grid gap-3 sm:grid-cols-2">
        {filtered.map(a => (
          <GlassPanel key={a.id} className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                <ClipboardCheck className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-slate-900 dark:text-white truncate">{a.title}</span>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-lg ${typeColors[a.type]}`}>{a.type}</span>
                </div>
                <p className="text-[10px] text-slate-400 mb-2">{a.course}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {a.status === 'Pending' ? (
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-lg ${statusColors[a.status]}`}>{a.status}</span>
                    ) : (
                      <>
                        <span className="text-sm font-bold text-slate-900 dark:text-white">{a.score}<span className="text-xs text-slate-400">/{a.maxScore}</span></span>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-lg ${statusColors[a.status]}`}>{a.status}</span>
                      </>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-400">{a.date}</span>
                </div>
              </div>
            </div>
          </GlassPanel>
        ))}
      </div>
    </EmployeePageLayout>
  );
}
