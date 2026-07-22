import React, { useState } from 'react';
import { EmployeePageLayout } from '../../components/EmployeePageLayout';
import { GlassPanel } from '../../components/ui/GlassPanel';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Filter, Download, RefreshCw, Search, CheckCircle, Clock, XCircle } from 'lucide-react';

const approvals = [
  { id: 'LVE-001', type: 'Annual Leave', from: '15 Jul 2026', to: '18 Jul 2026', manager: 'Approved', hr: 'Approved', final: 'Approved' },
  { id: 'LVE-002', type: 'Sick Leave', from: '20 Jun 2026', to: '21 Jun 2026', manager: 'Approved', hr: 'Approved', final: 'Approved' },
  { id: 'LVE-003', type: 'Casual Leave', from: '05 Aug 2026', to: '05 Aug 2026', manager: 'Pending', hr: 'Pending', final: 'Pending' },
  { id: 'LVE-004', type: 'Annual Leave', from: '10 Sep 2026', to: '15 Sep 2026', manager: 'Approved', hr: 'Pending', final: 'Pending' },
  { id: 'LVE-005', type: 'Maternity Leave', from: '01 Oct 2026', to: '30 Dec 2026', manager: 'Approved', hr: 'Approved', final: 'Approved' },
  { id: 'LVE-006', type: 'Sick Leave', from: '12 Jul 2026', to: '12 Jul 2026', manager: 'Approved', hr: 'Rejected', final: 'Rejected' },
  { id: 'LVE-007', type: 'Casual Leave', from: '22 Aug 2026', to: '23 Aug 2026', manager: 'Approved', hr: 'Approved', final: 'Approved' },
  { id: 'LVE-008', type: 'Annual Leave', from: '01 Nov 2026', to: '05 Nov 2026', manager: 'Pending', hr: 'Pending', final: 'Pending' },
  { id: 'LVE-009', type: 'Paternity Leave', from: '15 Sep 2026', to: '19 Sep 2026', manager: 'Approved', hr: 'Approved', final: 'Approved' },
  { id: 'LVE-010', type: 'Sick Leave', from: '08 Jul 2026', to: '09 Jul 2026', manager: 'Approved', hr: 'Approved', final: 'Approved' },
];

function statusIcon(s: string) {
  if (s === 'Approved') return <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />;
  if (s === 'Rejected') return <XCircle className="w-3.5 h-3.5 text-red-500" />;
  return <Clock className="w-3.5 h-3.5 text-amber-500" />;
}

export default function ApprovalStatus() {
  const [search, setSearch] = useState('');

  const filtered = approvals.filter(a =>
    a.id.toLowerCase().includes(search.toLowerCase()) ||
    a.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <EmployeePageLayout
      title="Approval Status"
      description="Track your leave request approval chain"
      breadcrumbs={['Employee', 'Leave', 'Approval Status']}
      actions={
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"><Filter className="w-4 h-4" /></button>
          <button className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"><Download className="w-4 h-4" /></button>
          <button className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"><RefreshCw className="w-4 h-4" /></button>
        </div>
      }
    >
      <GlassPanel className="p-4 mb-6">
        <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/[0.04] rounded-xl max-w-md">
          <Search className="w-4 h-4 text-slate-400" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by ID or type..." className="w-full text-xs bg-transparent text-slate-900 dark:text-white outline-none placeholder:text-slate-400" />
        </div>
      </GlassPanel>
      <GlassPanel className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-white/[0.06]">
                <th className="text-left px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Request ID</th>
                <th className="text-left px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Type</th>
                <th className="text-left px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">From</th>
                <th className="text-left px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">To</th>
                <th className="text-left px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Reporting Manager</th>
                <th className="text-left px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">HR</th>
                <th className="text-left px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Final Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(a => (
                <tr key={a.id} className="border-b border-slate-100 dark:border-white/[0.04] hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="px-4 py-3 font-semibold text-slate-900 dark:text-white">{a.id}</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{a.type}</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{a.from}</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{a.to}</td>
                  <td className="px-4 py-3"><StatusBadge label={a.manager} variant={a.manager === 'Approved' ? 'active' : a.manager === 'Rejected' ? 'leave' : 'pending'} dot={false} /></td>
                  <td className="px-4 py-3"><StatusBadge label={a.hr} variant={a.hr === 'Approved' ? 'active' : a.hr === 'Rejected' ? 'leave' : 'pending'} dot={false} /></td>
                  <td className="px-4 py-3 flex items-center gap-1.5"><StatusBadge label={a.final} variant={a.final === 'Approved' ? 'active' : a.final === 'Rejected' ? 'leave' : 'pending'} dot={false} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassPanel>
    </EmployeePageLayout>
  );
}
