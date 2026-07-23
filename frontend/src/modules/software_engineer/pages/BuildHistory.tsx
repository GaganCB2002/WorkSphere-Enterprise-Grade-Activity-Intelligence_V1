// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Hammer, CheckCircle2, XCircle, Clock, User, GitCommit, GitBranch, FileText, Download } from 'lucide-react';
import { ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, BarChart, Bar } from 'recharts';

export const BuildHistory = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/software-engineer/build-history')
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-6 space-y-4 animate-pulse"><div className="h-20 bg-[#0F172A]/90 rounded-2xl" /><div className="h-96 bg-[#0F172A]/90 rounded-2xl" /></div>;

  const builds = data?.builds || [
    { id: 'B-1284', status: 'success', duration: '4m 32s', commit: 'a3f2c1d', branch: 'feature/grpc-streaming', triggeredBy: 'Alex D.', artifacts: ['worksphere-core.jar', 'coverage-report.xml'], timestamp: '2h ago' },
    { id: 'B-1283', status: 'success', duration: '8m 15s', commit: 'd6e7f8i', branch: 'main', triggeredBy: 'Alex D.', artifacts: ['worksphere-api.dll'], timestamp: '4h ago' },
    { id: 'B-1282', status: 'failed', duration: '2m 08s', commit: 'h0i1j2m', branch: 'feature/payment-v2', triggeredBy: 'Mike T.', artifacts: [], timestamp: '6h ago' },
    { id: 'B-1281', status: 'success', duration: '5m 20s', commit: 'c5d6e7h', branch: 'develop', triggeredBy: 'Sarah J.', artifacts: ['worksphere-core.jar'], timestamp: '8h ago' },
    { id: 'B-1280', status: 'running', duration: '-', commit: 'e7f8g9j', branch: 'docs/api-v3', triggeredBy: 'Emma W.', artifacts: [], timestamp: '10m ago' },
    { id: 'B-1279', status: 'success', duration: '3m 45s', commit: 'f8g9h0k', branch: 'perf/dashboard', triggeredBy: 'Emma W.', artifacts: ['dashboard-bundle.js'], timestamp: '1d ago' },
    { id: 'B-1278', status: 'success', duration: '6m 12s', commit: 'g9h0i1l', branch: 'test/service-coverage', triggeredBy: 'Mike T.', artifacts: ['coverage-report.xml'], timestamp: '1d ago' },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="bg-[#0B0F19] text-slate-100 min-h-screen p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
        <div>
          <div className="text-xs font-semibold text-indigo-400">Software Engineer Workspace</div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2"><Hammer className="w-6 h-6 text-amber-400" /> Build History</h1>
          <p className="text-xs text-slate-400 mt-0.5">{builds.length} builds &bull; {builds.filter(b => b.status === 'success').length} succeeded</p>
        </div>
      </div>

      <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl overflow-hidden backdrop-blur-md">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-800 bg-[#1E293B]/50">
                {['Build', 'Status', 'Duration', 'Commit', 'Branch', 'Triggered By', 'Artifacts', 'Timestamp'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {builds.map((b, idx) => (
                <motion.tr key={b.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.03 }}
                  className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-all cursor-pointer">
                  <td className="px-4 py-3 text-xs font-mono font-bold text-indigo-400">{b.id}</td>
                  <td className="px-4 py-3"><div className="flex items-center gap-1.5 text-xs">{b.status === 'success' ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : b.status === 'failed' ? <XCircle className="w-4 h-4 text-rose-400" /> : <Clock className="w-4 h-4 text-amber-400 animate-pulse" />}<span className={`font-semibold ${b.status === 'success' ? 'text-emerald-400' : b.status === 'failed' ? 'text-rose-400' : 'text-amber-400'}`}>{b.status}</span></div></td>
                  <td className="px-4 py-3 text-xs text-slate-400">{b.duration}</td>
                  <td className="px-4 py-3"><code className="text-xs font-mono font-bold text-indigo-400 bg-indigo-500/10 px-1.5 py-0.5 rounded border border-indigo-500/20">{b.commit.substring(0, 7)}</code></td>
                  <td className="px-4 py-3 text-xs text-slate-400 font-mono">{b.branch}</td>
                  <td className="px-4 py-3 text-xs text-slate-300">{b.triggeredBy}</td>
                  <td className="px-4 py-3"><div className="flex items-center gap-1">{b.artifacts.length > 0 ? b.artifacts.map((a, i) => <span key={i} className="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 px-1.5 py-0.5 rounded border border-indigo-500/20">{a}</span>) : <span className="text-[10px] text-slate-500">-</span>}</div></td>
                  <td className="px-4 py-3 text-xs text-slate-400">{b.timestamp}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};
