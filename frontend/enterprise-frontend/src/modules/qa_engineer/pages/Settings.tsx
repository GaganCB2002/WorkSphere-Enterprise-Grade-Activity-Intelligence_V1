import React, { useContext } from 'react';
import { Settings as SettingsIcon, Bell, Shield, Smartphone, Mail, UserCheck, Target, Save } from 'lucide-react';
import { useSettings } from '../data/hooks';
import { QaShellContext } from '../layout/QaShell';

export const Settings: React.FC = () => {
  const { settings, updateSetting } = useSettings();
  const { addToast } = useContext(QaShellContext);

  const handleToggle = (key: string) => {
    updateSetting(key, !settings[key]);
    addToast(`₹${key.replace(/([A-Z])/g, ' ₹1').replace(/^./, s => s.toUpperCase())} ${settings[key] ? 'disabled' : 'enabled'}`, 'success');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Settings</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Configure QA environments, device farms, and notifications</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-5 flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-violet-500" />
            Test Environment
          </h2>
          <div className="space-y-4">
            <div className="p-4 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
                  <Smartphone className="w-5 h-5 text-slate-500" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">Default Device Farm</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Target devices for automated mobile E2E tests</p>
                </div>
              </div>
              <select value={settings.deviceFarm} onChange={e => { updateSetting('deviceFarm', e.target.value); addToast(`Device farm set to ${e.target.value}`, 'success'); }}
                className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-900 dark:text-slate-100 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-violet-500/30 cursor-pointer">
                <option value="AWS Device Farm">AWS Device Farm</option>
                <option value="BrowserStack">BrowserStack</option>
                <option value="Sauce Labs">Sauce Labs</option>
              </select>
            </div>

            <div className="p-4 border border-slate-200 dark:border-slate-800 rounded-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
                    <Target className="w-5 h-5 text-slate-500" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">Sprint Velocity Target</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Points per sprint per engineer</p>
                  </div>
                </div>
                <input type="number" value={settings.sprintVelocityTarget} onChange={e => { updateSetting('sprintVelocityTarget', parseInt(e.target.value)); addToast('Velocity target updated', 'success'); }}
                  className="w-20 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-900 dark:text-slate-100 rounded-xl px-3 py-2.5 text-center focus:outline-none focus:ring-2 focus:ring-violet-500/30" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-5 flex items-center gap-2">
            <Bell className="w-5 h-5 text-amber-500" />
            Notifications & Routing
          </h2>
          <div className="space-y-4">
            {[
              { key: 'alertRouting', icon: Bell, label: 'Alert Routing', desc: 'Send P1 critical bugs directly to Slack channel' },
              { key: 'emailNotifications', icon: Mail, label: 'Email Notifications', desc: 'Receive daily test summary via email' },
              { key: 'autoAssignBugs', icon: UserCheck, label: 'Auto-Assign Bugs', desc: 'Automatically assign bugs based on module expertise' },
            ].map(item => (
              <div key={item.key} className="p-4 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
                    <item.icon className="w-5 h-5 text-slate-500" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">{item.label}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{item.desc}</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={settings[item.key]} onChange={() => handleToggle(item.key)} />
                  <div className="w-11 h-6 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-violet-600" />
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-5 flex items-center gap-2">
            <Shield className="w-5 h-5 text-purple-500" />
            QA Governance & Compliance
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: 'Required Reviews', value: '2', desc: 'Minimum peer reviews before merge' },
              { label: 'Test Threshold', value: '80%', desc: 'Minimum coverage for release' },
              { label: 'Retention Period', value: '90 days', desc: 'Test artifact retention' },
            ].map((item, i) => (
              <div key={i} className="p-4 border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-800/30">
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">{item.label}</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-1">{item.value}</p>
                <p className="text-[10px] text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end">
            <button onClick={() => addToast('Settings saved successfully', 'success')}
              className="px-6 py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-xl text-sm font-bold shadow-md shadow-violet-600/20 transition-all active:scale-95 flex items-center gap-2">
              <Save className="w-4 h-4" /> Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
