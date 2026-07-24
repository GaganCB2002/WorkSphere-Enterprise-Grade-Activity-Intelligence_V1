import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, Shield, Code, FileText, Bug, GitBranch } from 'lucide-react';
import CtoPageShell from '../CtoPageShell';
import DataTable, { StatusBadge } from '../../../components/common/DataTable/DataTable';

const kpiData = [
  { label: 'Code Coverage', value: '82%', sub: '+3% since last month', icon: CheckCircle2, color: 'text-emerald-500' },
  { label: 'Code Duplication', value: '4.2%', sub: 'Below 5% threshold', icon: GitBranch, color: 'text-blue-500' },
  { label: 'Maintainability', value: 'A', sub: 'Excellent (A - C scale)', icon: Code, color: 'text-indigo-500' },
  { label: 'Security Hotspots', value: '3', sub: '2 new this week', icon: Shield, color: 'text-amber-500' },
  { label: 'Tech Debt Ratio', value: '8.5%', sub: 'Target: <10%', icon: FileText, color: 'text-rose-500' },
  { label: 'Quality Gate', value: 'Passed', sub: 'All criteria met', icon: Bug, color: 'text-emerald-500' },
];

const issuesBySeverity = [
  { severity: 'Critical', count: 12 }, { severity: 'Major', count: 45 },
  { severity: 'Minor', count: 89 }, { severity: 'Info', count: 156 },
];

const severityColors: Record<string, string> = { Critical: '#ef4444', Major: '#f59e0b', Minor: '#3b82f6', Info: '#94a3b8' };

const qualityData = [
  { project: 'core-api', coverage: 87, duplication: 3.2, maintainability: 'A', security: 0, status: 'Passed' },
  { project: 'frontend-web', coverage: 79, duplication: 5.1, maintainability: 'B', security: 1, status: 'Warning' },
  { project: 'mobile-app', coverage: 72, duplication: 6.8, maintainability: 'B', security: 2, status: 'Warning' },
  { project: 'data-pipeline', coverage: 91, duplication: 2.1, maintainability: 'A', security: 0, status: 'Passed' },
  { project: 'auth-service', coverage: 85, duplication: 3.5, maintainability: 'A', security: 0, status: 'Passed' },
  { project: 'infra-ops', coverage: 68, duplication: 7.2, maintainability: 'C', security: 3, status: 'Failed' },
  { project: 'api-gateway', coverage: 83, duplication: 4.0, maintainability: 'A', security: 0, status: 'Passed' },
];

const qualityColumns = [
  { key: 'project', label: 'Project' },
  { key: 'coverage', label: 'Coverage %', render: (v: any) => `${v}%` },
  { key: 'duplication', label: 'Duplication %', render: (v: any) => `${v}%` },
  { key: 'maintainability', label: 'Maintainability' },
  { key: 'security', label: 'Security Hotspots' },
  { key: 'status', label: 'Status', render: (v: any) => <StatusBadge status={v} /> },
];

const IssueTypeIcon = ({ type, count }: { type: string; count: number }) => {
  const icons: Record<string, any> = { Critical: AlertCircle, Major: AlertTriangle, Minor: Info, Info: FileText };
  const Icon = icons[type] || Info;
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
      <Icon className={`w-5 h-5`} style={{ color: severityColors[type] }} />
      <div>
        <div className="text-sm font-bold text-slate-900 dark:text-white">{count}</div>
        <div className="text-xs text-slate-500 font-medium">{type}</div>
      </div>
    </div>
  );
};

const CodeQuality = () => (
  <CtoPageShell title="Code Quality" description="Code quality metrics, issues tracking, and quality gate status">
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-6">Quality Gate Status</h3>
          <div className="flex flex-col items-center justify-center h-48">
            <div className="relative w-32 h-32 mb-4">
              <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15.5" fill="none" stroke="#e2e8f0" strokeWidth="3" />
                <circle cx="18" cy="18" r="15.5" fill="none" stroke="#10b981" strokeWidth="3"
                  strokeDasharray={`${(82 / 100) * 97.4} 97.4`} strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10 text-emerald-500" />
              </div>
            </div>
            <span className="text-lg font-extrabold text-emerald-500">PASSED</span>
            <span className="text-xs text-slate-500 mt-1">82% quality threshold met</span>
          </div>
        </div>
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-6">Quality Issues by Severity</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={issuesBySeverity}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="severity" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dx={-10} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {issuesBySeverity.map((entry, i) => <Cell key={i} fill={severityColors[entry.severity]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <DataTable columns={qualityColumns} data={qualityData} pageSize={7} searchable />
    </div>
  </CtoPageShell>
);

export default CodeQuality;




