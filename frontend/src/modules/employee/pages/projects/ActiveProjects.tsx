import React, { useState } from 'react';
import { EmployeePageLayout } from '../../components/EmployeePageLayout';
import { GlassPanel } from '../../components/ui/GlassPanel';
import { AutoStatusBadge } from '../../components/ui/StatusBadge';
import { Filter, Download, RefreshCw, Search, FolderKanban } from 'lucide-react';

const mockProjects = [
  { name: 'WorkSphere Core', client: 'Internal', deadline: '2026-08-15', progress: 75, teamSize: 12, status: 'Active' },
  { name: 'AI Chatbot Platform', client: 'TechCorp', deadline: '2026-09-01', progress: 45, teamSize: 8, status: 'Active' },
  { name: 'Data Pipeline v2', client: 'DataFlow Inc', deadline: '2026-07-20', progress: 90, teamSize: 6, status: 'Active' },
  { name: 'Mobile App Redesign', client: 'AppStudio', deadline: '2026-08-30', progress: 30, teamSize: 10, status: 'At Risk' },
  { name: 'Cloud Migration', client: 'Internal', deadline: '2026-10-01', progress: 20, teamSize: 15, status: 'At Risk' },
  { name: 'Legacy System Audit', client: 'FinBank', deadline: '2026-06-30', progress: 100, teamSize: 4, status: 'Completed' },
  { name: 'E-commerce Analytics', client: 'ShopMax', deadline: '2026-09-15', progress: 60, teamSize: 7, status: 'Active' },
  { name: 'DevOps Automation', client: 'Internal', deadline: '2026-08-01', progress: 85, teamSize: 5, status: 'Active' },
  { name: 'Customer Portal', client: 'ServeCorp', deadline: '2026-07-25', progress: 55, teamSize: 9, status: 'Active' },
];

export default function ActiveProjects() {
  const [search, setSearch] = useState('');
  const filtered = mockProjects.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
  return (
    <EmployeePageLayout title="Active Projects" description="Monitor and manage all ongoing projects" breadcrumbs={['Employee', 'Projects', 'Active Projects']} actions={
      <div className="flex items-center gap-2">
        <button className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/[0.04] flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"><Filter className="w-4 h-4" /></button>
        <button className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/[0.04] flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"><Download className="w-4 h-4" /></button>
        <button className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/[0.04] flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"><RefreshCw className="w-4 h-4" /></button>
      </div>
    }>
      <GlassPanel className="p-4">
        <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/[0.04] rounded-xl max-w-md mb-4">
          <Search className="w-4 h-4 text-slate-400" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search projects..." className="w-full text-xs bg-transparent text-slate-900 dark:text-white outline-none placeholder:text-slate-400" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((p, i) => (
            <div key={i} className="rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-white/[0.04] p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center"><FolderKanban className="w-4 h-4" /></div>
                  <div>
                    <p className="text-xs font-semibold text-slate-900 dark:text-white">{p.name}</p>
                    <p className="text-[10px] text-slate-400">{p.client}</p>
                  </div>
                </div>
                <AutoStatusBadge status={p.status} />
              </div>
              <div className="mb-3">
                <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                  <span>Progress</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">{p.progress}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-700/50 overflow-hidden">
                  <div className="h-full rounded-full bg-blue-500" style={{ width: `${p.progress}%` }} />
                </div>
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-400">
                <span>Deadline: {p.deadline}</span>
                <span>Team: {p.teamSize}</span>
              </div>
            </div>
          ))}
        </div>
      </GlassPanel>
    </EmployeePageLayout>
  );
}
