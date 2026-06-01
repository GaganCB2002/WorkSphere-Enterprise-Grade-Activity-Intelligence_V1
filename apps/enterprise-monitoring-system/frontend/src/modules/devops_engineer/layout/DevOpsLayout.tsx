import React, { useState } from 'react';
import { 
  LayoutDashboard, Server, Cloud, Container, GitBranch, 
  Activity, Shield, AlertTriangle, Database, IndianRupee, 
  FileText, Settings, Search, Bell, Bot, User, ChevronRight, ChevronLeft, Menu, X, Radio, MessageSquare, Mail, Users, LogOut
} from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

interface DevOpsLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'infrastructure', label: 'Infrastructure', icon: Server },
  { id: 'cloud', label: 'Cloud Management', icon: Cloud },
  { id: 'kubernetes', label: 'Kubernetes', icon: Container },
  { id: 'containers', label: 'Containers', icon: Container },
  { id: 'cicd', label: 'CI/CD', icon: GitBranch },
  { id: 'monitoring', label: 'Monitoring', icon: Activity },
  { id: 'security', label: 'Security Center', icon: Shield },
  { id: 'incidents', label: 'Incident Management', icon: AlertTriangle },
  { id: 'database', label: 'Database Management', icon: Database },
  { id: 'cost', label: 'Cost Management', icon: IndianRupee },
  { id: 'telemetry', label: 'Live Telemetry', icon: Radio },
  { id: 'employee', label: 'Employee Details', icon: Users },
  { id: 'reports', label: 'Reports', icon: FileText },
  { id: 'chat', label: 'Enterprise Chat', icon: MessageSquare },
  { id: 'email', label: 'Webmail', icon: Mail },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export const DevOpsLayout: React.FC<DevOpsLayoutProps> = ({ children, activeTab, onTabChange }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-300 font-sans overflow-hidden">
      
      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 flex flex-col bg-slate-900 border-r border-slate-800 transition-all duration-300 ease-in-out lg:static lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } ${isCollapsed ? 'w-20' : 'w-64'}`}
      >
        <div className={`flex items-center h-16 border-b border-slate-800 bg-slate-900/50 ${isCollapsed ? 'justify-center px-0' : 'justify-between px-4'}`}>
          <div className="flex items-center gap-2 font-bold text-white tracking-wide overflow-hidden whitespace-nowrap">
            <Server className="w-5 h-5 text-brand shrink-0" />
            {!isCollapsed && <span>DevOps Command</span>}
          </div>
          <div className="flex items-center">
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-slate-400 hover:text-white mr-2">
              <X className="w-5 h-5" />
            </button>
            <button onClick={() => setIsCollapsed(!isCollapsed)} className="hidden lg:flex p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
              {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-4 custom-scrollbar">
          <nav className="space-y-1 px-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onTabChange(item.id);
                  setSidebarOpen(false);
                }}
                className={`group relative flex items-center px-3 py-2.5 rounded-lg transition-colors text-sm font-medium ${isCollapsed ? 'justify-center w-12 mx-auto' : 'w-full gap-3'} ${
                  activeTab === item.id 
                    ? 'bg-brand/10 text-brand' 
                    : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                }`}
              >
                <item.icon className={`w-5 h-5 shrink-0 ${activeTab === item.id ? 'text-brand' : 'text-slate-500'}`} />
                {!isCollapsed && <span className="truncate">{item.label}</span>}
                {!isCollapsed && activeTab === item.id && <ChevronRight className="w-4 h-4 ml-auto opacity-50 shrink-0" />}
                
                {/* Tooltip for collapsed state */}
                {isCollapsed && (
                  <div className="absolute left-full ml-3 px-2 py-1 bg-slate-800 text-white text-xs font-bold rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 border border-slate-700 shadow-xl">
                    {item.label}
                  </div>
                )}
              </button>
            ))}
          </nav>
        </div>

        <div className={`p-4 border-t border-slate-800 bg-slate-900/50 flex flex-col gap-3 ${isCollapsed ? 'items-center' : ''}`}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700 shrink-0 cursor-pointer hover:border-slate-500 transition-colors" title="DevOps Engineer">
              <User className="w-4 h-4 text-slate-400" />
            </div>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white truncate">DevOps Engineer</p>
                <p className="text-xs text-slate-500 truncate">System Admin</p>
              </div>
            )}
          </div>
          <button 
            onClick={handleLogout} 
            className={`flex items-center justify-center gap-2 p-2 rounded-lg text-rose-400 hover:text-white hover:bg-rose-500/20 border border-transparent hover:border-rose-500/30 transition-all ${isCollapsed ? 'w-full' : 'w-full mt-1'}`} 
            title="Logout"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            {!isCollapsed && <span className="text-xs font-bold uppercase tracking-wider">Secure Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 h-screen">
        
        {/* Top Navigation */}
        <header className="h-16 flex-shrink-0 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 flex items-center justify-between px-4 lg:px-6 z-40 sticky top-0">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-slate-400 hover:text-white">
              <Menu className="w-5 h-5" />
            </button>
            
            <div className="hidden sm:flex items-center gap-2 border border-slate-700 rounded-lg p-1 bg-slate-950/50">
              {['Production', 'Staging', 'Testing', 'Dev'].map(env => (
                <button 
                  key={env} 
                  className={`px-3 py-1 text-xs font-bold rounded-md transition-colors ${
                    env === 'Production' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  {env}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 max-w-xl px-4 lg:px-8 hidden md:block">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input 
                type="text" 
                placeholder="Search Servers, Pods, Pipelines, Logs..." 
                className="w-full bg-slate-950/50 border border-slate-700 rounded-full pl-10 pr-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <button className="relative p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors">
              <Bot className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-purple-500 rounded-full border-2 border-slate-900"></span>
            </button>
            <button className="relative p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors">
              <AlertTriangle className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-amber-500 rounded-full border-2 border-slate-900"></span>
            </button>
            <button className="relative p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full border-2 border-slate-900"></span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-slate-950 p-4 lg:p-8 custom-scrollbar relative">
          <div className="max-w-7xl mx-auto space-y-8 pb-20">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};
