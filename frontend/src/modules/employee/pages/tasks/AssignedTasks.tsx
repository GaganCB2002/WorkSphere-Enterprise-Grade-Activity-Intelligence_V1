import React, { useState } from 'react';
import { EmployeePageLayout } from '../../components/EmployeePageLayout';
import { GlassPanel } from '../../components/ui/GlassPanel';
import { AutoStatusBadge } from '../../components/ui/StatusBadge';
import { Filter, Download, RefreshCw, Search, UserCheck } from 'lucide-react';

const mockTasks = [
  { name: 'Implement WebSocket notifications', assignee: 'Rahul Verma', project: 'WorkSphere Core', deadline: '2026-07-25', priority: 'High', status: 'In Progress' },
  { name: 'Design system audit', assignee: 'Sneha Kapoor', project: 'Customer Portal', deadline: '2026-07-20', priority: 'Medium', status: 'To Do' },
  { name: 'API rate limiting', assignee: 'Arjun Nair', project: 'AI Chatbot', deadline: '2026-07-22', priority: 'Critical', status: 'In Progress' },
  { name: 'Database optimization', assignee: 'Vikram Singh', project: 'Data Pipeline v2', deadline: '2026-07-18', priority: 'High', status: 'Done' },
  { name: 'UI component library', assignee: 'Priya Patel', project: 'WorkSphere Core', deadline: '2026-08-01', priority: 'Medium', status: 'To Do' },
  { name: 'Penetration testing', assignee: 'Karan Mehta', project: 'Security Audit', deadline: '2026-07-28', priority: 'Critical', status: 'In Progress' },
  { name: 'Documentation update', assignee: 'Neha Gupta', project: 'DevOps Automation', deadline: '2026-07-30', priority: 'Low', status: 'To Do' },
  { name: 'Load testing setup', assignee: 'Rohit Sharma', project: 'Cloud Migration', deadline: '2026-07-21', priority: 'High', status: 'Done' },
  { name: 'Mobile responsive fixes', assignee: 'Ananya Sharma', project: 'WorkSphere Core', deadline: '2026-07-19', priority: 'Medium', status: 'In Progress' },
  { name: 'Email template redesign', assignee: 'Gagan Chaudhary', project: 'Customer Portal', deadline: '2026-08-05', priority: 'Low', status: 'To Do' },
];

const priorityColors: Record<string, string> = { Critical: 'text-rose-500', High: 'text-amber-500', Medium: 'text-blue-500', Low: 'text-slate-400' };

export default function AssignedTasks() {
  const [search, setSearch] = useState('');
  const filtered = mockTasks.filter(t => t.name.toLowerCase().includes(search.toLowerCase()) || t.assignee.toLowerCase().includes(search.toLowerCase()));
  return (
    <EmployeePageLayout title="Assigned Tasks" description={`${filtered.length} tasks assigned to team members`} breadcrumbs={['Employee', 'Tasks', 'Assigned Tasks']} actions={
      <div className="flex items-center gap-2">
        <button className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/[0.04] flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"><Filter className="w-4 h-4" /></button>
        <button className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/[0.04] flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"><Download className="w-4 h-4" /></button>
        <button className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/[0.04] flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"><RefreshCw className="w-4 h-4" /></button>
      </div>
    }>
      <GlassPanel className="p-4">
        <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/[0.04] rounded-xl max-w-md mb-4">
          <Search className="w-4 h-4 text-slate-400" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search tasks or assignees..." className="w-full text-xs bg-transparent text-slate-900 dark:text-white outline-none placeholder:text-slate-400" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-200/60 dark:border-white/[0.04]">
                <th className="text-left py-3 px-2">Task</th>
                <th className="text-left py-3 px-2">Assignee</th>
                <th className="text-left py-3 px-2">Project</th>
                <th className="text-left py-3 px-2">Deadline</th>
                <th className="text-left py-3 px-2">Priority</th>
                <th className="text-left py-3 px-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((t, i) => (
                <tr key={i} className="border-b border-slate-100 dark:border-white/[0.02] hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors">
                  <td className="py-3 px-2"><div className="flex items-center gap-2"><UserCheck className="w-4 h-4 text-slate-400" /><span className="font-medium text-slate-900 dark:text-white">{t.name}</span></div></td>
                  <td className="py-3 px-2 text-slate-700 dark:text-slate-300">{t.assignee}</td>
                  <td className="py-3 px-2 text-slate-500">{t.project}</td>
                  <td className="py-3 px-2 text-slate-500">{t.deadline}</td>
                  <td className="py-3 px-2"><span className={`font-semibold ${priorityColors[t.priority]}`}>{t.priority}</span></td>
                  <td className="py-3 px-2"><AutoStatusBadge status={t.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassPanel>
    </EmployeePageLayout>
  );
}
