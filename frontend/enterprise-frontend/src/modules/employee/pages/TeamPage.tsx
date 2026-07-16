import React, { useState } from 'react';
import { Users, UserCheck, Briefcase, BarChart2 } from 'lucide-react';
import { GlassPanel } from '../components/ui/GlassPanel';
import { StatCard } from '../components/ui/StatCard';
import { Tabs } from '../components/ui/Tabs';
import { TeamGrid } from '../components/team/TeamGrid';
import { OrgChart } from '../components/team/OrgChart';
import * as mock from '../data/mockData';

export function TeamPage() {
  const [activeSubTab, setActiveSubTab] = useState('members');
  const team = mock.teamInfo;

  const subTabs = [
    { id: 'members', label: 'Team Members', badge: team.members.length },
    { id: 'org', label: 'Org Structure' },
  ];

  return (
    <div className="space-y-6 pb-8">
      {/* Team Header */}
      <GlassPanel className="p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900 dark:text-white">{team.name}</h1>
                <p className="text-xs text-slate-400 mt-0.5">{team.department} Department</p>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-white/[0.04] text-center min-w-[100px]">
              <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Manager</p>
              <p className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">{team.manager.name}</p>
            </div>
            <div className="px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-white/[0.04] text-center min-w-[100px]">
              <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Tech Lead</p>
              <p className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">{team.techLead.name}</p>
            </div>
          </div>
        </div>
      </GlassPanel>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-900/60 backdrop-blur-md border border-slate-200/60 dark:border-white/[0.06] rounded-2xl p-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Members</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1.5">{team.totalMembers}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-blue-500 flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900/60 backdrop-blur-md border border-slate-200/60 dark:border-white/[0.06] rounded-2xl p-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Active Projects</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1.5">{team.activeProjects}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-500/10 text-purple-500 flex items-center justify-center">
            <Briefcase className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900/60 backdrop-blur-md border border-slate-200/60 dark:border-white/[0.06] rounded-2xl p-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Avg Workload</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1.5">{team.avgWorkload}%</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
            <BarChart2 className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200/60 dark:border-white/[0.06] pb-px">
        <Tabs tabs={subTabs} activeTab={activeSubTab} onTabChange={setActiveSubTab} />
      </div>

      {/* Tab Panels */}
      <div className="mt-4">
        {activeSubTab === 'members' ? (
          <TeamGrid members={team.members} />
        ) : (
          <OrgChart />
        )}
      </div>
    </div>
  );
}

export default TeamPage;
