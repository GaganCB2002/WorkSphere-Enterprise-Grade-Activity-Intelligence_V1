// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GitPullRequest, GitMerge, Check, X, Code2, Clock, MessageSquare, AlertCircle, Sparkles, User } from 'lucide-react';

export const CodeReviewsNew = () => {
  const [data, setData] = useState<any>(null);
  useEffect(() => { fetch('/api/tech-lead/code/reviews').then(r => r.json()).then(d => setData(d)).catch(() => {}); }, []);
  const reviews = data?.reviews || [
    { id: 'PR-1042', title: 'feat: migrate to Next.js 15', author: 'Sarah J.', branch: 'feat/next15', target: 'develop', additions: 420, deletions: 112, status: 'review_required', conflicts: false, ciStatus: 'passed', comments: 4 },
    { id: 'PR-1043', title: 'fix: resolve WinRT geolocation', author: 'David R.', branch: 'fix/winrt-gps', target: 'develop', additions: 64, deletions: 88, status: 'changes_requested', conflicts: false, ciStatus: 'failed', comments: 12 },
    { id: 'PR-1044', title: 'feat(ai): integrate LSTM endpoint', author: 'Alex D.', branch: 'feat/ai-lstm', target: 'develop', additions: 850, deletions: 45, status: 'review_required', conflicts: true, ciStatus: 'running', comments: 1 },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#0B0F19] text-slate-100 min-h-screen p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
        <div><h1 className="text-2xl font-bold text-white flex items-center gap-2"><GitPullRequest className="w-6 h-6 text-indigo-500" /> Code Reviews</h1><p className="text-xs text-slate-400 mt-1">{reviews.length} pending reviews</p></div>
        <button className="flex items-center gap-2 bg-[#1E293B] hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-md text-xs font-semibold border border-slate-700/60"><Code2 className="w-4 h-4" /> Quality Rules</button>
      </div>
      <div className="space-y-4">{reviews.map((pr, i) => (
        <div key={i} className="bg-[#0F172A]/90 border border-slate-800/80 rounded-xl overflow-hidden hover:border-slate-700/80 transition-colors">
          <div className="p-4 sm:p-5">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1.5">
                  <GitPullRequest className={"w-4 h-4 " + (pr.status === 'changes_requested' ? 'text-amber-500' : 'text-emerald-500')} />
                  <h3 className="font-bold text-sm text-slate-200 hover:text-indigo-400 cursor-pointer">{pr.title}</h3>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#8b949e]"><span className="font-mono text-indigo-400">#{pr.id}</span><span>by</span><span className="font-bold text-slate-300">{pr.author}</span></div>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold"><span className="text-emerald-400">+{pr.additions}</span><span className="text-slate-500">/</span><span className="text-rose-400">-{pr.deletions}</span></div>
            </div>
            <div className="flex items-center gap-2 mb-4 text-xs font-mono text-[#8b949e] bg-[#1E293B] px-3 py-1.5 rounded-md border border-slate-700/60 w-max"><span>{pr.branch}</span><GitMerge className="w-3 h-3 text-slate-500 mx-1" /><span>{pr.target}</span></div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-800">
              <div className="flex items-center gap-4 text-xs">
                <span className={"flex items-center gap-1.5 font-bold " + (pr.ciStatus === 'passed' ? 'text-emerald-500' : pr.ciStatus === 'failed' ? 'text-rose-500' : 'text-indigo-500')}>{pr.ciStatus === 'passed' ? <Check className="w-4 h-4" /> : pr.ciStatus === 'failed' ? <X className="w-4 h-4" /> : <Clock className="w-4 h-4" />}CI {pr.ciStatus}</span>
                {pr.conflicts && <span className="flex items-center gap-1.5 font-bold text-rose-500 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20"><AlertCircle className="w-3.5 h-3.5" /> Conflicts</span>}
                <span className="flex items-center gap-1.5 font-bold text-slate-400"><MessageSquare className="w-4 h-4" />{pr.comments}</span>
              </div>
              <div className="flex items-center gap-2"><button className="bg-[#1E293B] hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-md text-xs font-bold">Review Files</button><button className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-1.5 rounded-md text-xs font-bold" disabled={pr.conflicts || pr.ciStatus === 'failed'}>Approve</button></div>
            </div>
          </div>
        </div>
      ))}</div>
    </motion.div>
  );
};

