export default function KpiCard({ title, value, subtitle, trend, trendType, icon, loading, onClick, variant = 'default' }) {
  if (loading) {
    return (
      <div className="bg-surface-elevated border border-subtle rounded-lg p-4">
        <div className="skeleton h-3 w-24 mb-3" />
        <div className="skeleton h-7 w-32 mb-2" />
        <div className="skeleton h-3 w-20" />
      </div>
    )
  }

  const trendColor = trendType === 'up' ? 'text-[var(--color-success-600)]' 
    : trendType === 'down' ? 'text-[var(--color-error-600)]' 
    : 'text-[var(--color-warning-600)]'

  const trendBg = trendType === 'up' ? 'bg-[var(--color-success-50)]' 
    : trendType === 'down' ? 'bg-[var(--color-error-50)]' 
    : 'bg-[var(--color-warning-50)]'

  return (
    <button
      onClick={onClick}
      className={`w-full text-left bg-surface-elevated border border-subtle rounded-lg p-4 transition-all duration-150 hover:shadow-sm hover:border-border-strong ${onClick ? 'cursor-pointer' : 'cursor-default'}`}
    >
      <div className="flex items-start justify-between mb-2">
        <span className="text-xs font-medium text-secondary uppercase tracking-wider">{title}</span>
        {icon && (
          <span className="text-tertiary">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
            </svg>
          </span>
        )}
      </div>
      <div className="text-2xl font-semibold text-primary tracking-tight">{value}</div>
      {subtitle && (
        <div className="text-xs text-secondary mt-1">{subtitle}</div>
      )}
      {trend !== undefined && (
        <div className={`inline-flex items-center gap-1 mt-2 text-xs font-medium px-1.5 py-0.5 rounded ${trendBg} ${trendColor}`}>
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d={trendType === 'up' ? 'M5 10l7-7m0 0l7 7m-7-7v18' : trendType === 'down' ? 'M19 14l-7 7m0 0l-7-7m7 7V3' : 'M5 12h14'} />
          </svg>
          {trend}
        </div>
      )}
    </button>
  )
}

KpiCard.SMALL = function KpiCardSmall({ title, value, trend, trendType, loading }) {
  if (loading) {
    return (
      <div className="bg-surface-elevated border border-subtle rounded-lg p-3">
        <div className="skeleton h-2 w-16 mb-2" />
        <div className="skeleton h-5 w-20" />
      </div>
    )
  }

  return (
    <div className="bg-surface-elevated border border-subtle rounded-lg p-3">
      <div className="text-[11px] font-medium text-secondary uppercase tracking-wider mb-1">{title}</div>
      <div className="flex items-end gap-2">
        <span className="text-lg font-semibold text-primary">{value}</span>
        {trend !== undefined && (
          <span className={`text-xs font-medium ${trendType === 'up' ? 'text-[var(--color-success-600)]' : trendType === 'down' ? 'text-[var(--color-error-600)]' : 'text-[var(--color-warning-600)]'}`}>
            {trend}
          </span>
        )}
      </div>
    </div>
  )
}

KpiCard.LARGE = function KpiCardLarge({ title, value, subtitle, children }) {
  return (
    <div className="bg-surface-elevated border border-subtle rounded-lg p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-xs font-medium text-secondary uppercase tracking-wider">{title}</div>
          {value && <div className="text-3xl font-semibold text-primary mt-1">{value}</div>}
          {subtitle && <div className="text-xs text-secondary mt-0.5">{subtitle}</div>}
        </div>
      </div>
      {children}
    </div>
  )
}
