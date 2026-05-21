import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, UserCheck, UserPlus, Users, Calendar, IndianRupee, 
  TrendingUp, FolderKanban, HeartHandshake, FileCheck, Headphones, LogOut, 
  PieChart, Cpu, BarChart3, Navigation, FolderOpen, Zap, Search, Bell, 
  Moon, Sun, ArrowLeft, Upload, FileText, Download, Eye, Plus, CheckCircle2, 
  AlertCircle, Clock, ShieldCheck, Building2, Briefcase, ChevronRight, Filter,
  Check, X, RefreshCw, Send, Lock, Award, FileSpreadsheet, HardDrive, HelpCircle,
  FileCode, Activity, FileSpreadsheet as FileSpreadsheetIcon, UserRoundCog, MessageSquare, Mail, Terminal, TimerReset, BriefcaseBusiness, Layers, FileWarning, UsersRound, ClipboardCheck, Folder, BadgeIndianRupee, Gauge, SmilePlus, LifeBuoy, DoorOpen, ChartColumn, Network, Map, Star, Trash
} from 'lucide-react';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  AreaChart, Area
} from 'recharts';

interface HrExecutiveDashboardProps {
  user?: any;
  token?: string;
  platform?: any;
  feed?: any[];
  onRefresh?: () => Promise<void>;
}

interface EmployeeFolder {
  id: string;
  name: string;
  empId: string;
  filesCount: number;
  role: string;
  department: string;
  documents: {
    id: string;
    title: string;
    type: string;
    size: string;
    uploadedAt: string;
    status: 'Verified' | 'Pending Review' | 'Expiring Soon';
  }[];
}

const mockEmployeeFolders: EmployeeFolder[] = [
  {
    id: 'emp-100',
    name: 'Aarav Mehta',
    empId: 'emp-100',
    filesCount: 2,
    role: 'Senior Software Engineer',
    department: 'Engineering',
    documents: [
      { id: 'doc-1', title: 'Employment Contract', type: 'PDF', size: '2.4 MB', uploadedAt: 'Jan 15, 2026', status: 'Verified' },
      { id: 'doc-2', title: 'Identity Proof (Passport)', type: 'PDF', size: '4.1 MB', uploadedAt: 'Jan 15, 2026', status: 'Verified' }
    ]
  },
  {
    id: 'emp-101',
    name: 'Nisha Kapoor',
    empId: 'emp-101',
    filesCount: 3,
    role: 'HR Executive',
    department: 'Human Resources',
    documents: [
      { id: 'doc-3', title: 'Employment Offer Letter', type: 'PDF', size: '1.8 MB', uploadedAt: 'Feb 01, 2026', status: 'Verified' },
      { id: 'doc-4', title: 'Background Verification Check', type: 'PDF', size: '5.6 MB', uploadedAt: 'Feb 05, 2026', status: 'Verified' },
      { id: 'doc-5', title: 'Direct Deposit Authorization', type: 'PDF', size: '1.1 MB', uploadedAt: 'Feb 05, 2026', status: 'Verified' }
    ]
  },
  {
    id: 'emp-102',
    name: 'Marcus Chen',
    empId: 'emp-102',
    filesCount: 4,
    role: 'Product Manager',
    department: 'Product',
    documents: [
      { id: 'doc-6', title: 'Non-Disclosure Agreement', type: 'PDF', size: '3.2 MB', uploadedAt: 'Mar 10, 2026', status: 'Verified' },
      { id: 'doc-7', title: 'Stock Option Grant', type: 'PDF', size: '1.9 MB', uploadedAt: 'Mar 12, 2026', status: 'Verified' },
      { id: 'doc-8', title: 'Tax Withholding Form (W-4)', type: 'PDF', size: '920 KB', uploadedAt: 'Mar 12, 2026', status: 'Verified' },
      { id: 'doc-9', title: 'Work Authorization (Visa)', type: 'PDF', size: '2.8 MB', uploadedAt: 'Mar 12, 2026', status: 'Expiring Soon' }
    ]
  },
  {
    id: 'emp-103',
    name: 'Sarah Jenkins',
    empId: 'emp-103',
    filesCount: 2,
    role: 'DevOps Lead',
    department: 'Engineering',
    documents: [
      { id: 'doc-10', title: 'Contract Renewal 2026', type: 'PDF', size: '2.1 MB', uploadedAt: 'Apr 02, 2026', status: 'Verified' },
      { id: 'doc-11', title: 'Annual Security Clearance', type: 'PDF', size: '4.5 MB', uploadedAt: 'Apr 02, 2026', status: 'Pending Review' }
    ]
  },
  {
    id: 'emp-104',
    name: 'Elena Rostova',
    empId: 'emp-104',
    filesCount: 1,
    role: 'QA Engineer',
    department: 'Quality Assurance',
    documents: [
      { id: 'doc-12', title: 'Standard Employment Agreement', type: 'PDF', size: '3.0 MB', uploadedAt: 'May 01, 2026', status: 'Verified' }
    ]
  }
];

const mockCandidates = [
  { id: 'c-1', name: 'David Miller', role: 'Staff Cloud Architect', stage: 'Applied', score: '94%', experience: '8 yrs', date: 'Today' },
  { id: 'c-2', name: 'Priya Sharma', role: 'Senior React Developer', stage: 'Shortlisted', score: '91%', experience: '5 yrs', date: 'Yesterday' },
  { id: 'c-3', name: 'Alex Wong', role: 'VP of Engineering', stage: 'Selected', score: '98%', experience: '12 yrs', date: 'May 15' },
  { id: 'c-4', name: 'Jessica Taylor', role: 'HR Operations Specialist', stage: 'Offered', score: '89%', experience: '4 yrs', date: 'May 14' },
  { id: 'c-5', name: 'Thomas Wright', role: 'Security Compliance Lead', stage: 'Background Check', score: '96%', experience: '9 yrs', date: 'May 12' }
];

const menuItems = [
  { id: 'Dashboard', label: 'HR Operations', icon: Users },
  { id: 'My Profile', label: 'My Profile', icon: UserRoundCog },
  { id: 'Live Chat', label: 'Live Chat', icon: MessageSquare },
  { id: 'Internal Mail', label: 'Internal Mail', icon: Mail },
  { id: 'Video Meetings', label: 'Video Meetings', icon: Terminal },
  { id: 'Attendance', label: 'Attendance', icon: TimerReset },
  { id: 'Live Activity Feed', label: 'Live Activity Feed', icon: Activity },
  { id: 'Recruitment', label: 'Recruitment', icon: BriefcaseBusiness },
  { id: 'Resource Allocation', label: 'Resource Allocation', icon: Layers },
  { id: 'Leave Approvals', label: 'Leave Approvals', icon: FileWarning },
  { id: 'Employee Mgmt', label: 'Employee Mgmt', icon: UsersRound },
  { id: 'Onboarding', label: 'Onboarding', icon: ClipboardCheck },
  { id: 'Documentation', label: 'Documentation', icon: Folder },
  { id: 'Payroll', label: 'Payroll', icon: BadgeIndianRupee },
  { id: 'Performance', label: 'Performance', icon: Gauge },
  { id: 'Projects', label: 'Projects', icon: Activity },
  { id: 'Engagement', label: 'Engagement', icon: SmilePlus },
  { id: 'Compliance', label: 'Compliance', icon: ShieldCheck },
  { id: 'IT Help Desk', label: 'IT Help Desk', icon: LifeBuoy },
  { id: 'Budget', label: 'Budget', icon: ChartColumn },
  { id: 'Analytics', label: 'Analytics', icon: Network },
  { id: 'Live Tracking', label: 'Live Tracking', icon: Map },
  { id: 'Exit', label: 'Exit', icon: DoorOpen },
];

