import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Shield, Users, UserCircle, Briefcase, Loader2,
  Wallet, Crown, Cpu, Code, ShieldCheck, Cloud, Megaphone, Kanban, Headset,
  ArrowRight, Check, Globe, HelpCircle, Lock, ChevronLeft
} from 'lucide-react'
import axios from 'axios'
import { AuthFooter } from '../components/AuthFooter'

const roleCategories = [
  { title: 'Administration', roles: ['SUPER_ADMIN', 'ADMIN', 'SECURITY_ANALYST'] },
  { title: 'Executive', roles: ['CEO', 'CTO'] },
  { title: 'Human Resources', roles: ['HR_MANAGER', 'HR_EXECUTIVE'] },
  { title: 'Engineering', roles: ['TECH_LEAD', 'SOFTWARE_ENGINEER', 'QA_ENGINEER', 'DEVOPS_ENGINEER'] },
  { title: 'Operations', roles: ['FINANCE_MANAGER', 'MARKETING_MANAGER', 'SALES_MANAGER', 'PROJECT_MANAGER'] },
  { title: 'Support', roles: ['SUPPORT_AGENT', 'EMPLOYEE', 'INTERN'] }
]

const rolesList = {
  SUPER_ADMIN: { role: 'SUPER_ADMIN', name: 'Super Administrator', desc: 'Full system access and global security management', icon: Shield },
  ADMIN: { role: 'ADMIN', name: 'System Admin', desc: 'Infrastructure monitoring and user provisioning', icon: Shield },
  SECURITY_ANALYST: { role: 'SECURITY_ANALYST', name: 'Security Analyst', desc: 'SIEM monitoring and vulnerability assessment', icon: ShieldCheck },
  CEO: { role: 'CEO', name: 'Chief Executive Officer', desc: 'Strategic oversight and financial reporting', icon: Crown },
  CTO: { role: 'CTO', name: 'Chief Technology Officer', desc: 'R&D access and engineering roadmaps', icon: Cpu },
  HR_MANAGER: { role: 'HR_MANAGER', name: 'HR Manager', desc: 'Personnel management and compliance', icon: Users },
  HR_EXECUTIVE: { role: 'HR_EXECUTIVE', name: 'HR Executive', desc: 'Onboarding, leave management, and records', icon: Users },
  TECH_LEAD: { role: 'TECH_LEAD', name: 'Tech Lead', desc: 'Code review and team technical direction', icon: Code },
  SOFTWARE_ENGINEER: { role: 'SOFTWARE_ENGINEER', name: 'Software Engineer', desc: 'Develop and maintain enterprise applications', icon: Code },
  QA_ENGINEER: { role: 'QA_ENGINEER', name: 'QA Engineer', desc: 'Test automation and quality metrics', icon: ShieldCheck },
  DEVOPS_ENGINEER: { role: 'DEVOPS_ENGINEER', name: 'DevOps Engineer', desc: 'Kubernetes, CI/CD, and deployment', icon: Cloud },
  FINANCE_MANAGER: { role: 'FINANCE_MANAGER', name: 'Finance Manager', desc: 'Cash flow, revenue audits, and tax ledgers', icon: Wallet },
  MARKETING_MANAGER: { role: 'MARKETING_MANAGER', name: 'Marketing Manager', desc: 'Campaign ROI and marketing analytics', icon: Megaphone },
  SALES_MANAGER: { role: 'SALES_MANAGER', name: 'Sales Manager', desc: 'CRM pipeline and revenue forecasting', icon: Briefcase },
  PROJECT_MANAGER: { role: 'PROJECT_MANAGER', name: 'Project Manager', desc: 'Sprint management and task allocation', icon: Kanban },
  SUPPORT_AGENT: { role: 'SUPPORT_AGENT', name: 'Support Agent', desc: 'Ticket management and customer resolution', icon: Headset },
  EMPLOYEE: { role: 'EMPLOYEE', name: 'Employee', desc: 'Attendance, leave requests, and team chat', icon: UserCircle },
  INTERN: { role: 'INTERN', name: 'Intern', desc: 'Training, tasks, and mentoring', icon: UserCircle }
}

