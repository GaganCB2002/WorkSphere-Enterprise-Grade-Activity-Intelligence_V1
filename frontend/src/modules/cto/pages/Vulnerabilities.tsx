// @ts-nocheck
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Bug, AlertTriangle, Shield, ShieldAlert, Info } from 'lucide-react';
import CtoPageShell from '../CtoPageShell';
import DataTable, { StatusBadge } from '../../../components/common/DataTable/DataTable';

const kpis = [
  { label: 'Total', value: '47', sub: 'Across all packages', icon: Bug, color: 'text-slate-500' },
  { label: 'Critical', value: '2', sub: 'Patch available', icon: ShieldAlert, color: 'text-red-500' },
  { label: 'High', value: '8', sub: 'Requires attention', icon: AlertTriangle, color: 'text-amber-500' },
  { label: 'Medium', value: '24', sub: 'Schedule remediation', icon: Shield, color: 'text-blue-500' },
  { label: 'Low', value: '13', sub: 'Monitor only', icon: Info, color: 'text-slate-400' },
];

const severityChart = [
  { severity: 'Critical', count: 2, fill: '#ef4444' },
  { severity: 'High', count: 8, fill: '#f59e0b' },
  { severity: 'Medium', count: 24, fill: '#3b82f6' },
  { severity: 'Low', count: 13, fill: '#94a3b8' },
];

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'cve', label: 'CVE' },
  { key: 'severity', label: 'Severity', render: (v: string) => <StatusBadge status={v} /> },
  { key: 'package', label: 'Package' },
  { key: 'affectedVersion', label: 'Affected Version' },
  { key: 'fixVersion', label: 'Fix Version' },
  { key: 'status', label: 'Status', render: (v: string) => <StatusBadge status={v} /> },
];

const data = [
  { id: 'VUL-001', cve: 'CVE-2026-1234', severity: 'Critical', package: 'openssl', affectedVersion: '1.1.1k', fixVersion: '1.1.1l', status: 'Open' },
  { id: 'VUL-002', cve: 'CVE-2026-5678', severity: 'Critical', package: 'log4j-core', affectedVersion: '2.14.1', fixVersion: '2.17.0', status: 'In Progress' },
  { id: 'VUL-003', cve: 'CVE-2026-9012', severity: 'High', package: 'node-fetch', affectedVersion: '2.6.1', fixVersion: '3.0.0', status: 'Open' },
  { id: 'VUL-004', cve: 'CVE-2026-3456', severity: 'High', package: 'express', affectedVersion: '4.17.1', fixVersion: '4.18.0', status: 'In Progress' },
  { id: 'VUL-005', cve: 'CVE-2026-7890', severity: 'High', package: 'lodash', affectedVersion: '4.17.20', fixVersion: '4.17.21', status: 'Open' },
  { id: 'VUL-006', cve: 'CVE-2026-1230', severity: 'Medium', package: 'axios', affectedVersion: '0.21.1', fixVersion: '0.21.4', status: 'In Progress' },
  { id: 'VUL-007', cve: 'CVE-2026-4567', severity: 'Medium', package: 'moment', affectedVersion: '2.29.1', fixVersion: '2.29.4', status: 'Resolved' },
  { id: 'VUL-008', cve: 'CVE-2026-8901', severity: 'Medium', package: 'lodash', affectedVersion: '4.17.20', fixVersion: '4.17.21', status: 'Resolved' },
  { id: 'VUL-009', cve: 'CVE-2026-2345', severity: 'Low', package: 'debug', affectedVersion: '4.3.1', fixVersion: '4.3.3', status: 'Resolved' },
  { id: 'VUL-010', cve: 'CVE-2026-6789', severity: 'Low', package: 'minimist', affectedVersion: '1.2.5', fixVersion: '1.2.6', status: 'Resolved' },
];

const Vulnerabilities: React.FC = () => {
  return (
    <CtoPageShell
      title="Vulnerabilities"
      description="Track and manage security vulnerabilities across the stack"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
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
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-6">Vulnerabilities by Severity</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={severityChart}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="severity" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dx={-10} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                {severityChart.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <DataTable columns={columns} data={data} searchable pageSize={10} />
    </CtoPageShell>
  );
};

export default Vulnerabilities;

