import React, { startTransition, useEffect, useMemo, useState } from 'react'
import { Navigate, Route, Routes, useNavigate, useLocation } from 'react-router-dom'
import { api } from './api/client'
import { socket } from './api/socket'
import { AppShell } from './components/layout/AppShell'
import { HrExecutiveDashboard } from './modules/hr_executive/HrExecutiveDashboard'
import { LoginPage } from './pages/LoginPage'
import { LandingPage } from './pages/LandingPage'
import { ProductPage } from './pages/Product/ProductPage'
import { FeaturesPage } from './pages/Features/FeaturesPage'
import { SolutionsPage } from './pages/Solutions/SolutionsPage'
import { ResourcesPage } from './pages/Resources/ResourcesPage'
import { PrivacyPage } from './pages/Legal/PrivacyPage'
import { TermsPage } from './pages/Legal/TermsPage'
import { SecurityPage } from './pages/Legal/SecurityPage'
import { CollaborationDetails } from './pages/Features/Sections/CollaborationDetails'
import { PerformanceDetails } from './pages/Features/Sections/PerformanceDetails'
import { EnterpriseHRDetails } from './pages/Features/Sections/EnterpriseHRDetails'
import {
  AnalyticsPage,
  AttendancePage,
  BudgetPage,
  CompliancePage,
  EngagementPage,
  ExitPage,
  OnboardingPage,
  PayrollPage,
  PeoplePage,
  PerformancePage,
  ProjectsPage,
  RecruitmentPage,
  HelpDeskPage,
  LiveTrackingPage,
} from './pages/ModulePages'
import { AllocationPage } from './pages/AllocationPage'
import { ChatPage } from './pages/ChatPage'
import { ActivityFeedPage } from './pages/ActivityFeedPage'
import { MailPage } from './pages/MailPage'
import { ProfilePage } from './pages/ProfilePage'
import { DocumentationPage } from './pages/DocumentationPage'
import { HumanResourcesPage, HumanResourcesPage as LeaveManagementPage } from './modules/hr_executive/HumanResourcesPage'
import { EmployeeModule } from './modules/employee/EmployeeModule'
import { ProjectManagementPage } from './pages/ProjectManagementPage'
import { MeetingRoom } from './pages/MeetingRoom'
import { useTracking } from './hooks/useTracking'
import type { ActivityItem, PlatformData, User } from './types'
import { ProtectedRoute } from './components/auth/ProtectedRoute'
import TechLeadDashboard, { TeamLeadDashboardPage, AnalysisModule } from './modules/hr_executive/HR_TechLead_Dashboard'
import { MarketingDashboard, SalesPipeline, AIInsights } from './modules/marketing/pages/MarketingPages'
import { ManagerModule } from './modules/manager/ManagerModule'
import { CEODashboardPage } from './modules/ceo/CeoDashboard'
import { AdminDashboardPage } from './modules/admin/pages/AdminDashboardPage'
import { ContactProvider } from './components/layout/ContactContext'
import { InternModule } from './modules/intern/InternModule'
import { FinanceManagerDashboard as FinanceManagerModule } from './modules/finance_manager/FinanceManagerDashboard'

const TOKEN_KEY = 'aurahr-token'

