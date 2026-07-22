import React, { useState } from 'react';
import { Clock, Calendar, Check, X, AlertTriangle, User, History } from 'lucide-react';

const PENDING_LEAVES = [
  { id: 'req-1', emp: 'Sarah Connor', type: 'Sick Leave', dates: 'May 22 - May 23', days: 2, dept: 'Cybersecurity', aiFlag: false },
  { id: 'req-2', emp: 'Marcus Wright', type: 'Annual Leave', dates: 'May 25 - Jun 05', days: 10, dept: 'Engineering', aiFlag: true, flagReason: 'DevOps shift overlap. Potential staffing shortage.' },
  { id: 'req-3', emp: 'Kyle Reese', type: 'Casual Leave', dates: 'May 24', days: 1, dept: 'Engineering', aiFlag: false },
];

export const TimeAndLeave: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto flex flex-col h-full space-y-6">
      <div className="flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-200">Attendance & Leave Operations</h1>
          <p className="text-sm text-[#8b949e] mt-1">Manage shift schedules, track daily attendance, and process leave workflows.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
        
        {/* Left Col: Attendance Metrics & Heatmap */}
        <div className="lg:col-span-2 space-y-6 flex flex-col">
          {/* Top Cards */}
          <div className="grid grid-cols-3 gap-4 shrink-0">
            <div className="bg-[#161b22] border border-[#30363d] p-4 rounded-2xl">
              <div className="text-sm font-semibold text-[#8b949e] mb-1 flex items-center gap-2"><User className="w-4 h-4 text-emerald-400" /> Present Today</div>
              <div className="text-3xl font-bold text-slate-900 dark:text-slate-200">1,180 <span className="text-sm text-[#8b949e] font-normal">/ 1,248</span></div>
            </div>
            <div className="bg-[#161b22] border border-[#30363d] p-4 rounded-2xl">
              <div className="text-sm font-semibold text-[#8b949e] mb-1 flex items-center gap-2"><Clock className="w-4 h-4 text-amber-400" /> Late Arrivals</div>
              <div className="text-3xl font-bold text-slate-900 dark:text-slate-200">42</div>
            </div>
            <div className="bg-[#161b22] border border-[#30363d] p-4 rounded-2xl">
              <div className="text-sm font-semibold text-[#8b949e] mb-1 flex items-center gap-2"><Calendar className="w-4 h-4 text-rose-400" /> On Leave</div>
              <div className="text-3xl font-bold text-slate-900 dark:text-slate-200">26</div>
            </div>
          </div>

          {/* Heatmap / Timesheet Placeholder */}
          <div className="flex-1 bg-[#161b22] border border-[#30363d] rounded-2xl p-6 flex flex-col">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-200 mb-4 flex items-center gap-2">
              <History className="w-4 h-4 text-indigo-400" />
              Department Attendance Heatmap (May 2026)
            </h3>
            <div className="flex-1 border border-dashed border-[#30363d] rounded-xl flex items-center justify-center text-[#8b949e] bg-[#0E1117]/50">
              [Attendance Heatmap Visualization]
            </div>
          </div>
        </div>

        {/* Right Col: Smart Leave Approvals */}
        <div className="lg:col-span-1 bg-[#161b22] border border-[#30363d] rounded-2xl p-6 flex flex-col h-full overflow-hidden">
          <div className="flex items-center justify-between mb-4 shrink-0">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-200">Pending Leave Requests</h3>
            <span className="bg-indigo-500/10 text-indigo-400 text-xs font-bold px-2 py-0.5 rounded-full border border-indigo-500/20">3 Action Required</span>
          </div>
          
          <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-4">
            {PENDING_LEAVES.map(req => (
              <div key={req.id} className="bg-[#0E1117] border border-[#30363d] rounded-xl p-4 flex flex-col gap-3">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-sm font-bold text-slate-900 dark:text-slate-200">{req.emp}</div>
                    <div className="text-xs text-[#8b949e]">{req.dept}</div>
                  </div>
                  <span className="bg-[#21262d] border border-[#30363d] text-slate-300 text-[10px] font-bold px-2 py-1 rounded">
                    {req.days} Days
                  </span>
                </div>
                
                <div className="text-xs font-medium text-slate-300">
                  <span className="text-indigo-400 font-bold">{req.type}</span> • {req.dates}
                </div>

                {req.aiFlag && (
                  <div className="p-2.5 bg-rose-500/10 border border-rose-500/20 rounded-lg flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <span className="text-[11px] text-rose-400 font-medium leading-tight">
                      {req.flagReason}
                    </span>
                  </div>
                )}

                <div className="flex gap-2 pt-2 border-t border-[#21262d]">
                  <button className="flex-1 flex items-center justify-center gap-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 py-1.5 rounded-lg text-xs font-bold transition-colors">
                    <Check className="w-3 h-3" /> Approve
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 py-1.5 rounded-lg text-xs font-bold transition-colors">
                    <X className="w-3 h-3" /> Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
