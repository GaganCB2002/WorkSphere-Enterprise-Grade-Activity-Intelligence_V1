import React, { useState, useMemo } from 'react';
import { Filter, Download, RefreshCw, Search, ArrowUpDown } from 'lucide-react';
import { EmployeePageLayout } from '../../components/EmployeePageLayout';
import { GlassPanel } from '../../components/ui/GlassPanel';
import { AutoStatusBadge } from '../../components/ui/StatusBadge';

interface AttendanceRecord {
  date: string;
  day: string;
  clockIn: string;
  clockOut: string;
  hoursWorked: string;
  status: string;
  overtime: string;
}

const records: AttendanceRecord[] = [
  { date: '2026-07-01', day: 'Mon', clockIn: '08:55', clockOut: '17:30', hoursWorked: '8h 35m', status: 'Present', overtime: '0h' },
  { date: '2026-07-02', day: 'Tue', clockIn: '09:02', clockOut: '18:15', hoursWorked: '9h 13m', status: 'Present', overtime: '1h 13m' },
  { date: '2026-07-03', day: 'Wed', clockIn: '08:48', clockOut: '17:00', hoursWorked: '8h 12m', status: 'Present', overtime: '0h' },
  { date: '2026-07-04', day: 'Thu', clockIn: '09:15', clockOut: '18:30', hoursWorked: '9h 15m', status: 'Late', overtime: '1h 15m' },
  { date: '2026-07-05', day: 'Fri', clockIn: '08:50', clockOut: '16:45', hoursWorked: '7h 55m', status: 'Present', overtime: '0h' },
  { date: '2026-07-06', day: 'Sat', clockIn: '-', clockOut: '-', hoursWorked: '-', status: 'Holiday', overtime: '-' },
  { date: '2026-07-07', day: 'Sun', clockIn: '-', clockOut: '-', hoursWorked: '-', status: 'Holiday', overtime: '-' },
  { date: '2026-07-08', day: 'Mon', clockIn: '08:58', clockOut: '17:10', hoursWorked: '8h 12m', status: 'Present', overtime: '0h' },
  { date: '2026-07-09', day: 'Tue', clockIn: '09:05', clockOut: '18:00', hoursWorked: '8h 55m', status: 'Present', overtime: '0h' },
  { date: '2026-07-10', day: 'Wed', clockIn: '09:30', clockOut: '18:45', hoursWorked: '9h 15m', status: 'Late', overtime: '1h 15m' },
  { date: '2026-07-11', day: 'Thu', clockIn: '08:45', clockOut: '17:20', hoursWorked: '8h 35m', status: 'Present', overtime: '0h' },
  { date: '2026-07-12', day: 'Fri', clockIn: '08:52', clockOut: '16:50', hoursWorked: '7h 58m', status: 'Present', overtime: '0h' },
];

export default function AttendanceHistory() {
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return records.filter(r => r.date.includes(q) || r.day.toLowerCase().includes(q) || r.status.toLowerCase().includes(q));
  }, [searchQuery]);

  return (
    <EmployeePageLayout
      title="Attendance History"
      description="View your complete attendance records with clock-in/out times"
      breadcrumbs={['Employee', 'Attendance', 'Attendance History']}
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
          <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search by date, day, status..." className="w-full text-xs bg-transparent text-slate-900 dark:text-white outline-none placeholder:text-slate-400" />
        </div>
      </GlassPanel>
      <GlassPanel padding="none">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 dark:border-white/[0.06]">
                {['Date', 'Day', 'Clock In', 'Clock Out', 'Hours Worked', 'Status', 'Overtime'].map(h => (
                  <th key={h} className="text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider px-5 py-3.5">
                    <span className="flex items-center gap-1">{h} <ArrowUpDown className="w-3 h-3" /></span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(r => (
                <tr key={r.date} className="border-b border-slate-100 dark:border-white/[0.04] hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="px-5 py-3.5 text-xs font-mono text-slate-500 dark:text-slate-400">{r.date}</td>
                  <td className="px-5 py-3.5 text-xs font-semibold text-slate-600 dark:text-slate-300">{r.day}</td>
                  <td className="px-5 py-3.5 text-xs text-slate-900 dark:text-white font-semibold">{r.clockIn}</td>
                  <td className="px-5 py-3.5 text-xs text-slate-900 dark:text-white font-semibold">{r.clockOut}</td>
                  <td className="px-5 py-3.5 text-xs text-slate-500 dark:text-slate-400">{r.hoursWorked}</td>
                  <td className="px-5 py-3.5"><AutoStatusBadge status={r.status} /></td>
                  <td className="px-5 py-3.5 text-xs text-slate-500 dark:text-slate-400">{r.overtime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassPanel>
    </EmployeePageLayout>
  );
}
