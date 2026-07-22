import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Megaphone } from 'lucide-react';
import { GlassPanel } from '../ui/GlassPanel';

interface Announcement {
  id: string;
  title: string;
  body: string;
  date: string;
  author: string;
  priority: 'high' | 'normal' | 'low';
}

interface AnnouncementsWidgetProps {
  announcements: Announcement[];
}

const priorityColor: Record<string, string> = { high: 'bg-red-500', normal: 'bg-orange-400', low: 'bg-green-500' };

export function AnnouncementsWidget({ announcements }: AnnouncementsWidgetProps) {
  const navigate = useNavigate();

  return (
    <GlassPanel padding="sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Megaphone className="w-4 h-4 text-amber-500" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Announcements</h3>
        </div>
      </div>
      <div className="space-y-2 max-h-72 overflow-y-auto">
        {announcements.map(a => (
          <div
            key={a.id}
            className="p-3 rounded-xl border border-slate-100 dark:border-white/[0.04] hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors"
          >
            <div className="flex items-start gap-2.5">
              <div className={`w-2 h-2 rounded-full flex-shrink-0 mt-1.5 ${priorityColor[a.priority]}`} />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-slate-900 dark:text-white">{a.title}</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2 font-normal">{a.body}</p>
                <p className="text-[9px] text-slate-400 mt-1 font-semibold">{a.author} • {a.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => navigate('/employee/announcements')}
        className="mt-3 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
      >
        <span>View All</span>
        <ArrowRight className="w-3 h-3" />
      </button>
    </GlassPanel>
  );
}
