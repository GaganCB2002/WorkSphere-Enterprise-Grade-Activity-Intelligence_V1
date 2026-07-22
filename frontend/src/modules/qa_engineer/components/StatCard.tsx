import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: { value: string; up?: boolean };
  color?: 'blue' | 'emerald' | 'red' | 'amber' | 'purple' | 'cyan' | 'slate';
  sublabel?: string;
}

const colorMap = {
  blue: { bg: 'bg-violet-50 dark:bg-violet-900/20', text: 'text-violet-600 dark:text-violet-400', iconBg: 'bg-violet-100 dark:bg-violet-900/30' },
  emerald: { bg: 'bg-emerald-50 dark:bg-emerald-900/20', text: 'text-emerald-600 dark:text-emerald-400', iconBg: 'bg-emerald-100 dark:bg-emerald-900/30' },
  red: { bg: 'bg-red-50 dark:bg-red-900/20', text: 'text-red-600 dark:text-red-400', iconBg: 'bg-red-100 dark:bg-red-900/30' },
  amber: { bg: 'bg-amber-50 dark:bg-amber-900/20', text: 'text-amber-600 dark:text-amber-400', iconBg: 'bg-amber-100 dark:bg-amber-900/30' },
  purple: { bg: 'bg-purple-50 dark:bg-purple-900/20', text: 'text-purple-600 dark:text-purple-400', iconBg: 'bg-purple-100 dark:bg-purple-900/30' },
  cyan: { bg: 'bg-cyan-50 dark:bg-cyan-900/20', text: 'text-cyan-600 dark:text-cyan-400', iconBg: 'bg-cyan-100 dark:bg-cyan-900/30' },
  slate: { bg: 'bg-slate-50 dark:bg-slate-800/50', text: 'text-slate-600 dark:text-slate-400', iconBg: 'bg-slate-100 dark:bg-slate-800' },
};

export const StatCard: React.FC<StatCardProps> = ({ label, value, icon: Icon, trend, color = 'blue', sublabel }) => {
  const c = colorMap[color];
  return (
    <div className={`${c.bg} border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300`}>
      <div className="flex items-start justify-between mb-4">
        <div className={`p-2.5 ${c.iconBg} rounded-xl`}>
          <Icon className={`w-5 h-5 ${c.text}`} />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${trend.up ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400' : 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400'}`}>
            {trend.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {trend.value}
          </div>
        )}
      </div>
      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-1">{label}</p>
      <p className="text-3xl font-bold text-slate-900 dark:text-slate-100">{value}</p>
      {sublabel && <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">{sublabel}</p>}
    </div>
  );
};

import { ClipboardList } from 'lucide-react';
export const StatCardSkeleton: React.FC = () => (
  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm animate-pulse">
    <div className="flex items-start justify-between mb-4">
      <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-slate-800" />
      <div className="w-16 h-4 rounded-full bg-slate-200 dark:bg-slate-800" />
    </div>
    <div className="w-20 h-3 rounded bg-slate-200 dark:bg-slate-800 mb-2" />
    <div className="w-16 h-8 rounded bg-slate-200 dark:bg-slate-800" />
  </div>
);
