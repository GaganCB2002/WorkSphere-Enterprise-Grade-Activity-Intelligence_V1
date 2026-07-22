import React, { useState } from 'react';
import { EmployeePageLayout } from '../../components/EmployeePageLayout';
import { GlassPanel } from '../../components/ui/GlassPanel';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Filter, Download, RefreshCw, Search, Plane, Calendar, DollarSign } from 'lucide-react';

const mockRequests = [
  { id: 'REQ-001', destination: 'San Francisco, CA', purpose: 'Tech Conference 2026', fromDate: '2026-08-10', toDate: '2026-08-13', estimatedCost: 2500.00, status: 'Approved' },
  { id: 'REQ-002', destination: 'London, UK', purpose: 'Client Quarterly Review', fromDate: '2026-09-05', toDate: '2026-09-09', estimatedCost: 4500.00, status: 'Pending' },
  { id: 'REQ-003', destination: 'Chicago, IL', purpose: 'Team Onsite Sprint', fromDate: '2026-07-25', toDate: '2026-07-27', estimatedCost: 1200.00, status: 'Approved' },
  { id: 'REQ-004', destination: 'Austin, TX', purpose: 'Training Workshop', fromDate: '2026-08-20', toDate: '2026-08-22', estimatedCost: 1800.00, status: 'Pending' },
  { id: 'REQ-005', destination: 'Denver, CO', purpose: 'Sales Conference', fromDate: '2026-09-12', toDate: '2026-09-14', estimatedCost: 1500.00, status: 'Rejected' },
  { id: 'REQ-006', destination: 'Seattle, WA', purpose: 'Partner Summit', fromDate: '2026-08-01', toDate: '2026-08-03', estimatedCost: 2000.00, status: 'Approved' },
  { id: 'REQ-007', destination: 'Miami, FL', purpose: 'Product Launch Event', fromDate: '2026-09-20', toDate: '2026-09-23', estimatedCost: 3200.00, status: 'Pending' },
  { id: 'REQ-008', destination: 'Boston, MA', purpose: 'Security Audit Visit', fromDate: '2026-07-28', toDate: '2026-07-30', estimatedCost: 1600.00, status: 'Pending' },
];

const statusColor: Record<string, string> = { Approved: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10', Pending: 'text-amber-500 bg-amber-50 dark:bg-amber-500/10', Rejected: 'text-rose-500 bg-rose-50 dark:bg-rose-500/10' };

export default function TravelRequests() {
  const [search, setSearch] = useState('');
  const filtered = mockRequests.filter(r => r.destination.toLowerCase().includes(search.toLowerCase()) || r.id.toLowerCase().includes(search.toLowerCase()) || r.purpose.toLowerCase().includes(search.toLowerCase()));
  return (
    <EmployeePageLayout title="Travel Requests" description={`${filtered.length} travel requests`} breadcrumbs={['Employee', 'Travel', 'Travel Requests']} actions={
      <div className="flex items-center gap-2">
        <button className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/[0.04] flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"><Filter className="w-4 h-4" /></button>
        <button className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/[0.04] flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"><Download className="w-4 h-4" /></button>
        <button className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/[0.04] flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"><RefreshCw className="w-4 h-4" /></button>
      </div>
    }>
      <GlassPanel className="p-4">
        <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/[0.04] rounded-xl max-w-md mb-4">
          <Search className="w-4 h-4 text-slate-400" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search requests..." className="w-full text-xs bg-transparent text-slate-900 dark:text-white outline-none placeholder:text-slate-400" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((r, i) => (
            <div key={i} className="rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-white/[0.04] p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center"><Plane className="w-4 h-4" /></div>
                  <div>
                    <p className="text-xs font-semibold text-slate-900 dark:text-white">{r.destination}</p>
                    <p className="text-[10px] text-slate-400 font-mono">{r.id}</p>
                  </div>
                </div>
                <span className={`px-2 py-0.5 rounded-lg text-[10px] font-semibold ${statusColor[r.status]}`}>{r.status}</span>
              </div>
              <p className="text-[10px] text-slate-400 mb-3">{r.purpose}</p>
              <div className="flex items-center justify-between text-[10px]">
                <div className="flex items-center gap-1 text-slate-400"><Calendar className="w-3 h-3" />{r.fromDate} – {r.toDate}</div>
                <div className="flex items-center gap-1 text-slate-700 dark:text-slate-300 font-semibold"><DollarSign className="w-3 h-3" />{r.estimatedCost.toFixed(2)}</div>
              </div>
            </div>
          ))}
        </div>
      </GlassPanel>
    </EmployeePageLayout>
  );
}
