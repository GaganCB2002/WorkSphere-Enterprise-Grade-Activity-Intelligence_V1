import React, { useState } from 'react';
import { EmployeePageLayout } from '../../components/EmployeePageLayout';
import { GlassPanel } from '../../components/ui/GlassPanel';
import { AutoStatusBadge } from '../../components/ui/StatusBadge';
import { Filter, Download, RefreshCw, Search, Clock } from 'lucide-react';

const mockTimeEntries = [
  { project: 'WorkSphere Core', task: 'API development', date: '2026-07-15', hours: 6.5, billable: 'Yes', description: 'REST endpoint implementation' },
  { project: 'AI Chatbot', task: 'NLU training', date: '2026-07-15', hours: 4.0, billable: 'Yes', description: 'Training data preparation' },
  { project: 'Mobile App', task: 'UI prototyping', date: '2026-07-14', hours: 7.0, billable: 'Yes', description: 'Figma to React components' },
  { project: 'Data Pipeline', task: 'ETL debugging', date: '2026-07-14', hours: 3.5, billable: 'No', description: 'Fix data ingestion issue' },
  { project: 'WorkSphere Core', task: 'Code review', date: '2026-07-13', hours: 2.0, billable: 'Yes', description: 'PR reviews for sprint 24' },
  { project: 'DevOps', task: 'Kubernetes setup', date: '2026-07-13', hours: 5.0, billable: 'Yes', description: 'Cluster configuration' },
  { project: 'Customer Portal', task: 'Bug fixes', date: '2026-07-12', hours: 4.5, billable: 'No', description: 'UI alignment fixes' },
  { project: 'E-commerce', task: 'Report generation', date: '2026-07-12', hours: 3.0, billable: 'Yes', description: 'Monthly analytics report' },
  { project: 'Cloud Migration', task: 'Server audit', date: '2026-07-11', hours: 6.0, billable: 'Yes', description: 'Inventory assessment' },
  { project: 'WorkSphere Core', task: 'Sprint planning', date: '2026-07-11', hours: 1.5, billable: 'No', description: 'Sprint 25 planning session' },
  { project: 'Security Audit', task: 'Penetration testing', date: '2026-07-10', hours: 8.0, billable: 'Yes', description: 'Security vulnerability scan' },
  { project: 'AI Chatbot', task: 'Model evaluation', date: '2026-07-10', hours: 3.0, billable: 'Yes', description: 'Accuracy assessment' },
];

export default function TimeTracking() {
  const [search, setSearch] = useState('');
  const filtered = mockTimeEntries.filter(e => e.project.toLowerCase().includes(search.toLowerCase()) || e.task.toLowerCase().includes(search.toLowerCase()));
  const totalHours = filtered.reduce((s, e) => s + e.hours, 0);
  return (
    <EmployeePageLayout title="Time Tracking" description={`${filtered.length} entries · ${totalHours.toFixed(1)} total hours logged`} breadcrumbs={['Employee', 'Projects', 'Time Tracking']} actions={
      <div className="flex items-center gap-2">
        <button className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/[0.04] flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"><Filter className="w-4 h-4" /></button>
        <button className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/[0.04] flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"><Download className="w-4 h-4" /></button>
        <button className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/[0.04] flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"><RefreshCw className="w-4 h-4" /></button>
      </div>
    }>
      <GlassPanel className="p-4">
        <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/[0.04] rounded-xl max-w-md mb-4">
          <Search className="w-4 h-4 text-slate-400" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by project or task..." className="w-full text-xs bg-transparent text-slate-900 dark:text-white outline-none placeholder:text-slate-400" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-200/60 dark:border-white/[0.04]">
                <th className="text-left py-3 px-2">Project</th>
                <th className="text-left py-3 px-2">Task</th>
                <th className="text-left py-3 px-2">Date</th>
                <th className="text-left py-3 px-2">Hours</th>
                <th className="text-left py-3 px-2">Billable</th>
                <th className="text-left py-3 px-2">Description</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((e, i) => (
                <tr key={i} className="border-b border-slate-100 dark:border-white/[0.02] hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors">
                  <td className="py-3 px-2"><div className="flex items-center gap-2"><Clock className="w-4 h-4 text-slate-400" /><span className="font-medium text-slate-900 dark:text-white">{e.project}</span></div></td>
                  <td className="py-3 px-2 text-slate-700 dark:text-slate-300">{e.task}</td>
                  <td className="py-3 px-2 text-slate-500">{e.date}</td>
                  <td className="py-3 px-2 font-semibold text-slate-900 dark:text-white">{e.hours}</td>
                  <td className="py-3 px-2"><AutoStatusBadge status={e.billable === 'Yes' ? 'Active' : 'Pending'} /></td>
                  <td className="py-3 px-2 text-slate-500 max-w-[200px] truncate">{e.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassPanel>
    </EmployeePageLayout>
  );
}
