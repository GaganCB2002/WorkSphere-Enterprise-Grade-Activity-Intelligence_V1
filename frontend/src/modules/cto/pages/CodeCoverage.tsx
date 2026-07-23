import React from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CheckCircle2, Code, GitBranch, Cpu, TrendingUp, BarChart3, FileText } from 'lucide-react';
import CtoPageShell from '../CtoPageShell';
import DataTable, { StatusBadge } from '../../../components/common/DataTable/DataTable';

const kpiData = [
  { label: 'Overall Coverage', value: '82%', sub: '+2.4% this quarter', icon: CheckCircle2, color: 'text-emerald-500' },
  { label: 'Line Coverage', value: '85%', sub: '92,340 / 108,635 lines', icon: Code, color: 'text-blue-500' },
  { label: 'Branch Coverage', value: '78%', sub: 'Target: >80%', icon: GitBranch, color: 'text-amber-500' },
  { label: 'Function Coverage', value: '90%', sub: '2,145 / 2,383 functions', icon: Cpu, color: 'text-indigo-500' },
];

const coverageTrend = [
  { month: 'Oct', overall: 76, line: 79, branch: 72 },
  { month: 'Nov', overall: 77, line: 80, branch: 73 },
  { month: 'Dec', overall: 75, line: 78, branch: 71 },
  { month: 'Jan', overall: 78, line: 81, branch: 74 },
  { month: 'Feb', overall: 80, line: 83, branch: 76 },
  { month: 'Mar', overall: 82, line: 85, branch: 78 },
];

const coverageByModule = [
  { module: 'core-api', overall: 87, line: 90, branch: 83 },
  { module: 'frontend-web', overall: 79, line: 82, branch: 75 },
  { module: 'auth-service', overall: 85, line: 88, branch: 81 },
  { module: 'data-pipeline', overall: 91, line: 93, branch: 88 },
  { module: 'mobile-app', overall: 72, line: 76, branch: 68 },
  { module: 'infra-ops', overall: 68, line: 72, branch: 63 },
  { module: 'api-gateway', overall: 83, line: 86, branch: 79 },
];

const coverageFiles = [
  { file: 'src/api/users.ts', linesCovered: 420, linesTotal: 480, branches: 56, functions: 24, coverage: 87.5 },
  { file: 'src/api/auth.ts', linesCovered: 312, linesTotal: 340, branches: 42, functions: 18, coverage: 91.8 },
  { file: 'src/services/payment.ts', linesCovered: 245, linesTotal: 310, branches: 38, functions: 15, coverage: 79.0 },
  { file: 'src/components/Dashboard.tsx', linesCovered: 180, linesTotal: 220, branches: 28, functions: 12, coverage: 81.8 },
  { file: 'src/utils/validators.ts', linesCovered: 156, linesTotal: 160, branches: 32, functions: 10, coverage: 97.5 },
  { file: 'src/db/migrations.ts', linesCovered: 88, linesTotal: 125, branches: 16, functions: 6, coverage: 70.4 },
  { file: 'src/workers/eventProcessor.ts', linesCovered: 210, linesTotal: 260, branches: 30, functions: 14, coverage: 80.8 },
  { file: 'src/hooks/useAnalytics.ts', linesCovered: 95, linesTotal: 105, branches: 18, functions: 8, coverage: 90.5 },
];

const fileColumns = [
  { key: 'file', label: 'File / Package' },
  { key: 'linesCovered', label: 'Lines Covered' },
  { key: 'linesTotal', label: 'Total Lines' },
  { key: 'branches', label: 'Branches' },
  { key: 'functions', label: 'Functions' },
  { key: 'coverage', label: 'Coverage %', render: (v) => (
    <div className="flex items-center gap-2">
      <div className="w-16 bg-slate-200 dark:bg-slate-700 rounded-full h-1.5">
        <div className={`h-1.5 rounded-full ${v >= 85 ? 'bg-emerald-500' : v >= 75 ? 'bg-amber-500' : 'bg-rose-500'}`} style={{ width: `${v}%` }} />
      </div>
      <span className="text-xs font-semibold">{v}%</span>
    </div>
  )},
];

const CodeCoverage = () => (
  <CtoPageShell title="Code Coverage" description="Comprehensive code coverage metrics across all projects and modules">
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
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-6">Coverage Trend (12 Months)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={coverageTrend}>
                <defs>
                  <linearGradient id="cOverall" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/><stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/></linearGradient>
                  <linearGradient id="cLine" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/><stop offset="95%" stopColor="#10b981" stopOpacity={0}/></linearGradient>
                  <linearGradient id="cBranch" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#f59e0b" stopOpacity={0.1}/><stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/></linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dx={-10} domain={[60, 100]} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
                <Area type="monotone" dataKey="overall" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#cOverall)" name="Overall" />
                <Area type="monotone" dataKey="line" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#cLine)" name="Line" />
                <Area type="monotone" dataKey="branch" stroke="#f59e0b" strokeWidth={2} fillOpacity={1} fill="url(#cBranch)" name="Branch" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-6">Coverage by Module</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={coverageByModule} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} domain={[0, 100]} />
                <YAxis type="category" dataKey="module" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} width={90} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
                <Bar dataKey="overall" fill="#3b82f6" radius={[0, 4, 4, 0]} name="Overall %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <DataTable columns={fileColumns} data={coverageFiles} pageSize={8} searchable />
    </div>
  </CtoPageShell>
);

export default CodeCoverage;

