import React, { useState } from 'react';
import InternPageShell from '../../InternPageShell';
import { motion } from 'framer-motion';
import { Hash, Send, Circle, Users, Pin, Search, MessageSquare } from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

interface Channel {
  id: string;
  name: string;
  unread: number;
  pinned: boolean;
}

interface Message {
  id: number;
  sender: string;
  avatar: string;
  message: string;
  time: string;
  channelId: string;
}

interface OnlineUser {
  name: string;
  avatar: string;
}

const channels: Channel[] = [
  { id: 'general', name: 'general', unread: 3, pinned: true },
  { id: 'announcements', name: 'announcements', unread: 1, pinned: true },
  { id: 'project-alpha', name: 'project-alpha', unread: 5, pinned: false },
  { id: 'project-beta', name: 'project-beta', unread: 0, pinned: false },
  { id: 'random', name: 'random', unread: 2, pinned: false },
  { id: 'design-review', name: 'design-review', unread: 0, pinned: false },
];

const allMessages: Record<string, Message[]> = {
  general: [
    { id: 1, sender: 'Alice Johnson', avatar: 'AJ', message: 'Good morning team! Ready for the sprint planning meeting?', time: '9:15 AM', channelId: 'general' },
    { id: 2, sender: 'Bob Smith', avatar: 'BS', message: 'Morning Alice! Yes, I have the requirements ready.', time: '9:17 AM', channelId: 'general' },
    { id: 3, sender: 'Carol Davis', avatar: 'CD', message: 'The new mockups are also complete. Sharing them shortly.', time: '9:20 AM', channelId: 'general' },
    { id: 4, sender: 'David Lee', avatar: 'DL', message: 'API endpoints for the user module are deployed to staging.', time: '9:25 AM', channelId: 'general' },
    { id: 5, sender: 'You', avatar: 'YO', message: 'Great work everyone! I will have the frontend integration ready by EOD.', time: '9:30 AM', channelId: 'general' },
  ],
  announcements: [
    { id: 6, sender: 'Admin', avatar: 'AD', message: 'Company-wide town hall this Friday at 3 PM. Please RSVP.', time: 'Yesterday', channelId: 'announcements' },
    { id: 7, sender: 'Admin', avatar: 'AD', message: 'New parking policy effective next month. Check your email for details.', time: '2 days ago', channelId: 'announcements' },
  ],
  'project-alpha': [
    { id: 8, sender: 'Alice Johnson', avatar: 'AJ', message: 'PR #142 needs review. Can someone take a look?', time: '10:05 AM', channelId: 'project-alpha' },
    { id: 9, sender: 'Karen White', avatar: 'KW', message: 'I will review it after standup.', time: '10:08 AM', channelId: 'project-alpha' },
    { id: 10, sender: 'Grace Kim', avatar: 'GK', message: 'CI/CD pipeline is green. Deploying to staging now.', time: '10:12 AM', channelId: 'project-alpha' },
  ],
  'project-beta': [
    { id: 11, sender: 'Leo Anderson', avatar: 'LA', message: 'Updated the project timeline. Please check and confirm.', time: 'Yesterday', channelId: 'project-beta' },
  ],
  random: [
    { id: 12, sender: 'Frank Wilson', avatar: 'FW', message: 'Anyone up for lunch at the new ramen place?', time: '11:30 AM', channelId: 'random' },
    { id: 13, sender: 'Eva Martinez', avatar: 'EM', message: 'Count me in! 12:30?', time: '11:32 AM', channelId: 'random' },
  ],
  'design-review': [
    { id: 14, sender: 'Carol Davis', avatar: 'CD', message: 'New dashboard mockups ready for feedback in the design folder.', time: 'Yesterday', channelId: 'design-review' },
  ],
};

const onlineUsers: OnlineUser[] = [
  { name: 'Alice Johnson', avatar: 'AJ' },
  { name: 'Bob Smith', avatar: 'BS' },
  { name: 'David Lee', avatar: 'DL' },
  { name: 'Grace Kim', avatar: 'GK' },
  { name: 'Karen White', avatar: 'KW' },
  { name: 'Frank Wilson', avatar: 'FW' },
];

const avatarColors = [
  'from-blue-400 to-blue-600', 'from-emerald-400 to-emerald-600', 'from-violet-400 to-violet-600',
  'from-amber-400 to-amber-600', 'from-rose-400 to-rose-600', 'from-cyan-400 to-cyan-600',
];

