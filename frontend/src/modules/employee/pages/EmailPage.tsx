import React, { useState } from 'react';
import { Mail, Star, Search, Filter, Download, RefreshCw, Paperclip } from 'lucide-react';
import { motion } from 'framer-motion';
import { EmployeePageLayout } from '../components/EmployeePageLayout';
import { StatusBadge } from '../components/ui/StatusBadge';

const MOCK_EMAILS = [
  { id: 'em-1', sender: 'Elena Manager', subject: 'Q3 OKR Planning and Alignment', preview: 'Please review the attached document before our sync tomorrow...', time: '10:42 AM', unread: true, starred: true, category: 'Work' },
  { id: 'em-2', sender: 'HR Department', subject: 'Action Required: Updated Compliance Training', preview: 'The annual enterprise compliance training module has been updated...', time: 'Yesterday', unread: true, starred: false, category: 'HR' },
  { id: 'em-3', sender: 'Alex Developer', subject: 'Re: gRPC telemetry service specs', preview: 'I have attached the protobuf files you requested...', time: 'Yesterday', unread: false, starred: false, category: 'Work' },
  { id: 'em-4', sender: 'System Alerts', subject: 'Deploy Successful: Production (v2.4.1)', preview: 'Deployment to production (US-East) completed successfully.', time: 'May 19', unread: false, starred: false, category: 'System' },
  { id: 'em-5', sender: 'David Ops', subject: 'Kubernetes Cluster Maintenance Window', preview: 'We will be migrating the staging cluster nodes this weekend...', time: 'May 18', unread: false, starred: true, category: 'DevOps' },
  { id: 'em-6', sender: 'Priya Menon', subject: 'Performance Review Reminder', preview: 'Your mid-year performance review is scheduled for next week...', time: 'May 17', unread: false, starred: false, category: 'HR' },
];

export function EmailPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEmail, setSelectedEmail] = useState<string | null>('em-1');

  const filteredEmails = MOCK_EMAILS.filter(e =>
    e.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.sender.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeEmail = MOCK_EMAILS.find(e => e.id === selectedEmail);

  return (
    <EmployeePageLayout
      title="Email"
      description="Enterprise mail client"
      breadcrumbs={[{ label: 'Employee', href: '/employee/dashboard' }, { label: 'Email' }]}
      searchPlaceholder="Search emails..."
      onSearch={setSearchQuery}
      actions={
        <div className="flex items-center gap-2">
          <button className="p-2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors border border-slate-200 dark:border-slate-700 shadow-sm bg-white dark:bg-slate-900">
            <Filter className="w-4 h-4" />
          </button>
          <button className="p-2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors border border-slate-200 dark:border-slate-700 shadow-sm bg-white dark:bg-slate-900">
            <Download className="w-4 h-4" />
          </button>
          <button className="p-2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors border border-slate-200 dark:border-slate-700 shadow-sm bg-white dark:bg-slate-900">
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      }
    >
      <div className="flex h-[600px] rounded-2xl border border-slate-200/60 dark:border-white/[0.06] bg-white dark:bg-slate-900/60 backdrop-blur-md overflow-hidden">
        <div className="w-1/3 min-w-[280px] border-r border-slate-200 dark:border-white/[0.06] flex flex-col">
          <div className="p-3 border-b border-slate-200 dark:border-white/[0.04]">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">Inbox</h3>
              <span className="text-[10px] font-bold text-brand-600 bg-brand-50 dark:bg-brand-500/10 px-2 py-0.5 rounded-full">{MOCK_EMAILS.filter(e => e.unread).length} Unread</span>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {filteredEmails.map(email => (
              <motion.div
                key={email.id}
                whileTap={{ scale: 0.99 }}
                onClick={() => setSelectedEmail(email.id)}
                className={`p-3 border-b border-slate-100 dark:border-white/[0.04] cursor-pointer transition-colors ${selectedEmail === email.id ? 'bg-brand-50 dark:bg-brand-500/10 border-l-2 border-l-brand-500' : 'hover:bg-slate-50 dark:hover:bg-slate-800/30 border-l-2 border-l-transparent'}`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className={`text-xs truncate ${email.unread ? 'font-bold text-slate-900 dark:text-white' : 'font-medium text-slate-600 dark:text-slate-400'}`}>{email.sender}</span>
                  <div className="flex items-center gap-1">
                    {email.starred && <Star className="w-3 h-3 text-amber-400 fill-amber-400" />}
                    <span className="text-[9px] text-slate-400 whitespace-nowrap">{email.time}</span>
                  </div>
                </div>
                <p className={`text-[11px] mb-0.5 truncate ${email.unread ? 'font-semibold text-slate-800 dark:text-slate-200' : 'text-slate-500 dark:text-slate-400'}`}>{email.subject}</p>
                <p className="text-[10px] text-slate-400 truncate">{email.preview}</p>
                <div className="mt-1.5">
                  <StatusBadge label={email.category} variant={email.category === 'HR' ? 'admin' : email.category === 'System' ? 'offline' : 'working'} size="sm" dot={false} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          {activeEmail ? (
            <div className="flex-1 flex flex-col">
              <div className="p-5 border-b border-slate-200 dark:border-white/[0.04]">
                <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-2">{activeEmail.subject}</h2>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
                    {activeEmail.sender[0]}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">{activeEmail.sender}</p>
                    <p className="text-[10px] text-slate-400">{activeEmail.time}</p>
                  </div>
                </div>
              </div>
              <div className="flex-1 p-5 overflow-y-auto">
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{activeEmail.preview}</p>
                <div className="mt-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/30 border border-slate-100 dark:border-white/[0.04] flex items-center gap-3">
                  <Paperclip className="w-4 h-4 text-slate-400" />
                  <span className="text-xs text-slate-500">Q3_OKRs_Draft.pdf (2.4 MB)</span>
                </div>
              </div>
              <div className="p-4 border-t border-slate-200 dark:border-white/[0.04] bg-slate-50 dark:bg-slate-900/50">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-brand-600 flex items-center justify-center text-white text-xs font-bold">GC</div>
                  <div className="flex-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full px-4 py-2 text-xs text-slate-400 cursor-text hover:border-brand-400 transition-colors">
                    Reply to {activeEmail.sender}...
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-slate-400">
              <Mail className="w-12 h-12 mb-3 opacity-20" />
              <p className="text-xs">Select a message to read</p>
            </div>
          )}
        </div>
      </div>
    </EmployeePageLayout>
  );
}

export default EmailPage;
