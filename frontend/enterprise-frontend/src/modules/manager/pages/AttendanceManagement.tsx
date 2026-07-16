import React, { useState } from 'react';
import {
  Clock, Calendar, Download, Search, Filter, 
  MapPin, Coffee, AlertTriangle, ArrowUpRight,
  MonitorPlay, CheckCircle2
} from 'lucide-react';
import { todayAttendance, monthlyAttendanceHeatmap, attendanceTrend } from '../data/managerMockData';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Legend
} from 'recharts';

export const AttendanceManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const presentCount = todayAttendance.filter(a => a.status === 'present' || a.status === 'remote' || a.status === 'late').length;
  const lateCount = todayAttendance.filter(a => a.status === 'late').length;
  
  const filteredAttendance = todayAttendance.filter(a => 
    a.employeeName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusStyle = (status: string) => {
    switch(status) {
      case 'present': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'late': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'remote': return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20';
      case 'absent': return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
      case 'on-leave': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* ── Page Header ───────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Time & Attendance</h1>
          <p className="text-sm text-[#8b949e] mt-1">Monitor daily presence, working hours, and anomalies.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-[#12151f] border border-[#1e2231] hover:bg-[#1a1d27] rounded-xl text-[13px] font-semibold text-slate-300 transition-colors">
            <Download className="w-4 h-4" />
            Export Timesheet
          </button>
        </div>
      </div>

      {/* ── Stats & Chart Row ─────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Real-time Status */}
        <div className="mgr-glass p-5 flex flex-col justify-between">
          <div>
            <h3 className="text-[12px] font-bold text-[#6b7280] uppercase tracking-wider mb-4">Today's Workforce</h3>
            <div className="flex items-end gap-2 mb-2">
              <span className="text-5xl font-black text-white leading-none">{presentCount}</span>
              <span className="text-lg font-bold text-[#6b7280] mb-1">/ {todayAttendance.length}</span>
            </div>
            <p className="text-[13px] font-semibold text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              Active online now
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-3 mt-6">
            <div className="p-3 bg-[#12151f] rounded-xl border border-[#1e2231]">
              <p className="text-[10px] font-bold text-[#6b7280] uppercase tracking-wider mb-1">Late Arrivals</p>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-white">{lateCount}</span>
                {lateCount > 0 && <span className="text-amber-500"><AlertTriangle className="w-3.5 h-3.5" /></span>}
              </div>
            </div>
            <div className="p-3 bg-[#12151f] rounded-xl border border-[#1e2231]">
              <p className="text-[10px] font-bold text-[#6b7280] uppercase tracking-wider mb-1">Avg Check-in</p>
              <p className="text-xl font-bold text-white">09:12 AM</p>
            </div>
          </div>
        </div>

        {/* Weekly Trend Chart */}
        <div className="lg:col-span-2 mgr-glass p-5 flex flex-col">
          <h3 className="text-[12px] font-bold text-[#6b7280] uppercase tracking-wider mb-2">30-Day Attendance Trend</h3>
          <div className="flex-1 min-h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attendanceTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e2231" />
                <XAxis dataKey="label" stroke="#6b7280" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#6b7280" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0a0c14', border: '1px solid #1e2231', borderRadius: '12px' }}
                  itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '11px', fontWeight: 'bold' }} />
                <Bar dataKey="present" name="Present" stackId="a" fill="#10b981" radius={[0, 0, 4, 4]} />
                <Bar dataKey="late" name="Late" stackId="a" fill="#f59e0b" />
                <Bar dataKey="absent" name="Absent" stackId="a" fill="#f43f5e" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ── Daily Log Table ───────────────────────────── */}
      <div className="mgr-glass overflow-hidden">
        
        {/* Table Header / Actions */}
        <div className="p-4 border-b border-[#1e2231] flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#12151f]/30">
          <h3 className="text-[14px] font-bold text-white uppercase tracking-wider">Today's Log</h3>
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6b7280]" />
              <input 
                type="text" 
                placeholder="Search employee..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#0a0c14] border border-[#1e2231] rounded-lg py-1.5 pl-9 pr-4 text-[12px] text-slate-200 focus:border-indigo-500/50 outline-none transition-colors"
              />
            </div>
            <button className="p-1.5 text-[#6b7280] hover:text-slate-300 bg-[#0a0c14] border border-[#1e2231] rounded-lg transition-colors shrink-0">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto mgr-scrollbar">
          <table className="w-full text-left text-[13px] min-w-[800px]">
            <thead className="bg-[#0a0c14]/50 border-b border-[#1e2231]">
              <tr>
                <th className="p-4 font-bold text-[#6b7280] uppercase tracking-wider text-[11px]">Employee</th>
                <th className="p-4 font-bold text-[#6b7280] uppercase tracking-wider text-[11px]">Status</th>
                <th className="p-4 font-bold text-[#6b7280] uppercase tracking-wider text-[11px]">Check-In</th>
                <th className="p-4 font-bold text-[#6b7280] uppercase tracking-wider text-[11px]">Check-Out</th>
                <th className="p-4 font-bold text-[#6b7280] uppercase tracking-wider text-[11px]">Duration</th>
                <th className="p-4 font-bold text-[#6b7280] uppercase tracking-wider text-[11px]">Location</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e2231]">
              {filteredAttendance.map((record) => (
                <tr key={record.id} className="hover:bg-[#12151f]/50 transition-colors">
                  <td className="p-4 font-bold text-slate-200">{record.employeeName}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider border ${getStatusStyle(record.status)}`}>
                      {record.status}
                    </span>
                  </td>
                  <td className="p-4 text-slate-300 font-mono text-[12px]">
                    {record.checkIn !== '—' ? (
                      <span className="flex items-center gap-1.5">
                        <ArrowUpRight className="w-3.5 h-3.5 text-emerald-500" /> {record.checkIn}
                      </span>
                    ) : '—'}
                  </td>
                  <td className="p-4 text-slate-300 font-mono text-[12px]">
                    {record.checkOut !== '—' ? (
                      <span className="flex items-center gap-1.5">
                        <ArrowUpRight className="w-3.5 h-3.5 text-rose-500 rotate-90" /> {record.checkOut}
                      </span>
                    ) : '—'}
                  </td>
                  <td className="p-4">
                    {record.workHours > 0 ? (
                      <div className="flex flex-col gap-1">
                        <span className="font-bold text-slate-300">{record.workHours} hrs</span>
                        {record.overtime > 0 && (
                          <span className="text-[10px] font-bold text-amber-500">+{record.overtime} OT</span>
                        )}
                      </div>
                    ) : (
                      <span className="text-[#6b7280]">—</span>
                    )}
                  </td>
                  <td className="p-4">
                    {record.status === 'remote' ? (
                      <span className="flex items-center gap-1.5 text-slate-400 text-[12px]">
                        <MonitorPlay className="w-3.5 h-3.5" /> WFH
                      </span>
                    ) : record.status === 'present' || record.status === 'late' ? (
                      <span className="flex items-center gap-1.5 text-slate-400 text-[12px]">
                        <MapPin className="w-3.5 h-3.5" /> BLR-Office
                      </span>
                    ) : (
                      <span className="text-[#6b7280]">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
