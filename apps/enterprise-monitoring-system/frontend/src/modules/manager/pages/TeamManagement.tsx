import React, { useState } from 'react';
import {
  Search, Filter, Plus, User, MessageCircle, Mail, MoreHorizontal,
  ChevronDown, LayoutGrid, List, Briefcase, Activity
} from 'lucide-react';
import { teamMembers } from '../data/managerMockData';

export const TeamManagement: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTeam = teamMembers.filter(member => 
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.designation.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* ── Page Header ───────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Team Operations</h1>
          <p className="text-sm text-[#8b949e] mt-1">Manage workforce allocation, performance, and capacity.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-[13px] font-semibold text-white transition-colors shadow-sm shadow-indigo-500/20">
            <Plus className="w-4 h-4" />
            Add Member
          </button>
        </div>
      </div>

      {/* ── Action Bar ────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 mgr-glass">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6b7280]" />
            <input 
              type="text" 
              placeholder="Search team members..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0a0c14] border border-[#1e2231] rounded-lg py-2 pl-9 pr-4 text-[13px] text-slate-200 focus:border-indigo-500/50 outline-none transition-colors"
            />
          </div>
          <button className="flex items-center gap-2 px-3 py-2 bg-[#0a0c14] border border-[#1e2231] rounded-lg text-[12px] font-semibold text-slate-300 hover:bg-[#12151f] transition-colors shrink-0">
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>

        <div className="flex items-center gap-2 bg-[#0a0c14] border border-[#1e2231] rounded-lg p-1">
          <button 
            onClick={() => setViewMode('grid')}
            className={`p-1.5 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-indigo-500/20 text-indigo-400' : 'text-[#6b7280] hover:text-slate-300'}`}
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setViewMode('list')}
            className={`p-1.5 rounded-md transition-colors ${viewMode === 'list' ? 'bg-indigo-500/20 text-indigo-400' : 'text-[#6b7280] hover:text-slate-300'}`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ── Team Grid View ────────────────────────────── */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredTeam.map(member => (
            <div key={member.id} className="mgr-glass p-5 hover:border-indigo-500/30 mgr-card-hover group relative overflow-hidden">
              {/* Background gradient hint based on status */}
              <div className={`absolute top-0 right-0 w-32 h-32 blur-3xl opacity-10 rounded-full pointer-events-none ${
                member.status === 'online' ? 'bg-emerald-500' : 
                member.status === 'on-leave' ? 'bg-amber-500' : 
                'bg-slate-500'
              }`} />
              
              <div className="flex items-start justify-between mb-4 relative">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-xl bg-[#1e2231] border border-[#2d3345] flex items-center justify-center text-slate-300 font-bold text-[16px] shadow-sm">
                      {member.avatar}
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 border-2 border-[#0d1117] rounded-full ${
                      member.status === 'online' ? 'bg-emerald-500' : 
                      member.status === 'away' ? 'bg-amber-500' : 
                      member.status === 'on-leave' ? 'bg-purple-500' : 'bg-slate-500'
                    }`} title={member.status} />
                  </div>
                  <div>
                    <h3 className="text-[14px] font-bold text-slate-100 group-hover:text-indigo-400 transition-colors">{member.name}</h3>
                    <p className="text-[11px] font-semibold text-[#6b7280]">{member.designation}</p>
                  </div>
                </div>
                <button className="p-1.5 text-[#6b7280] hover:text-slate-300 hover:bg-[#12151f] rounded-md transition-colors">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3 mb-5 relative">
                <div className="flex items-center gap-2 text-[12px] text-slate-300">
                  <Briefcase className="w-3.5 h-3.5 text-[#6b7280]" />
                  <span className="truncate">{member.currentTask}</span>
                </div>
                
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-[#6b7280]">
                    <span>Capacity</span>
                    <span className={member.workload > 85 ? 'text-amber-400' : 'text-slate-300'}>{member.workload}%</span>
                  </div>
                  <div className="h-1.5 bg-[#12151f] rounded-full overflow-hidden border border-[#1e2231]">
                    <div 
                      className={`h-full rounded-full ${member.workload > 85 ? 'bg-amber-500' : 'bg-indigo-500'}`} 
                      style={{ width: `${member.workload}%` }} 
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#1e2231] relative">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-[13px] font-black text-slate-200">{member.productivityScore}</p>
                    <p className="text-[9px] font-bold uppercase tracking-widest text-[#6b7280]">Score</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[13px] font-black text-slate-200">{member.tasksCompleted}</p>
                    <p className="text-[9px] font-bold uppercase tracking-widest text-[#6b7280]">Tasks</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button className="p-2 text-[#6b7280] hover:text-indigo-400 hover:bg-indigo-500/10 rounded-lg transition-colors" title="Message">
                    <MessageCircle className="w-[15px] h-[15px]" />
                  </button>
                  <button className="p-2 text-[#6b7280] hover:text-indigo-400 hover:bg-indigo-500/10 rounded-lg transition-colors" title="Email">
                    <Mail className="w-[15px] h-[15px]" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* ── Empty State ───────────────────────────────── */}
      {filteredTeam.length === 0 && (
        <div className="mgr-glass p-12 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-[#12151f] rounded-2xl flex items-center justify-center mb-4 border border-[#1e2231]">
            <Search className="w-6 h-6 text-[#4a5068]" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">No team members found</h3>
          <p className="text-sm text-[#6b7280]">No one matches the search criteria "{searchQuery}"</p>
        </div>
      )}

    </div>
  );
};
