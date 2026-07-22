import React, { useState, useRef, useEffect, useContext } from 'react';
import { MessageSquare, Send, Hash, Users } from 'lucide-react';
import { useChat } from '../data/hooks';
import { QaShellContext } from '../layout/QaShell';

const colors = ['bg-violet-500', 'bg-emerald-500', 'bg-purple-500', 'bg-amber-500', 'bg-rose-500', 'bg-cyan-500'];

export const TeamChat: React.FC = () => {
  const { messages, channels, activeChannel, setActiveChannel, sendMessage } = useChat();
  const { addToast } = useContext(QaShellContext);
  const [newMessage, setNewMessage] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    sendMessage(newMessage);
    setNewMessage('');
    addToast('Message sent', 'success');
  };

  return (
    <div className="h-full flex flex-col">
      <div className="mb-4">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Team Chat</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Discuss defects with developers in real-time</p>
      </div>

      <div className="flex-1 flex gap-4 min-h-0">
        <div className="w-56 shrink-0 space-y-1 overflow-y-auto">
          {channels.map(ch => (
            <button key={ch.id} onClick={() => setActiveChannel(ch.name)}
              className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all text-left ${
                activeChannel === ch.name
                  ? 'bg-violet-50 dark:bg-violet-600/10 text-violet-600 dark:text-violet-400 border border-violet-200 dark:border-violet-800'
                  : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-300 border border-transparent'
              }`}>
              <Hash className="w-4 h-4 shrink-0" />
              <span className="truncate">{ch.name}</span>
            </button>
          ))}
        </div>

        <div className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col overflow-hidden shadow-sm">
          <div className="px-5 py-3.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex items-center gap-3">
            <Hash className="w-5 h-5 text-violet-500" />
            <span className="text-sm font-bold text-slate-900 dark:text-slate-100">#{activeChannel}</span>
            <span className="text-xs text-slate-400 ml-auto">{messages.length} messages</span>
          </div>

          <div className="flex-1 p-5 overflow-y-auto space-y-5">
            {messages.map((msg, i) => {
              const colorIdx = msg.sender.split(' ').reduce((a, c) => a + c.charCodeAt(0), 0) % colors.length;
              const isMine = msg.sender === 'Alex Mercer';
              return (
                <div key={msg.id} className={`flex gap-3 ${isMine ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-9 h-9 rounded-full ${colors[colorIdx]} flex items-center justify-center text-xs font-bold text-white shrink-0 shadow-sm`}>
                    {msg.initials}
                  </div>
                  <div className={`max-w-[70%] ${isMine ? 'items-end' : ''}`}>
                    <div className={`flex items-baseline gap-2 mb-1 ${isMine ? 'flex-row-reverse' : ''}`}>
                      <span className="text-sm font-bold text-slate-900 dark:text-slate-100">{msg.sender}</span>
                      <span className="text-[10px] text-slate-400">{msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <p className={`text-sm p-3.5 rounded-2xl ${
                      isMine
                        ? 'bg-violet-600 text-white rounded-tr-none'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-tl-none'
                    }`}>
                      {msg.message}
                    </p>
                  </div>
                </div>
              );
            })}
            <div ref={bottomRef} />
          </div>

          <form onSubmit={handleSend} className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
            <div className="relative">
              <input type="text" value={newMessage} onChange={e => setNewMessage(e.target.value)}
                placeholder={`Message #${activeChannel}...`}
                className="w-full pl-4 pr-12 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/30 text-slate-900 dark:text-slate-100 placeholder-slate-400 shadow-sm" />
              <button type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 p-2 text-white bg-violet-600 hover:bg-violet-700 rounded-lg transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!newMessage.trim()}>
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
