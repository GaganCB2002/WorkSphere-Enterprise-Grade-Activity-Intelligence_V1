import React, { useState } from 'react';
import { 
  History, Search, Filter, AlertTriangle, CheckCircle, 
  Trash2, ShieldCheck, RefreshCw, RefreshCwIcon, Download 
} from 'lucide-react';

interface AuditLog {
  id: string;
  timestamp: string;
  operator: string;
  action: string;
  ip: string;
  risk: 'LOW' | 'MEDIUM' | 'HIGH';
}

export const AuditLogsTab: React.FC = () => {
  const [logs, setLogs] = useState<AuditLog[]>([
    { id: 'LOG-9031', timestamp: '2026-05-25 11:22', operator: 'Rohan Sharma (Controller)', action: 'Approved salary batch payout (₹2.4M)', ip: '10.104.1.84', risk: 'HIGH' },
    { id: 'LOG-9030', timestamp: '2026-05-25 11:05', operator: 'System Hook (AI)', action: 'Flagged compliance alert: Missing invoice W-9 form', ip: '127.0.0.1', risk: 'MEDIUM' },
    { id: 'LOG-9029', timestamp: '2026-05-25 09:15', operator: 'Priya Iyer (Accountant)', action: 'Marked slack invoice INV-SLK-4930 as Paid (₹8,500)', ip: '10.104.2.10', risk: 'LOW' },
    { id: 'LOG-9028', timestamp: '2026-05-24 18:40', operator: 'Rohan Sharma (Controller)', action: 'Adjusted Priya Iyer daily payout limit threshold to ₹1.0M', ip: '10.104.1.84', risk: 'MEDIUM' },
    { id: 'LOG-9027', timestamp: '2026-05-24 16:30', operator: 'Kabir Mehta (Analyst)', action: 'Generated Q2 Profitability Statement export', ip: '10.104.2.45', risk: 'LOW' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [riskFilter, setRiskFilter] = useState<'ALL' | 'LOW' | 'MEDIUM' | 'HIGH'>('ALL');

  const handleClearLogs = () => {
    if (window.confirm("WARNING: Are you sure you want to purge current local treasury audit log buffer? This action is locked to administrative roles.")) {
      setLogs([]);
      alert("Treasury audit buffer cleared. Cold ledger backups remain intact.");
    }
  };

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.operator.toLowerCase().includes(searchTerm.toLowerCase()) || log.action.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRisk = riskFilter === 'ALL' || log.risk === riskFilter;
    return matchesSearch && matchesRisk;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white">Treasury Audit Trail</h1>
          <p className="text-[#8693BA] text-sm mt-1">Chronological records of all treasury wire clearances, limit adjustments, and operator authorization sessions.</p>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={handleClearLogs}
            className="flex items-center gap-2 bg-[#0C1226]/80 hover:bg-red-500/10 border border-[#1E294B] hover:border-red-500/30 text-[#8693BA] hover:text-red-400 px-4 py-2.5 rounded-xl text-xs font-bold transition-all"
          >
            <Trash2 className="w-4 h-4" />
            <span>Purge Buffer</span>
          </button>
        </div>
      </div>

      {/* Logs Table Card */}
      <div className="bg-[#0F1326]/40 border border-[#1D2644] rounded-3xl p-6 shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[#1D2644] pb-4">
          <div>
            <h3 className="text-lg font-bold text-white">Forensic Ledger Trails</h3>
            <p className="text-[#8693BA] text-xs">Immutable system records synced to corporate vaults.</p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 md:flex-none md:w-64">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5B678E]" />
              <input 
                type="text" 
                placeholder="Search Action / Operator..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-[#070912] border border-[#1D2644] rounded-xl text-white text-xs placeholder:text-[#5B678E] focus:border-[#00e5ff] focus:outline-none transition-colors"
              />
            </div>

            {/* Filter Toggle */}
            <div className="flex items-center gap-1 bg-[#070912] border border-[#1D2644] rounded-xl p-1 text-xs">
              {(['ALL', 'LOW', 'MEDIUM', 'HIGH'] as const).map(risk => (
                <button
                  key={risk}
                  onClick={() => setRiskFilter(risk)}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                    riskFilter === risk ? 'bg-[#00e5ff]/10 text-[#00e5ff]' : 'text-[#8693BA] hover:text-white'
                  }`}
                >
                  {risk}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Table layout */}
        <div className="overflow-x-auto border border-[#1D2644] rounded-2xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#0C101F] border-b border-[#1D2644] text-[10px] font-extrabold text-[#5B678E] uppercase tracking-wider font-mono">
                <th className="p-4">Log ID</th>
                <th className="p-4">Timestamp</th>
                <th className="p-4">Operator</th>
                <th className="p-4">Executed Action</th>
                <th className="p-4 font-mono">Network IP</th>
                <th className="p-4 text-center">Risk</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1D2644]/45 bg-[#0F1326]/10 text-xs">
              {filteredLogs.map(log => (
                <tr key={log.id} className="hover:bg-[#1D2644]/20 transition-all duration-150">
                  <td className="p-4 font-bold text-white font-mono">{log.id}</td>
                  <td className="p-4 text-[#8693BA] font-mono">{log.timestamp}</td>
                  <td className="p-4 text-[#F0EEF8] font-bold">{log.operator}</td>
                  <td className="p-4 text-[#F0EEF8] font-medium">{log.action}</td>
                  <td className="p-4 text-[#8693BA] font-mono">{log.ip}</td>
                  <td className="p-4 text-center">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold ${
                      log.risk === 'HIGH' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                      log.risk === 'MEDIUM' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                      'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                    }`}>
                      {log.risk}
                    </span>
                  </td>
                </tr>
              ))}
              {filteredLogs.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-10 text-center text-[#5B678E] font-medium">No matching audit logs recorded in buffer.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
