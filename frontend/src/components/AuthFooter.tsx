import { Shield } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export function AuthFooter() {
  const navigate = useNavigate()

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
      <div className="max-w-screen-2xl mx-auto px-6 sm:px-8 lg:px-12 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-sm">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-semibold text-slate-800 dark:text-white">
              WorkSphere<span className="text-brand-600 dark:text-brand-400">Enterprise</span>
            </span>
            <span className="hidden sm:inline text-[11px] text-slate-400 dark:text-slate-500 font-medium px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">
              Prototype v0.9.0
            </span>
          </div>

          <div className="flex items-center gap-6 text-[12px]">
            <button
              onClick={() => navigate('/privacy')}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors font-medium"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => navigate('/terms')}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors font-medium"
            >
              Terms
            </button>
            <button
              onClick={() => navigate('/security')}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors font-medium"
            >
              Security
            </button>
          </div>
        </div>

        <div className="mt-5 pt-5 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-slate-400 dark:text-slate-500">
            &copy; 2026 WorkSphere Technologies. All rights reserved.
          </p>
          <p className="text-[11px] text-slate-400 dark:text-slate-500 text-center sm:text-right">
            This application is under active development. For demonstration and testing purposes only.
            <br className="hidden sm:inline" />
            Prototype Version 0.9.0 &middot; Build: Development &middot; Environment: Local
          </p>
        </div>
      </div>
    </footer>
  )
}
