import React from 'react';
import { Users, UserPlus, FileSignature, AlertTriangle, TrendingDown } from 'lucide-react';

export const HrOverview: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-200">HR Operations Overview</h1>
          <p className="text-sm text-[#8b949e] mt-1">Real-time workforce analytics and AI-driven insights.</p>
        </div>
      </div>

      {/* High-level Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Headcount', value: '1,248', trend: '+12 this month', icon: Users, color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
          { label: 'Open Requisitions', value: '45', trend: '8 critical roles', icon: UserPlus, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
          { label: 'Pending Approvals', value: '89', trend: 'Leave & Payroll', icon: FileSignature, color: 'text-amber-400', bg: 'bg-amber-500/10' },
          { label: 'Attrition Risk (AI)', value: 'High', trend: 'Engineering Dept', icon: AlertTriangle, color: 'text-rose-400', bg: 'bg-rose-500/10' },
        ].map((stat, i) => (
          <div key={i} className="bg-[#161b22] border border-[#30363d] p-5 rounded-2xl flex flex-col justify-between hover:border-slate-500 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2 rounded-xl ${stat.bg}`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-slate-200 mb-1">{stat.value}</div>
              <div className="text-sm font-semibold text-[#8b949e] flex items-center justify-between">
                <span>{stat.label}</span>
                <span className="text-[10px] uppercase tracking-wider">{stat.trend}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Attrition Prediction Chart Placeholder */}
        <div className="lg:col-span-2 bg-[#161b22] border border-[#30363d] rounded-2xl p-6 h-[400px] flex flex-col">
          <h3 className="text-sm font-bold text-slate-200 mb-4 flex items-center gap-2">
            <TrendingDown className="w-4 h-4 text-rose-400" />
            AI Attrition Forecast (Next 90 Days)
          </h3>
          <div className="flex-1 border border-dashed border-[#30363d] rounded-xl flex items-center justify-center text-[#8b949e]">
            [Recharts AreaGraph: Attrition Probability vs Time]
          </div>
        </div>

        {/* AI Actionable Alerts */}
        <div className="lg:col-span-1 bg-[#161b22] border border-[#30363d] rounded-2xl p-6">
          <h3 className="text-sm font-bold text-slate-200 mb-4">Smart HR Alerts</h3>
          <div className="space-y-3">
            <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl">
              <div className="text-xs font-bold text-amber-400 mb-1">Burnout Risk Detected</div>
              <p className="text-xs text-slate-300">5 employees in DevOps have logged 60+ hours this week.</p>
            </div>
            <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl">
              <div className="text-xs font-bold text-rose-400 mb-1">Compliance Warning</div>
              <p className="text-xs text-slate-300">12 employee NDAs are expiring in the next 30 days.</p>
            </div>
            <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl">
              <div className="text-xs font-bold text-indigo-400 mb-1">Hiring Bottleneck</div>
              <p className="text-xs text-slate-300">Senior Frontend Engineer role has been open for 45+ days.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
