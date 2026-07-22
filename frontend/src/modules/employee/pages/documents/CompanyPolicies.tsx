import React, { useState } from 'react';
import { Filter, Download, RefreshCw, Search, FileText, Eye, Calendar } from 'lucide-react';
import { EmployeePageLayout } from '../../components/EmployeePageLayout';
import { GlassPanel } from '../../components/ui/GlassPanel';
import { StatusBadge } from '../../components/ui/StatusBadge';

const policies = [
  { id: 1, name: 'Code of Conduct', category: 'HR', version: '3.2', effectiveDate: '2026-01-01', lastUpdated: '2025-12-15', status: 'Active' },
  { id: 2, name: 'Leave Policy', category: 'HR', version: '2.1', effectiveDate: '2026-02-01', lastUpdated: '2026-01-20', status: 'Active' },
  { id: 3, name: 'Data Security Policy', category: 'IT', version: '4.0', effectiveDate: '2026-03-01', lastUpdated: '2026-02-28', status: 'Active' },
  { id: 4, name: 'Remote Work Policy', category: 'HR', version: '1.5', effectiveDate: '2026-04-01', lastUpdated: '2026-03-15', status: 'Active' },
  { id: 5, name: 'Expense Reimbursement', category: 'Finance', version: '2.3', effectiveDate: '2026-05-01', lastUpdated: '2026-04-20', status: 'Active' },
  { id: 6, name: 'Travel Policy', category: 'HR', version: '3.0', effectiveDate: '2026-06-01', lastUpdated: '2026-05-25', status: 'Draft' },
  { id: 7, name: 'IT Asset Management', category: 'IT', version: '1.2', effectiveDate: '2026-07-01', lastUpdated: '2026-06-15', status: 'Active' },
  { id: 8, name: 'Flexible Work Hours', category: 'HR', version: '2.0', effectiveDate: '2026-08-01', lastUpdated: '2026-07-10', status: 'Draft' },
];

export default function CompanyPolicies() {
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = policies.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <EmployeePageLayout
      title="Company Policies"
      description="Official company policies and guidelines"
      breadcrumbs={['Employee', 'Documents', 'Company Policies']}
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
        <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search policies..." className="w-full text-xs bg-transparent text-slate-900 dark:text-white outline-none placeholder:text-slate-400" />
      </GlassPanel>

      <GlassPanel padding="none" className="overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200 dark:border-white/[0.06]">
              <th className="text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider px-5 py-3">Policy Name</th>
              <th className="text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider px-5 py-3">Category</th>
              <th className="text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider px-5 py-3">Version</th>
              <th className="text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider px-5 py-3">Effective Date</th>
              <th className="text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider px-5 py-3">Last Updated</th>
              <th className="text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider px-5 py-3">Status</th>
              <th className="text-right text-[10px] font-bold text-slate-400 uppercase tracking-wider px-5 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.id} className="border-b border-slate-100 dark:border-white/[0.04] hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-slate-400" />
                    <span className="text-xs font-semibold text-slate-900 dark:text-white">{p.name}</span>
                  </div>
                </td>
                <td className="px-5 py-3.5 text-xs text-slate-500 dark:text-slate-400">{p.category}</td>
                <td className="px-5 py-3.5 text-xs text-slate-500 dark:text-slate-400">v{p.version}</td>
                <td className="px-5 py-3.5 text-xs text-slate-500 dark:text-slate-400">{p.effectiveDate}</td>
                <td className="px-5 py-3.5 text-xs text-slate-500 dark:text-slate-400">{p.lastUpdated}</td>
                <td className="px-5 py-3.5"><StatusBadge label={p.status} variant={p.status === 'Active' ? 'active' : 'pending'} /></td>
                <td className="px-5 py-3.5 text-right">
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 text-[10px] font-bold transition-colors">
                    <Eye className="w-3 h-3" />
                    View
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
