import React, { useState } from 'react';
import InternPageShell from '../../InternPageShell';
import { motion } from 'framer-motion';
import { Inbox, Send, FileText, Archive, Plus, Paperclip, Star, Search, ChevronRight } from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

interface Email {
  id: number;
  sender: string;
  senderEmail: string;
  subject: string;
  preview: string;
  date: string;
  hasAttachments: boolean;
  starred: boolean;
  read: boolean;
  folder: string;
}

const emails: Email[] = [
  { id: 1, sender: 'Sarah Mitchell', senderEmail: 'sarah.m@worksphere.com', subject: 'Q3 Planning Meeting — Agenda', preview: 'Hi team, please find attached the agenda for the Q3 planning meeting scheduled for this Friday...', date: '10:32 AM', hasAttachments: true, starred: true, read: false, folder: 'inbox' },
  { id: 2, sender: 'HR Department', senderEmail: 'hr@worksphere.com', subject: 'Updated Employee Handbook 2026', preview: 'Dear employees, the updated employee handbook is now available. Please review the changes...', date: '9:15 AM', hasAttachments: true, starred: false, read: false, folder: 'inbox' },
  { id: 3, sender: 'Alice Johnson', senderEmail: 'alice.j@worksphere.com', subject: 'PR #142 — Dashboard Component Review', preview: 'Hi, could you please review the dashboard component PR? I have made the changes we discussed...', date: 'Yesterday', hasAttachments: false, starred: false, read: false, folder: 'inbox' },
  { id: 4, sender: 'IT Support', senderEmail: 'it@worksphere.com', subject: 'Your VPN Access Has Been Granted', preview: 'Your VPN access request has been approved. Follow the instructions below to set up your connection...', date: 'Yesterday', hasAttachments: false, starred: false, read: true, folder: 'inbox' },
  { id: 5, sender: 'Mentorship Program', senderEmail: 'mentorship@worksphere.com', subject: 'Weekly Mentor Check-in Reminder', preview: 'This is a reminder for your weekly mentor check-in scheduled for tomorrow at 2 PM...', date: '2 days ago', hasAttachments: false, starred: true, read: true, folder: 'inbox' },
  { id: 6, sender: 'Jane Mentor', senderEmail: 'jane.m@worksphere.com', subject: 'End of Internship Evaluation Process', preview: 'As we near the end of your internship, please complete the self-evaluation form and schedule your final review...', date: '2 days ago', hasAttachments: true, starred: false, read: true, folder: 'inbox' },
  { id: 7, sender: 'You', senderEmail: 'intern@worksphere.com', subject: 'Re: PR #142 — Dashboard Component Review', preview: 'Looks good! I left a couple of comments on the styling. Please update and push again...', date: '10:35 AM', hasAttachments: false, starred: false, read: true, folder: 'sent' },
  { id: 8, sender: 'You', senderEmail: 'intern@worksphere.com', subject: 'Weekly Progress Report — Week 6', preview: 'Dear Jane, Please find attached my weekly progress report for week 6 of my internship...', date: 'Yesterday', hasAttachments: true, starred: false, read: true, folder: 'sent' },
  { id: 9, sender: 'You', senderEmail: 'intern@worksphere.com', subject: 'Draft: Intern Project Proposal', preview: 'Project proposal for the intern showcase event. The project focuses on building an activity dashboard...', date: '3 days ago', hasAttachments: false, starred: false, read: false, folder: 'drafts' },
  { id: 10, sender: 'You', senderEmail: 'intern@worksphere.com', subject: 'Draft: Thank You Note', preview: 'Dear team, I wanted to express my gratitude for the wonderful experience during my internship...', date: '5 days ago', hasAttachments: false, starred: false, read: false, folder: 'drafts' },
  { id: 11, sender: 'Engineering Team', senderEmail: 'eng@worksphere.com', subject: 'Code Freeze Announcement — v3.2', preview: 'Code freeze for v3.2 release begins on July 25th. All pending PRs must be merged by July 24th...', date: '1 week ago', hasAttachments: false, starred: false, read: true, folder: 'archived' },
  { id: 12, sender: 'Events Committee', senderEmail: 'events@worksphere.com', subject: 'Summer Picnic — Save the Date', preview: 'Join us for the annual summer picnic on August 10th at Riverside Park. Families are welcome...', date: '2 weeks ago', hasAttachments: false, starred: false, read: true, folder: 'archived' },
];

const folders = [
  { id: 'inbox', label: 'Inbox', icon: Inbox, count: emails.filter(e => e.folder === 'inbox' && !e.read).length },
  { id: 'sent', label: 'Sent', icon: Send, count: 0 },
  { id: 'drafts', label: 'Drafts', icon: FileText, count: emails.filter(e => e.folder === 'drafts').length },
  { id: 'archived', label: 'Archived', icon: Archive, count: 0 },
];

