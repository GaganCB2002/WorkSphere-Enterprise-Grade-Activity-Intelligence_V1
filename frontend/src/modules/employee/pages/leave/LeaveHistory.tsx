import React, { useState } from 'react';
import { EmployeePageLayout } from '../../components/EmployeePageLayout';
import { GlassPanel } from '../../components/ui/GlassPanel';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Filter, Download, RefreshCw, Search, History } from 'lucide-react';

const history = [
  { from: '15 Jul 2026', to: '18 Jul 2026', type: 'Annual Leave', reason: 'Family vacation', status: 'Approved', appliedOn: '10 Jul 2026' },
  { from: '20 Jun 2026', to: '21 Jun 2026', type: 'Sick Leave', reason: 'Viral fever', status: 'Approved', appliedOn: '19 Jun 2026' },
  { from: '05 Jun 2026', to: '05 Jun 2026', type: 'Casual Leave', reason: 'Personal work', status: 'Rejected', appliedOn: '03 Jun 2026' },
  { from: '10 May 2026', to: '15 May 2026', type: 'Annual Leave', reason: 'Trip to Goa', status: 'Approved', appliedOn: '05 May 2026' },
  { from: '22 Apr 2026', to: '22 Apr 2026', type: 'Sick Leave', reason: 'Doctor appointment', status: 'Approved', appliedOn: '21 Apr 2026' },
  { from: '01 Mar 2026', to: '03 Mar 2026', type: 'Casual Leave', reason: 'Family function', status: 'Approved', appliedOn: '28 Feb 2026' },
  { from: '14 Feb 2026', to: '14 Feb 2026', type: 'Comp Off', reason: 'Previous weekend work', status: 'Approved', appliedOn: '12 Feb 2026' },
  { from: '05 Jan 2026', to: '09 Jan 2026', type: 'Annual Leave', reason: 'Year-end break', status: 'Approved', appliedOn: '30 Dec 2025' },
  { from: '20 Dec 2025', to: '20 Dec 2025', type: 'Sick Leave', reason: 'Food poisoning', status: 'Cancelled', appliedOn: '19 Dec 2025' },
  { from: '10 Nov 2025', to: '11 Nov 2025', type: 'Casual Leave', reason: 'Diwali celebration', status: 'Approved', appliedOn: '08 Nov 2025' },
  { from: '01 Oct 2025', to: '03 Oct 2025', type: 'Annual Leave', reason: 'Weekend getaway', status: 'Pending', appliedOn: '28 Sep 2025' },
  { from: '15 Sep 2025', to: '15 Sep 2025', type: 'Sick Leave', reason: 'Migraine', status: 'Approved', appliedOn: '14 Sep 2025' },
];

export default function LeaveHistory() {
  const [search, setSearch] = useState('');
  const filtered = history.filter(h =>
    h.type.toLowerCase().includes(search.toLowerCase()) ||
    h.reason.toLowerCase().includes(search.toLowerCase()) ||
    h.status.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <EmployeePageLayout
      title="Leave History"
      description="View all your past leave applications"
      breadcrumbs={['Employee', 'Leave', 'Leave History']}
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
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by type, reason, or status..." className="w-full text-xs bg-transparent text-slate-900 dark:text-white outline-none placeholder:text-slate-400" />
        </div>
      </GlassPanel>
      <GlassPanel className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-white/[0.06]">
                <th className="text-left px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Date Range</th>
                <th className="text-left px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Type</th>
                <th className="text-left px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Reason</th>
                <th className="text-left px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Status</th>
                <th className="text-left px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Applied On</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((h, i) => (
                <tr key={i} className="border-b border-slate-100 dark:border-white/[0.04] hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="px-4 py-3 font-semibold text-slate-900 dark:text-white">{h.from} - {h.to}</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{h.type}</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300 max-w-[180px] truncate">{h.reason}</td>
                  <td className="px-4 py-3"><StatusBadge label={h.status} variant={h.status === 'Approved' ? 'active' : h.status === 'Rejected' || h.status === 'Cancelled' ? 'leave' : 'pending'} dot={false} /></td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{h.appliedOn}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassPanel>
    </EmployeePageLayout>
  );
}
