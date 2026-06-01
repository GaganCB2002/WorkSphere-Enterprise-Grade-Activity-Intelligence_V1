import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { CtoSidebar } from './components/CtoSidebar';
import { CtoWelcomeHeader } from './components/CtoWelcomeHeader';
import { CtoKpiCards } from './components/CtoKpiCards';
import { CtoCommandCenter } from './components/CtoCommandCenter';
import { CtoEngineeringAnalytics } from './components/CtoEngineeringAnalytics';
import { CtoReleaseManagement } from './components/CtoReleaseManagement';
import { CtoInfrastructure } from './components/CtoInfrastructure';
import { CtoCloudOps } from './components/CtoCloudOps';
import { CtoSecurityOps } from './components/CtoSecurityOps';
import { CtoAiAssistant } from './components/CtoAiAssistant';
import { CtoTechnologyRoadmap } from './components/CtoTechnologyRoadmap';
import { CtoReports } from './components/CtoReports';
import { CtoSettings } from './components/CtoSettings';
import { LMSView } from '../hr/components/LMSView';


export const CtoDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState<any[]>([]);
  const [velocityData, setVelocityData] = useState<any[]>([]);
  const [squads, setSquads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('aurahr-token');
        const headers: Record<string, string> = { 'Content-Type': 'application/json' };
        if (token) headers['Authorization'] = `Bearer ${token}`;

        const res = await fetch('/api/cto/dashboard', { headers });
        if (!res.ok) throw new Error('Failed to fetch CTO dashboard data');
        const data = await res.json();
        
        setStats(data.kpis);
        setVelocityData(data.velocityData);
        setSquads(data.activeSquads);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      );
    }

    switch (activeTab) {
      case 'overview':
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-8">
            <CtoKpiCards stats={stats} />
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
              <CtoCommandCenter />
              <CtoTechnologyRoadmap />
            </div>
          </motion.div>
        );
      case 'engineering':
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-8">
            <CtoEngineeringAnalytics squads={squads} velocityData={velocityData} />
          </motion.div>
        );
      case 'delivery':
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-8">
            <CtoReleaseManagement />
          </motion.div>
        );
      case 'infrastructure':
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-8">
            <CtoInfrastructure />
          </motion.div>
        );
      case 'cloud':
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-8">
            <CtoCloudOps />
          </motion.div>
        );
      case 'security':
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-8">
            <CtoSecurityOps />
          </motion.div>
        );
      case 'ai':
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-8">
            <CtoAiAssistant />
          </motion.div>
        );
      case 'reports':
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-8">
            <CtoReports />
          </motion.div>
        );
      case 'training': return <LMSView />;
      case 'settings':
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-8">
            <CtoSettings />
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex font-sans selection:bg-blue-500/30">
      {/* Dynamic Multi-Tab Sidebar Navigation */}
      <CtoSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Main Dashboard Area */}
      <main className="flex-1 ml-64 p-8 lg:p-10 max-w-[1920px] mx-auto overflow-x-hidden relative">
        {/* Background glow effects for premium feel */}
        <div className="absolute top-0 left-1/4 w-[800px] h-[400px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none" />
        
        <CtoWelcomeHeader />
        
        <AnimatePresence mode="wait">
          {renderContent()}
        </AnimatePresence>
      </main>
    </div>
  );
};

export const CTODashboardPage: React.FC = () => {
  return <CtoDashboard />;
};
