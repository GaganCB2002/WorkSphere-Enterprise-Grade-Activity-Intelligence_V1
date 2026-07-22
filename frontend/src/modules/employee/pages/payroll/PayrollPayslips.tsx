import React, { useState } from 'react';
import { EmployeePageLayout } from '../../components/EmployeePageLayout';
import { GlassPanel } from '../../components/ui/GlassPanel';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Filter, Download, RefreshCw, Search, FileText, ChevronDown } from 'lucide-react';

const payslips = [
  { month: 'June', year: 2026, gross: 125000, net: 98750, deductions: 26250, status: 'Generated' },
  { month: 'May', year: 2026, gross: 125000, net: 98750, deductions: 26250, status: 'Generated' },
  { month: 'April', year: 2026, gross: 125000, net: 98750, deductions: 26250, status: 'Generated' },
  { month: 'March', year: 2026, gross: 125000, net: 98750, deductions: 26250, status: 'Generated' },
  { month: 'February', year: 2026, gross: 125000, net: 98750, deductions: 26250, status: 'Generated' },
  { month: 'January', year: 2026, gross: 115000, net: 90500, deductions: 24500, status: 'Generated' },
  { month: 'December', year: 2025, gross: 115000, net: 90500, deductions: 24500, status: 'Generated' },
  { month: 'November', year: 2025, gross: 115000, net: 90500, deductions: 24500, status: 'Generated' },
  { month: 'October', year: 2025, gross: 115000, net: 90500, deductions: 24500, status: 'Generated' },
  { month: 'September', year: 2025, gross: 115000, net: 90500, deductions: 24500, status: 'Generated' },
  { month: 'August', year: 2025, gross: 110000, net: 86250, deductions: 23750, status: 'Generated' },
  { month: 'July', year: 2025, gross: 110000, net: 86250, deductions: 23750, status: 'Generated' },
];

export default function PayrollPayslips() {
  const [search, setSearch] = useState('');
  const filtered = payslips.filter(p =>
    `${p.month} ${p.year}`.includes(search)
  );

  return (
    <EmployeePageLayout
      title="Payroll Payslips"
      description="Download your monthly payslips"
      breadcrumbs={['Employee', 'Payroll', 'Payslips']}
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
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by month/year..." className="w-full text-xs bg-transparent text-slate-900 dark:text-white outline-none placeholder:text-slate-400" />
        </div>
      </GlassPanel>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((p, i) => (
          <GlassPanel key={i} className="p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white">{p.month} {p.year}</h3>
                  <StatusBadge label={p.status} variant="active" dot={false} size="sm" />
                </div>
              </div>
              <button className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-blue-500 transition-colors">
                <Download className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="space-y-1.5">
              <div className="flex justify-between text-[10px]">
                <span className="text-slate-500 dark:text-slate-400">Gross Pay</span>
                <span className="font-semibold text-slate-900 dark:text-white">₹{p.gross.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[10px]">
                <span className="text-slate-500 dark:text-slate-400">Deductions</span>
                <span className="font-semibold text-rose-500">-₹{p.deductions.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[10px] pt-1.5 border-t border-slate-100 dark:border-white/[0.04]">
                <span className="font-bold text-slate-700 dark:text-slate-300">Net Pay</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">₹{p.net.toLocaleString()}</span>
              </div>
            </div>
          </GlassPanel>
        ))}
      </div>
    </EmployeePageLayout>
  );
}
