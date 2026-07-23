import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Calendar, Download, Shield, AlertTriangle, Lock, Eye } from 'lucide-react';
import CtoPageShell from '../CtoPageShell';
import DataTable, { StatusBadge } from '../../../components/common/DataTable/DataTable';

const kpis = [
  { label: 'Security Reports', value: '7', icon: FileText, color: 'text-blue-500' },
  { label: 'Scheduled', value: '4', icon: Calendar, color: 'text-emerald-500' },
  { label: 'Downloads MTD', value: '142', icon: Download, color: 'text-purple-500' },
  { label: 'Compliance Frameworks', value: '6', icon: Shield, color: 'text-amber-500' },
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
  { id: 1, name: 'Vulnerability Assessment', type: 'Vulnerabilities', format: 'PDF', generated: 7, scheduled: 'Weekly', lastRun: '1 day ago', status: 'Completed' },
  { id: 2, name: 'SOC 2 Compliance Report', type: 'Compliance', format: 'PDF', generated: 2, scheduled: 'Quarterly', lastRun: '1 month ago', status: 'Completed' },
  { id: 3, name: 'Penetration Test Results', type: 'Pentest', format: 'PDF', generated: 4, scheduled: 'Quarterly', lastRun: '2 weeks ago', status: 'Completed' },
  { id: 4, name: 'Access Audit Log', type: 'Audit', format: 'CSV', generated: 24, scheduled: 'Daily', lastRun: '2 hr ago', status: 'Scheduled' },
  { id: 5, name: 'Incident Response Summary', type: 'Incidents', format: 'HTML', generated: 5, scheduled: 'On-demand', lastRun: '3 days ago', status: 'Completed' },
  { id: 6, name: 'Zero Trust Maturity', type: 'Architecture', format: 'PDF', generated: 1, scheduled: 'Quarterly', lastRun: '1 month ago', status: 'Draft' },
  { id: 7, name: 'Threat Intelligence Brief', type: 'Threats', format: 'PDF', generated: 12, scheduled: 'Weekly', lastRun: '4 hr ago', status: 'Completed' },
  { id: 8, name: 'Security Training Report', type: 'Training', format: 'HTML', generated: 3, scheduled: 'Monthly', lastRun: '2 weeks ago', status: 'Scheduled' },
];

const SecurityReports = () => (
  <CtoPageShell title="Security Reports" description="Security-focused reports covering vulnerabilities, compliance, and threat intelligence">
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
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-4">Security Reports</h3>
        <DataTable columns={columns} data={data} searchable pageSize={8} />
      </div>
    </div>
  </CtoPageShell>
);

export default SecurityReports;

