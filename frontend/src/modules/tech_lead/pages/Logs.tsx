// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Search, Filter, Download, AlertTriangle, Info, Bug, Clock, ChevronRight } from 'lucide-react';

export const Logs = () => {
  const [data, setData] = useState<any>(null);
  useEffect(() => { fetch('/api/tech-lead/monitoring/logs').then(r => r.json()).then(d => setData(d)).catch(() => {}); }, []);
  const logs = data?.logs || [
    { level: 'error', service: 'api-gateway', message: 'Connection timeout to auth service', time: '10:15:23 AM', source: '10.0.1.12' },
    { level: 'warn', service: 'auth-service', message: 'Rate limit approaching for /api/auth/login', time: '10:14:55 AM', source: '10.0.1.13' },
    { level: 'info', service: 'db-primary', message: 'Query completed: SELECT * FROM users', time: '10:14:30 AM', source: '10.0.2.5' },
    { level: 'error', service: 'ml-worker', message: 'Model inference failed: OOM error', time: '10:12:18 AM', source: '10.0.4.1' },
    { level: 'info', service: 'api-gateway', message: 'Deployment v2.4.1 rolled out successfully', time: '10:10:00 AM', source: '10.0.1.12' },
    { level: 'warn', service: 'cache-01', message: 'Memory usage at 88% on Redis instance', time: '10:08:45 AM', source: '10.0.3.2' },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#0B0F19] text-slate-100 min-h-screen p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
        <div><h1 className="text-2xl font-bold text-white flex items-center gap-2"><Terminal className="w-6 h-6 text-indigo-500" /> System Logs</h1><p className="text-xs text-slate-400 mt-0.5">Aggregated logs from all services</p></div>
        <div className="flex items-center gap-3"><div className="relative"><Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#8b949e]" /><input type="text" placeholder="Search logs..." className="w-48 bg-[#1E293B] border border-slate-700/60 rounded-lg py-1.5 pl-8 pr-3 text-xs text-slate-200 focus:outline-none" /></div><button className="flex items-center gap-2 bg-[#1E293B] hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-md text-xs font-semibold border border-slate-700/60"><Download className="w-4 h-4" /> Export</button></div>
      </div>
      <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl overflow-hidden backdrop-blur-md">
        <div className="divide-y divide-slate-800">{logs.map((log, i) => (
          <div key={i} className="p-3 flex items-center gap-4 hover:bg-[#1E293B]/30 transition-colors font-mono text-xs">
            <span className={"flex items-center gap-1 w-16 text-xs font-bold " + (log.level === 'error' ? 'text-rose-400' : log.level === 'warn' ? 'text-amber-400' : 'text-emerald-400')}>
              {log.level === 'error' ? <Bug className="w-3 h-3" /> : log.level === 'warn' ? <AlertTriangle className="w-3 h-3" /> : <Info className="w-3 h-3" />}{log.level}
            </span>
            <span className="w-32 text-slate-500">{log.time}</span>
            <span className="w-32 text-indigo-400">{log.service}</span>
            <span className="flex-1 text-slate-300">{log.message}</span>
            <span className="w-32 text-slate-500 text-right">{log.source}</span>
          </div>
        ))}</div>
      </div>
    </motion.div>
  );
};

