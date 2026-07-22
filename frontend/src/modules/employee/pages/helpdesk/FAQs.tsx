import React, { useState } from 'react';
import { EmployeePageLayout } from '../../components/EmployeePageLayout';
import { GlassPanel } from '../../components/ui/GlassPanel';
import { Filter, Download, RefreshCw, Search, ChevronDown, ChevronRight } from 'lucide-react';

const faqs = [
  { id: 1, question: 'How do I reset my password?', answer: 'Go to Settings > Security > Password Reset. Follow the email verification steps to create a new password. Make sure it is at least 8 characters with a mix of letters, numbers, and symbols.', category: 'Account', lastUpdated: '2026-03-15' },
  { id: 2, question: 'How do I request time off?', answer: 'Navigate to HR Dashboard > Time Off > New Request. Select your dates, leave type, and submit for manager approval.', category: 'HR', lastUpdated: '2026-03-10' },
  { id: 3, question: 'How do I update my personal information?', answer: 'Go to My Profile > Edit. You can update your phone number, address, emergency contacts, and bank details there.', category: 'Account', lastUpdated: '2026-02-28' },
  { id: 4, question: 'How do I access company benefits?', answer: 'Visit Benefits Portal under HR section. You can view health insurance, retirement plans, and wellness programs.', category: 'Benefits', lastUpdated: '2026-04-01' },
  { id: 5, question: 'How do I submit an IT support ticket?', answer: 'Go to Helpdesk > IT Requests > New Ticket. Select the issue category, describe the problem, and submit.', category: 'IT', lastUpdated: '2026-03-22' },
  { id: 6, question: 'How do I enroll in training courses?', answer: 'Go to Learning > Courses, browse available courses, and click Enroll. You can track progress from your dashboard.', category: 'Learning', lastUpdated: '2026-03-18' },
  { id: 7, question: 'How do I view my pay slips?', answer: 'Go to Finance > Payroll > Pay Slips. All your monthly pay slips are available for download as PDF.', category: 'Finance', lastUpdated: '2026-04-05' },
  { id: 8, question: 'How do I change my shift schedule?', answer: 'Contact your team lead or submit a shift change request via HR Requests > Shift Change.', category: 'HR', lastUpdated: '2026-03-30' },
  { id: 9, question: 'How do I report a workplace issue?', answer: 'Use the anonymous reporting tool under Compliance > Report Issue. All reports are confidential.', category: 'Compliance', lastUpdated: '2026-02-20' },
  { id: 10, question: 'How do I configure notification preferences?', answer: 'Go to Settings > Notifications. You can enable or disable email, SMS, and in-app alerts.', category: 'Account', lastUpdated: '2026-04-02' },
];

export default function FAQs() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openId, setOpenId] = useState<number | null>(null);

  const filtered = faqs.filter(f =>
    f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <EmployeePageLayout
      title="FAQs"
      description="Frequently asked questions and answers"
      breadcrumbs={['Employee', 'Helpdesk', 'FAQs']}
      actions={
        <div className="flex items-center gap-2">
          {[Filter, Download, RefreshCw].map((Icon, i) => (
            <button key={i} className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/[0.04] text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors">
              <Icon className="w-4 h-4" />
            </button>
          ))}
        </div>
      }
    >
      <GlassPanel className="p-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/[0.04] rounded-xl flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400" />
          <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search FAQs..." className="w-full text-xs bg-transparent text-slate-900 dark:text-white outline-none placeholder:text-slate-400" />
        </div>
        <span className="text-xs text-slate-400">{filtered.length} results</span>
      </GlassPanel>

      <div className="space-y-3">
        {filtered.map(faq => (
          <GlassPanel key={faq.id} className="p-0 overflow-hidden">
            <button onClick={() => setOpenId(openId === faq.id ? null : faq.id)} className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors">
              <div className="flex items-center gap-3">
                {openId === faq.id ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronRight className="w-4 h-4 text-slate-400" />}
                <span className="text-sm font-medium text-slate-900 dark:text-white">{faq.question}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">{faq.category}</span>
                <span className="text-[10px] text-slate-400 whitespace-nowrap">{faq.lastUpdated}</span>
              </div>
            </button>
            {openId === faq.id && (
              <div className="px-4 pb-4 pl-11">
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{faq.answer}</p>
              </div>
            )}
          </GlassPanel>
        ))}
      </div>
    </EmployeePageLayout>
  );
}
