// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GitBranch, Shield, GitCommit, Calendar, User, AlertTriangle, CheckCircle2 } from 'lucide-react';

export const BranchManagement = () => {
  const [data, setData] = useState<any>(null);
  useEffect(() => { fetch('/api/tech-lead/code/branches').then(r => r.json()).then(d => setData(d)).catch(() => {}); }, []);
  const branches = data?.branches || [
    { name: 'main', protected: true, ahead: 0, behind: 0, lastCommit: '2h ago', author: 'Sarah J.' },
    { name: 'develop', protected: true, ahead: 12, behind: 3, lastCommit: '1h ago', author: 'Alex D.' },
    { name: 'feat/ai-lstm', protected: false, ahead: 8, behind: 15, lastCommit: '3h ago', author: 'Alex D.' },
    { name: 'fix/winrt-gps', protected: false, ahead: 4, behind: 10, lastCommit: '5h ago', author: 'David R.' },
    { name: 'hotfix/payment-gateway', protected: false, ahead: 2, behind: 0, lastCommit: '30m ago', author: 'Mike T.' },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#0B0F19] text-slate-100 min-h-screen p-4 sm:p-6 space-y-6">
      <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2"><GitBranch className="w-6 h-6 text-indigo-500" /> Branch Management</h1>
        <p className="text-xs text-slate-400 mt-0.5">{branches.length} branches across all repos</p>
      </div>
      <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl overflow-hidden backdrop-blur-md">
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider"><div className="col-span-3">Branch</div><div className="col-span-2">Protected</div><div className="col-span-2">Ahead/Behind</div><div className="col-span-2">Last Commit</div><div className="col-span-3">Author</div></div>
        <div className="divide-y divide-slate-800">{branches.map((b, i) => (
          <div key={i} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-[#1E293B]/30 transition-colors">
            <div className="col-span-3 flex items-center gap-2"><GitBranch className={"w-4 h-4 " + (b.protected ? 'text-indigo-400' : 'text-slate-400')} /><span className="text-sm font-bold text-slate-200">{b.name}</span></div>
            <div className="col-span-2">{b.protected ? <Shield className="w-4 h-4 text-emerald-400" /> : <span className="text-xs text-slate-400">No</span>}</div>
            <div className="col-span-2"><span className="text-xs text-slate-300">+{b.ahead} / -{b.behind}</span></div>
            <div className="col-span-2 flex items-center gap-1.5"><Calendar className="w-3 h-3 text-slate-400" /><span className="text-xs text-slate-400">{b.lastCommit}</span></div>
            <div className="col-span-3"><span className="text-xs text-slate-400">{b.author}</span></div>
          </div>
        ))}</div>
      </div>
    </motion.div>
  );
};

