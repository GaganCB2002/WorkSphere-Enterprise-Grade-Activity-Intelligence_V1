import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import ZohoDashboardLayout from '../../components/common/ZohoDashboardLayout'
import {
  ShieldCheck, Bug, CheckCircle2, AlertTriangle, Play, FileText,
  Clock, Cpu, Zap, ArrowRight, Plus, Check, Shield, Activity
} from 'lucide-react'
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts'

const initialKpis = {
  primary: [
    { title: 'Test Pass Rate', value: '96.8%', subtitle: 'Across 10,000 automated test runs', trend: '+1.2% improvement', trendType: 'up', icon: ShieldCheck, badge: 'Passing', color: 'emerald' },
    { title: 'Open Bugs', value: '47 Bugs', subtitle: 'Reported defects across products', trend: '12 high priority', trendType: 'down', icon: Bug, badge: 'Needs Triage', color: 'rose' },
    { title: 'Test Coverage', value: '87.5%', subtitle: 'Codebase automated test coverage', trend: '+2.3% this sprint', trendType: 'up', icon: CheckCircle2, badge: 'Optimal', color: 'cyan' },
    { title: 'Automation Ratio', value: '72.4%', subtitle: 'Automated vs manual test ratio', trend: '+5% target next Q', trendType: 'up', icon: Cpu, badge: 'High Auto', color: 'indigo' },
  ],
  secondary: [
    { title: 'Critical Defects', value: '2 Critical', subtitle: 'P0 / P1 blocking issues', trend: '-3 resolved today', trendType: 'up', icon: AlertTriangle, badge: 'P0 Priority', color: 'rose' },
    { title: 'Active Test Suites', value: '14 Suites', subtitle: 'Cypress, Playwright & Jest', trend: 'All active', trendType: 'neutral', icon: Play, badge: 'Active', color: 'emerald' },
    { title: 'Flaky Tests Identified', value: '3 Tests', subtitle: 'Requires test stabilization', trend: 'Quarantined', trendType: 'neutral', icon: Clock, badge: 'Quarantined', color: 'amber' },
    { title: 'Avg Test Suite Time', value: '8m 14s', subtitle: 'Full E2E regression run duration', trend: '-45s faster', trendType: 'up', icon: Zap, badge: 'Fast', color: 'indigo' },
  ]
}

const pieData = [
  { name: 'Passing Tests', value: 96.8, color: '#10b981' },
  { name: 'Failing Tests', value: 2.1, color: '#ef4444' },
  { name: 'Skipped Tests', value: 1.1, color: '#f59e0b' },
]

const initialBugs = [
  { id: 'BUG-847', title: 'Login OAuth timeout on Safari Browser', severity: 'Critical', status: 'Open', assignee: 'Elena R.', product: 'Authentication', created: '2h ago' },
  { id: 'BUG-846', title: 'Dashboard chart alignment glitch on mobile', severity: 'Medium', status: 'In Progress', assignee: 'Ananya G.', product: 'Frontend UI', created: '1d ago' },
  { id: 'BUG-845', title: 'REST API returns 500 status on empty JSON payload', severity: 'High', status: 'Fixed', assignee: 'Sarah J.', product: 'API Gateway', created: '3d ago' },
  { id: 'BUG-844', title: 'Notification dispatch latency > 30 seconds', severity: 'Low', status: 'Open', assignee: 'Michael C.', product: 'Notification Hub', created: '5d ago' },
  { id: 'BUG-843', title: 'CSV Export missing UTF-8 BOM encoding', severity: 'Medium', status: 'In Progress', assignee: 'Alex M.', product: 'Reports Engine', created: '1w ago' },
]

