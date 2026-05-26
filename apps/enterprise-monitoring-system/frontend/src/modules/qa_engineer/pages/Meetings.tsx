import React, { useState, useContext } from 'react';
import { UsersRound, Video, Plus, Clock, Calendar, User } from 'lucide-react';
import { useMeetings } from '../data/hooks';
import { Modal } from '../components/Modal';
import { QaShellContext } from '../layout/QaShell';
import type { Meeting } from '../data/types';

const typeColors: Record<string, string> = {
  'Daily': 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-900/30',
  'Weekly': 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-900/30',
  'Ad-hoc': 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-900/30',
};

export const Meetings: React.FC = () => {
  const { meetings, addMeeting } = useMeetings();
  const { addToast } = useContext(QaShellContext);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({ title: '', type: 'Daily' as Meeting['type'], time: '10:00', duration: '30', date: '', description: '' });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.date) { addToast('Please fill in required fields', 'error'); return; }
    addMeeting({
      title: formData.title, type: formData.type, time: formData.time, duration: `${formData.duration} min`,
      date: formData.date, description: formData.description, participants: 0, organizer: 'Alex Mercer',
    });
    addToast('Meeting scheduled', 'success');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Meetings</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Bug Triage and QA Sync Calendar</p>
        </div>
        <button onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-xl text-sm font-bold shadow-md shadow-violet-600/20 transition-all active:scale-95">
          <Plus className="w-4 h-4" /> Schedule Meeting
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {meetings.map(meeting => (
          <div key={meeting.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${meeting.type === 'Daily' ? 'bg-indigo-50 dark:bg-indigo-900/20' : meeting.type === 'Weekly' ? 'bg-purple-50 dark:bg-purple-900/20' : 'bg-amber-50 dark:bg-amber-900/20'}`}>
                <UsersRound className={`w-6 h-6 ${meeting.type === 'Daily' ? 'text-indigo-500' : meeting.type === 'Weekly' ? 'text-purple-500' : 'text-amber-500'}`} />
              </div>
              <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border ${typeColors[meeting.type]}`}>{meeting.type}</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1">{meeting.title}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">{meeting.description}</p>
            <div className="space-y-2 mb-5">
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <Clock className="w-3.5 h-3.5" /> {meeting.time} · {meeting.duration}
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <Calendar className="w-3.5 h-3.5" /> {meeting.date}
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <User className="w-3.5 h-3.5" /> {meeting.organizer}
              </div>
            </div>
            <button className="w-full px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-bold shadow-md shadow-indigo-600/20 transition-all active:scale-95 flex items-center justify-center gap-2">
              <Video className="w-4 h-4" /> Join Call
            </button>
          </div>
        ))}
      </div>

      <Modal open={showAddModal} onClose={() => setShowAddModal(false)} title="Schedule Meeting">
        <form onSubmit={handleAdd} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">Title *</label>
            <input type="text" value={formData.title} onChange={e => setFormData(p => ({ ...p, title: e.target.value }))}
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/30 text-slate-900 dark:text-slate-100" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">Type</label>
              <select value={formData.type} onChange={e => setFormData(p => ({ ...p, type: e.target.value as Meeting['type'] }))}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/30 text-slate-900 dark:text-slate-100 cursor-pointer">
                <option value="Daily">Daily Standup</option>
                <option value="Weekly">Weekly Sync</option>
                <option value="Ad-hoc">Ad-hoc</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">Date *</label>
              <input type="date" value={formData.date} onChange={e => setFormData(p => ({ ...p, date: e.target.value }))}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/30 text-slate-900 dark:text-slate-100" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">Time</label>
              <input type="time" value={formData.time} onChange={e => setFormData(p => ({ ...p, time: e.target.value }))}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/30 text-slate-900 dark:text-slate-100" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">Duration (min)</label>
              <input type="number" value={formData.duration} onChange={e => setFormData(p => ({ ...p, duration: e.target.value }))}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/30 text-slate-900 dark:text-slate-100" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">Description</label>
            <textarea value={formData.description} onChange={e => setFormData(p => ({ ...p, description: e.target.value }))} rows={2}
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/30 text-slate-900 dark:text-slate-100 resize-none" />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setShowAddModal(false)}
              className="px-5 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">Cancel</button>
            <button type="submit"
              className="px-5 py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-xl text-sm font-bold shadow-md shadow-violet-600/20 transition-all active:scale-95">
              <Plus className="w-4 h-4 inline mr-1.5" /> Schedule
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
