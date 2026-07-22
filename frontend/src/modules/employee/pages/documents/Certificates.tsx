import React, { useState } from 'react';
import { Filter, Download, RefreshCw, Search, Award, Calendar, DownloadCloud } from 'lucide-react';
import { EmployeePageLayout } from '../../components/EmployeePageLayout';
import { GlassPanel } from '../../components/ui/GlassPanel';
import { StatusBadge } from '../../components/ui/StatusBadge';

const certificates = [
  { id: 1, name: 'AWS Solutions Architect', issuer: 'Amazon Web Services', issueDate: '2026-03-15', expiryDate: '2029-03-15', credentialId: 'AWS-SA-12345', status: 'Valid' },
  { id: 2, name: 'Certified Kubernetes Administrator', issuer: 'CNCF', issueDate: '2025-11-01', expiryDate: '2028-11-01', credentialId: 'CKA-98765', status: 'Valid' },
  { id: 3, name: 'Google Cloud Professional', issuer: 'Google Cloud', issueDate: '2024-06-10', expiryDate: '2027-06-10', credentialId: 'GCP-54321', status: 'Valid' },
  { id: 4, name: 'Scrum Master Certification', issuer: 'Scrum Alliance', issueDate: '2023-08-15', expiryDate: '2025-08-15', credentialId: 'CSM-87654', status: 'Expired' },
  { id: 5, name: 'AWS Solutions Architect', issuer: 'Amazon Web Services', issueDate: '2024-01-20', expiryDate: '2027-01-20', credentialId: 'AWS-23456', status: 'Valid' },
  { id: 6, name: 'Project Management Professional', issuer: 'PMI', issueDate: '2023-05-10', expiryDate: '2026-05-10', credentialId: 'PMP-34567', status: 'Valid' },
  { id: 7, name: 'TOGAF 9 Certified', issuer: 'The Open Group', issueDate: '2022-11-01', expiryDate: '2025-11-01', credentialId: 'TOGAF-45678', status: 'Expired' },
  { id: 8, name: 'Google Cloud Architect', issuer: 'Google Cloud', issueDate: '2025-02-20', expiryDate: '2028-02-20', credentialId: 'GCP-56789', status: 'Valid' },
];

export default function Certificates() {
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = certificates.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.issuer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <EmployeePageLayout
      title="Certificates"
      description="Professional certifications and credentials"
      breadcrumbs={['Employee', 'Documents', 'Certificates']}
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
        <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search certificates..." className="w-full text-xs bg-transparent text-slate-900 dark:text-white outline-none placeholder:text-slate-400" />
      </GlassPanel>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(c => (
          <GlassPanel key={c.id} className="p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">{c.name}</h3>
                  <p className="text-[10px] text-slate-400 mt-0.5">{c.issuer}</p>
                </div>
              </div>
              <StatusBadge label={c.status} variant={c.status === 'Valid' ? 'active' : 'leave'} />
            </div>
            <div className="grid grid-cols-2 gap-3 mt-3 pt-3 border-t border-slate-100 dark:border-white/[0.06]">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Issue Date</p>
                <p className="text-xs text-slate-700 dark:text-slate-300 mt-0.5">{c.issueDate}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Expiry Date</p>
                <p className="text-xs text-slate-700 dark:text-slate-300 mt-0.5">{c.expiryDate}</p>
              </div>
              <div className="col-span-2">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Credential ID</p>
                <p className="text-xs text-slate-700 dark:text-slate-300 mt-0.5">{c.credentialId}</p>
              </div>
            </div>
          </GlassPanel>
        ))}
      </div>
    </EmployeePageLayout>
  );
}
