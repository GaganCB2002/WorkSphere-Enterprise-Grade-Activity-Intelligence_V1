import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Activity, Server, Zap, GitPullRequest, GitMerge, AlertCircle, ShieldAlert, CheckCircle2, Clock, HardDrive, Cloud, TrendingUp, BarChart3, Users, Code, Bug, Shield, Cpu } from 'lucide-react';
import CtoPageShell from '../CtoPageShell';
import DataTable, { StatusBadge } from '../../../components/common/DataTable/DataTable';

const kpiData = [
  { label: 'Engineering Health Score', value: '94%', sub: '+2.1% vs last quarter', icon: Activity, color: 'text-emerald-500' },
  { label: 'System Availability', value: '99.97%', sub: '99.95% SLA target', icon: Server, color: 'text-blue-500' },
  { label: 'Cloud Cost MTD', value: '$284,500', sub: '8.2% under budget', icon: Cloud, color: 'text-indigo-500' },
  { label: 'Infrastructure Status', value: '12 Services', sub: 'All healthy', icon: Cpu, color: 'text-cyan-500' },
  { label: 'Engineering Velocity', value: '92.3%', sub: '+5.4% this quarter', icon: TrendingUp, color: 'text-violet-500' },
  { label: 'Sprint Progress', value: '78%', sub: 'Day 8 of 10', icon: GitPullRequest, color: 'text-amber-500' },
  { label: 'Deployment Success', value: '99.2%', sub: 'Last 500 deployments', icon: CheckCircle2, color: 'text-green-500' },
  { label: 'Security Score', value: '96/100', sub: '0 critical findings', icon: Shield, color: 'text-rose-500' },
];

const deployFrequency = [
  { day: 'Mon', prod: 12, GitBranch: 18 }, { day: 'Tue', prod: 15, GitBranch: 22 },
  { day: 'Wed', prod: 18, GitBranch: 25 }, { day: 'Thu', prod: 14, GitBranch: 20 },
  { day: 'Fri', prod: 22, GitBranch: 28 }, { day: 'Sat', prod: 8, GitBranch: 12 },
  { day: 'Sun', prod: 6, GitBranch: 10 },
];

const sprintVelocity = [
  { sprint: 'S1', planned: 120, completed: 112 }, { sprint: 'S2', planned: 130, completed: 118 },
  { sprint: 'S3', planned: 125, completed: 108 }, { sprint: 'S4', planned: 140, completed: 132 },
  { sprint: 'S5', planned: 135, completed: 128 }, { sprint: 'S6', planned: 145, completed: 138 },
];

const cloudCost = [
  { service: 'EC2', cost: 85 }, { service: 'RDS', cost: 52 }, { service: 'Lambda', cost: 38 },
  { service: 'S3', cost: 45 }, { service: 'ECS', cost: 32 }, { service: 'CloudFront', cost: 18 },
  { service: 'ElastiCache', cost: 14 },
];

const incidents = [
  { id: 'INC-4521', service: 'API Gateway', severity: 'Critical', status: 'Resolved', detected: '2024-03-15 14:22', duration: '47m', owner: 'Alice Chen' },
  { id: 'INC-4518', service: 'PostgreSQL', severity: 'Major', status: 'Monitoring', detected: '2024-03-15 09:15', duration: '2h 12m', owner: 'Bob Kumar' },
  { id: 'INC-4512', service: 'Redis Cache', severity: 'Minor', status: 'Resolved', detected: '2024-03-14 22:30', duration: '28m', owner: 'Carol Davis' },
  { id: 'INC-4509', service: 'Kafka Stream', severity: 'Major', status: 'Investigating', detected: '2024-03-14 16:45', duration: '1h 05m', owner: 'David Lee' },
  { id: 'INC-4505', service: 'Auth Service', severity: 'Critical', status: 'Resolved', detected: '2024-03-14 11:20', duration: '1h 33m', owner: 'Eve Martinez' },
];

const activityFeed = [
  { text: 'Production deployment v3.2.1 successful', repo: 'core-api', time: '2m ago', icon: 'deploy' },
  { text: 'PR #1482 merged - rate limiting feature', repo: 'api-gateway', time: '15m ago', icon: 'pr' },
  { text: 'Auto-scaling policy updated for prod cluster', repo: 'infra-ops', time: '1h ago', icon: 'system' },
  { text: 'Security scan completed - 0 critical', repo: 'auth-service', time: '2h ago', icon: 'security' },
  { text: 'Database migration v042 applied to GitBranch', repo: 'data-platform', time: '3h ago', icon: 'db' },
];

