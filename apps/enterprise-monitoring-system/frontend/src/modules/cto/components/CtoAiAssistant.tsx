import React, { useState } from 'react';
import { Sparkles, Send, MessageSquare } from 'lucide-react';

export const CtoAiAssistant: React.FC = () => {
  const [messages, setMessages] = useState<{sender: 'ai' | 'user', text: string}[]>([
    { sender: 'ai', text: 'I am your CTO AI Copilot. I can predict cloud costs, identify failing systems, and suggest infrastructure optimizations.' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    setMessages([...messages, { sender: 'user', text: input }]);
    setInput('');
    
    setTimeout(() => {
      setMessages(prev => [...prev, { sender: 'ai', text: 'Analyzing technology stack... No critical anomalies detected in recent deployments.' }]);
    }, 1000);
  };

  return (
    <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-3xl flex flex-col shadow-2xl h-[400px]">
      <div className="border-b border-slate-800 p-4 flex items-center gap-3 bg-slate-900/50 rounded-t-3xl">
        <div className="p-2 bg-blue-500/10 rounded-lg">
          <Sparkles className="w-5 h-5 text-blue-400" />
        </div>
        <div>
          <h3 className="font-bold text-white text-sm">AI Executive Assistant</h3>
          <p className="text-xs text-slate-400">Powered by Aura Engine</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-2xl p-3 text-sm ${
              msg.sender === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-slate-800 text-slate-300 rounded-bl-none'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-slate-800 bg-slate-900/50 rounded-b-3xl">
        <form onSubmit={handleSend} className="relative">
          <MessageSquare className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about deployments, costs, or risks..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-10 pr-12 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
          />
          <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors">
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
