// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, FileText, Clock, DollarSign, TrendingUp, Folder, Code2 } from 'lucide-react';
import { ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, BarChart, Bar, Cell } from 'recharts';

export const TechnicalDebt = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/software-engineer/technical-debt')
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-6 space-y-4 animate-pulse"><div className="h-20 bg-[#0F172A]/90 rounded-2xl" /><div className="h-64 bg-[#0F172A]/90 rounded-2xl" /></div>;

  const summary = data?.summary || { ratio: '4.2%', estimatedHours: 64, files: 128, debtByCategory: { codeSmells: 28, duplication: 12, testCoverage: 16, documentation: 8 } };
  const hotspots = data?.hotspots || [
    { file: 'src/services/payment/payment.service.ts', lines: 420, debt: '8h', category: 'Complexity' },
    { file: 'src/legacy/auth/middleware.ts', lines: 560, debt: '12h', category: 'Legacy Code' },
    { file: 'src/api/v1/controllers/user.controller.ts', lines: 320, debt: '6h', category: 'Code Smells' },
    { file: 'src/utils/data-migration.ts', lines: 240, debt: '4h', category: 'Duplication' },
    { file: 'src/components/dashboard/charts.tsx', lines: 180, debt: '3h', category: 'Complexity' },
    { file: 'src/services/notification/email.ts', lines: 290, debt: '5h', category: 'Test Coverage' },
  ];
  const categoryData = [
    { name: 'Code Smells', hours: 28, color: '#F97316' },
    { name: 'Duplication', hours: 12, color: '#EAB308' },
    { name: 'Test Coverage', hours: 16, color: '#64748B' },
    { name: 'Documentation', hours: 8, color: '#22D3EE' },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="bg-[#0B0F19] text-slate-100 min-h-screen p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
        <div>
          <div className="text-xs font-semibold text-indigo-400">Software Engineer Workspace</div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2"><AlertTriangle className="w-6 h-6 text-amber-400" /> Technical Debt</h1>
          <p className="text-xs text-slate-400 mt-0.5">{summary.ratio} debt ratio &bull; {summary.estimatedHours}h estimated</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Debt Ratio', value: summary.ratio, icon: TrendingUp, color: 'text-amber-400' },
          { label: 'Est. Effort', value: `${summary.estimatedHours}h`, icon: Clock, color: 'text-indigo-400' },
          { label: 'Files Affected', value: summary.files, icon: FileText, color: 'text-blue-400' },
          { label: 'Categories', value: Object.keys(summary.debtByCategory).length, icon: Folder, color: 'text-emerald-400' },
        ].map((m, idx) => (
          <motion.div key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}
            className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-4 backdrop-blur-md">
            <div className="flex items-center justify-between mb-2"><span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{m.label}</span><m.icon className={`w-4 h-4 ${m.color}`} /></div>
            <div className={`text-2xl font-extrabold ${m.color}`}>{m.value}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
          <h2 className="text-sm font-bold text-white mb-4">Debt by Category</h2>
          <div className="space-y-4">
            {categoryData.map(cat => (
              <div key={cat.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} /><span className="text-xs text-slate-300">{cat.name}</span></div>
                <div className="flex items-center gap-3"><div className="w-32 bg-slate-800/50 rounded-full h-2"><div className="h-2 rounded-full" style={{ width: `${(cat.hours / 28) * 100}%`, backgroundColor: cat.color }} /></div><span className="text-xs font-bold text-white">{cat.hours}h</span></div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
          <h2 className="text-sm font-bold text-white mb-4">File Hotspots</h2>
          <div className="space-y-2">
            {hotspots.map((h, idx) => (
              <div key={idx} className="flex items-center justify-between p-2.5 rounded-lg border border-slate-800/80 bg-[#1E293B]/50 hover:bg-slate-800/60 transition-all cursor-pointer">
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <FileText className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                  <span className="text-[11px] font-mono font-semibold text-slate-200 truncate">{h.file}</span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[10px] text-slate-400">{h.lines} lines</span>
                  <span className="text-[10px] font-bold text-amber-400">{h.debt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
