// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, MinusCircle, Clock, Globe, Monitor, Smartphone, Tablet } from 'lucide-react';

export const E2ETests = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/software-engineer/e2e-tests')
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-6 space-y-4 animate-pulse"><div className="h-20 bg-[#0F172A]/90 rounded-2xl" /><div className="h-96 bg-[#0F172A]/90 rounded-2xl" /></div>;

  const summary = data?.summary || { total: 256, passed: 234, failed: 8, skipped: 14, duration: '24m 15s', scenarios: 85 };
  const scenarios = data?.scenarios || [
    { name: 'User Login Flow', browser: 'Chrome', status: 'passed', duration: '12.3s' },
    { name: 'User Login Flow', browser: 'Firefox', status: 'passed', duration: '14.1s' },
    { name: 'User Login Flow', browser: 'Safari', status: 'passed', duration: '15.8s' },
    { name: 'Payment Checkout', browser: 'Chrome', status: 'passed', duration: '28.4s' },
    { name: 'Payment Checkout', browser: 'Firefox', status: 'failed', duration: '32.2s' },
    { name: 'Payment Checkout', browser: 'Safari', status: 'passed', duration: '30.5s' },
    { name: 'Search & Results', browser: 'Chrome', status: 'passed', duration: '8.2s' },
    { name: 'Search & Results', browser: 'Firefox', status: 'passed', duration: '9.5s' },
    { name: 'Search & Results', browser: 'Safari', status: 'passed', duration: '10.1s' },
    { name: 'Dashboard Load', browser: 'Chrome', status: 'failed', duration: '6.7s' },
    { name: 'Dashboard Load', browser: 'Firefox', status: 'passed', duration: '7.2s' },
    { name: 'Dashboard Load', browser: 'Safari', status: 'skipped', duration: '-' },
    { name: 'File Upload Flow', browser: 'Chrome', status: 'passed', duration: '18.5s' },
    { name: 'File Upload Flow', browser: 'Firefox', status: 'passed', duration: '20.3s' },
    { name: 'File Upload Flow', browser: 'Safari', status: 'passed', duration: '22.1s' },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="bg-[#0B0F19] text-slate-100 min-h-screen p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
        <div>
          <div className="text-xs font-semibold text-indigo-400">Software Engineer Workspace</div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2"><Globe className="w-6 h-6 text-cyan-400" /> E2E Tests</h1>
          <p className="text-xs text-slate-400 mt-0.5">{summary.total} tests &bull; {summary.scenarios} scenarios</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-4 backdrop-blur-md"><div className="text-2xl font-extrabold text-white">{summary.total}</div><div className="text-xs text-slate-400">Total</div></div>
        <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-4 backdrop-blur-md"><div className="text-2xl font-extrabold text-emerald-400">{summary.passed}</div><div className="text-xs text-slate-400">Passed</div></div>
        <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-4 backdrop-blur-md"><div className="text-2xl font-extrabold text-rose-400">{summary.failed}</div><div className="text-xs text-slate-400">Failed</div></div>
        <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-4 backdrop-blur-md"><div className="text-2xl font-extrabold text-slate-400">{summary.skipped}</div><div className="text-xs text-slate-400">Skipped</div></div>
        <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-4 backdrop-blur-md"><div className="text-2xl font-extrabold text-indigo-400">{summary.duration}</div><div className="text-xs text-slate-400">Duration</div></div>
      </div>

      <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl overflow-hidden backdrop-blur-md">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-800 bg-[#1E293B]/50">
                {['Scenario', 'Browser', 'Status', 'Duration'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {scenarios.map((s, idx) => (
                <motion.tr key={idx} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.02 }}
                  className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-all cursor-pointer">
                  <td className="px-4 py-3 text-xs font-semibold text-slate-200">{s.name}</td>
                  <td className="px-4 py-3"><div className="flex items-center gap-1.5 text-xs text-slate-300">
                    {s.browser === 'Chrome' ? <Monitor className="w-3.5 h-3.5" /> : s.browser === 'Firefox' ? <Globe className="w-3.5 h-3.5" /> : <Smartphone className="w-3.5 h-3.5" />}
                    {s.browser}
                  </div></td>
                  <td className="px-4 py-3"><div className="flex items-center gap-1.5 text-xs">{s.status === 'passed' ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : s.status === 'failed' ? <XCircle className="w-4 h-4 text-rose-400" /> : <MinusCircle className="w-4 h-4 text-slate-400" />}<span className={`font-semibold ${s.status === 'passed' ? 'text-emerald-400' : s.status === 'failed' ? 'text-rose-400' : 'text-slate-400'}`}>{s.status}</span></div></td>
                  <td className="px-4 py-3 text-xs text-slate-400">{s.duration}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};
