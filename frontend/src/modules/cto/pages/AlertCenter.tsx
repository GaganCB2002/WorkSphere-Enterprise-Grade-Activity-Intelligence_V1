import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Bell, AlertCircle, AlertTriangle, Info } from 'lucide-react';
import CtoPageShell from '../CtoPageShell';
import DataTable, { StatusBadge } from '../../../components/common/DataTable/DataTable';

const kpis = [
  { label: 'Active Alerts', value: '7', sub: 'Requiring attention', icon: Bell, color: 'text-slate-500' },
  { label: 'Critical', value: '2', sub: 'Immediate action needed', icon: AlertCircle, color: 'text-red-500' },
  { label: 'Warning', value: '3', sub: 'Should be reviewed', icon: AlertTriangle, color: 'text-amber-500' },
  { label: 'Info', value: '2', sub: 'For awareness', icon: Info, color: 'text-blue-500' },
];

const severityData = [
  { name: 'Critical', value: 2, color: '#ef4444' },
  { name: 'Warning', value: 3, color: '#f59e0b' },
  { name: 'Info', value: 2, color: '#3b82f6' },
];

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'service', label: 'Service' },
  { key: 'severity', label: 'Severity', render: (v: string) => <StatusBadge status={v} /> },
  { key: 'message', label: 'Message' },
  { key: 'triggered', label: 'Triggered' },
  { key: 'acknowledged', label: 'Acknowledged' },
  { key: 'status', label: 'Status', render: (v: string) => <StatusBadge status={v} /> },
];

const data = [
  { id: 'ALT-001', service: 'API Gateway', severity: 'Critical', message: 'Error rate exceeded 5% threshold', triggered: '14:32:18', acknowledged: '14:35:42', status: 'Open' },
  { id: 'ALT-002', service: 'Database', severity: 'Critical', message: 'Replication lag > 30 seconds', triggered: '14:15:00', acknowledged: '14:18:22', status: 'Open' },
  { id: 'ALT-003', service: 'Auth Service', severity: 'Warning', message: 'Failed login attempts spike detected', triggered: '13:58:12', acknowledged: '14:02:45', status: 'Acknowledged' },
  { id: 'ALT-004', service: 'Search Service', severity: 'Warning', message: 'Index rebuild duration exceeded threshold', triggered: '13:22:48', acknowledged: '13:35:00', status: 'Acknowledged' },
  { id: 'ALT-005', service: 'API Gateway', severity: 'Warning', message: 'Latency P95 > 500ms for /search endpoint', triggered: '12:58:22', acknowledged: '13:12:18', status: 'Acknowledged' },
  { id: 'ALT-006', service: 'Notification', severity: 'Info', message: 'Email queue depth > 10,000', triggered: '12:32:08', acknowledged: '12:45:00', status: 'Resolved' },
  { id: 'ALT-007', service: 'Analytics', severity: 'Info', message: 'Daily report generation completed', triggered: '12:00:00', acknowledged: '12:02:15', status: 'Resolved' },
];

const AlertCenter: React.FC = () => {
  return (
    <CtoPageShell
      title="Alert Center"
      description="Centralized alert management and severity distribution"
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
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-6">Alert Severity Distribution</h3>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={severityData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={4} dataKey="value">
                  {severityData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-4">
            {severityData.map((s, i) => (
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

export default AlertCenter;
