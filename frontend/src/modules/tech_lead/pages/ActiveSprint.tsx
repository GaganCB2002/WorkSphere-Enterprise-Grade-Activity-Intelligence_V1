// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Target, Calendar, Clock, CheckCircle2, AlertCircle, Users, GitPullRequest, TrendingUp } from 'lucide-react';
import { ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, BarChart, Bar } from 'recharts';

export const ActiveSprint = () => {
  const [data, setData] = useState<any>(null);
  useEffect(() => { fetch('/api/tech-lead/sprints/active').then(r => r.json()).then(d => setData(d)).catch(() => {}); }, []);
  const sprint = data?.sprint || { name: 'Sprint 42', start: 'May 14', end: 'May 28', daysRemaining: 5, completed: 18, total: 44, progress: 41 };
  const burndown = data?.burndown || [{ day: 'Mon', ideal: 44, actual: 44 }, { day: 'Tue', ideal: 38, actual: 40 }, { day: 'Wed', ideal: 32, actual: 30 }, { day: 'Thu', ideal: 26, actual: 25 }, { day: 'Fri', ideal: 20, actual: 18 }];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#0B0F19] text-slate-100 min-h-screen p-4 sm:p-6 space-y-6">
      <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
        <div className="flex items-start justify-between">
          <div><h1 className="text-2xl font-bold text-white flex items-center gap-2"><Target className="w-6 h-6 text-indigo-500" /> {sprint.name}</h1><p className="text-xs text-slate-400 mt-1"><Calendar className="w-3 h-3 inline" /> {sprint.start} - {sprint.end} &bull; <Clock className="w-3 h-3 inline" /> {sprint.daysRemaining} days remaining</p></div>
          <div className="text-right"><p className="text-2xl font-extrabold text-white">{sprint.completed}/{sprint.total} <span className="text-sm text-slate-400 font-medium">pts</span></p><p className="text-xs text-indigo-400 font-bold">{sprint.progress}% complete</p></div>
        </div>
        <div className="mt-4 h-2 w-full bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-indigo-500 rounded-full transition-all" style={{width: sprint.progress + '%'}}></div></div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {[{ label: 'Completed', value: sprint.completed, icon: CheckCircle2, color: 'text-emerald-400' }, { label: 'In Progress', value: '12', icon: GitPullRequest, color: 'text-amber-400' }, { label: 'At Risk', value: '3', icon: AlertCircle, color: 'text-rose-400' }].map((s, i) => (
          <div key={i} className="bg-[#0F172A]/90 border border-slate-800/80 rounded-xl p-4 backdrop-blur-md"><div className="flex items-center gap-3"><s.icon className={"w-5 h-5 " + s.color} /><div><p className="text-xs text-slate-400">{s.label}</p><p className={"text-xl font-extrabold " + s.color}>{s.value}</p></div></div></div>
        ))}
      </div>
      <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-md">
        <h2 className="text-base font-bold text-white mb-4">Burndown Chart</h2>
        <div className="h-64"><ResponsiveContainer width="100%" height="100%"><BarChart data={burndown}><CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} /><XAxis dataKey="day" stroke="#64748B" fontSize={12} /><YAxis stroke="#64748B" fontSize={12} /><Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', color: '#fff' }} /><Bar dataKey="ideal" name="Ideal" fill="#334155" radius={[4,4,0,0]} barSize={32} /><Bar dataKey="actual" name="Actual" fill="#6366F1" radius={[4,4,0,0]} barSize={32} /></BarChart></ResponsiveContainer></div>
        <div className="flex gap-4 mt-4 text-xs text-slate-400 justify-end"><span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-[#334155]"></span>Ideal</span><span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-[#6366F1]"></span>Actual</span></div>
      </div>
    </motion.div>
  );
};

