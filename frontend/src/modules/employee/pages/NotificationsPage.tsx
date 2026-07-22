import React from 'react';
import { Filter, Download, RefreshCw } from 'lucide-react';
import { EmployeePageLayout } from '../components/EmployeePageLayout';
import { NotificationCenter } from '../components/notifications/NotificationCenter';
import { useNotificationStore } from '../store/employeeStore';

export function NotificationsPage() {
  const { unreadCount, markAllRead } = useNotificationStore();

  return (
    <EmployeePageLayout
      title="Notifications"
      description={`${unreadCount} unread notifications`}
      breadcrumbs={[{ label: 'Employee', href: '/employee/dashboard' }, { label: 'Notifications' }]}
      actions={
        <div className="flex items-center gap-2">
          <button
            onClick={markAllRead}
            className="px-3 py-1.5 text-xs font-semibold text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-500/10 rounded-lg hover:bg-brand-100 dark:hover:bg-brand-500/20 transition-colors"
          >
            Mark All Read
          </button>
          <button className="p-2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors border border-slate-200 dark:border-slate-700 shadow-sm bg-white dark:bg-slate-900">
            <Filter className="w-4 h-4" />
          </button>
          <button className="p-2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors border border-slate-200 dark:border-slate-700 shadow-sm bg-white dark:bg-slate-900">
            <Download className="w-4 h-4" />
          </button>
          <button className="p-2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors border border-slate-200 dark:border-slate-700 shadow-sm bg-white dark:bg-slate-900">
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      }
    >
      <div className="relative">
        <NotificationCenter />
      </div>
    </EmployeePageLayout>
  );
}

export default NotificationsPage;
