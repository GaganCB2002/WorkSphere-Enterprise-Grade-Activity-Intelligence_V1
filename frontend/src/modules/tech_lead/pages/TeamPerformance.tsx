// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Target, Shield, Star, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, LineChart, Line, BarChart, Bar } from 'recharts';

export const TeamPerformance = () => {
  const [data, setData] = useState<any>(null);
  useEffect(() => { fetch('/api/tech-lead/team/performance').then(r => r.json()).then(d => setData(d)).catch(() => {}); }, []);

  const perfData = data?.perfData || [{ month: 'Jan', velocity: 85, quality: 92, satisfaction: 88 }, { month: 'Feb', velocity: 88, quality: 90, satisfaction: 90 }, { month: 'Mar', velocity: 92, quality: 94, satisfaction: 85 }, { month: 'Apr', velocity: 90, quality: 91, satisfaction: 91 }];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#0B0F19] text-slate-100 min-h-screen p-4 sm:p-6 space-y-6">
      <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2"><Star className="w-6 h-6 text-indigo-500" /> Team Performance</h1>
        <p className="text-xs text-slate-400 mt-0.5">Velocity, quality, and satisfaction metrics</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[{ label: 'Velocity Score', value: '89', unit: '/100', trend: '+4%', positive: true, icon: TrendingUp, color: 'text-emerald-400' }, { label: 'Quality Score', value: '92', unit: '/100', trend: '+2%', positive: true, icon: Shield, color: 'text-indigo-400' }, { label: 'Satisfaction', value: '88', unit: '%', trend: '+1%', positive: true, icon: Star, color: 'text-amber-400' }].map((s, i) => (
          <div key={i} className="bg-[#0F172A]/90 border border-slate-800/80 rounded-xl p-5 backdrop-blur-md">
            <div className="flex justify-between items-start mb-3"><h3 className="text-xs font-bold text-slate-400 uppercase">{s.label}</h3><s.icon className={"w-4 h-4 " + s.color} /></div>
            <div className="flex items-baseline gap-1"><span className="text-3xl font-extrabold text-white">{s.value}</span><span className="text-sm text-slate-400">{s.unit}</span><span className={"flex items-center text-xs font-bold ml-2 " + (s.positive ? 'text-emerald-400' : 'text-rose-400')}>{s.positive ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}{s.trend}</span></div>
          </div>
        ))}
      </div>
      <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-md">
        <h2 className="text-base font-bold text-white mb-4">Performance Trends</h2>
        <div className="h-72"><ResponsiveContainer width="100%" height="100%"><LineChart data={perfData}><CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} /><XAxis dataKey="month" stroke="#64748B" fontSize={12} /><YAxis domain={[75, 100]} stroke="#64748B" fontSize={12} /><Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', color: '#fff' }} /><Line type="monotone" dataKey="velocity" stroke="#6366f1" strokeWidth={3} dot={{ r: 4 }} name="Velocity" /><Line type="monotone" dataKey="quality" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} name="Quality" /><Line type="monotone" dataKey="satisfaction" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4 }} name="Satisfaction" /></LineChart></ResponsiveContainer></div>
        <div className="flex gap-4 mt-4 text-xs text-slate-400 justify-end"><span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-[#6366f1]"></span>Velocity</span><span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-[#10b981]"></span>Quality</span><span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-[#f59e0b]"></span>Satisfaction</span></div>
      </div>
    </motion.div>
  );
};

