import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { CeoSidebar } from './components/CeoSidebar';
import { CeoWelcomeHeader } from './components/CeoWelcomeHeader';
import { CeoKpiCards } from './components/CeoKpiCards';
import { CeoCommandCenter } from './components/CeoCommandCenter';
import { CeoFinancialCenter } from './components/CeoFinancialCenter';
import { CeoWorkforceCenter } from './components/CeoWorkforceCenter';
import { CeoProjectPortfolio } from './components/CeoProjectPortfolio';
import { CeoClientSuccess } from './components/CeoClientSuccess';
import { CeoStrategicPlanning } from './components/CeoStrategicPlanning';
import { CeoAiAssistant } from './components/CeoAiAssistant';
import { CeoAlertsCenter } from './components/CeoAlertsCenter';
import { CeoReports } from './components/CeoReports';
import { CeoSettings } from './components/CeoSettings';
import { LMSView } from '../hr/components/LMSView';


export const CEODashboardPage: React.FC<{ user?: any; platform?: any; onLogout?: () => void }> = ({ user, platform, onLogout }) => {
  return <CeoDashboard onLogout={onLogout} />;
}

export const CeoDashboard: React.FC<{ onLogout?: () => void }> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('aurahr-token');
        const headers: Record<string, string> = { 'Content-Type': 'application/json' };
        if (token) headers['Authorization'] = `Bearer ${token}`;

        const res = await fetch('/api/ceo/kpis', { headers });
        if (!res.ok) throw new Error('Failed to fetch CEO dashboard data');
        const data = await res.json();
        
        setStats(data);
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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
        </div>
      );
    }

    switch (activeTab) {
      case 'overview':
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-8">
            <CeoKpiCards stats={stats} />
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              <div className="xl:col-span-2 space-y-8">
                <CeoCommandCenter />
                <CeoFinancialCenter />
              </div>
              <div className="xl:col-span-1 space-y-8">
                <CeoAlertsCenter />
                <CeoAiAssistant />
              </div>
            </div>
          </motion.div>
        );
      case 'workforce':
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-8">
            <CeoWorkforceCenter />
          </motion.div>
        );
      case 'operations':
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-8">
            <CeoProjectPortfolio />
          </motion.div>
        );
      case 'finance':
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-8">
            <CeoFinancialCenter />
          </motion.div>
        );
      case 'clients':
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-8">
            <CeoClientSuccess />
          </motion.div>
        );
      case 'recruitment':
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="flex flex-col items-center justify-center h-[50vh]">
            <h2 className="text-2xl font-bold text-white mb-2">Recruitment Pipeline</h2>
            <p className="text-slate-400">Candidate tracking integrating in Phase 3.</p>
          </motion.div>
        );
      case 'strategy':
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-8">
            <CeoStrategicPlanning />
          </motion.div>
        );
      case 'reports':
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-8">
            <CeoReports />
          </motion.div>
        );
      case 'training': return <LMSView />;
      case 'settings':
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-8">
            <CeoSettings />
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex font-sans selection:bg-emerald-500/30">
      {/* Dynamic Multi-Tab Sidebar Navigation */}
      <CeoSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Main Dashboard Area */}
      <main className="flex-1 ml-64 p-8 lg:p-10 max-w-[1920px] mx-auto overflow-x-hidden relative">
        {/* Background glow effects for executive premium feel */}
        <div className="absolute top-0 left-1/4 w-[800px] h-[400px] bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none" />
        
        <CeoWelcomeHeader />
        
        <AnimatePresence mode="wait">
          {renderContent()}
        </AnimatePresence>
      </main>
    </div>
  );
};
