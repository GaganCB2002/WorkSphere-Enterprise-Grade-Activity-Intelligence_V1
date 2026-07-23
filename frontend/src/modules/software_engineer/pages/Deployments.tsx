// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Rocket, CheckCircle2, XCircle, Clock, RotateCcw, User, Tag, Globe, Server } from 'lucide-react';

export const Deployments = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/software-engineer/deployments')
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-6 space-y-4 animate-pulse"><div className="h-20 bg-[#0F172A]/90 rounded-2xl" /><div className="h-96 bg-[#0F172A]/90 rounded-2xl" /></div>;

  const deployments = data?.deployments || [
    { id: 'DEP-1284', version: 'v2.4.1', environment: 'Production', status: 'success', deployedBy: 'Alex D.', timestamp: '2h ago', duration: '8m 23s', rollback: true },
    { id: 'DEP-1283', version: 'v2.5.0-rc.1', environment: 'Staging', status: 'success', deployedBy: 'Mike T.', timestamp: '5h ago', duration: '6m 45s', rollback: true },
    { id: 'DEP-1282', version: 'v2.4.1', environment: 'Production', status: 'success', deployedBy: 'System', timestamp: '1d ago', duration: '7m 12s', rollback: true },
    { id: 'DEP-1281', version: 'v2.5.0-rc.1', environment: 'Development', status: 'failed', deployedBy: 'Sarah J.', timestamp: '1d ago', duration: '3m 05s', rollback: false },
    { id: 'DEP-1280', version: 'v2.4.0', environment: 'Production', status: 'success', deployedBy: 'Alex D.', timestamp: '3d ago', duration: '9m 01s', rollback: true },
    { id: 'DEP-1279', version: 'v2.5.0-rc.1', environment: 'Staging', status: 'running', deployedBy: 'Emma W.', timestamp: '5m ago', duration: '-', rollback: false },
    { id: 'DEP-1278', version: 'v2.4.0', environment: 'Development', status: 'success', deployedBy: 'Mike T.', timestamp: '4d ago', duration: '5m 33s', rollback: true },
  ];

  const envColor = (e) => {
    switch (e) {
      case 'Production': return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
      case 'Staging': return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      case 'Development': return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
      default: return 'text-slate-400 bg-slate-500/10 border-slate-500/20';
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="bg-[#0B0F19] text-slate-100 min-h-screen p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
        <div>
          <div className="text-xs font-semibold text-indigo-400">Software Engineer Workspace</div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2"><Rocket className="w-6 h-6 text-emerald-400" /> Deployments</h1>
          <p className="text-xs text-slate-400 mt-0.5">{deployments.length} deployments</p>
        </div>
      </div>

      <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl overflow-hidden backdrop-blur-md">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-800 bg-[#1E293B]/50">
                {['ID', 'Version', 'Environment', 'Status', 'Deployed By', 'Duration', 'Timestamp', 'Actions'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {deployments.map((d, idx) => (
                <motion.tr key={d.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.03 }}
                  className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-all">
                  <td className="px-4 py-3 text-xs font-mono font-bold text-indigo-400">{d.id}</td>
                  <td className="px-4 py-3"><span className="text-xs font-mono font-bold text-white">{d.version}</span></td>
                  <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${envColor(d.environment)}`}>{d.environment}</span></td>
                  <td className="px-4 py-3"><div className="flex items-center gap-1.5 text-xs">{d.status === 'success' ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : d.status === 'failed' ? <XCircle className="w-4 h-4 text-rose-400" /> : <Clock className="w-4 h-4 text-amber-400 animate-pulse" />}<span className={`font-semibold ${d.status === 'success' ? 'text-emerald-400' : d.status === 'failed' ? 'text-rose-400' : 'text-amber-400'}`}>{d.status}</span></div></td>
                  <td className="px-4 py-3"><div className="flex items-center gap-1.5 text-xs text-slate-300"><User className="w-3.5 h-3.5" />{d.deployedBy}</div></td>
                  <td className="px-4 py-3 text-xs text-slate-400">{d.duration}</td>
                  <td className="px-4 py-3 text-xs text-slate-400">{d.timestamp}</td>
                  <td className="px-4 py-3">{d.rollback && d.status !== 'running' ? <button className="flex items-center gap-1 text-[10px] font-bold text-amber-400 hover:text-amber-300 bg-amber-500/10 border border-amber-500/20 px-2 py-1 rounded-lg"><RotateCcw className="w-3 h-3" /> Rollback</button> : <span className="text-[10px] text-slate-500">-</span>}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};
