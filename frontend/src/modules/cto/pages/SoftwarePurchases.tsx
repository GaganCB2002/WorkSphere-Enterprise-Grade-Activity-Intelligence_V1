import React from 'react';
import { motion } from 'framer-motion';
import { Clock, CheckCircle2, DollarSign, TrendingUp } from 'lucide-react';
import CtoPageShell from '../CtoPageShell';
import DataTable, { StatusBadge } from '../../../components/common/DataTable/DataTable';

const kpis = [
  { label: 'Pending', value: '6', icon: Clock, color: 'text-amber-500' },
  { label: 'Approved', value: '8', icon: CheckCircle2, color: 'text-emerald-500' },
  { label: 'Budget Remaining', value: '$847K', icon: DollarSign, color: 'text-blue-500' },
  { label: 'Total MTD', value: '$142K', icon: TrendingUp, color: 'text-purple-500' },
];

const columns = [
  { key: 'id', label: 'Request ID', sortable: true },
  { key: 'software', label: 'Software', sortable: true },
  { key: 'vendor', label: 'Vendor', sortable: true },
  { key: 'cost', label: 'Cost', sortable: true, render: (v) => <span className="text-blue-600 font-semibold">{v}</span> },
  { key: 'department', label: 'Department', sortable: true },
  { key: 'priority', label: 'Priority', render: (v) => <StatusBadge status={v} /> },
  { key: 'status', label: 'Status', render: (v) => <StatusBadge status={v} /> },
];

const data = [
  { id: 'PUR-001', software: 'Datadog Enterprise', vendor: 'Datadog', cost: '$84,000', department: 'Engineering', priority: 'Critical', status: 'Pending' },
  { id: 'PUR-002', software: 'GitHub Enterprise', vendor: 'GitHub', cost: '$36,000', department: 'Engineering', priority: 'High', status: 'Approved' },
  { id: 'PUR-003', software: 'Slack Enterprise', vendor: 'Slack', cost: '$24,000', department: 'All', priority: 'Medium', status: 'Pending' },
  { id: 'PUR-004', software: 'Notion Team', vendor: 'Notion', cost: '$12,000', department: 'Product', priority: 'Low', status: 'Approved' },
  { id: 'PUR-005', software: 'Sentry Performance', vendor: 'Functional Software', cost: '$18,000', department: 'Engineering', priority: 'High', status: 'Pending' },
  { id: 'PUR-006', software: 'Figma Enterprise', vendor: 'Figma', cost: '$9,600', department: 'Design', priority: 'Medium', status: 'Approved' },
  { id: 'PUR-007', software: 'Linear Enterprise', vendor: 'Linear', cost: '$14,400', department: 'Engineering', priority: 'High', status: 'Pending' },
  { id: 'PUR-008', software: 'PagerDuty Business', vendor: 'PagerDuty', cost: '$21,000', department: 'SRE', priority: 'Critical', status: 'Approved' },
  { id: 'PUR-009', software: 'Miro Enterprise', vendor: 'Miro', cost: '$7,200', department: 'Product', priority: 'Low', status: 'Pending' },
  { id: 'PUR-010', software: 'Clerk Auth', vendor: 'Clerk', cost: '$15,000', department: 'Engineering', priority: 'High', status: 'Approved' },
];

const SoftwarePurchases = () => (
  <CtoPageShell title="Software Purchases" description="Manage software purchase approvals and budget tracking">
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
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-4">Purchase Requests</h3>
        <DataTable columns={columns} data={data} searchable pageSize={10} />
      </div>
    </div>
  </CtoPageShell>
);

export default SoftwarePurchases;

