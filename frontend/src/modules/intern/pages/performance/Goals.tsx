import React, { useState } from 'react';
import InternPageShell from '../../InternPageShell';
import { motion } from 'framer-motion';
import { Plus, Target, CheckCircle, Clock, AlertCircle, Edit2, Trash2, TrendingUp, BarChart3 } from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

interface Goal {
  id: number;
  name: string;
  category: string;
  targetDate: string;
  progress: number;
  status: string;
}

const initialGoals: Goal[] = [
  { id: 1, name: 'Complete React certification', category: 'Technical', targetDate: '2026-08-15', progress: 75, status: 'In Progress' },
  { id: 2, name: 'Improve communication skills', category: 'Behavioral', targetDate: '2026-08-30', progress: 40, status: 'In Progress' },
  { id: 3, name: 'Learn Docker basics', category: 'Learning', targetDate: '2026-07-31', progress: 100, status: 'Achieved' },
  { id: 4, name: 'Contribute to 5 PRs', category: 'Technical', targetDate: '2026-09-01', progress: 60, status: 'In Progress' },
  { id: 5, name: 'Attend team-building workshop', category: 'Behavioral', targetDate: '2026-07-20', progress: 0, status: 'Not Started' },
  { id: 6, name: 'Master TypeScript generics', category: 'Learning', targetDate: '2026-08-20', progress: 25, status: 'Not Started' },
];

const categoryColors: Record<string, string> = {
  Technical: 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400',
  Behavioral: 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400',
  Learning: 'bg-violet-100 text-violet-700 dark:bg-violet-500/10 dark:text-violet-400',
};

const statusColors: Record<string, string> = {
  Achieved: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400',
  'In Progress': 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400',
  'Not Started': 'bg-slate-100 text-slate-700 dark:bg-slate-500/10 dark:text-slate-400',
};

function ProgressBar({ value }: { value: number }) {
  const color = value === 100 ? 'bg-emerald-500' : value >= 50 ? 'bg-blue-500' : value >= 25 ? 'bg-amber-500' : 'bg-slate-400';
  return (
    <div className="flex items-center gap-3">
      <div className="w-full max-w-[120px] h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all duration-500 ${color}`} style={{ width: `${value}%` }} />
      </div>
      <span className="text-xs font-semibold text-slate-500 w-10 text-right">{value}%</span>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusColors[status] || 'bg-slate-100 text-slate-700'}`}>
      {status}
    </span>
  );
}

function CategoryBadge({ category }: { category: string }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${categoryColors[category] || ''}`}>
      {category}
    </span>
  );
}

export default function Goals() {
  const [goals, setGoals] = useState<Goal[]>(initialGoals);

  const totalGoals = goals.length;
  const achieved = goals.filter(g => g.status === 'Achieved').length;
  const inProgress = goals.filter(g => g.status === 'In Progress').length;
  const notStarted = goals.filter(g => g.status === 'Not Started').length;

  const kpis = [
    { label: 'Total Goals', value: totalGoals, icon: Target, color: 'text-blue-600 bg-blue-100 dark:bg-blue-500/10 dark:text-blue-400', trend: `${achieved} achieved` },
    { label: 'Achieved', value: achieved, icon: CheckCircle, color: 'text-emerald-600 bg-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400', trend: `${((achieved / totalGoals) * 100).toFixed(0)}% completion` },
    { label: 'In Progress', value: inProgress, icon: TrendingUp, color: 'text-amber-600 bg-amber-100 dark:bg-amber-500/10 dark:text-amber-400', trend: 'Active' },
    { label: 'Not Started', value: notStarted, icon: AlertCircle, color: 'text-slate-600 bg-slate-100 dark:bg-slate-500/10 dark:text-slate-400', trend: 'Pending action' },
  ];

  return (
    <InternPageShell title="Goals" description="Your internship goals and objectives"
      actions={
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-sm">
          <Plus className="w-4 h-4" /> Add Goal
        </button>
      }
    >
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map((kpi, i) => {
            const Icon = kpi.icon;
            return (
              <motion.div key={kpi.label} variants={item} className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl p-5 shadow-sm">
                <div className="flex items-start justify-between mb-3">
                  <div className={`p-2.5 rounded-lg ${kpi.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">{kpi.label}</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{kpi.value}</p>
                <p className="text-xs text-slate-400 mt-1">{kpi.trend}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div variants={item} className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">All Goals</h3>
            <BarChart3 className="w-4 h-4 text-slate-400" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/40">
                  <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Goal Name</th>
                  <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Category</th>
                  <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Target Date</th>
                  <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Progress</th>
                  <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                  <th className="text-right px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/40">
                {goals.map((goal, i) => (
                  <motion.tr key={goal.id} variants={item} className="hover:bg-slate-50 dark:hover:bg-slate-700/20 transition-colors">
                    <td className="px-5 py-4 font-medium text-slate-800 dark:text-slate-200">{goal.name}</td>
                    <td className="px-5 py-4"><CategoryBadge category={goal.category} /></td>
                    <td className="px-5 py-4 text-slate-500">{goal.targetDate}</td>
                    <td className="px-5 py-4"><ProgressBar value={goal.progress} /></td>
                    <td className="px-5 py-4"><StatusBadge status={goal.status} /></td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-blue-500 transition-colors">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-red-500 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </motion.div>
    </InternPageShell>
  );
}
