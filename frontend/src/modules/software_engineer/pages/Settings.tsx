// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon, User, Bell, Shield, Palette, Key, Link, Globe, Moon, Sun, Monitor, Smartphone, Mail, CheckCircle2, ChevronRight, ToggleLeft, ToggleRight } from 'lucide-react';

export const Settings = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');
  const [toggles, setToggles] = useState({ emailNotif: true, pushNotif: true, slackNotif: false, darkMode: true, twoFactor: false });

  useEffect(() => {
    fetch('/api/software-engineer/settings')
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-6 space-y-4 animate-pulse"><div className="h-20 bg-[#0F172A]/90 rounded-2xl" /><div className="flex gap-4 h-96"><div className="w-48 bg-[#0F172A]/90 rounded-2xl" /><div className="flex-1 bg-[#0F172A]/90 rounded-2xl" /></div></div>;

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'preferences', label: 'Preferences', icon: Palette },
    { id: 'integrations', label: 'Integrations', icon: Link },
  ];

  const profile = data?.profile || { name: 'Alex D.', email: 'alex.d@worksphere.io', role: 'Senior Software Engineer', team: 'Backend', avatar: 'AD', phone: '+1 (555) 123-4567', timezone: 'UTC-5' };

  const Toggle = ({ enabled, onChange }) => (
    <button onClick={() => onChange(!enabled)} className={`w-10 h-5 rounded-full transition-colors relative ${enabled ? 'bg-indigo-600' : 'bg-slate-700'}`}>
      <div className={`w-4 h-4 rounded-full bg-white absolute top-0.5 transition-all ${enabled ? 'left-5' : 'left-0.5'}`} />
    </button>
  );

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="bg-[#0B0F19] text-slate-100 min-h-screen p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
        <div>
          <div className="text-xs font-semibold text-indigo-400">Software Engineer Workspace</div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2"><SettingsIcon className="w-6 h-6 text-slate-400" /> Settings</h1>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-56 shrink-0 space-y-1">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)}
              className={`w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${activeTab === t.id ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30' : 'text-slate-400 hover:text-white hover:bg-slate-800/50 border border-transparent'}`}>
              <t.icon className="w-4 h-4" />{t.label}
            </button>
          ))}
        </div>

        <div className="flex-1 bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-md">
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="flex items-center gap-4"><div className="w-16 h-16 rounded-full bg-indigo-900 border-2 border-indigo-500/30 flex items-center justify-center text-xl font-bold text-indigo-400">{profile.avatar}</div><div><h2 className="text-lg font-bold text-white">{profile.name}</h2><p className="text-xs text-slate-400">{profile.role}</p></div></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: 'Email', value: profile.email }, { label: 'Phone', value: profile.phone },
                  { label: 'Team', value: profile.team }, { label: 'Timezone', value: profile.timezone },
                ].map(f => <div key={f.label} className="p-3 rounded-xl border border-slate-800/80 bg-[#1E293B]/50"><div className="text-[11px] font-bold text-slate-400 uppercase">{f.label}</div><div className="text-xs font-semibold text-white mt-1">{f.value}</div></div>)}
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-4">
              {[
                { label: 'Email Notifications', desc: 'Receive email updates for task assignments and mentions', key: 'emailNotif' },
                { label: 'Push Notifications', desc: 'Receive push notifications for PR reviews and build results', key: 'pushNotif' },
                { label: 'Slack Integration', desc: 'Send notifications to your Slack workspace', key: 'slackNotif' },
              ].map(n => (
                <div key={n.key} className="flex items-center justify-between p-4 rounded-xl border border-slate-800/80 bg-[#1E293B]/50">
                  <div><h3 className="text-xs font-semibold text-white">{n.label}</h3><p className="text-[10px] text-slate-400">{n.desc}</p></div>
                  <Toggle enabled={toggles[n.key]} onChange={v => setToggles({...toggles, [n.key]: v})} />
                </div>
              ))}
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-4">
              {[
                { label: 'Two-Factor Authentication', desc: 'Add an extra layer of security to your account', key: 'twoFactor' },
                { label: 'Active Sessions', desc: 'Manage your active login sessions' },
                { label: 'API Keys', desc: 'Manage your personal access tokens' },
                { label: 'Change Password', desc: 'Update your account password' },
              ].map(s => (
                <div key={s.label} className="flex items-center justify-between p-4 rounded-xl border border-slate-800/80 bg-[#1E293B]/50">
                  <div><h3 className="text-xs font-semibold text-white">{s.label}</h3><p className="text-[10px] text-slate-400">{s.desc}</p></div>
                  {s.key ? <Toggle enabled={toggles[s.key]} onChange={v => setToggles({...toggles, [s.key]: v})} /> : <ChevronRight className="w-4 h-4 text-slate-400" />}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'preferences' && (
            <div className="space-y-4">
              {[
                { label: 'Dark Mode', desc: 'Use dark theme across the application', key: 'darkMode' },
                { label: 'Language', desc: 'English (United States)' },
                { label: 'Time Format', desc: '12-hour format' },
                { label: 'Week Start', desc: 'Sunday' },
              ].map(p => (
                <div key={p.label} className="flex items-center justify-between p-4 rounded-xl border border-slate-800/80 bg-[#1E293B]/50">
                  <div><h3 className="text-xs font-semibold text-white">{p.label}</h3><p className="text-[10px] text-slate-400">{p.desc}</p></div>
                  {p.key ? <Toggle enabled={toggles[p.key]} onChange={v => setToggles({...toggles, [p.key]: v})} /> : <ChevronRight className="w-4 h-4 text-slate-400" />}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'integrations' && (
            <div className="space-y-4">
              {[
                { name: 'Slack', status: 'Connected', color: 'text-emerald-400' },
                { name: 'Jira', status: 'Connected', color: 'text-emerald-400' },
                { name: 'GitHub', status: 'Connected', color: 'text-emerald-400' },
                { name: 'GitLab', status: 'Not Connected', color: 'text-slate-400' },
                { name: 'Linear', status: 'Not Connected', color: 'text-slate-400' },
              ].map(integ => (
                <div key={integ.name} className="flex items-center justify-between p-4 rounded-xl border border-slate-800/80 bg-[#1E293B]/50">
                  <div className="flex items-center gap-3"><div className="p-2 rounded-lg bg-slate-800/50"><Link className="w-4 h-4 text-indigo-400" /></div><div><h3 className="text-xs font-semibold text-white">{integ.name}</h3><span className={`text-[10px] font-bold ${integ.color}`}>{integ.status}</span></div></div>
                  <button className="text-xs font-semibold text-indigo-400 hover:text-indigo-300">{integ.status === 'Connected' ? 'Configure' : 'Connect'}</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
