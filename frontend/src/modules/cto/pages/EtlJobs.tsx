import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { PlayCircle, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';
import CtoPageShell from '../CtoPageShell';
import DataTable, { StatusBadge } from '../../../components/common/DataTable/DataTable';

const kpis = [
  { label: 'Active Jobs', value: '12', icon: PlayCircle, color: 'text-blue-500' },
  { label: 'Success Rate', value: '94.2%', icon: CheckCircle2, color: 'text-emerald-500' },
  { label: 'Avg Duration', value: '24m', icon: Clock, color: 'text-purple-500' },
  { label: 'Failed Today', value: '2', icon: AlertTriangle, color: 'text-red-500' },
];

const chartData = [
  { job: 'Orders Sync', duration: 35 }, { job: 'User Import', duration: 28 },
  { job: 'Analytics ETL', duration: 52 }, { job: 'Inventory Sync', duration: 18 },
  { job: 'CRM Update', duration: 22 }, { job: 'Log Archive', duration: 45 },
  { job: 'Data Export', duration: 15 }, { job: 'Report Gen', duration: 12 },
];

const columns = [
  { key: 'name', label: 'Job Name', sortable: true },
  { key: 'source', label: 'Source', sortable: true },
  { key: 'target', label: 'Target', sortable: true },
  { key: 'schedule', label: 'Schedule' },
  { key: 'lastRun', label: 'Last Run' },
  { key: 'duration', label: 'Duration', sortable: true },
  { key: 'status', label: 'Status', render: (v) => <StatusBadge status={v} /> },
];

const data = [
  { id: 1, name: 'Orders Sync', source: 'PostgreSQL', target: 'Snowflake', schedule: 'Every 15m', lastRun: '2 min ago', duration: '35m', status: 'Active' },
  { id: 2, name: 'User Import', source: 'MongoDB', target: 'BigQuery', schedule: 'Hourly', lastRun: '12 min ago', duration: '28m', status: 'Active' },
  { id: 3, name: 'Analytics ETL', source: 'MySQL', target: 'Snowflake', schedule: 'Daily 3am', lastRun: '4 hr ago', duration: '52m', status: 'Active' },
  { id: 4, name: 'Inventory Sync', source: 'Oracle', target: 'PostgreSQL', schedule: 'Every 5m', lastRun: '1 min ago', duration: '18m', status: 'Active' },
  { id: 5, name: 'CRM Update', source: 'Salesforce', target: 'Snowflake', schedule: 'Hourly', lastRun: '8 min ago', duration: '22m', status: 'Active' },
  { id: 6, name: 'Log Archive', source: 'Elasticsearch', target: 'S3', schedule: 'Daily 11pm', lastRun: '7 hr ago', duration: '45m', status: 'Active' },
  { id: 7, name: 'Data Export', source: 'ClickHouse', target: 'GCS', schedule: 'Weekly', lastRun: '2 days ago', duration: '15m', status: 'Inactive' },
  { id: 8, name: 'Report Gen', source: 'Snowflake', target: 'Tableau', schedule: 'Daily 6am', lastRun: '3 hr ago', duration: '12m', status: 'Failed' },
];

const EtlJobs = () => (
  <CtoPageShell title="ETL Jobs" description="Monitor ETL pipeline execution, duration, and success rates">
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
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-6">ETL Duration by Job (minutes)</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
              <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
              <YAxis type="category" dataKey="job" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} width={100} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
              <Bar dataKey="duration" fill="#3b82f6" radius={[0, 4, 4, 0]} name="Duration (min)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-4">ETL Jobs</h3>
        <DataTable columns={columns} data={data} searchable pageSize={8} />
      </div>
    </div>
  </CtoPageShell>
);

export default EtlJobs;

