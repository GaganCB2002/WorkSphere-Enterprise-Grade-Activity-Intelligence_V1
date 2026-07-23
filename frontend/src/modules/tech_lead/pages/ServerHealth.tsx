// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Server, Activity, AlertTriangle, CheckCircle2, Cpu, HardDrive, Wifi, Clock, RefreshCw } from 'lucide-react';
import { ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, LineChart, Line } from 'recharts';

export const ServerHealth = () => {
  const [data, setData] = useState<any>(null);
  useEffect(() => { fetch('/api/tech-lead/monitoring/servers').then(r => r.json()).then(d => setData(d)).catch(() => {}); }, []);
  const metrics = data?.metrics || [
    { name: 'API Gateway', cpu: 42, memory: 68, disk: 55, latency: 12, status: 'healthy', uptime: '99.99%' },
    { name: 'Auth Service', cpu: 28, memory: 45, disk: 40, latency: 8, status: 'healthy', uptime: '99.95%' },
    { name: 'Database Primary', cpu: 65, memory: 78, disk: 64, latency: 22, status: 'degraded', uptime: '99.50%' },
    { name: 'Cache Layer', cpu: 55, memory: 72, disk: 35, latency: 3, status: 'healthy', uptime: '99.98%' },
    { name: 'ML Worker', cpu: 15, memory: 30, disk: 20, latency: 45, status: 'healthy', uptime: '99.80%' },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#0B0F19] text-slate-100 min-h-screen p-4 sm:p-6 space-y-6">
      <div className="flex items-center justify-between bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
        <div><h1 className="text-2xl font-bold text-white flex items-center gap-2"><Server className="w-6 h-6 text-indigo-500" /> Server Health</h1><p className="text-xs text-slate-400 mt-0.5">{metrics.filter(m => m.status === 'healthy').length}/{metrics.length} healthy</p></div>
        <button className="flex items-center gap-2 bg-[#1E293B] hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-md text-xs font-semibold border border-slate-700/60"><RefreshCw className="w-4 h-4" /> Refresh</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {metrics.map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
            className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3"><Server className={"w-5 h-5 " + (s.status === 'healthy' ? 'text-emerald-400' : 'text-amber-400')} /><div><h3 className="font-bold text-sm text-slate-100">{s.name}</h3><p className="text-[10px] text-slate-400">Uptime: {s.uptime}</p></div></div>
              <span className={"flex items-center gap-1.5 text-xs font-bold " + (s.status === 'healthy' ? 'text-emerald-400' : 'text-amber-400')}><span className={"w-2 h-2 rounded-full " + (s.status === 'healthy' ? 'bg-emerald-400' : 'bg-amber-400')}></span>{s.status}</span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div><div className="flex justify-between text-[10px] mb-1"><span className="text-slate-400">CPU</span><span className="font-bold text-slate-300">{s.cpu}%</span></div><div className="h-1.5 bg-slate-800 rounded-full overflow-hidden"><div className={"h-full rounded-full " + (s.cpu > 70 ? 'bg-rose-500' : s.cpu > 50 ? 'bg-amber-500' : 'bg-emerald-500')} style={{width: s.cpu + '%'}}></div></div></div>
              <div><div className="flex justify-between text-[10px] mb-1"><span className="text-slate-400">RAM</span><span className="font-bold text-slate-300">{s.memory}%</span></div><div className="h-1.5 bg-slate-800 rounded-full overflow-hidden"><div className={"h-full rounded-full " + (s.memory > 70 ? 'bg-rose-500' : s.memory > 50 ? 'bg-amber-500' : 'bg-emerald-500')} style={{width: s.memory + '%'}}></div></div></div>
              <div><div className="flex justify-between text-[10px] mb-1"><span className="text-slate-400">Latency</span><span className="font-bold text-slate-300">{s.latency}ms</span></div><div className="h-1.5 bg-slate-800 rounded-full overflow-hidden"><div className={"h-full rounded-full " + (s.latency > 30 ? 'bg-rose-500' : s.latency > 15 ? 'bg-amber-500' : 'bg-emerald-500')} style={{width: Math.min(s.latency * 3, 100) + '%'}}></div></div></div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

