// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';
import { GitPullRequest, BarChart3, Users, Target } from 'lucide-react';
import CtoPageShell from '../CtoPageShell';
import DataTable, { StatusBadge } from '../../../components/common/DataTable/DataTable';

const kpis = [
  { label: 'Next Sprint', value: 'Sprint 14', icon: GitPullRequest, color: 'text-blue-500' },
  { label: 'Story Points', value: '342', icon: BarChart3, color: 'text-emerald-500' },
  { label: 'Capacity', value: '84%', icon: Target, color: 'text-purple-500' },
  { label: 'Team Members', value: '12', icon: Users, color: 'text-amber-500' },
];

const columns = [
  { key: 'task', label: 'Task', sortable: true },
  { key: 'assignee', label: 'Assignee', sortable: true },
  { key: 'points', label: 'Points', sortable: true },
  { key: 'priority', label: 'Priority', render: (v) => <StatusBadge status={v} /> },
  { key: 'status', label: 'Status', render: (v) => <StatusBadge status={v} /> },
  { key: 'sprint', label: 'Sprint' },
];

const data = [
  { id: 1, task: 'Implement rate limiting middleware', assignee: 'Alice Chen', points: 8, priority: 'Critical', status: 'In Progress', sprint: 'Sprint 14' },
  { id: 2, task: 'API documentation update', assignee: 'Bob Kumar', points: 3, priority: 'Medium', status: 'To Do', sprint: 'Sprint 14' },
  { id: 3, task: 'Database migration v043', assignee: 'Carol Davis', points: 13, priority: 'High', status: 'In Progress', sprint: 'Sprint 14' },
  { id: 4, task: 'UI component library v2', assignee: 'David Lee', points: 21, priority: 'High', status: 'To Do', sprint: 'Sprint 14' },
  { id: 5, task: 'Cache warming optimization', assignee: 'Eve Martinez', points: 5, priority: 'Medium', status: 'Completed', sprint: 'Sprint 14' },
  { id: 6, task: 'Security audit remediation', assignee: 'Frank Wilson', points: 8, priority: 'Critical', status: 'In Progress', sprint: 'Sprint 14' },
  { id: 7, task: 'Load testing setup', assignee: 'Grace Kim', points: 5, priority: 'Low', status: 'To Do', sprint: 'Sprint 14' },
  { id: 8, task: 'Error tracking integration', assignee: 'Henry Jones', points: 3, priority: 'Medium', status: 'Completed', sprint: 'Sprint 14' },
  { id: 9, task: 'GraphQL schema design', assignee: 'Iris Patel', points: 13, priority: 'High', status: 'In Progress', sprint: 'Sprint 14' },
  { id: 10, task: 'Feature flag migration', assignee: 'Jack Thompson', points: 8, priority: 'High', status: 'To Do', sprint: 'Sprint 14' },
];

const SprintPlanning = () => (
  <CtoPageShell title="Sprint Planning" description="Manage sprint backlog, capacity planning, and task allocation">
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
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-4">Sprint Planning Items</h3>
        <DataTable columns={columns} data={data} searchable pageSize={10} />
      </div>
    </div>
  </CtoPageShell>
);

export default SprintPlanning;


