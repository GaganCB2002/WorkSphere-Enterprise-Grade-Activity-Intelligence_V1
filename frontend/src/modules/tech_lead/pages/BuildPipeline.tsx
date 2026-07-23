// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, CheckCircle2, XCircle, Clock, AlertTriangle, GitBranch, PlayCircle, RefreshCw } from 'lucide-react';

export const BuildPipeline = () => {
  const [data, setData] = useState<any>(null);
  useEffect(() => { fetch('/api/tech-lead/cicd/pipeline').then(r => r.json()).then(d => setData(d)).catch(() => {}); }, []);
  const pipelines = data?.pipelines || [
    { id: 'PL-1204', branch: 'main', commit: '8a3f2b1', status: 'passed', stage: 'Production', duration: '4m 32s', time: '10m ago' },
    { id: 'PL-1203', branch: 'develop', commit: '9b4c1d2', status: 'running', stage: 'Test', duration: '2m 15s', time: '5m ago' },
    { id: 'PL-1202', branch: 'feat/ai-lstm', commit: '7c2d3e4', status: 'failed', stage: 'Build', duration: '1m 08s', time: '15m ago' },
    { id: 'PL-1201', branch: 'main', commit: '6d1e2f3', status: 'passed', stage: 'Production', duration: '5m 01s', time: '1h ago' },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#0B0F19] text-slate-100 min-h-screen p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
        <div><h1 className="text-2xl font-bold text-white flex items-center gap-2"><Terminal className="w-6 h-6 text-indigo-500" /> Build Pipeline</h1><p className="text-xs text-slate-400 mt-1">CI/CD build pipeline status</p></div>
        <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-md text-xs font-semibold"><RefreshCw className="w-4 h-4" /> Trigger Build</button>
      </div>
      <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl overflow-hidden backdrop-blur-md">
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider"><div className="col-span-2">Pipeline</div><div className="col-span-2">Branch</div><div className="col-span-2">Commit</div><div className="col-span-2">Status</div><div className="col-span-2">Duration</div><div className="col-span-2">Time</div></div>
        <div className="divide-y divide-slate-800">{pipelines.map((p, i) => (
          <div key={i} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-[#1E293B]/30 transition-colors">
            <div className="col-span-2"><span className="text-xs font-mono text-indigo-400">{p.id}</span><br /><span className="text-[10px] text-slate-500">{p.stage}</span></div>
            <div className="col-span-2 flex items-center gap-1.5"><GitBranch className="w-3 h-3 text-slate-400" /><span className="text-xs text-slate-300">{p.branch}</span></div>
            <div className="col-span-2"><span className="text-xs font-mono text-slate-400">{p.commit}</span></div>
            <div className="col-span-2"><span className={"flex items-center gap-1 text-xs font-bold " + (p.status === 'passed' ? 'text-emerald-400' : p.status === 'running' ? 'text-indigo-400' : 'text-rose-400')}>{p.status === 'passed' ? <CheckCircle2 className="w-3.5 h-3.5" /> : p.status === 'running' ? <PlayCircle className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}{p.status}</span></div>
            <div className="col-span-2"><span className="text-xs text-slate-400">{p.duration}</span></div>
            <div className="col-span-2"><span className="text-xs text-slate-400">{p.time}</span></div>
          </div>
        ))}</div>
      </div>
    </motion.div>
  );
};

