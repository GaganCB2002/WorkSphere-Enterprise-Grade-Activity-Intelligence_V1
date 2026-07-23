import React from 'react';
import { motion } from 'framer-motion';
import { FileText, CheckCircle2, AlertTriangle, DollarSign } from 'lucide-react';
import CtoPageShell from '../CtoPageShell';
import DataTable, { StatusBadge } from '../../../components/common/DataTable/DataTable';

const kpis = [
  { label: 'Total Licenses', value: '847', icon: FileText, color: 'text-blue-500' },
  { label: 'Active', value: '624', icon: CheckCircle2, color: 'text-emerald-500' },
  { label: 'Expiring', value: '24', icon: AlertTriangle, color: 'text-amber-500' },
  { label: 'Cost MTD', value: '$84,200', icon: DollarSign, color: 'text-purple-500' },
];

const columns = [
  { key: 'name', label: 'Software', sortable: true },
  { key: 'vendor', label: 'Vendor', sortable: true },
  { key: 'type', label: 'License Type', sortable: true },
  { key: 'seats', label: 'Seats Used/Total', sortable: true },
  { key: 'expiry', label: 'Expiry' },
  { key: 'cost', label: 'Annual Cost', sortable: true },
  { key: 'status', label: 'Status', render: (v) => <StatusBadge status={v} /> },
];

const data = [
  { id: 1, name: 'JetBrains All Products', vendor: 'JetBrains', type: 'Enterprise', seats: '124/200', expiry: 'Dec 2026', cost: '$24,000', status: 'Active' },
  { id: 2, name: 'Microsoft 365 E5', vendor: 'Microsoft', type: 'Subscription', seats: '342/500', expiry: 'Mar 2027', cost: '$18,200', status: 'Active' },
  { id: 3, name: 'Atlassian Cloud', vendor: 'Atlassian', type: 'SaaS', seats: '84/100', expiry: 'Feb 2025', cost: '$12,400', status: 'Expiring' },
  { id: 4, name: 'Datadog Enterprise', vendor: 'Datadog', type: 'Annual', seats: 'N/A', expiry: 'Nov 2026', cost: '$8,500', status: 'Active' },
  { id: 5, name: 'GitHub Enterprise', vendor: 'GitHub', type: 'SaaS', seats: '247/300', expiry: 'Aug 2026', cost: '$7,200', status: 'Active' },
  { id: 6, name: 'New Relic', vendor: 'New Relic', type: 'Annual', seats: 'N/A', expiry: 'Jul 2026', cost: '$6,800', status: 'Active' },
  { id: 7, name: 'Figma Enterprise', vendor: 'Figma', type: 'SaaS', seats: '42/50', expiry: 'Jan 2025', cost: '$3,600', status: 'Expiring' },
  { id: 8, name: 'Tableau Creator', vendor: 'Salesforce', type: 'Annual', seats: '18/25', expiry: 'Apr 2027', cost: '$3,480', status: 'Active' },
  { id: 9, name: 'Adobe Creative Cloud', vendor: 'Adobe', type: 'Subscription', seats: '12/15', expiry: 'Sep 2026', cost: '$2,400', status: 'Active' },
  { id: 10, name: 'npm Enterprise', vendor: 'npm Inc', type: 'Annual', seats: 'N/A', expiry: 'May 2027', cost: '$920', status: 'Active' },
];

const SoftwareLicenses = () => (
  <CtoPageShell title="Software Licenses" description="Track software license inventory, usage, and renewal status">
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
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-4">License Inventory</h3>
        <DataTable columns={columns} data={data} searchable pageSize={10} />
      </div>
    </div>
  </CtoPageShell>
);

export default SoftwareLicenses;

