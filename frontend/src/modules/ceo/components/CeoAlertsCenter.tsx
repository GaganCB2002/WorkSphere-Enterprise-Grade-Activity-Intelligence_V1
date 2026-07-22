import React from 'react';
import { AlertTriangle, TrendingDown, Users, Clock } from 'lucide-react';

export const CeoAlertsCenter: React.FC = () => {
  const alerts = [
    { type: 'Critical', message: 'Revenue Drop Alert: EMEA Region down 8% this week', time: '10 mins ago', icon: TrendingDown, color: 'text-rose-400', bg: 'bg-rose-500/10 border-rose-500/20' },
    { type: 'High', message: 'Employee Attrition Risk: Customer Support Dept', time: '1 hour ago', icon: Users, color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20' },
    { type: 'Medium', message: 'Project Delay Alert: Mobile App Redesign', time: '4 hours ago', icon: Clock, color: 'text-orange-400', bg: 'bg-orange-500/10 border-orange-500/20' },
    { type: 'Critical', message: 'Compliance Alert: SOC 2 Recertification Due', time: '1 day ago', icon: AlertTriangle, color: 'text-rose-400', bg: 'bg-rose-500/10 border-rose-500/20' },
  ];

  return (
    <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6 lg:p-8 shadow-2xl">
      <div className="border-b border-slate-800 pb-4 mb-6 flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold text-white">Executive Alerts Center</h3>
          <p className="text-slate-400 text-xs mt-1">Real-time business risk and anomaly detection</p>
        </div>
        <span className="px-3 py-1 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold rounded-full">
          2 Critical Action Required
        </span>
      </div>

      <div className="space-y-4">
        {alerts.map((alert, i) => {
          const Icon = alert.icon;
          return (
            <div key={i} className={`flex items-start gap-4 p-4 rounded-2xl border ${alert.bg} transition-colors hover:bg-slate-800/50`}>
              <div className="w-10 h-10 rounded-xl bg-slate-950 flex items-center justify-center shrink-0">
                <Icon className={`w-5 h-5 ${alert.color}`} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white mb-1">{alert.message}</h4>
                <p className="text-xs font-semibold text-slate-400">{alert.type} Priority • {alert.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
