import { type ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import type { Role, User } from '../../types'
import { getRoleDashboardPath } from '../../lib/dashboardUtils'

interface ProtectedRouteProps {
  user: User | null
  allowedRoles: Role[]
  children: ReactNode
}

export function ProtectedRoute({ user, allowedRoles, children }: ProtectedRouteProps) {
  if (!user) {
    return <Navigate to="/login" replace />
  }

  // Check if user role is in the allowed list (case-insensitive)
  const isAllowed = allowedRoles.some(
    (role) => role.toLowerCase() === user?.role?.toLowerCase()
  )

  if (!isAllowed) {
    // If not allowed, redirect to their primary dashboard
    const userRole = (user?.role || '').toUpperCase()
    return <Navigate to={getRoleDashboardPath(userRole)} replace />
  }

  return <>{children}</>
}
