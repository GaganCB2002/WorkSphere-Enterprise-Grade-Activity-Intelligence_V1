// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FolderKanban, Users, Calendar, TrendingUp, AlertTriangle, CheckCircle2, Clock, Plus } from 'lucide-react';

export const ActiveProjects = () => {
  const [data, setData] = useState<any>(null);
  useEffect(() => { fetch('/api/tech-lead/projects').then(r => r.json()).then(d => setData(d)).catch(() => {}); }, []);
  const projects = data?.projects || [
    { id: 'P-001', name: 'Platform Migration', lead: 'Sarah J.', status: 'active', progress: 72, members: 8, deadline: 'Jun 15', priority: 'High' },
    { id: 'P-002', name: 'AI Chatbot Integration', lead: 'Alex D.', status: 'active', progress: 45, members: 5, deadline: 'Jul 1', priority: 'Medium' },
    { id: 'P-003', name: 'Security Audit V2', lead: 'Mike T.', status: 'planning', progress: 15, members: 3, deadline: 'Aug 20', priority: 'Critical' },
    { id: 'P-004', name: 'Mobile App Redesign', lead: 'Emma W.', status: 'on-hold', progress: 60, members: 6, deadline: 'TBD', priority: 'Low' },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#0B0F19] text-slate-100 min-h-screen p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
        <div><h1 className="text-2xl font-bold text-white flex items-center gap-2"><FolderKanban className="w-6 h-6 text-indigo-500" /> Active Projects</h1><p className="text-xs text-slate-400 mt-1">{projects.length} projects &bull; 22 team members</p></div>
        <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-md text-xs font-semibold"><Plus className="w-4 h-4" /> New Project</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((p, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md hover:border-indigo-500/40 transition-all">
            <div className="flex items-start justify-between mb-4">
              <div><h3 className="text-base font-bold text-slate-100">{p.name}</h3><p className="text-xs text-slate-400 mt-0.5">Lead: {p.lead}</p></div>
              <span className={"text-xs font-bold px-2 py-1 rounded " + (p.status === 'active' ? 'bg-emerald-500/10 text-emerald-400' : p.status === 'planning' ? 'bg-blue-500/10 text-blue-400' : 'bg-amber-500/10 text-amber-400')}>{p.status}</span>
            </div>
            <div className="mb-4"><div className="flex justify-between text-xs mb-1"><span className="text-slate-400">Progress</span><span className="font-bold text-slate-300">{p.progress}%</span></div><div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden"><div className="h-full rounded-full bg-indigo-500" style={{width: p.progress + '%'}}></div></div></div>
            <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-xs text-slate-400">
              <div className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{p.members} members</div>
              <div className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{p.deadline}</div>
              <span className={"font-bold " + (p.priority === 'Critical' ? 'text-rose-400' : p.priority === 'High' ? 'text-amber-400' : p.priority === 'Medium' ? 'text-blue-400' : 'text-slate-400')}>{p.priority}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

