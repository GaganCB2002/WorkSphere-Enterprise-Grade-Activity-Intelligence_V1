import React from 'react';
import InternPageShell from '../InternPageShell';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import {
  BookOpen, CheckCircle, Calendar, Users, FolderOpen, Clock,
  ArrowUpRight, ArrowDownRight, ChevronRight, Plus, Eye, MessageSquare, FileText
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
  { label: 'Learning Progress', value: '72%', icon: BookOpen, trend: '+8%', trendUp: true, color: 'text-blue-600 bg-blue-100 dark:bg-blue-500/10 dark:text-blue-400' },
  { label: 'Tasks Completed', value: '18', icon: CheckCircle, trend: '+3', trendUp: true, color: 'text-emerald-600 bg-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400' },
  { label: 'Attendance', value: '97%', icon: Calendar, trend: '+2%', trendUp: true, color: 'text-violet-600 bg-violet-100 dark:bg-violet-500/10 dark:text-violet-400' },
  { label: 'Mentor Sessions', value: '3', icon: Users, trend: '1 this week', trendUp: false, color: 'text-amber-600 bg-amber-100 dark:bg-amber-500/10 dark:text-amber-400' },
  { label: 'Projects Active', value: '2', icon: FolderOpen, trend: 'On track', trendUp: true, color: 'text-rose-600 bg-rose-100 dark:bg-rose-500/10 dark:text-rose-400' },
  { label: 'Pending Reviews', value: '1', icon: Clock, trend: 'Due tomorrow', trendUp: false, color: 'text-sky-600 bg-sky-100 dark:bg-sky-500/10 dark:text-sky-400' },
];

const weeklyTasks = [
  { day: 'Mon', tasks: 3 }, { day: 'Tue', tasks: 5 }, { day: 'Wed', tasks: 2 }, { day: 'Thu', tasks: 4 },
  { day: 'Fri', tasks: 6 }, { day: 'Sat', tasks: 1 }, { day: 'Sun', tasks: 0 },
];

const schedule = [
  { time: '09:00 AM', title: 'Daily Standup', type: 'Meeting', icon: MessageSquare },
  { time: '11:00 AM', title: 'Code Review Session', type: 'Review', icon: Eye },
  { time: '02:00 PM', title: 'Mentor One-on-One', type: 'Mentorship', icon: Users },
  { time: '04:00 PM', title: 'Project Work - UI Dashboard', type: 'Focus', icon: FileText },
];

const recentActivity = [
  { activity: 'Submitted weekly report', module: 'Performance', status: 'Completed', time: '2h ago' },
  { activity: 'Completed React module quiz', module: 'Learning', status: 'Graded', time: '4h ago' },
  { activity: 'PR #142 reviewed by mentor', module: 'Tasks', status: 'Approved', time: '1d ago' },
  { activity: 'Attended UI/UX workshop', module: 'Learning', status: 'Attended', time: '1d ago' },
  { activity: 'Updated project timeline', module: 'Projects', status: 'Saved', time: '2d ago' },
];

const quickActions = [
  { label: 'Clock In', icon: Calendar, primary: true },
  { label: 'New Task', icon: Plus, primary: false },
  { label: 'View Projects', icon: FolderOpen, primary: false },
  { label: 'Messages', icon: MessageSquare, primary: false },
];

function KpiCard({ kpi, index }: { kpi: typeof kpis[0]; index: number }) {
  const Icon = kpi.icon;
  return (
    <motion.div variants={item} className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className={`p-2.5 rounded-lg ${kpi.color}`}>
          <Icon className="w-5 h-5" />
        </div>
        <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${kpi.trendUp ? 'text-emerald-700 bg-emerald-50 dark:bg-emerald-500/10 dark:text-emerald-400' : 'text-amber-700 bg-amber-50 dark:bg-amber-500/10 dark:text-amber-400'}`}>
          {kpi.trendUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {kpi.trend}
        </span>
      </div>
      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">{kpi.label}</p>
      <p className="text-2xl font-bold text-slate-900 dark:text-white">{kpi.value}</p>
    </motion.div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    Completed: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400',
    Graded: 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400',
    Approved: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400',
    Attended: 'bg-violet-100 text-violet-700 dark:bg-violet-500/10 dark:text-violet-400',
    Saved: 'bg-slate-100 text-slate-700 dark:bg-slate-500/10 dark:text-slate-400',
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${map[status] || 'bg-slate-100 text-slate-700 dark:bg-slate-500/10 dark:text-slate-400'}`}>
      {status}
    </span>
  );
}

export default function InternDashboardPage() {
  return (
    <InternPageShell title="Intern Dashboard" description="Your internship overview at a glance">
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">

        {/* KPI Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {kpis.map((kpi, i) => <KpiCard key={kpi.label} kpi={kpi} index={i} />)}
        </div>

        {/* Chart & Schedule */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div variants={item} className="lg:col-span-2 bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">Weekly Tasks Completed</h3>
              <span className="text-xs text-slate-400">Last 7 days</span>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={weeklyTasks} margin={{ top: 5, right: 10, left: -15, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                  labelStyle={{ fontWeight: 600, fontSize: 13 }}
                />
                <Bar dataKey="tasks" fill="#c2652a" radius={[4, 4, 0, 0]} barSize={36} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div variants={item} className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">Today's Schedule</h3>
              <button className="text-xs text-blue-600 hover:text-blue-700 font-semibold">View All</button>
            </div>
            <div className="space-y-3">
              {schedule.map((s, i) => {
                const Icon = s.icon;
                return (
                  <div key={i} className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/40 transition-colors cursor-pointer">
                    <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700/60 text-slate-500 dark:text-slate-300">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 truncate">{s.title}</p>
                      <p className="text-xs text-slate-400">{s.time} · {s.type}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-300 mt-1 flex-shrink-0" />
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Recent Activity & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div variants={item} className="lg:col-span-2 bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-700/60">
              <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">Recent Activity</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/40">
                    <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Activity</th>
                    <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Module</th>
                    <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                    <th className="text-right px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700/40">
                  {recentActivity.map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-700/20 transition-colors">
                      <td className="px-5 py-3.5 font-medium text-slate-800 dark:text-slate-200">{row.activity}</td>
                      <td className="px-5 py-3.5 text-slate-500">{row.module}</td>
                      <td className="px-5 py-3.5"><StatusBadge status={row.status} /></td>
                      <td className="px-5 py-3.5 text-right text-xs text-slate-400">{row.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          <motion.div variants={item} className="space-y-3">
            <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider px-1">Quick Actions</h3>
            {quickActions.map((a, i) => {
              const Icon = a.icon;
              return (
                <button
                  key={i}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-semibold transition-all ${
                    a.primary
                      ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700 shadow-sm'
                      : 'bg-white dark:bg-slate-800/60 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700/60 hover:bg-slate-50 dark:hover:bg-slate-700/40'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {a.label}
                </button>
              );
            })}
          </motion.div>
        </div>

      </motion.div>
    </InternPageShell>
  );
}
