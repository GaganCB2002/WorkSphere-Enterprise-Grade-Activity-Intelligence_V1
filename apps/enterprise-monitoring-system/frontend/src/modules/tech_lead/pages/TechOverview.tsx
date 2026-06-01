import React from 'react';
import { getLiveDate, getLiveTime } from '../../../utils/liveDataHelpers';

import { 
  GitBranch, GitCommit, AlertOctagon, CheckCircle2, TrendingUp, 
  Clock, Zap, Activity, Bug, ArrowUpRight, ArrowDownRight, Bot
} from 'lucide-react';
import { 
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, 
  CartesianGrid, AreaChart, Area, BarChart, Bar, Cell
} from 'recharts';

const velocityData = [
  { sprint: 'Sprint 38', committed: 110, completed: 105 },
  { sprint: 'Sprint 39', committed: 120, completed: 118 },
  { sprint: 'Sprint 40', committed: 115, completed: 95 },
  { sprint: 'Sprint 41', committed: 130, completed: 128 },
  { sprint: 'Sprint 42', committed: 140, completed: 85 }, // Current
];

const commitActivity = [
  { day: 'Mon', count: 45 }, { day: 'Tue', count: 82 }, 
  { day: 'Wed', count: 120 }, { day: 'Thu', count: 95 }, 
  { day: 'Fri', count: 115 }, { day: 'Sat', count: 10 }, { day: 'Sun', count: 5 }
];

export const TechOverview: React.FC = () => {
  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 tracking-tight">Engineering Overview</h1>
          <p className="text-sm text-[#8b949e] mt-1">Sprint 42 • Active Phase: Code Freeze</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-[#21262d] hover:bg-[#30363d] text-slate-300 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors border border-[#30363d]">
            <Clock className="w-4 h-4" />
            Last 30 Days
          </button>
          <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-md text-xs font-semibold transition-colors shadow-sm">
            <Zap className="w-4 h-4" />
            Generate Status Report
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: 'Sprint Velocity', value: '128 pts', trend: '+12%', isPositive: true, icon: TrendingUp, color: 'text-emerald-400' },
          { title: 'Active Blockers', value: '3', trend: '-2', isPositive: true, icon: AlertOctagon, color: 'text-rose-400' },
          { title: 'Pending PRs', value: '14', trend: '+5', isPositive: false, icon: GitBranch, color: 'text-amber-400' },
          { title: 'Code Quality Score', value: 'A-', trend: 'Stable', isPositive: true, icon: CheckCircle2, color: 'text-indigo-400' }
        ].map((kpi, idx) => (
          <div key={idx} className="bg-[#0E1117] border border-[#21262d] rounded-xl p-5 relative overflow-hidden group">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xs font-bold text-[#8b949e] uppercase tracking-wider">{kpi.title}</h3>
              <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
            </div>
            <div className="flex items-end gap-3">
              <span className="text-3xl font-extrabold text-slate-100 tracking-tight">{kpi.value}</span>
              <div className={`flex items-center text-xs font-bold mb-1 ${kpi.isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
                {kpi.isPositive ? <ArrowUpRight className="w-3 h-3 mr-0.5" /> : <ArrowDownRight className="w-3 h-3 mr-0.5" />}
                {kpi.trend}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Velocity Chart */}
        <div className="lg:col-span-2 bg-[#0E1117] border border-[#21262d] rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-sm font-bold text-slate-200">Sprint Velocity Trends</h2>
              <p className="text-xs text-[#8b949e]">Committed vs. Completed Story Points</p>
            </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={velocityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#21262d" vertical={false} />
                <XAxis dataKey="sprint" stroke="#8b949e" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#8b949e" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{ fill: '#21262d', opacity: 0.4 }}
                  contentStyle={{ backgroundColor: '#0E1117', borderColor: '#30363d', borderRadius: '8px', color: '#fff' }}
                />
                <Bar dataKey="committed" name="Committed" fill="#30363d" radius={[4, 4, 0, 0]} barSize={32} />
                <Bar dataKey="completed" name="Completed" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Insights Panel */}
        <div className="bg-[#0E1117] border border-[#21262d] rounded-xl flex flex-col overflow-hidden">
          <div className="p-5 border-b border-[#21262d] flex items-center justify-between bg-indigo-500/5">
            <div className="flex items-center gap-2 text-indigo-400">
              <Bot className="w-5 h-5" />
              <h2 className="text-sm font-bold">AI Risk Assessment</h2>
            </div>
            <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></span>
          </div>
          <div className="p-5 flex-1 flex flex-col gap-4 overflow-y-auto custom-scrollbar">
            <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-lg">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-xs mb-1">
                <AlertOctagon className="w-4 h-4" /> High Risk (Sprint 42)
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Backend team is currently <span className="font-bold text-rose-400">22% behind</span> schedule. 
                Database migration task (ENG-402) is bottlenecking 4 dependent tickets.
              </p>
            </div>

            <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs mb-1">
                <Activity className="w-4 h-4" /> Burnout Warning
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Alex Developer has logged &gt;50 hours for 2 consecutive weeks. Consider reallocating PR reviews to Sarah.
              </p>
            </div>

            <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs mb-1">
                <CheckCircle2 className="w-4 h-4" /> Delivery Predictor
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Based on current velocity, the v2.4 Release Candidate will be ready for staging by Thursday 2:00 PM (94% confidence).
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Incidents */}
        <div className="bg-[#0E1117] border border-[#21262d] rounded-xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <Bug className="w-4 h-4 text-rose-500" />
              Critical Incidents & Bugs
            </h2>
            <button className="text-xs font-bold text-indigo-400 hover:text-indigo-300">View Queue</button>
          </div>
          <div className="space-y-3">
            {[
              { id: 'INC-94', title: 'Payment Webhook Timeout', env: 'Production', time: getLiveTime(45) },
              { id: 'BUG-402', title: 'Memory leak in Redis cache', env: 'Staging', time: getLiveTime(120) },
            ].map(inc => (
              <div key={inc.id} className="flex items-center justify-between p-3 rounded-lg border border-[#21262d] hover:border-[#30363d] bg-[#161b22] transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold text-rose-400">{inc.id}</span>
                  <span className="text-sm font-medium text-slate-300">{inc.title}</span>
                </div>
                <div className="flex items-center gap-3 text-xs font-medium text-[#8b949e]">
                  <span className="px-2 py-0.5 rounded border border-[#30363d] bg-[#0E1117]">{inc.env}</span>
                  <span>{inc.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Commit Activity */}
        <div className="bg-[#0E1117] border border-[#21262d] rounded-xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <GitCommit className="w-4 h-4 text-indigo-500" />
              Code Contributions
            </h2>
          </div>
          <div className="h-40 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={commitActivity} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#21262d" vertical={false} />
                <XAxis dataKey="day" stroke="#8b949e" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#8b949e" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0E1117', borderColor: '#30363d', borderRadius: '8px', color: '#fff' }}
                />
                <Area type="monotone" dataKey="count" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorCount)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
