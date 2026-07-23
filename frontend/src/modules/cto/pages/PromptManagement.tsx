import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Activity, FileText, TrendingUp } from 'lucide-react';
import CtoPageShell from '../CtoPageShell';
import DataTable, { StatusBadge } from '../../../components/common/DataTable/DataTable';

const kpis = [
  { label: 'Total Prompts', value: '342', icon: MessageSquare, color: 'text-blue-500' },
  { label: 'Active', value: '284', icon: Activity, color: 'text-emerald-500' },
  { label: 'Templates', value: '47', icon: FileText, color: 'text-purple-500' },
  { label: 'Avg Score', value: '8.7/10', icon: TrendingUp, color: 'text-amber-500' },
];

const columns = [
  { key: 'name', label: 'Prompt Name', sortable: true },
  { key: 'model', label: 'Model', sortable: true },
  { key: 'version', label: 'Version' },
  { key: 'tokens', label: 'Tokens', sortable: true },
  { key: 'score', label: 'Score', sortable: true, render: (v) => <span className="text-amber-600 font-semibold">{v}</span> },
  { key: 'lastUsed', label: 'Last Used' },
  { key: 'status', label: 'Status', render: (v) => <StatusBadge status={v} /> },
];

const data = [
  { id: 1, name: 'Code Review Assistant', model: 'GPT-4', version: '2.3', tokens: '12.4K', score: '9.2', lastUsed: '2 min ago', status: 'Active' },
  { id: 2, name: 'Architecture Advisor', model: 'Claude 3', version: '1.8', tokens: '8.7K', score: '8.9', lastUsed: '15 min ago', status: 'Active' },
  { id: 3, name: 'Bug Analyzer', model: 'GPT-4', version: '3.1', tokens: '15.2K', score: '8.5', lastUsed: '1 hr ago', status: 'Active' },
  { id: 4, name: 'Test Generator', model: 'Claude 3', version: '1.2', tokens: '6.8K', score: '7.8', lastUsed: '3 hr ago', status: 'Active' },
  { id: 5, name: 'Deployment Checker', model: 'GPT-3.5', version: '2.0', tokens: '4.2K', score: '9.0', lastUsed: '5 hr ago', status: 'Active' },
  { id: 6, name: 'Code Documentation', model: 'Claude 2', version: '1.5', tokens: '9.1K', score: '8.1', lastUsed: '1 day ago', status: 'Inactive' },
  { id: 7, name: 'Performance Optimizer', model: 'GPT-4', version: '0.9', tokens: '11.3K', score: '7.5', lastUsed: '2 days ago', status: 'Draft' },
  { id: 8, name: 'Security Auditor', model: 'Claude 3', version: '2.1', tokens: '14.7K', score: '9.4', lastUsed: '3 days ago', status: 'Active' },
  { id: 9, name: 'Log Analyzer', model: 'GPT-3.5', version: '1.7', tokens: '5.6K', score: '8.3', lastUsed: '5 days ago', status: 'Inactive' },
  { id: 10, name: 'API Spec Generator', model: 'GPT-4', version: '0.5', tokens: '7.9K', score: '7.1', lastUsed: '1 week ago', status: 'Draft' },
];

const PromptManagement = () => (
  <CtoPageShell title="Prompt Management" description="Monitor and manage AI prompt templates, usage, and quality scores">
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
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-4">All Prompts</h3>
        <DataTable columns={columns} data={data} searchable pageSize={8} />
      </div>
    </div>
  </CtoPageShell>
);

export default PromptManagement;

