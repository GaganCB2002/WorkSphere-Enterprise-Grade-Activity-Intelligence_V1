import React, { useState, useMemo } from 'react';
import { Filter, Download, RefreshCw, Search, TrendingUp } from 'lucide-react';
import { EmployeePageLayout } from '../../components/EmployeePageLayout';
import { GlassPanel } from '../../components/ui/GlassPanel';

interface WorkWeek {
  week: string;
  totalHours: number;
  targetHours: number;
  overtime: number;
  productivity: number;
}

const weeks: WorkWeek[] = [
  { week: 'Jul 01 - Jul 05', totalHours: 41, targetHours: 40, overtime: 1, productivity: 92 },
  { week: 'Jun 24 - Jun 28', totalHours: 40, targetHours: 40, overtime: 0, productivity: 88 },
  { week: 'Jun 17 - Jun 21', totalHours: 44, targetHours: 40, overtime: 4, productivity: 95 },
  { week: 'Jun 10 - Jun 14', totalHours: 38, targetHours: 40, overtime: 0, productivity: 85 },
  { week: 'Jun 03 - Jun 07', totalHours: 42, targetHours: 40, overtime: 2, productivity: 90 },
  { week: 'May 27 - May 31', totalHours: 40, targetHours: 40, overtime: 0, productivity: 87 },
  { week: 'May 20 - May 24', totalHours: 45, targetHours: 40, overtime: 5, productivity: 93 },
  { week: 'May 13 - May 17', totalHours: 39, targetHours: 40, overtime: 0, productivity: 82 },
  { week: 'May 06 - May 10', totalHours: 41, targetHours: 40, overtime: 1, productivity: 89 },
  { week: 'Apr 29 - May 03', totalHours: 43, targetHours: 40, overtime: 3, productivity: 91 },
];

export default function WorkHours() {
  const [searchQuery, setSearchQuery] = useState('');

  const totalWorked = weeks.reduce((a, w) => a + w.totalHours, 0);
  const avgProductivity = Math.round(weeks.reduce((a, w) => a + w.productivity, 0) / weeks.length);

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return weeks.filter(w => w.week.toLowerCase().includes(q));
  }, [searchQuery]);

  return (
    <EmployeePageLayout
      title="Work Hours"
      description="Track your weekly working hours and productivity trends"
      breadcrumbs={['Employee', 'Attendance', 'Work Hours']}
      actions={
        <div className="flex items-center gap-2">
          {[{ icon: Filter }, { icon: Download }, { icon: RefreshCw }].map(({ icon: Icon }) => (
            <button key={Icon.name} className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition-colors">
              <Icon className="w-4 h-4" />
            </button>
          ))}
        </div>
      }
    >
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Hours (10 weeks)', value: `${totalWorked}h`, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-500/10' },
          { label: 'Avg Productivity', value: `${avgProductivity}%`, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-500/10' },
          { label: 'Total Overtime', value: `${weeks.reduce((a, w) => a + w.overtime, 0)}h`, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-500/10' },
        ].map(s => (
          <GlassPanel key={s.label} className={`${s.bg} p-4`}>
            <div className="flex items-center gap-3">
              <TrendingUp className={`w-5 h-5 ${s.color}`} />
              <div>
                <p className="text-xs text-slate-400">{s.label}</p>
                <p className={`text-lg font-bold ${s.color} mt-0.5`}>{s.value}</p>
              </div>
            </div>
          </GlassPanel>
        ))}
      </div>

      <GlassPanel className="p-4 flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/[0.04] rounded-xl flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400" />
          <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search weeks..." className="w-full text-xs bg-transparent text-slate-900 dark:text-white outline-none placeholder:text-slate-400" />
        </div>
      </GlassPanel>
      <GlassPanel padding="none">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 dark:border-white/[0.06]">
                {['Week', 'Total Hours', 'Target Hours', 'Overtime', 'Productivity'].map(h => (
                  <th key={h} className="text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider px-5 py-3.5">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(w => {
                const pct = Math.round((w.totalHours / w.targetHours) * 100);
                return (
                  <tr key={w.week} className="border-b border-slate-100 dark:border-white/[0.04] hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-5 py-3.5 text-sm font-semibold text-slate-900 dark:text-white">{w.week}</td>
                    <td className="px-5 py-3.5">
                      <span className="text-xs font-bold text-slate-900 dark:text-white">{w.totalHours}h</span>
                    </td>
                    <td className="px-5 py-3.5 text-xs text-slate-500 dark:text-slate-400">{w.targetHours}h</td>
                    <td className="px-5 py-3.5">
                      <span className={`text-xs font-bold ${w.overtime > 0 ? 'text-amber-600 dark:text-amber-400' : 'text-slate-400'}`}>{w.overtime > 0 ? `${w.overtime}h` : '-'}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 max-w-[120px]">
                          <div className={`h-full rounded-full ${w.productivity >= 90 ? 'bg-emerald-500' : w.productivity >= 85 ? 'bg-amber-400' : 'bg-rose-400'}`} style={{ width: `${w.productivity}%` }} />
                        </div>
                        <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">{w.productivity}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </GlassPanel>
    </EmployeePageLayout>
  );
}
