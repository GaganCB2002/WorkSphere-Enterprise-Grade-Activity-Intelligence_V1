import React, { useState } from 'react';
import {
  Search, Filter, Plus, User, MessageCircle, Mail, MoreHorizontal,
  ChevronDown, ChevronLeft, ChevronRight, LayoutGrid, List, Briefcase, Activity
} from 'lucide-react';

// Mock data based on the screenshot
const teamMembers = [
  { id: 1, name: 'Elias Thorne', role: 'Lead Architect', department: 'Strategic Design', workload: 85, workloadStatus: 'High', productivity: 94.2, attendance: 98.5, avatar: 'E', trend: 'up' },
  { id: 2, name: 'Sarah Al-Zahrani', role: 'UX Strategist', department: 'Strategic Design', workload: 42, workloadStatus: 'Optimal', productivity: 88.5, attendance: 92.0, avatar: 'S', trend: 'flat' },
  { id: 3, name: 'Marcus Chen', role: 'Systems Engineer', department: 'DevOps', workload: 98, workloadStatus: 'Critical', productivity: 76.0, attendance: 84.5, avatar: 'M', trend: 'down' },
  { id: 4, name: 'Elena Rodriguez', role: 'Growth Manager', department: 'Market Intel', workload: 65, workloadStatus: 'Steady', productivity: 91.0, attendance: 99.1, avatar: 'E', trend: 'up' },
];

