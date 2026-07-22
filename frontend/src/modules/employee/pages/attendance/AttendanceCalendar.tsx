import React, { useState, useMemo } from 'react';
import { Filter, Download, RefreshCw, Search, CalendarDays } from 'lucide-react';
import { EmployeePageLayout } from '../../components/EmployeePageLayout';
import { GlassPanel } from '../../components/ui/GlassPanel';

const monthDays = Array.from({ length: 31 }, (_, i) => i + 1);
const statusMap: Record<number, string> = {
  1: 'P', 2: 'P', 3: 'P', 4: 'P', 5: 'P', 6: 'H', 7: 'H',
  8: 'P', 9: 'P', 10: 'L', 11: 'P', 12: 'P', 13: 'H', 14: 'H',
  15: 'P', 16: 'P', 17: 'P', 18: 'W', 19: 'P', 20: 'H', 21: 'H',
  22: 'A', 23: 'P', 24: 'P', 25: 'L', 26: 'P', 27: 'H', 28: 'H',
  29: 'P', 30: 'P', 31: 'P',
};

const statusColors: Record<string, string> = {
  P: 'bg-emerald-500 text-white',
  A: 'bg-rose-500 text-white',
  L: 'bg-amber-400 text-white',
  H: 'bg-blue-400 text-white',
  W: 'bg-violet-400 text-white',
};

const statusLabels: Record<string, string> = {
  P: 'Present', A: 'Absent', L: 'Late', H: 'Holiday', W: 'WFH',
};

const summary = [
  { label: 'Present', value: Object.values(statusMap).filter(v => v === 'P').length, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-500/10' },
  { label: 'Absent', value: Object.values(statusMap).filter(v => v === 'A').length, color: 'text-rose-500', bg: 'bg-rose-50 dark:bg-rose-500/10' },
  { label: 'Late', value: Object.values(statusMap).filter(v => v === 'L').length, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-500/10' },
  { label: 'WFH', value: Object.values(statusMap).filter(v => v === 'W').length, color: 'text-violet-500', bg: 'bg-violet-50 dark:bg-violet-500/10' },
  { label: 'Holiday', value: Object.values(statusMap).filter(v => v === 'H').length, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-500/10' },
];

export default function AttendanceCalendar() {
  const [month, setMonth] = useState('July 2026');

  return (
    <EmployeePageLayout
      title="Attendance Calendar"
      description={`Monthly attendance view for ${month}`}
      breadcrumbs={['Employee', 'Attendance', 'Attendance Calendar']}
      actions={
        <div className="flex items-center gap-2">
          {[{ icon: Filter }, { icon: Download }, { icon: RefreshCw }].map(({ icon: Icon }) => (
            <button key={Icon.name} className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition-colors">
              <Icon className="w-4 h-4" />
            </button>
          ))}
        </div>
      }
    >
      <div className="grid grid-cols-5 gap-3">
        {summary.map(s => (
          <GlassPanel key={s.label} className={`${s.bg} p-4 text-center`}>
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mt-1">{s.label}</p>
          </GlassPanel>
        ))}
      </div>
      <GlassPanel padding="none">
        <div className="p-4 border-b border-slate-200 dark:border-white/[0.06]">
          <div className="flex items-center gap-2">
            <CalendarDays className="w-4 h-4 text-slate-400" />
            <span className="text-sm font-bold text-slate-900 dark:text-white">{month}</span>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-px bg-slate-200 dark:bg-slate-800">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
            <div key={d} className="bg-slate-50 dark:bg-slate-900 px-3 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center">{d}</div>
          ))}
          {Array.from({ length: 6 }, (_, i) => i).map(d => (
            <div key={`empty-${d}`} className="bg-white dark:bg-slate-900 p-2 min-h-[50px]" />
          ))}
          {monthDays.map(day => (
            <div key={day} className="bg-white dark:bg-slate-900 p-2 min-h-[50px] border-b border-slate-50 dark:border-slate-800">
              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">{day}</span>
              {statusMap[day] && (
                <div className={`mt-1 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${statusColors[statusMap[day]]}`}>
                  {statusMap[day]}
                </div>
              )}
            </div>
          ))}
        </div>
      </GlassPanel>
      <GlassPanel className="p-3">
        <div className="flex flex-wrap gap-4">
          {Object.entries(statusLabels).map(([code, label]) => (
            <div key={code} className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold ${statusColors[code]}`}>{code}</span>
              {label}
            </div>
          ))}
        </div>
      </GlassPanel>
    </EmployeePageLayout>
  );
}
