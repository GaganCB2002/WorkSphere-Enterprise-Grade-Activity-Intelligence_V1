import React from 'react';
import { Layers, Box, Server, AlertTriangle } from 'lucide-react';
import CtoPageShell from '../CtoPageShell';
import DataTable, { StatusBadge } from '../../../components/common/DataTable/DataTable';

const kpis = [
  { label: 'Terraform Workspaces', value: '12', sub: 'Across all environments', icon: Layers, color: 'text-purple-500' },
  { label: 'Modules', value: '47', sub: 'Reusable infrastructure', icon: Box, color: 'text-blue-500' },
  { label: 'Resources Managed', value: '847', sub: 'All cloud providers', icon: Server, color: 'text-emerald-500' },
  { label: 'Drift Detected', value: '3', sub: 'Needs remediation', icon: AlertTriangle, color: 'text-amber-500' },
];

const columns = [
  { key: 'name', label: 'Resource Name' },
  { key: 'type', label: 'Type' },
  { key: 'provider', label: 'Provider' },
  { key: 'status', label: 'Status', render: (v: string) => <StatusBadge status={v} /> },
  { key: 'lastUpdated', label: 'Last Updated' },
  { key: 'version', label: 'Version' },
];

const data = [
  { name: 'vpc-prod', type: 'VPC', provider: 'AWS', status: 'Synced', lastUpdated: '2h ago', version: '1.2.0' },
  { name: 'eks-cluster', type: 'EKS Cluster', provider: 'AWS', status: 'Synced', lastUpdated: '4h ago', version: '2.0.1' },
  { name: 'rds-primary', type: 'RDS Instance', provider: 'AWS', status: 'Drifted', lastUpdated: '1d ago', version: '1.5.0' },
  { name: 'redis-cache', type: 'ElastiCache', provider: 'AWS', status: 'Synced', lastUpdated: '6h ago', version: '1.2.0' },
  { name: 'gke-cluster', type: 'GKE Cluster', provider: 'GCP', status: 'Synced', lastUpdated: '3h ago', version: '2.1.0' },
  { name: 'cloud-sql', type: 'Cloud SQL', provider: 'GCP', status: 'Drifted', lastUpdated: '2d ago', version: '1.0.0' },
  { name: 'aks-cluster', type: 'AKS Cluster', provider: 'Azure', status: 'Synced', lastUpdated: '6h ago', version: '1.3.0' },
  { name: 's3-buckets', type: 'S3 Bucket', provider: 'AWS', status: 'Synced', lastUpdated: '12h ago', version: '2.0.0' },
  { name: 'iam-roles', type: 'IAM Role', provider: 'AWS', status: 'Drifted', lastUpdated: '3d ago', version: '1.1.0' },
  { name: 'dns-zones', type: 'Route53 Zone', provider: 'AWS', status: 'Synced', lastUpdated: '1w ago', version: '1.0.0' },
];

const IaC: React.FC = () => {
  return (
    <CtoPageShell
      title="Infrastructure as Code"
      description="Manage Terraform workspaces, modules, and infrastructure drift detection"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{kpi.label}</div>
                <div className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">{kpi.value}</div>
              </div>
              <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
            </div>
            <div className="text-xs font-semibold text-slate-500 mt-4">{kpi.sub}</div>
          </div>
        ))}
      </div>

      <DataTable columns={columns} data={data} searchable pageSize={10} />
    </CtoPageShell>
  );
};

export default IaC;

