import React, { useState } from 'react';
import InternPageShell from '../../InternPageShell';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CheckCircle, Clock, Calendar, PlayCircle, ClipboardCheck, BarChart3, TrendingUp } from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const assessments = [
  { id: 1, name: 'React Fundamentals Assessment', type: 'Technical', scheduledDate: '2026-08-10', duration: '60 min', score: 85, status: 'Completed' },
  { id: 2, name: 'Leadership Scenario Evaluation', type: 'Behavioral', scheduledDate: '2026-08-15', duration: '45 min', score: null, status: 'Scheduled' },
  { id: 3, name: 'Data Structures & Algorithms', type: 'Technical', scheduledDate: '2026-07-28', duration: '90 min', score: 72, status: 'Completed' },
  { id: 4, name: 'Communication Skills Assessment', type: 'Behavioral', scheduledDate: '2026-08-20', duration: '30 min', score: null, status: 'Pending' },
  { id: 5, name: 'System Design Interview Prep', type: 'Technical', scheduledDate: '2026-09-05', duration: '120 min', score: null, status: 'Pending' },
  { id: 6, name: 'Team Collaboration Evaluation', type: 'Behavioral', scheduledDate: '2026-08-12', duration: '45 min', score: null, status: 'Scheduled' },
  { id: 7, name: 'Python Programming Test', type: 'Technical', scheduledDate: '2026-07-20', duration: '60 min', score: 91, status: 'Completed' },
  { id: 8, name: 'Conflict Resolution Scenario', type: 'Behavioral', scheduledDate: '2026-08-25', duration: '30 min', score: null, status: 'Pending' },
];

const scoreDistribution = [
  { range: '0-20', count: 0 },
  { range: '21-40', count: 1 },
  { range: '41-60', count: 2 },
  { range: '61-80', count: 3 },
  { range: '81-100', count: 2 },
];

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    Completed: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400',
    Scheduled: 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400',
    Pending: 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400',
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

export default function Assessments() {
  const total = assessments.length;
  const completed = assessments.filter(a => a.status === 'Completed').length;
  const scheduled = assessments.filter(a => a.status === 'Scheduled').length;
  const pending = assessments.filter(a => a.status === 'Pending').length;

  return (
    <InternPageShell title="Assessments" description="Skills assessments and evaluations">
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Assessments', value: String(total), icon: ClipboardCheck, color: 'text-violet-600 bg-violet-100 dark:bg-violet-500/10 dark:text-violet-400' },
            { label: 'Completed', value: String(completed), icon: CheckCircle, color: 'text-emerald-600 bg-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400' },
            { label: 'Scheduled', value: String(scheduled), icon: Calendar, color: 'text-blue-600 bg-blue-100 dark:bg-blue-500/10 dark:text-blue-400' },
            { label: 'Pending', value: String(pending), icon: Clock, color: 'text-amber-600 bg-amber-100 dark:bg-amber-500/10 dark:text-amber-400' },
          ].map((kpi, i) => <KpiCard key={kpi.label} {...kpi} />)}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Assessments Table */}
          <motion.div variants={item} className="lg:col-span-2 bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-700/60">
              <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">Assessment List</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/40">
                    <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Assessment Name</th>
                    <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Type</th>
                    <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Scheduled Date</th>
                    <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Duration</th>
                    <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Score</th>
                    <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                    <th className="text-right px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700/40">
                  {assessments.map(a => (
                    <tr key={a.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/20 transition-colors">
                      <td className="px-5 py-3.5 font-medium text-slate-800 dark:text-slate-200">{a.name}</td>
                      <td className="px-5 py-3.5">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${
                          a.type === 'Technical' ? 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400' : 'bg-violet-100 text-violet-700 dark:bg-violet-500/10 dark:text-violet-400'
                        }`}>
                          {a.type}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-slate-500">{a.scheduledDate}</td>
                      <td className="px-5 py-3.5 text-slate-500">{a.duration}</td>
                      <td className="px-5 py-3.5">
                        {a.score !== null ? (
                          <span className={`font-semibold ${a.score >= 80 ? 'text-emerald-600 dark:text-emerald-400' : a.score >= 60 ? 'text-amber-600 dark:text-amber-400' : 'text-red-600 dark:text-red-400'}`}>
                            {a.score}%
                          </span>
                        ) : (
                          <span className="text-slate-300">—</span>
                        )}
                      </td>
                      <td className="px-5 py-3.5"><StatusBadge status={a.status} /></td>
                      <td className="px-5 py-3.5 text-right">
                        {a.status !== 'Completed' && (
                          <button className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 transition-colors flex items-center gap-1 ml-auto">
                            <PlayCircle className="w-3 h-3" /> Start
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Score Distribution Chart */}
          <motion.div variants={item} className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">Score Distribution</h3>
              <BarChart3 className="w-4 h-4 text-slate-400" />
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={scoreDistribution} margin={{ top: 5, right: 10, left: -15, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="range" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip
                  contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                  labelStyle={{ fontWeight: 600, fontSize: 13 }}
                />
                <Bar dataKey="count" fill="#c2652a" radius={[4, 4, 0, 0]} barSize={40} name="Assessments" />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1"><TrendingUp className="w-3.5 h-3.5 text-emerald-500" /> Avg Score: 82.7%</span>
              <span>Based on {completed} completed</span>
            </div>
          </motion.div>
        </div>

      </motion.div>
    </InternPageShell>
  );
}
