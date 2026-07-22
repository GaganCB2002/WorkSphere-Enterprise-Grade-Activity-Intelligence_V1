import {
  Activity,
  BadgeIndianRupee,
  BriefcaseBusiness,
  ChartColumn,
  CheckCircle,
  ClipboardCheck,
  DoorOpen,
  FileWarning,
  Folder,
  Gauge,
  LayoutDashboard,
  Layers,
  LifeBuoy,
  Mail,
  Menu,
  MessageSquare,
  Moon,
  Network,
  ShieldCheck,
  SmilePlus,
  Sun,
  Terminal,
  TimerReset,
  UserRoundCog,
  UsersRound,
  Bell,
  Settings,
  LogOut,
  User as UserIcon,
  Target,
  TrendingUp,
  Sparkles,
  Map,
  Zap,
  Cpu,
  Search,
  ChevronRight,
  ChevronLeft,
  AlertTriangle,
  CheckCircle2,
  Users,
  Shield
} from 'lucide-react'
import { NavLink, useNavigate } from 'react-router-dom'
import React, { useState, useEffect, type ReactNode } from 'react'
import { socket } from '../../api/socket'
import type { Role, User } from '../../types'

type NavGroup = 'operations' | 'communication' | 'management' | 'account'

type NavItem = {
  to: string
  label: string
  icon: any
  roles: Role[]
  group: NavGroup
}

