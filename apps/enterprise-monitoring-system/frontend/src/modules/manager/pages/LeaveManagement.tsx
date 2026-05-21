import React, { useState, useMemo } from 'react';
import {
  CalendarDays, Check, X, Clock, AlertTriangle, 
  Search, Filter, Calendar as CalendarIcon, User,
  ChevronRight, ArrowRight
} from 'lucide-react';
import { leaveRequests, teamMembers } from '../data/managerMockData';
import type { LeaveRequest } from '../data/managerMockData';

export const LeaveManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLeave, setSelectedLeave] = useState<LeaveRequest | null>(null);

  const pendingLeaves = leaveRequests.filter(l => l.status === 'pending');
  const pastLeaves = leaveRequests.filter(l => l.status !== 'pending');

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'annual': return 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20';
      case 'sick': return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
      case 'personal': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case 'compensatory': return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      default: return 'text-slate-400 bg-slate-500/10 border-slate-500/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <Check className="w-3.5 h-3.5 text-emerald-500" />;
      case 'rejected': return <X className="w-3.5 h-3.5 text-rose-500" />;
      case 'pending': return <Clock className="w-3.5 h-3.5 text-amber-500" />;
      default: return null;
    }
  };

  return (
    <div className="flex h-full gap-6 pb-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* ── Main Content Area ─────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 space-y-6 overflow-y-auto mgr-scrollbar pr-2">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 shrink-0">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Leave Approvals</h1>
            <p className="text-sm text-[#8b949e] mt-1">Review requests, assess impact, and manage workforce availability.</p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-[#12151f] border border-[#1e2231] hover:bg-[#1a1d27] rounded-xl text-[13px] font-semibold text-slate-300 transition-colors">
              <CalendarIcon className="w-4 h-4" />
              Leave Calendar
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 shrink-0">
          {[
            { label: 'Pending Requests', value: pendingLeaves.length, color: 'amber' },
            { label: 'Approved This Month', value: 12, color: 'emerald' },
            { label: 'On Leave Today', value: 1, color: 'indigo' },
            { label: 'Leave Conflicts', value: pendingLeaves.filter(l => l.conflicts.length > 0).length, color: 'rose' }
          ].map((stat, idx) => (
            <div key={idx} className="mgr-glass p-4 border-l-2" style={{ borderLeftColor: `var(--${stat.color}-500, #6366f1)` }}>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#6b7280]">{stat.label}</p>
              <p className="text-2xl font-black text-white mt-1">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Action Bar */}
        <div className="flex items-center justify-between gap-4 p-3 bg-[#0a0c14] border border-[#1e2231] rounded-2xl shrink-0">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6b7280]" />
            <input 
              type="text" 
              placeholder="Search employee..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#12151f] border border-[#1e2231] rounded-xl py-2 pl-9 pr-4 text-[13px] text-slate-200 focus:border-indigo-500/50 outline-none transition-colors"
            />
          </div>
          <button className="p-2 text-[#6b7280] hover:text-slate-300 bg-[#12151f] border border-[#1e2231] rounded-xl transition-colors">
            <Filter className="w-4 h-4" />
          </button>
        </div>

        {/* Pending Requests */}
        <div className="space-y-3 shrink-0">
          <h3 className="text-[12px] font-bold text-slate-300 uppercase tracking-wider pl-1">Action Required</h3>
          {pendingLeaves.map(leave => (
            <div 
              key={leave.id} 
              onClick={() => setSelectedLeave(leave)}
              className={`mgr-glass p-4 cursor-pointer transition-all ${selectedLeave?.id === leave.id ? 'border-indigo-500/50 bg-indigo-500/5' : 'hover:border-[#2d3345]'}`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#1e2231] flex items-center justify-center text-slate-300 font-bold text-sm shrink-0 border border-[#2d3345]">
                    {leave.employeeAvatar}
                  </div>
                  <div>
                    <h4 className="text-[14px] font-bold text-slate-200">{leave.employeeName}</h4>
                    <div className="flex items-center gap-3 mt-1 text-[11px] font-semibold text-[#6b7280]">
                      <span className={`px-2 py-0.5 rounded border ${getTypeColor(leave.type)} uppercase tracking-wider text-[9px]`}>
                        {leave.type}
                      </span>
                      <span className="flex items-center gap-1">
                        <CalendarDays className="w-3.5 h-3.5" />
                        {new Date(leave.from).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} 
                        {' - '} 
                        {new Date(leave.to).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        <span className="text-slate-400 bg-[#12151f] px-1.5 rounded ml-1 border border-[#1e2231]">{leave.days}d</span>
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  {leave.conflicts.length > 0 && (
                    <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-rose-500/10 text-rose-400 text-[11px] font-bold border border-rose-500/20">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      {leave.conflicts.length} Conflict(s)
                    </div>
                  )}
                  <div className="flex gap-2">
                    <button className="px-3 py-1.5 bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 border border-rose-500/20 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-colors">
                      Reject
                    </button>
                    <button className="px-3 py-1.5 bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border border-emerald-500/20 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-colors">
                      Approve
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Processed Requests */}
        <div className="space-y-3 shrink-0 pt-4">
          <h3 className="text-[12px] font-bold text-[#4a5068] uppercase tracking-wider pl-1">Past Decisions</h3>
          <div className="mgr-glass overflow-hidden">
            <table className="w-full text-left text-[12px]">
              <thead className="bg-[#12151f]/50 border-b border-[#1e2231]">
                <tr>
                  <th className="p-3 font-bold text-[#6b7280] uppercase">Employee</th>
                  <th className="p-3 font-bold text-[#6b7280] uppercase">Dates</th>
                  <th className="p-3 font-bold text-[#6b7280] uppercase">Type</th>
                  <th className="p-3 font-bold text-[#6b7280] uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1e2231]">
                {pastLeaves.map(leave => (
                  <tr key={leave.id} className="hover:bg-[#12151f]/30 transition-colors">
                    <td className="p-3 font-bold text-slate-300">{leave.employeeName}</td>
                    <td className="p-3 text-[#6b7280] font-medium">
                      {new Date(leave.from).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </td>
                    <td className="p-3">
                      <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase ${getTypeColor(leave.type)} border-none bg-transparent pl-0`}>
                        {leave.type}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        {getStatusIcon(leave.status)}
                        {leave.status}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* ── Impact Analysis Sidebar ───────────────────── */}
      {selectedLeave && (
        <div className="w-[340px] shrink-0 hidden lg:flex flex-col animate-in slide-in-from-right-8 duration-300">
          <div className="mgr-glass p-5 flex-1 flex flex-col h-full border-indigo-500/20 shadow-2xl shadow-indigo-500/5">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#1e2231]">
              <h3 className="text-[12px] font-bold text-white uppercase tracking-wider">Leave Impact Assessment</h3>
              <button onClick={() => setSelectedLeave(null)} className="p-1 text-[#6b7280] hover:text-white rounded-md transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-6 overflow-y-auto mgr-scrollbar pr-2 flex-1">
              
              {/* Employee Summary */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#1e2231] flex items-center justify-center text-slate-300 font-bold text-lg border border-[#2d3345]">
                  {selectedLeave.employeeAvatar}
                </div>
                <div>
                  <h4 className="text-[15px] font-bold text-white">{selectedLeave.employeeName}</h4>
                  <p className="text-[11px] text-[#6b7280] font-semibold">{selectedLeave.days} days • {selectedLeave.type} leave</p>
                </div>
              </div>

              {/* Reason */}
              <div>
                <p className="text-[10px] font-bold text-[#4a5068] uppercase tracking-widest mb-1.5">Reason provided</p>
                <div className="p-3 bg-[#12151f] rounded-xl border border-[#1e2231] text-[12px] text-slate-300 leading-relaxed italic">
                  "{selectedLeave.reason}"
                </div>
              </div>

              {/* Balance */}
              <div className="p-3 bg-indigo-500/5 border border-indigo-500/10 rounded-xl flex items-center justify-between">
                <span className="text-[11px] font-bold text-indigo-400">Available Balance</span>
                <span className="text-[14px] font-black text-white">{selectedLeave.leaveBalance} days</span>
              </div>

              {/* Conflicts */}
              <div>
                <p className="text-[10px] font-bold text-[#4a5068] uppercase tracking-widest mb-2 flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3 text-amber-500" />
                  Potential Conflicts
                </p>
                {selectedLeave.conflicts.length > 0 ? (
                  <ul className="space-y-2">
                    {selectedLeave.conflicts.map((conflict, i) => (
                      <li key={i} className="flex items-start gap-2 p-2.5 bg-rose-500/10 border border-rose-500/20 rounded-lg text-[11px] font-semibold text-rose-300 leading-tight">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0 mt-1" />
                        {conflict}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="flex items-center gap-2 p-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-[11px] font-semibold text-emerald-400">
                    <Check className="w-3.5 h-3.5" /> No scheduling conflicts detected
                  </div>
                )}
              </div>

              {/* Delegation/Backup */}
              <div>
                <p className="text-[10px] font-bold text-[#4a5068] uppercase tracking-widest mb-2">Task Delegation</p>
                {selectedLeave.backup ? (
                  <div className="flex items-center justify-between p-3 bg-[#12151f] border border-[#1e2231] rounded-xl group hover:border-indigo-500/30 transition-colors cursor-pointer">
                    <div className="flex items-center gap-2 text-[12px] font-bold text-slate-300">
                      <User className="w-3.5 h-3.5 text-[#6b7280]" />
                      Backup: {selectedLeave.backup}
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#4a5068] group-hover:text-indigo-400" />
                  </div>
                ) : (
                  <button className="w-full py-2.5 border-2 border-dashed border-[#1e2231] hover:border-indigo-500/30 rounded-xl text-[11px] font-bold text-[#6b7280] hover:text-indigo-400 transition-colors">
                    + Assign Temporary Backup
                  </button>
                )}
              </div>
            </div>

            {/* Sticky Action Footer */}
            <div className="pt-4 mt-2 border-t border-[#1e2231] flex gap-2 shrink-0">
              <button className="flex-1 py-2.5 bg-[#12151f] hover:bg-rose-500/10 text-[#6b7280] hover:text-rose-400 border border-[#1e2231] hover:border-rose-500/30 rounded-xl text-[12px] font-bold uppercase tracking-wider transition-all">
                Reject
              </button>
              <button className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-[12px] font-bold uppercase tracking-wider transition-all shadow-lg shadow-indigo-500/20">
                Approve
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
