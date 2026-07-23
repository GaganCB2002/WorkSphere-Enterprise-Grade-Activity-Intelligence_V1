// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';
import { FlaskConical, CheckCircle2, TrendingUp, DollarSign } from 'lucide-react';
import CtoPageShell from '../CtoPageShell';
import DataTable, { StatusBadge } from '../../../components/common/DataTable/DataTable';

const kpis = [
  { label: 'Active POCs', value: '6', icon: FlaskConical, color: 'text-blue-500' },
  { label: 'Completed', value: '12', icon: CheckCircle2, color: 'text-emerald-500' },
  { label: 'Success Rate', value: '75%', icon: TrendingUp, color: 'text-purple-500' },
  { label: 'Budget', value: '$847K', icon: DollarSign, color: 'text-amber-500' },
];

const columns = [
  { key: 'name', label: 'POC Name', sortable: true },
  { key: 'technology', label: 'Technology', sortable: true },
  { key: 'team', label: 'Team', sortable: true },
  { key: 'budget', label: 'Budget', sortable: true },
  { key: 'timeline', label: 'Timeline' },
  { key: 'status', label: 'Status', render: (v) => <StatusBadge status={v} /> },
  { key: 'outcome', label: 'Outcome', sortable: true },
];

const data = [
  { id: 1, name: 'Vector Search Engine', technology: 'Qdrant', team: 'Data Platform', budget: '$120K', timeline: 'Q1 2025', status: 'Completed', outcome: 'Adopted' },
  { id: 2, name: 'GraphQL Federation', technology: 'Apollo GraphQL', team: 'API Team', budget: '$85K', timeline: 'Q2 2025', status: 'Completed', outcome: 'Adopted' },
  { id: 3, name: 'Edge CDN', technology: 'Cloudflare Workers', team: 'Infrastructure', budget: '$60K', timeline: 'Q3 2025', status: 'Active', outcome: 'In Progress' },
  { id: 4, name: 'Event Sourcing', technology: 'Kafka + Axon', team: 'Backend', budget: '$95K', timeline: 'Q2 2025', status: 'Active', outcome: 'In Progress' },
  { id: 5, name: 'WebAssembly Modules', technology: 'WasmEdge', team: 'Platform', budget: '$70K', timeline: 'Q3 2025', status: 'Active', outcome: 'Evaluating' },
  { id: 6, name: 'AI Code Review', technology: 'CodeRabbit', team: 'DevOps', budget: '$40K', timeline: 'Q4 2025', status: 'Planned', outcome: 'Not Started' },
  { id: 7, name: 'Real-time Sync', technology: 'Liveblocks', team: 'Frontend', budget: '$55K', timeline: 'Q6 2025', status: 'Planned', outcome: 'Not Started' },
  { id: 8, name: 'Chaos Engineering', technology: 'Litmus', team: 'SRE', budget: '$42K', timeline: 'Q5 2025', status: 'Completed', outcome: 'Rejected' },
];

const ProofOfConcepts = () => (
  <CtoPageShell title="Proof of Concepts" description="Track POC initiatives, evaluations, and adoption outcomes">
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
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-4">Proof of Concepts</h3>
        <DataTable columns={columns} data={data} searchable pageSize={8} />
      </div>
    </div>
  </CtoPageShell>
);

export default ProofOfConcepts;



