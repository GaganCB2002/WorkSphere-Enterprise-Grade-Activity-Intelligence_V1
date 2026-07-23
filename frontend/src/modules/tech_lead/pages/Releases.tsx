// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Rocket, CheckCircle2, Clock, AlertTriangle, Tag, Calendar, GitBranch } from 'lucide-react';

export const Releases = () => {
  const [data, setData] = useState<any>(null);
  useEffect(() => { fetch('/api/tech-lead/projects/releases').then(r => r.json()).then(d => setData(d)).catch(() => {}); }, []);
  const releases = data?.releases || [
    { version: 'v2.4.1', branch: 'hotfix/payment-gateway', status: 'deploying', date: 'Today', notes: 'Payment gateway timeout fix' },
    { version: 'v2.4.0', branch: 'release/v2.4', status: 'live', date: 'May 20', notes: 'Dashboard redesign, AI insights' },
    { version: 'v2.3.0', branch: 'release/v2.3', status: 'live', date: 'May 5', notes: 'API rate limiting, audit logs' },
    { version: 'v2.2.0', branch: 'release/v2.2', status: 'rolled-back', date: 'Apr 22', notes: 'Migration v1 - rolled back' },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#0B0F19] text-slate-100 min-h-screen p-4 sm:p-6 space-y-6">
      <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2"><Rocket className="w-6 h-6 text-indigo-500" /> Releases</h1>
        <p className="text-xs text-slate-400 mt-0.5">Release management and deployment tracking</p>
      </div>
      <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl overflow-hidden backdrop-blur-md">
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider"><div className="col-span-2">Version</div><div className="col-span-3">Branch</div><div className="col-span-2">Status</div><div className="col-span-2">Date</div><div className="col-span-3">Notes</div></div>
        <div className="divide-y divide-slate-800">{releases.map((r, i) => (
          <div key={i} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-[#1E293B]/30 transition-colors">
            <div className="col-span-2"><span className="text-sm font-bold text-slate-200">{r.version}</span></div>
            <div className="col-span-3 flex items-center gap-1.5"><GitBranch className="w-3 h-3 text-[#8b949e]" /><span className="text-xs text-slate-400">{r.branch}</span></div>
            <div className="col-span-2"><span className={"text-xs font-bold px-2 py-1 rounded " + (r.status === 'live' ? 'bg-emerald-500/10 text-emerald-400' : r.status === 'deploying' ? 'bg-amber-500/10 text-amber-400' : 'bg-rose-500/10 text-rose-400')}>{r.status}</span></div>
            <div className="col-span-2"><span className="text-xs text-slate-400">{r.date}</span></div>
            <div className="col-span-3"><span className="text-xs text-slate-400">{r.notes}</span></div>
          </div>
        ))}</div>
      </div>
    </motion.div>
  );
};

