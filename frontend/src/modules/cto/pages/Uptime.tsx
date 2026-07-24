import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, Calendar, AlertTriangle, Clock } from 'lucide-react';
import CtoPageShell from '../CtoPageShell';
import DataTable, { StatusBadge } from '../../../components/common/DataTable/DataTable';

const kpis = [
  { label: 'Overall Uptime', value: '99.97%', sub: 'All-time average', icon: Activity, color: 'text-emerald-500' },
  { label: 'Last 30 Days', value: '99.99%', sub: 'Exceptional reliability', icon: Calendar, color: 'text-blue-500' },
  { label: 'Incidents', value: '2', sub: 'Resolved this month', icon: AlertTriangle, color: 'text-amber-500' },
  { label: 'MTTR', value: '14min', sub: 'Mean time to resolve', icon: Clock, color: 'text-indigo-500' },
];

const monthlyData = [
  { month: 'Aug', uptime: 99.97 }, { month: 'Sep', uptime: 99.99 }, { month: 'Oct', uptime: 99.95 },
  { month: 'Nov', uptime: 99.98 }, { month: 'Dec', uptime: 99.92 }, { month: 'Jan', uptime: 99.99 },
  { month: 'Feb', uptime: 99.97 }, { month: 'Mar', uptime: 99.99 }, { month: 'Apr', uptime: 99.98 },
  { month: 'May', uptime: 99.96 }, { month: 'Jun', uptime: 99.99 }, { month: 'Jul', uptime: 99.99 },
];

const columns = [
  { key: 'name', label: 'Service Name' },
  { key: 'uptime', label: 'Uptime %' },
  { key: 'downtime', label: 'Downtime' },
  { key: 'incidents', label: 'Incidents' },
  { key: 'mttr', label: 'MTTR' },
  { key: 'sla', label: 'SLA', render: (v: string) => <StatusBadge status={v} /> },
];

const data = [
  { name: 'API Gateway', uptime: '99.99%', downtime: '52 min', incidents: '0', mttr: '0 min', sla: 'On Track' },
  { name: 'Auth Service', uptime: '99.97%', downtime: '2h 37min', incidents: '1', mttr: '12 min', sla: 'On Track' },
  { name: 'Database Primary', uptime: '99.99%', downtime: '42 min', incidents: '0', mttr: '0 min', sla: 'On Track' },
  { name: 'Redis Cache', uptime: '99.99%', downtime: '18 min', incidents: '0', mttr: '0 min', sla: 'On Track' },
  { name: 'CDN Edge', uptime: '99.99%', downtime: '8 min', incidents: '0', mttr: '0 min', sla: 'On Track' },
  { name: 'Message Queue', uptime: '99.95%', downtime: '4h 18min', incidents: '2', mttr: '18 min', sla: 'On Track' },
  { name: 'Search Service', uptime: '99.98%', downtime: '1h 45min', incidents: '1', mttr: '12 min', sla: 'On Track' },
  { name: 'Analytics Engine', uptime: '99.92%', downtime: '6h 12min', incidents: '3', mttr: '22 min', sla: 'At Risk' },
];

const Uptime: React.FC = () => {
  return (
    <CtoPageShell
      title="Uptime Monitoring"
      description="Track service uptime, incidents, and SLA compliance"
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
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-6">Monthly Uptime (12 Months)</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyData}>
              <defs>
                <linearGradient id="uptimeGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
              <YAxis domain={[99.85, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dx={-10} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              <Area type="monotone" dataKey="uptime" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#uptimeGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <DataTable columns={columns} data={data} searchable pageSize={10} />
    </CtoPageShell>
  );
};

export default Uptime;

