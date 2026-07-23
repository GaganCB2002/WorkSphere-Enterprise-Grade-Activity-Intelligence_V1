// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Users, Calendar, BarChart3, TrendingUp, CheckCircle2 } from 'lucide-react';

export const ReportTeam = () => {
  const [data, setData] = useState<any>(null);
  useEffect(() => { fetch('/api/tech-lead/reports/team').then(r => r.json()).then(d => setData(d)).catch(() => {}); }, []);
  const reports = data?.reports || [
    { name: 'Team Performance Q2', period: 'Apr - Jun 2026', type: 'quarterly', pages: 24, generated: 'Jun 30', status: 'draft' },
    { name: 'Monthly Team Report', period: 'May 2026', type: 'monthly', pages: 8, generated: 'Jun 1', status: 'completed' },
    { name: 'Velocity Report', period: 'Sprint 38-42', type: 'sprint-range', pages: 15, generated: 'May 28', status: 'completed' },
    { name: 'Capacity Planning', period: 'Q3 Forecast', type: 'forecast', pages: 10, generated: 'May 25', status: 'completed' },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#0B0F19] text-slate-100 min-h-screen p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
        <div><h1 className="text-2xl font-bold text-white flex items-center gap-2"><Users className="w-6 h-6 text-indigo-500" /> Team Reports</h1><p className="text-xs text-slate-400 mt-0.5">Team performance and analytics reports</p></div>
        <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-md text-xs font-semibold"><FileText className="w-4 h-4" /> New Report</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reports.map((r, i) => (
          <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
            className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md hover:border-indigo-500/40 transition-all cursor-pointer">
            <div className="flex items-start justify-between mb-3"><div><h3 className="text-base font-bold text-slate-100">{r.name}</h3><p className="text-xs text-slate-400 mt-0.5">{r.period} &bull; {r.type}</p></div>
              <span className={"text-xs font-bold px-2 py-1 rounded " + (r.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400')}>{r.status}</span></div>
            <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-xs text-slate-400"><span>{r.pages} pages</span><span>Generated: {r.generated}</span><button className="flex items-center gap-1 text-indigo-400 font-bold"><Download className="w-3.5 h-3.5" /> Download</button></div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

