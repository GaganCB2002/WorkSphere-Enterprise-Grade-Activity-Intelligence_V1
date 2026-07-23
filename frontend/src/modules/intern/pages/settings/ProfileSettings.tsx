import React, { useState } from 'react';
import InternPageShell from '../../InternPageShell';
import { motion } from 'framer-motion';
import {
  Save, Mail, Phone, Linkedin, MessageSquare,
  Moon, Globe, Eye, EyeOff
} from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

interface Toggles {
  showEmail: boolean;
  showPhone: boolean;
  showLinkedIn: boolean;
  availableForChat: boolean;
  darkMode: boolean;
}

export default function ProfileSettings() {
  const [toggles, setToggles] = useState<Toggles>({
    showEmail: true,
    showPhone: false,
    showLinkedIn: true,
    availableForChat: true,
    darkMode: false,
  });
  const [language, setLanguage] = useState('English');

  const toggle = (key: keyof Toggles) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    console.log('Saving profile settings:', { toggles, language });
  };

  const settingsRows: Array<{ key: keyof Toggles; label: string; description: string; icon: any }> = [
    { key: 'showEmail', label: 'Show Email', description: 'Display your email on your profile', icon: Mail },
    { key: 'showPhone', label: 'Show Phone', description: 'Display your phone number on your profile', icon: Phone },
    { key: 'showLinkedIn', label: 'Show LinkedIn', description: 'Display your LinkedIn profile link', icon: Linkedin },
    { key: 'availableForChat', label: 'Available for Chat', description: 'Show your online status for messaging', icon: MessageSquare },
    { key: 'darkMode', label: 'Dark Mode', description: 'Toggle dark mode theme across the app', icon: Moon },
  ];

  return (
    <InternPageShell title="Profile Settings" description="Customize your profile">
      <motion.div variants={container} initial="hidden" animate="show" className="max-w-2xl mx-auto">
        <motion.div variants={item} className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl shadow-sm p-6 space-y-6">

          {/* Toggle Switches */}
          <div className="space-y-1">
            {settingsRows.map((row) => {
              const Icon = row.icon;
              return (
                <div key={row.key} className="flex items-center justify-between py-3 px-4 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700/60 text-slate-500 dark:text-slate-300 mt-0.5">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{row.label}</p>
                      <p className="text-xs text-slate-400">{row.description}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => toggle(row.key)}
                    className={`relative w-11 h-6 rounded-full transition-colors ${toggles[row.key] ? 'bg-blue-600' : 'bg-slate-200 dark:bg-slate-700'}`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${toggles[row.key] ? 'translate-x-5' : ''}`}
                    />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Language Selector */}
          <div className="border-t border-slate-100 dark:border-slate-700/60 pt-6">
            <div className="flex items-center gap-3 px-4">
              <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700/60 text-slate-500 dark:text-slate-300">
                <Globe className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">Language</p>
                <p className="text-xs text-slate-400">Choose your preferred language</p>
              </div>
              <select
                value={language}
                onChange={e => setLanguage(e.target.value)}
                className="px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm bg-transparent text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              >
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
                <option value="German">German</option>
                <option value="Japanese">Japanese</option>
              </select>
            </div>
          </div>

          {/* Save Button */}
          <div className="border-t border-slate-100 dark:border-slate-700/60 pt-6 flex justify-end">
            <button
              onClick={handleSave}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-sm"
            >
              <Save className="w-4 h-4" /> Save Changes
            </button>
          </div>

        </motion.div>
      </motion.div>
    </InternPageShell>
  );
}
