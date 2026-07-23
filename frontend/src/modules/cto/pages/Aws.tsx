import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Server, Database, FolderOpen, Code, Cloud, Globe, DollarSign } from 'lucide-react';
import CtoPageShell from '../CtoPageShell';
import DataTable, { StatusBadge } from '../../../components/common/DataTable/DataTable';

const kpiData = [
  { label: 'EC2 Instances', value: '24', sub: 'Across all regions', icon: Server, color: 'text-blue-500' },
  { label: 'RDS', value: '8', sub: 'PostgreSQL, MySQL, Aurora', icon: Database, color: 'text-emerald-500' },
  { label: 'S3 Buckets', value: '42', sub: 'Data lake & backups', icon: FolderOpen, color: 'text-amber-500' },
  { label: 'Lambda Functions', value: '128', sub: 'Serverless compute', icon: Code, color: 'text-indigo-500' },
];

const awsCost = [
  { service: 'EC2', cost: 42.5 },
  { service: 'RDS', cost: 18.2 },
  { service: 'S3', cost: 24.8 },
  { service: 'Lambda', cost: 12.4 },
  { service: 'ECS/EKS', cost: 16.2 },
  { service: 'CloudFront', cost: 8.6 },
  { service: 'ElastiCache', cost: 6.4 },
  { service: 'Other', cost: 12.9 },
];

const awsColumns = [
  { key: 'name', label: 'Resource Name' },
  { key: 'type', label: 'Type' },
  { key: 'region', label: 'Region' },
  { key: 'status', label: 'Status', render: (v) => <StatusBadge status={v} /> },
  { key: 'cost', label: 'Cost/Month' },
];

const awsData = [
  { name: 'web-server-01', type: 'EC2', region: 'us-east-1', status: 'Running', cost: '$1,240' },
  { name: 'web-server-02', type: 'EC2', region: 'us-east-1', status: 'Running', cost: '$1,240' },
  { name: 'db-primary', type: 'RDS', region: 'us-east-1', status: 'Active', cost: '$3,850' },
  { name: 'db-replica', type: 'RDS', region: 'us-west-2', status: 'Active', cost: '$2,180' },
  { name: 'data-lake', type: 'S3', region: 'us-east-1', status: 'Active', cost: '$4,200' },
  { name: 'auth-function', type: 'Lambda', region: 'eu-west-1', status: 'Active', cost: '$340' },
  { name: 'payment-processor', type: 'Lambda', region: 'us-east-1', status: 'Active', cost: '$890' },
  { name: 'eks-cluster-prod', type: 'EKS', region: 'us-east-1', status: 'Active', cost: '$5,600' },
  { name: 'cdn-distribution', type: 'CloudFront', region: 'Global', status: 'Active', cost: '$2,100' },
];

const Aws = () => (
  <CtoPageShell title="AWS Cloud" description="Amazon Web Services resource inventory and cost tracking" breadcrumbs={[{ label: 'CTO Dashboard', path: '/cto/executive-overview' }, { label: 'AWS Cloud' }]}>
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
            <BarChart data={awsCost} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
              <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
              <YAxis type="category" dataKey="service" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} width={100} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
              <Bar dataKey="cost" fill="#ff9900" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-6">AWS Resources</h3>
        <DataTable columns={awsColumns} data={awsData} pageSize={5} searchable />
      </div>
    </div>
  </CtoPageShell>
);

export default Aws;

