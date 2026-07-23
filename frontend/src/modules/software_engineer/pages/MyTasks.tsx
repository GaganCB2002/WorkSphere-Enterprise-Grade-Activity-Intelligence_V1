// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, ChevronDown, ArrowUpDown, CheckCircle2, Clock, PlayCircle, AlertCircle, MoreHorizontal, RotateCcw } from 'lucide-react';

export const MyTasks = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ status: 'All', priority: 'All', sprint: 'All', assignee: 'All' });
  const [sortKey, setSortKey] = useState('id');
  const [sortDir, setSortDir] = useState('asc');
  const [page, setPage] = useState(1);
  const perPage = 10;

  useEffect(() => {
    fetch('/api/software-engineer/tasks')
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-6 space-y-4 animate-pulse"><div className="h-20 bg-[#0F172A]/90 rounded-2xl border border-slate-800/80" /><div className="h-12 bg-[#0F172A]/90 rounded-xl" /><div className="h-96 bg-[#0F172A]/90 rounded-2xl" /></div>;

  const allTasks = data?.tasks || [
    { id: 'ENG-201', title: 'Implement gRPC streaming for telemetry', status: 'In Progress', priority: 'High', sprint: 'Sprint 43', assignee: 'Alex D.', points: 8, createdAt: 'Jul 15', dueDate: 'Jul 25' },
    { id: 'ENG-202', title: 'Refactor API rate limiter middleware', status: 'To Do', priority: 'Medium', sprint: 'Sprint 43', assignee: 'Alex D.', points: 5, createdAt: 'Jul 16', dueDate: 'Jul 28' },
    { id: 'ENG-203', title: 'Write unit tests for payment gateway', status: 'Done', priority: 'Medium', sprint: 'Sprint 43', assignee: 'Alex D.', points: 3, createdAt: 'Jul 14', dueDate: 'Jul 22' },
    { id: 'ENG-204', title: 'Update Kubernetes deployment configs', status: 'In Review', priority: 'High', sprint: 'Sprint 43', assignee: 'Alex D.', points: 5, createdAt: 'Jul 17', dueDate: 'Jul 26' },
    { id: 'ENG-205', title: 'Fix memory leak in websocket handler', status: 'Blocked', priority: 'Critical', sprint: 'Sprint 43', assignee: 'Alex D.', points: 3, createdAt: 'Jul 13', dueDate: 'Jul 24' },
    { id: 'ENG-206', title: 'Implement feature flag system', status: 'To Do', priority: 'Low', sprint: 'Sprint 44', assignee: 'Alex D.', points: 8, createdAt: 'Jul 18', dueDate: 'Aug 5' },
    { id: 'ENG-207', title: 'Add OpenAPI specs for v3 endpoints', status: 'In Progress', priority: 'Medium', sprint: 'Sprint 43', assignee: 'Alex D.', points: 2, createdAt: 'Jul 19', dueDate: 'Jul 27' },
    { id: 'ENG-208', title: 'Database migration for user preferences', status: 'To Do', priority: 'High', sprint: 'Sprint 44', assignee: 'Alex D.', points: 5, createdAt: 'Jul 20', dueDate: 'Aug 2' },
    { id: 'ENG-209', title: 'Set up monitoring dashboards', status: 'Done', priority: 'Low', sprint: 'Sprint 42', assignee: 'Alex D.', points: 3, createdAt: 'Jul 10', dueDate: 'Jul 18' },
    { id: 'ENG-210', title: 'Implement Redis caching layer', status: 'In Progress', priority: 'High', sprint: 'Sprint 43', assignee: 'Alex D.', points: 8, createdAt: 'Jul 15', dueDate: 'Jul 28' },
    { id: 'ENG-211', title: 'Add end-to-end encryption for chat', status: 'To Do', priority: 'Critical', sprint: 'Sprint 44', assignee: 'Alex D.', points: 13, createdAt: 'Jul 20', dueDate: 'Aug 10' },
    { id: 'ENG-212', title: 'Performance optimization for search', status: 'In Review', priority: 'Medium', sprint: 'Sprint 43', assignee: 'Alex D.', points: 5, createdAt: 'Jul 16', dueDate: 'Jul 25' },
  ];

  const toggleStatus = (id) => {
    const cycles = { 'To Do': 'In Progress', 'In Progress': 'In Review', 'In Review': 'Done', 'Done': 'To Do', 'Blocked': 'In Progress' };
    const updated = allTasks.map(t => t.id === id ? { ...t, status: cycles[t.status] || t.status } : t);
    setData({ ...data, tasks: updated });
  };

  const toggleSort = (key) => {
    if (sortKey === key) { setSortDir(d => d === 'asc' ? 'desc' : 'asc'); } else { setSortKey(key); setSortDir('asc'); }
  };

  let filtered = allTasks.filter(t => {
    if (filter.status !== 'All' && t.status !== filter.status) return false;
    if (filter.priority !== 'All' && t.priority !== filter.priority) return false;
    if (filter.sprint !== 'All' && t.sprint !== filter.sprint) return false;
    return true;
  });

  filtered.sort((a, b) => {
    const mul = sortDir === 'asc' ? 1 : -1;
    if (sortKey === 'points') return (a.points - b.points) * mul;
    return String(a[sortKey]).localeCompare(String(b[sortKey])) * mul;
  });

  const totalPages = Math.ceil(filtered.length / perPage);
  const paged = filtered.slice((page - 1) * perPage, page * perPage);

  const statusIcon = (s) => {
    switch (s) {
      case 'In Progress': return <PlayCircle className="w-4 h-4 text-blue-400" />;
      case 'In Review': return <AlertCircle className="w-4 h-4 text-amber-400" />;
      case 'Done': return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
      case 'Blocked': return <AlertCircle className="w-4 h-4 text-rose-400" />;
      default: return <Clock className="w-4 h-4 text-slate-400" />;
    }
  };

  const priorityBadge = (p) => {
    switch (p) {
      case 'Critical': return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
      case 'High': return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      case 'Medium': return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
      default: return 'text-slate-400 bg-slate-500/10 border-slate-500/20';
    }
  };

  const FilterSelect = ({ label, options, value, onChange }) => (
    <div className="relative">
      <select value={value} onChange={e => { onChange(e.target.value); setPage(1); }} className="appearance-none bg-[#1E293B] text-slate-200 text-xs px-3 py-2 pr-8 rounded-xl border border-slate-700/60 focus:outline-none focus:border-indigo-500/50 cursor-pointer">
        <option value="All">All {label}</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
      <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="bg-[#0B0F19] text-slate-100 min-h-screen p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
        <div>
          <div className="text-xs font-semibold text-indigo-400">Software Engineer Workspace</div>
          <h1 className="text-2xl font-bold text-white tracking-tight">My Tasks</h1>
          <p className="text-xs text-slate-400 mt-0.5">{allTasks.length} total tasks &bull; {allTasks.filter(t => t.status === 'In Progress').length} in progress</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <FilterSelect label="Status" options={['To Do', 'In Progress', 'In Review', 'Done', 'Blocked']} value={filter.status} onChange={v => setFilter({...filter, status: v})} />
        <FilterSelect label="Priority" options={['Critical', 'High', 'Medium', 'Low']} value={filter.priority} onChange={v => setFilter({...filter, priority: v})} />
        <FilterSelect label="Sprint" options={['Sprint 42', 'Sprint 43', 'Sprint 44']} value={filter.sprint} onChange={v => setFilter({...filter, sprint: v})} />
        <div className="flex-1" />
        <div className="text-xs text-slate-400">{filtered.length} tasks shown</div>
      </div>

      <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl overflow-hidden backdrop-blur-md">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-800 bg-[#1E293B]/50">
                {[
                  { key: 'id', label: 'ID' }, { key: 'title', label: 'Title' },
                  { key: 'status', label: 'Status' }, { key: 'priority', label: 'Priority' },
                  { key: 'sprint', label: 'Sprint' }, { key: 'points', label: 'Pts' },
                  { key: 'dueDate', label: 'Due Date' },
                ].map(col => (
                  <th key={col.key} onClick={() => toggleSort(col.key)} className="px-4 py-3 text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider cursor-pointer hover:text-white transition-colors">
                    <div className="flex items-center gap-1">{col.label}<ArrowUpDown className="w-3 h-3" /></div>
                  </th>
                ))}
                <th className="px-4 py-3 text-right text-[11px] font-bold text-slate-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paged.map((task, idx) => (
                <motion.tr key={task.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.03 }}
                  className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-all cursor-pointer">
                  <td className="px-4 py-3 text-xs font-mono font-bold text-indigo-400">{task.id}</td>
                  <td className="px-4 py-3 text-xs font-semibold text-slate-200 max-w-xs truncate">{task.title}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => toggleStatus(task.id)} className="flex items-center gap-1.5 text-xs">
                      {statusIcon(task.status)}
                      <span className={`font-semibold ${task.status === 'Done' ? 'text-emerald-400' : task.status === 'Blocked' ? 'text-rose-400' : task.status === 'In Progress' ? 'text-blue-400' : task.status === 'In Review' ? 'text-amber-400' : 'text-slate-400'}`}>{task.status}</span>
                    </button>
                  </td>
                  <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${priorityBadge(task.priority)}`}>{task.priority}</span></td>
                  <td className="px-4 py-3 text-xs text-slate-400">{task.sprint}</td>
                  <td className="px-4 py-3 text-xs font-bold text-white">{task.points}</td>
                  <td className="px-4 py-3 text-xs text-slate-400">{task.dueDate}</td>
                  <td className="px-4 py-3 text-right">
                    <button className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-700/50"><MoreHorizontal className="w-4 h-4" /></button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        {totalPages > 1 && (
          <div className="flex items-center justify-between p-4 border-t border-slate-800">
            <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="text-xs font-semibold text-slate-400 hover:text-white disabled:opacity-40 px-3 py-1.5 rounded-lg bg-[#1E293B]/50 border border-slate-700/60">Previous</button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button key={p} onClick={() => setPage(p)} className={`w-8 h-8 text-xs font-bold rounded-lg ${page === p ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white bg-[#1E293B]/50'}`}>{p}</button>
              ))}
            </div>
            <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)} className="text-xs font-semibold text-slate-400 hover:text-white disabled:opacity-40 px-3 py-1.5 rounded-lg bg-[#1E293B]/50 border border-slate-700/60">Next</button>
          </div>
        )}
      </div>
    </motion.div>
  );
};
