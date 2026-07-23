// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Clock, Users, Target, ArrowUpRight, Zap } from 'lucide-react';
import { ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, AreaChart, Area, BarChart, Bar } from 'recharts';

export const Productivity = () => {
  const [data, setData] = useState<any>(null);
  useEffect(() => { fetch('/api/tech-lead/analytics/productivity').then(r => r.json()).then(d => setData(d)).catch(() => {}); }, []);
  const prodData = data?.prodData || [
    { week: 'W1', commits: 142, prs: 18, reviews: 24 }, { week: 'W2', commits: 168, prs: 22, reviews: 30 },
    { week: 'W3', commits: 155, prs: 20, reviews: 28 }, { week: 'W4', commits: 180, prs: 25, reviews: 35 },
  ];
  const memberData = data?.memberData || [
    { name: 'Sarah J.', commits: 48, prs: 8, reviews: 12 }, { name: 'Alex D.', commits: 62, prs: 5, reviews: 6 },
    { name: 'Emma W.', commits: 35, prs: 7, reviews: 10 }, { name: 'Mike T.', commits: 15, prs: 3, reviews: 5 },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#0B0F19] text-slate-100 min-h-screen p-4 sm:p-6 space-y-6">
      <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2"><Zap className="w-6 h-6 text-indigo-500" /> Team Productivity</h1>
        <p className="text-xs text-slate-400 mt-0.5">Productivity metrics across the team</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[{ label: 'Total Commits', value: '645', trend: '+12%', icon: TrendingUp }, { label: 'PRs Merged', value: '85', trend: '+8%', icon: Target }, { label: 'Code Reviews', value: '117', trend: '+15%', icon: Users }].map((s, i) => (
          <div key={i} className="bg-[#0F172A]/90 border border-slate-800/80 rounded-xl p-5 backdrop-blur-md">
            <div className="flex justify-between items-start mb-3"><h3 className="text-xs font-bold text-slate-400 uppercase">{s.label}</h3><s.icon className="w-4 h-4 text-indigo-400" /></div>
            <div className="flex items-baseline gap-2"><span className="text-3xl font-extrabold text-white">{s.value}</span><span className="flex items-center text-xs font-bold text-emerald-400"><ArrowUpRight className="w-3.5 h-3.5" />{s.trend}</span></div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-md">
          <h2 className="text-base font-bold text-white mb-4">Weekly Activity</h2>
          <div className="h-64"><ResponsiveContainer width="100%" height="100%"><AreaChart data={prodData}><defs><linearGradient id="cGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/><stop offset="95%" stopColor="#6366f1" stopOpacity={0}/></linearGradient></defs><CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} /><XAxis dataKey="week" stroke="#64748B" fontSize={12} /><YAxis stroke="#64748B" fontSize={12} /><Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', color: '#fff' }} /><Area type="monotone" dataKey="commits" stroke="#6366f1" strokeWidth={3} fill="url(#cGrad)" name="Commits" /><Area type="monotone" dataKey="prs" stroke="#10b981" strokeWidth={3} fill="none" name="PRs" /></AreaChart></ResponsiveContainer></div>
        </div>
        <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-md">
          <h2 className="text-base font-bold text-white mb-4">By Team Member</h2>
          <div className="h-64"><ResponsiveContainer width="100%" height="100%"><BarChart data={memberData} layout="vertical" margin={{ left: 80 }}><CartesianGrid strokeDasharray="3 3" stroke="#1E293B" horizontal={false} /><XAxis type="number" stroke="#64748B" fontSize={12} /><YAxis type="category" dataKey="name" stroke="#64748B" fontSize={12} /><Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', color: '#fff' }} /><Bar dataKey="commits" name="Commits" fill="#6366F1" radius={[0,4,4,0]} barSize={10} /><Bar dataKey="prs" name="PRs" fill="#10b981" radius={[0,4,4,0]} barSize={10} /><Bar dataKey="reviews" name="Reviews" fill="#f59e0b" radius={[0,4,4,0]} barSize={10} /></BarChart></ResponsiveContainer></div>
        </div>
      </div>
    </motion.div>
  );
};

