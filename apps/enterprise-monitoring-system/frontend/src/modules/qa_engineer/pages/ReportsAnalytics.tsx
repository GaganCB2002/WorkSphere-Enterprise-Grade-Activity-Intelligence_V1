import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, BarChart, Bar, AreaChart, Area } from 'recharts';
import { TrendingUp, Download, ChevronDown, Activity, Bug, Target } from 'lucide-react';
import { useDashboardMetrics } from '../data/hooks';

export const ReportsAnalytics: React.FC = () => {
  const { metrics, executions, defectCategories } = useDashboardMetrics();
  const [chartType, setChartType] = useState<'line' | 'area'>('area');

  const defectTrendData = [
    { week: 'Week 1', reported: 45, resolved: 32 },
    { week: 'Week 2', reported: 38, resolved: 40 },
    { week: 'Week 3', reported: 52, resolved: 41 },
    { week: 'Week 4', reported: 35, resolved: 48 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Reports & Analytics</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Defect escape rate, automation ROI, and quality trends</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm">
            <Download className="w-4 h-4" /> Export Report
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm">
            Last 4 Weeks <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Avg Pass Rate', value: '92.3%', trend: '+2.1%', up: true, icon: Activity, color: 'text-emerald-600' },
          { label: 'Defect Escape Rate', value: '3.2%', trend: '-0.8%', up: true, icon: Bug, color: 'text-red-600' },
          { label: 'Automation ROI', value: '184%', trend: '+22%', up: true, icon: TrendingUp, color: 'text-violet-600' },
          { label: 'Test Coverage', value: `₹${metrics.automationCoverage}%`, trend: '+5%', up: true, icon: Target, color: 'text-purple-600' },
        ].map((s, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">{s.label}</h3>
              <s.icon className={`w-5 h-5 ${s.color}`} />
            </div>
            <p className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-1">{s.value}</p>
            <span className={`text-xs font-bold ${s.up ? 'text-emerald-600' : 'text-red-600'}`}>{s.trend}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Activity className="w-4 h-4 text-violet-500" />
              Automation vs Manual Executions
            </h3>
            <div className="flex bg-slate-100 dark:bg-slate-800 rounded-lg p-0.5">
              <button onClick={() => setChartType('area')} className={`px-3 py-1 rounded-md text-xs font-bold transition-colors ${chartType === 'area' ? 'bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-slate-100' : 'text-slate-500'}`}>Area</button>
              <button onClick={() => setChartType('line')} className={`px-3 py-1 rounded-md text-xs font-bold transition-colors ${chartType === 'line' ? 'bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-slate-100' : 'text-slate-500'}`}>Line</button>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              {chartType === 'area' ? (
                <AreaChart data={executions}>
                  <defs>
                    <linearGradient id="autoGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#10b981" stopOpacity={0.3} /><stop offset="95%" stopColor="#10b981" stopOpacity={0} /></linearGradient>
                    <linearGradient id="manualGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#64748b" stopOpacity={0.2} /><stop offset="95%" stopColor="#64748b" stopOpacity={0} /></linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                  <XAxis dataKey="week" stroke="#94a3b8" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                  <YAxis stroke="#94a3b8" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                  <Area type="monotone" dataKey="automation" name="Automated Tests" stroke="#10b981" strokeWidth={2.5} fill="url(#autoGrad)" dot={{ r: 4, fill: '#10b981' }} />
                  <Area type="monotone" dataKey="manual" name="Manual Tests" stroke="#64748b" strokeWidth={2.5} fill="url(#manualGrad)" dot={{ r: 4, fill: '#64748b' }} />
                </AreaChart>
              ) : (
                <LineChart data={executions}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                  <XAxis dataKey="week" stroke="#94a3b8" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                  <YAxis stroke="#94a3b8" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                  <Legend />
                  <Line type="monotone" dataKey="automation" name="Automated Tests" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="manual" name="Manual Tests" stroke="#64748b" strokeWidth={3} dot={{ r: 4 }} />
                </LineChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-2">
            <Bug className="w-4 h-4 text-red-500" />
            Defect Report vs Resolve Trend
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={defectTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="week" stroke="#94a3b8" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                <Legend />
                <Bar dataKey="reported" name="Reported" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={32} />
                <Bar dataKey="resolved" name="Resolved" fill="#10b981" radius={[4, 4, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
          <Target className="w-4 h-4 text-purple-500" />
          Defect Distribution by Module
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {defectCategories.map((cat, i) => {
            const total = cat.critical + cat.high + cat.medium + cat.low;
            return (
              <div key={i} className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">{cat.module}</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3">{total}</p>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-[10px]">
                    <div className="w-2 h-2 rounded-full bg-red-500" />
                    <span className="text-slate-500">Critical</span>
                    <span className="ml-auto font-bold text-slate-700 dark:text-slate-300">{cat.critical}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px]">
                    <div className="w-2 h-2 rounded-full bg-amber-500" />
                    <span className="text-slate-500">High</span>
                    <span className="ml-auto font-bold text-slate-700 dark:text-slate-300">{cat.high}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px]">
                    <div className="w-2 h-2 rounded-full bg-violet-500" />
                    <span className="text-slate-500">Medium</span>
                    <span className="ml-auto font-bold text-slate-700 dark:text-slate-300">{cat.medium}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px]">
                    <div className="w-2 h-2 rounded-full bg-slate-400" />
                    <span className="text-slate-500">Low</span>
                    <span className="ml-auto font-bold text-slate-700 dark:text-slate-300">{cat.low}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
