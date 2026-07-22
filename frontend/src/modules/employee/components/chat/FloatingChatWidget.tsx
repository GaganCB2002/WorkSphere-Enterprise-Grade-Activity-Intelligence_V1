import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Hash, CornerDownRight } from 'lucide-react';
import { useChatStore } from '../../store/employeeStore';
import { Avatar } from '../ui/Avatar';

interface FloatingChatWidgetProps {
  onOpenFullChat: () => void;
}

export function FloatingChatWidget({ onOpenFullChat }: FloatingChatWidgetProps) {
  const { channels, messages, sendMessage, totalUnread } = useChatStore();
  const [isOpen, setIsOpen] = useState(false);
  const [activeMiniChannel, setActiveMiniChannel] = useState('ch-general');
  const [inputText, setInputText] = useState('');

  const selectedChannel = channels.find(c => c.id === activeMiniChannel) || channels[0];
  const activeMessages = messages.filter(m => m.channelId === activeMiniChannel).slice(-6); // show last 6 messages

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendMessage(inputText.trim(), activeMiniChannel);
    setInputText('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-[80] flex flex-col items-end">
      {/* Mini Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="w-80 h-96 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/[0.08] shadow-2xl rounded-2xl mb-3 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-between">
              <button
                onClick={onOpenFullChat}
                className="flex items-center gap-2 hover:underline text-left"
              >
                {selectedChannel.type === 'direct' ? (
                  <Avatar name={selectedChannel.name} size="xs" />
                ) : (
                  <Hash className="w-3.5 h-3.5" />
                )}
                <div>
                  <p className="text-xs font-bold leading-none">{selectedChannel.name}</p>
                  <p className="text-[9px] text-blue-200 mt-0.5 font-semibold">Open Workspace Chat</p>
                </div>
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg hover:bg-white/10 text-white/80 hover:text-white transition-colors"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>

            {/* Select Channel in Mini Widget */}
            <div className="flex border-b border-slate-100 dark:border-white/[0.04] p-1.5 gap-1.5 overflow-x-auto emp-scrollbar bg-slate-50/50 dark:bg-slate-950/20">
              {channels.slice(0, 3).map(ch => (
                <button
                  key={ch.id}
                  onClick={() => setActiveMiniChannel(ch.id)}
                  className={`px-2.5 py-1 rounded-lg text-[9px] font-bold whitespace-nowrap transition-colors ${
                    ch.id === activeMiniChannel
                      ? 'bg-blue-600 text-white'
                      : 'bg-white dark:bg-slate-800 border border-slate-200/50 dark:border-white/[0.02] text-slate-500 hover:text-slate-700 dark:hover:text-slate-350'
                  }`}
                >
                  {ch.type === 'direct' ? ch.name.split(' ')[0] : '#' + ch.name}
                </button>
              ))}
            </div>

            {/* Messages Pane */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2.5 emp-scrollbar bg-slate-50/10 dark:bg-slate-900/10">
              {activeMessages.map(msg => (
                <div key={msg.id} className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'}`}>
                  {!msg.isMe && (
                    <span className="text-[8px] font-bold text-slate-400 mb-0.5 ml-1">{msg.senderName}</span>
                  )}
                  <div
                    className={`max-w-[85%] rounded-xl px-3 py-1.5 text-[11px] leading-relaxed font-normal ${
                      msg.isMe
                        ? 'bg-blue-600 text-white rounded-tr-none'
                        : 'bg-slate-100 dark:bg-slate-805 text-slate-800 dark:text-slate-250 rounded-tl-none border border-slate-200/40 dark:border-white/[0.02]'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSend} className="p-3 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-white/[0.04] flex items-center gap-1.5">
              <input
                type="text"
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                placeholder="Reply..."
                className="flex-1 text-[11px] px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/[0.04] text-slate-900 dark:text-white outline-none focus:border-blue-500/50"
              />
              <button
                type="submit"
                className="p-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center flex-shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Launcher Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-4 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-xl shadow-blue-500/30 hover:scale-105 transition-all duration-200 cursor-pointer"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <X className="w-5 h-5" key="close-icon" />
          ) : (
            <MessageSquare className="w-5 h-5" key="message-icon" />
          )}
        </AnimatePresence>
        
        {totalUnread > 0 && !isOpen && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white ring-2 ring-white dark:ring-slate-900">
            {totalUnread}
          </span>
        )}
      </button>
    </div>
  );
}

export default FloatingChatWidget;
