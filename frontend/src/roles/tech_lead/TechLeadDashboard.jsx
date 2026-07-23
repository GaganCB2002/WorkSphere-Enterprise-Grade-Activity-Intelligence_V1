import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import ZohoDashboardLayout from '../../components/common/ZohoDashboardLayout'
import {
  GitPullRequest, GitMerge, ShieldCheck, Zap, AlertCircle, CheckCircle2,
  Clock, Code, Users, FileText, ArrowRight, Activity, Sparkles, Check, X, TrendingUp
} from 'lucide-react'
import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts'

const initialKpis = {
  primary: [
    { title: 'Sprint Velocity', value: '128 pts', subtitle: 'Completed story points', trend: '+12% vs last sprint', trendType: 'up', icon: Zap, badge: 'On Track', color: 'emerald' },
    { title: 'Pending Code Reviews', value: '14 PRs', subtitle: 'Awaiting tech lead review', trend: '3 critical', trendType: 'down', icon: GitPullRequest, badge: '3 Urgent', color: 'amber' },
    { title: 'PRs Merged', value: '47', subtitle: 'This active sprint', trend: '+22% vs average', trendType: 'up', icon: GitMerge, badge: 'High Activity', color: 'indigo' },
    { title: 'Test Coverage', value: '87.5%', subtitle: 'Codebase unit test coverage', trend: '+2.3% improvement', trendType: 'up', icon: ShieldCheck, badge: 'Passing', color: 'cyan' },
  ],
  secondary: [
    { title: 'Active Sprint Blockers', value: '2 Tickets', subtitle: 'Requires tech lead triage', trend: '-2 resolved today', trendType: 'up', icon: AlertCircle, badge: 'Action Required', color: 'rose' },
    { title: 'Avg Review Speed', value: '1.4 Hours', subtitle: 'Turnaround time', trend: '-25m improvement', trendType: 'up', icon: Clock, badge: 'Optimal', color: 'emerald' },
    { title: 'Code Smells / Security', value: '0 Critical', subtitle: 'SonarQube quality gate', trend: 'Passed cleanly', trendType: 'up', icon: CheckCircle2, badge: 'Secure', color: 'indigo' },
    { title: 'Active Developers', value: '12 Eng', subtitle: 'Working on Sprint #42', trend: '100% capacity', trendType: 'neutral', icon: Users, badge: 'Fully Staffed', color: 'cyan' },
  ]
}

const velocityData = [
  { sprint: 'Sprint 38', committed: 110, completed: 105 },
  { sprint: 'Sprint 39', committed: 120, completed: 118 },
  { sprint: 'Sprint 40', committed: 115, completed: 95 },
  { sprint: 'Sprint 41', committed: 130, completed: 128 },
  { sprint: 'Sprint 42', committed: 140, completed: 128 },
]

const initialReviews = [
  { id: 'pr-1', pr: '#342 API Gateway Rate Limiter', author: 'Sarah J.', repo: 'backend/api-gateway', lines: '+842 / -124', status: 'Changes Requested', age: '2h ago', priority: 'High' },
  { id: 'pr-2', pr: '#343 Distributed Cache Layer', author: 'Michael C.', repo: 'backend/core-services', lines: '+356 / -89', status: 'Approved', age: '30m ago', priority: 'Medium' },
  { id: 'pr-3', pr: '#344 Auth Microservice Refactor', author: 'David R.', repo: 'services/auth-service', lines: '+1,204 / -567', status: 'Open', age: '4h ago', priority: 'Critical' },
  { id: 'pr-4', pr: '#345 Structured Logging Fix', author: 'Ananya G.', repo: 'common/logger', lines: '+45 / -12', status: 'Approved', age: '15m ago', priority: 'Low' },
  { id: 'pr-5', pr: '#346 DB Migration Script v2', author: 'Alex M.', repo: 'database/migrations', lines: '+180 / -40', status: 'Open', age: '1h ago', priority: 'High' },
]

