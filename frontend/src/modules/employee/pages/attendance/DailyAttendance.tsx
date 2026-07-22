import React, { useState, useMemo } from 'react';
import { Filter, Download, RefreshCw, Search } from 'lucide-react';
import { EmployeePageLayout } from '../../components/EmployeePageLayout';
import { GlassPanel } from '../../components/ui/GlassPanel';
import { AutoStatusBadge } from '../../components/ui/StatusBadge';

interface DailyRecord {
  date: string;
  day: string;
  checkIn: string;
  checkOut: string;
  breakDuration: string;
  netHours: string;
  status: string;
}

const weekRecords: DailyRecord[] = [
  { date: '2026-07-21', day: 'Mon', checkIn: '08:55', checkOut: '17:30', breakDuration: '45 min', netHours: '7h 50m', status: 'Present' },
  { date: '2026-07-22', day: 'Tue', checkIn: '09:02', checkOut: '18:15', breakDuration: '30 min', netHours: '8h 43m', status: 'Present' },
  { date: '2026-07-23', day: 'Wed', checkIn: '08:48', checkOut: '17:00', breakDuration: '1h 0m', netHours: '7h 12m', status: 'Present' },
  { date: '2026-07-24', day: 'Thu', checkIn: '09:15', checkOut: '18:30', breakDuration: '45 min', netHours: '8h 30m', status: 'Late' },
  { date: '2026-07-25', day: 'Fri', checkIn: '08:50', checkOut: '16:45', breakDuration: '30 min', netHours: '7h 25m', status: 'Present' },
];

const today: DailyRecord = {
  date: '2026-07-21', day: 'Mon', checkIn: '08:55', checkOut: '--:--', breakDuration: '45 min', netHours: '7h 10m', status: 'Working',
};

export default function DailyAttendance() {
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return weekRecords.filter(r => r.date.includes(q) || r.day.toLowerCase().includes(q) || r.status.toLowerCase().includes(q));
  }, [searchQuery]);

  return (
    <EmployeePageLayout
      title="Daily Attendance"
      description="Today's attendance summary and this week's records"
      breadcrumbs={['Employee', 'Attendance', 'Daily Attendance']}
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
      <GlassPanel className="p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Today — {today.date}</h3>
          <AutoStatusBadge status={today.status} />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { label: 'Check In', value: today.checkIn },
            { label: 'Check Out', value: today.checkOut },
            { label: 'Break Duration', value: today.breakDuration },
            { label: 'Net Hours', value: today.netHours },
            { label: 'Day', value: today.day },
          ].map(s => (
            <div key={s.label} className="text-center p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{s.label}</p>
              <p className="text-sm font-bold text-slate-900 dark:text-white mt-1">{s.value}</p>
            </div>
          ))}
        </div>
      </GlassPanel>

      <GlassPanel className="p-4 flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/[0.04] rounded-xl flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400" />
          <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search this week..." className="w-full text-xs bg-transparent text-slate-900 dark:text-white outline-none placeholder:text-slate-400" />
        </div>
      </GlassPanel>
      <GlassPanel padding="none">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 dark:border-white/[0.06]">
                {['Date', 'Day', 'Check In', 'Check Out', 'Break', 'Net Hours', 'Status'].map(h => (
                  <th key={h} className="text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider px-5 py-3.5">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(r => (
                <tr key={r.date} className="border-b border-slate-100 dark:border-white/[0.04] hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="px-5 py-3.5 text-xs font-mono text-slate-500 dark:text-slate-400">{r.date}</td>
                  <td className="px-5 py-3.5 text-xs font-semibold text-slate-600 dark:text-slate-300">{r.day}</td>
                  <td className="px-5 py-3.5 text-xs text-slate-900 dark:text-white font-semibold">{r.checkIn}</td>
                  <td className="px-5 py-3.5 text-xs text-slate-900 dark:text-white font-semibold">{r.checkOut}</td>
                  <td className="px-5 py-3.5 text-xs text-slate-500 dark:text-slate-400">{r.breakDuration}</td>
                  <td className="px-5 py-3.5 text-xs text-slate-500 dark:text-slate-400">{r.netHours}</td>
                  <td className="px-5 py-3.5"><AutoStatusBadge status={r.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassPanel>
    </EmployeePageLayout>
  );
}
