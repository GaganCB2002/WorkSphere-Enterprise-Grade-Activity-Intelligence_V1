// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GitPullRequest, MessageSquare, CheckCircle2, XCircle, Clock, User, FileText, AlertCircle, ThumbsUp } from 'lucide-react';

export const CodeReviews = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/software-engineer/code-reviews')
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-6 space-y-4 animate-pulse"><div className="h-20 bg-[#0F172A]/90 rounded-2xl" /><div className="grid grid-cols-2 gap-4"><div className="h-48" /><div className="h-48" /></div></div>;

  const reviews = data?.reviews || [
    { id: 'PR-423', title: 'Auth middleware refactor', author: 'Sarah J.', files: 8, additions: 245, deletions: 89, comments: 3, approvals: 1, status: 'Open', updatedAt: '2h ago' },
    { id: 'PR-422', title: 'Payment service migration v2', author: 'Mike T.', files: 14, additions: 890, deletions: 420, comments: 7, approvals: 0, status: 'Changes Requested', updatedAt: '5h ago' },
    { id: 'PR-421', title: 'Dashboard performance improvements', author: 'Emma W.', files: 6, additions: 120, deletions: 45, comments: 2, approvals: 2, status: 'Approved', updatedAt: '1d ago' },
    { id: 'PR-420', title: 'Database query optimization', author: 'Alex D.', files: 4, additions: 67, deletions: 23, comments: 5, approvals: 1, status: 'Open', updatedAt: '3h ago' },
    { id: 'PR-419', title: 'Fix websocket reconnection logic', author: 'Sarah J.', files: 3, additions: 45, deletions: 12, comments: 1, approvals: 0, status: 'Open', updatedAt: '6h ago' },
    { id: 'PR-418', title: 'Add unit test coverage for services', author: 'Mike T.', files: 12, additions: 560, deletions: 30, comments: 4, approvals: 2, status: 'Approved', updatedAt: '2d ago' },
  ];

  const statusColor = (s) => {
    switch (s) {
      case 'Approved': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case 'Changes Requested': return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
      default: return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="bg-[#0B0F19] text-slate-100 min-h-screen p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
        <div>
          <div className="text-xs font-semibold text-indigo-400">Software Engineer Workspace</div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2"><GitPullRequest className="w-6 h-6 text-indigo-400" /> Code Reviews</h1>
          <p className="text-xs text-slate-400 mt-0.5">{reviews.length} pull requests pending your review</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Open', count: reviews.filter(r => r.status === 'Open').length, color: 'text-amber-400', bg: 'bg-amber-500/10' },
          { label: 'Approved', count: reviews.filter(r => r.status === 'Approved').length, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
          { label: 'Changes Requested', count: reviews.filter(r => r.status === 'Changes Requested').length, color: 'text-rose-400', bg: 'bg-rose-500/10' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-4 backdrop-blur-md">
            <div className="text-2xl font-extrabold text-white">{stat.count}</div>
            <div className="text-xs text-slate-400">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        {reviews.map((pr, idx) => (
          <motion.div key={pr.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}
            className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-4 backdrop-blur-md hover:border-indigo-500/40 transition-all cursor-pointer">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
                  <GitPullRequest className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono font-bold text-indigo-400">{pr.id}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${statusColor(pr.status)}`}>{pr.status}</span>
                  </div>
                  <h3 className="text-sm font-bold text-white">{pr.title}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">by {pr.author} &bull; {pr.updatedAt}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 mt-3 pt-3 border-t border-slate-800">
              <div className="flex items-center gap-1.5 text-xs text-slate-400"><FileText className="w-3.5 h-3.5" />{pr.files} files</div>
              <div className="flex items-center gap-1.5 text-xs text-emerald-400"><span className="font-bold">+{pr.additions}</span></div>
              <div className="flex items-center gap-1.5 text-xs text-rose-400"><span className="font-bold">-{pr.deletions}</span></div>
              <div className="flex items-center gap-1.5 text-xs text-slate-400"><MessageSquare className="w-3.5 h-3.5" />{pr.comments}</div>
              <div className="flex items-center gap-1.5 text-xs text-emerald-400"><ThumbsUp className="w-3.5 h-3.5" />{pr.approvals}</div>
              <div className="flex-1" />
              <button className="text-xs font-bold text-indigo-400 hover:text-indigo-300">Review</button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
