import React, { useState } from 'react';
import { 
  CreditCard, ShieldAlert, ArrowUpRight, IndianRupee, UploadCloud, FileText, CheckCircle2, 
  HelpCircle, Eye, RefreshCw, Sparkles, AlertTriangle, FileUp, Clock
} from 'lucide-react';

interface Transaction {
  id: string;
  category: string;
  employee: string;
  dept: string;
  amount: number;
  status: 'PENDING' | 'FLAGGED' | 'APPROVED';
  statusText: string;
  receipt: 'CHECK' | 'FILE' | 'WARNING';
}

export const ExpensesTab: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: '1', category: 'Travel & Transit', employee: 'Sarah Jenkins', dept: 'APAC Sales', amount: 4250, status: 'PENDING', statusText: 'Finance Pending', receipt: 'CHECK' },
    { id: '2', category: 'Software / IT', employee: 'Marcus Chen', dept: 'Engineering', amount: 12800, status: 'FLAGGED', statusText: 'AI Flagged', receipt: 'FILE' },
    { id: '3', category: 'Office Supplies', employee: 'Elena Rodriguez', dept: 'NY HQ Admin', amount: 845.5, status: 'APPROVED', statusText: 'Manager Approved', receipt: 'CHECK' },
    { id: '4', category: 'Client Entertainment', employee: 'David Kim', dept: 'EMEA Partnerships', amount: 1200, status: 'PENDING', statusText: 'Finance Pending', receipt: 'WARNING' },
  ]);

  const handleAudit = (id: string) => {
    alert(`Initiating deep forensic audit for transaction ID: TXN-0${id}. Telemetry checked against corporate policy guidelines.`);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white">Expense & Reimbursement</h1>
          <p className="text-[#8693BA] text-sm mt-1">Command Center - Q3 Global Operations</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 bg-[#0F1326] border border-[#1D2644] text-[#8693BA] hover:text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all">
            <FileText className="w-4 h-4 text-[#00e5ff]" />
            <span>Export Report</span>
          </button>
          <button className="flex items-center gap-2 bg-[#00e5ff] text-[#080B13] hover:bg-[#00ccf0] px-4 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wide transition-all">
            <Sparkles className="w-4 h-4" />
            <span>New Expense</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-[#0F1326]/40 border border-[#1D2644] rounded-2xl p-5 shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-extrabold text-[#5B678E] uppercase tracking-wider">TOTAL MONTHLY SPEND</p>
              <h3 className="text-2xl font-black text-white mt-1.5">₹2.4M</h3>
              <p className="text-[11px] font-bold text-red-400 flex items-center gap-1 mt-1">
                <ArrowUpRight className="w-3.5 h-3.5" /> 4.2% vs last month
              </p>
            </div>
            <div className="p-3 bg-[#00e5ff]/10 border border-[#00e5ff]/20 rounded-xl text-[#00e5ff]">
              <IndianRupee className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="bg-[#0F1326]/40 border border-[#1D2644] rounded-2xl p-5 shadow-lg">
          <div>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-extrabold text-[#5B678E] uppercase tracking-wider">CORPORATE CARD USAGE</p>
                <h3 className="text-2xl font-black text-white mt-1.5">84%</h3>
              </div>
              <div className="p-3 bg-[#00e5ff]/10 border border-[#00e5ff]/20 rounded-xl text-[#00e5ff]">
                <CreditCard className="w-5 h-5" />
              </div>
            </div>
            <div className="w-full bg-[#1C2542] rounded-full h-1.5 mt-3.5 overflow-hidden">
              <div className="bg-[#00e5ff] h-full rounded-full shadow-[0_0_8px_#00e5ff]" style={{ width: '84%' }}></div>
            </div>
            <p className="text-[9px] font-mono text-[#5B678E] uppercase tracking-wider mt-1.5">Limit: ₹3.0M Global Pool</p>
          </div>
        </div>

        <div className="bg-[#0F1326]/40 border border-[#1D2644] rounded-2xl p-5 shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-extrabold text-[#5B678E] uppercase tracking-wider">PENDING REIMBURSEMENTS</p>
              <h3 className="text-2xl font-black text-white mt-1.5">342</h3>
              <p className="text-[11px] font-bold text-[#8693BA] mt-1 font-mono uppercase">
                Est. clearance: ₹142,500
              </p>
            </div>
            <div className="p-3 bg-[#7a78e9]/10 border border-[#7a78e9]/20 rounded-xl text-[#7a78e9]">
              <Clock className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="bg-[#0F1326]/40 border border-[#1D2644] rounded-2xl p-5 shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-extrabold text-[#5B678E] uppercase tracking-wider">FLAGGED BY AI</p>
              <h3 className="text-2xl font-black text-white mt-1.5">14</h3>
              <p className="text-[11px] font-bold text-red-400 flex items-center gap-1 mt-1">
                <ShieldAlert className="w-3.5 h-3.5" /> High anomaly confidence
              </p>
            </div>
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400">
              <ShieldAlert className="w-5 h-5 animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Split: Transactions + Heatmap/Upload */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 8 Columns: Transaction Ledger */}
        <div className="lg:col-span-8 bg-[#0F1326]/40 border border-[#1D2644] rounded-3xl p-6 shadow-xl space-y-6">
          <div className="flex justify-between items-center border-b border-[#1D2644] pb-4">
            <div>
              <h3 className="text-lg font-bold text-white">Recent Global Transactions</h3>
              <p className="text-[#8693BA] text-xs">Real-time tracking of operations expenditures</p>
            </div>
            <button className="text-[#8693BA] hover:text-[#00e5ff] transition-colors">
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          <div className="overflow-x-auto border border-[#1D2644] rounded-2xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#0C101F] border-b border-[#1D2644] text-[10px] font-extrabold text-[#5B678E] uppercase tracking-wider font-mono">
                  <th className="p-4">Category</th>
                  <th className="p-4">Employee / Dept</th>
                  <th className="p-4 text-right">Amount</th>
                  <th className="p-4 text-center">Status</th>
                  <th className="p-4 text-center">Receipt</th>
                  <th className="p-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1D2644]/45 bg-[#0F1326]/10 text-xs">
                {transactions.map(txn => (
                  <tr key={txn.id} className="hover:bg-[#1D2644]/20 transition-all duration-150">
                    <td className="p-4 font-bold text-white">{txn.category}</td>
                    <td className="p-4">
                      <div className="font-bold text-[#F0EEF8]">{txn.employee}</div>
                      <div className="text-[10px] text-[#8693BA] font-mono mt-0.5">{txn.dept}</div>
                    </td>
                    <td className={`p-4 text-right font-black font-mono ${txn.status === 'FLAGGED' ? 'text-red-400' : 'text-white'}`}>
                      ₹{txn.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                    <td className="p-4 text-center">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold ${
                        txn.status === 'APPROVED' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                        txn.status === 'PENDING' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                        'bg-red-500/10 text-red-400 border border-red-500/20'
                      }`}>
                        {txn.statusText}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex justify-center items-center text-[#8693BA]">
                        {txn.receipt === 'CHECK' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                        {txn.receipt === 'FILE' && <FileText className="w-4 h-4 text-[#00e5ff]" />}
                        {txn.receipt === 'WARNING' && <AlertTriangle className="w-4 h-4 text-amber-400" />}
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      {txn.status === 'FLAGGED' ? (
                        <button 
                          onClick={() => handleAudit(txn.id)}
                          className="bg-red-500 hover:bg-red-600 text-white font-extrabold px-3 py-1.5 rounded-lg text-[10px] uppercase tracking-wider transition-all"
                        >
                          Audit
                        </button>
                      ) : (
                        <button 
                          onClick={() => alert(`Viewing invoice record TXN-0${txn.id}...`)}
                          className="text-[#8693BA] hover:text-white p-1 rounded hover:bg-[#1D2644]/30 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <button className="w-full text-center py-3 border border-dashed border-[#1C2542] hover:border-[#00e5ff] text-xs font-bold text-[#8693BA] hover:text-white rounded-xl transition-all">
            View All 1,024 Transactions
          </button>
        </div>

        {/* Right 4 Columns: Heatmap & Receipt Uploader */}
        <div className="lg:col-span-4 space-y-6">
          {/* Dept Spending Heatmap Card */}
          <div className="bg-[#0F1326]/40 border border-[#1D2644] rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex justify-between items-center border-b border-[#1D2644] pb-3">
              <h3 className="text-sm font-bold text-white">Dept Spending Heatmap</h3>
              <button className="text-[#8693BA] hover:text-white transition-colors">
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

            {/* Treemap Custom Layout */}
            <div className="grid grid-cols-12 gap-2 h-44">
              {/* Engineering (Box left, takes 7 columns) */}
              <div className="col-span-7 bg-[#2E355B]/85 border border-[#404981] rounded-xl p-3 flex flex-col justify-between hover:scale-[1.01] transition-transform duration-200 cursor-pointer">
                <span className="text-[10px] font-bold text-white/95">Engineering</span>
                <span className="text-sm font-black text-white">₹1.2M</span>
              </div>

              {/* Right panel containing Sales & Marketing (takes 5 columns) */}
              <div className="col-span-5 flex flex-col gap-2">
                {/* Sales */}
                <div className="flex-1 bg-[#2C6E59]/85 border border-[#3E8D74] rounded-xl p-2.5 flex flex-col justify-between hover:scale-[1.01] transition-transform duration-200 cursor-pointer">
                  <span className="text-[9px] font-bold text-white/95">Sales (NA)</span>
                  <span className="text-xs font-extrabold text-white">Active</span>
                </div>
                {/* Marketing */}
                <div className="flex-1 bg-[#5A5372]/85 border border-[#7D759B] rounded-xl p-2.5 flex flex-col justify-between hover:scale-[1.01] transition-transform duration-200 cursor-pointer">
                  <span className="text-[9px] font-bold text-white/95">Marketing</span>
                  <span className="text-xs font-extrabold text-white">Pending</span>
                </div>
              </div>

              {/* Bottom split for HR & Legal (12 cols) */}
              <div className="col-span-4 bg-[#CE956B]/75 border border-[#EAA87B] rounded-xl p-2.5 flex flex-col justify-between hover:scale-[1.01] transition-transform duration-200 cursor-pointer">
                <span className="text-[9px] font-bold text-[#3B200C]">HR</span>
                <span className="text-xs font-extrabold text-[#3B200C]">Active</span>
              </div>
              <div className="col-span-8 bg-[#8D9ECC]/75 border border-[#AEC0F3] rounded-xl p-2.5 flex flex-col justify-between hover:scale-[1.01] transition-transform duration-200 cursor-pointer">
                <span className="text-[9px] font-bold text-[#141C33]">Legal & Compliance</span>
                <span className="text-xs font-extrabold text-[#141C33]">Audit Ok</span>
              </div>
            </div>
          </div>

          {/* Receipt Uploader Dropzone */}
          <div className="bg-[#0F1326]/40 border border-[#1D2644] rounded-3xl p-6 shadow-xl flex flex-col justify-between border-dashed hover:border-[#00e5ff]/50 transition-colors duration-300">
            <div className="flex flex-col items-center py-6 text-center border-2 border-dashed border-[#1D2644]/80 rounded-2xl bg-[#080B13]/30 hover:bg-[#00e5ff]/5 transition-colors duration-200 cursor-pointer select-none">
              <div className="w-12 h-12 bg-[#00e5ff]/10 rounded-full flex items-center justify-center text-[#00e5ff] border border-[#00e5ff]/20 mb-3 animate-pulse">
                <UploadCloud className="w-6 h-6" />
              </div>
              <h4 className="text-xs font-extrabold text-white uppercase tracking-wider mb-1">Upload Receipts</h4>
              <p className="text-[10px] text-[#8693BA] max-w-[200px] leading-relaxed">
                Drag and drop files here, or click to browse.
              </p>
              <span className="text-[9px] font-mono text-[#5B678E] uppercase tracking-widest mt-4 block">
                SUPPORTS PDF, JPG, PNG (MAX 10MB)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
