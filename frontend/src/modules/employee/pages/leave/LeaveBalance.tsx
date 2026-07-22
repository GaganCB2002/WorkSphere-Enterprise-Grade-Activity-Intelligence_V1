import React, { useState } from 'react';
import { EmployeePageLayout } from '../../components/EmployeePageLayout';
import { GlassPanel } from '../../components/ui/GlassPanel';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Filter, Download, RefreshCw, Search, Wallet } from 'lucide-react';

const leaveTypes = [
  { type: 'Annual Leave', total: 18, used: 7, remaining: 11, pending: 2 },
  { type: 'Sick Leave', total: 12, used: 3, remaining: 9, pending: 0 },
  { type: 'Casual Leave', total: 10, used: 5, remaining: 5, pending: 1 },
  { type: 'Maternity Leave', total: 90, used: 0, remaining: 90, pending: 0 },
  { type: 'Paternity Leave', total: 5, used: 1, remaining: 4, pending: 0 },
  { type: 'Comp Off', total: 4, used: 1, remaining: 3, pending: 0 },
  { type: 'Marriage Leave', total: 5, used: 0, remaining: 5, pending: 0 },
  { type: 'Bereavement Leave', total: 3, used: 1, remaining: 2, pending: 0 },
];

export default function LeaveBalance() {
  const [search, setSearch] = useState('');
  const filtered = leaveTypes.filter(l => l.type.toLowerCase().includes(search.toLowerCase()));

  return (
    <EmployeePageLayout
      title="Leave Balance"
      description="View your leave entitlement and usage"
      breadcrumbs={['Employee', 'Leave', 'Leave Balance']}
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
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search leave type..." className="w-full text-xs bg-transparent text-slate-900 dark:text-white outline-none placeholder:text-slate-400" />
        </div>
      </GlassPanel>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filtered.map(l => {
          const pct = (l.used / l.total) * 100;
          return (
            <GlassPanel key={l.type} className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <Wallet className="w-4 h-4" />
                </div>
                {l.pending > 0 && <StatusBadge label={`${l.pending} Pending`} variant="pending" dot={false} size="sm" />}
              </div>
              <h3 className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">{l.type}</h3>
              <div className="flex items-baseline gap-1 mb-3">
                <span className="text-2xl font-bold text-slate-900 dark:text-white">{l.remaining}</span>
                <span className="text-xs text-slate-400">/ {l.total}</span>
              </div>
              <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                <div className="h-full rounded-full bg-blue-500" style={{ width: `${pct}%` }} />
              </div>
              <div className="flex justify-between mt-1.5 text-[10px] text-slate-400">
                <span>{l.used} used</span>
                <span>{l.remaining} remaining</span>
              </div>
            </GlassPanel>
          );
        })}
      </div>
    </EmployeePageLayout>
  );
}
