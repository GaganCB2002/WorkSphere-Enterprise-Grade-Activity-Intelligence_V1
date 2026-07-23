import React, { useState } from 'react';
import { Download, CheckCircle, Bug, Bot, Timer, ClipboardList, TrendingUp, AlertTriangle, Activity, Shield } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { useDashboardMetrics } from '../data/hooks';

const COLORS = { critical: '#ef4444', high: '#f59e0b', medium: '#3b82f6', low: '#64748b' };

export const DashboardOverview: React.FC = () => {
  const { metrics, executions } = useDashboardMetrics();
  const [timeRange, setTimeRange] = useState('7');
  const [showExport, setShowExport] = useState(false);

  const pieData = [
    { name: 'Pass', value: metrics.passRate, color: '#10b981' },
    { name: 'Fail', value: metrics.failRate, color: '#ef4444' },
    { name: 'Skip', value: metrics.skipRate, color: '#94a3b8' },
  ];

  const severityData = [
    { name: 'Critical', value: metrics.criticalBugs, color: COLORS.critical },
    { name: 'High', value: metrics.highBugs, color: COLORS.high },
    { name: 'Medium', value: metrics.mediumBugs, color: COLORS.medium },
    { name: 'Low', value: metrics.lowBugs, color: COLORS.low },
  ];

  return (
    <div className="bg-[#0B0F19] text-slate-100 min-h-screen p-4 sm:p-6 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-[10px] font-bold uppercase tracking-wider">
              Sprint 42
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold uppercase tracking-wider">
              Active Release Cycle
            </span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">QA Quality Overview</h1>
          <p className="text-xs text-slate-400 mt-0.5">Enterprise release readiness & quality assurance metrics dashboard</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <button
              onClick={() => setShowExport(!showExport)}
              className="flex items-center gap-2 px-3.5 py-2 bg-[#1E293B] border border-slate-700/60 text-slate-200 rounded-xl text-xs font-semibold hover:bg-slate-700/80 transition-all"
            >
              <Download className="w-4 h-4 text-indigo-400" /> Export Summary
            </button>
            {showExport && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-[#0F172A] border border-slate-800 rounded-xl shadow-xl py-2 z-10">
                <button className="w-full px-4 py-2 text-left text-xs font-semibold text-slate-300 hover:bg-slate-800 transition-colors">Export as PDF</button>
                <button className="w-full px-4 py-2 text-left text-xs font-semibold text-slate-300 hover:bg-slate-800 transition-colors">Export as CSV</button>
                <button className="w-full px-4 py-2 text-left text-xs font-semibold text-slate-300 hover:bg-slate-800 transition-colors">Schedule Report</button>
              </div>
            )}
          </div>
          <select
            value={timeRange}
            onChange={e => setTimeRange(e.target.value)}
            className="px-3.5 py-2 bg-[#1E293B] border border-slate-700/60 text-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500 shadow-sm cursor-pointer"
          >
            <option value="7">Last 7 Days</option>
            <option value="14">Last 14 Days</option>
            <option value="30">Last 30 Days</option>
            <option value="90">Last Quarter</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-6 shadow-xl relative overflow-hidden backdrop-blur-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Release Readiness Index</h3>
            <Shield className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="flex items-end gap-2 mb-1">
            <span className="text-5xl font-extrabold text-white leading-none">{metrics.releaseScore}</span>
            <span className="text-lg font-bold text-slate-500 mb-1">/ 100</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 mb-6">
            <TrendingUp className="w-4 h-4" />
            +{metrics.releaseTrend} points from last sprint
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1.5">
                <span className="text-slate-400">Critical Path Coverage</span>
                <span className="text-white font-mono">{metrics.criticalPathCoverage}%</span>
              </div>
              <div className="w-full bg-[#1E293B] rounded-full h-2 overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${metrics.criticalPathCoverage}%` }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1.5">
                <span className="text-slate-400">Regression Pass Rate</span>
                <span className="text-white font-mono">{metrics.regressionPassRate}%</span>
              </div>
              <div className="w-full bg-[#1E293B] rounded-full h-2 overflow-hidden">
                <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${metrics.regressionPassRate}%` }} />
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md shadow-xl">
            <div className="flex justify-between items-start mb-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Test Cases</span>
              <ClipboardList className="w-4 h-4 text-indigo-400" />
            </div>
            <p className="text-3xl font-extrabold text-white tracking-tight">{metrics.totalTestCases.toLocaleString()}</p>
            <p className="text-xs text-emerald-400 font-semibold mt-1">+2.1% this week</p>
          </div>

          <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md shadow-xl">
            <div className="flex justify-between items-start mb-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Active Open Bugs</span>
              <Bug className="w-4 h-4 text-rose-400" />
            </div>
            <p className="text-3xl font-extrabold text-white tracking-tight">{metrics.activeBugs}</p>
            <p className="text-xs text-slate-400 mt-1">{metrics.criticalBugs} critical • {metrics.highBugs} high</p>
          </div>

          <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md shadow-xl">
            <div className="flex justify-between items-start mb-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Automation Ratio</span>
              <Bot className="w-4 h-4 text-cyan-400" />
            </div>
            <p className="text-3xl font-extrabold text-white tracking-tight">{metrics.automationCoverage}%</p>
            <p className="text-xs text-emerald-400 font-semibold mt-1">+{metrics.automationTrend}% this month</p>
          </div>

          <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md shadow-xl">
            <div className="flex justify-between items-start mb-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Avg Fix Resolution Time</span>
              <Timer className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-3xl font-extrabold text-white tracking-tight">{metrics.avgFixTime}d</p>
            <p className="text-xs text-emerald-400 font-semibold mt-1">Improved by 0.3d</p>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 shadow-xl backdrop-blur-md">
          <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
            <Activity className="w-4 h-4 text-indigo-400" />
            Test Suite Pass Distribution
          </h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={4} dataKey="value" stroke="none">
                  {pieData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                  formatter={(value: number, name: string) => [`${value}%`, name]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 mt-1 text-xs font-semibold text-slate-400">
            {pieData.map(d => (
              <span key={d.name} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                {d.name} ({d.value}%)
              </span>
            ))}
          </div>
        </div>

        <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 shadow-xl backdrop-blur-md">
          <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            Defects by Severity Level
          </h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={severityData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                <XAxis dataKey="name" stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                />
                <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={28}>
                  {severityData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 shadow-xl backdrop-blur-md">
          <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            Automated vs Manual Execution
          </h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={executions} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                <XAxis dataKey="week" stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                />
                <Line type="monotone" dataKey="automation" name="Automated" stroke="#10b981" strokeWidth={2.5} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="manual" name="Manual" stroke="#6366f1" strokeWidth={2.5} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
