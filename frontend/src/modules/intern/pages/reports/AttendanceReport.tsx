import React from 'react';
import InternPageShell from '../../InternPageShell';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Calendar, CheckCircle, XCircle, Clock, Download, ArrowUpRight } from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const kpis = [
  { label: 'Present Days', value: '118', icon: CheckCircle, color: 'text-emerald-600 bg-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400' },
  { label: 'Absent Days', value: '4', icon: XCircle, color: 'text-rose-600 bg-rose-100 dark:bg-rose-500/10 dark:text-rose-400' },
  { label: 'Late Days', value: '6', icon: Clock, color: 'text-amber-600 bg-amber-100 dark:bg-amber-500/10 dark:text-amber-400' },
  { label: 'Attendance %', value: '96.7%', icon: Calendar, color: 'text-blue-600 bg-blue-100 dark:bg-blue-500/10 dark:text-blue-400' },
];

const monthlyData = [
  { month: 'Jan', working: 22, present: 21, absent: 0, late: 1, percent: 95.5 },
  { month: 'Feb', working: 20, present: 19, absent: 0, late: 1, percent: 95.0 },
  { month: 'Mar', working: 22, present: 21, absent: 1, late: 0, percent: 95.5 },
  { month: 'Apr', working: 21, present: 20, absent: 0, late: 1, percent: 95.2 },
  { month: 'May', working: 22, present: 22, absent: 0, late: 0, percent: 100.0 },
  { month: 'Jun', working: 22, present: 21, absent: 1, late: 0, percent: 95.5 },
  { month: 'Jul', working: 16, present: 16, absent: 0, late: 0, percent: 100.0 },
];

function KpiCard({ kpi, index }: { kpi: typeof kpis[0]; index: number }) {
  const Icon = kpi.icon;
  return (
    <motion.div variants={item} className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className={`p-2.5 rounded-lg ${kpi.color}`}>
          <Icon className="w-5 h-5" />
        </div>
        {index < 3 && (
          <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full text-emerald-700 bg-emerald-50 dark:bg-emerald-500/10 dark:text-emerald-400">
            <ArrowUpRight className="w-3 h-3" />+{index === 0 ? '5' : index === 1 ? '0' : '1'}
          </span>
        )}
      </div>
      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">{kpi.label}</p>
      <p className="text-2xl font-bold text-slate-900 dark:text-white">{kpi.value}</p>
    </motion.div>
  );
}

export default function AttendanceReport() {
  return (
    <InternPageShell
      title="Attendance Report"
      description="Attendance summary and analysis"
      actions={
        <button className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center gap-2 shadow-sm">
          <Download className="w-4 h-4" /> Export
        </button>
      }
    >
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">

        {/* KPI Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map((kpi, i) => <KpiCard key={kpi.label} kpi={kpi} index={i} />)}
        </div>

        {/* Bar Chart */}
        <motion.div variants={item} className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">Monthly Attendance (2026)</h3>
            <span className="text-xs text-slate-400">Present vs Absent</span>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={monthlyData} margin={{ top: 5, right: 10, left: -15, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                labelStyle={{ fontWeight: 600, fontSize: 13 }}
              />
              <Bar dataKey="present" fill="#22c55e" radius={[4, 4, 0, 0]} barSize={28} name="Present" />
              <Bar dataKey="absent" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={28} name="Absent" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* DataTable */}
        <motion.div variants={item} className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/40">
                  <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Month</th>
                  <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Working Days</th>
                  <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Present</th>
                  <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Absent</th>
                  <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Late</th>
                  <th className="text-right px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">%</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/40">
                {monthlyData.map((row) => (
                  <tr key={row.month} className="hover:bg-slate-50 dark:hover:bg-slate-700/20 transition-colors">
                    <td className="px-5 py-3.5 font-semibold text-slate-800 dark:text-slate-200">{row.month}</td>
                    <td className="px-5 py-3.5 text-slate-500">{row.working}</td>
                    <td className="px-5 py-3.5">
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{row.present}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={row.absent > 0 ? 'text-rose-600 dark:text-rose-400 font-semibold' : 'text-slate-500'}>{row.absent}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={row.late > 0 ? 'text-amber-600 dark:text-amber-400 font-semibold' : 'text-slate-500'}>{row.late}</span>
                    </td>
                    <td className="px-5 py-3.5 text-right font-semibold text-slate-800 dark:text-slate-200">{row.percent}%</td>
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
