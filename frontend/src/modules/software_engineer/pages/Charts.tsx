// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Activity, PieChart, TrendingDown, Bug, Shield, Rocket, CheckCircle2 } from 'lucide-react';
import { ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart as RePieChart, Pie, Cell, Legend } from 'recharts';

export const Charts = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/software-engineer/charts')
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-6 space-y-4 animate-pulse"><div className="h-20 bg-[#0F172A]/90 rounded-2xl" /><div className="grid grid-cols-2 gap-4"><div className="h-64" /><div className="h-64" /></div></div>;

  const velocity = data?.velocity || [
    { sprint: 'Sprint 38', committed: 110, completed: 105 },
    { sprint: 'Sprint 39', committed: 120, completed: 118 },
    { sprint: 'Sprint 40', committed: 115, completed: 95 },
    { sprint: 'Sprint 41', committed: 130, completed: 128 },
    { sprint: 'Sprint 42', committed: 140, completed: 128 },
    { sprint: 'Sprint 43', committed: 125, completed: 112 },
  ];
  const commitsPerWeek = data?.commitsPerWeek || [
    { week: 'W1', commits: 124 }, { week: 'W2', commits: 156 }, { week: 'W3', commits: 142 }, { week: 'W4', commits: 168 }, { week: 'W5', commits: 185 }, { week: 'W6', commits: 172 },
  ];
  const productivityTrend = data?.productivityTrend || [
    { month: 'Feb', score: 82 }, { month: 'Mar', score: 85 }, { month: 'Apr', score: 80 }, { month: 'May', score: 88 }, { month: 'Jun', score: 90 }, { month: 'Jul', score: 92 },
  ];
  const taskDistribution = data?.taskDistribution || [
    { name: 'Development', value: 45, color: '#6366F1' },
    { name: 'Testing', value: 20, color: '#22D3EE' },
    { name: 'Review', value: 15, color: '#F97316' },
    { name: 'DevOps', value: 12, color: '#22C55E' },
    { name: 'Documentation', value: 8, color: '#64748B' },
  ];
  const burndown = data?.burndown || [
    { day: 'Day 1', ideal: 44, actual: 44 }, { day: 'Day 3', ideal: 38, actual: 40 }, { day: 'Day 5', ideal: 32, actual: 35 },
    { day: 'Day 7', ideal: 26, actual: 28 }, { day: 'Day 9', ideal: 20, actual: 18 }, { day: 'Day 11', ideal: 14, actual: 12 },
    { day: 'Day 13', ideal: 8, actual: 6 }, { day: 'Day 15', ideal: 2, actual: 0 },
  ];
  const bugTrend = data?.bugTrend || [
    { month: 'Feb', critical: 5, high: 12, medium: 20 },
    { month: 'Mar', critical: 3, high: 8, medium: 15 },
    { month: 'Apr', critical: 4, high: 10, medium: 18 },
    { month: 'May', critical: 2, high: 6, medium: 12 },
    { month: 'Jun', critical: 1, high: 4, medium: 8 },
    { month: 'Jul', critical: 0, high: 3, medium: 5 },
  ];

  const chartConfigs = [
    { title: 'Sprint Velocity', subtitle: 'Committed vs Completed', icon: TrendingUp, chart: 'bar' },
    { title: 'Commits per Week', subtitle: 'Weekly commit activity', icon: Activity, chart: 'bar' },
    { title: 'Productivity Trend', subtitle: 'Monthly productivity score', icon: TrendingUp, chart: 'area' },
    { title: 'Task Distribution', subtitle: 'By category', icon: PieChart, chart: 'pie' },
    { title: 'Sprint Burndown', subtitle: 'Ideal vs Actual', icon: TrendingDown, chart: 'line' },
    { title: 'Bug Trend', subtitle: 'By severity over time', icon: Bug, chart: 'bar-stacked' },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="bg-[#0B0F19] text-slate-100 min-h-screen p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
        <div>
          <div className="text-xs font-semibold text-indigo-400">Software Engineer Workspace</div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2"><BarChart3 className="w-6 h-6 text-indigo-400" /> Charts & Analytics</h1>
          <p className="text-xs text-slate-400 mt-0.5">All engineering metrics visualized</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {chartConfigs.map((cfg, ci) => (
          <div key={cfg.title} className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-sm font-bold text-white flex items-center gap-2"><cfg.icon className="w-4 h-4 text-indigo-400" />{cfg.title}</h2>
                <p className="text-xs text-slate-400">{cfg.subtitle}</p>
              </div>
            </div>
            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                {cfg.chart === 'bar' && ci === 0 ? (
                  <BarChart data={velocity} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                    <XAxis dataKey="sprint" stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', color: '#fff' }} />
                    <Bar dataKey="committed" name="Committed" fill="#334155" radius={[4, 4, 0, 0]} barSize={20} />
                    <Bar dataKey="completed" name="Completed" fill="#6366F1" radius={[4, 4, 0, 0]} barSize={20} />
                  </BarChart>
                ) : cfg.chart === 'bar' && ci === 1 ? (
                  <BarChart data={commitsPerWeek} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                    <XAxis dataKey="week" stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', color: '#fff' }} />
                    <Bar dataKey="commits" name="Commits" fill="#22D3EE" radius={[4, 4, 0, 0]} barSize={32} />
                  </BarChart>
                ) : cfg.chart === 'area' ? (
                  <AreaChart data={productivityTrend} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                    <defs><linearGradient id="colorP" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#22C55E" stopOpacity={0.4}/><stop offset="95%" stopColor="#22C55E" stopOpacity={0}/></linearGradient></defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                    <XAxis dataKey="month" stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', color: '#fff' }} />
                    <Area type="monotone" dataKey="score" stroke="#22C55E" strokeWidth={3} fillOpacity={1} fill="url(#colorP)" />
                  </AreaChart>
                ) : cfg.chart === 'pie' ? (
                  <RePieChart><Pie data={taskDistribution} cx="50%" cy="50%" innerRadius={50} outerRadius={90} paddingAngle={4} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                    {taskDistribution.map((e, i) => <Cell key={i} fill={e.color} />)}</Pie><Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', color: '#fff' }} />
                  </RePieChart>
                ) : cfg.chart === 'line' ? (
                  <LineChart data={burndown} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                    <XAxis dataKey="day" stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', color: '#fff' }} />
                    <Line type="monotone" dataKey="ideal" stroke="#64748B" strokeWidth={2} strokeDasharray="5 5" name="Ideal" />
                    <Line type="monotone" dataKey="actual" stroke="#6366F1" strokeWidth={3} name="Actual" />
                  </LineChart>
                ) : (
                  <BarChart data={bugTrend} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                    <XAxis dataKey="month" stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', color: '#fff' }} />
                    <Bar dataKey="critical" name="Critical" fill="#EF4444" stackId="a" radius={[0, 0, 0, 0]} />
                    <Bar dataKey="high" name="High" fill="#F97316" stackId="a" />
                    <Bar dataKey="medium" name="Medium" fill="#EAB308" stackId="a" radius={[4, 4, 0, 0]} />
                  </BarChart>
                )}
              </ResponsiveContainer>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
