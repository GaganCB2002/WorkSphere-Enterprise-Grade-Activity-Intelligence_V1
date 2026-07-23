// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, MinusCircle, Clock, Folder, FileText, BarChart3 } from 'lucide-react';
import { ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

export const UnitTests = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/software-engineer/unit-tests')
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-6 space-y-4 animate-pulse"><div className="h-20 bg-[#0F172A]/90 rounded-2xl" /><div className="h-64 bg-[#0F172A]/90 rounded-2xl" /><div className="h-48 bg-[#0F172A]/90 rounded-2xl" /></div>;

  const summary = data?.summary || { total: 1248, passed: 1182, failed: 8, skipped: 58, duration: '4m 32s', suites: 42 };
  const suites = data?.suites || [
    { name: 'Auth Service', tests: 156, passed: 152, failed: 1, skipped: 3, duration: '45.2s' },
    { name: 'Payment Service', tests: 234, passed: 228, failed: 2, skipped: 4, duration: '1m 12s' },
    { name: 'User Service', tests: 189, passed: 185, failed: 0, skipped: 4, duration: '52.1s' },
    { name: 'Notification Service', tests: 98, passed: 95, failed: 1, skipped: 2, duration: '28.4s' },
    { name: 'Search Service', tests: 167, passed: 160, failed: 2, skipped: 5, duration: '48.7s' },
    { name: 'API Gateway', tests: 204, passed: 198, failed: 1, skipped: 5, duration: '1m 05s' },
    { name: 'Websocket Service', tests: 87, passed: 82, failed: 1, skipped: 4, duration: '22.3s' },
    { name: 'Dashboard Service', tests: 113, passed: 110, failed: 0, skipped: 3, duration: '35.8s' },
  ];

  const pieData = [
    { name: 'Passed', value: summary.passed, color: '#22C55E' },
    { name: 'Failed', value: summary.failed, color: '#EF4444' },
    { name: 'Skipped', value: summary.skipped, color: '#64748B' },
  ];
  const passRate = Math.round((summary.passed / summary.total) * 100);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="bg-[#0B0F19] text-slate-100 min-h-screen p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
        <div>
          <div className="text-xs font-semibold text-indigo-400">Software Engineer Workspace</div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2"><CheckCircle2 className="w-6 h-6 text-emerald-400" /> Unit Tests</h1>
          <p className="text-xs text-slate-400 mt-0.5">{summary.total} tests across {summary.suites} suites</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-4 backdrop-blur-md"><div className="text-2xl font-extrabold text-white">{summary.total}</div><div className="text-xs text-slate-400">Total Tests</div></div>
        <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-4 backdrop-blur-md"><div className="text-2xl font-extrabold text-emerald-400">{summary.passed}</div><div className="text-xs text-slate-400">Passed</div></div>
        <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-4 backdrop-blur-md"><div className="text-2xl font-extrabold text-rose-400">{summary.failed}</div><div className="text-xs text-slate-400">Failed</div></div>
        <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-4 backdrop-blur-md"><div className="text-2xl font-extrabold text-slate-400">{summary.skipped}</div><div className="text-xs text-slate-400">Skipped</div></div>
        <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-4 backdrop-blur-md"><div className="text-2xl font-extrabold text-indigo-400">{passRate}%</div><div className="text-xs text-slate-400">Pass Rate</div></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
          <h2 className="text-sm font-bold text-white mb-4">Test Results Distribution</h2>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart><Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4} dataKey="value">{pieData.map((e, i) => <Cell key={i} fill={e.color} />)}</Pie><Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', color: '#fff' }} /></PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="lg:col-span-2 bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
          <h2 className="text-sm font-bold text-white mb-4">Test Suites</h2>
          <div className="space-y-2">
            {suites.map((suite, idx) => (
              <div key={suite.name} className="flex items-center justify-between p-3 rounded-xl border border-slate-800/80 bg-[#1E293B]/50 hover:bg-slate-800/60 transition-all">
                <div className="flex items-center gap-3">
                  <Folder className="w-4 h-4 text-indigo-400" />
                  <div><span className="text-xs font-semibold text-white">{suite.name}</span><div className="flex items-center gap-2 text-[10px] text-slate-400"><span>{suite.tests} tests</span><span className="text-emerald-400">{suite.passed}p</span>{suite.failed > 0 && <span className="text-rose-400">{suite.failed}f</span>}<span className="text-slate-500">{suite.skipped}s</span></div></div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-24 bg-slate-800/50 rounded-full h-1.5"><div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${(suite.passed / suite.tests) * 100}%` }} /></div>
                  <span className="text-xs text-slate-400">{suite.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
