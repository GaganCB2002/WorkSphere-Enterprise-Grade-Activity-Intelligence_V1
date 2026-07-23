// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bot, Sparkles, Code, MessageSquare, Lightbulb, AlertTriangle, CheckCircle2, ArrowRight } from 'lucide-react';

export const EngineeringAI = () => {
  const [data, setData] = useState<any>(null);
  useEffect(() => { fetch('/api/tech-lead/ai/engineering').then(r => r.json()).then(d => setData(d)).catch(() => {}); }, []);
  const insights = data?.insights || [
    { type: 'risk', title: 'Sprint Risk: Backend Behind', desc: 'Backend team is 22% behind schedule. Database migration is bottlenecking 4 dependent tickets.', action: 'View Details' },
    { type: 'warning', title: 'Workload: Alex D. Overloaded', desc: 'Alex has logged >50 hours for 2 weeks. Consider reallocating PR reviews.', action: 'Rebalance' },
    { type: 'success', title: 'Delivery Predictor: On Track', desc: 'v2.4 RC will be ready for staging by Thursday 2PM (94% confidence).', action: 'View Timeline' },
    { type: 'suggestion', title: 'Test Coverage Gap', desc: 'PR-1042 drops component coverage by 4%. Missing OAuthCallback edge cases.', action: 'View PR' },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#0B0F19] text-slate-100 min-h-screen p-4 sm:p-6 space-y-6">
      <div className="flex items-center justify-between bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
        <div><h1 className="text-2xl font-bold text-white flex items-center gap-2"><Bot className="w-6 h-6 text-indigo-500" /> Engineering AI</h1><p className="text-xs text-slate-400 mt-0.5">AI-powered engineering insights and copilot</p></div>
        <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {insights.map((item, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className={"bg-[#0F172A]/90 border rounded-2xl p-5 backdrop-blur-md " + (item.type === 'risk' ? 'border-rose-500/20' : item.type === 'warning' ? 'border-amber-500/20' : item.type === 'success' ? 'border-emerald-500/20' : 'border-indigo-500/20')}>
            <div className="flex items-start gap-3">
              <div className={"p-2 rounded-lg " + (item.type === 'risk' ? 'bg-rose-500/10' : item.type === 'warning' ? 'bg-amber-500/10' : item.type === 'success' ? 'bg-emerald-500/10' : 'bg-indigo-500/10')}>
                {item.type === 'risk' ? <AlertTriangle className="w-5 h-5 text-rose-400" /> : item.type === 'warning' ? <AlertTriangle className="w-5 h-5 text-amber-400" /> : item.type === 'success' ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : <Lightbulb className="w-5 h-5 text-indigo-400" />}
              </div>
              <div className="flex-1"><h3 className={"font-bold text-sm " + (item.type === 'risk' ? 'text-rose-400' : item.type === 'warning' ? 'text-amber-400' : item.type === 'success' ? 'text-emerald-400' : 'text-indigo-400')}>{item.title}</h3><p className="text-xs text-slate-300 mt-1 leading-relaxed">{item.desc}</p><button className={"text-xs font-bold mt-2 flex items-center gap-1 " + (item.type === 'risk' ? 'text-rose-400 hover:text-rose-300' : 'text-indigo-400 hover:text-indigo-300')}>{item.action}<ArrowRight className="w-3 h-3" /></button></div>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-md">
        <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2"><Sparkles className="w-4 h-4 text-indigo-400" /> AI Chat</h2>
        <div className="bg-[#1E293B]/50 rounded-xl p-4 border border-slate-800/60">
          <div className="flex items-start gap-3 mb-4"><div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center"><Bot className="w-4 h-4 text-indigo-400" /></div><div className="flex-1"><p className="text-xs text-slate-300">I've analyzed your sprint data. The main risk is the backend database migration blocking 4 dependent tickets. Would you like me to generate a reallocation plan?</p></div></div>
          <div className="flex gap-2"><button className="text-xs bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-lg font-bold">Generate Plan</button><button className="text-xs bg-[#1E293B] hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg font-bold border border-slate-700/60">Ask Something Else</button></div>
        </div>
      </div>
    </motion.div>
  );
};

