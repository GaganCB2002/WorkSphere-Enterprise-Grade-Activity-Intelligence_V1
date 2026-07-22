export default function Badge({ children, variant = 'default', size = 'sm', dot }) {
  const variants = {
    default: ['bg-surface-tertiary', 'text-secondary'],
    brand: ['bg-brand-50 dark:bg-brand-950/30', 'text-[var(--color-brand-700)] dark:text-[var(--color-brand-300)]'],
    success: ['bg-[var(--color-success-50)]', 'text-[var(--color-success-700)]'],
    warning: ['bg-[var(--color-warning-50)]', 'text-[var(--color-warning-700)]'],
    error: ['bg-[var(--color-error-50)]', 'text-[var(--color-error-700)]'],
    info: ['bg-[var(--color-info-50)]', 'text-[var(--color-info-700)]'],
  }
  const sizes = {
    xs: 'text-[10px] px-1 py-0.5',
    sm: 'text-xs px-1.5 py-0.5',
    md: 'text-sm px-2 py-1',
  }
  const [bg, text] = variants[variant] || variants.default

  return (
    <span className={`inline-flex items-center gap-1.5 font-medium rounded ${bg} ${text} ${sizes[size] || sizes.sm}`}>
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${dot === true ? bg : 'bg-current'}`} />}
      {children}
    </span>
  )
}
