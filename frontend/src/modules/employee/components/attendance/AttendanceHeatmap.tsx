import React, { useMemo } from 'react';
import type { AttendanceHeatmapDay } from '../../types';

interface AttendanceHeatmapProps {
  data: AttendanceHeatmapDay[];
}

export function AttendanceHeatmap({ data }: AttendanceHeatmapProps) {
  // We want to group data by weeks for a GitHub contribution grid
  // In our grid: Columns are weeks, Rows are days of week (0 = Sunday, ..., 6 = Saturday)
  
  const calendarGrid = useMemo(() => {
    if (!data || data.length === 0) return [];
    
    // Find the first date and make sure we start the grid aligned to Sunday
    const firstDate = new Date(data[0].date);
    const startOffset = firstDate.getDay(); // 0-6
    
    // Pad the start if it's not Sunday
    const paddedList: Array<AttendanceHeatmapDay | null> = Array(startOffset).fill(null);
    paddedList.push(...data);
    
    // Split into weeks (chunks of 7)
    const weeks: Array<Array<AttendanceHeatmapDay | null>> = [];
    for (let i = 0; i < paddedList.length; i += 7) {
      weeks.push(paddedList.slice(i, i + 7));
    }
    
    return weeks;
  }, [data]);

  // Color intensities mapping
  const getIntensityClass = (intensity: number) => {
    switch (intensity) {
      case 0: return 'bg-slate-100 dark:bg-slate-800/40 hover:bg-slate-200 dark:hover:bg-slate-750 border border-slate-200/20 dark:border-white/[0.01]';
      case 1: return 'bg-emerald-100 dark:bg-emerald-950/20 text-emerald-600 border border-emerald-200/20 dark:border-emerald-900/10';
      case 2: return 'bg-emerald-300 dark:bg-emerald-800/45 text-emerald-800 border border-emerald-400/20 dark:border-emerald-700/20';
      case 3: return 'bg-emerald-500 dark:bg-emerald-600/70 text-white';
      case 4: return 'bg-emerald-700 dark:bg-emerald-500 text-white';
      default: return 'bg-slate-100 dark:bg-slate-800/40';
    }
  };

  // Find month transitions to draw headers
  const monthHeaders = useMemo(() => {
    if (!data || data.length === 0) return [];
    const headers: Array<{ label: string; colSpan: number }> = [];
    
    let currentMonth = -1;
    let colSpan = 0;

    // We count columns in calendarGrid
    const firstDate = new Date(data[0].date);
    const startOffset = firstDate.getDay();
    const totalDays = startOffset + data.length;
    const totalWeeks = Math.ceil(totalDays / 7);

    // Track month of each column's start day (Sunday or first cell)
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    for (let w = 0; w < totalWeeks; w++) {
      // Look at the first valid day in this week to determine the month
      let targetDay: AttendanceHeatmapDay | null = null;
      const week = calendarGrid[w];
      if (week) {
        targetDay = week.find(d => d !== null) || null;
      }
      
      if (targetDay) {
        const m = new Date(targetDay.date).getMonth();
        if (m !== currentMonth) {
          if (colSpan > 0) {
            headers.push({ label: monthNames[currentMonth], colSpan });
          }
          currentMonth = m;
          colSpan = 1;
        } else {
          colSpan++;
        }
      } else {
        colSpan++;
      }
    }
    
    if (colSpan > 0 && currentMonth !== -1) {
      headers.push({ label: monthNames[currentMonth], colSpan });
    }
    
    return headers;
  }, [data, calendarGrid]);

  return (
    <div className="bg-white dark:bg-slate-900/60 backdrop-blur-md border border-slate-200/60 dark:border-white/[0.06] rounded-2xl p-5">
      <div>
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">Productive Consistency Heatmap</h3>
        <p className="text-xs text-slate-400 mt-0.5">Visual representation of daily hours completed</p>
      </div>

      <div className="mt-6 overflow-x-auto emp-scrollbar pb-2">
        <div className="min-w-[650px] flex flex-col">
          {/* Month Headers */}
          <div className="flex pl-8 mb-1 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            {monthHeaders.map((header, idx) => (
              <div
                key={idx}
                style={{ width: `₹${(header.colSpan / calendarGrid.length) * 100}%` }}
                className="text-left"
              >
                {header.label}
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            {/* Day labels (Sun, Tue, Thu, Sat) */}
            <div className="flex flex-col justify-between text-[9px] font-bold text-slate-400 dark:text-slate-500 pr-2 h-[120px] py-1 text-right w-6">
              <span>Sun</span>
              <span>Tue</span>
              <span>Thu</span>
              <span>Sat</span>
            </div>

            {/* Grid Area */}
            <div className="flex-1 flex gap-1 h-[120px]">
              {calendarGrid.map((week, weekIdx) => (
                <div key={weekIdx} className="flex flex-col gap-1 flex-1">
                  {week.map((day, dayIdx) => {
                    if (!day) {
                      return (
                        <div
                          key={dayIdx}
                          className="flex-1 rounded-sm bg-transparent border border-transparent"
                        />
                      );
                    }

                    const cellClasses = getIntensityClass(day.intensity);
                    
                    return (
                      <div
                        key={dayIdx}
                        className={`flex-1 rounded-sm relative group cursor-pointer ${cellClasses}`}
                      >
                        {/* Tooltip */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-36 bg-slate-950/95 dark:bg-slate-900/95 text-white border border-white/[0.08] shadow-xl rounded-lg p-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-150 z-50 text-[9px] font-medium leading-normal text-center">
                          <p className="font-bold border-b border-white/10 pb-1 mb-1">
                            {new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </p>
                          <p className="text-slate-300">Worked: <span className="text-white font-bold">{day.hours} hrs</span></p>
                          <p className="capitalize text-slate-300">Status: <span className="text-white font-bold">{day.status}</span></p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Heatmap Legend */}
      <div className="flex items-center justify-end gap-1.5 mt-4 text-[10px] font-medium text-slate-400">
        <span>Less</span>
        <span className="w-2.5 h-2.5 rounded-sm bg-slate-100 dark:bg-slate-800/40 border border-slate-200/20 dark:border-white/[0.01]" />
        <span className="w-2.5 h-2.5 rounded-sm bg-emerald-100 dark:bg-emerald-950/20" />
        <span className="w-2.5 h-2.5 rounded-sm bg-emerald-300 dark:bg-emerald-800/45" />
        <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500 dark:bg-emerald-600/70" />
        <span className="w-2.5 h-2.5 rounded-sm bg-emerald-700 dark:bg-emerald-50" />
        <span>More</span>
      </div>
    </div>
  );
}

export default AttendanceHeatmap;
