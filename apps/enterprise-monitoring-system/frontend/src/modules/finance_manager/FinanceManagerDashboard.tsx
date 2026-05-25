import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, IndianRupee, CreditCard, PieChart, Target, FileSpreadsheet,
  Coins, ListCollapse, BarChart3, Receipt, ShieldAlert, Users, History, Bell,
  Bot, Settings, Sparkles, Search, HelpCircle, Moon, Sun, LogOut, MessageSquare
} from 'lucide-react';

// Tab imports
import { DashboardTab } from './pages/DashboardTab';
import { IncomeTab } from './pages/IncomeTab';
import { ExpensesTab } from './pages/ExpensesTab';
import { BudgetsTab } from './pages/BudgetsTab';
import { TransactionsTab } from './pages/TransactionsTab';
import { GoalsTab } from './pages/GoalsTab';
import { BillingTab } from './pages/BillingTab';
import { PayrollTab } from './pages/PayrollTab';
import { InvestmentsTab } from './pages/InvestmentsTab';
import { ReportsTab } from './pages/ReportsTab';
import { TaxCenterTab } from './pages/TaxCenterTab';
import { TeamManagementTab } from './pages/TeamManagementTab';
import { AuditLogsTab } from './pages/AuditLogsTab';
import { NotificationsTab } from './pages/NotificationsTab';
import { AiAssistantTab } from './pages/AiAssistantTab';
import { SettingsTab } from './pages/SettingsTab';

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
}

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'income', label: 'Income', icon: IndianRupee },
  { id: 'expenses', label: 'Expenses', icon: CreditCard },
  { id: 'budgets', label: 'Budgets', icon: PieChart },
  { id: 'goals', label: 'Goals', icon: Target },
  { id: 'billing', label: 'Billing', icon: FileSpreadsheet },
  { id: 'payroll', label: 'Payroll', icon: Coins },
  { id: 'transactions', label: 'Transactions', icon: ListCollapse },
  { id: 'investments', label: 'Investments', icon: BarChart3 },
  { id: 'reports', label: 'Reports', icon: Receipt },
  { id: 'tax-center', label: 'Tax Center', icon: ShieldAlert },
  { id: 'team-management', label: 'Team Management', icon: Users },
  { id: 'audit-logs', label: 'Audit Logs', icon: History },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'ai-assistant', label: 'AI Assistant', icon: Bot },
  { id: 'settings', label: 'Settings', icon: Settings },
];

interface FinanceManagerDashboardProps {
  user?: {
    name?: string;
    email?: string;
    role?: string;
  };
}

