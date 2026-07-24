import React from 'react';
import { motion } from 'framer-motion';
import { Radar, Zap, FlaskConical, CheckCircle2 } from 'lucide-react';
import CtoPageShell from '../CtoPageShell';
import DataTable, { StatusBadge } from '../../../components/common/DataTable/DataTable';

const kpis = [
  { label: 'Technologies Monitored', value: '24', icon: Radar, color: 'text-blue-500' },
  { label: 'Active Evaluation', value: '8', icon: Zap, color: 'text-emerald-500' },
  { label: 'Pilots', value: '4', icon: FlaskConical, color: 'text-purple-500' },
  { label: 'Adopted', value: '12', icon: CheckCircle2, color: 'text-amber-500' },
];

const columns = [
  { key: 'name', label: 'Technology', sortable: true },
  { key: 'category', label: 'Category', sortable: true },
  { key: 'maturity', label: 'Maturity', sortable: true, render: (v: any) => <StatusBadge status={v} /> },
  { key: 'impact', label: 'Impact', sortable: true, render: (v: any) => <StatusBadge status={v} /> },
  { key: 'timeline', label: 'Timeline' },
  { key: 'status', label: 'Status', render: (v: any) => <StatusBadge status={v} /> },
];

const data = [
  { id: 1, name: 'WebGPU', category: 'Graphics/Compute', maturity: 'Emerging', impact: 'High', timeline: '2025-2026', status: 'Monitoring' },
  { id: 2, name: 'WASM Component Model', category: 'Platform', maturity: 'Emerging', impact: 'High', timeline: '2025-2026', status: 'Evaluating' },
  { id: 3, name: 'eBPF', category: 'Observability', maturity: 'Growing', impact: 'High', timeline: '2024-2025', status: 'Pilot' },
  { id: 4, name: 'WebAssembly GC', category: 'Platform', maturity: 'Emerging', impact: 'Medium', timeline: '2025-2026', status: 'Monitoring' },
  { id: 5, name: 'Bun Runtime', category: 'Runtime', maturity: 'Growing', impact: 'Medium', timeline: '2024-2025', status: 'Evaluating' },
  { id: 6, name: 'Rust for Systems', category: 'Languages', maturity: 'Mature', impact: 'High', timeline: '2024-2025', status: 'Adopted' },
  { id: 7, name: 'HTMX', category: 'Frontend', maturity: 'Growing', impact: 'Low', timeline: '2025-2026', status: 'Evaluating' },
  { id: 8, name: 'Zig Language', category: 'Languages', maturity: 'Emerging', impact: 'Medium', timeline: '2026+', status: 'Monitoring' },
  { id: 9, name: 'Kubernetes Sidecar-less', category: 'Infrastructure', maturity: 'Growing', impact: 'High', timeline: '2024-2025', status: 'Pilot' },
  { id: 10, name: 'Biome Toolchain', category: 'Tooling', maturity: 'Growing', impact: 'Medium', timeline: '2025-2026', status: 'Evaluating' },
  { id: 11, name: 'GraphQL', category: 'API', maturity: 'Mature', impact: 'High', timeline: '2023-2024', status: 'Adopted' },
  { id: 12, name: 'TypeScript', category: 'Languages', maturity: 'Mature', impact: 'High', timeline: '2022-2023', status: 'Adopted' },
];

const EmergingTechnologies = () => (
  <CtoPageShell title="Emerging Technologies" description="Track emerging technologies, evaluation pipeline, and adoption status">
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
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-4">Emerging Technologies</h3>
        <DataTable columns={columns} data={data} searchable pageSize={12} />
      </div>
    </div>
  </CtoPageShell>
);

export default EmergingTechnologies;



