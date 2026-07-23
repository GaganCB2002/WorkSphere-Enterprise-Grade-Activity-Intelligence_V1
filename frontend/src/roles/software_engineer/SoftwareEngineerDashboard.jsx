import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import ZohoDashboardLayout from '../../components/common/ZohoDashboardLayout'
import {
  CheckSquare, GitPullRequest, Zap, Clock, Code, Play, Pause, RotateCcw,
  FileCode, Layers, ArrowRight, AlertCircle, Check
} from 'lucide-react'

const initialKpis = {
  primary: [
    { title: 'My Active Tasks', value: '8 Tasks', subtitle: 'Assigned sprint tickets', trend: '3 due this week', trendType: 'down', icon: CheckSquare, badge: 'Active', color: 'indigo' },
    { title: 'PRs Open for Review', value: '3 PRs', subtitle: 'Awaiting team review', trend: '1 critical blocker', trendType: 'neutral', icon: GitPullRequest, badge: 'In Review', color: 'amber' },
    { title: 'Sprint Progress', value: '72%', subtitle: 'Personal sprint completion', trend: 'On track for release', trendType: 'up', icon: Zap, badge: 'On Schedule', color: 'emerald' },
    { title: 'Deep Focus Time', value: '32.5 Hours', subtitle: 'Uninterrupted coding hours', trend: '+4h vs last week', trendType: 'up', icon: Clock, badge: 'High Productivity', color: 'cyan' },
  ],
  secondary: [
    { title: 'Commits Pushed', value: '14 Commits', subtitle: 'Pushed to feature branches', trend: 'Active today', trendType: 'up', icon: FileCode, badge: 'Active', color: 'emerald' },
    { title: 'Assigned Bugs', value: '2 Bugs', subtitle: 'Pending fix in staging', trend: 'P2 severity', trendType: 'neutral', icon: AlertCircle, badge: 'Minor', color: 'amber' },
    { title: 'Code Review Requests', value: '4 PRs', subtitle: 'Peer PRs assigned to me', trend: '2 pending', trendType: 'neutral', icon: Code, badge: 'Review Needed', color: 'indigo' },
    { title: 'Remaining Story Points', value: '8 Points', subtitle: 'Sprint #42 backlog', trend: 'Estimated 2 days', trendType: 'up', icon: Layers, badge: 'Feasible', color: 'cyan' },
  ]
}

const initialTasks = [
  { id: 'task-1', task: 'Implement API Gateway rate limiting middleware', project: 'API Gateway', priority: 'High', status: 'In Progress', due: '2026-07-25', points: 5 },
  { id: 'task-2', task: 'Fix authentication session redirect bug on Safari', project: 'Auth Service', priority: 'Critical', status: 'In Progress', due: '2026-07-24', points: 3 },
  { id: 'task-3', task: 'Add unit tests for Redis caching layer', project: 'Core Library', priority: 'Medium', status: 'Todo', due: '2026-07-28', points: 2 },
  { id: 'task-4', task: 'Update OpenAPI / Swagger REST documentation', project: 'Documentation', priority: 'Low', status: 'Todo', due: '2026-08-01', points: 1 },
  { id: 'task-5', task: 'Refactor user profile avatar upload service', project: 'User Microservice', priority: 'High', status: 'Completed', due: '2026-07-22', points: 3 },
]

