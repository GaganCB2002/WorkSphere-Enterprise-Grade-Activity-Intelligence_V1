// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GitPullRequest, Check, X, Clock, MessageSquare, AlertCircle, GitMerge, User, Code2 } from 'lucide-react';

export const PullRequests = () => {
  const [data, setData] = useState<any>(null);
  useEffect(() => { fetch('/api/tech-lead/code/pull-requests').then(r => r.json()).then(d => setData(d)).catch(() => {}); }, []);
  const prs = data?.prs || [
    { id: 'PR-1042', title: 'feat: migrate to Next.js 15', author: 'Sarah J.', branch: 'feat/next15', base: 'develop', additions: 420, deletions: 112, status: 'open', ci: 'passed', comments: 4 },
    { id: 'PR-1043', title: 'fix: resolve WinRT geolocation', author: 'David R.', branch: 'fix/winrt-gps', base: 'develop', additions: 64, deletions: 88, status: 'changes-requested', ci: 'failed', comments: 12 },
    { id: 'PR-1044', title: 'feat(ai): integrate LSTM endpoint', author: 'Alex D.', branch: 'feat/ai-lstm', base: 'main', additions: 850, deletions: 45, status: 'open', ci: 'running', comments: 1 },
    { id: 'PR-1045', title: 'chore: update dependencies', author: 'Emma W.', branch: 'chore/deps', base: 'develop', additions: 32, deletions: 28, status: 'merged', ci: 'passed', comments: 0 },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#0B0F19] text-slate-100 min-h-screen p-4 sm:p-6 space-y-6">
      <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2"><GitPullRequest className="w-6 h-6 text-indigo-500" /> Pull Requests</h1>
        <p className="text-xs text-slate-400 mt-0.5">{prs.filter(p => p.status === 'open' || p.status === 'changes-requested').length} open PRs</p>
      </div>
      <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl overflow-hidden backdrop-blur-md">
        <div className="divide-y divide-slate-800">{prs.map((pr, i) => (
          <div key={i} className="p-4 hover:bg-[#1E293B]/30 transition-colors cursor-pointer">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <GitPullRequest className={"w-4 h-4 " + (pr.status === 'merged' ? 'text-purple-400' : pr.status === 'changes-requested' ? 'text-amber-400' : 'text-emerald-500')} />
                  <h3 className="font-bold text-sm text-slate-200 hover:text-indigo-400">{pr.title}</h3>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#8b949e]"><span className="font-mono text-indigo-400">#{pr.id}</span> by <span className="font-bold text-slate-300">{pr.author}</span></div>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold"><span className="text-emerald-400">+{pr.additions}</span><span className="text-slate-500">/</span><span className="text-rose-400">-{pr.deletions}</span></div>
            </div>
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-800">
              <div className="flex items-center gap-3 text-xs">
                <span className={"flex items-center gap-1 font-bold " + (pr.ci === 'passed' ? 'text-emerald-500' : pr.ci === 'failed' ? 'text-rose-500' : 'text-indigo-500')}>{pr.ci === 'passed' ? <Check className="w-3.5 h-3.5" /> : pr.ci === 'failed' ? <X className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}CI {pr.ci}</span>
                <span className="flex items-center gap-1 text-slate-400"><MessageSquare className="w-3.5 h-3.5" />{pr.comments}</span>
              </div>
              <span className={"text-xs font-bold px-2 py-1 rounded " + (pr.status === 'merged' ? 'bg-purple-500/10 text-purple-400' : pr.status === 'changes-requested' ? 'bg-amber-500/10 text-amber-400' : 'bg-emerald-500/10 text-emerald-400')}>{pr.status}</span>
            </div>
          </div>
        ))}</div>
      </div>
    </motion.div>
  );
};

