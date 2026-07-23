// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, Wifi, Clock, AlertTriangle, Server, Download, Upload } from 'lucide-react';
import CtoPageShell from '../CtoPageShell';
import DataTable, { StatusBadge } from '../../../components/common/DataTable/DataTable';

const kpiData = [
  { label: 'Active Interfaces', value: '142', sub: 'Physical & virtual', icon: Activity, color: 'text-blue-500' },
  { label: 'Bandwidth', value: '40 Gbps', sub: 'Total aggregate throughput', icon: Wifi, color: 'text-emerald-500' },
  { label: 'Latency', value: '2ms', sub: 'Average across fabric', icon: Clock, color: 'text-amber-500' },
  { label: 'Packet Loss', value: '0.01%', sub: 'Below 0.1% threshold', icon: AlertTriangle, color: 'text-indigo-500' },
];

const networkTraffic = [
  { hour: '00:00', inbound: 8, outbound: 6 }, { hour: '02:00', inbound: 4, outbound: 3 },
  { hour: '04:00', inbound: 3, outbound: 2 }, { hour: '06:00', inbound: 6, outbound: 5 },
  { hour: '08:00', inbound: 18, outbound: 14 }, { hour: '10:00', inbound: 28, outbound: 22 },
  { hour: '12:00', inbound: 26, outbound: 20 }, { hour: '14:00', inbound: 32, outbound: 25 },
  { hour: '16:00', inbound: 30, outbound: 24 }, { hour: '18:00', inbound: 22, outbound: 18 },
  { hour: '20:00', inbound: 16, outbound: 12 }, { hour: '22:00', inbound: 10, outbound: 8 },
];

const networkColumns = [
  { key: 'name', label: 'Interface' },
  { key: 'device', label: 'Device' },
  { key: 'speed', label: 'Speed' },
  { key: 'ip', label: 'IP Address' },
  { key: 'status', label: 'Status', render: (v) => <StatusBadge status={v} /> },
  { key: 'throughput', label: 'Throughput' },
];

const networkData = [
  { name: 'eth0', device: 'core-sw-01', speed: '40 Gbps', ip: '10.0.0.1/24', status: 'Active', throughput: '18.4 Gbps' },
  { name: 'eth1', device: 'core-sw-01', speed: '40 Gbps', ip: '10.0.1.1/24', status: 'Active', throughput: '12.2 Gbps' },
  { name: 'eth0', device: 'core-sw-02', speed: '40 Gbps', ip: '10.0.2.1/24', status: 'Active', throughput: '16.8 Gbps' },
  { name: 'eth1', device: 'core-sw-02', speed: '40 Gbps', ip: '10.0.3.1/24', status: 'Active', throughput: '8.4 Gbps' },
  { name: 'bond0', device: 'fw-primary', speed: '100 Gbps', ip: '10.0.254.1/24', status: 'Active', throughput: '35.2 Gbps' },
  { name: 'eth0', device: 'lb-01', speed: '10 Gbps', ip: '10.0.100.1/24', status: 'Active', throughput: '6.8 Gbps' },
  { name: 'eth0', device: 'edge-rtr-01', speed: '100 Gbps', ip: '203.0.113.1/24', status: 'Degraded', throughput: '22.4 Gbps' },
  { name: 'eth0', device: 'spine-01', speed: '400 Gbps', ip: '10.254.0.1/24', status: 'Active', throughput: '185.6 Gbps' },
];

const Network = () => (
  <CtoPageShell title="Network" description="Network infrastructure, traffic patterns, and interface monitoring" breadcrumbs={[{ label: 'CTO Dashboard', path: '/cto/executive-overview' }, { label: 'Network' }]}>
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
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-6">Network Traffic (Gbps)</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={networkTraffic}>
              <defs>
                <linearGradient id="inGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/><stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/></linearGradient>
                <linearGradient id="outGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.1}/><stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/></linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="hour" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dx={-10} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
              <Area type="monotone" dataKey="inbound" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#inGrad)" name="Inbound" />
              <Area type="monotone" dataKey="outbound" stroke="#8b5cf6" strokeWidth={2} fillOpacity={1} fill="url(#outGrad)" name="Outbound" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-6">Network Interfaces</h3>
        <DataTable columns={networkColumns} data={networkData} pageSize={5} searchable />
      </div>
    </div>
  </CtoPageShell>
);

export default Network;


