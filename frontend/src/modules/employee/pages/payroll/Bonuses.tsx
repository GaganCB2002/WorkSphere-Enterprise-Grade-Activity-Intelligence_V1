import React, { useState } from 'react';
import { EmployeePageLayout } from '../../components/EmployeePageLayout';
import { GlassPanel } from '../../components/ui/GlassPanel';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Filter, Download, RefreshCw, Search, Gift } from 'lucide-react';

const bonuses = [
  { name: 'Annual Performance Bonus', amount: 85000, date: '15 Apr 2026', type: 'Performance', status: 'Paid' },
  { name: 'Diwali Bonus', amount: 15000, date: '05 Nov 2025', type: 'Diwali', status: 'Paid' },
  { name: 'Spot Award - Q1', amount: 10000, date: '10 Mar 2026', type: 'Spot', status: 'Paid' },
  { name: 'Project Completion Bonus', amount: 50000, date: '20 Feb 2026', type: 'Performance', status: 'Paid' },
  { name: 'Diwali Bonus', amount: 15000, date: '25 Oct 2026', type: 'Diwali', status: 'Upcoming' },
  { name: 'Quarterly Performance Q2', amount: 25000, date: '15 Jul 2026', type: 'Performance', status: 'Pending' },
  { name: 'Spot Award - Innovation', amount: 7500, date: '08 Jun 2026', type: 'Spot', status: 'Paid' },
  { name: 'Referral Bonus', amount: 20000, date: '15 May 2026', type: 'Spot', status: 'Paid' },
  { name: 'Year-End Performance', amount: 100000, date: '31 Mar 2027', type: 'Performance', status: 'Upcoming' },
  { name: 'Team Lead Incentive', amount: 30000, date: '15 Jan 2026', type: 'Performance', status: 'Paid' },
];

export default function Bonuses() {
  const [search, setSearch] = useState('');
  const filtered = bonuses.filter(b =>
    b.name.toLowerCase().includes(search.toLowerCase()) ||
    b.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <EmployeePageLayout
      title="Bonuses"
      description="View your bonus history and upcoming payouts"
      breadcrumbs={['Employee', 'Payroll', 'Bonuses']}
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
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search bonuses..." className="w-full text-xs bg-transparent text-slate-900 dark:text-white outline-none placeholder:text-slate-400" />
        </div>
      </GlassPanel>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((b, i) => (
          <GlassPanel key={i} className="p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <Gift className="w-4 h-4" />
              </div>
              <StatusBadge label={b.status} variant={b.status === 'Paid' ? 'active' : b.status === 'Upcoming' ? 'working' : 'pending'} dot={false} size="sm" />
            </div>
            <h3 className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">{b.name}</h3>
            <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400 mb-1">₹{b.amount.toLocaleString()}</p>
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>{b.date}</span>
              <span className="font-semibold text-slate-500 dark:text-slate-400">{b.type}</span>
            </div>
          </GlassPanel>
        ))}
      </div>
    </EmployeePageLayout>
  );
}
