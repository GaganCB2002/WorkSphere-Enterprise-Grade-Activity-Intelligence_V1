// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code2, BarChart3, Activity, FileText, Folder } from 'lucide-react';
import { ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, BarChart, Bar } from 'recharts';

export const CodeCoverage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/software-engineer/code-coverage')
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-6 space-y-4 animate-pulse"><div className="h-20 bg-[#0F172A]/90 rounded-2xl" /><div className="h-96 bg-[#0F172A]/90 rounded-2xl" /></div>;

  const overall = data?.overall || { line: 87.2, branch: 82.5, function: 91.3, files: 342 };
  const modules = data?.modules || [
    { name: 'Auth Service', line: 94.2, branch: 90.1, function: 96.5 },
    { name: 'Payment Service', line: 88.5, branch: 84.3, function: 92.1 },
    { name: 'User Service', line: 92.8, branch: 89.2, function: 94.6 },
    { name: 'Notification Service', line: 85.1, branch: 80.4, function: 88.3 },
    { name: 'Search Service', line: 78.4, branch: 73.2, function: 82.7 },
    { name: 'API Gateway', line: 90.6, branch: 86.8, function: 93.2 },
    { name: 'Websocket Service', line: 82.3, branch: 76.5, function: 85.9 },
    { name: 'Dashboard Service', line: 91.5, branch: 87.2, function: 94.1 },
  ];

  const coverageColor = (v) => {
    if (v >= 90) return 'text-emerald-400';
    if (v >= 80) return 'text-amber-400';
    return 'text-rose-400';
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="bg-[#0B0F19] text-slate-100 min-h-screen p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
        <div>
          <div className="text-xs font-semibold text-indigo-400">Software Engineer Workspace</div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2"><Activity className="w-6 h-6 text-emerald-400" /> Code Coverage</h1>
          <p className="text-xs text-slate-400 mt-0.5">{overall.files} files across {modules.length} modules</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Line Coverage', value: `${overall.line}%`, color: coverageColor(overall.line) },
          { label: 'Branch Coverage', value: `${overall.branch}%`, color: coverageColor(overall.branch) },
          { label: 'Function Coverage', value: `${overall.function}%`, color: coverageColor(overall.function) },
        ].map((m, idx) => (
          <motion.div key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}
            className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md text-center">
            <div className={`text-3xl font-extrabold ${m.color}`}>{m.value}</div>
            <div className="text-xs text-slate-400 mt-1">{m.label}</div>
            <div className="w-full bg-slate-800/50 rounded-full h-2.5 mt-3">
              <div className={`h-2.5 rounded-full ${m.color.includes('emerald') ? 'bg-emerald-500' : m.color.includes('amber') ? 'bg-amber-500' : 'bg-rose-500'}`}
                style={{ width: `${parseFloat(m.value)}%` }} />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl overflow-hidden backdrop-blur-md">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-800 bg-[#1E293B]/50">
                {['Module', 'Line Coverage', 'Branch Coverage', 'Function Coverage', 'Status'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {modules.map((m, idx) => (
                <motion.tr key={m.name} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.03 }}
                  className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-all cursor-pointer">
                  <td className="px-4 py-3 text-xs font-semibold text-white">{m.name}</td>
                  <td className="px-4 py-3"><span className={`text-xs font-bold ${coverageColor(m.line)}`}>{m.line}%</span><div className="w-24 bg-slate-800/50 rounded-full h-1.5 mt-1"><div className={`h-1.5 rounded-full ${coverageColor(m.line).includes('emerald') ? 'bg-emerald-500' : coverageColor(m.line).includes('amber') ? 'bg-amber-500' : 'bg-rose-500'}`} style={{ width: `${m.line}%` }} /></div></td>
                  <td className="px-4 py-3"><span className={`text-xs font-bold ${coverageColor(m.branch)}`}>{m.branch}%</span></td>
                  <td className="px-4 py-3"><span className={`text-xs font-bold ${coverageColor(m.function)}`}>{m.function}%</span></td>
                  <td className="px-4 py-3"><span className={`text-xs font-bold ${m.line >= 90 ? 'text-emerald-400' : m.line >= 80 ? 'text-amber-400' : 'text-rose-400'}`}>{m.line >= 90 ? 'Good' : m.line >= 80 ? 'Average' : 'Needs Work'}</span></td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};
