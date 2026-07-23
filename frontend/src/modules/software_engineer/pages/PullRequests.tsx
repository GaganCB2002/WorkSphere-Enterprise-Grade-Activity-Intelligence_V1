// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GitPullRequest, CheckCircle2, XCircle, Clock, User, MessageSquare, GitMerge, AlertCircle, ArrowUpDown } from 'lucide-react';

export const PullRequests = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/software-engineer/pull-requests')
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-6 space-y-4 animate-pulse"><div className="h-20 bg-[#0F172A]/90 rounded-2xl" /><div className="h-96 bg-[#0F172A]/90 rounded-2xl" /></div>;

  const prs = data?.prs || [
    { id: 'PR-423', title: 'Auth middleware refactor', branch: 'feature/auth-refactor', author: 'Alex D.', status: 'Open', checks: { passing: 8, failing: 1, pending: 2 }, mergeable: true, reviewers: ['Sarah J.', 'Mike T.'], comments: 3, updatedAt: '2h ago' },
    { id: 'PR-422', title: 'Payment service migration v2', branch: 'feature/payment-v2', author: 'Mike T.', status: 'Open', checks: { passing: 6, failing: 3, pending: 1 }, mergeable: false, reviewers: ['Alex D.', 'Emma W.'], comments: 7, updatedAt: '5h ago' },
    { id: 'PR-421', title: 'Dashboard perf improvements', branch: 'perf/dashboard', author: 'Emma W.', status: 'Merged', checks: { passing: 11, failing: 0, pending: 0 }, mergeable: true, reviewers: ['Alex D.', 'Sarah J.'], comments: 2, updatedAt: '1d ago' },
    { id: 'PR-420', title: 'Database query optimization', branch: 'opt/db-queries', author: 'Alex D.', status: 'Open', checks: { passing: 9, failing: 0, pending: 2 }, mergeable: true, reviewers: ['Mike T.'], comments: 5, updatedAt: '3h ago' },
    { id: 'PR-419', title: 'Websocket reconnection fix', branch: 'fix/ws-reconnect', author: 'Sarah J.', status: 'Open', checks: { passing: 7, failing: 0, pending: 3 }, mergeable: true, reviewers: ['Alex D.'], comments: 1, updatedAt: '6h ago' },
    { id: 'PR-418', title: 'Add unit test coverage for services', branch: 'test/service-coverage', author: 'Mike T.', status: 'Merged', checks: { passing: 10, failing: 0, pending: 0 }, mergeable: true, reviewers: ['Alex D.', 'Emma W.'], comments: 4, updatedAt: '2d ago' },
    { id: 'PR-417', title: 'Fix memory leak in websocket pool', branch: 'fix/ws-memory', author: 'Alex D.', status: 'Declined', checks: { passing: 5, failing: 2, pending: 0 }, mergeable: false, reviewers: ['Sarah J.'], comments: 6, updatedAt: '3d ago' },
  ];

  const statusBadge = (s) => {
    switch (s) {
      case 'Merged': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case 'Declined': return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
      default: return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="bg-[#0B0F19] text-slate-100 min-h-screen p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
        <div>
          <div className="text-xs font-semibold text-indigo-400">Software Engineer Workspace</div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2"><GitPullRequest className="w-6 h-6 text-indigo-400" /> Pull Requests</h1>
          <p className="text-xs text-slate-400 mt-0.5">{prs.length} total &bull; {prs.filter(p => p.status === 'Open').length} open</p>
        </div>
      </div>

      <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl overflow-hidden backdrop-blur-md">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-800 bg-[#1E293B]/50">
                {['PR', 'Title', 'Branch', 'Author', 'Status', 'Checks', 'Mergeable', 'Reviewers', 'Comments', 'Updated'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {prs.map((pr, idx) => (
                <motion.tr key={pr.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.03 }}
                  className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-all cursor-pointer">
                  <td className="px-4 py-3 text-xs font-mono font-bold text-indigo-400">{pr.id}</td>
                  <td className="px-4 py-3 text-xs font-semibold text-slate-200 max-w-[200px] truncate">{pr.title}</td>
                  <td className="px-4 py-3 text-xs text-slate-400 font-mono max-w-[150px] truncate">{pr.branch}</td>
                  <td className="px-4 py-3"><div className="flex items-center gap-1.5 text-xs text-slate-300"><div className="w-5 h-5 rounded-full bg-indigo-900 border border-indigo-500/30 flex items-center justify-center text-[8px] font-bold text-indigo-400">{pr.author.split(' ').map(w => w[0]).join('')}</div>{pr.author}</div></td>
                  <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${statusBadge(pr.status)}`}>{pr.status}</span></td>
                  <td className="px-4 py-3"><div className="flex items-center gap-1 text-xs">
                    <span className="text-emerald-400 font-bold">{pr.checks.passing}</span>
                    {pr.checks.failing > 0 && <span className="text-rose-400 font-bold">/{pr.checks.failing}</span>}
                    {pr.checks.pending > 0 && <span className="text-amber-400 font-bold">/{pr.checks.pending}</span>}
                  </div></td>
                  <td className="px-4 py-3">{pr.mergeable ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <XCircle className="w-4 h-4 text-rose-400" />}</td>
                  <td className="px-4 py-3"><div className="flex -space-x-1.5">{pr.reviewers.map((r, i) => (<div key={i} className="w-5 h-5 rounded-full bg-amber-900 border border-amber-500/30 flex items-center justify-center text-[8px] font-bold text-amber-400">{r.split(' ').map(w => w[0]).join('')}</div>))}</div></td>
                  <td className="px-4 py-3"><div className="flex items-center gap-1 text-xs text-slate-400"><MessageSquare className="w-3.5 h-3.5" />{pr.comments}</div></td>
                  <td className="px-4 py-3 text-xs text-slate-400">{pr.updatedAt}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};
