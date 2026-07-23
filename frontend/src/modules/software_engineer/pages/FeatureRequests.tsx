// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, ThumbsUp, Plus, Search, ArrowUpDown, Flag, Calendar, GitBranch } from 'lucide-react';

export const FeatureRequests = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/software-engineer/feature-requests')
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-6 space-y-4 animate-pulse"><div className="h-20 bg-[#0F172A]/90 rounded-2xl" /><div className="h-96 bg-[#0F172A]/90 rounded-2xl" /></div>;

  const features = data?.features || [
    { id: 'FR-101', title: 'Dark mode support for all UI components', status: 'Under Review', priority: 'High', votes: 24, roadmap: 'v2.5.0', createdAt: 'Jul 1' },
    { id: 'FR-102', title: 'Export reports to PDF/Excel', status: 'Approved', priority: 'High', votes: 18, roadmap: 'v2.5.0', createdAt: 'Jul 3' },
    { id: 'FR-103', title: 'Real-time collaboration editor', status: 'Planning', priority: 'Medium', votes: 15, roadmap: 'v2.6.0', createdAt: 'Jul 5' },
    { id: 'FR-104', title: 'Custom dashboard widgets', status: 'Declined', priority: 'Low', votes: 8, roadmap: 'N/A', createdAt: 'Jul 7' },
    { id: 'FR-105', title: 'Bulk import via CSV/JSON', status: 'Approved', priority: 'Medium', votes: 12, roadmap: 'v2.5.1', createdAt: 'Jul 8' },
    { id: 'FR-106', title: 'Integrate with Jira for issue sync', status: 'Under Review', priority: 'Low', votes: 6, roadmap: 'v2.7.0', createdAt: 'Jul 10' },
    { id: 'FR-107', title: 'Add keyboard shortcut customization', status: 'Approved', priority: 'Medium', votes: 20, roadmap: 'v2.5.0', createdAt: 'Jul 2' },
    { id: 'FR-108', title: 'Mobile responsive views for all pages', status: 'Planning', priority: 'High', votes: 30, roadmap: 'v2.6.0', createdAt: 'Jun 28' },
  ];

  const statusColor = (s) => {
    switch (s) {
      case 'Approved': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case 'Under Review': return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      case 'Planning': return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
      case 'Declined': return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
      default: return 'text-slate-400 bg-slate-500/10 border-slate-500/20';
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="bg-[#0B0F19] text-slate-100 min-h-screen p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
        <div>
          <div className="text-xs font-semibold text-indigo-400">Software Engineer Workspace</div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2"><Lightbulb className="w-6 h-6 text-amber-400" /> Feature Requests</h1>
          <p className="text-xs text-slate-400 mt-0.5">{features.length} requests &bull; {features.filter(f => f.status === 'Approved').length} approved</p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-xl text-xs font-semibold"><Plus className="w-4 h-4" /> New Request</button>
      </div>

      <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl overflow-hidden backdrop-blur-md">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-800 bg-[#1E293B]/50">
                {['ID', 'Title', 'Status', 'Priority', 'Votes', 'Roadmap', 'Created'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map((f, idx) => (
                <motion.tr key={f.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.03 }}
                  className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-all cursor-pointer">
                  <td className="px-4 py-3 text-xs font-mono font-bold text-indigo-400">{f.id}</td>
                  <td className="px-4 py-3 text-xs font-semibold text-slate-200">{f.title}</td>
                  <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${statusColor(f.status)}`}>{f.status}</span></td>
                  <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${f.priority === 'High' ? 'text-amber-400 bg-amber-500/10 border-amber-500/20' : f.priority === 'Medium' ? 'text-blue-400 bg-blue-500/10 border-blue-500/20' : 'text-slate-400 bg-slate-500/10 border-slate-500/20'}`}>{f.priority}</span></td>
                  <td className="px-4 py-3"><div className="flex items-center gap-1 text-xs font-bold text-white"><ThumbsUp className="w-3.5 h-3.5 text-indigo-400" />{f.votes}</div></td>
                  <td className="px-4 py-3"><span className="text-xs font-mono font-bold text-indigo-400">{f.roadmap}</span></td>
                  <td className="px-4 py-3 text-xs text-slate-400">{f.createdAt}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};
