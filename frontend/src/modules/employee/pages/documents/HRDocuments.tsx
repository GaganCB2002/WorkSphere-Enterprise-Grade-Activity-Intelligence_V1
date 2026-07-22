import React, { useState } from 'react';
import { Filter, Download, RefreshCw, Search, FileText, DownloadCloud } from 'lucide-react';
import { EmployeePageLayout } from '../../components/EmployeePageLayout';
import { GlassPanel } from '../../components/ui/GlassPanel';
import { StatusBadge } from '../../components/ui/StatusBadge';

const hrDocs = [
  { id: 1, name: 'Employee Handbook 2026', type: 'PDF', department: 'All', uploadDate: '2026-01-10', status: 'Active' },
  { id: 2, name: 'Onboarding Checklist', type: 'Excel', department: 'HR', uploadDate: '2026-02-05', status: 'Active' },
  { id: 3, name: 'Performance Review Form', type: 'PDF', department: 'HR', uploadDate: '2026-03-12', status: 'Active' },
  { id: 4, name: 'Training Calendar Q3', type: 'Excel', department: 'L&D', uploadDate: '2026-04-01', status: 'Active' },
  { id: 5, name: 'Exit Interview Template', type: 'Doc', department: 'HR', uploadDate: '2026-05-10', status: 'Active' },
  { id: 6, name: 'Benefits Enrollment Guide', type: 'PDF', department: 'HR', uploadDate: '2026-06-15', status: 'Active' },
  { id: 7, name: 'Payroll Deduction Form', type: 'PDF', department: 'Finance', uploadDate: '2026-07-01', status: 'Active' },
  { id: 8, name: 'Grievance Procedure', type: 'Doc', department: 'HR', uploadDate: '2026-07-10', status: 'Draft' },
  { id: 9, name: 'Wellness Program Guide', type: 'PDF', department: 'HR', uploadDate: '2026-07-15', status: 'Active' },
];

export default function HRDocuments() {
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = hrDocs.filter(d =>
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <EmployeePageLayout
      title="HR Documents"
      description="Human resources documents and forms"
      breadcrumbs={['Employee', 'Documents', 'HR Documents']}
      actions={
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition-colors"><Filter className="w-4 h-4" /></button>
          <button className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition-colors"><Download className="w-4 h-4" /></button>
          <button className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition-colors"><RefreshCw className="w-4 h-4" /></button>
        </div>
      }
    >
      <GlassPanel className="p-4 flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/[0.04] rounded-xl">
        <Search className="w-4 h-4 text-slate-400" />
        <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search HR documents..." className="w-full text-xs bg-transparent text-slate-900 dark:text-white outline-none placeholder:text-slate-400" />
      </GlassPanel>

      <GlassPanel padding="none" className="overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200 dark:border-white/[0.06]">
              <th className="text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider px-5 py-3">Document Name</th>
              <th className="text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider px-5 py-3">Type</th>
              <th className="text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider px-5 py-3">Department</th>
              <th className="text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider px-5 py-3">Upload Date</th>
              <th className="text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider px-5 py-3">Status</th>
              <th className="text-right text-[10px] font-bold text-slate-400 uppercase tracking-wider px-5 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(d => (
              <tr key={d.id} className="border-b border-slate-100 dark:border-white/[0.04] hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-slate-400" />
                    <span className="text-xs font-semibold text-slate-900 dark:text-white">{d.name}</span>
                  </div>
                </td>
                <td className="px-5 py-3.5 text-xs text-slate-500 dark:text-slate-400">{d.type}</td>
                <td className="px-5 py-3.5 text-xs text-slate-500 dark:text-slate-400">{d.department}</td>
                <td className="px-5 py-3.5 text-xs text-slate-500 dark:text-slate-400">{d.uploadDate}</td>
                <td className="px-5 py-3.5"><StatusBadge label={d.status} variant="active" /></td>
                <td className="px-5 py-3.5 text-right">
                  <button className="p-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-500/10 text-blue-600 dark:text-blue-400 transition-colors">
                    <DownloadCloud className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </GlassPanel>
    </EmployeePageLayout>
  );
}
