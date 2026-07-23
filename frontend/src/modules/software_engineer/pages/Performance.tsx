// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, Clock, Activity, AlertTriangle, Server, Globe, TrendingUp, TrendingDown } from 'lucide-react';
import { ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, AreaChart, Area, LineChart, Line, BarChart, Bar } from 'recharts';

export const Performance = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/software-engineer/performance')
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-6 space-y-4 animate-pulse"><div className="h-20 bg-[#0F172A]/90 rounded-2xl" /><div className="grid grid-cols-2 gap-4"><div className="h-32" /><div className="h-32" /></div></div>;

  const metrics = data?.metrics || { responseTime: 245, throughput: 1250, errorRate: 0.8, apdex: 0.94, p99: 1200, cpu: 62, memory: 74, disk: 55 };
  const responseTimeData = data?.responseTimeData || [
    { time: '00:00', value: 180 }, { time: '04:00', value: 120 }, { time: '08:00', value: 320 }, { time: '10:00', value: 450 }, { time: '12:00', value: 380 }, { time: '14:00', value: 520 }, { time: '16:00', value: 480 }, { time: '18:00', value: 350 }, { time: '20:00', value: 250 }, { time: '22:00', value: 190 },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="bg-[#0B0F19] text-slate-100 min-h-screen p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
        <div>
          <div className="text-xs font-semibold text-indigo-400">Software Engineer Workspace</div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2"><Zap className="w-6 h-6 text-cyan-400" /> Application Performance</h1>
          <p className="text-xs text-slate-400 mt-0.5">Apdex: {metrics.apdex}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Avg Response', value: `${metrics.responseTime}ms`, icon: Clock, color: metrics.responseTime < 300 ? 'text-emerald-400' : 'text-amber-400' },
          { label: 'Throughput', value: `${metrics.throughput}/s`, icon: Activity, color: 'text-blue-400' },
          { label: 'Error Rate', value: `${metrics.errorRate}%`, icon: AlertTriangle, color: metrics.errorRate < 1 ? 'text-emerald-400' : 'text-rose-400' },
          { label: 'Apdex Score', value: metrics.apdex, icon: TrendingUp, color: metrics.apdex >= 0.94 ? 'text-emerald-400' : 'text-amber-400' },
        ].map((m, idx) => (
          <motion.div key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}
            className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-4 backdrop-blur-md">
            <div className="flex items-center justify-between mb-2"><span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{m.label}</span><m.icon className={`w-4 h-4 ${m.color}`} /></div>
            <div className={`text-2xl font-extrabold ${m.color}`}>{m.value}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
          <h2 className="text-sm font-bold text-white mb-4">Response Time (Today)</h2>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={responseTimeData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <defs><linearGradient id="colorRT" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#06B6D4" stopOpacity={0.4}/><stop offset="95%" stopColor="#06B6D4" stopOpacity={0}/></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                <XAxis dataKey="time" stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', color: '#fff' }} />
                <Area type="monotone" dataKey="value" stroke="#06B6D4" strokeWidth={3} fillOpacity={1} fill="url(#colorRT)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
          <h2 className="text-sm font-bold text-white mb-4">Resource Usage</h2>
          <div className="space-y-4">
            {[
              { label: 'CPU', value: metrics.cpu, color: metrics.cpu > 80 ? 'text-rose-400' : metrics.cpu > 60 ? 'text-amber-400' : 'text-emerald-400' },
              { label: 'Memory', value: metrics.memory, color: metrics.memory > 80 ? 'text-rose-400' : metrics.memory > 60 ? 'text-amber-400' : 'text-emerald-400' },
              { label: 'Disk I/O', value: metrics.disk, color: metrics.disk > 80 ? 'text-rose-400' : metrics.disk > 60 ? 'text-amber-400' : 'text-emerald-400' },
            ].map(r => (
              <div key={r.label}>
                <div className="flex items-center justify-between mb-1"><span className="text-xs text-slate-300">{r.label}</span><span className={`text-xs font-bold ${r.color}`}>{r.value}%</span></div>
                <div className="w-full bg-slate-800/50 rounded-full h-2"><div className={`h-2 rounded-full ${r.color === 'text-emerald-400' ? 'bg-emerald-500' : r.color === 'text-amber-400' ? 'bg-amber-500' : 'bg-rose-500'}`} style={{ width: `${r.value}%` }} /></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
