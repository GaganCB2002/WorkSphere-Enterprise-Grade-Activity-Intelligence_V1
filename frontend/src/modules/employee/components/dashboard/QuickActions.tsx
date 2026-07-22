import React from 'react';
import { CalendarPlus, Clock, ListTodo, Timer, Zap, Video } from 'lucide-react';
import { GlassPanel } from '../ui/GlassPanel';

interface QuickActionsProps {
  onNavigate: (tabId: string) => void;
  isClockedIn: boolean;
  onClockToggle: () => void;
  onStartTimer: () => void;
}

export function QuickActions({ onNavigate, isClockedIn, onClockToggle, onStartTimer }: QuickActionsProps) {
  const actions = [
    {
      label: 'Apply Leave',
      icon: CalendarPlus,
      color: 'text-blue-500 bg-blue-50 dark:bg-blue-500/10',
      onClick: () => onNavigate('leave'),
    },
    {
      label: isClockedIn ? 'Clock Out' : 'Clock In',
      icon: Clock,
      color: isClockedIn ? 'text-red-500 bg-red-50 dark:bg-red-500/10' : 'text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10',
      onClick: onClockToggle,
    },
    {
      label: 'New Task',
      icon: ListTodo,
      color: 'text-purple-500 bg-purple-50 dark:bg-purple-500/10',
      onClick: () => onNavigate('tasks'),
    },
    {
      label: 'Start Timer',
      icon: Timer,
      color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10',
      onClick: onStartTimer,
    },
    {
      label: 'Open Chat',
      icon: Zap,
      color: 'text-amber-500 bg-amber-50 dark:bg-amber-500/10',
      onClick: () => onNavigate('chat'),
    },
    {
      label: 'Schedule Meeting',
      icon: Video,
      color: 'text-cyan-500 bg-cyan-50 dark:bg-cyan-500/10',
      onClick: () => {},
    },
  ];

  return (
    <GlassPanel>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">Quick Actions</h3>
        <span className="text-[10px] text-slate-400 font-medium font-semibold">Instant action launchpad</span>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
        {actions.map(action => (
          <button
            key={action.label}
            onClick={action.onClick}
            className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group cursor-pointer"
          >
            <div className={`w-10 h-10 rounded-xl ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm`}>
              <action.icon className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 text-center">{action.label}</span>
          </button>
        ))}
      </div>
    </GlassPanel>
  );
}

export default QuickActions;
