// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, Clock, Activity, Server, Zap } from 'lucide-react';
import { ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, BarChart, Bar } from 'recharts';

export const ApiTesting = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/software-engineer/api-testing')
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-6 space-y-4 animate-pulse"><div className="h-20 bg-[#0F172A]/90 rounded-2xl" /><div className="h-96 bg-[#0F172A]/90 rounded-2xl" /></div>;

  const endpoints = data?.endpoints || [
    { path: '/api/v2/users', method: 'GET', status: 'passed', responseTime: '124ms', lastTested: '2m ago' },
    { path: '/api/v2/users/:id', method: 'GET', status: 'passed', responseTime: '98ms', lastTested: '2m ago' },
    { path: '/api/v2/users', method: 'POST', status: 'passed', responseTime: '245ms', lastTested: '5m ago' },
    { path: '/api/v2/auth/login', method: 'POST', status: 'passed', responseTime: '312ms', lastTested: '3m ago' },
    { path: '/api/v2/auth/refresh', method: 'POST', status: 'failed', responseTime: '5100ms', lastTested: '1m ago' },
    { path: '/api/v2/payments', method: 'POST', status: 'passed', responseTime: '890ms', lastTested: '10m ago' },
    { path: '/api/v2/payments/:id', method: 'GET', status: 'passed', responseTime: '156ms', lastTested: '10m ago' },
    { path: '/api/v2/notifications', method: 'GET', status: 'passed', responseTime: '67ms', lastTested: '15m ago' },
    { path: '/api/v2/search', method: 'GET', status: 'passed', responseTime: '423ms', lastTested: '8m ago' },
    { path: '/api/v2/upload', method: 'POST', status: 'failed', responseTime: '12000ms', lastTested: '30m ago' },
    { path: '/api/v2/analytics', method: 'GET', status: 'passed', responseTime: '890ms', lastTested: '20m ago' },
    { path: '/api/v2/health', method: 'GET', status: 'passed', responseTime: '45ms', lastTested: '1m ago' },
  ];

  const methodColors = { GET: 'text-emerald-400 bg-emerald-500/10', POST: 'text-blue-400 bg-blue-500/10', PUT: 'text-amber-400 bg-amber-500/10', DELETE: 'text-rose-400 bg-rose-500/10' };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="bg-[#0B0F19] text-slate-100 min-h-screen p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
        <div>
          <div className="text-xs font-semibold text-indigo-400">Software Engineer Workspace</div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2"><Zap className="w-6 h-6 text-amber-400" /> API Testing</h1>
          <p className="text-xs text-slate-400 mt-0.5">{endpoints.length} endpoints tested</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Endpoints', value: endpoints.length, color: 'text-white' },
          { label: 'Passed', value: endpoints.filter(e => e.status === 'passed').length, color: 'text-emerald-400' },
          { label: 'Failed', value: endpoints.filter(e => e.status === 'failed').length, color: 'text-rose-400' },
          { label: 'Avg Response', value: `${Math.round(endpoints.reduce((s, e) => s + parseInt(e.responseTime), 0) / endpoints.length)}ms`, color: 'text-indigo-400' },
        ].map((s, i) => (
          <div key={i} className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-4 backdrop-blur-md">
            <div className={`text-2xl font-extrabold ${s.color}`}>{s.value}</div><div className="text-xs text-slate-400">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl overflow-hidden backdrop-blur-md">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-800 bg-[#1E293B]/50">
                {['Endpoint', 'Method', 'Status', 'Response Time', 'Last Tested'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {endpoints.map((ep, idx) => (
                <motion.tr key={ep.path + ep.method} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.02 }}
                  className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-all cursor-pointer">
                  <td className="px-4 py-3 text-xs font-mono font-bold text-slate-200">{ep.path}</td>
                  <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${methodColors[ep.method] || 'text-slate-400 bg-slate-500/10'}`}>{ep.method}</span></td>
                  <td className="px-4 py-3"><div className="flex items-center gap-1.5 text-xs">{ep.status === 'passed' ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <XCircle className="w-4 h-4 text-rose-400" />}<span className={`font-semibold ${ep.status === 'passed' ? 'text-emerald-400' : 'text-rose-400'}`}>{ep.status}</span></div></td>
                  <td className="px-4 py-3"><div className="flex items-center gap-1.5 text-xs"><Clock className="w-3.5 h-3.5 text-slate-400" /><span className={`font-bold ${parseInt(ep.responseTime) > 1000 ? 'text-rose-400' : parseInt(ep.responseTime) > 500 ? 'text-amber-400' : 'text-emerald-400'}`}>{ep.responseTime}</span></div></td>
                  <td className="px-4 py-3 text-xs text-slate-400">{ep.lastTested}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};
