// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bot, Send, FileText, GitPullRequest, Bug, Code2, BookOpen, Zap, Search, Activity, RefreshCw, Sparkles, MessageSquare, User } from 'lucide-react';

export const AiAssistant = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch('/api/software-engineer/ai-assistant')
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-6 space-y-4 animate-pulse"><div className="h-20 bg-[#0F172A]/90 rounded-2xl" /><div className="flex-1 bg-[#0F172A]/90 rounded-2xl" /></div>;

  const capabilities = data?.capabilities || [
    { name: 'Code Generation', icon: Code2, desc: 'Generate code in any language', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { name: 'Explain Code', icon: FileText, desc: 'Understand complex code', color: 'text-blue-400', bg: 'bg-blue-500/10' },
    { name: 'PR Review', icon: GitPullRequest, desc: 'Review pull requests', color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
    { name: 'Test Generation', icon: Bug, desc: 'Create unit/integration tests', color: 'text-amber-400', bg: 'bg-amber-500/10' },
    { name: 'Bug Fixing', icon: Bug, desc: 'Identify and fix bugs', color: 'text-rose-400', bg: 'bg-rose-500/10' },
    { name: 'Error Explanation', icon: AlertTriangle, desc: 'Explain error messages', color: 'text-orange-400', bg: 'bg-orange-500/10' },
    { name: 'Doc Generation', icon: BookOpen, desc: 'Generate documentation', color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
    { name: 'Query Optimization', icon: Zap, desc: 'Optimize database queries', color: 'text-purple-400', bg: 'bg-purple-500/10' },
    { name: 'Codebase Search', icon: Search, desc: 'Search across codebase', color: 'text-sky-400', bg: 'bg-sky-500/10' },
    { name: 'Log Summarization', icon: Activity, desc: 'Summarize log files', color: 'text-lime-400', bg: 'bg-lime-500/10' },
    { name: 'Refactoring', icon: RefreshCw, desc: 'Suggest refactoring', color: 'text-teal-400', bg: 'bg-teal-500/10' },
  ];

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { role: 'user', content: input }]);
    setInput('');
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'assistant', content: 'I understand you need help. Let me analyze this and provide a solution.' }]);
    }, 1000);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="bg-[#0B0F19] text-slate-100 h-screen p-4 sm:p-6 flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md shrink-0">
        <div>
          <div className="text-xs font-semibold text-indigo-400">Software Engineer Workspace</div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2"><Bot className="w-6 h-6 text-indigo-400" /> AI Assistant</h1>
          <p className="text-xs text-slate-400 mt-0.5">Powered by advanced AI &bull; {capabilities.length} capabilities</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0">
        <div className="lg:w-80 shrink-0 space-y-3 overflow-y-auto">
          {capabilities.map((cap, idx) => (
            <motion.button key={cap.name} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.03 }}
              className="w-full flex items-center gap-3 p-3 rounded-xl border border-slate-800/80 bg-[#0F172A]/90 hover:bg-slate-800/60 transition-all text-left">
              <div className={`p-2 rounded-lg border border-slate-700/60 ${cap.bg}`}><cap.icon className={`w-4 h-4 ${cap.color}`} /></div>
              <div className="flex-1 min-w-0"><div className="text-xs font-semibold text-white">{cap.name}</div><div className="text-[10px] text-slate-400 truncate">{cap.desc}</div></div>
            </motion.button>
          ))}
        </div>

        <div className="flex-1 flex flex-col bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl overflow-hidden backdrop-blur-md">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <div className="p-4 bg-indigo-500/10 rounded-2xl border border-indigo-500/20 mb-4"><Sparkles className="w-10 h-10 text-indigo-400" /></div>
                <h3 className="text-lg font-bold text-white mb-2">How can I help you?</h3>
                <p className="text-xs text-slate-400 max-w-md">Ask me to write code, review a PR, explain a concept, generate tests, fix bugs, or anything else engineering-related.</p>
              </div>
            )}
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                {msg.role === 'assistant' && <div className="p-2 bg-indigo-500/10 rounded-xl border border-indigo-500/20"><Bot className="w-4 h-4 text-indigo-400" /></div>}
                <div className={`max-w-[75%] p-3 rounded-xl ${msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-[#1E293B] text-slate-200 border border-slate-800'}`}>
                  <p className="text-xs">{msg.content}</p>
                </div>
                {msg.role === 'user' && <div className="p-2 bg-indigo-500/10 rounded-xl border border-indigo-500/20"><User className="w-4 h-4 text-indigo-400" /></div>}
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-slate-800">
            <div className="flex items-center gap-3">
              <input type="text" placeholder="Ask the AI assistant anything..." value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMessage()}
                className="flex-1 bg-[#1E293B] text-slate-200 text-xs px-4 py-3 rounded-xl border border-slate-700/60 focus:outline-none focus:border-indigo-500/50" />
              <button onClick={sendMessage} className="p-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition-all disabled:opacity-40"><Send className="w-4 h-4" /></button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
