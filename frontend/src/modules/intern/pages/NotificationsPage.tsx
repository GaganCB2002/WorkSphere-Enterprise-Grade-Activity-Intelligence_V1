import React, { useState } from 'react';
import InternPageShell from '../InternPageShell';
import { motion } from 'framer-motion';
import {
  Bell, CheckCheck, ClipboardList, MessageSquare, CalendarCheck,
  UserCheck, BookOpen, Megaphone, Clock, ArrowUpRight, X, Filter
} from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const kpis = [
  { label: 'Total Notifications', value: '28', icon: Bell, color: 'text-blue-600 bg-blue-100 dark:bg-blue-500/10 dark:text-blue-400' },
  { label: 'Unread', value: '7', icon: Bell, color: 'text-amber-600 bg-amber-100 dark:bg-amber-500/10 dark:text-amber-400' },
  { label: "Today's", value: '5', icon: Clock, color: 'text-emerald-600 bg-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400' },
];

const notifications = [
  { id: 1, type: 'task', title: 'Task Assigned', desc: 'You have been assigned "Design System Audit"', time: '5 min ago', read: false },
  { id: 2, type: 'message', title: 'New Message from Mentor', desc: 'Sarah Chen: "Great work on the PR, just a few comments"', time: '15 min ago', read: false },
  { id: 3, type: 'meeting', title: 'Meeting Reminder', desc: 'Daily Standup starts in 15 minutes', time: '1 hour ago', read: false },
  { id: 4, type: 'leave', title: 'Leave Approved', desc: 'Your leave request for July 25 has been approved', time: '2 hours ago', read: false },
  { id: 5, type: 'learning', title: 'Course Update', desc: 'New module "Advanced TypeScript" is now available', time: '3 hours ago', read: false },
  { id: 6, type: 'announcement', title: 'Team Announcement', desc: 'Town hall meeting rescheduled to Thursday 3 PM', time: '5 hours ago', read: true },
  { id: 7, type: 'task', title: 'Task Completed', desc: '"API Integration" task has been marked complete', time: '1 day ago', read: true },
  { id: 8, type: 'message', title: 'Reply on Thread', desc: 'Alex replied to your comment on "Sprint Planning"', time: '1 day ago', read: true },
  { id: 9, type: 'meeting', title: 'Meeting Cancelled', desc: 'Code Review Session has been cancelled', time: '2 days ago', read: true },
  { id: 10, type: 'learning', title: 'Certification Earned', desc: 'Congratulations! You earned "React Developer" badge', time: '3 days ago', read: true },
];

const typeIcons: Record<string, any> = {
  task: ClipboardList,
  message: MessageSquare,
  meeting: CalendarCheck,
  leave: UserCheck,
  learning: BookOpen,
  announcement: Megaphone,
};

const typeColors: Record<string, string> = {
  task: 'text-blue-600 bg-blue-100 dark:bg-blue-500/10 dark:text-blue-400',
  message: 'text-emerald-600 bg-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400',
  meeting: 'text-amber-600 bg-amber-100 dark:bg-amber-500/10 dark:text-amber-400',
  leave: 'text-violet-600 bg-violet-100 dark:bg-violet-500/10 dark:text-violet-400',
  learning: 'text-rose-600 bg-rose-100 dark:bg-rose-500/10 dark:text-rose-400',
  announcement: 'text-sky-600 bg-sky-100 dark:bg-sky-500/10 dark:text-sky-400',
};

type FilterType = 'all' | 'unread' | 'read';

function KpiCard({ kpi, index }: { kpi: typeof kpis[0]; index: number }) {
  const Icon = kpi.icon;
  return (
    <motion.div variants={item} className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className={`p-2.5 rounded-lg ${kpi.color}`}>
          <Icon className="w-5 h-5" />
        </div>
        <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full text-emerald-700 bg-emerald-50 dark:bg-emerald-500/10 dark:text-emerald-400">
          <ArrowUpRight className="w-3 h-3" />+{index === 2 ? '5' : '12'} this week
        </span>
      </div>
      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">{kpi.label}</p>
      <p className="text-2xl font-bold text-slate-900 dark:text-white">{kpi.value}</p>
    </motion.div>
  );
}

export default function NotificationsPage() {
  const [filter, setFilter] = useState<FilterType>('all');
  const [notifList, setNotifList] = useState(notifications);

  const filtered = notifList.filter(n => {
    if (filter === 'unread') return !n.read;
    if (filter === 'read') return n.read;
    return true;
  });

  const markAllRead = () => {
    setNotifList(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <InternPageShell title="Notifications" description="Your notifications and alerts">
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">

        {/* KPI Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {kpis.map((kpi, i) => <KpiCard key={kpi.label} kpi={kpi} index={i} />)}
        </div>

        {/* Filters & Actions */}
        <motion.div variants={item} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
            {(['all', 'unread', 'read'] as FilterType[]).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-md text-sm font-semibold capitalize transition-colors ${filter === f ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
              >
                {f}
              </button>
            ))}
          </div>
          <button
            onClick={markAllRead}
            className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center gap-2"
          >
            <CheckCheck className="w-4 h-4" /> Mark All Read
          </button>
        </motion.div>

        {/* Notification List */}
        <motion.div variants={item} className="space-y-2">
          {filtered.map((n) => {
            const Icon = typeIcons[n.type] || Bell;
            const color = typeColors[n.type] || 'text-slate-600 bg-slate-100';
            return (
              <div
                key={n.id}
                className={`flex items-start gap-4 p-4 rounded-xl border transition-all cursor-pointer ${
                  n.read
                    ? 'bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/60'
                    : 'bg-blue-50/60 dark:bg-blue-500/5 border-blue-100 dark:border-blue-500/20'
                }`}
              >
                <div className={`p-2.5 rounded-lg ${color} flex-shrink-0`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{n.title}</p>
                    {!n.read && <span className="w-2 h-2 rounded-full bg-blue-600 flex-shrink-0" />}
                  </div>
                  <p className="text-xs text-slate-500">{n.desc}</p>
                </div>
                <div className="flex flex-col items-end gap-1 flex-shrink-0">
                  <span className="text-xs text-slate-400 whitespace-nowrap">{n.time}</span>
                </div>
              </div>
            );
          })}
          {filtered.length === 0 && (
            <div className="text-center py-12 text-slate-400">
              <Bell className="w-12 h-12 mx-auto mb-3 opacity-40" />
              <p className="text-sm font-semibold">No notifications</p>
            </div>
          )}
        </motion.div>

      </motion.div>
    </InternPageShell>
  );
}
