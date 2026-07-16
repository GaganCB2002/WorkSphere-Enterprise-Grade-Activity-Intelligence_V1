import React from 'react';
import { 
  LayoutDashboard, Megaphone, Users, Share2, 
  BarChart, FileText, Mail, Settings, 
  Target, TrendingUp, Users2, CheckSquare, Bell, Sparkles, LogOut
} from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

interface MarketingSidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'campaigns', label: 'Campaign Management', icon: Megaphone },
  { id: 'leads', label: 'Lead Management', icon: Users },
  { id: 'social', label: 'Social Media', icon: Share2 },
  { id: 'seo', label: 'SEO Analytics', icon: BarChart },
  { id: 'content', label: 'Content Management', icon: FileText },
  { id: 'email', label: 'Email Marketing', icon: Mail },
  { id: 'ads', label: 'Ads Management', icon: Target },
  { id: 'audience', label: 'Audience Insights', icon: Users2 },
  { id: 'reports', label: 'Reports & Analytics', icon: TrendingUp },
  { id: 'team', label: 'Team Collaboration', icon: Users2 },
  { id: 'approval', label: 'Approval Workflow', icon: CheckSquare },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'ai', label: 'AI Marketing Assistant', icon: Sparkles },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export const MarketingSidebar: React.FC<MarketingSidebarProps> = ({ activeView, setActiveView }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
  };

  return (
    <aside className="w-64 h-screen bg-[#f8fafc] dark:bg-slate-800 border-r border-[#e2e8f0] dark:border-slate-800 flex flex-col shrink-0">
      <div className="p-6">
        <h1 className="font-headline text-2xl font-bold text-[#0f172a] dark:text-slate-100 mb-8">MarketingHub</h1>
        
        <div className="flex items-center gap-3 mb-8">
          <img 
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop" 
            alt="Profile" 
            className="w-10 h-10 rounded-full object-cover border-2 border-white dark:border-slate-900 shadow-sm"
          />
          <div>
            <h3 className="text-sm font-bold text-[#0f172a] dark:text-slate-100">Enterprise<br/>Marketing</h3>
            <p className="text-[10px] font-bold text-[#64748b] dark:text-slate-400 uppercase tracking-wider">Marketing Director</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-4 pb-6 space-y-1 scrollbar-hide">
        {navItems.map((item) => {
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold transition-colors ${
                isActive 
                  ? 'bg-[#0d47a1] dark:bg-blue-600 text-white shadow-md shadow-blue-900/20' 
                  : 'text-[#475569] dark:text-slate-300 hover:bg-[#f1f5f9] dark:hover:bg-slate-800 hover:text-[#0f172a] dark:hover:text-white'
              }`}
            >
              <item.icon className="w-4 h-4" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-[#e2e8f0] dark:border-slate-800">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold text-rose-500 hover:bg-rose-50 hover:text-rose-600 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Switch Role / Logout</span>
        </button>
      </div>
    </aside>
  );
};
