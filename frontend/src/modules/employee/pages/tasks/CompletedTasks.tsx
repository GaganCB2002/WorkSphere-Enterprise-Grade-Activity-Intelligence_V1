import React, { useState } from 'react';
import { EmployeePageLayout } from '../../components/EmployeePageLayout';
import { GlassPanel } from '../../components/ui/GlassPanel';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Filter, Download, RefreshCw, Search, CheckCircle2, Trophy } from 'lucide-react';

const mockCompleted = [
  { name: 'Database schema migration', project: 'WorkSphere Core', completedDate: '2026-07-14', priority: 'High', assignedBy: 'Ananya Sharma' },
  { name: 'User authentication flow', project: 'WorkSphere Core', completedDate: '2026-07-13', priority: 'Critical', assignedBy: 'Gagan Chaudhary' },
  { name: 'Mobile responsive layout', project: 'Customer Portal', completedDate: '2026-07-12', priority: 'Medium', assignedBy: 'Priya Patel' },
  { name: 'Setup error tracking', project: 'DevOps Automation', completedDate: '2026-07-11', priority: 'Low', assignedBy: 'Neha Gupta' },
  { name: 'Load testing setup', project: 'Cloud Migration', completedDate: '2026-07-10', priority: 'High', assignedBy: 'Vikram Singh' },
  { name: 'Database optimization', project: 'Data Pipeline v2', completedDate: '2026-07-09', priority: 'High', assignedBy: 'Rahul Verma' },
  { name: 'SSL certificate renewal', project: 'Security Audit', completedDate: '2026-07-08', priority: 'Critical', assignedBy: 'Karan Mehta' },
  { name: 'Logging infrastructure', project: 'AI Chatbot', completedDate: '2026-07-07', priority: 'Medium', assignedBy: 'Sneha Kapoor' },
  { name: 'API documentation', project: 'WorkSphere Core', completedDate: '2026-07-06', priority: 'Low', assignedBy: 'Arjun Nair' },
  { name: 'CI/CD pipeline v2', project: 'DevOps Automation', completedDate: '2026-07-05', priority: 'High', assignedBy: 'Rohit Sharma' },
];

const priorityColors: Record<string, string> = { Critical: 'text-rose-500', High: 'text-amber-500', Medium: 'text-blue-500', Low: 'text-slate-400' };

export default function CompletedTasks() {
  const [search, setSearch] = useState('');
  const filtered = mockCompleted.filter(t => t.name.toLowerCase().includes(search.toLowerCase()) || t.project.toLowerCase().includes(search.toLowerCase()));
  return (
    <EmployeePageLayout title="Completed Tasks" description={`${filtered.length} tasks completed — great work!`} breadcrumbs={['Employee', 'Tasks', 'Completed Tasks']} actions={
      <div className="flex items-center gap-2">
        <button className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/[0.04] flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"><Filter className="w-4 h-4" /></button>
        <button className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/[0.04] flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"><Download className="w-4 h-4" /></button>
        <button className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/[0.04] flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"><RefreshCw className="w-4 h-4" /></button>
      </div>
    }>
      <GlassPanel className="p-4">
        <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/[0.04] rounded-xl max-w-md mb-4">
          <Search className="w-4 h-4 text-slate-400" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search completed tasks..." className="w-full text-xs bg-transparent text-slate-900 dark:text-white outline-none placeholder:text-slate-400" />
        </div>
        <div className="space-y-2">
          {filtered.map((t, i) => (
            <div key={i} className="flex items-center justify-between px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-white/[0.04]">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                <div>
                  <p className="text-xs font-medium text-slate-900 dark:text-white">{t.name}</p>
                  <p className="text-[10px] text-slate-400">{t.project} · Completed {t.completedDate}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-[10px] font-semibold ${priorityColors[t.priority]}`}>{t.priority}</span>
                <span className="text-[10px] text-slate-400">by {t.assignedBy}</span>
              </div>
            </div>
          ))}
        </div>
      </GlassPanel>
    </EmployeePageLayout>
  );
}
