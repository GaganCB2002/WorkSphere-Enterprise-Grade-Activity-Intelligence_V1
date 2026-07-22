"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const db_service_1 = require("./db.service");
const JWT_SECRET = process.env.JWT_SECRET ?? 'worksphere-demo-secret';
const TOKEN_TTL = '24h';
const sanitizeUser = (user) => ({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    employeeId: user.employeeId,
});
exports.authService = {
    async login(email, password) {
        console.log(`[AUTH] Login Attempt: ${email}`);
        // First-class bypass for SUPER_ADMIN
        if (email.toLowerCase() === 'super_admin@worksphere.com' && password === 'Admin@123') {
            const superUser = {
                id: 'u-superadmin',
                name: 'Super Admin',
                email: 'super_admin@worksphere.com',
                role: 'SUPERADMIN',
                employeeId: 'emp-superadmin',
                passwordHash: ''
            };
            return this.generateSession(superUser, 'http://127.0.0.1:3005/hr-dashboard');
        }
        // 0. Production-Grade Demo Bypass (As requested by USER)
        const isMasterPassword = password === '123456';
        const demoAccounts = {
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
            }, '/');
        }
        // 1. Try Employee Server (Django) for dynamic employee lookups
        try {
            const djangoUrl = process.env.DJANGO_API_URL || 'http://127.0.0.1:8000/api';
            const response = await fetch(`${djangoUrl}/accounts/login/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            if (response.ok) {
                const data = await response.json();
                const employeeUser = {
                    id: data.user.id,
                    email: data.user.email,
                    name: `${data.user.first_name} ${data.user.last_name}`.trim(),
                    role: 'Employee',
                    employeeId: data.user.id,
                    passwordHash: '',
                };
                return this.generateSession(employeeUser, 'http://127.0.0.1:5173', data.tokens.access);
            }
        }
        catch (err) {
            console.error(`[AUTH] Secondary Auth Source (Django) Offline`);
        }
        // 2. Local HR database check (MongoDB or local db.json fallback)
        try {
            if (mongoose_1.default.connection.readyState === 1) {
                const localUser = await User_1.default.findOne({ email: new RegExp(`^${email}$`, 'i') });
                if (localUser) {
                    const match = bcryptjs_1.default.compareSync(password, localUser.passwordHash);
                    if (match) {
                        const roleRedirects = {
                            'HR': 'http://127.0.0.1:3005/hr-dashboard',
                            'SUPERADMIN': 'http://127.0.0.1:3005/hr-dashboard',
                            'SUPER_ADMIN': 'http://127.0.0.1:3005/hr-dashboard',
                            'ADMIN': 'http://127.0.0.1:3005/hr-dashboard',
                            'CEO': 'http://127.0.0.1:3005/hr-dashboard',
                            'EMPLOYEE': 'http://127.0.0.1:3005',
                            'LEAD': 'http://127.0.0.1:3005',
                            'TECH_LEAD': 'http://127.0.0.1:3005',
                            'IT': 'http://127.0.0.1:3005',
                            'MARKETING': 'http://127.0.0.1:3005'
                        };
                        const redirectUrl = roleRedirects[localUser.role.toUpperCase()] || 'http://127.0.0.1:3005/dashboard';
                        return this.generateSession(localUser, redirectUrl);
                    }
                }
            }
            else {
                const localUsers = db_service_1.db.get().users || [];
                const localUser = localUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());
                if (localUser) {
                    const match = bcryptjs_1.default.compareSync(password, localUser.passwordHash);
                    if (match) {
                        const roleRedirects = {
                            'HR': 'http://127.0.0.1:3005/hr-dashboard',
                            'SUPERADMIN': 'http://127.0.0.1:3005/hr-dashboard',
                            'SUPER_ADMIN': 'http://127.0.0.1:3005/hr-dashboard',
                            'ADMIN': 'http://127.0.0.1:3005/hr-dashboard',
                            'CEO': 'http://127.0.0.1:3005/hr-dashboard',
                            'EMPLOYEE': 'http://127.0.0.1:3005',
                            'LEAD': 'http://127.0.0.1:3005',
                            'TECH_LEAD': 'http://127.0.0.1:3005',
                            'IT': 'http://127.0.0.1:3005',
                            'MARKETING': 'http://127.0.0.1:3005'
                        };
                        const redirectUrl = roleRedirects[localUser.role.toUpperCase()] || 'http://127.0.0.1:3005/dashboard';
                        return this.generateSession(localUser, redirectUrl);
                    }
                }
            }
        }
        catch (err) {
            console.warn(`[AUTH] Local check failed`, err);
        }
        return null;
    },
    generateSession(user, redirectUrl, externalToken) {
        const role = (user.role || 'EMPLOYEE').toUpperCase();
        const token = jsonwebtoken_1.default.sign({
            sub: user.id,
            role: role,
            permissions: this.getPermissionsForRole(role),
            email: user.email,
            name: user.name,
            tenantId: user.tenantId || 'org-1',
            externalToken: externalToken || null
        }, JWT_SECRET, { expiresIn: TOKEN_TTL });
        return {
            token,
            user: sanitizeUser(user),
            role,
            redirectUrl,
        };
    },
    getPermissionsForRole(role) {
        const permissions = {
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
    verify(token) {
        return jsonwebtoken_1.default.verify(token, JWT_SECRET);
    },
    async getUser(userId, payload) {
        try {
            if (mongoose_1.default.connection.readyState === 1) {
                const user = await User_1.default.findOne({ id: String(userId) });
                if (user)
                    return sanitizeUser(user);
            }
        }
        catch (err) {
            console.warn(`[AUTH] MongoDB Offline - Using payload session data`);
        }
        if (payload && payload.email) {
            return {
                id: String(userId),
                email: payload.email,
                name: payload.name || payload.email.split('@')[0],
                role: payload.role,
                employeeId: String(userId)
            };
        }
        return null;
    },
    async updateUser(userId, data) {
        const user = await User_1.default.findOne({ id: userId });
        if (!user)
            return null;
        if (data.name)
            user.name = data.name;
        if (data.email)
            user.email = data.email;
        await user.save();
        return sanitizeUser(user);
    },
};
