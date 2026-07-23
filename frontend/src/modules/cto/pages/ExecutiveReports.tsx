import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Calendar, Download, FileText, Settings, Shield, DollarSign, HardDrive } from 'lucide-react';
import CtoPageShell from '../CtoPageShell';
import DataTable, { StatusBadge } from '../../../components/common/DataTable/DataTable';

const kpis = [
  { label: 'Reports Generated', value: '47', icon: FileText, color: 'text-blue-500' },
  { label: 'Scheduled', value: '12', icon: Calendar, color: 'text-emerald-500' },
  { label: 'PDF Downloads', value: '847', icon: Download, color: 'text-purple-500' },
  { label: 'Avg Pages', value: '24', icon: FileText, color: 'text-amber-500' },
];

const reportTypes = [
  { name: 'Engineering', icon: Settings, count: 18, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-500/10', desc: 'Sprint velocity, code quality, deployments' },
  { name: 'Infrastructure', icon: HardDrive, count: 12, color: 'text-cyan-500', bg: 'bg-cyan-50 dark:bg-cyan-500/10', desc: 'System health, uptime, resource usage' },
  { name: 'Cost', icon: DollarSign, count: 10, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-500/10', desc: 'Cloud billing, license costs, forecasts' },
  { name: 'Security', icon: Shield, count: 7, color: 'text-rose-500', bg: 'bg-rose-50 dark:bg-rose-500/10', desc: 'Vulnerabilities, audits, compliance' },
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
  { id: 1, name: 'Monthly Engineering Summary', type: 'Engineering', format: 'PDF', generated: '47', scheduled: 'Monthly', lastRun: '2 days ago', status: 'Completed' },
  { id: 2, name: 'Sprint Velocity Report', type: 'Engineering', format: 'PDF', generated: '24', scheduled: 'Bi-weekly', lastRun: '1 day ago', status: 'Completed' },
  { id: 3, name: 'Infrastructure Health', type: 'Infrastructure', format: 'HTML', generated: '18', scheduled: 'Weekly', lastRun: '6 hr ago', status: 'Completed' },
  { id: 4, name: 'Cloud Cost Analysis', type: 'Cost', format: 'PDF', generated: '12', scheduled: 'Weekly', lastRun: '1 day ago', status: 'Completed' },
  { id: 5, name: 'Security Compliance', type: 'Security', format: 'PDF', generated: '7', scheduled: 'Monthly', lastRun: '5 days ago', status: 'Completed' },
  { id: 6, name: 'License Utilization', type: 'Cost', format: 'CSV', generated: '10', scheduled: 'Monthly', lastRun: '1 week ago', status: 'Scheduled' },
  { id: 7, name: 'Incident Review', type: 'Infrastructure', format: 'PDF', generated: '15', scheduled: 'On-demand', lastRun: '3 hr ago', status: 'Completed' },
  { id: 8, name: 'Deployment Report', type: 'Engineering', format: 'HTML', generated: '22', scheduled: 'Daily', lastRun: '2 hr ago', status: 'Scheduled' },
];

const ExecutiveReports = () => (
  <CtoPageShell title="Executive Reports" description="Generate and schedule executive reports across engineering, infrastructure, cost, and security">
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {reportTypes.map((rt, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-lg ${rt.bg} flex items-center justify-center`}>
                <rt.icon className={`w-5 h-5 ${rt.color}`} />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">{rt.name}</div>
                <div className="text-xs text-slate-500 font-medium">{rt.count} reports</div>
              </div>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{rt.desc}</p>
          </div>
        ))}
      </div>
      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-4">All Reports</h3>
        <DataTable columns={columns} data={data} searchable pageSize={8} />
      </div>
    </div>
  </CtoPageShell>
);

export default ExecutiveReports;


