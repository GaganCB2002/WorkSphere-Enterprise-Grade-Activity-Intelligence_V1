import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ShieldAlert } from 'lucide-react'

export function PrototypeBanner() {
  const [isDismissed, setIsDismissed] = useState(false)

  if (isDismissed) return null

  return (
    <AnimatePresence>
      {!isDismissed && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden"
        >
          <div className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20 border-b border-amber-200/60 dark:border-amber-800/30">
            <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5">
                  <div className="w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center">
                    <ShieldAlert className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                    <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-amber-800 dark:text-amber-300 shrink-0">
                      WorkSphere Enterprise - Prototype Preview
                    </span>
                    <span className="hidden sm:inline text-amber-400 dark:text-amber-600 text-[10px]">|</span>
                    <span className="text-[12px] leading-relaxed text-amber-700 dark:text-amber-400/80">
                      This application is under active development for demonstration and testing purposes.
                    </span>
                  </div>
                  <div className="mt-1 flex flex-wrap gap-x-4 gap-y-0.5 text-[11px] text-amber-600/80 dark:text-amber-500/60">
                    <span>Prototype v0.9.0</span>
                    <span className="hidden xs:inline">Build: Development</span>
                    <span>Status: Active Development</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-amber-200/50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border border-amber-300/40 dark:border-amber-700/30">
                    Prototype Build
                  </span>
                  <button
                    onClick={() => setIsDismissed(true)}
                    className="p-1 rounded-md hover:bg-amber-200/50 dark:hover:bg-amber-800/30 text-amber-500 hover:text-amber-700 dark:hover:text-amber-300 transition-colors"
                    aria-label="Dismiss banner"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
