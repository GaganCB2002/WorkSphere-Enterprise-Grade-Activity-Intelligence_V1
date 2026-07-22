import React, { useState, useEffect } from 'react';
import { Filter, Download, RefreshCw, Clock, Play, Square, Timer } from 'lucide-react';
import { EmployeePageLayout } from '../../components/EmployeePageLayout';
import { GlassPanel } from '../../components/ui/GlassPanel';
import { StatusBadge } from '../../components/ui/StatusBadge';

export default function ClockInOut() {
  const [time, setTime] = useState(new Date());
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [sessionStart] = useState('08:55 AM');

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const todaySession = {
    clockIn: '08:55 AM',
    breakStart: '12:30 PM',
    breakEnd: '01:15 PM',
    breakDuration: '45 min',
    hoursWorked: '7h 10m',
    status: isClockedIn ? 'Working' : 'Not Clocked In',
  };

  return (
    <EmployeePageLayout
      title="Clock In / Out"
      description="Mark your daily attendance with one click"
      breadcrumbs={['Employee', 'Attendance', 'Clock In Out']}
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
      <GlassPanel className="p-6">
        <div className="flex flex-col items-center text-center">
          <Clock className="w-12 h-12 text-slate-300 dark:text-slate-600 mb-3" />
          <p className="text-4xl font-bold text-slate-900 dark:text-white font-mono tracking-tight">
            {time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })}
          </p>
          <p className="text-sm text-slate-400 mt-1">{time.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          <div className="mt-6">
            <button
              onClick={() => setIsClockedIn(!isClockedIn)}
              className={`flex items-center gap-3 px-8 py-4 rounded-2xl text-white font-bold text-lg shadow-lg transition-all ${
                isClockedIn
                  ? 'bg-rose-500 hover:bg-rose-600 shadow-rose-500/30'
                  : 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/30'
              }`}
            >
              {isClockedIn ? <Square className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              {isClockedIn ? 'Clock Out' : 'Clock In'}
            </button>
          </div>
          <div className="mt-4"><StatusBadge label={todaySession.status} variant={isClockedIn ? 'working' : 'offline'} size="md" /></div>
        </div>
      </GlassPanel>

      <GlassPanel className="p-5">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Today's Session</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { label: 'Clock In', value: todaySession.clockIn },
            { label: 'Break Start', value: todaySession.breakStart },
            { label: 'Break End', value: todaySession.breakEnd },
            { label: 'Break Duration', value: todaySession.breakDuration },
            { label: 'Hours Worked', value: todaySession.hoursWorked },
          ].map(s => (
            <div key={s.label} className="text-center p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{s.label}</p>
              <p className="text-sm font-bold text-slate-900 dark:text-white mt-1">{s.value}</p>
            </div>
          ))}
        </div>
      </GlassPanel>
    </EmployeePageLayout>
  );
}
