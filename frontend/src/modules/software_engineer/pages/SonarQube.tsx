// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bug, AlertTriangle, Code2, BarChart3, FileText, Shield, CheckCircle2, XCircle, TrendingUp, TrendingDown } from 'lucide-react';
import { ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, BarChart, Bar, Cell } from 'recharts';

export const SonarQube = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/software-engineer/sonarqube')
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-6 space-y-4 animate-pulse"><div className="h-20 bg-[#0F172A]/90 rounded-2xl" /><div className="grid grid-cols-2 gap-4"><div className="h-32" /><div className="h-32" /></div></div>;

  const metrics = data?.metrics || { bugs: 0, vulnerabilities: 2, codeSmells: 45, coverage: 87.2, duplication: 3.4, linesOfCode: 45230, qualityGate: 'PASSED', reliability: 'A', security: 'A', maintainability: 'A' };
  const history = data?.history || [
    { date: 'Feb', bugs: 12, smells: 120, coverage: 82 },
    { date: 'Mar', bugs: 8, smells: 98, coverage: 84 },
    { date: 'Apr', bugs: 6, smells: 85, coverage: 83 },
    { date: 'May', bugs: 4, smells: 72, coverage: 85 },
    { date: 'Jun', bugs: 2, smells: 58, coverage: 87 },
    { date: 'Jul', bugs: 0, smells: 45, coverage: 87 },
  ];

  const ratingColor = (r) => {
    if (r === 'A') return 'text-emerald-400 bg-emerald-500/10';
    if (r === 'A-') return 'text-emerald-400 bg-emerald-500/10';
    if (r === 'B') return 'text-blue-400 bg-blue-500/10';
    if (r === 'C') return 'text-amber-400 bg-amber-500/10';
    return 'text-rose-400 bg-rose-500/10';
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="bg-[#0B0F19] text-slate-100 min-h-screen p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
        <div>
          <div className="text-xs font-semibold text-indigo-400">Software Engineer Workspace</div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2"><BarChart3 className="w-6 h-6 text-indigo-400" /> SonarQube</h1>
          <p className="text-xs text-slate-400 mt-0.5">Quality gate: {metrics.qualityGate}</p>
        </div>
        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold ${metrics.qualityGate === 'PASSED' ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' : 'text-rose-400 bg-rose-500/10 border-rose-500/20'}`}>
          {metrics.qualityGate === 'PASSED' ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
          {metrics.qualityGate}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Bugs', value: metrics.bugs, icon: Bug, color: metrics.bugs === 0 ? 'text-emerald-400' : 'text-rose-400' },
          { label: 'Vulnerabilities', value: metrics.vulnerabilities, icon: Shield, color: metrics.vulnerabilities === 0 ? 'text-emerald-400' : 'text-amber-400' },
          { label: 'Code Smells', value: metrics.codeSmells, icon: AlertTriangle, color: 'text-blue-400' },
          { label: 'Coverage', value: `${metrics.coverage}%`, icon: BarChart3, color: 'text-emerald-400' },
        ].map((m, idx) => (
          <motion.div key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}
            className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-4 backdrop-blur-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{m.label}</span>
              <m.icon className={`w-4 h-4 ${m.color}`} />
            </div>
            <div className={`text-2xl font-extrabold ${m.color}`}>{m.value}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
          <h2 className="text-sm font-bold text-white mb-4">Bug & Smell Trend</h2>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={history} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                <XAxis dataKey="date" stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', color: '#fff' }} />
                <Bar dataKey="bugs" name="Bugs" fill="#EF4444" radius={[4, 4, 0, 0]} barSize={24} />
                <Bar dataKey="smells" name="Code Smells" fill="#F97316" radius={[4, 4, 0, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
          <h2 className="text-sm font-bold text-white mb-4">Ratings</h2>
          <div className="space-y-4">
            {[
              { label: 'Reliability', value: metrics.reliability },
              { label: 'Security', value: metrics.security },
              { label: 'Maintainability', value: metrics.maintainability },
            ].map(r => (
              <div key={r.label} className="flex items-center justify-between p-3 rounded-xl border border-slate-800/80 bg-[#1E293B]/50">
                <span className="text-xs text-slate-300">{r.label}</span>
                <span className={`px-3 py-1 rounded-lg text-xs font-extrabold border ${ratingColor(r.value)}`}>{r.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-4 backdrop-blur-md"><div className="text-2xl font-extrabold text-white">{metrics.linesOfCode.toLocaleString()}</div><div className="text-xs text-slate-400">Lines of Code</div></div>
        <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-4 backdrop-blur-md"><div className="text-2xl font-extrabold text-amber-400">{metrics.duplication}%</div><div className="text-xs text-slate-400">Duplication</div></div>
        <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-4 backdrop-blur-md"><div className="text-2xl font-extrabold text-emerald-400">{metrics.coverage}%</div><div className="text-xs text-slate-400">Coverage</div></div>
      </div>
    </motion.div>
  );
};
