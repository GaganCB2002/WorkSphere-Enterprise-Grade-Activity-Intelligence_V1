// @ts-nocheck
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Box, Image, Server, Bug } from 'lucide-react';
import CtoPageShell from '../CtoPageShell';
import DataTable, { StatusBadge } from '../../../components/common/DataTable/DataTable';

const kpis = [
  { label: 'Containers', value: '342', sub: 'Running across 12 hosts', icon: Box, color: 'text-blue-500' },
  { label: 'Images', value: '847', sub: 'In all registries', icon: Image, color: 'text-purple-500' },
  { label: 'Registries', value: '4', sub: 'Connected', icon: Server, color: 'text-emerald-500' },
  { label: 'Vulnerabilities', value: '12', sub: '2 critical', icon: Bug, color: 'text-amber-500' },
];

const containerStatus = [
  { name: 'Running', value: 284, color: '#10b981' },
  { name: 'Stopped', value: 38, color: '#ef4444' },
  { name: 'Paused', value: 12, color: '#f59e0b' },
  { name: 'Pending', value: 8, color: '#3b82f6' },
];

const columns = [
  { key: 'name', label: 'Image Name' },
  { key: 'tag', label: 'Tag' },
  { key: 'size', label: 'Size' },
  { key: 'vulnerabilities', label: 'Vulnerabilities' },
  { key: 'lastUpdated', label: 'Last Updated' },
  { key: 'registry', label: 'Registry' },
];

const data = [
  { name: 'nginx', tag: '1.25-alpine', size: '42MB', vulnerabilities: '0', lastUpdated: '2h ago', registry: 'Docker Hub' },
  { name: 'node', tag: '20-slim', size: '187MB', vulnerabilities: '2', lastUpdated: '4h ago', registry: 'Docker Hub' },
  { name: 'postgres', tag: '16-alpine', size: '248MB', vulnerabilities: '1', lastUpdated: '6h ago', registry: 'ECR' },
  { name: 'redis', tag: '7-alpine', size: '32MB', vulnerabilities: '0', lastUpdated: '8h ago', registry: 'ECR' },
  { name: 'python', tag: '3.12-slim', size: '142MB', vulnerabilities: '3', lastUpdated: '12h ago', registry: 'Docker Hub' },
  { name: 'app-backend', tag: 'v2.4.1', size: '324MB', vulnerabilities: '4', lastUpdated: '1d ago', registry: 'ECR' },
  { name: 'app-frontend', tag: 'v3.1.0', size: '84MB', vulnerabilities: '1', lastUpdated: '1d ago', registry: 'ECR' },
  { name: 'redis', tag: '7-alpine', size: '32MB', vulnerabilities: '0', lastUpdated: '2d ago', registry: 'Docker Hub' },
  { name: 'node', tag: '20-slim', size: '187MB', vulnerabilities: '2', lastUpdated: '3d ago', registry: 'Docker Hub' },
  { name: 'python', tag: '3.12-alpine', size: '68MB', vulnerabilities: '1', lastUpdated: '5d ago', registry: 'GitHub Container' },
];

const Containers: React.FC = () => {
  return (
    <CtoPageShell
      title="Containers"
      description="Container inventory, image registry, and vulnerability overview"
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
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-6">Container Status</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={containerStatus} cx="50%" cy="50%" outerRadius={80} paddingAngle={4} dataKey="value">
                  {containerStatus.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 mt-4">
            {containerStatus.map((s, i) => (
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

export default Containers;

