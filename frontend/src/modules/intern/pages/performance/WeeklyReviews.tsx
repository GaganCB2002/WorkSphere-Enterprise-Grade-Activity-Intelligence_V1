import React from 'react';
import InternPageShell from '../../InternPageShell';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Star, ClipboardList, Clock, TrendingUp } from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

interface WeeklyReview {
  week: number;
  period: string;
  tasksCompleted: number;
  rating: number;
  comments: string;
  mentorFeedback: string;
  status: string;
}

const weeklyReviews: WeeklyReview[] = [
  { week: 1, period: 'Jun 1 - Jun 7', tasksCompleted: 5, rating: 4.0, comments: 'Good start to the internship', mentorFeedback: 'Shows great potential', status: 'Completed' },
  { week: 2, period: 'Jun 8 - Jun 14', tasksCompleted: 7, rating: 4.5, comments: 'Strong performance', mentorFeedback: 'Excellent work on the project', status: 'Completed' },
  { week: 3, period: 'Jun 15 - Jun 21', tasksCompleted: 4, rating: 3.5, comments: 'Need improvement in time management', mentorFeedback: 'Focus on deadlines', status: 'Completed' },
  { week: 4, period: 'Jun 22 - Jun 28', tasksCompleted: 6, rating: 4.2, comments: 'Improved significantly', mentorFeedback: 'Good progress', status: 'Completed' },
  { week: 5, period: 'Jun 29 - Jul 5', tasksCompleted: 8, rating: 4.8, comments: 'Outstanding week', mentorFeedback: 'Exceeds expectations', status: 'Completed' },
  { week: 6, period: 'Jul 6 - Jul 12', tasksCompleted: 3, rating: 0, comments: '', mentorFeedback: '', status: 'Pending' },
];

const ratingData = weeklyReviews.filter(r => r.status === 'Completed').map(r => ({
  week: `Week ${r.week}`,
  rating: r.rating,
}));

const avgRating = (weeklyReviews.filter(r => r.rating > 0).reduce((a, b) => a + b.rating, 0) / weeklyReviews.filter(r => r.rating > 0).length).toFixed(1);
const totalReviews = weeklyReviews.filter(r => r.status === 'Completed').length;
const pendingReviews = weeklyReviews.filter(r => r.status === 'Pending').length;

const statusColors: Record<string, string> = {
  Completed: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400',
  Pending: 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400',
};

function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusColors[status] || ''}`}>
      {status}
    </span>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map(i => (
        <Star key={i} className={`w-3.5 h-3.5 ${i <= Math.round(rating) ? 'text-amber-400 fill-amber-400' : 'text-slate-300 dark:text-slate-600'}`} />
      ))}
      <span className="ml-1 text-xs font-semibold text-slate-500">{rating.toFixed(1)}</span>
    </div>
  );
}

export default function WeeklyReviews() {
  const kpis = [
    { label: 'Average Weekly Rating', value: avgRating, icon: Star, color: 'text-amber-600 bg-amber-100 dark:bg-amber-500/10 dark:text-amber-400', trend: 'Across all weeks' },
    { label: 'Total Reviews', value: totalReviews, icon: ClipboardList, color: 'text-blue-600 bg-blue-100 dark:bg-blue-500/10 dark:text-blue-400', trend: 'Completed' },
    { label: 'Pending Reviews', value: pendingReviews, icon: Clock, color: 'text-slate-600 bg-slate-100 dark:bg-slate-500/10 dark:text-slate-400', trend: 'Awaiting feedback' },
  ];

  return (
    <InternPageShell title="Weekly Reviews" description="Weekly performance reviews">
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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

        <motion.div variants={item} className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">Ratings Trend</h3>
            <TrendingUp className="w-4 h-4 text-slate-400" />
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={ratingData} margin={{ top: 5, right: 20, left: -15, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="week" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 5]} tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                labelStyle={{ fontWeight: 600, fontSize: 13 }}
              />
              <Line type="monotone" dataKey="rating" stroke="#3b82f6" strokeWidth={2.5} dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div variants={item} className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-700/60">
            <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">Review Details</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/40">
                  <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Week #</th>
                  <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Period</th>
                  <th className="text-center px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Tasks Completed</th>
                  <th className="text-center px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Rating</th>
                  <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Comments</th>
                  <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Mentor Feedback</th>
                  <th className="text-center px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/40">
                {weeklyReviews.map((r, i) => (
                  <motion.tr key={r.week} variants={item} className="hover:bg-slate-50 dark:hover:bg-slate-700/20 transition-colors">
                    <td className="px-5 py-4 font-semibold text-slate-800 dark:text-slate-200">Week {r.week}</td>
                    <td className="px-5 py-4 text-slate-500 text-xs">{r.period}</td>
                    <td className="px-5 py-4 text-center font-medium text-slate-700 dark:text-slate-300">{r.tasksCompleted}</td>
                    <td className="px-5 py-4 text-center">{r.rating > 0 ? <StarRating rating={r.rating} /> : <span className="text-xs text-slate-400">---</span>}</td>
                    <td className="px-5 py-4 text-slate-500 text-xs max-w-[160px] truncate">{r.comments || '---'}</td>
                    <td className="px-5 py-4 text-slate-500 text-xs max-w-[160px] truncate">{r.mentorFeedback || '---'}</td>
                    <td className="px-5 py-4 text-center"><StatusBadge status={r.status} /></td>
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
