// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bell, CheckCheck, X, GitPullRequest, PlayCircle, CheckCircle2, XCircle, MessageSquare, Calendar, Clock, AlertTriangle, User, Star, Trash2 } from 'lucide-react';

export const Notifications = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    fetch('/api/software-engineer/notifications')
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-6 space-y-4 animate-pulse"><div className="h-20 bg-[#0F172A]/90 rounded-2xl" /><div className="space-y-2"><div className="h-16" /><div className="h-16" /><div className="h-16" /></div></div>;

  const notifications = data?.notifications || [
    { id: 1, type: 'task', title: 'Task Assigned', message: 'You have been assigned ENG-210: Implement Redis caching layer', time: '5m ago', read: false, icon: PlayCircle, color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
    { id: 2, type: 'review', title: 'Review Requested', message: 'Sarah J. requested your review on PR #423: Auth middleware refactor', time: '15m ago', read: false, icon: GitPullRequest, color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
    { id: 3, type: 'build', title: 'Build Failed', message: 'Build #1282 failed on feature/payment-v2 (commit h0i1j2m)', time: '30m ago', read: false, icon: XCircle, color: 'text-rose-400', bg: 'bg-rose-500/10' },
    { id: 4, type: 'deployment', title: 'Deployment Successful', message: 'v2.4.1 deployed to Production successfully', time: '1h ago', read: true, icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { id: 5, type: 'pipeline', title: 'Pipeline Failed', message: 'Deploy to Staging pipeline failed on stage: Health Check', time: '2h ago', read: false, icon: AlertTriangle, color: 'text-rose-400', bg: 'bg-rose-500/10' },
    { id: 6, type: 'mention', title: 'Mention', message: 'Mike T. mentioned you in PR #420: "Can Alex review the rate limiting changes?"', time: '3h ago', read: true, icon: MessageSquare, color: 'text-amber-400', bg: 'bg-amber-500/10' },
    { id: 7, type: 'meeting', title: 'Meeting Reminder', message: 'Daily Standup is in 15 minutes', time: '3h ago', read: true, icon: Calendar, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
    { id: 8, type: 'deadline', title: 'Deadline Alert', message: 'ENG-201: gRPC streaming is due tomorrow', time: '4h ago', read: false, icon: Clock, color: 'text-amber-400', bg: 'bg-amber-500/10' },
    { id: 9, type: 'deployment', title: 'Deployment Successful', message: 'v2.5.0-rc.1 deployed to Staging', time: '5h ago', read: true, icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { id: 10, type: 'review', title: 'PR Approved', message: 'Your PR #418 has been approved by 2 reviewers', time: '6h ago', read: true, icon: Star, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  ];

  const [items, setItems] = useState(notifications);

  const markRead = (id) => setItems(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  const markAllRead = () => setItems(prev => prev.map(n => ({ ...n, read: true })));
  const clearAll = () => setItems([]);

  const filtered = filter === 'All' ? items : filter === 'Unread' ? items.filter(n => !n.read) : items.filter(n => n.type === filter);

  const unreadCount = items.filter(n => !n.read).length;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="bg-[#0B0F19] text-slate-100 min-h-screen p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
        <div>
          <div className="text-xs font-semibold text-indigo-400">Software Engineer Workspace</div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2"><Bell className="w-6 h-6 text-amber-400" /> Notifications</h1>
          <p className="text-xs text-slate-400 mt-0.5">{items.length} notifications &bull; {unreadCount} unread</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={markAllRead} className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1E293B] hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold border border-slate-700"><CheckCheck className="w-4 h-4" /> Mark All Read</button>
          <button onClick={clearAll} className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1E293B] hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold border border-slate-700"><Trash2 className="w-4 h-4" /> Clear All</button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {['All', 'Unread', 'task', 'review', 'build', 'deployment', 'pipeline', 'mention', 'meeting', 'deadline'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-xl text-[10px] font-semibold border transition-all capitalize ${filter === f ? 'bg-indigo-600 text-white border-indigo-500/50' : 'bg-[#1E293B]/50 text-slate-400 border-slate-700/60 hover:text-white'}`}>{f}</button>
        ))}
      </div>

      <div className="space-y-2">
        {filtered.length === 0 && <div className="text-center py-12 text-slate-400 text-sm">No notifications</div>}
        {filtered.map((n, idx) => (
          <motion.div key={n.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.02 }}
            className={`bg-[#0F172A]/90 border rounded-2xl p-4 backdrop-blur-md hover:bg-slate-800/30 transition-all cursor-pointer ${n.read ? 'border-slate-800/80' : 'border-indigo-500/30 bg-indigo-500/[0.02]'}`}>
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-lg border border-slate-700/60 ${n.bg}`}><n.icon className={`w-4 h-4 ${n.color}`} /></div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className={`text-xs font-semibold ${n.read ? 'text-slate-300' : 'text-white'}`}>{n.title}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-500">{n.time}</span>
                    {!n.read && <div className="w-2 h-2 rounded-full bg-indigo-500" />}
                  </div>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">{n.message}</p>
                <div className="flex items-center gap-2 mt-2">
                  <button onClick={(e) => { e.stopPropagation(); markRead(n.id); }} className="text-[10px] text-indigo-400 hover:text-indigo-300 font-semibold">Mark Read</button>
                  <button onClick={(e) => { e.stopPropagation(); setItems(prev => prev.filter(item => item.id !== n.id)); }} className="text-[10px] text-slate-500 hover:text-rose-400 font-semibold">Dismiss</button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
