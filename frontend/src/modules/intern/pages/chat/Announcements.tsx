import React, { useState } from 'react';
import InternPageShell from '../../InternPageShell';
import { motion } from 'framer-motion';
import { Calendar, Filter, CheckCheck, Paperclip, Pin, AlertCircle, Info, Megaphone, ArrowUpRight } from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

interface Announcement {
  id: number;
  title: string;
  postedBy: string;
  date: string;
  content: string;
  priority: 'High' | 'Medium' | 'Low';
  attachments: number;
  read: boolean;
  pinned: boolean;
}

const announcements: Announcement[] = [
  {
    id: 1, title: 'Company Town Hall — Q3 Planning', postedBy: 'CEO Office', date: 'Jul 22, 2026',
    content: 'Join us for the quarterly town hall meeting where we discuss Q3 goals, milestones, and company updates. All employees are expected to attend.',
    priority: 'High', attachments: 2, read: false, pinned: true,
  },
  {
    id: 2, title: 'New Parking Policy Effective August 1st', postedBy: 'HR Department', date: 'Jul 20, 2026',
    content: 'Please review the updated parking policy. All vehicles must display a valid parking permit. Apply for permits through the HR portal.',
    priority: 'Medium', attachments: 1, read: false, pinned: false,
  },
  {
    id: 3, title: 'Intern Project Showcase — Registration Open', postedBy: 'Intern Program', date: 'Jul 18, 2026',
    content: 'The end-of-internship project showcase will be held on August 15th. Register your project by July 30th to participate.',
    priority: 'High', attachments: 0, read: true, pinned: true,
  },
  {
    id: 4, title: 'Office Wi-Fi Upgrade This Weekend', postedBy: 'IT Support', date: 'Jul 16, 2026',
    content: 'The office Wi-Fi network will be upgraded this Saturday from 10 PM to 6 AM. Intermittent connectivity is expected during this period.',
    priority: 'Low', attachments: 0, read: true, pinned: false,
  },
  {
    id: 5, title: 'Wellness Program — Free Yoga Sessions', postedBy: 'Employee Wellness', date: 'Jul 14, 2026',
    content: 'Starting next month, free yoga sessions will be held every Tuesday and Thursday at 8 AM in the recreation room.',
    priority: 'Low', attachments: 1, read: false, pinned: false,
  },
  {
    id: 6, title: 'Code Freeze Announcement for Release v3.2', postedBy: 'Engineering', date: 'Jul 12, 2026',
    content: 'Code freeze for v3.2 release begins on July 25th. All PRs must be merged and tested by July 24th.',
    priority: 'High', attachments: 0, read: false, pinned: false,
  },
];

const priorityColors: Record<string, string> = {
  High: 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400',
  Medium: 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400',
  Low: 'bg-slate-100 text-slate-700 dark:bg-slate-500/10 dark:text-slate-400',
};

const priorityIcons: Record<string, React.ElementType> = {
  High: AlertCircle,
  Medium: Info,
  Low: Megaphone,
};

export default function Announcements() {
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest');
  const [announcementsList, setAnnouncementsList] = useState(announcements);

  const sorted = [...announcementsList]
    .filter(a => priorityFilter === 'All' || a.priority === priorityFilter)
    .sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.date).getTime() - new Date(a.date).getTime();
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });

  const unreadCount = announcementsList.filter(a => !a.read).length;

  const markAllAsRead = () => {
    setAnnouncementsList(prev => prev.map(a => ({ ...a, read: true })));
  };

  const toggleRead = (id: number) => {
    setAnnouncementsList(prev => prev.map(a => a.id === id ? { ...a, read: !a.read } : a));
  };

  return (
    <InternPageShell title="Announcements" description="Company and team announcements"
      actions={
        <button onClick={markAllAsRead}
          className="px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center gap-2 shadow-sm">
          <CheckCheck className="w-4 h-4" /> Mark All Read
        </button>
      }
    >
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
        <motion.div variants={item} className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl p-4 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-500">{unreadCount} unread</span>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400" />
              <select value={priorityFilter} onChange={e => setPriorityFilter(e.target.value)}
                className="px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 focus:outline-none focus:border-blue-500">
                <option value="All">All Priorities</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
              <select value={sortBy} onChange={e => setSortBy(e.target.value as 'newest' | 'oldest')}
                className="px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 focus:outline-none focus:border-blue-500">
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>
          </div>
        </motion.div>

        <div className="space-y-4">
          {sorted.map(a => {
            const PriorityIcon = priorityIcons[a.priority];
            return (
              <motion.div key={a.id} variants={item}
                className={`bg-white dark:bg-slate-800/60 border rounded-xl shadow-sm overflow-hidden transition-colors ${
                  !a.read ? 'border-blue-300 dark:border-blue-500/30' : 'border-slate-200 dark:border-slate-700/60'
                }`}>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        {a.pinned && <Pin className="w-3.5 h-3.5 text-slate-400" />}
                        <h3 className={`text-base ${!a.read ? 'font-extrabold' : 'font-semibold'} text-slate-900 dark:text-white truncate`}>
                          {a.title}
                        </h3>
                        {!a.read && <span className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
                        <span className="font-medium text-slate-500">{a.postedBy}</span>
                        <span>·</span>
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{a.date}</span>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{a.content}</p>
                      <div className="flex items-center gap-3 mt-3">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${priorityColors[a.priority]}`}>
                          <PriorityIcon className="w-3 h-3" /> {a.priority}
                        </span>
                        {a.attachments > 0 && (
                          <span className="flex items-center gap-1 text-xs text-slate-400">
                            <Paperclip className="w-3 h-3" /> {a.attachments} attachment{a.attachments > 1 ? 's' : ''}
                          </span>
                        )}
                      </div>
                    </div>
                    <button onClick={() => toggleRead(a.id)}
                      className={`p-2 rounded-lg transition-colors flex-shrink-0 ${
                        a.read
                          ? 'text-slate-300 hover:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
                          : 'text-blue-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/10'
                      }`}>
                      <CheckCheck className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </InternPageShell>
  );
}
