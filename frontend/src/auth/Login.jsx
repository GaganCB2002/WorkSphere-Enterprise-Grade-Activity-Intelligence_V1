import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Shield, LogIn, Building, Users, UserCircle, Briefcase, Loader2 } from 'lucide-react';
import axios from 'axios';

const rolesList = [
  { role: 'SUPER_ADMIN', name: 'Super Administrator', dept: 'Global Security', icon: Shield, desc: 'Full system access and global security management.' },
  { role: 'ADMIN', name: 'System Admin', dept: 'System Admin', icon: Shield, desc: 'Infrastructure monitoring and user provisioning.' },
  { role: 'CEO', name: 'Chief Executive Officer', dept: 'Executive', icon: UserCircle, desc: 'Strategic oversight and financial reporting.' },
  { role: 'CTO', name: 'Chief Technology Officer', dept: 'Engineering', icon: Briefcase, desc: 'R&D access and engineering roadmaps.' },
  { role: 'HR_MANAGER', name: 'HR Manager', dept: 'Human Resources', icon: Users, desc: 'Personnel management and compliance.' },
  { role: 'HR_EXECUTIVE', name: 'HR Executive', dept: 'Human Resources', icon: Users, desc: 'Onboarding, leave management, and employee records.' },
  { role: 'FINANCE_MANAGER', name: 'Finance Manager', dept: 'Finance', icon: Briefcase, desc: 'Cash flow, revenue audits, and tax ledgers.' },
  { role: 'MARKETING_MANAGER', name: 'Marketing Manager', dept: 'Marketing', icon: Building, desc: 'Campaign ROI and marketing analytics.' },
  { role: 'SALES_MANAGER', name: 'Sales Manager', dept: 'Sales', icon: Briefcase, desc: 'CRM pipeline and revenue forecasting.' },
  { role: 'PROJECT_MANAGER', name: 'Project Manager', dept: 'Project Management', icon: Briefcase, desc: 'Sprint management and task allocation.' },
  { role: 'TECH_LEAD', name: 'Tech Lead', dept: 'Engineering', icon: Users, desc: 'Code review and team technical direction.' },
  { role: 'DEVOPS_ENGINEER', name: 'DevOps Engineer', dept: 'Infrastructure', icon: Briefcase, desc: 'Kubernetes, CI/CD, and deployment.' },
  { role: 'QA_ENGINEER', name: 'QA Engineer', dept: 'Quality Assurance', icon: Shield, desc: 'Test automation and quality metrics.' },
  { role: 'SOFTWARE_ENGINEER', name: 'Software Engineer', dept: 'Engineering', icon: Users, desc: 'Development sprints and code contributions.' },
  { role: 'SECURITY_ANALYST', name: 'Security Analyst', dept: 'Security', icon: Shield, desc: 'SIEM monitoring and vulnerability assessment.' },
  { role: 'SUPPORT_AGENT', name: 'Support Agent', dept: 'Customer Support', icon: Users, desc: 'Ticket management and customer resolution.' },
  { role: 'EMPLOYEE', name: 'Employee', dept: 'General', icon: UserCircle, desc: 'Attendance, leave requests, and team chat.' },
  { role: 'INTERN', name: 'Intern', dept: 'General', icon: UserCircle, desc: 'Training, tasks, and mentoring.' },
];

