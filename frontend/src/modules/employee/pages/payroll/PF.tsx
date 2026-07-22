import React from 'react';
import { EmployeePageLayout } from '../../components/EmployeePageLayout';
import { GlassPanel } from '../../components/ui/GlassPanel';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Filter, Download, RefreshCw, ShieldCheck } from 'lucide-react';

const pfDetails = {
  uan: 'UAN-123456789012',
  employeeShare: 18000,
  employerShare: 18000,
  totalBalance: 360000,
  monthlyEmployee: 15000,
  monthlyEmployer: 15000,
  status: 'Active',
  accountNumber: 'PFACC-987654321',
  scheme: 'EPF 1952',
};

export default function PF() {
  return (
    <EmployeePageLayout
      title="PF"
      description="Provident Fund details"
      breadcrumbs={['Employee', 'Payroll', 'PF']}
      actions={
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"><Filter className="w-4 h-4" /></button>
          <button className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"><Download className="w-4 h-4" /></button>
          <button className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"><RefreshCw className="w-4 h-4" /></button>
        </div>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassPanel className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">PF Information</h3>
              <p className="text-[10px] text-slate-400">{pfDetails.scheme}</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between py-2 border-b border-slate-100 dark:border-white/[0.04]">
              <span className="text-xs text-slate-500 dark:text-slate-400">UAN</span>
              <span className="text-xs font-semibold text-slate-900 dark:text-white">{pfDetails.uan}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100 dark:border-white/[0.04]">
              <span className="text-xs text-slate-500 dark:text-slate-400">PF Account Number</span>
              <span className="text-xs font-semibold text-slate-900 dark:text-white">{pfDetails.accountNumber}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100 dark:border-white/[0.04]">
              <span className="text-xs text-slate-500 dark:text-slate-400">Employee Share (12%)</span>
              <span className="text-xs font-semibold text-slate-900 dark:text-white">₹{pfDetails.monthlyEmployee.toLocaleString()}/mo</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100 dark:border-white/[0.04]">
              <span className="text-xs text-slate-500 dark:text-slate-400">Employer Share (12%)</span>
              <span className="text-xs font-semibold text-slate-900 dark:text-white">₹{pfDetails.monthlyEmployer.toLocaleString()}/mo</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-xs text-slate-500 dark:text-slate-400">Status</span>
              <StatusBadge label={pfDetails.status} variant="active" dot={false} size="sm" />
            </div>
          </div>
        </GlassPanel>
        <GlassPanel className="p-6">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">PF Balance Summary</h3>
          <div className="text-center mb-6">
            <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold mb-1">Total PF Balance</p>
            <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">₹{pfDetails.totalBalance.toLocaleString()}</p>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-500 dark:text-slate-400">Employee Contribution</span>
                <span className="font-semibold text-slate-900 dark:text-white">₹{pfDetails.employeeShare.toLocaleString()}</span>
              </div>
              <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                <div className="h-full w-1/2 rounded-full bg-blue-500" />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-500 dark:text-slate-400">Employer Contribution</span>
                <span className="font-semibold text-slate-900 dark:text-white">₹{pfDetails.employerShare.toLocaleString()}</span>
              </div>
              <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                <div className="h-full w-1/2 rounded-full bg-emerald-500" />
              </div>
            </div>
          </div>
        </GlassPanel>
      </div>
    </EmployeePageLayout>
  );
}
