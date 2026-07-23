// @ts-nocheck
import React from 'react';
import { Brain, FileText, DollarSign, Activity } from 'lucide-react';
import CtoPageShell from '../CtoPageShell';
import DataTable, { StatusBadge } from '../../../components/common/DataTable/DataTable';

const kpis = [
  { label: 'Active LLMs', value: '4', sub: 'Connected providers', icon: Brain, color: 'text-blue-500' },
  { label: 'Total Tokens', value: '847M', sub: 'MTD consumption', icon: FileText, color: 'text-purple-500' },
  { label: 'Cost MTD', value: '$12,847', sub: 'Within budget', icon: DollarSign, color: 'text-emerald-500' },
  { label: 'Rate Limit', value: '1,000/min', sub: 'Per model', icon: Activity, color: 'text-amber-500' },
];

const columns = [
  { key: 'model', label: 'Model' },
  { key: 'provider', label: 'Provider' },
  { key: 'endpoint', label: 'Endpoint' },
  { key: 'maxTokens', label: 'Max Tokens' },
  { key: 'temperature', label: 'Temperature' },
  { key: 'status', label: 'Status', render: (v: string) => <StatusBadge status={v} /> },
];

const data = [
  { model: 'GPT-4o', provider: 'OpenAI', endpoint: 'https://api.openai.com/v1/chat/completions', maxTokens: '8,192', temperature: '0.7', status: 'Active' },
  { model: 'Claude 3.5 Sonnet', provider: 'Anthropic', endpoint: 'https://api.anthropic.com/v1/messages', maxTokens: '8,192', temperature: '0.5', status: 'Active' },
  { model: 'Llama 3.1 70B', provider: 'Self-Hosted', endpoint: 'https://llm.internal/v1/chat', maxTokens: '4,096', temperature: '0.6', status: 'Active' },
  { model: 'Mistral Large', provider: 'Mistral AI', endpoint: 'https://api.mistral.ai/v1/chat', maxTokens: '8,192', temperature: '0.7', status: 'Active' },
  { model: 'Gemini Pro', provider: 'Google AI', endpoint: 'https://generativelanguage.googleapis.com/v1', maxTokens: '8,192', temperature: '0.5', status: 'Inactive' },
];

const LlmConfiguration: React.FC = () => {
  return (
    <CtoPageShell
      title="LLM Configuration"
      description="Manage LLM providers, endpoints, and model configurations"
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

      <DataTable columns={columns} data={data} searchable pageSize={10} />
    </CtoPageShell>
  );
};

export default LlmConfiguration;

