import React, { useState } from 'react';
import { Download, ChevronDown, CheckCircle, Bug, Bot, Timer, ClipboardList, TrendingUp, AlertTriangle, Activity, Shield } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from 'recharts';
import { useDashboardMetrics } from '../data/hooks';
import { StatCard } from '../components/StatCard';

const COLORS = { critical: '#ef4444', high: '#f59e0b', medium: '#3b82f6', low: '#64748b' };

export const DashboardOverview: React.FC = () => {
  const { metrics, executions, defectCategories } = useDashboardMetrics();
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
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="px-2.5 py-1 rounded-lg bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 text-[10px] font-bold uppercase tracking-wider">
              Sprint 42
            </div>
            <div className="px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold uppercase tracking-wider">
              Active
            </div>
          </div>
          <h1 className="text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">Quality Dashboard</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Enterprise release readiness & quality metrics overview</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <button
              onClick={() => setShowExport(!showExport)}
              className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm"
            >
              <Download className="w-4 h-4" /> Export
            </button>
            {showExport && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl py-2 z-10 animate-in slide-in-from-top-2 fade-in">
                <button className="w-full px-4 py-2 text-left text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">Export as PDF</button>
                <button className="w-full px-4 py-2 text-left text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">Export as CSV</button>
                <button className="w-full px-4 py-2 text-left text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">Schedule Report</button>
              </div>
            )}
          </div>
          <select
            value={timeRange}
            onChange={e => setTimeRange(e.target.value)}
            className="px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-violet-500/30 shadow-sm cursor-pointer"
          >
            <option value="7">Last 7 Days</option>
            <option value="14">Last 14 Days</option>
            <option value="30">Last 30 Days</option>
            <option value="90">Last Quarter</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 lg:p-8 shadow-sm relative overflow-hidden group hover:shadow-lg transition-all duration-300">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-violet-500/5 to-transparent rounded-bl-full" />
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400">Release Readiness</h3>
              <Shield className="w-5 h-5 text-emerald-500" />
            </div>
            <div className="flex items-end gap-2 mb-1">
              <span className="text-6xl font-extrabold text-slate-900 dark:text-white leading-none">{metrics.releaseScore}</span>
              <span className="text-xl font-bold text-slate-400 dark:text-slate-500 mb-1">/ 100</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm font-semibold text-emerald-600 dark:text-emerald-400 mb-6">
              <TrendingUp className="w-4 h-4" />
              +{metrics.releaseTrend} points from last sprint
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <div className="flex justify-between text-xs font-bold mb-1.5">
                <span className="text-slate-500 dark:text-slate-400">Critical Path Coverage</span>
                <span className="text-slate-900 dark:text-slate-100">{metrics.criticalPathCoverage}%</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full transition-all duration-500" style={{ width: `${metrics.criticalPathCoverage}%` }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs font-bold mb-1.5">
                <span className="text-slate-500 dark:text-slate-400">Regression Pass Rate</span>
                <span className="text-slate-900 dark:text-slate-100">{metrics.regressionPassRate}%</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-violet-400 to-violet-600 rounded-full transition-all duration-500" style={{ width: `${metrics.regressionPassRate}%` }} />
              </div>
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 dark:text-slate-500">Sprint Velocity</span>
              <span className="text-slate-900 dark:text-slate-100 font-bold">42 pts</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
          <StatCard
            label="Total Test Cases"
            value={metrics.totalTestCases.toLocaleString()}
            icon={ClipboardList}
            color="blue"
            trend={{ value: '+2.1% this week', up: true }}
          />
          <StatCard
            label="Active Bugs"
            value={metrics.activeBugs}
            icon={Bug}
            color="red"
            trend={{ value: '12% decrease', up: true }}
            sublabel={`${metrics.criticalBugs} critical · ${metrics.highBugs} high`}
          />
          <StatCard
            label="Automation Coverage"
            value={`${metrics.automationCoverage}%`}
            icon={Bot}
            color="cyan"
            trend={{ value: `+${metrics.automationTrend}% this month`, up: true }}
            sublabel={`Target: ${metrics.automationTarget}%`}
          />
          <StatCard
            label="Avg. Fix Time"
            value={`${metrics.avgFixTime}d`}
            icon={Timer}
            color="emerald"
            trend={{ value: 'Improved by 0.3d', up: true }}
            sublabel={`Critical: ${metrics.criticalFixTime}`}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
            <Activity className="w-4 h-4 text-violet-500" />
            Test Case Distribution
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value" stroke="none">
                  {pieData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', padding: '8px 12px' }}
                  formatter={(value: number, name: string) => [`${value}%`, name]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-2">
            {pieData.map(d => (
              <div key={d.name} className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{d.name} ({d.value}%)</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            Defects by Severity
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={severityData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={36}>
                  {severityData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-500" />
            Automation vs Manual
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={executions} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="week" stroke="#94a3b8" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Line type="monotone" dataKey="automation" name="Automated" stroke="#10b981" strokeWidth={2.5} dot={{ r: 3, fill: '#10b981' }} activeDot={{ r: 5 }} />
                <Line type="monotone" dataKey="manual" name="Manual" stroke="#64748b" strokeWidth={2.5} dot={{ r: 3, fill: '#64748b' }} activeDot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
