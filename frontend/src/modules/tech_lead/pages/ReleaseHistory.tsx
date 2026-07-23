// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { History, Tag, GitBranch, Calendar, User, CheckCircle2, AlertTriangle } from 'lucide-react';

export const ReleaseHistory = () => {
  const [data, setData] = useState<any>(null);
  useEffect(() => { fetch('/api/tech-lead/cicd/releases').then(r => r.json()).then(d => setData(d)).catch(() => {}); }, []);
  const releases = data?.releases || [
    { version: 'v2.4.0', date: 'May 20, 2026', author: 'Sarah J.', branch: 'release/v2.4', status: 'stable', notes: 'Dashboard redesign, AI insights' },
    { version: 'v2.3.0', date: 'May 5, 2026', author: 'Alex D.', branch: 'release/v2.3', status: 'stable', notes: 'API rate limiting, audit logs' },
    { version: 'v2.2.0', date: 'Apr 22, 2026', author: 'Mike T.', branch: 'release/v2.2', status: 'unstable', notes: 'Migration v1' },
    { version: 'v2.1.0', date: 'Apr 8, 2026', author: 'Emma W.', branch: 'release/v2.1', status: 'stable', notes: 'UI component library' },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#0B0F19] text-slate-100 min-h-screen p-4 sm:p-6 space-y-6">
      <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2"><History className="w-6 h-6 text-indigo-500" /> Release History</h1>
        <p className="text-xs text-slate-400 mt-0.5">Historical release tracking</p>
      </div>
      <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl overflow-hidden backdrop-blur-md">
        <div className="divide-y divide-slate-800">{releases.map((r, i) => (
          <div key={i} className="p-4 flex items-start gap-4 hover:bg-[#1E293B]/30 transition-colors">
            <div className={"mt-1 w-8 h-8 rounded-full flex items-center justify-center " + (r.status === 'stable' ? 'bg-emerald-500/10' : 'bg-amber-500/10')}><Tag className={"w-4 h-4 " + (r.status === 'stable' ? 'text-emerald-400' : 'text-amber-400')} /></div>
            <div className="flex-1">
              <div className="flex items-center justify-between"><h3 className="font-bold text-sm text-slate-200">{r.version}</h3><span className={"text-xs font-bold px-2 py-0.5 rounded " + (r.status === 'stable' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400')}>{r.status}</span></div>
              <p className="text-xs text-slate-400 mt-1">{r.notes}</p>
              <div className="flex items-center gap-4 mt-2 text-xs text-slate-400"><span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{r.date}</span><span className="flex items-center gap-1"><User className="w-3 h-3" />{r.author}</span><span className="flex items-center gap-1"><GitBranch className="w-3 h-3" />{r.branch}</span></div>
            </div>
          </div>
        ))}</div>
      </div>
    </motion.div>
  );
};

