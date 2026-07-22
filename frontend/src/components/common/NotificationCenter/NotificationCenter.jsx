import { useState, useCallback } from 'react'

const initialNotifications = [
  { id: 1, title: 'Leave request pending', detail: 'Rohit Sharma · Annual Leave · Mar 15–17', time: '2m ago', type: 'approval', read: false },
  { id: 2, title: 'Task assigned to you', detail: 'Q3 Budget Review · Due Apr 5', time: '15m ago', type: 'task', read: false },
  { id: 3, title: 'Meeting reminder', detail: 'Sprint Planning · Conference Room A · 2:00 PM', time: '25m ago', type: 'meeting', read: false },
  { id: 4, title: 'Payroll processed', detail: 'March payroll approved for 112 employees', time: '1h ago', type: 'system', read: false },
  { id: 5, title: 'New employee onboarded', detail: 'Priya Sharma · Software Engineer II', time: '2h ago', type: 'success', read: false },
  { id: 6, title: 'Performance review due', detail: 'Q1 reviews pending for 8 team members', time: '3h ago', type: 'warning', read: true },
  { id: 7, title: 'Asset allocation pending', detail: 'MacBook Pro M4 · Awaiting assignment', time: '5h ago', type: 'info', read: true },
]

const icons = {
  approval: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
  task: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
  meeting: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
  system: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  success: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
  warning: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z',
  info: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
}

const typeColors = {
  approval: 'bg-[var(--color-warning-400)]',
  task: 'bg-[var(--color-brand-400)]',
  meeting: 'bg-[var(--color-info-400)]',
  system: 'bg-[var(--color-neutral-400)]',
  success: 'bg-[var(--color-success-400)]',
  warning: 'bg-[var(--color-warning-400)]',
  info: 'bg-[var(--color-info-400)]',
}

export default function NotificationCenter({ open, onClose }) {
  const [notifications, setNotifications] = useState(initialNotifications)
  const [filter, setFilter] = useState('all')

  const unread = notifications.filter(n => !n.read).length

  const markAllRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }, [])

  const markRead = useCallback((id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
  }, [])

  const filtered = filter === 'all' ? notifications : notifications.filter(n => !n.read)

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[90] flex items-start justify-end pt-14" onClick={onClose}>
      <div className="fixed inset-0 bg-surface-overlay" onClick={onClose} />
      <div
        className="relative w-full max-w-sm h-[calc(100vh-56px)] bg-surface-elevated border-l border-subtle shadow-xl flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-subtle flex-shrink-0">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-semibold text-primary">Notifications</h2>
            {unread > 0 && (
              <span className="text-xs font-medium bg-[var(--color-brand-100)] text-[var(--color-brand-700)] px-1.5 py-0.5 rounded-full">{unread} new</span>
            )}
          </div>
          <div className="flex items-center gap-1">
            <button onClick={markAllRead} className="text-xs text-link hover:underline">Mark all read</button>
            <button onClick={onClose} className="p-1 rounded hover:bg-surface-hover text-secondary hover:text-primary transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-0 px-4 py-2 border-b border-subtle flex-shrink-0 bg-surface-secondary">
          {['all', 'unread'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 text-xs font-medium rounded transition-colors ${filter === f ? 'bg-surface-elevated border border-subtle text-primary shadow-sm' : 'text-secondary hover:text-primary'}`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-4">
              <svg className="w-10 h-10 text-tertiary mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <p className="text-sm text-secondary">No notifications</p>
            </div>
          ) : (
            filtered.map(n => (
              <button
                key={n.id}
                onClick={() => markRead(n.id)}
                className={`w-full text-left px-4 py-3 border-b border-subtle last:border-0 transition-colors hover:bg-surface-hover ${!n.read ? 'bg-brand-50/30 dark:bg-brand-950/10' : ''}`}
              >
                <div className="flex items-start gap-3">
                  <div className={`mt-0.5 w-8 h-8 rounded flex items-center justify-center flex-shrink-0 ${typeColors[n.type] || typeColors.info} bg-opacity-20`}>
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={icons[n.type] || icons.info} />
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div className="text-sm font-medium text-primary truncate">{n.title}</div>
                      {!n.read && <span className="w-2 h-2 rounded-full bg-[var(--color-brand-500)] flex-shrink-0 mt-1" />}
                    </div>
                    <div className="text-xs text-secondary mt-0.5 truncate-2">{n.detail}</div>
                    <div className="text-[11px] text-tertiary mt-1">{n.time}</div>
                  </div>
                </div>
              </button>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-subtle px-4 py-2.5 flex-shrink-0">
          <button className="text-xs text-link hover:underline w-full text-center">View all notifications</button>
        </div>
      </div>
    </div>
  )
}
