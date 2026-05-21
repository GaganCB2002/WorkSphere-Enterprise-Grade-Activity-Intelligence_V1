import React, { useState } from 'react';
import { Mail, Search, Edit3, Archive, Trash2, Clock, Star, MoreVertical, Reply, CornerUpRight, Paperclip } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MOCK_EMAILS = [
  { id: 1, sender: 'Elena Manager', subject: 'Q3 OKR Planning and Alignment', preview: 'Please review the attached document before our sync tomorrow...', time: '10:42 AM', unread: true, starred: true },
  { id: 2, sender: 'HR Department', subject: 'Action Required: Updated Compliance Training', preview: 'The annual enterprise compliance training module has been updated...', time: 'Yesterday', unread: false, starred: false },
  { id: 3, sender: 'Alex Developer', subject: 'Re: gRPC telemetry service specs', preview: 'I have attached the protobuf files you requested. Let me know if...', time: 'Yesterday', unread: false, starred: false },
  { id: 4, sender: 'System Alerts', subject: 'Deploy Successful: Production (v2.4.1)', preview: 'Deployment to production (US-East) completed successfully in 8m45s.', time: 'May 19', unread: false, starred: false },
  { id: 5, sender: 'David Ops', subject: 'Kubernetes Cluster Maintenance Window', preview: 'We will be migrating the staging cluster nodes this weekend...', time: 'May 18', unread: false, starred: true },
];

