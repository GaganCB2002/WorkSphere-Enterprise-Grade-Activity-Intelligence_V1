import React, { useState } from 'react';
import { Bot, Send, Sparkles, AlertTriangle, Cloud, Activity } from 'lucide-react';

export const AiDevOpsAssistant: React.FC = () => {
  const [query, setQuery] = useState('');
  
  const suggestions = [
    { text: "Why did payment-gateway deployment fail?", icon: <AlertTriangle className="w-4 h-4 text-rose-400" /> },
    { text: "Show pods consuming high memory", icon: <Activity className="w-4 h-4 text-purple-400" /> },
    { text: "Predict next month's AWS costs", icon: <Cloud className="w-4 h-4 text-orange-400" /> },
    { text: "Analyze today's incidents RCA", icon: <Sparkles className="w-4 h-4 text-emerald-400" /> },
  ];

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2">
        <Bot className="w-5 h-5 text-brand" />
        <h2 className="text-xl font-bold text-white tracking-wide">AI DevOps Assistant</h2>
      </div>

      <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-3xl p-6 shadow-2xl flex flex-col md:flex-row gap-6">
        
        {/* Chat Interface */}
        <div className="flex-1 flex flex-col min-h-[400px] border border-slate-800 rounded-2xl bg-slate-950 overflow-hidden">
          <div className="p-4 border-b border-slate-800 bg-brand/5 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-brand flex items-center justify-center shadow-lg shadow-brand/20">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">Aura AI Copilot</h3>
              <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Online & Ready</p>
            </div>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            <div className="flex gap-3 max-w-[85%]">
              <div className="w-6 h-6 rounded-full bg-brand flex-shrink-0 flex items-center justify-center mt-1">
                <Bot className="w-3.5 h-3.5 text-white" />
              </div>
              <div className="bg-slate-800 rounded-2xl rounded-tl-none p-3 text-sm text-slate-300">
                Hello! I'm monitoring the entire infrastructure. I can explain deployment failures, predict resource constraints, analyze logs, or optimize cloud costs. How can I assist you today?
              </div>
            </div>
          </div>
          
          <div className="p-3 bg-slate-900 border-t border-slate-800">
            <div className="relative">
              <input 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask AI about logs, costs, or incidents..." 
                className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-4 pr-12 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-brand hover:bg-brand-600 text-white rounded-lg transition-colors">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* AI Capabilities / Suggestions */}
        <div className="w-full md:w-80 space-y-4">
          <div className="bg-slate-950 rounded-2xl border border-slate-800 p-5">
            <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand" /> Suggested Queries
            </h4>
            <div className="space-y-2">
              {suggestions.map((item, idx) => (
                <button 
                  key={idx}
                  onClick={() => setQuery(item.text)}
                  className="w-full flex items-center gap-3 p-3 bg-slate-900 hover:bg-slate-800 rounded-xl border border-slate-800/50 transition-colors text-left"
                >
                  <div className="p-1.5 bg-slate-950 rounded-lg shadow-inner">
                    {item.icon}
                  </div>
                  <span className="text-xs text-slate-300 font-medium">{item.text}</span>
                </button>
              ))}
            </div>
          </div>
          
          <div className="bg-slate-950 rounded-2xl border border-slate-800 p-5">
            <h4 className="text-sm font-bold text-white mb-2">AI Capabilities</h4>
            <ul className="text-xs text-slate-400 space-y-2">
              <li className="flex items-center gap-2 before:content-[''] before:w-1 before:h-1 before:bg-brand before:rounded-full">Explain deployment failures</li>
              <li className="flex items-center gap-2 before:content-[''] before:w-1 before:h-1 before:bg-brand before:rounded-full">Predict system outages</li>
              <li className="flex items-center gap-2 before:content-[''] before:w-1 before:h-1 before:bg-brand before:rounded-full">Analyze ELK stack logs</li>
              <li className="flex items-center gap-2 before:content-[''] before:w-1 before:h-1 before:bg-brand before:rounded-full">Generate audit reports</li>
            </ul>
          </div>
        </div>
        
      </div>
    </section>
  );
};
