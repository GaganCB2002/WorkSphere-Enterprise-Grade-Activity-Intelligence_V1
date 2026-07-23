// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bug, AlertTriangle, CheckCircle2, Clock, Filter, Search, MoreHorizontal } from 'lucide-react';

export const BugTracking = () => {
  const [data, setData] = useState<any>(null);
  useEffect(() => { fetch('/api/tech-lead/tasks/bugs').then(r => r.json()).then(d => setData(d)).catch(() => {}); }, []);
  const bugs = data?.bugs || [
    { id: 'BUG-401', title: 'Payment gateway timeout on high load', severity: 'Critical', status: 'open', reporter: 'Sarah J.', created: '2h ago' },
    { id: 'BUG-402', title: 'Memory leak in Redis connection pool', severity: 'High', status: 'in-progress', reporter: 'Alex D.', created: '1d ago' },
    { id: 'BUG-403', title: 'UI flicker on dark mode toggle', severity: 'Low', status: 'resolved', reporter: 'Emma W.', created: '3d ago' },
    { id: 'BUG-404', title: 'API returns 500 on malformed JSON', severity: 'High', status: 'open', reporter: 'Mike T.', created: '4h ago' },
    { id: 'BUG-405', title: 'Email notification delay', severity: 'Medium', status: 'in-progress', reporter: 'David O.', created: '2d ago' },
  ];
  const getSeverityColor = (s) => ({ 'Critical': 'text-rose-400 bg-rose-400/10 border-rose-400/20', 'High': 'text-amber-400 bg-amber-400/10 border-amber-400/20', 'Medium': 'text-blue-400 bg-blue-400/10 border-blue-400/20', 'Low': 'text-slate-400 bg-slate-400/10 border-slate-400/20' }[s] || '');
  const getStatusIcon = (s) => s === 'open' ? <Bug className="w-3.5 h-3.5 text-rose-400" /> : s === 'in-progress' ? <Clock className="w-3.5 h-3.5 text-amber-400" /> : <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#0B0F19] text-slate-100 min-h-screen p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
        <div><h1 className="text-2xl font-bold text-white flex items-center gap-2"><Bug className="w-6 h-6 text-rose-500" /> Bug Tracking</h1><p className="text-xs text-slate-400 mt-1">{bugs.filter(b => b.status !== 'resolved').length} unresolved bugs</p></div>
        <div className="flex items-center gap-3"><div className="relative"><Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#8b949e]" /><input type="text" placeholder="Search bugs..." className="w-48 bg-[#1E293B] border border-slate-700/60 rounded-lg py-1.5 pl-8 pr-3 text-xs text-slate-200 focus:outline-none focus:border-indigo-500" /></div><button className="flex items-center gap-2 bg-rose-600 hover:bg-rose-500 text-white px-3 py-1.5 rounded-md text-xs font-semibold"><Bug className="w-4 h-4" /> Report Bug</button></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[{ label: 'Critical', count: bugs.filter(b => b.severity === 'Critical').length, color: 'text-rose-400' }, { label: 'In Progress', count: bugs.filter(b => b.status === 'in-progress').length, color: 'text-amber-400' }, { label: 'Resolved', count: bugs.filter(b => b.status === 'resolved').length, color: 'text-emerald-400' }].map((s, i) => (
          <div key={i} className="bg-[#0F172A]/90 border border-slate-800/80 rounded-xl p-4 backdrop-blur-md"><p className="text-xs text-slate-400">{s.label}</p><p className={"text-2xl font-extrabold " + s.color}>{s.count}</p></div>
        ))}
      </div>
      <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl overflow-hidden backdrop-blur-md">
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider"><div className="col-span-4">Bug</div><div className="col-span-2">Severity</div><div className="col-span-2">Status</div><div className="col-span-2">Reporter</div><div className="col-span-2">Created</div></div>
        <div className="divide-y divide-slate-800">{bugs.map((b, i) => (
          <div key={i} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-[#1E293B]/30 transition-colors cursor-pointer">
            <div className="col-span-4"><p className="text-sm font-semibold text-slate-200">{b.title}</p><span className="text-[10px] font-mono text-[#8b949e]">{b.id}</span></div>
            <div className="col-span-2"><span className={"text-xs font-bold px-2 py-0.5 rounded border " + getSeverityColor(b.severity)}>{b.severity}</span></div>
            <div className="col-span-2 flex items-center gap-1.5 text-xs font-bold">{getStatusIcon(b.status)}<span className="text-slate-300">{b.status}</span></div>
            <div className="col-span-2"><span className="text-xs text-slate-400">{b.reporter}</span></div>
            <div className="col-span-2 flex items-center justify-between"><span className="text-xs text-slate-400">{b.created}</span><MoreHorizontal className="w-4 h-4 text-[#8b949e]" /></div>
          </div>
        ))}</div>
      </div>
    </motion.div>
  );
};

