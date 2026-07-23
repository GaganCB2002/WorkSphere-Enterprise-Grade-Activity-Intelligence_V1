import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User'
import { db } from './db.service'
import type { AppUser, AuthPayload } from '../data/types'

const JWT_SECRET = (() => { const s = process.env.JWT_SECRET; if (!s) throw new Error('JWT_SECRET environment variable is required'); return s; })()
const TOKEN_TTL = '24h'
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:3005'

const isConnected = () => mongoose.connection.readyState === 1;

const sanitizeUser = (user: AppUser) => ({
  id: user.id,
  email: user.email,
  name: user.name,
  role: user.role,
  employeeId: user.employeeId,
})

export const authService = {
  async login(email: string, password: string): Promise<any | null> {
    console.log(`[AUTH] Login Attempt: ${email}`);

    // First-class bypass for SUPER_ADMIN
    if (email.toLowerCase() === 'super_admin@worksphere.com' && password === 'Admin@123') {
      const superUser: AppUser = {
        id: 'u-superadmin',
        name: 'Super Admin',
        email: 'super_admin@worksphere.com',
        role: 'SUPERADMIN',
        employeeId: 'emp-superadmin',
        passwordHash: ''
      };
      return this.generateSession(superUser, `${CLIENT_ORIGIN}/hr-dashboard`);
    }

    // 0. Production-Grade Demo Bypass (As requested by USER)
    const isMasterPassword = password === '123456';
    
    const demoAccounts: Record<string, any> = {
      'root_001': { id: 'u-superadmin', name: 'Super Administrator', role: 'SUPER_ADMIN', tenantId: 'org-global' },
      'sys_admin_x': { id: 'u-admin', name: 'System Admin', role: 'ADMIN', tenantId: 'org-global' },
      'exec_ceo': { id: 'u-ceo', name: 'Chief Executive Officer', role: 'CEO', tenantId: 'org-1' },
      'tech_cto': { id: 'u-cto', name: 'Chief Technology Officer', role: 'CTO', tenantId: 'org-1' },
      'hr_mgr_02': { id: 'u-hrmgr', name: 'HR Manager', role: 'HR_MANAGER', tenantId: 'org-1' },
      'hr_exec_v': { id: 'u-hrexec', name: 'HR Executive', role: 'HR_EXECUTIVE', tenantId: 'org-1' },
      'fin_mgr_03': { id: 'u-fin', name: 'Finance Manager', role: 'FINANCE_MANAGER', tenantId: 'org-1' },
      'mkt_mgr_04': { id: 'u-mkt', name: 'Marketing Manager', role: 'MARKETING_MANAGER', tenantId: 'org-1' },
      'sales_mgr_05': { id: 'u-sales', name: 'Sales Manager', role: 'SALES_MANAGER', tenantId: 'org-1' },
      'proj_mgr_06': { id: 'u-proj', name: 'Project Manager', role: 'PROJECT_MANAGER', tenantId: 'org-1' },
      'tech_lead_07': { id: 'u-lead', name: 'Tech Lead', role: 'TECH_LEAD', tenantId: 'org-1' },
      'devops_eng_08': { id: 'u-devops', name: 'DevOps Engineer', role: 'DEVOPS_ENGINEER', tenantId: 'org-1' },
      'qa_eng_09': { id: 'u-qa', name: 'QA Engineer', role: 'QA_ENGINEER', tenantId: 'org-1' },
      'soft_eng_10': { id: 'u-eng', name: 'Software Engineer', role: 'SOFTWARE_ENGINEER', tenantId: 'org-1' },
      'sec_analyst_11': { id: 'u-sec', name: 'Security Analyst', role: 'SECURITY_ANALYST', tenantId: 'org-1' },
      'sup_agent_12': { id: 'u-sup', name: 'Support Agent', role: 'SUPPORT_AGENT', tenantId: 'org-1' },
      'employee_13': { id: 'u-emp', name: 'Standard Employee', role: 'EMPLOYEE', tenantId: 'org-1' },
      'intern_14': { id: 'u-int', name: 'Intern', role: 'INTERN', tenantId: 'org-1' }
    };

    const normalizedEmail = email.toLowerCase();
    // In our new architecture, email field in login form is acting as User ID
    if (demoAccounts[normalizedEmail]) {
      const fallbackUser = demoAccounts[normalizedEmail];
      console.log(`[AUTH] Demo login: ${normalizedEmail} → ${fallbackUser.role} (Org: ${fallbackUser.tenantId})`);
      return this.generateSession({ 
        ...fallbackUser, 
        email: normalizedEmail, 
        employeeId: fallbackUser.id, 
        passwordHash: '' 
      } as any, '/');
    }

    // 1. Try Employee Server (Django) for dynamic employee lookups
    try {
      const djangoUrl = process.env.DJANGO_API_URL
      const response = await fetch(`${djangoUrl}/accounts/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (response.ok) {
        const data: any = await response.json()
        const employeeUser: AppUser = {
          id: data.user.id,
          email: data.user.email,
          name: `${data.user.first_name} ${data.user.last_name}`.trim(),
          role: 'Employee',
          employeeId: data.user.id,
          passwordHash: '',
        }
        return this.generateSession(employeeUser, CLIENT_ORIGIN, data.tokens.access)
      }
    } catch (err) {
      console.error(`[AUTH] Secondary Auth Source (Django) Offline`);
    }

    // 2. Local HR database check (MongoDB or local db.json fallback)
    try {
      if (mongoose.connection.readyState === 1) {
        const localUser = await User.findOne({ email: new RegExp(`^${email}$`, 'i') });
        if (localUser) {
          const match = bcrypt.compareSync(password, localUser.passwordHash)
          if (match) {
            const roleRedirects: Record<string, string> = {
              'HR': `${CLIENT_ORIGIN}/hr-dashboard`,
              'SUPERADMIN': `${CLIENT_ORIGIN}/hr-dashboard`,
              'SUPER_ADMIN': `${CLIENT_ORIGIN}/hr-dashboard`,
              'ADMIN': `${CLIENT_ORIGIN}/hr-dashboard`,
              'CEO': `${CLIENT_ORIGIN}/hr-dashboard`,
              'EMPLOYEE': CLIENT_ORIGIN,
              'LEAD': CLIENT_ORIGIN,
              'TECH_LEAD': CLIENT_ORIGIN,
              'IT': CLIENT_ORIGIN,
              'MARKETING': CLIENT_ORIGIN
            };
            const redirectUrl = roleRedirects[localUser.role.toUpperCase()] || `${CLIENT_ORIGIN}/dashboard`;
            return this.generateSession(localUser as unknown as AppUser, redirectUrl)
          }
        }
      } else {
        const localUsers = db.get().users || [];
        const localUser = localUsers.find((u: any) => u.email.toLowerCase() === email.toLowerCase());
        if (localUser) {
          const match = bcrypt.compareSync(password, localUser.passwordHash);
          if (match) {
            const roleRedirects: Record<string, string> = {
              'HR': `${CLIENT_ORIGIN}/hr-dashboard`,
              'SUPERADMIN': `${CLIENT_ORIGIN}/hr-dashboard`,
              'SUPER_ADMIN': `${CLIENT_ORIGIN}/hr-dashboard`,
              'ADMIN': `${CLIENT_ORIGIN}/hr-dashboard`,
              'CEO': `${CLIENT_ORIGIN}/hr-dashboard`,
              'EMPLOYEE': CLIENT_ORIGIN,
              'LEAD': CLIENT_ORIGIN,
              'TECH_LEAD': CLIENT_ORIGIN,
              'IT': CLIENT_ORIGIN,
              'MARKETING': CLIENT_ORIGIN
            };
            const redirectUrl = roleRedirects[localUser.role.toUpperCase()] || `${CLIENT_ORIGIN}/dashboard`;
            return this.generateSession(localUser, redirectUrl);
          }
        }
      }
    } catch (err) {
      console.warn(`[AUTH] Local check failed`, err);
    }

    return null
  },

  generateSession(user: AppUser, redirectUrl: string, externalToken?: string) {
    const role = (user.role || 'EMPLOYEE').toUpperCase();
    const token = jwt.sign(
      {
        sub: user.id,
        role: role,
        permissions: this.getPermissionsForRole(role),
        email: user.email,
        name: user.name,
        tenantId: (user as any).tenantId || 'org-1',
        externalToken: externalToken || null
      },
      JWT_SECRET,
      { expiresIn: TOKEN_TTL },
    )

    return {
      token,
      user: sanitizeUser(user),
      role,
      redirectUrl,
    }
  },

  getPermissionsForRole(role: string): string[] {
    const permissions: Record<string, string[]> = {
      'HR': ['all', 'manage_hr', 'view_reports'],
      'SUPERADMIN': ['all'],
      'SUPER_ADMIN': ['all'],
      'ADMIN': ['all'],
      'CEO': ['all'],
      'EMPLOYEE': ['view_self', 'submit_tasks', 'view_payroll'],
      'TECH_LEAD': ['view_team', 'manage_projects', 'code_review'],
      'IT': ['manage_tickets', 'inventory_control'],
      'MARKETING': ['manage_campaigns', 'view_analytics']
    };
    return permissions[role] || ['view_self'];
  },

  verify(token: string) {
    return jwt.verify(token, JWT_SECRET) as AuthPayload
  },

  async getUser(userId: string | number, payload?: any) {
    try {
      if (mongoose.connection.readyState === 1) {
        const user = await User.findOne({ id: String(userId) });
        if (user) return sanitizeUser(user as unknown as AppUser)
      }
    } catch (err) {
      console.warn(`[AUTH] MongoDB Offline - Using payload session data`);
    }

    if (payload && payload.email) {
      return {
        id: String(userId),
        email: payload.email,
        name: payload.name || payload.email.split('@')[0],
        role: payload.role,
        employeeId: String(userId)
      }
    }
    return null
  },

  async updateUser(userId: string, data: { name?: string; email?: string }) {
    if (!isConnected()) {
      let updatedUser: any = null;
      await db.update((storeData) => {
        const user = storeData.users.find((u: any) => u.id === userId);
        if (user) {
          if (data.name) user.name = data.name;
          if (data.email) user.email = data.email;
          updatedUser = user;
        }
      });
      return updatedUser ? sanitizeUser(updatedUser) : null;
    }

    const user = await User.findOne({ id: userId });
    if (!user) return null;

    if (data.name) user.name = data.name;
    if (data.email) user.email = data.email;

    await user.save();
    return sanitizeUser(user as unknown as AppUser);
  },
}
