import React from 'react';
import { Users, Mail, MessageSquare, Video, Shield, Circle, Activity } from 'lucide-react';

const mockTeam = [
  { id: '1', name: 'Alex Developer', role: 'Software Engineer', status: 'online', workload: 8, task: 'ENG-101: gRPC streaming', isManager: false },
  { id: '2', name: 'Sarah Engineer', role: 'Senior Frontend Engineer', status: 'busy', workload: 12, task: 'ENG-105: Redux to Zustand', isManager: false },
  { id: '3', name: 'David Ops', role: 'DevOps Engineer', status: 'offline', workload: 5, task: 'INF-398: Update Kubernetes charts', isManager: false },
  { id: '4', name: 'Elena Manager', role: 'Engineering Manager', status: 'online', workload: 0, task: 'Sprint Planning Session', isManager: true },
];

export const Team: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#21262d]">
        <div>
          <h1 className="text-2xl font-bold text-[#e6edf3]">Team Collaboration</h1>
          <p className="text-sm text-[#8b949e] mt-1">View team availability, sprint workload, and start real-time communication.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-3 py-1.5 bg-[#21262d] border border-[#30363d] text-[#e6edf3] hover:bg-[#30363d] text-sm font-medium rounded-md transition-colors">
            <Video className="w-4 h-4 text-[#8b949e]" />
            Start Meet
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockTeam.map(member => (
          <div key={member.id} className="bg-[#0d1117] border border-[#30363d] rounded-xl p-5 hover:border-[#8b949e] transition-colors relative group">
            {/* Status Indicator */}
            <div className="absolute top-5 right-5 flex flex-col items-center gap-1">
              {member.status === 'online' && <Circle className="w-3 h-3 fill-emerald-500 text-emerald-500" />}
              {member.status === 'busy' && <Circle className="w-3 h-3 fill-amber-500 text-amber-500" />}
              {member.status === 'offline' && <Circle className="w-3 h-3 fill-[#30363d] text-[#30363d]" />}
            </div>

            {/* Profile Info */}
            <div className="flex flex-col items-center text-center mt-2 mb-4">
              <div className="w-16 h-16 rounded-full bg-blue-900 border-2 border-blue-700 flex items-center justify-center font-bold text-blue-200 text-xl mb-3 shadow-md relative">
                {member.name[0]}
                {member.isManager && (
                  <div className="absolute -bottom-2 -right-2 bg-[#21262d] border border-[#30363d] rounded-full p-1">
                    <Shield className="w-3 h-3 text-[#d29922]" />
                  </div>
                )}
              </div>
              <h3 className="font-bold text-[#e6edf3]">{member.name}</h3>
              <p className="text-xs text-[#8b949e] font-medium mt-1">{member.role}</p>
            </div>

            {/* Current Work */}
            <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-3 mb-4 h-24 flex flex-col justify-center">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#8b949e] uppercase mb-1">
                <Activity className="w-3 h-3" /> Current Focus
              </div>
              <p className="text-sm text-[#e6edf3] line-clamp-2">{member.task}</p>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-center gap-2 pt-4 border-t border-[#30363d]">
              <button className="flex-1 flex items-center justify-center gap-2 py-1.5 rounded bg-[#21262d] text-[#8b949e] hover:text-white hover:bg-[#30363d] transition-colors text-xs font-medium border border-transparent hover:border-[#8b949e]">
                <MessageSquare className="w-4 h-4" /> Chat
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 py-1.5 rounded bg-[#21262d] text-[#8b949e] hover:text-white hover:bg-[#30363d] transition-colors text-xs font-medium border border-transparent hover:border-[#8b949e]">
                <Mail className="w-4 h-4" /> Email
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
