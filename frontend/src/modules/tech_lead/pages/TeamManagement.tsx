import React, { useState } from 'react';
import { 
  Users, Check, X, Calendar, AlertTriangle, Shield, 
  MoreVertical, Mail, GitCommit, Settings2, Sparkles, Filter
} from 'lucide-react';

const MOCK_TEAM = [
  { id: '1', name: 'Sarah Jenkins', role: 'Senior Frontend', status: 'online', workload: 85, prs: 3, bugs: 1, avatar: 'SJ' },
  { id: '2', name: 'Alex Developer', role: 'Backend Dev', status: 'busy', workload: 110, prs: 1, bugs: 4, avatar: 'AD', overloaded: true },
  { id: '3', name: 'Mike Tech', role: 'DevOps Engineer', status: 'offline', workload: 45, prs: 0, bugs: 0, avatar: 'MT', onLeave: true },
  { id: '4', name: 'Emma Watson', role: 'QA Automation', status: 'online', workload: 70, prs: 2, bugs: 2, avatar: 'EW' },
  { id: '5', name: 'David Ops', role: 'SRE', status: 'online', workload: 65, prs: 1, bugs: 1, avatar: 'DO' },
];

const MOCK_LEAVE_REQUESTS = [
  { id: 'LR-101', name: 'Mike Tech', type: 'Annual Leave', dates: 'May 22 - May 25', backup: 'David Ops', status: 'pending' },
];

