import React, { useState, useRef, useEffect } from 'react';
import { Hash, MessageSquare, Send, Paperclip, Smile, Search, Bell, Users, Plus, ShieldAlert, Sparkles } from 'lucide-react';
import { useChatStore } from '../../store/employeeStore';
import { Avatar } from '../ui/Avatar';
import type { ChatChannel, ChatMessage } from '../../types';

export function ChatPanel() {
  const { channels, messages, activeChannel, setActiveChannel, sendMessage } = useChatStore();
  const [inputText, setInputText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const selectedChannel = channels.find(c => c.id === activeChannel) || channels[0];

  // Filter messages for active channel
  const activeMessages = messages.filter(m => m.channelId === activeChannel);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeMessages.length]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendMessage(inputText.trim(), activeChannel);
    setInputText('');
  };

  // Group channels by category
  const filteredChannels = channels.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const groupChannels = filteredChannels.filter(c => c.type === 'team' || c.type === 'department' || c.type === 'announcement');
  const directMessages = filteredChannels.filter(c => c.type === 'direct');

  return (
    <div className="flex bg-white dark:bg-slate-900/60 backdrop-blur-md border border-slate-200/60 dark:border-white/[0.06] rounded-2xl h-[550px] overflow-hidden">
      {/* Sidebar - Channels and DMs list */}
      <div className="w-64 border-r border-slate-100 dark:border-white/[0.04] flex flex-col flex-shrink-0 bg-slate-50/50 dark:bg-slate-950/20">
        {/* Search */}
        <div className="p-3 border-b border-slate-100 dark:border-white/[0.04]">
          <div className="flex items-center gap-2 px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-white/[0.04] rounded-lg">
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search chat..."
              className="text-[11px] bg-transparent text-slate-900 dark:text-white outline-none w-full placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Categories list */}
        <div className="flex-1 overflow-y-auto p-2 space-y-4 emp-scrollbar">
          {/* Channels list */}
          <div>
            <div className="flex items-center justify-between px-2 mb-1.5">
              <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Channels</span>
              <button className="text-slate-400 hover:text-slate-600 dark:hover:text-white"><Plus className="w-3.5 h-3.5" /></button>
            </div>
            <div className="space-y-0.5">
              {groupChannels.map(ch => {
                const isActive = ch.id === activeChannel;
                return (
                  <button
                    key={ch.id}
                    onClick={() => setActiveChannel(ch.id)}
                    className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs transition-colors ${
                      isActive
                        ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100/50 dark:hover:bg-slate-800/30'
                    }`}
                  >
                    <span className="flex items-center gap-2 truncate">
                      <Hash className="w-3.5 h-3.5 text-slate-400" />
                      <span className="truncate">{ch.name}</span>
                    </span>
                    {ch.unreadCount > 0 && (
                      <span className="px-1.5 py-0.5 rounded-full bg-red-500 text-[9px] font-bold text-white">
                        {ch.unreadCount}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* DMs list */}
          <div>
            <div className="flex items-center justify-between px-2 mb-1.5">
              <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Direct Messages</span>
              <button className="text-slate-400 hover:text-slate-600 dark:hover:text-white"><Plus className="w-3.5 h-3.5" /></button>
            </div>
            <div className="space-y-0.5">
              {directMessages.map(ch => {
                const isActive = ch.id === activeChannel;
                return (
                  <button
                    key={ch.id}
                    onClick={() => setActiveChannel(ch.id)}
                    className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs transition-colors ${
                      isActive
                        ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100/50 dark:hover:bg-slate-800/30'
                    }`}
                  >
                    <span className="flex items-center gap-2 truncate">
                      <Avatar name={ch.name} size="xs" status={ch.isOnline ? 'online' : 'offline'} />
                      <span className="truncate">{ch.name}</span>
                    </span>
                    {ch.unreadCount > 0 && (
                      <span className="px-1.5 py-0.5 rounded-full bg-red-500 text-[9px] font-bold text-white">
                        {ch.unreadCount}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Message Feed */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="px-6 py-3.5 border-b border-slate-100 dark:border-white/[0.04] flex items-center justify-between bg-white dark:bg-slate-900">
          <div className="flex items-center gap-3">
            {selectedChannel.type === 'direct' ? (
              <Avatar name={selectedChannel.name} size="sm" status={selectedChannel.isOnline ? 'online' : 'offline'} />
            ) : (
              <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 flex items-center justify-center flex-shrink-0">
                <Hash className="w-4.5 h-4.5" />
              </div>
            )}
            <div>
              <p className="text-xs font-extrabold text-slate-900 dark:text-white">{selectedChannel.name}</p>
              {selectedChannel.type !== 'direct' && (
                <p className="text-[10px] text-slate-400 font-semibold flex items-center gap-1 mt-0.5">
                  <Users className="w-3.5 h-3.5" />
                  <span>{selectedChannel.members.length} members</span>
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <button className="p-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-600 dark:hover:text-white transition-colors"><Bell className="w-4 h-4" /></button>
          </div>
        </div>

        {/* Messages view */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 emp-scrollbar bg-slate-50/10 dark:bg-slate-900/10">
          {activeMessages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6">
              <MessageSquare className="w-10 h-10 text-slate-350 dark:text-slate-700 mb-2.5" />
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200">No messages yet</p>
              <p className="text-[11px] text-slate-400 max-w-[200px] mt-1">This is the start of your message history with {selectedChannel.name}.</p>
            </div>
          ) : (
            activeMessages.map(msg => (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-[80%] ${msg.isMe ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
              >
                {!msg.isMe && (
                  <Avatar name={msg.senderName} size="xs" className="mt-0.5 flex-shrink-0" />
                )}
                <div>
                  <div className={`flex items-baseline gap-2 mb-1 ${msg.isMe ? 'justify-end' : ''}`}>
                    <span className="text-[10px] font-bold text-slate-900 dark:text-slate-200">{msg.senderName}</span>
                    <span className="text-[8px] text-slate-400">{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  <div
                    className={`rounded-2xl px-4 py-2.5 text-xs leading-relaxed font-normal ${
                      msg.isMe
                        ? 'bg-blue-600 text-white rounded-tr-none'
                        : 'bg-slate-100 dark:bg-slate-805 text-slate-800 dark:text-slate-250 rounded-tl-none border border-slate-200/40 dark:border-white/[0.02]'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input box */}
        <form onSubmit={handleSend} className="p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-white/[0.04] flex items-center gap-2">
          <button
            type="button"
            className="p-2.5 rounded-xl text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <Paperclip className="w-4 h-4" />
          </button>
          <input
            type="text"
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            placeholder={`Message ${selectedChannel.type === 'direct' ? selectedChannel.name : '#' + selectedChannel.name}...`}
            className="flex-1 text-xs px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/[0.04] text-slate-900 dark:text-white outline-none focus:border-blue-500/50 font-normal"
          />
          <button
            type="button"
            className="p-2.5 rounded-xl text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors hidden sm:block"
          >
            <Smile className="w-4 h-4" />
          </button>
          <button
            type="submit"
            className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/10 transition-all flex items-center justify-center flex-shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChatPanel;
