import React from 'react';
import { Shield, Key, Bell, Users } from 'lucide-react';

export const CtoSettings: React.FC = () => {
  return (
    <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6 lg:p-8 shadow-2xl">
      <div className="border-b border-slate-800 pb-4 mb-6">
        <h3 className="text-xl font-bold text-white">System Settings</h3>
        <p className="text-slate-400 text-xs mt-1">Manage enterprise platform configurations</p>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900/50 border border-slate-800">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center">
              <Key className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">API Keys & Webhooks</h4>
              <p className="text-xs text-slate-400 mt-0.5">Manage external integration tokens</p>
            </div>
          </div>
          <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-lg transition-colors">
            Configure
          </button>
        </div>

        <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900/50 border border-slate-800">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center">
              <Shield className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Security Policies</h4>
              <p className="text-xs text-slate-400 mt-0.5">MFA, Session timeouts, IP Whitelists</p>
            </div>
          </div>
          <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-lg transition-colors">
            Manage
          </button>
        </div>

        <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900/50 border border-slate-800">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center">
              <Bell className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Alert Routing</h4>
              <p className="text-xs text-slate-400 mt-0.5">PagerDuty, Slack, Email configurations</p>
            </div>
          </div>
          <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-lg transition-colors">
            Update
          </button>
        </div>
      </div>
    </div>
  );
};
