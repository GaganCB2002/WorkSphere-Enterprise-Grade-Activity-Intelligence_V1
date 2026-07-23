import React from 'react';
import { motion } from 'framer-motion';
import { Clock, CheckCircle2, XCircle, GitPullRequest } from 'lucide-react';
import CtoPageShell from '../CtoPageShell';
import DataTable, { StatusBadge } from '../../../components/common/DataTable/DataTable';

const kpis = [
  { label: 'Pending Approval', value: '4', icon: Clock, color: 'text-amber-500' },
  { label: 'Approved Today', value: '2', icon: CheckCircle2, color: 'text-emerald-500' },
  { label: 'Rejected', value: '1', icon: XCircle, color: 'text-red-500' },
  { label: 'Total', value: '847', icon: GitPullRequest, color: 'text-blue-500' },
];

const columns = [
  { key: 'id', label: 'Deployment ID', sortable: true },
  { key: 'service', label: 'Service', sortable: true },
  { key: 'version', label: 'Version' },
  { key: 'environment', label: 'Environment' },
  { key: 'requester', label: 'Requester', sortable: true },
  { key: 'status', label: 'Status', render: (v) => <StatusBadge status={v} /> },
  { key: 'date', label: 'Date' },
];

const data = [
  { id: 'DEP-4521', service: 'API Gateway', version: 'v3.2.1', environment: 'Production', requester: 'Alice Chen', status: 'Pending', date: '2025-07-23' },
  { id: 'DEP-4520', service: 'Order Service', version: 'v2.8.0', environment: 'Production', requester: 'Bob Kumar', status: 'Approved', date: '2025-07-23' },
  { id: 'DEP-4519', service: 'Auth Service', version: 'v4.1.2', environment: 'GitBranch', requester: 'Carol Davis', status: 'Approved', date: '2025-07-23' },
  { id: 'DEP-4518', service: 'Payment Service', version: 'v1.9.5', environment: 'Production', requester: 'David Lee', status: 'Pending', date: '2025-07-22' },
  { id: 'DEP-4517', service: 'User Service', version: 'v5.0.0', environment: 'Production', requester: 'Eve Martinez', status: 'Rejected', date: '2025-07-22' },
  { id: 'DEP-4516', service: 'Notification Service', version: 'v2.3.1', environment: 'GitBranch', requester: 'Frank Wilson', status: 'Pending', date: '2025-07-22' },
  { id: 'DEP-4515', service: 'Search Service', version: 'v3.0.2', environment: 'Production', requester: 'Grace Kim', status: 'Pending', date: '2025-07-21' },
  { id: 'DEP-4514', service: 'Analytics Service', version: 'v1.7.3', environment: 'Production', requester: 'Henry Jones', status: 'Approved', date: '2025-07-21' },
];

const ProductionDeployments = () => (
  <CtoPageShell title="Production Deployments" description="Manage production deployment approvals and release tracking">
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
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-4">Deployment Approvals</h3>
        <DataTable columns={columns} data={data} searchable pageSize={8} />
      </div>
    </div>
  </CtoPageShell>
);

export default ProductionDeployments;


