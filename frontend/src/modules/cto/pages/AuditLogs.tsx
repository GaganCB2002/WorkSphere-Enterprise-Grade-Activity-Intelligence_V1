import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, Calendar, Ban, Users } from 'lucide-react';
import CtoPageShell from '../CtoPageShell';
import DataTable, { StatusBadge } from '../../../components/common/DataTable/DataTable';

const kpis = [
  { label: 'Total Events', value: '247,892', sub: 'All-time audit trail', icon: Activity, color: 'text-blue-500' },
  { label: 'Today', value: '1,247', sub: '+8% from yesterday', icon: Calendar, color: 'text-emerald-500' },
  { label: 'Failed Actions', value: '12', sub: 'Requires investigation', icon: Ban, color: 'text-red-500' },
  { label: 'User Actions', value: '847', sub: '68% of total events', icon: Users, color: 'text-indigo-500' },
];

const auditByType = [
  { type: 'Login', count: 847 }, { type: 'CRUD', count: 524 }, { type: 'Admin', count: 184 },
  { type: 'Config', count: 92 }, { type: 'Security', count: 47 }, { type: 'System', count: 38 },
];

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'user', label: 'User' },
  { key: 'action', label: 'Action' },
  { key: 'resource', label: 'Resource' },
  { key: 'ip', label: 'IP Address' },
  { key: 'timestamp', label: 'Timestamp' },
  { key: 'status', label: 'Status', render: (v: string) => <StatusBadge status={v} /> },
];

const data = [
  { id: 'AUD-001', user: 'john.doe', action: 'Login', resource: 'Admin Portal', ip: '10.0.0.42', timestamp: '2026-07-23 14:32:18', status: 'Success' },
  { id: 'AUD-002', user: 'jane.smith', action: 'Update', resource: 'User Profile #4821', ip: '10.0.0.105', timestamp: '2026-07-23 14:28:04', status: 'Success' },
  { id: 'AUD-003', user: 'admin', action: 'Delete', resource: 'API Key #847', ip: '10.0.0.1', timestamp: '2026-07-23 14:15:42', status: 'Success' },
  { id: 'AUD-004', user: 'john.doe', action: 'Create', resource: 'Deployment #1247', ip: '10.0.0.42', timestamp: '2026-07-23 13:58:18', status: 'Success' },
  { id: 'AUD-005', user: 'jane.smith', action: 'Update', resource: 'Config #env-prod', ip: '10.0.0.105', timestamp: '2026-07-23 13:42:08', status: 'Failed' },
  { id: 'AUD-006', user: 'admin', action: 'Delete', resource: 'User Account #847', ip: '10.0.0.1', timestamp: '2026-07-23 13:28:44', status: 'Success' },
  { id: 'AUD-007', user: 'john.doe', action: 'Export', resource: 'Report Q2-2026', ip: '10.0.0.42', timestamp: '2026-07-23 12:58:22', status: 'Success' },
  { id: 'AUD-008', user: 'jane.smith', action: 'Update', resource: 'Role #admin', ip: '10.0.0.105', timestamp: '2026-07-23 12:42:08', status: 'Failed' },
  { id: 'AUD-009', user: 'admin', action: 'Config Change', resource: 'Firewall Rule #847', ip: '10.0.0.1', timestamp: '2026-07-23 12:18:44', status: 'Success' },
  { id: 'AUD-010', user: 'john.doe', action: 'Login', resource: 'Admin Portal', ip: '10.0.0.42', timestamp: '2026-07-23 12:00:00', status: 'Success' },
];

const AuditLogs: React.FC = () => {
  return (
    <CtoPageShell
      title="Audit Logs"
      description="Comprehensive audit trail of all system activities and user actions"
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

      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-6">Audit Events by Type</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={auditByType}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="type" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dx={-10} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <DataTable columns={columns} data={data} searchable pageSize={10} />
    </CtoPageShell>
  );
};

export default AuditLogs;

