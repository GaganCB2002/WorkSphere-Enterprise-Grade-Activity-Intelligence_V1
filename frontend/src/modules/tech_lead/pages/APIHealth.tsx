// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, CheckCircle2, AlertTriangle, Clock, Wifi, RefreshCw, BarChart3 } from 'lucide-react';
import { ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, LineChart, Line } from 'recharts';

export const APIHealth = () => {
  const [data, setData] = useState<any>(null);
  useEffect(() => { fetch('/api/tech-lead/monitoring/api').then(r => r.json()).then(d => setData(d)).catch(() => {}); }, []);
  const endpoints = data?.endpoints || [
    { name: '/api/auth/login', status: 'healthy', latency: 45, requests: 1200, errorRate: 0.1 },
    { name: '/api/users', status: 'healthy', latency: 32, requests: 850, errorRate: 0.05 },
    { name: '/api/analytics', status: 'degraded', latency: 128, requests: 320, errorRate: 2.5 },
    { name: '/api/chat/messages', status: 'healthy', latency: 28, requests: 2400, errorRate: 0.01 },
  ];
  const latencyData = data?.latencyData || [{ time: '10:00', ms: 45 }, { time: '10:05', ms: 48 }, { time: '10:10', ms: 42 }, { time: '10:15', ms: 120 }, { time: '10:20', ms: 55 }, { time: '10:25', ms: 43 }];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#0B0F19] text-slate-100 min-h-screen p-4 sm:p-6 space-y-6">
      <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2"><Activity className="w-6 h-6 text-indigo-500" /> API Health</h1>
        <p className="text-xs text-slate-400 mt-0.5">{endpoints.filter(e => e.status === 'healthy').length}/{endpoints.length} endpoints healthy</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-md">
          <h2 className="text-base font-bold text-white mb-4">Endpoint Status</h2>
          <div className="space-y-3">{endpoints.map((e, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-[#1E293B]/30 rounded-xl border border-slate-800/60">
              <div className="flex items-center gap-3"><span className={"w-2 h-2 rounded-full " + (e.status === 'healthy' ? 'bg-emerald-400' : 'bg-amber-400')}></span><div><p className="text-xs font-bold text-slate-200">{e.name}</p><p className="text-[10px] text-slate-400">{e.requests} req/min &bull; {e.errorRate}% errors</p></div></div>
              <span className="text-xs font-bold text-slate-300">{e.latency}ms</span>
            </div>
          ))}</div>
        </div>
        <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-md">
          <h2 className="text-base font-bold text-white mb-4">Average Latency (ms)</h2>
          <div className="h-64"><ResponsiveContainer width="100%" height="100%"><LineChart data={latencyData}><CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} /><XAxis dataKey="time" stroke="#64748B" fontSize={12} /><YAxis stroke="#64748B" fontSize={12} /><Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', color: '#fff' }} /><Line type="monotone" dataKey="ms" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} /></LineChart></ResponsiveContainer></div>
        </div>
      </div>
    </motion.div>
  );
};

