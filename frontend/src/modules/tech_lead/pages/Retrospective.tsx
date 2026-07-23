// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, ThumbsUp, Lightbulb, AlertTriangle, CheckCircle2, ArrowRight, Users, Heart } from 'lucide-react';

export const Retrospective = () => {
  const [data, setData] = useState<any>(null);
  useEffect(() => { fetch('/api/tech-lead/meetings/retro').then(r => r.json()).then(d => setData(d)).catch(() => {}); }, []);
  const retro = data?.retro || { sprint: 'Sprint 42', date: 'May 28, 2026', participants: 6 };
  const items = data?.items || [
    { type: 'good', text: 'OAuth migration completed ahead of schedule' },
    { type: 'good', text: 'Team collaboration on code reviews improved' },
    { type: 'improve', text: 'Database migration task was underestimated' },
    { type: 'improve', text: 'Need better test coverage for new features' },
    { type: 'action', text: 'Break down large tasks into smaller tickets' },
    { type: 'action', text: 'Schedule knowledge sharing sessions' },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#0B0F19] text-slate-100 min-h-screen p-4 sm:p-6 space-y-6">
      <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2"><MessageSquare className="w-6 h-6 text-indigo-500" /> Sprint Retrospective</h1>
        <p className="text-xs text-slate-400 mt-0.5">{retro.sprint} &bull; {retro.date} &bull; {retro.participants} participants</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#0F172A]/90 border border-emerald-500/20 rounded-2xl p-5 backdrop-blur-md">
          <h2 className="text-sm font-bold text-emerald-400 flex items-center gap-2 mb-4"><CheckCircle2 className="w-4 h-4" /> Went Well</h2>
          <div className="space-y-3">{items.filter(i => i.type === 'good').map((item, i) => (
            <div key={i} className="p-3 bg-emerald-500/5 border border-emerald-500/10 rounded-lg"><p className="text-xs text-slate-300">{item.text}</p></div>
          ))}</div>
        </div>
        <div className="bg-[#0F172A]/90 border border-amber-500/20 rounded-2xl p-5 backdrop-blur-md">
          <h2 className="text-sm font-bold text-amber-400 flex items-center gap-2 mb-4"><AlertTriangle className="w-4 h-4" /> To Improve</h2>
          <div className="space-y-3">{items.filter(i => i.type === 'improve').map((item, i) => (
            <div key={i} className="p-3 bg-amber-500/5 border border-amber-500/10 rounded-lg"><p className="text-xs text-slate-300">{item.text}</p></div>
          ))}</div>
        </div>
        <div className="bg-[#0F172A]/90 border border-indigo-500/20 rounded-2xl p-5 backdrop-blur-md">
          <h2 className="text-sm font-bold text-indigo-400 flex items-center gap-2 mb-4"><Lightbulb className="w-4 h-4" /> Action Items</h2>
          <div className="space-y-3">{items.filter(i => i.type === 'action').map((item, i) => (
            <div key={i} className="p-3 bg-indigo-500/5 border border-indigo-500/10 rounded-lg"><p className="text-xs text-slate-300">{item.text}</p></div>
          ))}</div>
        </div>
      </div>
    </motion.div>
  );
};

