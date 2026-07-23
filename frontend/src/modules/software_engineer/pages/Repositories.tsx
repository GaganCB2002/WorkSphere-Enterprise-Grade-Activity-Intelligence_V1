// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GitFork, Star, GitCommit, GitBranch, GitPullRequest, Code2, BookOpen, ExternalLink } from 'lucide-react';

export const Repositories = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/software-engineer/repositories')
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-6 space-y-4 animate-pulse"><div className="h-20 bg-[#0F172A]/90 rounded-2xl" /><div className="grid grid-cols-2 gap-4"><div className="h-32" /><div className="h-32" /></div></div>;

  const repos = data?.repos || [
    { name: 'worksphere-core', language: 'TypeScript', stars: 128, forks: 34, lastCommit: '2h ago', branchCount: 12, openPRs: 5, description: 'Core platform services and shared libraries' },
    { name: 'worksphere-frontend', language: 'TypeScript', stars: 95, forks: 28, lastCommit: '30m ago', branchCount: 18, openPRs: 8, description: 'React frontend application' },
    { name: 'worksphere-api', language: 'Go', stars: 72, forks: 21, lastCommit: '1h ago', branchCount: 8, openPRs: 3, description: 'REST and gRPC API gateway' },
    { name: 'worksphere-mobile', language: 'Dart', stars: 45, forks: 12, lastCommit: '1d ago', branchCount: 6, openPRs: 2, description: 'Flutter mobile application' },
    { name: 'worksphere-infra', language: 'HCL', stars: 38, forks: 15, lastCommit: '3h ago', branchCount: 5, openPRs: 1, description: 'Terraform and Kubernetes configs' },
    { name: 'worksphere-docs', language: 'Markdown', stars: 22, forks: 18, lastCommit: '5h ago', branchCount: 4, openPRs: 0, description: 'Technical documentation' },
  ];

  const langColors = { TypeScript: 'text-blue-400 bg-blue-500/10', Go: 'text-cyan-400 bg-cyan-500/10', Dart: 'text-sky-400 bg-sky-500/10', HCL: 'text-purple-400 bg-purple-500/10', Markdown: 'text-slate-400 bg-slate-500/10' };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="bg-[#0B0F19] text-slate-100 min-h-screen p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
        <div>
          <div className="text-xs font-semibold text-indigo-400">Software Engineer Workspace</div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2"><Code2 className="w-6 h-6 text-indigo-400" /> Repositories</h1>
          <p className="text-xs text-slate-400 mt-0.5">{repos.length} repositories</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {repos.map((repo, idx) => (
          <motion.div key={repo.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}
            className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md hover:border-indigo-500/40 transition-all cursor-pointer group">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <GitFork className="w-4 h-4 text-indigo-400" />
                <h3 className="font-bold text-sm text-white group-hover:text-indigo-300">{repo.name}</h3>
              </div>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${langColors[repo.language] || 'text-slate-400 bg-slate-500/10 border-slate-500/20'}`}>{repo.language}</span>
            </div>
            <p className="text-xs text-slate-400 mb-3 line-clamp-2">{repo.description}</p>
            <div className="flex items-center gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-amber-400" />{repo.stars}</div>
              <div className="flex items-center gap-1"><GitFork className="w-3.5 h-3.5" />{repo.forks}</div>
              <div className="flex items-center gap-1"><GitBranch className="w-3.5 h-3.5" />{repo.branchCount}</div>
              <div className="flex items-center gap-1"><GitPullRequest className="w-3.5 h-3.5 text-indigo-400" />{repo.openPRs}</div>
            </div>
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-800">
              <div className="flex items-center gap-1.5 text-[10px] text-slate-500"><GitCommit className="w-3 h-3" />{repo.lastCommit}</div>
              <ExternalLink className="w-3.5 h-3.5 text-slate-600 group-hover:text-indigo-400" />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