export default function TechLeadDashboard() {
  const user = useSelector(state => state.auth?.user) || { name: 'Tech Lead' }
  const [activeTab, setActiveTab] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [reviewsList, setReviewsList] = useState(initialReviews)

  const handleApprove = (id) => {
    setReviewsList(prev => prev.map(item => item.id === id ? { ...item, status: 'Approved' } : item))
  }

  const handleReject = (id) => {
    setReviewsList(prev => prev.map(item => item.id === id ? { ...item, status: 'Changes Requested' } : item))
  }

  const filterTabs = [
    { id: 'all', label: 'All Reviews', count: reviewsList.length },
    { id: 'Open', label: 'Needs Review', count: reviewsList.filter(r => r.status === 'Open').length },
    { id: 'Approved', label: 'Approved', count: reviewsList.filter(r => r.status === 'Approved').length },
    { id: 'Changes Requested', label: 'Changes Requested', count: reviewsList.filter(r => r.status === 'Changes Requested').length },
  ]

  const filteredReviews = reviewsList.filter(review => {
    const matchesTab = activeTab === 'all' || review.status === activeTab
    const matchesSearch = review.pr.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          review.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          review.repo.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesTab && matchesSearch
  })

  return (
    <ZohoDashboardLayout
      roleTitle="Team Lead Command Center"
      subtitle="Sprint tracking, code reviews & engineering team velocity"
      userName={user.name}
      primaryKpis={initialKpis.primary}
      secondaryKpis={initialKpis.secondary}
      filterTabs={filterTabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      searchValue={searchQuery}
      onSearchChange={setSearchQuery}
      actions={[
        { label: 'Create Sprint Task', icon: Code, primary: false, onClick: () => alert('Opening Task Creation Modal') },
        { label: 'Generate Status Report', icon: FileText, primary: true, onClick: () => alert('Generating Tech Lead Report...') }
      ]}
    >
      {/* Team Lead Header Banner: Sprint Progress */}
      <div className="bg-white dark:bg-[#0F172A]/90 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-4 sm:p-5 backdrop-blur-md shadow-sm dark:shadow-xl space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold text-xs border border-indigo-500/20">
              Sprint #42 Active
            </span>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">Backend & Infrastructure Milestone</h2>
          </div>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">12 Days Remaining • Code Freeze Friday</span>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-slate-600 dark:text-slate-300">Sprint Target Completion</span>
            <span className="text-indigo-600 dark:text-indigo-400 font-mono">128 / 140 Points (91.4%)</span>
          </div>
          <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-600 dark:bg-indigo-500 rounded-full" style={{ width: '91.4%' }}></div>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Review Queue Table + Right Charts & AI Risk Copilot */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Code Review Queue & PR Diff Inspector */}
        <div className="lg:col-span-2 bg-white dark:bg-[#0F172A]/90 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-5 backdrop-blur-md shadow-sm dark:shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <GitPullRequest className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                Pending Code Review Queue & PR Diffs
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Review PR changes, check diff lines, and approve or request revisions</p>
            </div>
            <span className="text-xs font-mono text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/20">
              {filteredReviews.length} Pull Requests
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-3">Pull Request</th>
                  <th className="py-3 px-3">Author</th>
                  <th className="py-3 px-3">Repository</th>
                  <th className="py-3 px-3">Diff</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {filteredReviews.length > 0 ? (
                  filteredReviews.map((rev) => (
                    <motion.tr
                      key={rev.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors group"
                    >
                      <td className="py-3 px-3">
                        <div className="font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          {rev.pr}
                        </div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400">{rev.age}</div>
                      </td>
                      <td className="py-3 px-3">
                        <span className="inline-flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-200">
                          <span className="w-5 h-5 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-[10px] font-bold text-indigo-600 dark:text-indigo-400">
                            {rev.author.charAt(0)}
                          </span>
                          {rev.author}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-slate-500 dark:text-slate-400 font-mono text-[11px]">{rev.repo}</td>
                      <td className="py-3 px-3 font-mono text-[11px]">
                        <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{rev.lines.split('/')[0]}</span> /{' '}
                        <span className="text-rose-600 dark:text-rose-400 font-semibold">{rev.lines.split('/')[1]}</span>
                      </td>
                      <td className="py-3 px-3">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                          rev.status === 'Approved'
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                            : rev.status === 'Changes Requested'
                            ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30'
                            : 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/30'
                        }`}>
                          {rev.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleApprove(rev.id)}
                            className="p-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 transition-colors"
                            title="Approve PR"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleReject(rev.id)}
                            className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/30 transition-colors"
                            title="Request Changes"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="py-8 text-center text-slate-500 dark:text-slate-400">
                      No pull requests match the selected criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Recharts Velocity Chart & AI Risk Copilot */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-[#0F172A]/90 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-5 backdrop-blur-md shadow-sm dark:shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                Sprint Velocity Trends
              </h2>
              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">P1 - P5</span>
            </div>

            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={velocityData} margin={{ top: 5, right: 0, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} vertical={false} />
                  <XAxis dataKey="sprint" stroke="#64748B" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748B" fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '10px', color: '#fff', fontSize: '11px' }}
                  />
                  <Bar dataKey="committed" name="Committed" fill="#94A3B8" radius={[4, 4, 0, 0]} barSize={20} />
                  <Bar dataKey="completed" name="Completed" fill="#6366F1" radius={[4, 4, 0, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white dark:bg-[#0F172A]/90 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-5 backdrop-blur-md shadow-sm dark:shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400 animate-pulse" />
                AI Risk Assessment Copilot
              </h2>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl space-y-1">
                <div className="font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5" /> High Risk Bottleneck
                </div>
                <p className="text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed">
                  Database migration ticket (ENG-402) is <span className="font-bold text-rose-600 dark:text-rose-400">22% behind schedule</span> and blocking 4 dependent frontend tasks.
                </p>
              </div>

              <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl space-y-1">
                <div className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Delivery Predictor
                </div>
                <p className="text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed">
                  Based on current team review turnaround, Sprint #42 release candidate will be ready for staging by Thursday 2:00 PM.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ZohoDashboardLayout>
  )
}
