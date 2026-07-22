import React, { useState, useMemo } from 'react';
import { EmployeePageLayout } from '../../components/EmployeePageLayout';
import { GlassPanel } from '../../components/ui/GlassPanel';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { User, Info, Filter, Download, RefreshCw, Search } from 'lucide-react';

const personal = {
  fullName: 'Gagan Chaudhary',
  dob: '1998-04-15',
  gender: 'Male',
  bloodGroup: 'O+',
  maritalStatus: 'Married',
  nationality: 'Indian',
};

export default function PersonalInformation() {
  const [searchQuery, setSearchQuery] = useState('');
  const fields = [
    { label: 'Full Name', value: personal.fullName },
    { label: 'Date of Birth', value: personal.dob },
    { label: 'Gender', value: personal.gender },
    { label: 'Blood Group', value: personal.bloodGroup },
    { label: 'Marital Status', value: personal.maritalStatus },
    { label: 'Nationality', value: personal.nationality },
  ].filter(f => !searchQuery || f.label.toLowerCase().includes(searchQuery.toLowerCase()) || f.value.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <EmployeePageLayout
      title="Personal Information"
      description="Basic personal and demographic details"
      breadcrumbs={[{ label: 'Employee', href: '/employee/dashboard' }, { label: 'Profile' }, { label: 'Personal Information' }]}
      searchPlaceholder="Search personal info..."
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
          <div className="w-14 h-14 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center text-lg font-bold">{personal.fullName.split(' ').map(n => n[0]).join('')}</div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">{personal.fullName}</h3>
            <p className="text-xs text-slate-400">{personal.nationality} • {personal.gender}</p>
          </div>
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
