// @ts-nocheck
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Shield, AlertTriangle, Bug, Ban, CheckCircle2, FileText } from 'lucide-react';
import CtoPageShell from '../CtoPageShell';
import DataTable, { StatusBadge } from '../../../components/common/DataTable/DataTable';

const kpis = [
  { label: 'Security Score', value: '96/100', sub: '+2 points this month', icon: Shield, color: 'text-emerald-500' },
  { label: 'Open Vulnerabilities', value: '12', sub: '2 critical', icon: Bug, color: 'text-amber-500' },
  { label: 'Critical', value: '2', sub: 'Requires immediate action', icon: AlertTriangle, color: 'text-red-500' },
  { label: 'Threats Blocked', value: '12,847', sub: 'Last 30 days', icon: Ban, color: 'text-blue-500' },
  { label: 'Compliance', value: '94%', sub: 'SOC 2, ISO 27001', icon: CheckCircle2, color: 'text-emerald-500' },
  { label: 'Audit Findings', value: '8', sub: '3 open, 5 resolved', icon: FileText, color: 'text-indigo-500' },
];

const scoreTrend = [
  { month: 'Feb', score: 92 }, { month: 'Mar', score: 93 }, { month: 'Apr', score: 94 },
  { month: 'May', score: 93 }, { month: 'Jun', score: 95 }, { month: 'Jul', score: 96 },
];

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'type', label: 'Type' },
  { key: 'severity', label: 'Severity', render: (v: string) => <StatusBadge status={v} /> },
  { key: 'source', label: 'Source' },
  { key: 'timestamp', label: 'Timestamp' },
  { key: 'status', label: 'Status', render: (v: string) => <StatusBadge status={v} /> },
  { key: 'action', label: 'Action' },
];

const data = [
  { id: 'SEC-001', type: 'Brute Force Attempt', severity: 'Critical', source: '185.220.101.42', timestamp: '2026-07-23 14:32:18', status: 'Blocked', action: 'IP Blocked' },
  { id: 'SEC-002', type: 'SQL Injection', severity: 'Critical', source: '103.235.46.88', timestamp: '2026-07-23 13:58:42', status: 'Blocked', action: 'WAF Blocked' },
  { id: 'SEC-003', type: 'Suspicious Login', severity: 'Warning', source: '45.33.32.156', timestamp: '2026-07-23 12:42:18', status: 'Investigating', action: 'MFA Challenge' },
  { id: 'SEC-004', type: 'Port Scan', severity: 'Warning', source: '198.51.100.23', timestamp: '2026-07-23 11:28:04', status: 'Blocked', action: 'IP Blocked' },
  { id: 'SEC-005', type: 'Malware Detected', severity: 'Critical', source: 'internal-host-42', timestamp: '2026-07-23 10:15:38', status: 'Contained', action: 'Quarantine' },
  { id: 'SEC-006', type: 'Unauthorized Access', severity: 'Warning', source: '192.168.1.105', timestamp: '2026-07-23 09:42:18', status: 'Investigating', action: 'Session Revoked' },
  { id: 'SEC-007', type: 'Data Exfiltration Attempt', severity: 'Critical', source: '10.0.0.45', timestamp: '2026-07-23 08:12:44', status: 'Blocked', action: 'DLP Policy' },
  { id: 'SEC-008', type: 'Policy Violation', severity: 'Info', source: 'user@company.com', timestamp: '2026-07-23 07:28:12', status: 'Resolved', action: 'User Notified' },
];

const SecurityDashboard: React.FC = () => {
  return (
    <CtoPageShell
      title="Security Dashboard"
      description="Security posture monitoring, threat detection, and compliance tracking"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-6">Security Score Trend</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={scoreTrend}>
              <defs>
                <linearGradient id="secGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
              <YAxis domain={[85, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dx={-10} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              <Area type="monotone" dataKey="score" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#secGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <DataTable columns={columns} data={data} searchable pageSize={10} />
    </CtoPageShell>
  );
};

export default SecurityDashboard;

