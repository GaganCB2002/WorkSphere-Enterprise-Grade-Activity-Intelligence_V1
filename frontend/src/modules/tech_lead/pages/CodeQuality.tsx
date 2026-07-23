// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Bug, CheckCircle2, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';
import { ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

export const CodeQuality = () => {
  const [data, setData] = useState<any>(null);
  useEffect(() => { fetch('/api/tech-lead/analytics/code-quality').then(r => r.json()).then(d => setData(d)).catch(() => {}); }, []);
  const qualityData = data?.qualityData || [{ sprint: 'S38', score: 88, coverage: 72, bugs: 12 }, { sprint: 'S39', score: 90, coverage: 75, bugs: 8 }, { sprint: 'S40', score: 85, coverage: 70, bugs: 15 }, { sprint: 'S41', score: 92, coverage: 78, bugs: 5 }, { sprint: 'S42', score: 91, coverage: 80, bugs: 3 }];
  const severityData = data?.severityData || [{ name: 'Critical', value: 2 }, { name: 'Major', value: 5 }, { name: 'Minor', value: 12 }, { name: 'Info', value: 20 }];
  const COLORS = ['#ef4444', '#f59e0b', '#3b82f6', '#64748b'];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#0B0F19] text-slate-100 min-h-screen p-4 sm:p-6 space-y-6">
      <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2"><Shield className="w-6 h-6 text-indigo-500" /> Code Quality</h1>
        <p className="text-xs text-slate-400 mt-0.5">SonarQube & Code Climate metrics</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[{ label: 'Quality Gate', value: 'A-', icon: Shield, color: 'text-emerald-400' }, { label: 'Coverage', value: '80%', icon: CheckCircle2, color: 'text-indigo-400' }, { label: 'Bugs', value: '3', icon: Bug, color: 'text-rose-400' }, { label: 'Code Smells', value: '18', icon: AlertTriangle, color: 'text-amber-400' }].map((s, i) => (
          <div key={i} className="bg-[#0F172A]/90 border border-slate-800/80 rounded-xl p-4 backdrop-blur-md flex items-center gap-3"><s.icon className={"w-5 h-5 " + s.color} /><div><p className="text-xs text-slate-400">{s.label}</p><p className={"text-xl font-extrabold " + s.color}>{s.value}</p></div></div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-md">
          <h2 className="text-base font-bold text-white mb-4">Quality Trends</h2>
          <div className="h-64"><ResponsiveContainer width="100%" height="100%"><LineChart data={qualityData}><CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} /><XAxis dataKey="sprint" stroke="#64748B" fontSize={12} /><YAxis stroke="#64748B" fontSize={12} /><Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', color: '#fff' }} /><Line type="monotone" dataKey="score" stroke="#6366f1" strokeWidth={3} name="Score" /><Line type="monotone" dataKey="coverage" stroke="#10b981" strokeWidth={3} name="Coverage" /></LineChart></ResponsiveContainer></div>
        </div>
        <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-md">
          <h2 className="text-base font-bold text-white mb-4">Issue Severity</h2>
          <div className="h-64 flex items-center justify-center"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={severityData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={5} dataKey="value">{severityData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}</Pie><Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', color: '#fff' }} /></PieChart></ResponsiveContainer></div>
          <div className="flex justify-center gap-4 mt-2 text-xs">{severityData.map((e, i) => <div key={e.name} className="flex items-center gap-1.5 text-slate-300"><span className="w-2.5 h-2.5 rounded-full" style={{backgroundColor: COLORS[i]}}></span>{e.name}</div>)}</div>
        </div>
      </div>
    </motion.div>
  );
};

