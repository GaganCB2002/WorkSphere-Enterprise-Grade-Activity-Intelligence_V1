// @ts-nocheck
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search as SearchIcon, Command, X, FileText, GitPullRequest, GitCommit, Users, Book, ArrowUpDown, Clock, Star, TrendingUp } from 'lucide-react';

export const Search = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIdx, setSelectedIdx] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    fetch('/api/software-engineer/search')
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); setOpen(true); }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  if (loading) return <div className="p-6 space-y-4 animate-pulse"><div className="h-20 bg-[#0F172A]/90 rounded-2xl" /><div className="h-12 bg-[#0F172A]/90 rounded-xl" /></div>;

  const recentSearches = data?.recentSearches || ['PR #423 review', 'gRPC streaming implementation', 'Redis connection fix', 'Sprint 43 burndown'];
  const allItems = data?.items || [
    { id: 'ENG-201', type: 'task', title: 'Implement gRPC streaming for telemetry', icon: FileText, color: 'text-indigo-400' },
    { id: 'PR-423', type: 'pr', title: 'Auth middleware refactor', icon: GitPullRequest, color: 'text-indigo-400' },
    { id: 'BUG-502', type: 'bug', title: 'Memory leak in Redis connection pool', icon: GitPullRequest, color: 'text-rose-400' },
    { id: 'a3f2c1d', type: 'commit', title: 'feat: implement gRPC bi-directional streaming', icon: GitCommit, color: 'text-emerald-400' },
    { id: 'Alex D.', type: 'user', title: 'Alex D. - Senior Software Engineer', icon: Users, color: 'text-amber-400' },
    { id: 'API v2 Guide', type: 'doc', title: 'API v2 Integration Guide', icon: Book, color: 'text-cyan-400' },
    { id: 'Deploy Runbook', type: 'doc', title: 'Production Deployment Runbook', icon: Book, color: 'text-cyan-400' },
  ];

  const filtered = query ? allItems.filter(i => i.title.toLowerCase().includes(query.toLowerCase()) || i.id.toLowerCase().includes(query.toLowerCase())) : [];

  const categories = ['All', 'Tasks', 'PRs', 'Bugs', 'Commits', 'Users', 'Documents'];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="bg-[#0B0F19] text-slate-100 min-h-screen p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
        <div>
          <div className="text-xs font-semibold text-indigo-400">Software Engineer Workspace</div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2"><SearchIcon className="w-6 h-6 text-indigo-400" /> Search</h1>
          <p className="text-xs text-slate-400 mt-0.5">Press Ctrl+K to open global search</p>
        </div>
        <kbd className="px-3 py-1.5 bg-[#1E293B] border border-slate-700 rounded-lg text-xs font-mono text-slate-400"><Command className="w-3 h-3 inline" />K</kbd>
      </div>

      <button onClick={() => setOpen(true)} className="w-full bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-4 backdrop-blur-md flex items-center gap-3 text-left hover:border-indigo-500/40 transition-all">
        <SearchIcon className="w-5 h-5 text-slate-400" />
        <span className="text-sm text-slate-400">Search tasks, PRs, commits, developers, docs...</span>
        <div className="flex-1" />
        <kbd className="px-2 py-1 bg-[#1E293B] border border-slate-700 rounded text-[10px] font-mono text-slate-500">Ctrl+K</kbd>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] bg-black/80 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95, y: -20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="w-full max-w-2xl bg-[#0F172A] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
              <div className="flex items-center gap-3 p-4 border-b border-slate-800">
                <SearchIcon className="w-5 h-5 text-slate-400" />
                <input ref={inputRef} type="text" placeholder="Search..." value={query} onChange={e => { setQuery(e.target.value); setSelectedIdx(0); }}
                  className="flex-1 bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none" />
                <button onClick={() => setOpen(false)} className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/50"><X className="w-4 h-4" /></button>
              </div>
              {query && filtered.length > 0 && (
                <div className="p-2 max-h-80 overflow-y-auto">
                  {filtered.map((item, idx) => (
                    <button key={item.id + item.type} onMouseEnter={() => setSelectedIdx(idx)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${selectedIdx === idx ? 'bg-indigo-600/20 border border-indigo-500/30' : 'hover:bg-slate-800/50'}`}>
                      <item.icon className={`w-4 h-4 ${item.color}`} />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-semibold text-slate-200">{item.title}</div>
                        <div className="text-[10px] text-slate-500">{item.id} &bull; {item.type}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
              {!query && (
                <div className="p-4">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">Recent Searches</div>
                  <div className="space-y-1">
                    {recentSearches.map((s, idx) => (
                      <button key={idx} onClick={() => setQuery(s)} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-slate-300 hover:bg-slate-800/50 transition-all">
                        <Clock className="w-3.5 h-3.5 text-slate-500" />{s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <div className="p-3 border-t border-slate-800 text-[10px] text-slate-500 flex items-center gap-3">
                <span><kbd className="px-1 py-0.5 bg-slate-800 rounded text-[10px] font-mono">↑↓</kbd> Navigate</span>
                <span><kbd className="px-1 py-0.5 bg-slate-800 rounded text-[10px] font-mono">↵</kbd> Open</span>
                <span><kbd className="px-1 py-0.5 bg-slate-800 rounded text-[10px] font-mono">Esc</kbd> Close</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
        <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2"><TrendingUp className="w-4 h-4 text-indigo-400" /> Trending Searches</h2>
        <div className="flex flex-wrap gap-2">
          {['PR-423', 'ENG-201', 'Redis fix', 'v2.5 release', 'Sprint 44', 'SonarQube', 'API docs'].map(s => (
            <button key={s} onClick={() => { setOpen(true); setQuery(s); }} className="px-3 py-1.5 bg-[#1E293B]/50 border border-slate-700/60 rounded-xl text-[10px] font-semibold text-slate-400 hover:text-white hover:border-indigo-500/40 transition-all">{s}</button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
