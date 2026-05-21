import React from 'react';
import { User, Bell, Shield, Palette, Globe, LogOut } from 'lucide-react';

export const InternSettings: React.FC = () => {
  return (
    <div className="space-y-6 max-w-[800px] mx-auto">
      <div>
        <h2 className="text-lg font-bold text-white">Settings</h2>
        <p className="text-xs text-[#6e7681] mt-0.5">Manage your account, notifications, and preferences</p>
      </div>

      <div className="space-y-3">
        {[
          { icon: User, label: 'Account Settings', desc: 'Manage your personal information and password', color: 'violet' },
          { icon: Bell, label: 'Notification Preferences', desc: 'Configure email, push, and in-app notification settings', color: 'blue' },
          { icon: Palette, label: 'Appearance', desc: 'Switch between light and dark mode, customize theme', color: 'fuchsia' },
          { icon: Globe, label: 'Language & Region', desc: 'Set your preferred language and timezone', color: 'emerald' },
          { icon: Shield, label: 'Privacy & Security', desc: 'Two-factor authentication, session management', color: 'amber' },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-4 p-4 bg-[#161b22] border border-[#21262d] rounded-xl hover:border-[#30363d] transition-colors cursor-pointer group">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
              item.color === 'violet' ? 'bg-violet-500/10 text-violet-400' :
              item.color === 'blue' ? 'bg-blue-500/10 text-blue-400' :
              item.color === 'fuchsia' ? 'bg-fuchsia-500/10 text-fuchsia-400' :
              item.color === 'emerald' ? 'bg-emerald-500/10 text-emerald-400' :
              'bg-amber-500/10 text-amber-400'
            }`}>
              <item.icon className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-slate-200 group-hover:text-violet-300 transition-colors">{item.label}</h4>
              <p className="text-xs text-[#6e7681]">{item.desc}</p>
            </div>
          </div>
        ))}

        {/* Logout */}
        <div
          onClick={() => { window.location.href = '/' }}
          className="flex items-center gap-4 p-4 bg-[#161b22] border border-[#21262d] rounded-xl hover:border-rose-500/40 hover:bg-rose-500/5 transition-colors cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center">
            <LogOut className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-200 group-hover:text-rose-400 transition-colors">Sign Out</h4>
            <p className="text-xs text-[#6e7681]">Log out of your intern account</p>
          </div>
        </div>
      </div>
    </div>
  );
};
