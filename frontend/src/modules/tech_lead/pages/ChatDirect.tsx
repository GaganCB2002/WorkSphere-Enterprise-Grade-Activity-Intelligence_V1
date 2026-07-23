// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Search, Send, Smile, Paperclip, Phone, Video, MoreVertical, User } from 'lucide-react';

export const ChatDirect = () => {
  const [data, setData] = useState<any>(null);
  const [message, setMessage] = useState('');
  useEffect(() => { fetch('/api/tech-lead/chat/direct').then(r => r.json()).then(d => setData(d)).catch(() => {}); }, []);
  const messages = data?.messages || [
    { id: 1, from: 'Sarah J.', text: 'Hey, can you review PR #1042 when you get a chance?', time: '10:15 AM', isMe: false },
    { id: 2, from: 'You', text: 'Sure, I\'ll take a look after standup.', time: '10:17 AM', isMe: true },
    { id: 3, from: 'Sarah J.', text: 'Thanks! Added you as reviewer.', time: '10:18 AM', isMe: false },
  ];
  const contact = data?.contact || { name: 'Sarah Jenkins', status: 'online', role: 'Senior Frontend' };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-[#0B0F19] text-slate-100 min-h-screen p-4 sm:p-6">
      <div className="h-[calc(100vh-8rem)] flex bg-[#0F172A]/90 border border-slate-800/80 rounded-xl overflow-hidden backdrop-blur-md">
        <div className="w-64 border-r border-slate-800 flex flex-col bg-[#0E1117] p-3 space-y-1">
          <div className="relative mb-2"><Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#8b949e]" /><input type="text" placeholder="Search or start new chat" className="w-full bg-[#1E293B] border border-slate-700/60 rounded-lg py-1.5 pl-8 pr-3 text-xs text-slate-200 focus:outline-none" /></div>
          {[{name: 'Alex D.', status: 'busy', lastMsg: 'Deploying to staging'}, {name: 'Emma W.', status: 'online', lastMsg: 'Tests pass now'}, {name: 'Mike T.', status: 'offline', lastMsg: 'Updated the runbook'}].map((c, i) => (
            <div key={i} className="flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-[#1E293B] cursor-pointer">
              <div className="relative"><div className="w-8 h-8 rounded-lg bg-indigo-900/50 border border-indigo-500/30 flex items-center justify-center text-xs font-bold text-indigo-400">{c.name.split(' ').map(n => n[0]).join('')}</div><div className={"absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border border-[#0E1117] " + (c.status === 'online' ? 'bg-emerald-500' : c.status === 'busy' ? 'bg-rose-500' : 'bg-slate-500')}></div></div>
              <div className="flex-1 min-w-0"><p className="text-xs font-bold text-slate-200">{c.name}</p><p className="text-[10px] text-slate-400 truncate">{c.lastMsg}</p></div>
            </div>
          ))}
        </div>
        <div className="flex-1 flex flex-col">
          <div className="h-14 border-b border-slate-800 flex items-center justify-between px-4">
            <div className="flex items-center gap-3"><div className="relative"><div className="w-8 h-8 rounded-lg bg-indigo-900/50 border border-indigo-500/30 flex items-center justify-center text-xs font-bold text-indigo-400">SJ</div><div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border border-[#0F172A] bg-emerald-500"></div></div><div><p className="text-sm font-bold text-slate-200">{contact.name}</p><p className="text-[10px] text-emerald-400">{contact.status}</p></div></div>
            <div className="flex items-center gap-3 text-slate-400"><Phone className="w-4 h-4 hover:text-slate-200 cursor-pointer" /><Video className="w-4 h-4 hover:text-slate-200 cursor-pointer" /><MoreVertical className="w-4 h-4 hover:text-slate-200 cursor-pointer" /></div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map(m => (
              <div key={m.id} className={"flex gap-3 " + (m.isMe ? 'justify-end' : '')}>
                {!m.isMe && <div className="w-8 h-8 rounded-lg bg-indigo-900/50 border border-indigo-500/30 flex items-center justify-center text-xs font-bold text-indigo-400 shrink-0">{m.from.split(' ').map(n => n[0]).join('')}</div>}
                <div className={"max-w-md " + (m.isMe ? 'bg-indigo-600/20 border border-indigo-500/30' : 'bg-[#1E293B]/50 border border-slate-700/60') + " rounded-xl px-4 py-2.5"}>
                  <p className="text-xs text-slate-300">{m.text}</p><p className="text-[10px] text-slate-500 mt-1 text-right">{m.time}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-slate-800">
            <div className="flex items-end bg-[#1E293B] border border-slate-700/60 rounded-xl overflow-hidden focus-within:border-indigo-500 transition-colors">
              <button className="p-3 text-slate-400 hover:text-slate-200"><Smile className="w-5 h-5" /></button>
              <input type="text" value={message} onChange={e => setMessage(e.target.value)} placeholder="Type a message..." className="flex-1 bg-transparent text-sm text-slate-200 py-3 px-2 focus:outline-none" />
              <button className="p-3 text-slate-400 hover:text-slate-200"><Paperclip className="w-5 h-5" /></button>
              <button className="p-3 bg-indigo-600 hover:bg-indigo-500 text-white"><Send className="w-5 h-5" /></button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

