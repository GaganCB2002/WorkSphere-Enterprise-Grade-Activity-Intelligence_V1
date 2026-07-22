import React, { useState } from 'react';
import { EmployeePageLayout } from '../../components/EmployeePageLayout';
import { GlassPanel } from '../../components/ui/GlassPanel';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Filter, Download, RefreshCw, Search, Award } from 'lucide-react';

const certifications = [
  { id: 1, name: 'AWS Solutions Architect', provider: 'Amazon', issueDate: '2025-06-15', expiry: '2028-06-15', score: 92, status: 'Active' },
  { id: 2, name: 'Google Cloud Professional', provider: 'Google', issueDate: '2024-11-01', expiry: '2027-11-01', score: 88, status: 'Active' },
  { id: 3, name: 'Certified Kubernetes Admin', provider: 'CNCF', issueDate: '2023-03-10', expiry: '2026-03-10', score: 85, status: 'Active' },
  { id: 4, name: 'Microsoft Azure AZ-900', provider: 'Microsoft', issueDate: '2022-08-20', expiry: '2025-08-20', score: 90, status: 'Active' },
  { id: 5, name: 'PMP Certification', provider: 'PMI', issueDate: '2021-05-05', expiry: '2024-05-05', score: 80, status: 'Expired' },
  { id: 6, name: 'Certified Scrum Master', provider: 'Scrum Alliance', issueDate: '2024-01-15', expiry: '2027-01-15', score: 95, status: 'Active' },
  { id: 7, name: 'CompTIA Security+', provider: 'CompTIA', issueDate: '2020-09-30', expiry: '2023-09-30', score: 78, status: 'Expired' },
  { id: 8, name: 'TOGAF 9 Certified', provider: 'The Open Group', issueDate: '2025-02-28', expiry: '2028-02-28', score: 82, status: 'Active' },
  { id: 9, name: 'Red Hat Certified Engineer', provider: 'Red Hat', issueDate: '2023-07-12', expiry: '2026-07-12', score: 87, status: 'Active' },
  { id: 10, name: 'ISTQB Foundation Level', provider: 'ISTQB', issueDate: '2022-12-01', expiry: '2025-12-01', score: 91, status: 'Active' },
];

export default function LearningCertifications() {
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = certifications.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.provider.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <EmployeePageLayout
      title="Certifications"
      description="Professional certifications and credentials"
      breadcrumbs={['Employee', 'Learning', 'Certifications']}
      actions={
        <div className="flex items-center gap-2">
          {[Filter, Download, RefreshCw].map((Icon, i) => (
            <button key={i} className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/[0.04] text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors">
              <Icon className="w-4 h-4" />
            </button>
          ))}
        </div>
      }
    >
      <GlassPanel className="p-4 flex items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/[0.04] rounded-xl flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400" />
          <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search certifications..." className="w-full text-xs bg-transparent text-slate-900 dark:text-white outline-none placeholder:text-slate-400" />
        </div>
      </GlassPanel>

      <div className="grid gap-3 sm:grid-cols-2">
        {filtered.map(c => (
          <GlassPanel key={c.id} className="p-4">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                <Award className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{c.name}</p>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-lg ${c.status === 'Active' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>{c.status}</span>
                </div>
                <p className="text-[10px] text-slate-400 mt-0.5">{c.provider}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="px-2 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/40">
                <p className="text-[9px] text-slate-400 uppercase tracking-wider font-semibold">Issued</p>
                <p className="text-[10px] font-semibold text-slate-700 dark:text-slate-300">{c.issueDate}</p>
              </div>
              <div className="px-2 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/40">
                <p className="text-[9px] text-slate-400 uppercase tracking-wider font-semibold">Expires</p>
                <p className={`text-[10px] font-semibold ${c.expiry < '2026-04-14' ? 'text-red-500' : 'text-slate-700 dark:text-slate-300'}`}>{c.expiry}</p>
              </div>
              <div className="px-2 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/40">
                <p className="text-[9px] text-slate-400 uppercase tracking-wider font-semibold">Score</p>
                <p className="text-[10px] font-bold text-slate-700 dark:text-slate-300">{c.score}%</p>
              </div>
            </div>
          </GlassPanel>
        ))}
      </div>
    </EmployeePageLayout>
  );
}
