import React, { useState } from 'react';
import { CalendarCheck, Clock, Coffee, AlertTriangle, Plus, ChevronLeft, ChevronRight } from 'lucide-react';

const attendanceData = [
  { date: 'May 19', checkIn: '9:02 AM', checkOut: '6:15 PM', hours: '9h 13m', status: 'present' },
  { date: 'May 18', checkIn: '8:55 AM', checkOut: '6:00 PM', hours: '9h 05m', status: 'present' },
  { date: 'May 17', checkIn: '9:45 AM', checkOut: '5:30 PM', hours: '7h 45m', status: 'late' },
  { date: 'May 16', checkIn: '9:00 AM', checkOut: '6:30 PM', hours: '9h 30m', status: 'present' },
  { date: 'May 15', checkIn: '-', checkOut: '-', hours: '-', status: 'leave' },
];

const leaveBalance = [
  { type: 'Casual Leave', total: 4, used: 1, color: 'violet' },
  { type: 'Sick Leave', total: 3, used: 0, color: 'blue' },
  { type: 'Comp Off', total: 2, used: 1, color: 'amber' },
];

const statusStyles: Record<string, string> = {
  present: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  late: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  leave: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
};

export const AttendanceLeave: React.FC = () => {
  const [showLeaveForm, setShowLeaveForm] = useState(false);

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-white">Attendance & Leave</h2>
          <p className="text-xs text-[#6e7681] mt-0.5">Track your daily attendance and manage leave requests</p>
        </div>
        <button
          onClick={() => setShowLeaveForm(!showLeaveForm)}
          className="flex items-center gap-1.5 bg-violet-600 hover:bg-violet-500 text-white px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors"
        >
          <Plus className="w-3.5 h-3.5" /> Apply Leave
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Present Days', value: '28', icon: CalendarCheck, color: 'emerald' },
          { label: 'Late Entries', value: '2', icon: AlertTriangle, color: 'amber' },
          { label: 'Avg. Hours/Day', value: '8h 42m', icon: Clock, color: 'blue' },
          { label: 'Leave Balance', value: '7 days', icon: Coffee, color: 'violet' },
        ].map((s, i) => (
          <div key={i} className="bg-[#161b22] border border-[#21262d] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <s.icon className={`w-4 h-4 ${
                s.color === 'emerald' ? 'text-emerald-400' :
                s.color === 'amber' ? 'text-amber-400' :
                s.color === 'blue' ? 'text-blue-400' : 'text-violet-400'
              }`} />
              <span className="text-[11px] text-[#6e7681]">{s.label}</span>
            </div>
            <div className="text-lg font-bold text-white">{s.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Attendance Log */}
        <div className="lg:col-span-2 bg-[#161b22] border border-[#21262d] rounded-xl p-5">
          <h3 className="text-sm font-bold text-white mb-4">Recent Attendance</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-[#484f58] border-b border-[#1b1f27]">
                  <th className="text-left py-2.5 font-semibold">Date</th>
                  <th className="text-left py-2.5 font-semibold">Check In</th>
                  <th className="text-left py-2.5 font-semibold">Check Out</th>
                  <th className="text-left py-2.5 font-semibold">Hours</th>
                  <th className="text-left py-2.5 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {attendanceData.map((row, i) => (
                  <tr key={i} className="border-b border-[#1b1f27] last:border-0 hover:bg-[#0d1117] transition-colors">
                    <td className="py-3 text-slate-300 font-medium">{row.date}</td>
                    <td className="py-3 text-slate-400">{row.checkIn}</td>
                    <td className="py-3 text-slate-400">{row.checkOut}</td>
                    <td className="py-3 text-slate-400">{row.hours}</td>
                    <td className="py-3">
                      <span className={`px-2 py-0.5 rounded-full border text-[10px] font-bold capitalize ${statusStyles[row.status]}`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Leave Balance */}
        <div className="bg-[#161b22] border border-[#21262d] rounded-xl p-5">
          <h3 className="text-sm font-bold text-white mb-4">Leave Balance</h3>
          <div className="space-y-4">
            {leaveBalance.map((leave, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs text-slate-300 font-medium">{leave.type}</span>
                  <span className="text-[11px] text-[#6e7681]">{leave.used} / {leave.total} used</span>
                </div>
                <div className="w-full h-2 bg-[#21262d] rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      leave.color === 'violet' ? 'bg-violet-500' :
                      leave.color === 'blue' ? 'bg-blue-500' : 'bg-amber-500'
                    }`}
                    style={{ width: `${(leave.used / leave.total) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
