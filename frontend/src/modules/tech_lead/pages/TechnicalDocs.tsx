// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Search, FolderOpen, ChevronRight, BookOpen, ArrowRight } from 'lucide-react';

export const TechnicalDocs = () => {
  const [data, setData] = useState<any>(null);
  useEffect(() => { fetch('/api/tech-lead/docs/technical').then(r => r.json()).then(d => setData(d)).catch(() => {}); }, []);
  const docs = data?.docs || [
    { title: 'Architecture Overview', category: 'Architecture', updated: 'May 20', pages: 12 },
    { title: 'Database Schema Guide', category: 'Database', updated: 'May 18', pages: 8 },
    { title: 'Deployment Runbook', category: 'DevOps', updated: 'May 15', pages: 15 },
    { title: 'API Integration Guide', category: 'Development', updated: 'May 12', pages: 22 },
    { title: 'Security Best Practices', category: 'Security', updated: 'May 10', pages: 18 },
    { title: 'Testing Framework Guide', category: 'QA', updated: 'May 8', pages: 10 },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#0B0F19] text-slate-100 min-h-screen p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
        <div><h1 className="text-2xl font-bold text-white flex items-center gap-2"><FileText className="w-6 h-6 text-indigo-500" /> Technical Documentation</h1><p className="text-xs text-slate-400 mt-0.5">{docs.length} documents across all categories</p></div>
        <div className="relative"><Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#8b949e]" /><input type="text" placeholder="Search docs..." className="w-48 bg-[#1E293B] border border-slate-700/60 rounded-lg py-1.5 pl-8 pr-3 text-xs text-slate-200 focus:outline-none" /></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {docs.map((d, i) => (
          <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
            className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md hover:border-indigo-500/40 transition-all cursor-pointer">
            <div className="flex items-start justify-between"><div><h3 className="text-base font-bold text-slate-100">{d.title}</h3><p className="text-xs text-slate-400 mt-1">{d.category} &bull; {d.pages} pages</p></div><BookOpen className="w-5 h-5 text-indigo-400" /></div>
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-800 text-xs"><span className="text-slate-400">Updated {d.updated}</span><span className="flex items-center gap-1 text-indigo-400 font-bold">Read<ArrowRight className="w-3 h-3" /></span></div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