export default function TeamChat() {
  const [activeChannel, setActiveChannel] = useState('general');
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState(allMessages);

  const activeMessages = messages[activeChannel] || [];
  const activeChannelName = channels.find(c => c.id === activeChannel)?.name || activeChannel;

  const handleSend = () => {
    if (!newMessage.trim()) return;
    const msg: Message = {
      id: Date.now(),
      sender: 'You',
      avatar: 'YO',
      message: newMessage.trim(),
      time: 'Just now',
      channelId: activeChannel,
    };
    setMessages(prev => ({
      ...prev,
      [activeChannel]: [...(prev[activeChannel] || []), msg],
    }));
    setNewMessage('');
  };

  return (
    <InternPageShell title="Team Chat" description="Team communication channels"
      breadcrumbs={[
        { label: 'Intern Dashboard', path: '/intern/dashboard' },
        { label: 'Chat' },
        { label: activeChannelName },
      ]}
    >
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
        <div className="flex flex-col lg:flex-row gap-4 h-[600px]">
          {/* Sidebar */}
          <motion.div variants={item} className="w-full lg:w-64 bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl shadow-sm flex flex-col overflow-hidden">
            <div className="p-3 border-b border-slate-100 dark:border-slate-700/60">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input type="text" placeholder="Search channels..."
                  className="w-full pl-8 pr-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-lg text-xs bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
            <div className="p-3 border-b border-slate-100 dark:border-slate-700/60">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Channels</p>
              <div className="space-y-0.5">
                {channels.map(ch => (
                  <button
                    key={ch.id}
                    onClick={() => setActiveChannel(ch.id)}
                    className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-sm transition-colors ${
                      activeChannel === ch.id
                        ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/40'
                    }`}
                  >
                    <Hash className="w-3.5 h-3.5 flex-shrink-0" />
                    <span className="flex-1 text-left truncate">{ch.name}</span>
                    {ch.unread > 0 && (
                      <span className="px-1.5 py-0.5 rounded-full bg-blue-500 text-white text-[10px] font-bold leading-none">{ch.unread}</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
            <div className="p-3 flex-1 overflow-y-auto">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Users className="w-3 h-3" /> Online — {onlineUsers.length}
              </p>
              <div className="space-y-1.5">
                {onlineUsers.map(u => {
                  const ci = u.avatar.charCodeAt(0) % avatarColors.length;
                  return (
                    <div key={u.name} className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-sm text-slate-600 dark:text-slate-300">
                      <div className="relative flex-shrink-0">
                        <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${avatarColors[ci]} flex items-center justify-center text-white text-[10px] font-bold`}>
                          {u.avatar}
                        </div>
                        <Circle className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 fill-emerald-500 text-white" />
                      </div>
                      <span className="truncate">{u.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Chat Area */}
          <motion.div variants={item} className="flex-1 bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl shadow-sm flex flex-col overflow-hidden">
            <div className="px-5 py-3 border-b border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Hash className="w-4 h-4 text-slate-400" />
                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">{activeChannelName}</h3>
                {channels.find(c => c.id === activeChannel)?.pinned && <Pin className="w-3 h-3 text-slate-400" />}
              </div>
              <span className="text-xs text-slate-400">{activeMessages.length} messages</span>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {activeMessages.map(msg => {
                const ci = msg.avatar.charCodeAt(0) % avatarColors.length;
                const isYou = msg.sender === 'You';
                return (
                  <div key={msg.id} className={`flex items-start gap-3 ${isYou ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${avatarColors[ci]} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                      {msg.avatar}
                    </div>
                    <div className={`flex-1 min-w-0 max-w-[75%] ${isYou ? 'text-right' : ''}`}>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className={`text-sm font-semibold ${isYou ? 'text-blue-600 dark:text-blue-400 order-1' : 'text-slate-800 dark:text-slate-200'}`}>{msg.sender}</span>
                        <span className={`text-xs text-slate-400 ${isYou ? 'order-0' : ''}`}>{msg.time}</span>
                      </div>
                      <div className={`inline-block px-3.5 py-2 rounded-xl text-sm ${
                        isYou
                          ? 'bg-blue-500 text-white rounded-tr-sm'
                          : 'bg-slate-100 dark:bg-slate-700/40 text-slate-700 dark:text-slate-300 rounded-tl-sm'
                      }`}>
                        {msg.message}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-4 border-t border-slate-100 dark:border-slate-700/60">
              <div className="flex items-center gap-2">
                <input
                  type="text" value={newMessage} onChange={e => setNewMessage(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSend()}
                  placeholder={`Message #${activeChannelName}...`}
                  className="flex-1 px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-lg text-sm bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
                <button onClick={handleSend}
                  className="p-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-sm">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </InternPageShell>
  );
}
