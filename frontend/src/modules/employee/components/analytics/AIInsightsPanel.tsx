import React from 'react';
import { Sparkles, ArrowRight, AlertTriangle, AlertCircle, Award, Lightbulb } from 'lucide-react';
import type { AIInsight } from '../../types';

interface AIInsightsPanelProps {
  insights: AIInsight[];
  onAction?: (actionType: string) => void;
}

export function AIInsightsPanel({ insights, onAction }: AIInsightsPanelProps) {
  const getImpactColor = (impact: AIInsight['impact']) => {
    switch (impact) {
      case 'high': return 'text-rose-500 bg-rose-50 dark:bg-rose-500/10 border border-rose-200/50';
      case 'medium': return 'text-amber-500 bg-amber-50 dark:bg-amber-500/10 border border-amber-200/50';
      case 'low': return 'text-blue-500 bg-blue-50 dark:bg-blue-500/10 border border-blue-200/50';
      default: return 'text-slate-500 bg-slate-50 border border-slate-200/50';
    }
  };

  const getTypeIcon = (type: AIInsight['type']) => {
    switch (type) {
      case 'achievement': return <Award className="w-4 h-4 text-emerald-500" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-rose-500" />;
      case 'suggestion': return <Lightbulb className="w-4 h-4 text-amber-500" />;
      default: return <Sparkles className="w-4 h-4 text-blue-500" />;
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900/60 backdrop-blur-md border border-slate-200/60 dark:border-white/[0.06] rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-4.5 h-4.5 text-amber-500" />
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">AI-Powered Insights</h3>
      </div>
      
      <div className="space-y-3.5">
        {insights.map(insight => (
          <div
            key={insight.id}
            className="p-4 rounded-xl border border-slate-100 dark:border-white/[0.03] bg-slate-50/50 dark:bg-slate-950/15 flex gap-3"
          >
            <div className="w-9 h-9 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/[0.04] shadow-sm flex items-center justify-center flex-shrink-0">
              {getTypeIcon(insight.type)}
            </div>
            
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1 mb-1">
                <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                  {insight.title}
                </p>
                <span className={`text-[8px] font-extrabold uppercase tracking-wider px-1.5 py-0.5 rounded ${getImpactColor(insight.impact)}`}>
                  {insight.impact} impact
                </span>
              </div>
              
              <p className="text-xs text-slate-500 dark:text-slate-400 font-normal leading-relaxed">
                {insight.description}
              </p>

              {insight.actionable && insight.actionLabel && (
                <button
                  onClick={() => onAction && onAction(insight.id)}
                  className="mt-2.5 text-[10px] font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 hover:underline flex items-center gap-0.5"
                >
                  <span>{insight.actionLabel}</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AIInsightsPanel;
