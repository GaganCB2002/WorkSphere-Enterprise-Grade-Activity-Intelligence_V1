import React, { useState } from 'react';
import { 
  ArrowUpRight, Search, Calendar, CheckCircle2, Clock, 
  AlertTriangle, Filter, RotateCcw, ArrowDownRight, RefreshCw 
} from 'lucide-react';

interface LedgerItem {
  id: string;
  reference: string;
  date: string;
  entity: 'NA' | 'EMEA' | 'APAC';
  amount: number;
  type: 'INFLOW' | 'OUTFLOW';
  status: 'COMPLETED' | 'PROCESSING' | 'FLAGGED';
}

const mockLedgerItems: LedgerItem[] = [
  { id: 'TXN-9021', reference: 'Acme Corp Wire Transfer', date: '2026-05-24', entity: 'NA', amount: 125000, type: 'INFLOW', status: 'COMPLETED' },
  { id: 'TXN-9022', reference: 'Sarah Jenkins Expense', date: '2026-05-23', entity: 'APAC', amount: 4250, type: 'OUTFLOW', status: 'PROCESSING' },
  { id: 'TXN-9023', reference: 'AWS Cloud Hosting', date: '2026-05-22', entity: 'NA', amount: 32000, type: 'OUTFLOW', status: 'COMPLETED' },
  { id: 'TXN-9024', reference: 'Marcus Chen Expense (AI)', date: '2026-05-22', entity: 'NA', amount: 12800, type: 'OUTFLOW', status: 'FLAGGED' },
  { id: 'TXN-9025', reference: 'Global Dynamics Invoice', date: '2026-05-21', entity: 'EMEA', amount: 85000, type: 'INFLOW', status: 'COMPLETED' },
  { id: 'TXN-9026', reference: 'Office Supplies Bulk', date: '2026-05-20', entity: 'NA', amount: 845.5, type: 'OUTFLOW', status: 'COMPLETED' },
  { id: 'TXN-9027', reference: 'Client Dinner London', date: '2026-05-19', entity: 'EMEA', amount: 1200, type: 'OUTFLOW', status: 'PROCESSING' },
];

