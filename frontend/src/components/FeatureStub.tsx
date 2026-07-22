import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Construction, ArrowLeft, Shield } from 'lucide-react'
import { useComingSoon } from './ComingSoonContext'

interface FeatureStubProps {
  featureName: string
  redirectTo?: string
}

export function FeatureStub({ featureName, redirectTo = '/login' }: FeatureStubProps) {
  const navigate = useNavigate()
  const { openComingSoon } = useComingSoon()
  const [showRedirect, setShowRedirect] = useState(false)

  useEffect(() => {
    openComingSoon(featureName)
    const timer = setTimeout(() => setShowRedirect(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  if (showRedirect) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-sm"
        >
          <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mx-auto mb-4">
            <Construction className="w-6 h-6 text-amber-600 dark:text-amber-400" />
          </div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
            Feature Under Development
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
            {featureName} is not yet available in this prototype build.
          </p>
          <button
            onClick={() => navigate(redirectTo, { replace: true })}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Login
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center gap-3"
      >
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center shadow-lg shadow-brand-500/20">
          <Shield className="w-5 h-5 text-white" />
        </div>
        <div className="w-5 h-5 border-2 border-brand-400 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-slate-500 dark:text-slate-400">Loading...</p>
      </motion.div>
    </div>
  )
}
