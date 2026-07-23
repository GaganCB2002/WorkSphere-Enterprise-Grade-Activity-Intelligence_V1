// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GitCommit, GitBranch, Clock, User, FileText, ArrowUpDown, Search } from 'lucide-react';

export const Commits = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/software-engineer/commits')
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-6 space-y-4 animate-pulse"><div className="h-20 bg-[#0F172A]/90 rounded-2xl" /><div className="h-96 bg-[#0F172A]/90 rounded-2xl" /></div>;

  const commits = data?.commits || [
    { hash: 'a3f2c1d', message: 'feat: implement gRPC bi-directional streaming', author: 'Alex D.', avatar: 'AD', branch: 'feature/grpc-streaming', timestamp: '2:30 PM', date: 'Today', files: 8 },
    { hash: 'b4e5f6g', message: 'fix: resolve Redis connection pool leak', author: 'Alex D.', avatar: 'AD', branch: 'bugfix/redis-leak', timestamp: '1:15 PM', date: 'Today', files: 3 },
    { hash: 'c5d6e7h', message: 'chore: update dependency versions', author: 'Sarah J.', avatar: 'SJ', branch: 'develop', timestamp: '12:00 PM', date: 'Today', files: 2 },
    { hash: 'd6e7f8i', message: 'Merge PR #423: Auth middleware refactor', author: 'Alex D.', avatar: 'AD', branch: 'main', timestamp: '10:45 AM', date: 'Today', files: 14 },
    { hash: 'e7f8g9j', message: 'feat: add OpenAPI specs for v3', author: 'Emma W.', avatar: 'EW', branch: 'docs/api-v3', timestamp: '9:00 AM', date: 'Today', files: 5 },
    { hash: 'f8g9h0k', message: 'perf: optimize dashboard chart rendering', author: 'Emma W.', avatar: 'EW', branch: 'perf/dashboard', timestamp: '5:20 PM', date: 'Yesterday', files: 6 },
    { hash: 'g9h0i1l', message: 'test: add unit tests for payment service', author: 'Mike T.', avatar: 'MT', branch: 'test/service-coverage', timestamp: '3:00 PM', date: 'Yesterday', files: 12 },
    { hash: 'h0i1j2m', message: 'feat: add Stripe payment integration', author: 'Mike T.', avatar: 'MT', branch: 'feature/payment-v2', timestamp: '1:30 PM', date: 'Yesterday', files: 10 },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="bg-[#0B0F19] text-slate-100 min-h-screen p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
        <div>
          <div className="text-xs font-semibold text-indigo-400">Software Engineer Workspace</div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2"><GitCommit className="w-6 h-6 text-emerald-400" /> Commits</h1>
          <p className="text-xs text-slate-400 mt-0.5">{commits.length} commits in the last 2 days</p>
        </div>
      </div>

      <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl overflow-hidden backdrop-blur-md">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-800 bg-[#1E293B]/50">
                {['Hash', 'Message', 'Author', 'Branch', 'Files', 'Timestamp', 'Date'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {commits.map((c, idx) => (
                <motion.tr key={c.hash} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.03 }}
                  className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-all cursor-pointer">
                  <td className="px-4 py-3"><code className="text-xs font-mono font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">{c.hash.substring(0, 7)}</code></td>
                  <td className="px-4 py-3 text-xs font-semibold text-slate-200 max-w-xs truncate">{c.message}</td>
                  <td className="px-4 py-3"><div className="flex items-center gap-2 text-xs text-slate-300">
                    <div className="w-6 h-6 rounded-full bg-indigo-900 border border-indigo-500/30 flex items-center justify-center text-[9px] font-bold text-indigo-400">{c.avatar}</div>
                    {c.author}
                  </div></td>
                  <td className="px-4 py-3"><span className="text-xs font-mono font-bold text-slate-400">{c.branch}</span></td>
                  <td className="px-4 py-3"><div className="flex items-center gap-1 text-xs text-slate-400"><FileText className="w-3.5 h-3.5" />{c.files}</div></td>
                  <td className="px-4 py-3 text-xs text-slate-400">{c.timestamp}</td>
                  <td className="px-4 py-3"><span className={`text-xs font-semibold ${c.date === 'Today' ? 'text-emerald-400' : 'text-slate-400'}`}>{c.date}</span></td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};
