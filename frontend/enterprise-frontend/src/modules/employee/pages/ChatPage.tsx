import React from 'react';
import { MessageSquare, ShieldCheck, Sparkles } from 'lucide-react';
import { ChatPanel } from '../components/chat/ChatPanel';
import { GlassPanel } from '../components/ui/GlassPanel';

export function ChatPage() {
  return (
    <div className="space-y-6 pb-8">
      {/* Page Header */}
      <GlassPanel className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">Workspace Communication</h1>
              <p className="text-xs text-slate-400 mt-0.5">Real-time team chat and direct messaging</p>
            </div>
          </div>
          
          <div className="hidden sm:flex items-center gap-2 text-[10px] text-slate-400 font-bold bg-slate-50 dark:bg-slate-800/40 border border-slate-200/50 dark:border-white/[0.04] px-3.5 py-2 rounded-xl">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>End-to-End Encrypted</span>
          </div>
        </div>
      </GlassPanel>

      {/* Main Chat Panel Container */}
      <div className="relative">
        <ChatPanel />
      </div>
    </div>
  );
}

export default ChatPage;
