import React, { useState, useMemo } from 'react';
import { EmployeePageLayout } from '../../components/EmployeePageLayout';
import { GlassPanel } from '../../components/ui/GlassPanel';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { BadgeCheck, Award, Filter, Download, RefreshCw, Search } from 'lucide-react';

const certifications = [
  { name: 'AWS Solutions Architect', issuer: 'Amazon Web Services', date: '2025-06-15', expiry: '2028-06-15', credentialId: 'AWS-AS-98234', status: 'Valid' },
  { name: 'Certified Kubernetes Admin', issuer: 'CNCF', date: '2025-03-10', expiry: '2027-03-10', credentialId: 'CKA-4521-89', status: 'Valid' },
  { name: 'Google Cloud Professional', issuer: 'Google Cloud', date: '2024-11-20', expiry: '2026-11-20', credentialId: 'GCP-PRO-3341', status: 'Valid' },
  { name: 'Microsoft Azure Developer', issuer: 'Microsoft', date: '2024-08-05', expiry: '2026-08-05', credentialId: 'AZ-204-7712', status: 'Valid' },
  { name: 'PMP Certification', issuer: 'PMI', date: '2023-01-15', expiry: '2026-01-15', credentialId: 'PMP-6129384', status: 'Expired' },
  { name: 'Scrum Master', issuer: 'Scrum Alliance', date: '2023-04-20', expiry: '2025-04-20', credentialId: 'CSM-89123', status: 'Expired' },
  { name: 'TOGAF 9 Certified', issuer: 'The Open Group', date: '2024-02-28', expiry: '2027-02-28', credentialId: 'TOGAF-4522', status: 'Valid' },
  { name: 'ISTQB Advanced Level', issuer: 'ISTQB', date: '2024-09-12', expiry: '2027-09-12', credentialId: 'ISTQB-AL-7721', status: 'Valid' },
  { name: 'Red Hat Certified Engineer', issuer: 'Red Hat', date: '2025-01-30', expiry: '2028-01-30', credentialId: 'RHCE-3345-X', status: 'Valid' },
  { name: 'Certified Data Scientist', issuer: 'DASCA', date: '2022-07-01', expiry: '2025-07-01', credentialId: 'CDS-2209-87', status: 'Expired' },
];

export default function Certifications() {
  const [searchQuery, setSearchQuery] = useState('');
  const filtered = useMemo(() => certifications.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.issuer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.status.toLowerCase().includes(searchQuery.toLowerCase())
  ), [searchQuery]);

  return (
    <EmployeePageLayout
      title="Certifications"
      description="Professional certifications and credentials"
      breadcrumbs={[{ label: 'Employee', href: '/employee/dashboard' }, { label: 'Profile' }, { label: 'Certifications' }]}
      searchPlaceholder="Search certifications..."
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((c, i) => (
            <div key={i} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-white/[0.04]">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center flex-shrink-0"><Award className="w-4 h-4" /></div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white truncate">{c.name}</h3>
                    <StatusBadge label={c.status} variant={c.status === 'Valid' ? 'active' : 'leave'} />
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{c.issuer}</p>
                  <div className="flex items-center gap-3 mt-2 text-[10px] text-slate-400">
                    <span>Issued: {c.date}</span>
                    <span>•</span>
                    <span>Expires: {c.expiry}</span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-0.5 font-mono">ID: {c.credentialId}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
            <p className="text-sm text-slate-400">No certifications match your search</p>
          </div>
        )}
      </GlassPanel>
    </EmployeePageLayout>
  );
}