const incidentColumns = [
  { key: 'id', label: 'Incident ID' },
  { key: 'service', label: 'Service' },
  { key: 'severity', label: 'Severity', render: (v: any) => <StatusBadge status={v} /> },
  { key: 'status', label: 'Status', render: (v: any) => <StatusBadge status={v} /> },
  { key: 'detected', label: 'Detected' },
  { key: 'duration', label: 'Duration' },
  { key: 'owner', label: 'Owner' },
];

const ActivityIcon = ({ type }: { type: string }) => {
  const icons: Record<string, any> = { deploy: Zap, pr: GitMerge, system: Server, security: ShieldAlert, db: HardDrive };
  const Icon = icons[type] || Activity;
  const colors: Record<string, string> = { deploy: `text-blue-500 bg-blue-50`, pr: `text-purple-500 bg-purple-50`, system: `text-slate-500 bg-slate-50`, security: `text-emerald-500 bg-emerald-50`, db: `text-amber-500 bg-amber-50` };
  const [text, bg] = colors[type]?.split(' ') || ['text-slate-500', 'bg-slate-50'];
  return (
    <div className={`w-8 h-8 rounded-lg ${bg} dark:bg-slate-800 flex items-center justify-center border border-slate-200 dark:border-slate-700`}>
      <Icon className={`w-4 h-4 ${text} dark:opacity-80`} />
    </div>
  );
};

const ExecutiveOverview = () => {
  const [query, setQuery] = useState('');
  return (
    <CtoPageShell title="Executive Overview" description="High-level engineering health, infrastructure, and delivery metrics">
      <div className="space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpiData.map((kpi, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-6">Deployment Frequency (7 Days)</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={deployFrequency}>
                  <defs>
                    <linearGradient id="colorProd" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/><stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/></linearGradient>
                    <linearGradient id="colorStaging" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.1}/><stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/></linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dx={-10} />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
                  <Area type="monotone" dataKey="prod" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorProd)" name="Production" />
                  <Area type="monotone" dataKey="GitBranch" stroke="#8b5cf6" strokeWidth={2} fillOpacity={1} fill="url(#colorStaging)" name="GitBranch" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-6">Sprint Velocity (Last 6 Sprints)</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sprintVelocity}>
                  <defs>
                    <linearGradient id="colorPlanned" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#f59e0b" stopOpacity={0.1}/><stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/></linearGradient>
                    <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/><stop offset="95%" stopColor="#10b981" stopOpacity={0}/></linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="sprint" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dx={-10} />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
                  <Area type="monotone" dataKey="planned" stroke="#f59e0b" strokeWidth={2} fillOpacity={1} fill="url(#colorPlanned)" name="Planned" />
                  <Area type="monotone" dataKey="completed" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorCompleted)" name="Completed" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-6">Cloud Cost by Service ($K)</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={cloudCost} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                  <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                  <YAxis type="category" dataKey="service" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} width={90} />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
                  <Bar dataKey="cost" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="lg:col-span-2">
            <DataTable columns={incidentColumns} data={incidents} pageSize={5} searchable />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 bg-[#FAFAFA] dark:bg-slate-800/50">
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">Activity Timeline</h3>
            </div>
            <div className="p-5 space-y-4">
              {activityFeed.map((event, i) => (
                <div key={i} className="flex gap-3">
                  <ActivityIcon type={event.icon} />
                  <div>
                    <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">{event.text}</div>
                    <div className="text-xs text-slate-500 font-medium mt-0.5">{event.repo} • {event.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-2 bg-slate-900 rounded-xl border border-slate-800 shadow-sm p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            <h3 className="text-sm font-bold text-white mb-2">AI Engineering Assistant</h3>
            <p className="text-xs text-slate-400 font-medium mb-4 leading-relaxed">Ask about infrastructure, deployments, incidents, or engineering metrics.</p>
            <div className="flex gap-2 mb-4">
              {['Current system health', 'Top incidents', 'Deployment status'].map((suggestion, i) => (
                <button key={i} onClick={() => setQuery(suggestion)} className="px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-xs text-slate-300 hover:bg-slate-700 transition-colors">{suggestion}</button>
              ))}
            </div>
            <div className="relative">
              <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Ask a question..." className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2.5 pl-3 pr-10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
              <button className="absolute right-2 top-1.5 p-1.5 bg-blue-600 rounded-lg text-white hover:bg-blue-500 transition-colors"><Zap className="w-4 h-4" /></button>
            </div>
          </div>
        </div>
      </div>
    </CtoPageShell>
  );
};

export default ExecutiveOverview;
export { StatusBadge } from '../../../components/common/DataTable/DataTable';