export default function QaDashboard() {
  const user = useSelector(state => state.auth?.user) || { name: 'QA Engineer' }
  const [activeTab, setActiveTab] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [bugsList, setBugsList] = useState(initialBugs)

  const handleResolveBug = (id) => {
    setBugsList(prev => prev.map(b => b.id === id ? { ...b, status: 'Fixed' } : b))
  }

  const filterTabs = [
    { id: 'all', label: 'All Bugs', count: bugsList.length },
    { id: 'Open', label: 'Open', count: bugsList.filter(b => b.status === 'Open').length },
    { id: 'In Progress', label: 'In Progress', count: bugsList.filter(b => b.status === 'In Progress').length },
    { id: 'Fixed', label: 'Fixed', count: bugsList.filter(b => b.status === 'Fixed').length },
  ]

  const filteredBugs = bugsList.filter(bug => {
    const matchesTab = activeTab === 'all' || bug.status === activeTab
    const matchesSearch = bug.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          bug.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          bug.assignee.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          bug.product.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesTab && matchesSearch
  })

  return (
    <ZohoDashboardLayout
      roleTitle="Quality Assurance Command Center"
      subtitle="Test suite metrics, defect tracking & automated test coverage"
      userName={user.name}
      primaryKpis={initialKpis.primary}
      secondaryKpis={initialKpis.secondary}
      filterTabs={filterTabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      searchValue={searchQuery}
      onSearchChange={setSearchQuery}
      actions={[
        { label: 'Run Test Suite', icon: Play, primary: false, onClick: () => alert('Triggering Automated E2E Regression Suite...') },
        { label: 'Report New Defect', icon: Plus, primary: true, onClick: () => alert('Opening Defect Reporter Modal...') }
      ]}
    >
      {/* Top QA Banner: Release Readiness Index */}
      <div className="bg-white dark:bg-[#0F172A]/90 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-5 backdrop-blur-md shadow-sm dark:shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">Sprint #42 Release Readiness Index</h2>
          </div>
          <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">92 / 100</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold">
          <div>
            <div className="flex justify-between text-slate-700 dark:text-slate-300 mb-1">
              <span>Critical Path Test Coverage</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-mono">94%</span>
            </div>
            <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: '94%' }}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-slate-700 dark:text-slate-300 mb-1">
              <span>Regression Suite Pass Rate</span>
              <span className="text-indigo-600 dark:text-indigo-400 font-mono">96.8%</span>
            </div>
            <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-500 rounded-full" style={{ width: '96.8%' }}></div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Open Defects Data Table */}
        <div className="lg:col-span-2 bg-white dark:bg-[#0F172A]/90 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-5 backdrop-blur-md shadow-sm dark:shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Bug className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                Defect Triage & Bug Reports
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Track logged defects, assignees, severity levels and resolution status</p>
            </div>
            <span className="text-xs font-mono text-rose-600 dark:text-rose-400 bg-rose-500/10 px-2.5 py-1 rounded-full border border-rose-500/20">
              {filteredBugs.length} Active Defects
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-3">Bug ID</th>
                  <th className="py-3 px-3">Issue Title</th>
                  <th className="py-3 px-3">Product Area</th>
                  <th className="py-3 px-3">Severity</th>
                  <th className="py-3 px-3">Assignee</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {filteredBugs.length > 0 ? (
                  filteredBugs.map((bug) => (
                    <motion.tr
                      key={bug.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors group"
                    >
                      <td className="py-3 px-3 font-mono font-bold text-rose-600 dark:text-rose-400">{bug.id}</td>
                      <td className="py-3 px-3">
                        <div className="font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          {bug.title}
                        </div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400">Reported {bug.created}</div>
                      </td>
                      <td className="py-3 px-3 text-slate-700 dark:text-slate-300 font-medium">{bug.product}</td>
                      <td className="py-3 px-3">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold border ${
                          bug.severity === 'Critical'
                            ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30'
                            : bug.severity === 'High'
                            ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                        }`}>
                          {bug.severity}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-slate-700 dark:text-slate-300 font-medium">{bug.assignee}</td>
                      <td className="py-3 px-3">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                          bug.status === 'Fixed'
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                            : bug.status === 'In Progress'
                            ? 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/30'
                            : 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30'
                        }`}>
                          {bug.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        {bug.status !== 'Fixed' && (
                          <button
                            onClick={() => handleResolveBug(bug.id)}
                            className="p-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 transition-colors"
                            title="Mark as Fixed"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="py-8 text-center text-slate-500 dark:text-slate-400">
                      No defects match the selected filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Sidebar: Test Automation Runner & Pie Chart */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-[#0F172A]/90 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-5 backdrop-blur-md shadow-sm dark:shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Activity className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                Test Suite Pass Breakdown
              </h2>
            </div>

            <div className="h-44 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={40} outerRadius={65} paddingAngle={4} dataKey="value" stroke="none">
                    {pieData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '10px', color: '#fff', fontSize: '11px' }}
                    formatter={(val) => [`${val}%`, 'Ratio']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-3 text-xs font-semibold text-slate-500 dark:text-slate-400">
              {pieData.map(d => (
                <span key={d.name} className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                  {d.name} ({d.value}%)
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-[#0F172A]/90 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-5 backdrop-blur-md shadow-sm dark:shadow-xl space-y-4">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              Quick QA Actions
            </h2>

            <div className="space-y-2">
              {[
                { title: 'Export Quality Audit Report', desc: 'Download PDF summary for Release #42' },
                { title: 'Quarantine Flaky Unit Tests', desc: 'Isolate 3 intermittent failing specs' },
                { title: 'Inspect Playwright Trace Logs', desc: 'View video recordings & visual diffs' },
              ].map((act, i) => (
                <button
                  key={i}
                  onClick={() => alert(`Executed: ${act.title}`)}
                  className="w-full text-left p-3 rounded-xl bg-slate-50 dark:bg-[#1E293B]/60 hover:bg-cyan-500/10 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/40 transition-all group"
                >
                  <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-cyan-600 dark:group-hover:text-cyan-300 flex items-center justify-between">
                    {act.title}
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all" />
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
