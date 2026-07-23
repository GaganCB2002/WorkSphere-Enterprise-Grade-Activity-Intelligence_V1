// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, BarChart3, Target, ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react';
import { ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, BarChart, Bar, LineChart, Line } from 'recharts';

export const Velocity = () => {
  const [data, setData] = useState<any>(null);
  useEffect(() => { fetch('/api/tech-lead/analytics/velocity').then(r => r.json()).then(d => setData(d)).catch(() => {}); }, []);
  const velocityData = data?.velocityData || [
    { sprint: 'S38', committed: 110, completed: 105 },
    { sprint: 'S39', committed: 120, completed: 118 },
    { sprint: 'S40', committed: 115, completed: 95 },
    { sprint: 'S41', committed: 130, completed: 128 },
    { sprint: 'S42', committed: 140, completed: 128 },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#0B0F19] text-slate-100 min-h-screen p-4 sm:p-6 space-y-6">
      <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2"><TrendingUp className="w-6 h-6 text-indigo-500" /> Sprint Velocity</h1>
        <p className="text-xs text-slate-400 mt-0.5">Historical velocity tracking and trend analysis</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[{ label: 'Avg Velocity', value: '114.8', unit: 'pts', trend: '+6.2%', positive: true }, { label: 'Current Sprint', value: '128', unit: 'pts', trend: '+12%', positive: true }, { label: 'Forecast', value: '135', unit: 'pts', trend: '+5%', positive: true }].map((s, i) => (
          <div key={i} className="bg-[#0F172A]/90 border border-slate-800/80 rounded-xl p-5 backdrop-blur-md">
            <p className="text-xs text-slate-400">{s.label}</p>
            <div className="flex items-baseline gap-1 mt-1"><span className="text-3xl font-extrabold text-white">{s.value}</span><span className="text-sm text-slate-400">{s.unit}</span><span className={"flex items-center text-xs font-bold ml-2 " + (s.positive ? 'text-emerald-400' : 'text-rose-400')}>{s.positive ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}{s.trend}</span></div>
          </div>
        ))}
      </div>
      <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-md">
        <h2 className="text-base font-bold text-white mb-4">Committed vs Completed</h2>
        <div className="h-72"><ResponsiveContainer width="100%" height="100%"><BarChart data={velocityData}><CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} /><XAxis dataKey="sprint" stroke="#64748B" fontSize={12} /><YAxis stroke="#64748B" fontSize={12} /><Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', color: '#fff' }} /><Bar dataKey="committed" fill="#334155" radius={[6,6,0,0]} barSize={32} /><Bar dataKey="completed" fill="#6366F1" radius={[6,6,0,0]} barSize={32} /></BarChart></ResponsiveContainer></div>
        <div className="flex gap-4 mt-4 text-xs text-slate-400 justify-end"><span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-[#334155]"></span>Committed</span><span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-[#6366F1]"></span>Completed</span></div>
      </div>
    </motion.div>
  );
};

