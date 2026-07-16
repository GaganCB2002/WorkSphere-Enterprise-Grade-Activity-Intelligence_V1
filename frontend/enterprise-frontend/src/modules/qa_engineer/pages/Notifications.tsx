
import React, { useContext } from 'react';
import { Bell, AlertCircle, CheckCircle, AlertTriangle, Info, Filter } from 'lucide-react';
import { useNotifications } from '../data/hooks';
import { QaShellContext } from '../layout/QaShell';

const typeConfig = {
  alert: { icon: AlertCircle, bg: 'bg-rose-50 dark:bg-rose-900/20', text: 'text-rose-600 dark:text-rose-400', border: 'border-l-rose-500' },
  success: { icon: CheckCircle, bg: 'bg-emerald-50 dark:bg-emerald-900/20', text: 'text-emerald-600 dark:text-emerald-400', border: 'border-l-emerald-500' },
  warning: { icon: AlertTriangle, bg: 'bg-amber-50 dark:bg-amber-900/20', text: 'text-amber-600 dark:text-amber-400', border: 'border-l-amber-500' },
  info: { icon: Info, bg: 'bg-violet-50 dark:bg-violet-900/20', text: 'text-violet-600 dark:text-violet-400', border: 'border-l-violet-500' },
};

export const Notifications: React.FC = () => {
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  const { addToast } = useContext(QaShellContext);

  const handleMarkAll = () => {
    markAllAsRead();
    addToast('All notifications marked as read', 'success');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="px-2.5 py-1 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-[10px] font-bold uppercase tracking-wider">
              {unreadCount} Unread
            </div>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Notifications</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">System alerts and CI/CD test results</p>
        </div>
        {unreadCount > 0 && (
          <button onClick={handleMarkAll}
            className="px-5 py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-xl text-sm font-bold shadow-md shadow-violet-600/20 transition-all active:scale-95">
            Mark All as Read
          </button>
        )}
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
        {notifications.length === 0 && (
          <div className="p-12 text-center">
            <Bell className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
            <p className="text-sm font-semibold text-slate-500">No notifications</p>
          </div>
        )}
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {notifications.map(n => {
            const config = typeConfig[n.type];
            const Icon = config.icon;
            return (
              <div key={n.id}
                onClick={() => { if (!n.isRead) { markAsRead(n.id); addToast('Marked as read', 'info'); } }}
                className={`p-4 lg:p-5 flex gap-4 transition-colors cursor-pointer ${!n.isRead ? 'bg-slate-50/80 dark:bg-slate-800/40 border-l-4 border-l-violet-500' : 'hover:bg-slate-50 dark:hover:bg-slate-800/30'}`}>
                <div className={`p-2.5 rounded-full ${config.bg} shrink-0 h-fit`}>
                  <Icon className={`w-5 h-5 ${config.text}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className={`text-sm font-bold ${!n.isRead ? 'text-slate-900 dark:text-slate-100' : 'text-slate-500 dark:text-slate-400'}`}>
                        {n.title}
                      </h4>
                      <p className={`text-xs mt-0.5 ${!n.isRead ? 'text-slate-500 dark:text-slate-400' : 'text-slate-400 dark:text-slate-500'}`}>
                        {n.message}
                      </p>
                    </div>
                    {!n.isRead && <span className="w-2 h-2 rounded-full bg-violet-500 shrink-0 mt-2" />}
                  </div>
                  <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 mt-2 uppercase tracking-wider">
                    {getTimeAgo(n.timestamp)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

function getTimeAgo(date: Date): string {
  const diff = Date.now() - new Date(date).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins} min ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days > 1 ? 's' : ''} ago`;
}
