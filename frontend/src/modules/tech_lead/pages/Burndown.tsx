// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingDown, Target, Calendar, CheckCircle2, AlertTriangle } from 'lucide-react';
import { ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, LineChart, Line } from 'recharts';

export const Burndown = () => {
  const [data, setData] = useState<any>(null);
  useEffect(() => { fetch('/api/tech-lead/analytics/burndown').then(r => r.json()).then(d => setData(d)).catch(() => {}); }, []);
  const burndownData = data?.burndownData || [
    { day: 'Day 1', ideal: 44, actual: 44 }, { day: 'Day 2', ideal: 38, actual: 40 }, { day: 'Day 3', ideal: 32, actual: 30 },
    { day: 'Day 4', ideal: 26, actual: 25 }, { day: 'Day 5', ideal: 20, actual: 18 }, { day: 'Day 6', ideal: 14, actual: 12 },
    { day: 'Day 7', ideal: 8, actual: 5 }, { day: 'Day 8', ideal: 2, actual: 0 },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#0B0F19] text-slate-100 min-h-screen p-4 sm:p-6 space-y-6">
      <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2"><TrendingDown className="w-6 h-6 text-indigo-500" /> Burndown Chart</h1>
        <p className="text-xs text-slate-400 mt-0.5">Current sprint burndown tracking</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[{ label: 'Total Points', value: '44', icon: Target, color: 'text-indigo-400' }, { label: 'Remaining', value: '0', icon: AlertTriangle, color: 'text-emerald-400' }, { label: 'On Track', value: 'Yes', icon: CheckCircle2, color: 'text-emerald-400' }].map((s, i) => (
          <div key={i} className="bg-[#0F172A]/90 border border-slate-800/80 rounded-xl p-4 backdrop-blur-md flex items-center gap-3"><s.icon className={"w-5 h-5 " + s.color} /><div><p className="text-xs text-slate-400">{s.label}</p><p className={"text-xl font-extrabold " + s.color}>{s.value}</p></div></div>
        ))}
      </div>
      <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-md">
        <h2 className="text-base font-bold text-white mb-4">Sprint 42 Burndown</h2>
        <div className="h-72"><ResponsiveContainer width="100%" height="100%"><LineChart data={burndownData}><CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} /><XAxis dataKey="day" stroke="#64748B" fontSize={12} /><YAxis stroke="#64748B" fontSize={12} /><Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', color: '#fff' }} /><Line type="monotone" dataKey="ideal" stroke="#334155" strokeWidth={2} strokeDasharray="5 5" dot={false} name="Ideal" /><Line type="monotone" dataKey="actual" stroke="#6366f1" strokeWidth={3} dot={{ r: 4, fill: '#6366f1' }} name="Actual" /></LineChart></ResponsiveContainer></div>
        <div className="flex gap-4 mt-4 text-xs text-slate-400 justify-end"><span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-[#334155]"></span>Ideal (dashed)</span><span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-[#6366f1]"></span>Actual</span></div>
      </div>
    </motion.div>
  );
};

