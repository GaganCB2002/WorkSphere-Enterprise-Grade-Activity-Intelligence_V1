// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bell, CheckCheck, AlertTriangle, GitPullRequest, Calendar, MessageSquare, Rocket, Bug, Info, Settings2, Trash2 } from 'lucide-react';

export const NotificationsPage = () => {
  const [data, setData] = useState<any>(null);
  useEffect(() => { fetch('/api/tech-lead/notifications').then(r => r.json()).then(d => setData(d)).catch(() => {}); }, []);
  const notifications = data?.notifications || [
    { type: 'pr', title: 'PR #1042 needs your review', desc: 'Sarah J. requested review on feat/next15 branch', time: '10 min ago', read: false },
    { type: 'alert', title: 'API Latency Spike Detected', desc: 'Gateway latency exceeded 2000ms threshold', time: '25 min ago', read: false },
    { type: 'deployment', title: 'v2.4.1 Deployed to Production', desc: 'Hotfix for payment gateway timeout', time: '2 hours ago', read: true },
    { type: 'mention', title: 'Alex D. mentioned you in sprint-42', desc: '"@you can you review the migration plan?"', time: '3 hours ago', read: true },
    { type: 'calendar', title: 'Sprint Planning Tomorrow', desc: 'May 28 at 10:00 AM &bull; 6 attendees', time: '5 hours ago', read: true },
    { type: 'bug', title: 'Critical Bug: BUG-401', desc: 'Payment webhook timeout in production', time: '6 hours ago', read: true },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#0B0F19] text-slate-100 min-h-screen p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
        <div><h1 className="text-2xl font-bold text-white flex items-center gap-2"><Bell className="w-6 h-6 text-indigo-500" /> Notifications</h1><p className="text-xs text-slate-400 mt-0.5">{notifications.filter(n => !n.read).length} unread</p></div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1 text-xs text-indigo-400 font-bold hover:text-indigo-300"><CheckCheck className="w-4 h-4" /> Mark All Read</button>
          <button className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-200"><Settings2 className="w-4 h-4" /> Settings</button>
        </div>
      </div>
      <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl overflow-hidden backdrop-blur-md">
        <div className="divide-y divide-slate-800">{notifications.map((n, i) => (
          <div key={i} className={"p-4 flex items-start gap-4 hover:bg-[#1E293B]/30 transition-colors cursor-pointer " + (!n.read ? 'bg-indigo-500/5' : '')}>
            <div className={"mt-0.5 p-2 rounded-lg " + (n.type === 'pr' ? 'bg-indigo-500/10' : n.type === 'alert' ? 'bg-rose-500/10' : n.type === 'deployment' ? 'bg-emerald-500/10' : n.type === 'mention' ? 'bg-amber-500/10' : n.type === 'bug' ? 'bg-rose-500/10' : 'bg-blue-500/10')}>
              {n.type === 'pr' ? <GitPullRequest className="w-4 h-4 text-indigo-400" /> : n.type === 'alert' ? <AlertTriangle className="w-4 h-4 text-rose-400" /> : n.type === 'deployment' ? <Rocket className="w-4 h-4 text-emerald-400" /> : n.type === 'mention' ? <MessageSquare className="w-4 h-4 text-amber-400" /> : n.type === 'bug' ? <Bug className="w-4 h-4 text-rose-400" /> : <Calendar className="w-4 h-4 text-blue-400" />}
            </div>
            <div className="flex-1"><div className="flex items-center justify-between"><h3 className={"text-sm font-bold " + (n.read ? 'text-slate-200' : 'text-white')}>{n.title}</h3><span className="text-[10px] text-slate-500">{n.time}</span></div><p className="text-xs text-slate-400 mt-0.5">{n.desc}</p></div>
            {!n.read && <span className="w-2 h-2 rounded-full bg-indigo-500 mt-2"></span>}
          </div>
        ))}</div>
      </div>
    </motion.div>
  );
};