export default function SoftwareEngineerDashboard() {
  const user = useSelector(state => state.auth?.user) || { name: 'Software Engineer' }
  const [activeTab, setActiveTab] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [taskList, setTaskList] = useState(initialTasks)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [focusTimeLeft, setFocusTimeLeft] = useState(2700) // 45 mins in seconds

  const handleToggleTaskStatus = (id) => {
    setTaskList(prev => prev.map(t => t.id === id ? { ...t, status: t.status === 'Completed' ? 'In Progress' : 'Completed' } : t))
  }

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const filterTabs = [
    { id: 'all', label: 'All Tasks', count: taskList.length },
    { id: 'In Progress', label: 'In Progress', count: taskList.filter(t => t.status === 'In Progress').length },
    { id: 'Todo', label: 'To Do', count: taskList.filter(t => t.status === 'Todo').length },
    { id: 'Completed', label: 'Completed', count: taskList.filter(t => t.status === 'Completed').length },
  ]

  const filteredTasks = taskList.filter(item => {
    const matchesTab = activeTab === 'all' || item.status === activeTab
    const matchesSearch = item.task.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.priority.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesTab && matchesSearch
  })

  return (
    <ZohoDashboardLayout
      roleTitle="Software Engineer Workspace"
      subtitle="My sprint tasks, pull requests & deep focus coding space"
      userName={user.name}
      primaryKpis={initialKpis.primary}
      secondaryKpis={initialKpis.secondary}
      filterTabs={filterTabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      searchValue={searchQuery}
      onSearchChange={setSearchQuery}
      actions={[
        { label: 'Start Focus Block', icon: Play, primary: false, onClick: () => setIsTimerRunning(!isTimerRunning) },
        { label: 'Create New PR', icon: GitPullRequest, primary: true, onClick: () => alert('Opening Pull Request Creator...') }
      ]}
    >
      {/* Top Engineer Banner */}
      <div className="bg-white dark:bg-[#0F172A]/90 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-4 sm:p-5 backdrop-blur-md shadow-sm dark:shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-bold text-xs border border-cyan-500/20">
              Daily Goal
            </span>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">API Gateway & Auth Service Deliverables</h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">Target: Finish 2 high-priority PRs and log 4.5h deep focus work</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right font-mono text-xs">
            <div className="text-slate-500 dark:text-slate-400">Completed Points</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-bold text-sm">18 / 25 Points</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Task Management Panel */}
        <div className="lg:col-span-2 bg-white dark:bg-[#0F172A]/90 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-5 backdrop-blur-md shadow-sm dark:shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                My Sprint Tasks & Deliverables
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">View active assignments, story points, due dates and progress</p>
            </div>
            <span className="text-xs font-mono text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/20">
              {filteredTasks.length} Assigned Tasks
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-3">Task Title</th>
                  <th className="py-3 px-3">Project</th>
                  <th className="py-3 px-3">Points</th>
                  <th className="py-3 px-3">Priority</th>
                  <th className="py-3 px-3">Due Date</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {filteredTasks.length > 0 ? (
                  filteredTasks.map((t) => (
                    <motion.tr
                      key={t.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors group"
                    >
                      <td className="py-3 px-3">
                        <div className={`font-semibold transition-colors ${
                          t.status === 'Completed' ? 'line-through text-slate-400' : 'text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400'
                        }`}>
                          {t.task}
                        </div>
                      </td>
                      <td className="py-3 px-3 font-medium text-slate-700 dark:text-slate-300">{t.project}</td>
                      <td className="py-3 px-3 font-mono text-indigo-600 dark:text-indigo-400 font-bold">{t.points} pts</td>
                      <td className="py-3 px-3">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold border ${
                          t.priority === 'Critical'
                            ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30'
                            : t.priority === 'High'
                            ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                        }`}>
                          {t.priority}
                        </span>
                      </td>
                      <td className="py-3 px-3 font-mono text-slate-500 dark:text-slate-400 text-[11px]">{t.due}</td>
                      <td className="py-3 px-3">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                          t.status === 'Completed'
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                            : t.status === 'In Progress'
                            ? 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/30'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                        }`}>
                          {t.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <button
                          onClick={() => handleToggleTaskStatus(t.id)}
                          className={`p-1.5 rounded-lg border transition-colors ${
                            t.status === 'Completed'
                              ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700'
                              : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
                          }`}
                          title="Toggle Task Status"
                        >
                          <Check className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="py-8 text-center text-slate-500 dark:text-slate-400">
                      No tasks match the selected filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Sidebar: Deep Work Focus Timer & Quick Actions */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-[#0F172A]/90 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-5 backdrop-blur-md shadow-sm dark:shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                Deep Work Focus Space
              </h2>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                isTimerRunning ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 animate-pulse' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700'
              }`}>
                {isTimerRunning ? 'Timer Active' : 'Idle'}
              </span>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-[#1E293B]/70 border border-slate-200 dark:border-slate-800 rounded-xl text-center space-y-3">
              <div className="text-4xl font-extrabold font-mono text-slate-900 dark:text-white tracking-wider">
                {formatTimer(focusTimeLeft)}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Block notifications & activate IDE focus mode</p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5 ${
                    isTimerRunning
                      ? 'bg-rose-600 hover:bg-rose-500 text-white'
                      : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-cyan-600/20'
                  }`}
                >
                  {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  {isTimerRunning ? 'Pause Session' : 'Start 45m Block'}
                </button>
                <button
                  onClick={() => { setIsTimerRunning(false); setFocusTimeLeft(2700); }}
                  className="p-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-300 border border-slate-300 dark:border-slate-700"
                  title="Reset Timer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-[#0F172A]/90 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-5 backdrop-blur-md shadow-sm dark:shadow-xl space-y-4">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Code className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              Engineer Workspace Actions
            </h2>

            <div className="space-y-2">
              {[
                { title: 'View Open Pull Requests', desc: '3 PRs awaiting team code review' },
                { title: 'Log Daily Work Hours', desc: 'Record 7.5h spent on Sprint #42' },
                { title: 'Open Local WebIDE / VS Code', desc: 'Launch development environment' },
              ].map((act, i) => (
                <button
                  key={i}
                  onClick={() => alert(`Triggered: ${act.title}`)}
                  className="w-full text-left p-3 rounded-xl bg-slate-50 dark:bg-[#1E293B]/60 hover:bg-indigo-500/10 border border-slate-200 dark:border-slate-800 hover:border-indigo-500/40 transition-all group"
                >
                  <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-300 flex items-center justify-between">
                    {act.title}
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all" />
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
