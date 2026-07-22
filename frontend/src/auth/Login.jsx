import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, LogIn, Users, UserCircle, Briefcase, Loader2,
  Wallet, Crown, Cpu, Code, ShieldCheck, Cloud, Megaphone, Kanban, Headset,
  ArrowRight, Check, Globe, HelpCircle, FileText, Lock
} from 'lucide-react';
import axios from 'axios';

const roleCategories = [
  {
    title: 'Administration',
    roles: ['SUPER_ADMIN', 'ADMIN', 'SECURITY_ANALYST']
  },
  {
    title: 'Executive',
    roles: ['CEO', 'CTO']
  },
  {
    title: 'Human Resources',
    roles: ['HR_MANAGER', 'HR_EXECUTIVE']
  },
  {
    title: 'Engineering',
    roles: ['TECH_LEAD', 'SOFTWARE_ENGINEER', 'QA_ENGINEER', 'DEVOPS_ENGINEER']
  },
  {
    title: 'Operations',
    roles: ['FINANCE_MANAGER', 'MARKETING_MANAGER', 'SALES_MANAGER', 'PROJECT_MANAGER']
  },
  {
    title: 'Support',
    roles: ['SUPPORT_AGENT', 'EMPLOYEE', 'INTERN']
  }
];

const rolesList = {
  SUPER_ADMIN: { role: 'SUPER_ADMIN', name: 'Super Administrator', desc: 'Full system access and global security management', icon: Shield },
  ADMIN: { role: 'ADMIN', name: 'System Admin', desc: 'Infrastructure monitoring and user provisioning', icon: Shield },
  SECURITY_ANALYST: { role: 'SECURITY_ANALYST', name: 'Security Analyst', desc: 'SIEM monitoring and vulnerability assessment', icon: ShieldCheck },
  
  CEO: { role: 'CEO', name: 'Chief Executive Officer', desc: 'Strategic oversight and financial reporting', icon: Crown },
  CTO: { role: 'CTO', name: 'Chief Technology Officer', desc: 'R&D access and engineering roadmaps', icon: Cpu },
  
  HR_MANAGER: { role: 'HR_MANAGER', name: 'HR Manager', desc: 'Personnel management and compliance', icon: Users },
  HR_EXECUTIVE: { role: 'HR_EXECUTIVE', name: 'HR Executive', desc: 'Onboarding, leave management, and records', icon: Users },
  
  TECH_LEAD: { role: 'TECH_LEAD', name: 'Tech Lead', desc: 'Code review and team technical direction', icon: Code },
  SOFTWARE_ENGINEER: { role: 'SOFTWARE_ENGINEER', name: 'Software Engineer', desc: 'Develop and maintain enterprise applications', icon: Code },
  QA_ENGINEER: { role: 'QA_ENGINEER', name: 'QA Engineer', desc: 'Test automation and quality metrics', icon: ShieldCheck },
  DEVOPS_ENGINEER: { role: 'DEVOPS_ENGINEER', name: 'DevOps Engineer', desc: 'Kubernetes, CI/CD, and deployment', icon: Cloud },
  
  FINANCE_MANAGER: { role: 'FINANCE_MANAGER', name: 'Finance Manager', desc: 'Cash flow, revenue audits, and tax ledgers', icon: Wallet },
  MARKETING_MANAGER: { role: 'MARKETING_MANAGER', name: 'Marketing Manager', desc: 'Campaign ROI and marketing analytics', icon: Megaphone },
  SALES_MANAGER: { role: 'SALES_MANAGER', name: 'Sales Manager', desc: 'CRM pipeline and revenue forecasting', icon: Briefcase },
  PROJECT_MANAGER: { role: 'PROJECT_MANAGER', name: 'Project Manager', desc: 'Sprint management and task allocation', icon: Kanban },
  
  SUPPORT_AGENT: { role: 'SUPPORT_AGENT', name: 'Support Agent', desc: 'Ticket management and customer resolution', icon: Headset },
  EMPLOYEE: { role: 'EMPLOYEE', name: 'Employee', desc: 'Attendance, leave requests, and team chat', icon: UserCircle },
  INTERN: { role: 'INTERN', name: 'Intern', desc: 'Training, tasks, and mentoring', icon: UserCircle },
};

