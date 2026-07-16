import React, { useState } from 'react';
import { getLiveDate, getLiveTime } from '../../../utils/liveDataHelpers';

import { 
  ArrowUpRight, IndianRupee, Search, Filter, ArrowDownRight, CheckCircle2, 
  AlertTriangle, Clock, RefreshCw 
} from 'lucide-react';
import { 
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid 
} from 'recharts';

const mockRevenueData = [
  { month: 'Jan', revenue: 9.8 },
  { month: 'Feb', revenue: 11.5 },
  { month: 'Mar', revenue: 10.2 },
  { month: 'Apr', revenue: 13.8 },
  { month: 'May', revenue: 15.6 },
];

const mockInvoices = [
  { id: 'INV-2026-001', client: 'Acme Corp', amount: 125000, dueDate: getLiveDate(-23), status: 'PAID' },
  { id: 'INV-2026-002', client: 'Global Dynamics', amount: 85000, dueDate: getLiveDate(-16), status: 'PENDING' },
  { id: 'INV-2026-003', client: 'Cyberdyne Systems', amount: 210000, dueDate: getLiveDate(-9), status: 'OVERDUE' },
  { id: 'INV-2026-004', client: 'Stark Industries', amount: 350000, dueDate: getLiveDate(-2), status: 'PENDING' },
  { id: 'INV-2026-005', client: 'Weyland-Yutani', amount: 175000, dueDate: getLiveDate(5), status: 'PAID' },
];

