import React, { useState } from 'react';
import { EmployeePageLayout } from '../../components/EmployeePageLayout';
import { GlassPanel } from '../../components/ui/GlassPanel';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Filter, Download, RefreshCw, Search, Award } from 'lucide-react';

const incentives = [
  { name: 'Q1 Sales Target', amount: 45000, quarter: 'Q1 2026', achievement: '120%', status: 'Paid' },
  { name: 'Client Satisfaction Bonus', amount: 15000, quarter: 'Q1 2026', achievement: '95%', status: 'Paid' },
  { name: 'Q2 Revenue Target', amount: 55000, quarter: 'Q2 2026', achievement: '110%', status: 'Paid' },
  { name: 'Product Launch Incentive', amount: 25000, quarter: 'Q2 2026', achievement: '100%', status: 'Pending' },
  { name: 'Q3 Growth Target', amount: 60000, quarter: 'Q3 2026', achievement: '105%', status: 'Pending' },
  { name: 'Team Performance Q3', amount: 20000, quarter: 'Q3 2026', achievement: '90%', status: 'Pending' },
  { name: 'Q4 Annual Target', amount: 80000, quarter: 'Q4 2026', achievement: '-', status: 'Upcoming' },
  { name: 'Innovation Award H1', amount: 12000, quarter: 'H1 2026', achievement: '98%', status: 'Paid' },
  { name: 'Cross-Sell Incentive', amount: 18000, quarter: 'Q2 2026', achievement: '115%', status: 'Paid' },
  { name: 'Retention Bonus', amount: 35000, quarter: 'Q1 2026', achievement: '100%', status: 'Paid' },
];

export default function Incentives() {
  const [search, setSearch] = useState('');
  const filtered = incentives.filter(i =>
    i.name.toLowerCase().includes(search.toLowerCase()) ||
    i.quarter.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <EmployeePageLayout
      title="Incentives"
      description="Performance-based incentive tracking"
      breadcrumbs={['Employee', 'Payroll', 'Incentives']}
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
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search incentives..." className="w-full text-xs bg-transparent text-slate-900 dark:text-white outline-none placeholder:text-slate-400" />
        </div>
      </GlassPanel>
      <GlassPanel className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-white/[0.06]">
                <th className="text-left px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Incentive</th>
                <th className="text-left px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Amount</th>
                <th className="text-left px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Quarter</th>
                <th className="text-left px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Achievement</th>
                <th className="text-left px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((i, idx) => (
                <tr key={idx} className="border-b border-slate-100 dark:border-white/[0.04] hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-amber-500" />
                      <span className="font-semibold text-slate-900 dark:text-white">{i.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-bold text-emerald-600 dark:text-emerald-400">₹{i.amount.toLocaleString()}</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{i.quarter}</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{i.achievement}</td>
                  <td className="px-4 py-3"><StatusBadge label={i.status} variant={i.status === 'Paid' ? 'active' : i.status === 'Upcoming' ? 'working' : 'pending'} dot={false} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassPanel>
    </EmployeePageLayout>
  );
}
