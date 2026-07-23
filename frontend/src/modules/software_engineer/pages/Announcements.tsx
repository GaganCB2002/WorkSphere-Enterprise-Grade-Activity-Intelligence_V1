// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Megaphone, Pin, ThumbsUp, MessageSquare, Plus, Calendar, User, Clock, MoreHorizontal, Star } from 'lucide-react';

export const Announcements = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/software-engineer/announcements')
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-6 space-y-4 animate-pulse"><div className="h-20 bg-[#0F172A]/90 rounded-2xl" /><div className="h-48 bg-[#0F172A]/90 rounded-2xl" /><div className="h-48 bg-[#0F172A]/90 rounded-2xl" /></div>;

  const announcements = data?.announcements || [
    { id: 1, title: 'v2.5.0 Release - Final Stretch!', content: 'We\'re entering the final week before the v2.5.0 release. Please ensure all high-priority PRs are merged by Thursday. Feature freeze starts Friday at 5 PM.', author: 'Alex D.', avatar: 'AD', date: 'Today', pinned: true, reactions: [{ emoji: '🎉', count: 12 }, { emoji: '🔥', count: 8 }], comments: 5 },
    { id: 2, title: 'New Development Environment Setup Guide', content: 'The new developer onboarding guide is now available in the knowledge base. It includes updated instructions for Docker setup, environment variables, and local development workflows.', author: 'Sarah J.', avatar: 'SJ', date: 'Yesterday', pinned: true, reactions: [{ emoji: '👍', count: 15 }], comments: 3 },
    { id: 3, title: 'Sprint 43 Retrospective - Friday @ 3 PM', content: 'Our sprint retrospective is scheduled for this Friday at 3 PM in the main conference room. Please come prepared with your feedback and suggestions.', author: 'Mike T.', avatar: 'MT', date: '2d ago', pinned: false, reactions: [{ emoji: '📅', count: 7 }], comments: 8 },
    { id: 4, title: 'Database Migration Scheduled for Saturday', content: 'We\'ll be performing a scheduled database migration this Saturday from 2 AM to 4 AM. The API will be in maintenance mode during this window.', author: 'Emma W.', avatar: 'EW', date: '3d ago', pinned: false, reactions: [{ emoji: '⚠️', count: 6 }, { emoji: '✅', count: 4 }], comments: 12 },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="bg-[#0B0F19] text-slate-100 min-h-screen p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
        <div>
          <div className="text-xs font-semibold text-indigo-400">Software Engineer Workspace</div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2"><Megaphone className="w-6 h-6 text-amber-400" /> Announcements</h1>
          <p className="text-xs text-slate-400 mt-0.5">{announcements.length} announcements &bull; {announcements.filter(a => a.pinned).length} pinned</p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-xl text-xs font-semibold"><Plus className="w-4 h-4" /> New Announcement</button>
      </div>

      <div className="space-y-4">
        {announcements.map((a, idx) => (
          <motion.div key={a.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}
            className={`bg-[#0F172A]/90 border rounded-2xl p-5 backdrop-blur-md ${a.pinned ? 'border-amber-500/30 bg-amber-500/[0.02]' : 'border-slate-800/80'}`}>
            {a.pinned && <div className="flex items-center gap-1 text-[10px] text-amber-400 mb-2"><Pin className="w-3 h-3" /> Pinned announcement</div>}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-900 border border-indigo-500/30 flex items-center justify-center text-xs font-bold text-indigo-400">{a.avatar}</div>
                <div><h2 className="text-sm font-bold text-white">{a.title}</h2><div className="flex items-center gap-2 text-[10px] text-slate-400"><span>{a.author}</span><span>&bull;</span><span className="flex items-center gap-1"><Clock className="w-3 h-3" />{a.date}</span></div></div>
              </div>
              <button className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800/50"><MoreHorizontal className="w-4 h-4" /></button>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">{a.content}</p>
            <div className="flex items-center justify-between pt-3 border-t border-slate-800">
              <div className="flex items-center gap-2">
                {a.reactions.map((r, i) => (
                  <button key={i} className="flex items-center gap-1 px-2 py-1 rounded-full bg-slate-800 border border-slate-700 text-[10px] text-slate-300 hover:bg-slate-700">{r.emoji} {r.count}</button>
                ))}
                <button className="px-2 py-1 rounded-full bg-slate-800 border border-slate-700 text-[10px] text-slate-400 hover:bg-slate-700">+</button>
              </div>
              <div className="flex items-center gap-1 text-xs text-slate-400"><MessageSquare className="w-4 h-4" />{a.comments} comments</div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
