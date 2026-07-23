// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, GitPullRequest, GitBranch, GitCommit, PlayCircle, CheckCircle2, XCircle, BarChart3, TrendingUp, Users, Star, Rocket, Shield, AlertTriangle, Clock, Zap, LayoutDashboard } from 'lucide-react';
import { ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, AreaChart, Area, BarChart, Bar, LineChart, Line } from 'recharts';

export const LiveEngineeringData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/software-engineer/live-data')
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-6 space-y-4 animate-pulse"><div className="h-20 bg-[#0F172A]/90 rounded-2xl" /><div className="grid grid-cols-4 gap-4"><div className="h-24" /><div className="h-24" /><div className="h-24" /><div className="h-24" /></div><div className="grid grid-cols-2 gap-4"><div className="h-64" /><div className="h-64" /></div></div>;

  const widgets = data?.widgets || [
    { label: 'Open PRs', value: 14, icon: GitPullRequest, color: 'text-indigo-400', bg: 'bg-indigo-500/10', trend: '+3', positive: false },
    { label: 'Pending Reviews', value: 5, icon: GitPullRequest, color: 'text-amber-400', bg: 'bg-amber-500/10', trend: '+2', positive: false },
    { label: 'Current Branch', value: 'feature/grpc', icon: GitBranch, color: 'text-emerald-400', bg: 'bg-emerald-500/10', trend: '-', positive: true },
    { label: 'Last Commit', value: '2m ago', icon: GitCommit, color: 'text-cyan-400', bg: 'bg-cyan-500/10', trend: 'a3f2c1d', positive: true },
    { label: 'Active Sprint', value: 'Sprint 43', icon: BarChart3, color: 'text-rose-400', bg: 'bg-rose-500/10', trend: '10d left', positive: true },
    { label: 'Story Points', value: '28/44', icon: TrendingUp, color: 'text-indigo-400', bg: 'bg-indigo-500/10', trend: '64%', positive: true },
    { label: 'Active Builds', value: 3, icon: PlayCircle, color: 'text-blue-400', bg: 'bg-blue-500/10', trend: '2 passing', positive: true },
    { label: 'Failed Builds', value: 1, icon: XCircle, color: 'text-rose-400', bg: 'bg-rose-500/10', trend: '-1', positive: true },
    { label: 'Deploy Queue', value: 2, icon: Rocket, color: 'text-purple-400', bg: 'bg-purple-500/10', trend: '1 staging', positive: true },
    { label: 'Pipeline Status', value: 'All Good', icon: Activity, color: 'text-emerald-400', bg: 'bg-emerald-500/10', trend: '98% pass', positive: true },
    { label: 'Repo Health', value: 'A+', icon: Shield, color: 'text-emerald-400', bg: 'bg-emerald-500/10', trend: 'stable', positive: true },
    { label: 'Developer Activity', value: 'High', icon: Users, color: 'text-amber-400', bg: 'bg-amber-500/10', trend: '+12%', positive: true },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="bg-[#0B0F19] text-slate-100 min-h-screen p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
        <div>
          <div className="text-xs font-semibold text-indigo-400">Software Engineer Workspace</div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2"><LayoutDashboard className="w-6 h-6 text-emerald-400" /> Live Engineering Data</h1>
          <p className="text-xs text-slate-400 mt-0.5">Real-time metrics &bull; Auto-refreshing</p>
        </div>
        <div className="flex items-center gap-2"><span className="flex w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /><span className="text-[10px] text-emerald-400 font-bold">LIVE</span></div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {widgets.map((w, idx) => (
          <motion.div key={w.label} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: idx * 0.03 }}
            className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-4 backdrop-blur-md hover:border-indigo-500/40 transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{w.label}</span>
              <div className={`p-1.5 rounded-lg border border-slate-700/60 ${w.bg}`}><w.icon className={`w-3.5 h-3.5 ${w.color}`} /></div>
            </div>
            <div className="text-xl font-extrabold text-white">{w.value}</div>
            <div className={`text-[10px] font-semibold mt-0.5 ${w.positive ? 'text-emerald-400' : 'text-rose-400'}`}>{w.trend}</div>
          </motion.div>
        ))}
      </div>

      <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
        <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2"><Activity className="w-4 h-4 text-indigo-400" /> Git Activity (Last 7 Days)</h2>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={[{ day: 'Mon', commits: 45, prs: 8 }, { day: 'Tue', commits: 62, prs: 12 }, { day: 'Wed', commits: 78, prs: 15 }, { day: 'Thu', commits: 55, prs: 10 }, { day: 'Fri', commits: 70, prs: 14 }, { day: 'Sat', commits: 12, prs: 3 }, { day: 'Sun', commits: 8, prs: 2 }]} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <defs><linearGradient id="colorGit" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/><stop offset="95%" stopColor="#6366f1" stopOpacity={0}/></linearGradient></defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
              <XAxis dataKey="day" stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', color: '#fff' }} />
              <Area type="monotone" dataKey="commits" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorGit)" name="Commits" />
              <Line type="monotone" dataKey="prs" stroke="#22D3EE" strokeWidth={2} name="PRs" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
};
