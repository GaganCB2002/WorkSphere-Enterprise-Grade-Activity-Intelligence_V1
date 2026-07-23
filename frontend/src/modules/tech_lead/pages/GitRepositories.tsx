// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GitBranch, Star, GitFork, Eye, Code2, Search, Plus } from 'lucide-react';

export const GitRepositories = () => {
  const [data, setData] = useState<any>(null);
  useEffect(() => { fetch('/api/tech-lead/code/repositories').then(r => r.json()).then(d => setData(d)).catch(() => {}); }, []);
  const repos = data?.repos || [
    { name: 'worksphere-core', lang: 'TypeScript', stars: 48, forks: 12, issues: 3, prs: 5, updated: '1h ago' },
    { name: 'worksphere-frontend', lang: 'TypeScript', stars: 32, forks: 8, issues: 7, prs: 3, updated: '2h ago' },
    { name: 'ml-service', lang: 'Python', stars: 18, forks: 4, issues: 2, prs: 1, updated: '4h ago' },
    { name: 'infra-terraform', lang: 'HCL', stars: 12, forks: 3, issues: 1, prs: 0, updated: '1d ago' },
    { name: 'docs-portal', lang: 'Markdown', stars: 8, forks: 2, issues: 0, prs: 2, updated: '3d ago' },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#0B0F19] text-slate-100 min-h-screen p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
        <div><h1 className="text-2xl font-bold text-white flex items-center gap-2"><GitBranch className="w-6 h-6 text-indigo-500" /> Repositories</h1><p className="text-xs text-slate-400 mt-1">{repos.length} repositories</p></div>
        <div className="flex items-center gap-3"><div className="relative"><Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#8b949e]" /><input type="text" placeholder="Search repos..." className="w-48 bg-[#1E293B] border border-slate-700/60 rounded-lg py-1.5 pl-8 pr-3 text-xs text-slate-200 focus:outline-none focus:border-indigo-500" /></div><button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-md text-xs font-semibold"><Plus className="w-4 h-4" /> New Repo</button></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {repos.map((r, i) => (
          <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
            className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md hover:border-indigo-500/40 transition-all cursor-pointer">
            <div className="flex items-start justify-between mb-3">
              <div><h3 className="text-base font-bold text-slate-100">{r.name}</h3><div className="flex items-center gap-2 mt-1"><span className="text-xs text-slate-400">{r.lang}</span><span className="flex h-1.5 w-1.5 rounded-full bg-slate-600"></span><span className="text-xs text-slate-400">Updated {r.updated}</span></div></div>
              <div className="flex items-center gap-3 text-xs text-slate-400">
                <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5" />{r.stars}</span>
                <span className="flex items-center gap-1"><GitFork className="w-3.5 h-3.5" />{r.forks}</span>
              </div>
            </div>
            <div className="flex items-center gap-4 text-xs text-slate-400 pt-3 border-t border-slate-800">
              <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" />{r.issues} issues</span>
              <span className="flex items-center gap-1"><Code2 className="w-3.5 h-3.5" />{r.prs} PRs</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

