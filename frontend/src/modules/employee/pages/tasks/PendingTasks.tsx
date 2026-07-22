import React, { useState } from 'react';
import { EmployeePageLayout } from '../../components/EmployeePageLayout';
import { GlassPanel } from '../../components/ui/GlassPanel';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Filter, Download, RefreshCw, Search, Clock, AlertTriangle } from 'lucide-react';

const mockPending = [
  { name: 'Database optimization', project: 'Data Pipeline v2', priority: 'High', deadline: '2026-07-18', overdue: 4 },
  { name: 'Mobile responsive fixes', project: 'WorkSphere Core', priority: 'Medium', deadline: '2026-07-19', overdue: 3 },
  { name: 'Design system audit', project: 'Customer Portal', priority: 'Medium', deadline: '2026-07-20', overdue: 2 },
  { name: 'Load testing setup', project: 'Cloud Migration', priority: 'High', deadline: '2026-07-21', overdue: 1 },
  { name: 'API rate limiting', project: 'AI Chatbot', priority: 'Critical', deadline: '2026-07-22', overdue: 0 },
  { name: 'Implement WebSocket notifications', project: 'WorkSphere Core', priority: 'High', deadline: '2026-07-25', overdue: -3 },
  { name: 'Penetration testing', project: 'Security Audit', priority: 'Critical', deadline: '2026-07-28', overdue: -6 },
  { name: 'Documentation update', project: 'DevOps Automation', priority: 'Low', deadline: '2026-07-30', overdue: -8 },
  { name: 'UI component library', project: 'WorkSphere Core', priority: 'Medium', deadline: '2026-08-01', overdue: -10 },
  { name: 'Email template redesign', project: 'Customer Portal', priority: 'Low', deadline: '2026-08-05', overdue: -14 },
  { name: 'Analytics dashboard', project: 'E-commerce', priority: 'High', deadline: '2026-08-10', overdue: -19 },
  { name: 'Kubernetes migration', project: 'DevOps Automation', priority: 'Critical', deadline: '2026-08-15', overdue: -24 },
];

const priorityColors: Record<string, string> = { Critical: 'text-rose-500', High: 'text-amber-500', Medium: 'text-blue-500', Low: 'text-slate-400' };

export default function PendingTasks() {
  const [search, setSearch] = useState('');
  const filtered = mockPending.filter(t => t.name.toLowerCase().includes(search.toLowerCase()) || t.project.toLowerCase().includes(search.toLowerCase()));
  return (
    <EmployeePageLayout title="Pending Tasks" description={`${filtered.filter(t => t.overdue >= 0).length} overdue · ${filtered.filter(t => t.overdue < 0).length} upcoming`} breadcrumbs={['Employee', 'Tasks', 'Pending Tasks']} actions={
      <div className="flex items-center gap-2">
        <button className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/[0.04] flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"><Filter className="w-4 h-4" /></button>
        <button className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/[0.04] flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"><Download className="w-4 h-4" /></button>
        <button className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/[0.04] flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"><RefreshCw className="w-4 h-4" /></button>
      </div>
    }>
      <GlassPanel className="p-4">
        <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/[0.04] rounded-xl max-w-md mb-4">
          <Search className="w-4 h-4 text-slate-400" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search pending tasks..." className="w-full text-xs bg-transparent text-slate-900 dark:text-white outline-none placeholder:text-slate-400" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-200/60 dark:border-white/[0.04]">
                <th className="text-left py-3 px-2">Task</th>
                <th className="text-left py-3 px-2">Project</th>
                <th className="text-left py-3 px-2">Priority</th>
                <th className="text-left py-3 px-2">Deadline</th>
                <th className="text-left py-3 px-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((t, i) => (
                <tr key={i} className="border-b border-slate-100 dark:border-white/[0.02] hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors">
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-2">
                      {t.overdue >= 0 ? <AlertTriangle className="w-4 h-4 text-rose-500" /> : <Clock className="w-4 h-4 text-slate-400" />}
                      <span className="font-medium text-slate-900 dark:text-white">{t.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-2 text-slate-500">{t.project}</td>
                  <td className="py-3 px-2"><span className={`font-semibold ${priorityColors[t.priority]}`}>{t.priority}</span></td>
                  <td className={`py-3 px-2 ${t.overdue >= 0 ? 'text-rose-500 font-semibold' : 'text-slate-500'}`}>{t.deadline}</td>
                  <td className="py-3 px-2">
                    <span className={`text-[10px] font-semibold ${t.overdue >= 0 ? 'text-rose-500' : 'text-slate-400'}`}>
                      {t.overdue > 0 ? `${t.overdue}d overdue` : t.overdue === 0 ? 'Due today' : `${Math.abs(t.overdue)}d left`}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassPanel>
    </EmployeePageLayout>
  );
}
