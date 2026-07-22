import React, { useState } from 'react';
import { Filter, Download, RefreshCw, Search, DollarSign, DownloadCloud, Calendar } from 'lucide-react';
import { EmployeePageLayout } from '../../components/EmployeePageLayout';
import { GlassPanel } from '../../components/ui/GlassPanel';
import { StatusBadge } from '../../components/ui/StatusBadge';

const payslips = [
  { id: 1, month: 'July', year: 2026, grossPay: 85000, deductions: 12500, netPay: 72500, status: 'Generated' },
  { id: 2, month: 'June', year: 2026, grossPay: 85000, deductions: 12500, netPay: 72500, status: 'Generated' },
  { id: 3, month: 'May', year: 2026, grossPay: 85000, deductions: 12500, netPay: 72500, status: 'Generated' },
  { id: 4, month: 'April', year: 2026, grossPay: 85000, deductions: 12500, netPay: 72500, status: 'Generated' },
  { id: 5, month: 'March', year: 2026, grossPay: 85000, deductions: 12500, netPay: 72500, status: 'Generated' },
  { id: 6, month: 'February', year: 2026, grossPay: 85000, deductions: 12500, netPay: 72500, status: 'Generated' },
  { id: 7, month: 'January', year: 2026, grossPay: 85000, deductions: 12500, netPay: 72500, status: 'Generated' },
  { id: 8, month: 'December', year: 2025, grossPay: 82000, deductions: 12000, netPay: 70000, status: 'Generated' },
  { id: 9, month: 'November', year: 2025, grossPay: 82000, deductions: 12000, netPay: 70000, status: 'Generated' },
  { id: 10, month: 'October', year: 2025, grossPay: 82000, deductions: 12000, netPay: 70000, status: 'Generated' },
];

export default function Payslips() {
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = payslips.filter(p =>
    `${p.month} ${p.year}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <EmployeePageLayout
      title="Payslips"
      description="Monthly salary slips and payment records"
      breadcrumbs={['Employee', 'Documents', 'Payslips']}
      actions={
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition-colors"><Filter className="w-4 h-4" /></button>
          <button className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition-colors"><Download className="w-4 h-4" /></button>
          <button className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition-colors"><RefreshCw className="w-4 h-4" /></button>
        </div>
      }
    >
      <GlassPanel className="p-4 flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/[0.04] rounded-xl">
        <Search className="w-4 h-4 text-slate-400" />
        <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search payslips..." className="w-full text-xs bg-transparent text-slate-900 dark:text-white outline-none placeholder:text-slate-400" />
      </GlassPanel>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(p => (
          <GlassPanel key={p.id} className="p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <DollarSign className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">{p.month} {p.year}</h3>
                  <p className="text-[10px] text-slate-400 mt-0.5">Payslip</p>
                </div>
              </div>
              <StatusBadge label={p.status} variant={p.status === 'Generated' ? 'active' : 'pending'} />
            </div>
            <div className="grid grid-cols-3 gap-4 mt-3 pt-3 border-t border-slate-100 dark:border-white/[0.06]">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Gross Pay</p>
                <p className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">${p.grossPay.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Deductions</p>
                <p className="text-sm font-bold text-rose-500 mt-0.5">-${p.deductions.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Net Pay</p>
                <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">${p.netPay.toLocaleString()}</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-white/[0.06] flex justify-end">
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-lg shadow-blue-500/25 transition-all">
                <Download className="w-3.5 h-3.5" />
                Download
              </button>
            </div>
          </GlassPanel>
        ))}
      </div>
    </EmployeePageLayout>
  );
}
