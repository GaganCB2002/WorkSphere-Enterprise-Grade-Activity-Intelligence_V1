import React, { useState } from 'react';
import { EmployeePageLayout } from '../../components/EmployeePageLayout';
import { GlassPanel } from '../../components/ui/GlassPanel';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Filter, Download, RefreshCw, Search, Bell, Mail, Smartphone, MessageSquare, Monitor, Clock } from 'lucide-react';

const notifications = [
  { id: 'email', label: 'Email Notifications', description: 'Receive updates via email', icon: Mail, enabled: true },
  { id: 'push', label: 'Push Notifications', description: 'Browser and mobile push alerts', icon: Smartphone, enabled: true },
  { id: 'sms', label: 'SMS Alerts', description: 'Critical alerts via text message', icon: MessageSquare, enabled: false },
  { id: 'digest', label: 'Weekly Digest', description: 'Weekly summary of all activity', icon: Clock, enabled: true },
  { id: 'desktop', label: 'Desktop Alerts', description: 'System tray notifications', icon: Monitor, enabled: false },
];

export default function NotificationPreferences() {
  const [toggles, setToggles] = useState<Record<string, boolean>>(Object.fromEntries(notifications.map(n => [n.id, n.enabled])));
  const toggle = (id: string) => setToggles(p => ({ ...p, [id]: !p[id] }));
  return (
    <EmployeePageLayout title="Notification Preferences" description="Manage how and when you receive notifications" breadcrumbs={['Employee', 'Settings', 'Notification Preferences']} actions={
      <div className="flex items-center gap-2">
        <button className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/[0.04] flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"><Filter className="w-4 h-4" /></button>
        <button className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/[0.04] flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"><RefreshCw className="w-4 h-4" /></button>
      </div>
    }>
      <GlassPanel className="p-6 max-w-2xl">
        <div className="space-y-1">
          {notifications.map(n => {
            const Icon = n.icon;
            return (
              <div key={n.id} className="flex items-center justify-between py-4 px-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center"><Icon className="w-4 h-4 text-slate-500" /></div>
                  <div>
                    <p className="text-xs font-semibold text-slate-900 dark:text-white">{n.label}</p>
                    <p className="text-[10px] text-slate-400">{n.description}</p>
                  </div>
                </div>
                <button onClick={() => toggle(n.id)} className={`relative w-10 h-5 rounded-full transition-colors ${toggles[n.id] ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'}`}>
                  <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${toggles[n.id] ? 'translate-x-5' : 'translate-x-0.5'}`} />
                </button>
              </div>
            );
          })}
        </div>
      </GlassPanel>
    </EmployeePageLayout>
  );
}
