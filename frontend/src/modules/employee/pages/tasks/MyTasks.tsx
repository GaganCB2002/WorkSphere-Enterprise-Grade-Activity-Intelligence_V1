import React, { useState } from 'react';
import { EmployeePageLayout } from '../../components/EmployeePageLayout';
import { GlassPanel } from '../../components/ui/GlassPanel';
import { AutoStatusBadge } from '../../components/ui/StatusBadge';
import { Filter, Download, RefreshCw, Search, ListTodo } from 'lucide-react';

const mockTasks = [
  { name: 'Implement WebSocket notifications', project: 'WorkSphere Core', priority: 'High', deadline: '2026-07-25', status: 'In Progress', progress: 65 },
  { name: 'API rate limiting middleware', project: 'AI Chatbot', priority: 'Critical', deadline: '2026-07-22', status: 'In Progress', progress: 40 },
  { name: 'Email template redesign', project: 'Customer Portal', priority: 'Low', deadline: '2026-08-05', status: 'To Do', progress: 0 },
  { name: 'Dashboard widget system', project: 'E-commerce Analytics', priority: 'Medium', deadline: '2026-08-10', status: 'To Do', progress: 10 },
  { name: 'Log aggregation service', project: 'DevOps Automation', priority: 'High', deadline: '2026-07-28', status: 'In Progress', progress: 75 },
  { name: 'OAuth integration', project: 'WorkSphere Core', priority: 'Critical', deadline: '2026-07-30', status: 'To Do', progress: 5 },
  { name: 'Unit test coverage', project: 'Data Pipeline v2', priority: 'Medium', deadline: '2026-08-01', status: 'Done', progress: 100 },
  { name: 'Mobile push notifications', project: 'Mobile App', priority: 'High', deadline: '2026-08-15', status: 'To Do', progress: 0 },
  { name: 'Search indexing optimization', project: 'WorkSphere Core', priority: 'Medium', deadline: '2026-07-20', status: 'Done', progress: 100 },
  { name: 'Alerting system upgrade', project: 'DevOps Automation', priority: 'Low', deadline: '2026-08-20', status: 'To Do', progress: 0 },
];

const priorityColors: Record<string, string> = { Critical: 'text-rose-500', High: 'text-amber-500', Medium: 'text-blue-500', Low: 'text-slate-400' };

export default function MyTasks() {
  const [search, setSearch] = useState('');
  const filtered = mockTasks.filter(t => t.name.toLowerCase().includes(search.toLowerCase()) || t.project.toLowerCase().includes(search.toLowerCase()));
  return (
    <EmployeePageLayout title="My Tasks" description={`${filtered.length} tasks assigned to you`} breadcrumbs={['Employee', 'Tasks', 'My Tasks']} actions={
      <div className="flex items-center gap-2">
        <button className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/[0.04] flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"><Filter className="w-4 h-4" /></button>
        <button className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/[0.04] flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"><Download className="w-4 h-4" /></button>
        <button className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/[0.04] flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"><RefreshCw className="w-4 h-4" /></button>
      </div>
    }>
      <GlassPanel className="p-4">
        <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/[0.04] rounded-xl max-w-md mb-4">
          <Search className="w-4 h-4 text-slate-400" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search tasks..." className="w-full text-xs bg-transparent text-slate-900 dark:text-white outline-none placeholder:text-slate-400" />
        </div>
        <div className="space-y-2">
          {filtered.map((t, i) => (
            <div key={i} className="flex items-center gap-4 px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-white/[0.04]">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <ListTodo className="w-4 h-4 text-slate-400 shrink-0" />
                  <p className="text-xs font-medium text-slate-900 dark:text-white truncate">{t.name}</p>
                </div>
                <div className="flex items-center gap-3 text-[10px] text-slate-400">
                  <span>{t.project}</span>
                  <span>Due {t.deadline}</span>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className={`text-[10px] font-semibold ${priorityColors[t.priority]}`}>{t.priority}</span>
                <AutoStatusBadge status={t.status} />
                <div className="w-16">
                  <div className="flex items-center justify-between text-[10px] text-slate-400 mb-0.5">
                    <span>{t.progress}%</span>
                  </div>
                  <div className="w-full h-1 rounded-full bg-slate-200 dark:bg-slate-700/50 overflow-hidden">
                    <div className="h-full rounded-full bg-blue-500" style={{ width: `${t.progress}%` }} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </GlassPanel>
    </EmployeePageLayout>
  );
}
