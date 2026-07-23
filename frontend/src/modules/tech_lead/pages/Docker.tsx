// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Box, Container, Activity, StopCircle, PlayCircle, Clock, HardDrive } from 'lucide-react';

export const Docker = () => {
  const [data, setData] = useState<any>(null);
  useEffect(() => { fetch('/api/tech-lead/infra/docker').then(r => r.json()).then(d => setData(d)).catch(() => {}); }, []);
  const containers = data?.containers || [
    { name: 'worksphere-api', image: 'worksphere/api:latest', status: 'running', ports: '3000:3000', created: '2d ago', size: '1.2GB' },
    { name: 'worksphere-web', image: 'worksphere/web:latest', status: 'running', ports: '80:80', created: '2d ago', size: '856MB' },
    { name: 'postgres-db', image: 'postgres:16', status: 'running', ports: '5432:5432', created: '30d ago', size: '3.4GB' },
    { name: 'redis-cache', image: 'redis:7-alpine', status: 'running', ports: '6379:6379', created: '30d ago', size: '145MB' },
    { name: 'ml-worker', image: 'worksphere/ml:latest', status: 'exited', ports: '--', created: '1h ago', size: '2.1GB' },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#0B0F19] text-slate-100 min-h-screen p-4 sm:p-6 space-y-6">
      <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2"><Box className="w-6 h-6 text-indigo-500" /> Docker Containers</h1>
        <p className="text-xs text-slate-400 mt-0.5">{containers.filter(c => c.status === 'running').length} running / {containers.length} total</p>
      </div>
      <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl overflow-hidden backdrop-blur-md">
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider"><div className="col-span-3">Container</div><div className="col-span-3">Image</div><div className="col-span-2">Status</div><div className="col-span-2">Ports</div><div className="col-span-2">Size</div></div>
        <div className="divide-y divide-slate-800">{containers.map((c, i) => (
          <div key={i} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-[#1E293B]/30 transition-colors">
            <div className="col-span-3"><span className="text-sm font-semibold text-slate-200">{c.name}</span></div>
            <div className="col-span-3"><span className="text-xs font-mono text-slate-400">{c.image}</span></div>
            <div className="col-span-2"><span className={"flex items-center gap-1 text-xs font-bold " + (c.status === 'running' ? 'text-emerald-400' : 'text-rose-400')}>{c.status === 'running' ? <PlayCircle className="w-3.5 h-3.5" /> : <StopCircle className="w-3.5 h-3.5" />}{c.status}</span></div>
            <div className="col-span-2"><span className="text-xs text-slate-400">{c.ports}</span></div>
            <div className="col-span-2"><span className="text-xs text-slate-400">{c.size}</span></div>
          </div>
        ))}</div>
      </div>
    </motion.div>
  );
};

