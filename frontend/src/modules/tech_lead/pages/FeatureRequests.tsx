// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, ThumbsUp, MessageSquare, Plus, Filter, Search, Clock, CheckCircle2 } from 'lucide-react';

export const FeatureRequests = () => {
  const [data, setData] = useState<any>(null);
  useEffect(() => { fetch('/api/tech-lead/tasks/features').then(r => r.json()).then(d => setData(d)).catch(() => {}); }, []);
  const features = data?.features || [
    { id: 'FR-101', title: 'Dark mode for all dashboards', status: 'approved', votes: 24, comments: 8, roadmap: 'Q3' },
    { id: 'FR-102', title: 'Export reports to PDF', status: 'under-review', votes: 18, comments: 5, roadmap: 'Q3' },
    { id: 'FR-103', title: 'Real-time collaboration editor', status: 'planned', votes: 32, comments: 12, roadmap: 'Q4' },
    { id: 'FR-104', title: 'Mobile app push notifications', status: 'backlog', votes: 15, comments: 3, roadmap: 'TBD' },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#0B0F19] text-slate-100 min-h-screen p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
        <div><h1 className="text-2xl font-bold text-white flex items-center gap-2"><Lightbulb className="w-6 h-6 text-yellow-500" /> Feature Requests</h1><p className="text-xs text-slate-400 mt-1">{features.length} requests &bull; {features.reduce((a,b) => a + b.votes, 0)} total votes</p></div>
        <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-md text-xs font-semibold"><Plus className="w-4 h-4" /> Submit Request</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[{ label: 'Approved', count: features.filter(f => f.status === 'approved').length, color: 'text-emerald-400' }, { label: 'Under Review', count: features.filter(f => f.status === 'under-review').length, color: 'text-amber-400' }, { label: 'Planned', count: features.filter(f => f.status === 'planned').length, color: 'text-blue-400' }, { label: 'Backlog', count: features.filter(f => f.status === 'backlog').length, color: 'text-slate-400' }].map((s, i) => (
          <div key={i} className="bg-[#0F172A]/90 border border-slate-800/80 rounded-xl p-4 backdrop-blur-md"><p className="text-xs text-slate-400">{s.label}</p><p className={"text-2xl font-extrabold " + s.color}>{s.count}</p></div>
        ))}
      </div>
      <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl overflow-hidden backdrop-blur-md">
        <div className="divide-y divide-slate-800">{features.map((f, i) => (
          <div key={i} className="p-4 flex items-center justify-between hover:bg-[#1E293B]/30 transition-colors cursor-pointer">
            <div className="flex-1"><p className="text-sm font-bold text-slate-200">{f.title}</p><div className="flex items-center gap-3 mt-1"><span className={"text-xs font-bold px-2 py-0.5 rounded " + (f.status === 'approved' ? 'bg-emerald-500/10 text-emerald-400' : f.status === 'under-review' ? 'bg-amber-500/10 text-amber-400' : f.status === 'planned' ? 'bg-blue-500/10 text-blue-400' : 'bg-slate-500/10 text-slate-400')}>{f.status}</span><span className="text-xs text-slate-400">{f.roadmap}</span></div></div>
            <div className="flex items-center gap-4"><div className="flex items-center gap-1 text-xs text-slate-400"><ThumbsUp className="w-3.5 h-3.5" />{f.votes}</div><div className="flex items-center gap-1 text-xs text-slate-400"><MessageSquare className="w-3.5 h-3.5" />{f.comments}</div></div>
          </div>
        ))}</div>
      </div>
    </motion.div>
  );
};

