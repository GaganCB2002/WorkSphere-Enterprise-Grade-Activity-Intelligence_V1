import React, { useState } from 'react';
import InternPageShell from '../../InternPageShell';
import { motion } from 'framer-motion';
import {
  Save, Bell, MessageSquare, UserCheck, CalendarCheck,
  BookOpen, Megaphone, ClipboardList, Mail, Smartphone, Globe
} from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

interface CategoryPref {
  enabled: boolean;
  email: boolean;
  inApp: boolean;
  push: boolean;
}

type Prefs = Record<string, CategoryPref>;

const categories = [
  { key: 'taskUpdates', label: 'Task Updates', description: 'Notifications about task assignments and changes', icon: ClipboardList },
  { key: 'mentorMessages', label: 'Mentor Messages', description: 'New messages and replies from your mentor', icon: MessageSquare },
  { key: 'leaveApprovals', label: 'Leave Approvals', description: 'Updates on leave request status', icon: UserCheck },
  { key: 'courseReminders', label: 'Course Reminders', description: 'Reminders for upcoming courses and deadlines', icon: BookOpen },
  { key: 'announcements', label: 'Announcements', description: 'Team and company-wide announcements', icon: Megaphone },
  { key: 'meetingReminders', label: 'Meeting Reminders', description: 'Reminders for scheduled meetings', icon: CalendarCheck },
];

export default function NotificationPreferences() {
  const [prefs, setPrefs] = useState<Prefs>(() => {
    const initial: Prefs = {};
    categories.forEach(cat => {
      initial[cat.key] = { enabled: true, email: true, inApp: true, push: false };
    });
    initial.taskUpdates = { enabled: true, email: true, inApp: true, push: true };
    initial.mentorMessages = { enabled: true, email: false, inApp: true, push: true };
    initial.meetingReminders = { enabled: true, email: true, inApp: true, push: true };
    return initial;
  });

  const toggleEnabled = (key: string) => {
    setPrefs(prev => ({ ...prev, [key]: { ...prev[key], enabled: !prev[key].enabled } }));
  };

  const toggleChannel = (key: string, channel: 'email' | 'inApp' | 'push') => {
    setPrefs(prev => ({ ...prev, [key]: { ...prev[key], [channel]: !prev[key][channel] } }));
  };

  const handleSave = () => {
    console.log('Saving notification preferences:', prefs);
  };

  return (
    <InternPageShell title="Notification Preferences" description="Manage your notification settings">
      <motion.div variants={container} initial="hidden" animate="show" className="max-w-3xl mx-auto">
        <motion.div variants={item} className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl shadow-sm p-6 space-y-4">

          {categories.map((cat) => {
            const Icon = cat.icon;
            const pref = prefs[cat.key];

            return (
              <div
                key={cat.key}
                className={`rounded-xl border p-4 transition-all ${
                  pref.enabled
                    ? 'border-slate-200 dark:border-slate-700/60 bg-white dark:bg-slate-800/30'
                    : 'border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/10 opacity-60'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${pref.enabled ? 'bg-blue-100 dark:bg-blue-500/10 text-blue-600' : 'bg-slate-100 dark:bg-slate-700/60 text-slate-400'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{cat.label}</p>
                      <p className="text-xs text-slate-400">{cat.description}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleEnabled(cat.key)}
                    className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ${pref.enabled ? 'bg-blue-600' : 'bg-slate-200 dark:bg-slate-700'}`}
                  >
                    <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${pref.enabled ? 'translate-x-5' : ''}`} />
                  </button>
                </div>

                {pref.enabled && (
                  <div className="flex items-center gap-4 ml-12 pl-3 border-l-2 border-blue-200 dark:border-blue-500/30">
                    <label className="flex items-center gap-1.5 text-xs text-slate-500 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={pref.email}
                        onChange={() => toggleChannel(cat.key, 'email')}
                        className="rounded border-slate-300 dark:border-slate-600 text-blue-600 focus:ring-blue-500 w-3.5 h-3.5"
                      />
                      <Mail className="w-3.5 h-3.5" /> Email
                    </label>
                    <label className="flex items-center gap-1.5 text-xs text-slate-500 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={pref.inApp}
                        onChange={() => toggleChannel(cat.key, 'inApp')}
                        className="rounded border-slate-300 dark:border-slate-600 text-blue-600 focus:ring-blue-500 w-3.5 h-3.5"
                      />
                      <Smartphone className="w-3.5 h-3.5" /> In-App
                    </label>
                    <label className="flex items-center gap-1.5 text-xs text-slate-500 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={pref.push}
                        onChange={() => toggleChannel(cat.key, 'push')}
                        className="rounded border-slate-300 dark:border-slate-600 text-blue-600 focus:ring-blue-500 w-3.5 h-3.5"
                      />
                      <Globe className="w-3.5 h-3.5" /> Push
                    </label>
                  </div>
                )}
              </div>
            );
          })}

          {/* Save */}
          <div className="flex justify-end pt-2">
            <button
              onClick={handleSave}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-sm"
            >
              <Save className="w-4 h-4" /> Save Preferences
            </button>
          </div>

        </motion.div>
      </motion.div>
    </InternPageShell>
  );
}
