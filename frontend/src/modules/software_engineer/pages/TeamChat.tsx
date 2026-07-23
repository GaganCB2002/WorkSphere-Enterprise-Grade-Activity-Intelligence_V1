// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Hash, Search, Send, Pin, Smile, Paperclip, Code2, Users, Star, Bell, MoreHorizontal, CheckCheck } from 'lucide-react';

export const TeamChat = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeChannel, setActiveChannel] = useState('general');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/software-engineer/team-chat')
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-6 space-y-4 animate-pulse"><div className="h-20 bg-[#0F172A]/90 rounded-2xl" /><div className="flex gap-4 h-[80vh]"><div className="w-64 bg-[#0F172A]/90 rounded-2xl" /><div className="flex-1 bg-[#0F172A]/90 rounded-2xl" /></div></div>;

  const channels = data?.channels || [
    { id: 'general', name: 'general', unread: 3, pinned: true },
    { id: 'random', name: 'random', unread: 0, pinned: false },
    { id: 'engineering', name: 'engineering', unread: 5, pinned: true },
    { id: 'frontend', name: 'frontend', unread: 1, pinned: false },
    { id: 'backend', name: 'backend', unread: 0, pinned: false },
    { id: 'devops', name: 'devops', unread: 2, pinned: false },
    { id: 'design', name: 'design', unread: 0, pinned: false },
    { id: 'standup', name: 'standup', unread: 0, pinned: false },
  ];
  const currentMessages = data?.messages || [
    { id: 1, user: 'Sarah J.', avatar: 'SJ', content: 'Hey team, the build for PR #423 is passing now!', time: '10:30 AM', reactions: [{ emoji: '🎉', count: 3 }], pinned: true },
    { id: 2, user: 'Mike T.', avatar: 'MT', content: 'Great work Sarah! I\'ll review it after standup.', time: '10:32 AM', reactions: [] },
    { id: 3, user: 'Alex D.', avatar: 'AD', content: 'I just pushed the fix for the Redis connection leak. Can someone review?', time: '10:35 AM', reactions: [{ emoji: '👀', count: 2 }] },
    { id: 4, user: 'Emma W.', avatar: 'EW', content: '```\nconst result = await cache.get(key);\nif (!result) {\n  const data = await db.query(sql);\n  await cache.set(key, data);\n  return data;\n}\nreturn result;\n```', time: '10:38 AM', reactions: [] },
    { id: 5, user: 'Sarah J.', avatar: 'SJ', content: 'Nice caching pattern! One suggestion - maybe add TTL?', time: '10:40 AM', reactions: [{ emoji: '👍', count: 1 }] },
    { id: 6, user: 'Alex D.', avatar: 'AD', content: 'Good point! I\'ll add an expiry parameter.', time: '10:42 AM', reactions: [] },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="bg-[#0B0F19] text-slate-100 h-screen p-4 sm:p-6 flex flex-col gap-4">
      <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-3 px-5 backdrop-blur-md shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-indigo-400"><MessageSquare className="w-5 h-5" /><h1 className="text-lg font-bold text-white">Team Chat</h1></div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input type="text" placeholder="Search..." className="w-48 bg-[#1E293B] text-slate-200 text-xs pl-8 pr-3 py-1.5 rounded-lg border border-slate-700/60 focus:outline-none focus:border-indigo-500/50" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4 flex-1 min-h-0">
        <div className="w-64 shrink-0 bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl overflow-hidden backdrop-blur-md flex flex-col">
          <div className="p-3 border-b border-slate-800">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Channels</div>
            {channels.map(ch => (
              <button key={ch.id} onClick={() => setActiveChannel(ch.id)}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs transition-all mb-0.5 ${activeChannel === ch.id ? 'bg-indigo-600/20 text-indigo-400' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'}`}>
                <Hash className="w-4 h-4" />
                <span className="flex-1 text-left">{ch.name}</span>
                {ch.unread > 0 && <span className="w-5 h-5 rounded bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center">{ch.unread}</span>}
                {ch.pinned && <Pin className="w-3 h-3 text-amber-400" />}
              </button>
            ))}
          </div>
          <div className="p-3">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Direct Messages</div>
            {['Alex D.', 'Sarah J.', 'Mike T.', 'Emma W.'].map(u => (
              <button key={u} className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all">
                <div className="w-5 h-5 rounded-full bg-indigo-900 border border-indigo-500/30 flex items-center justify-center text-[8px] font-bold text-indigo-400">{u.split(' ').map(w => w[0]).join('')}</div>
                <span>{u}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl overflow-hidden backdrop-blur-md flex flex-col">
          <div className="p-3 border-b border-slate-800 flex items-center justify-between bg-[#0E1117]">
            <div className="flex items-center gap-2"><Hash className="w-5 h-5 text-indigo-400" /><h2 className="text-sm font-bold text-white">{activeChannel}</h2><span className="text-xs text-slate-400">| {currentMessages.length} messages</span></div>
            <div className="flex items-center gap-2 text-slate-400"><Bell className="w-4 h-4" /><Pin className="w-4 h-4" /><Users className="w-4 h-4" /><MoreHorizontal className="w-4 h-4" /></div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {currentMessages.map(msg => (
              <div key={msg.id} className={`${msg.pinned ? 'border border-amber-500/30 bg-amber-500/5 rounded-xl p-3' : ''}`}>
                {msg.pinned && <div className="flex items-center gap-1 text-[10px] text-amber-400 mb-2"><Pin className="w-3 h-3" />Pinned</div>}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-900 border border-indigo-500/30 flex items-center justify-center text-[10px] font-bold text-indigo-400 shrink-0">{msg.avatar}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-white">{msg.user}</span>
                      <span className="text-[10px] text-slate-500">{msg.time}</span>
                    </div>
                    {msg.content.startsWith('```') ? (
                      <pre className="bg-[#0E1117] border border-slate-800 rounded-lg p-3 text-[11px] font-mono text-slate-200 overflow-x-auto">{msg.content.replace(/```/g, '')}</pre>
                    ) : (
                      <p className="text-xs text-slate-300 leading-relaxed">{msg.content}</p>
                    )}
                    {msg.reactions.length > 0 && (
                      <div className="flex items-center gap-1 mt-2">
                        {msg.reactions.map((r, i) => (
                          <button key={i} className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-[10px] text-slate-300 hover:bg-slate-700">{r.emoji} {r.count}</button>
                        ))}
                        <button className="p-0.5 rounded text-slate-500 hover:text-white"><Smile className="w-3.5 h-3.5" /></button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 border-t border-slate-800 bg-[#0E1117]/50">
            <div className="flex items-center gap-2">
              <button className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/50"><Paperclip className="w-4 h-4" /></button>
              <button className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/50"><Code2 className="w-4 h-4" /></button>
              <input type="text" placeholder={`Message #${activeChannel}`} value={message} onChange={e => setMessage(e.target.value)} onKeyDown={e => e.key === 'Enter' && setMessage('')}
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
