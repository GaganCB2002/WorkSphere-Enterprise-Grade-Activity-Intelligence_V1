// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, CheckCircle2, Clock, Star } from 'lucide-react';
import CtoPageShell from '../CtoPageShell';
import DataTable, { StatusBadge } from '../../../components/common/DataTable/DataTable';

const kpis = [
  { label: 'Scheduled', value: '4', icon: Calendar, color: 'text-blue-500' },
  { label: 'Completed', value: '18', icon: CheckCircle2, color: 'text-emerald-500' },
  { label: 'Pending', value: '6', icon: Clock, color: 'text-amber-500' },
  { label: 'Avg Score', value: '4.2/5', icon: Star, color: 'text-purple-500' },
];

const columns = [
  { key: 'name', label: 'Review Name', sortable: true },
  { key: 'system', label: 'System', sortable: true },
  { key: 'reviewer', label: 'Reviewer', sortable: true },
  { key: 'date', label: 'Date' },
  { key: 'score', label: 'Score', sortable: true, render: (v) => <span className="text-amber-600 font-semibold">{v}/5</span> },
  { key: 'status', label: 'Status', render: (v) => <StatusBadge status={v} /> },
];

const data = [
  { id: 1, name: 'API Gateway v2 Architecture', system: 'API Gateway', reviewer: 'Dr. Sarah Chen', date: '2025-07-25', score: 4.5, status: 'Scheduled' },
  { id: 2, name: 'Data Mesh Design Review', system: 'Data Platform', reviewer: 'James Wilson', date: '2025-07-22', score: 4.2, status: 'Completed' },
  { id: 3, name: 'Event Streaming Platform', system: 'Kafka Cluster', reviewer: 'Alice Chen', date: '2025-07-20', score: 3.8, status: 'Completed' },
  { id: 4, name: 'Multi-Cloud DR Architecture', system: 'Infrastructure', reviewer: 'Maria Lopez', date: '2025-07-28', score: '-', status: 'Scheduled' },
  { id: 5, name: 'Microservices Decomposition', system: 'Order Service', reviewer: 'Bob Kumar', date: '2025-07-18', score: 4.7, status: 'Completed' },
  { id: 6, name: 'Security Architecture Review', system: 'Auth Service', reviewer: 'Raj Patel', date: '2025-07-15', score: 4.0, status: 'Completed' },
  { id: 7, name: 'Database Sharding Strategy', system: 'CoreDB', reviewer: 'Nancy Wu', date: '2025-08-01', score: '-', status: 'Scheduled' },
  { id: 8, name: 'CI/CD Pipeline Design', system: 'DevOps', reviewer: 'Alex Kim', date: '2025-07-12', score: 4.8, status: 'Completed' },
];

const ArchitectureReviews = () => (
  <CtoPageShell title="Architecture Reviews" description="Schedule and track architecture review sessions and scores">
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
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-4">Architecture Reviews</h3>
        <DataTable columns={columns} data={data} searchable pageSize={8} />
      </div>
    </div>
  </CtoPageShell>
);

export default ArchitectureReviews;


