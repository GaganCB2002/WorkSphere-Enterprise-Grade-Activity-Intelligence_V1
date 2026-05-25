import React from 'react';
import { IndianRupee, FileDown, ArrowUpRight, ArrowDownRight, CreditCard, Building2, Send } from 'lucide-react';

export const PayrollManager: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-200">Payroll & Compensation</h1>
          <p className="text-sm text-[#8b949e] mt-1">Manage enterprise salary distribution, compliance deductions, and financial analytics.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-[#161b22] border border-[#30363d] hover:bg-[#21262d] text-slate-200 px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm">
            <FileDown className="w-4 h-4" />
            <span>Export Register</span>
          </button>
          <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm">
            <Send className="w-4 h-4" />
            <span>Process Payroll</span>
          </button>
        </div>
      </div>

      {/* Financial Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Payroll Cost', value: '₹2.4M', sub: 'May 2026', icon: IndianRupee, trend: 'up' },
          { label: 'Tax Deductions', value: '₹450K', sub: 'Compliance', icon: Building2, trend: 'neutral' },
          { label: 'Bonuses & Incentives', value: '₹120K', sub: 'Performance', icon: ArrowUpRight, trend: 'up' },
          { label: 'Reimbursements', value: '₹15K', sub: 'Pending Approval', icon: CreditCard, trend: 'down' },
        ].map((stat, i) => (
          <div key={i} className="bg-[#161b22] border border-[#30363d] p-5 rounded-2xl">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 rounded-xl bg-[#21262d]">
                <stat.icon className="w-5 h-5 text-[#8b949e]" />
              </div>
              {stat.trend === 'up' && <ArrowUpRight className="w-4 h-4 text-emerald-400" />}
              {stat.trend === 'down' && <ArrowDownRight className="w-4 h-4 text-rose-400" />}
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-200">{stat.value}</div>
              <div className="text-xs font-semibold text-[#8b949e] mt-1">{stat.label}</div>
              <div className="text-[10px] text-slate-500 mt-0.5">{stat.sub}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Salary Distribution Chart Placeholder */}
        <div className="lg:col-span-2 bg-[#161b22] border border-[#30363d] rounded-2xl p-6 flex flex-col min-h-[400px]">
          <h3 className="text-sm font-bold text-slate-200 mb-4">Department Salary Distribution</h3>
          <div className="flex-1 border border-dashed border-[#30363d] rounded-xl flex items-center justify-center text-[#8b949e] bg-[#0E1117]/50">
            [Recharts BarChart: Salary by Department]
          </div>
        </div>

        {/* Recent Processing Logs */}
        <div className="lg:col-span-1 bg-[#161b22] border border-[#30363d] rounded-2xl p-6 flex flex-col">
          <h3 className="text-sm font-bold text-slate-200 mb-4">Recent Payroll Runs</h3>
          <div className="flex-1 space-y-4">
            {[
              { date: 'Apr 30, 2026', type: 'Standard Run', amount: '₹2,380,000', status: 'Completed' },
              { date: 'Apr 15, 2026', type: 'Off-cycle (Bonuses)', amount: '₹45,000', status: 'Completed' },
              { date: 'Mar 31, 2026', type: 'Standard Run', amount: '₹2,350,000', status: 'Completed' },
            ].map((run, i) => (
              <div key={i} className="bg-[#0E1117] border border-[#30363d] p-4 rounded-xl">
                <div className="flex justify-between items-center mb-2">
                  <div className="text-sm font-bold text-slate-200">{run.type}</div>
                  <div className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">{run.status}</div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-xs text-[#8b949e]">{run.date}</div>
                  <div className="text-sm font-mono text-slate-300 font-bold">{run.amount}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