export const IncomeTab: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const filteredInvoices = mockInvoices.filter(inv => {
    const matchesSearch = inv.client.toLowerCase().includes(searchTerm.toLowerCase()) || inv.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || inv.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white">Income & Revenue</h1>
          <p className="text-[#8693BA] text-sm mt-1">High-density management for global receivables.</p>
        </div>
        <button 
          onClick={() => alert('Refreshing ledger entries...')}
          className="flex items-center gap-2 bg-[#0F1326] border border-[#1D2644] text-[#8693BA] hover:text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all"
        >
          <RefreshCw className="w-4 h-4 text-[#00e5ff]" />
          <span>Sync Receivables</span>
        </button>
      </div>

      {/* Primary Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#0F1326]/40 border border-[#1D2644] rounded-2xl p-6 shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-extrabold text-[#5B678E] uppercase tracking-wider">ACCOUNTS RECEIVABLE</p>
              <h3 className="text-3xl font-black text-white mt-2">₹4.2M</h3>
              <p className="text-[11px] font-bold text-emerald-400 flex items-center gap-1 mt-1.5">
                <ArrowUpRight className="w-3.5 h-3.5" /> +12.5% vs last quarter
              </p>
            </div>
            <div className="p-3 bg-[#00e5ff]/10 border border-[#00e5ff]/20 rounded-xl text-[#00e5ff]">
              <IndianRupee className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-[#0F1326]/40 border border-[#1D2644] rounded-2xl p-6 shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-extrabold text-[#5B678E] uppercase tracking-wider">AVERAGE INVOICE CYCLE</p>
              <h3 className="text-3xl font-black text-white mt-2">14 Days</h3>
              <p className="text-[11px] font-bold text-emerald-400 flex items-center gap-1 mt-1.5">
                <ArrowDownRight className="w-3.5 h-3.5" /> -2.1 days (faster collection)
              </p>
            </div>
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400">
              <Clock className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-[#0F1326]/40 border border-[#1D2644] rounded-2xl p-6 shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-extrabold text-[#5B678E] uppercase tracking-wider">OVERDUE BALANCE</p>
              <h3 className="text-3xl font-black text-white mt-2">₹210K</h3>
              <p className="text-[11px] font-bold text-red-400 flex items-center gap-1 mt-1.5">
                <AlertTriangle className="w-3.5 h-3.5" /> 1 Account requiring action
              </p>
            </div>
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400">
              <AlertTriangle className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Graph */}
      <div className="bg-[#0F1326]/40 border border-[#1D2644] rounded-3xl p-6 shadow-xl space-y-4">
        <div>
          <h3 className="text-lg font-bold text-white">Interactive Monthly Revenue (₹ Millions)</h3>
          <p className="text-[#8693BA] text-xs mt-1">Operational income analysis across global command structures</p>
        </div>

        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockRevenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1D2644" opacity={0.4} />
              <XAxis dataKey="month" stroke="#5B678E" fontSize={11} />
              <YAxis stroke="#5B678E" fontSize={11} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0C101F', borderColor: '#1D2644', borderRadius: '1rem', color: '#fff', fontSize: '12px' }}
              />
              <Line type="monotone" dataKey="revenue" name="Net Revenue" stroke="#00e5ff" strokeWidth={3.5} dot={{ r: 4, stroke: '#00e5ff', strokeWidth: 2, fill: '#080B13' }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Invoice Ledger Table */}
      <div className="bg-[#0F1326]/40 border border-[#1D2644] rounded-3xl p-6 shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[#1D2644] pb-4">
          <div>
            <h3 className="text-lg font-bold text-white">Global Income Ledger</h3>
            <p className="text-[#8693BA] text-xs">Track client wire transfers and invoice states</p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 md:flex-none md:w-64">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5B678E]" />
              <input 
                type="text" 
                placeholder="Search Invoice ID / Client..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-[#070912] border border-[#1D2644] rounded-xl text-white text-xs placeholder:text-[#5B678E] focus:border-[#00e5ff] focus:outline-none transition-colors"
              />
            </div>

            {/* Filter Toggle */}
            <div className="flex items-center gap-1.5 bg-[#070912] border border-[#1D2644] rounded-xl p-1 text-xs">
              <button 
                onClick={() => setStatusFilter('ALL')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${statusFilter === 'ALL' ? 'bg-[#00e5ff]/10 text-[#00e5ff]' : 'text-[#8693BA] hover:text-white'}`}
              >
                All
              </button>
              <button 
                onClick={() => setStatusFilter('PAID')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${statusFilter === 'PAID' ? 'bg-[#00e5ff]/10 text-[#00e5ff]' : 'text-[#8693BA] hover:text-white'}`}
              >
                Paid
              </button>
              <button 
                onClick={() => setStatusFilter('PENDING')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${statusFilter === 'PENDING' ? 'bg-[#00e5ff]/10 text-[#00e5ff]' : 'text-[#8693BA] hover:text-white'}`}
              >
                Pending
              </button>
              <button 
                onClick={() => setStatusFilter('OVERDUE')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${statusFilter === 'OVERDUE' ? 'bg-[#00e5ff]/10 text-[#00e5ff]' : 'text-[#8693BA] hover:text-white'}`}
              >
                Overdue
              </button>
            </div>
          </div>
        </div>

        {/* Ledger Table */}
        <div className="overflow-x-auto border border-[#1D2644] rounded-2xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#0C101F] border-b border-[#1D2644] text-[10px] font-extrabold text-[#5B678E] uppercase tracking-wider font-mono">
                <th className="p-4">Invoice ID</th>
                <th className="p-4">Client Name</th>
                <th className="p-4 text-right">Amount</th>
                <th className="p-4 text-center">Due Date</th>
                <th className="p-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1D2644]/45 bg-[#0F1326]/10 text-xs">
              {filteredInvoices.map(inv => (
                <tr key={inv.id} className="hover:bg-[#1D2644]/20 transition-all duration-150">
                  <td className="p-4 font-bold text-white font-mono">{inv.id}</td>
                  <td className="p-4 text-[#F0EEF8] font-medium">{inv.client}</td>
                  <td className="p-4 text-right font-black text-[#00e5ff] font-mono">₹{inv.amount.toLocaleString()}</td>
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
                </tr>
              ))}
              {filteredInvoices.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-10 text-center text-[#5B678E] font-medium">No matching invoices found in treasury.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
