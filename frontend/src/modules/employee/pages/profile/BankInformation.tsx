import React, { useState, useMemo } from 'react';
import { EmployeePageLayout } from '../../components/EmployeePageLayout';
import { GlassPanel } from '../../components/ui/GlassPanel';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { CreditCard, Building2, Filter, Download, RefreshCw, Search } from 'lucide-react';

const banks = [
  { accountHolder: 'Gagan Chaudhary', bankName: 'State Bank of India', accountNumber: 'XXXX XXXX 4821', ifsc: 'SBIN0001234', branch: 'MG Road, Bangalore', upiId: 'gagan.chaudhary@oksbi' },
  { accountHolder: 'Gagan Chaudhary', bankName: 'HDFC Bank', accountNumber: 'XXXX XXXX 7756', ifsc: 'HDFC0005678', branch: 'Indiranagar, Bangalore', upiId: 'gagan.c@paytm' },
];

export default function BankInformation() {
  const [searchQuery, setSearchQuery] = useState('');
  const filtered = useMemo(() => banks.filter(b =>
    b.bankName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.branch.toLowerCase().includes(searchQuery.toLowerCase())
  ), [searchQuery]);

  return (
    <EmployeePageLayout
      title="Bank Information"
      description="Saved bank accounts and UPI details"
      breadcrumbs={[{ label: 'Employee', href: '/employee/dashboard' }, { label: 'Profile' }, { label: 'Bank Information' }]}
      searchPlaceholder="Search bank info..."
      onSearch={setSearchQuery}
      actions={
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition-colors"><Filter className="w-4 h-4" /></button>
          <button className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition-colors"><Download className="w-4 h-4" /></button>
          <button className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition-colors"><RefreshCw className="w-4 h-4" /></button>
        </div>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((b, i) => (
          <GlassPanel key={i} className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center"><Building2 className="w-5 h-5" /></div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{b.bankName}</h3>
                <p className="text-[10px] text-slate-400">{b.branch}</p>
              </div>
            </div>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between"><span className="text-slate-400">Account Holder</span><span className="text-slate-900 dark:text-white font-medium">{b.accountHolder}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Account Number</span><span className="text-slate-900 dark:text-white font-medium font-mono">{b.accountNumber}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">IFSC Code</span><span className="text-slate-900 dark:text-white font-medium font-mono">{b.ifsc}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">UPI ID</span><span className="text-slate-900 dark:text-white font-medium">{b.upiId}</span></div>
            </div>
          </GlassPanel>
        ))}
      </div>
      {filtered.length === 0 && (
        <GlassPanel className="p-6 text-center py-12">
          <Search className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
          <p className="text-sm text-slate-400">No bank information matches your search</p>
        </GlassPanel>
      )}
    </EmployeePageLayout>
  );
}