const demoCredentials = {
  'SUPER_ADMIN': { id: 'super_admin@worksphere.com', pass: 'Admin@123' },
  'ADMIN': { id: 'sys_admin_x', pass: '123456' },
  'CEO': { id: 'exec_ceo', pass: '123456' },
  'CTO': { id: 'tech_cto', pass: '123456' },
  'HR_MANAGER': { id: 'hr_mgr_02', pass: '123456' },
  'HR_EXECUTIVE': { id: 'hr_exec_v', pass: '123456' },
  'FINANCE_MANAGER': { id: 'fin_mgr_03', pass: '123456' },
  'MARKETING_MANAGER': { id: 'mkt_mgr_04', pass: '123456' },
  'SALES_MANAGER': { id: 'sales_mgr_05', pass: '123456' },
  'PROJECT_MANAGER': { id: 'proj_mgr_06', pass: '123456' },
  'TECH_LEAD': { id: 'tech_lead_07', pass: '123456' },
  'DEVOPS_ENGINEER': { id: 'devops_eng_08', pass: '123456' },
  'QA_ENGINEER': { id: 'qa_eng_09', pass: '123456' },
  'SOFTWARE_ENGINEER': { id: 'soft_eng_10', pass: '123456' },
  'SECURITY_ANALYST': { id: 'sec_analyst_11', pass: '123456' },
  'SUPPORT_AGENT': { id: 'sup_agent_12', pass: '123456' },
  'EMPLOYEE': { id: 'employee_13', pass: '123456' },
  'INTERN': { id: 'intern_14', pass: '123456' },
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState(null);
  const [loginUserId, setLoginUserId] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleRoleSelect = (roleKey) => {
    setSelectedRole(roleKey);
    const creds = demoCredentials[roleKey];
    if (creds) {
      setLoginUserId(creds.id);
      setLoginPassword(creds.pass);
    } else {
      setLoginUserId(`${roleKey.toLowerCase()}@worksphere.com`);
      setLoginPassword('123456');
    }
  };

  const localLogin = () => {
    const roleData = rolesList[selectedRole];
    const token = 'local-' + btoa(JSON.stringify({ role: selectedRole, name: roleData.name, id: loginUserId }));

    localStorage.setItem('token', token);

    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: {
        id: loginUserId,
        name: roleData.name,
        role: selectedRole,
        department: roleCategories.find(c => c.roles.includes(selectedRole))?.title || 'General',
        tenantId: 'org-1',
        token: token,
      },
    });
    navigate('/dashboard');
  };

  const handleVerifyAndEnter = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);

    try {
      const response = await axios.post('/api/auth/login', {
        email: loginUserId,
        password: loginPassword,
      });

      const { token, user, role } = response.data;

      localStorage.setItem('token', token);

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          id: user.id,
          name: user.name,
          role: role,
          department: roleCategories.find(c => c.roles.includes(selectedRole))?.title || 'General',
          tenantId: user.tenantId || 'org-1',
          token: token,
        },
      });
      navigate('/dashboard');
    } catch (error) {
      console.warn('Backend login failed, using local fallback:', error);
      localLogin();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-[#111827] flex flex-col lg:flex-row overflow-hidden selection:bg-[#2563EB] selection:text-white">
      
      {/* Top Navigation Overlay */}
      <header className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 lg:bg-transparent bg-white/80 backdrop-blur-md lg:border-none border-b border-[#E5E7EB]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-[#2563EB] to-blue-700 rounded-lg flex items-center justify-center shadow-md">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <span className="text-[17px] font-bold tracking-tight">WorkSphere</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8 text-[14px] font-medium text-[#6B7280]">
          <a href="#" className="hover:text-[#111827] transition-colors">Support</a>
          <a href="#" className="hover:text-[#111827] transition-colors">Documentation</a>
          <a href="#" className="hover:text-[#111827] transition-colors">Contact</a>
          <div className="h-4 w-[1px] bg-[#E5E7EB]"></div>
          <div className="flex items-center gap-4">
            <Globe className="w-4 h-4 cursor-pointer hover:text-[#111827]" />
            <HelpCircle className="w-4 h-4 cursor-pointer hover:text-[#111827]" />
          </div>
        </nav>
      </header>

      {/* LEFT SECTION (40%) */}
      <div className="hidden lg:flex w-[40%] relative flex-col justify-center px-16 bg-white overflow-hidden border-r border-[#E5E7EB]">
        {/* Subtle Background Mesh / Texture */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-50 via-white to-white opacity-80 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-blue-50/40 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

        <div className="relative z-10 max-w-md mt-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-[13px] font-semibold mb-8 border border-blue-100">
            <Lock className="w-3.5 h-3.5" />
            Enterprise SSO Secured
          </div>
          
          <h1 className="text-[42px] leading-[1.1] font-bold text-[#111827] tracking-tight mb-6">
            Intelligent operations for modern enterprises.
          </h1>
          
          <p className="text-[18px] text-[#6B7280] leading-relaxed mb-12">
            Centralized role-based access control, analytics, and operational tracking for Fortune 500 companies.
          </p>

          <div className="space-y-6">
            {[
              { label: 'Role-Based Authorization', desc: 'Zero-trust architecture with granular access policies.' },
              { label: 'Activity Intelligence', desc: 'Real-time monitoring and advanced performance analytics.' },
              { label: 'Enterprise Compliance', desc: 'SOC2 Type II, ISO 27001, and GDPR compliant infrastructure.' }
            ].map((feature, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 font-bold" />
                </div>
                <div>
                  <h4 className="text-[15px] font-semibold text-[#111827]">{feature.label}</h4>
                  <p className="text-[14px] text-[#6B7280] mt-1">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 pt-8 border-t border-[#E5E7EB] flex items-center justify-between">
            <div className="text-[13px] text-[#6B7280] font-medium">Version 4.2.1-Enterprise</div>
            <div className="flex gap-4">
              <span className="text-[12px] font-bold text-[#9CA3AF] tracking-wider uppercase">SOC2 Certified</span>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SECTION (60%) */}
      <div className="flex-1 relative flex flex-col h-screen overflow-y-auto bg-[#F8FAFC]">
        <div className="flex-1 w-full max-w-[1000px] mx-auto px-8 lg:px-16 pt-32 pb-24">
          
          <AnimatePresence mode="wait">
            {selectedRole === null ? (
              <motion.div 
                key="role-selection"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="w-full"
              >
                <div className="mb-10">
                  <h2 className="text-[28px] font-bold text-[#111827] tracking-tight mb-2">Select Identity</h2>
                  <p className="text-[15px] text-[#6B7280]">Choose your assigned enterprise role to authenticate into the system.</p>
                </div>

                <div className="space-y-12">
                  {roleCategories.map((category, idx) => (
                    <div key={idx}>
                      <h3 className="text-[14px] font-extrabold text-[#374151] uppercase tracking-wider mb-5 px-1">
                        {category.title}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                        {category.roles.map(roleKey => {
                          const roleData = rolesList[roleKey];
                          const IconComp = roleData.icon;
                          return (
                            <div
                              key={roleKey}
                              onClick={() => handleRoleSelect(roleKey)}
                              className="group relative flex flex-col bg-white border border-[#E5E7EB] rounded-[18px] p-5 cursor-pointer shadow-sm hover:shadow-md hover:border-[#2563EB] transition-all duration-200 hover:-translate-y-1 overflow-hidden"
                              style={{ width: '100%', minHeight: '110px' }}
                            >
                              {/* Selection overlay effect */}
                              <div className="absolute inset-0 bg-[#EFF6FF] opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"></div>
                              
                              <div className="relative z-10 flex items-start gap-4">
                                <div className="p-2.5 rounded-xl bg-[#F3F4F6] text-[#4B5563] group-hover:bg-[#2563EB] group-hover:text-white transition-colors duration-200">
                                  <IconComp className="w-5 h-5" />
                                </div>
                                <div className="flex-1">
                                  <h4 className="text-[17px] font-bold text-[#111827] leading-tight mb-1 group-hover:text-[#2563EB] transition-colors">
                                    {roleData.name}
                                  </h4>
                                  <p className="text-[14px] text-[#4B5563] font-medium leading-snug line-clamp-2">
                                    {roleData.desc}
                                  </p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="login-panel"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="w-full max-w-[380px] mx-auto mt-12 relative"
              >
                <button
                  onClick={() => setSelectedRole(null)}
                  className="absolute -top-12 left-0 text-[13px] font-medium text-[#6B7280] hover:text-[#111827] flex items-center gap-1.5 transition-colors"
                >
                  <ArrowRight className="w-3.5 h-3.5 rotate-180" /> Back
                </button>

                <div className="bg-white border border-[#E5E7EB] rounded-[20px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                  <div className="flex flex-col items-center mb-8">
                    <div className="w-12 h-12 rounded-[14px] bg-white border border-[#E5E7EB] shadow-sm text-[#111827] flex items-center justify-center mb-4">
                      {React.createElement(rolesList[selectedRole].icon, { className: "w-6 h-6 stroke-[1.5]" })}
                    </div>
                    <h2 className="text-[22px] font-bold text-[#111827] tracking-tight text-center">
                      Welcome back
                    </h2>
                    <p className="text-[14px] text-[#6B7280] mt-1 text-center">
                      Sign in as <span className="font-semibold text-[#111827]">{rolesList[selectedRole].name}</span>
                    </p>
                  </div>

                  {errorMsg && (
                    <div className="mb-6 p-3 rounded-lg bg-red-50 border border-red-100 text-[#EF4444] text-[13px] font-medium flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0"></div>
                      {errorMsg}
                    </div>
                  )}

                  <form onSubmit={handleVerifyAndEnter} className="space-y-4">
                    <div>
                      <label className="text-[13px] font-medium text-[#374151] block mb-1.5">Email address</label>
                      <input
                        type="text"
                        value={loginUserId}
                        onChange={(e) => setLoginUserId(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-white border border-[#E5E7EB] shadow-sm rounded-xl text-[14px] text-[#111827] focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] focus:outline-none transition-all placeholder:text-[#9CA3AF]"
                        placeholder="name@company.com"
                        required
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-[13px] font-medium text-[#374151]">Password</label>
                        <a href="#" className="text-[12px] font-medium text-[#6B7280] hover:text-[#111827] transition-colors">Forgot password?</a>
                      </div>
                      <input
                        type="password"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-white border border-[#E5E7EB] shadow-sm rounded-xl text-[14px] text-[#111827] focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] focus:outline-none transition-all placeholder:text-[#9CA3AF]"
                        placeholder="••••••••"
                        required
                      />
                    </div>
                    
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-2.5 px-4 rounded-xl bg-[#111827] text-white font-medium text-[14px] hover:bg-[#1F2937] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-sm"
                      >
                        {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                        {isLoading ? 'Authenticating...' : 'Continue'}
                      </button>
                    </div>

                    <div className="flex items-start gap-2 p-3 mt-4 rounded-lg bg-[#F8FAFC] border border-[#F1F5F9]">
                      <ShieldCheck className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
                      <p className="text-[12px] text-[#475569] leading-relaxed">
                        <span className="font-semibold text-[#1E293B]">Prototype Mode:</span> Credentials are auto-filled for testing.
                      </p>
                    </div>
                    
                    <div className="relative py-4">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-[#E5E7EB]"></div>
                      </div>
                      <div className="relative flex justify-center text-[12px]">
                        <span className="bg-white px-3 text-[#6B7280]">Or</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                       <button type="button" className="flex items-center justify-center gap-2 py-2 px-4 rounded-xl border border-[#E5E7EB] bg-white hover:bg-[#F9FAFB] shadow-sm transition-colors text-[13px] font-medium text-[#374151]">
                         <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <path d="M11.4 24H0V12.6H11.4V24ZM24 24H12.6V12.6H24V24ZM11.4 11.4H0V0H11.4V11.4ZM24 11.4H12.6V0H24V11.4Z" fill="#00A4EF"/>
                         </svg>
                         Microsoft
                       </button>
                       <button type="button" className="flex items-center justify-center gap-2 py-2 px-4 rounded-xl border border-[#E5E7EB] bg-white hover:bg-[#F9FAFB] shadow-sm transition-colors text-[13px] font-medium text-[#374151]">
                         <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                           <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                           <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                           <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                         </svg>
                         Google
                       </button>
                    </div>

                  </form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
        </div>
      </div>
    </div>
  );
};

export default Login;
