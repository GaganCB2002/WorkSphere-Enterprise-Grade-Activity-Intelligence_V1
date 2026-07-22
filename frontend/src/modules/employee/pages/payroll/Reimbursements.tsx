import React, { useState } from 'react';
import { EmployeePageLayout } from '../../components/EmployeePageLayout';
import { GlassPanel } from '../../components/ui/GlassPanel';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Filter, Download, RefreshCw, Search, Receipt } from 'lucide-react';

const reimbursements = [
  { claimId: 'RMB-001', category: 'Travel', amount: 12500, description: 'Client visit - Bangalore', date: '10 Jul 2026', status: 'Approved' },
  { claimId: 'RMB-002', category: 'Medical', amount: 3500, description: 'Eye checkup & glasses', date: '28 Jun 2026', status: 'Approved' },
  { claimId: 'RMB-003', category: 'Travel', amount: 8900, description: 'Team outing reimbursement', date: '15 Jun 2026', status: 'Pending' },
  { claimId: 'RMB-004', category: 'Food', amount: 1200, description: 'Late night dinner (OT)', date: '10 Jun 2026', status: 'Approved' },
  { claimId: 'RMB-005', category: 'Education', amount: 25000, description: 'AWS Certification fee', date: '01 Jun 2026', status: 'Approved' },
  { claimId: 'RMB-006', category: 'Travel', amount: 6200, description: 'Cab fare - airport', date: '20 May 2026', status: 'Rejected' },
  { claimId: 'RMB-007', category: 'Medical', amount: 1800, description: 'Pharmacy bills', date: '15 May 2026', status: 'Approved' },
  { claimId: 'RMB-008', category: 'Internet', amount: 1500, description: 'Wifi recharge - April', date: '05 May 2026', status: 'Approved' },
  { claimId: 'RMB-009', category: 'Travel', amount: 4500, description: 'Local conveyance', date: '25 Apr 2026', status: 'Pending' },
  { claimId: 'RMB-010', category: 'Food', amount: 800, description: 'Team lunch', date: '18 Apr 2026', status: 'Approved' },
  { claimId: 'RMB-011', category: 'Education', amount: 5000, description: 'Conference ticket', date: '10 Apr 2026', status: 'Approved' },
  { claimId: 'RMB-012', category: 'Medical', amount: 2200, description: 'Dental checkup', date: '01 Apr 2026', status: 'Rejected' },
];

export default function Reimbursements() {
  const [search, setSearch] = useState('');
  const filtered = reimbursements.filter(r =>
    r.claimId.toLowerCase().includes(search.toLowerCase()) ||
    r.category.toLowerCase().includes(search.toLowerCase()) ||
    r.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <EmployeePageLayout
      title="Reimbursements"
      description="Track and manage your expense claims"
      breadcrumbs={['Employee', 'Payroll', 'Reimbursements']}
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
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search claims..." className="w-full text-xs bg-transparent text-slate-900 dark:text-white outline-none placeholder:text-slate-400" />
        </div>
      </GlassPanel>
      <GlassPanel className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-white/[0.06]">
                <th className="text-left px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Claim ID</th>
                <th className="text-left px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Category</th>
                <th className="text-left px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Amount</th>
                <th className="text-left px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Description</th>
                <th className="text-left px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Date</th>
                <th className="text-left px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r, i) => (
                <tr key={i} className="border-b border-slate-100 dark:border-white/[0.04] hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="px-4 py-3 font-semibold text-slate-900 dark:text-white">{r.claimId}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <Receipt className="w-3.5 h-3.5 text-slate-400" />
                      <span className="text-slate-600 dark:text-slate-300">{r.category}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-semibold text-emerald-600 dark:text-emerald-400">₹{r.amount.toLocaleString()}</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300 max-w-[200px] truncate">{r.description}</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{r.date}</td>
                  <td className="px-4 py-3"><StatusBadge label={r.status} variant={r.status === 'Approved' ? 'active' : r.status === 'Rejected' ? 'leave' : 'pending'} dot={false} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassPanel>
    </EmployeePageLayout>
  );
}
