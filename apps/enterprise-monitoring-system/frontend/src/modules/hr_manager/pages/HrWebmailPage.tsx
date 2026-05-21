import React from 'react';
import { 
  Mail, Search, Edit3, Inbox, Send, Star, Trash2, 
  Archive, MoreVertical, Paperclip, Clock
} from 'lucide-react';
import { motion } from 'framer-motion';

const EMAILS = [
  { id: 1, sender: 'Greenhouse Recruiting', subject: 'New Candidate Application: Principal Engineer', preview: 'A new candidate, Michael Chang, has applied for the Principal Engineer role...', date: '10:30 AM', unread: true },
  { id: 2, sender: 'Compliance Auto-Alert', subject: '[Alert] 12 NDAs expiring in 30 days', preview: 'Please review the attached list of contractors whose NDAs are expiring soon...', date: 'Yesterday', unread: true },
  { id: 3, sender: 'Sarah Jenkins', subject: 'Re: Final Offer Approval', preview: 'The total compensation package looks good. Approved from my end.', date: 'May 18', unread: false },
  { id: 4, sender: 'WorkSphere Payroll', subject: '[SUCCESS] May 2026 Payroll Processed', preview: 'All direct deposits have been scheduled for May 31st...', date: 'May 17', unread: false },
];

export const HrWebmailPage: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="h-[calc(100vh-6rem)] flex bg-[#0E1117] border border-[#30363d] rounded-2xl overflow-hidden shadow-lg shadow-black/20"
    >
      
      {/* Sidebar */}
      <div className="w-64 border-r border-[#21262d] flex flex-col bg-[#090b10]">
        <div className="p-4">
          <button className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white py-2.5 rounded-lg text-sm font-bold shadow-sm transition-colors">
            <Edit3 className="w-4 h-4" /> Compose
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto custom-scrollbar px-3 space-y-1">
          <div className="flex items-center justify-between px-3 py-2 bg-indigo-500/10 text-indigo-400 rounded-md cursor-pointer text-sm font-bold">
            <div className="flex items-center gap-2"><Inbox className="w-4 h-4" /> Inbox</div>
            <span className="bg-indigo-600 text-white text-[10px] px-1.5 py-0.5 rounded-full">2</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 text-[#8b949e] hover:text-slate-200 hover:bg-[#21262d] rounded-md cursor-pointer text-sm font-medium transition-colors">
            <Star className="w-4 h-4" /> Starred
          </div>
          <div className="flex items-center gap-2 px-3 py-2 text-[#8b949e] hover:text-slate-200 hover:bg-[#21262d] rounded-md cursor-pointer text-sm font-medium transition-colors">
            <Clock className="w-4 h-4" /> Snoozed
          </div>
          <div className="flex items-center gap-2 px-3 py-2 text-[#8b949e] hover:text-slate-200 hover:bg-[#21262d] rounded-md cursor-pointer text-sm font-medium transition-colors">
            <Send className="w-4 h-4" /> Sent
          </div>
          <div className="flex items-center gap-2 px-3 py-2 text-[#8b949e] hover:text-slate-200 hover:bg-[#21262d] rounded-md cursor-pointer text-sm font-medium transition-colors">
            <Archive className="w-4 h-4" /> Archive
          </div>
          <div className="flex items-center gap-2 px-3 py-2 text-[#8b949e] hover:text-slate-200 hover:bg-[#21262d] rounded-md cursor-pointer text-sm font-medium transition-colors">
            <Trash2 className="w-4 h-4" /> Trash
          </div>
        </div>
      </div>

      {/* Email List */}
      <div className="w-80 border-r border-[#21262d] flex flex-col bg-[#0E1117]">
        <div className="h-14 border-b border-[#21262d] flex items-center px-4 relative">
           <Search className="w-4 h-4 text-[#8b949e] absolute left-6" />
           <input 
             type="text" 
             placeholder="Search emails..." 
             className="w-full bg-[#161b22] border border-[#30363d] rounded-md py-1.5 pl-8 pr-3 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
           />
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar divide-y divide-[#21262d]">
          {EMAILS.map((email, idx) => (
            <div key={email.id} className={`p-4 cursor-pointer hover:bg-[#161b22] transition-colors ${idx === 0 ? 'bg-[#161b22] border-l-2 border-l-indigo-500' : 'border-l-2 border-l-transparent'}`}>
              <div className="flex justify-between items-baseline mb-1">
                <h4 className={`text-sm ${email.unread ? 'font-bold text-slate-100' : 'font-medium text-slate-300'}`}>{email.sender}</h4>
                <span className={`text-[10px] ${email.unread ? 'font-bold text-indigo-400' : 'text-[#8b949e]'}`}>{email.date}</span>
              </div>
              <p className={`text-xs mb-1 ${email.unread ? 'font-bold text-slate-200' : 'text-[#8b949e]'}`}>{email.subject}</p>
              <p className="text-[11px] text-[#8b949e] line-clamp-2 leading-snug">{email.preview}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Email View */}
      <div className="flex-1 flex flex-col bg-[#0E1117]">
        <div className="h-14 border-b border-[#21262d] flex items-center justify-between px-4">
          <div className="flex items-center gap-3 text-[#8b949e]">
            <button className="p-1.5 hover:text-slate-200 hover:bg-[#21262d] rounded transition-colors"><Archive className="w-4 h-4" /></button>
            <button className="p-1.5 hover:text-slate-200 hover:bg-[#21262d] rounded transition-colors"><Trash2 className="w-4 h-4" /></button>
            <div className="w-[1px] h-4 bg-[#30363d] mx-1"></div>
            <button className="p-1.5 hover:text-slate-200 hover:bg-[#21262d] rounded transition-colors"><Clock className="w-4 h-4" /></button>
          </div>
          <button className="p-1.5 text-[#8b949e] hover:text-slate-200 hover:bg-[#21262d] rounded transition-colors">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-xl font-bold text-slate-100 mb-4">New Candidate Application: Principal Engineer</h2>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-900/50 flex items-center justify-center text-emerald-400 font-bold border border-emerald-500/30">
                  GR
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-200">Greenhouse Recruiting <span className="text-xs font-normal text-[#8b949e] ml-1">&lt;no-reply@greenhouse.io&gt;</span></p>
                  <p className="text-xs text-[#8b949e]">to HR Team</p>
                </div>
              </div>
            </div>
            <span className="text-xs text-[#8b949e] font-medium">Today, 10:30 AM</span>
          </div>

          <div className="text-sm text-slate-300 leading-relaxed space-y-4 max-w-3xl">
            <p>Hi HR Team,</p>
            <p>A new candidate has applied for the open <strong>Principal Engineer</strong> role.</p>
            <div className="bg-[#161b22] border border-[#30363d] p-4 rounded-xl space-y-2">
               <div className="flex justify-between">
                 <span className="text-[#8b949e]">Candidate Name:</span>
                 <span className="font-bold text-slate-200">Michael Chang</span>
               </div>
               <div className="flex justify-between">
                 <span className="text-[#8b949e]">Experience:</span>
                 <span className="font-bold text-slate-200">12+ Years</span>
               </div>
               <div className="flex justify-between">
                 <span className="text-[#8b949e]">Current Location:</span>
                 <span className="font-bold text-slate-200">San Francisco, CA</span>
               </div>
            </div>
            <p>Please review their resume and update their status in the Recruitment Pipeline board.</p>
            <br />
            <p className="text-[#8b949e]">Best regards,<br />Automated ATS</p>
          </div>
          
          <div className="mt-8 border-t border-[#21262d] pt-6 flex gap-3">
            <button className="px-4 py-2 border border-[#30363d] bg-[#161b22] hover:bg-[#21262d] text-slate-200 text-sm font-bold rounded-md transition-colors flex items-center gap-2">
              Reply
            </button>
            <button className="px-4 py-2 border border-[#30363d] bg-[#161b22] hover:bg-[#21262d] text-slate-200 text-sm font-bold rounded-md transition-colors flex items-center gap-2">
              Forward
            </button>
          </div>
        </div>
      </div>

    </motion.div>
  );
};
