import React from 'react';
import { Settings, Shield, Bell, Users, Key, Webhook, Save, Globe } from 'lucide-react';

export const DevOpsSettings: React.FC = () => {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-slate-500/10 rounded-xl">
            <Settings className="w-6 h-6 text-slate-400" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white tracking-wide">Platform Settings</h2>
            <p className="text-slate-400 text-sm mt-1 font-medium">Configure global platform integrations and access controls</p>
          </div>
        </div>
        <button className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 transition-all flex items-center gap-2">
          <Save className="w-4 h-4" />
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <div className="lg:col-span-1 space-y-2">
          {[
            { id: 'general', label: 'General', icon: Globe, active: true },
            { id: 'security', label: 'Security & Access', icon: Shield, active: false },
            { id: 'alerts', label: 'Alert Routing', icon: Bell, active: false },
            { id: 'api', label: 'API & Webhooks', icon: Webhook, active: false },
            { id: 'team', label: 'Team Management', icon: Users, active: false },
            { id: 'secrets', label: 'Secrets Vault', icon: Key, active: false },
          ].map(nav => (
            <button key={nav.id} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
              nav.active ? 'bg-blue-600 shadow-md shadow-blue-500/20 text-white' : 'bg-slate-900/40 hover:bg-slate-800 text-slate-400 border border-slate-800 hover:text-slate-200'
            }`}>
              <nav.icon className="w-4 h-4" />
              {nav.label}
            </button>
          ))}
        </div>

        {/* Settings Content Area */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-3xl p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-6 border-b border-slate-800 pb-4">General Configuration</h3>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-400">Platform Environment</label>
                  <select className="w-full bg-slate-950/50 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 appearance-none font-medium">
                    <option>Production (prod-cluster-01)</option>
                    <option>Staging (stage-cluster-01)</option>
                    <option>Development (dev-cluster-02)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-400">Default Region</label>
                  <select className="w-full bg-slate-950/50 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 appearance-none font-medium">
                    <option>us-east-1 (N. Virginia)</option>
                    <option>eu-west-1 (Ireland)</option>
                    <option>ap-south-1 (Mumbai)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-400">Telemetry Data Retention</label>
                <div className="flex items-center gap-4">
                  <input type="range" min="1" max="90" defaultValue="30" className="flex-1 accent-blue-500 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer" />
                  <span className="text-white font-bold font-mono bg-slate-800 px-3 py-1 rounded-lg">30 Days</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-bold">Strict Infrastructure Drift Prevention</h4>
                    <p className="text-slate-400 text-xs mt-1">Automatically block manual changes to managed resources (Terraform/Pulumi).</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-bold">Enable AI Auto-Remediation</h4>
                    <p className="text-slate-400 text-xs mt-1">Allow the AI agent to automatically restart crashed pods and scale resources.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                  </label>
                </div>
              </div>

            </div>
          </div>

          <div className="bg-rose-500/5 border border-rose-500/20 rounded-3xl p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-rose-400 mb-2">Danger Zone</h3>
            <p className="text-slate-400 text-sm mb-6">Irreversible and highly destructive actions. Proceed with extreme caution.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-6 py-3 bg-slate-900 border border-rose-500/50 hover:bg-rose-500/20 text-rose-400 font-bold rounded-xl transition-all text-sm">
                Purge Telemetry Cache
              </button>
              <button className="px-6 py-3 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl shadow-lg shadow-rose-500/20 transition-all text-sm">
                Emergency Infrastructure Lockdown
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
