import React from 'react';
import { BarChart3, TrendingUp, Sparkles, ShieldCheck } from 'lucide-react';
import { PerformanceScore } from '../components/analytics/PerformanceScore';
import { ProductivityChart } from '../components/analytics/ProductivityChart';
import { AIInsightsPanel } from '../components/analytics/AIInsightsPanel';
import { GlassPanel } from '../components/ui/GlassPanel';
import * as mock from '../data/mockData';

export function AnalyticsPage() {
  const metrics = mock.productivityMetrics;

  const handleInsightAction = (insightId: string) => {
    // Standard mock action feedback
    console.log(`Action executed for AI Insight: ${insightId}`);
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Page Header */}
      <GlassPanel className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">Performance Analytics</h1>
              <p className="text-xs text-slate-400 mt-0.5">Real-time productivity indices and health diagnostics</p>
            </div>
          </div>
          
          <div className="hidden sm:flex items-center gap-2 text-[10px] text-emerald-500 font-bold bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-250 dark:border-emerald-900/30 px-3.5 py-2 rounded-xl">
            <ShieldCheck className="w-4 h-4" />
            <span>Active Performance Cycle</span>
          </div>
        </div>
      </GlassPanel>

      {/* Radial Performance Score & Breakdown */}
      <PerformanceScore metrics={metrics} />

      {/* Main Charts & Side AI Panel */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Productivity Curve Graphs (2/3) */}
        <div className="xl:col-span-2">
          <ProductivityChart
            weeklyData={mock.weeklyProductivity}
            monthlyData={mock.monthlyTrends}
          />
        </div>

        {/* AI Insight Stack (1/3) */}
        <div>
          <AIInsightsPanel
            insights={mock.aiInsights}
            onAction={handleInsightAction}
          />
        </div>
      </div>
    </div>
  );
}

export default AnalyticsPage;
