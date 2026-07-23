// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Book, Search, FileText, Folder, ChevronRight, Star, Clock, ArrowUpRight } from 'lucide-react';

export const KnowledgeBase = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  useEffect(() => {
    fetch('/api/software-engineer/knowledge-base')
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-6 space-y-4 animate-pulse"><div className="h-20 bg-[#0F172A]/90 rounded-2xl" /><div className="h-12 bg-[#0F172A]/90 rounded-xl" /><div className="grid grid-cols-2 gap-4"><div className="h-32" /><div className="h-32" /></div></div>;

  const categories = data?.categories || ['All', 'Architecture', 'API', 'Deployment', 'Troubleshooting', 'Best Practices', 'Onboarding'];
  const articles = data?.articles || [
    { id: 1, title: 'Getting Started with Worksphere Development', category: 'Onboarding', excerpt: 'Learn how to set up your local development environment...', author: 'Alex D.', updated: '2d ago', reads: 245, starred: true },
    { id: 2, title: 'API v2 Integration Guide', category: 'API', excerpt: 'Complete guide to integrating with the Worksphere API v2...', author: 'Sarah J.', updated: '1w ago', reads: 189, starred: false },
    { id: 3, title: 'Deploying to Production: Runbook', category: 'Deployment', excerpt: 'Step-by-step deployment process for production releases...', author: 'Mike T.', updated: '3d ago', reads: 312, starred: true },
    { id: 4, title: 'Microservices Architecture Overview', category: 'Architecture', excerpt: 'Detailed overview of our microservices architecture...', author: 'Alex D.', updated: '2w ago', reads: 456, starred: false },
    { id: 5, title: 'Common Performance Issues & Fixes', category: 'Troubleshooting', excerpt: 'Solutions to common performance bottlenecks...', author: 'Emma W.', updated: '5d ago', reads: 178, starred: false },
    { id: 6, title: 'Code Review Best Practices', category: 'Best Practices', excerpt: 'Guidelines for conducting effective code reviews...', author: 'Sarah J.', updated: '1d ago', reads: 523, starred: true },
    { id: 7, title: 'Database Migration Guide', category: 'Architecture', excerpt: 'How to plan and execute database migrations safely...', author: 'Mike T.', updated: '1w ago', reads: 267, starred: false },
    { id: 8, title: 'CI/CD Pipeline Configuration', category: 'Deployment', excerpt: 'Configure and troubleshoot our CI/CD pipelines...', author: 'Mike T.', updated: '4d ago', reads: 198, starred: false },
  ];

  const filtered = articles.filter(a => {
    if (category !== 'All' && a.category !== category) return false;
    if (search && !a.title.toLowerCase().includes(search.toLowerCase()) && !a.excerpt.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="bg-[#0B0F19] text-slate-100 min-h-screen p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
        <div>
          <div className="text-xs font-semibold text-indigo-400">Software Engineer Workspace</div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2"><Book className="w-6 h-6 text-indigo-400" /> Knowledge Base</h1>
          <p className="text-xs text-slate-400 mt-0.5">{articles.length} articles</p>
        </div>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input type="text" placeholder="Search knowledge base..." value={search} onChange={e => setSearch(e.target.value)}
          className="w-full bg-[#1E293B] text-slate-200 text-xs pl-9 pr-4 py-2.5 rounded-xl border border-slate-700/60 focus:outline-none focus:border-indigo-500/50" />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {categories.map(c => (
          <button key={c} onClick={() => setCategory(c)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${category === c ? 'bg-indigo-600 text-white border-indigo-500/50' : 'bg-[#1E293B]/50 text-slate-400 border-slate-700/60 hover:text-white'}`}>{c}</button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((article, idx) => (
          <motion.div key={article.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.03 }}
            className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md hover:border-indigo-500/40 transition-all cursor-pointer group">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-400" />
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">{article.category}</span>
              </div>
              {article.starred && <Star className="w-4 h-4 text-amber-400 fill-amber-400" />}
            </div>
            <h3 className="text-sm font-bold text-white group-hover:text-indigo-300 mb-1">{article.title}</h3>
            <p className="text-xs text-slate-400 mb-3 line-clamp-2">{article.excerpt}</p>
            <div className="flex items-center justify-between pt-2 border-t border-slate-800">
              <div className="flex items-center gap-2 text-[10px] text-slate-500">
                <span>{article.author}</span>
                <span>&bull;</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{article.updated}</span>
                <span>&bull;</span>
                <span>{article.reads} reads</span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-600 group-hover:text-indigo-400" />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
