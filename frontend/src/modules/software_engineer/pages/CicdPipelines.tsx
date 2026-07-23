// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PlayCircle, CheckCircle2, XCircle, Clock, User, GitCommit, GitBranch, ArrowRight, AlertTriangle } from 'lucide-react';
import { ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, BarChart, Bar } from 'recharts';

export const CicdPipelines = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/software-engineer/cicd-pipelines')
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-6 space-y-4 animate-pulse"><div className="h-20 bg-[#0F172A]/90 rounded-2xl" /><div className="h-96 bg-[#0F172A]/90 rounded-2xl" /></div>;

  const pipelines = data?.pipelines || [
    { id: 'P-1284', name: 'Build & Test', branch: 'feature/grpc-streaming', commit: 'a3f2c1d', status: 'running', triggeredBy: 'Alex D.', duration: '4m 32s', stages: ['Checkout', 'Install', 'Lint', 'Test', 'Build'] },
    { id: 'P-1283', name: 'Build & Test', branch: 'main', commit: 'd6e7f8i', status: 'passed', triggeredBy: 'Alex D.', duration: '8m 15s', stages: ['Checkout', 'Install', 'Lint', 'Test', 'Build'] },
    { id: 'P-1282', name: 'Deploy to Staging', branch: 'main', commit: 'd6e7f8i', status: 'passed', triggeredBy: 'System', duration: '12m 42s', stages: ['Build Image', 'Push Registry', 'Deploy', 'Health Check', 'Smoke Test'] },
    { id: 'P-1281', name: 'Build & Test', branch: 'feature/payment-v2', commit: 'h0i1j2m', status: 'failed', triggeredBy: 'Mike T.', duration: '3m 08s', stages: ['Checkout', 'Install', 'Lint', 'Test'] },
    { id: 'P-1280', name: 'Dependency Scan', branch: 'develop', commit: 'c5d6e7h', status: 'passed', triggeredBy: 'System', duration: '5m 20s', stages: ['Scan', 'Report'] },
    { id: 'P-1279', name: 'Build & Test', branch: 'docs/api-v3', commit: 'e7f8g9j', status: 'pending', triggeredBy: 'Emma W.', duration: '-', stages: ['Checkout', 'Install', 'Lint', 'Test', 'Build'] },
  ];

  const statusIcon = (s) => {
    switch (s) {
      case 'passed': return <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
      case 'failed': return <XCircle className="w-5 h-5 text-rose-400" />;
      case 'running': return <PlayCircle className="w-5 h-5 text-blue-400 animate-pulse" />;
      default: return <Clock className="w-5 h-5 text-amber-400" />;
    }
  };

  const stageStatus = (idx, total, status) => {
    if (status === 'passed') return 'bg-emerald-500';
    if (status === 'failed') return idx <= total ? 'bg-rose-500' : 'bg-slate-700';
    if (status === 'running') return idx < total ? 'bg-emerald-500' : idx === total ? 'bg-blue-500 animate-pulse' : 'bg-slate-700';
    return 'bg-slate-700';
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="bg-[#0B0F19] text-slate-100 min-h-screen p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
        <div>
          <div className="text-xs font-semibold text-indigo-400">Software Engineer Workspace</div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2"><PlayCircle className="w-6 h-6 text-cyan-400" /> CI/CD Pipelines</h1>
          <p className="text-xs text-slate-400 mt-0.5">{pipelines.length} pipelines &bull; {pipelines.filter(p => p.status === 'running').length} running</p>
        </div>
      </div>

      <div className="space-y-3">
        {pipelines.map((p, idx) => (
          <motion.div key={p.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}
            className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-4 backdrop-blur-md hover:border-indigo-500/40 transition-all">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                {statusIcon(p.status)}
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-indigo-400">{p.id}</span>
                    <h3 className="text-sm font-bold text-white">{p.name}</h3>
                  </div>
                  <div className="flex items-center gap-3 mt-1 text-xs text-slate-400">
                    <span className="flex items-center gap-1"><GitBranch className="w-3.5 h-3.5" />{p.branch}</span>
                    <span className="flex items-center gap-1"><GitCommit className="w-3.5 h-3.5" />{p.commit.substring(0, 7)}</span>
                    <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" />{p.triggeredBy}</span>
                    {p.duration !== '-' && <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{p.duration}</span>}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1 mt-3 pt-3 border-t border-slate-800">
              {p.stages.map((stage, si) => (
                <React.Fragment key={stage}>
                  <div className="flex items-center gap-1">
                    <div className={`w-2.5 h-2.5 rounded-full ${stageStatus(si, p.stages.indexOf(p.stages.find((s, i) => {
                      if (p.status === 'failed') return i === p.stages.length - 1;
                      if (p.status === 'running') return i === p.stages.length - 1;
                      return i === p.stages.length - 1;
                    })), p.status)}`} />
                    <span className={`text-[10px] font-medium ${si < p.stages.length - 1 || p.status === 'passed' ? 'text-slate-400' : 'text-slate-500'}`}>{stage}</span>
                  </div>
                  {si < p.stages.length - 1 && <ArrowRight className="w-3 h-3 text-slate-700" />}
                </React.Fragment>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
