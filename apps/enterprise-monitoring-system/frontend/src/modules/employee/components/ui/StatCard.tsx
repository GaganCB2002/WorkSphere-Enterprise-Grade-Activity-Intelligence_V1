import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus, Clock, Timer, Calendar, Target, Zap, ListTodo, BarChart3 } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  trend: 'up' | 'down' | 'neutral';
  icon: string;
  color: string;
  bgColor: string;
  delay?: number;
}

const iconMap: Record<string, React.ElementType> = {
  clock: Clock, timer: Timer, calendar: Calendar, target: Target,
  trending: TrendingUp, tasks: ListTodo, chart: BarChart3, zap: Zap,
};

export function StatCard({ label, value, change, changeLabel, trend, icon, color, bgColor, delay = 0 }: StatCardProps) {
  const Icon = iconMap[icon] || Zap;
  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group relative bg-white dark:bg-slate-900/80 border border-slate-200/60 dark:border-white/[0.06] rounded-2xl p-5 hover:shadow-lg hover:border-slate-300/80 dark:hover:border-white/10 transition-all duration-300 overflow-hidden"
    >
      {/* Subtle accent gradient top border */}
      <div className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }} />

      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">{label}</p>
          <p className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight leading-none">{value}</p>
          {(change !== undefined || changeLabel) && (
            <div className="flex items-center gap-1.5 mt-2.5">
              {change !== undefined && (
                <span className={`inline-flex items-center gap-0.5 text-[11px] font-semibold px-1.5 py-0.5 rounded-md ${
                  trend === 'up' ? 'text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-500/10' :
                  trend === 'down' ? 'text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-500/10' :
                  'text-slate-500 bg-slate-100 dark:text-slate-400 dark:bg-slate-800'
                }`}>
                  <TrendIcon className="w-3 h-3" />
                  {change > 0 ? '+' : ''}{change}%
                </span>
              )}
              {changeLabel && <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">{changeLabel}</span>}
            </div>
          )}
        </div>
        <div className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 duration-300" style={{ backgroundColor: bgColor }}>
          <Icon className="w-5 h-5" style={{ color }} />
        </div>
      </div>
    </motion.div>
  );
}
