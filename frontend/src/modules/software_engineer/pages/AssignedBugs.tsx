// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bug, Search, ArrowUpDown, AlertTriangle, CheckCircle2, Clock, PlayCircle, User, Calendar, Filter } from 'lucide-react';

export const AssignedBugs = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    fetch('/api/software-engineer/bugs')
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-6 space-y-4 animate-pulse"><div className="h-20 bg-[#0F172A]/90 rounded-2xl" /><div className="h-96 bg-[#0F172A]/90 rounded-2xl" /></div>;

  const bugs = data?.bugs || [
    { id: 'BUG-501', title: 'Memory leak in Redis connection pool', severity: 'Critical', status: 'Open', assignee: 'Alex D.', created: 'Jul 18', fixVersion: 'v2.5.0' },
    { id: 'BUG-502', title: 'Webhook timeout under high load', severity: 'High', status: 'In Progress', assignee: 'Alex D.', created: 'Jul 17', fixVersion: 'v2.5.0' },
    { id: 'BUG-503', title: 'UI flicker on dark mode toggle', severity: 'Medium', status: 'Open', assignee: 'Sarah J.', created: 'Jul 16', fixVersion: 'v2.5.1' },
    { id: 'BUG-504', title: 'API returns 500 on invalid JSON body', severity: 'High', status: 'Resolved', assignee: 'Alex D.', created: 'Jul 14', fixVersion: 'v2.4.2' },
    { id: 'BUG-505', title: 'Search pagination off-by-one error', severity: 'Medium', status: 'In Progress', assignee: 'Emma W.', created: 'Jul 13', fixVersion: 'v2.5.0' },
    { id: 'BUG-506', title: 'Authentication token not refreshing', severity: 'Critical', status: 'Open', assignee: 'Alex D.', created: 'Jul 19', fixVersion: 'v2.4.2' },
    { id: 'BUG-507', title: 'File upload exceeds size limit silently', severity: 'Low', status: 'Open', assignee: 'Mike T.', created: 'Jul 12', fixVersion: 'v2.5.1' },
    { id: 'BUG-508', title: 'Dashboard charts not loading on Safari', severity: 'Medium', status: 'Resolved', assignee: 'Sarah J.', created: 'Jul 10', fixVersion: 'v2.4.2' },
    { id: 'BUG-509', title: 'Database connection pool exhaustion', severity: 'Critical', status: 'In Progress', assignee: 'Alex D.', created: 'Jul 19', fixVersion: 'v2.5.0' },
    { id: 'BUG-510', title: 'Notification emails not sending', severity: 'High', status: 'Open', assignee: 'Mike T.', created: 'Jul 18', fixVersion: 'v2.5.0' },
  ];

  const severityColor = (s) => {
    switch (s) {
      case 'Critical': return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
      case 'High': return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      case 'Medium': return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
      default: return 'text-slate-400 bg-slate-500/10 border-slate-500/20';
    }
  };

  const statusIcon = (s) => {
    switch (s) {
      case 'Open': return <AlertTriangle className="w-4 h-4 text-rose-400" />;
      case 'In Progress': return <PlayCircle className="w-4 h-4 text-blue-400" />;
      case 'Resolved': return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
      default: return <Clock className="w-4 h-4 text-slate-400" />;
    }
  };

  const filtered = filter === 'All' ? bugs : bugs.filter(b => b.status === filter);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="bg-[#0B0F19] text-slate-100 min-h-screen p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
        <div>
          <div className="text-xs font-semibold text-indigo-400">Software Engineer Workspace</div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2"><Bug className="w-6 h-6 text-rose-400" /> Assigned Bugs</h1>
          <p className="text-xs text-slate-400 mt-0.5">{bugs.length} total &bull; {bugs.filter(b => b.severity === 'Critical').length} critical</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {['All', 'Open', 'In Progress', 'Resolved'].map(s => (
          <button key={s} onClick={() => setFilter(s)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${filter === s ? 'bg-indigo-600 text-white border-indigo-500/50' : 'bg-[#1E293B]/50 text-slate-400 border-slate-700/60 hover:text-white'}`}>{s}</button>
        ))}
        <div className="flex-1" />
        <span className="text-xs text-slate-400">{filtered.length} bugs</span>
      </div>

      <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl overflow-hidden backdrop-blur-md">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-800 bg-[#1E293B]/50">
                {['ID', 'Title', 'Severity', 'Status', 'Assignee', 'Created', 'Fix Version'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((bug, idx) => (
                <motion.tr key={bug.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.03 }}
                  className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-all cursor-pointer">
                  <td className="px-4 py-3 text-xs font-mono font-bold text-rose-400">{bug.id}</td>
                  <td className="px-4 py-3 text-xs font-semibold text-slate-200">{bug.title}</td>
                  <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${severityColor(bug.severity)}`}>{bug.severity}</span></td>
                  <td className="px-4 py-3"><div className="flex items-center gap-1.5 text-xs">{statusIcon(bug.status)}<span className="font-semibold">{bug.status}</span></div></td>
                  <td className="px-4 py-3"><div className="flex items-center gap-2 text-xs text-slate-300"><div className="w-5 h-5 rounded-full bg-indigo-900 border border-indigo-500/30 flex items-center justify-center text-[8px] font-bold text-indigo-400">{bug.assignee.split(' ').map(w => w[0]).join('')}</div>{bug.assignee}</div></td>
                  <td className="px-4 py-3 text-xs text-slate-400">{bug.created}</td>
                  <td className="px-4 py-3"><span className="text-xs font-mono font-bold text-indigo-400">{bug.fixVersion}</span></td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};
