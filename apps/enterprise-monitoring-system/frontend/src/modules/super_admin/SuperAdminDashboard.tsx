import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Shield, Database, Cpu, Lock, Check, X, RefreshCw, AlertTriangle, 
  HardDrive, Users, Settings, Bell, User, LogOut, Terminal, Activity, BookOpen, Zap } from 'lucide-react';
import { EnterpriseRole } from '../../../models/types';
import { LMSView } from '../hr/components/LMSView';
import { LiveTrackingView } from '../hr/components/LiveTrackingView';
import { ActivityReportsView } from './ActivityReportsView';


const allRoles: EnterpriseRole[] = [
  'SUPER_ADMIN', 'ADMIN', 'CEO', 'CTO', 'HR_MANAGER', 'HR_EXECUTIVE', 
  'FINANCE_MANAGER', 'MARKETING_MANAGER', 'SALES_MANAGER', 'PROJECT_MANAGER', 
  'TECH_LEAD', 'DEVOPS_ENGINEER', 'QA_ENGINEER', 'SOFTWARE_ENGINEER', 
  'SECURITY_ANALYST', 'SUPPORT_AGENT', 'EMPLOYEE', 'INTERN'
];

const allPermissions = [
  'CREATE_USER', 'UPDATE_USER', 'DELETE_USER', 'VIEW_REPORT', 'MANAGE_EMPLOYEE', 
  'TRACK_EMPLOYEE', 'VIEW_ANALYTICS', 'MANAGE_FINANCE', 'MANAGE_PROJECT', 
  'VIEW_GPS', 'EXPORT_REPORT', 'AI_ACCESS', 'ADMIN_ACCESS'
];

