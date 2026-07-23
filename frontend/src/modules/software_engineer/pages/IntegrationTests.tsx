// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, MinusCircle, Clock, Server, Activity, BarChart3 } from 'lucide-react';
import { ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, BarChart, Bar } from 'recharts';

export const IntegrationTests = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/software-engineer/integration-tests')
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-6 space-y-4 animate-pulse"><div className="h-20 bg-[#0F172A]/90 rounded-2xl" /><div className="h-64 bg-[#0F172A]/90 rounded-2xl" /></div>;

  const summary = data?.summary || { total: 486, passed: 452, failed: 12, skipped: 22, duration: '12m 18s' };
  const services = data?.services || [
    { name: 'Auth ↔ User', coverage: '92%', tests: 48, passed: 46, failed: 1, skipped: 1 },
    { name: 'Payment ↔ Stripe', coverage: '88%', tests: 72, passed: 68, failed: 2, skipped: 2 },
    { name: 'Notification ↔ Email', coverage: '95%', tests: 36, passed: 35, failed: 0, skipped: 1 },
    { name: 'Search ↔ Elasticsearch', coverage: '85%', tests: 54, passed: 49, failed: 2, skipped: 3 },
    { name: 'API ↔ Gateway', coverage: '91%', tests: 96, passed: 92, failed: 2, skipped: 2 },
    { name: 'Cache ↔ Redis', coverage: '94%', tests: 42, passed: 40, failed: 1, skipped: 1 },
    { name: 'Database ↔ ORM', coverage: '90%', tests: 78, passed: 72, failed: 3, skipped: 3 },
    { name: 'Queue ↔ RabbitMQ', coverage: '87%', tests: 30, passed: 27, failed: 1, skipped: 2 },
    { name: 'Storage ↔ S3', coverage: '93%', tests: 30, passed: 23, failed: 0, skipped: 7 },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="bg-[#0B0F19] text-slate-100 min-h-screen p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
        <div>
          <div className="text-xs font-semibold text-indigo-400">Software Engineer Workspace</div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2"><Server className="w-6 h-6 text-indigo-400" /> Integration Tests</h1>
          <p className="text-xs text-slate-400 mt-0.5">{summary.total} tests across {services.length} service integrations</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total', value: summary.total, color: 'text-white' },
          { label: 'Passed', value: summary.passed, color: 'text-emerald-400' },
          { label: 'Failed', value: summary.failed, color: 'text-rose-400' },
          { label: 'Skipped', value: summary.skipped, color: 'text-slate-400' },
        ].map((s, i) => (
          <div key={i} className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-4 backdrop-blur-md">
            <div className={`text-2xl font-extrabold ${s.color}`}>{s.value}</div>
            <div className="text-xs text-slate-400">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl overflow-hidden backdrop-blur-md">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-800 bg-[#1E293B]/50">
                {['Service Integration', 'Coverage', 'Tests', 'Passed', 'Failed', 'Skipped', 'Health'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {services.map((s, idx) => (
                <motion.tr key={s.name} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.03 }}
                  className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-all cursor-pointer">
                  <td className="px-4 py-3 text-xs font-semibold text-white">{s.name}</td>
                  <td className="px-4 py-3 text-xs font-bold text-emerald-400">{s.coverage}</td>
                  <td className="px-4 py-3 text-xs text-slate-300">{s.tests}</td>
                  <td className="px-4 py-3 text-xs text-emerald-400">{s.passed}</td>
                  <td className="px-4 py-3 text-xs text-rose-400">{s.failed}</td>
                  <td className="px-4 py-3 text-xs text-slate-400">{s.skipped}</td>
                  <td className="px-4 py-3">{s.failed === 0 ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <XCircle className="w-4 h-4 text-rose-400" />}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};
