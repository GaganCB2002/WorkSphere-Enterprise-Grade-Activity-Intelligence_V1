import { useState } from 'react'

export default function Tabs({ tabs, defaultTab, onChange, variant = 'underline' }) {
  const [active, setActive] = useState(defaultTab || tabs[0]?.key)

  const handleChange = (key) => {
    setActive(key)
    onChange?.(key)
  }

  return (
    <div>
      <div className={`flex border-b border-subtle ${variant === 'pills' ? 'gap-1 border-0' : ''}`}>
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => handleChange(tab.key)}
            disabled={tab.disabled}
            className={`whitespace-nowrap text-sm font-medium transition-all duration-150 ${variant === 'underline'
              ? `px-3 py-2.5 border-b-2 -mb-px ${active === tab.key ? 'border-[var(--color-brand-500)] text-primary' : 'border-transparent text-secondary hover:text-primary'}`
              : `px-3.5 py-2 rounded-lg ${active === tab.key ? 'bg-surface-elevated border border-subtle shadow-sm text-primary' : 'text-secondary hover:text-primary'}`
              } ${tab.disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            <div className="flex items-center gap-2">
              {tab.icon && (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={tab.icon} />
                </svg>
              )}
              {tab.label}
              {tab.count !== undefined && (
                <span className="text-xs bg-surface-tertiary text-secondary px-1.5 py-0.5 rounded-full">{tab.count}</span>
              )}
              {tab.badge && (
                <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-[var(--color-brand-100)] text-[var(--color-brand-700)]">{tab.badge}</span>
              )}
            </div>
          </button>
        ))}
      </div>
      <div className="pt-4">
        {tabs.find(t => t.key === active)?.content}
      </div>
    </div>
  )
}
