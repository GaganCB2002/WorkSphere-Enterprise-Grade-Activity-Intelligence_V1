import React, { useState } from 'react';
import InternPageShell from '../../InternPageShell';
import { motion } from 'framer-motion';
import {
  User, Calendar, GitBranch, Droplets, Globe, Heart, Camera,
  Save, Lock, Edit3, Info, CheckCircle
} from 'lucide-react';

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

interface FieldProps {
  label: string;
  icon: React.ElementType;
  value: string;
  editable: boolean;
  type?: string;
}

function FormField({ label, icon: Icon, value, editable, type = 'text' }: FieldProps) {
  return (
    <div>
      <label className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
        <Icon className="w-3.5 h-3.5" />
        {label}
      </label>
      {editable ? (
        <input
          type={type}
          defaultValue={value}
          className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-lg text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
        />
      ) : (
        <p className="px-3.5 py-2.5 text-sm text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-800/30 rounded-lg border border-transparent">
          {value}
        </p>
      )}
    </div>
  );
}

export default function PersonalInformation() {
  const [editing, setEditing] = useState(false);
  const [profilePic, setProfilePic] = useState<string | null>(null);

  const handlePicUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) setProfilePic(URL.createObjectURL(file));
    };
    input.click();
  };

  const fields = [
    { label: 'Full Name', icon: User, value: 'Elena Rostova' },
    { label: 'Date of Birth', icon: Calendar, value: '12 May 2000', type: 'date' },
    { label: 'Gender', icon: GitBranch, value: 'Female' },
    { label: 'Blood Group', icon: Droplets, value: 'O+' },
    { label: 'Nationality', icon: Globe, value: 'Indian' },
    { label: 'Marital Status', icon: Heart, value: 'Single' },
  ];

  return (
    <InternPageShell
      title="Personal Information"
      description="Manage your personal details"
      breadcrumbs={[
        { label: 'Intern Dashboard', path: '/intern/dashboard' },
        { label: 'Profile' },
        { label: 'Personal Information' },
      ]}
    >
      <motion.div variants={container} initial="hidden" animate="show" className="max-w-3xl space-y-6">

        {/* Profile Picture */}
        <motion.div variants={item} className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-6">
            <div className="relative group">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-700 border-2 border-slate-200 dark:border-slate-600">
                {profilePic ? (
                  <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400">
                    <User className="w-10 h-10" />
                  </div>
                )}
              </div>
              <button
                onClick={handlePicUpload}
                className="absolute bottom-0 right-0 p-1.5 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 transition-colors"
                title="Upload profile picture"
              >
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">Profile Photo</h3>
              <p className="text-xs text-slate-400 mt-0.5">JPG, PNG or GIF. Max 2MB.</p>
              <p className="text-xs text-slate-400">Recommended 400x400px</p>
            </div>
          </div>
        </motion.div>

        {/* Form Fields */}
        <motion.div variants={item} className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">Personal Details</h3>
            <button
              onClick={() => setEditing(!editing)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700/60 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/40 transition-colors"
              title={editing ? 'Lock fields' : 'Edit fields'}
            >
              {editing ? <Lock className="w-3.5 h-3.5" /> : <Edit3 className="w-3.5 h-3.5" />}
              {editing ? 'Lock' : 'Edit'}
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {fields.map((f) => (
              <FormField key={f.label} {...f} editable={editing} />
            ))}
          </div>
        </motion.div>

        {/* Save Button */}
        <motion.div variants={item} className="flex items-center justify-end gap-3">
          <div className="relative group">
            <button
              disabled={!editing}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm ${
                editing
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-slate-100 dark:bg-slate-700/60 text-slate-400 cursor-not-allowed'
              }`}
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
            {!editing && (
              <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                Enable edit mode first
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800" />
              </div>
            )}
            {editing && (
              <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-blue-600 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                Save your personal details
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-blue-600" />
              </div>
            )}
          </div>
        </motion.div>

      </motion.div>
    </InternPageShell>
  );
}
