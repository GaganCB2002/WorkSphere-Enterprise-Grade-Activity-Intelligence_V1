import React from 'react';
import InternPageShell from '../../InternPageShell';
import { motion } from 'framer-motion';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import {
  Star, Target, ClipboardCheck, TrendingUp,
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
  { label: 'Overall Rating', value: '4.2', icon: Star, color: 'text-amber-600 bg-amber-100 dark:bg-amber-500/10 dark:text-amber-400' },
  { label: 'Goals Achieved', value: '12', icon: Target, color: 'text-emerald-600 bg-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400' },
  { label: 'Reviews Completed', value: '3', icon: ClipboardCheck, color: 'text-blue-600 bg-blue-100 dark:bg-blue-500/10 dark:text-blue-400' },
  { label: 'Avg Score', value: '85%', icon: TrendingUp, color: 'text-violet-600 bg-violet-100 dark:bg-violet-500/10 dark:text-violet-400' },
];

const skillsData = [
  { skill: 'Technical', value: 90, fullMark: 100 },
  { skill: 'Communication', value: 80, fullMark: 100 },
  { skill: 'Teamwork', value: 85, fullMark: 100 },
  { skill: 'Initiative', value: 75, fullMark: 100 },
  { skill: 'Learning', value: 95, fullMark: 100 },
];

const ratingTrend = [
  { month: 'Jan', rating: 3.5 }, { month: 'Feb', rating: 3.8 },
  { month: 'Mar', rating: 3.6 }, { month: 'Apr', rating: 4.0 },
  { month: 'May', rating: 4.2 }, { month: 'Jun', rating: 4.1 },
  { month: 'Jul', rating: 4.3 },
];

const reviews = [
  { period: 'Q1 2026', rating: 3.8, comments: 'Good progress on frontend tasks. Needs improvement in backend understanding.' },
  { period: 'Q2 2026', rating: 4.2, comments: 'Significant improvement in code quality. Taking initiative on complex tasks.' },
  { period: 'Mid-Year 2026', rating: 4.3, comments: 'Exceeding expectations. Strong contributor to the team.' },
];

function KpiCard({ kpi, index }: { kpi: typeof kpis[0]; index: number }) {
  const Icon = kpi.icon;
  return (
    <motion.div variants={item} className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className={`p-2.5 rounded-lg ${kpi.color}`}>
          <Icon className="w-5 h-5" />
        </div>
        <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full text-emerald-700 bg-emerald-50 dark:bg-emerald-500/10 dark:text-emerald-400">
          <ArrowUpRight className="w-3 h-3" />+{index === 0 ? '0.4' : index === 1 ? '3' : index === 2 ? '1' : '5%'}
        </span>
      </div>
      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">{kpi.label}</p>
      <p className="text-2xl font-bold text-slate-900 dark:text-white">{typeof kpi.value === 'number' ? kpi.value : kpi.value}</p>
    </motion.div>
  );
}

export default function PerformanceReport() {
  return (
    <InternPageShell
      title="Performance Report"
      description="Performance evaluation summary"
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

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Radar Chart */}
          <motion.div variants={item} className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl p-5 shadow-sm">
            <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider mb-4">Skills Assessment</h3>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={skillsData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="skill" tick={{ fontSize: 12, fill: '#94a3b8' }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <Radar name="Skills" dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.15} strokeWidth={2} />
                <Tooltip
                  contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Line Chart */}
          <motion.div variants={item} className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl p-5 shadow-sm">
            <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider mb-4">Rating Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={ratingTrend} margin={{ top: 5, right: 10, left: -15, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} domain={[0, 5]} />
                <Tooltip
                  contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                  labelStyle={{ fontWeight: 600, fontSize: 13 }}
                />
                <Line type="monotone" dataKey="rating" stroke="#8b5cf6" strokeWidth={3} dot={{ fill: '#8b5cf6', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Reviews Table */}
        <motion.div variants={item} className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/40">
                  <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Review Period</th>
                  <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Rating</th>
                  <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Comments</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/40">
                {reviews.map((row) => (
                  <tr key={row.period} className="hover:bg-slate-50 dark:hover:bg-slate-700/20 transition-colors">
                    <td className="px-5 py-3.5 font-semibold text-slate-800 dark:text-slate-200">{row.period}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1.5">
                        <span className="text-lg font-bold text-amber-500">{row.rating}</span>
                        <span className="text-xs text-slate-400">/ 5.0</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-slate-500 max-w-[400px]">{row.comments}</td>
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
