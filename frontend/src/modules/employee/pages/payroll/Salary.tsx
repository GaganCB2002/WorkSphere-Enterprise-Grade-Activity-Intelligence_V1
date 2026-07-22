import React, { useState } from 'react';
import { EmployeePageLayout } from '../../components/EmployeePageLayout';
import { GlassPanel } from '../../components/ui/GlassPanel';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Filter, Download, RefreshCw, Search, IndianRupee } from 'lucide-react';

const salaryComponents = [
  { component: 'Basic Salary', amount: 50000, type: 'Earnings' },
  { component: 'House Rent Allowance', amount: 25000, type: 'Earnings' },
  { component: 'Special Allowance', amount: 15000, type: 'Earnings' },
  { component: 'Conveyance Allowance', amount: 3200, type: 'Earnings' },
  { component: 'Medical Allowance', amount: 1250, type: 'Earnings' },
  { component: 'Leave Travel Allowance', amount: 3000, type: 'Earnings' },
  { component: 'Provident Fund', amount: 18000, type: 'Deductions' },
  { component: 'Professional Tax', amount: 2500, type: 'Deductions' },
  { component: 'Income Tax (TDS)', amount: 15000, type: 'Deductions' },
  { component: 'ESI Contribution', amount: 625, type: 'Deductions' },
  { component: 'Health Insurance', amount: 3500, type: 'Deductions' },
  { component: 'Other Deductions', amount: 2000, type: 'Deductions' },
];

export default function Salary() {
  const [search, setSearch] = useState('');
  const filtered = salaryComponents.filter(s =>
    s.component.toLowerCase().includes(search.toLowerCase()) ||
    s.type.toLowerCase().includes(search.toLowerCase())
  );

  const earnings = filtered.filter(s => s.type === 'Earnings');
  const deductions = filtered.filter(s => s.type === 'Deductions');
  const totalEarnings = earnings.reduce((sum, s) => sum + s.amount, 0);
  const totalDeductions = deductions.reduce((sum, s) => sum + s.amount, 0);
  const netSalary = totalEarnings - totalDeductions;

  return (
    <EmployeePageLayout
      title="Salary Structure"
      description="Breakdown of your salary components"
      breadcrumbs={['Employee', 'Payroll', 'Salary']}
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
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search components..." className="w-full text-xs bg-transparent text-slate-900 dark:text-white outline-none placeholder:text-slate-400" />
        </div>
      </GlassPanel>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassPanel className="p-6">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <IndianRupee className="w-4 h-4 text-emerald-500" />
            Earnings
          </h3>
          <div className="space-y-1">
            {earnings.map(s => (
              <div key={s.component} className="flex justify-between py-2 border-b border-slate-100 dark:border-white/[0.04] last:border-0">
                <span className="text-xs text-slate-600 dark:text-slate-300">{s.component}</span>
                <span className="text-xs font-semibold text-slate-900 dark:text-white">₹{s.amount.toLocaleString()}</span>
              </div>
            ))}
            <div className="flex justify-between py-2 mt-2 border-t-2 border-slate-200 dark:border-slate-700">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Total Earnings</span>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">₹{totalEarnings.toLocaleString()}</span>
            </div>
          </div>
        </GlassPanel>
        <GlassPanel className="p-6">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <IndianRupee className="w-4 h-4 text-rose-500" />
            Deductions
          </h3>
          <div className="space-y-1">
            {deductions.map(s => (
              <div key={s.component} className="flex justify-between py-2 border-b border-slate-100 dark:border-white/[0.04] last:border-0">
                <span className="text-xs text-slate-600 dark:text-slate-300">{s.component}</span>
                <span className="text-xs font-semibold text-rose-500">-₹{s.amount.toLocaleString()}</span>
              </div>
            ))}
            <div className="flex justify-between py-2 mt-2 border-t-2 border-slate-200 dark:border-slate-700">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Total Deductions</span>
              <span className="text-xs font-bold text-rose-500">-₹{totalDeductions.toLocaleString()}</span>
            </div>
          </div>
        </GlassPanel>
      </div>
      <GlassPanel className="p-6 mt-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Net Monthly Salary</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">₹{netSalary.toLocaleString()}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-[10px] text-slate-400">Total Earnings</p>
              <p className="text-sm font-bold text-emerald-600">₹{totalEarnings.toLocaleString()}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-slate-400">Total Deductions</p>
              <p className="text-sm font-bold text-rose-500">-₹{totalDeductions.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </GlassPanel>
    </EmployeePageLayout>
  );
}
