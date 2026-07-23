// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Target, Clock, CheckCircle2, AlertCircle, Calendar, ArrowRight, Activity, TrendingUp, GitCommit, GitPullRequest, Code2, FileText } from 'lucide-react';
import { ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, AreaChart, Area, BarChart, Bar } from 'recharts';

export const MyWork = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/software-engineer/my-work')
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="p-6 space-y-4 animate-pulse">
      <div className="h-20 bg-[#0F172A]/90 rounded-2xl border border-slate-800/80" />
      <div className="grid grid-cols-3 gap-4"><div className="h-24" /><div className="h-24" /><div className="h-24" /></div>
      <div className="h-64" /><div className="h-64" />
    </div>
  );

  const focusItems = data?.focusItems || [
    { title: 'Implement gRPC streaming for telemetry service', task: 'ENG-201', priority: 'High', deadline: 'Today', status: 'In Progress' },
    { title: 'Review PR #423 - Auth middleware', task: 'PR-423', priority: 'Medium', deadline: 'Tomorrow', status: 'Pending' },
    { title: 'Complete payment service unit tests', task: 'ENG-205', priority: 'Medium', deadline: 'Jul 25', status: 'To Do' },
  ];
  const upcomingDeadlines = data?.upcomingDeadlines || [
    { title: 'Sprint 43 Review', date: 'Jul 28', type: 'Milestone' },
    { title: 'Code freeze for v2.5', date: 'Aug 2', type: 'Release' },
    { title: 'Performance review doc', date: 'Aug 5', type: 'Admin' },
  ];
  const activity = data?.activity || [
    { action: 'Pushed 3 commits to feature/grpc-streaming', time: '30m ago', type: 'push' },
    { action: 'Commented on PR #420', time: '1h ago', type: 'comment' },
    { action: 'Merged PR #418 into main', time: '3h ago', type: 'merge' },
    { action: 'Created task ENG-210', time: '5h ago', type: 'create' },
    { action: 'Resolved BUG-498', time: '1d ago', type: 'resolve' },
  ];
  const summary = data?.summary || { tasksCompleted: 12, prsMerged: 8, commitsPushed: 47, reviewsDone: 14 };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="bg-[#0B0F19] text-slate-100 min-h-screen p-4 sm:p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
        <div>
          <div className="text-xs font-semibold text-indigo-400">Software Engineer Workspace</div>
          <h1 className="text-2xl font-bold text-white tracking-tight">My Work</h1>
          <p className="text-xs text-slate-400 mt-0.5">Your tasks, deadlines, and activity overview</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-xs font-bold"><span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Focus Mode</span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Tasks Done', value: summary.tasksCompleted, icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
          { label: 'PRs Merged', value: summary.prsMerged, icon: GitPullRequest, color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
          { label: 'Commits', value: summary.commitsPushed, icon: GitCommit, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
          { label: 'Reviews Done', value: summary.reviewsDone, icon: Code2, color: 'text-amber-400', bg: 'bg-amber-500/10' },
        ].map((stat, idx) => (
          <motion.div key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}
            className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-4 backdrop-blur-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{stat.label}</span>
              <div className={`p-2 rounded-lg border border-slate-700/60 ${stat.bg}`}><stat.icon className={`w-4 h-4 ${stat.color}`} /></div>
            </div>
            <div className="text-2xl font-extrabold text-white">{stat.value}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
            <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2"><Target className="w-4 h-4 text-indigo-400" /> Today's Focus Items</h2>
            <div className="space-y-3">
              {focusItems.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 rounded-xl border border-slate-800/80 bg-[#1E293B]/50 hover:bg-slate-800/60 transition-all">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${item.status === 'In Progress' ? 'bg-indigo-500/10' : item.status === 'Pending' ? 'bg-amber-500/10' : 'bg-slate-500/10'}`}>
                      {item.status === 'In Progress' ? <Activity className="w-4 h-4 text-indigo-400" /> : item.status === 'Pending' ? <Clock className="w-4 h-4 text-amber-400" /> : <CheckCircle2 className="w-4 h-4 text-slate-400" />}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-white">{item.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] font-mono font-bold text-indigo-400">{item.task}</span>
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold border ${item.priority === 'High' ? 'text-amber-400 bg-amber-500/10 border-amber-500/20' : 'text-blue-400 bg-blue-500/10 border-blue-500/20'}`}>{item.priority}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-slate-300">{item.deadline}</div>
                    <div className="text-[10px] text-slate-500">Deadline</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
            <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2"><Activity className="w-4 h-4 text-emerald-400" /> Recent Activity</h2>
            <div className="space-y-2">
              {activity.map((a, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-xl border border-slate-800/80 bg-[#1E293B]/50">
                  <div className={`p-1.5 rounded-lg ${a.type === 'push' ? 'bg-emerald-500/10' : a.type === 'comment' ? 'bg-indigo-500/10' : a.type === 'merge' ? 'bg-indigo-500/10' : a.type === 'create' ? 'bg-amber-500/10' : 'bg-emerald-500/10'}`}>
                    {a.type === 'push' ? <GitCommit className="w-3.5 h-3.5 text-emerald-400" /> : a.type === 'comment' || a.type === 'merge' ? <GitPullRequest className="w-3.5 h-3.5 text-indigo-400" /> : a.type === 'create' ? <FileText className="w-3.5 h-3.5 text-amber-400" /> : <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                  </div>
                  <div className="flex-1"><p className="text-xs text-slate-200">{a.action}</p><span className="text-[10px] text-slate-500">{a.time}</span></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
            <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2"><Calendar className="w-4 h-4 text-amber-400" /> Upcoming Deadlines</h2>
            <div className="space-y-3">
              {upcomingDeadlines.map((d, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 rounded-xl border border-slate-800/80 bg-[#1E293B]/50">
                  <div className={`p-2 rounded-lg ${d.type === 'Milestone' ? 'bg-indigo-500/10' : d.type === 'Release' ? 'bg-rose-500/10' : 'bg-amber-500/10'}`}>
                    <Calendar className={`w-4 h-4 ${d.type === 'Milestone' ? 'text-indigo-400' : d.type === 'Release' ? 'text-rose-400' : 'text-amber-400'}`} />
                  </div>
                  <div className="flex-1"><p className="text-xs font-semibold text-white">{d.title}</p><span className="text-[10px] text-slate-400">{d.date} &bull; {d.type}</span></div>
                  <ArrowRight className="w-4 h-4 text-slate-600" />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
            <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2"><TrendingUp className="w-4 h-4 text-emerald-400" /> Weekly Activity</h2>
            <div className="h-40 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={[{ day: 'Mon', commits: 5 }, { day: 'Tue', commits: 8 }, { day: 'Wed', commits: 12 }, { day: 'Thu', commits: 7 }, { day: 'Fri', commits: 10 }, { day: 'Sat', commits: 3 }, { day: 'Sun', commits: 2 }]} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                  <defs><linearGradient id="colorCommits" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/><stop offset="95%" stopColor="#6366f1" stopOpacity={0}/></linearGradient></defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                  <XAxis dataKey="day" stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', color: '#fff' }} />
                  <Area type="monotone" dataKey="commits" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorCommits)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
