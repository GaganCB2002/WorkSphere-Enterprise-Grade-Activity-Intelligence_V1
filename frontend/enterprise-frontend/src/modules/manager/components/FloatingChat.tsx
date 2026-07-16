import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Minus, Maximize2 } from 'lucide-react';
import { teamMembers } from '../data/managerMockData';

export const FloatingChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');

  // Auto-open after a short delay for demonstration
  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 15000);
    return () => clearTimeout(timer);
  }, []);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    // Process message logic here
    setMessage('');
  };

  return (
    <>
      {/* ── Floating Toggle Button ────────────────────── */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 w-14 h-14 bg-indigo-600 hover:bg-indigo-500 rounded-full flex items-center justify-center text-white shadow-2xl shadow-indigo-500/30 transition-colors z-50 group border border-indigo-400/30"
          >
            <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
            <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-rose-500 rounded-full border-2 border-[#0a0c14]"></span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Chat Window ───────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? 'auto' : '480px'
            }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`fixed bottom-6 right-6 w-[340px] bg-[#0a0c14] border border-[#1e2231] rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50 ${isMinimized ? 'h-auto' : 'h-[480px]'}`}
          >
            {/* Header */}
            <div className="h-14 bg-gradient-to-r from-indigo-900/50 to-blue-900/50 border-b border-[#1e2231] flex items-center justify-between px-4 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-[13px] font-bold text-white leading-tight">Team Comms</h4>
                  <p className="text-[10px] text-indigo-300 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                    3 Online
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  {isMinimized ? <Maximize2 className="w-3.5 h-3.5" /> : <Minus className="w-3.5 h-3.5" />}
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Area (Hidden when minimized) */}
            {!isMinimized && (
              <>
                <div className="flex-1 overflow-y-auto mgr-scrollbar p-4 space-y-4 bg-[#06080d]">
                  <div className="text-center text-[10px] font-bold text-[#4a5068] uppercase tracking-widest my-4">Today</div>
                  
                  {/* Incoming */}
                  <div className="flex items-end gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#1e2231] flex items-center justify-center text-[9px] font-bold text-slate-300 shrink-0">
                      PS
                    </div>
                    <div className="bg-[#12151f] border border-[#1e2231] rounded-2xl rounded-bl-sm p-3 max-w-[85%]">
                      <p className="text-[12px] text-slate-300">The rate limiting middleware is deployed to staging. Can you review?</p>
                      <span className="text-[9px] text-[#6b7280] font-semibold mt-1 block">10:42 AM</span>
                    </div>
                  </div>

                  {/* Outgoing */}
                  <div className="flex items-end justify-end gap-2">
                    <div className="bg-indigo-600 rounded-2xl rounded-br-sm p-3 max-w-[85%]">
                      <p className="text-[12px] text-white">Sure, I'll take a look in 15 mins after this meeting.</p>
                      <span className="text-[9px] text-indigo-200 font-semibold mt-1 block text-right">10:45 AM</span>
                    </div>
                  </div>

                  {/* System Message */}
                  <div className="flex justify-center">
                    <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                      Arjun Mehta joined the channel
                    </span>
                  </div>
                </div>

                {/* Input Area */}
                <form onSubmit={handleSend} className="p-3 bg-[#0a0c14] border-t border-[#1e2231] flex gap-2 shrink-0">
                  <input 
                    type="text" 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 bg-[#12151f] border border-[#1e2231] rounded-xl px-3 py-2 text-[12px] text-slate-200 focus:border-indigo-500/50 outline-none transition-colors"
                  />
                  <button 
                    type="submit"
                    disabled={!message.trim()}
                    className="w-10 h-10 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-600/50 disabled:cursor-not-allowed rounded-xl flex items-center justify-center text-white transition-colors shrink-0"
                  >
                    <Send className="w-4 h-4 ml-0.5" />
                  </button>
                </form>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
