import React from 'react';
import InternPageShell from '../../InternPageShell';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Clock, Award, Target, Brain, BarChart3 } from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const progressData = [
  { date: 'Jul 1', progress: 15 },
  { date: 'Jul 5', progress: 22 },
  { date: 'Jul 10', progress: 30 },
  { date: 'Jul 15', progress: 38 },
  { date: 'Jul 20', progress: 45 },
  { date: 'Jul 24', progress: 52 },
];

const coursesProgress = [
  { name: 'Enterprise Strategic Planning', completedModules: 4, totalModules: 8, progress: 50, timeSpent: '12h 30m', status: 'In Progress' },
  { name: 'Design Systems & Tokenization', completedModules: 1, totalModules: 5, progress: 20, timeSpent: '3h 15m', status: 'In Progress' },
  { name: 'Advanced React Patterns', completedModules: 6, totalModules: 6, progress: 100, timeSpent: '18h 0m', status: 'Completed' },
  { name: 'Data Science Fundamentals', completedModules: 5, totalModules: 8, progress: 63, timeSpent: '15h 45m', status: 'In Progress' },
  { name: 'Cloud Architecture on AWS', completedModules: 3, totalModules: 10, progress: 30, timeSpent: '8h 20m', status: 'In Progress' },
  { name: 'Agile Project Management', completedModules: 4, totalModules: 4, progress: 100, timeSpent: '10h 0m', status: 'Completed' },
];

function RadialProgress({ value, label, color }: { value: number; label: string; color: string }) {
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <svg width="150" height="150" viewBox="0 0 150 150" className="transform -rotate-90">
        <circle cx="75" cy="75" r={radius} fill="none" stroke="#e2e8f0" strokeWidth="10" className="dark:stroke-slate-700" />
        <circle cx="75" cy="75" r={radius} fill="none" stroke={color} strokeWidth="10" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" className="transition-all duration-1000" />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span className="text-3xl font-bold text-slate-900 dark:text-white">{value}%</span>
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">{label}</span>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    'In Progress': 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400',
    'Completed': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400',
    'Not Started': 'bg-slate-100 text-slate-700 dark:bg-slate-500/10 dark:text-slate-400',
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${map[status] || 'bg-slate-100 text-slate-700 dark:bg-slate-500/10 dark:text-slate-400'}`}>
      {status}
    </span>
  );
}

function KpiCard({ label, value, icon: Icon, color }: { label: string; value: string; icon: React.ElementType; color: string }) {
  return (
    <motion.div variants={item} className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className={`p-2.5 rounded-lg ${color}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">{label}</p>
      <p className="text-2xl font-bold text-slate-900 dark:text-white">{value}</p>
    </motion.div>
  );
}

export default function ProgressTracking() {
  const totalModulesCompleted = coursesProgress.reduce((s, c) => s + c.completedModules, 0);
  const totalModules = coursesProgress.reduce((s, c) => s + c.totalModules, 0);
  const overallProgress = Math.round((totalModulesCompleted / totalModules) * 100);
  const totalHours = 68;
  const certificatesEarned = coursesProgress.filter(c => c.status === 'Completed').length;

  return (
    <InternPageShell title="Progress Tracking" description="Monitor your learning progress">
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Overall Progress', value: `${overallProgress}%`, icon: Target, color: 'text-violet-600 bg-violet-100 dark:bg-violet-500/10 dark:text-violet-400' },
            { label: 'Hours Spent', value: `${totalHours}h`, icon: Clock, color: 'text-blue-600 bg-blue-100 dark:bg-blue-500/10 dark:text-blue-400' },
            { label: 'Modules Completed', value: String(totalModulesCompleted), icon: Brain, color: 'text-emerald-600 bg-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400' },
            { label: 'Certificates Earned', value: String(certificatesEarned), icon: Award, color: 'text-amber-600 bg-amber-100 dark:bg-amber-500/10 dark:text-amber-400' },
          ].map((kpi, i) => <KpiCard key={kpi.label} {...kpi} />)}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Radial Progress */}
          <motion.div variants={item} className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl p-6 shadow-sm flex flex-col items-center justify-center">
            <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider mb-6">Overall Learning Progress</h3>
            <div className="relative flex items-center justify-center">
              <RadialProgress value={overallProgress} label="Complete" color="#c2652a" />
            </div>
            <div className="mt-6 grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-lg font-bold text-slate-900 dark:text-white">{totalModulesCompleted}</p>
                <p className="text-xs text-slate-500">Done</p>
              </div>
              <div>
                <p className="text-lg font-bold text-slate-900 dark:text-white">{totalModules - totalModulesCompleted}</p>
                <p className="text-xs text-slate-500">Remaining</p>
              </div>
              <div>
                <p className="text-lg font-bold text-slate-900 dark:text-white">{totalModules}</p>
                <p className="text-xs text-slate-500">Total</p>
              </div>
            </div>
          </motion.div>

          {/* Progress Over Time Chart */}
          <motion.div variants={item} className="lg:col-span-2 bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">Progress Over Time</h3>
              <BarChart3 className="w-4 h-4 text-slate-400" />
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={progressData} margin={{ top: 5, right: 10, left: -15, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                  labelStyle={{ fontWeight: 600, fontSize: 13 }}
                  formatter={(value: number) => [`${value}%`, 'Progress']}
                />
                <Line type="monotone" dataKey="progress" stroke="#c2652a" strokeWidth={2.5} dot={{ fill: '#c2652a', strokeWidth: 2, r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Progress Table */}
        <motion.div variants={item} className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-700/60">
            <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">Course & Path Progress</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/40">
                  <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Course / Path</th>
                  <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Modules Completed</th>
                  <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Total Modules</th>
                  <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Progress</th>
                  <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Time Spent</th>
                  <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/40">
                {coursesProgress.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-700/20 transition-colors">
                    <td className="px-5 py-3.5 font-medium text-slate-800 dark:text-slate-200">{row.name}</td>
                    <td className="px-5 py-3.5 text-slate-500">{row.completedModules}</td>
                    <td className="px-5 py-3.5 text-slate-500">{row.totalModules}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-700/60 rounded-full overflow-hidden max-w-[120px]">
                          <div
                            className="h-full bg-gradient-to-r from-blue-500 to-violet-500 rounded-full"
                            style={{ width: `${row.progress}%` }}
                          />
                        </div>
                        <span className="text-xs font-semibold text-slate-500 w-9 text-right">{row.progress}%</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-slate-500">{row.timeSpent}</td>
                    <td className="px-5 py-3.5"><StatusBadge status={row.status} /></td>
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
