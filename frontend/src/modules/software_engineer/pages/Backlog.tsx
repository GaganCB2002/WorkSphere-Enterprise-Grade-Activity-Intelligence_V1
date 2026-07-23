// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ListOrdered, Plus, Search, ArrowUpDown, Calendar, Flag, ChevronDown, GitBranch } from 'lucide-react';

export const Backlog = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sortKey, setSortKey] = useState('priority');
  const [sortDir, setSortDir] = useState('desc');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/api/software-engineer/backlog')
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-6 space-y-4 animate-pulse"><div className="h-20 bg-[#0F172A]/90 rounded-2xl border border-slate-800/80" /><div className="h-12 bg-[#0F172A]/90 rounded-xl" /><div className="h-96 bg-[#0F172A]/90 rounded-2xl" /></div>;

  const allItems = data?.backlog || [
    { id: 'ENG-401', title: 'Implement data export feature', priority: 1, points: 8, sprint: 'Unassigned', epic: 'Reporting', createdAt: 'Jul 10' },
    { id: 'ENG-402', title: 'Add CSV import functionality', priority: 2, points: 5, sprint: 'Sprint 44', epic: 'Reporting', createdAt: 'Jul 11' },
    { id: 'ENG-403', title: 'Build notification preferences UI', priority: 3, points: 3, sprint: 'Unassigned', epic: 'Notifications', createdAt: 'Jul 12' },
    { id: 'ENG-404', title: 'Implement push notification service', priority: 1, points: 8, sprint: 'Sprint 44', epic: 'Notifications', createdAt: 'Jul 13' },
    { id: 'ENG-405', title: 'Upgrade search to Elasticsearch', priority: 1, points: 13, sprint: 'Sprint 45', epic: 'Search', createdAt: 'Jul 14' },
    { id: 'ENG-406', title: 'Add search autocomplete', priority: 2, points: 5, sprint: 'Unassigned', epic: 'Search', createdAt: 'Jul 15' },
    { id: 'ENG-407', title: 'Migrate legacy auth to OAuth 2.0', priority: 1, points: 13, sprint: 'Sprint 44', epic: 'Auth', createdAt: 'Jul 16' },
    { id: 'ENG-408', title: 'Implement SSO integration', priority: 2, points: 8, sprint: 'Sprint 45', epic: 'Auth', createdAt: 'Jul 17' },
    { id: 'ENG-409', title: 'Add rate limiting per tenant', priority: 3, points: 5, sprint: 'Unassigned', epic: 'Infrastructure', createdAt: 'Jul 18' },
    { id: 'ENG-410', title: 'Implement audit logging', priority: 2, points: 8, sprint: 'Sprint 44', epic: 'Security', createdAt: 'Jul 19' },
    { id: 'ENG-411', title: 'Build dashboard widgets system', priority: 3, points: 8, sprint: 'Sprint 45', epic: 'Dashboard', createdAt: 'Jul 20' },
    { id: 'ENG-412', title: 'Add real-time collaboration', priority: 1, points: 13, sprint: 'Unassigned', epic: 'Collaboration', createdAt: 'Jul 21' },
  ];

  const toggleSort = (key) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('asc'); }
  };

  const priorityLabel = (p) => {
    switch (p) {
      case 1: return { label: 'High', color: 'text-rose-400 bg-rose-500/10 border-rose-500/20' };
      case 2: return { label: 'Medium', color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' };
      default: return { label: 'Low', color: 'text-slate-400 bg-slate-500/10 border-slate-500/20' };
    }
  };

  const filtered = allItems.filter(i => i.title.toLowerCase().includes(search.toLowerCase()) || i.id.toLowerCase().includes(search.toLowerCase()));
  filtered.sort((a, b) => {
    const mul = sortDir === 'asc' ? 1 : -1;
    if (sortKey === 'priority') return ((a.priority || 99) - (b.priority || 99)) * mul;
    if (sortKey === 'points') return (a.points - b.points) * mul;
    return String(a[sortKey]).localeCompare(String(b[sortKey])) * mul;
  });

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="bg-[#0B0F19] text-slate-100 min-h-screen p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
        <div>
          <div className="text-xs font-semibold text-indigo-400">Software Engineer Workspace</div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Backlog</h1>
          <p className="text-xs text-slate-400 mt-0.5">{allItems.length} items &bull; {allItems.filter(i => i.sprint === 'Unassigned').length} unassigned</p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-xl text-xs font-semibold"><Plus className="w-4 h-4" /> Add Item</button>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input type="text" placeholder="Search backlog..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full bg-[#1E293B] text-slate-200 text-xs pl-9 pr-4 py-2.5 rounded-xl border border-slate-700/60 focus:outline-none focus:border-indigo-500/50" />
        </div>
        <div className="text-xs text-slate-400">{filtered.length} items</div>
      </div>

      <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl overflow-hidden backdrop-blur-md">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-800 bg-[#1E293B]/50">
                {[
                  { key: 'id', label: 'ID' }, { key: 'title', label: 'Title' },
                  { key: 'priority', label: 'Priority' }, { key: 'points', label: 'Story Points' },
                  { key: 'sprint', label: 'Sprint' }, { key: 'epic', label: 'Epic' },
                  { key: 'createdAt', label: 'Created' },
                ].map(col => (
                  <th key={col.key} onClick={() => toggleSort(col.key)} className="px-4 py-3 text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider cursor-pointer hover:text-white transition-colors">
                    <div className="flex items-center gap-1">{col.label}<ArrowUpDown className="w-3 h-3" /></div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((item, idx) => (
                <motion.tr key={item.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.02 }}
                  className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-all cursor-pointer">
                  <td className="px-4 py-3 text-xs font-mono font-bold text-indigo-400">{item.id}</td>
                  <td className="px-4 py-3 text-xs font-semibold text-slate-200">{item.title}</td>
                  <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${priorityLabel(item.priority).color}`}>{priorityLabel(item.priority).label}</span></td>
                  <td className="px-4 py-3"><div className="flex items-center gap-1 text-xs font-bold text-white"><Flag className="w-3 h-3 text-indigo-400" />{item.points}</div></td>
                  <td className="px-4 py-3"><span className={`text-xs font-semibold ${item.sprint === 'Unassigned' ? 'text-amber-400' : 'text-slate-300'}`}>{item.sprint}</span></td>
                  <td className="px-4 py-3 text-xs text-slate-400">{item.epic}</td>
                  <td className="px-4 py-3 text-xs text-slate-400">{item.createdAt}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};