const navItems: NavItem[] = [
  // Operations Group
  { to: '/ceo-dashboard', label: 'CEO Command Center', icon: LayoutDashboard, roles: ['CEO'], group: 'operations' },
  { to: '/hr-dashboard', label: 'HR Operations', icon: Users, roles: ['CEO', 'HR'], group: 'operations' },
  { to: '/manager-dashboard', label: 'Manager Hub', icon: TrendingUp, roles: ['MANAGER', 'CEO', 'Manager'], group: 'operations' },
  { to: '/techlead-dashboard', label: 'Tech Lead Hub', icon: Terminal, roles: ['LEAD', 'TECH_LEAD', 'CEO', 'ADMIN', 'SUPERADMIN'], group: 'operations' },
  { to: '/admin-dashboard', label: 'Admin Console', icon: Shield, roles: ['ADMIN', 'SUPERADMIN'], group: 'operations' },
  
  // Communication Group
  { to: '/chat', label: 'Live Chat', icon: MessageSquare, roles: ['CEO', 'HR', 'MANAGER', 'LEAD', 'TECH_LEAD', 'EMPLOYEE', 'MARKETING', 'ADMIN', 'SUPERADMIN', 'Manager', 'Employee', 'Marketing'], group: 'communication' },
  { to: '/mail', label: 'Internal Mail', icon: Mail, roles: ['CEO', 'HR', 'MANAGER', 'LEAD', 'TECH_LEAD', 'EMPLOYEE', 'MARKETING', 'ADMIN', 'SUPERADMIN', 'Manager', 'Employee', 'Marketing'], group: 'communication' },
  { to: '/meetings', label: 'Video Meetings', icon: Terminal, roles: ['CEO', 'HR', 'MANAGER', 'LEAD', 'TECH_LEAD', 'EMPLOYEE', 'MARKETING', 'ADMIN', 'SUPERADMIN', 'Manager', 'Employee', 'Marketing'], group: 'communication' },
  
  // Management & Workspace Group
  { to: '/attendance', label: 'Attendance', icon: TimerReset, roles: ['CEO', 'HR', 'MANAGER', 'LEAD', 'TECH_LEAD', 'EMPLOYEE', 'ADMIN', 'SUPERADMIN', 'Manager', 'Employee'], group: 'management' },
  { to: '/feed', label: 'Live Activity Feed', icon: Activity, roles: ['CEO', 'HR', 'MANAGER', 'LEAD', 'TECH_LEAD', 'ADMIN', 'SUPERADMIN', 'Manager'], group: 'management' },
  { to: '/recruitment', label: 'Recruitment', icon: BriefcaseBusiness, roles: ['CEO', 'HR', 'MANAGER', 'LEAD', 'TECH_LEAD', 'ADMIN', 'SUPERADMIN', 'Manager'], group: 'management' },
  { to: '/allocation', label: 'Resource Allocation', icon: Layers, roles: ['CEO', 'HR', 'MANAGER', 'LEAD', 'TECH_LEAD', 'ADMIN', 'SUPERADMIN', 'Manager'], group: 'management' },
  { to: '/leave-approvals', label: 'Leave Approvals', icon: FileWarning, roles: ['CEO', 'HR', 'MANAGER', 'LEAD', 'TECH_LEAD', 'ADMIN', 'SUPERADMIN', 'Manager'], group: 'management' },
  { to: '/people', label: 'Employee Mgmt', icon: UsersRound, roles: ['CEO', 'HR', 'MANAGER', 'LEAD', 'TECH_LEAD', 'ADMIN', 'SUPERADMIN', 'Manager'], group: 'management' },
  { to: '/onboarding', label: 'Onboarding', icon: ClipboardCheck, roles: ['CEO', 'HR', 'MANAGER', 'LEAD', 'TECH_LEAD', 'EMPLOYEE', 'ADMIN', 'SUPERADMIN', 'Manager', 'Employee'], group: 'management' },
  { to: '/documentation', label: 'Documentation', icon: Folder, roles: ['CEO', 'HR', 'MANAGER', 'LEAD', 'TECH_LEAD', 'EMPLOYEE', 'ADMIN', 'SUPERADMIN', 'Manager', 'Employee'], group: 'management' },
  { to: '/payroll', label: 'Payroll', icon: BadgeIndianRupee, roles: ['CEO', 'HR', 'MANAGER', 'ADMIN', 'SUPERADMIN', 'Manager'], group: 'management' },
  { to: '/performance', label: 'Performance', icon: Gauge, roles: ['CEO', 'HR', 'MANAGER', 'LEAD', 'TECH_LEAD', 'EMPLOYEE', 'ADMIN', 'SUPERADMIN', 'Manager', 'Employee'], group: 'management' },
  { to: '/projects', label: 'Projects', icon: Activity, roles: ['CEO', 'HR', 'MANAGER', 'LEAD', 'TECH_LEAD', 'EMPLOYEE', 'ADMIN', 'SUPERADMIN', 'Manager', 'Employee'], group: 'management' },
  { to: '/engagement', label: 'Engagement', icon: SmilePlus, roles: ['CEO', 'HR', 'MANAGER', 'LEAD', 'TECH_LEAD', 'EMPLOYEE', 'ADMIN', 'SUPERADMIN', 'Manager', 'Employee'], group: 'management' },
  { to: '/compliance', label: 'Compliance', icon: ShieldCheck, roles: ['CEO', 'HR', 'MANAGER', 'LEAD', 'TECH_LEAD', 'EMPLOYEE', 'ADMIN', 'SUPERADMIN', 'Manager', 'Employee'], group: 'management' },
  { to: '/help-desk', label: 'IT Help Desk', icon: LifeBuoy, roles: ['CEO', 'HR', 'MANAGER', 'LEAD', 'TECH_LEAD', 'EMPLOYEE', 'ADMIN', 'SUPERADMIN', 'Manager', 'Employee'], group: 'management' },
  { to: '/exit', label: 'Exit', icon: DoorOpen, roles: ['CEO', 'HR', 'MANAGER', 'ADMIN', 'SUPERADMIN', 'Manager'], group: 'management' },
  { to: '/budget', label: 'Budget', icon: ChartColumn, roles: ['CEO', 'HR', 'ADMIN', 'SUPERADMIN'], group: 'management' },
  { to: '/analytics', label: 'Analytics', icon: Network, roles: ['CEO', 'HR', 'MANAGER', 'LEAD', 'TECH_LEAD', 'ADMIN', 'SUPERADMIN', 'Manager'], group: 'management' },
  { to: '/live-tracking', label: 'Live Tracking', icon: Map, roles: ['CEO', 'HR', 'MANAGER', 'LEAD', 'TECH_LEAD', 'ADMIN', 'SUPERADMIN', 'Manager'], group: 'management' },
  { to: '/marketing-hub', label: 'Marketing Hub', icon: Target, roles: ['MARKETING', 'CEO', 'ADMIN', 'SUPERADMIN', 'Marketing'], group: 'management' },
  { to: '/sales', label: 'Sales Pipeline', icon: TrendingUp, roles: ['MARKETING', 'CEO', 'ADMIN', 'SUPERADMIN', 'Marketing'], group: 'management' },
  { to: '/ai-insights', label: 'AI Insights', icon: Sparkles, roles: ['MARKETING', 'CEO', 'ADMIN', 'SUPERADMIN', 'Marketing'], group: 'management' },
  
  // Account Group
  { to: '/profile', label: 'My Profile', icon: UserRoundCog, roles: ['CEO', 'HR', 'MANAGER', 'LEAD', 'TECH_LEAD', 'EMPLOYEE', 'MARKETING', 'ADMIN', 'SUPERADMIN', 'Manager', 'Employee', 'Marketing'], group: 'account' },
]

