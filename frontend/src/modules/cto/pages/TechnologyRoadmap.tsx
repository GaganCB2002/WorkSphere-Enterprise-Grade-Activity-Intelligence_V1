// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';
import { Compass, PlayCircle, CheckCircle2, ClipboardList } from 'lucide-react';
import CtoPageShell from '../CtoPageShell';
import DataTable, { StatusBadge } from '../../../components/common/DataTable/DataTable';

const kpis = [
  { label: 'Total Initiatives', value: '18', icon: Compass, color: 'text-blue-500' },
  { label: 'In Progress', value: '8', icon: PlayCircle, color: 'text-emerald-500' },
  { label: 'Completed', value: '6', icon: CheckCircle2, color: 'text-purple-500' },
  { label: 'Planned', value: '4', icon: ClipboardList, color: 'text-amber-500' },
];

const timelineData = [
  { quarter: 'Q1 2025', items: ['Container Orchestration', 'API Gateway v2', 'Observability Stack'] },
  { quarter: 'Q2 2025', items: ['Data Mesh Platform', 'Edge Computing', 'AI Assistant'] },
  { quarter: 'Q3 2025', items: ['Zero Trust Security', 'Multi-Cloud DR', 'Platform Engineering'] },
  { quarter: 'Q4 2025', items: ['Quantum Safe Crypto', 'Autonomous Ops', 'Green Computing'] },
];

const columns = [
  { key: 'name', label: 'Initiative', sortable: true },
  { key: 'category', label: 'Category', sortable: true },
  { key: 'quarter', label: 'Quarter', sortable: true },
  { key: 'status', label: 'Status', render: (v) => <StatusBadge status={v} /> },
  { key: 'progress', label: 'Progress', render: (v) => <span className="text-blue-600 font-semibold">{v}%</span> },
  { key: 'owner', label: 'Owner', sortable: true },
];

const data = [
  { id: 1, name: 'Container Orchestration', category: 'Infrastructure', quarter: 'Q1 2025', status: 'Completed', progress: 100, owner: 'Alex Kim' },
  { id: 2, name: 'API Gateway v2', category: 'Platform', quarter: 'Q1 2025', status: 'Completed', progress: 100, owner: 'Sarah Chen' },
  { id: 3, name: 'Observability Stack', category: 'Monitoring', quarter: 'Q1 2025', status: 'Completed', progress: 100, owner: 'Mike Johnson' },
  { id: 4, name: 'Data Mesh Platform', category: 'Data', quarter: 'Q2 2025', status: 'In Progress', progress: 72, owner: 'James Wilson' },
  { id: 5, name: 'Edge Computing', category: 'Infrastructure', quarter: 'Q2 2025', status: 'In Progress', progress: 45, owner: 'Maria Lopez' },
  { id: 6, name: 'AI Assistant', category: 'AI/ML', quarter: 'Q2 2025', status: 'In Progress', progress: 68, owner: 'Dr. Sarah Chen' },
  { id: 7, name: 'Zero Trust Security', category: 'Security', quarter: 'Q3 2025', status: 'In Progress', progress: 34, owner: 'Raj Patel' },
  { id: 8, name: 'Multi-Cloud DR', category: 'Infrastructure', quarter: 'Q3 2025', status: 'Planned', progress: 12, owner: 'Tom Harrison' },
  { id: 9, name: 'Platform Engineering', category: 'Platform', quarter: 'Q3 2025', status: 'Planned', progress: 8, owner: 'Alex Kim' },
  { id: 10, name: 'Quantum Safe Crypto', category: 'Security', quarter: 'Q4 2025', status: 'Planned', progress: 0, owner: 'Raj Patel' },
  { id: 11, name: 'Autonomous Ops', category: 'DevOps', quarter: 'Q4 2025', status: 'Planned', progress: 5, owner: 'Nancy Wu' },
  { id: 12, name: 'Green Computing', category: 'Sustainability', quarter: 'Q4 2025', status: 'Planned', progress: 0, owner: 'Maria Lopez' },
];

const TechnologyRoadmap = () => (
  <CtoPageShell title="Technology Roadmap" description="Strategic technology initiatives, milestones, and quarterly planning">
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
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-6">Timeline by Quarter</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {timelineData.map((q, i) => (
            <div key={i} className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 border border-slate-200/60 dark:border-slate-700/60">
              <h4 className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-3">{q.quarter}</h4>
              <div className="space-y-2">
                {q.items.map((item, j) => (
                  <div key={j} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    <span className="text-xs text-slate-700 dark:text-slate-300 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-4">Technology Initiatives</h3>
        <DataTable columns={columns} data={data} searchable pageSize={8} />
      </div>
    </div>
  </CtoPageShell>
);

export default TechnologyRoadmap;


