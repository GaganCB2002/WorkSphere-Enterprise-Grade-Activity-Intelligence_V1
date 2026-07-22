import { useId } from 'react'

export function ChartContainer({ title, subtitle, children, height = 280, actions, loading }) {
  const id = useId()

  if (loading) {
    return (
      <div className="bg-surface-elevated border border-subtle rounded-lg p-4">
        <div className="skeleton h-4 w-40 mb-1" />
        <div className="skeleton h-3 w-56 mb-4" />
        <div className="skeleton" style={{ height, width: '100%' }} />
      </div>
    )
  }

  return (
    <div className="bg-surface-elevated border border-subtle rounded-lg p-4">
      <div className="flex items-start justify-between mb-3">
        <div>
          {title && <h3 className="text-sm font-semibold text-primary">{title}</h3>}
          {subtitle && <p className="text-xs text-secondary mt-0.5">{subtitle}</p>}
        </div>
        {actions && <div className="flex items-center gap-1">{actions}</div>}
      </div>
      <div style={{ height }} className="w-full">
        {children}
      </div>
    </div>
  )
}

export function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-surface-elevated border border-subtle rounded-lg shadow-lg px-3 py-2 text-xs">
      <p className="font-medium text-primary mb-1">{label}</p>
      {payload.map((entry, i) => (
        <p key={i} className="text-secondary" style={{ color: entry.color }}>
          {entry.name}: <span className="font-medium text-primary">{entry.value}</span>
        </p>
      ))}
    </div>
  )
}

export function ChartLegend({ payload }) {
  if (!payload) return null
  return (
    <div className="flex items-center gap-4 mt-3 justify-center">
      {payload.map((entry, i) => (
        <div key={i} className="flex items-center gap-1.5 text-xs text-secondary">
          <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: entry.color }} />
          {entry.value}
        </div>
      ))}
    </div>
  )
}
