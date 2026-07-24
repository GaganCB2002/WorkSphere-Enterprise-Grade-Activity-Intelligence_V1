import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Bell, Shield, Palette, Key, Puzzle, Save } from 'lucide-react';
import CtoPageShell from '../CtoPageShell';

const sections = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'theme', label: 'Theme', icon: Palette },
  { id: 'api', label: 'API Keys', icon: Key },
  { id: 'integrations', label: 'Integrations', icon: Puzzle },
];

const SettingsPage = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const [apiKeys] = useState([
    { name: 'Production API Key', key: 'sk-prod-••••••••••••••••', created: 'Jan 2025', lastUsed: '2 min ago' },
    { name: 'GitBranch API Key', key: 'sk-GitBranch-••••••••••••••', created: 'Mar 2025', lastUsed: '1 hr ago' },
    { name: 'Development Key', key: 'sk-dev-••••••••••••••••••', created: 'Jun 2025', lastUsed: '1 day ago' },
  ]);

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-4 pb-4 border-b border-slate-200 dark:border-slate-700">
              <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 text-xl font-bold">CT</div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Dr. Sarah Chen</h3>
                <p className="text-sm text-slate-500">Chief Technology Officer</p>
                <p className="text-sm text-slate-400">sarah.chen@worksphere.com</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['Phone', 'Location', 'Time Zone', 'Department'].map((field) => (
                <div key={field}>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{field}</label>
                  <div className="mt-1 px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-lg text-sm text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    {field === 'Phone' && '+1 (555) 123-4567'}
                    {field === 'Location' && 'San Francisco, CA'}
                    {field === 'Time Zone' && 'PST (UTC-8)'}
                    {field === 'Department' && 'Engineering / CTO Office'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'notifications':
        return (
          <div className="space-y-4">
            {[
              { label: 'Email Notifications', desc: 'Receive notifications via email' },
              { label: 'Push Notifications', desc: 'Receive browser push notifications' },
              { label: 'SLA Breach Alerts', desc: 'Immediate alerts for SLA breaches' },
              { label: 'Weekly Digest', desc: 'Weekly summary of key metrics' },
              { label: 'Incident Reports', desc: 'Notifications for new incidents' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{item.label}</p>
                  <p className="text-xs text-slate-500">{item.desc}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked={i < 3} className="sr-only peer" />
                  <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600" />
                </label>
              </div>
            ))}
          </div>
        );
      case 'security':
        return (
          <div className="space-y-4">
            {[
              { label: 'Two-Factor Authentication', desc: 'Add extra security to your account', enabled: true },
              { label: 'Single Sign-On (SSO)', desc: 'Use corporate SSO for login', enabled: true },
              { label: 'Session Timeout', desc: 'Auto-logout after 30 minutes', enabled: false },
              { label: 'IP Allowlisting', desc: 'Restrict access to trusted IPs', enabled: false },
              { label: 'Audit Logging', desc: 'Track all account activity', enabled: true },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{item.label}</p>
                  <p className="text-xs text-slate-500">{item.desc}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked={item.enabled} className="sr-only peer" />
                  <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600" />
                </label>
              </div>
            ))}
          </div>
        );
      case 'theme':
        return (
          <div className="space-y-4">
            <p className="text-sm text-slate-500">Choose your preferred theme appearance.</p>
            <div className="grid grid-cols-3 gap-3">
              {['Light', 'Dark', 'System'].map((t) => (
                <button key={t} className="p-4 rounded-xl border-2 border-slate-200 dark:border-slate-700 hover:border-blue-500 transition-colors text-center">
                  <div className={`w-full h-16 rounded-lg mb-2 ${t === 'Light' ? 'bg-white border' : t === 'Dark' ? 'bg-slate-800' : 'bg-gradient-to-r from-white to-slate-800 border'}`} />
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{t}</span>
                </button>
              ))}
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Accent Color</label>
              <div className="flex gap-2 mt-2">
                {['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#ec4899'].map((c) => (
                  <button key={c} className="w-8 h-8 rounded-full border-2 border-transparent hover:border-slate-300 transition-colors" style={{ backgroundColor: c }} />
                ))}
              </div>
            </div>
          </div>
        );
      case 'api':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-500">API keys for programmatic access to CTO dashboards.</p>
              <button className="px-3 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-500 transition-colors">+ Generate Key</button>
            </div>
            {apiKeys.map((ak, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                <div>
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{ak.name}</p>
                  <p className="text-xs text-slate-400 font-mono">{ak.key}</p>
                  <p className="text-xs text-slate-400 mt-0.5">Created: {ak.created} • Last used: {ak.lastUsed}</p>
                </div>
                <button className="text-xs text-red-600 hover:text-red-500 font-semibold">Revoke</button>
              </div>
            ))}
          </div>
        );
      case 'integrations':
        return (
          <div className="space-y-4">
            {[
              { name: 'Slack', desc: 'Receive notifications in #cto-channel', connected: true },
              { name: 'Jira', desc: 'Sync sprint data and tickets', connected: true },
              { name: 'Datadog', desc: 'Infrastructure monitoring integration', connected: true },
              { name: 'PagerDuty', desc: 'Incident alerting integration', connected: false },
              { name: 'Tableau', desc: 'Report publishing integration', connected: false },
            ].map((int, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                <div>
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{int.name}</p>
                  <p className="text-xs text-slate-500">{int.desc}</p>
                </div>
                <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${int.connected ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-500 border border-slate-200'}`}>
                  {int.connected ? 'Connected' : 'Disconnected'}
                </span>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <CtoPageShell title="Settings" description="Configure CTO dashboard preferences, security, and integrations">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-4">
          <nav className="space-y-1">
            {sections.map((s) => (
              <button key={s.id} onClick={() => setActiveSection(s.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${activeSection === s.id ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                <s.icon className="w-4 h-4" />
                {s.label}
              </button>
            ))}
          </nav>
        </div>
        <div className="lg:col-span-3 bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">{sections.find(s => s.id === activeSection)?.label}</h3>
            <button className="px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-500 transition-colors flex items-center gap-1.5">
              <Save className="w-3.5 h-3.5" /> Save Changes
            </button>
          </div>
          {renderContent()}
        </div>
      </div>
    </CtoPageShell>
  );
};

export default SettingsPage;


