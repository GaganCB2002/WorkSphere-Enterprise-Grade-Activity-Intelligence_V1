import React from 'react';
import { Key, Shield, RefreshCw, Users } from 'lucide-react';
import CtoPageShell from '../CtoPageShell';
import DataTable, { StatusBadge } from '../../../components/common/DataTable/DataTable';

const kpis = [
  { label: 'Secrets Managed', value: '847', sub: 'Across all vaults', icon: Key, color: 'text-blue-500' },
  { label: 'Vaults', value: '4', sub: 'Active vaults', icon: Shield, color: 'text-purple-500' },
  { label: 'Rotation Active', value: '342', sub: 'Auto-rotation enabled', icon: RefreshCw, color: 'text-emerald-500' },
  { label: 'Access Requests', value: '24', sub: 'Pending approval', icon: Users, color: 'text-amber-500' },
];

const columns = [
  { key: 'name', label: 'Secret Name' },
  { key: 'type', label: 'Type' },
  { key: 'Shield', label: 'Shield' },
  { key: 'rotation', label: 'Rotation' },
  { key: 'lastRotated', label: 'Last Rotated' },
  { key: 'status', label: 'Status', render: (v: string) => <StatusBadge status={v} /> },
];

const data = [
  { name: 'DB_PROD_PASSWORD', type: 'Password', Shield: 'HashiCorp Shield', rotation: '30 days', lastRotated: '12d ago', status: 'Active' },
  { name: 'API_GATEWAY_KEY', type: 'API Key', Shield: 'AWS Secrets Manager', rotation: '90 days', lastRotated: '45d ago', status: 'Active' },
  { name: 'JWT_SIGNING_KEY', type: 'Certificate', Shield: 'HashiCorp Shield', rotation: '180 days', lastRotated: '120d ago', status: 'Active' },
  { name: 'DB_ENCRYPTION_KEY', type: 'Encryption Key', Shield: 'Azure Key Shield', rotation: '365 days', lastRotated: '200d ago', status: 'Active' },
  { name: 'STRIPE_API_KEY', type: 'API Key', Shield: 'HashiCorp Shield', rotation: '90 days', lastRotated: '60d ago', status: 'Active' },
  { name: 'SENDGRID_API_KEY', type: 'API Key', Shield: 'AWS Secrets Manager', rotation: '90 days', lastRotated: '75d ago', status: 'Active' },
  { name: 'GITHUB_TOKEN', type: 'Token', Shield: 'GitHub Actions', rotation: 'Manual', lastRotated: '30d ago', status: 'Active' },
  { name: 'SSH_PRIVATE_KEY', type: 'SSH Key', Shield: 'HashiCorp Shield', rotation: '180 days', lastRotated: '150d ago', status: 'Active' },
  { name: 'SLACK_WEBHOOK', type: 'Webhook', Shield: 'AWS Secrets Manager', rotation: 'Manual', lastRotated: '60d ago', status: 'Active' },
  { name: 'DOCKER_REGISTRY', type: 'Password', Shield: 'Kubernetes Secrets', rotation: '90 days', lastRotated: '45d ago', status: 'Active' },
];

const SecretsManagement: React.FC = () => {
  return (
    <CtoPageShell
      title="Secrets Management"
      description="Manage secrets, vaults, and access policies across the organization"
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

export default SecretsManagement;


