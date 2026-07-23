import React, { useState } from 'react';
import InternPageShell from '../../InternPageShell';
import { motion } from 'framer-motion';
import {
  Send, X, Upload, AlertCircle, Monitor, HeartHandshake,
  Building2, FileText
} from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const categories = [
  { value: 'IT', label: 'IT Support', icon: Monitor },
  { value: 'HR', label: 'HR Support', icon: HeartHandshake },
  { value: 'Admin', label: 'Administration', icon: Building2 },
];

const priorities = ['Low', 'Medium', 'High', 'Urgent'];

interface FormData {
  category: string;
  subject: string;
  description: string;
  priority: string;
  attachment: File | null;
}

export default function RaiseTicket() {
  const [form, setForm] = useState<FormData>({
    category: 'IT',
    subject: '',
    description: '',
    priority: 'Medium',
    attachment: null,
  });
  const [fileName, setFileName] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setForm(prev => ({ ...prev, attachment: file }));
      setFileName(file.name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Ticket submitted:', form);
  };

  return (
    <InternPageShell title="Raise a Ticket" description="Submit a support request">
      <motion.div variants={container} initial="hidden" animate="show" className="max-w-2xl mx-auto">
        <motion.div variants={item} className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl shadow-sm p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">Category *</label>
              <div className="grid grid-cols-3 gap-3">
                {categories.map(cat => {
                  const Icon = cat.icon;
                  const isSelected = form.category === cat.value;
                  return (
                    <button
                      key={cat.value}
                      type="button"
                      onClick={() => setForm(prev => ({ ...prev, category: cat.value }))}
                      className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                        isSelected
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300'
                          : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600'
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                      <span className="text-xs font-semibold">{cat.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Subject */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1.5">Subject *</label>
              <input
                type="text"
                value={form.subject}
                onChange={e => setForm(prev => ({ ...prev, subject: e.target.value }))}
                placeholder="Brief title of your issue"
                className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-lg text-sm bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
                <FileText className="w-3.5 h-3.5 inline mr-1" /> Description *
              </label>
              <textarea
                value={form.description}
                onChange={e => setForm(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe your issue in detail..."
                rows={5}
                className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-lg text-sm bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors resize-none"
                required
              />
            </div>

            {/* Priority */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
                <AlertCircle className="w-3.5 h-3.5 inline mr-1" /> Priority *
              </label>
              <div className="flex gap-2">
                {priorities.map(p => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setForm(prev => ({ ...prev, priority: p }))}
                    className={`flex-1 px-3 py-2 rounded-lg text-sm font-semibold transition-all border ${
                      form.priority === p
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 shadow-sm'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/40'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Attachment */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
                <Upload className="w-3.5 h-3.5 inline mr-1" /> Attachment
              </label>
              <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg p-4 text-center hover:border-blue-400 dark:hover:border-blue-500 transition-colors">
                <input
                  type="file"
                  id="file-upload"
                  onChange={handleFileChange}
                  className="hidden"
                  accept=".jpg,.jpeg,.png,.pdf,.doc,.docx,.txt"
                />
                {fileName ? (
                  <div className="flex items-center justify-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                    <Upload className="w-4 h-4 text-blue-500" />
                    <span className="font-medium">{fileName}</span>
                    <button
                      type="button"
                      onClick={() => { setForm(prev => ({ ...prev, attachment: null })); setFileName(''); }}
                      className="text-slate-400 hover:text-rose-500 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Upload className="w-6 h-6 text-slate-400 mx-auto mb-1" />
                    <p className="text-sm text-slate-500 font-medium">
                      <span className="text-blue-600 hover:text-blue-700">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-slate-400 mt-1">JPG, PNG, PDF, DOC up to 10MB</p>
                  </label>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                className="px-6 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-sm"
              >
                <Send className="w-4 h-4" /> Submit Ticket
              </button>
              <button
                type="button"
                onClick={() => setForm({ category: 'IT', subject: '', description: '', priority: 'Medium', attachment: null })}
                className="px-6 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center gap-2"
              >
                <X className="w-4 h-4" /> Cancel
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </InternPageShell>
  );
}
