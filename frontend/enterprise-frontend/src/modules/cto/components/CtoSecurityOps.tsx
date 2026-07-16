import React from 'react';
import { ShieldAlert, ShieldCheck, AlertTriangle } from 'lucide-react';

export const CtoSecurityOps: React.FC = () => {
  return (
    <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6 lg:p-8 shadow-2xl mb-8">
      <div className="border-b border-slate-800 pb-4 mb-6 flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold text-white">Security Operations Center</h3>
          <p className="text-slate-400 text-xs mt-1">Live threat intelligence and vulnerability scanning</p>
        </div>
        <div className="px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center gap-2">
          <ShieldCheck className="w-4 h-4" />
          SOC 2 Compliant
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 flex items-center justify-between group hover:border-slate-600 transition-colors">
          <div>
            <p className="text-slate-400 text-xs font-bold mb-1">Active Threats</p>
            <p className="text-3xl font-extrabold text-white">0</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 flex items-center justify-between group hover:border-slate-600 transition-colors">
          <div>
            <p className="text-slate-400 text-xs font-bold mb-1">Open Vulnerabilities</p>
            <p className="text-3xl font-extrabold text-amber-400">12</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-amber-400" />
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 flex items-center justify-between group hover:border-slate-600 transition-colors">
          <div>
            <p className="text-slate-400 text-xs font-bold mb-1">Critical Intrusions (24h)</p>
            <p className="text-3xl font-extrabold text-white">0</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-rose-500/10 flex items-center justify-center">
            <ShieldAlert className="w-6 h-6 text-rose-400" />
          </div>
        </div>
      </div>
    </div>
  );
};
