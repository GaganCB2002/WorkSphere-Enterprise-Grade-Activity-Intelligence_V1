import React from 'react';
import { Camera, Mail, MapPin, Calendar, Briefcase, GraduationCap, Award, Code, Globe, BookOpen } from 'lucide-react';

const skills = ['React', 'TypeScript', 'Node.js', 'Git', 'PostgreSQL', 'Docker', 'REST APIs', 'Jest'];

export const InternProfile: React.FC = () => {
  return (
    <div className="space-y-6 max-w-[1000px] mx-auto">
      {/* Profile Header */}
      <div className="bg-[#161b22] border border-[#21262d] rounded-xl overflow-hidden">
        <div className="h-28 bg-gradient-to-r from-violet-600/30 via-fuchsia-600/20 to-transparent"></div>
        <div className="px-6 pb-6 -mt-10">
          <div className="flex items-end gap-4 mb-4">
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-600 border-4 border-[#161b22] flex items-center justify-center text-2xl font-bold text-white shadow-xl">
                AP
              </div>
              <button className="absolute bottom-0 right-0 w-6 h-6 bg-[#21262d] border border-[#30363d] rounded-full flex items-center justify-center text-slate-400 hover:text-white transition-colors">
                <Camera className="w-3 h-3" />
              </button>
            </div>
            <div className="flex-1 pb-1">
              <h2 className="text-xl font-bold text-white">Arjun Patel</h2>
              <p className="text-sm text-violet-400 font-medium">Software Engineering Intern</p>
            </div>
            <button className="px-4 py-2 bg-[#0d1117] border border-[#21262d] hover:border-violet-500/40 text-sm text-slate-300 rounded-lg font-medium transition-colors">
              Edit Profile
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { icon: Briefcase, label: 'Department', value: 'Engineering' },
              { icon: Calendar, label: 'Duration', value: 'Jan 15 – Jul 15, 2026' },
              { icon: MapPin, label: 'Location', value: 'Bangalore, IN' },
              { icon: Mail, label: 'Email', value: 'arjun.p@worksphere.io' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-xs">
                <item.icon className="w-3.5 h-3.5 text-[#484f58] shrink-0" />
                <div>
                  <div className="text-[#484f58]">{item.label}</div>
                  <div className="text-slate-300 font-medium">{item.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Skills */}
        <div className="bg-[#161b22] border border-[#21262d] rounded-xl p-5">
          <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2"><Code className="w-4 h-4 text-violet-400" /> Technical Skills</h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, i) => (
              <span key={i} className="px-2.5 py-1 bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-medium rounded-lg">{skill}</span>
            ))}
          </div>
        </div>

        {/* Internship Info */}
        <div className="bg-[#161b22] border border-[#21262d] rounded-xl p-5">
          <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2"><GraduationCap className="w-4 h-4 text-violet-400" /> Internship Details</h3>
          <div className="space-y-2.5">
            {[
              { label: 'Intern ID', value: 'INT-2026-0042' },
              { label: 'Assigned Mentor', value: 'Sarah Jenkins' },
              { label: 'Reporting Manager', value: 'Michael Chang' },
              { label: 'Project', value: 'WorkSphere Dashboard v3' },
              { label: 'Week', value: '6 of 12 (Midpoint)' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between text-xs py-1.5 border-b border-[#1b1f27] last:border-0">
                <span className="text-[#6e7681]">{item.label}</span>
                <span className="text-slate-300 font-medium">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