const demoCredentials = {
  'SUPER_ADMIN': { id: 'super_admin@worksphere.com', pass: 'Admin@123' },
  'CEO': { id: 'exec_ceo', pass: '123456' },
  'HR_MANAGER': { id: 'hr_mgr_02', pass: '123456' },
  'EMPLOYEE': { id: 'employee_13', pass: '123456' },
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedRoleIndex, setSelectedRoleIndex] = useState(0);
  const [loginUserId, setLoginUserId] = useState(demoCredentials['SUPER_ADMIN']?.id || '');
  const [loginPassword, setLoginPassword] = useState(demoCredentials['SUPER_ADMIN']?.pass || '');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleRoleSelect = (index) => {
    setSelectedRoleIndex(index);
    const role = rolesList[index].role;
    const creds = demoCredentials[role];
    if (creds) {
      setLoginUserId(creds.id);
      setLoginPassword(creds.pass);
    } else {
      setLoginUserId(`${role.toLowerCase()}@worksphere.com`);
      setLoginPassword('123456');
    }
  };

  const localLogin = () => {
    const role = rolesList[selectedRoleIndex].role;
    const name = rolesList[selectedRoleIndex].name;
    const token = 'local-' + btoa(JSON.stringify({ role, name, id: loginUserId }));

    localStorage.setItem('token', token);

    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: {
        id: loginUserId,
        name: name,
        role: role,
        department: rolesList[selectedRoleIndex].dept,
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
          department: rolesList[selectedRoleIndex].dept,
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
    <div className="min-h-screen bg-background text-on-background flex flex-col">
      <header className="w-full border-b border-outline bg-surface/80 backdrop-blur-md px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-brand/10 rounded-xl text-brand">
            <Shield className="w-4 h-4" />
          </div>
          <span className="text-sm font-bold text-on-surface">WorkSphere Enterprise</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-on-surface-variant">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-mint" />
            Secure Connection
          </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <section className="lg:col-span-8">
          <div className="mb-6">
            <h1 className="text-2xl lg:text-3xl font-headline font-bold text-on-surface tracking-tight">
              Sign in to your account
            </h1>
            <p className="text-sm text-on-surface-variant mt-1">
              Select your role below to load credentials, then click Sign In.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[65vh] overflow-y-auto pr-1">
            {rolesList.map((roleObj, idx) => {
              const IconComp = roleObj.icon;
              const isSelected = idx === selectedRoleIndex;
              return (
                <div
                  key={roleObj.role}
                  onClick={() => handleRoleSelect(idx)}
                  className={`relative flex flex-col p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                    isSelected
                      ? 'bg-brand/5 border-brand shadow-sm'
                      : 'bg-surface border-outline hover:border-on-surface-variant/30 hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div
                      className={`p-2 rounded-lg border ${
                        isSelected
                          ? 'bg-brand/10 border-brand/30 text-brand'
                          : 'bg-surface-container-low border-outline text-on-surface-variant'
                      }`}
                    >
                      <IconComp className="w-4 h-4" />
                    </div>
                    {isSelected && (
                      <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-brand/10 text-brand">
                        Selected
                      </span>
                    )}
                  </div>

                  <h3 className="font-semibold text-sm text-on-surface mb-1">{roleObj.name}</h3>
                  <p className="text-xs text-on-surface-variant leading-relaxed mb-3 flex-1">{roleObj.desc}</p>

                  <div className="text-[10px] text-on-surface-variant/60 font-mono truncate bg-surface-container-low rounded-lg px-3 py-2 border border-outline/50">
                    {roleObj.dept} • {roleObj.role}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="lg:col-span-4 bg-surface border border-outline rounded-2xl p-6 shadow-sm sticky top-8">
          <div className="flex items-center gap-3 pb-4 border-b border-outline mb-4">
            <div className="p-2.5 bg-brand/10 rounded-xl text-brand">
              <LogIn className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-on-surface">Sign In</h2>
              <p className="text-xs text-on-surface-variant">
                {rolesList[selectedRoleIndex].name}
              </p>
            </div>
          </div>

          {errorMsg && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 text-xs font-medium">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleVerifyAndEnter} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-on-surface-variant block mb-1.5">
                Email or User ID
              </label>
              <input
                type="text"
                value={loginUserId}
                onChange={(e) => setLoginUserId(e.target.value)}
                className="w-full px-4 py-2.5 bg-surface-container-low border border-outline rounded-lg text-sm text-on-surface focus:border-brand focus:outline-none transition-colors"
                placeholder="you@worksphere.com"
                required
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-on-surface-variant block mb-1.5">
                Password
              </label>
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full px-4 py-2.5 bg-surface-container-low border border-outline rounded-lg text-sm text-on-surface focus:border-brand focus:outline-none transition-colors"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-6 rounded-lg bg-brand text-white font-semibold text-sm hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <LogIn className="w-4 h-4" />}
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-outline">
            <p className="text-xs font-semibold text-on-surface-variant text-center mb-3">
              Quick Demo Access
            </p>
            <div className="space-y-2">
              {Object.entries(demoCredentials).map(([role, creds]) => {
                const roleData = rolesList.find(r => r.role === role);
                return (
                  <button
                    key={role}
                    type="button"
                    disabled={isLoading}
                    onClick={() => {
                      const idx = rolesList.findIndex(r => r.role === role);
                      handleRoleSelect(idx);
                    }}
                    className={`w-full p-3 rounded-lg text-left border transition-all text-xs ${
                      selectedRoleIndex === rolesList.findIndex(r => r.role === role)
                        ? 'bg-brand/5 border-brand text-brand font-semibold'
                        : 'bg-surface-container-low border-outline text-on-surface-variant hover:border-brand/30'
                    }`}
                  >
                    <div className="font-semibold">{roleData?.name || role}</div>
                    <div className="text-[10px] opacity-70 mt-0.5">{creds.id}</div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Login;
