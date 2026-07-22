import React, { useState } from 'react';
import { Play, Coffee, LogOut, CheckCircle } from 'lucide-react';
import { GlassPanel } from '../ui/GlassPanel';
import type { ClockSession } from '../../types';

interface ClockWidgetProps {
  session: ClockSession;
  timerText: string;
  onClockIn: () => void;
  onClockOut: () => void;
  onStartBreak: (type: 'lunch' | 'short' | 'personal') => void;
  onEndBreak: () => void;
}

export function ClockWidget({
  session,
  timerText,
  onClockIn,
  onClockOut,
  onStartBreak,
  onEndBreak,
}: ClockWidgetProps) {
  const [isOnBreak, setIsOnBreak] = useState(
    session.isActive && session.breaks.length > 0 && !session.breaks[session.breaks.length - 1].endedAt
  );

  const handleBreakToggle = () => {
    if (isOnBreak) {
      onEndBreak();
      setIsOnBreak(false);
    } else {
      onStartBreak('lunch');
      setIsOnBreak(true);
    }
  };

  return (
    <GlassPanel className="p-5 flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Attendance Clock</h3>
          <span className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${session.isActive ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              {session.isActive ? (isOnBreak ? 'On Break' : 'Clocked In') : 'Clocked Out'}
            </span>
          </span>
        </div>

        {/* Live Timer Representation */}
        <div className="text-center py-6">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Session Duration</p>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white font-mono tracking-tight tabular-nums">
            {timerText}
          </h2>
          <p className="text-[11px] text-slate-400 mt-1">
            {session.isActive ? `Clocked in at ${session.clockIn}` : 'Not clocked in today'}
          </p>
        </div>
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-2 gap-3 mt-4">
        {session.isActive ? (
          <>
            <button
              onClick={handleBreakToggle}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                isOnBreak
                  ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200/60 dark:border-emerald-500/20'
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200/60 dark:border-white/[0.04] hover:bg-slate-100 dark:hover:bg-slate-700/50'
              }`}
            >
              <Coffee className="w-4 h-4" />
              {isOnBreak ? 'Resume Work' : 'Take Break'}
            </button>
            <button
              onClick={onClockOut}
              className="flex items-center justify-center gap-2 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-rose-500/10 active:scale-95"
            >
              <LogOut className="w-4 h-4" />
              Clock Out
            </button>
          </>
        ) : (
          <button
            onClick={onClockIn}
            className="col-span-2 flex items-center justify-center gap-2 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-blue-500/10 active:scale-95"
          >
            <Play className="w-4 h-4" />
            Clock In
          </button>
        )}
      </div>
    </GlassPanel>
  );
}

export default ClockWidget;
