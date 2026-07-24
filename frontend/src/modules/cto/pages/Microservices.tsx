import React from 'react';
import { motion } from 'framer-motion';
import { Server, CheckCircle2, AlertTriangle, XCircle, Cpu, HardDrive, Clock } from 'lucide-react';
import CtoPageShell from '../CtoPageShell';
import DataTable, { StatusBadge } from '../../../components/common/DataTable/DataTable';

const kpiData = [
  { label: 'Total Services', value: '24', sub: 'Across all environments', icon: Server, color: 'text-blue-500' },
  { label: 'Healthy', value: '22', sub: 'All endpoints responding', icon: CheckCircle2, color: 'text-emerald-500' },
  { label: 'Degraded', value: '1', sub: 'Elevated latency detected', icon: AlertTriangle, color: 'text-amber-500' },
  { label: 'Down', value: '1', sub: 'Incident in progress', icon: XCircle, color: 'text-red-500' },
];

const services = [
  { name: 'User Service', status: 'Healthy', version: 'v3.2.1', language: 'Go', pods: 6, cpu: '12%', memory: '256MB', latency: '12ms', color: 'border-l-emerald-500' },
  { name: 'Order Service', status: 'Healthy', version: 'v2.8.0', language: 'Java', pods: 8, cpu: '28%', memory: '512MB', latency: '24ms', color: 'border-l-emerald-500' },
  { name: 'Payment Service', status: 'Healthy', version: 'v4.1.3', language: 'Go', pods: 4, cpu: '15%', memory: '384MB', latency: '45ms', color: 'border-l-emerald-500' },
  { name: 'Notification Service', status: 'Degraded', version: 'v1.5.2', language: 'Node.js', pods: 3, cpu: '72%', memory: '640MB', latency: '128ms', color: 'border-l-amber-500' },
  { name: 'Inventory Service', status: 'Healthy', version: 'v2.3.0', language: 'Python', pods: 5, cpu: '18%', memory: '320MB', latency: '18ms', color: 'border-l-emerald-500' },
  { name: 'Auth Service', status: 'Down', version: 'v5.0.1', language: 'Rust', pods: 2, cpu: '0%', memory: '0MB', latency: '0ms', color: 'border-l-red-500' },
];

const microserviceColumns = [
  { key: 'name', label: 'Service Name' },
  { key: 'version', label: 'Version' },
  { key: 'language', label: 'Language' },
  { key: 'status', label: 'Status', render: (v: any) => <StatusBadge status={v} /> },
  { key: 'pods', label: 'Pods' },
  { key: 'cpu', label: 'CPU' },
  { key: 'memory', label: 'Memory' },
  { key: 'latency', label: 'Latency' },
];

const Microservices = () => (
  <CtoPageShell title="Microservices" description="Microservice topology, health, and resource utilization" breadcrumbs={[{ label: 'CTO Dashboard', path: '/cto/executive-overview' }, { label: 'Microservices' }]}>
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((svc, i) => (
          <div key={i} className={`bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm border-l-4 ${svc.color} p-5`}>
            <div className="flex justify-between items-start mb-3">
              <div>
                <div className="text-sm font-bold text-slate-900 dark:text-slate-200">{svc.name}</div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">{svc.version} &middot; {svc.language}</div>
              </div>
              <StatusBadge status={svc.status} />
            </div>
            <div className="grid grid-cols-3 gap-4 pt-3 border-t border-slate-100 dark:border-slate-800">
              <div><div className="text-[11px] font-bold text-slate-500 uppercase">Pods</div><div className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-0.5 flex items-center gap-1"><Server className="w-3.5 h-3.5 text-slate-400" />{svc.pods}</div></div>
              <div><div className="text-[11px] font-bold text-slate-500 uppercase">CPU</div><div className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-0.5 flex items-center gap-1"><Cpu className="w-3.5 h-3.5 text-slate-400" />{svc.cpu}</div></div>
              <div><div className="text-[11px] font-bold text-slate-500 uppercase">Memory</div><div className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-0.5 flex items-center gap-1"><HardDrive className="w-3.5 h-3.5 text-slate-400" />{svc.memory}</div></div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-6">Microservices Details</h3>
        <DataTable columns={microserviceColumns} data={services} pageSize={5} searchable />
      </div>
    </div>
  </CtoPageShell>
);

export default Microservices;


