import React, { useState } from 'react';
import { 
  User, ShieldCheck, Globe, Clock, IndianRupee, FileText, 
  MapPin, Mail, Phone, Calendar, CheckCircle2, AlertTriangle, 
  Download, Briefcase, FileBadge, CreditCard, ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TABS = [
  { id: 'profile', label: 'Identity & Access', icon: ShieldCheck },
  { id: 'visa', label: 'Foreign Worker Status', icon: Globe },
  { id: 'time', label: 'Time & Attendance', icon: Clock },
  { id: 'payroll', label: 'Payroll & Benefits', icon: IndianRupee },
  { id: 'documents', label: 'Documents', icon: FileText },
];

export const WorkerProfileDetails: React.FC = () => {
  const [activeTab, setActiveTab] = useState('visa');

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Core Identity</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-slate-800/50">
                  <span className="text-slate-400">Employee ID</span>
                  <span className="text-white font-mono bg-slate-800 px-2 py-1 rounded">EMP-F-98234</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-slate-800/50">
                  <span className="text-slate-400">Full Legal Name</span>
                  <span className="text-white font-medium">Alejandro Martinez</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-slate-800/50">
                  <span className="text-slate-400">Date of Birth</span>
                  <span className="text-white font-medium">14 Mar 1992</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-slate-800/50">
                  <span className="text-slate-400">Nationality</span>
                  <span className="text-white font-medium">Spain</span>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Access Levels</h3>
              <div className="space-y-3">
                {['Production Cluster', 'Staging Environment', 'VPN Access', 'Building A (Physical)'].map((access, i) => (
                  <div key={i} className="flex items-center gap-3 bg-slate-800/30 p-3 rounded-xl border border-slate-700/50">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span className="text-slate-200 font-medium">{access}</span>
                    <span className="ml-auto text-xs text-slate-500">Active</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'visa':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-indigo-900/20 to-purple-900/20 border border-indigo-500/20 rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Globe className="w-24 h-24 text-indigo-400" />
                </div>
                <div className="relative z-10">
                  <h4 className="text-sm font-bold text-indigo-400 mb-1 uppercase tracking-wider">Visa Type</h4>
                  <p className="text-3xl font-black text-white">H-1B</p>
                  <p className="text-sm text-slate-400 mt-2">Specialty Occupation</p>
                </div>
              </div>
              <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
                <h4 className="text-sm font-bold text-slate-400 mb-1 uppercase tracking-wider">Expiration Date</h4>
                <p className="text-3xl font-black text-white">24 Oct 2027</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span className="text-sm font-bold text-emerald-400">875 days remaining</span>
                </div>
              </div>
              <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
                <h4 className="text-sm font-bold text-slate-400 mb-1 uppercase tracking-wider">Sponsorship Org</h4>
                <p className="text-2xl font-black text-white truncate">WorkSphere Ent.</p>
                <p className="text-sm text-slate-400 mt-2 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Verified Entity
                </p>
              </div>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Immigration Compliance Status</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-emerald-500/20 rounded-lg">
                      <FileBadge className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-emerald-400">LCA (Labor Condition Application)</h4>
                      <p className="text-sm text-emerald-400/70">Certified and Active - Valid through 2027</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-sm font-bold rounded-lg transition-colors border border-slate-700 flex items-center gap-2">
                    <Download className="w-4 h-4" /> View LCA
                  </button>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-amber-500/20 rounded-lg">
                      <AlertTriangle className="w-6 h-6 text-amber-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-amber-400">I-94 Travel Record Update Needed</h4>
                      <p className="text-sm text-amber-400/70">Please upload latest I-94 after recent international travel.</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-900 text-sm font-black rounded-lg transition-colors">
                    Upload Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      case 'time':
        return (
          <div className="flex flex-col items-center justify-center py-12 text-slate-400">
            <Clock className="w-16 h-16 mb-4 opacity-20" />
            <p className="text-lg font-medium">Time & Attendance data synced with HR module.</p>
          </div>
        );
      case 'payroll':
        return (
          <div className="flex flex-col items-center justify-center py-12 text-slate-400">
            <CreditCard className="w-16 h-16 mb-4 opacity-20" />
            <p className="text-lg font-medium">Payroll restricted due to DevOps access level.</p>
          </div>
        );
      case 'documents':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {['Offer Letter.pdf', 'NDA_Signed_2023.pdf', 'H1B_Approval_Notice_I797.pdf', 'Passport_Copy.pdf', 'SSN_Card_Secure.pdf'].map((doc, i) => (
              <div key={i} className="flex items-center p-4 bg-slate-900/50 border border-slate-800 rounded-xl hover:border-brand/50 transition-colors cursor-pointer group">
                <FileText className="w-8 h-8 text-slate-500 group-hover:text-brand transition-colors" />
                <div className="ml-3 overflow-hidden">
                  <p className="text-sm font-bold text-slate-200 truncate">{doc}</p>
                  <p className="text-xs text-slate-500">Added {new Date().toLocaleDateString()}</p>
                </div>
                <Download className="w-4 h-4 ml-auto text-slate-600 group-hover:text-brand opacity-0 group-hover:opacity-100 transition-all" />
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-brand to-indigo-600 p-1 shadow-xl shadow-brand/20">
            <div className="w-full h-full bg-slate-900 rounded-xl flex items-center justify-center">
              <span className="text-3xl font-black text-white">AM</span>
            </div>
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-3xl font-black text-white tracking-tight">Alejandro Martinez</h1>
              <span className="px-3 py-1 bg-brand/10 border border-brand/20 text-brand text-xs font-bold rounded-full uppercase tracking-wider">
                Active
              </span>
              <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-bold rounded-full uppercase tracking-wider flex items-center gap-1">
                <Globe className="w-3 h-3" /> Foreign Worker
              </span>
            </div>
            
            <p className="text-lg text-slate-400 font-medium mb-4 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-slate-500" /> Senior Systems Engineer <span className="text-slate-600">•</span> Cloud Infrastructure
            </p>
            
            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500">
              <div className="flex items-center gap-2"><MapPin className="w-4 h-4" /> New York, NY (HQ)</div>
              <div className="flex items-center gap-2"><Mail className="w-4 h-4" /> a.martinez@worksphere.ent</div>
              <div className="flex items-center gap-2"><Phone className="w-4 h-4" /> +1 (555) 019-2834</div>
              <div className="flex items-center gap-2"><Calendar className="w-4 h-4" /> Joined Sep 2023</div>
            </div>
          </div>
        </div>
      </div>

      {/* Sub-Navigation */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-2 flex overflow-x-auto custom-scrollbar">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === tab.id 
                ? 'bg-brand text-white shadow-lg shadow-brand/20' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'opacity-100' : 'opacity-50'}`} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {renderContent()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