export const HrExecutiveDashboard: React.FC<HrExecutiveDashboardProps> = ({
  user,
  token,
  platform,
  feed,
  onRefresh
}) => {
  const [activeMenu, setActiveMenu] = useState('Documentation');
  const [isDark, setIsDark] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [docSearchQuery, setDocSearchQuery] = useState('');
  const [selectedFolder, setSelectedFolder] = useState<EmployeeFolder | null>(null);
  const [employeeFolders, setEmployeeFolders] = useState<EmployeeFolder[]>(mockEmployeeFolders);
  const [candidates, setCandidates] = useState(mockCandidates);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchHrData = async () => {
      setIsLoading(true);
      try {
        const headers: HeadersInit = token ? { 'Authorization': `Bearer ${token}` } : {};
        const [foldersRes, candRes] = await Promise.all([
          fetch('/api/hr/folders', { headers }).catch(() => null),
          fetch('/api/hr/candidates', { headers }).catch(() => null)
        ]);

        if (foldersRes && foldersRes.ok) {
          const foldersData = await foldersRes.json();
          if (Array.isArray(foldersData) && foldersData.length > 0) {
            setEmployeeFolders(foldersData);
          }
        }

        if (candRes && candRes.ok) {
          const candData = await candRes.json();
          if (Array.isArray(candData) && candData.length > 0) {
            setCandidates(candData);
          }
        }
      } catch (err) {
        console.warn('Live API unreachable, using mock data fallback', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHrData();
  }, [token]);

  const toggleTheme = () => setIsDark(!isDark);

  const filteredFolders = employeeFolders.filter(f => 
    f.name.toLowerCase().includes(docSearchQuery.toLowerCase()) ||
    f.empId.toLowerCase().includes(docSearchQuery.toLowerCase()) ||
    f.role.toLowerCase().includes(docSearchQuery.toLowerCase())
  );

  return (
    <div className={`min-h-screen font-sans transition-colors duration-500 ${isDark ? 'dark bg-[#030712] text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar {
          scrollbar-width: none !important;
          -ms-overflow-style: none !important;
        }
        .custom-scrollbar::-webkit-scrollbar {
          display: none !important;
          width: 0 !important;
          height: 0 !important;
        }
      `}} />
      {/* Subtle Gradient Background & Ambient Lighting */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-blue-900/10 via-teal-900/5 to-transparent pointer-events-none blur-3xl" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-indigo-900/10 via-cyan-900/5 to-transparent pointer-events-none blur-3xl" />

      <div className="flex min-h-screen relative z-10">
        
        {/* ==================================================== */}
        {/* LEFT SIDEBAR */}
        {/* ==================================================== */}
        <motion.aside 
          animate={{ width: sidebarOpen ? 280 : 80 }}
          className={`fixed top-4 bottom-4 z-40 transition-all duration-300 flex flex-col rounded-[32px] border overflow-hidden ${
            sidebarOpen ? 'left-4' : '-left-[320px] lg:left-4'
          } ${
            isDark 
              ? 'bg-[#0b1329]/80 border-white/10 backdrop-blur-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)]' 
              : 'bg-white/90 border-slate-200 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.08)]'
          }`}
        >
          {/* Top Logo Section */}
          <div className="p-6 flex items-center gap-4 border-b border-white/5">
            <motion.div 
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.5 }}
              className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-teal-400 p-[2px] shadow-lg shadow-blue-500/30 flex-shrink-0"
            >
              <div className={`w-full h-full rounded-[14px] flex items-center justify-center ${isDark ? 'bg-[#0b1329]' : 'bg-white'}`}>
                <Zap className="w-6 h-6 text-teal-400 animate-pulse" />
              </div>
            </motion.div>
            
            {sidebarOpen && (
              <div className="overflow-hidden">
                <div className="flex items-center gap-1.5">
                  <span className="font-display text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300">
                    AuraHR
                  </span>
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-black tracking-widest bg-blue-500/20 text-blue-400 border border-blue-500/30">
                    AI
                  </span>
                </div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                  Command Center
                </p>
              </div>
            )}
          </div>

          {/* Signed-In Card */}
          {sidebarOpen && (
            <div className="p-4 mx-4 mt-6 rounded-2xl bg-gradient-to-br from-blue-950/50 to-slate-900/50 border border-blue-500/20 shadow-lg shadow-blue-950/20 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-xl group-hover:bg-blue-500/20 transition-colors" />
              <div className="relative z-10 flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-500 to-teal-400 p-[2px] shadow-md">
                  <div className="w-full h-full rounded-[10px] bg-[#0b1329] flex items-center justify-center font-bold text-white text-base">
                    NK
                  </div>
                </div>
                <div>
                  <div className="text-[9px] font-black uppercase tracking-[0.2em] text-blue-400">Signed in as</div>
                  <div className="font-bold text-sm text-slate-100 tracking-tight">Nisha Kapoor</div>
                  <div className="text-xs text-slate-400 font-medium">HR Executive</div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Menu */}
          <div className="flex-1 overflow-y-auto px-4 py-6 space-y-1.5 custom-scrollbar">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeMenu === item.id;
              return (
                <motion.button
                  key={item.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveMenu(item.id)}
                  className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-xs font-bold transition-all duration-300 relative group ${
                    isActive 
                      ? 'bg-gradient-to-r from-blue-600 to-teal-500 text-white shadow-lg shadow-blue-500/25 border border-white/20' 
                      : isDark 
                        ? 'text-slate-400 hover:text-white hover:bg-white/5' 
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-5 h-5 flex-shrink-0 transition-colors ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-blue-400'}`} />
                  {sidebarOpen && (
                    <span className="tracking-wide text-left flex-1 truncate">{item.label}</span>
                  )}
                  {isActive && sidebarOpen && (
                    <motion.div 
                      layoutId="activeIndicator"
                      className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" 
                    />
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-white/5 mx-4 mb-4 flex items-center justify-between text-[10px] font-bold text-slate-500">
            {sidebarOpen && <span>AuraHR OS v2.4</span>}
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          </div>
        </motion.aside>

        {/* ==================================================== */}
        {/* DYNAMIC CONTENT WORKSPACE */}
        {/* ==================================================== */}
        <div className={`flex-1 flex flex-col min-w-0 p-4 lg:p-6 space-y-6 transition-all duration-300 ${
          sidebarOpen ? 'lg:pl-[312px]' : 'lg:pl-[112px]'
        }`}>
          
          {/* ==================================================== */}
          {/* TOP HEADER / NAVBAR */}
          {/* ==================================================== */}
          <header className={`h-20 rounded-[32px] border flex items-center justify-between px-6 transition-all duration-500 ${
            isDark 
              ? 'bg-[#0b1329]/80 border-white/10 backdrop-blur-2xl shadow-[0_10px_30px_rgba(0,0,0,0.3)]' 
              : 'bg-white/90 border-slate-200 backdrop-blur-2xl shadow-[0_10px_30px_rgba(0,0,0,0.05)]'
          }`}>
            {/* Left Section */}
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className={`p-3 rounded-2xl border transition-colors ${isDark ? 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10' : 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200'}`}
              >
                <LayoutDashboard className="w-5 h-5" />
              </button>

              <button 
                onClick={() => setActiveMenu('Dashboard')}
                className={`hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-2xl border text-xs font-bold transition-all ${
                  isDark ? 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10' : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <ArrowLeft className="w-4 h-4 text-blue-400" />
                <span>BACK TO DASHBOARD</span>
              </button>
            </div>

            {/* Center Section */}
            <div className="flex items-center gap-6 flex-1 max-w-xl mx-8">
              <div className="hidden xl:flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold tracking-wider uppercase flex-shrink-0 shadow-inner">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>LIVE INFRASTRUCTURE LINKED</span>
              </div>

              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text"
                  placeholder="Search system..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-11 pr-4 py-3 rounded-2xl text-xs font-bold border transition-all outline-none ${
                    isDark 
                      ? 'bg-black/40 border-white/10 text-white placeholder-slate-500 focus:border-blue-500/50 focus:bg-black/60' 
                      : 'bg-slate-100 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-blue-500/50 focus:bg-white'
                  }`}
                />
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4">
              <button className={`p-3 rounded-2xl border relative transition-colors ${isDark ? 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10' : 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200'}`}>
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-teal-400 rounded-full animate-ping" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-teal-400 rounded-full" />
              </button>

              <button 
                onClick={toggleTheme}
                className={`p-3 rounded-2xl border transition-colors ${isDark ? 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10' : 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200'}`}
              >
                {isDark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-blue-600" />}
              </button>

              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-teal-400 p-[2px] shadow-lg shadow-blue-500/20 cursor-pointer hover:scale-105 transition-transform">
                <div className="w-full h-full rounded-[14px] bg-[#0b1329] flex items-center justify-center font-bold text-white text-base shadow-inner">
                  H
                </div>
              </div>
            </div>
          </header>

          {/* ==================================================== */}
          {/* MAIN CONTENT AREA */}
          {/* ==================================================== */}
          <main className="flex-1 space-y-6">
            
            {/* ==================================================== */}
            {/* VIEW 1: DOCUMENTATION (Employee Documentation) */}
            {/* ==================================================== */}
            {activeMenu === 'Documentation' && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                {/* Page Title */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-blue-900/20 via-transparent to-transparent p-6 rounded-[32px] border border-white/5">
                  <div>
                    <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
                      Employee Documentation
                      <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        Secure Vault
                      </span>
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 font-medium">
                      Manage compliance documents, ID proofs, and contracts.
                    </p>
                  </div>

                  <button 
                    onClick={() => alert('Opening Bulk Upload Modal...')}
                    className="flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-500 hover:to-teal-400 text-white rounded-2xl font-bold text-xs uppercase tracking-wider shadow-xl shadow-blue-500/25 hover:scale-105 transition-all duration-300 w-fit"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Upload New Document</span>
                  </button>
                </div>

                {/* Two Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  
                  {/* LEFT DOCUMENT PANEL */}
                  <div className={`lg:col-span-5 rounded-[32px] border p-6 relative overflow-hidden transition-all duration-500 ${
                    isDark ? 'bg-[#0b1329]/60 border-white/10 backdrop-blur-xl shadow-2xl' : 'bg-white border-slate-200 shadow-xl'
                  }`}>
                    {/* Big Background Text */}
                    <div className="absolute -bottom-10 -right-10 text-[110px] font-black leading-none text-slate-500/5 dark:text-white/[0.02] pointer-events-none select-none tracking-tighter uppercase font-display">
                      EMPLOYEE<br/>FOLDERS
                    </div>

                    <div className="relative z-10 space-y-6">
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
                          <FolderOpen className="w-5 h-5 text-blue-400" />
                          Employee Folders
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
                          Select an employee to view or upload documents.
                        </p>
                      </div>

                      {/* Search Bar */}
                      <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input 
                          type="text"
                          placeholder="Search by name or ID..."
                          value={docSearchQuery}
                          onChange={(e) => setDocSearchQuery(e.target.value)}
                          className={`w-full pl-11 pr-4 py-3 rounded-2xl text-xs font-bold border transition-all outline-none ${
                            isDark 
                              ? 'bg-black/40 border-white/10 text-white placeholder-slate-500 focus:border-blue-500/50 focus:bg-black/60' 
                              : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-blue-500/50 focus:bg-white'
                          }`}
                        />
                      </div>

                      {/* Employee Folder List */}
                      <div className="space-y-3 max-h-[500px] overflow-y-auto custom-scrollbar pr-1">
                        {filteredFolders.map((folder) => {
                          const isSelected = selectedFolder?.id === folder.id;
                          return (
                            <motion.div
                              key={folder.id}
                              whileHover={{ scale: 1.01 }}
                              whileTap={{ scale: 0.99 }}
                              onClick={() => setSelectedFolder(folder)}
                              className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer flex items-center justify-between group ${
                                isSelected 
                                  ? 'bg-gradient-to-r from-blue-600/20 to-teal-500/10 border-blue-500/50 shadow-lg shadow-blue-500/10' 
                                  : isDark 
                                    ? 'bg-white/5 border-white/5 hover:border-white/10 hover:bg-white/10' 
                                    : 'bg-slate-50 border-slate-100 hover:border-slate-200 hover:bg-slate-100'
                              }`}
                            >
                              <div className="flex items-center gap-3.5 min-w-0">
                                <div className={`p-3 rounded-xl border transition-colors flex-shrink-0 ${
                                  isSelected ? 'bg-blue-600 border-blue-500 text-white shadow-md shadow-blue-500/30' : isDark ? 'bg-white/5 border-white/10 text-blue-400 group-hover:bg-blue-500/10' : 'bg-white border-slate-200 text-blue-600 group-hover:bg-blue-50'
                                }`}>
                                  <FolderOpen className="w-5 h-5" />
                                </div>
                                <div className="min-w-0">
                                  <h4 className="font-bold text-sm text-slate-900 dark:text-white truncate group-hover:text-blue-400 transition-colors">
                                    {folder.name}
                                  </h4>
                                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium truncate mt-0.5">
                                    {folder.empId} • {folder.filesCount} files
                                  </p>
                                </div>
                              </div>

                              <ChevronRight className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${isSelected ? 'text-blue-400 translate-x-1' : 'text-slate-600 group-hover:text-slate-400'}`} />
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* RIGHT DOCUMENT VIEW PANEL */}
                  <div className={`lg:col-span-7 rounded-[32px] border p-8 flex flex-col justify-center transition-all duration-500 relative overflow-hidden ${
                    isDark ? 'bg-[#0b1329]/40 border-white/10 backdrop-blur-xl shadow-2xl' : 'bg-white border-slate-200 shadow-xl'
                  }`}>
                    <AnimatePresence mode="wait">
                      {!selectedFolder ? (
                        /* Empty State */
                        <motion.div 
                          key="empty"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className={`w-full h-[500px] rounded-[28px] border-2 border-dashed flex flex-col items-center justify-center p-8 text-center transition-colors ${
                            isDark ? 'border-white/10 bg-white/[0.02] hover:border-blue-500/30' : 'border-slate-300 bg-slate-50 hover:border-blue-500/30'
                          }`}
                        >
                          <div className="w-20 h-20 rounded-3xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-6 shadow-inner animate-bounce duration-1000">
                            <FolderOpen className="w-10 h-10 text-blue-400" />
                          </div>
                          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                            Select an employee folder to view details
                          </h3>
                          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto font-medium leading-relaxed">
                            Choose a folder from the left panel to inspect verified identity proofs, employment agreements, tax filings, and compliance certificates.
                          </p>
                        </motion.div>
                      ) : (
                        /* Active Folder View */
                        <motion.div 
                          key="active"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="space-y-6"
                        >
                          {/* Folder Header */}
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
                            <div className="flex items-center gap-4">
                              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-teal-500 p-[2px] shadow-lg shadow-blue-500/20">
                                <div className={`w-full h-full rounded-[14px] flex items-center justify-center font-bold text-xl ${isDark ? 'bg-[#0b1329] text-white' : 'bg-white text-slate-900'}`}>
                                  {selectedFolder.name.split(' ').map(n=>n[0]).join('')}
                                </div>
                              </div>
                              <div>
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                                  {selectedFolder.name}
                                </h2>
                                <p className="text-xs text-blue-400 font-bold mt-0.5 flex items-center gap-2">
                                  <span>{selectedFolder.role}</span>
                                  <span className="text-slate-500">•</span>
                                  <span className="text-slate-400">{selectedFolder.department}</span>
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <button 
                                onClick={() => alert(`Adding new document for ${selectedFolder.name}...`)}
                                className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-xs shadow-lg shadow-blue-600/20 transition-all"
                              >
                                <Plus className="w-4 h-4" />
                                <span>Add File</span>
                              </button>
                            </div>
                          </div>

                          {/* Documents Grid */}
                          <div className="space-y-4 max-h-[400px] overflow-y-auto custom-scrollbar pr-1">
                            {selectedFolder.documents.map((doc) => (
                              <div 
                                key={doc.id}
                                className={`p-5 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all duration-300 hover:scale-[1.01] ${
                                  isDark ? 'bg-white/5 border-white/10 hover:border-blue-500/50 hover:bg-white/10' : 'bg-slate-50 border-slate-200 hover:border-blue-500/50 hover:bg-slate-100'
                                }`}
                              >
                                <div className="flex items-start gap-4 min-w-0">
                                  <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex-shrink-0 shadow-inner">
                                    <FileText className="w-6 h-6" />
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <h4 className="font-bold text-sm text-slate-900 dark:text-white truncate">
                                      {doc.title}
                                    </h4>
                                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
                                      <span className="px-2 py-0.5 rounded bg-slate-500/10 border border-slate-500/20 text-slate-300 font-bold">
                                        {doc.type}
                                      </span>
                                      <span>{doc.size}</span>
                                      <span>Uploaded {doc.uploadedAt}</span>
                                    </div>
                                  </div>
                                </div>

                                <div className="flex items-center gap-3 justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-white/5">
                                  <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 ${
                                    doc.status === 'Verified' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                                    doc.status === 'Pending Review' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                                    'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                                  }`}>
                                    <span className={`w-1.5 h-1.5 rounded-full ${
                                      doc.status === 'Verified' ? 'bg-emerald-400' :
                                      doc.status === 'Pending Review' ? 'bg-amber-400' :
                                      'bg-rose-400'
                                    }`} />
                                    {doc.status}
                                  </span>

                                  <div className="flex items-center gap-1">
                                    <button 
                                      onClick={() => alert(`Viewing document: ${doc.title}`)}
                                      className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 transition-colors"
                                      title="Preview"
                                    >
                                      <Eye className="w-4 h-4" />
                                    </button>
                                    <button 
                                      onClick={() => alert(`Downloading document: ${doc.title}`)}
                                      className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-blue-400 transition-colors"
                                      title="Download"
                                    >
                                      <Download className="w-4 h-4" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Upload Dropzone */}
                          <div 
                            onClick={() => alert('Opening File Picker...')}
                            className={`p-6 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                              isDark ? 'border-white/10 bg-white/5 hover:border-blue-500/50 hover:bg-blue-500/5' : 'border-slate-300 bg-slate-50 hover:border-blue-500/50 hover:bg-blue-50'
                            }`}
                          >
                            <Upload className="w-8 h-8 text-blue-400 mb-2 animate-bounce duration-1000" />
                            <p className="text-sm font-bold text-slate-900 dark:text-white">
                              Drop compliance files here or click to browse
                            </p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
                              Supports PDF, DOCX, PNG, JPG up to 25MB
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ==================================================== */}
            {/* VIEW 2: RECRUITMENT (Recruitment & Hiring) */}
            {/* ==================================================== */}
            {activeMenu === 'Recruitment' && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                {/* Page Title */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-blue-900/20 via-transparent to-transparent p-6 rounded-[32px] border border-white/5">
                  <div>
                    <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
                      Recruitment and hiring
                      <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-teal-500/10 text-teal-400 border border-teal-500/20">
                        AI ATS Active
                      </span>
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 font-medium">
                      ATS workflow with AI parsing, pipeline control, and offer tracking.
                    </p>
                  </div>

                  <button 
                    onClick={() => alert('Opening AI Resume Parser Modal...')}
                    className="flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-500 hover:to-teal-400 text-white rounded-2xl font-bold text-xs uppercase tracking-wider shadow-xl shadow-blue-500/25 hover:scale-105 transition-all duration-300 w-fit"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create Requisition</span>
                  </button>
                </div>

                {/* METRIC CARDS */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {[
                    { label: 'Applied', value: '1', color: 'border-blue-500/30 text-blue-400', bg: 'bg-blue-500/5' },
                    { label: 'Shortlisted', value: '1', color: 'border-purple-500/30 text-purple-400', bg: 'bg-purple-500/5' },
                    { label: 'Interview', value: '0', color: 'border-amber-500/30 text-amber-400', bg: 'bg-amber-500/5' },
                    { label: 'Selected', value: '1', color: 'border-emerald-500/30 text-emerald-400', bg: 'bg-emerald-500/5' },
                    { label: 'Offered', value: '1', color: 'border-teal-500/30 text-teal-400', bg: 'bg-teal-500/5' },
                    { label: 'Background Check', value: '1', color: 'border-indigo-500/30 text-indigo-400', bg: 'bg-indigo-500/5' },
                  ].map((metric, idx) => (
                    <div 
                      key={metric.label}
                      className={`p-6 rounded-2xl border transition-all duration-300 hover:scale-105 shadow-lg ${
                        isDark ? `bg-white/5 ${metric.color.split(' ')[0]}` : `bg-white border-slate-200`
                      } ${metric.bg}`}
                    >
                      <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2">
                        {metric.label}
                      </div>
                      <div className={`text-4xl font-extrabold font-display ${isDark ? metric.color.split(' ')[1] : 'text-slate-900'}`}>
                        {metric.value}
                      </div>
                      <div className="w-full h-1 bg-white/10 rounded-full mt-4 overflow-hidden">
                        <div className={`h-full ${metric.value !== '0' ? 'w-full bg-gradient-to-r from-blue-500 to-teal-400' : 'w-0'}`} />
                      </div>
                    </div>
                  ))}
                </div>

                {/* TWO COLUMN CONTENT: CANDIDATES TABLE & RIGHT ANALYTICS CHART */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  
                  {/* Candidates Table */}
                  <div className={`lg:col-span-8 rounded-[32px] border p-6 transition-all duration-500 ${
                    isDark ? 'bg-[#0b1329]/60 border-white/10 backdrop-blur-xl shadow-2xl' : 'bg-white border-slate-200 shadow-xl'
                  }`}>
                    <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                          <Users className="w-5 h-5 text-blue-400" />
                          Active Candidate Pipeline
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
                          AI-scored candidate ranking and automated screening progression
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="p-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-slate-300 transition-colors">
                          <Filter className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-white/10 text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                            <th className="pb-4 pl-4">Candidate</th>
                            <th className="pb-4">Target Role</th>
                            <th className="pb-4 text-center">AI Score</th>
                            <th className="pb-4 text-center">Stage</th>
                            <th className="pb-4 text-right pr-4">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {candidates.map((cand) => (
                            <tr key={cand.id} className="hover:bg-white/5 transition-colors group">
                              <td className="py-4 pl-4 flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-teal-500 p-[2px] shadow-md">
                                  <div className="w-full h-full rounded-[10px] bg-[#0b1329] flex items-center justify-center font-bold text-white text-xs">
                                    {cand.name.split(' ').map(n=>n[0]).join('')}
                                  </div>
                                </div>
                                <div>
                                  <h5 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-blue-400 transition-colors">
                                    {cand.name}
                                  </h5>
                                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                                    {cand.experience} exp • Applied {cand.date}
                                  </span>
                                </div>
                              </td>
                              <td className="py-4">
                                <span className="font-bold text-xs text-slate-200 block">{cand.role}</span>
                                <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Engineering</span>
                              </td>
                              <td className="py-4 text-center">
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-black text-xs shadow-inner">
                                  <Zap className="w-3 h-3 animate-pulse" />
                                  {cand.score}
                                </span>
                              </td>
                              <td className="py-4 text-center">
                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                                  cand.stage === 'Selected' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                                  cand.stage === 'Offered' ? 'bg-teal-500/10 text-teal-400 border border-teal-500/20' :
                                  cand.stage === 'Shortlisted' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' :
                                  cand.stage === 'Background Check' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' :
                                  'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                                }`}>
                                  <span className={`w-1.5 h-1.5 rounded-full ${
                                    cand.stage === 'Selected' ? 'bg-emerald-400' :
                                    cand.stage === 'Offered' ? 'bg-teal-400' :
                                    cand.stage === 'Shortlisted' ? 'bg-purple-400' :
                                    cand.stage === 'Background Check' ? 'bg-indigo-400' :
                                    'bg-blue-400'
                                  }`} />
                                  {cand.stage}
                                </span>
                              </td>
                              <td className="py-4 text-right pr-4">
                                <button 
                                  onClick={() => alert(`Advancing candidate ${cand.name} to next ATS stage...`)}
                                  className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:bg-blue-600 hover:border-blue-500 text-xs font-bold text-slate-300 hover:text-white transition-all shadow-sm"
                                >
                                  Advance Stage
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* RIGHT ANALYTICS CHART */}
                  <div className={`lg:col-span-4 rounded-[32px] border p-6 flex flex-col justify-between transition-all duration-500 ${
                    isDark ? 'bg-[#0b1329]/60 border-white/10 backdrop-blur-xl shadow-2xl' : 'bg-white border-slate-200 shadow-xl'
                  }`}>
                    <div>
                      <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2 tracking-tight uppercase font-display">
                          <BarChart3 className="w-5 h-5 text-teal-400" />
                          PIPELINE DISTRIBUTION
                        </h3>
                      </div>

                      <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 font-medium leading-relaxed">
                        Visual breakdown of candidate volume across primary assessment stages. Optimized for AI screening throughput.
                      </p>

                      {/* Bar Chart Representation */}
                      <div className="space-y-4">
                        {[
                          { label: 'Applied (Top of Funnel)', count: 1, pct: 20, color: 'bg-blue-500' },
                          { label: 'AI Screened / Shortlisted', count: 1, pct: 20, color: 'bg-purple-500' },
                          { label: 'Technical Interview', count: 0, pct: 5, color: 'bg-amber-500' },
                          { label: 'Selected / Final Round', count: 1, pct: 20, color: 'bg-emerald-500' },
                          { label: 'Formal Offer Extended', count: 1, pct: 20, color: 'bg-teal-500' },
                          { label: 'Background Verification', count: 1, pct: 20, color: 'bg-indigo-500' },
                        ].map((bar) => (
                          <div key={bar.label} className="space-y-1">
                            <div className="flex justify-between text-xs font-bold">
                              <span className="text-slate-300">{bar.label}</span>
                              <span className="text-blue-400 font-mono">{bar.count}</span>
                            </div>
                            <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden border border-white/10 p-[1px]">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${bar.pct}%` }}
                                transition={{ duration: 1, ease: 'easeOut' }}
                                className={`h-full rounded-full ${bar.color} shadow-lg shadow-${bar.color.split('-')[1]}-500/30`} 
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-8 p-4 rounded-2xl bg-gradient-to-r from-blue-500/10 to-teal-500/10 border border-blue-500/20 text-xs text-slate-300 font-medium flex items-center gap-3 shadow-inner">
                      <Zap className="w-5 h-5 text-teal-400 flex-shrink-0 animate-pulse" />
                      <span>AI Model predicts 92% offer acceptance rate based on historical compensation alignment.</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ==================================================== */}
            {/* VIEW 3: DASHBOARD (Workforce Intelligence) */}
            {/* ==================================================== */}
            {activeMenu === 'Dashboard' && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                {/* Hero Section */}
                <div className="p-8 rounded-[32px] bg-gradient-to-r from-blue-900/40 via-indigo-950/40 to-slate-900/40 border border-blue-500/20 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
                  <div className="relative z-10 max-w-3xl space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest">
                      <Zap className="w-3.5 h-3.5 animate-pulse" />
                      <span>Workforce Intelligence Command</span>
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
                      Real-time telemetry, AI attrition risk modeling, and department budget tracking.
                    </h1>
                    <p className="text-slate-400 text-base font-medium leading-relaxed">
                      AuraHR continuously ingests biometric attendance logs, GitHub commit patterns, and Jira velocity to model human capital health and forecast operational bottlenecks.
                    </p>
                    <div className="pt-2 flex flex-wrap gap-3">
                      {['Attendance Sync', 'Leave Control', 'AI Pulse', 'Budget Forecast'].map((tag) => (
                        <span key={tag} className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-slate-300 shadow-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Metrics Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { label: 'Active Workforce', value: '1,420', change: '+5.2% vs last month', icon: Users, color: 'text-blue-400' },
                    { label: 'Today Attendance', value: '96.4%', change: '+1.4% vs benchmark', icon: Calendar, color: 'text-emerald-400' },
                    { label: 'Monthly Payroll', value: '₹12.4 Cr', change: 'Fully verified & disbursed', icon: IndianRupee, color: 'text-purple-400' },
                  ].map((m) => {
                    const Icon = m.icon;
                    return (
                      <div key={m.label} className={`p-6 rounded-[32px] border transition-all duration-300 hover:scale-[1.02] shadow-xl ${
                        isDark ? 'bg-[#0b1329]/60 border-white/10 backdrop-blur-xl' : 'bg-white border-slate-200'
                      }`}>
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">{m.label}</span>
                          <div className={`p-3 rounded-2xl bg-white/5 border border-white/10 ${m.color} shadow-inner`}>
                            <Icon className="w-6 h-6" />
                          </div>
                        </div>
                        <div className="text-4xl font-extrabold font-display text-slate-900 dark:text-white mb-2">{m.value}</div>
                        <div className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>{m.change}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* AI Insights & Department Telemetry */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className={`lg:col-span-7 rounded-[32px] border p-6 transition-all duration-500 ${
                    isDark ? 'bg-[#0b1329]/60 border-white/10 backdrop-blur-xl shadow-2xl' : 'bg-white border-slate-200 shadow-xl'
                  }`}>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2 border-b border-white/10 pb-4">
                      <Zap className="w-5 h-5 text-teal-400 animate-pulse" />
                      <span>AI Prescriptive Intelligence</span>
                    </h3>
                    <div className="space-y-4">
                      {[
                        { title: 'Workload Imbalance Detected', desc: 'Engineering department shows 12% increase in overtime hours over the last 14 days. Consider workload rebalancing or contractor augmentation.', type: 'warning' },
                        { title: 'SLA Breach Warning', desc: 'Leave approval backlog in DevOps squad exceeds SLA by 4 hours. Automated escalation reminders have been dispatched to Tech Leads.', type: 'alert' },
                      ].map((insight, idx) => (
                        <div key={idx} className="p-5 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 shadow-md flex items-start gap-4">
                          <div className="p-3 rounded-xl bg-blue-500/20 border border-blue-500/30 text-blue-400 flex-shrink-0">
                            <Activity className="w-6 h-6" />
                          </div>
                          <div>
                            <h5 className="font-bold text-sm text-slate-900 dark:text-white mb-1">{insight.title}</h5>
                            <p className="text-xs text-slate-400 font-medium leading-relaxed">{insight.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={`lg:col-span-5 rounded-[32px] border p-6 transition-all duration-500 ${
                    isDark ? 'bg-[#0b1329]/60 border-white/10 backdrop-blur-xl shadow-2xl' : 'bg-white border-slate-200 shadow-xl'
                  }`}>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2 border-b border-white/10 pb-4">
                      <TrendingUp className="w-5 h-5 text-purple-400" />
                      <span>Department Attrition Hotspots</span>
                    </h3>
                    <div className="space-y-4">
                      {[
                        { name: 'Frontend Engineering Squad', dept: 'Engineering', risk: 35, color: 'bg-amber-500' },
                        { name: 'Customer Support Tier 1', dept: 'Support', risk: 18, color: 'bg-emerald-500' },
                        { name: 'Global Sales Pipeline', dept: 'Sales', risk: 24, color: 'bg-blue-500' },
                      ].map((hotspot) => (
                        <div key={hotspot.name} className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2">
                          <div className="flex justify-between items-center text-xs font-bold">
                            <span className="text-slate-200">{hotspot.name}</span>
                            <span className="text-amber-400 font-mono">{hotspot.risk}% Risk</span>
                          </div>
                          <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden border border-white/10">
                            <div className={`h-full ${hotspot.color} rounded-full`} style={{ width: `${hotspot.risk}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ==================================================== */}
            {/* VIEW 4: INTERNAL MAIL (Inbox, Folder structure, Details) */}
            {/* ==================================================== */}
            {activeMenu === 'Internal Mail' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                {/* Page Title */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-blue-900/20 via-transparent to-transparent p-6 rounded-[32px] border border-white/5">
                  <div>
                    <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
                      Internal Mail Box
                      <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        Secure Inbox
                      </span>
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 font-medium">
                      Encrypted employee communications and formal policy distributions.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      alert('Opening draft composer...');
                    }}
                    className="flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-white rounded-2xl font-bold text-xs uppercase tracking-wider shadow-xl shadow-teal-500/25 hover:scale-105 transition-all duration-300 w-fit"
                  >
                    <Plus className="w-4 h-4" />
                    <span>New Message</span>
                  </button>
                </div>

                {/* 3-Column Mailbox Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                  
                  {/* Left Column: Folders & Labels */}
                  <div className={`lg:col-span-2 rounded-[32px] border p-6 flex flex-col justify-between ${isDark ? 'bg-[#0b1329]/60 border-white/10 backdrop-blur-xl' : 'bg-white border-slate-200'}`}>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">Folders</span>
                        {[
                          { id: 'inbox', label: 'Inbox', count: 4, icon: Mail, active: true },
                          { id: 'starred', label: 'Starred', count: 1, icon: Star, active: false },
                          { id: 'sent', label: 'Sent', count: 0, icon: Send, active: false },
                          { id: 'drafts', label: 'Drafts', count: 2, icon: FileText, active: false },
                          { id: 'spam', label: 'Spam', count: 0, icon: AlertCircle, active: false },
                          { id: 'trash', label: 'Trash', count: 0, icon: Trash, active: false }
                        ].map(folder => {
                          const FolderIcon = folder.icon;
                          return (
                            <button key={folder.id} className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all ${folder.active ? 'bg-teal-500/10 text-teal-400 border border-teal-500/20' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'}`}>
                              <div className="flex items-center gap-2">
                                <FolderIcon className="w-4 h-4" />
                                <span>{folder.label}</span>
                              </div>
                              {folder.count > 0 && <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-teal-500/20 text-teal-300">{folder.count}</span>}
                            </button>
                          );
                        })}
                      </div>

                      <div className="space-y-2">
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">Labels</span>
                        {[
                          { label: 'HR Dept', color: 'bg-teal-500' },
                          { label: 'Leave Requests', color: 'bg-amber-500' },
                          { label: 'Interviews', color: 'bg-blue-500' },
                          { label: 'Admin Notes', color: 'bg-rose-500' }
                        ].map(label => (
                          <div key={label.label} className="flex items-center gap-2 px-3 py-1.5 text-xs text-slate-300 font-semibold cursor-pointer hover:text-white">
                            <span className={`w-2.5 h-2.5 rounded-full ${label.color}`} />
                            <span>{label.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Middle Column: Email List */}
                  <div className={`lg:col-span-4 rounded-[32px] border p-6 flex flex-col ${isDark ? 'bg-[#0b1329]/60 border-white/10 backdrop-blur-xl' : 'bg-white border-slate-200'}`}>
                    <div className="relative mb-4">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input
                        type="text"
                        placeholder="Search emails..."
                        className="w-full pl-9 pr-4 py-2.5 rounded-xl text-xs bg-black/40 border border-white/10 text-white outline-none focus:border-teal-500/50"
                      />
                    </div>

                    <div className="flex-1 overflow-y-auto space-y-2 pr-1 max-h-[500px] custom-scrollbar">
                      {[
                        { id: '1', sender: 'Olivia Mason', subject: 'Leave Request Approval', snippet: 'Hi Nisha, I wanted to follow up on my annual...', time: '10:42 AM', active: true, tag: 'Leave Requests', labelColor: 'bg-amber-500' },
                        { id: '2', sender: 'Ethan Ray', subject: 'Updated Contact Info', snippet: 'Just a quick note to say I have updated my...', time: 'Yesterday', active: false, tag: 'HR Dept', labelColor: 'bg-teal-500' },
                        { id: '3', sender: 'Lisa Armand', subject: 'Medical Leave Submission', snippet: 'Please find attached my medical certificate...', time: 'May 16', active: false, tag: 'Leave Requests', labelColor: 'bg-amber-500' },
                        { id: '4', sender: 'HR Department', subject: 'Performance Review Reminder', snippet: 'A reminder to complete your self-assessment...', time: 'May 15', active: false, tag: 'Admin Notes', labelColor: 'bg-rose-500' },
                        { id: '5', sender: 'Jacob Yoon', subject: 'Attendance Clarification', snippet: 'I wanted to clarify my absence last Friday...', time: 'May 14', active: false, tag: 'HR Dept', labelColor: 'bg-teal-500' },
                        { id: '6', sender: 'System Notification', subject: 'Password Expiry Alert', snippet: 'Your corporate password will expire in 5...', time: 'May 12', active: false, tag: 'Admin Notes', labelColor: 'bg-rose-500' },
                        { id: '7', sender: 'Mia Torres', subject: 'Leave Policy Update', snippet: 'Please review the updated leave regulations...', time: 'May 10', active: false, tag: 'HR Dept', labelColor: 'bg-teal-500' }
                      ].map(email => (
                        <div key={email.id} className={`p-4 rounded-2xl border transition-all cursor-pointer ${email.active ? 'bg-teal-500/10 border-teal-500/30' : 'bg-white/5 border-white/5 hover:bg-white/10'}`}>
                          <div className="flex justify-between items-start mb-1">
                            <span className="font-bold text-xs text-white">{email.sender}</span>
                            <span className="text-[10px] text-slate-500 font-medium">{email.time}</span>
                          </div>
                          <h4 className="text-xs font-bold text-slate-200 truncate">{email.subject}</h4>
                          <p className="text-[11px] text-slate-400 truncate mt-0.5">{email.snippet}</p>
                          <div className="flex items-center gap-1.5 mt-2">
                            <span className={`w-2 h-2 rounded-full ${email.labelColor}`} />
                            <span className="text-[9px] text-slate-400 font-extrabold uppercase tracking-wide">{email.tag}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Email Detail View */}
                  <div className={`lg:col-span-6 rounded-[32px] border p-6 flex flex-col justify-between ${isDark ? 'bg-[#0b1329]/60 border-white/10 backdrop-blur-xl' : 'bg-white border-slate-200'}`}>
                    <div className="space-y-6">
                      <div className="flex justify-between items-center border-b border-white/10 pb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center font-bold">OM</div>
                          <div>
                            <h3 className="font-bold text-sm text-white">Olivia Mason</h3>
                            <span className="text-[10px] text-slate-500">oliviam@company.com • To: nishak@company.com</span>
                          </div>
                        </div>
                        <span className="text-xs text-slate-400 font-medium">Today, 10:42 AM</span>
                      </div>

                      <div className="space-y-4">
                        <h2 className="text-lg font-bold text-white tracking-tight">Leave Request Approval</h2>
                        <div className="text-xs text-slate-300 leading-relaxed space-y-3 font-medium">
                          <p>Hi Nisha,</p>
                          <p>I wanted to follow up on my annual leave request for the dates 18-19 July.</p>
                          <p>The request is still marked as pending, and I wanted to confirm if any additional documents are needed.</p>
                          <p>Please let me know if you need anything else from my side.</p>
                          <p>Thanks so much!</p>
                          <p className="font-bold text-teal-400">Olivia</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 border-t border-white/10 pt-6 space-y-4">
                      <div className="flex items-center justify-between text-xs text-slate-400 font-bold">
                        <span>Reply to Olivia Mason</span>
                        <div className="flex gap-2">
                          <button className="px-2.5 py-1 rounded bg-white/5 border border-white/10 hover:bg-white/10">B</button>
                          <button className="px-2.5 py-1 rounded bg-white/5 border border-white/10 hover:bg-white/10">I</button>
                          <button className="px-2.5 py-1 rounded bg-white/5 border border-white/10 hover:bg-white/10">Link</button>
                        </div>
                      </div>
                      <textarea
                        placeholder="Type something..."
                        rows={3}
                        className="w-full p-4 rounded-xl text-xs bg-black/40 border border-white/10 text-white outline-none focus:border-teal-500/50 resize-none"
                      />
                      <div className="flex justify-between items-center">
                        <button className="p-2.5 rounded-xl border border-white/10 hover:bg-white/10 text-slate-400">
                          <Trash className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            alert('Secure direct message dispatched successfully!');
                          }}
                          className="flex items-center gap-2 px-5 py-2.5 bg-teal-500 hover:bg-teal-400 text-white rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg"
                        >
                          <Send className="w-4 h-4" />
                          <span>Send Message</span>
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
              </motion.div>
            )}

            {/* ==================================================== */}
            {/* VIEW 5: ATTENDANCE (Dashboard metrics, BarChart, Table) */}
            {/* ==================================================== */}
            {activeMenu === 'Attendance' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                {/* Page Title */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-blue-900/20 via-transparent to-transparent p-6 rounded-[32px] border border-white/5">
                  <div>
                    <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
                      Attendance Analytics
                      <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        Biometrics Sync
                      </span>
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 font-medium">
                      Real-time biometric swipe analytics and shift compliance tracking.
                    </p>
                  </div>

                  <button
                    onClick={() => alert('Synchronizing biometric databases from AWS-AP-SOUTH-1...')}
                    className="flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-500 hover:to-teal-400 text-white rounded-2xl font-bold text-xs uppercase tracking-wider shadow-xl shadow-blue-500/25 hover:scale-105 transition-all duration-300 w-fit"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Sync Biometrics</span>
                  </button>
                </div>

                {/* TeamHub Metric Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { label: 'Present', value: '93', trend: '+2 vs yesterday', details: '2 late arrival • 91 on time', color: 'border-emerald-500/20 text-emerald-400', bg: 'bg-emerald-500/5' },
                    { label: 'On Leave', value: '6', trend: '+1 vs yesterday', details: '0 unpaid leave • 6 paid leave', color: 'border-blue-500/20 text-blue-400', bg: 'bg-blue-500/5' },
                    { label: 'Absent', value: '3', trend: '-1 vs yesterday', details: '1 unexcused • 2 excused', color: 'border-rose-500/20 text-rose-400', bg: 'bg-rose-500/5' }
                  ].map(card => (
                    <div key={card.label} className={`p-6 rounded-[28px] border transition-all duration-300 hover:scale-102 ${isDark ? `bg-white/5 ${card.color.split(' ')[0]}` : `bg-white border-slate-200 shadow-md`} ${card.bg}`}>
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">{card.label}</span>
                        <span className="text-[10px] font-bold text-teal-400">{card.trend}</span>
                      </div>
                      <div className={`text-4xl font-extrabold tracking-tight ${isDark ? card.color.split(' ')[1] : 'text-slate-900'}`}>{card.value}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-2 font-semibold">{card.details}</div>
                    </div>
                  ))}
                </div>

                {/* Attendance Chart & Overview */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  
                  {/* Left Column: Stacked Attendance Overview Chart */}
                  <div className={`lg:col-span-8 rounded-[32px] border p-6 flex flex-col ${isDark ? 'bg-[#0b1329]/60 border-white/10 backdrop-blur-xl shadow-2xl' : 'bg-white border-slate-200 shadow-xl'}`}>
                    <h3 className="text-xl font-bold text-white mb-6">Attendance Overview</h3>
                    <div className="h-[300px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={[
                            { month: 'Jan', Present: 92, Leave: 5, Absent: 3 },
                            { month: 'Feb', Present: 94, Leave: 4, Absent: 2 },
                            { month: 'Mar', Present: 91, Leave: 6, Absent: 3 },
                            { month: 'Apr', Present: 95, Leave: 3, Absent: 2 },
                            { month: 'May', Present: 93, Leave: 6, Absent: 1 }
                          ]}
                          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                          <XAxis dataKey="month" stroke="#94a3b8" />
                          <YAxis stroke="#94a3b8" />
                          <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '1rem', color: '#fff' }} />
                          <Legend />
                          <Bar dataKey="Present" stackId="a" fill="#10b981" />
                          <Bar dataKey="Leave" stackId="a" fill="#3b82f6" />
                          <Bar dataKey="Absent" stackId="a" fill="#f43f5e" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Right Column: Key Stats Card */}
                  <div className={`lg:col-span-4 rounded-[32px] border p-6 flex flex-col justify-between ${isDark ? 'bg-[#0b1329]/60 border-white/10 backdrop-blur-xl' : 'bg-white border-slate-200'}`}>
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-white">Compliance Metrics</h3>
                      <div className="space-y-3 mt-4">
                        {[
                          { label: 'Average Check-in Time', value: '09:08 AM', color: 'text-teal-400' },
                          { label: 'On-time Rate', value: '94.2%', color: 'text-emerald-400' },
                          { label: 'Late Deflection Index', value: '0.02', color: 'text-blue-400' },
                          { label: 'Active Shift Schedules', value: '4 Teams', color: 'text-purple-400' }
                        ].map(metric => (
                          <div key={metric.label} className="flex justify-between items-center p-3 rounded-xl bg-white/5 border border-white/5">
                            <span className="text-xs text-slate-400 font-semibold">{metric.label}</span>
                            <span className={`text-xs font-bold ${metric.color}`}>{metric.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => alert('Exporting monthly compliance CSV spreadsheet...')}
                      className="w-full mt-6 py-3 bg-white/5 border border-white/10 hover:bg-white/10 text-slate-200 rounded-xl font-bold text-xs uppercase tracking-wide transition-all"
                    >
                      Export Compliance Log
                    </button>
                  </div>

                </div>

                {/* Employee Attendance Table */}
                <div className={`rounded-[32px] border p-6 ${isDark ? 'bg-[#0b1329]/60 border-white/10 backdrop-blur-xl shadow-2xl' : 'bg-white border-slate-200 shadow-xl'}`}>
                  <h3 className="text-xl font-bold text-white mb-6">Employee Shift Attendance</h3>
                  <div className="overflow-x-auto border border-white/10 rounded-2xl">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-black/40 border-b border-white/10 text-[10px] font-black text-slate-400 uppercase tracking-wider">
                          <th className="p-4">Employee</th>
                          <th className="p-4">Department</th>
                          <th className="p-4">Date</th>
                          <th className="p-4">Check-in</th>
                          <th className="p-4">Check-out</th>
                          <th className="p-4">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 bg-white/[0.02] text-xs font-medium">
                        {[
                          { name: 'Aarav Mehta', dept: 'Engineering', date: 'May 18', in: '09:02 AM', out: '06:05 PM', status: 'Present', statusColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
                          { name: 'Nisha Kapoor', dept: 'Human Resources', date: 'May 18', in: '08:55 AM', out: '05:50 PM', status: 'Present', statusColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
                          { name: 'Marcus Chen', dept: 'Product', date: 'May 18', in: '09:15 AM', out: '06:00 PM', status: 'Late', statusColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
                          { name: 'Sarah Jenkins', dept: 'Engineering', date: 'May 18', in: '—', out: '—', status: 'On Leave', statusColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
                          { name: 'Elena Rostova', dept: 'Quality Assurance', date: 'May 18', in: '—', out: '—', status: 'Absent', statusColor: 'bg-rose-500/10 text-rose-400 border-rose-500/20' }
                        ].map(row => (
                          <tr key={row.name} className="hover:bg-white/5 transition-colors">
                            <td className="p-4 font-bold text-white">{row.name}</td>
                            <td className="p-4 text-slate-400">{row.dept}</td>
                            <td className="p-4 text-slate-400">{row.date}</td>
                            <td className="p-4 text-slate-300 font-mono">{row.in}</td>
                            <td className="p-4 text-slate-300 font-mono">{row.out}</td>
                            <td className="p-4">
                              <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wide border ${row.statusColor}`}>{row.status}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </motion.div>
            )}

            {/* ==================================================== */}
            {/* VIEW 6: PAYROLL (Stats card, Area chart, Table in INR) */}
            {/* ==================================================== */}
            {activeMenu === 'Payroll' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                {/* Page Title */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-blue-900/20 via-transparent to-transparent p-6 rounded-[32px] border border-white/5">
                  <div>
                    <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
                      Payroll Analytics
                      <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        INR Unified
                      </span>
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 font-medium">
                      Direct deposit disbursements, compliance logs, allowances and deductions in ₹.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      alert('Initiating secure direct deposit disbursement flow for 1,420 headcount...');
                    }}
                    className="flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-white rounded-2xl font-bold text-xs uppercase tracking-wider shadow-xl shadow-teal-500/25 hover:scale-105 transition-all duration-300 w-fit"
                  >
                    <IndianRupee className="w-4 h-4" />
                    <span>Disburse Net Payroll</span>
                  </button>
                </div>

                {/* TeamHub Metric Cards in INR */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { label: 'Basic Salary', value: '₹25.05 Cr', color: 'text-slate-300 border-white/10' },
                    { label: 'Allowance', value: '₹5.23 Cr', color: 'text-teal-400 border-teal-500/20' },
                    { label: 'Deductions', value: '₹1.22 Cr', color: 'text-rose-400 border-rose-500/20' },
                    { label: 'Net Payroll', value: '₹29.06 Cr', color: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5' }
                  ].map(card => (
                    <div key={card.label} className={`p-6 rounded-[28px] border transition-all duration-300 hover:scale-102 ${isDark ? `bg-white/5 ${card.color.split(' ')[1]}` : `bg-white border-slate-200 shadow-md`}`}>
                      <div className="text-[10px] font-black uppercase tracking-wider text-slate-500 mb-2">{card.label}</div>
                      <div className={`text-3xl font-extrabold tracking-tight ${isDark ? card.color.split(' ')[0] : 'text-slate-900'}`}>{card.value}</div>
                      <div className="text-[10px] text-slate-400 font-bold mt-2">Verified compliance standard</div>
                    </div>
                  ))}
                </div>

                {/* Net Payroll Overview Area Chart */}
                <div className={`rounded-[32px] border p-6 ${isDark ? 'bg-[#0b1329]/60 border-white/10 backdrop-blur-xl shadow-2xl' : 'bg-white border-slate-200 shadow-xl'}`}>
                  <h3 className="text-xl font-bold text-white mb-6">Net Payroll Trend Overview</h3>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={[
                          { name: 'Jan', Payroll: 26.2 },
                          { name: 'Feb', Payroll: 27.5 },
                          { name: 'Mar', Payroll: 28.1 },
                          { name: 'Apr', Payroll: 27.8 },
                          { name: 'May', Payroll: 29.06 }
                        ]}
                        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient id="colorPayroll" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                        <XAxis dataKey="name" stroke="#94a3b8" />
                        <YAxis stroke="#94a3b8" />
                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '1rem', color: '#fff' }} />
                        <Area type="monotone" dataKey="Payroll" stroke="#10b981" fillOpacity={1} fill="url(#colorPayroll)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Payroll Summary Table */}
                <div className={`rounded-[32px] border p-6 ${isDark ? 'bg-[#0b1329]/60 border-white/10 backdrop-blur-xl shadow-2xl' : 'bg-white border-slate-200 shadow-xl'}`}>
                  <h3 className="text-xl font-bold text-white mb-6">Employee Direct Payroll Register</h3>
                  <div className="overflow-x-auto border border-white/10 rounded-2xl">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-black/40 border-b border-white/10 text-[10px] font-black text-slate-400 uppercase tracking-wider">
                          <th className="p-4">Employee</th>
                          <th className="p-4">Base Salary</th>
                          <th className="p-4">Allowances</th>
                          <th className="p-4">Deductions</th>
                          <th className="p-4">Net Payout</th>
                          <th className="p-4">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 bg-white/[0.02] text-xs font-medium">
                        {[
                          { name: 'Aarav Mehta', base: '₹2,50,000', allow: '₹35,000', ded: '₹12,000', net: '₹2,73,000', status: 'Paid', statusColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
                          { name: 'Nisha Kapoor', base: '₹1,80,000', allow: '₹25,000', ded: '₹8,000', net: '₹1,97,000', status: 'Paid', statusColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
                          { name: 'Marcus Chen', base: '₹3,000,000', allow: '₹40,000', ded: '₹15,000', net: '₹3,25,000', status: 'Paid', statusColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
                          { name: 'Sarah Jenkins', base: '₹2,20,000', allow: '₹30,000', ded: '₹10,000', net: '₹2,40,000', status: 'Pending', statusColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20' }
                        ].map(row => (
                          <tr key={row.name} className="hover:bg-white/5 transition-colors">
                            <td className="p-4 font-bold text-white">{row.name}</td>
                            <td className="p-4 text-slate-300 font-mono">{row.base}</td>
                            <td className="p-4 text-slate-300 font-mono">{row.allow}</td>
                            <td className="p-4 text-rose-400 font-mono">{row.ded}</td>
                            <td className="p-4 text-emerald-400 font-bold font-mono">{row.net}</td>
                            <td className="p-4">
                              <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wide border ${row.statusColor}`}>{row.status}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </motion.div>
            )}

            {/* ==================================================== */}
            {/* FALLBACK VIEW FOR ALL OTHER 14 MENU ITEMS */}
            {/* ==================================================== */}
            {!['Documentation', 'Recruitment', 'Dashboard', 'Internal Mail', 'Attendance', 'Payroll'].includes(activeMenu) && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className={`rounded-[32px] border p-12 text-center transition-all duration-500 relative overflow-hidden ${
                  isDark ? 'bg-[#0b1329]/60 border-white/10 backdrop-blur-xl shadow-2xl' : 'bg-white border-slate-200 shadow-xl'
                }`}
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
                
                <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-blue-600 to-teal-500 p-[2px] shadow-2xl shadow-blue-500/30 mx-auto mb-8 animate-pulse">
                  <div className={`w-full h-full rounded-[22px] flex items-center justify-center ${isDark ? 'bg-[#0b1329]' : 'bg-white'}`}>
                    <Cpu className="w-12 h-12 text-teal-400" />
                  </div>
                </div>

                <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight font-display">
                  {activeMenu} Enterprise Module
                </h2>
                <p className="text-slate-500 dark:text-slate-400 max-w-lg mx-auto text-sm font-medium leading-relaxed mb-8">
                  The <span className="text-blue-400 font-bold">{activeMenu}</span> microservice is fully integrated into the AuraHR Command Center telemetry grid. Real-time telemetry, AI predictive modeling, and role-based access control are actively engaged.
                </p>

                <div className="flex flex-wrap justify-center gap-4">
                  <button 
                    onClick={() => alert(`Refreshing telemetry stream for ${activeMenu}...`)}
                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-500 hover:to-teal-400 text-white rounded-2xl font-bold text-xs uppercase tracking-wider shadow-xl shadow-blue-500/25 hover:scale-105 transition-all duration-300 flex items-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4 animate-spin duration-3000" />
                    <span>Synchronize Live Telemetry</span>
                  </button>
                  <button 
                    onClick={() => setActiveMenu('Dashboard')}
                    className="px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all duration-300"
                  >
                    Return to Main Dashboard
                  </button>
                </div>

                {/* Mock Live Data Stream */}
                <div className="mt-12 p-6 rounded-2xl bg-black/40 border border-white/10 max-w-2xl mx-auto text-left font-mono text-xs text-slate-400 shadow-inner space-y-2">
                  <div className="flex items-center justify-between text-[10px] text-blue-400 border-b border-white/10 pb-2 mb-3">
                    <span>LIVE SYSTEM LOGS • {activeMenu.toUpperCase()}</span>
                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"/>CONNECTED</span>
                  </div>
                  <p className="text-slate-300">[2026-05-18 16:15:02] INITIALIZING {activeMenu.toUpperCase()} KERNEL...</p>
                  <p className="text-slate-300">[2026-05-18 16:15:03] FETCHING ENCRYPTED TELEMETRY FROM PORT 8081...</p>
                  <p className="text-emerald-400">[2026-05-18 16:15:04] AI PREDICTIVE MODELING LINKED SUCCESSFULLY. 0 ANOMALIES DETECTED.</p>
                </div>
              </motion.div>
            )}

          </main>
        </div>

      </div>
    </div>
  );
};

export default HrExecutiveDashboard;
