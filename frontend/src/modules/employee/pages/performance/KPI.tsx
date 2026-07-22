import React, { useState, useMemo } from 'react';
import { EmployeePageLayout } from '../../components/EmployeePageLayout';
import { GlassPanel } from '../../components/ui/GlassPanel';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { TrendingUp, TrendingDown, Minus, Activity, Filter, Download, RefreshCw, Search } from 'lucide-react';

const kpis = [
  { metric: 'Code Coverage', target: '90%', actual: '87%', achievement: 96.7, trend: 'Up', period: 'Q1 2026' },
  { metric: 'Sprint Velocity', target: '45 SP', actual: '42 SP', achievement: 93.3, trend: 'Up', period: 'Q1 2026' },
  { metric: 'Bug Resolution Time', target: '24h', actual: '28h', achievement: 85.7, trend: 'Down', period: 'Q1 2026' },
  { metric: 'Customer Satisfaction', target: '4.5', actual: '4.3', achievement: 95.6, trend: 'Stable', period: 'Q1 2026' },
  { metric: 'On-Time Delivery', target: '95%', actual: '92%', achievement: 96.8, trend: 'Up', period: 'Q1 2026' },
  { metric: 'Code Review Turnaround', target: '12h', actual: '10h', achievement: 100, trend: 'Up', period: 'Q1 2026' },
  { metric: 'Production Incidents', target: '0', actual: '2', achievement: 0, trend: 'Down', period: 'Q1 2026' },
  { metric: 'Documentation Coverage', target: '85%', actual: '78%', achievement: 91.8, trend: 'Up', period: 'Q4 2025' },
  { metric: 'Team Availability', target: '95%', actual: '97%', achievement: 100, trend: 'Stable', period: 'Q4 2025' },
  { metric: 'Training Completion', target: '100%', actual: '80%', achievement: 80, trend: 'Down', period: 'Q4 2025' },
];

const trendIcon = (t: string) => t === 'Up' ? <TrendingUp className="w-3.5 h-3.5 text-emerald-500" /> : t === 'Down' ? <TrendingDown className="w-3.5 h-3.5 text-rose-500" /> : <Minus className="w-3.5 h-3.5 text-slate-400" />;

export default function KPI() {
  const [searchQuery, setSearchQuery] = useState('');
  const filtered = useMemo(() => kpis.filter(k =>
    k.metric.toLowerCase().includes(searchQuery.toLowerCase()) ||
    k.period.toLowerCase().includes(searchQuery.toLowerCase()) ||
    k.trend.toLowerCase().includes(searchQuery.toLowerCase())
  ), [searchQuery]);

  return (
    <EmployeePageLayout
      title="KPIs"
      description="Key performance indicators and metrics"
      breadcrumbs={[{ label: 'Employee', href: '/employee/dashboard' }, { label: 'Performance' }, { label: 'KPIs' }]}
      searchPlaceholder="Search KPIs..."
      onSearch={setSearchQuery}
      actions={
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition-colors"><Filter className="w-4 h-4" /></button>
          <button className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition-colors"><Download className="w-4 h-4" /></button>
          <button className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition-colors"><RefreshCw className="w-4 h-4" /></button>
        </div>
      }
    >
      <GlassPanel className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200/60 dark:border-white/[0.04] bg-slate-50/50 dark:bg-slate-800/20">
                <th className="text-left px-4 py-3 font-semibold text-slate-400 uppercase tracking-wider">Metric</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-400 uppercase tracking-wider">Target</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-400 uppercase tracking-wider">Actual</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-400 uppercase tracking-wider">Achievement</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-400 uppercase tracking-wider">Trend</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-400 uppercase tracking-wider">Period</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((k, i) => (
                <tr key={i} className="border-b border-slate-100 dark:border-white/[0.02] hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors">
                  <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">{k.metric}</td>
                  <td className="px-4 py-3 text-slate-500 dark:text-slate-400">{k.target}</td>
                  <td className="px-4 py-3 text-slate-700 dark:text-slate-300">{k.actual}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-16 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                        <div className={`h-full rounded-full ${k.achievement >= 90 ? 'bg-emerald-500' : k.achievement >= 75 ? 'bg-amber-500' : 'bg-rose-500'}`} style={{ width: `${Math.min(k.achievement, 100)}%` }} />
                      </div>
                      <span className="text-slate-500">{k.achievement}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">{trendIcon(k.trend)}</td>
                  <td className="px-4 py-3 text-slate-400">{k.period}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
            <p className="text-sm text-slate-400">No KPIs match your search</p>
          </div>
        )}
      </GlassPanel>
    </EmployeePageLayout>
  );
}
