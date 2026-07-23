// @ts-nocheck
import React from 'react';
import { 
  Calendar, Video, Users, Clock, Plus, ChevronLeft, 
  ChevronRight, MoreHorizontal, Link2, Monitor, Mic, Camera
} from 'lucide-react';

const TODAY_MEETINGS = [
  { id: 1, title: 'Sprint 42 Daily Standup', time: '10:00 AM - 10:15 AM', attendees: 5, active: false, link: 'meet.enterprise.com/standup' },
  { id: 2, title: 'Architecture Review: API v2', time: '1:00 PM - 2:00 PM', attendees: 8, active: true, link: 'meet.enterprise.com/arch-review' },
  { id: 3, title: '1:1 with Alex Developer', time: '3:30 PM - 4:00 PM', attendees: 2, active: false, link: 'meet.enterprise.com/1v1-alex' },
];

export const MeetingsPage: React.FC = () => {
  return (
    <div className="space-y-6 pb-12 h-full flex flex-col">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 tracking-tight flex items-center gap-2">
            <Video className="w-6 h-6 text-indigo-500" /> Meetings & Schedule
          </h1>
          <p className="text-sm text-[#8b949e] mt-1">Manage your calendar and join engineering syncs.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-md text-xs font-semibold transition-colors shadow-sm">
            <Plus className="w-4 h-4" />
            New Meeting
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
        
        {/* Calendar Sidebar */}
        <div className="lg:col-span-1 bg-[#0E1117] border border-[#21262d] rounded-xl flex flex-col overflow-hidden">
          <div className="p-4 border-b border-[#21262d] flex justify-between items-center bg-[#161b22]">
            <h2 className="font-bold text-slate-200">Today, May 21</h2>
            <div className="flex gap-1 text-[#8b949e]">
              <button className="p-1 hover:bg-[#30363d] rounded transition-colors"><ChevronLeft className="w-4 h-4" /></button>
              <button className="p-1 hover:bg-[#30363d] rounded transition-colors"><ChevronRight className="w-4 h-4" /></button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
            {TODAY_MEETINGS.map(meet => (
              <div key={meet.id} className={`p-4 rounded-lg border transition-colors ${meet.active ? 'bg-indigo-900/20 border-indigo-500/50' : 'bg-[#161b22] border-[#30363d] hover:border-[#8b949e]'}`}>
                <div className="flex justify-between items-start mb-2">
                  <h4 className={`text-sm font-bold ${meet.active ? 'text-indigo-400' : 'text-slate-200'}`}>{meet.title}</h4>
                  {meet.active && <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse mt-1"></span>}
                </div>
                <div className="space-y-1.5 mb-4">
                  <div className="flex items-center gap-2 text-xs text-[#8b949e]">
                    <Clock className="w-3.5 h-3.5" /> {meet.time}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#8b949e]">
                    <Users className="w-3.5 h-3.5" /> {meet.attendees} Attendees
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md text-xs font-bold transition-colors ${meet.active ? 'bg-indigo-600 hover:bg-indigo-500 text-white' : 'bg-[#21262d] hover:bg-[#30363d] text-slate-300'}`}>
                    <Video className="w-3.5 h-3.5" /> Join
                  </button>
                  <button className="px-2 bg-[#21262d] hover:bg-[#30363d] text-[#8b949e] rounded-md transition-colors">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Meeting View */}
        <div className="lg:col-span-2 bg-[#0E1117] border border-[#21262d] rounded-xl flex flex-col overflow-hidden relative">
          
          <div className="absolute top-4 left-4 z-10 bg-[#000000]/60 backdrop-blur-md px-3 py-1.5 rounded border border-white/10 flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-rose-500 animate-pulse"></span>
            <span className="text-xs font-bold text-white tracking-widest uppercase">Live</span>
            <span className="text-xs text-white/70 ml-2">42:15</span>
          </div>

          <div className="flex-1 bg-[#090b10] flex items-center justify-center relative overflow-hidden">
             {/* Mock Video Grid */}
             <div className="absolute inset-4 grid grid-cols-2 grid-rows-2 gap-4">
               <div className="bg-[#161b22] rounded-xl border border-[#30363d] flex items-center justify-center relative overflow-hidden">
                 <div className="absolute inset-0 flex items-center justify-center opacity-20">
                    <Users className="w-32 h-32 text-slate-500" />
                 </div>
                 <div className="absolute bottom-2 left-2 bg-black/60 px-2 py-1 rounded text-[10px] font-bold text-white backdrop-blur">
                   Alex Developer
                 </div>
               </div>
               <div className="bg-[#161b22] rounded-xl border border-indigo-500/50 flex items-center justify-center relative overflow-hidden ring-1 ring-indigo-500/50">
                 <div className="absolute inset-0 flex items-center justify-center opacity-20 text-indigo-500">
                    <Users className="w-32 h-32" />
                 </div>
                 <div className="absolute bottom-2 left-2 bg-black/60 px-2 py-1 rounded text-[10px] font-bold text-white backdrop-blur">
                   Sarah Jenkins
                 </div>
                 <div className="absolute top-2 right-2 p-1 bg-black/60 rounded text-rose-500">
                   <Mic className="w-3 h-3" />
                 </div>
               </div>
               <div className="bg-[#161b22] rounded-xl border border-[#30363d] flex items-center justify-center relative overflow-hidden">
                 <div className="absolute inset-0 flex items-center justify-center opacity-20">
                    <Users className="w-32 h-32 text-slate-500" />
                 </div>
                 <div className="absolute bottom-2 left-2 bg-black/60 px-2 py-1 rounded text-[10px] font-bold text-white backdrop-blur">
                   David Ops
                 </div>
               </div>
               <div className="bg-[#21262d] rounded-xl border border-[#30363d] flex items-center justify-center relative overflow-hidden">
                 <span className="text-sm font-bold text-slate-400">+4 Others</span>
               </div>
             </div>
          </div>

          {/* Controls */}
          <div className="h-20 bg-[#161b22] border-t border-[#30363d] flex items-center justify-between px-6">
            <div className="flex items-center gap-3">
              <h3 className="font-bold text-slate-200">Architecture Review: API v2</h3>
              <div className="px-2 py-0.5 rounded bg-[#090b10] border border-[#30363d] flex items-center gap-1.5 cursor-pointer hover:border-indigo-500 transition-colors">
                <Link2 className="w-3 h-3 text-[#8b949e]" />
                <span className="text-[10px] text-[#8b949e] font-mono">meet.enterprise.com/arch-review</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="w-12 h-12 rounded-full bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] flex items-center justify-center text-slate-200 transition-colors">
                <Mic className="w-5 h-5" />
              </button>
              <button className="w-12 h-12 rounded-full bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] flex items-center justify-center text-slate-200 transition-colors">
                <Camera className="w-5 h-5" />
              </button>
              <button className="w-12 h-12 rounded-full bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] flex items-center justify-center text-slate-200 transition-colors">
                <Monitor className="w-5 h-5" />
              </button>
              <button className="px-6 h-12 rounded-full bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm transition-colors shadow-sm ml-2">
                Leave
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

