// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Database, Link, Clock, HardDrive } from 'lucide-react';
import CtoPageShell from '../CtoPageShell';
import DataTable, { StatusBadge } from '../../../components/common/DataTable/DataTable';

const kpis = [
  { label: 'Total Databases', value: '18', icon: Database, color: 'text-blue-500' },
  { label: 'Connections', value: '847', icon: Link, color: 'text-emerald-500' },
  { label: 'Avg Query', value: '24ms', icon: Clock, color: 'text-purple-500' },
  { label: 'Storage', value: '24TB', icon: HardDrive, color: 'text-amber-500' },
];

const chartData = [
  { time: 'Mon', queries: 1240, latency: 28 }, { time: 'Tue', queries: 1380, latency: 22 },
  { time: 'Wed', queries: 1520, latency: 18 }, { time: 'Thu', queries: 1480, latency: 20 },
  { time: 'Fri', queries: 1650, latency: 25 }, { time: 'Sat', queries: 980, latency: 30 },
  { time: 'Sun', queries: 890, latency: 24 },
];

const columns = [
  { key: 'name', label: 'Database', sortable: true },
  { key: 'type', label: 'Type', sortable: true },
  { key: 'engine', label: 'Engine', sortable: true },
  { key: 'size', label: 'Size', sortable: true },
  { key: 'connections', label: 'Connections', sortable: true },
  { key: 'qps', label: 'Queries/sec', sortable: true },
  { key: 'status', label: 'Status', render: (v) => <StatusBadge status={v} /> },
];

const data = [
  { id: 1, name: 'CoreDB-Primary', type: 'Relational', engine: 'PostgreSQL 16', size: '4.2TB', connections: '245', qps: '1,240', status: 'Active' },
  { id: 2, name: 'CoreDB-Replica', type: 'Relational', engine: 'PostgreSQL 16', size: '4.2TB', connections: '98', qps: '520', status: 'Active' },
  { id: 3, name: 'UserAnalytics', type: 'Analytics', engine: 'ClickHouse', size: '6.8TB', connections: '45', qps: '2,100', status: 'Active' },
  { id: 4, name: 'SessionStore', type: 'Key-Value', engine: 'Redis 7', size: '128GB', connections: '342', qps: '8,400', status: 'Active' },
  { id: 5, name: 'CatalogDB', type: 'Document', engine: 'MongoDB 7', size: '2.1TB', connections: '67', qps: '890', status: 'Active' },
  { id: 6, name: 'EventStore', type: 'Time Series', engine: 'TimescaleDB', size: '3.5TB', connections: '24', qps: '3,200', status: 'Active' },
  { id: 7, name: 'SearchIndex', type: 'Search', engine: 'Elasticsearch', size: '1.8TB', connections: '18', qps: '1,560', status: 'Active' },
  { id: 8, name: 'AuditLog', type: 'Relational', engine: 'PostgreSQL 15', size: '1.2TB', connections: '8', qps: '180', status: 'Active' },
];

const Databases = () => (
  <CtoPageShell title="Databases" description="Monitor all database instances, performance, and connection metrics">
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{kpi.label}</div>
                <div className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">{kpi.value}</div>
              </div>
              <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
            </div>
          </motion.div>
        ))}
      </motion.div>
      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-6">Database Performance (7 Days)</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="qpsGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/><stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/></linearGradient>
                <linearGradient id="latGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.1}/><stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/></linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
              <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dx={-10} />
              <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dx={10} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
              <Area yAxisId="left" type="monotone" dataKey="queries" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#qpsGrad)" name="Queries" />
              <Area yAxisId="right" type="monotone" dataKey="latency" stroke="#8b5cf6" strokeWidth={2} fillOpacity={1} fill="url(#latGrad)" name="Avg Latency (ms)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-4">Database Instances</h3>
        <DataTable columns={columns} data={data} searchable pageSize={8} />
      </div>
    </div>
  </CtoPageShell>
);

export default Databases;


