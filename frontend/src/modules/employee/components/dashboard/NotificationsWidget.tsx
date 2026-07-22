import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Bell } from 'lucide-react';
import { GlassPanel } from '../ui/GlassPanel';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'info' | 'warning' | 'success' | 'error';
  read: boolean;
}

interface NotificationsWidgetProps {
  notifications: Notification[];
}

const typeColors: Record<string, string> = {
  info: 'bg-blue-500',
  warning: 'bg-amber-500',
  success: 'bg-emerald-500',
  error: 'bg-red-500',
};

const typeRingColors: Record<string, string> = {
  info: 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400',
  warning: 'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400',
  success: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  error: 'bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400',
};

export function NotificationsWidget({ notifications }: NotificationsWidgetProps) {
  const navigate = useNavigate();

  const sorted = [...notifications].sort((a, b) => (a.read === b.read ? 0 : a.read ? 1 : -1));

  return (
    <GlassPanel padding="sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-rose-500" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Notifications</h3>
        </div>
      </div>
      <div className="space-y-2 max-h-72 overflow-y-auto">
        {sorted.slice(0, 5).map(n => (
          <div
            key={n.id}
            className={`flex items-start gap-3 p-3 rounded-xl border transition-colors ${
              n.read
                ? 'border-slate-100 dark:border-white/[0.04]'
                : 'border-blue-100 dark:border-blue-500/20 bg-blue-50/50 dark:bg-blue-500/5'
            } hover:bg-slate-50 dark:hover:bg-slate-800/30`}
          >
            <div className={`w-8 h-8 rounded-full ${typeRingColors[n.type]} flex items-center justify-center flex-shrink-0`}>
              <Bell className="w-3.5 h-3.5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <p className={`text-xs ${n.read ? 'font-semibold' : 'font-bold'} text-slate-900 dark:text-white`}>{n.title}</p>
                <span className="text-[9px] text-slate-400 font-semibold flex-shrink-0 ml-2">{n.time}</span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-normal mt-0.5 line-clamp-2">{n.message}</p>
            </div>
            <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5 ${n.read ? 'bg-transparent' : typeColors[n.type]}`} />
          </div>
        ))}
      </div>
      <button
        onClick={() => navigate('/employee/notifications')}
        className="mt-3 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
      >
        <span>View All</span>
        <ArrowRight className="w-3 h-3" />
      </button>
    </GlassPanel>
  );
}
