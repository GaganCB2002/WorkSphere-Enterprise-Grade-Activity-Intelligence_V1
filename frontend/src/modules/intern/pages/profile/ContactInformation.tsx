import React from 'react';
import InternPageShell from '../../InternPageShell';
import { motion } from 'framer-motion';
import { Mail, Phone, PhoneCall, MapPin, Linkedin, Github, Save } from 'lucide-react';

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

interface ContactFieldProps {
  label: string;
  icon: React.ElementType;
  value: string;
  type?: string;
  subtitle?: string;
}

function ContactField({ label, icon: Icon, value, type = 'text', subtitle }: ContactFieldProps) {
  return (
    <div>
      <label className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
        <Icon className="w-3.5 h-3.5" />
        {label}
      </label>
      <input
        type={type}
        defaultValue={value}
        className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-lg text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
      />
      {subtitle && <p className="text-xs text-slate-400 mt-1">{subtitle}</p>}
    </div>
  );
}

export default function ContactInformation() {
  return (
    <InternPageShell
      title="Contact Information"
      description="Manage your contact details"
      breadcrumbs={[
        { label: 'Intern Dashboard', path: '/intern/dashboard' },
        { label: 'Profile' },
        { label: 'Contact Information' },
      ]}
    >
      <motion.div variants={container} initial="hidden" animate="show" className="max-w-3xl space-y-6">

        <motion.div variants={item} className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl p-6 shadow-sm">
          <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider mb-5">Contact Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <ContactField label="Email Address" icon={Mail} value="elena.rostova@sahara.com" type="email" subtitle="Primary email for official communication" />
            <ContactField label="Phone Number" icon={Phone} value="+91 98765 43210" type="tel" />
            <ContactField label="Alternate Phone" icon={PhoneCall} value="+91 87654 32109" type="tel" />
            <div className="md:col-span-2">
              <ContactField label="Current Address" icon={MapPin} value="B-204, Sunshine Apartments, HSR Layout, Bangalore - 560102" />
            </div>
            <div className="md:col-span-2">
              <ContactField label="Permanent Address" icon={MapPin} value="House No. 42, Gandhi Nagar, Mysore - 570001" />
            </div>
            <ContactField label="LinkedIn Profile" icon={Linkedin} value="https://linkedin.com/in/elena-rostova" />
            <ContactField label="GitHub Profile" icon={Github} value="https://github.com/elena-rostova" />
          </div>
        </motion.div>

        <motion.div variants={item} className="flex items-center justify-end">
          <div className="relative group">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-all shadow-sm">
              <Save className="w-4 h-4" />
              Save Changes
            </button>
            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              Update your contact information
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800" />
            </div>
          </div>
        </motion.div>

      </motion.div>
    </InternPageShell>
  );
}
