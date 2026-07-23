import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Shield, Ban, Globe, Activity } from 'lucide-react';
import CtoPageShell from '../CtoPageShell';
import DataTable, { StatusBadge } from '../../../components/common/DataTable/DataTable';

const kpis = [
  { label: 'Active Threats', value: '12', sub: 'Being monitored', icon: Shield, color: 'text-red-500' },
  { label: 'Blocked Today', value: '847', sub: 'All threats neutralized', icon: Ban, color: 'text-emerald-500' },
  { label: 'IPs Blacklisted', value: '1,247', sub: 'Updated hourly', icon: Globe, color: 'text-blue-500' },
  { label: 'Feeds', value: '8', sub: 'All active', icon: Activity, color: 'text-indigo-500' },
];

const threatsOverTime = [
  { day: 'Mon', count: 124 }, { day: 'Tue', count: 98 }, { day: 'Wed', count: 147 },
  { day: 'Thu', count: 112 }, { day: 'Fri', count: 184 }, { day: 'Sat', count: 72 },
  { day: 'Sun', count: 110 },
];

const columns = [
  { key: 'type', label: 'Type' },
  { key: 'value', label: 'Value' },
  { key: 'confidence', label: 'Confidence' },
  { key: 'severity', label: 'Severity', render: (v: string) => <StatusBadge status={v} /> },
  { key: 'firstSeen', label: 'First Seen' },
  { key: 'lastSeen', label: 'Last Seen' },
  { key: 'status', label: 'Status', render: (v: string) => <StatusBadge status={v} /> },
];

const data = [
  { type: 'IP Address', value: '185.220.101.42', confidence: '95%', severity: 'Critical', firstSeen: '2026-07-20', lastSeen: '2026-07-23', status: 'Active' },
  { type: 'Domain', value: 'malware-c2.example.com', confidence: '88%', severity: 'Critical', firstSeen: '2026-07-18', lastSeen: '2026-07-23', status: 'Active' },
  { type: 'URL', value: 'https://phishing.example.net/login', confidence: '92%', severity: 'High', firstSeen: '2026-07-21', lastSeen: '2026-07-23', status: 'Active' },
  { type: 'IP Address', value: '103.235.46.88', confidence: '85%', severity: 'High', firstSeen: '2026-07-19', lastSeen: '2026-07-23', status: 'Active' },
  { type: 'Hash (SHA256)', value: 'a3f5b8c1d2e4...', confidence: '97%', severity: 'High', firstSeen: '2026-07-22', lastSeen: '2026-07-23', status: 'Active' },
  { type: 'Domain', value: 'spam-sender.xyz', confidence: '78%', severity: 'Medium', firstSeen: '2026-07-15', lastSeen: '2026-07-23', status: 'Monitoring' },
  { type: 'IP Address', value: '192.168.1.200', confidence: '65%', severity: 'Medium', firstSeen: '2026-07-10', lastSeen: '2026-07-23', status: 'Monitoring' },
  { type: 'URL', value: 'https://phish-site.com/login', confidence: '91%', severity: 'High', firstSeen: '2026-07-22', lastSeen: '2026-07-23', status: 'Active' },
  { type: 'Email', value: 'phish@scam.com', confidence: '82%', severity: 'Medium', firstSeen: '2026-07-18', lastSeen: '2026-07-23', status: 'Monitoring' },
  { type: 'File Hash', value: 'e3b0c44298fc1c...', confidence: '96%', severity: 'Critical', firstSeen: '2026-07-23', lastSeen: '2026-07-23', status: 'Active' },
];

const ThreatIntelligence: React.FC = () => {
  return (
    <CtoPageShell
      title="Threat Intelligence"
      description="Real-time threat monitoring, indicators of compromise, and threat feeds"
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
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-6">Threats Over Time</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={threatsOverTime}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dx={-10} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              <Line type="monotone" dataKey="count" stroke="#ef4444" strokeWidth={3} dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <DataTable columns={columns} data={data} searchable pageSize={10} />
    </CtoPageShell>
  );
};

export default ThreatIntelligence;
