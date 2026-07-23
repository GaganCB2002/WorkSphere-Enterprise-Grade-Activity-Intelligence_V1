// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ListTodo, Plus, Search, Filter, Calendar, Flag, ArrowUpDown, MoreHorizontal } from 'lucide-react';

export const Backlog = () => {
  const [data, setData] = useState<any>(null);
  useEffect(() => { fetch('/api/tech-lead/sprints/backlog').then(r => r.json()).then(d => setData(d)).catch(() => {}); }, []);
  const items = data?.items || [
    { id: 'ENG-501', title: 'Implement GraphQL federation', priority: 'High', points: 13, sprint: 'Backlog', created: 'May 10' },
    { id: 'ENG-502', title: 'Upgrade PostgreSQL to v16', priority: 'Medium', points: 8, sprint: 'Backlog', created: 'May 8' },
    { id: 'ENG-503', title: 'Add dark mode support', priority: 'Low', points: 5, sprint: 'Backlog', created: 'May 5' },
    { id: 'ENG-504', title: 'Migrate CI to GitHub Actions', priority: 'High', points: 10, sprint: 'Next Sprint', created: 'May 12' },
    { id: 'ENG-505', title: 'API rate limiting middleware', priority: 'Medium', points: 6, sprint: 'Next Sprint', created: 'May 11' },
  ];
  const getPriorityColor = (p) => ({ 'High': 'text-amber-400 bg-amber-400/10', 'Medium': 'text-blue-400 bg-blue-400/10', 'Low': 'text-slate-400 bg-slate-400/10' }[p] || '');

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#0B0F19] text-slate-100 min-h-screen p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div><h1 className="text-2xl font-bold text-white flex items-center gap-2"><ListTodo className="w-6 h-6 text-indigo-500" /> Backlog</h1><p className="text-xs text-slate-400 mt-1">{items.length} items &bull; 42 story points</p></div>
        <div className="flex items-center gap-3">
          <div className="relative"><Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#8b949e]" /><input type="text" placeholder="Search backlog..." className="w-48 bg-[#1E293B] border border-slate-700/60 rounded-lg py-1.5 pl-8 pr-3 text-xs text-slate-200 focus:outline-none focus:border-indigo-500" /></div>
          <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-md text-xs font-semibold"><Plus className="w-4 h-4" /> Add Item</button>
        </div>
      </div>
      <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl overflow-hidden backdrop-blur-md">
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider"><div className="col-span-5">Issue</div><div className="col-span-2">Priority</div><div className="col-span-2">Points</div><div className="col-span-2">Sprint</div><div className="col-span-1"></div></div>
        <div className="divide-y divide-slate-800">{items.map((item, i) => (
          <div key={i} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-[#1E293B]/30 transition-colors">
            <div className="col-span-5"><p className="text-sm font-semibold text-slate-200">{item.title}</p><span className="text-[10px] font-mono text-[#8b949e]">{item.id}</span></div>
            <div className="col-span-2"><span className={"text-xs font-bold px-2 py-0.5 rounded " + getPriorityColor(item.priority)}>{item.priority}</span></div>
            <div className="col-span-2"><span className="text-xs font-bold text-slate-300">{item.points} pts</span></div>
            <div className="col-span-2"><span className="text-xs text-slate-400">{item.sprint}</span></div>
            <div className="col-span-1"><button className="text-[#8b949e] hover:text-slate-200"><MoreHorizontal className="w-4 h-4" /></button></div>
          </div>
        ))}</div>
      </div>
    </motion.div>
  );
};

