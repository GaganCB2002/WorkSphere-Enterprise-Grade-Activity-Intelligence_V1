import React from 'react';
import InternPageShell from '../../InternPageShell';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Umbrella, Stethoscope, Briefcase, XCircle, TrendingUp } from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const leaveTypes = [
  { type: 'Casual Leave', used: 8, total: 12, icon: Umbrella, color: 'text-blue-600 bg-blue-100 dark:bg-blue-500/10 dark:text-blue-400', barColor: '#3b82f6' },
  { type: 'Sick Leave', used: 5, total: 6, icon: Stethoscope, color: 'text-emerald-600 bg-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400', barColor: '#10b981' },
  { type: 'Earned Leave', used: 4, total: 15, icon: Briefcase, color: 'text-violet-600 bg-violet-100 dark:bg-violet-500/10 dark:text-violet-400', barColor: '#8b5cf6' },
  { type: 'Unpaid Leave', used: 0, total: 0, icon: XCircle, color: 'text-amber-600 bg-amber-100 dark:bg-amber-500/10 dark:text-amber-400', barColor: '#f59e0b' },
];

const utilizationData = [
  { name: 'Casual', used: 8, remaining: 4 },
  { name: 'Sick', used: 5, remaining: 1 },
  { name: 'Earned', used: 4, remaining: 11 },
  { name: 'Unpaid', used: 0, remaining: 0 },
];

function KpiCard({ item: lt, index }: { item: typeof leaveTypes[0]; index: number }) {
  const Icon = lt.icon;
  const remaining = lt.total - lt.used;
  const percentage = lt.total > 0 ? Math.round((lt.used / lt.total) * 100) : 0;

  return (
    <motion.div variants={item} className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className={`p-2.5 rounded-lg ${lt.color}`}>
          <Icon className="w-5 h-5" />
        </div>
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
          remaining > 0 ? 'text-emerald-700 bg-emerald-50 dark:bg-emerald-500/10 dark:text-emerald-400' : 'text-red-700 bg-red-50 dark:bg-red-500/10 dark:text-red-400'
        }`}>
          {percentage}% used
        </span>
      </div>
      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">{lt.type}</p>
      <p className="text-2xl font-bold text-slate-900 dark:text-white">{remaining}/{lt.total}</p>
      <p className="text-xs text-slate-400 mt-1">{remaining > 0 ? `${remaining} days remaining` : 'No balance left'}</p>
      <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full mt-3 overflow-hidden">
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${percentage}%`, backgroundColor: lt.barColor }}
        />
      </div>
    </motion.div>
  );
}

export default function LeaveBalancePage() {
  return (
    <InternPageShell title="Leave Balance" description="Your available leave balances">
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {leaveTypes.map((lt, i) => <KpiCard key={lt.type} item={lt} index={i} />)}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div variants={item} className="lg:col-span-2 bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">Leave Utilization</h3>
              <span className="text-xs text-slate-400">Current year</span>
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={utilizationData} margin={{ top: 5, right: 10, left: -15, bottom: 0 }} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }} labelStyle={{ fontWeight: 600, fontSize: 13 }} />
                <Bar dataKey="used" fill="#c2652a" radius={[4, 4, 0, 0]} barSize={32} name="Used" />
                <Bar dataKey="remaining" fill="#94a3b8" radius={[4, 4, 0, 0]} barSize={32} name="Remaining" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div variants={item} className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-700/60">
              <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">Balance Details</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/40">
                    <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Leave Type</th>
                    <th className="text-center px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Total</th>
                    <th className="text-center px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Used</th>
                    <th className="text-center px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Remaining</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700/40">
                  {leaveTypes.map((lt, i) => (
                    <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-700/20 transition-colors">
                      <td className="px-5 py-3.5 font-medium text-slate-800 dark:text-slate-200">{lt.type}</td>
                      <td className="px-5 py-3.5 text-center text-slate-500">{lt.total}</td>
                      <td className="px-5 py-3.5 text-center text-slate-500">{lt.used}</td>
                      <td className="px-5 py-3.5 text-center font-semibold text-slate-700 dark:text-slate-200">{lt.total - lt.used}</td>
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
