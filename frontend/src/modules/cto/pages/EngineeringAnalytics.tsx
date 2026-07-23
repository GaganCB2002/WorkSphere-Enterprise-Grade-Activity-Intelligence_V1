import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp, Users, Code, GitPullRequest, Star, Activity, BarChart3, BookOpen } from 'lucide-react';
import CtoPageShell from '../CtoPageShell';
import DataTable, { StatusBadge } from '../../../components/common/DataTable/DataTable';

const kpiData = [
  { label: 'Developer Productivity', value: '87.3%', sub: '+3.2% MoM', icon: TrendingUp, color: 'text-emerald-500' },
  { label: 'Active Contributors', value: '86', sub: '60.6% of total team', icon: Users, color: 'text-blue-500' },
  { label: 'Code Volume (MTD)', value: '124K', sub: 'Lines of code changed', icon: Code, color: 'text-indigo-500' },
  { label: 'Review Participation', value: '94%', sub: 'PRs with 2+ reviewers', icon: BookOpen, color: 'text-violet-500' },
];

const productivityTrend = [
  { month: 'Oct', productivity: 82, commits: 1200, reviews: 180 },
  { month: 'Nov', productivity: 84, commits: 1350, reviews: 195 },
  { month: 'Dec', productivity: 79, commits: 980, reviews: 160 },
  { month: 'Jan', productivity: 85, commits: 1420, reviews: 210 },
  { month: 'Feb', productivity: 86, commits: 1380, reviews: 205 },
  { month: 'Mar', productivity: 87.3, commits: 1520, reviews: 225 },
];

const departmentComparison = [
  { dept: 'Platform', engineers: 32, productivity: 89, reviews: 42 },
  { dept: 'Frontend', engineers: 28, productivity: 86, reviews: 38 },
  { dept: 'Backend', engineers: 35, productivity: 91, reviews: 45 },
  { dept: 'Mobile', engineers: 18, productivity: 84, reviews: 22 },
  { dept: 'Data', engineers: 15, productivity: 82, reviews: 18 },
  { dept: 'DevOps', engineers: 14, productivity: 88, reviews: 20 },
];

const repos = [
  { name: 'core-api', stars: 1240, forks: 380, prs: 42, issues: 18, contributors: 32, lastCommit: '2h ago' },
  { name: 'frontend-web', stars: 890, forks: 245, prs: 38, issues: 12, contributors: 28, lastCommit: '4h ago' },
  { name: 'mobile-app', stars: 560, forks: 180, prs: 24, issues: 15, contributors: 18, lastCommit: '1h ago' },
  { name: 'data-pipeline', stars: 320, forks: 95, prs: 16, issues: 8, contributors: 12, lastCommit: '6h ago' },
  { name: 'auth-service', stars: 480, forks: 140, prs: 20, issues: 6, contributors: 14, lastCommit: '3h ago' },
  { name: 'infra-ops', stars: 210, forks: 65, prs: 12, issues: 5, contributors: 10, lastCommit: '5h ago' },
];

const languageData = [
  { name: 'TypeScript', value: 42 }, { name: 'Python', value: 22 },
  { name: 'Go', value: 14 }, { name: 'Java', value: 10 },
  { name: 'Rust', value: 7 }, { name: 'Others', value: 5 },
];

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#64748b'];

const repoColumns = [
  { key: 'name', label: 'Repository' },
  { key: 'stars', label: 'Stars' },
  { key: 'forks', label: 'Forks' },
  { key: 'prs', label: 'Open PRs' },
  { key: 'issues', label: 'Issues' },
  { key: 'contributors', label: 'Contributors' },
  { key: 'lastCommit', label: 'Last Commit' },
  { key: 'status', label: 'Health', render: () => <StatusBadge status="Healthy" /> },
];

const EngineeringAnalytics = () => (
  <CtoPageShell title="Engineering Analytics" description="Deep-dive analytics on engineering productivity and repository metrics">
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData.map((kpi, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{kpi.label}</div>
                <div className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">{kpi.value}</div>
              </div>
              <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
            </div>
            <div className="text-xs font-semibold text-slate-500 mt-4">{kpi.sub}</div>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-6">Developer Productivity Trend</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={productivityTrend}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dx={-10} domain={[70, 100]} />
                <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dx={10} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
                <Line yAxisId="left" type="monotone" dataKey="productivity" stroke="#3b82f6" strokeWidth={3} dot={{ fill: '#3b82f6', strokeWidth: 2 }} name="Productivity %" />
                <Line yAxisId="right" type="monotone" dataKey="commits" stroke="#10b981" strokeWidth={2} dot={false} name="Commits" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-6">Department Comparison</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentComparison}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="dept" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dx={-10} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
                <Bar dataKey="productivity" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Productivity %" />
                <Bar dataKey="reviews" fill="#8b5cf6" radius={[4, 4, 0, 0]} name="Reviews" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <DataTable columns={repoColumns} data={repos} pageSize={6} searchable />
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-6">Language Distribution</h3>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={languageData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                  {languageData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  </CtoPageShell>
);

export default EngineeringAnalytics;

