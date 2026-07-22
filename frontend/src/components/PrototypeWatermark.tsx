import { ShieldAlert } from 'lucide-react'

export function PrototypeWatermark() {
  return (
    <div className="fixed bottom-4 right-4 z-50 pointer-events-none select-none">
      <div className="flex items-center gap-2 opacity-[0.08] dark:opacity-[0.06]">
        <ShieldAlert className="w-3.5 h-3.5 text-slate-900 dark:text-white" />
        <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-900 dark:text-white">
          Prototype Build - Development Environment
        </span>
      </div>
    </div>
  )
}