export const TeamManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('All Employees');

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      
      {/* ── KPI Cards ──────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        <div className="bg-surface border border-outline-variant rounded-xl p-6 shadow-soft flex flex-col justify-between">
          <p className="text-[10px] font-bold uppercase tracking-widest text-outline mb-2">Top Performing Dept</p>
          <div className="flex items-end justify-between">
            <h3 className="text-2xl font-headline text-[#9b593e] leading-tight">Strategic<br/>Design</h3>
            <span className="text-sm font-bold text-[#5b8c63]">~12%</span>
          </div>
        </div>

        <div className="bg-surface border border-outline-variant rounded-xl p-6 shadow-soft flex flex-col justify-between">
          <p className="text-[10px] font-bold uppercase tracking-widest text-outline mb-2">Avg Team Morale</p>
          <div className="flex items-end justify-between">
            <h3 className="text-3xl font-headline text-[#3a302a]">4.8 <span className="text-lg text-outline">/ 5.0</span></h3>
            <div className="flex items-end gap-1 h-6">
              <div className="w-1.5 h-3 bg-[#c27650]"></div>
              <div className="w-1.5 h-4 bg-[#c27650]"></div>
              <div className="w-1.5 h-6 bg-[#9b593e]"></div>
            </div>
          </div>
        </div>

        <div className="bg-surface border border-outline-variant rounded-xl p-6 shadow-soft flex flex-col justify-between">
          <p className="text-[10px] font-bold uppercase tracking-widest text-outline mb-2">Resource Gaps</p>
          <div className="flex items-end justify-between">
            <h3 className="text-3xl font-headline text-[#9b593e] leading-none">3 Key<br/>Roles</h3>
            <span className="bg-[#d47070]/10 text-[#d47070] px-2 py-1 rounded text-[9px] font-black uppercase tracking-widest">High Priority</span>
          </div>
        </div>

        <div className="bg-[#faf5ee] border border-[#e6dcd2] rounded-xl p-5 shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#8a4a33]">Bulk Actions</p>
            <LayoutGrid className="w-4 h-4 text-[#8a4a33]" />
          </div>
          <div className="space-y-2">
            <button className="w-full py-2 bg-[#9b593e] hover:bg-[#8a4a33] text-white rounded text-sm font-bold transition-colors shadow-warm">
              Export Team Audit
            </button>
            <button className="w-full py-2 bg-surface hover:bg-surface-variant border border-outline-variant text-on-surface rounded text-sm font-bold transition-colors">
              Assign Training
            </button>
          </div>
        </div>

      </div>

      {/* ── Filters Bar ──────────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="flex bg-surface border border-outline-variant rounded-lg p-1 shadow-sm">
            {['All Employees', 'Contractors', 'Interns'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-md text-[13px] font-bold transition-colors ${activeTab === tab ? 'bg-background text-[#9b593e] shadow-sm' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-variant'}`}
              >
                {tab}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-surface border border-outline-variant hover:bg-surface-variant rounded-lg text-[13px] font-semibold text-on-surface transition-colors shadow-sm">
            Department <ChevronDown className="w-4 h-4 text-outline" />
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-surface border border-outline-variant hover:bg-surface-variant rounded-lg text-[13px] font-semibold text-on-surface transition-colors shadow-sm">
            Expertise <ChevronDown className="w-4 h-4 text-outline" />
          </button>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-[12px] font-semibold text-outline">Viewing 24 of 142 members</span>
          <button className="p-2 bg-surface border border-outline-variant hover:bg-surface-variant rounded-lg text-on-surface transition-colors shadow-sm">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ── Team Table ────────────────────────────── */}
      <div className="bg-surface border border-outline-variant rounded-xl shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#FAF6F0]">
              <tr className="border-b border-outline-variant text-[10px] font-black uppercase text-outline tracking-widest">
                <th className="px-6 py-4">Member</th>
                <th className="px-6 py-4">Department</th>
                <th className="px-6 py-4">Workload</th>
                <th className="px-6 py-4 text-center">Productivity</th>
                <th className="px-6 py-4 text-center">Attendance</th>
                <th className="px-6 py-4 text-center">Metric Trend</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {teamMembers.map(member => (
                <tr key={member.id} className="group hover:bg-[#faf5ee] transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#e6dcd2] text-[#8a4a33] border border-outline-variant flex items-center justify-center font-bold text-[15px] shadow-sm">
                        {member.avatar}
                      </div>
                      <div>
                        <h3 className="text-[14px] font-bold text-[#3a302a]">{member.name}</h3>
                        <p className="text-[11px] font-semibold text-outline">{member.role}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[12px] font-bold text-[#3a302a]">{member.department}</span>
                  </td>
                  <td className="px-6 py-4 w-48">
                    <div className="flex items-center justify-between mb-1 text-[10px] font-bold uppercase tracking-widest">
                      <span className="text-[#3a302a]">{member.workload}%</span>
                      <span className={
                        member.workloadStatus === 'Critical' ? 'text-[#d47070]' : 
                        member.workloadStatus === 'High' ? 'text-[#c27650]' : 
                        member.workloadStatus === 'Optimal' ? 'text-[#5b8c63]' : 'text-[#c88d40]'
                      }>{member.workloadStatus}</span>
                    </div>
                    <div className="h-1.5 bg-[#eae2da] rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${
                          member.workloadStatus === 'Critical' ? 'bg-[#d47070]' : 
                          member.workloadStatus === 'High' ? 'bg-[#c27650]' : 
                          member.workloadStatus === 'Optimal' ? 'bg-[#5b8c63]' : 'bg-[#c88d40]'
                        }`} 
                        style={{ width: `${member.workload}%` }} 
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-[14px] font-bold text-[#3a302a]">{member.productivity}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={member.attendance < 90 ? 'text-[#c88d40] text-[14px] font-bold' : 'text-[#5b8c63] text-[14px] font-bold'}>
                      {member.attendance.toFixed(1)}%
                    </span>
                  </td>
                  <td className="px-6 py-4 w-32">
                    {/* Dummy Sparkline */}
                    <div className="flex items-center h-6 justify-center">
                       {member.trend === 'up' && <svg viewBox="0 0 100 30" className="w-full h-full stroke-[#5b8c63] fill-none stroke-2"><path d="M0 25 Q 10 20, 20 22 T 40 15 T 60 18 T 80 5 T 100 2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                       {member.trend === 'flat' && <svg viewBox="0 0 100 30" className="w-full h-full stroke-[#7a937a] fill-none stroke-2"><path d="M0 15 Q 20 18, 40 15 T 60 12 T 80 15 T 100 14" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                       {member.trend === 'down' && <svg viewBox="0 0 100 30" className="w-full h-full stroke-[#d47070] fill-none stroke-2"><path d="M0 5 Q 10 10, 20 8 T 40 15 T 60 12 T 80 25 T 100 28" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 text-outline hover:text-[#9b593e] rounded transition-colors"><MoreHorizontal className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="p-4 border-t border-outline-variant bg-[#FAF6F0] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 flex items-center justify-center bg-surface border border-outline-variant rounded text-outline hover:text-on-surface hover:bg-surface-variant transition-colors"><ChevronLeft className="w-4 h-4" /></button>
            <button className="w-8 h-8 flex items-center justify-center bg-[#9b593e] text-white rounded font-bold text-xs shadow-sm">1</button>
            <button className="w-8 h-8 flex items-center justify-center bg-surface border border-outline-variant rounded text-on-surface-variant hover:text-on-surface hover:bg-surface-variant text-xs font-bold transition-colors">2</button>
            <button className="w-8 h-8 flex items-center justify-center bg-surface border border-outline-variant rounded text-on-surface-variant hover:text-on-surface hover:bg-surface-variant text-xs font-bold transition-colors">3</button>
            <button className="w-8 h-8 flex items-center justify-center bg-surface border border-outline-variant rounded text-outline hover:text-on-surface hover:bg-surface-variant transition-colors"><ChevronRight className="w-4 h-4" /></button>
          </div>
          <span className="text-[10px] font-bold text-[#9b593e] uppercase tracking-widest cursor-pointer hover:underline">Deep-Dive Analytics Dashboard</span>
        </div>
      </div>

    </div>
  );
};
