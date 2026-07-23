// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Rocket, CheckCircle2, XCircle, Clock, AlertTriangle, GitBranch, Globe, RefreshCw } from 'lucide-react';

export const Deployments = () => {
  const [data, setData] = useState<any>(null);
  useEffect(() => { fetch('/api/tech-lead/cicd/deployments').then(r => r.json()).then(d => setData(d)).catch(() => {}); }, []);
  const deployments = data?.deployments || [
    { id: 'DEP-501', version: 'v2.4.1', environment: 'staging', status: 'deploying', started: '2m ago', duration: '--' },
    { id: 'DEP-500', version: 'v2.4.0', environment: 'production', status: 'live', started: '2h ago', duration: '6m 32s' },
    { id: 'DEP-499', version: 'v2.3.0', environment: 'production', status: 'live', started: '2d ago', duration: '5m 12s' },
    { id: 'DEP-498', version: 'v2.2.0', environment: 'production', status: 'rolled-back', started: '5d ago', duration: '4m 18s' },
    { id: 'DEP-497', version: 'v2.3.0-rc', environment: 'staging', status: 'live', started: '2d ago', duration: '4m 45s' },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#0B0F19] text-slate-100 min-h-screen p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
        <div><h1 className="text-2xl font-bold text-white flex items-center gap-2"><Rocket className="w-6 h-6 text-indigo-500" /> Deployments</h1><p className="text-xs text-slate-400 mt-1">Deployment history and status</p></div>
        <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-md text-xs font-semibold"><Rocket className="w-4 h-4" /> New Deployment</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {[{ label: 'Live', count: '3', color: 'text-emerald-400' }, { label: 'Deploying', count: '1', color: 'text-indigo-400' }, { label: 'Failed', count: '0', color: 'text-rose-400' }, { label: 'Rolled Back', count: '1', color: 'text-amber-400' }].map((s, i) => (
          <div key={i} className="bg-[#0F172A]/90 border border-slate-800/80 rounded-xl p-4 backdrop-blur-md"><p className="text-xs text-slate-400">{s.label}</p><p className={"text-2xl font-extrabold " + s.color}>{s.count}</p></div>
        ))}
      </div>
      <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl overflow-hidden backdrop-blur-md">
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider"><div className="col-span-2">ID</div><div className="col-span-2">Version</div><div className="col-span-2">Environment</div><div className="col-span-2">Status</div><div className="col-span-2">Duration</div><div className="col-span-2">Started</div></div>
        <div className="divide-y divide-slate-800">{deployments.map((d, i) => (
          <div key={i} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-[#1E293B]/30 transition-colors">
            <div className="col-span-2"><span className="text-xs font-mono text-indigo-400">{d.id}</span></div>
            <div className="col-span-2"><span className="text-sm font-bold text-slate-200">{d.version}</span></div>
            <div className="col-span-2"><span className={"text-xs font-bold px-2 py-1 rounded " + (d.environment === 'production' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400')}><Globe className="w-3 h-3 inline mr-1" />{d.environment}</span></div>
            <div className="col-span-2"><span className={"flex items-center gap-1 text-xs font-bold " + (d.status === 'live' ? 'text-emerald-400' : d.status === 'deploying' ? 'text-indigo-400' : 'text-amber-400')}>{d.status === 'live' ? <CheckCircle2 className="w-3.5 h-3.5" /> : d.status === 'deploying' ? <Clock className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}{d.status}</span></div>
            <div className="col-span-2"><span className="text-xs text-slate-400">{d.duration}</span></div>
            <div className="col-span-2"><span className="text-xs text-slate-400">{d.started}</span></div>
          </div>
        ))}</div>
      </div>
    </motion.div>
  );
};

