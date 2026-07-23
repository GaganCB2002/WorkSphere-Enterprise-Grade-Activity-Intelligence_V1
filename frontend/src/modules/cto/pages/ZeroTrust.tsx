import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Shield, Monitor, Users, AlertTriangle } from 'lucide-react';
import CtoPageShell from '../CtoPageShell';
import DataTable, { StatusBadge } from '../../../components/common/DataTable/DataTable';

const kpis = [
  { label: 'Trust Score', value: '94%', sub: '+2% this month', icon: Shield, color: 'text-emerald-500' },
  { label: 'Verified Devices', value: '847', sub: 'All compliant', icon: Monitor, color: 'text-blue-500' },
  { label: 'Active Sessions', value: '1,247', sub: 'All authenticated', icon: Users, color: 'text-indigo-500' },
  { label: 'Policy Violations', value: '8', sub: '3 critical', icon: AlertTriangle, color: 'text-red-500' },
];

const accessData = [
  { name: 'Allowed', value: 847, color: '#10b981' },
  { name: 'Blocked', value: 124, color: '#ef4444' },
  { name: 'MFA Required', value: 342, color: '#f59e0b' },
  { name: 'Pending Review', value: 47, color: '#3b82f6' },
];

const columns = [
  { key: 'name', label: 'Policy Name' },
  { key: 'resource', label: 'Resource' },
  { key: 'condition', label: 'Condition' },
  { key: 'action', label: 'Action' },
  { key: 'users', label: 'Users' },
  { key: 'status', label: 'Status', render: (v: string) => <StatusBadge status={v} /> },
];

const data = [
  { name: 'Strict Access Control', resource: 'Production DB', condition: 'Device Trust + MFA', action: 'Allow', users: '24', status: 'Active' },
  { name: 'Zero Trust Network', resource: 'Internal Apps', condition: 'Device Posture + SSO', action: 'Allow', users: '847', status: 'Active' },
  { name: 'Privileged Access', resource: 'Admin Panel', condition: 'JIT + MFA + Approval', action: 'Allow', users: '12', status: 'Active' },
  { name: 'API Gateway Policy', resource: 'External APIs', condition: 'OAuth + Rate Limit', action: 'Allow', users: 'All', status: 'Active' },
  { name: 'Data Exfiltration', resource: 'Sensitive Data', condition: 'DLP + Device Trust', action: 'Block', users: 'All', status: 'Active' },
  { name: 'Unmanaged Device', resource: 'All Resources', condition: 'Device Compliance', action: 'Block', users: 'All', status: 'Active' },
  { name: 'Third-Party Access', resource: 'External APIs', condition: 'JIT + MFA + Audit', action: 'Allow', users: '24', status: 'Active' },
];

const ZeroTrust: React.FC = () => {
  return (
    <CtoPageShell
      title="Zero Trust"
      description="Zero Trust architecture monitoring and policy management"
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-6">Access Control Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={accessData} cx="50%" cy="50%" outerRadius={80} paddingAngle={4} dataKey="value">
                  {accessData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 mt-4">
            {accessData.map((s, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: s.color }} />
                <span className="text-xs font-medium text-slate-600 dark:text-slate-400">{s.name} ({s.value})</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <DataTable columns={columns} data={data} searchable pageSize={10} />
    </CtoPageShell>
  );
};

export default ZeroTrust;
