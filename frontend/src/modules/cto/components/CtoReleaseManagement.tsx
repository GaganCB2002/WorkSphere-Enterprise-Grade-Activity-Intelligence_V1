import React from 'react';
import { GitCommit, PlayCircle, CheckCircle, AlertOctagon } from 'lucide-react';

export const CtoReleaseManagement: React.FC = () => {
  const releases = [
    { version: 'v2.4.0 (Core)', status: 'Active', time: 'Today 10:00 AM', type: 'Feature', icon: PlayCircle, color: 'text-blue-400' },
    { version: 'v1.9.2 (Auth)', status: 'Success', time: 'Yesterday', type: 'Hotfix', icon: CheckCircle, color: 'text-emerald-400' },
    { version: 'v3.0.0-beta', status: 'Failed', time: '2 Days Ago', type: 'Major', icon: AlertOctagon, color: 'text-rose-400' },
    { version: 'v2.3.9 (UI)', status: 'Success', time: '3 Days Ago', type: 'Patch', icon: CheckCircle, color: 'text-emerald-400' },
  ];

  return (
    <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6 lg:p-8 shadow-2xl mb-8">
      <div className="border-b border-slate-800 pb-4 mb-6">
        <h3 className="text-xl font-bold text-white">Release Management</h3>
        <p className="text-slate-400 text-xs mt-1">Timeline of upcoming, active, and past production deployments</p>
      </div>

      <div className="relative">
        <div className="absolute top-0 bottom-0 left-6 w-0.5 bg-slate-800" />
        <div className="space-y-6">
          {releases.map((release, idx) => {
            const Icon = release.icon;
            return (
              <div key={idx} className="relative flex items-center gap-6">
                <div className="w-12 h-12 rounded-full bg-slate-900 border-4 border-slate-950 flex items-center justify-center z-10">
                  <Icon className={`w-5 h-5 ${release.color}`} />
                </div>
                <div className="flex-1 bg-slate-900/50 border border-slate-800 rounded-2xl p-4 flex justify-between items-center group hover:bg-slate-800/50 transition-colors">
                  <div>
                    <div className="flex items-center gap-3">
                      <h4 className="text-white font-bold text-sm">{release.version}</h4>
                      <span className="text-xs px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 font-semibold">{release.type}</span>
                    </div>
                    <p className="text-slate-400 text-xs mt-1 flex items-center gap-1">
                      <GitCommit className="w-3 h-3" />
                      {release.time}
                    </p>
                  </div>
                  <span className={`text-xs font-bold ${release.color}`}>
                    {release.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
