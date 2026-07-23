// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Search, ChevronRight, Code, FileText, ExternalLink } from 'lucide-react';

export const APIDocs = () => {
  const [data, setData] = useState<any>(null);
  useEffect(() => { fetch('/api/tech-lead/docs/api').then(r => r.json()).then(d => setData(d)).catch(() => {}); }, []);
  const endpoints = data?.endpoints || [
    { method: 'GET', path: '/api/users', desc: 'List all users', auth: 'Bearer', updated: '2d ago' },
    { method: 'POST', path: '/api/users', desc: 'Create a new user', auth: 'Bearer', updated: '1d ago' },
    { method: 'GET', path: '/api/users/:id', desc: 'Get user by ID', auth: 'Bearer', updated: '2d ago' },
    { method: 'PUT', path: '/api/users/:id', desc: 'Update user', auth: 'Bearer', updated: '3d ago' },
    { method: 'DELETE', path: '/api/users/:id', desc: 'Delete user', auth: 'Admin', updated: '3d ago' },
    { method: 'GET', path: '/api/analytics/velocity', desc: 'Sprint velocity data', auth: 'Bearer', updated: '1d ago' },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#0B0F19] text-slate-100 min-h-screen p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
        <div><h1 className="text-2xl font-bold text-white flex items-center gap-2"><BookOpen className="w-6 h-6 text-indigo-500" /> API Documentation</h1><p className="text-xs text-slate-400 mt-0.5">REST API reference for engineering team</p></div>
        <div className="relative"><Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#8b949e]" /><input type="text" placeholder="Search endpoints..." className="w-48 bg-[#1E293B] border border-slate-700/60 rounded-lg py-1.5 pl-8 pr-3 text-xs text-slate-200 focus:outline-none" /></div>
      </div>
      <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl overflow-hidden backdrop-blur-md">
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider"><div className="col-span-2">Method</div><div className="col-span-4">Endpoint</div><div className="col-span-3">Description</div><div className="col-span-2">Auth</div><div className="col-span-1">Updated</div></div>
        <div className="divide-y divide-slate-800">{endpoints.map((e, i) => (
          <div key={i} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-[#1E293B]/30 transition-colors cursor-pointer">
            <div className="col-span-2"><span className={"text-xs font-bold px-2 py-1 rounded " + (e.method === 'GET' ? 'bg-emerald-500/10 text-emerald-400' : e.method === 'POST' ? 'bg-blue-500/10 text-blue-400' : e.method === 'PUT' ? 'bg-amber-500/10 text-amber-400' : 'bg-rose-500/10 text-rose-400')}>{e.method}</span></div>
            <div className="col-span-4"><span className="text-sm font-mono text-slate-200">{e.path}</span></div>
            <div className="col-span-3"><span className="text-xs text-slate-400">{e.desc}</span></div>
            <div className="col-span-2"><span className="text-xs text-slate-400">{e.auth}</span></div>
            <div className="col-span-1"><span className="text-xs text-slate-400">{e.updated}</span></div>
          </div>
        ))}</div>
      </div>
    </motion.div>
  );
};