export const FinanceManagerDashboard: React.FC<FinanceManagerDashboardProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === null ? true : saved === 'dark';
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const [notifications, setNotifications] = useState([
    { id: '1', title: 'Invoice #1042 Paid', detail: 'Received payment of ₹1,24,500 from Acme Corp.', time: '2m ago', type: 'success', tab: 'billing' },
    { id: '2', title: 'Budget Limit Alert', detail: 'Marketing budget has exceeded 90% of the allocated limit.', time: '15m ago', type: 'warning', tab: 'budgets' },
    { id: '3', title: 'Payroll Run Pending', detail: 'May payroll draft is ready for approval.', time: '1h ago', type: 'info', tab: 'payroll' },
    { id: '4', title: 'Security Log: Export', detail: 'Tax reports exported by FM-Audit analyst.', time: '3h ago', type: 'warning', tab: 'audit-logs' },
  ]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.relative')) {
        setIsNotifOpen(false);
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const handleLogout = () => {
    localStorage.removeItem('aurahr-token');
    localStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardTab />;
      case 'income': return <IncomeTab />;
      case 'expenses': return <ExpensesTab />;
      case 'budgets': return <BudgetsTab />;
      case 'goals': return <GoalsTab />;
      case 'billing': return <BillingTab />;
      case 'payroll': return <PayrollTab />;
      case 'transactions': return <TransactionsTab />;
      case 'investments': return <InvestmentsTab />;
      case 'reports': return <ReportsTab />;
      case 'tax-center': return <TaxCenterTab />;
      case 'team-management': return <TeamManagementTab />;
      case 'audit-logs': return <AuditLogsTab />;
      case 'notifications': return <NotificationsTab />;
      case 'ai-assistant': return <AiAssistantTab />;
      case 'settings': return <SettingsTab />;
      default:
        return (
          <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-8 bg-[#0F1326]/40 border border-[#1D2644] rounded-3xl animate-fadeIn select-none">
            <div className="w-16 h-16 bg-[#00e5ff]/5 border border-[#00e5ff]/20 rounded-2xl flex items-center justify-center mb-6">
              <Sparkles className="w-8 h-8 text-[#00e5ff] animate-bounce" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2 uppercase tracking-wide">Module Active & Monitoring</h2>
            <p className="text-[#8693BA] text-sm max-w-md leading-relaxed">
              This treasury operational control channel is active and synced with real-time API structures.
            </p>
          </div>
        );
    }
  };

  return (
    <div className={`min-h-screen flex select-none transition-all duration-300 ${darkMode ? 'dark bg-[#080816] text-[#F0EEF8]' : 'light bg-[#F8FAFC] text-[#0F172A]'}`}>
      <style dangerouslySetInnerHTML={{ __html: `
        /* Light mode overrides */
        .light {
          background-color: #F8FAFC !important;
          color: #0F172A !important;
        }
        .light aside {
          background-color: #FFFFFF !important;
          border-color: #E2E8F0 !important;
        }
        .light aside > div:first-child {
          border-color: #E2E8F0 !important;
        }
        .light aside h2 {
          color: #0F172A !important;
        }
        .light aside p.text-emerald-400 {
          color: #059669 !important;
        }
        .light nav button {
          color: #475569 !important;
        }
        .light nav button:hover {
          background-color: #F1F5F9 !important;
          color: #0F172A !important;
        }
        .light nav button.bg-\\[\\#00e5ff\\]\\/10 {
          background-color: rgba(6, 182, 212, 0.1) !important;
          color: #0891B2 !important;
          border-left-color: #0891B2 !important;
        }
        .light nav button.bg-\\[\\#00e5ff\\]\\/10 svg {
          color: #0891B2 !important;
        }
        .light button.bg-\\[\\#00e5ff\\] {
          background-color: #0891B2 !important;
          color: #FFFFFF !important;
        }
        .light button.bg-\\[\\#00e5ff\\]:hover {
          background-color: #06B6D4 !important;
        }
        .light aside > div:last-child {
          border-color: #E2E8F0 !important;
        }
        .light aside > div:last-child button {
          color: #475569 !important;
        }
        .light aside > div:last-child button:hover {
          color: #0F172A !important;
        }
        .light aside > div:last-child button.text-red-400 {
          color: #EF4444 !important;
        }
        .light aside > div:last-child button.text-red-400:hover {
          color: #DC2626 !important;
        }
        .light header {
          background-color: #FFFFFF !important;
          border-color: #E2E8F0 !important;
          box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05) !important;
        }
        .light header span.text-white {
          color: #0F172A !important;
        }
        .light header span.text-slate-300 {
          color: #334155 !important;
        }
        .light header input {
          background-color: #F1F5F9 !important;
          border-color: #E2E8F0 !important;
          color: #0F172A !important;
        }
        .light header input::placeholder {
          color: #94A3B8 !important;
        }
        .light header button.bg-\\[\\#0F1326\\] {
          background-color: #ECFDF5 !important;
          border-color: #A7F3D0 !important;
          color: #047857 !important;
        }
        .light header button.bg-\\[\\#0F1326\\]:hover {
          background-color: #D1FAE5 !important;
        }
        .light header .bg-\\[\\#1D2644\\] {
          background-color: #E2E8F0 !important;
        }
        .light header button.text-\\[\\#8693BA\\] {
          color: #475569 !important;
        }
        .light header button.text-\\[\\#8693BA\\]:hover {
          color: #0F172A !important;
        }
        .light header .bg-emerald-500\\/20 {
          background-color: #D1FAE5 !important;
          border-color: #A7F3D0 !important;
          color: #047857 !important;
        }
        .light .bg-\\[\\#0F1326\\]\\/40 {
          background-color: #FFFFFF !important;
          border-color: #E2E8F0 !important;
          box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05) !important;
        }
        .light h1.text-white {
          color: #0F172A !important;
        }
        .light p.text-\\[\\#8693BA\\] {
          color: #475569 !important;
        }
        .light p.text-\\[\\#5B678E\\] {
          color: #64748B !important;
        }
        .light h3.text-white {
          color: #0F172A !important;
        }
        .light h4.text-white {
          color: #0F172A !important;
        }
        .light td.text-white {
          color: #0F172A !important;
        }
        .light span.text-white {
          color: #0F172A !important;
        }
        .light button.bg-\\[\\#0F1326\\] {
          background-color: #F1F5F9 !important;
          border-color: #E2E8F0 !important;
          color: #475569 !important;
        }
        .light button.bg-\\[\\#0F1326\\]:hover {
          color: #0F172A !important;
        }
        .light .bg-\\[\\#00e5ff\\]\\/10 {
          background-color: rgba(6, 182, 212, 0.1) !important;
          border-color: rgba(6, 182, 212, 0.2) !important;
          color: #0891B2 !important;
        }
        .light .bg-emerald-500\\/10 {
          background-color: rgba(16, 185, 129, 0.1) !important;
          border-color: rgba(16, 185, 129, 0.2) !important;
          color: #059669 !important;
        }
        .light .recharts-tooltip-wrapper > div {
          background-color: #FFFFFF !important;
          border-color: #E2E8F0 !important;
          color: #0F172A !important;
        }
        .light th {
          background-color: #F8FAFC !important;
          border-color: #E2E8F0 !important;
          color: #475569 !important;
        }
        .light tr {
          border-color: #F1F5F9 !important;
        }
        .light tr:hover {
          background-color: #F8FAFC !important;
        }
        .light td.text-\\[\\#F0EEF8\\] {
          color: #0F172A !important;
        }
        .light .bg-\\[\\#0C101F\\] {
          background-color: #F8FAFC !important;
          border-color: #E2E8F0 !important;
        }
        .light .bg-\\[\\#070912\\] {
          background-color: #FFFFFF !important;
          border-color: #E2E8F0 !important;
        }
        .light .bg-\\[\\#0C101F\\]\\/80 {
          background-color: #FFFFFF !important;
          border-color: #E2E8F0 !important;
        }
        .light .bg-\\[\\#0C101F\\]\\/80.border-l-red-500 {
          background-color: #FEF2F2 !important;
          border-color: #FCA5A5 !important;
          border-left-color: #EF4444 !important;
        }
        .light .bg-\\[\\#0C101F\\]\\/80.border-l-emerald-500 {
          background-color: #ECFDF5 !important;
          border-color: #A7F3D0 !important;
          border-left-color: #10B981 !important;
        }
        .light .bg-\\[\\#080B13\\]\\/30 {
          background-color: #F8FAFC !important;
          border-color: #E2E8F0 !important;
        }
        .light .bg-\\[\\#080B13\\]\\/30:hover {
          border-color: #0891B2 !important;
          background-color: rgba(6, 182, 212, 0.05) !important;
        }
        .light .bg-red-500\\/5 {
          background-color: #FEF2F2 !important;
          border-color: #FCA5A5 !important;
        }
        .light select {
          background-color: #FFFFFF !important;
          border-color: #E2E8F0 !important;
          color: #0F172A !important;
        }
        .light select option {
          background-color: #FFFFFF !important;
          color: #0F172A !important;
        }
        .light input {
          background-color: #FFFFFF !important;
          border-color: #E2E8F0 !important;
          color: #0F172A !important;
        }
        .light input::placeholder {
          color: #94A3B8 !important;
        }
        .light button.bg-\\[\\#0C1226\\]\\/80 {
          background-color: #FFFFFF !important;
          border-color: #E2E8F0 !important;
          color: #475569 !important;
        }
        .light button.bg-\\[\\#0C1226\\]\\/80:hover {
          background-color: #F1F5F9 !important;
          color: #0F172A !important;
          border-color: #0891B2 !important;
        }
        .light button.bg-\\[\\#0C1226\\]\\/80.hover\\:border-red-500\\/30:hover {
          background-color: #FEF2F2 !important;
          border-color: #FCA5A5 !important;
          color: #DC2626 !important;
        }
        .light .bg-\\[\\#080B13\\] {
          background-color: #FFFFFF !important;
          border-color: #E2E8F0 !important;
        }
        .light .bg-\\[\\#0F1326\\]\\/60 {
          background-color: #F8FAFC !important;
          border-color: #E2E8F0 !important;
        }
        .light .divide-\\[\\#1D2644\\] > :not([hidden]) ~ :not([hidden]) {
          border-color: #E2E8F0 !important;
        }
        .light .hover\\:bg-\\[\\#0F1326\\]\\/40:hover {
          background-color: #F1F5F9 !important;
        }
      ` }} />
      
      {/* ── Sidebar Navigation ─────────────────────────────────── */}
      <aside className="w-64 bg-[#05050F] border-r border-[#1D2644] flex flex-col justify-between shrink-0 h-screen sticky top-0">
        
        {/* Top Logo / Title Header */}
        <div className="p-6 border-b border-[#1D2644] flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-[#00e5ff] flex items-center justify-center font-bold text-white text-md shadow-lg shadow-emerald-500/25">
            F
          </div>
          <div>
            <h2 className="text-sm font-extrabold text-white leading-tight uppercase tracking-wider">FinCorp Enterprise</h2>
            <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest mt-0.5">Global Treasury</p>
          </div>
        </div>

        {/* Navigation Items (Scrollable) */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5 hide-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold tracking-wide transition-all ${
                  isActive
                    ? 'bg-[#00e5ff]/10 text-[#00e5ff] border-l-4 border-l-[#00e5ff]'
                    : 'text-[#8693BA] hover:bg-[#0F1326]/40 hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#00e5ff]' : 'text-[#8693BA]'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-[#1D2644] space-y-2">
          {/* Upgrade Plan Button */}
          <button className="w-full bg-[#00e5ff] hover:bg-[#00ccf0] text-[#080B13] font-black text-xs py-3 rounded-xl uppercase tracking-wider transition-colors shadow-lg shadow-[#00e5ff]/10">
            Upgrade Plan
          </button>
          
          {/* Help & Logout Actions */}
          <div className="flex flex-col gap-1 text-[11px] font-bold text-[#8693BA] pt-2">
            <button className="flex items-center gap-2 hover:text-white py-1 transition-colors">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Help Center</span>
            </button>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 text-red-400 hover:text-red-300 py-1 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout Session</span>
            </button>
          </div>
        </div>
      </aside>

      {/* ── Main Panel Content ───────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Control Bar */}
        <header className="h-16 bg-[#080816] border-b border-[#1D2644] px-8 flex items-center justify-between sticky top-0 z-40 select-none">
          <div className="flex items-center gap-6">
            <span className="text-md font-extrabold text-white tracking-wider">
              FinCorp Global
            </span>
            <div className="relative w-64 hidden md:block">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5B678E]" />
              <input 
                type="text" 
                placeholder="Search across organization..." 
                className="w-full pl-10 pr-4 py-2 bg-[#070912] border border-[#1D2644] rounded-xl text-white text-xs placeholder:text-[#5B678E] focus:border-[#00e5ff] focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => alert('Quick actions panel under routing.')}
              className="bg-[#0F1326] hover:bg-[#1C2542] border border-[#1D2644] px-4 py-2 rounded-xl text-[10px] font-extrabold uppercase tracking-widest text-[#00e5ff] transition-all"
            >
              Quick Actions
            </button>

            <div className="w-px h-5 bg-[#1D2644] mx-1" />

            {/* Notification Bell with Dropdown */}
            <div className="relative">
              <button 
                onClick={() => {
                  setIsNotifOpen(!isNotifOpen);
                  setIsProfileOpen(false);
                }}
                className="p-2 text-[#8693BA] hover:text-white transition-colors relative flex items-center justify-center rounded-xl hover:bg-[#0F1326]/40"
              >
                <Bell className="w-4 h-4" />
                {notifications.length > 0 && (
                  <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#00e5ff] rounded-full shadow-[0_0_6px_#00e5ff]" />
                )}
              </button>

              {isNotifOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-[#080B13] border border-[#1D2644] rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="p-4 border-b border-[#1D2644] flex items-center justify-between bg-[#0F1326]/60">
                    <span className="text-xs font-black uppercase tracking-wider text-white">Notifications</span>
                    <span className="text-[10px] font-bold text-[#00e5ff]">{notifications.length} Active</span>
                  </div>
                  <div className="max-h-[300px] overflow-y-auto custom-scrollbar divide-y divide-[#1D2644]">
                    {notifications.map(n => (
                      <button
                        key={n.id}
                        onClick={() => {
                          setActiveTab(n.tab);
                          setIsNotifOpen(false);
                        }}
                        className="w-full text-left p-4 hover:bg-[#0F1326]/40 transition-colors flex gap-3 items-start"
                      >
                        <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                          n.type === 'success' ? 'bg-emerald-400' :
                          n.type === 'warning' ? 'bg-amber-400' : 'bg-[#00e5ff]'
                        }`} />
                        <div>
                          <p className="text-xs font-extrabold text-white leading-normal">{n.title}</p>
                          <p className="text-[10px] text-[#8693BA] mt-1 leading-relaxed">{n.detail}</p>
                          <span className="text-[8px] text-[#5B678E] font-bold uppercase tracking-wider mt-2 block">{n.time}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => {
                      setActiveTab('notifications');
                      setIsNotifOpen(false);
                    }}
                    className="w-full py-3 bg-[#0F1326]/60 border-t border-[#1D2644] text-center text-[10px] font-black uppercase tracking-wider text-[#8693BA] hover:text-[#00e5ff] transition-colors"
                  >
                    View All Notifications
                  </button>
                </div>
              )}
            </div>

            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 text-[#8693BA] hover:text-white transition-colors"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Profile Avatar with Dropdown */}
            <div className="relative">
              <button 
                onClick={() => {
                  setIsProfileOpen(!isProfileOpen);
                  setIsNotifOpen(false);
                }}
                className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/35 overflow-hidden flex items-center justify-center text-xs font-bold text-emerald-400 font-mono shadow hover:scale-105 transition-transform"
              >
                {user?.name ? user.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase() : 'FM'}
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-[#080B13] border border-[#1D2644] rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="p-4 bg-[#0F1326]/60 border-b border-[#1D2644]">
                    <p className="text-xs font-black text-white truncate uppercase">{user?.name || 'Finance Manager'}</p>
                    <p className="text-[10px] text-[#8693BA] truncate mt-0.5">{user?.email || 'finance.manager@fincorp.com'}</p>
                    <div className="inline-flex mt-2 items-center rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-[8px] font-black uppercase tracking-wider text-emerald-400">
                      {user?.role?.replace('_', ' ') || 'FINANCE MANAGER'}
                    </div>
                  </div>
                  <div className="p-2 space-y-1">
                    <button 
                      onClick={() => {
                        setActiveTab('settings');
                        setIsProfileOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-[10px] font-black uppercase tracking-widest text-[#8693BA] hover:text-white hover:bg-[#0F1326]/40 rounded-xl transition-colors"
                    >
                      Protocol Settings
                    </button>
                    <button 
                      onClick={() => {
                        setActiveTab('audit-logs');
                        setIsProfileOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-[10px] font-black uppercase tracking-widest text-[#8693BA] hover:text-white hover:bg-[#0F1326]/40 rounded-xl transition-colors"
                    >
                      Audit Trail
                    </button>
                    <div className="h-px bg-[#1D2644] my-1 mx-1" />
                    <button 
                      onClick={handleLogout}
                      className="w-full text-left px-3 py-2 text-[10px] font-black uppercase tracking-widest text-red-400 hover:bg-red-500/10 rounded-xl transition-colors"
                    >
                      Terminate Session
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Tab Panel Render Area */}
        <main className="flex-1 p-8 overflow-y-auto">
          {renderActiveTab()}
        </main>
      </div>

    </div>
  );
};

export default FinanceManagerDashboard;
