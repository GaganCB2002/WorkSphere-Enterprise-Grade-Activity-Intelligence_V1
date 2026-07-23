// @ts-nocheck
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Copy, Sparkles, Send, RefreshCw, BookOpen, FileOutput } from 'lucide-react';

export const DocumentationAI = () => {
  const [prompt, setPrompt] = useState('');
  const [output, setOutput] = useState('// Generated documentation will appear here...\n// Enter a topic above and click Generate');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      const res = await fetch('/api/tech-lead/ai/documentation', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ prompt }) });
      const data = await res.json();
      setOutput(data.documentation || '// No documentation generated');
    } catch { setOutput('// Error generating documentation'); }
    setLoading(false);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#0B0F19] text-slate-100 min-h-screen p-4 sm:p-6 space-y-6">
      <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2"><BookOpen className="w-6 h-6 text-indigo-500" /> AI Documentation Generator</h1>
        <p className="text-xs text-slate-400 mt-0.5">Generate technical documentation with AI</p>
      </div>
      <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-md space-y-4">
        <div className="flex items-center gap-3">
          <input type="text" value={prompt} onChange={e => setPrompt(e.target.value)} placeholder="Describe what you want documented..." className="flex-1 bg-[#1E293B] border border-slate-700/60 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 placeholder-slate-500" onKeyDown={e => e.key === 'Enter' && handleGenerate()} />
          <button onClick={handleGenerate} disabled={loading} className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white px-5 py-3 rounded-xl text-sm font-semibold">{loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}{loading ? 'Generating...' : 'Generate'}</button>
        </div>
        <div className="relative">
          <div className="bg-[#090b10] rounded-xl border border-slate-800/80 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800 bg-[#1E293B]/30"><div className="flex items-center gap-2 text-xs text-slate-400"><FileOutput className="w-3.5 h-3.5" />Generated Documentation</div><button onClick={() => { navigator.clipboard?.writeText(output); }} className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-200"><Copy className="w-3.5 h-3.5" />Copy</button></div>
            <div className="p-4 text-xs text-slate-300 whitespace-pre-wrap max-h-96 custom-scrollbar">{output}</div>
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          {['API endpoint documentation', 'Architecture overview', 'Deployment guide', 'Code style guide'].map((s, i) => (
            <button key={i} onClick={() => setPrompt(s)} className="text-xs bg-[#1E293B] hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-700/60">{s}</button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

