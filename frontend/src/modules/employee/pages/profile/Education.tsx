import React, { useState, useMemo } from 'react';
import { EmployeePageLayout } from '../../components/EmployeePageLayout';
import { GlassPanel } from '../../components/ui/GlassPanel';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { GraduationCap, BookOpen, Filter, Download, RefreshCw, Search } from 'lucide-react';

const education = [
  { degree: 'B.Tech Computer Science', institution: 'IIT Delhi', year: '2020', percentage: '8.6 CGPA', board: 'IIT System' },
  { degree: 'XII (Senior Secondary)', institution: 'DPS RK Puram', year: '2016', percentage: '94.2%', board: 'CBSE' },
  { degree: 'X (Secondary)', institution: 'DPS RK Puram', year: '2014', percentage: '9.4 CGPA', board: 'CBSE' },
  { degree: 'M.Tech AI & ML', institution: 'IISc Bangalore', year: '2022', percentage: '8.9 CGPA', board: 'IISc System' },
  { degree: 'MBA (Technology Management)', institution: 'IIM Ahmedabad', year: '2024', percentage: '3.6 GPA', board: 'IIM System' },
  { degree: 'PhD Computer Science', institution: 'Stanford University', year: '2026', percentage: 'In Progress', board: 'Stanford' },
];

export default function Education() {
  const [searchQuery, setSearchQuery] = useState('');
  const filtered = useMemo(() => education.filter(e =>
    e.degree.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.institution.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.board.toLowerCase().includes(searchQuery.toLowerCase())
  ), [searchQuery]);

  return (
    <EmployeePageLayout
      title="Education"
      description="Academic qualifications and degrees"
      breadcrumbs={[{ label: 'Employee', href: '/employee/dashboard' }, { label: 'Profile' }, { label: 'Education' }]}
      searchPlaceholder="Search education..."
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
        <div className="relative space-y-0">
          {filtered.map((e, i) => (
            <div key={i} className="relative flex gap-4 pb-6 last:pb-0">
              {i < filtered.length - 1 && <div className="absolute left-[19px] top-10 bottom-0 w-px bg-slate-200 dark:bg-slate-700" />}
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center flex-shrink-0 z-10"><GraduationCap className="w-5 h-5" /></div>
              <div className="flex-1 min-w-0 pt-1">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{e.degree}</h3>
                  <StatusBadge label={e.year} variant="default" dot={false} />
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{e.institution}</p>
                <div className="flex items-center gap-3 mt-1.5 text-[10px] text-slate-400">
                  <span>Score: {e.percentage}</span>
                  <span>•</span>
                  <span>{e.board}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
            <p className="text-sm text-slate-400">No education records match your search</p>
          </div>
        )}
      </GlassPanel>
    </EmployeePageLayout>
  );
}