export default function WebmailPage() {
  const [activeFolder, setActiveFolder] = useState('inbox');
  const [search, setSearch] = useState('');
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);

  const filtered = emails.filter(e => {
    const matchesFolder = e.folder === activeFolder;
    const q = search.toLowerCase();
    const matchesSearch = e.subject.toLowerCase().includes(q) || e.sender.toLowerCase().includes(q) || e.preview.toLowerCase().includes(q);
    return matchesFolder && matchesSearch;
  });

  const unreadInbox = emails.filter(e => e.folder === 'inbox' && !e.read).length;

  return (
    <InternPageShell title="Webmail" description="Company email access"
      actions={
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-sm">
          <Plus className="w-4 h-4" /> Compose
        </button>
      }
    >
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
        <div className="flex flex-col lg:flex-row gap-4 h-[600px]">
          {/* Folders Sidebar */}
          <motion.div variants={item} className="w-full lg:w-52 space-y-1">
            {folders.map(f => {
              const Icon = f.icon;
              return (
                <button key={f.id} onClick={() => { setActiveFolder(f.id); setSelectedEmail(null); }}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                    activeFolder === f.id
                      ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/30'
                  }`}>
                  <Icon className="w-4 h-4" />
                  <span className="flex-1 text-left">{f.label}</span>
                  {f.count > 0 && (
                    <span className="px-1.5 py-0.5 rounded-full bg-blue-500 text-white text-[10px] font-bold leading-none">{f.count}</span>
                  )}
                </button>
              );
            })}
            <div className="mt-4 px-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input type="text" value={search} onChange={e => setSearch(e.target.value)}
                  placeholder="Search emails..."
                  className="w-full pl-8 pr-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-lg text-xs bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </motion.div>

          {/* Email List */}
          <motion.div variants={item} className="flex-1 bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl shadow-sm flex flex-col overflow-hidden">
            {selectedEmail ? (
              <>
                <div className="px-5 py-3 border-b border-slate-100 dark:border-slate-700/60 flex items-center gap-2">
                  <button onClick={() => setSelectedEmail(null)}
                    className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400">
                    <ChevronRight className="w-4 h-4 rotate-180" />
                  </button>
                  <span className="text-xs text-slate-400">{activeFolder.charAt(0).toUpperCase() + activeFolder.slice(1)}</span>
                </div>
                <div className="flex-1 overflow-y-auto p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-base font-bold text-slate-900 dark:text-white">{selectedEmail.subject}</h2>
                      <p className="text-sm text-slate-500 mt-1">{selectedEmail.sender} &lt;{selectedEmail.senderEmail}&gt;</p>
                    </div>
                    <span className="text-xs text-slate-400">{selectedEmail.date}</span>
                  </div>
                  <div className="border-t border-slate-100 dark:border-slate-700/60 pt-4">
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {selectedEmail.preview}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mt-3">
                      Please let me know if you have any questions or need additional information.
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mt-3">
                      Best regards,
                    </p>
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-1">{selectedEmail.sender}</p>
                    {selectedEmail.hasAttachments && (
                      <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
                        <Paperclip className="w-3.5 h-3.5" />
                        <span>2 attachments</span>
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="px-5 py-3 border-b border-slate-100 dark:border-slate-700/60">
                  <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">
                    {folders.find(f => f.id === activeFolder)?.label || activeFolder}
                  </h3>
                </div>
                <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-700/40">
                  {filtered.map(email => (
                    <button key={email.id} onClick={() => setSelectedEmail(email)}
                      className={`w-full text-left px-5 py-3.5 hover:bg-slate-50 dark:hover:bg-slate-700/20 transition-colors ${
                        !email.read ? 'bg-blue-50/30 dark:bg-blue-500/5' : ''
                      }`}>
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            {email.starred && <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400 flex-shrink-0" />}
                            <p className={`text-sm truncate ${!email.read ? 'font-bold text-slate-900 dark:text-white' : 'font-medium text-slate-700 dark:text-slate-300'}`}>
                              {email.sender}
                            </p>
                          </div>
                          <p className={`text-sm truncate mt-0.5 ${!email.read ? 'font-semibold text-slate-800 dark:text-slate-200' : 'text-slate-600 dark:text-slate-400'}`}>
                            {email.subject}
                          </p>
                          <p className="text-xs text-slate-400 truncate mt-0.5">{email.preview}</p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          {email.hasAttachments && <Paperclip className="w-3 h-3 text-slate-300" />}
                          <span className="text-xs text-slate-400 whitespace-nowrap">{email.date}</span>
                        </div>
                      </div>
                    </button>
                  ))}
                  {filtered.length === 0 && (
                    <div className="text-center py-12 text-slate-400 text-sm">No emails in this folder.</div>
                  )}
                </div>
              </>
            )}
          </motion.div>
        </div>
      </motion.div>
    </InternPageShell>
  );
}
