import React, { useState } from 'react';
import { Bell, Shield, Lock, Eye, Moon, Globe } from 'lucide-react';
import { EmployeePageLayout } from '../components/EmployeePageLayout';
import { GlassPanel } from '../components/ui/GlassPanel';

function Toggle({ enabled, onChange, label }: { enabled: boolean; onChange: (v: boolean) => void; label?: string }) {
  return (
    <button
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors flex-shrink-0 ${enabled ? 'bg-brand-600' : 'bg-slate-300 dark:bg-slate-600'}`}
    >
      <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow-sm transition-transform ${enabled ? 'translate-x-4.5' : 'translate-x-0.5'}`} style={{ transform: enabled ? 'translateX(18px)' : 'translateX(2px)' }} />
    </button>
  );
}

function Select({ value, options, onChange }: { value: string; options: { value: string; label: string }[]; onChange: (v: string) => void }) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className="px-3 py-1.5 text-xs font-semibold bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 transition-all cursor-pointer outline-none"
    >
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  );
}

export function SettingsPage() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    weeklyDigest: false,
    desktopAlerts: true,
  });

  const [privacy, setPrivacy] = useState({
    profileVisibility: true,
    onlineStatus: true,
    activitySharing: false,
  });

  const [preferences, setPreferences] = useState({
    language: 'en',
    timezone: 'utc-5',
    theme: 'system',
  });

  const [twoFactor, setTwoFactor] = useState(false);

  return (
    <EmployeePageLayout
      title="Settings"
      description="Manage your account preferences and notification settings"
      breadcrumbs={[{ label: 'Employee', href: '/employee/dashboard' }, { label: 'Settings' }]}
    >
      <div className="max-w-3xl mx-auto space-y-6">
        <GlassPanel className="p-6">
          <div className="flex items-center gap-2 mb-5">
            <Bell className="w-4 h-4 text-brand-500" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Notifications</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">Email Notifications</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Receive updates via email</p>
              </div>
              <Toggle enabled={notifications.email} onChange={v => setNotifications(p => ({ ...p, email: v }))} />
            </div>
            <div className="h-px bg-slate-200/60 dark:bg-white/[0.06]" />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">Push Notifications</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Get push notifications on your devices</p>
              </div>
              <Toggle enabled={notifications.push} onChange={v => setNotifications(p => ({ ...p, push: v }))} />
            </div>
            <div className="h-px bg-slate-200/60 dark:bg-white/[0.06]" />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">Weekly Digest</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Receive a weekly summary of your activity</p>
              </div>
              <Toggle enabled={notifications.weeklyDigest} onChange={v => setNotifications(p => ({ ...p, weeklyDigest: v }))} />
            </div>
            <div className="h-px bg-slate-200/60 dark:bg-white/[0.06]" />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">Desktop Alerts</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Show desktop notifications for important updates</p>
              </div>
              <Toggle enabled={notifications.desktopAlerts} onChange={v => setNotifications(p => ({ ...p, desktopAlerts: v }))} />
            </div>
          </div>
        </GlassPanel>

        <GlassPanel className="p-6">
          <div className="flex items-center gap-2 mb-5">
            <Eye className="w-4 h-4 text-purple-500" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Privacy</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">Profile Visibility</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Make your profile visible to teammates</p>
              </div>
              <Toggle enabled={privacy.profileVisibility} onChange={v => setPrivacy(p => ({ ...p, profileVisibility: v }))} />
            </div>
            <div className="h-px bg-slate-200/60 dark:bg-white/[0.06]" />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">Online Status</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Show when you are online</p>
              </div>
              <Toggle enabled={privacy.onlineStatus} onChange={v => setPrivacy(p => ({ ...p, onlineStatus: v }))} />
            </div>
            <div className="h-px bg-slate-200/60 dark:bg-white/[0.06]" />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">Activity Sharing</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Share your activity status with your team</p>
              </div>
              <Toggle enabled={privacy.activitySharing} onChange={v => setPrivacy(p => ({ ...p, activitySharing: v }))} />
            </div>
          </div>
        </GlassPanel>

        <GlassPanel className="p-6">
          <div className="flex items-center gap-2 mb-5">
            <Moon className="w-4 h-4 text-indigo-500" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Preferences</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-slate-400" />
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">Language</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Choose your preferred language</p>
                </div>
              </div>
              <Select
                value={preferences.language}
                options={[
                  { value: 'en', label: 'English' },
                  { value: 'es', label: 'Spanish' },
                  { value: 'fr', label: 'French' },
                  { value: 'de', label: 'German' },
                  { value: 'ja', label: 'Japanese' },
                ]}
                onChange={v => setPreferences(p => ({ ...p, language: v }))}
              />
            </div>
            <div className="h-px bg-slate-200/60 dark:bg-white/[0.06]" />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-slate-400" />
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">Timezone</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Set your local timezone</p>
                </div>
              </div>
              <Select
                value={preferences.timezone}
                options={[
                  { value: 'utc-8', label: 'PST (UTC-8)' },
                  { value: 'utc-7', label: 'MST (UTC-7)' },
                  { value: 'utc-6', label: 'CST (UTC-6)' },
                  { value: 'utc-5', label: 'EST (UTC-5)' },
                  { value: 'utc+0', label: 'GMT (UTC+0)' },
                  { value: 'utc+1', label: 'CET (UTC+1)' },
                  { value: 'utc+5:30', label: 'IST (UTC+5:30)' },
                  { value: 'utc+8', label: 'CST (UTC+8)' },
                  { value: 'utc+9', label: 'JST (UTC+9)' },
                ]}
                onChange={v => setPreferences(p => ({ ...p, timezone: v }))}
              />
            </div>
            <div className="h-px bg-slate-200/60 dark:bg-white/[0.06]" />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Moon className="w-4 h-4 text-slate-400" />
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">Theme</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Choose your interface theme</p>
                </div>
              </div>
              <Select
                value={preferences.theme}
                options={[
                  { value: 'light', label: 'Light' },
                  { value: 'dark', label: 'Dark' },
                  { value: 'system', label: 'System' },
                ]}
                onChange={v => setPreferences(p => ({ ...p, theme: v }))}
              />
            </div>
          </div>
        </GlassPanel>

        <GlassPanel className="p-6">
          <div className="flex items-center gap-2 mb-5">
            <Shield className="w-4 h-4 text-rose-500" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Account</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-slate-400" />
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">Change Password</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Update your account password</p>
                </div>
              </div>
              <button className="px-4 py-1.5 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-lg transition-colors">
                Change
              </button>
            </div>
            <div className="h-px bg-slate-200/60 dark:bg-white/[0.06]" />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-slate-400" />
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">Two-Factor Authentication</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Add an extra layer of security to your account</p>
                </div>
              </div>
              <Toggle enabled={twoFactor} onChange={setTwoFactor} />
            </div>
          </div>
        </GlassPanel>
      </div>
    </EmployeePageLayout>
  );
}

export default SettingsPage;
