import React, { useState } from 'react';
import { Calendar, UserPlus, AlertCircle, CalendarOff, CheckCircle2 } from 'lucide-react';

export const LeaveManagement: React.FC = () => {
  const [leaveType, setLeaveType] = useState('Sick');
  const [delegatedTo, setDelegatedTo] = useState('Sarah');

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#e6edf3]">Leave & Attendance</h1>
        <p className="text-sm text-[#8b949e] mt-1">Manage your time off, track attendance, and seamlessly delegate active tasks.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Balances */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-5 shadow-sm">
            <h3 className="font-semibold text-[#e6edf3] mb-4">Leave Balances</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-[#8b949e]">Annual Leave</span>
                  <span className="text-[#e6edf3] font-bold">14 / 21 days</span>
                </div>
                <div className="w-full bg-[#21262d] rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '66%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-[#8b949e]">Sick Leave</span>
                  <span className="text-[#e6edf3] font-bold">4 / 10 days</span>
                </div>
                <div className="w-full bg-[#21262d] rounded-full h-2">
                  <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '40%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-[#8b949e]">Comp-Off</span>
                  <span className="text-[#e6edf3] font-bold">2 days available</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-5 shadow-sm">
            <h3 className="font-semibold text-[#e6edf3] mb-4">Upcoming Team Leaves</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-900 border border-purple-700 flex items-center justify-center font-bold text-purple-200 text-xs">
                  S
                </div>
                <div>
                  <p className="text-sm font-medium text-[#e6edf3]">Sarah Eng</p>
                  <p className="text-xs text-[#8b949e]">Tomorrow (Half Day)</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Apply Leave Form */}
        <div className="lg:col-span-2 bg-[#0d1117] border border-[#30363d] rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <CalendarOff className="w-5 h-5 text-blue-400" />
            <h2 className="text-xl font-bold text-[#e6edf3]">Apply for Leave</h2>
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#c9d1d9]">Leave Type</label>
                <select 
                  className="w-full bg-[#161b22] border border-[#30363d] rounded-md px-3 py-2 text-sm text-[#e6edf3] focus:border-[#58a6ff] outline-none"
                  value={leaveType}
                  onChange={(e) => setLeaveType(e.target.value)}
                >
                  <option>Annual Leave</option>
                  <option>Sick Leave</option>
                  <option>Comp-Off</option>
                  <option>Work From Home</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#c9d1d9]">Date Range</label>
                <input 
                  type="date"
                  className="w-full bg-[#161b22] border border-[#30363d] rounded-md px-3 py-2 text-sm text-[#8b949e] focus:border-[#58a6ff] outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-[#c9d1d9]">Reason for Leave</label>
              <textarea 
                rows={3}
                className="w-full bg-[#161b22] border border-[#30363d] rounded-md px-3 py-2 text-sm text-[#e6edf3] focus:border-[#58a6ff] outline-none placeholder-[#8b949e]"
                placeholder="Briefly describe the reason..."
              ></textarea>
            </div>

            <div className="p-4 bg-[#d29922]/10 border border-[#d29922]/20 rounded-lg space-y-4">
              <div className="flex items-start gap-3 text-[#d29922]">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-sm">Active Sprint Delegation Required</h4>
                  <p className="text-xs mt-1 opacity-90">You have 2 active tasks in the current sprint. Please select a backup engineer to transfer ownership.</p>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <label className="text-sm font-medium text-[#c9d1d9]">Select Backup Engineer</label>
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <UserPlus className="w-4 h-4 text-[#8b949e] absolute left-3 top-2.5" />
                    <select 
                      className="w-full bg-[#161b22] border border-[#30363d] rounded-md pl-9 pr-3 py-2 text-sm text-[#e6edf3] focus:border-[#58a6ff] outline-none"
                      value={delegatedTo}
                      onChange={(e) => setDelegatedTo(e.target.value)}
                    >
                      <option>Sarah Eng (Frontend)</option>
                      <option>David Ops (Backend)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="bg-[#161b22] border border-[#30363d] rounded-md p-3">
                <p className="text-xs font-semibold text-[#8b949e] uppercase mb-2">Tasks to be transferred</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-[#e6edf3]">
                    <CheckCircle2 className="w-4 h-4 text-[#8b949e]" />
                    ENG-101: Implement gRPC streaming for telemetry service
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#e6edf3]">
                    <CheckCircle2 className="w-4 h-4 text-[#8b949e]" />
                    ENG-112: Fix memory leak in websocket event listeners
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button className="px-6 py-2 bg-[#238636] hover:bg-[#2ea043] text-white text-sm font-medium rounded-md transition-colors shadow-sm border border-[rgba(240,246,252,0.1)]">
                Submit Request
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};
