import React, { useState } from 'react';
import { Bot, X, Sparkles } from 'lucide-react';
import { EnterpriseAiCopilot } from './EnterpriseAiCopilot';
import { useSelector } from 'react-redux';

export const GlobalEnterpriseCopilot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state: any) => state.auth?.user);

  if (!user) return null; // Don't show if not logged in

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      <div className="relative flex flex-col items-end">
        {isOpen && (
          <div className="mb-4 w-[90vw] max-w-[800px] bg-slate-900 border border-slate-700 shadow-2xl rounded-2xl overflow-hidden animate-in slide-in-from-bottom-2 fade-in duration-200">
            <div className="flex justify-between items-center p-3 border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-brand font-bold text-sm px-2">
                <Sparkles className="w-4 h-4 text-violet-400" /> Enterprise AI Copilot ({user.role.replace('_', ' ')})
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="max-h-[75vh] overflow-y-auto custom-scrollbar p-2">
              <EnterpriseAiCopilot />
            </div>
          </div>
        )}
        
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center justify-center p-4 rounded-full shadow-2xl shadow-violet-600/30 transition-all duration-300 hover:scale-110 active:scale-95 ${
            isOpen ? 'bg-slate-800 text-white border border-slate-700' : 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white'
          }`}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Bot className="w-6 h-6" />}
        </button>
      </div>
    </div>
  );
};
