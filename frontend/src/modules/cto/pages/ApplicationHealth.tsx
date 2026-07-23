// @ts-nocheck
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, ThumbsUp, AlertTriangle, Zap } from 'lucide-react';
import CtoPageShell from '../CtoPageShell';
import DataTable, { StatusBadge } from '../../../components/common/DataTable/DataTable';

const kpis = [
  { label: 'App Health Score', value: '96%', sub: '+2% from last week', icon: Activity, color: 'text-emerald-500' },
  { label: 'User Satisfaction', value: '4.5/5', sub: 'Based on 1,247 reviews', icon: ThumbsUp, color: 'text-blue-500' },
  { label: 'Crash Rate', value: '0.02%', sub: 'Below threshold', icon: AlertTriangle, color: 'text-amber-500' },
  { label: 'API Latency', value: '42ms', sub: 'P95: 98ms', icon: Zap, color: 'text-indigo-500' },
];

const trendData = [
  { day: 'Mon', score: 94 }, { day: 'Tue', score: 95 }, { day: 'Wed', score: 96 },
  { day: 'Thu', score: 95 }, { day: 'Fri', score: 97 }, { day: 'Sat', score: 96 },
  { day: 'Sun', score: 96 },
];

const columns = [
  { key: 'name', label: 'Application Name' },
  { key: 'version', label: 'Version' },
  { key: 'health', label: 'Health', render: (v: string) => <StatusBadge status={v} /> },
  { key: 'uptime', label: 'Uptime' },
  { key: 'responseTime', label: 'Response Time' },
  { key: 'errorsPerMin', label: 'Errors/min' },
];

const data = [
  { name: 'Customer Portal', version: '3.2.1', health: 'Healthy', uptime: '99.97%', responseTime: '38ms', errorsPerMin: '0.2' },
  { name: 'Admin Dashboard', version: '2.8.0', health: 'Healthy', uptime: '99.95%', responseTime: '45ms', errorsPerMin: '0.1' },
  { name: 'Payment Service', version: '4.1.2', health: 'Healthy', uptime: '99.99%', responseTime: '28ms', errorsPerMin: '0.0' },
  { name: 'Notification Service', version: '1.5.3', health: 'Degraded', uptime: '97.2%', responseTime: '124ms', errorsPerMin: '2.4' },
  { name: 'Search Service', version: '2.0.1', health: 'Healthy', uptime: '99.95%', responseTime: '52ms', errorsPerMin: '0.1' },
  { name: 'Analytics Engine', version: '4.0.0', health: 'Healthy', uptime: '99.98%', responseTime: '68ms', errorsPerMin: '0.3' },
  { name: 'User Service', version: '2.3.1', health: 'Healthy', uptime: '99.99%', responseTime: '22ms', errorsPerMin: '0.0' },
];

const ApplicationHealth: React.FC = () => {
  return (
    <CtoPageShell
      title="Application Health"
      description="Monitor application performance, health scores, and user satisfaction metrics"
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
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-6">App Health Score Trend</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
              <YAxis domain={[90, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dx={-10} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={3} dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <DataTable columns={columns} data={data} searchable pageSize={10} />
    </CtoPageShell>
  );
};

export default ApplicationHealth;

