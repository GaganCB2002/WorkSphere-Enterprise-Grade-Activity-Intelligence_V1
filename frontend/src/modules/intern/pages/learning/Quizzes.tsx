import React from 'react';
import InternPageShell from '../../InternPageShell';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CheckCircle, Clock, PlayCircle, Brain, BarChart3, Target, Zap, TrendingUp } from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const quizzes = [
  { id: 1, name: 'React Hooks Deep Dive', course: 'Advanced React Patterns', questions: 15, duration: '20 min', bestScore: 93, attempts: 2, status: 'Passed' },
  { id: 2, name: 'JavaScript ES6+ Features', course: 'JavaScript Fundamentals', questions: 20, duration: '25 min', bestScore: 87, attempts: 1, status: 'Passed' },
  { id: 3, name: 'Data Structures Review', course: 'Data Structures & Algorithms', questions: 12, duration: '15 min', bestScore: 0, attempts: 0, status: 'Not Taken' },
  { id: 4, name: 'Python Syntax & Basics', course: 'Machine Learning with Python', questions: 18, duration: '20 min', bestScore: 78, attempts: 3, status: 'Passed' },
  { id: 5, name: 'SQL Query Optimization', course: 'Data Engineering Pipeline', questions: 10, duration: '15 min', bestScore: 0, attempts: 0, status: 'Not Taken' },
  { id: 6, name: 'Cloud Service Models', course: 'Cloud Architecture on AWS', questions: 25, duration: '30 min', bestScore: 65, attempts: 1, status: 'Failed' },
  { id: 7, name: 'Agile Principles Quiz', course: 'Agile Project Management', questions: 14, duration: '15 min', bestScore: 100, attempts: 2, status: 'Passed' },
  { id: 8, name: 'Cybersecurity Threats', course: 'Cybersecurity Essentials', questions: 20, duration: '25 min', bestScore: 0, attempts: 0, status: 'Not Taken' },
];

const recentScores = [
  { date: 'Jul 14', score: 72 },
  { date: 'Jul 16', score: 85 },
  { date: 'Jul 18', score: 78 },
  { date: 'Jul 20', score: 91 },
  { date: 'Jul 22', score: 93 },
  { date: 'Jul 24', score: 87 },
];

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    Passed: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400',
    Failed: 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400',
    'Not Taken': 'bg-slate-100 text-slate-700 dark:bg-slate-500/10 dark:text-slate-400',
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${map[status] || ''}`}>
      {status === 'Passed' && <CheckCircle className="w-3 h-3 mr-1" />}
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

export default function Quizzes() {
  const totalQuizzes = quizzes.length;
  const passed = quizzes.filter(q => q.status === 'Passed').length;
  const failed = quizzes.filter(q => q.status === 'Failed').length;
  const notTaken = quizzes.filter(q => q.status === 'Not Taken').length;
  const avgBestScore = Math.round(quizzes.filter(q => q.bestScore > 0).reduce((s, q) => s + q.bestScore, 0) / quizzes.filter(q => q.bestScore > 0).length);

  return (
    <InternPageShell title="Quizzes" description="Knowledge checks and quick tests">
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { label: 'Total Quizzes', value: String(totalQuizzes), icon: Brain, color: 'text-violet-600 bg-violet-100 dark:bg-violet-500/10 dark:text-violet-400' },
            { label: 'Passed', value: String(passed), icon: CheckCircle, color: 'text-emerald-600 bg-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400' },
            { label: 'Failed', value: String(failed), icon: BarChart3, color: 'text-red-600 bg-red-100 dark:bg-red-500/10 dark:text-red-400' },
            { label: 'Not Taken', value: String(notTaken), icon: Clock, color: 'text-slate-600 bg-slate-100 dark:bg-slate-500/10 dark:text-slate-400' },
            { label: 'Avg Best Score', value: `${avgBestScore}%`, icon: Target, color: 'text-amber-600 bg-amber-100 dark:bg-amber-500/10 dark:text-amber-400' },
          ].map((kpi, i) => <KpiCard key={kpi.label} {...kpi} />)}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quizzes Table */}
          <motion.div variants={item} className="lg:col-span-2 bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-700/60">
              <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">Quiz List</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/40">
                    <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Quiz Name</th>
                    <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Course</th>
                    <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Questions</th>
                    <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Duration</th>
                    <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Best Score</th>
                    <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Attempts</th>
                    <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                    <th className="text-right px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700/40">
                  {quizzes.map(q => (
                    <tr key={q.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/20 transition-colors">
                      <td className="px-5 py-3.5 font-medium text-slate-800 dark:text-slate-200">{q.name}</td>
                      <td className="px-5 py-3.5 text-slate-500">{q.course}</td>
                      <td className="px-5 py-3.5 text-slate-500">{q.questions}</td>
                      <td className="px-5 py-3.5 text-slate-500">{q.duration}</td>
                      <td className="px-5 py-3.5">
                        {q.bestScore > 0 ? (
                          <span className={`font-semibold ${q.bestScore >= 80 ? 'text-emerald-600 dark:text-emerald-400' : q.bestScore >= 60 ? 'text-amber-600 dark:text-amber-400' : 'text-red-600 dark:text-red-400'}`}>
                            {q.bestScore}%
                          </span>
                        ) : (
                          <span className="text-slate-300">—</span>
                        )}
                      </td>
                      <td className="px-5 py-3.5 text-slate-500">{q.attempts}</td>
                      <td className="px-5 py-3.5"><StatusBadge status={q.status} /></td>
                      <td className="px-5 py-3.5 text-right">
                        {q.status === 'Not Taken' ? (
                          <button className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 transition-colors flex items-center gap-1 ml-auto">
                            <PlayCircle className="w-3 h-3" /> Take Quiz
                          </button>
                        ) : (
                          <button className="px-3 py-1.5 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors flex items-center gap-1 ml-auto">
                            <Zap className="w-3 h-3" /> Retake
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Score Trend Chart */}
          <motion.div variants={item} className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">Recent Scores</h3>
              <BarChart3 className="w-4 h-4 text-slate-400" />
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={recentScores} margin={{ top: 5, right: 10, left: -15, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                  labelStyle={{ fontWeight: 600, fontSize: 13 }}
                  formatter={(value: number) => [`${value}%`, 'Score']}
                />
                <Line type="monotone" dataKey="score" stroke="#c2652a" strokeWidth={2.5} dot={{ fill: '#c2652a', strokeWidth: 2, r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1"><TrendingUp className="w-3.5 h-3.5 text-emerald-500" /> Trend: +3.2%</span>
              <span>Last 7 quizzes</span>
            </div>
          </motion.div>
        </div>

      </motion.div>
    </InternPageShell>
  );
}
