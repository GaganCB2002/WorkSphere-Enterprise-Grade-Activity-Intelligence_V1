import React from 'react';
import { GlassPanel } from '../ui/GlassPanel';

interface ActivityItem {
  time: string;
  event: string;
  color: string;
  type: string;
}

interface ActivityTimelineProps {
  activities: ActivityItem[];
}

export function ActivityTimeline({ activities }: ActivityTimelineProps) {
  return (
    <GlassPanel>
      <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">Today's Activity</h3>
      <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-3 pl-5 space-y-4">
        {activities.slice(0, 5).map((item, idx) => (
          <div key={idx} className="relative group">
            <div
              className="absolute -left-[25px] top-1.5 w-3 h-3 rounded-full border-2 border-white dark:border-slate-900 transition-colors shadow-sm"
              style={{ backgroundColor: item.color }}
            />
            <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500 mb-0.5">{item.time}</p>
            <p className="text-xs font-semibold text-slate-700 dark:text-slate-305 leading-relaxed">
              {item.event}
            </p>
          </div>
        ))}
      </div>
    </GlassPanel>
  );
}

export default ActivityTimeline;
