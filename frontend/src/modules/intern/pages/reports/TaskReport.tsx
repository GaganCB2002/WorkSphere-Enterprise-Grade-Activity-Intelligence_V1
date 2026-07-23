import React from 'react';
import InternPageShell from '../../InternPageShell';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import {
  ClipboardList, CheckCircle, Clock, AlertTriangle,
  Download, ArrowUpRight
} from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const kpis = [
  { label: 'Total Tasks', value: '48', icon: ClipboardList, color: 'text-blue-600 bg-blue-100 dark:bg-blue-500/10 dark:text-blue-400' },
  { label: 'Completed', value: '36', icon: CheckCircle, color: 'text-emerald-600 bg-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400' },
  { label: 'Pending', value: '8', icon: Clock, color: 'text-amber-600 bg-amber-100 dark:bg-amber-500/10 dark:text-amber-400' },
  { label: 'Overdue', value: '4', icon: AlertTriangle, color: 'text-rose-600 bg-rose-100 dark:bg-rose-500/10 dark:text-rose-400' },
];

const statusChart = [
  { name: 'Completed', value: 36, fill: '#22c55e' },
  { name: 'Pending', value: 8, fill: '#f59e0b' },
  { name: 'Overdue', value: 4, fill: '#ef4444' },
];

const monthlyData = [
  { month: 'Jan', assigned: 5, completed: 4, pending: 1, completion: 80 },
  { month: 'Feb', assigned: 6, completed: 5, pending: 1, completion: 83 },
  { month: 'Mar', assigned: 7, completed: 6, pending: 1, completion: 86 },
  { month: 'Apr', assigned: 5, completed: 4, pending: 1, completion: 80 },
  { month: 'May', assigned: 8, completed: 7, pending: 1, completion: 88 },
  { month: 'Jun', assigned: 7, completed: 6, pending: 1, completion: 86 },
  { month: 'Jul', assigned: 10, completed: 4, pending: 6, completion: 40 },
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
            <ArrowUpRight className="w-3 h-3" />+{index === 0 ? '8' : index === 1 ? '5' : '2'}
          </span>
        )}
      </div>
      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">{kpi.label}</p>
      <p className="text-2xl font-bold text-slate-900 dark:text-white">{kpi.value}</p>
    </motion.div>
  );
}

export default function TaskReport() {
  return (
    <InternPageShell
      title="Task Report"
      description="Task completion summary"
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

        {/* Bar Chart - Tasks by Status */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div variants={item} className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl p-5 shadow-sm">
            <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider mb-4">Tasks by Status</h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={statusChart} margin={{ top: 5, right: 10, left: -15, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                  labelStyle={{ fontWeight: 600, fontSize: 13 }}
                />
                <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={60}>
                  {statusChart.map((entry, i) => (
                    <rect key={i} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Monthly DataTable */}
          <motion.div variants={item} className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-700/60">
              <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">Monthly Breakdown</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/40">
                    <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Month</th>
                    <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Assigned</th>
                    <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Completed</th>
                    <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Pending</th>
                    <th className="text-right px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">% Completion</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700/40">
                  {monthlyData.map((row) => (
                    <tr key={row.month} className="hover:bg-slate-50 dark:hover:bg-slate-700/20 transition-colors">
                      <td className="px-5 py-3.5 font-semibold text-slate-800 dark:text-slate-200">{row.month}</td>
                      <td className="px-5 py-3.5 text-slate-500">{row.assigned}</td>
                      <td className="px-5 py-3.5 text-emerald-600 dark:text-emerald-400 font-semibold">{row.completed}</td>
                      <td className="px-5 py-3.5 text-slate-500">{row.pending}</td>
                      <td className="px-5 py-3.5 text-right font-semibold text-slate-800 dark:text-slate-200">{row.completion}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>

      </motion.div>
    </InternPageShell>
  );
}
