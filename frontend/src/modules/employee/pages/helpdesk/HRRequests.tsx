import React, { useState } from 'react';
import { EmployeePageLayout } from '../../components/EmployeePageLayout';
import { GlassPanel } from '../../components/ui/GlassPanel';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Filter, Download, RefreshCw, Search, FileText } from 'lucide-react';

const hrRequests = [
  { id: 'HR-001', type: 'Document', description: 'Request for updated employment letter', status: 'Resolved', date: '2026-04-10' },
  { id: 'HR-002', type: 'Bonus', description: 'Quarterly performance bonus review', status: 'In Progress', date: '2026-04-08' },
  { id: 'HR-003', type: 'Transfer', description: 'Department transfer to Engineering', status: 'Open', date: '2026-04-05' },
  { id: 'HR-004', type: 'Other', description: 'Update emergency contact information', status: 'Resolved', date: '2026-04-03' },
  { id: 'HR-005', type: 'Document', description: 'Request for experience certificate', status: 'Open', date: '2026-04-12' },
  { id: 'HR-006', type: 'Bonus', description: 'Annual bonus calculation inquiry', status: 'In Progress', date: '2026-04-07' },
  { id: 'HR-007', type: 'Transfer', description: 'Location transfer to Bangalore office', status: 'Open', date: '2026-04-11' },
  { id: 'HR-008', type: 'Document', description: 'Visa support letter request', status: 'Resolved', date: '2026-03-28' },
  { id: 'HR-009', type: 'Other', description: 'Name change request after marriage', status: 'In Progress', date: '2026-04-09' },
  { id: 'HR-010', type: 'Bonus', description: 'Referral bonus for hired candidate', status: 'Open', date: '2026-04-13' },
];

const statusColors: Record<string, string> = {
  Open: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  'In Progress': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  Resolved: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
};

const typeColors: Record<string, string> = {
  Document: 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400',
  Bonus: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  Transfer: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  Other: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
};

export default function HRRequests() {
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = hrRequests.filter(r =>
    r.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <EmployeePageLayout
      title="HR Requests"
      description="Manage HR-related requests and tickets"
      breadcrumbs={['Employee', 'Helpdesk', 'HR Requests']}
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
          <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search requests..." className="w-full text-xs bg-transparent text-slate-900 dark:text-white outline-none placeholder:text-slate-400" />
        </div>
      </GlassPanel>

      <GlassPanel className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200/80 dark:border-white/[0.04]">
                <th className="text-left py-3 px-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Request ID</th>
                <th className="text-left py-3 px-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Type</th>
                <th className="text-left py-3 px-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Description</th>
                <th className="text-left py-3 px-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Status</th>
                <th className="text-left py-3 px-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(r => (
                <tr key={r.id} className="border-b border-slate-100 dark:border-white/[0.03] last:border-0 hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors">
                  <td className="py-3 px-4 font-medium text-slate-900 dark:text-white">{r.id}</td>
                  <td className="py-3 px-4"><span className={`text-[10px] font-semibold px-2 py-1 rounded-lg ${typeColors[r.type]}`}>{r.type}</span></td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-400 max-w-[300px] truncate">{r.description}</td>
                  <td className="py-3 px-4"><span className={`text-[10px] font-semibold px-2 py-1 rounded-lg ${statusColors[r.status]}`}>{r.status}</span></td>
                  <td className="py-3 px-4 text-slate-500">{r.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassPanel>
    </EmployeePageLayout>
  );
}
