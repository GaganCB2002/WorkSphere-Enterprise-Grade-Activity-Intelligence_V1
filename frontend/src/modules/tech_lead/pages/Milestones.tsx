// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Flag, CheckCircle2, Clock, AlertTriangle, Calendar, Award } from 'lucide-react';

export const Milestones = () => {
  const [data, setData] = useState<any>(null);
  useEffect(() => { fetch('/api/tech-lead/projects/milestones').then(r => r.json()).then(d => setData(d)).catch(() => {}); }, []);
  const milestones = data?.milestones || [
    { title: 'v2.4 Release Candidate', due: 'Jun 1', status: 'on-track', owner: 'Sarah J.' },
    { title: 'Database Migration Complete', due: 'Jun 15', status: 'at-risk', owner: 'Alex D.' },
    { title: 'Security Audit Pass', due: 'Jul 1', status: 'on-track', owner: 'Mike T.' },
    { title: 'Q2 Code Freeze', due: 'Jul 15', status: 'upcoming', owner: 'Emma W.' },
    { title: 'Mobile Beta Launch', due: 'Aug 1', status: 'upcoming', owner: 'David O.' },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#0B0F19] text-slate-100 min-h-screen p-4 sm:p-6 space-y-6">
      <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2"><Flag className="w-6 h-6 text-indigo-500" /> Milestones</h1>
        <p className="text-xs text-slate-400 mt-0.5">Key project milestones and deadlines</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[{ label: 'On Track', count: '2', color: 'text-emerald-400' }, { label: 'At Risk', count: '1', color: 'text-rose-400' }, { label: 'Upcoming', count: '2', color: 'text-blue-400' }].map((s, i) => (
          <div key={i} className="bg-[#0F172A]/90 border border-slate-800/80 rounded-xl p-4 backdrop-blur-md"><p className="text-xs text-slate-400">{s.label}</p><p className={"text-2xl font-extrabold " + s.color}>{s.count}</p></div>
        ))}
      </div>
      <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl overflow-hidden backdrop-blur-md">
        <div className="divide-y divide-slate-800">{milestones.map((m, i) => (
          <div key={i} className="p-4 flex items-center justify-between hover:bg-[#1E293B]/30 transition-colors">
            <div className="flex items-center gap-4">
              <div className={"w-8 h-8 rounded-full flex items-center justify-center " + (m.status === 'on-track' ? 'bg-emerald-500/10' : m.status === 'at-risk' ? 'bg-rose-500/10' : 'bg-blue-500/10')}>
                <Flag className={"w-4 h-4 " + (m.status === 'on-track' ? 'text-emerald-400' : m.status === 'at-risk' ? 'text-rose-400' : 'text-blue-400')} />
              </div>
              <div><p className="text-sm font-bold text-slate-200">{m.title}</p><div className="flex items-center gap-3 mt-1 text-xs text-slate-400"><Calendar className="w-3 h-3" />{m.due}<span>Owner: {m.owner}</span></div></div>
            </div>
            <span className={"text-xs font-bold px-3 py-1 rounded " + (m.status === 'on-track' ? 'bg-emerald-500/10 text-emerald-400' : m.status === 'at-risk' ? 'bg-rose-500/10 text-rose-400' : 'bg-blue-500/10 text-blue-400')}>{m.status}</span>
          </div>
        ))}</div>
      </div>
    </motion.div>
  );
};

