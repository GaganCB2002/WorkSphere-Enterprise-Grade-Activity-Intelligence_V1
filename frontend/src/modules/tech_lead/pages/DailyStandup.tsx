// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Clock, Users, CheckCircle2, AlertCircle, ArrowRight, Mic, Send } from 'lucide-react';

export const DailyStandup = () => {
  const [data, setData] = useState<any>(null);
  useEffect(() => { fetch('/api/tech-lead/meetings/standup').then(r => r.json()).then(d => setData(d)).catch(() => {}); }, []);
  const entries = data?.entries || [
    { name: 'Sarah J.', yesterday: 'Completed OAuth migration', today: 'Start API docs', blockers: 'None', emoji: '🚀' },
    { name: 'Alex D.', yesterday: 'Fixed Redis connection leak', today: 'Database migration task', blockers: 'Waiting for DB credentials', emoji: '🐛' },
    { name: 'Emma W.', yesterday: 'Wrote E2E tests for dashboard', today: 'PR review queue', blockers: 'None', emoji: '✅' },
    { name: 'Mike T.', yesterday: 'Deployed v2.4 to staging', today: 'Monitor rollout', blockers: 'None', emoji: '🚢' },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#0B0F19] text-slate-100 min-h-screen p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
        <div><h1 className="text-2xl font-bold text-white flex items-center gap-2"><MessageSquare className="w-6 h-6 text-indigo-500" /> Daily Standup</h1><p className="text-xs text-slate-400 mt-0.5">Today's standup &bull; 4 participants</p></div>
        <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-md text-xs font-semibold"><Mic className="w-4 h-4" /> Submit Update</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {entries.map((e, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
            <div className="flex items-center gap-3 mb-4"><div className="w-8 h-8 rounded-xl bg-indigo-900/50 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold text-xs">{e.name.split(' ').map(n => n[0]).join('')}</div><div><h3 className="font-bold text-sm text-slate-100">{e.name}</h3></div></div>
            <div className="space-y-3">
              <div className="bg-[#1E293B]/30 rounded-lg p-3 border border-slate-800/60"><p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Yesterday</p><p className="text-xs text-slate-300">{e.yesterday}</p></div>
              <div className="bg-[#1E293B]/30 rounded-lg p-3 border border-slate-800/60"><p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Today</p><p className="text-xs text-slate-300">{e.today}</p></div>
              <div className={"rounded-lg p-3 border flex items-center gap-2 " + (e.blockers === 'None' ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-rose-500/5 border-rose-500/20')}>
                {e.blockers === 'None' ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <AlertCircle className="w-3.5 h-3.5 text-rose-400" />}
                <div><p className="text-[10px] font-bold text-slate-400 uppercase">Blockers</p><p className={"text-xs " + (e.blockers === 'None' ? 'text-emerald-400' : 'text-rose-400')}>{e.blockers}</p></div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

