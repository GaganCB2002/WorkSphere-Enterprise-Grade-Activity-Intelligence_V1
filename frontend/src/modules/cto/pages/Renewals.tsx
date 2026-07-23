import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, AlertTriangle, DollarSign } from 'lucide-react';
import CtoPageShell from '../CtoPageShell';
import DataTable, { StatusBadge } from '../../../components/common/DataTable/DataTable';

const kpis = [
  { label: 'Upcoming', value: '4', icon: Calendar, color: 'text-blue-500' },
  { label: 'Due This Month', value: '2', icon: Clock, color: 'text-emerald-500' },
  { label: 'Overdue', value: '1', icon: AlertTriangle, color: 'text-red-500' },
  { label: 'Total Value', value: '$847K', icon: DollarSign, color: 'text-purple-500' },
];

const columns = [
  { key: 'contract', label: 'Contract', sortable: true },
  { key: 'vendor', label: 'Vendor', sortable: true },
  { key: 'value', label: 'Value', sortable: true, render: (v) => <span className="text-blue-600 font-semibold">{v}</span> },
  { key: 'currentEnd', label: 'Current End' },
  { key: 'newEnd', label: 'Proposed End' },
  { key: 'status', label: 'Status', render: (v) => <StatusBadge status={v} /> },
  { key: 'action', label: 'Action Needed' },
];

const data = [
  { id: 1, contract: 'GCP Annual Commitment', vendor: 'Google Cloud', value: '$620,000', currentEnd: 'May 2025', newEnd: 'May 2026', status: 'Due This Month', action: 'Negotiate renewal' },
  { id: 2, contract: 'Snowflake Agreement', vendor: 'Snowflake', value: '$280,000', currentEnd: 'Jan 2025', newEnd: 'Feb 2026', status: 'Overdue', action: 'Urgent review' },
  { id: 3, contract: 'New Relic Pro', vendor: 'New Relic', value: '$82,000', currentEnd: 'Jun 2025', newEnd: 'Jun 2026', status: 'Upcoming', action: 'Evaluate alternatives' },
  { id: 4, contract: 'GitHub Enterprise', vendor: 'GitHub', value: '$120,000', currentEnd: 'Jul 2025', newEnd: 'Jul 2027', status: 'Upcoming', action: 'Auto-renew on' },
  { id: 5, contract: 'JetBrains Licenses', vendor: 'JetBrains', value: '$96,000', currentEnd: 'Nov 2025', newEnd: 'Nov 2026', status: 'Upcoming', action: 'Confirm seat count' },
  { id: 6, contract: 'Google Workspace', vendor: 'Google', value: '$72,000', currentEnd: 'Sep 2025', newEnd: 'Sep 2026', status: 'Due This Month', action: 'Review licenses' },
  { id: 7, contract: 'Datadog Enterprise', vendor: 'Datadog', value: '$340,000', currentEnd: 'Oct 2026', newEnd: 'Oct 2027', status: 'Upcoming', action: 'Monitor usage' },
];

const Renewals = () => (
  <CtoPageShell title="Renewals" description="Track upcoming contract renewals, deadlines, and negotiation status">
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
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-4">Renewal Schedule</h3>
        <DataTable columns={columns} data={data} searchable pageSize={7} />
      </div>
    </div>
  </CtoPageShell>
);

export default Renewals;

