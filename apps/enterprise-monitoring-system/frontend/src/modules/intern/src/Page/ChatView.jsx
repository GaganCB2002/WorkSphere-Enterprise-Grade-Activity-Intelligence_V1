import React, { useState, useRef, useEffect } from 'react';

export default function ChatView({ messages, setMessages }) {
  const [activeChannel, setActiveChannel] = useState('design');
  const [activeDm, setActiveDm] = useState(null); // or 'sarah', etc.
  const [inputText, setInputText] = useState('');
  
  const feedEndRef = useRef(null);

  // Auto-scroll to bottom of chat feed when new messages arrive
  useEffect(() => {
    feedEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, activeChannel, activeDm]);

  const handleSendMessage = (e) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMessage = {
      id: Date.now().toString(),
      sender: 'You',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAB22TfSAV7mFlI_Ct5Up3f4eXCStfQq_YjzXKB4cKsKh4IpZwEgsFNPtR2nYme2l2BNt41_bo0h9bfRXwM0dlZGKWUmFtz61u75J7Uz8Z2MQjE7iGEIFp8CSMfVEr3_CKvQ1-GM3nkfI_vtkbi4CvvAWUkQOf7gsfTvuk9vx5nVcaFOv0DThAy7ggFM2WTtfaKRc95H60K8xCAtwdpFNcT_h2eFp3QiIFjGMb2nXl3thwwUmkL1AgVWCuC66u2zzsfzLK8T6QHDPs',
      time: timeStr,
      content: inputText,
      channel: activeDm ? null : activeChannel,
      dmRecipient: activeDm || null
    };

    setMessages(prev => [...prev, newMessage]);
    setInputText('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Filter messages for current channel or DM
  const currentMessages = messages.filter(msg => {
    if (activeDm) {
      // In a real app we'd filter DMs. Here we'll just show messages relevant to that DM,
      // or simple mock conversations.
      return msg.dmRecipient === activeDm || (msg.sender === 'You' && msg.dmRecipient === activeDm);
    } else {
      // Channel messages (or the default initial seed messages we treat as 'design' channel)
      return (!msg.dmRecipient && (msg.channel === activeChannel || (!msg.channel && activeChannel === 'design')));
    }
  });

  const selectChannel = (chan) => {
    setActiveChannel(chan);
    setActiveDm(null);
  };

  const selectDm = (dm) => {
    setActiveDm(dm);
    setActiveChannel(null);
  };

  return (
    <div className="flex-1 w-full h-full flex overflow-hidden bg-background dark:bg-on-secondary-fixed">
      {/* Secondary Sidebar: Channels & DMs */}
      <aside className="w-72 bg-surface-container-low dark:bg-inverse-surface/60 border-r border-outline-variant/40 flex flex-col h-full flex-shrink-0 z-10 shadow-[2px_0_16px_rgba(58,48,42,0.02)] select-none">
        {/* Workspace Context */}
        <div className="p-5 border-b border-outline-variant/30">
          <h3 className="font-headline text-lg font-bold text-on-surface dark:text-surface-bright leading-tight">Design Team</h3>
          <p className="font-body text-xs text-on-surface-variant dark:text-secondary-fixed-dim mt-1">12 Members online</p>
        </div>
        <div className="flex-1 overflow-y-auto py-4">
          {/* Channels */}
          <div className="mb-6">
            <div className="px-5 flex items-center justify-between group mb-2">
              <h4 className="font-label text-xs font-bold text-secondary dark:text-secondary-fixed-dim uppercase tracking-wider">Channels</h4>
              <button className="text-secondary hover:text-primary dark:text-secondary-fixed-dim dark:hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-sm">add</span>
              </button>
            </div>
            <ul className="flex flex-col gap-0.5">
              {['general', 'design', 'development', 'leadership_sync'].map(chan => {
                const isActive = activeChannel === chan;
                const isPrivate = chan === 'leadership_sync';
                return (
                  <li key={chan}>
                    <button 
                      onClick={() => selectChannel(chan)}
                      className={`w-full flex items-center gap-3 px-5 py-2 transition-colors font-body text-sm text-left ${
                        isActive
                          ? 'bg-primary/10 text-primary font-semibold border-r-2 border-primary'
                          : 'text-on-surface-variant dark:text-secondary-fixed-dim hover:bg-surface-container dark:hover:bg-on-secondary-fixed hover:text-on-surface'
                      }`}
                    >
                      <span className="material-symbols-outlined text-lg opacity-70">
                        {isPrivate ? 'lock' : 'tag'}
                      </span>
                      <span className="truncate">{chan}</span>
                      {chan === 'development' && (
                        <span className="ml-auto bg-error-container text-on-error-container text-[10px] font-bold px-1.5 py-0.5 rounded-full">3</span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
          {/* Direct Messages */}
          <div>
            <div className="px-5 flex items-center justify-between group mb-2">
              <h4 className="font-label text-xs font-bold text-secondary dark:text-secondary-fixed-dim uppercase tracking-wider">Direct Messages</h4>
              <button className="text-secondary hover:text-primary dark:text-secondary-fixed-dim dark:hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-sm">add</span>
              </button>
            </div>
            <ul className="flex flex-col gap-0.5">
              <li>
                <button 
                  onClick={() => selectDm('sarah')}
                  className={`w-full flex items-center gap-3 px-5 py-2 transition-colors font-body text-sm text-left ${
                    activeDm === 'sarah'
                      ? 'bg-primary/10 text-primary font-semibold border-r-2 border-primary'
                      : 'text-on-surface-variant dark:text-secondary-fixed-dim hover:bg-surface-container dark:hover:bg-on-secondary-fixed hover:text-on-surface'
                  }`}
                >
                  <div className="relative">
                    <div className="w-6 h-6 rounded-full bg-tertiary-fixed text-on-tertiary-fixed-variant flex items-center justify-center text-xs font-bold">
                      SA
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-[#4CAF50] border-2 border-surface-container-low dark:border-inverse-surface rounded-full"></span>
                  </div>
                  <span>Sarah Anderson</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => selectDm('elena_r')}
                  className={`w-full flex items-center gap-3 px-5 py-2 transition-colors font-body text-sm text-left ${
                    activeDm === 'elena_r'
                      ? 'bg-primary/10 text-primary font-semibold border-r-2 border-primary'
                      : 'text-on-surface-variant dark:text-secondary-fixed-dim hover:bg-surface-container dark:hover:bg-on-secondary-fixed hover:text-on-surface'
                  }`}
                >
                  <div className="relative">
                    <img alt="Avatar" className="w-6 h-6 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdwrdwunsknh3WDErx5Cob30zUXwANZRwfY-Ml9zSXPV3mkdS3baqeVLhkNb4ogqipQ0qv1hg0PIBPkeDv0Yg7cSAMrPMji4kQegTR_GkBKADcOizHD2eSCKHbur-X43N-XqaZs8wEUnLYr3acaEaf9f_JsL9RcAAJjjvddLymlcJrt_LPNrhdK52R6LBoru985HTq8bGMB7pzM_3F98tFzkTXf6rXHNEc4ACfJ-1xuK89P4UW_B5DlJVuvMiGbvZvSUvvzwLmKDs" />
                    <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-[#4CAF50] border-2 border-surface-container-low dark:border-inverse-surface rounded-full"></span>
                  </div>
                  <span>Elena Rodriguez</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </aside>

      {/* Main Chat Feed */}
      <section className="flex-1 flex flex-col h-full relative overflow-hidden">
        {/* Chat Header */}
        <div className="h-16 border-b border-outline-variant/30 flex justify-between items-center px-8 bg-surface-bright dark:bg-inverse-surface z-20 flex-shrink-0 shadow-sm select-none">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-3xl text-secondary-fixed-dim font-light">
              {activeDm ? 'person' : 'tag'}
            </span>
            <div>
              <h2 className="font-headline text-xl font-bold text-on-surface dark:text-surface-bright tracking-tight">
                {activeDm ? (activeDm === 'sarah' ? 'Sarah Anderson' : 'Elena Rodriguez') : activeChannel}
              </h2>
              <p className="font-body text-xs text-on-surface-variant dark:text-secondary-fixed-dim flex items-center gap-2">
                <span>{activeDm ? 'Direct message conversation' : 'Design system updates and creative reviews.'}</span>
                {!activeDm && (
                  <>
                    <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
                    <span className="hover:underline cursor-pointer">12 members</span>
                  </>
                )}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2 mr-2">
              <img alt="Member" className="w-8 h-8 rounded-full border-2 border-surface dark:border-inverse-surface object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdq-S8GB69BDXrQHGSE90cFsJq1bFlzi0mgtqpw69gwSXl7DJpYhsvlo0WVEaTQceasbommUhMcrKjr0fioXgL_VSiWnLN9haeODHyt6stZJD0YCjFxAVfR2Ptghw7Qyy8-p77rvrSHvOzY1Na6zTZcaITuq_8MfesZtOENUrWhWcqbknqnQVvYdoRUJ4FsT8j_hS7OKU8wrMRyU9WWfqLmCHRG-U4e4yRTauwIYYmvBeY_zbBF4_haDV3jTcWwTxK68Y_T__YIKM" />
              <img alt="Member" className="w-8 h-8 rounded-full border-2 border-surface dark:border-inverse-surface object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCHZn0F24OWlzeSqe4sV8zSHO2LVm9Vo7bPaysh6VMJqHx2JgAuaEOLMJGHLLbGw8ZWjUr6zOxOKJf7AlhP8_CzAgGTEH9G-DxJ-_bQNjpqVHgIxCEbcnQthWj9d3yEe2HhuN2yjdaPfk4liyXNQ9PXrJTsqNHzZyrTRShow7fLVZh0g_uAuQFuRb44qtu1K5xFPxXVVx8rRHqA0oHW1eSgtPvKBvajdtIf1Uo5Ij7gApEBFX9KXmBS-APKgHYti7SYBhLLjpkMFIY" />
              <div className="w-8 h-8 rounded-full border-2 border-surface dark:border-inverse-surface bg-surface-container-high dark:bg-on-secondary-fixed flex items-center justify-center text-xs font-bold text-on-surface-variant dark:text-secondary-fixed-dim">+9</div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-on-primary hover:bg-on-primary-fixed-variant transition-colors rounded-lg font-label text-sm font-semibold shadow-sm">
              <span className="material-symbols-outlined text-lg">videocam</span>
              <span className="hidden sm:inline">Start Video Call</span>
            </button>
          </div>
        </div>

        {/* Message Feed */}
        <div className="flex-1 overflow-y-auto px-8 py-6 flex flex-col gap-6 bg-surface-bright dark:bg-on-secondary-fixed scroll-smooth">
          <div className="flex items-center justify-center my-2 select-none">
            <div className="h-px bg-outline-variant/30 flex-1"></div>
            <span className="px-4 text-xs font-label text-secondary dark:text-secondary-fixed-dim font-medium uppercase tracking-wider">Today, September 14</span>
            <div className="h-px bg-outline-variant/30 flex-1"></div>
          </div>

          {currentMessages.map((msg) => {
            const isSelf = msg.sender === 'You';
            return (
              <div key={msg.id} className={`flex gap-4 max-w-3xl ${isSelf ? 'self-end flex-row-reverse' : ''}`}>
                {msg.avatar ? (
                  <img alt={msg.sender} className="w-10 h-10 rounded-full object-cover flex-shrink-0 mt-1" src={msg.avatar} />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-tertiary-fixed text-on-tertiary-fixed-variant flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1 select-none">
                    {msg.isInitial || msg.sender.split(' ').map(n => n[0]).join('')}
                  </div>
                )}
                <div className={`flex flex-col ${isSelf ? 'items-end' : 'items-start'}`}>
                  <div className="flex items-baseline gap-2 mb-1 select-none">
                    <span className="font-headline font-bold text-on-surface dark:text-surface-bright text-[17px]">{msg.sender}</span>
                    <span className="text-xs text-secondary dark:text-secondary-fixed-dim font-label">{msg.time}</span>
                  </div>
                  {msg.isSystem ? (
                    <div className="flex items-center gap-4 px-4 py-2 opacity-80 select-none">
                      <span className="material-symbols-outlined text-primary text-sm">integration_instructions</span>
                      <p className="font-body text-sm text-secondary dark:text-secondary-fixed-dim italic">
                        <strong className="font-medium text-on-surface-variant dark:text-surface-bright not-italic">{msg.sender}</strong> {msg.content}
                      </p>
                    </div>
                  ) : (
                    <div className={`p-4 rounded-2xl font-body text-sm leading-relaxed shadow-sm border border-outline-variant/20 ${
                      isSelf 
                        ? 'bg-primary text-on-primary rounded-tr-none shadow-[0_4px_16px_rgba(194,101,42,0.15)] border-transparent' 
                        : 'bg-surface-container-low dark:bg-inverse-surface text-on-surface dark:text-surface-bright rounded-tl-none'
                    }`}>
                      {msg.content}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          
          <div ref={feedEndRef} />
        </div>

        {/* Message Input Area */}
        <div className="px-8 py-5 bg-background dark:bg-inverse-surface border-t border-outline-variant/30 z-20">
          <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="relative flex items-end gap-2 bg-surface-container-lowest dark:bg-on-secondary-fixed border border-outline-variant/60 rounded-2xl p-2 focus-within:border-primary/50 focus-within:ring-4 focus-within:ring-primary/5 transition-all shadow-sm">
            <div className="flex items-center pb-1 select-none">
              <button type="button" className="p-2 text-secondary hover:text-primary transition-colors rounded-full hover:bg-surface-container-high dark:hover:bg-inverse-surface focus:outline-none" title="Attach file">
                <span className="material-symbols-outlined text-[22px]">add_circle</span>
              </button>
              <button type="button" className="p-2 text-secondary hover:text-primary transition-colors rounded-full hover:bg-surface-container-high dark:hover:bg-inverse-surface focus:outline-none hidden sm:block" title="Format text">
                <span className="material-symbols-outlined text-[22px]">text_format</span>
              </button>
              <button type="button" className="p-2 text-secondary hover:text-primary transition-colors rounded-full hover:bg-surface-container-high dark:hover:bg-inverse-surface focus:outline-none hidden sm:block" title="Emojis">
                <span className="material-symbols-outlined text-[22px]">mood</span>
              </button>
            </div>
            <textarea 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 max-h-32 min-h-[44px] bg-transparent border-none focus:ring-0 resize-none font-body text-sm text-on-surface dark:text-surface-bright placeholder:text-on-surface-variant/50 py-3 px-2 outline-none" 
              placeholder={`Message #${activeDm ? (activeDm === 'sarah' ? 'Sarah' : 'Elena') : activeChannel}...`}
              rows={1}
            />
            <div className="pb-1 pr-1">
              <button 
                type="submit" 
                disabled={!inputText.trim()}
                className="p-2.5 bg-primary text-on-primary hover:bg-on-primary-fixed-variant transition-colors rounded-xl flex items-center justify-center shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <span className="material-symbols-outlined text-lg">send</span>
              </button>
            </div>
          </form>
          <div className="flex justify-between items-center mt-2 px-2 select-none">
            <p className="text-[11px] font-label text-secondary dark:text-secondary-fixed-dim flex items-center gap-1">
              <span className="font-bold">Enter</span> to send, <span className="font-bold">Shift + Enter</span> for new line
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
