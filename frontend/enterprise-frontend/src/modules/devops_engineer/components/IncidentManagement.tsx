import React from 'react';
import { AlertTriangle, Clock, User, Activity, FileText } from 'lucide-react';

const mockIncidents = [
  { id: 'INC-9042', severity: 'SEV-1', status: 'Investigating', owner: 'Alex M.', title: 'Payment API Timeout Spike', created: '15 mins ago' },
  { id: 'INC-9041', severity: 'SEV-2', status: 'Mitigated', owner: 'Sarah J.', title: 'Redis Cache Memory High', created: '2 hours ago' },
  { id: 'INC-9038', severity: 'SEV-3', status: 'Resolved', owner: 'David L.', title: 'Kubelet Node Not Ready', created: '1 day ago' },
];

export const IncidentManagement: React.FC = () => {
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2">
        <AlertTriangle className="w-5 h-5 text-amber-400" />
        <h2 className="text-xl font-bold text-white tracking-wide">Incident Management</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Active Incidents */}
        <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-3xl p-5 overflow-hidden shadow-2xl">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-white">Active Incidents</h3>
            <button className="px-3 py-1.5 bg-brand text-white text-xs font-bold rounded-lg hover:bg-brand-600 transition-colors">
              Declare Incident
            </button>
          </div>
          
          <div className="space-y-3">
            {mockIncidents.map((inc) => (
              <div key={inc.id} className="p-4 bg-slate-950 rounded-xl border border-slate-800 hover:border-slate-700 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-black text-white">{inc.id}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest ${
                      inc.severity === 'SEV-1' ? 'bg-rose-500/20 text-rose-400' :
                      inc.severity === 'SEV-2' ? 'bg-amber-500/20 text-amber-400' :
                      'bg-blue-500/20 text-blue-400'
                    }`}>
                      {inc.severity}
                    </span>
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${
                    inc.status === 'Investigating' ? 'text-rose-400' :
                    inc.status === 'Mitigated' ? 'text-amber-400' :
                    'text-emerald-400'
                  }`}>
                    {inc.status}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-300 mb-3">{inc.title}</h4>
                <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {inc.created}</span>
                    <span className="flex items-center gap-1"><User className="w-3 h-3" /> {inc.owner}</span>
                  </div>
                  <button className="text-brand hover:text-brand-400 font-bold">View RCA</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RCA Timeline */}
        <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-3xl p-5 shadow-2xl">
          <h3 className="font-bold text-white mb-4">INC-9041 Root Cause Timeline</h3>
          
          <div className="relative border-l border-slate-700 ml-3 space-y-6">
            <div className="relative pl-6">
              <span className="absolute -left-1.5 top-1 w-3 h-3 rounded-full bg-rose-500 border-4 border-slate-900"></span>
              <p className="text-xs text-slate-400 font-bold mb-1">14:02 UTC</p>
              <h4 className="text-sm font-bold text-white">Alert Triggered</h4>
              <p className="text-xs text-slate-500 mt-1">Datadog alert: Redis memory usage &gt; 95% on primary node.</p>
            </div>
            
            <div className="relative pl-6">
              <span className="absolute -left-1.5 top-1 w-3 h-3 rounded-full bg-amber-500 border-4 border-slate-900"></span>
              <p className="text-xs text-slate-400 font-bold mb-1">14:05 UTC</p>
              <h4 className="text-sm font-bold text-white">Incident Acknowledged</h4>
              <p className="text-xs text-slate-500 mt-1">Sarah J. joined bridge. Identified rogue background job spiking cache writes.</p>
            </div>
            
            <div className="relative pl-6">
              <span className="absolute -left-1.5 top-1 w-3 h-3 rounded-full bg-emerald-500 border-4 border-slate-900"></span>
              <p className="text-xs text-slate-400 font-bold mb-1">14:18 UTC</p>
              <h4 className="text-sm font-bold text-white">Mitigation Applied</h4>
              <p className="text-xs text-slate-500 mt-1">Scaled up Redis node instance type (r6g.xlarge). Background job throttled.</p>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-slate-950 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">RCA Document</span>
              <FileText className="w-4 h-4 text-slate-500" />
            </div>
            <p className="text-sm text-slate-300">Drafting Post-Mortem in Notion. Action items include implementing aggressive TTL for temporary analytics cache keys.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
