// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Check, X, Clock, AlertTriangle, Filter } from 'lucide-react';

export const TeamAvailability = () => {
  const [data, setData] = useState<any>(null);
  useEffect(() => { fetch('/api/tech-lead/team/availability').then(r => r.json()).then(d => setData(d)).catch(() => {}); }, []);

  const members = data?.members || [
    { name: 'Sarah Jenkins', availability: '90%', status: 'available', nextLeave: null, timezone: 'EST' },
    { name: 'Alex Developer', availability: '60%', status: 'busy', nextLeave: null, timezone: 'PST' },
    { name: 'Mike Tech', availability: '0%', status: 'on-leave', nextLeave: 'May 22-25', timezone: 'GMT' },
    { name: 'Emma Watson', availability: '85%', status: 'available', nextLeave: null, timezone: 'EST' },
    { name: 'David Ops', availability: '75%', status: 'available', nextLeave: 'Jun 1-3', timezone: 'IST' },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#0B0F19] text-slate-100 min-h-screen p-4 sm:p-6 space-y-6">
      <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2"><Calendar className="w-6 h-6 text-indigo-500" /> Team Availability</h1>
        <p className="text-xs text-slate-400 mt-0.5">Sprint capacity and leave tracking</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {[{ label: 'Available', count: '3', color: 'text-emerald-400' }, { label: 'At Capacity', count: '1', color: 'text-amber-400' }, { label: 'On Leave', count: '1', color: 'text-rose-400' }].map((s, i) => (
          <div key={i} className="bg-[#0F172A]/90 border border-slate-800/80 rounded-xl p-4 backdrop-blur-md">
            <p className="text-xs text-slate-400">{s.label}</p><p className={"text-2xl font-extrabold " + s.color}>{s.count}</p>
          </div>
        ))}
      </div>
      <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl overflow-hidden backdrop-blur-md">
        <div className="p-4 border-b border-slate-800">
          <h2 className="text-sm font-bold text-white">Member Availability</h2>
        </div>
        <div className="divide-y divide-slate-800">{members.map((m, i) => (
          <div key={i} className="p-4 flex items-center justify-between hover:bg-[#1E293B]/30 transition-colors">
            <div className="flex items-center gap-3"><div><p className="text-sm font-bold text-slate-200">{m.name}</p><p className="text-xs text-slate-400">{m.timezone}</p></div></div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2"><div className="w-24 h-2 bg-slate-800 rounded-full overflow-hidden"><div className={"h-full rounded-full " + (m.availability === '0%' ? 'bg-rose-500 w-0' : parseInt(m.availability) > 75 ? 'bg-emerald-500' : 'bg-amber-500')} style={{width: m.availability}}></div></div><span className="text-xs font-bold text-slate-300 w-10">{m.availability}</span></div>
              <span className={"text-xs font-bold px-2 py-1 rounded " + (m.status === 'available' ? 'bg-emerald-500/10 text-emerald-400' : m.status === 'busy' ? 'bg-amber-500/10 text-amber-400' : 'bg-rose-500/10 text-rose-400')}>{m.status}</span>
              {m.nextLeave && <span className="text-xs text-slate-400">{m.nextLeave}</span>}
            </div>
          </div>
        ))}</div>
      </div>
    </motion.div>
  );
};

