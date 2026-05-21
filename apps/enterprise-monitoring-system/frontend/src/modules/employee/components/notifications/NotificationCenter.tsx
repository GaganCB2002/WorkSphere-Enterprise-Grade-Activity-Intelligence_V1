import React, { useState } from 'react';
import { Bell, Check, Mail, Calendar, ListTodo, AlertTriangle, ShieldCheck, Info, MessageSquare, Flame } from 'lucide-react';
import { useNotificationStore } from '../../store/employeeStore';
import type { Notification, NotificationType } from '../../types';

export function NotificationCenter() {
  const { notificationList, markAsRead, markAllRead, unreadCount } = useNotificationStore();
  const [filter, setFilter] = useState<'all' | 'unread' | 'important'>('all');

  const getIcon = (type: NotificationType) => {
    switch (type) {
      case 'leave': return <Calendar className="w-4.5 h-4.5 text-blue-500" />;
      case 'task': return <ListTodo className="w-4.5 h-4.5 text-purple-500" />;
      case 'deadline': return <Flame className="w-4.5 h-4.5 text-rose-500 animate-pulse" />;
      case 'mention': return <MessageSquare className="w-4.5 h-4.5 text-indigo-500" />;
      case 'attendance': return <AlertTriangle className="w-4.5 h-4.5 text-amber-500" />;
      case 'system': return <Info className="w-4.5 h-4.5 text-slate-500" />;
      case 'approval': return <ShieldCheck className="w-4.5 h-4.5 text-emerald-500" />;
      default: return <Bell className="w-4.5 h-4.5 text-slate-400" />;
    }
  };

  const filteredNotifications = React.useMemo(() => {
    return notificationList.filter(n => {
      if (filter === 'unread') return !n.isRead;
      if (filter === 'important') return n.priority === 'high';
      return true;
    });
  }, [notificationList, filter]);

  return (
    <div className="bg-white dark:bg-slate-900/60 backdrop-blur-md border border-slate-200/60 dark:border-white/[0.06] rounded-2xl p-5">
      {/* Control Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-white/[0.04] mb-4">
        {/* Toggle buttons */}
        <div className="flex bg-slate-100 dark:bg-slate-800/80 p-0.5 rounded-lg self-start">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 text-[11px] font-bold rounded-md transition-colors ${
              filter === 'all'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-350'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`px-3 py-1 text-[11px] font-bold rounded-md transition-colors flex items-center gap-1.5 ${
              filter === 'unread'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-350'
            }`}
          >
            <span>Unread</span>
            {unreadCount > 0 && (
              <span className="px-1.5 py-0.5 bg-red-500 text-[8px] font-extrabold rounded-full text-white">
                {unreadCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setFilter('important')}
            className={`px-3 py-1 text-[11px] font-bold rounded-md transition-colors ${
              filter === 'important'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-350'
            }`}
          >
            Urgent
          </button>
        </div>

        {/* Bulk Action */}
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="flex items-center gap-1 text-[10px] font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 hover:underline px-2.5 py-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-500/5 transition-colors self-end"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Mark all read</span>
          </button>
        )}
      </div>

      {/* Notifications list stack */}
      <div className="space-y-2.5 max-h-[450px] overflow-y-auto emp-scrollbar pr-1">
        {filteredNotifications.length === 0 ? (
          <div className="py-12 text-center">
            <Bell className="w-10 h-10 text-slate-300 dark:text-slate-700 mx-auto mb-2" />
            <p className="text-xs font-bold text-slate-800 dark:text-slate-200">No notifications found</p>
            <p className="text-[11px] text-slate-400 mt-0.5">You're completely caught up!</p>
          </div>
        ) : (
          filteredNotifications.map(notification => (
            <div
              key={notification.id}
              onClick={() => !notification.isRead && markAsRead(notification.id)}
              className={`p-4 rounded-xl border transition-all flex gap-3 cursor-pointer items-start select-none ${
                notification.isRead
                  ? 'border-slate-100 dark:border-white/[0.02] bg-slate-50/20 dark:bg-slate-900/10 hover:bg-slate-50 dark:hover:bg-slate-800/30'
                  : 'border-blue-100 dark:border-blue-900/10 bg-blue-50/20 dark:bg-blue-950/5 hover:bg-blue-50/40 dark:hover:bg-blue-950/10 ring-1 ring-blue-500/5'
              }`}
            >
              {/* Unread indicator */}
              {!notification.isRead && (
                <span className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0 mt-1.5" />
              )}
              
              {/* Notification icon */}
              <div className="w-9 h-9 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/[0.04] shadow-sm flex items-center justify-center flex-shrink-0">
                {getIcon(notification.type)}
              </div>

              {/* Text info */}
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-1 mb-1">
                  <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                    {notification.title}
                  </p>
                  <span className="text-[9px] text-slate-400 font-semibold flex-shrink-0">
                    {new Date(notification.timestamp).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal font-normal">
                  {notification.message}
                </p>
              </div>

              {/* Action buttons */}
              {!notification.isRead && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    markAsRead(notification.id);
                  }}
                  className="p-1 rounded-lg text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-blue-500 transition-colors self-center flex-shrink-0"
                  title="Mark as read"
                >
                  <Check className="w-4 h-4" />
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default NotificationCenter;
