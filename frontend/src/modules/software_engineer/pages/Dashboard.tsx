// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Users, GitPullRequest, AlertTriangle, TrendingUp, ArrowUpRight, ArrowDownRight, Clock, Zap, Bot, Cpu, BarChart3, CheckCircle2, Bug, PlayCircle, GitCommit, Code2, Shield, Target, Calendar, Bell, MessageSquare, BookOpen, LayoutDashboard } from 'lucide-react';
import { ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

export const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/software-engineer/dashboard')
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="p-6 space-y-4 animate-pulse">
      <div className="h-24 bg-[#0F172A]/90 rounded-2xl border border-slate-800/80" />
      <div className="grid grid-cols-4 gap-4"><div className="h-28 bg-[#0F172A]/90 rounded-2xl border border-slate-800/80" /><div className="h-28 bg-[#0F172A]/90 rounded-2xl border border-slate-800/80" /><div className="h-28 bg-[#0F172A]/90 rounded-2xl border border-slate-800/80" /><div className="h-28 bg-[#0F172A]/90 rounded-2xl border border-slate-800/80" /></div>
      <div className="h-80 bg-[#0F172A]/90 rounded-2xl border border-slate-800/80" />
      <div className="grid grid-cols-2 gap-4"><div className="h-64 bg-[#0F172A]/90 rounded-2xl border border-slate-800/80" /><div className="h-64 bg-[#0F172A]/90 rounded-2xl border border-slate-800/80" /></div>
    </div>
  );

  const welcome = data?.welcome || { name: 'Alex', sprint: 'Sprint 43', phase: 'Active Development Phase' };
  const currentSprint = data?.currentSprint || { name: 'Sprint 43', daysRemaining: 10, totalPoints: 44, completedPoints: 28 };
  const todayFocus = data?.todayFocus || [
    { title: 'Complete gRPC streaming implementation', task: 'ENG-201', priority: 'High' },
    { title: 'Review PR #423 - Auth middleware', task: 'Review', priority: 'Medium' },
    { title: 'Write unit tests for payment service', task: 'ENG-205', priority: 'Medium' },
  ];
  const quickActions = data?.quickActions || [
    { label: 'New Task', icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { label: 'Create PR', icon: GitPullRequest, color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
    { label: 'Log Hours', icon: Clock, color: 'text-amber-400', bg: 'bg-amber-500/10' },
    { label: 'Report Bug', icon: Bug, color: 'text-rose-400', bg: 'bg-rose-500/10' },
  ];
  const activeTasks = data?.activeTasks || [
    { id: 'ENG-201', title: 'Implement gRPC streaming for telemetry', status: 'In Progress', priority: 'High', points: 8 },
    { id: 'ENG-205', title: 'Write unit tests for payment service', status: 'To Do', priority: 'Medium', points: 5 },
    { id: 'ENG-210', title: 'Refactor API rate limiter', status: 'In Review', priority: 'High', points: 3 },
  ];
  const pendingReviews = data?.pendingReviews || [
    { id: 'PR-423', title: 'Auth middleware refactor', author: 'Sarah J.', files: 8, comments: 3 },
    { id: 'PR-418', title: 'Payment service migration', author: 'Mike T.', files: 14, comments: 7 },
  ];
  const bugs = data?.bugs || [
    { id: 'BUG-502', title: 'Memory leak in Redis cache', severity: 'Critical', status: 'Open' },
    { id: 'BUG-498', title: 'Webhook timeout on high load', severity: 'High', status: 'In Progress' },
  ];
  const sprintProgress = data?.sprintProgress || 64;
  const prStatus = data?.prStatus || { open: 14, merged: 42, declined: 6 };
  const buildStatus = data?.buildStatus || { passing: 8, failing: 2, pending: 3 };
  const deploymentStatus = data?.deploymentStatus || { production: 'v2.4.1', staging: 'v2.5.0-rc.1', lastDeployed: '2 hours ago' };
  const codeCoverage = data?.codeCoverage || 87;
  const codeQuality = data?.codeQuality || 'A-';
  const technicalDebt = data?.technicalDebt || { ratio: '4.2%', hours: 64 };
  const focusTime = data?.focusTime || { today: 4.5, weekly: 18.2 };
  const velocity = data?.velocity || { current: 128, average: 115 };
  const productivityScore = data?.productivityScore || 92;
  const meetings = data?.meetings || [
    { title: 'Daily Standup', time: '9:00 AM', type: 'Daily' },
    { title: 'Sprint Planning', time: '2:00 PM', type: 'Planning' },
  ];
  const recentActivity = data?.recentActivity || [
    { action: 'Pushed to feature/grpc-streaming', time: '15m ago', type: 'push' },
    { action: 'Opened PR #423', time: '1h ago', type: 'pr' },
    { action: 'Merged PR #418', time: '3h ago', type: 'merge' },
  ];
  const notifications = data?.notifications || [
    { text: 'PR #420 needs your review', type: 'review', time: '5m ago' },
    { text: 'Build #1284 failed on main', type: 'build', time: '20m ago' },
  ];
  const recentCommits = data?.recentCommits || [
    { hash: 'a3f2c1d', message: 'feat: implement gRPC streaming', branch: 'feature/grpc-streaming', author: 'Alex D.', time: '15m ago' },
    { hash: 'b4e5f6g', message: 'fix: resolve Redis connection leak', branch: 'bugfix/redis-leak', author: 'Alex D.', time: '2h ago' },
  ];
  const repoActivity = data?.repoActivity || [
    { day: 'Mon', commits: 12, prs: 3 }, { day: 'Tue', commits: 18, prs: 5 }, { day: 'Wed', commits: 24, prs: 7 }, { day: 'Thu', commits: 15, prs: 4 }, { day: 'Fri', commits: 20, prs: 6 }, { day: 'Sat', commits: 5, prs: 1 }, { day: 'Sun', commits: 3, prs: 0 },
  ];
  const releaseCountdown = data?.releaseCountdown || { version: 'v2.5.0', daysLeft: 14, features: 12, bugsFixed: 8 };

  const priorityColor = (p) => {
    switch (p) {
      case 'Critical': return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
      case 'High': return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      case 'Medium': return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
      default: return 'text-slate-400 bg-slate-500/10 border-slate-500/20';
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="bg-[#0B0F19] text-slate-100 min-h-screen p-4 sm:p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
        <div>
          <div className="text-xs font-semibold text-indigo-400">Software Engineer Workspace</div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Engineering Home</h1>
          <p className="text-xs text-slate-400 mt-0.5">Sprint {currentSprint.name} &bull; {currentSprint.phase}</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-[#1E293B] hover:bg-slate-700 text-slate-200 px-3.5 py-2 rounded-xl text-xs font-semibold border border-slate-700/60 transition-all">
            <Calendar className="w-4 h-4 text-indigo-400" /> {currentSprint.daysRemaining} days left
          </button>
          <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-3.5 py-2 rounded-xl text-xs font-semibold transition-all shadow-lg shadow-indigo-600/20">
            <Zap className="w-4 h-4" /> Quick Actions
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {quickActions.map((action, idx) => (
          <motion.button key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}
            className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-4 backdrop-blur-md hover:border-indigo-500/40 transition-all text-left group">
            <div className={`p-2 rounded-xl border border-slate-700/60 inline-block mb-2 ${action.bg}`}>
              <action.icon className={`w-4 h-4 ${action.color}`} />
            </div>
            <div className="text-xs font-semibold text-slate-300 group-hover:text-white">{action.label}</div>
          </motion.button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-white flex items-center gap-2"><LayoutDashboard className="w-4 h-4 text-indigo-400" /> Sprint Progress</h2>
              <span className="text-xs font-bold text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/20">{currentSprint.completedPoints}/{currentSprint.totalPoints} pts</span>
            </div>
            <div className="w-full bg-slate-800/50 rounded-full h-3 mb-4">
              <div className="bg-indigo-500 h-3 rounded-full transition-all" style={{ width: `${sprintProgress}%` }} />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {activeTasks.filter(t => t.status === 'In Progress').map(task => (
                <div key={task.id} className="bg-[#1E293B]/70 border border-slate-800 rounded-xl p-3 space-y-2">
                  <div className="flex items-center gap-2">
                    <PlayCircle className="w-4 h-4 text-indigo-400" />
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">{task.id}</span>
                  </div>
                  <p className="text-xs font-semibold text-white">{task.title}</p>
                  <div className="flex items-center justify-between">
                    <span className={"px-2 py-0.5 rounded text-[10px] font-bold border " + priorityColor(task.priority)}>{task.priority}</span>
                    <span className="text-xs text-slate-400">{task.points} pts</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-bold text-white flex items-center gap-2"><GitPullRequest className="w-4 h-4 text-indigo-400" /> Pending Reviews</h2>
                <button className="text-xs font-bold text-indigo-400 hover:text-indigo-300">View All</button>
              </div>
              <div className="space-y-3">
                {pendingReviews.map(pr => (
                  <div key={pr.id} className="flex items-center justify-between p-3 rounded-xl border border-slate-800/80 bg-[#1E293B]/50 hover:bg-slate-800/60 transition-all cursor-pointer">
                    <div>
                      <span className="text-xs font-mono font-bold text-indigo-400">{pr.id}</span>
                      <p className="text-xs text-slate-200 mt-0.5">{pr.title}</p>
                      <span className="text-[10px] text-slate-400">by {pr.author}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span>{pr.files} files</span>
                      <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3" />{pr.comments}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-bold text-white flex items-center gap-2"><Bug className="w-4 h-4 text-rose-400" /> Active Bugs</h2>
                <button className="text-xs font-bold text-indigo-400 hover:text-indigo-300">View All</button>
              </div>
              <div className="space-y-3">
                {bugs.map(bug => (
                  <div key={bug.id} className="flex items-center justify-between p-3 rounded-xl border border-slate-800/80 bg-[#1E293B]/50 hover:bg-slate-800/60 transition-all cursor-pointer">
                    <div className="flex items-center gap-2">
                      <Bug className="w-3.5 h-3.5 text-rose-400" />
                      <div>
                        <span className="text-xs font-mono font-bold text-rose-400">{bug.id}</span>
                        <p className="text-xs text-slate-200">{bug.title}</p>
                      </div>
                    </div>
                    <span className={"px-2 py-0.5 rounded text-[10px] font-bold border " + (bug.severity === 'Critical' ? 'text-rose-400 bg-rose-500/10 border-rose-500/20' : 'text-amber-400 bg-amber-500/10 border-amber-500/20')}>{bug.severity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
              <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">PR Status</h3>
              <div className="flex items-end justify-between">
                <div className="flex gap-3">
                  <div><div className="text-lg font-extrabold text-white">{prStatus.open}</div><div className="text-[10px] text-slate-400">Open</div></div>
                  <div><div className="text-lg font-extrabold text-emerald-400">{prStatus.merged}</div><div className="text-[10px] text-slate-400">Merged</div></div>
                  <div><div className="text-lg font-extrabold text-rose-400">{prStatus.declined}</div><div className="text-[10px] text-slate-400">Declined</div></div>
                </div>
                <GitPullRequest className="w-8 h-8 text-indigo-400/30" />
              </div>
            </div>
            <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
              <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Build Status</h3>
              <div className="flex items-end justify-between">
                <div className="flex gap-3">
                  <div><div className="text-lg font-extrabold text-emerald-400">{buildStatus.passing}</div><div className="text-[10px] text-slate-400">Passing</div></div>
                  <div><div className="text-lg font-extrabold text-rose-400">{buildStatus.failing}</div><div className="text-[10px] text-slate-400">Failing</div></div>
                  <div><div className="text-lg font-extrabold text-amber-400">{buildStatus.pending}</div><div className="text-[10px] text-slate-400">Pending</div></div>
                </div>
                <PlayCircle className="w-8 h-8 text-emerald-400/30" />
              </div>
            </div>
            <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
              <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Deployment</h3>
              <div className="space-y-1">
                <div className="flex items-center justify-between"><span className="text-[10px] text-slate-400">Production</span><span className="text-xs font-bold text-emerald-400">{deploymentStatus.production}</span></div>
                <div className="flex items-center justify-between"><span className="text-[10px] text-slate-400">Staging</span><span className="text-xs font-bold text-amber-400">{deploymentStatus.staging}</span></div>
                <div className="flex items-center justify-between"><span className="text-[10px] text-slate-400">Deployed</span><span className="text-[10px] text-slate-300">{deploymentStatus.lastDeployed}</span></div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Code Coverage</h3>
                <Code2 className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-2xl font-extrabold text-white">{codeCoverage}%</div>
              <div className="w-full bg-slate-800/50 rounded-full h-2 mt-2"><div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${codeCoverage}%` }} /></div>
            </div>
            <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Code Quality</h3>
                <Shield className="w-4 h-4 text-indigo-400" />
              </div>
              <div className="text-2xl font-extrabold text-white">{codeQuality}</div>
              <div className="text-xs text-slate-400 mt-1">Quality gate passed</div>
            </div>
            <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Technical Debt</h3>
                <AlertTriangle className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-2xl font-extrabold text-white">{technicalDebt.ratio}</div>
              <div className="text-xs text-slate-400 mt-1">{technicalDebt.hours} hours estimated</div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
              <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Focus Time</h3>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-2xl font-extrabold text-white">{focusTime.today}h</div>
                  <div className="text-xs text-slate-400">Today</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-slate-300">{focusTime.weekly}h</div>
                  <div className="text-[10px] text-slate-500">This week</div>
                </div>
              </div>
            </div>
            <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
              <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Velocity</h3>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-2xl font-extrabold text-white">{velocity.current}</div>
                  <div className="text-xs text-slate-400">Current sprint</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-slate-300">{velocity.average}</div>
                  <div className="text-[10px] text-slate-500">Average</div>
                </div>
              </div>
            </div>
            <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
              <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Productivity</h3>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-2xl font-extrabold text-emerald-400">{productivityScore}%</div>
                  <div className="text-xs text-slate-400">Score</div>
                </div>
                <TrendingUp className="w-8 h-8 text-emerald-400/30" />
              </div>
            </div>
          </div>

          <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-white flex items-center gap-2"><GitCommit className="w-4 h-4 text-indigo-400" /> Recent Commits</h2>
              <button className="text-xs font-bold text-indigo-400 hover:text-indigo-300">View All</button>
            </div>
            <div className="space-y-2">
              {recentCommits.map((commit, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-xl border border-slate-800/80 bg-[#1E293B]/50 hover:bg-slate-800/60 transition-all">
                  <div className="flex items-center gap-3">
                    <code className="text-xs font-mono font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">{commit.hash}</code>
                    <div>
                      <p className="text-xs font-semibold text-slate-200">{commit.message}</p>
                      <span className="text-[10px] text-slate-400">{commit.branch}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-[10px] text-slate-400">
                    <span>{commit.author}</span>
                    <span>{commit.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
            <div className="flex items-center gap-2 text-indigo-400 mb-3"><Bot className="w-5 h-5" /><h2 className="text-sm font-bold text-white">AI Insights</h2></div>
            <div className="space-y-3">
              <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl"><div className="flex items-center gap-2 text-rose-400 font-bold text-xs mb-1"><AlertTriangle className="w-4 h-4" /> High Risk</div><p className="text-xs text-slate-300">PR #423 has been open for 5 days without review.</p></div>
              <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl"><div className="flex items-center gap-2 text-amber-400 font-bold text-xs mb-1"><Activity className="w-4 h-4" /> Blockers</div><p className="text-xs text-slate-300">Awaiting DevOps approval for Redis migration.</p></div>
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl"><div className="flex items-center gap-2 text-emerald-400 font-bold text-xs mb-1"><TrendingUp className="w-4 h-4" /> Suggestion</div><p className="text-xs text-slate-300">You are 15% ahead of schedule. Great work!</p></div>
            </div>
          </div>

          <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-white flex items-center gap-2"><Calendar className="w-4 h-4 text-indigo-400" /> Today's Meetings</h2>
            </div>
            <div className="space-y-2">
              {meetings.map((m, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 rounded-xl border border-slate-800/80 bg-[#1E293B]/50">
                  <div className="p-2 bg-indigo-500/10 rounded-lg border border-indigo-500/20"><Calendar className="w-4 h-4 text-indigo-400" /></div>
                  <div><p className="text-xs font-semibold text-white">{m.title}</p><span className="text-[10px] text-slate-400">{m.time} &bull; {m.type}</span></div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-white flex items-center gap-2"><Bell className="w-4 h-4 text-amber-400" /> Notifications</h2>
              <button className="text-xs font-bold text-indigo-400 hover:text-indigo-300">Clear</button>
            </div>
            <div className="space-y-2">
              {notifications.map((n, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-xl border border-slate-800/80 bg-[#1E293B]/50">
                  <div className={`p-1.5 rounded-lg ${n.type === 'review' ? 'bg-indigo-500/10' : 'bg-rose-500/10'}`}>
                    {n.type === 'review' ? <GitPullRequest className="w-3.5 h-3.5 text-indigo-400" /> : <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />}
                  </div>
                  <div className="flex-1"><p className="text-xs text-slate-200">{n.text}</p><span className="text-[10px] text-slate-500">{n.time}</span></div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-white flex items-center gap-2"><Activity className="w-4 h-4 text-emerald-400" /> Recent Activity</h2>
            </div>
            <div className="space-y-2">
              {recentActivity.map((a, idx) => (
                <div key={idx} className="flex items-center gap-3 p-2.5 rounded-xl border border-slate-800/80 bg-[#1E293B]/50">
                  <div className={`p-1.5 rounded-lg ${a.type === 'push' ? 'bg-emerald-500/10' : a.type === 'pr' ? 'bg-indigo-500/10' : 'bg-indigo-500/10'}`}>
                    {a.type === 'push' ? <GitCommit className="w-3.5 h-3.5 text-emerald-400" /> : <GitPullRequest className="w-3.5 h-3.5 text-indigo-400" />}
                  </div>
                  <div className="flex-1"><p className="text-xs text-slate-200">{a.action}</p><span className="text-[10px] text-slate-500">{a.time}</span></div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-white flex items-center gap-2"><Zap className="w-4 h-4 text-amber-400" /> Release Countdown</h2>
            </div>
            <div className="text-center">
              <div className="text-3xl font-extrabold text-white">{releaseCountdown.daysLeft}</div>
              <div className="text-xs text-slate-400">days until {releaseCountdown.version}</div>
              <div className="flex justify-center gap-4 mt-3">
                <div><div className="text-sm font-bold text-white">{releaseCountdown.features}</div><div className="text-[10px] text-slate-400">Features</div></div>
                <div><div className="text-sm font-bold text-emerald-400">{releaseCountdown.bugsFixed}</div><div className="text-[10px] text-slate-400">Bug Fixes</div></div>
              </div>
              <div className="w-full bg-slate-800/50 rounded-full h-2 mt-3"><div className="bg-amber-500 h-2 rounded-full" style={{ width: `${Math.min(100, (releaseCountdown.daysLeft / 30) * 100)}%` }} /></div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
          <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2"><BarChart3 className="w-4 h-4 text-indigo-400" /> Repository Activity</h2>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={repoActivity} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                <XAxis dataKey="day" stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip cursor={{ fill: '#1E293B' }} contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', color: '#fff' }} />
                <Bar dataKey="commits" name="Commits" fill="#6366F1" radius={[4, 4, 0, 0]} barSize={24} />
                <Bar dataKey="prs" name="PRs" fill="#22D3EE" radius={[4, 4, 0, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
          <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2"><Activity className="w-4 h-4 text-emerald-400" /> Focus Time Trend</h2>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={[{ day: 'Mon', hours: 3.5 }, { day: 'Tue', hours: 5 }, { day: 'Wed', hours: 4.8 }, { day: 'Thu', hours: 6.2 }, { day: 'Fri', hours: 4.5 }, { day: 'Sat', hours: 2 }, { day: 'Sun', hours: 1 }]} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <defs><linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#22D3EE" stopOpacity={0.4}/><stop offset="95%" stopColor="#22D3EE" stopOpacity={0}/></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                <XAxis dataKey="day" stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', color: '#fff' }} />
                <Area type="monotone" dataKey="hours" stroke="#22D3EE" strokeWidth={3} fillOpacity={1} fill="url(#colorHours)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
