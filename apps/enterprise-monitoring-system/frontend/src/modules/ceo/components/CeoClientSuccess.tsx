import React from 'react';
import { HeartHandshake, Star, Building, TrendingUp } from 'lucide-react';

export const CeoClientSuccess: React.FC = () => {
  return (
    <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6 lg:p-8 shadow-2xl mb-8">
      <div className="border-b border-slate-800 pb-4 mb-6">
        <h3 className="text-xl font-bold text-white">Client Success Center</h3>
        <p className="text-slate-400 text-xs mt-1">Enterprise account health and satisfaction metrics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 flex items-center justify-between group hover:border-blue-500/50 transition-colors">
          <div>
            <p className="text-slate-400 text-xs font-bold mb-1">Active Clients</p>
            <p className="text-3xl font-extrabold text-white">124</p>
            <p className="text-xs text-emerald-400 font-bold mt-2">+4 This Quarter</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
            <Building className="w-6 h-6 text-blue-400" />
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 flex items-center justify-between group hover:border-emerald-500/50 transition-colors">
          <div>
            <p className="text-slate-400 text-xs font-bold mb-1">Avg NPS Score</p>
            <p className="text-3xl font-extrabold text-white">72</p>
            <p className="text-xs text-emerald-400 font-bold mt-2">Industry Top 10%</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
            <HeartHandshake className="w-6 h-6 text-emerald-400" />
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 flex items-center justify-between group hover:border-amber-500/50 transition-colors">
          <div>
            <p className="text-slate-400 text-xs font-bold mb-1">Satisfaction Rating</p>
            <p className="text-3xl font-extrabold text-white">4.8/5</p>
            <p className="text-xs text-amber-400 font-bold mt-2">Based on 1.2k reviews</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center">
            <Star className="w-6 h-6 text-amber-400" />
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 flex items-center justify-between group hover:border-purple-500/50 transition-colors">
          <div>
            <p className="text-slate-400 text-xs font-bold mb-1">Top Tier Revenue</p>
            <p className="text-3xl font-extrabold text-white">68%</p>
            <p className="text-xs text-purple-400 font-bold mt-2">From top 20 clients</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-purple-400" />
          </div>
        </div>
      </div>
    </div>
  );
};
