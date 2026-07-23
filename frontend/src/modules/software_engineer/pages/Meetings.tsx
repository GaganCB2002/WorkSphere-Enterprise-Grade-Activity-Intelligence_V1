// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Video, Plus, Calendar, Clock, User, Link, ExternalLink, MoreHorizontal, Bell } from 'lucide-react';

export const Meetings = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/software-engineer/meetings')
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-6 space-y-4 animate-pulse"><div className="h-20 bg-[#0F172A]/90 rounded-2xl" /><div className="grid grid-cols-2 gap-4"><div className="h-48" /><div className="h-48" /></div></div>;

  const meetings = data?.meetings || [
    { id: 1, title: 'Daily Standup', date: 'Today', time: '9:00 AM', duration: '15 min', attendees: 8, joinLink: '#', type: 'Daily', recurring: true },
    { id: 2, title: 'Sprint Planning', date: 'Today', time: '2:00 PM', duration: '1 hr', attendees: 12, joinLink: '#', type: 'Planning', recurring: false },
    { id: 3, title: 'Frontend Architecture Review', date: 'Tomorrow', time: '10:00 AM', duration: '45 min', attendees: 5, joinLink: '#', type: 'Review', recurring: false },
    { id: 4, title: 'Backend Team Sync', date: 'Jul 25', time: '11:00 AM', duration: '30 min', attendees: 6, joinLink: '#', type: 'Sync', recurring: true },
    { id: 5, title: 'Sprint Retrospective', date: 'Jul 28', time: '3:00 PM', duration: '1 hr', attendees: 14, joinLink: '#', type: 'Retro', recurring: true },
    { id: 6, title: 'Product Demo - v2.5', date: 'Aug 1', time: '1:00 PM', duration: '1 hr', attendees: 20, joinLink: '#', type: 'Demo', recurring: false },
  ];

  const typeColor = (t) => {
    switch (t) {
      case 'Daily': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case 'Planning': return 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20';
      case 'Review': return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      case 'Sync': return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
      case 'Retro': return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
      case 'Demo': return 'text-purple-400 bg-purple-500/10 border-purple-500/20';
      default: return 'text-slate-400 bg-slate-500/10 border-slate-500/20';
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="bg-[#0B0F19] text-slate-100 min-h-screen p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
        <div>
          <div className="text-xs font-semibold text-indigo-400">Software Engineer Workspace</div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2"><Video className="w-6 h-6 text-indigo-400" /> Meetings</h1>
          <p className="text-xs text-slate-400 mt-0.5">{meetings.length} upcoming meetings</p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-xl text-xs font-semibold"><Plus className="w-4 h-4" /> Schedule Meeting</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {meetings.map((m, idx) => (
          <motion.div key={m.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}
            className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md hover:border-indigo-500/40 transition-all group">
            <div className="flex items-start justify-between mb-3">
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${typeColor(m.type)}`}>{m.type}</span>
              {m.recurring && <Clock className="w-4 h-4 text-slate-400" />}
            </div>
            <h3 className="text-sm font-bold text-white group-hover:text-indigo-300 mb-3">{m.title}</h3>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2"><Calendar className="w-3.5 h-3.5" />{m.date}</div>
              <div className="flex items-center gap-2"><Clock className="w-3.5 h-3.5" />{m.time} ({m.duration})</div>
              <div className="flex items-center gap-2"><User className="w-3.5 h-3.5" />{m.attendees} attendees</div>
            </div>
            <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-800">
              <button className="flex items-center gap-1 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-[10px] font-bold"><Video className="w-3.5 h-3.5" /> Join</button>
              <button className="flex items-center gap-1 px-3 py-1.5 bg-[#1E293B] hover:bg-slate-700 text-slate-300 rounded-lg text-[10px] font-bold border border-slate-700"><Bell className="w-3.5 h-3.5" /> Remind</button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
