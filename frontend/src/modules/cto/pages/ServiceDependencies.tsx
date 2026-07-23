// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';
import { GitBranch, Share2, Map, Target, ArrowRight, Server, Database, Zap } from 'lucide-react';
import CtoPageShell from '../CtoPageShell';
import DataTable, { StatusBadge } from '../../../components/common/DataTable/DataTable';

const kpiData = [
  { label: 'Services', value: '24', sub: 'In dependency graph', icon: GitBranch, color: 'text-blue-500' },
  { label: 'Dependencies', value: '89', sub: 'Internal & external', icon: Share2, color: 'text-indigo-500' },
  { label: 'Critical Paths', value: '3', sub: 'Highest risk paths', icon: Map, color: 'text-amber-500' },
  { label: 'Impact Radius', value: '4', sub: 'Avg services affected', icon: Target, color: 'text-rose-500' },
];

const nodes = [
  { id: 'API GW', label: 'API Gateway', x: '50%', y: '5%', icon: Zap, color: 'border-indigo-400 bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600' },
  { id: 'Auth', label: 'Auth Service', x: '20%', y: '25%', icon: Server, color: 'border-blue-400 bg-blue-50 dark:bg-blue-950/30 text-blue-600' },
  { id: 'Users', label: 'User Service', x: '50%', y: '25%', icon: Server, color: 'border-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600' },
  { id: 'Orders', label: 'Order Service', x: '80%', y: '25%', icon: Server, color: 'border-amber-400 bg-amber-50 dark:bg-amber-950/30 text-amber-600' },
  { id: 'Payments', label: 'Payment Service', x: '50%', y: '45%', icon: Server, color: 'border-purple-400 bg-purple-50 dark:bg-purple-950/30 text-purple-600' },
  { id: 'Postgres', label: 'PostgreSQL', x: '20%', y: '65%', icon: Database, color: 'border-cyan-400 bg-cyan-50 dark:bg-cyan-950/30 text-cyan-600' },
  { id: 'Redis', label: 'Redis Cache', x: '50%', y: '65%', icon: Database, color: 'border-red-400 bg-red-50 dark:bg-red-950/30 text-red-600' },
  { id: 'Kafka', label: 'Kafka Stream', x: '80%', y: '65%', icon: Database, color: 'border-slate-400 bg-slate-50 dark:bg-slate-950/30 text-slate-600' },
];

const connections = [
  { from: 'API GW', to: 'Auth' }, { from: 'API GW', to: 'Users' }, { from: 'API GW', to: 'Orders' },
  { from: 'Auth', to: 'Users' }, { from: 'Users', to: 'Orders' }, { from: 'Orders', to: 'Payments' },
  { from: 'Payments', to: 'Postgres' }, { from: 'Users', to: 'Postgres' }, { from: 'Orders', to: 'Redis' },
  { from: 'Orders', to: 'Kafka' }, { from: 'Payments', to: 'Kafka' }, { from: 'Auth', to: 'Redis' },
];

const depColumns = [
  { key: 'source', label: 'Source' },
  { key: 'target', label: 'Target' },
  { key: 'type', label: 'Type' },
  { key: 'protocol', label: 'Protocol' },
  { key: 'status', label: 'Status', render: (v) => <StatusBadge status={v} /> },
  { key: 'latency', label: 'Latency' },
];

const depData = [
  { source: 'API Gateway', target: 'User Service', type: 'gRPC', protocol: 'HTTP/2', status: 'Healthy', latency: '2ms' },
  { source: 'User Service', target: 'PostgreSQL', type: 'Database', protocol: 'TCP', status: 'Healthy', latency: '4ms' },
  { source: 'Order Service', target: 'Payment Service', type: 'HTTP', protocol: 'REST', status: 'Healthy', latency: '12ms' },
  { source: 'Order Service', target: 'Redis Cache', type: 'Cache', protocol: 'TCP', status: 'Healthy', latency: '1ms' },
  { source: 'Order Service', target: 'Kafka Stream', type: 'Event', protocol: 'gRPC', status: 'Degraded', latency: '45ms' },
  { source: 'Payment Service', target: 'PostgreSQL', type: 'Database', protocol: 'TCP', status: 'Healthy', latency: '6ms' },
  { source: 'Notification', target: 'Redis Cache', type: 'Cache', protocol: 'TCP', status: 'Healthy', latency: '2ms' },
  { source: 'Inventory', target: 'MongoDB', type: 'Database', protocol: 'TCP', status: 'Healthy', latency: '3ms' },
];

const nodePositions = { 'API GW': 'left-[45%] top-[2%]', Auth: 'left-[15%] top-[22%]', Users: 'left-[45%] top-[22%]', Orders: 'left-[75%] top-[22%]', Payments: 'left-[45%] top-[42%]', Postgres: 'left-[15%] top-[62%]', Redis: 'left-[45%] top-[62%]', Kafka: 'left-[75%] top-[62%]' };

const ServiceDependencies = () => (
  <CtoPageShell title="Service Dependencies" description="Service dependency graph and impact analysis" breadcrumbs={[{ label: 'CTO Dashboard', path: '/cto/executive-overview' }, { label: 'Service Dependencies' }]}>
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
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-6">Dependency Graph</h3>
        <div className="relative h-[400px] bg-slate-50 dark:bg-slate-950/50 rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden">
          {connections.map((conn, i) => {
            const fromNode = nodes.find(n => n.id === conn.from);
            const toNode = nodes.find(n => n.id === conn.to);
            if (!fromNode || !toNode) return null;
            return (
              <svg key={i} className="absolute inset-0 w-full h-full pointer-events-none">
                <line x1={`${parseFloat(fromNode.x)}%`} y1={`${parseFloat(fromNode.y) + 4}%`} x2={`${parseFloat(toNode.x)}%`} y2={`${parseFloat(toNode.y) - 2}%`} stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 3" />
              </svg>
            );
          })}
          {nodes.map((node, i) => {
            const pos = nodePositions[node.id] || 'left-1/2 top-1/2';
            return (
              <div key={i} className={`absolute ${pos} transform -translate-x-1/2 -translate-y-1/2`}>
                <div className={`px-3 py-2 border-2 ${node.color} rounded-xl shadow-sm bg-white dark:bg-slate-900 flex items-center gap-2`}>
                  <node.icon className="w-4 h-4" />
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 whitespace-nowrap">{node.label}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-6">Dependencies</h3>
        <DataTable columns={depColumns} data={depData} pageSize={5} searchable />
      </div>
    </div>
  </CtoPageShell>
);

export default ServiceDependencies;


