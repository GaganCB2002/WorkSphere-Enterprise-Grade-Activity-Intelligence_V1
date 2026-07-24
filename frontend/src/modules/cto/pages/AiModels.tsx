import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Brain, Activity, Zap, CheckCircle2 } from 'lucide-react';
import CtoPageShell from '../CtoPageShell';
import DataTable, { StatusBadge } from '../../../components/common/DataTable/DataTable';

const kpis = [
  { label: 'Deployed Models', value: '12', sub: 'In production', icon: Brain, color: 'text-blue-500' },
  { label: 'Training', value: '4', sub: 'In progress', icon: Activity, color: 'text-amber-500' },
  { label: 'Avg Latency', value: '342ms', sub: 'P95: 520ms', icon: Zap, color: 'text-indigo-500' },
  { label: 'Accuracy', value: '94.2%', sub: '+0.8% from last month', icon: CheckCircle2, color: 'text-emerald-500' },
];

const accuracyData = [
  { model: 'GPT-4o', accuracy: 97.2 }, { model: 'Claude 3.5', accuracy: 96.8 },
  { model: 'BERT', accuracy: 92.4 }, { model: 'ResNet', accuracy: 94.1 },
  { model: 'YOLOv8', accuracy: 91.5 }, { model: 'T5', accuracy: 93.7 },
];

const columns = [
  { key: 'name', label: 'Model Name' },
  { key: 'version', label: 'Version' },
  { key: 'type', label: 'Type' },
  { key: 'accuracy', label: 'Accuracy' },
  { key: 'latency', label: 'Latency' },
  { key: 'status', label: 'Status', render: (v: string) => <StatusBadge status={v} /> },
  { key: 'cost', label: 'Cost' },
];

const data = [
  { name: 'GPT-4o', version: '2026-07', type: 'LLM', accuracy: '97.2%', latency: '245ms', status: 'Active', cost: '$0.015/req' },
  { name: 'Claude 3.5', version: '2026-06', type: 'LLM', accuracy: '96.8%', latency: '312ms', status: 'Active', cost: '$0.012/req' },
  { name: 'BERT Classifier', version: '2.1.0', type: 'NLP', accuracy: '92.4%', latency: '84ms', status: 'Active', cost: '$0.002/req' },
  { name: 'ResNet-50', version: '3.0.0', type: 'Vision', accuracy: '94.1%', latency: '142ms', status: 'Active', cost: '$0.005/req' },
  { name: 'YOLOv8', version: '8.2.0', type: 'Vision', accuracy: '91.5%', latency: '68ms', status: 'Active', cost: '$0.003/req' },
  { name: 'T5-Summarizer', version: '1.5.0', type: 'NLP', accuracy: '93.7%', latency: '342ms', status: 'Active', cost: '$0.008/req' },
  { name: 'Recommendation', version: '4.2.1', type: 'ML', accuracy: '89.8%', latency: '124ms', status: 'Training', cost: '$0.004/req' },
  { name: 'Anomaly Detector', version: '2.1.0', type: 'ML', accuracy: '95.1%', latency: '28ms', status: 'Active', cost: '$0.001/req' },
];

const AiModels: React.FC = () => {
  return (
    <CtoPageShell
      title="AI Models"
      description="Monitor deployed AI models, training jobs, and performance metrics"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{kpi.label}</div>
                <div className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">{kpi.value}</div>
              </div>
              <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
            </div>
            <div className="text-xs font-semibold text-slate-500 mt-4">{kpi.sub}</div>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-6">Model Accuracy Comparison</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={accuracyData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="model" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
              <YAxis domain={[85, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dx={-10} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              <Bar dataKey="accuracy" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <DataTable columns={columns} data={data} searchable pageSize={10} />
    </CtoPageShell>
  );
};

export default AiModels;

