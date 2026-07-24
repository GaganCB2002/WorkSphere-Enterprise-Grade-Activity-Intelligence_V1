import React from 'react';
import { motion } from 'framer-motion';
import { Clock, CheckCircle2, XCircle, PlayCircle } from 'lucide-react';
import CtoPageShell from '../CtoPageShell';
import DataTable, { StatusBadge } from '../../../components/common/DataTable/DataTable';

const kpis = [
  { label: 'Pending', value: '8', icon: Clock, color: 'text-amber-500' },
  { label: 'Approved', value: '12', icon: CheckCircle2, color: 'text-emerald-500' },
  { label: 'Rejected', value: '3', icon: XCircle, color: 'text-red-500' },
  { label: 'In Progress', value: '4', icon: PlayCircle, color: 'text-blue-500' },
];

const columns = [
  { key: 'id', label: 'Request ID', sortable: true },
  { key: 'requester', label: 'Requester', sortable: true },
  { key: 'type', label: 'Type', sortable: true },
  { key: 'resource', label: 'Resource', sortable: true },
  { key: 'priority', label: 'Priority', render: (v: any) => <StatusBadge status={v} /> },
  { key: 'status', label: 'Status', render: (v: any) => <StatusBadge status={v} /> },
  { key: 'date', label: 'Date' },
];

const data = [
  { id: 'REQ-001', requester: 'Alice Chen', type: 'Compute', resource: '12x EC2 Instances', priority: 'Critical', status: 'Pending', date: '2025-07-20' },
  { id: 'REQ-002', requester: 'Bob Kumar', type: 'Storage', resource: '50TB S3 Bucket', priority: 'High', status: 'Approved', date: '2025-07-19' },
  { id: 'REQ-003', requester: 'Carol Davis', type: 'Network', resource: 'Load Balancer Upgrade', priority: 'Medium', status: 'In Progress', date: '2025-07-18' },
  { id: 'REQ-004', requester: 'David Lee', type: 'Database', resource: 'PostgreSQL Read Replica', priority: 'High', status: 'Pending', date: '2025-07-18' },
  { id: 'REQ-005', requester: 'Eve Martinez', type: 'Security', resource: 'WAF Configuration', priority: 'Critical', status: 'Approved', date: '2025-07-17' },
  { id: 'REQ-006', requester: 'Frank Wilson', type: 'Compute', resource: 'GPU Cluster - 8x A100', priority: 'Low', status: 'Rejected', date: '2025-07-16' },
  { id: 'REQ-007', requester: 'Grace Kim', type: 'Storage', resource: 'Archive Bucket - 100TB', priority: 'Medium', status: 'Pending', date: '2025-07-16' },
  { id: 'REQ-008', requester: 'Henry Jones', type: 'Network', resource: 'VPN Tunnel Setup', priority: 'High', status: 'In Progress', date: '2025-07-15' },
  { id: 'REQ-009', requester: 'Iris Patel', type: 'Compute', resource: 'K8s Node Pool - 20 nodes', priority: 'High', status: 'Pending', date: '2025-07-15' },
  { id: 'REQ-010', requester: 'Jack Thompson', type: 'Database', resource: 'Redis Cluster Expansion', priority: 'Medium', status: 'Approved', date: '2025-07-14' },
];

const InfrastructureRequests = () => (
  <CtoPageShell title="Infrastructure Requests" description="Manage infrastructure resource requests and approvals">
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
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-4">Infrastructure Requests</h3>
        <DataTable columns={columns} data={data} searchable pageSize={10} />
      </div>
    </div>
  </CtoPageShell>
);

export default InfrastructureRequests;


