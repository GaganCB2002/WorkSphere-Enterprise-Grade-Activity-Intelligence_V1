import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import ZohoDashboardLayout from '../../components/common/ZohoDashboardLayout'
import {
  Server, Cpu, Activity, ShieldCheck, Play, RotateCcw, Clock, DollarSign,
  Layers, Terminal, ArrowRight, Zap, CheckCircle2
} from 'lucide-react'

const initialKpis = {
  primary: [
    { title: 'Pipeline Success Rate', value: '98.2%', subtitle: 'Last 1,000 CI/CD runs', trend: '+1.4% this week', trendType: 'up', icon: Activity, badge: 'Healthy', color: 'emerald' },
    { title: 'Monthly Infra Cost', value: '$124.8K', subtitle: 'AWS & GCP cloud spend', trend: '+8% vs budget', trendType: 'down', icon: DollarSign, badge: 'Budget Alert', color: 'amber' },
    { title: 'Kubernetes Pod Health', value: '156 / 160', subtitle: 'Running active pods', trend: '4 degraded', trendType: 'neutral', icon: Server, badge: '97.5% Healthy', color: 'cyan' },
    { title: 'Mean Time to Resolve', value: '12.4m', subtitle: 'Incident MTTR', trend: '-3m improvement', trendType: 'up', icon: Clock, badge: 'Optimal', color: 'indigo' },
  ],
  secondary: [
    { title: 'Active Clusters', value: '3 K8s', subtitle: 'US-East, EU-West, AP-East', trend: '100% operational', trendType: 'up', icon: Cpu, badge: 'Online', color: 'emerald' },
    { title: 'Avg Build Duration', value: '4m 12s', subtitle: 'Docker & npm build time', trend: '-18s faster', trendType: 'up', icon: Zap, badge: 'Fast', color: 'cyan' },
    { title: 'Zero Trust Security', value: 'Passed', subtitle: 'Falco & Trivy container scans', trend: '0 high CVEs', trendType: 'up', icon: ShieldCheck, badge: 'Secure', color: 'emerald' },
    { title: 'Deployment Status', value: 'v3.4.1', subtitle: 'Latest production release', trend: 'Deployed 2h ago', trendType: 'neutral', icon: Layers, badge: 'Stable', color: 'indigo' },
  ]
}

const initialPipelines = [
  { id: 'pipe-1', name: 'api-gateway-service', branch: 'main', status: 'Passing', duration: '4m 12s', commit: 'a3f2b1c', author: 'DevOps Bot', env: 'Production' },
  { id: 'pipe-2', name: 'frontend-web-app', branch: 'staging', status: 'Passing', duration: '6m 34s', commit: 'b7e4d8f', author: 'Sarah J.', env: 'Staging' },
  { id: 'pipe-3', name: 'data-etl-pipeline', branch: 'production', status: 'Failed', duration: '12m 08s', commit: 'f1a9c3e', author: 'Data Pipeline', env: 'Production' },
  { id: 'pipe-4', name: 'ml-inference-cluster', branch: 'develop', status: 'Running', duration: '2m 45s...', commit: 'd4e5f6a', author: 'Alex M.', env: 'Development' },
  { id: 'pipe-5', name: 'auth-security-scan', branch: 'main', status: 'Passing', duration: '3m 10s', commit: 'e9c8b7a', author: 'SecOps Bot', env: 'Production' },
]

