import React, { useState, useRef, useEffect } from 'react';

export default function AIView({ messages, setMessages }) {
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const feedEndRef = useRef(null);

  useEffect(() => {
    feedEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = (e) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg = {
      id: Date.now().toString(),
      sender: 'You',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      content: inputText
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      setIsTyping(false);
      const aiReply = {
        id: (Date.now() + 1).toString(),
        sender: 'AI Coding Helper',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        content: getAIResponseText(inputText)
      };
      setMessages(prev => [...prev, aiReply]);
    }, 1200);
  };

  const getAIResponseText = (text) => {
    const query = text.toLowerCase();
    if (query.includes('test') || query.includes('jest')) {
      return "I recommend setting up Jest mock handlers for auth validation. Here's an example: \n\n```javascript\njest.mock('./authUtils', () => ({\n  validateLoginToken: jest.fn(() => true)\n}));\n```\nWould you like me to draft full mock test suites?";
    }
    if (query.includes('hook') || query.includes('useeffect')) {
      return "In React hooks, make sure to list all reactive variables in the dependency array. If you run a timer or subscription, always return a cleanup function to prevent memory leaks:\n\n```javascript\nuseEffect(() => {\n  const id = setInterval(tick, 1000);\n  return () => clearInterval(id);\n}, [dependency]);\n```";
    }
    return "Understood. I've analyzed your request and recommend implementing a clean, modular structure. Let me know if you would like me to generate template components or write custom helper scripts.";
  };

  const handleSuggestionClick = (suggestion) => {
    setInputText(suggestion);
  };

  return (
    <div className="flex-1 w-full h-full overflow-hidden bg-background dark:bg-on-secondary-fixed flex p-8 gap-8">
      {/* Left Column: Chat Interface (Main Focus) */}
      <div className="flex-1 flex flex-col bg-surface-container-lowest dark:bg-inverse-surface/40 rounded-2xl shadow-soft border border-outline-variant/40 overflow-hidden relative glass-panel">
        {/* Chat Header */}
        <div className="px-6 py-4 border-b border-outline-variant/30 bg-surface-container-low/50 dark:bg-inverse-surface/50 flex items-center justify-between select-none">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container">
              <span className="material-symbols-outlined">smart_toy</span>
            </div>
            <div>
              <h3 className="font-headline text-lg font-semibold text-on-surface dark:text-surface-bright">AI Coding Helper</h3>
              <p className="font-body text-xs text-on-surface-variant dark:text-secondary-fixed-dim">Online • Ready to assist with React & Tailwind</p>
            </div>
          </div>
          <button className="text-on-surface-variant dark:text-secondary-fixed-dim hover:text-primary transition-colors">
            <span className="material-symbols-outlined">more_horiz</span>
          </button>
        </div>

        {/* Chat Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg) => {
            const isSelf = msg.sender === 'You';
            return (
              <div key={msg.id} className={`flex gap-4 ${isSelf ? 'max-w-[85%] ml-auto justify-end' : 'max-w-[85%]'}`}>
                {!isSelf && (
                  <div className="w-8 h-8 rounded-full bg-primary-container flex-shrink-0 flex items-center justify-center text-on-primary-container mt-1 select-none">
                    <span className="material-symbols-outlined text-sm">smart_toy</span>
                  </div>
                )}
                
                {msg.isCode ? (
                  <div className="bg-surface-container-low dark:bg-inverse-surface p-4 rounded-2xl rounded-tl-sm text-sm font-body text-on-surface dark:text-surface-bright shadow-sm border border-outline-variant/20 w-full">
                    <p className="mb-3">Sure thing. Here are the unit tests covering successful validation and expired token scenarios.</p>
                    <div className="bg-inverse-surface dark:bg-on-secondary-fixed rounded-lg p-4 font-mono text-xs text-on-secondary dark:text-surface-bright overflow-x-auto relative group">
                      <button className="absolute top-2 right-2 p-1.5 rounded bg-surface/10 hover:bg-surface/20 text-on-secondary opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="material-symbols-outlined text-sm">content_copy</span>
                      </button>
                      <pre><code>{msg.content}</code></pre>
                    </div>
                  </div>
                ) : (
                  <div className={`p-4 rounded-2xl shadow-sm ${
                    isSelf 
                      ? 'bg-primary text-on-primary rounded-tr-sm text-sm font-body' 
                      : 'bg-surface-container-low dark:bg-inverse-surface text-on-surface dark:text-surface-bright rounded-tl-sm text-sm font-body border border-outline-variant/20'
                  }`}>
                    {/* Render code blocks formatted nicely inside responses */}
                    {msg.content.includes('```') ? (
                      <div>
                        {msg.content.split('```').map((block, idx) => {
                          if (idx % 2 === 1) {
                            // code block
                            const codeLines = block.split('\n');
                            const lang = codeLines[0];
                            const codeContent = codeLines.slice(1).join('\n');
                            return (
                              <pre key={idx} className="bg-inverse-surface dark:bg-on-secondary-fixed rounded p-3 my-2 font-mono text-xs text-on-secondary dark:text-surface-bright overflow-x-auto">
                                <code>{codeContent}</code>
                              </pre>
                            );
                          }
                          return <p key={idx} className="whitespace-pre-line">{block}</p>;
                        })}
                      </div>
                    ) : (
                      <p className="whitespace-pre-line">{msg.content}</p>
                    )}
                  </div>
                )}
              </div>
            );
          })}

          {isTyping && (
            <div className="flex gap-4 max-w-[85%]">
              <div className="w-8 h-8 rounded-full bg-primary-container flex-shrink-0 flex items-center justify-center text-on-primary-container mt-1 select-none">
                <span className="material-symbols-outlined text-sm animate-pulse">smart_toy</span>
              </div>
              <div className="bg-surface-container-low dark:bg-inverse-surface p-4 rounded-2xl rounded-tl-sm text-sm font-body text-on-surface dark:text-surface-bright shadow-sm border border-outline-variant/20">
                <div className="flex gap-1 items-center h-4 select-none">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></span>
                  <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '400ms' }}></span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={feedEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-surface-container-lowest dark:bg-inverse-surface border-t border-outline-variant/30">
          <form onSubmit={handleSendMessage} className="relative flex items-center bg-surface-container-low dark:bg-on-secondary-fixed rounded-xl border border-outline-variant/40 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary shadow-sm transition-all">
            <button type="button" className="p-3 text-on-surface-variant dark:text-secondary-fixed-dim hover:text-primary transition-colors select-none">
              <span className="material-symbols-outlined">attach_file</span>
            </button>
            <input 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 bg-transparent border-none py-3 px-2 text-sm font-body text-on-surface dark:text-surface-bright focus:outline-none focus:ring-0 placeholder-on-surface-variant/60 outline-none" 
              placeholder="Ask AI to write code, review logs, or explain concepts..." 
              type="text"
            />
            <button type="submit" disabled={!inputText.trim()} className="p-3 mr-1 text-primary hover:text-primary-container transition-colors disabled:opacity-40 select-none">
              <span className="material-symbols-outlined">send</span>
            </button>
          </form>
          <div className="flex gap-2 mt-3 px-2 select-none">
            <span className="text-xs text-on-surface-variant dark:text-secondary-fixed-dim font-label">Suggestions:</span>
            <button 
              onClick={() => handleSuggestionClick('Review my PR')}
              className="text-xs bg-surface-variant dark:bg-on-secondary-fixed text-on-surface-variant dark:text-secondary-fixed-dim px-2 py-0.5 rounded-full hover:bg-primary-container hover:text-on-primary-container transition-colors"
            >
              Review my PR
            </button>
            <button 
              onClick={() => handleSuggestionClick('Explain React Hooks')}
              className="text-xs bg-surface-variant dark:bg-on-secondary-fixed text-on-surface-variant dark:text-secondary-fixed-dim px-2 py-0.5 rounded-full hover:bg-primary-container hover:text-on-primary-container transition-colors"
            >
              Explain React Hooks
            </button>
          </div>
        </div>
      </div>

      {/* Right Column: Side Panels (Bento Grid Style) */}
      <div className="w-80 flex flex-col gap-6 overflow-y-auto select-none pr-1">
        {/* Task Recommendations Panel */}
        <div className="bg-surface-container-lowest dark:bg-inverse-surface/40 rounded-2xl p-5 shadow-soft border border-outline-variant/40 glass-panel">
          <div className="flex items-center gap-2 mb-4">
            <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
            <h4 className="font-headline text-lg font-semibold text-on-surface dark:text-surface-bright">Task Recommendations</h4>
          </div>
          <ul className="space-y-3">
            <li className="bg-surface-container-low dark:bg-on-secondary-fixed p-3 rounded-xl border border-outline-variant/30 hover:border-primary/50 transition-colors cursor-pointer group">
              <h5 className="text-sm font-semibold text-on-surface dark:text-surface-bright group-hover:text-primary transition-colors">Update Dependency Array</h5>
              <p className="text-xs text-on-surface-variant dark:text-secondary-fixed-dim mt-1 line-clamp-2">AI detected missing dependencies in <code className="text-xs bg-surface-variant dark:bg-inverse-surface px-1.5 py-0.5 rounded text-primary">Dashboard.jsx</code> useEffect hook.</p>
              <div className="flex justify-between items-center mt-2">
                <span className="text-[10px] uppercase font-bold text-tertiary">High Priority</span>
                <span className="material-symbols-outlined text-sm text-on-surface-variant dark:text-secondary-fixed-dim group-hover:text-primary">arrow_forward</span>
              </div>
            </li>
            <li className="bg-surface-container-low dark:bg-on-secondary-fixed p-3 rounded-xl border border-outline-variant/30 hover:border-primary/50 transition-colors cursor-pointer group">
              <h5 className="text-sm font-semibold text-on-surface dark:text-surface-bright group-hover:text-primary transition-colors">Optimize Images</h5>
              <p className="text-xs text-on-surface-variant dark:text-secondary-fixed-dim mt-1 line-clamp-2">3 large assets in <code className="text-xs bg-surface-variant dark:bg-inverse-surface px-1.5 py-0.5 rounded text-primary">/public/assets</code> could be converted to WebP.</p>
              <div className="flex justify-between items-center mt-2">
                <span className="text-[10px] uppercase font-bold text-secondary">Low Priority</span>
                <span className="material-symbols-outlined text-sm text-on-surface-variant dark:text-secondary-fixed-dim group-hover:text-primary">arrow_forward</span>
              </div>
            </li>
          </ul>
        </div>
        
        {/* Resume Improvement Panel */}
        <div className="bg-surface-container-lowest dark:bg-inverse-surface/40 rounded-2xl p-5 shadow-soft border border-outline-variant/40 glass-panel relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full -z-10"></div>
          <div className="flex items-center gap-2 mb-3">
            <span className="material-symbols-outlined text-primary text-xl">edit_document</span>
            <h4 className="font-headline text-lg font-semibold text-on-surface dark:text-surface-bright">Resume Insights</h4>
          </div>
          <p className="text-xs text-on-surface-variant dark:text-secondary-fixed-dim mb-4 font-body leading-relaxed">Based on your recent commits, I suggest updating your skills section.</p>
          <div className="bg-surface dark:bg-on-secondary-fixed p-3 rounded-lg border border-primary/20 mb-3">
            <span className="text-[10px] text-on-surface-variant dark:text-secondary-fixed-dim block mb-1">Suggested Addition:</span>
            <span className="text-sm font-semibold text-primary">React Context API & State Management</span>
          </div>
          <button className="w-full py-2 border border-outline-variant rounded-lg text-sm font-semibold text-on-surface dark:text-surface-bright hover:bg-surface-container-high dark:hover:bg-on-secondary-fixed transition-colors">
            Review Profile Sync
          </button>
        </div>
        
        {/* Meeting Summaries Panel */}
        <div className="bg-surface-container-lowest dark:bg-inverse-surface/40 rounded-2xl p-5 shadow-soft border border-outline-variant/40 glass-panel flex-1">
          <div className="flex items-center gap-2 mb-4">
            <span className="material-symbols-outlined text-primary text-xl">summarize</span>
            <h4 className="font-headline text-lg font-semibold text-on-surface dark:text-surface-bright">Daily Standup</h4>
          </div>
          <div className="space-y-4">
            <div className="border-l-2 border-primary pl-3">
              <span className="text-xs font-bold text-on-surface-variant dark:text-secondary-fixed-dim block mb-0.5">Today, 10:00 AM</span>
              <h5 className="text-sm font-semibold text-on-surface dark:text-surface-bright">Frontend Sync</h5>
              <p className="text-xs text-on-surface-variant dark:text-secondary-fixed-dim mt-1 leading-relaxed">Discussed integration of the new design system. You are assigned to update the Button and Card components by EOD.</p>
            </div>
            <div className="border-l-2 border-outline-variant pl-3 opacity-70">
              <span className="text-xs font-bold text-on-surface-variant dark:text-secondary-fixed-dim block mb-0.5">Yesterday</span>
              <h5 className="text-sm font-semibold text-on-surface dark:text-surface-bright">Sprint Planning</h5>
              <p className="text-xs text-on-surface-variant dark:text-secondary-fixed-dim mt-1">Committed to delivering auth flows. 2 points remaining.</p>
            </div>
          </div>
          <button className="mt-4 text-xs font-bold text-primary hover:text-primary-container flex items-center gap-1 transition-colors">
            View All Summaries <span className="material-symbols-outlined text-[14px]">arrow_outward</span>
          </button>
        </div>
      </div>
    </div>
  );
}
