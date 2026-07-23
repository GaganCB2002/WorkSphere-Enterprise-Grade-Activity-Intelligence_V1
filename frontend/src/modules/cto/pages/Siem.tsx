import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, Bell, GitBranch, Zap } from 'lucide-react';
import CtoPageShell from '../CtoPageShell';
import DataTable, { StatusBadge } from '../../../components/common/DataTable/DataTable';

const kpis = [
  { label: 'Events Today', value: '142,847', sub: '+12% from yesterday', icon: Activity, color: 'text-blue-500' },
  { label: 'Alerts', value: '24', sub: '8 critical, 16 warning', icon: Bell, color: 'text-amber-500' },
  { label: 'Correlations', value: '8', sub: 'Active correlations', icon: GitBranch, color: 'text-purple-500' },
  { label: 'Events/sec', value: '1,847', sub: 'Peak: 2,400', icon: Zap, color: 'text-emerald-500' },
];

const ingestData = [
  { time: '00:00', rate: 1200 }, { time: '04:00', rate: 800 }, { time: '08:00', rate: 2200 },
  { time: '12:00', rate: 2400 }, { time: '16:00', rate: 2100 }, { time: '20:00', rate: 1600 },
  { time: 'Now', rate: 1847 },
];

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'source', label: 'Source' },
  { key: 'eventType', label: 'Event Type' },
  { key: 'severity', label: 'Severity', render: (v: string) => <StatusBadge status={v} /> },
  { key: 'timestamp', label: 'Timestamp' },
  { key: 'user', label: 'User' },
  { key: 'action', label: 'Action' },
];

const data = [
  { id: 'SIEM-001', source: 'API Gateway', eventType: 'Authentication', severity: 'Info', timestamp: '2026-07-23 14:32:18', user: 'john.doe', action: 'Login Success' },
  { id: 'SIEM-002', source: 'Firewall', eventType: 'Network', severity: 'Warning', timestamp: '2026-07-23 14:28:04', user: 'system', action: 'Port Scan Detected' },
  { id: 'SIEM-003', source: 'IDS/IPS', eventType: 'Intrusion', severity: 'Critical', timestamp: '2026-07-23 14:15:42', user: 'system', action: 'SQL Injection Blocked' },
  { id: 'SIEM-004', source: 'Auth Service', eventType: 'Authentication', severity: 'Warning', timestamp: '2026-07-23 13:58:18', user: 'jane.doe', action: 'Failed Login (3rd attempt)' },
  { id: 'SIEM-005', source: 'API Gateway', eventType: 'Access', severity: 'Info', timestamp: '2026-07-23 13:42:08', user: 'john.doe', action: 'Resource Accessed' },
  { id: 'SIEM-006', source: 'Database', eventType: 'Audit', severity: 'Info', timestamp: '2026-07-23 13:28:44', user: 'admin', action: 'Schema Change' },
  { id: 'SIEM-007', source: 'Firewall', eventType: 'Network', severity: 'Warning', timestamp: '2026-07-23 12:58:22', user: 'system', action: 'Unusual Outbound Traffic' },
  { id: 'SIEM-008', source: 'IDS/IPS', eventType: 'Intrusion', severity: 'Critical', timestamp: '2026-07-23 12:42:08', user: 'system', action: 'Ransomware Signature Detected' },
  { id: 'SIEM-009', source: 'Email Gateway', eventType: 'Phishing', severity: 'Warning', timestamp: '2026-07-23 12:18:44', user: 'system', action: 'Phishing Email Quarantined' },
  { id: 'SIEM-010', source: 'Endpoint', eventType: 'Malware', severity: 'Critical', timestamp: '2026-07-23 11:52:18', user: 'system', action: 'Malware Quarantined' },
];

const Siem: React.FC = () => {
  return (
    <CtoPageShell
      title="SIEM Dashboard"
      description="Security information and event management - real-time monitoring"
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
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-6">SIEM Event Ingest Rate</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={ingestData}>
              <defs>
                <linearGradient id="siemGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dx={-10} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              <Area type="monotone" dataKey="rate" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#siemGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <DataTable columns={columns} data={data} searchable pageSize={10} />
    </CtoPageShell>
  );
};

export default Siem;
