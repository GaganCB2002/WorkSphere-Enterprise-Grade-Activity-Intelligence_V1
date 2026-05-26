import React from 'react';
import { 
  Users, Briefcase, IndianRupee, TrendingUp, AlertCircle, Clock, CheckCircle2, ChevronRight
} from 'lucide-react';
import type { User } from '../../types';

export function ManagerDashboardPage({ user, platform }: { user: User, platform: any }) {
  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      
      {/* ── Header ─────────────────────────────────────── */}
      <div className="mb-8">
        <h1 className="font-headline text-4xl text-[#3a302a] mb-2 tracking-tight">Project Portfolio Hub</h1>
        <p className="font-body text-[#605850] text-[15px]">Strategic overview of Sahara Enterprise Q4 initiatives and resource velocity.</p>
      </div>

      {/* ── Top KPI Cards ──────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="bg-surface border border-outline-variant rounded-xl p-6 shadow-soft hover:shadow-md transition-shadow">
          <p className="text-[10px] font-bold uppercase tracking-widest text-outline mb-4">Active Initiatives</p>
          <p className="text-4xl font-headline text-[#9b593e] mb-6">24</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#5b8c63]"></div>
            <span className="text-xs font-semibold text-on-surface-variant">18 On Track</span>
          </div>
        </div>

        <div className="bg-surface border border-outline-variant rounded-xl p-6 shadow-soft hover:shadow-md transition-shadow">
          <p className="text-[10px] font-bold uppercase tracking-widest text-outline mb-4">Budget Utilization</p>
          <p className="text-4xl font-headline text-[#9b593e] mb-6">$1.4M</p>
          <div className="flex items-center gap-3">
            <div className="flex-1 h-1.5 bg-[#eae2da] rounded-full overflow-hidden">
              <div className="h-full bg-[#c27650]" style={{ width: '68%' }}></div>
            </div>
            <span className="text-xs font-bold text-on-surface-variant">68%</span>
          </div>
        </div>

        <div className="bg-surface border border-outline-variant rounded-xl p-6 shadow-soft hover:shadow-md transition-shadow">
          <p className="text-[10px] font-bold uppercase tracking-widest text-outline mb-4">Resource Bandwidth</p>
          <p className="text-4xl font-headline text-[#9b593e] mb-6">82%</p>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-3.5 h-3.5 text-[#5b8c63]" />
            <span className="text-xs font-semibold text-on-surface-variant">+4% from last sprint</span>
          </div>
        </div>

        <div className="bg-surface border border-outline-variant rounded-xl p-6 shadow-soft hover:shadow-md transition-shadow">
          <p className="text-[10px] font-bold uppercase tracking-widest text-outline mb-4">Upcoming Milestones</p>
          <p className="text-4xl font-headline text-[#9b593e] mb-6">12</p>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#d47070]">!</span>
            <span className="text-xs font-semibold text-[#c88d40]">3 Critical Deadlines</span>
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* ── Left Column: High-Priority Initiatives & Roadmap ───────────────── */}
        <div className="lg:col-span-2 space-y-8">
          
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-headline text-xl text-[#3a302a] font-bold">High-Priority Initiatives</h2>
              <div className="flex items-center gap-2">
                <button className="px-4 py-1.5 rounded border border-outline-variant text-xs font-bold text-on-surface-variant hover:bg-surface-variant transition-colors">List View</button>
                <button className="px-4 py-1.5 rounded border border-[#9b593e] text-[#9b593e] bg-[#9b593e]/5 text-xs font-bold shadow-sm">Card View</button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="bg-surface border border-outline-variant rounded-xl p-6 shadow-soft flex flex-col justify-between h-[240px]">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-[#5b8c63]/10 text-[#5b8c63] px-2 py-1 rounded text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#5b8c63]"></div>
                      On Track
                    </span>
                    <span className="text-[10px] font-mono font-bold text-outline">#PM-2024-01</span>
                  </div>
                  <h3 className="font-headline text-xl text-[#3a302a] font-bold mb-2">Project Horizon: AI Core</h3>
                  <p className="text-xs text-on-surface-variant leading-relaxed">Integration of LLM orchestration layer into the enterprise management suite.</p>
                </div>
                
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex -space-x-2">
                       <div className="w-6 h-6 rounded-full bg-[#c27650] border-2 border-surface flex items-center justify-center text-[8px] font-bold text-white shadow-sm">ES</div>
                       <div className="w-6 h-6 rounded-full bg-[#4a5068] border-2 border-surface flex items-center justify-center text-[8px] font-bold text-white shadow-sm">JT</div>
                       <div className="w-6 h-6 rounded-full bg-surface-variant border-2 border-surface flex items-center justify-center text-[9px] font-bold text-on-surface-variant shadow-sm">+5</div>
                    </div>
                    <div className="text-right">
                      <p className="text-[9px] font-bold uppercase tracking-widest text-outline mb-0.5">Budget</p>
                      <p className="text-xs font-bold text-on-surface">$420k / $600k</p>
                    </div>
                  </div>
                  <div className="flex-1 h-1.5 bg-[#eae2da] rounded-full overflow-hidden mt-2">
                    <div className="h-full bg-[#c27650]" style={{ width: '70%' }}></div>
                  </div>
                </div>
              </div>

              <div className="bg-surface border border-outline-variant rounded-xl p-6 shadow-soft flex flex-col justify-between h-[240px]">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-[#c88d40]/10 text-[#c88d40] px-2 py-1 rounded text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#c88d40]"></div>
                      At Risk
                    </span>
                    <span className="text-[10px] font-mono font-bold text-outline">#PM-2024-05</span>
                  </div>
                  <h3 className="font-headline text-xl text-[#3a302a] font-bold mb-2">Dune Cloud Migration</h3>
                  <p className="text-xs text-on-surface-variant leading-relaxed">Legacy database transition to distributed Saharan server clusters.</p>
                </div>
                
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3 text-outline">
                       <Briefcase className="w-4 h-4" />
                       <TrendingUp className="w-4 h-4" />
                       <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div className="text-right">
                      <p className="text-[9px] font-bold uppercase tracking-widest text-outline mb-0.5">Progress</p>
                      <p className="text-xs font-bold text-on-surface">42% Complete</p>
                    </div>
                  </div>
                  <div className="flex-1 h-1.5 bg-[#eae2da] rounded-full overflow-hidden mt-2 flex">
                    <div className="h-full bg-[#c88d40]" style={{ width: '42%' }}></div>
                    <div className="h-full bg-transparent" style={{ width: '58%' }}></div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div className="bg-surface border border-outline-variant rounded-xl p-6 shadow-soft">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-headline text-xl text-[#3a302a] font-bold">Q4 Roadmap: Technical Milestones</h2>
              <div className="flex gap-4 text-[10px] font-bold text-outline tracking-widest">
                <span>OCT</span>
                <span>NOV</span>
                <span>DEC</span>
              </div>
            </div>

            <div className="space-y-6">
              {/* Timeline Item 1 */}
              <div className="relative flex items-center">
                <div className="w-48 shrink-0 text-sm font-semibold text-on-surface-variant">Core Infrastructure</div>
                <div className="flex-1 h-2.5 bg-primary-fixed rounded-full relative">
                  <div className="absolute top-0 left-0 h-full bg-[#c27650] rounded-full" style={{ width: '55%' }}></div>
                </div>
              </div>
              {/* Timeline Item 2 */}
              <div className="relative flex items-center">
                <div className="w-48 shrink-0 text-sm font-semibold text-on-surface-variant">User Experience Revamp</div>
                <div className="flex-1 h-2.5 bg-primary-fixed rounded-full relative">
                  <div className="absolute top-0 left-[35%] h-full bg-[#8a7d70] rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
              {/* Timeline Item 3 */}
              <div className="relative flex items-center">
                <div className="w-48 shrink-0 text-sm font-semibold text-on-surface-variant">Global Compliance Hub</div>
                <div className="flex-1 h-2.5 bg-primary-fixed rounded-full relative">
                  <div className="absolute top-0 left-[70%] h-full bg-[#5b8c63] rounded-full" style={{ width: '25%' }}></div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* ── Right Column: Sprint Tracking & Resource Allocation ──────────── */}
        <div className="space-y-8">
          
          <div className="bg-[#FAF6F0] border border-outline-variant rounded-xl p-6 shadow-soft relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-[#c27650]"></div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-headline text-xl text-[#3a302a] font-bold">Sprint Tracking</h2>
              <span className="text-[10px] font-bold text-[#c27650] uppercase tracking-widest cursor-pointer hover:underline">View Board</span>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-[13px] font-bold text-on-surface">Sprint 24.12: Oasis</h4>
                  <span className="bg-[#c27650] text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Active</span>
                </div>
                <p className="text-[11px] text-outline mb-3">4 days remaining</p>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-semibold text-outline w-24">18 / 24 Tasks Done</span>
                  <div className="flex-1 h-1.5 bg-[#eae2da] rounded-full overflow-hidden">
                    <div className="h-full bg-[#c27650]" style={{ width: '75%' }}></div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-outline-variant border-dashed">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-[13px] font-bold text-on-surface">Sprint 25.01: Mirage</h4>
                  <span className="bg-[#eae2da] text-on-surface-variant text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Upcoming</span>
                </div>
                <p className="text-[11px] text-outline">Starts in 8 days</p>
              </div>
            </div>
          </div>

          <div className="bg-surface border border-outline-variant rounded-xl p-6 shadow-soft">
            <h2 className="font-headline text-xl text-[#3a302a] font-bold mb-6">Resource Allocation</h2>

            <div className="space-y-6">
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface">UX/Design Team</span>
                  <span className="text-[10px] font-bold text-[#c27650]">95% Full</span>
                </div>
                <div className="flex gap-1 h-8">
                  <div className="h-full bg-[#c27650] flex-[2]"></div>
                  <div className="h-full bg-[#c27650] flex-[2]"></div>
                  <div className="h-full bg-[#c27650] flex-[2]"></div>
                  <div className="h-full bg-[#c27650] flex-[1.5]"></div>
                  <div className="h-full bg-[#eae2da] flex-[0.5]"></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface">Engineering Squad A</span>
                  <span className="text-[10px] font-bold text-[#5b8c63]">65% Optimal</span>
                </div>
                <div className="flex gap-1 h-8">
                  <div className="h-full bg-[#7a937a] flex-[1]"></div>
                  <div className="h-full bg-[#7a937a] flex-[1]"></div>
                  <div className="h-full bg-[#7a937a] flex-[1]"></div>
                  <div className="h-full bg-[#eae2da] flex-[1]"></div>
                  <div className="h-full bg-[#eae2da] flex-[1]"></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface">QA & Deployment</span>
                  <span className="text-[10px] font-bold text-[#c88d40]">40% Available</span>
                </div>
                <div className="flex gap-1 h-8">
                  <div className="h-full bg-[#d6a55c] flex-[1]"></div>
                  <div className="h-full bg-[#d6a55c] flex-[1]"></div>
                  <div className="h-full bg-[#eae2da] flex-[1]"></div>
                  <div className="h-full bg-[#eae2da] flex-[1]"></div>
                  <div className="h-full bg-[#eae2da] flex-[1]"></div>
                </div>
              </div>

            </div>

            <button className="w-full mt-6 py-2.5 rounded border border-outline-variant text-[10px] font-bold tracking-widest uppercase text-on-surface hover:bg-surface-variant transition-colors shadow-sm">
              Rebalance Teams
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
