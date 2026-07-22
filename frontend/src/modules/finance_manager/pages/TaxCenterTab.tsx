import React, { useState } from 'react';
import { getLiveDate, getLiveTime } from '../../../utils/liveDataHelpers';

import { 
  ShieldCheck, ArrowUpRight, CheckCircle2, Circle, Clock, 
  AlertTriangle, RefreshCw, FileText, CheckCircle
} from 'lucide-react';

interface TaxTask {
  id: string;
  name: string;
  quarter: string;
  dueDate: string;
  liability: number;
  completed: boolean;
}

export const TaxCenterTab: React.FC = () => {
  const [tasks, setTasks] = useState<TaxTask[]>([
    { id: 'TAX-01', name: 'Q3 GST Reconciliation & Filing', quarter: 'Q3 FY26', dueDate: getLiveDate(-23), liability: 245000, completed: false },
    { id: 'TAX-02', name: 'Corporate Income Tax Advance Deposit', quarter: 'Q3 FY26', dueDate: getLiveDate(-16), liability: 850000, completed: false },
    { id: 'TAX-03', name: 'Monthly TDS (Tax Deducted at Source) Return', quarter: 'May 2026', dueDate: getLiveDate(-9), liability: 112000, completed: true },
    { id: 'TAX-04', name: 'EPF & ESIC Payroll Tax Remittance', quarter: 'May 2026', dueDate: getLiveDate(-2), liability: 45000, completed: false },
  ]);

  const handleToggleTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    const task = tasks.find(t => t.id === id);
    if (task && !task.completed) {
      alert(`Cleared tax liability payout of ${task.liability.toLocaleString()} for ${id}. Filing receipts generated.`);
    }
  };

  const totalOutstanding = tasks.reduce((sum, t) => !t.completed ? sum + t.liability : sum, 0);
  const totalSettled = tasks.reduce((sum, t) => t.completed ? sum + t.liability : sum, 0);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white">Tax Center & Compliance</h1>
          <p className="text-[#8693BA] text-sm mt-1">Audit tax liabilities, clear corporate advance tax installments, and file monthly GST returns.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="p-3 bg-[#0F1326]/40 border border-[#1D2644] rounded-2xl flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <div>
              <span className="text-[10px] font-extrabold text-[#5B678E] uppercase tracking-wider block">Compliance Score</span>
              <span className="text-sm font-black text-white">98% Strict Ok</span>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#0F1326]/40 border border-[#1D2644] rounded-2xl p-5 shadow-lg">
          <p className="text-xs font-extrabold text-[#5B678E] uppercase tracking-wider">OUTSTANDING LIABILITY</p>
          <h3 className="text-2xl font-black text-red-400 mt-1.5">₹{totalOutstanding.toLocaleString()}</h3>
          <p className="text-[10px] text-[#8693BA] uppercase tracking-wider mt-1.5">Scheduled for release</p>
        </div>

        <div className="bg-[#0F1326]/40 border border-[#1D2644] rounded-2xl p-5 shadow-lg">
          <p className="text-xs font-extrabold text-[#5B678E] uppercase tracking-wider">SETTLED (Q3 YTD)</p>
          <h3 className="text-2xl font-black text-emerald-400 mt-1.5">₹{totalSettled.toLocaleString()}</h3>
          <p className="text-[10px] text-[#8693BA] uppercase tracking-wider mt-1.5">Tax receipts locked</p>
        </div>

        <div className="bg-[#0F1326]/40 border border-[#1D2644] rounded-2xl p-5 shadow-lg">
          <p className="text-xs font-extrabold text-[#5B678E] uppercase tracking-wider">NEXT AUDIT DATE</p>
          <h3 className="text-2xl font-black text-white mt-1.5">July 15, 2026</h3>
          <p className="text-[10px] text-emerald-400 font-bold mt-1.5 uppercase tracking-wider">Annual statutory audit ready</p>
        </div>
      </div>

      {/* Split List & Reminders */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Compliance Tasks (Left 8 Columns) */}
        <div className="lg:col-span-8 bg-[#0F1326]/40 border border-[#1D2644] rounded-3xl p-6 shadow-xl space-y-6">
          <h3 className="text-lg font-bold text-white border-b border-[#1D2644] pb-3">Filing Checklists</h3>
          
          <div className="space-y-4">
            {tasks.map(task => (
              <div 
                key={task.id} 
                className={`p-4 bg-[#0C101F]/80 border rounded-2xl transition-all ${
                  task.completed ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-[#1C2542] hover:border-[#00e5ff]/50'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <button 
                      onClick={() => handleToggleTask(task.id)}
                      className={`mt-1 transition-colors ${task.completed ? 'text-emerald-400' : 'text-[#5B678E] hover:text-white'}`}
                    >
                      {task.completed ? <CheckCircle2 className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
                    </button>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-[#8693BA] font-mono">{task.id}</span>
                        <span className="text-[9px] font-black px-2 py-0.5 rounded-md font-mono bg-[#00e5ff]/10 text-[#00e5ff]">
                          {task.quarter}
                        </span>
                      </div>
                      <h4 className={`text-sm font-bold mt-1 ${task.completed ? 'text-[#8693BA] line-through' : 'text-white'}`}>
                        {task.name}
                      </h4>
                      <p className="text-[11px] text-[#5B678E] mt-1 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> Due Date: <span className="font-mono">{task.dueDate}</span>
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-mono font-bold text-[#8693BA] block">Liability</span>
                    <span className="text-sm font-mono font-black text-white mt-0.5 block">₹{task.liability.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Audit Guidance & Info Box (Right 4 Columns) */}
        <div className="lg:col-span-4 bg-[#0F1326]/40 border border-[#1D2644] rounded-3xl p-6 shadow-xl flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-md font-bold text-white border-b border-[#1D2644] pb-3 mb-4">Statutory Audits</h3>
            <div className="p-4 bg-[#00e5ff]/5 border border-[#00e5ff]/15 rounded-2xl text-xs text-[#8693BA] leading-relaxed">
              Ensure all vendor bills with value greater than <span className="text-white font-bold">₹50,000</span> have corresponding PDF invoices uploaded under the <span className="text-[#00e5ff] font-bold">Expenses</span> tab before the next audit cycle.
            </div>
            
            <div className="p-4 bg-amber-500/5 border border-amber-500/15 rounded-2xl text-xs text-[#8693BA] leading-relaxed flex gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <p>
                GST Input Tax Credit (ITC) reconciliation mismatch flagged for Q2 invoices. Review matches under Global Income ledger.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