export const SuperAdminDashboard: React.FC = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState<'rbac' | 'users' | 'audit' | 'system' | 'tracking' | 'activity'>('tracking');

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    window.location.href = '/login';
  };

  const [matrix, setMatrix] = useState<Record<EnterpriseRole, Record<string, boolean>>>(() => {
    const initial: Record<string, Record<string, boolean>> = {};
    allRoles.forEach(role => {
      initial[role] = {};
      allPermissions.forEach(perm => {
        if (role === 'SUPER_ADMIN') {
          initial[role][perm] = true;
        } else if (role === 'CEO') {
          initial[role][perm] = perm !== 'CREATE_USER' && perm !== 'DELETE_USER' && perm !== 'ADMIN_ACCESS';
        } else if (role.includes('MANAGER') || role === 'CTO') {
          initial[role][perm] = perm !== 'DELETE_USER' && perm !== 'ADMIN_ACCESS';
        } else {
          initial[role][perm] = perm === 'VIEW_REPORT' || perm === 'VIEW_ANALYTICS';
        }
      });
    });
    return initial as Record<EnterpriseRole, Record<string, boolean>>;
  });

  const [users, setUsers] = useState([
    { id: 'USR-001', name: 'Gagan CB', email: 'super_admin@worksphere.com', role: 'SUPER_ADMIN', status: 'ACTIVE' },
    { id: 'USR-002', name: 'Alice Systems', email: 'admin@worksphere.com', role: 'ADMIN', status: 'ACTIVE' },
    { id: 'USR-003', name: 'Bob Finance', email: 'finance@worksphere.com', role: 'FINANCE_MANAGER', status: 'SUSPENDED' },
  ]);

  const handleTogglePerm = (role: EnterpriseRole, perm: string) => {
    if (role === 'SUPER_ADMIN') return; // Cannot modify Super Admin
    setMatrix(prev => ({
      ...prev,
      [role]: {
        ...prev[role],
        [perm]: !prev[role][perm]
      }
    }));
  };

  const removeUser = (id: string) => {
    if(id === 'USR-001') {
      alert("CRITICAL ERROR: Cannot remove root Super Admin account.");
      return;
    }
    setUsers(prev => prev.filter(u => u.id !== id));
  };

  const [aiToggles, setAiToggles] = useState({
    violenceDetection: true,
    productivityLstm: true,
    anomalyIsolation: true,
    behaviorClustering: true,
    llmExecutiveSummary: true
  });

  return (
    <div className="flex h-screen w-full bg-slate-950 text-slate-300 font-sans overflow-hidden selection:bg-blue-500/30">
      
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900/50 border-r border-slate-800/80 backdrop-blur-xl flex flex-col transition-all duration-300">
        <div className="h-16 flex items-center px-6 border-b border-slate-800/80 gap-3">
          <div className="p-2 bg-blue-500/10 border border-blue-500/30 rounded-lg text-blue-500">
            <Shield className="w-5 h-5" />
          </div>
          <span className="font-bold text-white tracking-tight">Super Admin Hub</span>
        </div>
        
        <div className="p-4 space-y-1 flex-1 overflow-y-auto">
          <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-3 px-2">Core Configuration</div>
          
          <button onClick={() => setActiveTab('rbac')} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${activeTab === 'rbac' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'text-slate-400 hover:text-white hover:bg-slate-800/50 border border-transparent'}`}>
            <Lock className="w-4 h-4" /> RBAC Matrix
          </button>
          <button onClick={() => setActiveTab('users')} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${activeTab === 'users' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'text-slate-400 hover:text-white hover:bg-slate-800/50 border border-transparent'}`}>
            <Users className="w-4 h-4" /> User Management
          </button>
          <button onClick={() => setActiveTab('system')} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${activeTab === 'system' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'text-slate-400 hover:text-white hover:bg-slate-800/50 border border-transparent'}`}>
            <Cpu className="w-4 h-4" /> AI & System Config
          </button>
          <button onClick={() => setActiveTab('audit')} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${activeTab === 'audit' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'text-slate-400 hover:text-white hover:bg-slate-800/50 border border-transparent'}`}>
            <Terminal className="w-4 h-4" /> Global Audit Logs
          </button>
          <button onClick={() => setActiveTab('tracking')} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${activeTab === 'tracking' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'text-slate-400 hover:text-white hover:bg-slate-800/50 border border-transparent'}`}>
            <Activity className="w-4 h-4" /> Global Tracking
          </button>
          <button onClick={() => setActiveTab('activity')} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${activeTab === 'activity' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'text-slate-400 hover:text-white hover:bg-slate-800/50 border border-transparent'}`}>
            <BookOpen className="w-4 h-4" /> Activity Reports
          </button>
        </div>

        <div className="p-4 border-t border-slate-800/80">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all border border-transparent hover:border-red-500/20">
            <LogOut className="w-4 h-4" /> Terminate Session
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full relative">
        <header className="h-16 flex items-center justify-between px-8 border-b border-slate-800/80 bg-slate-900/30 backdrop-blur-md">
          <h1 className="text-lg font-bold text-white tracking-tight">
            {activeTab === 'rbac' && 'Role-Based Access Control (RBAC)'}
            {activeTab === 'users' && 'Enterprise User Management'}
            {activeTab === 'system' && 'AI & Infrastructure Configuration'}
            {activeTab === 'audit' && 'Immutable Audit Trail'}
            {activeTab === 'tracking' && 'Global Live Tracking'}
            {activeTab === 'activity' && 'User Activity Reports'}
          </h1>
          <div className="flex items-center gap-4 text-slate-400">
            <button 
              onClick={() => window.location.href = '/command-center'}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white text-sm font-bold rounded-lg shadow-lg shadow-blue-500/25 transition-all border border-blue-400/30"
            >
              <Zap className="w-4 h-4" /> Launch Command Center
            </button>
            <button className="hover:text-white"><Bell className="w-5 h-5" /></button>
            <div className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700 text-white font-bold text-xs">SA</div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          
          {activeTab === 'rbac' && (
            <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6 lg:p-8 shadow-2xl space-y-6 overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
                    <Shield className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Master RBAC Permission Matrix</h3>
                    <p className="text-slate-400 text-xs mt-1">Granular access control matrix for all 18 enterprise roles</p>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto border border-slate-800 rounded-2xl">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-950 border-b border-slate-800">
                      <th className="p-4 text-xs font-extrabold text-slate-300 uppercase tracking-wider sticky left-0 bg-slate-950 z-20 border-r border-slate-800 min-w-[180px]">
                        Enterprise Role
                      </th>
                      {allPermissions.map(perm => (
                        <th key={perm} className="p-4 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider text-center min-w-[130px] border-r border-slate-800/50">
                          {perm.replace('_', ' ')}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/50 bg-slate-900/20">
                    {allRoles.map(role => (
                      <tr key={role} className="hover:bg-slate-800/30 transition-colors">
                        <td className="p-4 font-bold text-xs text-white sticky left-0 bg-slate-950/90 backdrop-blur-sm border-r border-slate-800 flex items-center justify-between">
                          <span>{role}</span>
                          {role === 'SUPER_ADMIN' && <Shield className="w-3.5 h-3.5 text-blue-400" />}
                        </td>
                        {allPermissions.map(perm => {
                          const hasPerm = matrix[role]?.[perm] || false;
                          return (
                            <td key={perm} className="p-3 text-center border-r border-slate-800/50">
                              <button
                                onClick={() => handleTogglePerm(role, perm)}
                                disabled={role === 'SUPER_ADMIN'}
                                className={`w-8 h-8 rounded-xl flex items-center justify-center mx-auto transition-all ${
                                  hasPerm 
                                    ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shadow-lg shadow-emerald-500/10' 
                                    : 'bg-slate-800/50 border border-slate-700/50 text-slate-600 hover:text-slate-400'
                                }`}
                              >
                                {hasPerm ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                              </button>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
             <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6 shadow-2xl space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <h3 className="text-xl font-bold text-white">Enterprise User Management</h3>
                  <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-500/20 transition-all">
                    + Provision New User
                  </button>
                </div>
                <div className="border border-slate-800 rounded-2xl overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-950 border-b border-slate-800 text-xs font-bold text-slate-400 uppercase">
                        <th className="p-4">User ID</th>
                        <th className="p-4">Name & Email</th>
                        <th className="p-4">Assigned Role</th>
                        <th className="p-4 text-center">Status</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 bg-slate-900/50">
                      {users.map(u => (
                        <tr key={u.id} className="hover:bg-slate-800/50 transition-colors">
                          <td className="p-4 font-mono text-xs text-blue-400">{u.id}</td>
                          <td className="p-4">
                            <div 
                              className="font-bold text-white text-sm cursor-pointer hover:text-blue-400 hover:underline transition-all"
                              onClick={() => window.open(`/command-center?userId=${u.id}&name=${encodeURIComponent(u.name)}&email=${encodeURIComponent(u.email)}`, '_blank')}
                            >
                              {u.name}
                            </div>
                            <div className="text-xs text-slate-500">{u.email}</div>
                          </td>
                          <td className="p-4">
                            <span className="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-[10px] font-bold text-slate-300 tracking-wider">
                              {u.role}
                            </span>
                          </td>
                          <td className="p-4 text-center">
                            <span className={`px-2 py-1 rounded-full text-[10px] font-bold tracking-wider ${u.status === 'ACTIVE' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                              {u.status}
                            </span>
                          </td>
                          <td className="p-4 text-right space-x-2">
                            <button className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-lg font-semibold transition-colors">Edit</button>
                            <button onClick={() => removeUser(u.id)} className="px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 text-xs rounded-lg font-semibold transition-colors">Revoke</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
             </div>
          )}

          {activeTab === 'system' && (
            <div className="grid grid-cols-1 gap-6">
              <div className="bg-slate-900/40 border border-slate-800/80 rounded-3xl p-6 shadow-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
                    <Cpu className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">AI Subsystem Feature Flags</h3>
                    <p className="text-slate-400 text-xs mt-1">Real-time control over active ML models</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Object.entries(aiToggles).map(([key, value]) => (
                    <div key={key} className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 flex items-center justify-between shadow-lg">
                      <div>
                        <h5 className="font-bold text-white text-sm capitalize">{key.replace(/([A-Z])/g, ' $1')}</h5>
                        <span className="text-xs text-slate-500 font-medium block mt-0.5">
                          {value ? 'Active & Polling' : 'Suspended'}
                        </span>
                      </div>
                      <button 
                        onClick={() => setAiToggles(prev => ({ ...prev, [key]: !value }))}
                        className={`w-12 h-6 rounded-full transition-colors relative p-1 ${value ? 'bg-blue-600' : 'bg-slate-800'}`}
                      >
                        <div className={`w-4 h-4 rounded-full bg-white transition-transform ${value ? 'translate-x-6' : 'translate-x-0'}`} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'audit' && (
            <div className="bg-slate-900/40 border border-slate-800/80 rounded-3xl p-6 shadow-2xl h-[80vh] flex flex-col">
              <div className="border-b border-slate-800 pb-4 mb-4">
                 <h3 className="text-xl font-bold text-white">Global Audit Logs (WORM Storage)</h3>
                 <p className="text-slate-400 text-xs mt-1">Immutable ledger of all administrative and security events</p>
              </div>
              <div className="flex-1 bg-black rounded-xl border border-slate-800 p-4 font-mono text-xs overflow-y-auto custom-scrollbar">
                <div className="text-slate-500 mb-2">Connected to global log stream...</div>
                <div className="text-emerald-400 mb-1">[2026-06-01T12:01:00Z] SUCCESS: Admin Gagan CB logged in from IP 192.168.1.1</div>
                <div className="text-blue-400 mb-1">[2026-06-01T12:05:22Z] INFO: DB Snapshot requested by ROOT</div>
                <div className="text-emerald-400 mb-1">[2026-06-01T12:15:00Z] SUCCESS: RBAC Matrix updated for role MARKETING_MANAGER</div>
                <div className="text-red-400 mb-1 animate-pulse">[2026-06-01T12:30:11Z] CRITICAL: Unauthorized API access attempt from IP 45.22.11.9</div>
                <div className="text-amber-400 mb-1">[2026-06-01T12:31:00Z] WARN: User USR-003 status changed to SUSPENDED</div>
                <div className="text-slate-500 mt-4">Waiting for new events...</div>
              </div>
            </div>
          )}

          {activeTab === 'tracking' && (
            <div className="bg-slate-900/40 border border-slate-800/80 rounded-3xl shadow-2xl h-[85vh] overflow-hidden flex flex-col">
              <LiveTrackingView />
            </div>
          )}

          {activeTab === 'activity' && (
            <div className="bg-slate-900/40 border border-slate-800/80 rounded-3xl shadow-2xl h-[85vh] overflow-hidden flex flex-col">
              <ActivityReportsView />
            </div>
          )}

        </div>
      </main>
    </div>
  );
};
