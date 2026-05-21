import React, { useState } from 'react';
import { ResponsiveContainer, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import type { WeeklyMetric, MonthlyMetric } from '../../types';

interface ProductivityChartProps {
  weeklyData: WeeklyMetric[];
  monthlyData: MonthlyMetric[];
}

export function ProductivityChart({ weeklyData, monthlyData }: ProductivityChartProps) {
  const [timeframe, setTimeframe] = useState<'weekly' | 'monthly'>('weekly');

  return (
    <div className="bg-white dark:bg-slate-900/60 backdrop-blur-md border border-slate-200/60 dark:border-white/[0.06] rounded-2xl p-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Productivity Trends</h3>
          <p className="text-xs text-slate-400 mt-0.5">Performance index and completed deliverables analytics</p>
        </div>

        {/* Timeframe selector */}
        <div className="flex bg-slate-100 dark:bg-slate-800/80 p-0.5 rounded-lg self-start">
          <button
            onClick={() => setTimeframe('weekly')}
            className={`px-3 py-1 text-[11px] font-bold rounded-md transition-colors ${
              timeframe === 'weekly'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-350'
            }`}
          >
            Weekly Focus
          </button>
          <button
            onClick={() => setTimeframe('monthly')}
            className={`px-3 py-1 text-[11px] font-bold rounded-md transition-colors ${
              timeframe === 'monthly'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-350'
            }`}
          >
            Monthly Overview
          </button>
        </div>
      </div>

      {/* Chart container */}
      <div className="h-64 w-full">
        {timeframe === 'weekly' ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={weeklyData}>
              <defs>
                <linearGradient id="productivityGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.08)" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis domain={[70, 100]} tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  background: '#0f172a',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '12px',
                  fontSize: '11px',
                  color: '#fff',
                }}
              />
              <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '11px', fontWeight: 'bold' }} />
              <Area
                name="Baseline Target"
                type="monotone"
                dataKey="target"
                stroke="#64748b"
                strokeWidth={1}
                strokeDasharray="4 4"
                fill="none"
              />
              <Area
                name="Your Score"
                type="monotone"
                dataKey="value"
                stroke="#3b82f6"
                strokeWidth={2.5}
                fill="url(#productivityGradient)"
                dot={{ r: 4, fill: '#3b82f6', stroke: '#fff', strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.08)" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  background: '#0f172a',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '12px',
                  fontSize: '11px',
                  color: '#fff',
                }}
              />
              <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '11px', fontWeight: 'bold' }} />
              <Bar name="Productivity %" dataKey="productivity" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={16} />
              <Bar name="Attendance %" dataKey="attendance" fill="#10b981" radius={[4, 4, 0, 0]} barSize={16} />
              <Bar name="Tasks Completed" dataKey="tasks" fill="#8b5cf6" radius={[4, 4, 0, 0]} barSize={16} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}

export default ProductivityChart;
