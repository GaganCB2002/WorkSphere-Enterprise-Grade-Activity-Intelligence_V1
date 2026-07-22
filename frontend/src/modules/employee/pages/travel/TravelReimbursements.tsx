import React, { useState } from 'react';
import { EmployeePageLayout } from '../../components/EmployeePageLayout';
import { GlassPanel } from '../../components/ui/GlassPanel';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Filter, Download, RefreshCw, Search, DollarSign, Plane } from 'lucide-react';

const mockReimbursements = [
  { tripId: 'TRP-001', destination: 'San Francisco, CA', purpose: 'Tech Conference 2026', amountClaimed: 2140.00, amountApproved: 1950.00, date: '2026-07-10', status: 'Approved' },
  { tripId: 'TRP-002', destination: 'London, UK', purpose: 'Client Meeting', amountClaimed: 3200.00, amountApproved: 2800.00, date: '2026-07-15', status: 'Approved' },
  { tripId: 'TRP-003', destination: 'Chicago, IL', purpose: 'Team Onsite', amountClaimed: 890.00, amountApproved: 0, date: '2026-07-19', status: 'Pending' },
  { tripId: 'TRP-004', destination: 'Austin, TX', purpose: 'Training Workshop', amountClaimed: 1560.00, amountApproved: 1500.00, date: '2026-06-28', status: 'Approved' },
  { tripId: 'TRP-005', destination: 'Denver, CO', purpose: 'Sales Pitch', amountClaimed: 720.00, amountApproved: 0, date: '2026-07-22', status: 'Pending' },
  { tripId: 'TRP-006', destination: 'Seattle, WA', purpose: 'Partner Meeting', amountClaimed: 1100.00, amountApproved: 1100.00, date: '2026-07-05', status: 'Approved' },
  { tripId: 'TRP-007', destination: 'Boston, MA', purpose: 'Security Summit', amountClaimed: 1850.00, amountApproved: 1600.00, date: '2026-06-20', status: 'Rejected' },
  { tripId: 'TRP-008', destination: 'Miami, FL', purpose: 'Product Launch', amountClaimed: 2400.00, amountApproved: 0, date: '2026-07-25', status: 'Pending' },
  { tripId: 'TRP-009', destination: 'Portland, OR', purpose: 'Team Retreat', amountClaimed: 680.00, amountApproved: 680.00, date: '2026-07-02', status: 'Approved' },
  { tripId: 'TRP-010', destination: 'Dallas, TX', purpose: 'Client Training', amountClaimed: 950.00, amountApproved: 900.00, date: '2026-06-15', status: 'Approved' },
];

const statusColor: Record<string, string> = { Approved: 'text-emerald-500', Pending: 'text-amber-500', Rejected: 'text-rose-500' };

export default function TravelReimbursements() {
  const [search, setSearch] = useState('');
  const filtered = mockReimbursements.filter(r => r.destination.toLowerCase().includes(search.toLowerCase()) || r.tripId.toLowerCase().includes(search.toLowerCase()) || r.purpose.toLowerCase().includes(search.toLowerCase()));
  return (
    <EmployeePageLayout title="Travel Reimbursements" description="Track and manage travel expense reimbursements" breadcrumbs={['Employee', 'Travel', 'Travel Reimbursements']} actions={
      <div className="flex items-center gap-2">
        <button className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/[0.04] flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"><Filter className="w-4 h-4" /></button>
        <button className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/[0.04] flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"><Download className="w-4 h-4" /></button>
        <button className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/[0.04] flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"><RefreshCw className="w-4 h-4" /></button>
      </div>
    }>
      <GlassPanel className="p-4">
        <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/[0.04] rounded-xl max-w-md mb-4">
          <Search className="w-4 h-4 text-slate-400" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by destination or trip ID..." className="w-full text-xs bg-transparent text-slate-900 dark:text-white outline-none placeholder:text-slate-400" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-200/60 dark:border-white/[0.04]">
                <th className="text-left py-3 px-2">Trip ID</th>
                <th className="text-left py-3 px-2">Destination</th>
                <th className="text-left py-3 px-2">Purpose</th>
                <th className="text-left py-3 px-2">Claimed</th>
                <th className="text-left py-3 px-2">Approved</th>
                <th className="text-left py-3 px-2">Date</th>
                <th className="text-left py-3 px-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r, i) => (
                <tr key={i} className="border-b border-slate-100 dark:border-white/[0.02] hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors">
                  <td className="py-3 px-2"><div className="flex items-center gap-2"><Plane className="w-4 h-4 text-slate-400" /><span className="font-mono font-medium text-slate-900 dark:text-white">{r.tripId}</span></div></td>
                  <td className="py-3 px-2 text-slate-700 dark:text-slate-300">{r.destination}</td>
                  <td className="py-3 px-2 text-slate-500">{r.purpose}</td>
                  <td className="py-3 px-2 font-semibold text-slate-900 dark:text-white">${r.amountClaimed.toFixed(2)}</td>
                  <td className="py-3 px-2 font-semibold text-slate-900 dark:text-white">${r.amountApproved > 0 ? r.amountApproved.toFixed(2) : '—'}</td>
                  <td className="py-3 px-2 text-slate-500">{r.date}</td>
                  <td className="py-3 px-2"><span className={`font-semibold text-[10px] ${statusColor[r.status]}`}>{r.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassPanel>
    </EmployeePageLayout>
  );
}
