import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CheckCircle2, Database, Target, GitBranch } from 'lucide-react';
import CtoPageShell from '../CtoPageShell';
import DataTable, { StatusBadge } from '../../../components/common/DataTable/DataTable';

const kpis = [
  { label: 'Overall Score', value: '94%', icon: CheckCircle2, color: 'text-emerald-500' },
  { label: 'Completeness', value: '96%', icon: Database, color: 'text-blue-500' },
  { label: 'Accuracy', value: '92%', icon: Target, color: 'text-purple-500' },
  { label: 'Consistency', value: '94%', icon: GitBranch, color: 'text-amber-500' },
];

const chartData = [
  { dataset: 'Customers', score: 96 }, { dataset: 'Orders', score: 92 },
  { dataset: 'Products', score: 94 }, { dataset: 'Inventory', score: 88 },
  { dataset: 'Analytics', score: 91 }, { dataset: 'Logs', score: 97 },
  { dataset: 'Finance', score: 95 }, { dataset: 'HR', score: 98 },
];

const columns = [
  { key: 'name', label: 'Check Name', sortable: true },
  { key: 'table', label: 'Table', sortable: true },
  { key: 'checkType', label: 'Check Type', sortable: true },
  { key: 'score', label: 'Score', sortable: true, render: (v) => <span className="text-emerald-600 font-semibold">{v}%</span> },
  { key: 'status', label: 'Status', render: (v) => <StatusBadge status={v} /> },
  { key: 'lastRun', label: 'Last Run' },
];

const data = [
  { id: 1, name: 'Customer Email Valid', table: 'dim_customers', checkType: 'Format', score: 98, status: 'Passed', lastRun: '15 min ago' },
  { id: 2, name: 'Order Total Check', table: 'fact_orders', checkType: 'Range', score: 95, status: 'Passed', lastRun: '15 min ago' },
  { id: 3, name: 'Product SKU Uniqueness', table: 'dim_products', checkType: 'Uniqueness', score: 100, status: 'Passed', lastRun: '1 hr ago' },
  { id: 4, name: 'Inventory Count Valid', table: 'inventory', checkType: 'Referential', score: 88, status: 'Warning', lastRun: '30 min ago' },
  { id: 5, name: 'Date Range Check', table: 'fact_events', checkType: 'Range', score: 92, status: 'Passed', lastRun: '45 min ago' },
  { id: 6, name: 'Null Value Check', table: 'fact_orders', checkType: 'Completeness', score: 96, status: 'Passed', lastRun: '15 min ago' },
  { id: 7, name: 'Duplicate Detection', table: 'user_sessions', checkType: 'Uniqueness', score: 85, status: 'Failed', lastRun: '2 hr ago' },
  { id: 8, name: 'Referential Integrity', table: 'fact_shipments', checkType: 'Referential', score: 97, status: 'Passed', lastRun: '1 hr ago' },
];

const DataQuality = () => (
  <CtoPageShell title="Data Quality" description="Monitor data quality scores, completeness, accuracy, and consistency across datasets">
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
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-6">Quality Score by Dataset</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="dataset" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dx={-10} domain={[80, 100]} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} formatter={(v) => `${v}%`} />
              <Bar dataKey="score" fill="#10b981" radius={[4, 4, 0, 0]} name="Quality Score" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-4">Data Quality Checks</h3>
        <DataTable columns={columns} data={data} searchable pageSize={8} />
      </div>
    </div>
  </CtoPageShell>
);

export default DataQuality;

