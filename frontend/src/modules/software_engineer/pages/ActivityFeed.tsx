// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, GitCommit, GitPullRequest, PlayCircle, Rocket, Bug, GitBranch, Calendar, Server, AlertTriangle, CheckCircle2, User, Clock, Bell } from 'lucide-react';

export const ActivityFeed = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    fetch('/api/software-engineer/activity-feed')
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-6 space-y-4 animate-pulse"><div className="h-20 bg-[#0F172A]/90 rounded-2xl" /><div className="space-y-3"><div className="h-16" /><div className="h-16" /><div className="h-16" /></div></div>;

  const events = data?.events || [
    { id: 1, type: 'push', message: 'Alex D. pushed 3 commits to feature/grpc-streaming', repo: 'worksphere-core', time: '2m ago', icon: GitCommit, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { id: 2, type: 'pr', message: 'Sarah J. opened PR #432: Fix websocket reconnection', repo: 'worksphere-frontend', time: '8m ago', icon: GitPullRequest, color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
    { id: 3, type: 'pipeline', message: 'Build #1284 passed on feature/grpc-streaming', repo: 'worksphere-core', time: '12m ago', icon: PlayCircle, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { id: 4, type: 'deployment', message: 'v2.4.1 deployed to Production successfully', repo: 'worksphere-infra', time: '25m ago', icon: Rocket, color: 'text-purple-400', bg: 'bg-purple-500/10' },
    { id: 5, type: 'bug', message: 'BUG-509: Database connection pool exhaustion - Assigned to Alex D.', repo: 'worksphere-core', time: '30m ago', icon: Bug, color: 'text-rose-400', bg: 'bg-rose-500/10' },
    { id: 6, type: 'review', message: 'Mike T. requested changes on PR #430', repo: 'worksphere-api', time: '45m ago', icon: GitPullRequest, color: 'text-amber-400', bg: 'bg-amber-500/10' },
    { id: 7, type: 'sprint', message: 'Sprint 43 planning completed - 44 points committed', repo: 'worksphere-core', time: '1h ago', icon: Calendar, color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
    { id: 8, type: 'meeting', message: 'Daily standup started in #general', repo: 'Team', time: '2h ago', icon: Users, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
    { id: 9, type: 'server', message: 'CPU usage alert on api-server-3: 87%', repo: 'worksphere-infra', time: '2h ago', icon: Server, color: 'text-amber-400', bg: 'bg-amber-500/10' },
    { id: 10, type: 'push', message: 'Emma W. pushed 5 commits to perf/dashboard', repo: 'worksphere-frontend', time: '3h ago', icon: GitCommit, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { id: 11, type: 'pipeline', message: 'Build #1282 failed on feature/payment-v2', repo: 'worksphere-api', time: '3h ago', icon: XCircle, color: 'text-rose-400', bg: 'bg-rose-500/10' },
    { id: 12, type: 'deployment', message: 'v2.5.0-rc.1 deployed to Staging', repo: 'worksphere-infra', time: '4h ago', icon: Rocket, color: 'text-amber-400', bg: 'bg-amber-500/10' },
  ];

  const filtered = filter === 'All' ? events : events.filter(e => e.type === filter);

  const typeColors = {
    push: 'border-l-emerald-500', pr: 'border-l-indigo-500', pipeline: 'border-l-emerald-500',
    deployment: 'border-l-purple-500', bug: 'border-l-rose-500', review: 'border-l-amber-500',
    sprint: 'border-l-indigo-500', meeting: 'border-l-cyan-500', server: 'border-l-amber-500',
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="bg-[#0B0F19] text-slate-100 min-h-screen p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
        <div>
          <div className="text-xs font-semibold text-indigo-400">Software Engineer Workspace</div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2"><Activity className="w-6 h-6 text-emerald-400" /> Activity Feed</h1>
          <p className="text-xs text-slate-400 mt-0.5">Real-time engineering events</p>
        </div>
        <div className="flex items-center gap-2"><span className="flex w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /><span className="text-[10px] text-emerald-400 font-bold">LIVE</span></div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {['All', 'push', 'pr', 'pipeline', 'deployment', 'bug', 'review', 'sprint', 'meeting', 'server'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-xl text-[10px] font-semibold border transition-all capitalize ${filter === f ? 'bg-indigo-600 text-white border-indigo-500/50' : 'bg-[#1E293B]/50 text-slate-400 border-slate-700/60 hover:text-white'}`}>{f}</button>
        ))}
      </div>

      <div className="space-y-2">
        {filtered.map((event, idx) => (
          <motion.div key={event.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.02 }}
            className={`bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-4 backdrop-blur-md border-l-4 ${typeColors[event.type] || 'border-l-slate-500'} hover:bg-slate-800/30 transition-all cursor-pointer`}>
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg border border-slate-700/60 ${event.bg}`}><event.icon className={`w-4 h-4 ${event.color}`} /></div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-slate-200">{event.message}</p>
                <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                  <span>{event.repo}</span>
                  <span>&bull;</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{event.time}</span>
                </div>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${event.type === 'push' ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' : event.type === 'pr' || event.type === 'review' ? 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20' : event.type === 'pipeline' ? 'text-blue-400 bg-blue-500/10 border-blue-500/20' : event.type === 'deployment' ? 'text-purple-400 bg-purple-500/10 border-purple-500/20' : 'text-slate-400 bg-slate-500/10 border-slate-500/20'}`}>{event.type}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
