import React from 'react';
import { Mail, MessageCircle, Phone, Star, Clock, CheckCircle, Circle } from 'lucide-react';

interface TeamMember {
  name: string;
  role: string;
  status: 'online' | 'busy' | 'offline';
  avatar: string;
}

const mentor = { name: 'Sarah Jenkins', role: 'Senior Software Engineer', department: 'Engineering', email: 'sarah.j@worksphere.io', rating: 4.9, sessions: 12, nextSession: 'Fri, May 23 — 2:00 PM' };

const teamMembers: TeamMember[] = [
  { name: 'Sarah Jenkins', role: 'Mentor (Sr. SWE)', status: 'online', avatar: 'SJ' },
  { name: 'Michael Chang', role: 'Tech Lead', status: 'busy', avatar: 'MC' },
  { name: 'Priya Sharma', role: 'Project Manager', status: 'online', avatar: 'PS' },
  { name: 'Alex Kim', role: 'QA Engineer', status: 'offline', avatar: 'AK' },
  { name: 'Ravi Patel', role: 'Fellow Intern', status: 'online', avatar: 'RP' },
  { name: 'Lisa Chen', role: 'Fellow Intern', status: 'online', avatar: 'LC' },
];

const statusColor: Record<string, string> = {
  online: 'bg-emerald-500',
  busy: 'bg-amber-500',
  offline: 'bg-slate-600',
};

export const MentorTeam: React.FC = () => {
  return (
    <div className="space-y-6 max-w-[1400px] mx-auto">
      <div>
        <h2 className="text-lg font-bold text-white">Mentor & Team</h2>
        <p className="text-xs text-[#6e7681] mt-0.5">Your assigned mentor, team hierarchy, and collaboration tools</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Mentor Card */}
        <div className="lg:col-span-1 bg-[#161b22] border border-[#21262d] rounded-xl p-6">
          <div className="text-center mb-5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600/40 to-fuchsia-600/40 border border-violet-500/30 flex items-center justify-center text-2xl font-bold text-violet-300 mx-auto mb-3">
              SJ
            </div>
            <h3 className="text-base font-bold text-white">{mentor.name}</h3>
            <p className="text-xs text-violet-400 font-medium">{mentor.role}</p>
            <p className="text-[11px] text-[#6e7681] mt-0.5">{mentor.department}</p>
          </div>

          <div className="space-y-3 mb-5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#6e7681]">Rating</span>
              <span className="flex items-center gap-1 text-amber-400 font-bold"><Star className="w-3 h-3 fill-amber-400" />{mentor.rating}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#6e7681]">Sessions Completed</span>
              <span className="text-white font-bold">{mentor.sessions}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#6e7681]">Next 1:1</span>
              <span className="text-violet-400 font-medium">{mentor.nextSession}</span>
            </div>
          </div>

          <div className="flex gap-2">
            <button className="flex-1 flex items-center justify-center gap-1.5 bg-violet-600 hover:bg-violet-500 text-white py-2 rounded-lg text-xs font-semibold transition-colors">
              <MessageCircle className="w-3.5 h-3.5" /> Message
            </button>
            <button className="flex items-center justify-center gap-1.5 bg-[#0d1117] border border-[#21262d] hover:border-[#30363d] text-slate-300 px-3 py-2 rounded-lg text-xs transition-colors">
              <Mail className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Team Members */}
        <div className="lg:col-span-2 bg-[#161b22] border border-[#21262d] rounded-xl p-5">
          <h3 className="text-sm font-bold text-white mb-4">Your Team</h3>
          <div className="space-y-2">
            {teamMembers.map((member, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-[#0d1117] border border-[#1b1f27] hover:border-[#30363d] transition-colors">
                <div className="relative shrink-0">
                  <div className="w-9 h-9 rounded-lg bg-[#21262d] border border-[#30363d] flex items-center justify-center text-xs font-bold text-slate-300">
                    {member.avatar}
                  </div>
                  <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-[#0d1117] ${statusColor[member.status]}`}></div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-slate-200 truncate">{member.name}</div>
                  <div className="text-[11px] text-[#6e7681]">{member.role}</div>
                </div>
                <div className="flex items-center gap-1">
                  <button className="p-1.5 text-[#484f58] hover:text-violet-400 hover:bg-violet-500/10 rounded-lg transition-colors">
                    <MessageCircle className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
