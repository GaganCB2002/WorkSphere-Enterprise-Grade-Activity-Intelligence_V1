import React, { useContext } from 'react';
import { FolderKanban, TrendingUp, CheckCircle, Clock, AlertTriangle, Users, Calendar } from 'lucide-react';
import { useProjects } from '../data/hooks';
import { QaShellContext } from '../layout/QaShell';

export const ProjectManagement: React.FC = () => {
  const { projects, updateStatus, updateCoverage } = useProjects();
  const { addToast } = useContext(QaShellContext);

  const statusColors: Record<string, string> = {
    'QA Sign-off': 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900/30',
    'In Testing': 'bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400 border-violet-200 dark:border-violet-900/30',
    'Blocked': 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border-red-200 dark:border-red-900/30',
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Project Management</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Track QA progress across major enterprise initiatives</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Projects', value: projects.length, icon: FolderKanban, color: 'text-indigo-600', bg: 'bg-indigo-50 dark:bg-indigo-900/20' },
          { label: 'In Testing', value: projects.filter(p => p.status === 'In Testing').length, icon: Clock, color: 'text-violet-600', bg: 'bg-violet-50 dark:bg-violet-900/20' },
          { label: 'Blocked', value: projects.filter(p => p.status === 'Blocked').length, icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-50 dark:bg-red-900/20' },
          { label: 'Avg Coverage', value: `${Math.round(projects.reduce((a, p) => a + p.coverage, 0) / projects.length)}%`, icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
        ].map((s, i) => (
          <div key={i} className={`${s.bg} border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm`}>
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">{s.label}</h3>
              <s.icon className={`w-5 h-5 ${s.color}`} />
            </div>
            <p className="text-3xl font-bold text-slate-900 dark:text-slate-100">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((proj, i) => (
          <div key={proj.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 group">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl">
                  <FolderKanban className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">{proj.name}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Lead: {proj.lead}</p>
                </div>
              </div>
              <select value={proj.status} onChange={e => { updateStatus(proj.id, e.target.value as any); addToast(`${proj.name} status changed to ${e.target.value}`, 'success'); }}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider border cursor-pointer focus:outline-none focus:ring-2 focus:ring-violet-500/30 ${statusColors[proj.status] || ''}`}
              >
                <option value="In Testing">In Testing</option>
                <option value="Blocked">Blocked</option>
                <option value="QA Sign-off">QA Sign-off</option>
              </select>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 mb-5 line-clamp-2">{proj.description}</p>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-bold mb-1.5">
                  <span className="text-slate-500 dark:text-slate-400">Test Coverage</span>
                  <span className="text-slate-900 dark:text-slate-100">{proj.coverage}%</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden cursor-pointer"
                  onClick={() => { const v = Math.min(100, proj.coverage + 5); updateCoverage(proj.id, v); addToast(`${proj.name} coverage updated to ${v}%`, 'info'); }}>
                  <div className={`h-full rounded-full transition-all duration-500 ${proj.coverage >= 90 ? 'bg-gradient-to-r from-emerald-400 to-emerald-600' : proj.coverage >= 70 ? 'bg-gradient-to-r from-violet-400 to-violet-600' : 'bg-gradient-to-r from-amber-400 to-amber-600'}`}
                    style={{ width: `${proj.coverage}%` }} />
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {proj.releaseDate}</span>
                  <span className={`flex items-center gap-1 font-bold ${proj.bugs > 10 ? 'text-red-500' : proj.bugs > 5 ? 'text-amber-500' : 'text-emerald-500'}`}>
                    <AlertTriangle className="w-3.5 h-3.5" /> {proj.bugs} bugs
                  </span>
                </div>
                <div className="flex -space-x-2">
                  {[1, 2, 3].map(j => (
                    <div key={j} className="w-7 h-7 rounded-full border-2 border-white dark:border-slate-900 bg-gradient-to-br from-slate-300 to-slate-400 flex items-center justify-center text-[9px] font-bold text-white" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
