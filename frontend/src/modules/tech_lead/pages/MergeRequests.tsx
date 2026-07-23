// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GitMerge, CheckCircle2, Clock, AlertTriangle, User, MessageSquare, GitBranch } from 'lucide-react';

export const MergeRequests = () => {
  const [data, setData] = useState<any>(null);
  useEffect(() => { fetch('/api/tech-lead/code/merge-requests').then(r => r.json()).then(d => setData(d)).catch(() => {}); }, []);
  const mrs = data?.mrs || [
    { id: 'MR-89', title: 'Release v2.4 staging merge', source: 'release/v2.4', target: 'staging', author: 'Sarah J.', status: 'open', conflicts: false, checks: 'passing' },
    { id: 'MR-90', title: 'Backend API hotfix merge', source: 'hotfix/api-timeout', target: 'main', author: 'Alex D.', status: 'open', conflicts: true, checks: 'failed' },
    { id: 'MR-88', title: 'Infra terraform update', source: 'infra/terraform-update', target: 'main', author: 'Mike T.', status: 'merged', conflicts: false, checks: 'passing' },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#0B0F19] text-slate-100 min-h-screen p-4 sm:p-6 space-y-6">
      <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2"><GitMerge className="w-6 h-6 text-indigo-500" /> Merge Requests</h1>
        <p className="text-xs text-slate-400 mt-0.5">Cross-branch merge tracking</p>
      </div>
      <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl overflow-hidden backdrop-blur-md">
        <div className="divide-y divide-slate-800">{mrs.map((mr, i) => (
          <div key={i} className="p-4 hover:bg-[#1E293B]/30 transition-colors cursor-pointer">
            <div className="flex items-start justify-between mb-3">
              <div><h3 className="font-bold text-sm text-slate-200">{mr.title}</h3><div className="flex items-center gap-2 mt-1 text-xs text-slate-400"><span className="font-mono text-indigo-400">#{mr.id}</span>by {mr.author}</div></div>
              <div className="flex items-center gap-2 text-xs font-mono"><GitBranch className="w-3 h-3 text-slate-400" /><span className="text-slate-300">{mr.source}</span><span className="text-slate-500">→</span><span className="text-indigo-400">{mr.target}</span></div>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-slate-800">
              <div className="flex items-center gap-3 text-xs">
                <span className={"flex items-center gap-1 font-bold " + (mr.checks === 'passing' ? 'text-emerald-400' : 'text-rose-400')}>{mr.checks === 'passing' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}Checks: {mr.checks}</span>
                {mr.conflicts && <span className="flex items-center gap-1 text-rose-400 font-bold"><AlertTriangle className="w-3.5 h-3.5" />Conflicts</span>}
              </div>
              <span className={"text-xs font-bold px-2 py-1 rounded " + (mr.status === 'merged' ? 'bg-purple-500/10 text-purple-400' : 'bg-emerald-500/10 text-emerald-400')}>{mr.status}</span>
            </div>
          </div>
        ))}</div>
      </div>
    </motion.div>
  );
};

