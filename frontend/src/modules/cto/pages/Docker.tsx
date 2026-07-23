// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Container, Box, Square, Image, Server, Clock, Terminal } from 'lucide-react';
import CtoPageShell from '../CtoPageShell';
import DataTable, { StatusBadge } from '../../../components/common/DataTable/DataTable';

const kpiData = [
  { label: 'Total Containers', value: '342', sub: 'Across all hosts', icon: Container, color: 'text-blue-500' },
  { label: 'Running', value: '298', sub: 'Active and healthy', icon: Box, color: 'text-emerald-500' },
  { label: 'Stopped', value: '44', sub: 'Exited or paused', icon: Square, color: 'text-slate-500' },
  { label: 'Images', value: '847', sub: 'In local registry', icon: Image, color: 'text-indigo-500' },
];

const statusDistribution = [
  { name: 'Running', value: 298, color: '#10b981' },
  { name: 'Exited', value: 28, color: '#64748b' },
  { name: 'Paused', value: 10, color: '#f59e0b' },
  { name: 'Created', value: 6, color: '#3b82f6' },
];

const containerColumns = [
  { key: 'name', label: 'Container Name' },
  { key: 'image', label: 'Image' },
  { key: 'status', label: 'Status', render: (v) => <StatusBadge status={v} /> },
  { key: 'ports', label: 'Ports' },
  { key: 'created', label: 'Created' },
  { key: 'command', label: 'Command' },
];

const containerData = [
  { name: 'web-app', image: 'nginx:1.25-alpine', status: 'Running', ports: '80, 443', created: '2 days ago', command: 'nginx -g daemon off' },
  { name: 'api-server', image: 'node:20-slim', status: 'Running', ports: '3000', created: '5 days ago', command: 'node server.js' },
  { name: 'postgres-db', image: 'postgres:16', status: 'Running', ports: '5432', created: '2 weeks ago', command: 'postgres -c config' },
  { name: 'redis-cache', image: 'redis:7.2-alpine', status: 'Running', ports: '6379', created: '1 week ago', command: 'redis-server' },
  { name: 'migration-job', image: 'migrations:latest', status: 'Exited', ports: '-', created: '3 days ago', command: 'npm run migrate' },
  { name: 'sidecar-logger', image: 'fluentd:v1.16', status: 'Running', ports: '24224', created: '4 hours ago', command: 'fluentd -c config' },
  { name: 'cron-worker', image: 'python:3.12-slim', status: 'Running', ports: '-', created: '1 day ago', command: 'python worker.py' },
];

const Docker = () => (
  <CtoPageShell title="Docker" description="Container management, image registry, and runtime status" breadcrumbs={[{ label: 'CTO Dashboard', path: '/cto/executive-overview' }, { label: 'Docker' }]}>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-6">Container Status Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={statusDistribution} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={4} dataKey="value">
                  {statusDistribution.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-4">Quick Stats</h3>
          <div className="space-y-4">
            {[
              { label: 'Images in Registry', value: '847', sub: '847 tags • 42 repos', icon: Image, color: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-950/30' },
              { label: 'Active Networks', value: '12', sub: 'Bridge, overlay, host', icon: Server, color: 'text-blue-500 bg-blue-50 dark:bg-blue-950/30' },
              { label: 'Total Volumes', value: '28', sub: '12.4 TB provisioned', icon: Container, color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/30' },
              { label: 'Avg Container Age', value: '8.4 days', sub: 'Youngest: 4min ago', icon: Clock, color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/30' },
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-lg border border-slate-100 dark:border-slate-800">
                <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900 dark:text-slate-200">{stat.value}</div>
                  <div className="text-xs text-slate-500 font-medium">{stat.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-6">Containers</h3>
        <DataTable columns={containerColumns} data={containerData} pageSize={5} searchable />
      </div>
    </div>
  </CtoPageShell>
);

export default Docker;


