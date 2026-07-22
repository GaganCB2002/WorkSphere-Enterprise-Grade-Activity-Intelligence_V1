import React from 'react';
import { EmployeePageLayout } from '../../components/EmployeePageLayout';
import { GlassPanel } from '../../components/ui/GlassPanel';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Filter, Download, RefreshCw, Shield } from 'lucide-react';

const esiDetails = {
  esiNumber: 'ESIC-123456-7890',
  employeeContribution: 1875,
  employerContribution: 6500,
  totalContribution: 8375,
  coverageFrom: '01 Apr 2025',
  coverageTo: '31 Mar 2026',
  status: 'Active',
  monthlyEmployee: 625,
  monthlyEmployer: 2167,
};

export default function ESI() {
  return (
    <EmployeePageLayout
      title="ESI"
      description="Employee State Insurance details"
      breadcrumbs={['Employee', 'Payroll', 'ESI']}
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
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">ESI Information</h3>
              <p className="text-[10px] text-slate-400">Coverage period: {esiDetails.coverageFrom} - {esiDetails.coverageTo}</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between py-2 border-b border-slate-100 dark:border-white/[0.04]">
              <span className="text-xs text-slate-500 dark:text-slate-400">ESI Number</span>
              <span className="text-xs font-semibold text-slate-900 dark:text-white">{esiDetails.esiNumber}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100 dark:border-white/[0.04]">
              <span className="text-xs text-slate-500 dark:text-slate-400">Monthly Employee Contribution</span>
              <span className="text-xs font-semibold text-slate-900 dark:text-white">₹{esiDetails.monthlyEmployee.toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100 dark:border-white/[0.04]">
              <span className="text-xs text-slate-500 dark:text-slate-400">Monthly Employer Contribution</span>
              <span className="text-xs font-semibold text-slate-900 dark:text-white">₹{esiDetails.monthlyEmployer.toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100 dark:border-white/[0.04]">
              <span className="text-xs text-slate-500 dark:text-slate-400">Total FY Contribution</span>
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400">₹{esiDetails.totalContribution.toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-xs text-slate-500 dark:text-slate-400">Status</span>
              <StatusBadge label={esiDetails.status} variant="active" dot={false} size="sm" />
            </div>
          </div>
        </GlassPanel>
        <GlassPanel className="p-6">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">Contribution Breakdown</h3>
          <div className="space-y-5">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-500 dark:text-slate-400">Employee Share (0.75%)</span>
                <span className="font-semibold text-slate-900 dark:text-white">₹{esiDetails.monthlyEmployee.toLocaleString()}/mo</span>
              </div>
              <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                <div className="h-full w-[22%] rounded-full bg-blue-500" />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-500 dark:text-slate-400">Employer Share (3.25%)</span>
                <span className="font-semibold text-slate-900 dark:text-white">₹{esiDetails.monthlyEmployer.toLocaleString()}/mo</span>
              </div>
              <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                <div className="h-full w-[78%] rounded-full bg-emerald-500" />
              </div>
            </div>
          </div>
        </GlassPanel>
      </div>
    </EmployeePageLayout>
  );
}
