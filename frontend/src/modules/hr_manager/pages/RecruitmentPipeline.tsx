import React, { useState } from 'react';
import { Plus, MoreHorizontal, UserCircle2, Briefcase, Calendar, Star, FileText } from 'lucide-react';

// Stages based on the user prompt
const PIPELINE_STAGES = [
  { id: 'applied', title: 'Applied', count: 12 },
  { id: 'screening', title: 'Screening', count: 8 },
  { id: 'technical', title: 'Technical Round', count: 5 },
  { id: 'hr_round', title: 'HR Round', count: 3 },
  { id: 'final', title: 'Final Discussion', count: 2 },
  { id: 'offer', title: 'Offer Released', count: 1 },
];

const MOCK_CANDIDATES = [
  { id: 'c1', name: 'Alice Chen', role: 'Senior React Engineer', stage: 'technical', rating: 4, date: 'May 18' },
  { id: 'c2', name: 'Robert Fox', role: 'DevOps Specialist', stage: 'screening', rating: 3, date: 'May 20' },
  { id: 'c3', name: 'Jenny Wilson', role: 'UX Designer', stage: 'hr_round', rating: 5, date: 'May 15' },
  { id: 'c4', name: 'Esther Howard', role: 'Engineering Manager', stage: 'offer', rating: 5, date: 'May 10' },
  { id: 'c5', name: 'Cody Fisher', role: 'Backend Engineer', stage: 'applied', rating: 0, date: 'May 21' },
  { id: 'c6', name: 'Kristin Watson', role: 'Senior React Engineer', stage: 'applied', rating: 0, date: 'May 21' },
];

export const RecruitmentPipeline: React.FC = () => {
  return (
    <div className="h-full flex flex-col space-y-4 min-w-0">
      {/* Header */}
      <div className="flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-200">Recruitment Pipeline</h1>
          <p className="text-sm text-[#8b949e] mt-1">Manage active requisitions and candidate hiring stages.</p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm">
          <Plus className="w-4 h-4" />
          <span>New Requisition</span>
        </button>
      </div>

      {/* Kanban Board Container */}
      <div className="flex-1 overflow-x-auto overflow-y-hidden custom-scrollbar pb-4">
        <div className="flex h-full gap-4 items-start min-w-max">
          
          {PIPELINE_STAGES.map(stage => {
            const stageCandidates = MOCK_CANDIDATES.filter(c => c.stage === stage.id);
            
            return (
              <div key={stage.id} className="w-[300px] shrink-0 flex flex-col h-full bg-[#161b22] border border-[#30363d] rounded-2xl overflow-hidden">
                {/* Stage Header */}
                <div className="p-3 border-b border-[#30363d] bg-[#0E1117] flex items-center justify-between sticky top-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm text-slate-900 dark:text-slate-200">{stage.title}</h3>
                    <span className="bg-[#21262d] text-[#8b949e] text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#30363d]">
                      {stage.count}
                    </span>
                  </div>
                  <button className="text-[#8b949e] hover:text-slate-900 dark:text-slate-200 p-1 rounded hover:bg-[#21262d] transition-colors">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>

                {/* Candidate Cards */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-3">
                  {stageCandidates.map(candidate => (
                    <div 
                      key={candidate.id} 
                      className="bg-[#0E1117] border border-[#30363d] p-3 rounded-xl hover:border-indigo-500/50 hover:shadow-[0_0_15px_rgba(99,102,241,0.1)] transition-all cursor-grab active:cursor-grabbing group"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          <UserCircle2 className="w-5 h-5 text-indigo-400" />
                          <span className="text-sm font-bold text-slate-900 dark:text-slate-200 group-hover:text-indigo-400 transition-colors">{candidate.name}</span>
                        </div>
                        <div className="flex text-amber-400">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className={`w-3 h-3 ${i < candidate.rating ? 'fill-current' : 'text-[#30363d]'}`} />
                          ))}
                        </div>
                      </div>
                      
                      <div className="space-y-1.5 mb-3">
                        <div className="flex items-center gap-1.5 text-xs text-[#8b949e]">
                          <Briefcase className="w-3 h-3" />
                          <span className="truncate">{candidate.role}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] font-medium text-slate-400 uppercase tracking-wider">
                          <Calendar className="w-3 h-3" />
                          Applied: {candidate.date}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-2 border-t border-[#21262d]">
                        <button className="flex-1 flex items-center justify-center gap-1.5 bg-[#161b22] hover:bg-[#21262d] text-[#8b949e] hover:text-slate-900 dark:text-slate-200 py-1.5 rounded-lg border border-[#30363d] text-xs font-semibold transition-colors">
                          <FileText className="w-3 h-3" />
                          Resume
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Empty Drop Zone Simulator */}
                  {stageCandidates.length === 0 && (
                    <div className="h-24 border-2 border-dashed border-[#30363d] rounded-xl flex items-center justify-center text-xs text-[#8b949e] font-medium">
                      Drag candidates here
                    </div>
                  )}
                </div>
              </div>
            );
          })}

        </div>
      </div>
    </div>
  );
};
