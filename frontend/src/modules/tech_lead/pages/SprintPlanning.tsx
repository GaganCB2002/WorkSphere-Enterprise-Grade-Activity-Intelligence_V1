// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Target, Clock, Users, ListTodo, Plus, Calendar, CheckCircle2, ArrowRight } from 'lucide-react';

export const SprintPlanning = () => {
  const [data, setData] = useState<any>(null);
  useEffect(() => { fetch('/api/tech-lead/meetings/planning').then(r => r.json()).then(d => setData(d)).catch(() => {}); }, []);
  const meeting = data?.meeting || { title: 'Sprint 43 Planning', date: 'May 28, 2026', time: '10:00 AM', duration: '2h', attendees: 6, capacity: 44, committed: 0 };
  const items = data?.items || [
    { id: 'ENG-501', title: 'Implement GraphQL federation', points: 13, priority: 'High', assignee: 'TBD' },
    { id: 'ENG-502', title: 'Upgrade PostgreSQL to v16', points: 8, priority: 'Medium', assignee: 'TBD' },
    { id: 'ENG-503', title: 'Add dark mode to dashboards', points: 5, priority: 'Low', assignee: 'TBD' },
    { id: 'ENG-504', title: 'Migrate CI to GitHub Actions', points: 10, priority: 'High', assignee: 'TBD' },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#0B0F19] text-slate-100 min-h-screen p-4 sm:p-6 space-y-6">
      <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
        <div className="flex items-start justify-between">
          <div><h1 className="text-2xl font-bold text-white flex items-center gap-2"><Target className="w-6 h-6 text-indigo-500" /> {meeting.title}</h1><p className="text-xs text-slate-400 mt-1"><Calendar className="w-3 h-3 inline" /> {meeting.date} &bull; <Clock className="w-3 h-3 inline" /> {meeting.time} ({meeting.duration}) &bull; <Users className="w-3 h-3 inline" /> {meeting.attendees} attendees</p></div>
          <div className="text-right"><p className="text-2xl font-extrabold text-white">{meeting.committed}/{meeting.capacity} <span className="text-sm text-slate-400">pts</span></p><p className="text-xs text-indigo-400 font-bold">Capacity</p></div>
        </div>
        <div className="mt-4 h-2 bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-indigo-500 rounded-full" style={{width: (meeting.committed / meeting.capacity * 100) + '%'}}></div></div>
      </div>
      <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl overflow-hidden backdrop-blur-md">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between"><h2 className="text-sm font-bold text-white">Proposed Backlog Items</h2><button className="flex items-center gap-1 text-xs text-indigo-400 font-bold"><Plus className="w-3.5 h-3.5" />Add Item</button></div>
        <div className="divide-y divide-slate-800">{items.map((item, i) => (
          <div key={i} className="p-4 flex items-center justify-between hover:bg-[#1E293B]/30 transition-colors">
            <div className="flex items-center gap-3 flex-1"><ListTodo className="w-4 h-4 text-slate-400" /><div><p className="text-sm font-semibold text-slate-200">{item.title}</p><span className="text-[10px] font-mono text-slate-400">{item.id}</span></div></div>
            <div className="flex items-center gap-4"><span className={"text-xs font-bold px-2 py-0.5 rounded " + (item.priority === 'High' ? 'bg-amber-500/10 text-amber-400' : item.priority === 'Medium' ? 'bg-blue-500/10 text-blue-400' : 'bg-slate-500/10 text-slate-400')}>{item.priority}</span><span className="text-xs font-bold text-slate-300">{item.points} pts</span><span className="text-xs text-slate-400">{item.assignee}</span><button className="text-xs px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md font-bold">Add to Sprint</button></div>
          </div>
        ))}</div>
      </div>
    </motion.div>
  );
};

