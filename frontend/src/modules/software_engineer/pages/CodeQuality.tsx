// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, AlertTriangle, Bug, Code2, TrendingUp, TrendingDown, FileText, BarChart3 } from 'lucide-react';
import { ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, AreaChart, Area, BarChart, Bar, LineChart, Line } from 'recharts';

export const CodeQuality = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/software-engineer/code-quality')
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-6 space-y-4 animate-pulse"><div className="h-20 bg-[#0F172A]/90 rounded-2xl" /><div className="grid grid-cols-2 gap-4"><div className="h-32" /><div className="h-32" /></div></div>;

  const metrics = data?.metrics || {
    overall: 'A', bugs: 12, vulnerabilities: 3, codeSmells: 87, coverage: 87.2, duplication: 3.4, linesOfCode: 45230, maintainability: 'A', reliability: 'A', security: 'A-',
  };
  const trends = data?.trends || [
    { month: 'Feb', quality: 3.6, coverage: 82 },
    { month: 'Mar', quality: 3.7, coverage: 84 },
    { month: 'Apr', quality: 3.5, coverage: 83 },
    { month: 'May', quality: 3.8, coverage: 85 },
    { month: 'Jun', quality: 3.9, coverage: 87 },
    { month: 'Jul', quality: 4.0, coverage: 87 },
  ];
  const issuesBySeverity = data?.issuesBySeverity || [
    { severity: 'Blocker', count: 2, color: '#EF4444' },
    { severity: 'Critical', count: 8, color: '#F97316' },
    { severity: 'Major', count: 34, color: '#EAB308' },
    { severity: 'Minor', count: 56, color: '#64748B' },
    { severity: 'Info', count: 89, color: '#22D3EE' },
  ];

  const gradeColor = (g) => {
    if (g === 'A' || g === 'A-') return 'text-emerald-400';
    if (g === 'B' || g === 'B+') return 'text-blue-400';
    if (g === 'C' || g === 'C+') return 'text-amber-400';
    return 'text-rose-400';
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="bg-[#0B0F19] text-slate-100 min-h-screen p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
        <div>
          <div className="text-xs font-semibold text-indigo-400">Software Engineer Workspace</div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2"><Shield className="w-6 h-6 text-indigo-400" /> Code Quality</h1>
          <p className="text-xs text-slate-400 mt-0.5">Overall grade: {metrics.overall}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Overall', value: metrics.overall, color: gradeColor(metrics.overall), icon: Shield },
          { label: 'Bugs', value: metrics.bugs, color: 'text-rose-400', icon: Bug },
          { label: 'Vulnerabilities', value: metrics.vulnerabilities, color: 'text-amber-400', icon: AlertTriangle },
          { label: 'Code Smells', value: metrics.codeSmells, color: 'text-blue-400', icon: Code2 },
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
          <h2 className="text-sm font-bold text-white mb-4">Quality & Coverage Trend</h2>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trends} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <defs><linearGradient id="colorQ" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/><stop offset="95%" stopColor="#6366f1" stopOpacity={0}/></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                <XAxis dataKey="month" stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', color: '#fff' }} />
                <Area type="monotone" dataKey="quality" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorQ)" name="Quality" />
                <Area type="monotone" dataKey="coverage" stroke="#22C55E" strokeWidth={3} fillOpacity={0} name="Coverage %" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
          <h2 className="text-sm font-bold text-white mb-4">Issues by Severity</h2>
          <div className="space-y-3">
            {issuesBySeverity.map(iss => (
              <div key={iss.severity} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: iss.color }} />
                  <span className="text-xs text-slate-300">{iss.severity}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-32 bg-slate-800/50 rounded-full h-2">
                    <div className="h-2 rounded-full" style={{ width: `${(iss.count / Math.max(...issuesBySeverity.map(i => i.count))) * 100}%`, backgroundColor: iss.color }} />
                  </div>
                  <span className="text-xs font-bold text-white w-6 text-right">{iss.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Lines of Code', value: metrics.linesOfCode.toLocaleString(), icon: FileText, color: 'text-indigo-400' },
          { label: 'Duplication', value: `${metrics.duplication}%`, icon: Code2, color: 'text-amber-400' },
          { label: 'Coverage', value: `${metrics.coverage}%`, icon: BarChart3, color: 'text-emerald-400' },
          { label: 'Maintainability', value: metrics.maintainability, color: gradeColor(metrics.maintainability), icon: Shield },
        ].map((m, idx) => (
          <div key={idx} className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-4 backdrop-blur-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{m.label}</span>
              <m.icon className={`w-4 h-4 ${m.color}`} />
            </div>
            <div className={`text-xl font-extrabold ${m.color}`}>{m.value}</div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
