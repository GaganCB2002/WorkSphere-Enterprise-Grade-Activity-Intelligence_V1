import React, { useState, useMemo } from 'react';
import { EmployeePageLayout } from '../../components/EmployeePageLayout';
import { GlassPanel } from '../../components/ui/GlassPanel';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Building2, Briefcase, Filter, Download, RefreshCw, Search } from 'lucide-react';

const employment = {
  employeeId: 'EMP-2024-001',
  department: 'Engineering',
  designation: 'Senior Software Engineer',
  joiningDate: '2024-01-01',
  employmentType: 'Full-time',
  reportingManager: 'Ananya Sharma (Tech Lead)',
  workLocation: 'Bangalore (Hybrid)',
  team: 'WorkSphere Core',
  grade: 'L5',
  probationEnd: '2024-06-30',
};

export default function EmploymentDetails() {
  const [searchQuery, setSearchQuery] = useState('');
  const fields = [
    { label: 'Employee ID', value: employment.employeeId },
    { label: 'Department', value: employment.department },
    { label: 'Designation', value: employment.designation },
    { label: 'Joining Date', value: employment.joiningDate },
    { label: 'Employment Type', value: employment.employmentType },
    { label: 'Reporting Manager', value: employment.reportingManager },
    { label: 'Work Location', value: employment.workLocation },
    { label: 'Team', value: employment.team },
    { label: 'Grade', value: employment.grade },
    { label: 'Probation End', value: employment.probationEnd },
  ].filter(f => !searchQuery || f.label.toLowerCase().includes(searchQuery.toLowerCase()) || f.value.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <EmployeePageLayout
      title="Employment Details"
      description="Job information and company records"
      breadcrumbs={[{ label: 'Employee', href: '/employee/dashboard' }, { label: 'Profile' }, { label: 'Employment Details' }]}
      searchPlaceholder="Search employment details..."
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
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center"><Building2 className="w-6 h-6" /></div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{employment.designation}</h3>
            <p className="text-xs text-slate-400">{employment.department} • {employment.team}</p>
          </div>
          <div className="ml-auto"><StatusBadge label={employment.employmentType} variant="active" /></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {fields.map((f, i) => (
            <div key={i} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-white/[0.04]">
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">{f.label}</p>
              <p className="text-sm font-medium text-slate-900 dark:text-white mt-0.5">{f.value}</p>
            </div>
          ))}
        </div>
      </GlassPanel>
    </EmployeePageLayout>
  );
}
