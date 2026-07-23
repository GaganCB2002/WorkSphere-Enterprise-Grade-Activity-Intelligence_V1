// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Container, Activity, AlertTriangle, CheckCircle2, Cpu, HardDrive, Network } from 'lucide-react';

export const Kubernetes = () => {
  const [data, setData] = useState<any>(null);
  useEffect(() => { fetch('/api/tech-lead/infra/kubernetes').then(r => r.json()).then(d => setData(d)).catch(() => {}); }, []);
  const pods = data?.pods || [
    { name: 'api-gateway-7d8f9', namespace: 'production', status: 'running', cpu: '120m', memory: '256Mi', restarts: 0, age: '15d' },
    { name: 'auth-service-3a4b5', namespace: 'production', status: 'running', cpu: '85m', memory: '192Mi', restarts: 1, age: '15d' },
    { name: 'ml-worker-c1d2e', namespace: 'production', status: 'pending', cpu: '0m', memory: '0Mi', restarts: 3, age: '1h' },
    { name: 'redis-cache-6f7g8', namespace: 'infra', status: 'running', cpu: '200m', memory: '512Mi', restarts: 0, age: '30d' },
    { name: 'db-proxy-9h0i1', namespace: 'infra', status: 'running', cpu: '95m', memory: '256Mi', restarts: 2, age: '10d' },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#0B0F19] text-slate-100 min-h-screen p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
        <div><h1 className="text-2xl font-bold text-white flex items-center gap-2"><Container className="w-6 h-6 text-indigo-500" /> Kubernetes</h1><p className="text-xs text-slate-400 mt-1">{pods.filter(p => p.status === 'running').length}/{pods.length} pods running</p></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {[{ label: 'Running Pods', value: pods.filter(p => p.status === 'running').length, color: 'text-emerald-400' }, { label: 'Pending', value: pods.filter(p => p.status === 'pending').length, color: 'text-amber-400' }, { label: 'Total Restarts', value: pods.reduce((a,b) => a + b.restarts, 0), color: 'text-indigo-400' }].map((s, i) => (
          <div key={i} className="bg-[#0F172A]/90 border border-slate-800/80 rounded-xl p-4 backdrop-blur-md"><p className="text-xs text-slate-400">{s.label}</p><p className={"text-2xl font-extrabold " + s.color}>{s.value}</p></div>
        ))}
      </div>
      <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl overflow-hidden backdrop-blur-md">
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider"><div className="col-span-3">Pod</div><div className="col-span-2">Namespace</div><div className="col-span-2">Status</div><div className="col-span-2">CPU/Memory</div><div className="col-span-2">Restarts</div><div className="col-span-1">Age</div></div>
        <div className="divide-y divide-slate-800">{pods.map((p, i) => (
          <div key={i} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-[#1E293B]/30 transition-colors">
            <div className="col-span-3"><span className="text-sm font-semibold text-slate-200">{p.name}</span></div>
            <div className="col-span-2"><span className="text-xs text-slate-400">{p.namespace}</span></div>
            <div className="col-span-2"><span className={"flex items-center gap-1 text-xs font-bold " + (p.status === 'running' ? 'text-emerald-400' : 'text-amber-400')}>{p.status === 'running' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}{p.status}</span></div>
            <div className="col-span-2"><span className="text-xs text-slate-300">{p.cpu} / {p.memory}</span></div>
            <div className="col-span-2"><span className={"text-xs font-bold " + (p.restarts > 2 ? 'text-rose-400' : 'text-slate-300')}>{p.restarts}</span></div>
            <div className="col-span-1"><span className="text-xs text-slate-400">{p.age}</span></div>
          </div>
        ))}</div>
      </div>
    </motion.div>
  );
};

