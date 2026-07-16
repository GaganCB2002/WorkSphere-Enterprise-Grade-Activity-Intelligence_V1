import React, { useState } from 'react';
import { Bell, CheckCircle2, AlertTriangle, MessageSquare, Megaphone, Check } from 'lucide-react';

const mockNotifications = [
  { id: 1, type: 'alert', title: 'Budget Warning: Google Ads', message: 'Your "Global Awareness" campaign has reached 90% of its daily budget.', time: '10 mins ago', read: false },
  { id: 2, type: 'success', title: 'Campaign Launched', message: 'The "Q4 Enterprise Update" email blast has successfully sent to 124,500 subscribers.', time: '1 hour ago', read: false },
  { id: 3, type: 'mention', title: 'Alex Rivera mentioned you', message: '"@Sarah can you review the new ad copy for the LinkedIn retargeting campaign?"', time: '3 hours ago', read: true },
  { id: 4, type: 'system', title: 'Weekly Report Generated', message: 'Your customized Marketing Performance report is ready for download.', time: 'Yesterday', read: true },
  { id: 5, type: 'success', title: 'Goal Achieved', message: 'You have surpassed your monthly Lead Generation target by 15%!', time: 'Yesterday', read: true },
];

export const Notifications: React.FC = () => {
  const [filter, setFilter] = useState('All');

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-500 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <h1 className="font-headline text-4xl text-[#0f172a] dark:text-slate-100 font-bold tracking-tight mb-2">Notifications Center</h1>
          <p className="font-body text-[#475569] dark:text-slate-300 text-[15px]">Stay updated on campaigns, budgets, and team activities.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 text-[#0f172a] dark:text-slate-100 rounded-lg text-sm font-semibold hover:bg-[#f8fafc] dark:hover:bg-slate-800 transition-colors shadow-sm">
          <Check className="w-4 h-4" /> Mark All as Read
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
        <div className="flex items-center gap-6 px-6 py-4 border-b border-[#e2e8f0] dark:border-slate-800">
          {['All', 'Alerts', 'Mentions', 'System'].map(f => (
            <button 
              key={f} 
              onClick={() => setFilter(f)}
              className={`text-sm font-bold transition-colors ${filter === f ? 'text-[#0d47a1] dark:text-blue-400 border-b-2 border-[#0d47a1] pb-4 -mb-4' : 'text-[#64748b] dark:text-slate-400 hover:text-[#0f172a] dark:hover:text-white'}`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="divide-y divide-[#e2e8f0]">
          {mockNotifications.map(notification => (
            <div key={notification.id} className={`p-6 flex gap-4 transition-colors ${notification.read ? 'bg-white dark:bg-slate-900' : 'bg-[#f8fafc] dark:bg-slate-800'}`}>
              <div className="mt-1">
                {notification.type === 'alert' && <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center"><AlertTriangle className="w-5 h-5 text-rose-600" /></div>}
                {notification.type === 'success' && <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center"><CheckCircle2 className="w-5 h-5 text-emerald-600" /></div>}
                {notification.type === 'mention' && <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center"><MessageSquare className="w-5 h-5 text-blue-600" /></div>}
                {notification.type === 'system' && <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center"><Bell className="w-5 h-5 text-slate-600" /></div>}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className={`text-base font-bold ${notification.read ? 'text-[#334155] dark:text-slate-200' : 'text-[#0f172a] dark:text-slate-100'}`}>{notification.title}</h3>
                  <span className="text-xs font-semibold text-[#94a3b8] dark:text-slate-500">{notification.time}</span>
                </div>
                <p className="text-sm text-[#475569] dark:text-slate-300">{notification.message}</p>
              </div>
              {!notification.read && (
                <div className="w-2 h-2 rounded-full bg-[#0d47a1] dark:bg-blue-600 mt-2"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
