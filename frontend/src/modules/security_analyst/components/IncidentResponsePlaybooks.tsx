import React, { useState } from 'react';
import { PlayCircle, ShieldAlert, CheckCircle, Clock, ChevronRight } from 'lucide-react';

export const IncidentResponsePlaybooks: React.FC = () => {
  const [activePlaybook, setActivePlaybook] = useState<string | null>(null);

  const playbooks = [
    { id: 'ransomware', title: 'Ransomware Containment', threatLevel: 'CRITICAL', time: 'Est. 45s' },
    { id: 'ddos', title: 'DDoS Mitigation Routing', threatLevel: 'HIGH', time: 'Est. 120s' },
    { id: 'phishing', title: 'Phishing Campaign Neutralization', threatLevel: 'MEDIUM', time: 'Est. 300s' },
    { id: 'insider', title: 'Insider Threat Data Exfil Block', threatLevel: 'CRITICAL', time: 'Est. 15s' },
  ];

  return (
    <div className="flex gap-6 h-full">
      {/* Playbook Library */}
      <div className="w-1/3 flex flex-col space-y-4">
        <h3 className="font-bold text-white text-lg">Automated Playbooks</h3>
        <p className="text-sm text-slate-400 mb-2">Select an incident response playbook to execute predefined SIEM automation.</p>
        
        <div className="flex-1 space-y-3 overflow-y-auto">
          {playbooks.map(pb => (
            <div 
              key={pb.id}
              onClick={() => setActivePlaybook(pb.id)}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                activePlaybook === pb.id 
                  ? 'bg-indigo-500/10 border-indigo-500/50 shadow-[0_0_15px_rgba(99,102,241,0.15)]' 
                  : 'bg-slate-900/50 border-slate-800 hover:border-slate-600'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="font-bold text-white text-sm">{pb.title}</div>
                <div className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  pb.threatLevel === 'CRITICAL' ? 'bg-red-500/20 text-red-500' :
                  pb.threatLevel === 'HIGH' ? 'bg-amber-500/20 text-amber-500' :
                  'bg-blue-500/20 text-blue-400'
                }`}>
                  {pb.threatLevel}
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs text-slate-500">
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {pb.time}</span>
                <span className="flex items-center gap-1 text-indigo-400 font-bold group-hover:text-indigo-300">
                  Select <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Playbook Execution View */}
      <div className="flex-1 bg-slate-900/50 border border-slate-800 rounded-2xl p-8 flex flex-col relative overflow-hidden">
        {activePlaybook ? (
          <div className="h-full flex flex-col relative z-10">
            <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-800">
              <div className="p-3 bg-indigo-500/20 rounded-xl text-indigo-400 border border-indigo-500/30">
                <ShieldAlert className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-white">{playbooks.find(p => p.id === activePlaybook)?.title}</h2>
                <p className="text-slate-400">Execution Phase: <span className="text-amber-400">Awaiting Authorization</span></p>
              </div>
              <button className="ml-auto px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl flex items-center gap-2 shadow-lg shadow-red-500/20 transition-all hover:scale-105 active:scale-95">
                <PlayCircle className="w-5 h-5" /> Execute Playbook
              </button>
            </div>

            <h3 className="font-bold text-white mb-4">Automation Steps</h3>
            <div className="space-y-4">
              {[
                { step: '1', title: 'Isolate affected endpoints from network', status: 'pending' },
                { step: '2', title: 'Revoke compromised user sessions', status: 'pending' },
                { step: '3', title: 'Snapshot current memory for forensics', status: 'pending' },
                { step: '4', title: 'Deploy decoy services (Honeypots)', status: 'pending' },
                { step: '5', title: 'Notify Executive Incident Response Team', status: 'pending' },
              ].map(step => (
                <div key={step.step} className="flex items-center gap-4 p-4 bg-slate-950 border border-slate-800 rounded-xl opacity-50">
                   <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-500 font-bold border border-slate-700">{step.step}</div>
                   <div className="flex-1 font-bold text-slate-300">{step.title}</div>
                   <div className="text-xs font-bold text-slate-500 uppercase">Pending</div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center relative z-10">
            <ShieldAlert className="w-16 h-16 text-slate-700 mb-4" />
            <h2 className="text-xl font-bold text-slate-400">No Playbook Selected</h2>
            <p className="text-slate-500 max-w-md mt-2">Select a playbook from the library to view automation steps and execute response protocols.</p>
          </div>
        )}

        {/* Background aesthetic */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none"></div>
      </div>
    </div>
  );
};
