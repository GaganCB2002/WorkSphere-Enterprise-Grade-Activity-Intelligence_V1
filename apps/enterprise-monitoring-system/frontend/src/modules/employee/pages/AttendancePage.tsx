import React, { useEffect, useState } from 'react';
import { Clock, Calendar, ShieldAlert, Award, Compass, HeartPulse } from 'lucide-react';
import { useAttendanceStore } from '../store/employeeStore';
import { ClockWidget } from '../components/attendance/ClockWidget';
import { AttendanceCalendar } from '../components/attendance/AttendanceCalendar';
import { AttendanceHeatmap } from '../components/attendance/AttendanceHeatmap';
import { GlassPanel } from '../components/ui/GlassPanel';
import { StatCard } from '../components/ui/StatCard';
import * as mock from '../data/mockData';

export function AttendancePage() {
  const { session, records, clockIn, clockOut, startBreak, endBreak, updateSessionWorkedMinutes } = useAttendanceStore();
  const [timerText, setTimerText] = useState('00h 00m');

  // Active session timer effect
  useEffect(() => {
    let interval: any;
    if (session.isActive) {
      const parseTimeString = (timeStr: string) => {
        const [time, modifier] = timeStr.split(' ');
        let [hours, minutes] = time.split(':').map(Number);
        if (modifier === 'PM' && hours < 12) hours += 12;
        if (modifier === 'AM' && hours === 12) hours = 0;
        
        const date = new Date(2026, 4, 21); // today in mock
        date.setHours(hours, minutes, 0, 0);
        return date;
      };

      const start = parseTimeString(session.clockIn);

      const updateTimer = () => {
        const diffMs = Date.now() - start.getTime() + (session.workedMinutes * 60 * 1000);
        // Ensure non-negative
        const adjustedMs = Math.max(0, diffMs);
        const totalMinutes = Math.floor(adjustedMs / 60000);
        
        // Exclude break minutes if breaks exist
        const totalBreakMins = session.breaks.reduce((sum, b) => {
          if (b.endedAt) return sum + b.durationMinutes;
          // if currently on active break, estimate elapsed break time
          return sum + 15; // default estimate
        }, 0);
        
        const actualWorkedMins = Math.max(0, totalMinutes - totalBreakMins);
        
        const h = Math.floor(actualWorkedMins / 60);
        const m = actualWorkedMins % 60;
        
        setTimerText(`${String(h).padStart(2, '0')}h ${String(m).padStart(2, '0')}m`);
        updateSessionWorkedMinutes(actualWorkedMins);
      };

      // Run once immediately
      updateTimer();
      interval = setInterval(updateTimer, 60000); // update every minute
    } else {
      setTimerText('00h 00m');
    }
    return () => clearInterval(interval);
  }, [session.isActive, session.clockIn, session.breaks, updateSessionWorkedMinutes, session.workedMinutes]);

  // Aggregate metrics from records
  const metrics = React.useMemo(() => {
    const presentRecords = records.filter(r => r.status === 'present' || r.status === 'wfh' || r.status === 'half_day');
    const totalDays = presentRecords.length;
    const totalHours = presentRecords.reduce((sum, r) => sum + r.workedHours, 0);
    const avgHours = totalDays > 0 ? Math.round((totalHours / totalDays) * 10) / 10 : 0;
    const lateDays = records.filter(r => r.isLate).length;
    const wfhDays = records.filter(r => r.status === 'wfh').length;
    
    // Total overtime
    const overtimeMins = records.reduce((sum, r) => sum + r.overtimeMinutes, 0);
    const overtimeHours = Math.round((overtimeMins / 60) * 10) / 10;

    return {
      avgHours,
      lateDays,
      wfhDays,
      overtimeHours,
      presentRatio: records.length > 0 ? Math.round((records.filter(r => r.status !== 'absent' && r.status !== 'holiday').length / records.filter(r => r.status !== 'holiday').length) * 100) : 100
    };
  }, [records]);

  return (
    <div className="space-y-6 pb-8">
      {/* Metrics Summary Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900/60 backdrop-blur-md border border-slate-200/60 dark:border-white/[0.06] rounded-2xl p-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Avg Daily Hours</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1.5">{metrics.avgHours}h</p>
            <p className="text-[10px] text-emerald-500 font-bold mt-1">Target: 8.0h / day</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-blue-500 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900/60 backdrop-blur-md border border-slate-200/60 dark:border-white/[0.06] rounded-2xl p-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Overtime Accumulated</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1.5">{metrics.overtimeHours}h</p>
            <p className="text-[10px] text-slate-400 font-semibold mt-1">This month</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900/60 backdrop-blur-md border border-slate-200/60 dark:border-white/[0.06] rounded-2xl p-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">WFH Frequency</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1.5">{metrics.wfhDays} days</p>
            <p className="text-[10px] text-blue-500 font-bold mt-1">Hybrid schedule compliant</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-500/10 text-purple-500 flex items-center justify-center">
            <Compass className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900/60 backdrop-blur-md border border-slate-200/60 dark:border-white/[0.06] rounded-2xl p-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Late Arrivals</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1.5">{metrics.lateDays}</p>
            {metrics.lateDays > 0 ? (
              <p className="text-[10px] text-amber-500 font-bold mt-1">Needs attention</p>
            ) : (
              <p className="text-[10px] text-emerald-500 font-bold mt-1">Perfect punctuality</p>
            )}
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-500/10 text-amber-500 flex items-center justify-center">
            <ShieldAlert className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Main Grid: Clock-in widget and Heatmap */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Columns (2/3) - Heatmap & Calendar */}
        <div className="xl:col-span-2 space-y-6">
          <AttendanceHeatmap data={mock.heatmapData} />
          <AttendanceCalendar records={records} />
        </div>

        {/* Right Column (1/3) - Clock Widget & Stats */}
        <div className="space-y-6">
          <ClockWidget
            session={session}
            timerText={timerText}
            onClockIn={clockIn}
            onClockOut={clockOut}
            onStartBreak={startBreak}
            onEndBreak={endBreak}
          />

          {/* Compliance & Health Tip Panel */}
          <GlassPanel className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <HeartPulse className="w-4 h-4 text-emerald-500" />
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Punctuality Score</h4>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-3xl font-extrabold text-slate-900 dark:text-white">{metrics.presentRatio}%</div>
              <div className="text-xs text-slate-400 leading-normal flex-1">
                Your shift compliance is currently rated as <span className="text-emerald-500 font-bold">Excellent</span>. Remember to clock regular breaks to avoid cognitive burnout.
              </div>
            </div>
          </GlassPanel>
        </div>
      </div>
    </div>
  );
}

export default AttendancePage;
