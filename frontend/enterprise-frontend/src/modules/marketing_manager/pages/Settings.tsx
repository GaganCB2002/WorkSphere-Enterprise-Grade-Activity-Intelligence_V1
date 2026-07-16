import React from 'react';
import { User, Bell, Link as LinkIcon, Shield, CreditCard, Save } from 'lucide-react';

export const Settings: React.FC = () => {
  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-500 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <h1 className="font-headline text-4xl text-[#0f172a] dark:text-slate-100 font-bold tracking-tight mb-2">Settings</h1>
          <p className="font-body text-[#475569] dark:text-slate-300 text-[15px]">Manage your account, preferences, and integrations.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2.5 bg-[#0d47a1] dark:bg-blue-600 hover:bg-[#0a3982] text-white rounded-xl text-sm font-bold shadow-md shadow-blue-900/20 transition-all">
          <Save className="w-4 h-4" /> Save Changes
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Settings Sidebar */}
        <div className="w-full md:w-64 shrink-0 space-y-1">
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-[#e0e7ff] dark:bg-indigo-900/40 text-[#0d47a1] dark:text-blue-400 font-bold text-sm rounded-xl transition-colors">
            <User className="w-4 h-4" /> Profile & Account
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-[#64748b] dark:text-slate-400 hover:bg-[#f8fafc] dark:hover:bg-slate-800 hover:text-[#0f172a] dark:hover:text-white font-semibold text-sm rounded-xl transition-colors">
            <Bell className="w-4 h-4" /> Notifications
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-[#64748b] dark:text-slate-400 hover:bg-[#f8fafc] dark:hover:bg-slate-800 hover:text-[#0f172a] dark:hover:text-white font-semibold text-sm rounded-xl transition-colors">
            <LinkIcon className="w-4 h-4" /> Integrations
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-[#64748b] dark:text-slate-400 hover:bg-[#f8fafc] dark:hover:bg-slate-800 hover:text-[#0f172a] dark:hover:text-white font-semibold text-sm rounded-xl transition-colors">
            <Shield className="w-4 h-4" /> Security
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-[#64748b] dark:text-slate-400 hover:bg-[#f8fafc] dark:hover:bg-slate-800 hover:text-[#0f172a] dark:hover:text-white font-semibold text-sm rounded-xl transition-colors">
            <CreditCard className="w-4 h-4" /> Billing & Budgets
          </button>
        </div>

        {/* Settings Content Area */}
        <div className="flex-1 space-y-6">
          
          <div className="bg-white dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 rounded-2xl p-6 shadow-sm">
            <h2 className="font-headline text-lg font-bold text-[#0f172a] dark:text-slate-100 mb-6">Profile Information</h2>
            
            <div className="flex items-start gap-6 mb-8">
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" alt="Profile" className="w-20 h-20 rounded-full border border-[#e2e8f0] dark:border-slate-800 object-cover" />
              <div>
                <button className="px-4 py-2 bg-white dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 text-[#0f172a] dark:text-slate-100 rounded-lg text-sm font-semibold hover:bg-[#f8fafc] dark:hover:bg-slate-800 transition-colors mb-2">Change Avatar</button>
                <p className="text-xs text-[#64748b] dark:text-slate-400">JPG, GIF or PNG. Max size of 2MB.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-[#334155] dark:text-slate-200">First Name</label>
                <input type="text" defaultValue="John" className="w-full bg-[#f8fafc] dark:bg-slate-800 border border-[#e2e8f0] dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:border-[#0d47a1] outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-[#334155] dark:text-slate-200">Last Name</label>
                <input type="text" defaultValue="Doe" className="w-full bg-[#f8fafc] dark:bg-slate-800 border border-[#e2e8f0] dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:border-[#0d47a1] outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-[#334155] dark:text-slate-200">Email Address</label>
                <input type="email" defaultValue="john.doe@enterprise.com" className="w-full bg-[#f8fafc] dark:bg-slate-800 border border-[#e2e8f0] dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:border-[#0d47a1] outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-[#334155] dark:text-slate-200">Role / Title</label>
                <input type="text" defaultValue="Marketing Director" className="w-full bg-[#f8fafc] dark:bg-slate-800 border border-[#e2e8f0] dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:border-[#0d47a1] outline-none text-[#64748b] dark:text-slate-400" disabled />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 rounded-2xl p-6 shadow-sm">
            <h2 className="font-headline text-lg font-bold text-[#0f172a] dark:text-slate-100 mb-6">Timezone & Localization</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-[#334155] dark:text-slate-200">Timezone</label>
                <select className="w-full bg-[#f8fafc] dark:bg-slate-800 border border-[#e2e8f0] dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:border-[#0d47a1] outline-none">
                  <option>Pacific Time (US & Canada)</option>
                  <option>Eastern Time (US & Canada)</option>
                  <option>UTC (Coordinated Universal Time)</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-[#334155] dark:text-slate-200">Currency</label>
                <select className="w-full bg-[#f8fafc] dark:bg-slate-800 border border-[#e2e8f0] dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:border-[#0d47a1] outline-none">
                  <option>INR (₹)</option>
                  <option>EUR (€)</option>
                  <option>GBP (£)</option>
                </select>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
