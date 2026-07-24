import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Calendar, Download, DollarSign, TrendingUp, BarChart3, CreditCard } from 'lucide-react';
import CtoPageShell from '../CtoPageShell';
import DataTable, { StatusBadge } from '../../../components/common/DataTable/DataTable';

const kpis = [
  { label: 'Cost Reports', value: '12', icon: FileText, color: 'text-blue-500' },
  { label: 'Scheduled', value: '5', icon: Calendar, color: 'text-emerald-500' },
  { label: 'Downloads MTD', value: '186', icon: Download, color: 'text-purple-500' },
  { label: 'Cost Centers', value: '8', icon: CreditCard, color: 'text-amber-500' },
];

const columns = [
  { key: 'name', label: 'Report Name', sortable: true },
  { key: 'type', label: 'Type', sortable: true },
  { key: 'format', label: 'Format' },
  { key: 'generated', label: 'Generated' },
  { key: 'scheduled', label: 'Schedule' },
  { key: 'lastRun', label: 'Last Run' },
  { key: 'status', label: 'Status', render: (v: any) => <StatusBadge status={v} /> },
];

const data = [
  { id: 1, name: 'Monthly Cloud Cost Summary', type: 'Cloud', format: 'PDF', generated: 12, scheduled: 'Monthly', lastRun: '3 days ago', status: 'Completed' },
  { id: 2, name: 'AWS Cost Breakdown', type: 'AWS', format: 'CSV', generated: 24, scheduled: 'Weekly', lastRun: '1 day ago', status: 'Completed' },
  { id: 3, name: 'Azure Cost Report', type: 'Azure', format: 'PDF', generated: 10, scheduled: 'Weekly', lastRun: '2 days ago', status: 'Completed' },
  { id: 4, name: 'GCP Spending', type: 'GCP', format: 'HTML', generated: 8, scheduled: 'Weekly', lastRun: '2 days ago', status: 'Completed' },
  { id: 5, name: 'License Cost Analysis', type: 'Licenses', format: 'PDF', generated: 6, scheduled: 'Monthly', lastRun: '1 week ago', status: 'Completed' },
  { id: 6, name: 'Budget vs Actual', type: 'Budget', format: 'PDF', generated: 4, scheduled: 'Monthly', lastRun: '2 weeks ago', status: 'Scheduled' },
  { id: 7, name: 'Cost Forecasting', type: 'Forecast', format: 'PDF', generated: 3, scheduled: 'Quarterly', lastRun: '3 weeks ago', status: 'Draft' },
  { id: 8, name: 'Savings Recommendations', type: 'Optimization', format: 'HTML', generated: 5, scheduled: 'Monthly', lastRun: '5 days ago', status: 'Completed' },
];

const CostReports = () => (
  <CtoPageShell title="Cost Reports" description="Cost-focused reports covering cloud billing, license costs, and budget tracking">
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
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-4">Cost Reports</h3>
        <DataTable columns={columns} data={data} searchable pageSize={8} />
      </div>
    </div>
  </CtoPageShell>
);

export default CostReports;


