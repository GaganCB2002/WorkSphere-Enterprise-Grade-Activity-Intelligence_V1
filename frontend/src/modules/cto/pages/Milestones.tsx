// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';
import { Milestone, CheckCircle, AlertTriangle, Calendar, Activity } from 'lucide-react';
import CtoPageShell from '../CtoPageShell';
import DataTable, { StatusBadge } from '../../../components/common/DataTable/DataTable';

const kpiData = [
  { label: 'Total', value: '24', sub: 'All milestones', icon: Milestone, color: 'text-blue-500' },
  { label: 'Completed', value: '16', sub: 'Successfully delivered', icon: CheckCircle, color: 'text-emerald-500' },
  { label: 'At Risk', value: '3', sub: 'Behind schedule', icon: AlertTriangle, color: 'text-red-500' },
  { label: 'Upcoming', value: '5', sub: 'Next 30 days', icon: Calendar, color: 'text-amber-500' },
];

const columns = [
  { key: 'name', label: 'Milestone' },
  { key: 'project', label: 'Project' },
  { key: 'dueDate', label: 'Due Date' },
  { key: 'status', label: 'Status', render: (v) => <StatusBadge status={v} /> },
  { key: 'progress', label: 'Progress' },
  { key: 'owner', label: 'Owner' },
];

const data = [
  { name: 'Platform Beta Launch', project: 'Platform Modernization', dueDate: '2026-08-15', status: 'Active', progress: '72%', owner: 'Sarah Chen' },
  { name: 'Data Lake Ingest Complete', project: 'Data Lake Migration', dueDate: '2026-09-01', status: 'Active', progress: '45%', owner: 'Mike Johnson' },
  { name: 'Mobile App MVP', project: 'Mobile App v3', dueDate: '2026-08-01', status: 'Active', progress: '68%', owner: 'Lisa Park' },
  { name: 'Services Split Complete', project: 'Microservices Refactor', dueDate: '2026-12-01', status: 'Pending', progress: '31%', owner: 'Tom Wilson' },
  { name: 'Audit Remediation', project: 'Security Audit Program', dueDate: '2026-07-30', status: 'Active', progress: '88%', owner: 'Anna Davis' },
  { name: 'Cost Baseline Set', project: 'Cloud Cost Optimization', dueDate: '2026-08-10', status: 'Active', progress: '55%', owner: 'James Lee' },
  { name: 'ML Model v1 Deployed', project: 'AI/ML Platform', dueDate: '2026-11-01', status: 'Pending', progress: '23%', owner: 'Rachel Kim' },
  { name: 'Legacy Shutdown Complete', project: 'Legacy Decommission', dueDate: '2026-10-01', status: 'Active', progress: '61%', owner: 'Sarah Chen' },
  { name: 'Gateway Migration', project: 'API Gateway Redesign', dueDate: '2026-12-15', status: 'Pending', progress: '40%', owner: 'Mike Johnson' },
  { name: 'Pipeline Automation Done', project: 'DevOps Toolchain', dueDate: '2026-07-25', status: 'Active', progress: '92%', owner: 'Lisa Park' },
  { name: 'SOC 2 Readiness', project: 'Compliance Automation', dueDate: '2026-11-30', status: 'Pending', progress: '17%', owner: 'Tom Wilson' },
  { name: 'Portal v2 Launch', project: 'Customer Portal v2', dueDate: '2026-08-20', status: 'Active', progress: '78%', owner: 'Anna Davis' },
];

const Milestones = () => (
  <CtoPageShell title="Milestones" description="Key project milestones, completion tracking, and upcoming deadlines" breadcrumbs={[{ label: 'CTO Dashboard', path: '/cto/executive-overview' }, { label: 'Milestones' }]}>
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
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-6">Milestones</h3>
        <DataTable columns={columns} data={data} pageSize={8} searchable />
      </div>
    </div>
  </CtoPageShell>
);

export default Milestones;


