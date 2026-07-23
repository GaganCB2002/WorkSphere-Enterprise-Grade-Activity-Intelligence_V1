import React, { useState } from 'react';
import InternPageShell from '../../InternPageShell';
import { motion } from 'framer-motion';
import { Send, Search, Circle, MessageSquare } from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

interface Contact {
  id: number;
  name: string;
  avatar: string;
  online: boolean;
  lastMessage: string;
  lastTime: string;
}

interface DirectMessage {
  id: number;
  sender: string;
  avatar: string;
  message: string;
  time: string;
  contactId: number;
}

const contacts: Contact[] = [
  { id: 1, name: 'Alice Johnson', avatar: 'AJ', online: true, lastMessage: 'Sure, I will review it now.', lastTime: '10:32 AM' },
  { id: 2, name: 'Bob Smith', avatar: 'BS', online: true, lastMessage: 'The requirements document is ready.', lastTime: '9:45 AM' },
  { id: 3, name: 'Carol Davis', avatar: 'CD', online: false, lastMessage: 'Mockups are in the shared folder.', lastTime: 'Yesterday' },
  { id: 4, name: 'David Lee', avatar: 'DL', online: true, lastMessage: 'API is deployed to staging.', lastTime: '10:15 AM' },
  { id: 5, name: 'Eva Martinez', avatar: 'EM', online: false, lastMessage: 'Test cases are all passing now.', lastTime: 'Yesterday' },
  { id: 6, name: 'Grace Kim', avatar: 'GK', online: true, lastMessage: 'Pipeline is configured for the new repo.', lastTime: '11:00 AM' },
  { id: 7, name: 'Jack Taylor', avatar: 'JT', online: false, lastMessage: 'Your timesheet is due tomorrow.', lastTime: '2 days ago' },
];

const dmData: Record<number, DirectMessage[]> = {
  1: [
    { id: 1, sender: 'Alice Johnson', avatar: 'AJ', message: 'Can you review my PR #142?', time: '10:15 AM', contactId: 1 },
    { id: 2, sender: 'You', avatar: 'YO', message: 'Sure, I will review it now.', time: '10:20 AM', contactId: 1 },
    { id: 3, sender: 'Alice Johnson', avatar: 'AJ', message: 'Thanks! The changes are mostly in the dashboard component.', time: '10:25 AM', contactId: 1 },
    { id: 4, sender: 'You', avatar: 'YO', message: 'Looks good! Just left a couple of comments on the styling.', time: '10:32 AM', contactId: 1 },
    { id: 5, sender: 'Alice Johnson', avatar: 'AJ', message: 'Got it. Will update those and push again.', time: '10:32 AM', contactId: 1 },
  ],
  2: [
    { id: 6, sender: 'Bob Smith', avatar: 'BS', message: 'Here is the requirements doc for the new feature.', time: '9:40 AM', contactId: 2 },
    { id: 7, sender: 'You', avatar: 'YO', message: 'Thanks Bob! I will go through it today.', time: '9:45 AM', contactId: 2 },
  ],
  4: [
    { id: 8, sender: 'David Lee', avatar: 'DL', message: 'The user service API is ready on staging.', time: '10:10 AM', contactId: 4 },
    { id: 9, sender: 'You', avatar: 'YO', message: 'Perfect! I will start the integration now.', time: '10:15 AM', contactId: 4 },
    { id: 10, sender: 'David Lee', avatar: 'DL', message: 'Let me know if you need any changes to the endpoints.', time: '10:15 AM', contactId: 4 },
  ],
  6: [
    { id: 11, sender: 'Grace Kim', avatar: 'GK', message: 'CI/CD is all set for the new repository.', time: '10:55 AM', contactId: 6 },
    { id: 12, sender: 'You', avatar: 'YO', message: 'Awesome, thank you Grace!', time: '11:00 AM', contactId: 6 },
  ],
};

