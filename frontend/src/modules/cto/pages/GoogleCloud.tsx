import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Monitor, Database, FolderOpen, Code, Cloud, Globe, DollarSign } from 'lucide-react';
import CtoPageShell from '../CtoPageShell';
import DataTable, { StatusBadge } from '../../../components/common/DataTable/DataTable';

const kpiData = [
  { label: 'Compute Instances', value: '12', sub: 'GCE & GKE nodes', icon: Monitor, color: 'text-blue-500' },
  { label: 'Cloud SQL', value: '4', sub: 'PostgreSQL & MySQL', icon: Database, color: 'text-emerald-500' },
  { label: 'Storage Buckets', value: '18', sub: 'GCS multi-region', icon: FolderOpen, color: 'text-amber-500' },
  { label: 'Cloud Functions', value: '32', sub: '2nd gen functions', icon: Code, color: 'text-indigo-500' },
];

const gcpCost = [
  { service: 'Compute Engine', cost: 18.6 },
  { service: 'Cloud SQL', cost: 8.4 },
  { service: 'Cloud Storage', cost: 6.2 },
  { service: 'Cloud Functions', cost: 4.8 },
  { service: 'GKE', cost: 7.2 },
  { service: 'Cloud CDN', cost: 2.1 },
  { service: 'Other', cost: 11.0 },
];

const gcpColumns = [
  { key: 'name', label: 'Resource Name' },
  { key: 'type', label: 'Type' },
  { key: 'region', label: 'Region' },
  { key: 'status', label: 'Status', render: (v: any) => <StatusBadge status={v} /> },
  { key: 'cost', label: 'Cost/Month' },
];

const gcpData = [
  { name: 'web-server-01', type: 'Compute Engine', region: 'us-central1', status: 'Running', cost: '$640' },
  { name: 'web-server-02', type: 'Compute Engine', region: 'us-central1', status: 'Running', cost: '$640' },
  { name: 'app-server-01', type: 'Compute Engine', region: 'europe-west1', status: 'Running', cost: '$980' },
  { name: 'sql-primary', type: 'Cloud SQL', region: 'us-central1', status: 'Active', cost: '$2,400' },
  { name: 'sql-replica', type: 'Cloud SQL', region: 'europe-west1', status: 'Active', cost: '$1,200' },
  { name: 'data-lake', type: 'Cloud Storage', region: 'US', status: 'Active', cost: '$1,680' },
  { name: 'backup-bucket', type: 'Cloud Storage', region: 'US', status: 'Active', cost: '$520' },
  { name: 'image-processor', type: 'Cloud Function', region: 'us-central1', status: 'Active', cost: '$180' },
  { name: 'gke-cluster-prod', type: 'GKE', region: 'us-central1', status: 'Active', cost: '$2,800' },
];

const GoogleCloud = () => (
  <CtoPageShell title="Google Cloud Platform" description="GCP resource inventory, usage, and cost tracking" breadcrumbs={[{ label: 'CTO Dashboard', path: '/cto/executive-overview' }, { label: 'Google Cloud' }]}>
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
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-6">Monthly Cost by Service ($K)</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={gcpCost} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
              <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
              <YAxis type="category" dataKey="service" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} width={120} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
              <Bar dataKey="cost" fill="#4285f4" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-6">GCP Resources</h3>
        <DataTable columns={gcpColumns} data={gcpData} pageSize={5} searchable />
      </div>
    </div>
  </CtoPageShell>
);

export default GoogleCloud;