function App() {
  const navigate = useNavigate()
  const location = useLocation()
  const [token, setToken] = useState<string | null>(null)
  const [user, setUser] = useState<User | null>(null)

  // Smooth scroll animation on route change
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }, [location.pathname])
  
  // Start global GPS tracking
  useTracking(user, token)
  const [platform, setPlatform] = useState<PlatformData | null>(null)
  const [feed, setFeed] = useState<ActivityItem[]>([])
  const [error, setError] = useState<string | null>(null)
  const [booting, setBooting] = useState(true)

  useEffect(() => {
    // Check for token in URL (Transfer from Employee/Tech Lead hub)
    const params = new URLSearchParams(window.location.search)
    const urlToken = params.get('token')
    if (urlToken) {
      localStorage.setItem(TOKEN_KEY, urlToken)
      const timer = setTimeout(() => {
        setToken(urlToken)
      }, 0)
      window.history.replaceState({}, document.title, window.location.pathname)
      return () => clearTimeout(timer)
    }
  }, [])

  const refreshPlatform = async (sessionToken = token) => {
    if (!sessionToken) return null
    try {
      const [me, snapshot] = await Promise.all([api.getMe(sessionToken), api.getPlatform(sessionToken)])
      startTransition(() => {
        setUser(me)
        setPlatform(snapshot)
        setFeed(snapshot.activity.slice(0, 15))
      })
      return me
    } catch (err) {
      console.error("Platform Refresh Error:", err)
      return null
    }
  }

  useEffect(() => {
    if (!token) {
      const timer = setTimeout(() => {
        setBooting(false)
      }, 0)
      return () => clearTimeout(timer)
    }
    refreshPlatform(token).then(u => {
      if (!u) {
        // If token is invalid, clear it to allow landing page access
        localStorage.removeItem(TOKEN_KEY)
        setTimeout(() => {
          setToken(null)
        }, 0)
      }
    }).finally(() => {
      setTimeout(() => {
        setBooting(false)
      }, 0)
    })
  }, [token])

  const handleLogin = async (email: string, pass: string, _role?: string) => {
    try {
      setError(null)
      const { token: newToken, user: userData, redirectUrl } = await api.login(email, pass)
      localStorage.setItem(TOKEN_KEY, newToken)
      setToken(newToken)
      setUser(userData)
      
      const snapshot = await api.getPlatform(newToken)
      setPlatform(snapshot)
      setFeed(snapshot.activity.slice(0, 15))
      
      console.log(`[AUTH] Navigating to: ${redirectUrl || '/'}`);
      navigate(redirectUrl || '/')
    } catch (loginError: any) {
      console.error("[AUTH] Login Error:", loginError);
      setError(loginError.message || 'Invalid credentials or server offline.')
    }
  }

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY)
    setToken(null)
    setUser(null)
    setPlatform(null)
    setFeed([])
    socket.disconnect()
    navigate('/')
  }

  const roleRedirection = useMemo(() => {
    if (!user) return null
    const role = user.role.toUpperCase()
    if (role === 'ADMIN' || role === 'SUPERADMIN') return '/admin-dashboard'
    if (role === 'CEO') return '/ceo-dashboard'
    if (role === 'MANAGER') return '/manager'
    if (role === 'HR') return '/hr-dashboard'
    if (role === 'EMPLOYEE') return '/employee-dashboard'
    if (role === 'LEAD' || role === 'TECH_LEAD') return '/techlead-dashboard'
    if (role === 'MARKETING') return '/marketing-hub'
    if (role === 'INTERN') return '/intern'
    if (role === 'FINANCE_MANAGER') return '/finance-hub'
    return '/hr-dashboard'
  }, [user])

  if (booting) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-950">
        <div className="text-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-luxury-blue border-t-transparent mx-auto mb-4"></div>
          <p className="text-sm font-black uppercase tracking-widest text-slate-500 italic">Initializing AuraHR Platform...</p>
        </div>
      </div>
    )
  }

  return (
    <ContactProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage onLogin={handleLogin} error={error} />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/solutions" element={<SolutionsPage />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/security" element={<SecurityPage />} />
        <Route path="/" element={(token && roleRedirection) ? <Navigate to={roleRedirection} replace /> : <Navigate to="/login" replace />} />

        {/* Protected Dashboard Routes */}
        {/* Intern and Manager Dashboards — use their own Shells, mounted outside AppShell */}
        <Route path="/intern/*" element={
          <ProtectedRoute user={user} allowedRoles={['INTERN', 'HR', 'ADMIN', 'SUPERADMIN']}>
            {user ? <InternModule user={user} /> : <Navigate to="/login" replace />}
          </ProtectedRoute>
        } />
        
        <Route path="/finance-hub/*" element={
          <ProtectedRoute user={user} allowedRoles={['FINANCE_MANAGER', 'HR', 'ADMIN', 'SUPERADMIN']}>
            {user ? <FinanceManagerModule user={user} /> : <Navigate to="/login" replace />}
          </ProtectedRoute>
        } />
        
        <Route path="/manager/*" element={
          <ProtectedRoute user={user} allowedRoles={['MANAGER', 'HR', 'ADMIN', 'SUPERADMIN']}>
            {user ? <ManagerModule user={user} platform={platform} /> : <Navigate to="/login" replace />}
          </ProtectedRoute>
        } />

        <Route path="/*" element={
          <ProtectedRoute user={user} allowedRoles={['CEO', 'HR', 'MANAGER', 'LEAD', 'TECH_LEAD', 'EMPLOYEE', 'MARKETING', 'ADMIN', 'SUPERADMIN', 'INTERN', 'FINANCE_MANAGER']}>
            {user && platform ? (
              (user.role.toUpperCase() === 'INTERN' || user.role.toUpperCase() === 'MANAGER' || user.role.toUpperCase() === 'FINANCE_MANAGER') ? (
                <Navigate to={roleRedirection || '/'} replace />
              ) : (
                <AppShell user={user} onLogout={logout}>
                  <Routes>
                    <Route path="admin-dashboard" element={<AdminDashboardPage user={user} platform={platform} />} />
                    <Route path="ceo-dashboard" element={<CEODashboardPage user={user} platform={platform} />} />
                    <Route path="hr-dashboard" element={<HrExecutiveDashboard user={user} token={token!} platform={platform} feed={feed} onRefresh={async () => { await refreshPlatform(); }} />} />
                    <Route path="employee-dashboard" element={<EmployeeModule user={user} platform={platform} token={token!} />} />
                    <Route path="techlead-dashboard" element={<TechLeadDashboard user={user} platform={platform} />} />
                    <Route path="teamlead-dashboard" element={<TeamLeadDashboardPage user={user} platform={platform} />} />
                    
                    <Route path="feed" element={<ActivityFeedPage feed={feed} />} />
                    <Route path="recruitment" element={<RecruitmentPage platform={platform} token={token!} role={user.role} onRefresh={async () => { await refreshPlatform(); }} />} />
                    <Route path="allocation" element={<AllocationPage platform={platform} token={token!} onRefresh={async () => { await refreshPlatform(); }} />} />
                    <Route path="leave-approvals" element={<HumanResourcesPage />} />
                    <Route path="payroll" element={<PayrollPage platform={platform} token={token!} onRefresh={async () => { await refreshPlatform(); }} />} />
                    <Route path="budget" element={<BudgetPage platform={platform} />} />
                    <Route path="exit" element={<ExitPage platform={platform} />} />
                    <Route path="profile" element={<ProfilePage user={user} token={token!} onUpdate={(u) => setUser(u)} />} />
                    <Route path="onboarding" element={<OnboardingPage platform={platform} />} />
                    <Route path="documentation" element={<DocumentationPage platform={platform} />} />
                    <Route path="people" element={<PeoplePage platform={platform} token={token!} />} />
                    <Route path="chat" element={<ChatPage user={user} token={token!} />} />
                    <Route path="mail" element={<MailPage user={user} token={token!} />} />
                    <Route path="attendance" element={<HumanResourcesPage />} />
                    <Route path="performance" element={<PerformancePage platform={platform} />} />
                    <Route path="projects" element={<ProjectManagementPage />} />
                    <Route path="engagement" element={<EngagementPage platform={platform} />} />
                    <Route path="compliance" element={<CompliancePage platform={platform} />} />
                    <Route path="analytics" element={<AnalyticsPage platform={platform} />} />
                    <Route path="live-tracking" element={<LiveTrackingPage token={token!} />} />
                    <Route path="help-desk" element={<HelpDeskPage platform={platform} token={token!} />} />
                    <Route path="meetings" element={<MeetingRoom />} />
                    <Route path="analysis-sync" element={<AnalysisModule />} />
                    
                    <Route path="marketing-hub" element={<MarketingDashboard />} />
                    <Route path="sales" element={<SalesPipeline />} />
                    <Route path="ai-insights" element={<AIInsights />} />
                    
                    <Route path="*" element={<Navigate to={roleRedirection || '/'} replace />} />
                  </Routes>
                </AppShell>
              )
            ) : (
              <Navigate to="/login" replace />
            )}
          </ProtectedRoute>
        } />
      </Routes>
    </ContactProvider>
  )
}

export default App
