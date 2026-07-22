import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { SecurityAnalystSidebar } from './components/SecurityAnalystSidebar';
import { SecurityWelcomeHeader } from './components/SecurityWelcomeHeader';

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
  const [activeTab, setActiveTab] = useState('overview');

  const renderContent = () => {
    const animationProps = {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
      className: "space-y-8 h-full"
    };

    switch (activeTab) {
      case 'overview':
        return <motion.div key="overview" {...animationProps}><ThreatOverview /></motion.div>;
      case 'threat-map':
        return <motion.div key="threat-map" {...animationProps}><LiveThreatMap /></motion.div>;
      case 'forensics':
        return <motion.div key="forensics" {...animationProps}><DesktopForensics /></motion.div>;
      case 'sniffer':
        return <motion.div key="sniffer" {...animationProps}><NetworkPacketSniffer /></motion.div>;
      case 'vulnerabilities':
        return <motion.div key="vulnerabilities" {...animationProps}><VulnerabilityScanner /></motion.div>;
      case 'zero-trust':
        return <motion.div key="zero-trust" {...animationProps}><ZeroTrustPolicyEngine /></motion.div>;
      case 'playbooks':
        return <motion.div key="playbooks" {...animationProps}><IncidentResponsePlaybooks /></motion.div>;
      case 'training':
        return <motion.div key="training" {...animationProps}><LMSView /></motion.div>;
      default:
        return <motion.div key="default" {...animationProps}><ThreatOverview /></motion.div>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#020617] flex font-sans selection:bg-red-500/30">
      {/* Dynamic Multi-Tab Sidebar Navigation */}
      <SecurityAnalystSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Main Dashboard Area */}
      <main className="flex-1 ml-64 p-8 lg:p-10 max-w-[1920px] mx-auto overflow-x-hidden relative h-screen overflow-y-auto">
        {/* Background glow effects for security theme feel */}
        <div className="absolute top-0 left-1/4 w-[800px] h-[400px] bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-orange-600/10 rounded-full blur-[150px] pointer-events-none" />
        
        <SecurityWelcomeHeader />
        
        <AnimatePresence mode="wait">
          {renderContent()}
        </AnimatePresence>
      </main>
    </div>
  );
};
