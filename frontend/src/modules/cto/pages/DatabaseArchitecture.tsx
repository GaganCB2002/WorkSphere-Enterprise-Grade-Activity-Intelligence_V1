// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Database, HardDrive, Clock, Activity, Server, Layers } from 'lucide-react';
import CtoPageShell from '../CtoPageShell';
import DataTable, { StatusBadge } from '../../../components/common/DataTable/DataTable';

const kpiData = [
  { label: 'Databases', value: '18', sub: 'Across all environments', icon: Database, color: 'text-blue-500' },
  { label: 'Total Storage', value: '24TB', sub: 'Allocated capacity', icon: HardDrive, color: 'text-indigo-500' },
  { label: 'Avg Query Time', value: '24ms', sub: 'P99: 180ms', icon: Clock, color: 'text-emerald-500' },
  { label: 'Connections', value: '847', sub: 'Active connections', icon: Activity, color: 'text-amber-500' },
];

const storageByDB = [
  { name: 'PostgreSQL-Primary', storage: 8 }, { name: 'MongoDB-Cluster', storage: 6 },
  { name: 'Redis-Cache', storage: 0.5 }, { name: 'Elasticsearch', storage: 4 },
  { name: 'MySQL-Reporting', storage: 3 }, { name: 'Cassandra-Events', storage: 2.5 },
];

const dbColumns = [
  { key: 'name', label: 'Database Name' },
  { key: 'type', label: 'Type' },
  { key: 'engine', label: 'Engine' },
  { key: 'size', label: 'Size' },
  { key: 'connections', label: 'Connections' },
  { key: 'status', label: 'Status', render: (v) => <StatusBadge status={v} /> },
  { key: 'replication', label: 'Replication' },
];

const dbData = [
  { name: 'PostgreSQL-Primary', type: 'Relational', engine: 'PostgreSQL 16', size: '8TB', connections: 245, status: 'Active', replication: 'Streaming' },
  { name: 'MongoDB-Cluster', type: 'Document', engine: 'MongoDB 7.0', size: '6TB', connections: 182, status: 'Active', replication: 'Replica Set' },
  { name: 'Redis-Cache', type: 'Key-Value', engine: 'Redis 7.2', size: '512GB', connections: 320, status: 'Active', replication: 'Sentinel' },
  { name: 'Elasticsearch', type: 'Search', engine: 'ES 8.12', size: '4TB', connections: 64, status: 'Active', replication: 'Cross-Cluster' },
  { name: 'MySQL-Reporting', type: 'Relational', engine: 'MySQL 8.0', size: '3TB', connections: 28, status: 'Degraded', replication: 'Async' },
  { name: 'Cassandra-Events', type: 'Wide-Column', engine: 'Cassandra 5.0', size: '2.5TB', connections: 18, status: 'Active', replication: 'Multi-DC' },
];

const DatabaseArchitecture = () => (
  <CtoPageShell title="Database Architecture" description="Database infrastructure, storage, and performance metrics" breadcrumbs={[{ label: 'CTO Dashboard', path: '/cto/executive-overview' }, { label: 'Database Architecture' }]}>
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData.map((kpi, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{kpi.label}</div>
                <div className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">{kpi.value}</div>
              </div>
              <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
            </div>
            <div className="text-xs font-semibold text-slate-500 mt-4">{kpi.sub}</div>
          </motion.div>
        ))}
      </motion.div>

      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-6">Storage by Database (TB)</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={storageByDB}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dx={-10} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
              <Bar dataKey="storage" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-6">Databases</h3>
        <DataTable columns={dbColumns} data={dbData} pageSize={5} searchable />
      </div>
    </div>
  </CtoPageShell>
);

export default DatabaseArchitecture;


