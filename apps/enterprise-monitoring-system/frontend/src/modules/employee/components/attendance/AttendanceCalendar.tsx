import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, HelpCircle } from 'lucide-react';
import type { AttendanceRecord, AttendanceStatus } from '../../types';

interface AttendanceCalendarProps {
  records: AttendanceRecord[];
}

export function AttendanceCalendar({ records }: AttendanceCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 4, 21)); // Default to May 2026 as per mock data

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();

  const prevMonthDays = new Date(year, month, 0).getDate();

  // Create date objects for grid
  const gridDays: Array<{ dateStr: string; dayNum: number; isCurrentMonth: boolean }> = [];

  // Padding from previous month
  for (let i = firstDayIndex - 1; i >= 0; i--) {
    const dayNum = prevMonthDays - i;
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevYear = month === 0 ? year - 1 : year;
    const dateStr = `${prevYear}-${String(prevMonth + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
    gridDays.push({ dateStr, dayNum, isCurrentMonth: false });
  }

  // Current month
  for (let i = 1; i <= daysInMonth; i++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
    gridDays.push({ dateStr, dayNum: i, isCurrentMonth: true });
  }

  // Padding for next month to complete 6 weeks (42 cells)
  const remainingCells = 42 - gridDays.length;
  for (let i = 1; i <= remainingCells; i++) {
    const nextMonth = month === 11 ? 0 : month + 1;
    const nextYear = month === 11 ? year + 1 : year;
    const dateStr = `${nextYear}-${String(nextMonth + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
    gridDays.push({ dateStr, dayNum: i, isCurrentMonth: false });
  }

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  // Helper to map status to CSS classes
  const getStatusClasses = (status: AttendanceStatus, isLate: boolean) => {
    if (isLate) return 'bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400 border border-amber-200/50 dark:border-amber-900/30';
    switch (status) {
      case 'present':
        return 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-900/30';
      case 'wfh':
        return 'bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 border border-blue-200/50 dark:border-blue-900/30';
      case 'on_leave':
        return 'bg-purple-50 dark:bg-purple-950/20 text-purple-600 dark:text-purple-400 border border-purple-200/50 dark:border-purple-900/30';
      case 'absent':
        return 'bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 border border-rose-200/50 dark:border-rose-900/30';
      case 'half_day':
        return 'bg-cyan-50 dark:bg-cyan-950/20 text-cyan-600 dark:text-cyan-400 border border-cyan-200/50 dark:border-cyan-900/30';
      case 'holiday':
        return 'bg-slate-50 dark:bg-slate-800/40 text-slate-400 border border-slate-200/40 dark:border-white/[0.03]';
      default:
        return 'bg-transparent text-slate-400 border border-transparent';
    }
  };

  const getStatusLabel = (status: AttendanceStatus, isLate: boolean) => {
    if (isLate) return 'Late';
    switch (status) {
      case 'present': return 'Present';
      case 'wfh': return 'WFH';
      case 'on_leave': return 'On Leave';
      case 'absent': return 'Absent';
      case 'half_day': return 'Half Day';
      case 'holiday': return 'Holiday';
      default: return 'No Record';
    }
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="bg-white dark:bg-slate-900/60 backdrop-blur-md border border-slate-200/60 dark:border-white/[0.06] rounded-2xl p-5">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Attendance Log</h3>
          <p className="text-xs text-slate-400 mt-0.5">Track your daily shift metrics</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevMonth}
            className="p-1.5 rounded-lg border border-slate-200/60 dark:border-white/[0.06] hover:bg-slate-50 dark:hover:bg-slate-850 text-slate-500 dark:text-slate-400 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-xs font-bold text-slate-700 dark:text-slate-200 min-w-[100px] text-center">
            {monthNames[month]} {year}
          </span>
          <button
            onClick={handleNextMonth}
            className="p-1.5 rounded-lg border border-slate-200/60 dark:border-white/[0.06] hover:bg-slate-50 dark:hover:bg-slate-850 text-slate-500 dark:text-slate-400 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Weekdays Header */}
      <div className="grid grid-cols-7 gap-1 text-center mb-1">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
          <span key={d} className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider py-1.5">
            {d}
          </span>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-1">
        {gridDays.map((cell, idx) => {
          // Find record for this date
          const record = records.find(r => r.date === cell.dateStr);
          const isWeekend = idx % 7 === 0 || idx % 7 === 6;
          
          let displayStatus: AttendanceStatus = record ? record.status : (isWeekend ? 'holiday' : 'absent');
          const displayLate = record ? record.isLate : false;
          
          // If no record but day is in future, don't show as absent
          const isFuture = new Date(cell.dateStr) > new Date(2026, 4, 21);
          if (isFuture && !record) {
            displayStatus = 'holiday'; // render as empty/holiday
          }

          const cellClasses = getStatusClasses(displayStatus, displayLate);

          return (
            <div
              key={idx}
              className={`relative aspect-square flex flex-col justify-between p-1.5 rounded-xl transition-all select-none group ${
                cell.isCurrentMonth
                  ? 'opacity-100'
                  : 'opacity-30 dark:opacity-20'
              } ${cellClasses}`}
            >
              <span className="text-[11px] font-semibold">{cell.dayNum}</span>
              
              {/* Status Indicator Bar */}
              {record && (
                <div className="flex flex-col gap-0.5">
                  <span className="text-[8px] font-bold tracking-tight leading-none block truncate">
                    {record.clockIn ? record.clockIn.replace(' AM', '').replace(' PM', '') : ''}
                  </span>
                  <span className="text-[8px] opacity-75 font-semibold leading-none block truncate">
                    {record.workedHours > 0 ? `${record.workedHours}h` : ''}
                  </span>
                </div>
              )}

              {/* Advanced Tooltip on Hover */}
              {record && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-slate-950/95 dark:bg-slate-900/95 text-white border border-white/[0.08] shadow-2xl rounded-xl p-2.5 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 z-50 text-[10px] leading-relaxed">
                  <div className="flex items-center justify-between border-b border-white/10 pb-1.5 mb-1.5">
                    <span className="font-bold">{new Date(record.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold ${
                      record.isLate ? 'bg-amber-500/20 text-amber-400' :
                      record.status === 'present' ? 'bg-emerald-500/20 text-emerald-400' :
                      record.status === 'wfh' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-slate-500/20 text-slate-400'
                    }`}>
                      {getStatusLabel(record.status, record.isLate)}
                    </span>
                  </div>
                  <div className="space-y-1 font-medium">
                    <div className="flex justify-between text-slate-400"><span>Clock In:</span><span className="text-white font-bold">{record.clockIn || '—'}</span></div>
                    <div className="flex justify-between text-slate-400"><span>Clock Out:</span><span className="text-white font-bold">{record.clockOut || '—'}</span></div>
                    <div className="flex justify-between text-slate-400"><span>Hours Worked:</span><span className="text-white font-bold">{record.workedHours}h</span></div>
                    <div className="flex justify-between text-slate-400"><span>Break Duration:</span><span className="text-white font-bold">{record.breakMinutes}m</span></div>
                    {record.isLate && (
                      <div className="flex justify-between text-amber-400"><span>Late Margin:</span><span className="font-bold">{record.lateMinutes}m</span></div>
                    )}
                    {record.overtimeMinutes > 0 && (
                      <div className="flex justify-between text-emerald-400"><span>Overtime:</span><span className="font-bold">{record.overtimeMinutes}m</span></div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mt-5 pt-4 border-t border-slate-100 dark:border-white/[0.04]">
        {[
          { label: 'Present', color: 'bg-emerald-500' },
          { label: 'WFH', color: 'bg-blue-500' },
          { label: 'Late', color: 'bg-amber-500' },
          { label: 'Leave', color: 'bg-purple-500' },
          { label: 'Half Day', color: 'bg-cyan-500' },
          { label: 'Holiday', color: 'bg-slate-300 dark:bg-slate-700' },
        ].map(item => (
          <div key={item.label} className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${item.color}`} />
            <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AttendanceCalendar;
