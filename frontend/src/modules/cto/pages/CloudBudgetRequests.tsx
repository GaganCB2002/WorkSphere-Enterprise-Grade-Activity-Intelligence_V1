import React from 'react';
import { motion } from 'framer-motion';
import { Clock, CheckCircle2, DollarSign, TrendingUp } from 'lucide-react';
import CtoPageShell from '../CtoPageShell';
import DataTable, { StatusBadge } from '../../../components/common/DataTable/DataTable';

const kpis = [
  { label: 'Pending', value: '4', icon: Clock, color: 'text-amber-500' },
  { label: 'Approved', value: '8', icon: CheckCircle2, color: 'text-emerald-500' },
  { label: 'Total Requested', value: '$847K', icon: DollarSign, color: 'text-blue-500' },
  { label: 'Budget Remaining', value: '$1.2M', icon: TrendingUp, color: 'text-purple-500' },
];

const columns = [
  { key: 'id', label: 'Request ID', sortable: true },
  { key: 'department', label: 'Department', sortable: true },
  { key: 'service', label: 'Cloud Service', sortable: true },
  { key: 'requested', label: 'Requested', sortable: true, render: (v: any) => <span className="text-blue-600 font-semibold">{v}</span> },
  { key: 'approved', label: 'Approved', sortable: true },
  { key: 'status', label: 'Status', render: (v: any) => <StatusBadge status={v} /> },
  { key: 'date', label: 'Date' },
];

const data = [
  { id: 'BGT-001', department: 'Engineering', service: 'AWS EC2', requested: '$240,000', approved: '$220,000', status: 'Approved', date: '2025-07-20' },
  { id: 'BGT-002', department: 'Data Platform', service: 'Snowflake', requested: '$180,000', approved: '$160,000', status: 'Approved', date: '2025-07-19' },
  { id: 'BGT-003', department: 'AI/ML', service: 'GPU Compute', requested: '$320,000', approved: '-', status: 'Pending', date: '2025-07-18' },
  { id: 'BGT-004', department: 'Infrastructure', service: 'Azure VMs', requested: '$95,000', approved: '$95,000', status: 'Approved', date: '2025-07-17' },
  { id: 'BGT-005', department: 'Security', service: 'GCP Security', requested: '$72,000', approved: '$60,000', status: 'Approved', date: '2025-07-16' },
  { id: 'BGT-006', department: 'DevOps', service: 'Monitoring Tools', requested: '$45,000', approved: '-', status: 'Pending', date: '2025-07-16' },
  { id: 'BGT-007', department: 'Engineering', service: 'API Gateway', requested: '$120,000', approved: '$110,000', status: 'Approved', date: '2025-07-15' },
  { id: 'BGT-008', department: 'Data Platform', service: 'BigQuery', requested: '$200,000', approved: '-', status: 'Pending', date: '2025-07-14' },
  { id: 'BGT-009', department: 'Infrastructure', service: 'CloudFront CDN', requested: '$60,000', approved: '$60,000', status: 'Approved', date: '2025-07-13' },
  { id: 'BGT-010', department: 'AI/ML', service: 'Vertex AI', requested: '$150,000', approved: '-', status: 'Pending', date: '2025-07-12' },
];

const CloudBudgetRequests = () => (
  <CtoPageShell title="Cloud Budget Requests" description="Manage cloud budget allocation requests and approval workflow">
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
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-4">Budget Requests</h3>
        <DataTable columns={columns} data={data} searchable pageSize={10} />
      </div>
    </div>
  </CtoPageShell>
);

export default CloudBudgetRequests;


