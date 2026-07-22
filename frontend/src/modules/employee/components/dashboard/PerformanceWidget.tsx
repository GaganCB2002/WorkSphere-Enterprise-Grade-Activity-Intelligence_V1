import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, TrendingUp } from 'lucide-react';
import { GlassPanel } from '../ui/GlassPanel';
import { ProgressRing } from '../ui/ProgressRing';

interface MonthlyScore {
  month: string;
  score: number;
}

interface PerformanceWidgetProps {
  score: number;
  trend: MonthlyScore[];
  feedback: string;
  departmentAvg: number;
}

export function PerformanceWidget({ score, trend, feedback, departmentAvg }: PerformanceWidgetProps) {
  const navigate = useNavigate();

  return (
    <GlassPanel padding="sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-emerald-500" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Performance</h3>
        </div>
      </div>
      <div className="flex items-center gap-4 mb-4">
        <ProgressRing value={score} size={80} strokeWidth={6} color={score >= 80 ? '#10b981' : score >= 60 ? '#f59e0b' : '#ef4444'} label="Score" />
        <div>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Dept. Average</p>
          <p className="text-lg font-bold text-slate-900 dark:text-white">{departmentAvg}%</p>
          <p className={`text-[10px] font-bold mt-0.5 ${score >= departmentAvg ? 'text-emerald-500' : 'text-red-500'}`}>
            {score >= departmentAvg ? 'Above average' : 'Below average'}
          </p>
        </div>
      </div>
      <div className="flex items-end gap-1 h-16 mb-3">
        {trend.slice(-6).map((m, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1">
            <div
              className="w-full rounded-sm transition-all"
              style={{
                height: `${m.score}%`,
                backgroundColor: m.score >= 80 ? '#10b981' : m.score >= 60 ? '#f59e0b' : '#ef4444',
                opacity: 0.8,
              }}
            />
            <span className="text-[8px] text-slate-400 font-semibold">{m.month.slice(0, 3)}</span>
          </div>
        ))}
      </div>
      {feedback && (
        <p className="text-[10px] text-slate-500 dark:text-slate-400 font-normal italic mb-3">"{feedback}"</p>
      )}
      <button
        onClick={() => navigate('/employee/performance')}
        className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
      >
        <span>View Details</span>
        <ArrowRight className="w-3 h-3" />
      </button>
    </GlassPanel>
  );
}
