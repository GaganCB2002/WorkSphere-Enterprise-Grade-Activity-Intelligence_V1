import React from 'react';
import InternPageShell from '../../InternPageShell';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Clock, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const dailyHours = [
  { day: 'Mon', hours: 8.5 }, { day: 'Tue', hours: 7.8 }, { day: 'Wed', hours: 8.2 },
  { day: 'Thu', hours: 8.0 }, { day: 'Fri', hours: 7.5 }, { day: 'Sat', hours: 4.0 }, { day: 'Sun', hours: 0 },
];

const KPIs = [
  { label: 'Total Hours', value: '168h', icon: Clock, sub: 'This month', color: 'text-blue-600 bg-blue-100 dark:bg-blue-500/10 dark:text-blue-400' },
  { label: 'Avg Hours/Day', value: '7.6h', icon: TrendingUp, sub: 'vs 8h target', color: 'text-emerald-600 bg-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400' },
  { label: 'Overtime', value: '12h', icon: TrendingUp, sub: '+4h last month', color: 'text-amber-600 bg-amber-100 dark:bg-amber-500/10 dark:text-amber-400' },
  { label: 'Shortfall', value: '4h', icon: TrendingDown, sub: 'Needs attention', color: 'text-red-600 bg-red-100 dark:bg-red-500/10 dark:text-red-400' },
];

const weeklyTable = [
  { week: 'Week 1 (Jul 1-7)', planned: 40, actual: 42, overtime: 2, status: 'Over' },
  { week: 'Week 2 (Jul 8-14)', planned: 40, actual: 38, overtime: 0, status: 'Under' },
  { week: 'Week 3 (Jul 15-21)', planned: 40, actual: 44, overtime: 4, status: 'Over' },
  { week: 'Week 4 (Jul 22-28)', planned: 40, actual: 44, overtime: 4, status: 'Over' },
  { week: 'Week 5 (Jul 29-31)', planned: 24, actual: 24, overtime: 0, status: 'On Track' },
];

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    Over: 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400',
    Under: 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400',
    'On Track': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400',
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${map[status] || 'bg-slate-100 text-slate-700 dark:bg-slate-500/10 dark:text-slate-400'}`}>
      {status}
    </span>
  );
}

function KpiCard({ kpi, index }: { kpi: typeof KPIs[0]; index: number }) {
  const Icon = kpi.icon;
  return (
    <motion.div variants={item} className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className={`p-2.5 rounded-lg ${kpi.color}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">{kpi.label}</p>
      <p className="text-2xl font-bold text-slate-900 dark:text-white">{kpi.value}</p>
      <p className="text-xs text-slate-400 mt-1">{kpi.sub}</p>
    </motion.div>
  );
}

export default function WorkHoursPage() {
  return (
    <InternPageShell title="Work Hours" description="Track your working hours">
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {KPIs.map((kpi, i) => <KpiCard key={kpi.label} kpi={kpi} index={i} />)}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div variants={item} className="lg:col-span-2 bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">Daily Hours</h3>
              <span className="text-xs text-slate-400">This week</span>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={dailyHours} margin={{ top: 5, right: 10, left: -15, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }} labelStyle={{ fontWeight: 600, fontSize: 13 }} />
                <Bar dataKey="hours" fill="#8b5cf6" radius={[4, 4, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div variants={item} className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl p-5 shadow-sm">
            <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider mb-4">Quick Summary</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-emerald-50 dark:bg-emerald-500/5 rounded-lg">
                <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-500/10">
                  <Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-semibold">This Week</p>
                  <p className="text-lg font-bold text-slate-900 dark:text-white">36.5h / 40h</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-amber-50 dark:bg-amber-500/5 rounded-lg">
                <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-500/10">
                  <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-semibold">Remaining Today</p>
                  <p className="text-lg font-bold text-slate-900 dark:text-white">3.5h</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div variants={item} className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-700/60">
            <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">Weekly Breakdown</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/40">
                  <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Week</th>
                  <th className="text-center px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Planned</th>
                  <th className="text-center px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Actual</th>
                  <th className="text-center px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Overtime</th>
                  <th className="text-right px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/40">
                {weeklyTable.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-700/20 transition-colors">
                    <td className="px-5 py-3.5 font-medium text-slate-800 dark:text-slate-200">{row.week}</td>
                    <td className="px-5 py-3.5 text-center text-slate-500">{row.planned}h</td>
                    <td className="px-5 py-3.5 text-center text-slate-500">{row.actual}h</td>
                    <td className="px-5 py-3.5 text-center font-semibold text-slate-700 dark:text-slate-200">{row.overtime > 0 ? `+${row.overtime}h` : '–'}</td>
                    <td className="px-5 py-3.5 text-right"><StatusBadge status={row.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </motion.div>
    </InternPageShell>
  );
}
