import React, { useState } from 'react';
import { Send, Paperclip, Smile, Search, Phone, Video, MoreHorizontal } from 'lucide-react';

const contacts = [
  { name: 'Sarah Jenkins', role: 'Mentor', status: 'online', lastMsg: 'Great work on the PR!', time: '2m' },
  { name: 'Michael Chang', role: 'Tech Lead', status: 'online', lastMsg: 'Let\'s sync on the Docker task', time: '15m' },
  { name: 'Ravi Patel', role: 'Fellow Intern', status: 'online', lastMsg: 'Did you finish the TS module?', time: '1h' },
  { name: 'HR Announcements', role: 'Channel', status: 'online', lastMsg: 'Holiday on May 26', time: '3h' },
];

const messages = [
  { id: 1, from: 'Sarah Jenkins', self: false, text: 'Hey! I reviewed your PR for the StatCard component. The code quality is excellent — just a small note on the prop types.', time: '10:30 AM' },
  { id: 2, from: 'You', self: true, text: 'Thank you! I\'ll update the interface to use the stricter generic type. Should I also add the unit tests in the same PR?', time: '10:32 AM' },
  { id: 3, from: 'Sarah Jenkins', self: false, text: 'Yes, please add the tests. Focus on edge cases for the trend calculation — zero values, negative trends, and null data.', time: '10:35 AM' },
  { id: 4, from: 'You', self: true, text: 'Got it! I\'ll have the updated PR ready by EOD today.', time: '10:36 AM' },
];

export const InternChat: React.FC = () => {
  const [input, setInput] = useState('');

  return (
    <div className="flex h-[calc(100vh-120px)] bg-[#0d1117] rounded-xl overflow-hidden border border-[#21262d]">
      {/* Contact List */}
      <div className="w-72 bg-[#161b22] border-r border-[#21262d] flex flex-col shrink-0">
        <div className="p-3 border-b border-[#1b1f27]">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#484f58]" />
            <input
              placeholder="Search chats..."
              className="w-full bg-[#0d1117] border border-[#21262d] rounded-lg py-1.5 pl-8 pr-3 text-xs text-slate-200 placeholder:text-[#484f58] outline-none"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {contacts.map((c, i) => (
            <div key={i} className={`flex items-center gap-2.5 px-3 py-3 cursor-pointer transition-colors ${i === 0 ? 'bg-violet-500/5 border-l-2 border-violet-500' : 'hover:bg-[#0d1117] border-l-2 border-transparent'}`}>
              <div className="relative shrink-0">
                <div className="w-8 h-8 rounded-lg bg-[#21262d] flex items-center justify-center text-[10px] font-bold text-slate-300">{c.name.split(' ').map(n => n[0]).join('')}</div>
                <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-[#161b22]"></div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-200 truncate">{c.name}</span>
                  <span className="text-[9px] text-[#484f58]">{c.time}</span>
                </div>
                <p className="text-[11px] text-[#6e7681] truncate">{c.lastMsg}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="h-14 flex items-center justify-between px-4 border-b border-[#1b1f27] bg-[#161b22]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-violet-600/30 border border-violet-500/30 flex items-center justify-center text-xs font-bold text-violet-400">SJ</div>
            <div>
              <div className="text-sm font-semibold text-white">Sarah Jenkins</div>
              <div className="text-[10px] text-emerald-400">Online</div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button className="p-2 text-[#6e7681] hover:text-slate-200 rounded-lg hover:bg-[#0d1117] transition-colors"><Phone className="w-4 h-4" /></button>
            <button className="p-2 text-[#6e7681] hover:text-slate-200 rounded-lg hover:bg-[#0d1117] transition-colors"><Video className="w-4 h-4" /></button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map(msg => (
            <div key={msg.id} className={`flex ${msg.self ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[70%] px-3.5 py-2.5 rounded-2xl text-sm ${
                msg.self
                  ? 'bg-violet-600 text-white rounded-br-md'
                  : 'bg-[#161b22] border border-[#21262d] text-slate-200 rounded-bl-md'
              }`}>
                <p className="leading-relaxed text-[13px]">{msg.text}</p>
                <span className={`text-[10px] mt-1 block ${msg.self ? 'text-violet-200/60' : 'text-[#484f58]'}`}>{msg.time}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 border-t border-[#1b1f27] bg-[#161b22]">
          <div className="flex items-center gap-2">
            <button className="p-2 text-[#6e7681] hover:text-slate-200 rounded-lg transition-colors"><Paperclip className="w-4 h-4" /></button>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 bg-[#0d1117] border border-[#21262d] focus:border-violet-500/50 rounded-lg py-2 px-3 text-sm text-slate-200 placeholder:text-[#484f58] outline-none transition-colors"
            />
            <button className="p-2 text-[#6e7681] hover:text-slate-200 rounded-lg transition-colors"><Smile className="w-4 h-4" /></button>
            <button className="p-2 bg-violet-600 hover:bg-violet-500 text-white rounded-lg transition-colors"><Send className="w-4 h-4" /></button>
          </div>
        </div>
      </div>
    </div>
  );
};
