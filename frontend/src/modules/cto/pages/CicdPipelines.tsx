import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { PlayCircle, CheckCircle, Clock, XCircle, Activity } from 'lucide-react';
import CtoPageShell from '../CtoPageShell';
import DataTable, { StatusBadge } from '../../../components/common/DataTable/DataTable';

const kpiData = [
  { label: 'Pipeline Runs', value: '1,247', sub: 'Total executions', icon: PlayCircle, color: 'text-blue-500' },
  { label: 'Success Rate', value: '94.2%', sub: 'All pipelines', icon: CheckCircle, color: 'text-emerald-500' },
  { label: 'Avg Duration', value: '12m', sub: 'Per pipeline run', icon: Clock, color: 'text-amber-500' },
  { label: 'Failed', value: '73', sub: 'Last 30 days', icon: XCircle, color: 'text-red-500' },
];

const pipelineSuccessData = [
  { name: 'build-frontend', success: 96, failed: 4 },
  { name: 'build-backend', success: 92, failed: 8 },
  { name: 'deploy-GitBranch', success: 98, failed: 2 },
  { name: 'deploy-prod', success: 95, failed: 5 },
  { name: 'test-e2e', success: 88, failed: 12 },
  { name: 'security-scan', success: 97, failed: 3 },
  { name: 'db-migration', success: 94, failed: 6 },
];

const columns = [
  { key: 'id', label: 'Run ID' },
  { key: 'pipeline', label: 'Pipeline' },
  { key: 'branch', label: 'Branch' },
  { key: 'status', label: 'Status', render: (v) => <StatusBadge status={v} /> },
  { key: 'duration', label: 'Duration' },
  { key: 'commit', label: 'Commit' },
  { key: 'triggeredBy', label: 'Triggered By' },
];

const data = [
  { id: '#3842', pipeline: 'deploy-prod', branch: 'main', status: 'Active', duration: '11m 23s', commit: 'a3f8e2d', triggeredBy: 'Sarah Chen' },
  { id: '#3841', pipeline: 'build-backend', branch: 'feature/payment', status: 'Active', duration: '8m 45s', commit: 'b7d1c9f', triggeredBy: 'Mike Johnson' },
  { id: '#3840', pipeline: 'test-e2e', branch: 'main', status: 'Pending', duration: '—', commit: 'e4f2a1b', triggeredBy: 'Lisa Park' },
  { id: '#3839', pipeline: 'deploy-GitBranch', branch: 'develop', status: 'Failed', duration: '10m 12s', commit: 'c9e3f7d', triggeredBy: 'Tom Wilson' },
  { id: '#3838', pipeline: 'security-scan', branch: 'main', status: 'Active', duration: '5m 30s', commit: 'd2a4b8c', triggeredBy: 'Anna Davis' },
  { id: '#3837', pipeline: 'build-frontend', branch: 'hotfix/ui', status: 'Active', duration: '6m 18s', commit: 'f1e5c3a', triggeredBy: 'James Lee' },
  { id: '#3836', pipeline: 'db-migration', branch: 'main', status: 'Pending', duration: '—', commit: 'e8b2d4f', triggeredBy: 'Rachel Kim' },
];

const CicdPipelines = () => (
  <CtoPageShell title="CI/CD Pipelines" description="Pipeline execution status, success rates, and run history" breadcrumbs={[{ label: 'CTO Dashboard', path: '/cto/executive-overview' }, { label: 'CI/CD Pipelines' }]}>
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

      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-6">Pipeline Success Rate (%)</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={pipelineSuccessData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
              <XAxis type="number" domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
              <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} width={120} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} formatter={(v) => `${v}%`} />
              <Bar dataKey="success" fill="#3b82f6" radius={[0, 4, 4, 0]} name="Success Rate" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-6">Recent Pipeline Runs</h3>
        <DataTable columns={columns} data={data} pageSize={5} searchable />
      </div>
    </div>
  </CtoPageShell>
);

export default CicdPipelines;