export const TransactionsTab: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState('7');
  const [entities, setEntities] = useState({ NA: true, EMEA: true, APAC: false });
  const [statusFilter, setStatusFilter] = useState({ COMPLETED: true, PROCESSING: true, FLAGGED: false });

  const resetFilters = () => {
    setSearchQuery('');
    setDateRange('7');
    setEntities({ NA: true, EMEA: true, APAC: false });
    setStatusFilter({ COMPLETED: true, PROCESSING: true, FLAGGED: false });
  };

  const filteredItems = mockLedgerItems.filter(item => {
    const matchesSearch = item.reference.toLowerCase().includes(searchQuery.toLowerCase()) || item.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesEntity = (item.entity === 'NA' && entities.NA) || (item.entity === 'EMEA' && entities.EMEA) || (item.entity === 'APAC' && entities.APAC);
    const matchesStatus = (item.status === 'COMPLETED' && statusFilter.COMPLETED) || (item.status === 'PROCESSING' && statusFilter.PROCESSING) || (item.status === 'FLAGGED' && statusFilter.FLAGGED);
    return matchesSearch && matchesEntity && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white">Global Transactions</h1>
          <p className="text-[#8693BA] text-sm mt-1">Review and manage high-density ledger accounts.</p>
        </div>
        <button 
          onClick={() => alert('Syncing ledger transactions with blockchain indexer...')}
          className="flex items-center gap-2 bg-[#0F1326] border border-[#1D2644] text-[#8693BA] hover:text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all"
        >
          <RefreshCw className="w-4 h-4 text-[#00e5ff]" />
          <span>Sync Ledger</span>
        </button>
      </div>

      {/* Main Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Stats + Ledger Filters (approx 3/12 cols) */}
        <div className="lg:col-span-3 space-y-6">
          {/* Total Liquidity Card */}
          <div className="bg-[#0F1326]/40 border border-[#1D2644] rounded-2xl p-5 shadow-lg">
            <p className="text-xs font-extrabold text-[#5B678E] uppercase tracking-wider">TOTAL LIQUIDITY</p>
            <h3 className="text-2xl font-black text-white mt-1.5">₹1.42B</h3>
            <p className="text-[11px] font-bold text-[#00e5ff] flex items-center gap-1 mt-1">
              <ArrowUpRight className="w-3.5 h-3.5" /> +2.4% vs last month
            </p>
          </div>

          {/* Ledger Filters Panel */}
          <section className="bg-[#0F1326]/40 border border-[#1D2644] rounded-3xl p-6 shadow-xl space-y-6">
            <div className="flex items-center gap-2 border-b border-[#1D2644] pb-3 text-sm font-bold text-white">
              <Filter className="w-4 h-4 text-[#00e5ff]" />
              <span>Ledger Filters</span>
            </div>

            {/* Search ID or Reference */}
            <div className="space-y-2">
              <label className="text-[10px] font-extrabold text-[#5B678E] uppercase tracking-widest block">
                Search ID or Reference
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5B678E]" />
                <input 
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="e.g. TXN-8493..."
                  className="w-full pl-9 pr-4 py-2.5 bg-[#070912] border border-[#1C2542] rounded-xl text-white text-xs placeholder:text-[#5B678E] focus:border-[#00e5ff] focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Date Range Dropdown */}
            <div className="space-y-2">
              <label className="text-[10px] font-extrabold text-[#5B678E] uppercase tracking-widest block">
                Date Range
              </label>
              <select 
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full px-3 py-2.5 bg-[#070912] border border-[#1C2542] rounded-xl text-white text-xs focus:border-[#00e5ff] focus:outline-none cursor-pointer"
              >
                <option value="1">Last 24 Hours</option>
                <option value="7">Last 7 Days</option>
                <option value="30">Last 30 Days</option>
                <option value="90">Last Quarter</option>
              </select>
            </div>

            {/* Entity Checkboxes */}
            <div className="space-y-3">
              <label className="text-[10px] font-extrabold text-[#5B678E] uppercase tracking-widest block">
                Entity
              </label>
              <div className="space-y-2">
                <label className="flex items-center gap-2.5 text-xs text-[#8693BA] hover:text-white cursor-pointer select-none">
                  <input 
                    type="checkbox" 
                    checked={entities.NA}
                    onChange={(e) => setEntities({ ...entities, NA: e.target.checked })}
                    className="rounded border-[#1D2644] bg-[#070912] text-[#00e5ff] focus:ring-0 focus:ring-offset-0"
                  />
                  <span>FinCorp NA</span>
                </label>
                <label className="flex items-center gap-2.5 text-xs text-[#8693BA] hover:text-white cursor-pointer select-none">
                  <input 
                    type="checkbox" 
                    checked={entities.EMEA}
                    onChange={(e) => setEntities({ ...entities, EMEA: e.target.checked })}
                    className="rounded border-[#1D2644] bg-[#070912] text-[#00e5ff] focus:ring-0 focus:ring-offset-0"
                  />
                  <span>FinCorp EMEA</span>
                </label>
                <label className="flex items-center gap-2.5 text-xs text-[#8693BA] hover:text-white cursor-pointer select-none">
                  <input 
                    type="checkbox" 
                    checked={entities.APAC}
                    onChange={(e) => setEntities({ ...entities, APAC: e.target.checked })}
                    className="rounded border-[#1D2644] bg-[#070912] text-[#00e5ff] focus:ring-0 focus:ring-offset-0"
                  />
                  <span>FinCorp APAC</span>
                </label>
              </div>
            </div>

            {/* Status Buttons */}
            <div className="space-y-3">
              <label className="text-[10px] font-extrabold text-[#5B678E] uppercase tracking-widest block">
                Status
              </label>
              <div className="flex flex-wrap gap-2">
                <button 
                  onClick={() => setStatusFilter({ ...statusFilter, COMPLETED: !statusFilter.COMPLETED })}
                  className={`px-3 py-1.5 rounded-xl border text-[10px] font-bold tracking-wide uppercase transition-all ${
                    statusFilter.COMPLETED 
                      ? 'bg-[#00e5ff]/10 border-[#00e5ff] text-[#00e5ff]' 
                      : 'bg-[#070912] border-[#1D2644] text-[#8693BA] hover:text-white'
                  }`}
                >
                  Completed
                </button>
                <button 
                  onClick={() => setStatusFilter({ ...statusFilter, PROCESSING: !statusFilter.PROCESSING })}
                  className={`px-3 py-1.5 rounded-xl border text-[10px] font-bold tracking-wide uppercase transition-all ${
                    statusFilter.PROCESSING 
                      ? 'bg-[#7a78e9]/10 border-[#7a78e9] text-[#7a78e9]' 
                      : 'bg-[#070912] border-[#1D2644] text-[#8693BA] hover:text-white'
                  }`}
                >
                  Processing
                </button>
                <button 
                  onClick={() => setStatusFilter({ ...statusFilter, FLAGGED: !statusFilter.FLAGGED })}
                  className={`px-3 py-1.5 rounded-xl border text-[10px] font-bold tracking-wide uppercase transition-all ${
                    statusFilter.FLAGGED 
                      ? 'bg-red-500/10 border-red-500 text-red-400' 
                      : 'bg-[#070912] border-[#1D2644] text-[#8693BA] hover:text-white'
                  }`}
                >
                  Flagged
                </button>
              </div>
            </div>

            {/* Reset Filters button */}
            <button 
              onClick={resetFilters}
              className="w-full py-2.5 bg-[#0C1226]/80 hover:bg-[#121B35] border border-[#1E294B] hover:border-[#00e5ff] text-[#8693BA] hover:text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          </section>
        </div>

        {/* Right Column: Transaction Ledger Table (approx 9/12 cols) */}
        <section className="lg:col-span-9 bg-[#0F1326]/40 border border-[#1D2644] rounded-3xl p-6 shadow-xl space-y-6">
          <div className="flex justify-between items-baseline border-b border-[#1D2644] pb-4">
            <div>
              <h3 className="text-lg font-bold text-white">Global Ledger Records</h3>
              <p className="text-[#8693BA] text-xs">High-density summary of operational transactions</p>
            </div>
            <span className="text-[11px] font-mono font-bold text-[#8693BA]">
              Showing {filteredItems.length} records
            </span>
          </div>

          <div className="overflow-x-auto border border-[#1D2644] rounded-2xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#0C101F] border-b border-[#1D2644] text-[10px] font-extrabold text-[#5B678E] uppercase tracking-wider font-mono">
                  <th className="p-4">Txn ID</th>
                  <th className="p-4">Reference / Memo</th>
                  <th className="p-4 text-center font-mono">Entity</th>
                  <th className="p-4 text-right">Amount</th>
                  <th className="p-4 text-center font-mono">Date</th>
                  <th className="p-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1D2644]/45 bg-[#0F1326]/10 text-xs">
                {filteredItems.map(item => (
                  <tr key={item.id} className="hover:bg-[#1D2644]/20 transition-all duration-150">
                    <td className="p-4 font-bold text-white font-mono">{item.id}</td>
                    <td className="p-4 text-[#F0EEF8] font-medium">{item.reference}</td>
                    <td className="p-4 text-center text-[#8693BA] font-mono">FinCorp {item.entity}</td>
                    <td className={`p-4 text-right font-black font-mono ${
                      item.type === 'INFLOW' ? 'text-emerald-400' : (item.status === 'FLAGGED' ? 'text-red-400' : 'text-white')
                    }`}>
                      {item.type === 'INFLOW' ? '+' : '-'}₹{item.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                    <td className="p-4 text-center text-[#8693BA] font-mono">{item.date}</td>
                    <td className="p-4 text-center">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold ${
                        item.status === 'COMPLETED' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                        item.status === 'PROCESSING' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                        'bg-red-500/10 text-red-400 border border-red-500/20'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {filteredItems.length === 0 && (
                  <tr>
                    <td colSpan={6} className="p-12 text-center text-[#5B678E] font-medium">No ledger entries match current filter criteria.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};
