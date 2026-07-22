import React, { useState } from 'react';
import { EmployeePageLayout } from '../../components/EmployeePageLayout';
import { GlassPanel } from '../../components/ui/GlassPanel';
import { AutoStatusBadge } from '../../components/ui/StatusBadge';
import { Filter, Download, RefreshCw, Search, Calendar, AlertTriangle, Clock } from 'lucide-react';

const mockDeadlines = [
  { name: 'Database optimization', project: 'Data Pipeline v2', deadline: '2026-07-18', priority: 'High', status: 'In Progress', daysRemaining: -4 },
  { name: 'Mobile responsive fixes', project: 'WorkSphere Core', deadline: '2026-07-19', priority: 'Medium', status: 'In Progress', daysRemaining: -3 },
  { name: 'API rate limiting', project: 'AI Chatbot', deadline: '2026-07-22', priority: 'Critical', status: 'In Progress', daysRemaining: 0 },
  { name: 'Load testing setup', project: 'Cloud Migration', deadline: '2026-07-21', priority: 'High', status: 'Done', daysRemaining: -1 },
  { name: 'Design system audit', project: 'Customer Portal', deadline: '2026-07-20', priority: 'Medium', status: 'To Do', daysRemaining: -2 },
  { name: 'Implement WebSocket notifications', project: 'WorkSphere Core', deadline: '2026-07-25', priority: 'High', status: 'In Progress', daysRemaining: 3 },
  { name: 'Penetration testing', project: 'Security Audit', deadline: '2026-07-28', priority: 'Critical', status: 'In Progress', daysRemaining: 6 },
  { name: 'Documentation update', project: 'DevOps Automation', deadline: '2026-07-30', priority: 'Low', status: 'To Do', daysRemaining: 8 },
  { name: 'UI component library', project: 'WorkSphere Core', deadline: '2026-08-01', priority: 'Medium', status: 'To Do', daysRemaining: 10 },
  { name: 'Email template redesign', project: 'Customer Portal', deadline: '2026-08-05', priority: 'Low', status: 'To Do', daysRemaining: 14 },
  { name: 'Analytics dashboard', project: 'E-commerce', deadline: '2026-08-10', priority: 'High', status: 'To Do', daysRemaining: 19 },
  { name: 'Kubernetes migration', project: 'DevOps Automation', deadline: '2026-08-15', priority: 'Critical', status: 'To Do', daysRemaining: 24 },
];

const priorityColors: Record<string, string> = { Critical: 'text-rose-500', High: 'text-amber-500', Medium: 'text-blue-500', Low: 'text-slate-400' };

export default function Deadlines() {
  const [search, setSearch] = useState('');
  const filtered = mockDeadlines.filter(t => t.name.toLowerCase().includes(search.toLowerCase()) || t.project.toLowerCase().includes(search.toLowerCase()));
  return (
    <EmployeePageLayout title="Deadlines" description="Upcoming and past-due task deadlines" breadcrumbs={['Employee', 'Tasks', 'Deadlines']} actions={
      <div className="flex items-center gap-2">
        <button className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/[0.04] flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"><Filter className="w-4 h-4" /></button>
        <button className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/[0.04] flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"><Download className="w-4 h-4" /></button>
        <button className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/[0.04] flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"><RefreshCw className="w-4 h-4" /></button>
      </div>
    }>
      <GlassPanel className="p-4">
        <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/[0.04] rounded-xl max-w-md mb-4">
          <Search className="w-4 h-4 text-slate-400" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search deadlines..." className="w-full text-xs bg-transparent text-slate-900 dark:text-white outline-none placeholder:text-slate-400" />
        </div>
        <div className="space-y-2">
          {filtered.map((t, i) => (
            <div key={i} className={`flex items-center justify-between px-4 py-3 rounded-xl border transition-colors ${t.daysRemaining < 0 ? 'bg-rose-50 dark:bg-rose-500/5 border-rose-200/60 dark:border-rose-500/10' : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200/60 dark:border-white/[0.04]'}`}>
              <div className="flex items-center gap-3">
                {t.daysRemaining < 0 ? <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0" /> : <Calendar className="w-4 h-4 text-slate-400 shrink-0" />}
                <div>
                  <p className="text-xs font-medium text-slate-900 dark:text-white">{t.name}</p>
                  <p className="text-[10px] text-slate-400">{t.project} · Due {t.deadline}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-[10px] font-semibold ${priorityColors[t.priority]}`}>{t.priority}</span>
                <AutoStatusBadge status={t.status} />
                <span className={`text-[10px] font-semibold flex items-center gap-1 ${t.daysRemaining < 0 ? 'text-rose-500' : t.daysRemaining <= 3 ? 'text-amber-500' : 'text-slate-400'}`}>
                  <Clock className="w-3 h-3" />{t.daysRemaining < 0 ? `${Math.abs(t.daysRemaining)}d overdue` : `${t.daysRemaining}d left`}
                </span>
              </div>
            </div>
          ))}
        </div>
      </GlassPanel>
    </EmployeePageLayout>
  );
}
