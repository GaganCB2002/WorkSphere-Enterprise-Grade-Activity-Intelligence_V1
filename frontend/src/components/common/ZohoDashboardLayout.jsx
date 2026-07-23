import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Search, RefreshCw, Layers, ChevronRight, Filter, ArrowUpRight, ArrowDownRight
} from 'lucide-react'

export const ZohoKpiCard = ({ title, value, subtitle, trend, trendType, icon: Icon, badge, color = 'indigo' }) => {
  const colorStyles = {
    indigo: {
      border: 'hover:border-indigo-500/50',
      iconBg: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20',
      badge: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/30'
    },
    emerald: {
      border: 'hover:border-emerald-500/50',
      iconBg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
      badge: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
    },
    amber: {
      border: 'hover:border-amber-500/50',
      iconBg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
      badge: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30'
    },
    rose: {
      border: 'hover:border-rose-500/50',
      iconBg: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
      badge: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30'
    },
    cyan: {
      border: 'hover:border-cyan-500/50',
      iconBg: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20',
      badge: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/30'
    }
  }[color] || {
    border: 'hover:border-indigo-500/50',
    iconBg: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20',
    badge: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/30'
  }

  const isUp = trendType === 'up'
  const isDown = trendType === 'down'

  return (
    <motion.div
      whileHover={{ y: -2, transition: { duration: 0.15 } }}
      className={`bg-white dark:bg-[#0F172A]/90 border border-slate-200 dark:border-slate-800/80 backdrop-blur-md rounded-2xl p-4 sm:p-5 relative overflow-hidden shadow-sm dark:shadow-xl transition-all duration-200 ${colorStyles.border} group`}
    >
      <div className="flex justify-between items-start mb-3">
        <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{title}</span>
        <div className={`p-2 rounded-xl border ${colorStyles.iconBg} transition-transform group-hover:scale-110 duration-200`}>
          {Icon ? <Icon className="w-4 h-4" /> : <Layers className="w-4 h-4" />}
        </div>
      </div>

      <div className="flex items-baseline gap-2 mb-2">
        <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">{value}</span>
        {badge && (
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${colorStyles.badge}`}>
            {badge}
          </span>
        )}
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800/60 text-xs">
        <span className="text-slate-500 dark:text-slate-400 truncate">{subtitle}</span>
        {trend && (
          <span className={`flex items-center gap-0.5 font-semibold text-[11px] ${
            isUp ? 'text-emerald-600 dark:text-emerald-400' : isDown ? 'text-rose-600 dark:text-rose-400' : 'text-slate-500 dark:text-slate-400'
          }`}>
            {isUp && <ArrowUpRight className="w-3.5 h-3.5" />}
            {isDown && <ArrowDownRight className="w-3.5 h-3.5" />}
            {trend}
          </span>
        )}
      </div>
    </motion.div>
  )
}

export default function ZohoDashboardLayout({
  roleTitle,
  subtitle,
  userName,
  primaryKpis = [],
  secondaryKpis = [],
  filterTabs = [],
  activeTab,
  onTabChange,
  searchValue = '',
  onSearchChange,
  actions = [],
  children
}) {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const todayDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
  })

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => setIsRefreshing(false), 600)
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 p-4 sm:p-6 space-y-6 font-sans antialiased">
      {/* Top Navigation & Breadcrumbs Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white dark:bg-[#0F172A]/90 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-4 sm:p-5 backdrop-blur-md shadow-sm dark:shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <span>WorkSphere</span>
            <ChevronRight className="w-3 h-3 text-slate-400 dark:text-slate-600" />
            <span className="text-indigo-600 dark:text-indigo-400 font-bold">{roleTitle}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            {roleTitle}
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
              v3.0 Workspace
            </span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {userName ? `Welcome back, ${userName.split(' ')[0]} • ` : ''}{todayDate}
          </p>
        </div>

        {/* Action Controls & Global Search */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Quick Search Input */}
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search metrics, items..."
              value={searchValue}
              onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
              className="w-full bg-slate-100 dark:bg-[#1E293B]/70 border border-slate-200 dark:border-slate-700/60 rounded-xl pl-9 pr-8 py-2 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition-all"
            />
            <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono text-slate-400 dark:text-slate-500 bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 rounded border border-slate-300 dark:border-slate-700">
              ⌘K
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleRefresh}
              className={`p-2 bg-slate-100 dark:bg-[#1E293B]/70 hover:bg-slate-200 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700/60 rounded-xl text-slate-600 dark:text-slate-300 transition-all ${
                isRefreshing ? 'animate-spin text-indigo-600 dark:text-indigo-400' : ''
              }`}
              title="Refresh Dashboard"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            {actions.map((act, i) => (
              <button
                key={i}
                onClick={act.onClick}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all shadow-sm ${
                  act.primary
                    ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/20'
                    : 'bg-slate-100 dark:bg-[#1E293B]/80 hover:bg-slate-200 dark:hover:bg-slate-700/80 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700/60'
                }`}
              >
                {act.icon && <act.icon className="w-3.5 h-3.5" />}
                <span>{act.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Dual-Tier Stats / KPI Cards */}
      {primaryKpis.length > 0 && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {primaryKpis.map((kpi, idx) => (
              <ZohoKpiCard key={idx} {...kpi} />
            ))}
          </div>

          {secondaryKpis.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {secondaryKpis.map((kpi, idx) => (
                <ZohoKpiCard key={idx} {...kpi} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Filter Tabs Section */}
      {filterTabs.length > 0 && (
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar">
            <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider flex items-center gap-1 mr-2">
              <Filter className="w-3.5 h-3.5 text-indigo-500" /> Filter:
            </span>
            {filterTabs.map((tab) => {
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange && onTabChange(tab.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                      : 'bg-white dark:bg-[#0F172A] hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 border border-slate-200 dark:border-slate-800'
                  }`}
                >
                  {tab.label}
                  {tab.count !== undefined && (
                    <span className={`ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] ${
                      isActive ? 'bg-indigo-700 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Main Dashboard Child Content */}
      <div className="space-y-6">{children}</div>

      {/* Telemetry Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800/80 pt-4 gap-2">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 font-medium text-slate-600 dark:text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            All systems operational
          </span>
          <span>•</span>
          <span>Latency: 14ms</span>
          <span>•</span>
          <span>Region: us-east-1</span>
        </div>
        <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400">
          <span>WorkSphere Enterprise v3.0</span>
          <span>Tenant: WorkSphere Corp</span>
        </div>
      </div>
    </div>
  )
}
