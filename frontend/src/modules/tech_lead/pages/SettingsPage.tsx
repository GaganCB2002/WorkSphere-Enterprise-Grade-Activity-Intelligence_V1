// @ts-nocheck
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings2, Bell, Shield, User, Palette, Globe, Key, Webhook, Save, ChevronRight, ToggleLeft, ToggleRight } from 'lucide-react';

export const SettingsPage = () => {
  const [notifications, setNotifications] = useState({ email: true, push: true, slack: false, digest: true });
  const [security, setSecurity] = useState({ twoFactor: false, sso: true, auditLog: true });

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#0B0F19] text-slate-100 min-h-screen p-4 sm:p-6 space-y-6">
      <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2"><Settings2 className="w-6 h-6 text-indigo-500" /> Settings</h1>
        <p className="text-xs text-slate-400 mt-0.5">Manage your preferences and configurations</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl overflow-hidden backdrop-blur-md">
          <div className="p-4 border-b border-slate-800 flex items-center gap-3"><User className="w-5 h-5 text-indigo-400" /><h2 className="text-sm font-bold text-white">Profile</h2></div>
          <div className="p-4 space-y-4">
            <div><label className="text-xs text-slate-400 block mb-1">Display Name</label><input type="text" defaultValue="Tech Lead" className="w-full bg-[#1E293B] border border-slate-700/60 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500" /></div>
            <div><label className="text-xs text-slate-400 block mb-1">Email</label><input type="email" defaultValue="techlead@worksphere.com" className="w-full bg-[#1E293B] border border-slate-700/60 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500" /></div>
          </div>
        </div>
        <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl overflow-hidden backdrop-blur-md">
          <div className="p-4 border-b border-slate-800 flex items-center gap-3"><Bell className="w-5 h-5 text-indigo-400" /><h2 className="text-sm font-bold text-white">Notifications</h2></div>
          <div className="divide-y divide-slate-800">{Object.entries(notifications).map(([key, val]) => (
            <div key={key} className="p-4 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-200 capitalize">{key === 'twoFactor' ? 'Two-Factor Auth' : key.replace(/([A-Z])/g, ' ').trim()}</span>
              <button onClick={() => setNotifications({...notifications, [key]: !val})} className="text-indigo-400">{val ? <ToggleRight className="w-6 h-6" /> : <ToggleLeft className="w-6 h-6 text-slate-600" />}</button>
            </div>
          ))}</div>
        </div>
        <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl overflow-hidden backdrop-blur-md">
          <div className="p-4 border-b border-slate-800 flex items-center gap-3"><Shield className="w-5 h-5 text-indigo-400" /><h2 className="text-sm font-bold text-white">Security</h2></div>
          <div className="divide-y divide-slate-800">{Object.entries(security).map(([key, val]) => (
            <div key={key} className="p-4 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-200 capitalize">{key.replace(/([A-Z])/g, ' ').trim()}</span>
              <button onClick={() => setSecurity({...security, [key]: !val})} className="text-indigo-400">{val ? <ToggleRight className="w-6 h-6" /> : <ToggleLeft className="w-6 h-6 text-slate-600" />}</button>
            </div>
          ))}</div>
        </div>
      </div>
      <div className="flex justify-end">
        <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl text-sm font-semibold"><Save className="w-4 h-4" /> Save Changes</button>
      </div>
    </motion.div>
  );
};

