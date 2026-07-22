import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Mail, Star } from 'lucide-react';
import { GlassPanel } from '../ui/GlassPanel';

interface Email {
  id: string;
  from: string;
  subject: string;
  preview: string;
  time: string;
  starred: boolean;
  unread: boolean;
}

interface EmailsWidgetProps {
  emails: Email[];
}

export function EmailsWidget({ emails }: EmailsWidgetProps) {
  const navigate = useNavigate();

  return (
    <GlassPanel padding="sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4 text-blue-500" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Emails</h3>
        </div>
      </div>
      <div className="space-y-1">
        {emails.slice(0, 5).map(email => (
          <div
            key={email.id}
            className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors cursor-pointer"
          >
            {email.unread && <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0 mt-1.5" />}
            {!email.unread && <div className="w-2 h-2 flex-shrink-0 mt-1.5" />}
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <p className={`text-xs ${email.unread ? 'font-bold' : 'font-semibold'} text-slate-900 dark:text-white truncate`}>{email.from}</p>
                <span className="text-[9px] text-slate-400 font-semibold flex-shrink-0 ml-2">{email.time}</span>
              </div>
              <p className="text-[10px] font-semibold text-slate-600 dark:text-slate-300 truncate">{email.subject}</p>
              <p className="text-[9px] text-slate-400 truncate font-normal">{email.preview}</p>
            </div>
            {email.starred && <Star className="w-3 h-3 text-amber-500 fill-amber-500 flex-shrink-0 mt-1" />}
          </div>
        ))}
      </div>
      <button
        onClick={() => navigate('/employee/email')}
        className="mt-3 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
      >
        <span>Open Mail</span>
        <ArrowRight className="w-3 h-3" />
      </button>
    </GlassPanel>
  );
}