interface AppShellProps {
  user: User
  onLogout: () => void
  children: ReactNode
}

export function AppShell({ user, onLogout, children }: AppShellProps) {
  const [isDark, setIsDark] = useState(() => localStorage.getItem('theme') === 'dark')
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isNotifOpen, setIsNotifOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [notifications, setNotifications] = useState([
    { id: '1', title: 'New Recruitment Signal', detail: '3 candidates identified for Tech Lead role.', time: '2m ago', type: 'info' },
    { id: '2', title: 'System Security Alert', detail: 'New login detected from unusual location: Mumbai.', time: '15m ago', type: 'warning' },
    { id: '3', title: 'Performance Review Due', detail: 'Quarterly reviews for Engineering team start tomorrow.', time: '1h ago', type: 'success' },
  ])

  useEffect(() => {
    socket.on('notification', (notif) => {
      setNotifications(prev => [notif, ...prev.slice(0, 4)])
    })
    return () => { socket.off('notification') }
  }, [])

  const userRole = (user?.role || '').toUpperCase().replace(' ', '_') as Role
  const allowed = navItems.filter((item) => {
    if (userRole === 'CEO' || userRole === 'ADMIN' || userRole === 'SUPERADMIN') return true
    return item.roles.includes(userRole)
  })
  const navigate = useNavigate()

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [isDark])

  // Groups definitions for UI rendering
  const operationsItems = allowed.filter(item => item.group === 'operations')
  const communicationItems = allowed.filter(item => item.group === 'communication')
  const managementItems = allowed.filter(item => item.group === 'management')
  const accountItems = allowed.filter(item => item.group === 'account')

  const renderNavSection = (title: string, items: NavItem[]) => {
    if (items.length === 0) return null
    return (
      <div className="space-y-1">
        {isSidebarOpen && (
          <p className="px-4 pt-4 pb-1.5 text-[8.5px] font-black uppercase tracking-[0.25em] text-slate-400 dark:text-slate-500">
            {title}
          </p>
        )}
        {items.map((item) => {
          const Icon = item.icon
          const isExternal = item.to.startsWith('http')
          const linkClasses = (isActive: boolean) => [
            'group flex items-center rounded-xl font-bold transition-all duration-200 border btn-interactive',
            isSidebarOpen ? 'gap-3 px-4 py-2.5 text-xs' : 'justify-center p-3 text-lg mx-auto w-11 h-11',
            isActive
              ? 'bg-brand/10 border-brand/20 text-brand dark:bg-brand/20 dark:border-brand/35'
              : 'border-transparent text-slate-600 hover:bg-slate-100 hover:text-brand dark:text-slate-400 dark:hover:bg-slate-800/60 dark:hover:text-white',
          ].join(' ')

          if (isExternal) {
            const urlWithToken = item.to.includes('127.0.0.1') || item.to.includes('localhost') 
              ? `${item.to}${item.to.includes('?') ? '&' : '?'}token=${localStorage.getItem('worksphere-token')}`
              : item.to

            return (
              <a
                key={item.to}
                href={urlWithToken}
                target="_blank"
                rel="noopener noreferrer"
                title={!isSidebarOpen ? item.label : undefined}
                className={linkClasses(false)}
              >
                <Icon className="h-4 w-4 shrink-0 transition-transform group-hover:scale-110" />
                {isSidebarOpen && <span className="flex-1 truncate tracking-wide">{item.label}</span>}
              </a>
            )
          }

          return (
            <NavLink
              key={item.to}
              to={item.to}
              title={!isSidebarOpen ? item.label : undefined}
              className={({ isActive }) => linkClasses(isActive)}
            >
              <Icon className="h-4 w-4 shrink-0 transition-transform group-hover:scale-110" />
              {isSidebarOpen && <span className="flex-1 truncate tracking-wide">{item.label}</span>}
            </NavLink>
          )
        })}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-4 transition-colors duration-300 dark:bg-slate-950 lg:p-5 overflow-hidden">
      <div className="mx-auto flex h-[calc(100vh-2rem)] max-w-[1700px] gap-4">
        
        {/* SIDEBAR PANEL */}
        <aside 
          className={`glass-panel flex flex-col overflow-hidden transition-all duration-300 dark:border-white/5 dark:bg-slate-900/40 shrink-0 ${
            isSidebarOpen ? 'w-[260px]' : 'w-[72px]'
          } hidden lg:flex rounded-[28px]`}
        >
          {/* Logo Brand Header */}
          <NavLink to={
            userRole === 'HR' ? '/hr-dashboard' :
            userRole === 'EMPLOYEE' ? '/employee-dashboard' :
            userRole === 'MANAGER' ? '/manager-dashboard' :
            (userRole === 'TECH_LEAD' || userRole === 'LEAD') ? '/techlead-dashboard' :
            userRole === 'MARKETING' ? '/marketing-hub' :
            userRole === 'IT' ? '/help-desk' : '/hr-dashboard'
          } className={`border-b border-outline/50 shrink-0 flex items-center transition-opacity hover:opacity-85 ${isSidebarOpen ? 'p-6' : 'p-4 justify-center'}`}>
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-brand to-pastel-blue text-white shadow-md shadow-brand/10 italic">
                <Zap className="h-5 w-5 animate-pulse" />
              </div>
              {isSidebarOpen && (
                <div className="transition-opacity duration-300 min-w-0">
                  <p className="font-display text-lg font-black tracking-tight text-slate-900 dark:text-white truncate uppercase">
                    Aura<span className="text-brand">HR</span>
                  </p>
                  <p className="text-[8px] font-black uppercase tracking-[0.25em] text-slate-400 dark:text-slate-500 truncate">SaaS Platform</p>
                </div>
              )}
            </div>
          </NavLink>

          {/* Nav Items Container */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-4">
            {isSidebarOpen ? (
              <div className="rounded-2xl bg-gradient-to-br from-brand/10 to-pastel-blue/5 border border-brand/10 p-4 text-slate-900 dark:text-white relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-16 h-16 bg-brand/10 rounded-full blur-xl group-hover:bg-brand/20 transition-colors" />
                <p className="text-[7.5px] font-black uppercase tracking-[0.25em] text-brand">Operator Profile</p>
                <p className="mt-1 text-sm font-bold truncate uppercase tracking-tight">{user.name}</p>
                <div className="inline-flex mt-2 items-center rounded-full bg-brand/5 border border-brand/10 px-2 py-0.5 text-[8px] font-black uppercase tracking-widest text-brand dark:text-brand">
                  {user.role}
                </div>
              </div>
            ) : (
              <div className="flex justify-center mb-2 mt-1">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10 text-brand font-black text-sm border border-brand/20">
                  {user.name.charAt(0)}
                </div>
              </div>
            )}

            <nav className="space-y-3 pb-4">
              {renderNavSection('Operations', operationsItems)}
              {renderNavSection('Communication', communicationItems)}
              {renderNavSection('Management', managementItems)}
              {renderNavSection('Account', accountItems)}
            </nav>
          </div>

          {/* Collapse Bottom Toggle */}
          <div className="p-3 border-t border-outline/50 shrink-0">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="w-full flex items-center justify-center p-2.5 rounded-xl border border-outline bg-slate-50/50 hover:bg-slate-100 dark:bg-white/5 dark:hover:bg-white/10 text-slate-500 dark:text-slate-400 transition-all btn-interactive"
              title={isSidebarOpen ? 'Collapse Navigation' : 'Expand Navigation'}
            >
              {isSidebarOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </button>
          </div>
        </aside>

        {/* MAIN BODY AREA */}
        <main className="flex-1 min-w-0 h-[calc(100vh-2rem)] overflow-y-auto custom-scrollbar flex flex-col gap-4">
          
          {/* HEADER HEADER */}
          <header className="glass-panel shrink-0 flex flex-col gap-4 p-4 dark:border-white/5 dark:bg-slate-900/40 sm:flex-row sm:items-center sm:justify-between sticky top-0 z-10 rounded-[24px]">
            <div className="flex items-center gap-3.5 min-w-0">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-outline bg-slate-50/50 hover:bg-slate-100 dark:bg-white/5 dark:hover:bg-white/10 text-slate-500 dark:text-slate-300 transition-colors lg:hidden"
              >
                <Menu className="h-4 w-4" />
              </button>
              
              {window.location.pathname !== '/hr-dashboard' && 
               window.location.pathname !== '/employee-dashboard' && 
               window.location.pathname !== '/manager-dashboard' && 
               window.location.pathname !== '/techlead-dashboard' && 
               window.location.pathname !== '/marketing-hub' && 
               window.location.pathname !== '/help-desk' && 
               window.location.pathname !== '/dashboard' && (
                <button
                  onClick={() => {
                    const path = userRole === 'HR' ? '/hr-dashboard' :
                                 userRole === 'EMPLOYEE' ? '/employee-dashboard' :
                                 userRole === 'MANAGER' ? '/manager-dashboard' :
                                 (userRole === 'TECH_LEAD' || userRole === 'LEAD') ? '/techlead-dashboard' :
                                 userRole === 'MARKETING' ? '/marketing-hub' :
                                 userRole === 'IT' ? '/help-desk' : '/hr-dashboard';
                    navigate(path);
                  }}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-outline bg-slate-50/50 text-slate-600 dark:text-slate-400 text-[9px] font-black uppercase tracking-wider transition hover:bg-brand/10 hover:text-brand hover:border-brand/20 btn-interactive"
                >
                  <LayoutDashboard className="h-3 w-3" />
                  <span>Back to Dashboard</span>
                </button>
              )}

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <p className="text-[9px] font-black uppercase tracking-widest text-emerald-500">Live Secure Perimeter Linked</p>
                </div>
                
                {/* Search Console */}
                <div className="relative hidden md:block group mt-1.5">
                  <Search className="absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400 group-focus-within:text-brand transition-colors" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search systems..."
                    className="h-9 w-64 rounded-xl border border-outline bg-slate-50/50 pl-9 pr-4 text-xs font-semibold text-slate-700 dark:text-slate-300 outline-none transition-all focus:border-brand/40 focus:bg-white dark:bg-white/5 dark:focus:bg-[#121a2e]"
                  />
                  {searchQuery && (
                    <div className="absolute top-11 left-0 right-0 glass-panel bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl p-4 border border-outline shadow-xl z-[100] rounded-xl">
                       <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2">Search Results for "{searchQuery}"</p>
                       <div className="space-y-1.5">
                          {['Employees', 'Projects', 'Reports'].map(item => (
                            <div key={item} className="flex items-center justify-between p-2 hover:bg-slate-50 dark:hover:bg-white/5 rounded-lg cursor-pointer group/item">
                               <span className="text-xs font-medium text-slate-600 dark:text-slate-300">{item} containing "{searchQuery}"</span>
                               <ChevronRight size={12} className="opacity-0 group-hover/item:opacity-100 transition-opacity" />
                            </div>
                          ))}
                       </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Header Right Interactions */}
            <div className="flex items-center gap-3">
              {/* Notifications */}
              <div className="relative">
                <button 
                  onClick={() => setIsNotifOpen(!isNotifOpen)}
                  className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-outline bg-slate-50/50 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:bg-white/5 dark:hover:bg-white/10 transition-all btn-interactive"
                >
                  <Bell className="h-4.5 w-4.5" />
                  {notifications.length > 0 && (
                    <span className="absolute top-2 right-2 flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75"></span>
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-brand"></span>
                    </span>
                  )}
                </button>

                {isNotifOpen && (
                  <div className="absolute right-0 top-12 w-80 glass-panel bg-white dark:bg-slate-900 border border-outline shadow-xl z-[100] rounded-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                    <div className="p-4 border-b border-outline flex items-center justify-between bg-slate-50/50 dark:bg-white/5">
                        <h4 className="text-[9px] font-black uppercase tracking-widest text-slate-900 dark:text-white">Recent Alerts</h4>
                        <span className="text-[9px] font-bold text-brand">{notifications.length} Alerts</span>
                    </div>
                    <div className="max-h-[350px] overflow-y-auto custom-scrollbar">
                        {notifications.length === 0 ? (
                          <div className="py-10 text-center">
                            <p className="text-[9px] font-bold uppercase tracking-widest text-slate-500">No alerts</p>
                          </div>
                        ) : notifications.map(n => (
                          <div key={n.id} className="p-4 border-b border-outline hover:bg-slate-50 dark:hover:bg-white/5 transition cursor-pointer group">
                            <div className="flex items-start gap-3">
                                <div className={`h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                                  n.type === 'warning' ? 'bg-amber-500/10 text-amber-500' : 
                                  n.type === 'success' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-brand/10 text-brand'
                                }`}>
                                  {n.type === 'warning' ? <AlertTriangle size={15} /> : <CheckCircle2 size={15} />}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-brand transition-colors truncate">{n.title}</p>
                                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed truncate">{n.detail}</p>
                                  <p className="text-[8px] text-slate-400 font-bold uppercase mt-2 tracking-widest">{n.time}</p>
                                </div>
                            </div>
                          </div>
                        ))}
                    </div>
                    <button className="w-full py-3 text-[9px] font-black uppercase tracking-widest text-slate-500 hover:text-brand transition bg-slate-50/50 dark:bg-white/5 border-t border-outline">
                        Launch Alert Center
                    </button>
                  </div>
                )}
              </div>

              {/* Theme Toggle */}
              <button
                onClick={() => setIsDark(!isDark)}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-outline bg-slate-50/50 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:bg-white/5 dark:hover:bg-white/10 transition-all btn-interactive"
              >
                {isDark ? <Sun className="h-4.5 w-4.5 text-yellow" /> : <Moon className="h-4.5 w-4.5 text-slate-500" />}
              </button>

              {/* Profile Avatar Trigger */}
              <div className="relative">
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-outline bg-slate-50/50 hover:bg-slate-100 dark:bg-white/5 dark:hover:bg-white/10 transition-all overflow-hidden btn-interactive"
                >
                  <div className="h-full w-full bg-brand/10 flex items-center justify-center text-brand font-black text-xs uppercase">
                    {user?.name?.charAt(0) || 'U'}
                  </div>
                </button>
                
                {isProfileOpen && (
                  <div className="absolute right-0 top-12 w-60 glass-panel bg-white dark:bg-slate-900 border border-outline shadow-xl z-[100] rounded-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                    <div className="p-4 bg-slate-50/50 dark:bg-white/5 border-b border-outline">
                      <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{user?.name}</p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 truncate">{user?.email}</p>
                    </div>
                    <div className="p-1.5">
                      <button onClick={() => { navigate('/profile'); setIsProfileOpen(false) }} className="w-full text-left px-3 py-2 text-[9.5px] font-black uppercase tracking-widest text-slate-500 hover:text-brand hover:bg-slate-50 dark:hover:bg-white/5 rounded-xl transition">Protocol Profile</button>
                      <button onClick={() => { navigate('/settings'); setIsProfileOpen(false) }} className="w-full text-left px-3 py-2 text-[9.5px] font-black uppercase tracking-widest text-slate-500 hover:text-brand hover:bg-slate-50 dark:hover:bg-white/5 rounded-xl transition">Security Config</button>
                      <div className="h-[1px] bg-outline my-1.5 mx-2" />
                      <button onClick={onLogout} className="w-full text-left px-3 py-2 text-[9.5px] font-black uppercase tracking-widest text-red-500 hover:bg-red-500/10 rounded-xl transition">Terminate Session</button>
                    </div>
                  </div>
                )}
              </div>

              {/* Explicit Exit Action */}
              <button
                onClick={onLogout}
                title="Logout"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-outline bg-slate-50/50 text-red-500 hover:bg-red-500/10 transition-all btn-interactive"
              >
                <LogOut className="h-4.5 w-4.5" />
              </button>
            </div>
          </header>

          {/* MAIN PAGE MOUNT OUTLET */}
          <div className="flex-1 min-h-0 bg-transparent">
            <div className="pb-6">{children}</div>
          </div>
        </main>
      </div>
    </div>
  )
}
