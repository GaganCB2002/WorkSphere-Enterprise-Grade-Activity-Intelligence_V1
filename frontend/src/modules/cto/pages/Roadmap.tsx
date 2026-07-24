import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Lightbulb, PlayCircle, CheckCircle, CalendarClock, Activity } from 'lucide-react';
import CtoPageShell from '../CtoPageShell';
import DataTable, { StatusBadge } from '../../../components/common/DataTable/DataTable';

const kpiData = [
  { label: 'Initiatives', value: '18', sub: 'Total roadmap items', icon: Lightbulb, color: 'text-blue-500' },
  { label: 'In Progress', value: '8', sub: 'Actively underway', icon: PlayCircle, color: 'text-amber-500' },
  { label: 'Completed', value: '6', sub: 'Delivered initiatives', icon: CheckCircle, color: 'text-emerald-500' },
  { label: 'Planned', value: '4', sub: 'Future roadmap', icon: CalendarClock, color: 'text-indigo-500' },
];

const timelineByQuarter = [
  { quarter: 'Q1 2026', initiatives: 5, started: 4, completed: 3 },
  { quarter: 'Q2 2026', initiatives: 6, started: 5, completed: 2 },
  { quarter: 'Q3 2026', initiatives: 4, started: 3, completed: 1 },
  { quarter: 'Q4 2026', initiatives: 3, started: 2, completed: 0 },
];

const columns = [
  { key: 'initiative', label: 'Initiative' },
  { key: 'quarter', label: 'Quarter' },
  { key: 'status', label: 'Status', render: (v: any) => <StatusBadge status={v} /> },
  { key: 'progress', label: 'Progress' },
  { key: 'owner', label: 'Owner' },
];

const data = [
  { initiative: 'Cloud Migration Phase 2', quarter: 'Q3 2026', status: 'Active', progress: '65%', owner: 'Sarah Chen' },
  { initiative: 'Microservices Adoption', quarter: 'Q3 2026', status: 'Active', progress: '42%', owner: 'Mike Johnson' },
  { initiative: 'AI/ML Platform Buildout', quarter: 'Q4 2026', status: 'Pending', progress: '18%', owner: 'Lisa Park' },
  { initiative: 'Zero Trust Architecture', quarter: 'Q3 2026', status: 'Active', progress: '78%', owner: 'Tom Wilson' },
  { initiative: 'Data Mesh Implementation', quarter: 'Q4 2026', status: 'Pending', progress: '10%', owner: 'Anna Davis' },
  { initiative: 'Kubernetes Standardization', quarter: 'Q2 2026', status: 'Active', progress: '95%', owner: 'James Lee' },
  { initiative: 'Observability Platform', quarter: 'Q1 2026', status: 'Active', progress: '100%', owner: 'Rachel Kim' },
  { initiative: 'API First Strategy', quarter: 'Q1 2026', status: 'Active', progress: '100%', owner: 'Sarah Chen' },
  { initiative: 'Edge Computing POC', quarter: 'Q1 2026', status: 'Active', progress: '100%', owner: 'Mike Johnson' },
  { initiative: 'SRE Adoption Program', quarter: 'Q2 2026', status: 'Active', progress: '85%', owner: 'Lisa Park' },
  { initiative: 'Green Data Center', quarter: 'Q3 2026', status: 'Pending', progress: '5%', owner: 'Tom Wilson' },
  { initiative: 'Event-Driven Architecture', quarter: 'Q2 2026', status: 'Active', progress: '90%', owner: 'Anna Davis' },
  { initiative: 'Serverless Expansion', quarter: 'Q3 2026', status: 'Active', progress: '35%', owner: 'James Lee' },
  { initiative: 'Blockchain for Supply Chain', quarter: 'Q4 2026', status: 'Pending', progress: '0%', owner: 'Rachel Kim' },
  { initiative: 'Chaos Engineering Program', quarter: 'Q2 2026', status: 'Active', progress: '80%', owner: 'Sarah Chen' },
  { initiative: 'WebAssembly Exploration', quarter: 'Q4 2026', status: 'Pending', progress: '0%', owner: 'Mike Johnson' },
  { initiative: 'FinOps Implementation', quarter: 'Q2 2026', status: 'Active', progress: '70%', owner: 'Lisa Park' },
  { initiative: 'Developer Experience Portal', quarter: 'Q1 2026', status: 'Active', progress: '100%', owner: 'Tom Wilson' },
];

const Roadmap = () => (
  <CtoPageShell title="Technology Roadmap" description="Strategic technology initiatives, quarterly planning, and progress tracking" breadcrumbs={[{ label: 'CTO Dashboard', path: '/cto/executive-overview' }, { label: 'Roadmap' }]}>
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData.map((kpi, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{kpi.label}</div>
                <div className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">{kpi.value}</div>
              </div>
              <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
            </div>
            <div className="text-xs font-semibold text-slate-500 mt-4">{kpi.sub}</div>
          </motion.div>
        ))}
      </motion.div>

      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-6">Initiatives by Quarter</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={timelineByQuarter}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="quarter" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dx={-10} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
              <Bar dataKey="initiatives" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Total" />
              <Bar dataKey="started" fill="#f59e0b" radius={[4, 4, 0, 0]} name="In Progress" />
              <Bar dataKey="completed" fill="#22c55e" radius={[4, 4, 0, 0]} name="Completed" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-6">Roadmap Items</h3>
        <DataTable columns={columns} data={data} pageSize={8} searchable />
      </div>
    </div>
  </CtoPageShell>
);

export default Roadmap;


