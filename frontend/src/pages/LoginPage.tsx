import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { Zap, Mail, Lock, ArrowRight, Loader2, ShieldCheck } from 'lucide-react'

export function LoginPage({ 
  onLogin, 
  error: serverError 
}: { 
  onLogin: (email: string, password: string, role: string) => Promise<any>,
  error?: string | null 
}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [selectedRole, setSelectedRole] = useState('Employee')
  const [loading, setLoading] = useState(false)
  const [localError, setLocalError] = useState<string | null>(null)

  const roles = ['Employee', 'HR', 'Manager', 'Lead', 'Marketing', 'CEO']

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setLocalError(null)
    
    try {
      await onLogin(email, password, selectedRole)
    } catch (err: any) {
      setLocalError(err.message || 'Invalid credentials. Please verify your identity.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background dark:bg-slate-950 flex items-center justify-center p-6 selection:bg-brand/30 overflow-hidden font-sans transition-colors duration-500 relative">
      {/* Decorative Ambient Pastel Gradient Blurs */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-lavender/10 dark:bg-lavender/5 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-pastel-blue/15 dark:bg-pastel-blue/5 rounded-full blur-[120px] animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-mint/10 dark:bg-mint/5 rounded-full blur-[100px] animate-pulse delay-2000" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[500px] z-10"
      >
        <div className="text-center mb-8">
          <motion.div 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="relative h-16 w-16 mx-auto mb-6 flex items-center justify-center group cursor-pointer"
          >
            {/* Outer Glowing Aura */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#0052CC] to-[#008DA6] rounded-xl rotate-45 group-hover:rotate-90 transition-all duration-700 opacity-50 blur-md"></div>
            
            {/* Base Diamond */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0052CC] via-[#0065FF] to-[#0052CC] rounded-xl rotate-45 group-hover:rotate-180 transition-all duration-700 shadow-lg border border-white/20"></div>
            
            {/* Inner Floating Square */}
            <div className="absolute inset-2 bg-gradient-to-tr from-white to-[#F4F5F7] rounded-lg -rotate-12 group-hover:rotate-0 transition-all duration-500 flex items-center justify-center shadow-inner overflow-hidden">
               {/* Shine effect */}
               <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/80 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
               <span className="font-display font-black text-transparent bg-clip-text bg-gradient-to-br from-[#0052CC] to-[#008DA6] text-2xl leading-none italic z-10 drop-shadow-sm">N</span>
            </div>
          </motion.div>
          <h1 className="text-3xl font-display font-black tracking-tight uppercase italic text-slate-900 dark:text-white mb-1.5">
            Nexus<span className="text-[#0052CC]">HR</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-1.5">
            <ShieldCheck size={14} className="text-mint" /> Secure Access Perimeter
          </p>
        </div>

        <div className="rounded-[32px] border border-outline/60 dark:border-outline/10 bg-white/80 dark:bg-slate-900/80 shadow-premium p-8 md:p-10 backdrop-blur-xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 px-1">Infrastructure Identity</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-brand transition-colors" />
                <input 
                  type="email" 
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50/50 dark:bg-white/5 border border-outline rounded-xl py-3.5 pl-11 pr-5 text-sm font-medium text-slate-950 dark:text-white outline-none transition-all focus:border-brand/50 focus:bg-white dark:focus:bg-[#121a2e]"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 px-1">Access Protocol</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-brand transition-colors" />
                <input 
                  type="password" 
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-50/50 dark:bg-white/5 border border-outline rounded-xl py-3.5 pl-11 pr-5 text-sm font-medium text-slate-950 dark:text-white outline-none transition-all focus:border-brand/50 focus:bg-white dark:focus:bg-[#121a2e]"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 px-1">Security Perimeter Role</label>
              <select
                value={selectedRole}
                onChange={(e) => {
                  const role = e.target.value
                  setSelectedRole(role)
                  if (role === 'CEO') {
                    setEmail('ceo@company.com')
                    setPassword('123456')
                  }
                  if (role === 'HR') {
                    setEmail('hr@company.com')
                    setPassword('123456')
                  }
                }}
                className="w-full bg-slate-50/50 dark:bg-white/5 border border-outline rounded-xl py-3.5 px-4 text-sm font-semibold text-slate-900 dark:text-white outline-none transition-all focus:border-brand/50 focus:bg-white dark:focus:bg-[#121a2e] appearance-none cursor-pointer"
              >
                {roles.map(r => <option key={r} value={r} className="bg-white dark:bg-slate-950 text-slate-900 dark:text-white">{r}</option>)}
              </select>
            </div>

            {(localError || serverError) && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold"
              >
                {localError || serverError}
              </motion.div>
            )}

            <button 
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-brand text-white rounded-xl font-bold text-xs uppercase tracking-[0.2em] shadow-lg shadow-brand/20 hover:bg-brand/90 hover:scale-[1.01] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2.5 disabled:opacity-50 cursor-pointer"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : (
                <>
                  Establish Connection
                  <ArrowRight size={14} />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-outline/50">
             <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-3.5 text-center">Demo Credentials — One-Click Operator Link</p>
             <div className="grid grid-cols-2 gap-2 max-h-[220px] overflow-y-auto custom-scrollbar pr-0.5">
            { [
              { label: 'CEO Command',  email: 'ceo@company.com',      role: 'CEO',        color: 'border-peach/40 text-peach bg-peach/5' },
              { label: 'Manager Hub', email: 'manager@company.com',   role: 'Manager',    color: 'border-pastel-blue/40 text-pastel-blue bg-pastel-blue/5' },
              { label: 'Team Lead',   email: 'teamlead@company.com',  role: 'Lead',       color: 'border-mint/40 text-mint bg-mint/5' },
              { label: 'HR Executive', email: 'hr@company.com',       role: 'HR',         color: 'border-lavender/50 text-lavender bg-lavender/5 font-black' },
              { label: 'Employee Hub', email: 'employee@company.com', role: 'Employee',   color: 'border-pink/40 text-pink bg-pink/5' },
              { label: 'Marketing',  email: 'marketing@company.com', role: 'Marketing',  color: 'border-yellow/40 text-yellow bg-yellow/5' },
              { label: 'Super Admin', email: 'admin@company.com',     role: 'ADMIN',      color: 'border-brand/40 text-brand bg-brand/5' },
            ].map(p => (
              <button 
                key={p.label}
                type="button"
                disabled={loading}
                onClick={async () => {
                  setLoading(true)
                  setLocalError(null)
                  setEmail(p.email)
                  setPassword('123456')
                  setSelectedRole(p.role)
                  try {
                    await onLogin(p.email, '123456', p.role)
                  } catch (err: any) {
                    setLocalError(err.message || 'Demo login failed.')
                  } finally {
                    setLoading(false)
                  }
                }}
                className={`p-3 rounded-xl text-[9px] font-bold uppercase tracking-widest text-left shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed border outline-none ${p.color}`}
              >
                <div className="font-bold tracking-tight mb-0.5 filter brightness-90 dark:brightness-105">{p.label}</div>
                <div className="opacity-70 text-[8px] truncate">{p.email}</div>
              </button>
            ))}
             </div>
          </div>
        </div>

        <p className="mt-8 text-center text-[9px] font-black uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
          Encrypted Connection • Secure Tunneling Active
        </p>
      </motion.div>
    </div>
  )
}
