import React from 'react';
import { Radio, Mail, MessageSquare, AlertCircle, Send, Users, History } from 'lucide-react';
import { motion } from 'framer-motion';

export const HrCommunications: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="h-full flex flex-col max-w-7xl mx-auto space-y-6 min-h-0"
    >
      <div className="flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-200">HR Communications</h1>
          <p className="text-sm text-[#8b949e] mt-1">Manage company-wide broadcasts, internal support channels, and policy updates.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
        
        {/* Broadcast System */}
        <div className="lg:col-span-2 flex flex-col space-y-6">
          <div className="bg-[#161b22] border border-[#30363d] p-6 rounded-2xl shrink-0">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-200 mb-4 flex items-center gap-2">
              <Radio className="w-4 h-4 text-rose-400" />
              Company Broadcast
            </h3>
            <div className="space-y-4">
              <input 
                type="text" 
                placeholder="Broadcast Subject..." 
                className="w-full bg-[#0E1117] border border-[#30363d] focus:border-indigo-500 rounded-lg py-2 px-4 text-sm text-slate-900 dark:text-slate-200 placeholder:text-[#8b949e] outline-none"
              />
              <textarea 
                rows={4}
                placeholder="Write your company-wide announcement here..." 
                className="w-full bg-[#0E1117] border border-[#30363d] focus:border-indigo-500 rounded-lg py-3 px-4 text-sm text-slate-900 dark:text-slate-200 placeholder:text-[#8b949e] outline-none resize-none"
              />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-[#8b949e]">
                  <Users className="w-4 h-4" />
                  Sending to all 1,248 employees
                </div>
                <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm">
                  <Send className="w-4 h-4" />
                  <span>Send Broadcast</span>
                </button>
              </div>
            </div>
          </div>

          <div className="flex-1 bg-[#161b22] border border-[#30363d] p-6 rounded-2xl flex flex-col">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-200 mb-4 flex items-center gap-2">
              <History className="w-4 h-4 text-indigo-400" />
              Recent Broadcasts
            </h3>
            <div className="flex-1 overflow-y-auto custom-scrollbar space-y-3 pr-2">
              {[
                { title: 'Q2 All-Hands Meeting Setup', date: 'May 18, 2026', type: 'Announcement' },
                { title: 'Updated Work From Home Policy', date: 'May 10, 2026', type: 'Policy Update' },
                { title: 'Server Maintenance Window', date: 'May 05, 2026', type: 'IT Alert' },
              ].map((msg, i) => (
                <div key={i} className="bg-[#0E1117] border border-[#30363d] p-4 rounded-xl flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold text-slate-900 dark:text-slate-200">{msg.title}</div>
                    <div className="text-xs text-[#8b949e] mt-1">{msg.date}</div>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-[#21262d] text-slate-400 border border-[#30363d] px-2 py-1 rounded">
                    {msg.type}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* HR Support Queue */}
        <div className="lg:col-span-1 bg-[#161b22] border border-[#30363d] rounded-2xl p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-200 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              HR Support Queue
            </h3>
            <span className="bg-rose-500/10 text-rose-400 border border-rose-500/20 text-[10px] font-bold px-2 py-0.5 rounded-full">
              4 Active
            </span>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar space-y-3 pr-2">
            {[
              { user: 'Kyle Reese', issue: 'Tax deduction query on April payslip', urgency: 'High' },
              { user: 'Miles Dyson', issue: 'Laptop upgrade request status', urgency: 'Low' },
              { user: 'John Connor', issue: 'Clarification on maternity leave policy', urgency: 'Medium' },
            ].map((ticket, i) => (
              <div key={i} className="bg-[#0E1117] border border-[#30363d] p-4 rounded-xl cursor-pointer hover:border-indigo-500/50 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <div className="text-sm font-bold text-slate-900 dark:text-slate-200">{ticket.user}</div>
                  <AlertCircle className={`w-4 h-4 ${ticket.urgency === 'High' ? 'text-rose-400' : ticket.urgency === 'Medium' ? 'text-amber-400' : 'text-emerald-400'}`} />
                </div>
                <div className="text-xs text-[#8b949e] line-clamp-2">{ticket.issue}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </motion.div>
  );
};


