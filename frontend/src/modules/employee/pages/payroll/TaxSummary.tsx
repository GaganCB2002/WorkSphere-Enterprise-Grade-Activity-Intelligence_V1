import React, { useState } from 'react';
import { EmployeePageLayout } from '../../components/EmployeePageLayout';
import { GlassPanel } from '../../components/ui/GlassPanel';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Filter, Download, RefreshCw, Search, Landmark } from 'lucide-react';

const taxYears = [
  { year: '2026-27', grossIncome: 1500000, exemptAmount: 350000, taxableIncome: 1150000, taxPaid: 172500, status: 'In Progress' },
  { year: '2025-26', grossIncome: 1400000, exemptAmount: 320000, taxableIncome: 1080000, taxPaid: 162000, status: 'Filed' },
  { year: '2024-25', grossIncome: 1250000, exemptAmount: 280000, taxableIncome: 970000, taxPaid: 145500, status: 'Filed' },
  { year: '2023-24', grossIncome: 1100000, exemptAmount: 250000, taxableIncome: 850000, taxPaid: 102000, status: 'Filed' },
  { year: '2022-23', grossIncome: 950000, exemptAmount: 200000, taxableIncome: 750000, taxPaid: 75000, status: 'Filed' },
  { year: '2021-22', grossIncome: 800000, exemptAmount: 180000, taxableIncome: 620000, taxPaid: 46500, status: 'Filed' },
];

export default function TaxSummary() {
  const [search, setSearch] = useState('');
  const filtered = taxYears.filter(t => t.year.includes(search));

  return (
    <EmployeePageLayout
      title="Tax Summary"
      description="Income tax details for past and current financial years"
      breadcrumbs={['Employee', 'Payroll', 'Tax Summary']}
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
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by financial year..." className="w-full text-xs bg-transparent text-slate-900 dark:text-white outline-none placeholder:text-slate-400" />
        </div>
      </GlassPanel>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(t => (
          <GlassPanel key={t.year} className="p-5">
            <div className="flex items-start justify-between mb-4">
              <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                <Landmark className="w-4 h-4" />
              </div>
              <StatusBadge label={t.status} variant={t.status === 'Filed' ? 'done' : 'pending'} dot={false} size="sm" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">FY {t.year}</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-[10px]">
                <span className="text-slate-500 dark:text-slate-400">Gross Income</span>
                <span className="font-semibold text-slate-900 dark:text-white">₹{t.grossIncome.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[10px]">
                <span className="text-slate-500 dark:text-slate-400">Exempt Amount</span>
                <span className="font-semibold text-emerald-600">₹{t.exemptAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[10px]">
                <span className="text-slate-500 dark:text-slate-400">Taxable Income</span>
                <span className="font-semibold text-slate-900 dark:text-white">₹{t.taxableIncome.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[10px] pt-2 border-t border-slate-100 dark:border-white/[0.04]">
                <span className="font-bold text-slate-600 dark:text-slate-300">Tax Paid</span>
                <span className="font-bold text-rose-600 dark:text-rose-400">₹{t.taxPaid.toLocaleString()}</span>
              </div>
            </div>
          </GlassPanel>
        ))}
      </div>
    </EmployeePageLayout>
  );
}
