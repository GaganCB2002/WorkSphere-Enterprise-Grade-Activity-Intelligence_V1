import React, { useState, useMemo } from 'react';
import { EmployeePageLayout } from '../../components/EmployeePageLayout';
import { GlassPanel } from '../../components/ui/GlassPanel';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { FileText, Shield, Filter, Download, RefreshCw, Search } from 'lucide-react';

const documents = [
  { name: 'Aadhar Card', number: 'XXXX XXXX 6789', uploadedDate: '2024-01-15', status: 'Verified' },
  { name: 'PAN Card', number: 'XXXXX1234X', uploadedDate: '2024-01-15', status: 'Verified' },
  { name: 'Passport', number: 'ZXXXXXXX', uploadedDate: '2024-02-10', status: 'Verified' },
  { name: 'Voter ID', number: 'XXXX1234567', uploadedDate: '2024-03-05', status: 'Verified' },
  { name: 'Driving License', number: 'KA-XX-2024-XXXXX', uploadedDate: '2024-04-20', status: 'Pending' },
  { name: '10th Marksheet', number: 'ROLL-XXXXX-2020', uploadedDate: '2024-01-10', status: 'Verified' },
  { name: '12th Marksheet', number: 'ROLL-XXXXX-2022', uploadedDate: '2024-01-10', status: 'Verified' },
  { name: 'Degree Certificate', number: 'UNIV-XXXX-2024', uploadedDate: '2024-06-15', status: 'Pending' },
  { name: 'Salary Slip (Dec 2025)', number: 'SLIP-2025-12-001', uploadedDate: '2026-01-05', status: 'Verified' },
  { name: 'Offer Letter', number: 'OFFER-WS-2024-001', uploadedDate: '2024-01-01', status: 'Verified' },
];

export default function Documents() {
  const [searchQuery, setSearchQuery] = useState('');
  const filtered = useMemo(() => documents.filter(d =>
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.status.toLowerCase().includes(searchQuery.toLowerCase())
  ), [searchQuery]);

  return (
    <EmployeePageLayout
      title="Documents"
      description="Uploaded identity and verification documents"
      breadcrumbs={[{ label: 'Employee', href: '/employee/dashboard' }, { label: 'Profile' }, { label: 'Documents' }]}
      searchPlaceholder="Search documents..."
      onSearch={setSearchQuery}
      actions={
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition-colors"><Filter className="w-4 h-4" /></button>
          <button className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition-colors"><Download className="w-4 h-4" /></button>
          <button className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition-colors"><RefreshCw className="w-4 h-4" /></button>
        </div>
      }
    >
      <GlassPanel className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200/60 dark:border-white/[0.04] bg-slate-50/50 dark:bg-slate-800/20">
                <th className="text-left px-4 py-3 font-semibold text-slate-400 uppercase tracking-wider">Document</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-400 uppercase tracking-wider">Document Number</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-400 uppercase tracking-wider">Uploaded Date</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-400 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((d, i) => (
                <tr key={i} className="border-b border-slate-100 dark:border-white/[0.02] hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-slate-400" />
                      <span className="font-medium text-slate-900 dark:text-white">{d.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-mono text-slate-500 dark:text-slate-400">{d.number}</td>
                  <td className="px-4 py-3 text-slate-500 dark:text-slate-400">{d.uploadedDate}</td>
                  <td className="px-4 py-3"><StatusBadge label={d.status} variant={d.status === 'Verified' ? 'done' : 'pending'} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
            <p className="text-sm text-slate-400">No documents match your search</p>
          </div>
        )}
      </GlassPanel>
    </EmployeePageLayout>
  );
}
