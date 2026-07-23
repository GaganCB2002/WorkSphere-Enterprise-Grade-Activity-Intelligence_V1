import React from 'react';
import { motion } from 'framer-motion';
import { FileText, CheckCircle2, FileEdit, XCircle } from 'lucide-react';
import CtoPageShell from '../CtoPageShell';
import DataTable, { StatusBadge } from '../../../components/common/DataTable/DataTable';

const kpis = [
  { label: 'Total Contracts', value: '24', icon: FileText, color: 'text-blue-500' },
  { label: 'Active', value: '18', icon: CheckCircle2, color: 'text-emerald-500' },
  { label: 'Draft', value: '4', icon: FileEdit, color: 'text-purple-500' },
  { label: 'Expired', value: '2', icon: XCircle, color: 'text-slate-500' },
];

const columns = [
  { key: 'name', label: 'Contract', sortable: true },
  { key: 'vendor', label: 'Vendor', sortable: true },
  { key: 'type', label: 'Type', sortable: true },
  { key: 'value', label: 'Value', sortable: true, render: (v) => <span className="text-blue-600 font-semibold">{v}</span> },
  { key: 'start', label: 'Start Date' },
  { key: 'end', label: 'End Date' },
  { key: 'autoRenew', label: 'Auto-Renew', render: (v) => v ? <span className="text-emerald-600 font-semibold">Yes</span> : <span className="text-slate-400">No</span> },
  { key: 'status', label: 'Status', render: (v) => <StatusBadge status={v} /> },
];

const data = [
  { id: 1, name: 'AWS Enterprise Agreement', vendor: 'Amazon Web Services', type: 'Enterprise', value: '$1,200,000', start: 'Jan 2024', end: 'Dec 2026', autoRenew: true, status: 'Active' },
  { id: 2, name: 'Azure EA Renewal', vendor: 'Microsoft', type: 'Enterprise', value: '$850,000', start: 'Mar 2024', end: 'Feb 2027', autoRenew: true, status: 'Active' },
  { id: 3, name: 'GCP Annual Commitment', vendor: 'Google Cloud', type: 'Annual', value: '$620,000', start: 'Jun 2024', end: 'May 2025', autoRenew: false, status: 'Active' },
  { id: 4, name: 'Datadog Enterprise', vendor: 'Datadog', type: 'SaaS', value: '$340,000', start: 'Nov 2024', end: 'Oct 2026', autoRenew: true, status: 'Active' },
  { id: 5, name: 'Snowflake Agreement', vendor: 'Snowflake', type: 'Annual', value: '$280,000', start: 'Feb 2024', end: 'Jan 2025', autoRenew: false, status: 'Expired' },
  { id: 6, name: 'Atlassian Cloud', vendor: 'Atlassian', type: 'SaaS', value: '$145,000', start: 'Apr 2024', end: 'Mar 2027', autoRenew: true, status: 'Active' },
  { id: 7, name: 'GitHub Enterprise', vendor: 'GitHub', type: 'SaaS', value: '$120,000', start: 'Aug 2024', end: 'Jul 2025', autoRenew: true, status: 'Active' },
  { id: 8, name: 'JetBrains Licenses', vendor: 'JetBrains', type: 'Annual', value: '$96,000', start: 'Dec 2024', end: 'Nov 2025', autoRenew: true, status: 'Draft' },
  { id: 9, name: 'New Relic Pro', vendor: 'New Relic', type: 'Annual', value: '$82,000', start: 'Jul 2024', end: 'Jun 2025', autoRenew: false, status: 'Active' },
  { id: 10, name: 'Elastic Cloud', vendor: 'Elastic', type: 'SaaS', value: '$64,000', start: 'Sep 2024', end: 'Aug 2026', autoRenew: true, status: 'Draft' },
];

const Contracts = () => (
  <CtoPageShell title="Contracts" description="Manage all vendor contracts, renewals, and agreement terms">
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
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-4">All Contracts</h3>
        <DataTable columns={columns} data={data} searchable pageSize={10} />
      </div>
    </div>
  </CtoPageShell>
);

export default Contracts;

