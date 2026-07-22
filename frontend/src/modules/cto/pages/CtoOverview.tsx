import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, Server, Zap, GitPullRequest, GitMerge, AlertCircle, ShieldAlert, CheckCircle2, Clock, HardDrive } from 'lucide-react';

const deployData = [
  { name: 'Mon', count: 24 }, { name: 'Tue', count: 35 }, { name: 'Wed', count: 42 }, 
  { name: 'Thu', count: 38 }, { name: 'Fri', count: 55 }, { name: 'Sat', count: 18 }, { name: 'Sun', count: 22 }
];

export const CtoOverview: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">Engineering Command Center</h1>
          <p className="text-sm text-slate-500 font-medium mt-1">Real-time infrastructure health and deployment metrics</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-200 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
            Download Report
          </button>
          <button className="px-4 py-2 bg-slate-900 dark:bg-blue-600 text-white rounded-lg text-sm font-semibold shadow-sm hover:bg-slate-800 dark:hover:bg-blue-500 transition-colors">
            Create Incident
          </button>
        </div>
      </div>

      {/* Top Row: Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Deployment Success Rate', value: '99.9%', sub: '+0.2% from last week', icon: Zap, color: 'text-emerald-500' },
          { label: 'Active Incidents', value: '0', sub: 'All systems operational', icon: ShieldAlert, color: 'text-slate-400' },
          { label: 'Open Pull Requests', value: '142', sub: '24 pending review', icon: GitPullRequest, color: 'text-blue-500' },
          { label: 'Cloud Spend (MTD)', value: '$42,500', sub: 'On track for month end', icon: Server, color: 'text-indigo-500' },
        ].map((stat, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-300">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{stat.label}</div>
                <div className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">{stat.value}</div>
              </div>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <div className="text-xs font-semibold text-slate-500 mt-4">{stat.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Charts & Trends */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-300">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-6">Deployment Frequency (7 Days)</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={deployData}>
                  <defs>
                    <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dx={-10} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorCount)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Infrastructure Health */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-colors duration-300">
            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-[#FAFAFA] dark:bg-slate-800/50">
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">Live Infrastructure Health</h3>
            </div>
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {[
                { name: 'Core API Gateway', status: 'Healthy', latency: '45ms', usage: '32%', icon: Server },
                { name: 'PostgreSQL Primary', status: 'Healthy', latency: '12ms', usage: '64%', icon: HardDrive },
                { name: 'Redis Cache Cluster', status: 'Healthy', latency: '2ms', usage: '28%', icon: Zap },
                { name: 'Kafka Event Stream', status: 'Healthy', latency: '5ms', usage: '42%', icon: Activity },
                { name: 'Background Workers', status: 'Warning', latency: '125ms', usage: '88%', icon: Clock },
              ].map((service, i) => (
                <div key={i} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center border border-slate-200 dark:border-slate-700">
                      <service.icon className="w-5 h-5 text-slate-600" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900 dark:text-slate-200">{service.name}</div>
                      <div className="text-xs text-slate-500 font-medium mt-0.5">Latency: {service.latency} • CPU: {service.usage}</div>
                    </div>
                  </div>
                  <div className={`px-2.5 py-1 rounded-md flex items-center gap-1.5 text-xs font-bold ${
                    service.status === 'Healthy' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}>
                    {service.status === 'Healthy' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
                    {service.status}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar: Activity Feed */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-colors duration-300">
            <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 bg-[#FAFAFA] dark:bg-slate-800/50">
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">Engineering Activity</h3>
            </div>
            <div className="p-5 space-y-5">
              {[
                { text: 'Production deployment successful', repo: 'core-api', time: '2m ago', type: 'deploy' },
                { text: 'Pull Request #482 merged', repo: 'frontend-web', time: '15m ago', type: 'pr' },
                { text: 'Database backup completed', repo: 'infra-ops', time: '1h ago', type: 'system' },
                { text: 'Security scan passed (0 critical)', repo: 'auth-service', time: '2h ago', type: 'security' },
                { text: 'Auto-scaled Kubernetes cluster', repo: 'k8s-prod', time: '3h ago', type: 'system' },
              ].map((event, i) => (
                <div key={i} className="flex gap-3">
                  <div className="mt-0.5">
                    {event.type === 'deploy' && <RocketIcon />}
                    {event.type === 'pr' && <GitMergeIcon />}
                    {event.type === 'system' && <SystemIcon />}
                    {event.type === 'security' && <ShieldIcon />}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">{event.text}</div>
                    <div className="text-xs text-slate-500 font-medium mt-0.5">{event.repo} • {event.time}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-5 py-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
              <button className="text-xs font-bold text-blue-600 hover:text-blue-700 w-full text-center">View Full Audit Log</button>
            </div>
          </div>

          <div className="bg-slate-900 rounded-xl border border-slate-800 shadow-sm p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
            <h3 className="text-sm font-bold text-white mb-2">AI Engineering Assistant</h3>
            <p className="text-xs text-slate-400 font-medium mb-4 leading-relaxed">
              Ask Copilot to analyze architecture, search logs, or explain recent incidents.
            </p>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Ask about infrastructure..." 
                className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2 pl-3 pr-10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              <button className="absolute right-2 top-1.5 p-1 bg-blue-600 rounded text-white hover:bg-blue-500">
                <Zap className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Micro-icons for activity feed
const RocketIcon = () => <div className="w-6 h-6 rounded bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-100 dark:border-blue-500/20"><Zap className="w-3 h-3" /></div>;
const GitMergeIcon = () => <div className="w-6 h-6 rounded bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center border border-purple-100 dark:border-purple-500/20"><GitMerge className="w-3 h-3" /></div>;
const SystemIcon = () => <div className="w-6 h-6 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 flex items-center justify-center border border-slate-200 dark:border-slate-700"><Server className="w-3 h-3" /></div>;
const ShieldIcon = () => <div className="w-6 h-6 rounded bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-100 dark:border-emerald-500/20"><ShieldAlert className="w-3 h-3" /></div>;
