// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Mail, GitCommit, AlertTriangle, Calendar, MoreVertical, Filter, Settings2, Shield, MapPin } from 'lucide-react';

export const TeamMembers = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => { fetch('/api/tech-lead/team/members').then(r => r.json()).then(d => { setData(d); setLoading(false); }).catch(() => setLoading(false)); }, []);

  const members = data?.members || [
    { id: '1', name: 'Sarah Jenkins', role: 'Senior Frontend', status: 'online', workload: 85, prs: 3, bugs: 1, avatar: 'SJ', location: 'Remote' },
    { id: '2', name: 'Alex Developer', role: 'Backend Dev', status: 'busy', workload: 110, prs: 1, bugs: 4, avatar: 'AD', location: 'Office', overloaded: true },
    { id: '3', name: 'Mike Tech', role: 'DevOps Engineer', status: 'offline', workload: 45, prs: 0, bugs: 0, avatar: 'MT', location: 'Remote', onLeave: true },
    { id: '4', name: 'Emma Watson', role: 'QA Automation', status: 'online', workload: 70, prs: 2, bugs: 2, avatar: 'EW', location: 'Office' },
    { id: '5', name: 'David Ops', role: 'SRE', status: 'online', workload: 65, prs: 1, bugs: 1, avatar: 'DO', location: 'Remote' },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#0B0F19] text-slate-100 min-h-screen p-4 sm:p-6 space-y-6">
      <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2"><Users className="w-6 h-6 text-indigo-500" /> Team Members</h1>
        <p className="text-xs text-slate-400 mt-0.5">{members.length} active members</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {members.map((m, idx) => (
          <motion.div key={m.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}
            className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md relative">
            {m.overloaded && <div className="absolute top-0 right-0 bg-rose-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-bl-lg rounded-tr-xl flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> OVERLOADED</div>}
            {m.onLeave && <div className="absolute top-0 right-0 bg-amber-500 text-slate-900 text-[9px] font-bold px-2 py-0.5 rounded-bl-lg rounded-tr-xl flex items-center gap-1"><Calendar className="w-3 h-3" /> ON LEAVE</div>}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-indigo-900/50 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold">{m.avatar}</div>
                  <div className={"absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-[#0F172A] " + (m.status === 'online' ? 'bg-emerald-500' : m.status === 'busy' ? 'bg-rose-500' : 'bg-slate-500')} />
                </div>
                <div><h3 className="font-bold text-sm text-slate-100">{m.name}</h3><p className="text-[#8b949e] text-xs">{m.role}</p></div>
              </div>
              <button className="text-[#8b949e] hover:text-slate-200"><MoreVertical className="w-4 h-4" /></button>
            </div>
            <div className="flex items-center gap-4 text-xs text-slate-400 mb-3"><MapPin className="w-3 h-3" />{m.location}</div>
            <div className="flex items-center gap-2 pt-3 border-t border-slate-800">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 bg-[#1E293B]/50 px-2 py-1 rounded border border-slate-700/60 flex-1 justify-center"><GitCommit className="w-3.5 h-3.5" /><span className="font-bold text-slate-300">{m.prs}</span> PRs</div>
              <div className="flex items-center gap-1.5 text-xs text-slate-400 bg-[#1E293B]/50 px-2 py-1 rounded border border-slate-700/60 flex-1 justify-center"><AlertTriangle className="w-3.5 h-3.5" /><span className="font-bold text-slate-300">{m.bugs}</span> Bugs</div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