export default function DevOpsDashboard() {
  const user = useSelector(state => state.auth?.user) || { name: 'DevOps Engineer' }
  const [activeTab, setActiveTab] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [pipelineList, setPipelineList] = useState(initialPipelines)

  const handleRerun = (id) => {
    setPipelineList(prev => prev.map(p => p.id === id ? { ...p, status: 'Running', duration: '0m 05s...' } : p))
  }

  const filterTabs = [
    { id: 'all', label: 'All Pipelines', count: pipelineList.length },
    { id: 'Passing', label: 'Passing', count: pipelineList.filter(p => p.status === 'Passing').length },
    { id: 'Failed', label: 'Failed', count: pipelineList.filter(p => p.status === 'Failed').length },
    { id: 'Running', label: 'Running', count: pipelineList.filter(p => p.status === 'Running').length },
  ]

  const filteredPipelines = pipelineList.filter(pipe => {
    const matchesTab = activeTab === 'all' || pipe.status === activeTab
    const matchesSearch = pipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          pipe.branch.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          pipe.commit.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesTab && matchesSearch
  })

  return (
    <ZohoDashboardLayout
      roleTitle="DevOps Engineering Command Center"
      subtitle="CI/CD pipelines, Kubernetes clusters & cloud infrastructure telemetry"
      userName={user.name}
      primaryKpis={initialKpis.primary}
      secondaryKpis={initialKpis.secondary}
      filterTabs={filterTabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      searchValue={searchQuery}
      onSearchChange={setSearchQuery}
      actions={[
        { label: 'Trigger Build', icon: Play, primary: false, onClick: () => alert('Triggering Build Pipeline...') },
        { label: 'Kubernetes Portal', icon: Terminal, primary: true, onClick: () => alert('Launching K8s Command Center...') }
      ]}
    >
      {/* Top Cluster Health Telemetry Header */}
      <div className="bg-white dark:bg-[#0F172A]/90 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-4 sm:p-5 backdrop-blur-md shadow-sm dark:shadow-xl space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Server className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">Multi-Cloud Infrastructure Regions</h2>
          </div>
          <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Global Edge Operational
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between">
            <div>
              <div className="font-bold text-slate-900 dark:text-white">US-East (Virginia)</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">AWS EKS Cluster • 64 Nodes</div>
            </div>
            <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/20 text-[10px]">
              99.99%
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between">
            <div>
              <div className="font-bold text-slate-900 dark:text-white">EU-West (Frankfurt)</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">GCP GKE Cluster • 48 Nodes</div>
            </div>
            <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/20 text-[10px]">
              100%
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between">
            <div>
              <div className="font-bold text-slate-900 dark:text-white">AP-East (Tokyo)</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">AWS EKS Cluster • 32 Nodes</div>
            </div>
            <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/20 text-[10px]">
              99.95%
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pipeline Table */}
        <div className="lg:col-span-2 bg-white dark:bg-[#0F172A]/90 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-5 backdrop-blur-md shadow-sm dark:shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                CI/CD Deployment & Build Pipelines
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Monitor automated workflows, build statuses and deployment targets</p>
            </div>
            <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
              {filteredPipelines.length} Active Pipelines
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-3">Pipeline Name</th>
                  <th className="py-3 px-3">Branch</th>
                  <th className="py-3 px-3">Target Env</th>
                  <th className="py-3 px-3">Duration</th>
                  <th className="py-3 px-3">Commit</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {filteredPipelines.length > 0 ? (
                  filteredPipelines.map((pipe) => (
                    <motion.tr
                      key={pipe.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors group"
                    >
                      <td className="py-3 px-3">
                        <div className="font-semibold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors flex items-center gap-2">
                          <Server className="w-3.5 h-3.5 text-slate-400" />
                          {pipe.name}
                        </div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400">Triggered by {pipe.author}</div>
                      </td>
                      <td className="py-3 px-3 font-mono text-[11px] text-indigo-600 dark:text-indigo-400">{pipe.branch}</td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[10px] font-bold text-slate-700 dark:text-slate-300">
                          {pipe.env}
                        </span>
                      </td>
                      <td className="py-3 px-3 font-mono text-slate-700 dark:text-slate-300">{pipe.duration}</td>
                      <td className="py-3 px-3 font-mono text-slate-500 dark:text-slate-400 text-[11px]">{pipe.commit}</td>
                      <td className="py-3 px-3">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                          pipe.status === 'Passing'
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                            : pipe.status === 'Failed'
                            ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30'
                            : 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/30 animate-pulse'
                        }`}>
                          {pipe.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <button
                          onClick={() => handleRerun(pipe.id)}
                          className="p-1.5 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30 transition-colors"
                          title="Rerun Pipeline"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="py-8 text-center text-slate-500 dark:text-slate-400">
                      No pipelines match the selected filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Sidebar: Kubernetes Infrastructure Status & Quick Tools */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-[#0F172A]/90 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-5 backdrop-blur-md shadow-sm dark:shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Cpu className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                Cluster Resource Utilization
              </h2>
              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                US-East Cluster
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  <span>CPU Allocation</span>
                  <span className="text-indigo-600 dark:text-indigo-400 font-mono">64% / 128 Cores</span>
                </div>
                <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-600 dark:bg-indigo-500 rounded-full" style={{ width: '64%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  <span>RAM Memory</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-mono">184GB / 256GB</span>
                </div>
                <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-600 dark:bg-emerald-500 rounded-full" style={{ width: '72%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  <span>Cluster Storage</span>
                  <span className="text-cyan-600 dark:text-cyan-400 font-mono">1.2TB / 4TB</span>
                </div>
                <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-600 dark:bg-cyan-500 rounded-full" style={{ width: '30%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-[#0F172A]/90 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-5 backdrop-blur-md shadow-sm dark:shadow-xl space-y-4">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Terminal className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              Quick DevOps Operations
            </h2>

            <div className="space-y-2">
              {[
                { title: 'Restart Degraded K8s Pods', desc: '4 pods operating in degraded state' },
                { title: 'Purge Cloudflare Edge Cache', desc: 'Invalidate global CDN cache' },
                { title: 'Run Infrastructure Terraform Audit', desc: 'Check drift in cloud resources' },
              ].map((act, i) => (
                <button
                  key={i}
                  onClick={() => alert(`Executed: ${act.title}`)}
                  className="w-full text-left p-3 rounded-xl bg-slate-50 dark:bg-[#1E293B]/60 hover:bg-emerald-500/10 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/40 transition-all group"
                >
                  <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-300 flex items-center justify-between">
                    {act.title}
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{act.desc}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ZohoDashboardLayout>
  )
}