export const TeamManagement: React.FC = () => {
  const [team, setTeam] = useState(MOCK_TEAM);
  const [leaveRequests, setLeaveRequests] = useState(MOCK_LEAVE_REQUESTS);

  const handleApproveLeave = (id: string) => {
    setLeaveRequests(prev => prev.map(lr => lr.id === id ? { ...lr, status: 'approved' } : lr));
  };

  const handleRejectLeave = (id: string) => {
    setLeaveRequests(prev => prev.map(lr => lr.id === id ? { ...lr, status: 'rejected' } : lr));
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 tracking-tight flex items-center gap-2">
            <Users className="w-6 h-6 text-indigo-500" /> Team & Workload Management
          </h1>
          <p className="text-sm text-[#8b949e] mt-1">Manage allocations, approve leaves, and balance sprint capacity.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-[#21262d] hover:bg-[#30363d] text-slate-300 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors border border-[#30363d]">
            <Filter className="w-4 h-4" />
            Filter
          </button>
          <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-md text-xs font-semibold transition-colors shadow-sm">
            <Settings2 className="w-4 h-4" />
            Capacity Settings
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Team Grid */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-200">Active Squad (5 Members)</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {team.map(member => (
              <div key={member.id} className="bg-[#0E1117] border border-[#21262d] rounded-xl p-5 hover:border-[#30363d] transition-colors relative">
                {member.overloaded && (
                  <div className="absolute top-0 right-0 bg-rose-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-bl-lg rounded-tr-xl flex items-center gap-1 shadow-sm">
                    <AlertTriangle className="w-3 h-3" /> OVERLOADED
                  </div>
                )}
                {member.onLeave && (
                  <div className="absolute top-0 right-0 bg-amber-500 text-slate-900 text-[9px] font-bold px-2 py-0.5 rounded-bl-lg rounded-tr-xl flex items-center gap-1 shadow-sm">
                    <Calendar className="w-3 h-3" /> ON LEAVE
                  </div>
                )}
                
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-xl bg-indigo-900/50 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold shadow-sm">
                        {member.avatar}
                      </div>
                      <div className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-[#0E1117] ${
                        member.status === 'online' ? 'bg-emerald-500' : member.status === 'busy' ? 'bg-rose-500' : 'bg-slate-500'
                      }`} />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-slate-100 leading-tight">{member.name}</h3>
                      <p className="text-[#8b949e] text-xs font-medium">{member.role}</p>
                    </div>
                  </div>
                  <button className="text-[#8b949e] hover:text-slate-200">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span className="text-slate-400">Current Workload</span>
                      <span className={member.overloaded ? 'text-rose-400' : 'text-indigo-400'}>{member.workload}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-[#21262d] rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${member.overloaded ? 'bg-rose-500' : 'bg-indigo-500'}`} 
                        style={{ width: `${Math.min(member.workload, 100)}%` }} 
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-3 border-t border-[#21262d]">
                    <div className="flex items-center gap-1.5 text-xs text-[#8b949e] bg-[#161b22] px-2 py-1 rounded border border-[#30363d] flex-1 justify-center">
                      <GitCommit className="w-3.5 h-3.5" />
                      <span className="font-bold text-slate-300">{member.prs}</span> PRs
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-[#8b949e] bg-[#161b22] px-2 py-1 rounded border border-[#30363d] flex-1 justify-center">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span className="font-bold text-slate-300">{member.bugs}</span> Bugs
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar - Leave & Delegation */}
        <div className="space-y-6">
          
          <div className="bg-[#0E1117] border border-[#21262d] rounded-xl overflow-hidden">
            <div className="p-4 border-b border-[#21262d] flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-amber-500" /> Pending Leave Requests
              </h2>
              <span className="bg-amber-500/20 text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded-full">
                {leaveRequests.filter(r => r.status === 'pending').length} Action Reqd
              </span>
            </div>
            
            <div className="divide-y divide-[#21262d]">
              {leaveRequests.map(request => (
                <div key={request.id} className="p-4 bg-[#090b10]">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="text-sm font-bold text-slate-200">{request.name}</h4>
                      <p className="text-xs font-semibold text-amber-400 mt-0.5">{request.type}</p>
                    </div>
                    <span className="text-[10px] font-mono text-[#8b949e] border border-[#30363d] px-1.5 py-0.5 rounded">
                      {request.id}
                    </span>
                  </div>
                  
                  <div className="bg-[#161b22] rounded-lg p-3 border border-[#30363d] mb-4">
                    <div className="flex justify-between text-xs mb-2">
                      <span className="text-[#8b949e]">Dates</span>
                      <span className="font-bold text-slate-200">{request.dates}</span>
                    </div>
                    <div className="flex justify-between text-xs pt-2 border-t border-[#30363d]">
                      <span className="text-[#8b949e]">Proposed Backup</span>
                      <span className="font-bold text-indigo-400 flex items-center gap-1">
                        <Shield className="w-3 h-3" /> {request.backup}
                      </span>
                    </div>
                  </div>

                  {request.status === 'pending' ? (
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleApproveLeave(request.id)}
                        className="flex-1 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 py-1.5 rounded-md text-xs font-bold transition-colors flex items-center justify-center gap-1"
                      >
                        <Check className="w-3.5 h-3.5" /> Approve
                      </button>
                      <button 
                        onClick={() => handleRejectLeave(request.id)}
                        className="flex-1 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400 py-1.5 rounded-md text-xs font-bold transition-colors flex items-center justify-center gap-1"
                      >
                        <X className="w-3.5 h-3.5" /> Reject
                      </button>
                    </div>
                  ) : (
                    <div className={`text-center py-1.5 rounded-md text-xs font-bold border uppercase tracking-wider ${
                      request.status === 'approved' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                    }`}>
                      {request.status}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#0E1117] border border-[#21262d] rounded-xl p-4 flex gap-3">
             <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center shrink-0">
               <Sparkles className="w-5 h-5 text-indigo-400" />
             </div>
             <div>
               <h3 className="text-xs font-bold text-slate-200 mb-1">AI Rebalancing Suggestion</h3>
               <p className="text-[11px] text-[#8b949e] leading-snug">
                 Alex Developer is overloaded (110%). Consider moving ticket ENG-402 to Emma Watson who has 30% available capacity.
               </p>
               <button className="text-xs font-bold text-indigo-400 hover:text-indigo-300 mt-2">
                 Apply Rebalance
               </button>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};
