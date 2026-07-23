// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Server, Monitor, HardDrive, Cpu, Activity, AlertTriangle, CheckCircle2, Wifi } from 'lucide-react';

export const Servers = () => {
  const [data, setData] = useState<any>(null);
  useEffect(() => { fetch('/api/tech-lead/infra/servers').then(r => r.json()).then(d => setData(d)).catch(() => {}); }, []);
  const servers = data?.servers || [
    { name: 'api-prod-01', type: 'Application', status: 'healthy', cpu: 42, memory: 68, disk: 55, uptime: '45d', ip: '10.0.1.12' },
    { name: 'api-prod-02', type: 'Application', status: 'healthy', cpu: 38, memory: 62, disk: 50, uptime: '45d', ip: '10.0.1.13' },
    { name: 'db-primary-01', type: 'Database', status: 'healthy', cpu: 55, memory: 78, disk: 64, uptime: '90d', ip: '10.0.2.5' },
    { name: 'cache-01', type: 'Cache', status: 'degraded', cpu: 72, memory: 88, disk: 45, uptime: '30d', ip: '10.0.3.2' },
    { name: 'worker-01', type: 'Background', status: 'healthy', cpu: 25, memory: 40, disk: 30, uptime: '15d', ip: '10.0.4.1' },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#0B0F19] text-slate-100 min-h-screen p-4 sm:p-6 space-y-6">
      <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2"><Server className="w-6 h-6 text-indigo-500" /> Server Infrastructure</h1>
        <p className="text-xs text-slate-400 mt-0.5">{servers.length} servers &bull; {servers.filter(s => s.status === 'healthy').length} healthy</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {servers.map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
            className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md hover:border-indigo-500/40 transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3"><Server className={"w-5 h-5 " + (s.status === 'healthy' ? 'text-emerald-400' : 'text-amber-400')} /><div><h3 className="font-bold text-sm text-slate-100">{s.name}</h3><p className="text-xs text-slate-400">{s.type} &bull; {s.ip}</p></div></div>
              <span className={"flex items-center gap-1.5 text-xs font-bold " + (s.status === 'healthy' ? 'text-emerald-400' : 'text-amber-400')}><span className={"w-2 h-2 rounded-full " + (s.status === 'healthy' ? 'bg-emerald-400' : 'bg-amber-400')}></span>{s.status}</span>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div><div className="flex justify-between text-xs mb-1"><span className="text-slate-400">CPU</span><span className="font-bold text-slate-300">{s.cpu}%</span></div><div className="h-1.5 bg-slate-800 rounded-full overflow-hidden"><div className={"h-full rounded-full " + (s.cpu > 70 ? 'bg-rose-500' : s.cpu > 50 ? 'bg-amber-500' : 'bg-emerald-500')} style={{width: s.cpu + '%'}}></div></div></div>
              <div><div className="flex justify-between text-xs mb-1"><span className="text-slate-400">RAM</span><span className="font-bold text-slate-300">{s.memory}%</span></div><div className="h-1.5 bg-slate-800 rounded-full overflow-hidden"><div className={"h-full rounded-full " + (s.memory > 70 ? 'bg-rose-500' : s.memory > 50 ? 'bg-amber-500' : 'bg-emerald-500')} style={{width: s.memory + '%'}}></div></div></div>
              <div><div className="flex justify-between text-xs mb-1"><span className="text-slate-400">Disk</span><span className="font-bold text-slate-300">{s.disk}%</span></div><div className="h-1.5 bg-slate-800 rounded-full overflow-hidden"><div className={"h-full rounded-full " + (s.disk > 70 ? 'bg-rose-500' : s.disk > 50 ? 'bg-amber-500' : 'bg-emerald-500')} style={{width: s.disk + '%'}}></div></div></div>
            </div>
            <div className="mt-3 pt-3 border-t border-slate-800 text-xs text-slate-400">Uptime: {s.uptime}</div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

