// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, FolderKanban, Hash, Search, Send, Smile, Paperclip, Users, Plus } from 'lucide-react';

export const ChatProjects = () => {
  const [data, setData] = useState<any>(null);
  useEffect(() => { fetch('/api/tech-lead/chat/projects').then(r => r.json()).then(d => setData(d)).catch(() => {}); }, []);
  const projects = data?.projects || [{ name: 'platform-migration', unread: 2 }, { name: 'ai-chatbot', unread: 0 }, { name: 'security-audit', unread: 5 }];
  const messages = data?.messages || [
    { id: 1, from: 'Sarah J.', text: 'Migration plan for week 3 is ready for review', project: 'platform-migration', time: '11:30 AM' },
    { id: 2, from: 'You', text: 'Looks good. Let\'s discuss in tomorrow\'s standup.', project: 'platform-migration', time: '11:35 AM', isMe: true },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-[#0B0F19] text-slate-100 min-h-screen p-4 sm:p-6">
      <div className="h-[calc(100vh-8rem)] flex bg-[#0F172A]/90 border border-slate-800/80 rounded-xl overflow-hidden backdrop-blur-md">
        <div className="w-64 border-r border-slate-800 flex flex-col bg-[#0E1117] p-3">
          <div className="flex items-center justify-between mb-3"><h2 className="text-xs font-bold text-slate-200 uppercase">Project Chats</h2><Plus className="w-4 h-4 text-slate-400 cursor-pointer" /></div>
          <div className="space-y-0.5">{projects.map((p, i) => (
            <div key={i} className="flex items-center justify-between px-2 py-1.5 rounded-lg hover:bg-[#1E293B] cursor-pointer">
              <div className="flex items-center gap-2 text-slate-300"><FolderKanban className="w-4 h-4 text-slate-400" /><span className="text-xs font-bold">{p.name}</span></div>
              {p.unread > 0 && <span className="bg-indigo-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">{p.unread}</span>}
            </div>
          ))}</div>
        </div>
        <div className="flex-1 flex flex-col">
          <div className="h-14 border-b border-slate-800 flex items-center px-4"><FolderKanban className="w-5 h-5 text-indigo-400 mr-2" /><h3 className="font-bold text-sm text-slate-100">platform-migration</h3></div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">{messages.map(m => (
            <div key={m.id} className={"flex gap-3 " + (m.isMe ? 'justify-end' : '')}>
              {!m.isMe && <div className="w-8 h-8 rounded-lg bg-indigo-900/50 border border-indigo-500/30 flex items-center justify-center text-xs font-bold text-indigo-400 shrink-0">{m.from.split(' ').map(n => n[0]).join('')}</div>}
              <div className={"max-w-md rounded-xl px-4 py-2.5 " + (m.isMe ? 'bg-indigo-600/20 border border-indigo-500/30' : 'bg-[#1E293B]/50 border border-slate-700/60')}><p className="text-xs text-slate-300">{m.text}</p><p className="text-[10px] text-slate-500 mt-1 text-right">{m.time}</p></div>
            </div>
          ))}</div>
          <div className="p-4 border-t border-slate-800">
            <div className="flex items-end bg-[#1E293B] border border-slate-700/60 rounded-xl overflow-hidden focus-within:border-indigo-500">
              <button className="p-3 text-slate-400"><Smile className="w-5 h-5" /></button>
              <input type="text" placeholder="Message..." className="flex-1 bg-transparent text-sm text-slate-200 py-3 px-2 focus:outline-none" />
              <button className="p-3 text-slate-400"><Paperclip className="w-5 h-5" /></button>
              <button className="p-3 bg-indigo-600 hover:bg-indigo-500 text-white"><Send className="w-5 h-5" /></button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

