import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, MessageSquare } from 'lucide-react';
import { GlassPanel } from '../ui/GlassPanel';

interface Chat {
  id: string;
  user: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
}

interface ChatsWidgetProps {
  chats: Chat[];
}

const avatarColors = ['bg-blue-500', 'bg-emerald-500', 'bg-purple-500', 'bg-amber-500', 'bg-rose-500', 'bg-cyan-500'];

export function ChatsWidget({ chats }: ChatsWidgetProps) {
  const navigate = useNavigate();

  const sorted = [...chats].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());

  return (
    <GlassPanel padding="sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-blue-500" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Chats</h3>
        </div>
      </div>
      <div className="space-y-1">
        {sorted.slice(0, 5).map(chat => (
          <div
            key={chat.id}
            className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors cursor-pointer"
          >
            <div className="relative flex-shrink-0">
              <div className={`w-9 h-9 rounded-full ${avatarColors[chat.user.length % avatarColors.length]} flex items-center justify-center text-white text-xs font-bold`}>
                {chat.user.charAt(0).toUpperCase()}
              </div>
              {chat.online && (
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold text-slate-900 dark:text-white">{chat.user}</p>
                <span className="text-[9px] text-slate-400 font-semibold">{chat.time}</span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate font-normal">{chat.lastMessage}</p>
            </div>
            {chat.unread > 0 && (
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-blue-500 text-white flex-shrink-0">{chat.unread}</span>
            )}
          </div>
        ))}
      </div>
      <button
        onClick={() => navigate('/employee/chat')}
        className="mt-3 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
      >
        <span>Open Chat</span>
        <ArrowRight className="w-3 h-3" />
      </button>
    </GlassPanel>
  );
}
