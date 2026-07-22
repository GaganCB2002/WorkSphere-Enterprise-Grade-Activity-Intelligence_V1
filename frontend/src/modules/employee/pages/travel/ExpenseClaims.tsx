import React, { useState } from 'react';
import { EmployeePageLayout } from '../../components/EmployeePageLayout';
import { GlassPanel } from '../../components/ui/GlassPanel';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Filter, Download, RefreshCw, Search, Receipt } from 'lucide-react';

const mockClaims = [
  { id: 'EXP-001', category: 'Travel', amount: 1250.00, description: 'Flight tickets to SF conference', date: '2026-07-10', status: 'Approved' },
  { id: 'EXP-002', category: 'Accommodation', amount: 890.00, description: 'Hotel stay 3 nights', date: '2026-07-10', status: 'Pending' },
  { id: 'EXP-003', category: 'Meals', amount: 245.50, description: 'Client dinner meeting', date: '2026-07-12', status: 'Approved' },
  { id: 'EXP-004', category: 'Transport', amount: 85.00, description: 'Uber rides to client site', date: '2026-07-13', status: 'Pending' },
  { id: 'EXP-005', category: 'Office Supplies', amount: 120.00, description: 'Conference booth materials', date: '2026-07-14', status: 'Rejected' },
  { id: 'EXP-006', category: 'Travel', amount: 2100.00, description: 'International flight to London', date: '2026-07-15', status: 'Approved' },
  { id: 'EXP-007', category: 'Accommodation', amount: 450.00, description: 'Airbnb for team retreat', date: '2026-07-16', status: 'Pending' },
  { id: 'EXP-008', category: 'Meals', amount: 78.50, description: 'Team lunch', date: '2026-07-17', status: 'Approved' },
  { id: 'EXP-009', category: 'Software', amount: 299.00, description: 'Annual SaaS subscription', date: '2026-07-18', status: 'Pending' },
  { id: 'EXP-010', category: 'Travel', amount: 560.00, description: 'Train tickets to Chicago', date: '2026-07-19', status: 'Approved' },
];

const statusColor: Record<string, string> = { Approved: 'text-emerald-500', Pending: 'text-amber-500', Rejected: 'text-rose-500' };

export default function ExpenseClaims() {
  const [search, setSearch] = useState('');
  const filtered = mockClaims.filter(c => c.id.toLowerCase().includes(search.toLowerCase()) || c.category.toLowerCase().includes(search.toLowerCase()) || c.description.toLowerCase().includes(search.toLowerCase()));
  const total = filtered.reduce((s, c) => s + c.amount, 0);
  return (
    <EmployeePageLayout title="Expense Claims" description={`${filtered.length} claims · $${total.toFixed(2)} total`} breadcrumbs={['Employee', 'Travel', 'Expense Claims']} actions={
      <div className="flex items-center gap-2">
        <button className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/[0.04] flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"><Filter className="w-4 h-4" /></button>
        <button className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/[0.04] flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"><Download className="w-4 h-4" /></button>
        <button className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/[0.04] flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"><RefreshCw className="w-4 h-4" /></button>
      </div>
    }>
      <GlassPanel className="p-4">
        <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/[0.04] rounded-xl max-w-md mb-4">
          <Search className="w-4 h-4 text-slate-400" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search claims..." className="w-full text-xs bg-transparent text-slate-900 dark:text-white outline-none placeholder:text-slate-400" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-200/60 dark:border-white/[0.04]">
                <th className="text-left py-3 px-2">Claim ID</th>
                <th className="text-left py-3 px-2">Category</th>
                <th className="text-left py-3 px-2">Amount</th>
                <th className="text-left py-3 px-2">Description</th>
                <th className="text-left py-3 px-2">Date</th>
                <th className="text-left py-3 px-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c, i) => (
                <tr key={i} className="border-b border-slate-100 dark:border-white/[0.02] hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors">
                  <td className="py-3 px-2"><div className="flex items-center gap-2"><Receipt className="w-4 h-4 text-slate-400" /><span className="font-mono font-medium text-slate-900 dark:text-white">{c.id}</span></div></td>
                  <td className="py-3 px-2 text-slate-500">{c.category}</td>
                  <td className="py-3 px-2 font-semibold text-slate-900 dark:text-white">${c.amount.toFixed(2)}</td>
                  <td className="py-3 px-2 text-slate-500 max-w-[200px] truncate">{c.description}</td>
                  <td className="py-3 px-2 text-slate-500">{c.date}</td>
                  <td className="py-3 px-2"><span className={`font-semibold text-[10px] ${statusColor[c.status]}`}>{c.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassPanel>
    </EmployeePageLayout>
  );
}
