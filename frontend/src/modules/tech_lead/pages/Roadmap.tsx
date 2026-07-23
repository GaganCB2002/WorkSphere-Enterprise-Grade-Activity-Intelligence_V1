// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, CheckCircle2, Clock, Target, Flag, ArrowRight } from 'lucide-react';

export const Roadmap = () => {
  const [data, setData] = useState<any>(null);
  useEffect(() => { fetch('/api/tech-lead/projects/roadmap').then(r => r.json()).then(d => setData(d)).catch(() => {}); }, []);
  const quarters = data?.quarters || [
    { q: 'Q2 2026', items: [{ title: 'Platform Migration Phase 1', status: 'in-progress', progress: 72 }, { title: 'Security Audit', status: 'completed', progress: 100 }, { title: 'API Rate Limiting', status: 'in-progress', progress: 60 }] },
    { q: 'Q3 2026', items: [{ title: 'AI Chatbot Integration', status: 'planned', progress: 10 }, { title: 'Mobile App Redesign', status: 'planned', progress: 0 }, { title: 'Dark Mode Support', status: 'planned', progress: 0 }] },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#0B0F19] text-slate-100 min-h-screen p-4 sm:p-6 space-y-6">
      <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2"><MapPin className="w-6 h-6 text-indigo-500" /> Product Roadmap</h1>
        <p className="text-xs text-slate-400 mt-0.5">Strategic engineering initiatives and milestones</p>
      </div>
      <div className="space-y-6">{quarters.map((q, i) => (
        <div key={i} className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-md">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><Calendar className="w-5 h-5 text-indigo-400" />{q.q}</h2>
          <div className="space-y-4">{q.items.map((item, j) => (
            <div key={j} className="flex items-center gap-4 p-4 bg-[#1E293B]/30 rounded-xl border border-slate-800/60">
              <div className={"w-8 h-8 rounded-full flex items-center justify-center " + (item.status === 'completed' ? 'bg-emerald-500/10' : item.status === 'in-progress' ? 'bg-amber-500/10' : 'bg-slate-500/10')}>
                {item.status === 'completed' ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : item.status === 'in-progress' ? <Clock className="w-4 h-4 text-amber-400" /> : <Target className="w-4 h-4 text-slate-400" />}
              </div>
              <div className="flex-1"><p className="text-sm font-bold text-slate-200">{item.title}</p><div className="flex items-center gap-2 mt-1"><div className="h-1.5 flex-1 bg-slate-800 rounded-full overflow-hidden"><div className={"h-full rounded-full " + (item.status === 'completed' ? 'bg-emerald-500' : item.status === 'in-progress' ? 'bg-amber-500' : 'bg-slate-600')} style={{width: item.progress + '%'}}></div></div><span className="text-xs text-slate-400 w-12">{item.progress}%</span></div></div>
              <span className={"text-xs font-bold px-2 py-1 rounded " + (item.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400' : item.status === 'in-progress' ? 'bg-amber-500/10 text-amber-400' : 'bg-slate-500/10 text-slate-400')}>{item.status}</span>
            </div>
          ))}</div>
        </div>
      ))}</div>
    </motion.div>
  );
};

