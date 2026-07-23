import React, { useState } from 'react';
import InternPageShell from '../../InternPageShell';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, CheckCircle, XCircle, AlertCircle, Sun } from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

type AttendanceStatus = 'present' | 'absent' | 'late' | 'holiday' | null;

const monthlyData: Record<string, Record<number, AttendanceStatus>> = {
  '2026-07': {
    1: 'present', 2: 'present', 3: 'present', 4: 'present', 5: 'present',
    6: 'holiday', 7: 'holiday',
    8: 'late', 9: 'present', 10: 'present', 11: 'present', 12: 'present',
    13: 'holiday', 14: 'holiday',
    15: 'present', 16: 'present', 17: 'present', 18: 'absent', 19: 'present',
    20: 'holiday', 21: 'holiday',
    22: 'present', 23: 'present', 24: 'present', 25: 'present', 26: 'present',
    27: 'holiday', 28: 'holiday',
    29: 'present', 30: 'present', 31: 'present',
  },
};

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

export default function AttendanceCalendarPage() {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());

  const prevMonth = () => {
    if (month === 0) { setYear(y => y - 1); setMonth(11); }
    else setMonth(m => m - 1);
  };

  const nextMonth = () => {
    if (month === 11) { setYear(y => y + 1); setMonth(0); }
    else setMonth(m => m + 1);
  };

  const key = `${year}-${String(month + 1).padStart(2, '0')}`;
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const data = monthlyData[key] || {};

  const totalPresent = Object.values(data).filter(v => v === 'present').length;
  const totalAbsent = Object.values(data).filter(v => v === 'absent').length;
  const totalLate = Object.values(data).filter(v => v === 'late').length;
  const totalHoliday = Object.values(data).filter(v => v === 'holiday').length;
  const totalWorkingDays = daysInMonth - totalHoliday;
  const attendancePercent = totalWorkingDays > 0 ? Math.round(((totalPresent + totalLate) / totalWorkingDays) * 100) : 0;

  const cells: { day: number; status: AttendanceStatus }[] = [];
  for (let i = 0; i < firstDay; i++) cells.push({ day: 0, status: null });
  for (let d = 1; d <= daysInMonth; d++) cells.push({ day: d, status: data[d] || null });

  const getStatusColor = (status: AttendanceStatus) => {
    switch (status) {
      case 'present': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300 border-emerald-200 dark:border-emerald-700';
      case 'absent': return 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-300 border-red-200 dark:border-red-700';
      case 'late': return 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300 border-amber-200 dark:border-amber-700';
      case 'holiday': return 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300 border-blue-200 dark:border-blue-700';
      default: return 'text-slate-400 border-transparent';
    }
  };

  const LegendItem = ({ color, label, icon }: { color: string; label: string; icon: React.ReactNode }) => (
    <div className="flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-300">
      <span className={`w-3 h-3 rounded-sm ${color}`}>{icon}</span>
      {label}
    </div>
  );

  return (
    <InternPageShell title="Attendance Calendar" description="Monthly view of your attendance">
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <motion.div variants={item} className="lg:col-span-3 bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <button onClick={prevMonth} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">{monthNames[month]} {year}</h3>
              <button onClick={nextMonth} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-7 gap-1 mb-2">
              {dayNames.map(d => (
                <div key={d} className="text-center text-xs font-bold text-slate-400 uppercase tracking-wider py-2">{d}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {cells.map((cell, i) => (
                <div
                  key={i}
                  className={`aspect-square flex items-center justify-center rounded-lg text-sm font-semibold border ${getStatusColor(cell.status)} ${cell.day === 0 ? 'invisible' : ''}`}
                >
                  {cell.day > 0 ? cell.day : ''}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={item} className="space-y-4">
            <div className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl p-5 shadow-sm">
              <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider mb-3">Legend</h3>
              <div className="space-y-2.5">
                <LegendItem color="bg-emerald-100 dark:bg-emerald-500/20" label="Present" icon={<CheckCircle className="w-2 h-2" />} />
                <LegendItem color="bg-red-100 dark:bg-red-500/20" label="Absent" icon={<XCircle className="w-2 h-2" />} />
                <LegendItem color="bg-amber-100 dark:bg-amber-500/20" label="Late" icon={<AlertCircle className="w-2 h-2" />} />
                <LegendItem color="bg-blue-100 dark:bg-blue-500/20" label="Holiday" icon={<Sun className="w-2 h-2" />} />
              </div>
            </div>
            <div className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl p-5 shadow-sm">
              <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider mb-3">Monthly Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-500">Present</span>
                  <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{totalPresent} days</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-500">Absent</span>
                  <span className="text-sm font-bold text-red-600 dark:text-red-400">{totalAbsent} days</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-500">Late</span>
                  <span className="text-sm font-bold text-amber-600 dark:text-amber-400">{totalLate} days</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-500">Holidays</span>
                  <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{totalHoliday} days</span>
                </div>
                <div className="pt-3 border-t border-slate-100 dark:border-slate-700/40">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-semibold text-slate-500">Attendance</span>
                    <span className="text-lg font-extrabold text-slate-900 dark:text-white">{attendancePercent}%</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </InternPageShell>
  );
}
