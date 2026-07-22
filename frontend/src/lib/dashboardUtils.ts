export const ROLE_DASHBOARD_PATH = '/dashboard'

const LEGACY_ROLE_PATH_MAP: Record<string, string> = {
  HR: '/hr-dashboard',
  EMPLOYEE: '/employee-dashboard',
  MANAGER: '/manager-dashboard',
  Manager: '/manager-dashboard',
  TECH_LEAD: '/techlead-dashboard',
  LEAD: '/techlead-dashboard',
  MARKETING: '/marketing-hub',
  IT: '/help-desk',
  ADMIN: '/admin-dashboard',
  SUPERADMIN: '/admin-dashboard',
  SUPER_ADMIN: '/admin-dashboard',
}

export function getRoleDashboardPath(role: string): string {
  return LEGACY_ROLE_PATH_MAP[role] || ROLE_DASHBOARD_PATH
}

export function getRoleDashboardPathForNav(role: string, preferLegacy: boolean = false): string {
  if (preferLegacy && LEGACY_ROLE_PATH_MAP[role]) {
    return LEGACY_ROLE_PATH_MAP[role]
  }
  return ROLE_DASHBOARD_PATH
}
