// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GitBranch, GitCommit, User, Shield, CheckCircle2, XCircle, Clock, ArrowUpDown } from 'lucide-react';

export const Branches = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/software-engineer/branches')
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-6 space-y-4 animate-pulse"><div className="h-20 bg-[#0F172A]/90 rounded-2xl" /><div className="h-96 bg-[#0F172A]/90 rounded-2xl" /></div>;

  const branches = data?.branches || [
    { name: 'main', lastCommit: 'Merge PR #423 - Auth refactor', author: 'Alex D.', age: '2h ago', protected: true, ciStatus: 'passing' },
    { name: 'develop', lastCommit: 'chore: update dependencies', author: 'Sarah J.', age: '4h ago', protected: true, ciStatus: 'passing' },
    { name: 'feature/grpc-streaming', lastCommit: 'feat: implement bi-directional streaming', author: 'Alex D.', age: '1h ago', protected: false, ciStatus: 'pending' },
    { name: 'feature/payment-v2', lastCommit: 'feat: add Stripe integration', author: 'Mike T.', age: '5h ago', protected: false, ciStatus: 'failing' },
    { name: 'bugfix/redis-leak', lastCommit: 'fix: resolve connection pool leak', author: 'Alex D.', age: '3h ago', protected: false, ciStatus: 'passing' },
    { name: 'perf/dashboard', lastCommit: 'perf: optimize chart rendering', author: 'Emma W.', age: '1d ago', protected: false, ciStatus: 'passing' },
    { name: 'release/v2.5.0', lastCommit: 'chore: prepare release v2.5.0', author: 'Mike T.', age: '2d ago', protected: true, ciStatus: 'passing' },
    { name: 'docs/api-v3', lastCommit: 'docs: add OpenAPI specs', author: 'Emma W.', age: '3d ago', protected: false, ciStatus: 'pending' },
  ];

  const ciBadge = (s) => {
    switch (s) {
      case 'passing': return { icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />, label: 'Passing', color: 'text-emerald-400' };
      case 'failing': return { icon: <XCircle className="w-3.5 h-3.5 text-rose-400" />, label: 'Failing', color: 'text-rose-400' };
      default: return { icon: <Clock className="w-3.5 h-3.5 text-amber-400" />, label: 'Pending', color: 'text-amber-400' };
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="bg-[#0B0F19] text-slate-100 min-h-screen p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
        <div>
          <div className="text-xs font-semibold text-indigo-400">Software Engineer Workspace</div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2"><GitBranch className="w-6 h-6 text-indigo-400" /> Branches</h1>
          <p className="text-xs text-slate-400 mt-0.5">{branches.length} branches &bull; {branches.filter(b => b.protected).length} protected</p>
        </div>
      </div>

      <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl overflow-hidden backdrop-blur-md">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-800 bg-[#1E293B]/50">
                {['Branch', 'Last Commit', 'Author', 'Age', 'Protected', 'CI Status'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {branches.map((b, idx) => (
                <motion.tr key={b.name} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.03 }}
                  className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-all cursor-pointer">
                  <td className="px-4 py-3"><div className="flex items-center gap-2">
                    <GitBranch className={`w-4 h-4 ${b.name === 'main' || b.name === 'develop' ? 'text-indigo-400' : 'text-slate-400'}`} />
                    <span className="text-xs font-mono font-bold text-white">{b.name}</span>
                  </div></td>
                  <td className="px-4 py-3 text-xs text-slate-200 max-w-xs truncate">{b.lastCommit}</td>
                  <td className="px-4 py-3"><div className="flex items-center gap-1.5 text-xs text-slate-300"><div className="w-5 h-5 rounded-full bg-indigo-900 border border-indigo-500/30 flex items-center justify-center text-[8px] font-bold text-indigo-400">{b.author.split(' ').map(w => w[0]).join('')}</div>{b.author}</div></td>
                  <td className="px-4 py-3 text-xs text-slate-400">{b.age}</td>
                  <td className="px-4 py-3">{b.protected ? <Shield className="w-4 h-4 text-emerald-400" /> : <span className="text-xs text-slate-500">No</span>}</td>
                  <td className="px-4 py-3"><div className="flex items-center gap-1.5 text-xs">{ciBadge(b.ciStatus).icon}<span className={ciBadge(b.ciStatus).color}>{ciBadge(b.ciStatus).label}</span></div></td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};
