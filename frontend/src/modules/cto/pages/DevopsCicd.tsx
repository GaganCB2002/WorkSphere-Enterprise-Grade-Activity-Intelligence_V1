// @ts-nocheck
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { GitBranch, CheckCircle2, Clock, XCircle } from 'lucide-react';
import CtoPageShell from '../CtoPageShell';
import DataTable, { StatusBadge } from '../../../components/common/DataTable/DataTable';

const kpis = [
  { label: 'Pipelines', value: '24', sub: 'Active pipelines', icon: GitBranch, color: 'text-blue-500' },
  { label: 'Success Rate', value: '94.2%', sub: '+1.2% from last month', icon: CheckCircle2, color: 'text-emerald-500' },
  { label: 'Avg Duration', value: '12m', sub: '-2m from last month', icon: Clock, color: 'text-indigo-500' },
  { label: 'Failed Builds', value: '8', sub: 'Last 30 days', icon: XCircle, color: 'text-red-500' },
];

const durationData = [
  { pipeline: 'Build & Test', duration: 8 }, { pipeline: 'Security Scan', duration: 14 },
  { pipeline: 'Deploy GitBranch', duration: 6 }, { pipeline: 'Integration', duration: 18 },
  { pipeline: 'Deploy Prod', duration: 12 }, { pipeline: 'E2E Tests', duration: 22 },
];

const columns = [
  { key: 'name', label: 'Pipeline Name' },
  { key: 'type', label: 'Type' },
  { key: 'status', label: 'Status', render: (v: string) => <StatusBadge status={v} /> },
  { key: 'lastRun', label: 'Last Run' },
  { key: 'duration', label: 'Duration' },
  { key: 'successRate', label: 'Success Rate' },
];

const data = [
  { name: 'Build & Test', type: 'CI', status: 'Passed', lastRun: '12m ago', duration: '8m 24s', successRate: '97.2%' },
  { name: 'Security Scan', type: 'CI', status: 'Passed', lastRun: '24m ago', duration: '14m 12s', successRate: '100%' },
  { name: 'Deploy GitBranch', type: 'CD', status: 'Passed', lastRun: '32m ago', duration: '6m 48s', successRate: '98.5%' },
  { name: 'Integration Tests', type: 'CI', status: 'Failed', lastRun: '1h ago', duration: '18m 24s', successRate: '88.2%' },
  { name: 'Deploy Production', type: 'CD', status: 'Passed', lastRun: '2h ago', duration: '12m 12s', successRate: '99.7%' },
  { name: 'E2E Tests', type: 'CI', status: 'Passed', lastRun: '3h ago', duration: '22m 48s', successRate: '95.8%' },
  { name: 'Performance Tests', type: 'CI', status: 'Failed', lastRun: '4h ago', duration: '18m 36s', successRate: '82.4%' },
  { name: 'Deploy GitBranch', type: 'CD', status: 'Passed', lastRun: '5h ago', duration: '6m 48s', successRate: '98.5%' },
];

const DevopsCicd: React.FC = () => {
  return (
    <CtoPageShell
      title="DevOps CI/CD"
      description="Monitor pipeline health, build durations, and deployment success rates"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{kpi.label}</div>
                <div className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">{kpi.value}</div>
              </div>
              <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
            </div>
            <div className="text-xs font-semibold text-slate-500 mt-4">{kpi.sub}</div>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-6">Pipeline Duration (minutes)</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={durationData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="pipeline" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dx={-10} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              <Bar dataKey="duration" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <DataTable columns={columns} data={data} searchable pageSize={10} />
    </CtoPageShell>
  );
};

export default DevopsCicd;


