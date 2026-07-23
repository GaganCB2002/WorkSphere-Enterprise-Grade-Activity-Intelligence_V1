// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Users, GitBranch, GitCommit, Activity, TrendingUp, AlertTriangle, CheckCircle, Clock, Zap, BarChart3, ArrowUpRight, ArrowDownRight, Bot } from 'lucide-react';
import { ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';

export const EngineeringOverview = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => { fetch('/api/tech-lead/engineering').then(r => r.json()).then(d => { setData(d); setLoading(false); }).catch(() => setLoading(false)); }, []);

  const velocityData = data?.velocityData || [{ sprint: 'W1', planned: 50, actual: 42 }, { sprint: 'W2', planned: 55, actual: 50 }, { sprint: 'W3', planned: 60, actual: 58 }, { sprint: 'W4', planned: 65, actual: 62 }];
  const langData = data?.langData || [{ name: 'TypeScript', value: 45 }, { name: 'Python', value: 25 }, { name: 'Go', value: 15 }, { name: 'Rust', value: 10 }, { name: 'Other', value: 5 }];
  const COLORS = ['#6366f1', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'];

  const kpis = data?.kpis || [
    { title: 'Total Repos', value: '47', trend: '+3', positive: true, icon: GitBranch, color: 'text-emerald-400' },
    { title: 'Active Developers', value: '24', trend: '0', positive: true, icon: Users, color: 'text-indigo-400' },
    { title: 'PRs Merged/Week', value: '86', trend: '+12%', positive: true, icon: GitCommit, color: 'text-amber-400' },
    { title: 'Deployment Freq', value: '12/day', trend: '+2', positive: true, icon: Activity, color: 'text-cyan-400' },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#0B0F19] text-slate-100 min-h-screen p-4 sm:p-6 space-y-6">
      <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
        <h1 className="text-2xl font-bold text-white">Engineering Overview</h1>
        <p className="text-xs text-slate-400 mt-0.5">Cross-team engineering metrics and insights</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, idx) => (
          <motion.div key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}
            className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
            <div className="flex justify-between items-start mb-3"><h3 className="text-[11px] font-bold text-slate-400 uppercase">{kpi.title}</h3><kpi.icon className={"w-4 h-4 " + kpi.color} /></div>
            <div className="flex items-baseline gap-2"><span className="text-3xl font-extrabold text-white">{kpi.value}</span><span className={"text-xs font-bold " + (kpi.positive ? 'text-emerald-400' : 'text-rose-400')}>{kpi.trend}</span></div>
          </motion.div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-md">
          <h2 className="text-base font-bold text-white mb-4">Weekly Velocity</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={velocityData}><CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} /><XAxis dataKey="sprint" stroke="#64748B" fontSize={12} /><YAxis stroke="#64748B" fontSize={12} /><Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', color: '#fff' }} /><Bar dataKey="planned" fill="#334155" radius={[4,4,0,0]} barSize={24} /><Bar dataKey="actual" fill="#6366F1" radius={[4,4,0,0]} barSize={24} /></BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-md">
          <h2 className="text-base font-bold text-white mb-4">Language Distribution</h2>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart><Pie data={langData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={5} dataKey="value">{langData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}</Pie><Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', color: '#fff' }} /></PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 mt-2">{langData.map((e, i) => <div key={e.name} className="flex items-center gap-1.5 text-xs text-slate-300"><span className="w-2.5 h-2.5 rounded-full" style={{backgroundColor: COLORS[i % COLORS.length]}}></span>{e.name}</div>)}</div>
        </div>
      </div>
    </motion.div>
  );
};

