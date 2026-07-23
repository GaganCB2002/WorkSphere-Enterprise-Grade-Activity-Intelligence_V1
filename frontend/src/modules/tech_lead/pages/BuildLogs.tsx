// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Search, Download, Filter, Clock, AlertTriangle, CheckCircle2 } from 'lucide-react';

export const BuildLogs = () => {
  const [data, setData] = useState<any>(null);
  useEffect(() => { fetch('/api/tech-lead/cicd/build-logs').then(r => r.json()).then(d => setData(d)).catch(() => {}); }, []);
  const logs = data?.logs || [
    { id: 'LOG-1204', build: 'PL-1204', step: 'Build Docker Image', status: 'success', duration: '1m 22s', time: '10m ago' },
    { id: 'LOG-1203', build: 'PL-1203', step: 'Run Unit Tests', status: 'running', duration: '2m 15s', time: '5m ago' },
    { id: 'LOG-1202', build: 'PL-1202', step: 'Install Dependencies', status: 'failed', duration: '0m 45s', time: '15m ago' },
    { id: 'LOG-1201', build: 'PL-1201', step: 'Deploy to Staging', status: 'success', duration: '3m 10s', time: '1h ago' },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#0B0F19] text-slate-100 min-h-screen p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
        <div><h1 className="text-2xl font-bold text-white flex items-center gap-2"><Terminal className="w-6 h-6 text-indigo-500" /> Build Logs</h1><p className="text-xs text-slate-400 mt-1">Detailed build step logs</p></div>
        <div className="flex items-center gap-3"><div className="relative"><Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#8b949e]" /><input type="text" placeholder="Search logs..." className="w-48 bg-[#1E293B] border border-slate-700/60 rounded-lg py-1.5 pl-8 pr-3 text-xs text-slate-200 focus:outline-none focus:border-indigo-500" /></div><button className="flex items-center gap-2 bg-[#1E293B] hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-md text-xs font-semibold border border-slate-700/60"><Download className="w-4 h-4" /> Export</button></div>
      </div>
      <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl overflow-hidden backdrop-blur-md">
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider"><div className="col-span-2">Log ID</div><div className="col-span-2">Build</div><div className="col-span-3">Step</div><div className="col-span-2">Status</div><div className="col-span-2">Duration</div><div className="col-span-1">Time</div></div>
        <div className="divide-y divide-slate-800">{logs.map((l, i) => (
          <div key={i} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-[#1E293B]/30 transition-colors cursor-pointer">
            <div className="col-span-2"><span className="text-xs font-mono text-indigo-400">{l.id}</span></div>
            <div className="col-span-2"><span className="text-xs font-mono text-slate-400">{l.build}</span></div>
            <div className="col-span-3"><span className="text-sm font-semibold text-slate-200">{l.step}</span></div>
            <div className="col-span-2"><span className={"flex items-center gap-1 text-xs font-bold " + (l.status === 'success' ? 'text-emerald-400' : l.status === 'running' ? 'text-indigo-400' : 'text-rose-400')}>{l.status === 'success' ? <CheckCircle2 className="w-3.5 h-3.5" /> : l.status === 'running' ? <Clock className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}{l.status}</span></div>
            <div className="col-span-2"><span className="text-xs text-slate-400">{l.duration}</span></div>
            <div className="col-span-1"><span className="text-xs text-slate-400">{l.time}</span></div>
          </div>
        ))}</div>
      </div>
      <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-md">
        <h2 className="text-sm font-bold text-white mb-4">Recent Build Output</h2>
        <div className="bg-[#090b10] rounded-xl p-4 font-mono text-xs text-emerald-400 overflow-x-auto border border-slate-800/80">
          <div className="text-slate-500">$ npm run build</div>
          <div>&gt; worksphere-frontend@1.0.0 build</div>
          <div>&gt; vite build</div>
          <div className="text-emerald-400">✓ Building for production...</div>
          <div className="text-emerald-400">✓ 42 modules transformed.</div>
          <div className="text-slate-500">dist/assets/index-abc123.js   142.5 kB</div>
          <div className="text-slate-500">dist/assets/index-xyz789.css  28.2 kB</div>
          <div className="text-emerald-400">✓ Build completed in 4.32s</div>
        </div>
      </div>
    </motion.div>
  );
};

