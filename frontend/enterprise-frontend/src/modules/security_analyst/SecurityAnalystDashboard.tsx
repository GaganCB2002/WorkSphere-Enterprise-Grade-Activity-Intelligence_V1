import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Shield, Activity, Map, Video, LogOut, Bell, Settings, User, 
  Terminal, ShieldCheck, Zap, BookOpen } from 'lucide-react';

// Sub-components
import { ThreatOverview } from './components/ThreatOverview';
import { LiveThreatMap } from './components/LiveThreatMap';
import { DesktopForensics } from './components/DesktopForensics';
import { NetworkPacketSniffer } from './components/NetworkPacketSniffer';
import { VulnerabilityScanner } from './components/VulnerabilityScanner';
import { ZeroTrustPolicyEngine } from './components/ZeroTrustPolicyEngine';
import { IncidentResponsePlaybooks } from './components/IncidentResponsePlaybooks';
import { LMSView } from '../hr/components/LMSView';


export const SecurityAnalystDashboard: React.FC = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState<
    'overview' | 'threat-map' | 'forensics' | 'sniffer' | 'vulnerabilities' | 'zero-trust' | 'playbooks' | 'training'
  >('overview');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
    window.location.href = '/login';
  };

  const navItems = [
    { id: 'overview', icon: Activity, label: 'Threat Overview', section: 'SIEM Command Center' },
    { id: 'threat-map', icon: Map, label: 'Live Threat Map', section: 'SIEM Command Center' },
    { id: 'forensics', icon: Video, label: 'Desktop Forensics', section: 'SIEM Command Center' },
    
    { id: 'sniffer', icon: Terminal, label: 'Network Packet Sniffer', section: 'Advanced Capabilities' },
    { id: 'vulnerabilities', icon: ShieldCheck, label: 'Vulnerability Scanner', section: 'Advanced Capabilities' },
    { id: 'zero-trust', icon: Shield, label: 'Zero Trust Policies', section: 'Advanced Capabilities' },
    { id: 'playbooks', icon: Zap, label: 'Incident Response', section: 'Advanced Capabilities' },
    { id: 'training', label: 'Training Center', icon: BookOpen, section: 'Tools & Applications' },
];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return <ThreatOverview />;
      case 'threat-map': return <LiveThreatMap />;
      case 'forensics': return <DesktopForensics />;
      case 'sniffer': return <NetworkPacketSniffer />;
      case 'vulnerabilities': return <VulnerabilityScanner />;
      case 'zero-trust': return <ZeroTrustPolicyEngine />;
      case 'playbooks': return <IncidentResponsePlaybooks />;
      case 'training': return <LMSView />;
      default: return <ThreatOverview />;
    }
  };

  const getPageTitle = () => {
    return navItems.find(n => n.id === activeTab)?.label || 'Cyber Security';
  };

  return (
    <div className="flex h-screen w-full bg-slate-950 text-slate-300 font-sans overflow-hidden selection:bg-red-500/30">
      
      {/* Sidebar */}
      <aside className="w-72 bg-slate-900/50 border-r border-slate-800/80 backdrop-blur-xl flex flex-col transition-all duration-300">
        <div className="h-16 flex items-center px-6 border-b border-slate-800/80 gap-3">
          <div className="p-2 bg-red-500/10 border border-red-500/30 rounded-lg text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
            <Shield className="w-5 h-5" />
          </div>
          <span className="font-bold text-white tracking-tight">Cyber Security</span>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4">
          
          {/* Section 1 */}
          <div className="mb-6">
            <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-3 px-6">SIEM Command Center</div>
            <div className="space-y-1 px-3">
              {navItems.filter(i => i.section === 'SIEM Command Center').map(item => (
                <button 
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    activeTab === item.id 
                      ? 'bg-red-500/10 text-red-400 border border-red-500/20 shadow-lg shadow-red-500/5' 
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/50 border border-transparent'
                  }`}
                >
                  <item.icon className="w-4 h-4" /> {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Section 2 */}
          <div>
            <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-3 px-6 flex items-center justify-between">
              Advanced Capabilities
              <div className="px-1.5 py-0.5 bg-indigo-500/20 text-indigo-400 rounded text-[8px] animate-pulse">NEW</div>
            </div>
            <div className="space-y-1 px-3">
              {navItems.filter(i => i.section === 'Advanced Capabilities').map(item => (
                <button 
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    activeTab === item.id 
                      ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-lg shadow-indigo-500/5' 
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/50 border border-transparent'
                  }`}
                >
                  <item.icon className="w-4 h-4" /> {item.label}
                </button>
              ))}
            </div>
          </div>

        </div>

        <div className="p-4 border-t border-slate-800/80">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all border border-transparent hover:border-red-500/20"
          >
            <LogOut className="w-4 h-4" /> Terminate Session
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full bg-gradient-to-br from-slate-950 to-slate-900 relative">
        {/* Topbar */}
        <header className="h-16 flex items-center justify-between px-8 border-b border-slate-800/80 bg-slate-900/30 backdrop-blur-md">
          <h1 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
            {getPageTitle()}
            <span className="px-2 py-0.5 rounded bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] uppercase tracking-widest ml-2 animate-pulse">Defcon 3</span>
          </h1>
          <div className="flex items-center gap-4 text-slate-400">
            <button 
              onClick={() => window.location.href = '/command-center'}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white text-sm font-bold rounded-lg shadow-lg shadow-red-500/25 transition-all border border-red-400/30"
            >
              <Zap className="w-4 h-4" /> Launch Command Center
            </button>
            <button className="hover:text-white"><Bell className="w-5 h-5" /></button>
            <button className="hover:text-white"><Settings className="w-5 h-5" /></button>
            <div className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
              <User className="w-4 h-4" />
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="flex-1 overflow-y-auto p-8 relative z-10">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};
