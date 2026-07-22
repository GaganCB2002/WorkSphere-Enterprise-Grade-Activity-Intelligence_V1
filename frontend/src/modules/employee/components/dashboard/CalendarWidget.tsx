import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CalendarDays } from 'lucide-react';
import { GlassPanel } from '../ui/GlassPanel';

interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  type: 'meeting' | 'deadline' | 'leave' | 'personal';
  color: string;
}

interface CalendarWidgetProps {
  events: CalendarEvent[];
}

const typeLabels: Record<string, string> = { meeting: 'Meeting', deadline: 'Deadline', leave: 'Leave', personal: 'Personal' };

export function CalendarWidget({ events }: CalendarWidgetProps) {
  const navigate = useNavigate();

  return (
    <GlassPanel padding="sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <CalendarDays className="w-4 h-4 text-blue-500" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Calendar</h3>
        </div>
        <span className="text-xs text-slate-400 font-normal">Upcoming events</span>
      </div>
      <div className="space-y-2">
        {events.slice(0, 5).map(ev => (
          <div
            key={ev.id}
            className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 dark:border-white/[0.04] hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors"
          >
            <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: ev.color }} />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{ev.title}</p>
              <p className="text-[10px] text-slate-400 mt-0.5 font-semibold">{ev.date} • {ev.time}</p>
            </div>
            <span className="text-[9px] font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 flex-shrink-0">
              {typeLabels[ev.type]}
            </span>
          </div>
        ))}
      </div>
      <button
        onClick={() => navigate('/employee/calendar')}
        className="mt-3 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
      >
        <span>View All</span>
        <ArrowRight className="w-3 h-3" />
      </button>
    </GlassPanel>
  );
}
