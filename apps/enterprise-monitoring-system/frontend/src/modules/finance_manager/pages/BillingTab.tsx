import React, { useState } from 'react';
import { 
  FileSpreadsheet, ArrowUpRight, Search, CheckCircle2, Clock, 
  AlertTriangle, RefreshCw, Send, DollarSign, Calendar
} from 'lucide-react';

interface Invoice {
  id: string;
  vendor: string;
  category: string;
  amount: number;
  dueDate: string;
  status: 'PAID' | 'PENDING' | 'OVERDUE';
}

export const BillingTab: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([
    { id: 'INV-AWS-8930', vendor: 'Amazon Web Services', category: 'Infrastructure', amount: 84200, dueDate: '2026-06-01', status: 'PENDING' },
    { id: 'INV-GCP-1029', vendor: 'Google Cloud Platform', category: 'Database Storage', amount: 18200, dueDate: '2026-05-15', status: 'OVERDUE' },
    { id: 'INV-SF-3021', vendor: 'Salesforce Enterprise', category: 'CRM SaaS License', amount: 142000, dueDate: '2026-06-15', status: 'PENDING' },
    { id: 'INV-SLK-4930', vendor: 'Slack Technologies', category: 'Communications', amount: 8500, dueDate: '2026-05-10', status: 'PAID' },
    { id: 'INV-MS-5021', vendor: 'Microsoft Azure', category: 'AI Infrastructure', amount: 62000, dueDate: '2026-06-05', status: 'PENDING' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'ALL' | 'PAID' | 'PENDING' | 'OVERDUE'>('ALL');

  const handlePayInvoice = (id: string) => {
    setInvoices(prev => prev.map(inv => inv.id === id ? { ...inv, status: 'PAID' } : inv));
    alert(`Initiated instant wire transfer clearance for Invoice: ${id}. Treasury balance debited.`);
  };

  const filteredInvoices = invoices.filter(inv => {
    const matchesSearch = inv.vendor.toLowerCase().includes(searchTerm.toLowerCase()) || inv.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'ALL' || inv.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const totals = invoices.reduce((acc, inv) => {
    if (inv.status === 'PAID') acc.paid += inv.amount;
    else if (inv.status === 'PENDING') acc.pending += inv.amount;
    else acc.overdue += inv.amount;
    return acc;
  }, { paid: 0, pending: 0, overdue: 0 });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white">Accounts Payable & Billing</h1>
          <p className="text-[#8693BA] text-sm mt-1">Audit vendor invoices, clear SaaS subscriptions, and schedule wire releases.</p>
        </div>
        <button 
          onClick={() => alert('Syncing accounts payable with corporate bank accounts...')}
          className="flex items-center gap-2 bg-[#0F1326] border border-[#1D2644] text-[#8693BA] hover:text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all"
        >
          <RefreshCw className="w-4 h-4 text-[#00e5ff]" />
          <span>Refresh Invoices</span>
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#0F1326]/40 border border-[#1D2644] rounded-2xl p-5 shadow-lg">
          <p className="text-xs font-extrabold text-[#5B678E] uppercase tracking-wider">TOTAL SCHEDULED PAYABLES</p>
          <h3 className="text-2xl font-black text-white mt-1.5">₹{(totals.pending + totals.overdue).toLocaleString()}</h3>
          <p className="text-[10px] text-red-400 font-bold mt-1 uppercase tracking-wider">₹{totals.overdue.toLocaleString()} Overdue</p>
        </div>

        <div className="bg-[#0F1326]/40 border border-[#1D2644] rounded-2xl p-5 shadow-lg">
          <p className="text-xs font-extrabold text-[#5B678E] uppercase tracking-wider">CLEARED THIS MONTH</p>
          <h3 className="text-2xl font-black text-emerald-400 mt-1.5">₹{totals.paid.toLocaleString()}</h3>
          <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-wider">100% Cleared via Net-45</p>
        </div>

        <div className="bg-[#0F1326]/40 border border-[#1D2644] rounded-2xl p-5 shadow-lg">
          <p className="text-xs font-extrabold text-[#5B678E] uppercase tracking-wider">SAVINGS REALIZED</p>
          <h3 className="text-2xl font-black text-white mt-1.5">₹24,500</h3>
          <p className="text-[10px] text-[#00e5ff] font-bold mt-1 uppercase tracking-wider">Early Settlement Discounts</p>
        </div>
      </div>

      {/* Invoice list */}
      <div className="bg-[#0F1326]/40 border border-[#1D2644] rounded-3xl p-6 shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[#1D2644] pb-4">
          <div>
            <h3 className="text-lg font-bold text-white">Vendor Invoices Ledger</h3>
            <p className="text-[#8693BA] text-xs">Verify billing details and execute payouts.</p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 md:flex-none md:w-64">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5B678E]" />
              <input 
                type="text" 
                placeholder="Search Vendor / Invoice..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-[#070912] border border-[#1D2644] rounded-xl text-white text-xs placeholder:text-[#5B678E] focus:border-[#00e5ff] focus:outline-none transition-colors"
              />
            </div>

            {/* Filter Toggle */}
            <div className="flex items-center gap-1 bg-[#070912] border border-[#1D2644] rounded-xl p-1 text-xs">
              {(['ALL', 'PENDING', 'OVERDUE', 'PAID'] as const).map(status => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                    filterStatus === status ? 'bg-[#00e5ff]/10 text-[#00e5ff]' : 'text-[#8693BA] hover:text-white'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Ledger Table */}
        <div className="overflow-x-auto border border-[#1D2644] rounded-2xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#0C101F] border-b border-[#1D2644] text-[10px] font-extrabold text-[#5B678E] uppercase tracking-wider font-mono">
                <th className="p-4">Invoice ID</th>
                <th className="p-4">Vendor</th>
                <th className="p-4">Line Item</th>
                <th className="p-4 text-right">Amount</th>
                <th className="p-4 text-center">Due Date</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1D2644]/45 bg-[#0F1326]/10 text-xs">
              {filteredInvoices.map(inv => (
                <tr key={inv.id} className="hover:bg-[#1D2644]/20 transition-all duration-150">
                  <td className="p-4 font-bold text-white font-mono">{inv.id}</td>
                  <td className="p-4 text-[#F0EEF8] font-bold">{inv.vendor}</td>
                  <td className="p-4 text-[#8693BA] font-medium">{inv.category}</td>
                  <td className="p-4 text-right font-black text-white font-mono">₹{inv.amount.toLocaleString()}</td>
                  <td className="p-4 text-center text-[#8693BA] font-mono">{inv.dueDate}</td>
                  <td className="p-4 text-center">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold ${
                      inv.status === 'PAID' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                      inv.status === 'PENDING' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                      'bg-red-500/10 text-red-400 border border-red-500/20'
                    }`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    {inv.status !== 'PAID' ? (
                      <button 
                        onClick={() => handlePayInvoice(inv.id)}
                        className="bg-[#00e5ff] hover:bg-[#00ccf0] text-[#080B13] font-extrabold px-3 py-1.5 rounded-lg text-[10px] uppercase tracking-wider transition-all flex items-center gap-1 mx-auto"
                      >
                        <Send className="w-3 h-3" />
                        <span>Pay</span>
                      </button>
                    ) : (
                      <span className="text-emerald-400 font-bold text-[10px] uppercase tracking-wider block">Cleared</span>
                    )}
                  </td>
                </tr>
              ))}
              {filteredInvoices.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-10 text-center text-[#5B678E] font-medium">No matching vendor invoices found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
