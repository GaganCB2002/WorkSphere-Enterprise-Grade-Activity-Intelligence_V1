import React, { useState } from 'react';
import {
  TrendingUp, TrendingDown, Minus, Target, Star,
  Award, FileText, ChevronRight, Search, Filter, MessageSquare, Calendar
} from 'lucide-react';
import { performanceRecords, teamMembers } from '../data/managerMockData';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer
} from 'recharts';

export const PerformanceManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRecord, setSelectedRecord] = useState(performanceRecords[0]);

  const filteredRecords = performanceRecords.filter(r => 
    r.employeeName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const radarData = [
    { subject: 'Task Rate', A: selectedRecord.taskCompletionRate, fullMark: 100 },
    { subject: 'Attendance', A: selectedRecord.attendanceScore, fullMark: 100 },
    { subject: 'Productivity', A: selectedRecord.productivityScore, fullMark: 100 },
    { subject: 'Collaboration', A: selectedRecord.collaborationScore, fullMark: 100 },
    { subject: 'Quality', A: selectedRecord.qualityScore, fullMark: 100 },
  ];

  const getTrendIcon = (trend: string) => {
    switch(trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-emerald-500" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-rose-500" />;
      default: return <Minus className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-full gap-6 pb-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* ── Left List View ────────────────────────────── */}
      <div className="w-full lg:w-[400px] shrink-0 flex flex-col space-y-4">
        
        <div className="shrink-0">
          <h1 className="text-2xl font-bold text-white tracking-tight">Performance</h1>
          <p className="text-sm text-[#8b949e] mt-1">Continuous feedback and reviews.</p>
        </div>

        <div className="flex items-center gap-3 w-full shrink-0 pt-2">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6b7280]" />
            <input 
              type="text" 
              placeholder="Search employee..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#12151f] border border-[#1e2231] rounded-xl py-2 pl-9 pr-4 text-[13px] text-slate-200 focus:border-indigo-500/50 outline-none transition-colors"
            />
          </div>
          <button className="p-2 text-[#6b7280] hover:text-slate-300 bg-[#12151f] border border-[#1e2231] rounded-xl transition-colors">
            <Filter className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto mgr-scrollbar space-y-2 pr-2">
          {filteredRecords.map(record => {
            const member = teamMembers.find(t => t.id === record.employeeId);
            return (
              <div 
                key={record.employeeId}
                onClick={() => setSelectedRecord(record)}
                className={`p-4 rounded-xl cursor-pointer transition-all border ${
                  selectedRecord.employeeId === record.employeeId 
                  ? 'bg-indigo-500/10 border-indigo-500/30 shadow-md shadow-indigo-500/5' 
                  : 'bg-[#0a0c14] border-[#1e2231] hover:border-[#2d3345] hover:bg-[#12151f]/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#1e2231] flex items-center justify-center text-slate-300 font-bold text-sm border border-[#2d3345]">
                      {member?.avatar}
                    </div>
                    <div>
                      <h4 className="text-[14px] font-bold text-slate-200">{record.employeeName}</h4>
                      <p className="text-[11px] font-semibold text-[#6b7280]">{member?.designation}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <div className="flex items-center gap-1.5">
                      <Star className={`w-3.5 h-3.5 ${record.overallRating >= 4.5 ? 'text-amber-400 fill-amber-400' : 'text-amber-500'}`} />
                      <span className="text-[14px] font-black text-white">{record.overallRating}</span>
                    </div>
                    {getTrendIcon(record.trend)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Right Detail View ─────────────────────────── */}
      <div className="flex-1 mgr-glass flex flex-col h-full overflow-hidden">
        {selectedRecord && (
          <>
            {/* Detail Header */}
            <div className="p-6 border-b border-[#1e2231] flex items-start justify-between bg-[#12151f]/30">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 font-bold text-2xl border border-indigo-500/20">
                  {teamMembers.find(t => t.id === selectedRecord.employeeId)?.avatar}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">{selectedRecord.employeeName}</h2>
                  <p className="text-sm font-semibold text-[#6b7280] mb-2">{teamMembers.find(t => t.id === selectedRecord.employeeId)?.designation}</p>
                  <div className="flex items-center gap-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> Last Review: {selectedRecord.lastReview}</span>
                    <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> Next: {selectedRecord.nextReview}</span>
                  </div>
                </div>
              </div>
              <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-[12px] font-bold transition-all shadow-sm shadow-indigo-500/20">
                Start Review
              </button>
            </div>

            <div className="flex-1 overflow-y-auto mgr-scrollbar p-6 space-y-8">
              
              {/* Radar & KPIs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Radar Chart */}
                <div className="bg-[#0a0c14] border border-[#1e2231] rounded-2xl p-4 flex flex-col">
                  <h3 className="text-[11px] font-bold text-[#6b7280] uppercase tracking-wider mb-2 text-center">Competency Radar</h3>
                  <div className="flex-1 min-h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                        <PolarGrid stroke="#1e2231" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#8b949e', fontSize: 10, fontWeight: 'bold' }} />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                        <Radar name="Performance" dataKey="A" stroke="#6366f1" fill="#6366f1" fillOpacity={0.3} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Score Grid */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Task Rate', val: selectedRecord.taskCompletionRate, color: 'indigo' },
                    { label: 'Attendance', val: selectedRecord.attendanceScore, color: 'emerald' },
                    { label: 'Productivity', val: selectedRecord.productivityScore, color: 'amber' },
                    { label: 'Quality', val: selectedRecord.qualityScore, color: 'rose' }
                  ].map(score => (
                    <div key={score.label} className="bg-[#0a0c14] border border-[#1e2231] rounded-2xl p-4 flex flex-col justify-center">
                      <p className="text-[10px] font-bold text-[#6b7280] uppercase tracking-wider mb-2">{score.label}</p>
                      <div className="flex items-end gap-2">
                        <span className="text-3xl font-black text-white leading-none">{score.val}</span>
                        <span className="text-xs font-bold text-slate-500 mb-1">/100</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Goals Tracking */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[14px] font-bold text-white uppercase tracking-wider">Active Goals (OKRs)</h3>
                  <button className="text-[11px] font-bold text-indigo-400 hover:text-indigo-300 transition-colors uppercase tracking-wider">
                    + Add Goal
                  </button>
                </div>
                <div className="space-y-3">
                  {selectedRecord.goals.map((goal, idx) => (
                    <div key={idx} className="bg-[#0a0c14] border border-[#1e2231] rounded-xl p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Target className="w-4 h-4 text-indigo-400" />
                          <span className="text-[13px] font-bold text-slate-200">{goal.name}</span>
                        </div>
                        <span className="text-[11px] font-bold text-slate-400">{goal.deadline}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-1.5 bg-[#12151f] rounded-full overflow-hidden border border-[#1e2231]">
                          <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${goal.progress}%` }} />
                        </div>
                        <span className="text-[11px] font-black text-slate-300 w-8">{goal.progress}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Log / Feedback */}
              <div>
                <h3 className="text-[14px] font-bold text-white uppercase tracking-wider mb-4">Recent Notes</h3>
                <div className="p-4 bg-[#0a0c14] border border-[#1e2231] rounded-xl border-dashed flex flex-col items-center justify-center text-center">
                  <MessageSquare className="w-6 h-6 text-[#4a5068] mb-2" />
                  <p className="text-[12px] font-semibold text-slate-300">No recent 1-on-1 notes recorded.</p>
                  <button className="mt-3 px-4 py-1.5 bg-[#12151f] border border-[#1e2231] hover:bg-[#1a1d27] rounded-lg text-[11px] font-bold text-slate-300 transition-colors">
                    Add Note
                  </button>
                </div>
              </div>

            </div>
          </>
        )}
      </div>
    </div>
  );
};
