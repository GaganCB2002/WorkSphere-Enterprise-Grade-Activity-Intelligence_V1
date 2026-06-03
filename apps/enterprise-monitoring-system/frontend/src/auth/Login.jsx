import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Shield, Key, CheckCircle, UserCheck, Lock, Bell, Terminal, Fingerprint, HelpCircle, Loader2 } from 'lucide-react';
import axios from 'axios';

const rolesList = [
  { role: 'SUPER_ADMIN', name: 'Super Administrator', dept: 'Global Security', icon: Shield, desc: 'Full system override, kernel-level access, and global security management.', creds: { id: 'ROOT_001', pass: 'SECURE_ALPHA_9' } },
  { role: 'ADMIN', name: 'System Admin', dept: 'System Admin', icon: Key, desc: 'Infrastructure monitoring, user provisioning, and service protocols.', creds: { id: 'SYS_ADMIN_X', pass: 'INFRA_GRID_4' } },
  { role: 'CEO', name: 'Chief Executive Officer', dept: 'Executive', icon: CheckCircle, desc: 'Strategic oversight, financial reporting, and high-level decision matrix.', creds: { id: 'EXEC_CEO', pass: 'STRAT_VIEW_1' } },
  { role: 'CTO', name: 'Chief Technology Officer', dept: 'Engineering', icon: UserCheck, desc: 'R&D access, architectural blueprints, and engineering roadmaps.', creds: { id: 'TECH_CTO', pass: 'GITHUB_FLOW_7' } },
  { role: 'HR_MANAGER', name: 'HR Manager', dept: 'Human Resources', icon: Lock, desc: 'Personnel directory, payroll processing, and compliance management.', creds: { id: 'HR_MGR_02', pass: 'PEOPLE_KEY_2' } },
  { role: 'HR_EXECUTIVE', name: 'HR Executive', dept: 'Human Resources', icon: Shield, desc: 'Onboarding access, leave management, and employee records.', creds: { id: 'HR_EXEC_V', pass: 'JOIN_TEAM_3' } },
  { role: 'FINANCE_MANAGER', name: 'Finance Manager', dept: 'Finance', icon: Key, desc: 'Cash flow statements, revenue audits, and corporate tax ledgers.', creds: { id: 'FIN_MGR_03', pass: 'CASH_FLOW_8' } },
  { role: 'MARKETING_MANAGER', name: 'Marketing Manager', dept: 'Marketing', icon: CheckCircle, desc: 'Campaign conversion pipelines, ROI tracking, and SEO analysis dashboards.', creds: { id: 'MKT_MGR_04', pass: 'LEADS_FUNNEL_1' } },
  { role: 'SALES_MANAGER', name: 'Sales Manager', dept: 'Sales', icon: UserCheck, desc: 'CRM pipeline tracking, sales velocity, and regional revenue forecasts.', creds: { id: 'SALES_MGR_05', pass: 'PIPELINE_7' } },
  { role: 'PROJECT_MANAGER', name: 'Project Manager', dept: 'Project Management', icon: Lock, desc: 'Sprint cycle boards, burndown charts, and team task allocation panels.', creds: { id: 'PROJ_MGR_06', pass: 'SPRINTS_3' } },
  { role: 'TECH_LEAD', name: 'Tech Lead', dept: 'Engineering', icon: Shield, desc: 'Repository push activities, PR reviews, and team branch code quality.', creds: { id: 'TECH_LEAD_07', pass: 'PR_REVIEWS_9' } },
  { role: 'DEVOPS_ENGINEER', name: 'DevOps Engineer', dept: 'Infrastructure', icon: Key, desc: 'Kubernetes pod telemetry, CI/CD runners, and Docker hub registry.', creds: { id: 'DEVOPS_ENG_08', pass: 'SERVER_K8S_5' } },
  { role: 'QA_ENGINEER', name: 'QA Engineer', dept: 'Quality Assurance', icon: CheckCircle, desc: 'Jest unit test metrics, selenium scripts, and bug tracker dashboard.', creds: { id: 'QA_ENG_09', pass: 'MATRIX_TEST_2' } },
  { role: 'SOFTWARE_ENGINEER', name: 'Software Engineer', dept: 'Engineering', icon: UserCheck, desc: 'Personal coding sprints, active ticket items, and telemetry submission.', creds: { id: 'SOFT_ENG_10', pass: 'CODE_COMMIT_4' } },
  { role: 'SECURITY_ANALYST', name: 'Security Analyst', dept: 'Security', icon: Lock, desc: 'SIEM logging streams, suspicious IP tables, and vulnerability maps.', creds: { id: 'SEC_ANALYST_11', pass: 'THREATS_MAP_6' } },
  { role: 'SUPPORT_AGENT', name: 'Support Agent', dept: 'Customer Support', icon: Shield, desc: 'Active service tickets, average resolution delay, and user live chats.', creds: { id: 'SUP_AGENT_12', pass: 'TICKETS_8' } },
  { role: 'EMPLOYEE', name: 'Standard Employee', dept: 'General', icon: Key, desc: 'Check-in / check-out tracker, leaf requests, and team chats.', creds: { id: 'EMPLOYEE_13', pass: 'ATTENDANCE_2' } },
  { role: 'INTERN', name: 'Intern', dept: 'General', icon: CheckCircle, desc: 'Assigned training videos, task checklists, and mentoring reviews.', creds: { id: 'INTERN_14', pass: 'FEEDBACK_9' } },
];

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [selectedRoleIndex, setSelectedRoleIndex] = useState(0);
  const [loginUserId, setLoginUserId] = useState(rolesList[0].creds.id);
  const [loginPassword, setLoginPassword] = useState(rolesList[0].creds.pass);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleRoleSelect = (index) => {
    setSelectedRoleIndex(index);
    setLoginUserId(rolesList[index].creds.id);
    setLoginPassword(rolesList[index].creds.pass);
  };

  const handleVerifyAndEnter = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);

    try {
      // Connect with Organization and generate real JWT via backend
      const response = await axios.post('http://localhost:5001/api/auth/login', {
        email: loginUserId, // using ID as email for the demo bypass
        password: loginPassword
      });

      const { token, user, role } = response.data;
      
      // Save JWT Token
      localStorage.setItem('token', token);

      // Dispatch full payload to Redux
      dispatch({ 
        type: 'LOGIN_SUCCESS', 
        payload: { 
          id: user.id, 
          name: user.name, 
          role: role, 
          department: rolesList[selectedRoleIndex].dept,
          tenantId: user.tenantId || 'org-1' // Organization connectivity
        } 
      });
      navigate('/dashboard');
    } catch (error) {
      console.error("Login failed:", error);
      setErrorMsg(error.response?.data?.message || 'Authentication Failed. Invalid Protocol.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080B13] text-[#F0EEF8] flex flex-col font-sans selection:bg-[#00e5ff] selection:text-[#080B13]">
      {/* Top Secure Header Status Bar */}
      <header className="w-full bg-[#0C101F]/80 backdrop-blur-md border-b border-[#1D2644] px-6 py-4 flex items-center justify-between select-none">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#00e5ff]/10 border border-[#00e5ff]/30 rounded-xl text-[#00e5ff] flex items-center justify-center">
            <Shield className="w-4 h-4 shadow-[0_0_8px_rgba(0,229,255,0.2)]" />
          </div>
          <span className="text-xs font-bold tracking-widest text-[#F0EEF8] uppercase">
            SECURE PROTOCOL V4.2
          </span>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#00e5ff] shadow-[0_0_8px_#00e5ff] animate-pulse" />
            <span className="text-[11px] font-bold text-[#8693BA] tracking-wider uppercase">
              NETWORK: ENCRYPTED
            </span>
          </div>

          <div className="flex items-center gap-4 text-[#8693BA]">
            <button className="hover:text-[#00e5ff] transition-colors">
              <Terminal className="w-4 h-4" />
            </button>
            <button className="hover:text-[#00e5ff] transition-colors">
              <Fingerprint className="w-4 h-4" />
            </button>
            <button className="hover:text-[#00e5ff] transition-colors relative">
              <Bell className="w-4 h-4" />
              <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-[#00e5ff] rounded-full" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Command Grid Container */}
      <main className="w-full max-w-7xl mx-auto px-6 py-10 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Role Profiles Grid */}
        <section className="lg:col-span-8 flex flex-col h-full">
          <div className="mb-8">
            <h1 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight mb-2">
              Enterprise Command Portal Access
            </h1>
            <p className="text-[#8693BA] text-sm lg:text-base max-w-3xl leading-relaxed">
              Authentication required. Please select your enterprise role profile to initialize security handshake.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[64vh] overflow-y-auto pr-2 custom-scrollbar">
            {rolesList.map((roleObj, idx) => {
              const IconComp = roleObj.icon;
              const isSelected = idx === selectedRoleIndex;
              return (
                <div
                  key={roleObj.role}
                  onClick={() => handleRoleSelect(idx)}
                  className={`relative flex flex-col p-5 rounded-2xl border transition-all duration-300 cursor-pointer ${
                    isSelected 
                      ? 'bg-[#0F1326]/75 border-[#00e5ff] shadow-[0_0_15px_rgba(0,229,255,0.12)] translate-y-[-2px]' 
                      : 'bg-[#0F1326]/40 border-[#1D2644] hover:border-[#2C3B6B] hover:bg-[#0F1326]/60'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-2.5 rounded-xl border transition-colors ${
                      isSelected 
                        ? 'bg-[#00e5ff]/10 border-[#00e5ff]/30 text-[#00e5ff]' 
                        : 'bg-[#1B233D] border-[#29355A] text-[#8693BA]'
                    }`}>
                      <IconComp className="w-5 h-5" />
                    </div>
                    {isSelected ? (
                      <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded bg-[#00e5ff]/10 border border-[#00e5ff]/30 text-[#00e5ff] tracking-wider">
                        ACTIVE
                      </span>
                    ) : (
                      <span className="text-[9px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-[#131B35] border border-[#212E55] text-[#7E8BBA] tracking-wider">
                        {roleObj.dept}
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-sm text-[#F0EEF8] mb-1.5 tracking-tight">{roleObj.name}</h3>
                  <p className="text-xs text-[#8693BA] leading-relaxed mb-4 flex-grow">{roleObj.desc}</p>

                  <div className="pt-3 border-t border-[#1C2542] text-[11px] font-mono text-[#8693BA] flex flex-col gap-1 bg-[#06080F]/90 p-3 rounded-xl border border-[#141B30]">
                    <div className="truncate"><span className="text-[#475375] font-semibold">ID:</span> {roleObj.creds.id}</div>
                    <div><span className="text-[#475375] font-semibold">PASS:</span> {roleObj.creds.pass}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Right Column: Secure Authentication Form */}
        <section className="lg:col-span-4 bg-[#0F1326]/40 border border-[#1D2644] rounded-3xl p-6 shadow-2xl flex flex-col sticky top-8">
          <div className="flex items-center gap-3 mb-4 pb-4 border-b border-[#1D2644]">
            <div className="p-2.5 bg-[#00e5ff]/10 rounded-xl text-[#00e5ff] border border-[#00e5ff]/20">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">Secure Authentication</h2>
              <p className="text-xs text-[#8693BA]">Provide authorized credentials to bridge connection.</p>
            </div>
          </div>
          
          {errorMsg && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold flex items-center justify-center">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleVerifyAndEnter} className="space-y-5">
            {/* Active Profile Info Box */}
            <div className="bg-[#0C1226]/80 border border-[#1E294B] rounded-xl p-4 mb-2 select-none">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#00e5ff] shadow-[0_0_8px_#00e5ff]" />
                <span className="text-[9px] font-bold uppercase tracking-widest text-[#00e5ff]">
                  PROFILE ACTIVE
                </span>
              </div>
              <div className="text-sm font-bold text-white mt-1.5">
                {rolesList[selectedRoleIndex].name}
              </div>
              <div className="text-xs text-[#8693BA] mt-0.5">
                {rolesList[selectedRoleIndex].dept}
              </div>
            </div>

            {/* Input Email/User ID */}
            <div>
              <label className="text-[10px] font-extrabold text-[#5B678E] uppercase tracking-widest block mb-2">
                ENTERPRISE USER ID / EMAIL
              </label>
              <div className="relative w-full">
                <input
                  type="text"
                  value={loginUserId}
                  onChange={(e) => setLoginUserId(e.target.value)}
                  className="w-full pl-4 pr-10 py-3 bg-[#070912] border border-[#1C2542] rounded-xl text-white font-mono text-sm focus:border-[#00e5ff] focus:outline-none transition-colors"
                  placeholder="user_id"
                  required
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono text-[#475375] select-none">
                  @
                </span>
              </div>
            </div>

            {/* Input Password */}
            <div>
              <label className="text-[10px] font-extrabold text-[#5B678E] uppercase tracking-widest block mb-2">
                SECURITY PASSWORD
              </label>
              <div className="relative w-full">
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full pl-4 pr-10 py-3 bg-[#070912] border border-[#1C2542] rounded-xl text-white font-mono text-sm focus:border-[#00e5ff] focus:outline-none transition-colors"
                  placeholder="••••••••"
                  required
                />
                <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#475375]" />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 px-6 rounded-2xl bg-[#00e5ff] hover:bg-[#00ccf0] text-[#070912] font-extrabold tracking-widest shadow-xl shadow-[#00e5ff]/10 hover:shadow-[#00e5ff]/30 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 flex items-center justify-center gap-2.5 uppercase text-xs disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Shield className="w-4 h-4" />} 
              {isLoading ? "ESTABLISHING HANDSHAKE..." : "VERIFY & ENTER WORKSPACE"}
            </button>
          </form>

          <span className="text-center text-[10px] text-[#475375] font-mono tracking-widest uppercase mt-4 block select-none">
            RSA-4096 ENCRYPTED CHANNEL
          </span>

          <div className="border-t border-[#1C2542] my-6" />

          {/* Bottom Footer Actions */}
          <div className="flex flex-col gap-3">
            <button className="flex items-center justify-center gap-2 text-xs font-bold text-[#8693BA] hover:text-[#00e5ff] transition-colors">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>? FORGOT CREDENTIALS?</span>
            </button>
            <button className="flex items-center justify-center gap-2 text-xs font-bold text-[#8693BA] hover:text-[#00e5ff] transition-colors">
              <Key className="w-3.5 h-3.5" />
              <span>REQUEST ACCESS LEVEL ELEVATION</span>
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Login;