const demoCredentials = {
  SUPER_ADMIN: { id: 'super_admin@worksphere.com', pass: 'Admin@123' },
  ADMIN: { id: 'sys_admin_x', pass: '123456' },
  CEO: { id: 'exec_ceo', pass: '123456' },
  CTO: { id: 'tech_cto', pass: '123456' },
  HR_MANAGER: { id: 'hr_mgr_02', pass: '123456' },
  HR_EXECUTIVE: { id: 'hr_exec_v', pass: '123456' },
  FINANCE_MANAGER: { id: 'fin_mgr_03', pass: '123456' },
  MARKETING_MANAGER: { id: 'mkt_mgr_04', pass: '123456' },
  SALES_MANAGER: { id: 'sales_mgr_05', pass: '123456' },
  PROJECT_MANAGER: { id: 'proj_mgr_06', pass: '123456' },
  TECH_LEAD: { id: 'tech_lead_07', pass: '123456' },
  DEVOPS_ENGINEER: { id: 'devops_eng_08', pass: '123456' },
  QA_ENGINEER: { id: 'qa_eng_09', pass: '123456' },
  SOFTWARE_ENGINEER: { id: 'soft_eng_10', pass: '123456' },
  SECURITY_ANALYST: { id: 'sec_analyst_11', pass: '123456' },
  SUPPORT_AGENT: { id: 'sup_agent_12', pass: '123456' },
  EMPLOYEE: { id: 'employee_13', pass: '123456' },
  INTERN: { id: 'intern_14', pass: '123456' }
}

