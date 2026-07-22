import { useEffect, useCallback } from 'react'

export default function Modal({ open, onClose, title, subtitle, children, actions, size = 'md', closeOnOverlay = true }) {
  const handleKeyDown = useCallback((e) => {
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

  if (!open) return null

  const widths = { sm: 'max-w-sm', md: 'max-w-lg', lg: 'max-w-2xl', xl: 'max-w-4xl', full: 'max-w-[90vw]' }

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center">
      <div
        className="fixed inset-0 bg-surface-overlay"
        onClick={closeOnOverlay ? onClose : undefined}
      />
      <div className={`relative w-full ${widths[size] || widths.md} mx-4 bg-surface-elevated border border-subtle rounded-xl shadow-xl overflow-hidden`}>
        {/* Header */}
        <div className="flex items-start justify-between px-5 py-4 border-b border-subtle">
          <div>
            {title && <h2 className="text-base font-semibold text-primary">{title}</h2>}
            {subtitle && <p className="text-sm text-secondary mt-0.5">{subtitle}</p>}
          </div>
          <button onClick={onClose} className="p-1 rounded hover:bg-surface-hover text-secondary hover:text-primary transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-4 max-h-[60vh] overflow-y-auto">
          {children}
        </div>

        {/* Footer Actions */}
        {actions && (
          <div className="flex items-center justify-end gap-2 px-5 py-3 border-t border-subtle bg-surface-secondary">
            {actions}
          </div>
        )}
      </div>
    </div>
  )
}

Modal.Button = function ModalButton({ children, variant = 'primary', onClick, disabled }) {
  const base = 'px-3.5 py-1.5 text-sm font-medium rounded transition-all duration-150 '
  const variants = {
    primary: 'bg-[var(--color-brand-500)] text-white hover:bg-[var(--color-brand-600)] disabled:opacity-50',
    secondary: 'bg-surface-hover text-primary hover:bg-surface-active border border-subtle disabled:opacity-50',
    danger: 'bg-[var(--color-error-500)] text-white hover:bg-[var(--color-error-600)] disabled:opacity-50',
    ghost: 'text-secondary hover:text-primary hover:bg-surface-hover disabled:opacity-50',
  }
  return (
    <button onClick={onClick} disabled={disabled} className={base + (variants[variant] || variants.primary)}>
      {children}
    </button>
  )
}
