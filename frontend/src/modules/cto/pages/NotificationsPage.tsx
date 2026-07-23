import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Mail, AlertTriangle, Info, CheckCheck, Filter, Clock } from 'lucide-react';
import CtoPageShell from '../CtoPageShell';

const kpis = [
  { label: 'Unread', value: '12', icon: Bell, color: 'text-blue-500' },
  { label: 'Today', value: '24', icon: Clock, color: 'text-emerald-500' },
  { label: 'This Week', value: '84', icon: Mail, color: 'text-purple-500' },
  { label: 'Alerts', value: '3', icon: AlertTriangle, color: 'text-red-500' },
];

const notifications = [
  { id: 1, type: 'alert', message: 'CPU threshold exceeded on GPU-A100-02 (87%)', time: '5 min ago', read: false },
  { id: 2, type: 'info', message: 'Sprint 14 planning completed - 342 points committed', time: '15 min ago', read: false },
  { id: 3, type: 'warning', message: 'AWS monthly budget at 82% - $234,000 spent', time: '1 hr ago', read: false },
  { id: 4, type: 'success', message: 'Production deployment v3.2.1 successful', time: '2 hr ago', read: true },
  { id: 5, type: 'info', message: 'New architecture review scheduled: API Gateway v2', time: '3 hr ago', read: true },
  { id: 6, type: 'warning', message: 'Renewal due: GCP Annual Commitment (May 2025)', time: '5 hr ago', read: true },
  { id: 7, type: 'alert', message: 'Security scan found 2 medium vulnerabilities', time: '1 day ago', read: true },
  { id: 8, type: 'success', message: 'Q2 engineering OKRs on track (87% completed)', time: '2 days ago', read: true },
  { id: 9, type: 'info', message: 'Data warehouse query performance degraded', time: '2 days ago', read: true },
  { id: 10, type: 'warning', message: 'License renewal: New Relic Pro expiring Jun 2025', time: '3 days ago', read: true },
];

const typeStyles = {
  alert: { bg: 'bg-red-50 dark:bg-red-500/10', icon: AlertTriangle, color: 'text-red-500', dot: 'bg-red-500' },
  warning: { bg: 'bg-amber-50 dark:bg-amber-500/10', icon: AlertTriangle, color: 'text-amber-500', dot: 'bg-amber-500' },
  info: { bg: 'bg-blue-50 dark:bg-blue-500/10', icon: Info, color: 'text-blue-500', dot: 'bg-blue-500' },
  success: { bg: 'bg-emerald-50 dark:bg-emerald-500/10', icon: CheckCheck, color: 'text-emerald-500', dot: 'bg-emerald-500' },
};

const NotificationsPage = () => {
  const [filter, setFilter] = useState('all');
  const [items, setItems] = useState(notifications);

  const filtered = filter === 'all' ? items : filter === 'unread' ? items.filter(n => !n.read) : items.filter(n => n.type === filter);

  const markAllRead = () => setItems(prev => prev.map(n => ({ ...n, read: true })));

  const toggleRead = (id) => setItems(prev => prev.map(n => n.id === id ? { ...n, read: !n.read } : n));

  return (
    <CtoPageShell title="Notifications" description="View and manage notification alerts and activity updates">
      <div className="space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map((kpi, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{kpi.label}</div>
                  <div className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">{kpi.value}</div>
                </div>
                <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">Notification Feed</h3>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
                {['all', 'unread', 'alert', 'warning', 'info', 'success'].map(f => (
                  <button key={f} onClick={() => setFilter(f)}
                    className={`px-2 py-1 text-xs font-semibold rounded-md transition-colors ${filter === f ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
                    {f.charAt(0).toUpperCase() + f.slice(1)}
                  </button>
                ))}
              </div>
              <button onClick={markAllRead} className="px-3 py-1.5 text-xs font-semibold text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors">Mark all read</button>
            </div>
          </div>
          <div className="space-y-2">
            {filtered.map((n, i) => {
              const style = typeStyles[n.type] || typeStyles.info;
              const Icon = style.icon;
              return (
                <motion.div key={n.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
                  onClick={() => toggleRead(n.id)}
                  className={`flex items-start gap-3 p-4 rounded-lg cursor-pointer transition-all ${n.read ? 'bg-transparent' : 'bg-slate-50 dark:bg-slate-800/40'} hover:bg-slate-100 dark:hover:bg-slate-800/60`}>
                  <div className={`w-8 h-8 rounded-lg ${style.bg} flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-4 h-4 ${style.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className={`text-sm ${n.read ? 'text-slate-600 dark:text-slate-400' : 'text-slate-900 dark:text-white font-semibold'}`}>{n.message}</p>
                      {!n.read && <span className={`w-2 h-2 rounded-full ${style.dot} flex-shrink-0`} />}
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">{n.time}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </CtoPageShell>
  );
};

export default NotificationsPage;
