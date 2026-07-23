import React, { useState } from 'react';
import InternPageShell from '../../InternPageShell';
import { motion } from 'framer-motion';
import { Send, X, Users, Clock, Calendar as CalendarIcon, Link, FileText, AlertCircle } from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

interface FormData {
  title: string;
  description: string;
  date: string;
  time: string;
  duration: string;
  attendees: string[];
  location: string;
}

const availableAttendees = [
  'Sarah Chen (Mentor)',
  'Mike Johnson (Senior Dev)',
  'Emily Davis (HR)',
  'Alex Turner (PM)',
  'Lisa Wong (Designer)',
  'David Kim (Intern)',
  'Rachel Patel (Intern)',
];

export default function SchedulePage() {
  const [form, setForm] = useState<FormData>({
    title: '',
    description: '',
    date: '',
    time: '',
    duration: '30',
    attendees: [],
    location: '',
  });
  const [showAttendeeDropdown, setShowAttendeeDropdown] = useState(false);

  const toggleAttendee = (name: string) => {
    setForm(prev => ({
      ...prev,
      attendees: prev.attendees.includes(name)
        ? prev.attendees.filter(a => a !== name)
        : [...prev.attendees, name],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Schedule meeting:', form);
  };

  const handleCancel = () => {
    setForm({ title: '', description: '', date: '', time: '', duration: '30', attendees: [], location: '' });
  };

  return (
    <InternPageShell title="Schedule Meeting" description="Schedule a new meeting">
      <motion.div variants={container} initial="hidden" animate="show" className="max-w-3xl mx-auto">
        <motion.div variants={item} className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl shadow-sm p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1.5">Meeting Title *</label>
              <input
                type="text"
                value={form.title}
                onChange={e => setForm(prev => ({ ...prev, title: e.target.value }))}
                placeholder="e.g. Sprint Planning"
                className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-lg text-sm bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1.5">Description</label>
              <textarea
                value={form.description}
                onChange={e => setForm(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Meeting agenda and details..."
                rows={4}
                className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-lg text-sm bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors resize-none"
              />
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
                  <CalendarIcon className="w-3.5 h-3.5 inline mr-1" /> Date *
                </label>
                <input
                  type="date"
                  value={form.date}
                  onChange={e => setForm(prev => ({ ...prev, date: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-lg text-sm bg-transparent text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
                  <Clock className="w-3.5 h-3.5 inline mr-1" /> Time *
                </label>
                <input
                  type="time"
                  value={form.time}
                  onChange={e => setForm(prev => ({ ...prev, time: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-lg text-sm bg-transparent text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1.5">Duration *</label>
                <select
                  value={form.duration}
                  onChange={e => setForm(prev => ({ ...prev, duration: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-lg text-sm bg-transparent text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                >
                  <option value="15">15 min</option>
                  <option value="30">30 min</option>
                  <option value="45">45 min</option>
                  <option value="60">1 hour</option>
                  <option value="90">1.5 hours</option>
                  <option value="120">2 hours</option>
                </select>
              </div>
            </div>

            {/* Attendees */}
            <div className="relative">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
                <Users className="w-3.5 h-3.5 inline mr-1" /> Attendees
              </label>
              <div
                onClick={() => setShowAttendeeDropdown(!showAttendeeDropdown)}
                className="w-full min-h-[42px] px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm bg-transparent cursor-pointer flex flex-wrap gap-1.5 items-center"
              >
                {form.attendees.length === 0 ? (
                  <span className="text-slate-400">Select attendees...</span>
                ) : (
                  form.attendees.map(a => (
                    <span key={a} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 text-xs font-semibold">
                      {a.split('(')[0].trim()}
                      <button
                        type="button"
                        onClick={e => { e.stopPropagation(); toggleAttendee(a); }}
                        className="hover:text-blue-900 dark:hover:text-blue-100"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                      )))}
                </div>
              {showAttendeeDropdown && (
                <div className="absolute z-10 mt-1 w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg p-2 max-h-48 overflow-y-auto">
                  {availableAttendees.map(a => (
                    <label
                      key={a}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/40 cursor-pointer text-sm text-slate-700 dark:text-slate-200"
                    >
                      <input
                        type="checkbox"
                        checked={form.attendees.includes(a)}
                        onChange={() => toggleAttendee(a)}
                        className="rounded border-slate-300 dark:border-slate-600 text-blue-600 focus:ring-blue-500"
                      />
                      {a}
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Location / Video Link */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
                <Link className="w-3.5 h-3.5 inline mr-1" /> Location / Video Link
              </label>
              <input
                type="text"
                value={form.location}
                onChange={e => setForm(prev => ({ ...prev, location: e.target.value }))}
                placeholder="e.g. Conference Room 3 or https://zoom.us/j/..."
                className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-lg text-sm bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                className="px-6 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-sm"
              >
                <Send className="w-4 h-4" /> Schedule Meeting
              </button>
              <button
                type="button"
                onClick={handleCancel}
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
