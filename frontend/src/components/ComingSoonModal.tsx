import { motion, AnimatePresence } from 'framer-motion'
import { Construction, ArrowRight, X } from 'lucide-react'
import { useEffect, useCallback } from 'react'

interface ComingSoonModalProps {
  open: boolean
  onClose: () => void
  featureName?: string
}

export function ComingSoonModal({ open, onClose, featureName }: ComingSoonModalProps) {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose?.()
  }, [onClose])

  useEffect(() => {
    if (open) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [open, handleKeyDown])

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-slate-900/40 dark:bg-black/60 backdrop-blur-sm"
            onClick={() => onClose?.()}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 10 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.2)] border border-slate-200/50 dark:border-slate-700/50 overflow-hidden"
          >
            <button
              onClick={() => onClose?.()}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="p-6 sm:p-8">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
                className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center mb-5 border border-amber-100 dark:border-amber-900/30"
              >
                <Construction className="w-6 h-6 text-amber-600 dark:text-amber-500" />
              </motion.div>

              <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-2 tracking-tight">
                Feature Under Development
              </h2>

              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-8">
                {featureName ? (
                  <>The <span className="font-medium text-slate-700 dark:text-slate-300">{featureName}</span> module is currently in active development.</>
                ) : (
                  <>This module is currently in active development.</>
                )}
                <br />
                It will be made available in a subsequent release.
              </p>

              <div className="flex items-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.02, backgroundColor: "var(--tw-colors-slate-200)" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onClose?.()}
                  className="flex-1 px-4 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 rounded-xl transition-colors"
                >
                  Close
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02, filter: "brightness(1.05)" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    window.open('https://worksphere.io/roadmap', '_blank', 'noopener,noreferrer')
                    onClose?.()
                  }}
                  className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-brand-600 hover:bg-brand-500 rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-sm shadow-brand-500/20"
                >
                  View Roadmap
                  <ArrowRight className="w-3.5 h-3.5" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