export function WebmailPage() {
  const [activeEmail, setActiveEmail] = useState<number | null>(1);
  const [searchQuery, setSearchQuery] = useState('');
  
  const selectedMail = MOCK_EMAILS.find(e => e.id === activeEmail);

  return (
    <div className="h-full flex flex-col bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-white/[0.04]">
      {/* Top Action Bar */}
      <div className="h-14 flex items-center justify-between px-4 border-b border-slate-200 dark:border-white/[0.04] bg-slate-50 dark:bg-slate-900/50">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold">
            <Mail className="w-5 h-5" />
            <span>Enterprise Mail</span>
          </div>
        </div>
        <div className="flex-1 max-w-md mx-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search in mail..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full pl-9 pr-4 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow dark:text-white"
            />
          </div>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-full text-sm font-medium transition-colors shadow-md shadow-blue-500/20">
          <Edit3 className="w-4 h-4" />
          <span>Compose</span>
        </button>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Inbox List */}
        <div className="w-1/3 min-w-[300px] border-r border-slate-200 dark:border-white/[0.04] flex flex-col bg-slate-50/50 dark:bg-slate-900/20">
          <div className="p-3 border-b border-slate-200 dark:border-white/[0.04] flex items-center justify-between">
            <h3 className="font-semibold text-slate-700 dark:text-slate-200">Inbox</h3>
            <span className="bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400 text-xs font-bold px-2 py-0.5 rounded-full">
              2 Unread
            </span>
          </div>
          <div className="flex-1 overflow-y-auto emp-scrollbar">
            {MOCK_EMAILS.filter(e => e.subject.toLowerCase().includes(searchQuery.toLowerCase()) || e.sender.toLowerCase().includes(searchQuery.toLowerCase())).map((email) => (
              <div 
                key={email.id}
                onClick={() => setActiveEmail(email.id)}
                className={`p-3 border-b border-slate-200 dark:border-white/[0.04] cursor-pointer transition-colors relative ${
                  activeEmail === email.id ? 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-l-blue-500' : 'hover:bg-slate-100 dark:hover:bg-slate-800/50 border-l-4 border-l-transparent'
                }`}
              >
                <div className="flex justify-between items-baseline mb-1">
                  <span className={`text-sm truncate pr-2 ${email.unread ? 'font-bold text-slate-900 dark:text-white' : 'font-medium text-slate-700 dark:text-slate-300'}`}>
                    {email.sender}
                  </span>
                  <span className="text-[10px] text-slate-400 whitespace-nowrap">{email.time}</span>
                </div>
                <h4 className={`text-xs mb-1 truncate ${email.unread ? 'font-bold text-slate-800 dark:text-slate-200' : 'text-slate-600 dark:text-slate-400'}`}>
                  {email.subject}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-500 line-clamp-2 leading-snug">
                  {email.preview}
                </p>
                {email.starred && (
                  <Star className="w-3 h-3 text-amber-400 fill-amber-400 absolute right-3 bottom-3" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Mail Viewer */}
        <div className="flex-1 flex flex-col bg-white dark:bg-slate-900">
          {selectedMail ? (
            <AnimatePresence mode="wait">
              <motion.div 
                key={selectedMail.id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex-1 flex flex-col h-full"
              >
                {/* Viewer Header Toolbar */}
                <div className="flex items-center justify-between p-3 border-b border-slate-200 dark:border-white/[0.04]">
                  <div className="flex items-center gap-2">
                    <button className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors" title="Archive">
                      <Archive className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded transition-colors" title="Delete">
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <div className="w-[1px] h-4 bg-slate-200 dark:bg-slate-700 mx-1"></div>
                    <button className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors" title="Snooze">
                      <Clock className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <button className="p-1.5 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors">
                      <Reply className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Mail Content */}
                <div className="flex-1 overflow-y-auto p-6 emp-scrollbar">
                  <h1 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
                    {selectedMail.subject}
                  </h1>
                  
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-sm">
                        {selectedMail.sender[0]}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm text-slate-900 dark:text-white">{selectedMail.sender}</span>
                          <span className="text-xs text-slate-500">&lt;{selectedMail.sender.toLowerCase().replace(' ', '.')}@worksphere.ent&gt;</span>
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5">
                          to me <span className="mx-1">•</span> {selectedMail.time}
                        </div>
                      </div>
                    </div>
                    {selectedMail.starred && <Star className="w-5 h-5 text-amber-400 fill-amber-400" />}
                  </div>

                  <div className="prose prose-sm dark:prose-invert max-w-none text-slate-700 dark:text-slate-300">
                    <p>Hi team,</p>
                    <p>I hope this email finds you well. {selectedMail.preview} As we gear up for the upcoming sprint, I wanted to share the initial draft of our Q3 Objectives and Key Results (OKRs).</p>
                    <p>Please review the attached document and leave your comments by EOD Friday. We will have a synchronization meeting on Monday morning to finalize the commitments.</p>
                    <p>Key areas of focus will be:</p>
                    <ul>
                      <li>Scaling the real-time telemetry ingestion pipeline.</li>
                      <li>Deprecating the legacy monolithic authentication endpoints.</li>
                      <li>Achieving 99.99% uptime across all Tier-1 microservices.</li>
                    </ul>
                    <p>Let me know if you have any questions or require additional context.</p>
                    <p>Best regards,<br/>{selectedMail.sender}</p>
                  </div>

                  {/* Attachments Mock */}
                  <div className="mt-8 pt-6 border-t border-slate-200 dark:border-white/[0.04]">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors w-max">
                        <div className="w-8 h-8 rounded bg-red-100 dark:bg-red-500/20 flex items-center justify-center text-red-600 dark:text-red-400">
                          <Paperclip className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">Q3_OKRs_Draft.pdf</p>
                          <p className="text-[10px] text-slate-500">2.4 MB</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Reply Box */}
                <div className="p-4 border-t border-slate-200 dark:border-white/[0.04] bg-slate-50 dark:bg-slate-900/50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold shrink-0">ME</div>
                    <div className="flex-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full px-4 py-2 text-sm text-slate-400 flex justify-between items-center cursor-text hover:border-blue-400 transition-colors">
                      <span>Reply to {selectedMail.sender}...</span>
                      <CornerUpRight className="w-4 h-4 text-slate-400" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
              <Mail className="w-12 h-12 mb-4 opacity-20" />
              <p>Select a message to read</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
