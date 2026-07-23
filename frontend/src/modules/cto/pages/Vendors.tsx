import React from 'react';
import { motion } from 'framer-motion';
import { Building, CheckCircle2, Star, ThumbsUp } from 'lucide-react';
import CtoPageShell from '../CtoPageShell';
import DataTable, { StatusBadge } from '../../../components/common/DataTable/DataTable';

const kpis = [
  { label: 'Total Vendors', value: '47', icon: Building, color: 'text-blue-500' },
  { label: 'Active', value: '38', icon: CheckCircle2, color: 'text-emerald-500' },
  { label: 'Strategic', value: '12', icon: Star, color: 'text-purple-500' },
  { label: 'Avg Satisfaction', value: '4.2/5', icon: ThumbsUp, color: 'text-amber-500' },
];

const columns = [
  { key: 'name', label: 'Vendor Name', sortable: true },
  { key: 'category', label: 'Category', sortable: true },
  { key: 'contact', label: 'Contact' },
  { key: 'status', label: 'Status', render: (v) => <StatusBadge status={v} /> },
  { key: 'satisfaction', label: 'Satisfaction', sortable: true, render: (v) => <span className="text-amber-600 font-semibold">{v}/5</span> },
  { key: 'spend', label: 'Annual Spend', sortable: true },
  { key: 'contract', label: 'Contract End' },
];

const data = [
  { id: 1, name: 'Amazon Web Services', category: 'Cloud', contact: 'enterprise@aws.com', status: 'Active', satisfaction: 4.5, spend: '$1,200,000', contract: 'Dec 2026' },
  { id: 2, name: 'Microsoft', category: 'Cloud/Software', contact: 'ent@microsoft.com', status: 'Active', satisfaction: 4.2, spend: '$850,000', contract: 'Feb 2027' },
  { id: 3, name: 'Google Cloud', category: 'Cloud', contact: 'gcp-sales@google.com', status: 'Active', satisfaction: 4.0, spend: '$620,000', contract: 'May 2025' },
  { id: 4, name: 'Datadog', category: 'Monitoring', contact: 'support@datadoghq.com', status: 'Active', satisfaction: 4.8, spend: '$340,000', contract: 'Oct 2026' },
  { id: 5, name: 'Snowflake', category: 'Data', contact: 'sales@snowflake.com', status: 'Active', satisfaction: 4.3, spend: '$280,000', contract: 'Jan 2025' },
  { id: 6, name: 'Atlassian', category: 'Dev Tools', contact: 'ent@atlassian.com', status: 'Active', satisfaction: 3.8, spend: '$145,000', contract: 'Mar 2027' },
  { id: 7, name: 'GitHub', category: 'Dev Tools', contact: 'enterprise@github.com', status: 'Active', satisfaction: 4.6, spend: '$120,000', contract: 'Jul 2025' },
  { id: 8, name: 'JetBrains', category: 'Dev Tools', contact: 'sales@jetbrains.com', status: 'Active', satisfaction: 4.4, spend: '$96,000', contract: 'Nov 2025' },
  { id: 9, name: 'New Relic', category: 'Monitoring', contact: 'sales@newrelic.com', status: 'Active', satisfaction: 3.5, spend: '$82,000', contract: 'Jun 2025' },
  { id: 10, name: 'Elastic', category: 'Search', contact: 'ent@elastic.co', status: 'Active', satisfaction: 4.1, spend: '$64,000', contract: 'Aug 2026' },
];

const Vendors = () => (
  <CtoPageShell title="Vendors" description="Manage vendor relationships, contracts, and satisfaction scores">
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
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-4">Vendor Directory</h3>
        <DataTable columns={columns} data={data} searchable pageSize={10} />
      </div>
    </div>
  </CtoPageShell>
);

export default Vendors;


