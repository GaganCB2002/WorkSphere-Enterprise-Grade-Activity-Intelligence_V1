import React from 'react';
import { ProgressRing } from '../ui/ProgressRing';
import { Zap, Clock, Users, CheckCircle2, TrendingUp, Sparkles } from 'lucide-react';
import type { ProductivityMetrics } from '../../types';

interface PerformanceScoreProps {
  metrics: ProductivityMetrics;
}

export function PerformanceScore({ metrics }: PerformanceScoreProps) {
  const scoreItems = [
    { label: 'Work Efficiency', value: metrics.workEfficiency, icon: Clock, color: 'text-blue-500 bg-blue-50 dark:bg-blue-500/10' },
    { label: 'Attendance Ratio', value: metrics.attendanceRatio, icon: Zap, color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10' },
    { label: 'Collaboration Index', value: metrics.collaborationScore, icon: Users, color: 'text-purple-500 bg-purple-50 dark:bg-purple-500/10' },
    { label: 'Task Completion', value: metrics.taskCompletionRate, icon: CheckCircle2, color: 'text-pink-500 bg-pink-50 dark:bg-pink-500/10' },
  ];

  return (
    <div className="bg-white dark:bg-slate-900/60 backdrop-blur-md border border-slate-200/60 dark:border-white/[0.06] rounded-2xl p-5 flex flex-col md:flex-row gap-6 items-center">
      {/* Radial Gauge */}
      <div className="flex-shrink-0 flex flex-col items-center">
        <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-4">Aura Performance Index</h3>
        <ProgressRing
          value={metrics.score}
          size={120}
          strokeWidth={9}
          color="#3b82f6"
          trackColor="rgba(148,163,184,0.1)"
          label="Performance"
          showValue={true}
        />
        <div className="flex items-center gap-1 mt-3.5 text-xs text-emerald-500 font-bold">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>+{metrics.trend}% from last month</span>
        </div>
      </div>

      {/* Stats Breakdown */}
      <div className="flex-1 w-full grid grid-cols-2 gap-3">
        {scoreItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="p-3.5 rounded-xl border border-slate-100 dark:border-white/[0.03] bg-slate-50/50 dark:bg-slate-950/15 flex items-center gap-3"
            >
              <div className={`w-8.5 h-8.5 rounded-lg flex items-center justify-center ${item.color} flex-shrink-0`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] text-slate-400 font-semibold truncate leading-none mb-1">{item.label}</p>
                <p className="text-sm font-extrabold text-slate-900 dark:text-white leading-none">
                  {item.value}%
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PerformanceScore;
