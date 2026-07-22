import React from 'react';
import { EmployeePageLayout } from '../../components/EmployeePageLayout';
import { GlassPanel } from '../../components/ui/GlassPanel';
import { AutoStatusBadge } from '../../components/ui/StatusBadge';
import { Filter, Download, RefreshCw, Search, Users, ChevronRight } from 'lucide-react';

const orgData = [
  { name: 'Ananya Sharma', role: 'CTO', department: 'Engineering', reportsTo: null, teamSize: 24 },
  { name: 'Gagan Chaudhary', role: 'Engineering Lead', department: 'Engineering', reportsTo: 'Ananya Sharma', teamSize: 8 },
  { name: 'Rahul Verma', role: 'Senior Developer', department: 'Engineering', reportsTo: 'Gagan Chaudhary', teamSize: 0 },
  { name: 'Priya Patel', role: 'Senior Developer', department: 'Engineering', reportsTo: 'Gagan Chaudhary', teamSize: 0 },
  { name: 'Arjun Nair', role: 'Developer', department: 'Engineering', reportsTo: 'Gagan Chaudhary', teamSize: 0 },
  { name: 'Vikram Singh', role: 'Data Engineering Lead', department: 'Data', reportsTo: 'Ananya Sharma', teamSize: 5 },
  { name: 'Sneha Kapoor', role: 'Data Analyst', department: 'Data', reportsTo: 'Vikram Singh', teamSize: 0 },
  { name: 'Karan Mehta', role: 'Security Lead', department: 'Security', reportsTo: 'Ananya Sharma', teamSize: 3 },
  { name: 'Neha Gupta', role: 'DevOps Lead', department: 'Infrastructure', reportsTo: 'Ananya Sharma', teamSize: 4 },
  { name: 'Rohit Sharma', role: 'DevOps Engineer', department: 'Infrastructure', reportsTo: 'Neha Gupta', teamSize: 0 },
];

export default function OrganizationChart() {
  const getLevel = (name: string) => {
    let level = 0;
    let person = orgData.find(p => p.name === name);
    while (person?.reportsTo) {
      level++;
      person = orgData.find(p => p.name === person!.reportsTo);
    }
    return level;
  };
  return (
    <EmployeePageLayout title="Organization Chart" description={`${orgData.length} team members across ${new Set(orgData.map(p => p.department)).size} departments`} breadcrumbs={['Employee', 'Team', 'Organization Chart']} actions={
      <div className="flex items-center gap-2">
        <button className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/[0.04] flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"><Filter className="w-4 h-4" /></button>
        <button className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/[0.04] flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"><Download className="w-4 h-4" /></button>
        <button className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/[0.04] flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"><RefreshCw className="w-4 h-4" /></button>
      </div>
    }>
      <GlassPanel className="p-4">
        <div className="space-y-1">
          {orgData.map((p, i) => {
            const level = getLevel(p.name);
            return (
              <div key={i} className="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors" style={{ paddingLeft: `${16 + level * 24}px` }}>
                {level > 0 && <ChevronRight className="w-3 h-3 text-slate-300 shrink-0" />}
                <div className="w-8 h-8 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-bold shrink-0">{p.name.split(' ').map(n => n[0]).join('')}</div>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-slate-900 dark:text-white">{p.name}</p>
                  <p className="text-[10px] text-slate-400">{p.role} · {p.department}</p>
                </div>
                <div className="flex items-center gap-3 text-[10px] text-slate-400">
                  {p.reportsTo && <span>Reports to: {p.reportsTo}</span>}
                  {p.teamSize > 0 && <AutoStatusBadge status="Active" />}
                </div>
              </div>
            );
          })}
        </div>
      </GlassPanel>
    </EmployeePageLayout>
  );
}
