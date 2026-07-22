import React, { useState, useMemo } from 'react';
import { EmployeePageLayout } from '../../components/EmployeePageLayout';
import { GlassPanel } from '../../components/ui/GlassPanel';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Zap, Code, Filter, Download, RefreshCw, Search } from 'lucide-react';

const skills = [
  { name: 'React / TypeScript', category: 'Frontend', proficiency: 92, experience: 5, lastUsed: '2026-01' },
  { name: 'Node.js', category: 'Backend', proficiency: 88, experience: 5, lastUsed: '2026-01' },
  { name: 'Python', category: 'Backend', proficiency: 78, experience: 4, lastUsed: '2025-11' },
  { name: 'PostgreSQL', category: 'Database', proficiency: 82, experience: 4, lastUsed: '2026-01' },
  { name: 'Docker / Kubernetes', category: 'DevOps', proficiency: 75, experience: 3, lastUsed: '2025-12' },
  { name: 'AWS Services', category: 'Cloud', proficiency: 70, experience: 3, lastUsed: '2025-10' },
  { name: 'GraphQL', category: 'API', proficiency: 65, experience: 2, lastUsed: '2025-09' },
  { name: 'MongoDB', category: 'Database', proficiency: 72, experience: 3, lastUsed: '2025-08' },
  { name: 'Redis / Kafka', category: 'Infrastructure', proficiency: 60, experience: 2, lastUsed: '2025-07' },
  { name: 'Figma / Design', category: 'Design', proficiency: 45, experience: 1, lastUsed: '2025-06' },
];

const barColor = (p: number) => p >= 85 ? 'bg-emerald-500' : p >= 70 ? 'bg-blue-500' : p >= 55 ? 'bg-amber-500' : 'bg-rose-500';

export default function Skills() {
  const [searchQuery, setSearchQuery] = useState('');
  const filtered = useMemo(() => skills.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.category.toLowerCase().includes(searchQuery.toLowerCase())
  ), [searchQuery]);

  return (
    <EmployeePageLayout
      title="Skills"
      description="Technical competencies and proficiency levels"
      breadcrumbs={[{ label: 'Employee', href: '/employee/dashboard' }, { label: 'Profile' }, { label: 'Skills' }]}
      searchPlaceholder="Search skills..."
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
        <div className="space-y-3">
          {filtered.map((s, i) => (
            <div key={i} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-white/[0.04]">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <Zap className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{s.name}</p>
                    <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                      <span>{s.category}</span>
                      <span>•</span>
                      <span>{s.experience} yr{s.experience > 1 ? 's' : ''}</span>
                      <span>•</span>
                      <span>Last used: {s.lastUsed}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0 w-40">
                  <div className="flex-1 h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                    <div className={`h-full rounded-full ${barColor(s.proficiency)} transition-all`} style={{ width: `${s.proficiency}%` }} />
                  </div>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 w-8 text-right">{s.proficiency}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
            <p className="text-sm text-slate-400">No skills match your search</p>
          </div>
        )}
      </GlassPanel>
    </EmployeePageLayout>
  );
}
