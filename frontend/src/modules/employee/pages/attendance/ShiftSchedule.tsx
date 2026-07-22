import React, { useState, useMemo } from 'react';
import { Filter, Download, RefreshCw, Search, Sun, Moon, Cloud } from 'lucide-react';
import { EmployeePageLayout } from '../../components/EmployeePageLayout';
import { GlassPanel } from '../../components/ui/GlassPanel';

interface Shift {
  day: string;
  shiftType: string;
  startTime: string;
  endTime: string;
  notes: string;
}

const shifts: Shift[] = [
  { day: 'Monday', shiftType: 'Morning', startTime: '08:00', endTime: '16:00', notes: 'Team standup at 8:30' },
  { day: 'Tuesday', shiftType: 'Morning', startTime: '08:00', endTime: '16:00', notes: 'Sprint review' },
  { day: 'Wednesday', shiftType: 'Morning', startTime: '08:00', endTime: '16:00', notes: '1:1 with manager' },
  { day: 'Thursday', shiftType: 'Evening', startTime: '14:00', endTime: '22:00', notes: 'Cross-team sync' },
  { day: 'Friday', shiftType: 'Evening', startTime: '14:00', endTime: '22:00', notes: 'Knowledge share session' },
  { day: 'Saturday', shiftType: 'Night', startTime: '22:00', endTime: '06:00', notes: 'On-call rotation' },
  { day: 'Sunday', shiftType: '-', startTime: '-', endTime: '-', notes: 'Off' },
];

const shiftIcon = (type: string) => {
  if (type === 'Morning') return Sun;
  if (type === 'Evening') return Cloud;
  if (type === 'Night') return Moon;
  return Sun;
};

const shiftColor = (type: string) => {
  if (type === 'Morning') return 'text-amber-500 bg-amber-50 dark:bg-amber-500/10 dark:text-amber-400';
  if (type === 'Evening') return 'text-violet-500 bg-violet-50 dark:bg-violet-500/10 dark:text-violet-400';
  if (type === 'Night') return 'text-indigo-500 bg-indigo-50 dark:bg-indigo-500/10 dark:text-indigo-400';
  return 'text-slate-400 bg-slate-50 dark:bg-slate-800 dark:text-slate-500';
};

export default function ShiftSchedule() {
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return shifts.filter(s => s.day.toLowerCase().includes(q) || s.shiftType.toLowerCase().includes(q) || s.notes.toLowerCase().includes(q));
  }, [searchQuery]);

  return (
    <EmployeePageLayout
      title="Shift Schedule"
      description="View your weekly shift assignments and rotation"
      breadcrumbs={['Employee', 'Attendance', 'Shift Schedule']}
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
      <GlassPanel className="p-4 flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/[0.04] rounded-xl flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400" />
          <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search schedule..." className="w-full text-xs bg-transparent text-slate-900 dark:text-white outline-none placeholder:text-slate-400" />
        </div>
      </GlassPanel>
      <GlassPanel padding="none">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 dark:border-white/[0.06]">
                {['Day', 'Shift Type', 'Start Time', 'End Time', 'Notes'].map(h => (
                  <th key={h} className="text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider px-5 py-3.5">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(s => {
                const Icon = shiftIcon(s.shiftType);
                return (
                  <tr key={s.day} className="border-b border-slate-100 dark:border-white/[0.04] hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-5 py-3.5 text-sm font-semibold text-slate-900 dark:text-white">{s.day}</td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full ${shiftColor(s.shiftType)}`}>
                        {s.shiftType !== '-' && <Icon className="w-3 h-3" />}
                        {s.shiftType}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-xs font-mono text-slate-900 dark:text-white font-semibold">{s.startTime}</td>
                    <td className="px-5 py-3.5 text-xs font-mono text-slate-900 dark:text-white font-semibold">{s.endTime}</td>
                    <td className="px-5 py-3.5 text-xs text-slate-500 dark:text-slate-400">{s.notes}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </GlassPanel>
    </EmployeePageLayout>
  );
}
