// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Database, BarChart3, Clock, Cpu } from 'lucide-react';
import CtoPageShell from '../CtoPageShell';
import DataTable, { StatusBadge } from '../../../components/common/DataTable/DataTable';

const kpis = [
  { label: 'Warehouse Size', value: '12TB', icon: Database, color: 'text-blue-500' },
  { label: 'Queries/Day', value: '12,847', icon: BarChart3, color: 'text-emerald-500' },
  { label: 'Avg Query Time', value: '4.2s', icon: Clock, color: 'text-purple-500' },
  { label: 'Slots Used', value: '72%', icon: Cpu, color: 'text-amber-500' },
];

const chartData = [
  { day: 'Mon', avgTime: 3.8, queries: 11200 }, { day: 'Tue', avgTime: 4.2, queries: 12400 },
  { day: 'Wed', avgTime: 3.5, queries: 13800 }, { day: 'Thu', avgTime: 4.8, queries: 14200 },
  { day: 'Fri', avgTime: 5.1, queries: 15800 }, { day: 'Sat', avgTime: 3.2, queries: 9800 },
  { day: 'Sun', avgTime: 3.0, queries: 8900 },
];

const columns = [
  { key: 'name', label: 'Table', sortable: true },
  { key: 'schema', label: 'Schema', sortable: true },
  { key: 'rows', label: 'Rows', sortable: true },
  { key: 'size', label: 'Size', sortable: true },
  { key: 'compression', label: 'Compression', sortable: true },
  { key: 'lastAnalyzed', label: 'Last Analyzed' },
];

const data = [
  { id: 1, name: 'fact_orders', schema: 'analytics', rows: '847M', size: '2.4TB', compression: '72%', lastAnalyzed: '1 hr ago' },
  { id: 2, name: 'dim_customers', schema: 'analytics', rows: '12.4M', size: '1.8TB', compression: '68%', lastAnalyzed: '2 hr ago' },
  { id: 3, name: 'fact_events', schema: 'analytics', rows: '2.1B', size: '3.2TB', compression: '81%', lastAnalyzed: '30 min ago' },
  { id: 4, name: 'dim_products', schema: 'analytics', rows: '847K', size: '512GB', compression: '64%', lastAnalyzed: '4 hr ago' },
  { id: 5, name: 'fact_shipments', schema: 'logistics', rows: '324M', size: '1.1TB', compression: '76%', lastAnalyzed: '1 day ago' },
  { id: 6, name: 'dim_locations', schema: 'analytics', rows: '2.1M', size: '256GB', compression: '58%', lastAnalyzed: '3 days ago' },
  { id: 7, name: 'agg_daily_sales', schema: 'aggregates', rows: '18.4M', size: '1.6TB', compression: '85%', lastAnalyzed: '45 min ago' },
  { id: 8, name: 'agg_weekly_trends', schema: 'aggregates', rows: '4.2M', size: '892GB', compression: '82%', lastAnalyzed: '6 hr ago' },
];

const DataWarehouse = () => (
  <CtoPageShell title="Data Warehouse" description="Monitor data warehouse performance, query metrics, and table statistics">
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
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-6">Query Performance Trend</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="qtGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/><stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/></linearGradient>
                <linearGradient id="qcountGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.1}/><stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/></linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
              <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dx={-10} />
              <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dx={10} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
              <Area yAxisId="left" type="monotone" dataKey="avgTime" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#qtGrad)" name="Avg Query Time (s)" />
              <Area yAxisId="right" type="monotone" dataKey="queries" stroke="#8b5cf6" strokeWidth={2} fillOpacity={1} fill="url(#qcountGrad)" name="Query Count" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-4">Warehouse Tables</h3>
        <DataTable columns={columns} data={data} searchable pageSize={8} />
      </div>
    </div>
  </CtoPageShell>
);

export default DataWarehouse;


