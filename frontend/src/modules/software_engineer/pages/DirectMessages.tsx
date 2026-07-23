// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Send, Search, MoreHorizontal, Phone, Video, Smile, Paperclip, CheckCheck, Clock } from 'lucide-react';

export const DirectMessages = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeUser, setActiveUser] = useState('Sarah J.');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/software-engineer/direct-messages')
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-6 space-y-4 animate-pulse"><div className="h-20 bg-[#0F172A]/90 rounded-2xl" /><div className="flex gap-4 h-[75vh]"><div className="w-72 bg-[#0F172A]/90 rounded-2xl" /><div className="flex-1 bg-[#0F172A]/90 rounded-2xl" /></div></div>;

  const contacts = data?.contacts || [
    { name: 'Sarah J.', avatar: 'SJ', status: 'online', lastMessage: 'Sounds good! Let me review it.', time: '5m ago', unread: 2 },
    { name: 'Mike T.', avatar: 'MT', status: 'away', lastMessage: 'I\'ll deploy to staging now.', time: '1h ago', unread: 0 },
    { name: 'Emma W.', avatar: 'EW', status: 'offline', lastMessage: 'Can you check the dashboard?', time: '3h ago', unread: 0 },
    { name: 'Alex D.', avatar: 'AD', status: 'online', lastMessage: 'PR is ready for review', time: '2m ago', unread: 1 },
    { name: 'Priya K.', avatar: 'PK', status: 'online', lastMessage: 'Updated the API docs', time: '30m ago', unread: 0 },
    { name: 'James R.', avatar: 'JR', status: 'away', lastMessage: 'Deployment completed', time: '2h ago', unread: 0 },
  ];

  const conversations = data?.conversations?.[activeUser] || [
    { id: 1, from: activeUser, content: 'Hey! Can you review my PR #423?', time: '10:30 AM' },
    { id: 2, from: 'You', content: 'Sure, let me take a look right now.', time: '10:32 AM' },
    { id: 3, from: activeUser, content: 'Thanks! I\'m also working on the auth middleware refactor.', time: '10:35 AM' },
    { id: 4, from: 'You', content: 'Looks good overall. Just left some comments on the rate limiting part.', time: '10:40 AM' },
    { id: 5, from: activeUser, content: 'Sounds good! Let me review it.', time: '10:42 AM' },
  ];

  const statusColor = { online: 'bg-emerald-500', away: 'bg-amber-500', offline: 'bg-slate-500' };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-[#0B0F19] text-slate-100 h-screen p-4 sm:p-6 flex flex-col gap-4">
      <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-3 px-5 backdrop-blur-md shrink-0">
        <div className="flex items-center gap-2 text-indigo-400"><MessageSquare className="w-5 h-5" /><h1 className="text-lg font-bold text-white">Direct Messages</h1></div>
      </div>

      <div className="flex gap-4 flex-1 min-h-0">
        <div className="w-72 shrink-0 bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl overflow-hidden backdrop-blur-md flex flex-col">
          <div className="p-3 border-b border-slate-800">
            <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" /><input type="text" placeholder="Search messages..." className="w-full bg-[#1E293B] text-slate-200 text-xs pl-8 pr-3 py-2 rounded-lg border border-slate-700/60 focus:outline-none focus:border-indigo-500/50" /></div>
          </div>
          <div className="flex-1 overflow-y-auto p-2">
            {contacts.map(c => (
              <button key={c.name} onClick={() => setActiveUser(c.name)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all mb-1 ${activeUser === c.name ? 'bg-indigo-600/20 border border-indigo-500/30' : 'hover:bg-slate-800/30 border border-transparent'}`}>
                <div className="relative shrink-0"><div className="w-10 h-10 rounded-full bg-indigo-900 border border-indigo-500/30 flex items-center justify-center text-xs font-bold text-indigo-400">{c.avatar}</div><div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-[#0B0F19] ${statusColor[c.status]}`} /></div>
                <div className="flex-1 min-w-0 text-left">
                  <div className="flex items-center justify-between"><span className="text-xs font-bold text-white">{c.name}</span><span className="text-[10px] text-slate-500">{c.time}</span></div>
                  <div className="flex items-center justify-between"><span className="text-[11px] text-slate-400 truncate">{c.lastMessage}</span>{c.unread > 0 && <span className="w-4 h-4 rounded bg-indigo-600 text-white text-[8px] font-bold flex items-center justify-center">{c.unread}</span>}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl overflow-hidden backdrop-blur-md flex flex-col">
          <div className="p-3 border-b border-slate-800 flex items-center justify-between bg-[#0E1117]">
            <div className="flex items-center gap-3">
              <div className="relative"><div className="w-9 h-9 rounded-full bg-indigo-900 border border-indigo-500/30 flex items-center justify-center text-xs font-bold text-indigo-400">{activeUser.split(' ').map(w => w[0]).join('')}</div><div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-[#0B0F19] bg-emerald-500" /></div>
              <div><h2 className="text-sm font-bold text-white">{activeUser}</h2><span className="text-[10px] text-emerald-400">Online</span></div>
            </div>
            <div className="flex items-center gap-2 text-slate-400"><Phone className="w-4 h-4" /><Video className="w-4 h-4" /><MoreHorizontal className="w-4 h-4" /></div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {conversations.map(msg => (
              <div key={msg.id} className={`flex items-start gap-3 ${msg.from === 'You' ? 'justify-end' : ''}`}>
                {msg.from !== 'You' && <div className="w-7 h-7 rounded-full bg-indigo-900 border border-indigo-500/30 flex items-center justify-center text-[8px] font-bold text-indigo-400 shrink-0">{msg.from.split(' ').map(w => w[0]).join('')}</div>}
                <div className={`max-w-[70%] p-3 rounded-xl ${msg.from === 'You' ? 'bg-indigo-600 text-white' : 'bg-[#1E293B] text-slate-200 border border-slate-800'}`}>
                  <p className="text-xs">{msg.content}</p>
                  <span className={`text-[10px] mt-1 block ${msg.from === 'You' ? 'text-indigo-200' : 'text-slate-500'}`}>{msg.time}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="p-3 border-t border-slate-800 bg-[#0E1117]/50">
            <div className="flex items-center gap-2">
              <button className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/50"><Paperclip className="w-4 h-4" /></button>
              <input type="text" placeholder={`Message ${activeUser}`} value={message} onChange={e => setMessage(e.target.value)} onKeyDown={e => e.key === 'Enter' && setMessage('')}
                className="flex-1 bg-[#1E293B] text-slate-200 text-xs px-4 py-2 rounded-lg border border-slate-700/60 focus:outline-none focus:border-indigo-500/50" />
              <button className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/50"><Smile className="w-4 h-4" /></button>
              <button className="p-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg"><Send className="w-4 h-4" /></button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
