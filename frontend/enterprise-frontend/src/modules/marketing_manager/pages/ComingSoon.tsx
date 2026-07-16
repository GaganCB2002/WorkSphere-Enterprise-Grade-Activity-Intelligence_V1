import React from 'react';
import { Hammer, Sparkles, ArrowRight } from 'lucide-react';

export const ComingSoon: React.FC<{ activeView: string; setView: (v: string) => void }> = ({ activeView, setView }) => {
  const formattedViewName = activeView
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] animate-in fade-in zoom-in-95 duration-500">
      
      <div className="relative mb-8">
        <div className="absolute -inset-4 bg-blue-100 rounded-full blur-xl opacity-50 animate-pulse"></div>
        <div className="w-24 h-24 bg-white dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 rounded-3xl shadow-xl flex items-center justify-center relative z-10 rotate-3 transition-transform hover:rotate-6">
          <Hammer className="w-10 h-10 text-[#0d47a1] dark:text-blue-400" />
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center border-2 border-white dark:border-slate-900">
            <Sparkles className="w-4 h-4 text-amber-500" />
          </div>
        </div>
      </div>

      <h1 className="font-headline text-3xl md:text-4xl text-[#0f172a] dark:text-slate-100 font-bold tracking-tight mb-4 text-center">
        {formattedViewName} is Coming Soon
      </h1>
      
      <p className="font-body text-[#475569] dark:text-slate-300 text-base md:text-lg max-w-lg text-center mb-10 leading-relaxed">
        We are crafting a beautiful new experience for the <span className="font-bold text-[#0d47a1] dark:text-blue-400">{formattedViewName}</span> module. It will be available in the upcoming Enterprise Release.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <button 
          onClick={() => setView('dashboard')}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-[#0d47a1] dark:bg-blue-600 hover:bg-[#0a3982] text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-900/20 transition-all"
        >
          Return to Dashboard <ArrowRight className="w-4 h-4" />
        </button>
        <button 
          onClick={() => alert('Notifications enabled for this module!')}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 hover:bg-[#f8fafc] dark:hover:bg-slate-800 text-[#0f172a] dark:text-slate-100 rounded-xl text-sm font-bold shadow-sm transition-all"
        >
          Notify Me When Live
        </button>
      </div>

    </div>
  );
};
