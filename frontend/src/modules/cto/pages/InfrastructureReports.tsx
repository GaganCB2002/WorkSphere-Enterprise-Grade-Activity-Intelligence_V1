// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Calendar, Download, Server, Activity, HardDrive, Wifi } from 'lucide-react';
import CtoPageShell from '../CtoPageShell';
import DataTable, { StatusBadge } from '../../../components/common/DataTable/DataTable';

const kpis = [
  { label: 'Infra Reports', value: '18', icon: FileText, color: 'text-blue-500' },
  { label: 'Scheduled', value: '6', icon: Calendar, color: 'text-emerald-500' },
  { label: 'Downloads MTD', value: '284', icon: Download, color: 'text-purple-500' },
  { label: 'Data Sources', value: '12', icon: Server, color: 'text-amber-500' },
];

const columns = [
  { key: 'name', label: 'Report Name', sortable: true },
  { key: 'type', label: 'Type', sortable: true },
  { key: 'format', label: 'Format' },
  { key: 'generated', label: 'Generated' },
  { key: 'scheduled', label: 'Schedule' },
  { key: 'lastRun', label: 'Last Run' },
  { key: 'status', label: 'Status', render: (v) => <StatusBadge status={v} /> },
];

const data = [
  { id: 1, name: 'Infrastructure Health Report', type: 'Health', format: 'PDF', generated: 18, scheduled: 'Weekly', lastRun: '6 hr ago', status: 'Completed' },
  { id: 2, name: 'System Uptime Summary', type: 'Availability', format: 'HTML', generated: 24, scheduled: 'Daily', lastRun: '1 hr ago', status: 'Completed' },
  { id: 3, name: 'Resource Utilization', type: 'Capacity', format: 'PDF', generated: 12, scheduled: 'Weekly', lastRun: '2 days ago', status: 'Completed' },
  { id: 4, name: 'Network Performance', type: 'Network', format: 'CSV', generated: 8, scheduled: 'Daily', lastRun: '3 hr ago', status: 'Scheduled' },
  { id: 5, name: 'Storage Capacity Plan', type: 'Storage', format: 'PDF', generated: 4, scheduled: 'Monthly', lastRun: '1 week ago', status: 'Completed' },
  { id: 6, name: 'Backup Status Report', type: 'Backup', format: 'HTML', generated: 15, scheduled: 'Weekly', lastRun: '1 day ago', status: 'Completed' },
  { id: 7, name: 'Incident Analysis', type: 'Incidents', format: 'PDF', generated: 7, scheduled: 'On-demand', lastRun: '4 hr ago', status: 'Scheduled' },
  { id: 8, name: 'Capacity Forecasting', type: 'Planning', format: 'PDF', generated: 3, scheduled: 'Quarterly', lastRun: '2 weeks ago', status: 'Draft' },
];

const InfrastructureReports = () => (
  <CtoPageShell title="Infrastructure Reports" description="Infrastructure-focused reports covering system health, capacity, and availability">
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
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-4">Infrastructure Reports</h3>
        <DataTable columns={columns} data={data} searchable pageSize={8} />
      </div>
    </div>
  </CtoPageShell>
);

export default InfrastructureReports;


