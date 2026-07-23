// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Users, GitPullRequest, AlertTriangle, TrendingUp, ArrowUpRight, ArrowDownRight, Clock, Zap, Bot, Cpu, BarChart3 } from 'lucide-react';
import { ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, AreaChart, Area, BarChart, Bar, LineChart, Line } from 'recharts';

export const Dashboard = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/tech-lead/dashboard')
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-6 space-y-4 animate-pulse">{/* ... */}</div>;

  const velocityData = data?.velocityData || [
    { sprint: 'Sprint 38', committed: 110, completed: 105 },
    { sprint: 'Sprint 39', committed: 120, completed: 118 },
    { sprint: 'Sprint 40', committed: 115, completed: 95 },
    { sprint: 'Sprint 41', committed: 130, completed: 128 },
    { sprint: 'Sprint 42', committed: 140, completed: 128 },
  ];

  const commitActivity = data?.commitActivity || [
    { day: 'Mon', count: 45 }, { day: 'Tue', count: 82 }, { day: 'Wed', count: 120 },
    { day: 'Thu', count: 95 }, { day: 'Fri', count: 115 }, { day: 'Sat', count: 10 }, { day: 'Sun', count: 5 }
  ];

  const kpis = data?.kpis || [
    { title: 'Sprint Velocity', value: '128 pts', trend: '+12%', positive: true, icon: TrendingUp, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
    { title: 'Active Blockers', value: '3', trend: '-2', positive: true, icon: AlertTriangle, color: 'text-rose-400', bg: 'bg-rose-500/10 border-rose-500/20' },
    { title: 'Pending PRs', value: '14', trend: '+5', positive: false, icon: GitPullRequest, color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20' },
    { title: 'Code Quality', value: 'A-', trend: 'Passed', positive: true, icon: Activity, color: 'text-indigo-400', bg: 'bg-indigo-500/10 border-indigo-500/20' },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="bg-[#0B0F19] text-slate-100 min-h-screen p-4 sm:p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
        <div>
          <div className="text-xs font-semibold text-indigo-400">Tech Lead Portal</div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Engineering Dashboard</h1>
          <p className="text-xs text-slate-400 mt-0.5">Sprint 42 &bull; Real-time engineering metrics</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-[#1E293B] hover:bg-slate-700 text-slate-200 px-3.5 py-2 rounded-xl text-xs font-semibold border border-slate-700/60 transition-all">
            <Clock className="w-4 h-4 text-indigo-400" /> Last 30 Days
          </button>
          <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-3.5 py-2 rounded-xl text-xs font-semibold transition-all shadow-lg shadow-indigo-600/20">
            <Zap className="w-4 h-4" /> Generate Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, idx) => (
          <motion.div key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}
            className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md relative overflow-hidden group hover:border-indigo-500/40 transition-all">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{kpi.title}</h3>
              <div className={"p-2 rounded-xl border " + kpi.bg}><kpi.icon className={"w-4 h-4 " + kpi.color} /></div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-white tracking-tight">{kpi.value}</span>
              <div className={"flex items-center text-xs font-bold " + (kpi.positive ? 'text-emerald-400' : 'text-rose-400')}>
                {kpi.positive ? <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> : <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />}
                {kpi.trend}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-md space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-white">Sprint Velocity Trends</h2>
              <p className="text-xs text-slate-400">Committed vs Completed Story Points</p>
            </div>
            <span className="text-xs font-bold text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/20">Sprint 38-42</span>
          </div>
          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={velocityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                <XAxis dataKey="sprint" stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip cursor={{ fill: '#1E293B', opacity: 0.4 }} contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', color: '#fff' }} />
                <Bar dataKey="committed" name="Committed" fill="#334155" radius={[6, 6, 0, 0]} barSize={28} />
                <Bar dataKey="completed" name="Completed" fill="#6366F1" radius={[6, 6, 0, 0]} barSize={28} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl backdrop-blur-md overflow-hidden">
          <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-indigo-500/5">
            <div className="flex items-center gap-2 text-indigo-400"><Bot className="w-5 h-5" /><h2 className="text-sm font-bold text-white">AI Insights</h2></div>
            <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></span>
          </div>
          <div className="p-5 space-y-3">
            <div className="p-3.5 bg-rose-500/10 border border-rose-500/20 rounded-xl space-y-1">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-xs"><AlertTriangle className="w-4 h-4" /> High Risk</div>
              <p className="text-xs text-slate-300">Backend team is 22% behind schedule. Database migration task bottlenecking 4 tickets.</p>
            </div>
            <div className="p-3.5 bg-amber-500/10 border border-amber-500/20 rounded-xl space-y-1">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs"><Activity className="w-4 h-4" /> Workload Warning</div>
              <p className="text-xs text-slate-300">Team member logged &gt;50 hours for 2 consecutive weeks.</p>
            </div>
            <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl space-y-1">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs"><TrendingUp className="w-4 h-4" /> Delivery Predictor</div>
              <p className="text-xs text-slate-300">v2.4 Release Candidate ready for staging by Thursday 2:00 PM (94% confidence).</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-md space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2"><BarChart3 className="w-4 h-4 text-rose-400" /> Active Incidents</h2>
            <button className="text-xs font-bold text-indigo-400 hover:text-indigo-300">View All</button>
          </div>
          <div className="space-y-3">
            {(data?.incidents || [{ id: 'INC-94', title: 'Payment Webhook Timeout', env: 'Production', time: '45m ago' }, { id: 'BUG-402', title: 'Memory leak in Redis cache', env: 'Staging', time: '2h ago' }]).map(inc => (
              <div key={inc.id} className="flex items-center justify-between p-3.5 rounded-xl border border-slate-800/80 bg-[#1E293B]/50 hover:bg-slate-800/60 transition-all cursor-pointer">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">{inc.id}</span>
                  <span className="text-xs font-semibold text-slate-200">{inc.title}</span>
                </div>
                <div className="flex items-center gap-3 text-xs font-medium text-slate-400">
                  <span className="px-2 py-0.5 rounded border border-slate-700 bg-[#0F172A] text-[10px] font-bold">{inc.env}</span>
                  <span>{inc.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-md space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2"><Cpu className="w-4 h-4 text-indigo-400" /> Commit Activity</h2>
            <span className="text-xs text-slate-400">This Week</span>
          </div>
          <div className="h-44 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={commitActivity} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                <defs><linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/><stop offset="95%" stopColor="#6366f1" stopOpacity={0}/></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                <XAxis dataKey="day" stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', color: '#fff' }} />
                <Area type="monotone" dataKey="count" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorCount)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

