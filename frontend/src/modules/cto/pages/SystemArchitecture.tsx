import React from 'react';
import { motion } from 'framer-motion';
import { Server, Share2, GitBranch, Database, Globe, Lock, Zap, ArrowRight } from 'lucide-react';
import CtoPageShell from '../CtoPageShell';
import DataTable, { StatusBadge } from '../../../components/common/DataTable/DataTable';

const kpiData = [
  { label: 'Services', value: '24', sub: 'Across 5 domains', icon: Server, color: 'text-blue-500' },
  { label: 'APIs', value: '147', sub: 'REST, gRPC, GraphQL', icon: Share2, color: 'text-indigo-500' },
  { label: 'Dependencies', value: '89', sub: 'Internal & external', icon: GitBranch, color: 'text-amber-500' },
  { label: 'Data Stores', value: '12', sub: 'SQL, NoSQL, Cache', icon: Database, color: 'text-emerald-500' },
];

const layers = [
  { name: 'Client Layer', icon: Globe, color: 'border-blue-400 bg-blue-50 dark:bg-blue-950/30', services: ['Web App', 'Mobile App', 'Third-party Clients'] },
  { name: 'API Gateway', icon: Lock, color: 'border-indigo-400 bg-indigo-50 dark:bg-indigo-950/30', services: ['Authentication', 'Rate Limiting', 'Routing', 'Load Balancing'] },
  { name: 'Microservices', icon: Zap, color: 'border-amber-400 bg-amber-50 dark:bg-amber-950/30', services: ['User Service', 'Order Service', 'Payment Service', 'Notification Service'] },
  { name: 'Data Layer', icon: Database, color: 'border-emerald-400 bg-emerald-50 dark:bg-emerald-950/30', services: ['PostgreSQL', 'MongoDB', 'Redis', 'Elasticsearch'] },
  { name: 'Infrastructure', icon: Server, color: 'border-slate-400 bg-slate-50 dark:bg-slate-950/30', services: ['Kubernetes', 'Docker', 'AWS', 'Monitoring'] },
];

const serviceRegistryColumns = [
  { key: 'name', label: 'Service Name' },
  { key: 'version', label: 'Version' },
  { key: 'status', label: 'Status', render: (v) => <StatusBadge status={v} /> },
  { key: 'dependencies', label: 'Dependencies' },
  { key: 'endpoints', label: 'Endpoints' },
  { key: 'owner', label: 'Owner' },
];

const serviceRegistryData = [
  { name: 'User Service', version: 'v3.2.1', status: 'Healthy', dependencies: 'PostgreSQL, Redis', endpoints: '24', owner: 'Alice Chen' },
  { name: 'Order Service', version: 'v2.8.0', status: 'Healthy', dependencies: 'PostgreSQL, Kafka, Payment', endpoints: '18', owner: 'Bob Kumar' },
  { name: 'Payment Service', version: 'v4.1.3', status: 'Healthy', dependencies: 'PostgreSQL, Stripe API', endpoints: '12', owner: 'Carol Davis' },
  { name: 'Notification Service', version: 'v1.5.2', status: 'Degraded', dependencies: 'Redis, SendGrid, Twilio', endpoints: '8', owner: 'David Lee' },
  { name: 'Inventory Service', version: 'v2.3.0', status: 'Healthy', dependencies: 'MongoDB, Redis', endpoints: '15', owner: 'Eve Martinez' },
  { name: 'Auth Service', version: 'v5.0.1', status: 'Healthy', dependencies: 'PostgreSQL, Redis, LDAP', endpoints: '6', owner: 'Frank Wilson' },
];

const SystemArchitecture = () => (
  <CtoPageShell title="System Architecture" description="Enterprise architecture overview and service topology" breadcrumbs={[{ label: 'CTO Dashboard', path: '/cto/executive-overview' }, { label: 'System Architecture' }]}>
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
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-6">Architecture Layers</h3>
        <div className="space-y-3">
          {layers.map((layer, i) => (
            <div key={i} className={`relative border-2 ${layer.color} rounded-xl p-4 transition-all`}>
              <div className="flex items-center gap-3 mb-2">
                <layer.icon className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{layer.name}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {layer.services.map((svc, j) => (
                  <span key={j} className="px-2.5 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md text-xs font-medium text-slate-600 dark:text-slate-400">{svc}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-6">Service Registry</h3>
        <DataTable columns={serviceRegistryColumns} data={serviceRegistryData} pageSize={5} searchable />
      </div>
    </div>
  </CtoPageShell>
);

export default SystemArchitecture;

