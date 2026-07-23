import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Target, CheckCircle, Play, Clock, Activity } from 'lucide-react';
import CtoPageShell from '../CtoPageShell';
import DataTable, { StatusBadge } from '../../../components/common/DataTable/DataTable';

const kpiData = [
  { label: 'Sprint Points', value: '342', sub: 'Total planned', icon: Target, color: 'text-blue-500' },
  { label: 'Completed', value: '218', sub: 'Points delivered', icon: CheckCircle, color: 'text-emerald-500' },
  { label: 'In Progress', value: '84', sub: 'Points in flight', icon: Play, color: 'text-amber-500' },
  { label: 'Remaining', value: '40', sub: 'Points to complete', icon: Clock, color: 'text-indigo-500' },
];

const columns = [
  { key: 'id', label: 'Task ID' },
  { key: 'task', label: 'Task' },
  { key: 'assignee', label: 'Assignee' },
  { key: 'status', label: 'Status', render: (v) => <StatusBadge status={v} /> },
  { key: 'points', label: 'Points' },
  { key: 'priority', label: 'Priority' },
  { key: 'sprint', label: 'Sprint' },
];

const data = [
  { id: 'T-342', task: 'Implement payment webhook', assignee: 'Sarah Chen', status: 'Active', points: 8, priority: 'High', sprint: 'Sprint 24' },
  { id: 'T-341', task: 'User auth refactor', assignee: 'Mike Johnson', status: 'Active', points: 13, priority: 'Critical', sprint: 'Sprint 24' },
  { id: 'T-340', task: 'API rate limiting', assignee: 'Lisa Park', status: 'Active', points: 5, priority: 'Medium', sprint: 'Sprint 24' },
  { id: 'T-339', task: 'Database indexing optimization', assignee: 'Tom Wilson', status: 'Pending', points: 3, priority: 'Low', sprint: 'Sprint 24' },
  { id: 'T-338', task: 'Notification service upgrade', assignee: 'Anna Davis', status: 'Active', points: 8, priority: 'High', sprint: 'Sprint 24' },
  { id: 'T-337', task: 'Search relevance tuning', assignee: 'James Lee', status: 'Pending', points: 5, priority: 'Medium', sprint: 'Sprint 24' },
  { id: 'T-336', task: 'Cache layer implementation', assignee: 'Rachel Kim', status: 'Active', points: 13, priority: 'High', sprint: 'Sprint 24' },
  { id: 'T-335', task: 'Log aggregation pipeline', assignee: 'Sarah Chen', status: 'Active', points: 8, priority: 'Medium', sprint: 'Sprint 23' },
  { id: 'T-334', task: 'Container image optimization', assignee: 'Mike Johnson', status: 'Active', points: 5, priority: 'Low', sprint: 'Sprint 23' },
  { id: 'T-333', task: 'Load testing automation', assignee: 'Lisa Park', status: 'Pending', points: 3, priority: 'Medium', sprint: 'Sprint 23' },
];

const SprintBoard = () => (
  <CtoPageShell title="Sprint Board" description="Current sprint tracking with task status, points, and priority management" breadcrumbs={[{ label: 'CTO Dashboard', path: '/cto/executive-overview' }, { label: 'Sprint Board' }]}>
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
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-6">Sprint Tasks</h3>
        <DataTable columns={columns} data={data} pageSize={8} searchable />
      </div>
    </div>
  </CtoPageShell>
);

export default SprintBoard;

