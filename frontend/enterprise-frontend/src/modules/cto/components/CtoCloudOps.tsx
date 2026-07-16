import React from 'react';
import { Cloud, AlertCircle, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export const CtoCloudOps: React.FC = () => {
  const providers = [
    { name: 'Amazon Web Services', logo: 'aws', cost: '₹42,500', trend: '+2.4%', up: true, instances: 142, alerts: 2, color: 'text-amber-500', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
    { name: 'Microsoft Azure', logo: 'azure', cost: '₹18,200', trend: '-5.1%', up: false, instances: 64, alerts: 0, color: 'text-blue-500', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
    { name: 'Google Cloud Platform', logo: 'gcp', cost: '₹12,800', trend: '+1.2%', up: true, instances: 45, alerts: 1, color: 'text-rose-500', bg: 'bg-rose-500/10', border: 'border-rose-500/20' }
  ];

  return (
    <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6 lg:p-8 shadow-2xl mb-8">
      <div className="border-b border-slate-800 pb-4 mb-6">
        <h3 className="text-xl font-bold text-white">Multi-Cloud Operations Center</h3>
        <p className="text-slate-400 text-xs mt-1">Cross-platform resource and billing telemetry</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {providers.map((provider, idx) => (
          <div key={idx} className={`p-6 rounded-2xl border ${provider.border} ${provider.bg} relative overflow-hidden group`}>
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-3">
                <Cloud className={`w-6 h-6 ${provider.color}`} />
                <h4 className="font-bold text-white">{provider.name}</h4>
              </div>
              {provider.alerts > 0 && (
                <div className="flex items-center gap-1 text-xs font-bold text-rose-400 bg-rose-500/10 px-2 py-1 rounded-full border border-rose-500/20">
                  <AlertCircle className="w-3 h-3" />
                  {provider.alerts} Alerts
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-slate-400 text-xs font-semibold mb-1">Monthly Cost</p>
                  <p className="text-2xl font-extrabold text-white">{provider.cost}</p>
                </div>
                <div className={`flex items-center gap-1 text-xs font-bold ${provider.up ? 'text-rose-400' : 'text-emerald-400'}`}>
                  {provider.up ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                  {provider.trend}
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-white/5">
                <span className="text-slate-400 text-xs font-medium">Running Instances</span>
                <span className="text-white font-bold">{provider.instances} Nodes</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
