import React from 'react';
import { Bell, ShieldCheck } from 'lucide-react';
import { NotificationCenter } from '../components/notifications/NotificationCenter';
import { GlassPanel } from '../components/ui/GlassPanel';
import { useNotificationStore } from '../store/employeeStore';

export function NotificationsPage() {
  const { unreadCount } = useNotificationStore();

  return (
    <div className="space-y-6 pb-8">
      {/* Page Header */}
      <GlassPanel className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">Workspace Notifications</h1>
              <p className="text-xs text-slate-400 mt-0.5">Stay updated with leave approvals, task deadlines, and mentions</p>
            </div>
          </div>
          
          {unreadCount > 0 && (
            <div className="flex items-center gap-2 text-[10px] text-rose-500 font-bold bg-rose-50 dark:bg-rose-950/20 border border-rose-250 dark:border-rose-900/30 px-3.5 py-2 rounded-xl">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500" />
              </span>
              <span>{unreadCount} Unread Alerts</span>
            </div>
          )}
        </div>
      </GlassPanel>

      {/* Main Notification Center Container */}
      <div className="relative">
        <NotificationCenter />
      </div>
    </div>
  );
}

export default NotificationsPage;
