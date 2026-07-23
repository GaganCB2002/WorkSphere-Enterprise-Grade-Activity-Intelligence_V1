// @ts-nocheck
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AlertCircle, AlertTriangle, Info, Bug } from 'lucide-react';
import CtoPageShell from '../CtoPageShell';
import DataTable, { StatusBadge } from '../../../components/common/DataTable/DataTable';

const kpis = [
  { label: 'Total Errors', value: '1,247', sub: 'Last 30 days', icon: Bug, color: 'text-slate-500' },
  { label: 'Critical', value: '12', sub: 'Requires immediate action', icon: AlertCircle, color: 'text-red-500' },
  { label: 'Warning', value: '342', sub: 'Needs review', icon: AlertTriangle, color: 'text-amber-500' },
  { label: 'Info', value: '893', sub: 'Logged for reference', icon: Info, color: 'text-blue-500' },
];

const errorTrend = [
  { day: 'Mon', errors: 185 }, { day: 'Tue', errors: 220 }, { day: 'Wed', errors: 168 },
  { day: 'Thu', errors: 195 }, { day: 'Fri', errors: 247 }, { day: 'Sat', errors: 142 },
  { day: 'Sun', errors: 90 },
];

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'service', label: 'Service' },
  { key: 'severity', label: 'Severity', render: (v: string) => <StatusBadge status={v} /> },
  { key: 'message', label: 'Message' },
  { key: 'timestamp', label: 'Timestamp' },
  { key: 'source', label: 'Source' },
  { key: 'status', label: 'Status', render: (v: string) => <StatusBadge status={v} /> },
];

const data = [
  { id: 'ERR-001', service: 'API Gateway', severity: 'Critical', message: 'Connection pool exhausted', timestamp: '2026-07-23 14:32:18', source: 'api-gateway-01', status: 'Open' },
  { id: 'ERR-002', service: 'Auth Service', severity: 'Warning', message: 'Rate limit approaching threshold', timestamp: '2026-07-23 14:28:04', source: 'auth-02', status: 'Acknowledged' },
  { id: 'ERR-003', service: 'Database', severity: 'Critical', message: 'Replication lag exceeded 30s', timestamp: '2026-07-23 14:15:42', source: 'db-primary', status: 'Open' },
  { id: 'ERR-004', service: 'Payment Service', severity: 'Info', message: 'Payment retry attempt #3', timestamp: '2026-07-23 14:12:18', source: 'payment-01', status: 'Resolved' },
  { id: 'ERR-005', service: 'Search Service', severity: 'Warning', message: 'Index rebuild taking longer than expected', timestamp: '2026-07-23 13:58:22', source: 'search-02', status: 'Acknowledged' },
  { id: 'ERR-006', service: 'Auth Service', severity: 'Critical', message: 'OAuth token validation failure spike', timestamp: '2026-07-23 13:42:08', source: 'auth-01', status: 'Open' },
  { id: 'ERR-007', service: 'Notification', severity: 'Info', message: 'Email queue backlog: 1,247 messages', timestamp: '2026-07-23 13:28:44', source: 'notif-03', status: 'Resolved' },
  { id: 'ERR-008', service: 'Database', severity: 'Warning', message: 'Slow query detected (12.4s)', timestamp: '2026-07-23 13:12:18', source: 'db-replica-01', status: 'Acknowledged' },
  { id: 'ERR-009', service: 'Search Service', severity: 'Info', message: 'Index refresh completed', timestamp: '2026-07-23 12:58:02', source: 'search-01', status: 'Resolved' },
  { id: 'ERR-010', service: 'API Gateway', severity: 'Warning', message: 'Rate limit exceeded for IP 192.168.1.42', timestamp: '2026-07-23 12:42:38', source: 'api-gateway-02', status: 'Acknowledged' },
];

const ErrorLogs: React.FC = () => {
  return (
    <CtoPageShell
      title="Error Logs"
      description="Centralized error logging and monitoring across all services"
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
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-6">Error Trend (7 Days)</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={errorTrend}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dx={-10} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              <Line type="monotone" dataKey="errors" stroke="#ef4444" strokeWidth={3} dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <DataTable columns={columns} data={data} searchable pageSize={10} />
    </CtoPageShell>
  );
};

export default ErrorLogs;

