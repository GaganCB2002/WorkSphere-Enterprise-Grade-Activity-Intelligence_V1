// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Calendar, BarChart3, TrendingUp, CheckCircle2, AlertTriangle } from 'lucide-react';

export const SprintReports = () => {
  const [data, setData] = useState<any>(null);
  useEffect(() => { fetch('/api/tech-lead/sprints/reports').then(r => r.json()).then(d => setData(d)).catch(() => {}); }, []);
  const reports = data?.reports || [
    { id: 'SR-42', sprint: 'Sprint 42', period: 'May 14 - May 28', status: 'in-progress', velocity: 128, completion: 41, bugs: 3 },
    { id: 'SR-41', sprint: 'Sprint 41', period: 'Apr 30 - May 13', status: 'completed', velocity: 130, completion: 100, bugs: 5 },
    { id: 'SR-40', sprint: 'Sprint 40', period: 'Apr 16 - Apr 29', status: 'completed', velocity: 95, completion: 100, bugs: 8 },
    { id: 'SR-39', sprint: 'Sprint 39', period: 'Apr 2 - Apr 15', status: 'completed', velocity: 118, completion: 100, bugs: 2 },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#0B0F19] text-slate-100 min-h-screen p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
        <div><h1 className="text-2xl font-bold text-white flex items-center gap-2"><FileText className="w-6 h-6 text-indigo-500" /> Sprint Reports</h1><p className="text-xs text-slate-400 mt-1">Historical sprint performance reports</p></div>
        <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-md text-xs font-semibold"><FileText className="w-4 h-4" /> Generate Report</button>
      </div>
      <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl overflow-hidden backdrop-blur-md">
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider"><div className="col-span-3">Sprint</div><div className="col-span-3">Period</div><div className="col-span-2">Velocity</div><div className="col-span-2">Completion</div><div className="col-span-2">Status</div></div>
        <div className="divide-y divide-slate-800">{reports.map((r, i) => (
          <div key={i} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-[#1E293B]/30 transition-colors cursor-pointer">
            <div className="col-span-3"><p className="text-sm font-bold text-slate-200">{r.sprint}</p><span className="text-[10px] font-mono text-[#8b949e]">{r.id}</span></div>
            <div className="col-span-3"><span className="text-xs text-slate-400">{r.period}</span></div>
            <div className="col-span-2"><span className="text-sm font-bold text-indigo-400">{r.velocity}<span className="text-xs text-slate-400"> pts</span></span></div>
            <div className="col-span-2"><span className={"text-sm font-bold " + (r.completion === 100 ? 'text-emerald-400' : 'text-amber-400')}>{r.completion}%</span></div>
            <div className="col-span-2"><span className={"text-xs font-bold px-2 py-1 rounded " + (r.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400')}>{r.status}</span></div>
          </div>
        ))}</div>
      </div>
    </motion.div>
  );
};

