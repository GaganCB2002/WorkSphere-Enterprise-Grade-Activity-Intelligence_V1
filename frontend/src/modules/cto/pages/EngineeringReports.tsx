import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Calendar, Download, Code, GitPullRequest, Bug, TestTube } from 'lucide-react';
import CtoPageShell from '../CtoPageShell';
import DataTable, { StatusBadge } from '../../../components/common/DataTable/DataTable';

const kpis = [
  { label: 'Engineering Reports', value: '24', icon: FileText, color: 'text-blue-500' },
  { label: 'Scheduled', value: '8', icon: Calendar, color: 'text-emerald-500' },
  { label: 'Downloads MTD', value: '342', icon: Download, color: 'text-purple-500' },
  { label: 'Avg Pages', value: '18', icon: Code, color: 'text-amber-500' },
];

const columns = [
  { key: 'name', label: 'Report Name', sortable: true },
  { key: 'type', label: 'Type', sortable: true },
  { key: 'format', label: 'Format' },
  { key: 'generated', label: 'Generated' },
  { key: 'scheduled', label: 'Schedule' },
  { key: 'lastRun', label: 'Last Run' },
  { key: 'status', label: 'Status', render: (v: any) => <StatusBadge status={v} /> },
];

const data = [
  { id: 1, name: 'Sprint Velocity Report', type: 'Agile', format: 'PDF', generated: 24, scheduled: 'Bi-weekly', lastRun: '1 day ago', status: 'Completed' },
  { id: 2, name: 'Code Quality Metrics', type: 'Quality', format: 'HTML', generated: 18, scheduled: 'Weekly', lastRun: '2 hr ago', status: 'Completed' },
  { id: 3, name: 'Deployment Summary', type: 'CI/CD', format: 'PDF', generated: 42, scheduled: 'Daily', lastRun: '1 hr ago', status: 'Scheduled' },
  { id: 4, name: 'Technical Debt Analysis', type: 'Quality', format: 'PDF', generated: 6, scheduled: 'Monthly', lastRun: '1 week ago', status: 'Completed' },
  { id: 5, name: 'PR Review Statistics', type: 'Collaboration', format: 'CSV', generated: 12, scheduled: 'Weekly', lastRun: '3 days ago', status: 'Completed' },
  { id: 6, name: 'Test Coverage Report', type: 'Testing', format: 'HTML', generated: 20, scheduled: 'Per-sprint', lastRun: '4 days ago', status: 'Scheduled' },
  { id: 7, name: 'Incident Post-Mortem', type: 'Reliability', format: 'PDF', generated: 8, scheduled: 'On-demand', lastRun: '5 hr ago', status: 'Completed' },
  { id: 8, name: 'Engineering OKR Tracking', type: 'Management', format: 'PDF', generated: 4, scheduled: 'Quarterly', lastRun: '2 weeks ago', status: 'Draft' },
];

const EngineeringReports = () => (
  <CtoPageShell title="Engineering Reports" description="Engineering-focused reports covering sprint velocity, code quality, and deployments">
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{kpi.label}</div>
                <div className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">{kpi.value}</div>
              </div>
              <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
            </div>
          </motion.div>
        ))}
      </motion.div>
      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-4">Engineering Reports</h3>
        <DataTable columns={columns} data={data} searchable pageSize={8} />
      </div>
    </div>
  </CtoPageShell>
);

export default EngineeringReports;



