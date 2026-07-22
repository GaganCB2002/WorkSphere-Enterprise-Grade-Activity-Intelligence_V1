import React from 'react';
import { 
  MessageSquare, Search, Hash, Users, Plus, Phone, Video, 
  MoreVertical, Smile, Paperclip, Send, FileText, Code
} from 'lucide-react';
import { motion } from 'framer-motion';

const CHANNELS = [
  { id: 1, name: 'hr-general', unread: 0 },
  { id: 2, name: 'recruitment-alerts', unread: 3 },
  { id: 3, name: 'payroll-sync', unread: 0 },
  { id: 4, name: 'manager-escalations', unread: 12 },
];

const DIRECT_MESSAGES = [
  { id: 1, name: 'Sarah Jenkins', status: 'online', avatar: 'SJ' },
  { id: 2, name: 'Marcus Wright', status: 'busy', avatar: 'MW' },
  { id: 3, name: 'Emma Watson', status: 'online', avatar: 'EW' },
];

export const HrChatPage: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="h-[calc(100vh-6rem)] flex bg-[#0E1117] border border-[#30363d] rounded-2xl overflow-hidden shadow-lg shadow-black/20"
    >
      
      {/* Sidebar */}
      <div className="w-64 border-r border-[#21262d] flex flex-col bg-[#090b10]">
        <div className="p-4 border-b border-[#21262d]">
          <h2 className="text-slate-100 font-bold flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-indigo-500" /> HR Global Chat
          </h2>
          <div className="mt-3 relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#8b949e]" />
            <input 
              type="text" 
              placeholder="Jump to..." 
              className="w-full bg-[#161b22] border border-[#30363d] rounded-md py-1.5 pl-8 pr-3 text-xs text-slate-900 dark:text-slate-200 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-6">
          <div>
            <div className="flex items-center justify-between text-xs font-bold text-[#8b949e] mb-2 px-2 uppercase tracking-wider">
              <span>Channels</span>
              <Plus className="w-3.5 h-3.5 cursor-pointer hover:text-slate-900 dark:text-slate-200" />
            </div>
            <div className="space-y-0.5">
              {CHANNELS.map(channel => (
                <div key={channel.id} className="flex items-center justify-between px-2 py-1.5 rounded-md hover:bg-[#21262d] cursor-pointer text-sm group">
                  <div className="flex items-center gap-2 text-slate-300 group-hover:text-slate-100">
                    <Hash className="w-4 h-4 text-[#8b949e]" />
                    <span className={channel.unread > 0 ? 'font-bold text-white' : ''}>{channel.name}</span>
                  </div>
                  {channel.unread > 0 && (
                    <span className="bg-indigo-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                      {channel.unread}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-xs font-bold text-[#8b949e] mb-2 px-2 uppercase tracking-wider">
              <span>Direct Messages</span>
              <Plus className="w-3.5 h-3.5 cursor-pointer hover:text-slate-900 dark:text-slate-200" />
            </div>
            <div className="space-y-0.5">
              {DIRECT_MESSAGES.map(dm => (
                <div key={dm.id} className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-[#21262d] cursor-pointer text-sm">
                  <div className="relative">
                    <div className="w-5 h-5 rounded bg-indigo-900/50 border border-indigo-500/30 flex items-center justify-center text-[9px] font-bold text-indigo-400">
                      {dm.avatar}
                    </div>
                    <div className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border border-[#090b10] ${
                      dm.status === 'online' ? 'bg-emerald-500' : 'bg-rose-500'
                    }`} />
                  </div>
                  <span className="text-slate-300">{dm.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-[#0E1117]">
        {/* Chat Header */}
        <div className="h-14 border-b border-[#21262d] flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Hash className="w-5 h-5 text-[#8b949e]" />
            <h3 className="font-bold text-slate-100 text-sm">manager-escalations</h3>
          </div>
          <div className="flex items-center gap-3 text-[#8b949e]">
            <Users className="w-4 h-4 hover:text-slate-900 dark:text-slate-200 cursor-pointer" />
            <Phone className="w-4 h-4 hover:text-slate-900 dark:text-slate-200 cursor-pointer" />
            <Video className="w-4 h-4 hover:text-slate-900 dark:text-slate-200 cursor-pointer" />
            <div className="w-[1px] h-4 bg-[#30363d] mx-1"></div>
            <MoreVertical className="w-4 h-4 hover:text-slate-900 dark:text-slate-200 cursor-pointer" />
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar flex flex-col">
          <div className="flex justify-center">
            <span className="text-xs font-bold text-[#8b949e] px-2 py-1 rounded-full border border-[#21262d] bg-[#090b10]">
              Today
            </span>
          </div>
          
          <div className="flex gap-3">
             <div className="w-8 h-8 rounded shrink-0 bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
               <span className="text-xs font-bold text-rose-400">SYS</span>
             </div>
             <div>
               <div className="flex items-center gap-2 mb-0.5">
                 <span className="text-sm font-bold text-rose-400">Compliance Alert</span>
                 <span className="text-xs text-[#8b949e]">10:15 AM</span>
               </div>
               <p className="text-sm text-slate-300">Urgent: 3 employees in DevOps have overlapping emergency leave. Potential project delay.</p>
               <div className="mt-2 bg-[#161b22] border border-rose-500/30 rounded-lg p-3 flex items-start gap-3 w-max">
                  <div className="p-1.5 bg-rose-500/10 rounded">
                    <FileText className="w-4 h-4 text-rose-400" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-slate-200">Leave Conflict Report LCR-42</p>
                    <p className="text-[10px] text-[#8b949e]">Triggered by HR Anomaly System</p>
                  </div>
               </div>
             </div>
          </div>

          <div className="flex gap-3">
             <div className="w-8 h-8 rounded shrink-0 bg-indigo-900/50 border border-indigo-500/30 flex items-center justify-center">
               <span className="text-xs font-bold text-indigo-400">MW</span>
             </div>
             <div>
               <div className="flex items-center gap-2 mb-0.5">
                 <span className="text-sm font-bold text-slate-100">Marcus Wright (DevOps Lead)</span>
                 <span className="text-xs text-[#8b949e]">10:18 AM</span>
               </div>
               <p className="text-sm text-slate-300">I am looking into this now. I can cover their on-call shifts manually.</p>
             </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 bg-[#0E1117] border-t border-[#21262d]">
          <div className="flex items-end bg-[#161b22] border border-[#30363d] focus-within:border-indigo-500 rounded-lg overflow-hidden transition-colors">
            <button className="p-3 text-[#8b949e] hover:text-slate-900 dark:text-slate-200"><Plus className="w-5 h-5" /></button>
            <textarea 
              placeholder="Message #manager-escalations..."
              className="flex-1 bg-transparent text-sm text-slate-900 dark:text-slate-200 py-3 focus:outline-none resize-none min-h-[44px] max-h-32 custom-scrollbar"
              rows={1}
            />
            <div className="p-2 flex items-center gap-1">
              <button className="p-1.5 text-[#8b949e] hover:text-slate-900 dark:text-slate-200 rounded"><Smile className="w-4 h-4" /></button>
              <button className="p-1.5 text-[#8b949e] hover:text-slate-900 dark:text-slate-200 rounded"><Paperclip className="w-4 h-4" /></button>
              <button className="p-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded"><Send className="w-4 h-4" /></button>
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
};
