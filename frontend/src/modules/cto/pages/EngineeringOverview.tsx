// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, GitPullRequest, Code, GitMerge, GitCommit, GitBranch, Zap, Clock, CheckCircle2, Activity } from 'lucide-react';
import CtoPageShell from '../CtoPageShell';
import DataTable, { StatusBadge } from '../../../components/common/DataTable/DataTable';

const kpiData = [
  { label: 'Total Developers', value: '142', sub: '12 teams across 4 offices', icon: Users, color: 'text-blue-500' },
  { label: 'Pull Requests', value: '84', sub: '34 awaiting review', icon: GitPullRequest, color: 'text-purple-500' },
  { label: 'Code Reviews', value: '126', sub: '4.2 avg per reviewer', icon: Code, color: 'text-indigo-500' },
  { label: 'Merge Rate', value: '94%', sub: '6% identified as stale', icon: GitMerge, color: 'text-emerald-500' },
  { label: 'Commits Today', value: '312', sub: '28 contributors active', icon: GitCommit, color: 'text-amber-500' },
  { label: 'Active Branches', value: '48', sub: '12 stale (>14 days)', icon: GitBranch, color: 'text-cyan-500' },
];

const commitsData = Array.from({ length: 14 }, (_, i) => ({
  day: `D${i + 1}`, commits: Math.floor(180 + Math.random() * 220),
  authors: Math.floor(12 + Math.random() * 18),
}));

const prsByRepo = [
  { repo: 'core-api', open: 12, merged: 18 }, { repo: 'frontend-web', open: 8, merged: 22 },
  { repo: 'mobile-app', open: 6, merged: 14 }, { repo: 'data-pipeline', open: 4, merged: 10 },
  { repo: 'auth-service', open: 3, merged: 12 }, { repo: 'infra-ops', open: 5, merged: 8 },
];

const recentPRs = [
  { pr: '#1482', title: 'Add rate limiting to API gateway', repo: 'api-gateway', author: 'Sarah Chen', status: 'Open', reviews: 2, created: '2h ago' },
  { pr: '#1481', title: 'Fix memory leak in event processor', repo: 'core-api', author: 'Mike Johnson', status: 'Approved', reviews: 3, created: '4h ago' },
  { pr: '#1480', title: 'Update dashboard dark mode styles', repo: 'frontend-web', author: 'Emily Davis', status: 'Changes Requested', reviews: 1, created: '6h ago' },
  { pr: '#1479', title: 'Add caching layer for product search', repo: 'core-api', author: 'Alex Kim', status: 'Merged', reviews: 2, created: '8h ago' },
  { pr: '#1478', title: 'Upgrade PostgreSQL to v16', repo: 'data-pipeline', author: 'James Wilson', status: 'Open', reviews: 0, created: '12h ago' },
  { pr: '#1477', title: 'Implement OAuth2 token refresh', repo: 'auth-service', author: 'Priya Patel', status: 'Approved', reviews: 2, created: '14h ago' },
  { pr: '#1476', title: 'Add websocket health checks', repo: 'infra-ops', author: 'Tom Brown', status: 'Merged', reviews: 1, created: '18h ago' },
  { pr: '#1475', title: 'Refactor notification service', repo: 'mobile-app', author: 'Lisa Wang', status: 'Open', reviews: 0, created: '1d ago' },
];

const teamActivity = [
  { text: 'Sprint planning completed for Team Alpha', team: 'Platform Engineering', time: '30m ago' },
  { text: 'Code freeze for v3.2 release initiated', team: 'Release Management', time: '1h ago' },
  { text: 'Architecture review for new search service', team: 'Search Team', time: '2h ago' },
  { text: 'Load testing completed - 12K req/s sustained', team: 'QA Engineering', time: '3h ago' },
  { text: 'Dependency vulnerability scan completed', team: 'Security', time: '5h ago' },
];

const prColumns = [
  { key: 'pr', label: 'PR #' },
  { key: 'title', label: 'Title' },
  { key: 'repo', label: 'Repository' },
  { key: 'author', label: 'Author' },
  { key: 'status', label: 'Status', render: (v) => <StatusBadge status={v} /> },
  { key: 'reviews', label: 'Reviews' },
  { key: 'created', label: 'Created' },
];

const EngineeringOverview = () => (
  <CtoPageShell title="Engineering Overview" description="Developer productivity, pull requests, and code activity metrics">
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        {kpiData.map((kpi, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{kpi.label}</div>
                <div className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">{kpi.value}</div>
              </div>
              <kpi.icon className={`w-4 h-4 ${kpi.color}`} />
            </div>
            <div className="text-[11px] font-semibold text-slate-500 mt-3">{kpi.sub}</div>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-6">Commits per Day (14 Days)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={commitsData}>
                <defs>
                  <linearGradient id="colorCommits" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.1}/><stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/></linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} interval={1} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dx={-10} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
                <Area type="monotone" dataKey="commits" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorCommits)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-6">PRs by Repository</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={prsByRepo}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="repo" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dx={-10} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
                <Bar dataKey="open" stackId="a" fill="#f59e0b" radius={[0, 0, 0, 0]} name="Open" />
                <Bar dataKey="merged" stackId="a" fill="#10b981" radius={[4, 4, 0, 0]} name="Merged" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <DataTable columns={prColumns} data={recentPRs} pageSize={8} searchable />
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 bg-[#FAFAFA] dark:bg-slate-800/50">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">Team Activity Feed</h3>
          </div>
          <div className="p-5 space-y-4">
            {teamActivity.map((event, i) => (
              <div key={i} className="flex gap-3">
                <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 flex-shrink-0" />
                <div>
                  <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">{event.text}</div>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">{event.team} • {event.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </CtoPageShell>
);

export default EngineeringOverview;


