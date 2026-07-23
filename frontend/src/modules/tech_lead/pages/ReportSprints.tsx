// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Calendar, BarChart3, TrendingUp, TrendingDown, CheckCircle2 } from 'lucide-react';

export const ReportSprints = () => {
  const [data, setData] = useState<any>(null);
  useEffect(() => { fetch('/api/tech-lead/reports/sprints').then(r => r.json()).then(d => setData(d)).catch(() => {}); }, []);
  const reports = data?.reports || [
    { name: 'Sprint 42 Report', period: 'May 14-28', status: 'in-progress', pages: 8, generated: '--' },
    { name: 'Sprint 41 Report', period: 'Apr 30-May 13', status: 'completed', pages: 12, generated: 'May 14' },
    { name: 'Sprint 40 Report', period: 'Apr 16-29', status: 'completed', pages: 10, generated: 'Apr 30' },
    { name: 'Sprint 39 Report', period: 'Apr 2-15', status: 'completed', pages: 11, generated: 'Apr 16' },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#0B0F19] text-slate-100 min-h-screen p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
        <div><h1 className="text-2xl font-bold text-white flex items-center gap-2"><FileText className="w-6 h-6 text-indigo-500" /> Sprint Reports</h1><p className="text-xs text-slate-400 mt-0.5">Generated sprint summary reports</p></div>
        <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-md text-xs font-semibold"><FileText className="w-4 h-4" /> Generate Report</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reports.map((r, i) => (
          <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
            className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md hover:border-indigo-500/40 transition-all cursor-pointer">
            <div className="flex items-start justify-between mb-3"><div><h3 className="text-base font-bold text-slate-100">{r.name}</h3><p className="text-xs text-slate-400 mt-0.5">{r.period}</p></div>
              <span className={"text-xs font-bold px-2 py-1 rounded " + (r.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400')}>{r.status}</span></div>
            <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-xs text-slate-400"><span>{r.pages} pages</span><span>Generated: {r.generated}</span><button className="flex items-center gap-1 text-indigo-400 font-bold"><Download className="w-3.5 h-3.5" /> Download</button></div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

