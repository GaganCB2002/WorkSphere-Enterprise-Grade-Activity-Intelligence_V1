// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Database, Activity, AlertTriangle, CheckCircle2, HardDrive, RefreshCw, Clock } from 'lucide-react';
import { ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, AreaChart, Area } from 'recharts';

export const DatabaseMonitoring = () => {
  const [data, setData] = useState<any>(null);
  useEffect(() => { fetch('/api/tech-lead/monitoring/database').then(r => r.json()).then(d => setData(d)).catch(() => {}); }, []);
  const dbs = data?.dbs || [
    { name: 'Primary (PostgreSQL 16)', status: 'healthy', connections: 42, latency: 12, size: '2.4 TB', uptime: '90d' },
    { name: 'Read Replica 1', status: 'healthy', connections: 28, latency: 18, size: '2.4 TB', uptime: '90d' },
    { name: 'Read Replica 2', status: 'healthy', connections: 22, latency: 19, size: '2.4 TB', uptime: '90d' },
    { name: 'Analytics Warehouse', status: 'degraded', connections: 15, latency: 45, size: '8.1 TB', uptime: '45d' },
  ];
  const queryData = data?.queryData || [{ time: '10:00', qps: 120 }, { time: '10:05', qps: 145 }, { time: '10:10', qps: 110 }, { time: '10:15', qps: 180 }, { time: '10:20', qps: 155 }, { time: '10:25', qps: 130 }];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#0B0F19] text-slate-100 min-h-screen p-4 sm:p-6 space-y-6">
      <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2"><Database className="w-6 h-6 text-indigo-500" /> Database Monitoring</h1>
        <p className="text-xs text-slate-400 mt-0.5">{dbs.filter(d => d.status === 'healthy').length}/{dbs.length} databases healthy</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {dbs.map((d, i) => (
          <div key={i} className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3"><Database className={"w-5 h-5 " + (d.status === 'healthy' ? 'text-emerald-400' : 'text-amber-400')} /><div><h3 className="font-bold text-sm text-slate-100">{d.name}</h3></div></div>
              <span className={"flex items-center gap-1 text-xs font-bold " + (d.status === 'healthy' ? 'text-emerald-400' : 'text-amber-400')}><span className={"w-2 h-2 rounded-full " + (d.status === 'healthy' ? 'bg-emerald-400' : 'bg-amber-400')}></span>{d.status}</span>
            </div>
            <div className="grid grid-cols-3 gap-3 text-xs"><div><span className="text-slate-400">Connections</span><p className="font-bold text-slate-300">{d.connections}</p></div><div><span className="text-slate-400">Latency</span><p className="font-bold text-slate-300">{d.latency}ms</p></div><div><span className="text-slate-400">Size</span><p className="font-bold text-slate-300">{d.size}</p></div></div>
          </div>
        ))}
      </div>
      <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-md">
        <h2 className="text-base font-bold text-white mb-4">Queries Per Second</h2>
        <div className="h-48"><ResponsiveContainer width="100%" height="100%"><AreaChart data={queryData}><defs><linearGradient id="qpsGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/><stop offset="95%" stopColor="#6366f1" stopOpacity={0}/></linearGradient></defs><CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} /><XAxis dataKey="time" stroke="#64748B" fontSize={12} /><YAxis stroke="#64748B" fontSize={12} /><Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', color: '#fff' }} /><Area type="monotone" dataKey="qps" stroke="#6366f1" strokeWidth={3} fill="url(#qpsGrad)" /></AreaChart></ResponsiveContainer></div>
      </div>
    </motion.div>
  );
};