const avatarColors = [
  'from-blue-400 to-blue-600', 'from-emerald-400 to-emerald-600', 'from-violet-400 to-violet-600',
  'from-amber-400 to-amber-600', 'from-rose-400 to-rose-600', 'from-cyan-400 to-cyan-600',
  'from-pink-400 to-pink-600',
];

export default function DirectMessages() {
  const [activeContact, setActiveContact] = useState<Contact | null>(contacts[0]);
  const [search, setSearch] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState(dmData);

  const filteredContacts = contacts.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const activeMessages = activeContact ? messages[activeContact.id] || [] : [];

  const handleSend = () => {
    if (!newMessage.trim() || !activeContact) return;
    const msg: DirectMessage = {
      id: Date.now(),
      sender: 'You',
      avatar: 'YO',
      message: newMessage.trim(),
      time: 'Just now',
      contactId: activeContact.id,
    };
    setMessages(prev => ({
      ...prev,
      [activeContact.id]: [...(prev[activeContact.id] || []), msg],
    }));
    setNewMessage('');
  };

  return (
    <InternPageShell title="Direct Messages" description="Private conversations">
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
        <div className="flex flex-col lg:flex-row gap-4 h-[600px]">
          {/* Contacts Sidebar */}
          <motion.div variants={item} className="w-full lg:w-72 bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl shadow-sm flex flex-col overflow-hidden">
            <div className="p-3 border-b border-slate-100 dark:border-slate-700/60">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input type="text" value={search} onChange={e => setSearch(e.target.value)}
                  placeholder="Search contacts..."
                  className="w-full pl-8 pr-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-lg text-xs bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {filteredContacts.map(contact => {
                const ci = contact.avatar.charCodeAt(0) % avatarColors.length;
                return (
                  <button
                    key={contact.id}
                    onClick={() => setActiveContact(contact)}
                    className={`w-full flex items-start gap-3 px-4 py-3 transition-colors text-left ${
                      activeContact?.id === contact.id
                        ? 'bg-blue-50 dark:bg-blue-500/10 border-l-2 border-blue-500'
                        : 'hover:bg-slate-50 dark:hover:bg-slate-700/20 border-l-2 border-transparent'
                    }`}
                  >
                    <div className="relative flex-shrink-0 mt-0.5">
                      <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${avatarColors[ci]} flex items-center justify-center text-white text-xs font-bold`}>
                        {contact.avatar}
                      </div>
                      <Circle className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 fill-white dark:fill-slate-800 stroke-white dark:stroke-slate-800 ${contact.online ? 'text-emerald-500' : 'text-slate-400'}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 truncate">{contact.name}</p>
                        <span className="text-[10px] text-slate-400 flex-shrink-0">{contact.lastTime}</span>
                      </div>
                      <p className="text-xs text-slate-500 truncate mt-0.5">{contact.lastMessage}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Chat Area */}
          <motion.div variants={item} className="flex-1 bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl shadow-sm flex flex-col overflow-hidden">
            {activeContact ? (
              <>
                <div className="px-5 py-3 border-b border-slate-100 dark:border-slate-700/60 flex items-center gap-3">
                  <div className="relative">
                    <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${avatarColors[activeContact.avatar.charCodeAt(0) % avatarColors.length]} flex items-center justify-center text-white text-xs font-bold`}>
                      {activeContact.avatar}
                    </div>
                    <Circle className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 fill-white dark:fill-slate-800 stroke-white dark:stroke-slate-800 ${activeContact.online ? 'text-emerald-500' : 'text-slate-400'}`} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">{activeContact.name}</h3>
                    <p className="text-xs text-slate-400">{activeContact.online ? 'Online' : 'Offline'}</p>
                  </div>
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
                    <input type="text" value={newMessage} onChange={e => setNewMessage(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && handleSend()}
                      placeholder={`Message ${activeContact.name}...`}
                      className="flex-1 px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-lg text-sm bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                    <button onClick={handleSend}
                      className="p-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-sm">
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-slate-400">
                <div className="text-center">
                  <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p className="text-sm font-medium">Select a contact to start chatting</p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </InternPageShell>
  );
}
