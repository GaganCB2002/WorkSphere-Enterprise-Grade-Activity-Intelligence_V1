import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Star, MessageSquareText, CalendarDays, TrendingUp, BarChart3,
  ChevronDown, MoreHorizontal, Quote
} from 'lucide-react';
import InternPageShell from '../../InternPageShell';

interface FeedbackItem {
  id: string;
  date: string;
  rating: number;
  category: string;
  feedback: string;
  providedBy: string;
  status: 'Reviewed' | 'Pending' | 'Acknowledged';
}

const Feedback: React.FC = () => {
  const [feedbackData] = useState<FeedbackItem[]>([
    { id: 'FB001', date: '2026-07-18', rating: 4, category: 'Technical Skills', feedback: 'Great progress on the API integration. The code quality has improved significantly. Consider adding more unit tests for edge cases.', providedBy: 'Dr. Sarah Mitchell', status: 'Reviewed' },
    { id: 'FB002', date: '2026-07-11', rating: 5, category: 'Communication', feedback: 'Excellent presentation during the sprint review. Clear articulation of technical concepts. Well done!', providedBy: 'Dr. Sarah Mitchell', status: 'Reviewed' },
    { id: 'FB003', date: '2026-07-04', rating: 3, category: 'Problem Solving', feedback: 'Good analytical approach but need to improve on debugging efficiency. Try using breakpoints more strategically.', providedBy: 'Dr. Sarah Mitchell', status: 'Acknowledged' },
    { id: 'FB004', date: '2026-06-27', rating: 4, category: 'Team Collaboration', feedback: 'Actively participating in team discussions and helping peers. Great team player.', providedBy: 'Dr. Sarah Mitchell', status: 'Reviewed' },
    { id: 'FB005', date: '2026-06-20', rating: 5, category: 'Technical Skills', feedback: 'Outstanding work on the database optimization task. Reduced query time by 60%.', providedBy: 'Dr. Sarah Mitchell', status: 'Reviewed' },
    { id: 'FB006', date: '2026-06-13', rating: 2, category: 'Time Management', feedback: 'Missed two deadlines this week. Need to improve task estimation and prioritization.', providedBy: 'Dr. Sarah Mitchell', status: 'Pending' },
  ]);

  const averageRating = feedbackData.reduce((acc, f) => acc + f.rating, 0) / feedbackData.length;
  const lastFeedbackDate = feedbackData[0]?.date || 'N/A';

  const ratingDistribution = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: feedbackData.filter(f => f.rating === star).length,
    percentage: (feedbackData.filter(f => f.rating === star).length / feedbackData.length) * 100,
  }));

  const statusColors: Record<string, string> = {
    Reviewed: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300',
    Pending: 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300',
    Acknowledged: 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300',
  };

  const renderStars = (rating: number) => (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star key={star} className={`w-3.5 h-3.5 ${star <= rating ? 'text-amber-400 fill-amber-400' : 'text-slate-300 dark:text-slate-600'}`} />
      ))}
    </span>
  );

  return (
    <InternPageShell title="Mentor Feedback" description="Feedback from your mentor">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Average Rating', value: averageRating.toFixed(1), icon: Star, color: 'text-amber-600 bg-amber-100 dark:bg-amber-500/10', suffix: '/ 5.0' },
          { label: 'Total Feedback', value: feedbackData.length, icon: MessageSquareText, color: 'text-blue-600 bg-blue-100 dark:bg-blue-500/10' },
          { label: 'Last Feedback', value: lastFeedbackDate, icon: CalendarDays, color: 'text-purple-600 bg-purple-100 dark:bg-purple-500/10' },
          { label: 'Trend', value: '↑ Improving', icon: TrendingUp, color: 'text-emerald-600 bg-emerald-100 dark:bg-emerald-500/10' },
        ].map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-5"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{kpi.label}</p>
                <div className="flex items-baseline gap-1 mt-1">
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{kpi.value}</p>
                  {kpi.suffix && <span className="text-sm text-slate-400">{kpi.suffix}</span>}
                </div>
              </div>
              <div className={`p-3 rounded-lg ${kpi.color}`}>
                <kpi.icon className="w-5 h-5" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-1 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6"
        >
          <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-blue-500" />
            Rating Distribution
          </h3>
          <div className="space-y-3">
            {ratingDistribution.map((item) => (
              <div key={item.star}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5 text-sm">
                    {renderStars(item.star)}
                    <span className="text-xs text-slate-400 ml-1">({item.star})</span>
                  </div>
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-400">{item.count}</span>
                </div>
                <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.percentage}%` }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className={`h-full rounded-full ${
                      item.star >= 4 ? 'bg-emerald-500' : item.star >= 3 ? 'bg-amber-500' : 'bg-red-500'
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500">Average Rating</span>
              <span className="font-bold text-slate-900 dark:text-white">{averageRating.toFixed(1)} / 5.0</span>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
                <tr>
                  {['Date', 'Rating', 'Category', 'Feedback', 'Provided By', 'Status', 'Actions'].map((header) => (
                    <th key={header} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {feedbackData.map((item, i) => (
                  <motion.tr
                    key={item.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors"
                  >
                    <td className="px-4 py-3 text-slate-700 dark:text-slate-300 whitespace-nowrap">{item.date}</td>
                    <td className="px-4 py-3">{renderStars(item.rating)}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded text-xs font-medium">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 max-w-xs">
                      <p className="text-slate-600 dark:text-slate-400 truncate">{item.feedback}</p>
                    </td>
                    <td className="px-4 py-3 text-slate-700 dark:text-slate-300 whitespace-nowrap">{item.providedBy}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[item.status]}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                        <MoreHorizontal className="w-4 h-4 text-slate-400" />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </InternPageShell>
  );
};

export default Feedback;
