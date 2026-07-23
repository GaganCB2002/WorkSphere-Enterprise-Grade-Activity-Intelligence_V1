// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ClipboardList, CheckCircle2, Clock, AlertCircle, User, Filter, Search } from 'lucide-react';

export const AssignedTasks = () => {
  const [data, setData] = useState<any>(null);
  useEffect(() => { fetch('/api/tech-lead/tasks/assigned').then(r => r.json()).then(d => setData(d)).catch(() => {}); }, []);
  const tasks = data?.tasks || [
    { id: 'T-201', title: 'Review PR #1042', assignee: 'You', status: 'in-progress', priority: 'High', due: 'Today' },
    { id: 'T-202', title: 'Update API documentation', assignee: 'You', status: 'todo', priority: 'Medium', due: 'Tomorrow' },
    { id: 'T-203', title: 'Fix memory leak in cache', assignee: 'You', status: 'done', priority: 'Critical', due: 'Yesterday' },
    { id: 'T-204', title: 'Sprint retro prep', assignee: 'You', status: 'todo', priority: 'Low', due: 'Fri' },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#0B0F19] text-slate-100 min-h-screen p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
        <div><h1 className="text-2xl font-bold text-white flex items-center gap-2"><ClipboardList className="w-6 h-6 text-indigo-500" /> Assigned Tasks</h1><p className="text-xs text-slate-400 mt-1">{tasks.length} tasks assigned to you</p></div>
        <div className="relative"><Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#8b949e]" /><input type="text" placeholder="Search tasks..." className="w-48 bg-[#1E293B] border border-slate-700/60 rounded-lg py-1.5 pl-8 pr-3 text-xs text-slate-200 focus:outline-none focus:border-indigo-500" /></div>
      </div>
      <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl overflow-hidden backdrop-blur-md">
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider"><div className="col-span-4">Task</div><div className="col-span-2">Status</div><div className="col-span-2">Priority</div><div className="col-span-2">Due</div><div className="col-span-2">Assignee</div></div>
        <div className="divide-y divide-slate-800">{tasks.map((t, i) => (
          <div key={i} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-[#1E293B]/30 transition-colors">
            <div className="col-span-4"><p className="text-sm font-semibold text-slate-200">{t.title}</p><span className="text-[10px] font-mono text-[#8b949e]">{t.id}</span></div>
            <div className="col-span-2"><span className={"flex items-center gap-1.5 text-xs font-bold " + (t.status === 'done' ? 'text-emerald-400' : t.status === 'in-progress' ? 'text-amber-400' : 'text-slate-400')}>{t.status === 'done' ? <CheckCircle2 className="w-3 h-3" /> : t.status === 'in-progress' ? <Clock className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}{t.status}</span></div>
            <div className="col-span-2"><span className={"text-xs font-bold px-2 py-0.5 rounded " + (t.priority === 'Critical' ? 'bg-rose-500/10 text-rose-400' : t.priority === 'High' ? 'bg-amber-500/10 text-amber-400' : t.priority === 'Medium' ? 'bg-blue-500/10 text-blue-400' : 'bg-slate-500/10 text-slate-400')}>{t.priority}</span></div>
            <div className="col-span-2"><span className={"text-xs " + (t.due === 'Today' ? 'text-amber-400 font-bold' : 'text-slate-400')}>{t.due}</span></div>
            <div className="col-span-2"><span className="text-xs text-slate-400">{t.assignee}</span></div>
          </div>
        ))}</div>
      </div>
    </motion.div>
  );
};

