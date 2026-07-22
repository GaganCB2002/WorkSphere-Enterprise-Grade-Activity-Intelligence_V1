import { useState, useRef, useEffect } from 'react'

export default function Dropdown({ trigger, items, align = 'left' }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    function handler(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div ref={ref} className="relative inline-block">
      <div onClick={() => setOpen(!open)}>{trigger}</div>
      {open && (
        <div
          className={`absolute top-full mt-1 min-w-[160px] bg-surface-elevated border border-subtle rounded-lg shadow-lg py-1 z-50 ${align === 'right' ? 'right-0' : 'left-0'}`}
          onClick={() => setOpen(false)}
        >
          {items.map((item, i) => {
            if (item.divider) {
              return <div key={i} className="my-1 border-t border-subtle" />
            }
            if (item.label && item.onClick) {
              return (
                <button
                  key={i}
                  onClick={item.onClick}
                  disabled={item.disabled}
                  className={`w-full text-left flex items-center gap-2.5 px-3 py-1.5 text-sm transition-colors duration-100 ${item.destructive ? 'text-[var(--color-error-600)] hover:bg-error-50' : 'text-primary hover:bg-surface-hover'
                    } ${item.disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  {item.icon && (
                    <span className="w-4 h-4 text-secondary flex-shrink-0">
                      <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                      </svg>
                    </span>
                  )}
                  {item.label}
                </button>
              )
            }
            return null
          })}
        </div>
      )}
    </div>
  )
}
