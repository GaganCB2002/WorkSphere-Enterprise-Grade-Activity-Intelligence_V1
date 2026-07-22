import { useState, useEffect, useCallback, Suspense } from 'react'
import { useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import Breadcrumbs from '../../common/Breadcrumb/Breadcrumbs'
import GlobalSearch from '../../common/Search/GlobalSearch'

const sidebarWidth = 'var(--color-sidebar-width)'
const sidebarWidthCollapsed = 'var(--color-sidebar-width-collapsed)'

export default function EnterpriseShell({ children }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    return localStorage.getItem('sidebarCollapsed') === 'true'
  })
  const [searchOpen, setSearchOpen] = useState(false)
  const location = useLocation()

  const toggleSidebar = useCallback(() => {
    setSidebarCollapsed(prev => {
      const next = !prev
      localStorage.setItem('sidebarCollapsed', String(next))
      return next
    })
  }, [])

  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  useEffect(() => {
    setSearchOpen(false)
  }, [location.pathname])

  return (
    <div className="h-screen flex overflow-hidden bg-surface">
      {/* Sidebar */}
      <div className="flex-shrink-0 h-full" style={{ width: sidebarCollapsed ? sidebarWidthCollapsed : sidebarWidth }}>
        <Sidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />
      </div>

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <Header onSearchOpen={() => setSearchOpen(true)} unreadCount={3} />

        {/* Content */}
        <main className="flex-1 overflow-y-auto bg-surface-secondary">
          <div className="px-6 py-5">
            <Breadcrumbs />
            <Suspense fallback={<PageLoading />}>
              {children}
            </Suspense>
          </div>
        </main>

        {/* Status bar */}
        <footer
          className="h-6 flex items-center gap-4 px-4 text-[11px] text-tertiary border-t flex-shrink-0"
          style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
        >
          <span>WorkSphere v3.0</span>
          <span className="w-px h-3" style={{ backgroundColor: 'var(--color-border)' }} />
          <span>Last sync: {new Date().toLocaleTimeString()}</span>
          <span className="w-px h-3" style={{ backgroundColor: 'var(--color-border)' }} />
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-success-500)]" />
            All systems operational
          </span>
          <span className="ml-auto">Tenant: WorkSphere Corp</span>
        </footer>
      </div>

      {/* Global Search */}
      <GlobalSearch open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  )
}

function PageLoading() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-8 skeleton w-48" />
      <div className="h-4 skeleton w-96" />
      <div className="grid grid-cols-4 gap-4 mt-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-24 skeleton rounded-lg" />
        ))}
      </div>
      <div className="h-64 skeleton rounded-lg mt-4" />
    </div>
  )
}
