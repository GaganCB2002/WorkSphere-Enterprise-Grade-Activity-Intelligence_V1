import React from 'react';
import { Calendar, User, HeartHandshake } from 'lucide-react';
import { GlassPanel } from '../ui/GlassPanel';
import { Avatar } from '../ui/Avatar';
import { StatusBadge } from '../ui/StatusBadge';
import type { LeaveType } from '../../types';

interface LeaveCalendarProps {
  leaves: {
    employeeId: string;
    name: string;
    dates: string[];
    type: LeaveType;
  }[];
}

export function LeaveCalendar({ leaves }: LeaveCalendarProps) {
  // Sort leaves by first date
  const sortedLeaves = [...leaves].sort((a, b) => {
    if (!a.dates[0]) return 1;
    if (!b.dates[0]) return -1;
    return a.dates[0].localeCompare(b.dates[0]);
  });

  return (
    <GlassPanel className="p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">Teammate Leave Calendar</h3>
        <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider flex items-center gap-1">
          <Calendar className="w-3.5 h-3.5" /> Upcoming Weeks
        </span>
      </div>

      <div className="space-y-3.5">
        {sortedLeaves.map((item, idx) => {
          const firstDate = new Date(item.dates[0]);
          const lastDate = new Date(item.dates[item.dates.length - 1]);
          const dateStr = item.dates.length > 1
            ? `₹${firstDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – ${lastDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
            : firstDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

          return (
            <div
              key={idx}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl border border-slate-100 dark:border-white/[0.04] bg-slate-50/30 dark:bg-slate-800/20 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors gap-3"
            >
              <div className="flex items-center gap-3">
                <Avatar name={item.name} size="sm" />
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">{item.name}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{dateStr}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-auto">
                <StatusBadge
                  label={item.type === 'wfh' ? 'WFH' : 'Out of Office'}
                  variant={item.type === 'wfh' ? 'working' : 'leave'}
                  dot={false}
                />
                <span className="text-[10px] font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md">
                  {item.dates.length} {item.dates.length === 1 ? 'day' : 'days'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </GlassPanel>
  );
}

export default LeaveCalendar;
