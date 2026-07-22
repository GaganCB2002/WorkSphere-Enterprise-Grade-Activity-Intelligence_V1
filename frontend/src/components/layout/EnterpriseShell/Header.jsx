import { useState, useRef, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Header({ onSearchOpen, unreadCount = 3 }) {
  const user = useSelector(state => state.auth.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [profileOpen, setProfileOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const [theme, setTheme] = useState(() => {
    if (typeof document !== 'undefined') {
      return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
    }
    return 'light'
  })
  const profileRef = useRef(null)
  const notifRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false)
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const toggleTheme = useCallback(() => {
    const next = theme === 'light' ? 'dark' : 'light'
    setTheme(next)
    if (next === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('theme', next)
  }, [theme])

  const handleLogout = useCallback(() => {
    dispatch({ type: 'LOGOUT' })
    navigate('/login')
  }, [dispatch, navigate])

  const notifications = [
    { id: 1, title: 'Leave request pending', detail: 'Rohit Sharma applied for annual leave', time: '2m ago', type: 'approval' },
    { id: 2, title: 'Task assigned to you', detail: 'Q3 Budget Review needs your input', time: '15m ago', type: 'task' },
    { id: 3, title: 'Meeting reminder', detail: 'Sprint Planning in 15 minutes', time: '25m ago', type: 'meeting' },
  ]

  return (
    <header
      className="h-14 flex items-center gap-3 px-4 border-b flex-shrink-0 z-30"
      style={{ backgroundColor: 'var(--color-header-bg)', borderColor: 'var(--color-header-border)' }}
    >
      {/* Global Search Trigger */}
      <button
        onClick={onSearchOpen}
        className="flex items-center gap-2 px-3 py-1.5 rounded bg-surface-secondary hover:bg-surface-tertiary border border-subtle transition-colors duration-150 text-sm text-secondary flex-1 max-w-md cursor-pointer"
      >
        <svg className="w-4 h-4 text-tertiary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <span className="text-tertiary">Search employees, projects, documents...</span>
        <span className="ml-auto flex items-center gap-1 text-[11px] text-tertiary bg-surface-tertiary px-1.5 py-0.5 rounded">
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
          K
        </span>
      </button>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Quick Actions */}
      <div className="flex items-center gap-1">
        <ActionButton icon={
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        } tooltip="Create" />
        <ActionButton icon={
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        } tooltip="Export" />
        <ActionButton icon={
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        } tooltip="Refresh" />
      </div>

      <div className="w-px h-6" style={{ backgroundColor: 'var(--color-border)' }} />

      {/* Notifications */}
      <div ref={notifRef} className="relative">
        <button
          onClick={() => setNotifOpen(!notifOpen)}
          className="relative p-1.5 rounded hover:bg-surface-hover transition-colors duration-150 text-secondary hover:text-primary"
          title="Notifications"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[var(--color-error-500)] text-[10px] font-medium text-white flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>

        {notifOpen && (
          <div className="absolute right-0 top-full mt-2 w-80 bg-surface-elevated border border-subtle rounded-lg shadow-lg z-50">
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-subtle">
              <span className="text-sm font-semibold text-primary">Notifications</span>
              <button className="text-xs text-link hover:underline">Mark all read</button>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {notifications.map(n => (
                <button key={n.id} className="w-full text-left px-4 py-2.5 hover:bg-surface-hover transition-colors border-b border-subtle last:border-0">
                  <div className="flex items-start gap-2.5">
                    <div className={`mt-0.5 w-2 h-2 rounded-full flex-shrink-0 ${n.type === 'approval' ? 'bg-[var(--color-warning-400)]' : n.type === 'task' ? 'bg-[var(--color-brand-400)]' : 'bg-[var(--color-success-400)]'
                      }`} />
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium text-primary truncate">{n.title}</div>
                      <div className="text-xs text-secondary mt-0.5 truncate">{n.detail}</div>
                      <div className="text-[11px] text-tertiary mt-0.5">{n.time}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            <div className="border-t border-subtle px-4 py-2">
              <button className="text-xs text-link hover:underline w-full text-center">View all notifications</button>
            </div>
          </div>
        )}
      </div>

      {/* Messages */}
      <button
        className="relative p-1.5 rounded hover:bg-surface-hover transition-colors duration-150 text-secondary hover:text-primary"
        title="Messages"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </button>

      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="p-1.5 rounded hover:bg-surface-hover transition-colors duration-150 text-secondary hover:text-primary"
        title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        {theme === 'light' ? (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        ) : (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        )}
      </button>

      {/* Help */}
      <button className="p-1.5 rounded hover:bg-surface-hover transition-colors duration-150 text-secondary hover:text-primary" title="Help">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
        </svg>
      </button>

      {/* Settings */}
      <button className="p-1.5 rounded hover:bg-surface-hover transition-colors duration-150 text-secondary hover:text-primary" title="Settings">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>

      <div className="w-px h-6" style={{ backgroundColor: 'var(--color-border)' }} />

      {/* Profile */}
      <div ref={profileRef} className="relative">
        <button
          onClick={() => setProfileOpen(!profileOpen)}
          className="flex items-center gap-2 p-1 rounded hover:bg-surface-hover transition-colors duration-150"
        >
          <div className="w-7 h-7 rounded-full bg-[var(--color-brand-600)] flex items-center justify-center text-xs font-medium text-white">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <svg className={`w-3 h-3 text-secondary transition-transform duration-150 ${profileOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {profileOpen && (
          <div className="absolute right-0 top-full mt-1 w-56 bg-surface-elevated border border-subtle rounded-lg shadow-lg z-50">
            <div className="px-4 py-3 border-b border-subtle">
              <div className="text-sm font-medium text-primary truncate">{user?.name || 'User'}</div>
              <div className="text-xs text-secondary truncate mt-0.5">{user?.role || ''}</div>
            </div>
            <div className="py-1">
              <ProfileMenuItem label="Profile" icon={
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              } onClick={() => { setProfileOpen(false); navigate('/profile') }} />
              <ProfileMenuItem label="Account settings" icon={
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              } />
              <ProfileMenuItem label="Keyboard shortcuts" icon={
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              } />
            </div>
            <div className="border-t border-subtle py-1">
              <ProfileMenuItem label="Sign out" icon={
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              } onClick={handleLogout} destructive />
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

function ActionButton({ icon, tooltip }) {
  return (
    <button
      className="p-1.5 rounded hover:bg-surface-hover transition-colors duration-150 text-secondary hover:text-primary"
      title={tooltip}
    >
      {icon}
    </button>
  )
}

function ProfileMenuItem({ label, icon, onClick, destructive }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left flex items-center gap-2.5 px-4 py-2 text-sm transition-colors duration-150 ${destructive ? 'text-[var(--color-error-600)] hover:bg-error-50' : 'text-primary hover:bg-surface-hover'
        }`}
    >
      <span className="text-secondary">{icon}</span>
      {label}
    </button>
  )
}
