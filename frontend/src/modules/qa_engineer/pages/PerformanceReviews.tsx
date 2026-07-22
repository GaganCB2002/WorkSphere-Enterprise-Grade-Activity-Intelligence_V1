import React, { useState } from 'react';
import { TrendingUp, Star, Code, Bug, Award, Search, ChevronDown } from 'lucide-react';
import { usePerformance } from '../data/hooks';

export const PerformanceReviews: React.FC = () => {
  const { performances } = usePerformance();
  const [sortBy, setSortBy] = useState<'scripts' | 'bugs' | 'score'>('score');
  const [search, setSearch] = useState('');

  const sorted = [...performances]
    .filter(p => !search || p.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'scripts') return b.scriptsWritten - a.scriptsWritten;
      if (sortBy === 'bugs') return b.bugsFound - a.bugsFound;
      return b.reviewScore - a.reviewScore;
    });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Performance Reviews</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">QA engineer performance metrics and peer feedback</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Top Score', value: Math.max(...performances.map(p => p.reviewScore)).toFixed(1), icon: Award, color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-900/20' },
          { label: 'Total Scripts', value: performances.reduce((a, p) => a + p.scriptsWritten, 0), icon: Code, color: 'text-violet-600', bg: 'bg-violet-50 dark:bg-violet-900/20' },
          { label: 'Total Bugs Found', value: performances.reduce((a, p) => a + p.bugsFound, 0), icon: Bug, color: 'text-red-600', bg: 'bg-red-50 dark:bg-red-900/20' },
          { label: 'Avg Coverage', value: `${Math.round(performances.reduce((a, p) => a + p.automationCoverage, 0) / performances.length)}%`, icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
        ].map((s, i) => (
          <div key={i} className={`${s.bg} border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm`}>
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">{s.label}</h3>
              <s.icon className={`w-5 h-5 ${s.color}`} />
            </div>
            <p className="text-3xl font-bold text-slate-900 dark:text-slate-100">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative w-56">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input type="text" value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search engineer..."
                className="w-full pl-8 pr-3 py-1.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-violet-500/30 text-slate-900 dark:text-slate-100 placeholder-slate-400" />
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <span>Sort by:</span>
              {(['score', 'scripts', 'bugs'] as const).map(opt => (
                <button key={opt} onClick={() => setSortBy(opt)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors ${sortBy === opt ? 'bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}>
                  {opt === 'score' ? 'Score' : opt === 'scripts' ? 'Scripts' : 'Bugs Found'}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          {sorted.map((p, i) => {
            const isTop = i === 0;
            return (
              <div key={p.id} className={`relative p-5 rounded-2xl border transition-all ${isTop ? 'border-amber-200 dark:border-amber-900/50 bg-gradient-to-br from-amber-50/50 to-white dark:from-amber-900/10 dark:to-slate-900 shadow-md' : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-sm'}`}>
                {isTop && (
                  <div className="absolute -top-2.5 right-4 px-3 py-0.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-[10px] font-bold rounded-full shadow-sm flex items-center gap-1">
                    <Star className="w-3 h-3" /> Top Performer
                  </div>
                )}
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-sm ${isTop ? 'bg-gradient-to-br from-amber-500 to-orange-600' : 'bg-gradient-to-br from-violet-500 to-indigo-600'}`}>
                    {p.initials}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">{p.name}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">{p.role}</p>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="text-center p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                        <Code className="w-4 h-4 text-violet-500 mx-auto mb-1" />
                        <p className="text-base font-bold text-slate-900 dark:text-slate-100">{p.scriptsWritten}</p>
                        <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Scripts</p>
                      </div>
                      <div className="text-center p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                        <Bug className="w-4 h-4 text-red-500 mx-auto mb-1" />
                        <p className="text-base font-bold text-slate-900 dark:text-slate-100">{p.bugsFound}</p>
                        <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Bugs</p>
                      </div>
                      <div className="text-center p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                        <Award className="w-4 h-4 text-amber-500 mx-auto mb-1" />
                        <p className="text-base font-bold text-slate-900 dark:text-slate-100">{p.reviewScore}</p>
                        <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Score</p>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span className="text-slate-400">Automation Coverage</span>
                        <span className="text-slate-900 dark:text-slate-100">{p.automationCoverage}%</span>
                      </div>
                      <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                        <div className={`h-full rounded-full ${p.automationCoverage >= 80 ? 'bg-gradient-to-r from-emerald-400 to-emerald-600' : p.automationCoverage >= 60 ? 'bg-gradient-to-r from-violet-400 to-violet-600' : 'bg-gradient-to-r from-amber-400 to-amber-600'}`}
                          style={{ width: `${p.automationCoverage}%` }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
