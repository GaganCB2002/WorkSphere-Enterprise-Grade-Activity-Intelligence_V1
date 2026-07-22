import React from 'react';
import { Building, Shield, Users } from 'lucide-react';

export const CeoSettings: React.FC = () => {
  return (
    <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6 lg:p-8 shadow-2xl">
      <div className="border-b border-slate-800 pb-4 mb-6">
        <h3 className="text-xl font-bold text-white">Organization Settings</h3>
        <p className="text-slate-400 text-xs mt-1">Manage enterprise platform configurations and user access</p>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900/50 border border-slate-800">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center">
              <Building className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Company Profile</h4>
              <p className="text-xs text-slate-400 mt-0.5">Manage legal entities, subsidiaries, and branding</p>
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
              <h4 className="text-sm font-bold text-white">Global Security Standards</h4>
              <p className="text-xs text-slate-400 mt-0.5">Define enterprise-wide authentication requirements</p>
            </div>
          </div>
          <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-lg transition-colors">
            Manage
          </button>
        </div>

        <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900/50 border border-slate-800">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center">
              <Users className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Executive Access Control</h4>
              <p className="text-xs text-slate-400 mt-0.5">Manage board members and C-Suite permissions</p>
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