const roleToCategory = Object.fromEntries(
  roleCategories.flatMap(c => c.roles.map(r => [r, c.title]))
)

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [selectedRole, setSelectedRole] = useState(null)
  const [loginUserId, setLoginUserId] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState(null)

  const handleRoleSelect = (roleKey) => {
    setSelectedRole(roleKey)
    const creds = demoCredentials[roleKey]
    if (creds) {
      setLoginUserId(creds.id)
      setLoginPassword(creds.pass)
    } else {
      setLoginUserId(`${roleKey.toLowerCase()}@worksphere.com`)
      setLoginPassword('123456')
    }
  }

  const localLogin = () => {
    const roleData = rolesList[selectedRole]
    const token = 'local-' + btoa(JSON.stringify({ role: selectedRole, name: roleData.name, id: loginUserId }))
    localStorage.setItem('token', token)
    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: {
        id: loginUserId,
        name: roleData.name,
        role: selectedRole,
        department: roleToCategory[selectedRole] || 'General',
        tenantId: 'org-1',
        token
      }
    })
    navigate('/dashboard')
  }

  const handleVerifyAndEnter = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setErrorMsg(null)
    try {
      const response = await axios.post('/api/auth/login', {
        email: loginUserId,
        password: loginPassword
      })
      const { token, user, role } = response.data
      localStorage.setItem('token', token)
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          id: user.id,
          name: user.name,
          role,
          department: roleToCategory[selectedRole] || 'General',
          tenantId: user.tenantId || 'org-1',
          token
        }
      })
      navigate('/dashboard')
    } catch (error) {
      console.warn('Backend login failed, using local fallback:', error)
      localLogin()
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col selection:bg-brand-500/20 selection:text-brand-900 dark:selection:text-brand-100">
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Left Panel - High-End Prototype Notice */}
        <div className="hidden lg:flex w-[45%] relative flex-col justify-between bg-[#030712] overflow-hidden border-r border-white/5">
          {/* Abstract Animated Background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.15, 0.25, 0.15],
                rotate: [0, 90, 0]
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-[30%] -left-[20%] w-[80%] h-[80%] rounded-full bg-brand-600/20 blur-[120px]"
            />
            <motion.div 
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.1, 0.2, 0.1],
                rotate: [0, -90, 0]
              }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-[30%] -right-[20%] w-[80%] h-[80%] rounded-full bg-blue-600/20 blur-[120px]"
            />
            
            {/* Animated Grid Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
          </div>

          {/* Top: Logo */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 p-10 xl:p-14"
          >
            <div className="flex items-center gap-3.5">
              <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-brand-500/20 to-blue-600/20 border border-brand-500/30 backdrop-blur-md shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                <Globe className="w-6 h-6 text-brand-300" />
              </div>
              <span className="text-2xl font-semibold text-slate-100 tracking-wide">WorkSphere</span>
            </div>
          </motion.div>

          {/* Middle: Typographic Focus */}
          <div className="relative z-10 px-10 xl:px-14 flex-1 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-semibold mb-8 backdrop-blur-md w-fit shadow-[0_0_20px_rgba(59,130,246,0.15)]"
            >
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
              </div>
              RESTRICTED PROTOTYPE
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl xl:text-[64px] font-light text-white tracking-tight leading-[1.05] mb-6"
            >
              System <br />
              <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-slate-200 via-brand-200 to-slate-400">
                Evaluation.
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-slate-400 text-lg font-light leading-relaxed max-w-[420px]"
            >
              You are accessing a pre-release build environment. Core features are in active development.
            </motion.p>
          </div>

          {/* Bottom: Elegant Notices */}
          <div className="relative z-10 p-10 xl:p-14">
            <div className="flex flex-col gap-8 relative before:absolute before:inset-y-0 before:left-[19px] before:w-[1px] before:bg-gradient-to-b before:from-brand-500/50 before:to-transparent">
              
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="relative pl-12 group"
              >
                <div className="absolute left-0 top-1 w-10 h-10 -ml-[20px] rounded-full bg-[#030712] border border-white/10 flex items-center justify-center group-hover:border-brand-500/50 group-hover:bg-brand-500/10 transition-all duration-300">
                  <Cpu className="w-4 h-4 text-brand-400" />
                </div>
                <h4 className="text-sm font-medium text-slate-200 mb-1.5 tracking-wide">Development Status</h4>
                <p className="text-[13px] text-slate-500 leading-relaxed group-hover:text-slate-400 transition-colors">
                  AI models and specific sub-systems are currently undergoing training. Some features may be mocked or temporarily unavailable.
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="relative pl-12 group"
              >
                <div className="absolute left-0 top-1 w-10 h-10 -ml-[20px] rounded-full bg-[#030712] border border-white/10 flex items-center justify-center group-hover:border-brand-500/50 group-hover:bg-brand-500/10 transition-all duration-300">
                  <Lock className="w-4 h-4 text-brand-400" />
                </div>
                <h4 className="text-sm font-medium text-slate-200 mb-1.5 tracking-wide">Authentication Notice</h4>
                <p className="text-[13px] text-slate-500 leading-relaxed group-hover:text-slate-400 transition-colors">
                  Strictly for testing purposes. Use only the provided simulated credentials. Do not input real organizational data.
                </p>
              </motion.div>

            </div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="mt-12 pt-6 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-600 font-medium tracking-widest uppercase"
            >
              <span>WorkSphere &copy; 2026</span>
              <span>v0.9.0-BETA</span>
            </motion.div>
          </div>
        </div>

        {/* Right Panel - Login */}
        <div className="flex-1 flex flex-col min-h-screen lg:min-h-0">
          <div className="flex-1 w-full max-w-[720px] mx-auto px-6 sm:px-8 lg:px-12 pt-8 lg:pt-10 pb-8">
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors mb-8"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to Home
            </button>
            <AnimatePresence mode="wait">
              {selectedRole === null ? (
                <motion.div
                  key="role-selection"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="mb-8">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-2 h-2 rounded-full bg-brand-500" />
                      <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-600 dark:text-brand-400">Enterprise Access</span>
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                      Select your identity
                    </h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                      Choose your assigned role to authenticate.
                    </p>
                  </div>

                  <div className="space-y-8">
                    {roleCategories.map((category, idx) => (
                      <div key={idx}>
                        <h3 className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400 dark:text-slate-500 mb-3 px-0.5">
                          {category.title}
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {category.roles.map(roleKey => {
                            const roleData = rolesList[roleKey]
                            const IconComp = roleData.icon
                            return (
                              <motion.button
                                key={roleKey}
                                onClick={() => handleRoleSelect(roleKey)}
                                whileHover={{ y: -1 }}
                                whileTap={{ scale: 0.99 }}
                                className="group relative flex items-start gap-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/60 rounded-xl p-3.5 cursor-pointer shadow-sm hover:shadow-md hover:border-brand-400 dark:hover:border-brand-500/50 transition-all duration-200 text-left"
                              >
                                <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:bg-brand-50 dark:group-hover:bg-brand-950/30 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors duration-200 shrink-0">
                                  <IconComp className="w-4 h-4" />
                                </div>
                                <div className="min-w-0">
                                  <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors truncate">
                                    {roleData.name}
                                  </h4>
                                  <p className="text-[12px] text-slate-500 dark:text-slate-400 leading-snug line-clamp-1">
                                    {roleData.desc}
                                  </p>
                                </div>
                              </motion.button>
                            )
                          })}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                    <p className="text-xs text-slate-400 dark:text-slate-500 text-center">
                      Secured by WorkSphere Enterprise Authentication &middot; v0.9.0
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="login-panel"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="max-w-[400px] mx-auto mt-4"
                >
                  <button
                    onClick={() => setSelectedRole(null)}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors mb-6"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    Back to role selection
                  </button>

                  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/60 rounded-2xl shadow-lg shadow-slate-200/50 dark:shadow-slate-900/50 overflow-hidden">
                    <div className="p-6 sm:p-8">
                      <div className="flex flex-col items-center mb-6">
                        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-brand-50 to-brand-100 dark:from-brand-950/30 dark:to-brand-900/20 border border-brand-200/50 dark:border-brand-800/30 text-brand-600 dark:text-brand-400 flex items-center justify-center mb-3 shadow-sm">
                          {React.createElement(rolesList[selectedRole].icon, { className: "w-5 h-5" })}
                        </div>
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                          Welcome back
                        </h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 text-center">
                          Signing in as{' '}
                          <span className="font-semibold text-slate-700 dark:text-slate-300">
                            {rolesList[selectedRole].name}
                          </span>
                        </p>
                      </div>

                      {errorMsg && (
                        <div className="mb-5 p-3 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30 text-xs font-medium text-red-600 dark:text-red-400 flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                          {errorMsg}
                        </div>
                      )}

                      <form onSubmit={handleVerifyAndEnter} className="space-y-4">
                        <div>
                          <label className="text-xs font-medium text-slate-600 dark:text-slate-400 block mb-1.5">
                            Email address
                          </label>
                          <input
                            type="text"
                            value={loginUserId}
                            onChange={(e) => setLoginUserId(e.target.value)}
                            className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-sm rounded-xl text-sm text-slate-900 dark:text-white focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500"
                            placeholder="name@company.com"
                            required
                            aria-label="Email address"
                          />
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <label className="text-xs font-medium text-slate-600 dark:text-slate-400">
                              Password
                            </label>
                            <button
                              type="button"
                              onClick={() => navigate('/forgot-password')}
                              className="text-[11px] font-medium text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition-colors"
                            >
                              Forgot password?
                            </button>
                          </div>
                          <input
                            type="password"
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                            className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-sm rounded-xl text-sm text-slate-900 dark:text-white focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500"
                            placeholder="Enter your password"
                            required
                            aria-label="Password"
                          />
                        </div>

                        <div className="!mt-6">
                          <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-2.5 px-4 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-medium text-sm hover:bg-slate-800 dark:hover:bg-slate-200 active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                          >
                            {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                            {isLoading ? 'Authenticating...' : 'Continue'}
                          </button>
                        </div>

                        <div className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/30">
                          <ShieldCheck className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                          <p className="text-[11px] text-amber-700 dark:text-amber-400/80 leading-relaxed">
                            <span className="font-semibold">Prototype Mode:</span> Credentials are auto-filled for testing.
                          </p>
                        </div>

                        <div className="relative py-2">
                          <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-200 dark:border-slate-700" />
                          </div>
                          <div className="relative flex justify-center text-[11px]">
                            <span className="bg-white dark:bg-slate-900 px-3 text-slate-400 dark:text-slate-500">
                              Or continue with
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2.5">
                          <button
                            type="button"
                            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 shadow-sm transition-colors text-xs font-medium text-slate-600 dark:text-slate-400"
                          >
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                              <path d="M11.4 24H0V12.6H11.4V24ZM24 24H12.6V12.6H24V24ZM11.4 11.4H0V0H11.4V11.4ZM24 11.4H12.6V0H24V11.4Z" fill="#00A4EF" />
                            </svg>
                            Microsoft
                          </button>
                          <button
                            type="button"
                            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 shadow-sm transition-colors text-xs font-medium text-slate-600 dark:text-slate-400"
                          >
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                            Google
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="hidden lg:block px-6 sm:px-8 lg:px-12 pb-4">
            <p className="text-[11px] text-slate-400 dark:text-slate-500 text-center">
              &copy; 2026 WorkSphere Technologies. Prototype v0.9.0 &middot; For testing purposes only.
            </p>
          </div>
        </div>
      </div>

      <AuthFooter />
    </div>
  )
}

export default Login
