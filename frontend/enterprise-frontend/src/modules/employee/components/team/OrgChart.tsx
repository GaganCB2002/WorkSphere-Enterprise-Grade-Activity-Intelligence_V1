import React from 'react';
import { ChevronDown, ArrowDown, Shield, User, Star } from 'lucide-react';
import { GlassPanel } from '../ui/GlassPanel';
import { Avatar } from '../ui/Avatar';
import * as mock from '../../data/mockData';

export function OrgChart() {
  const emp = mock.currentEmployee;

  return (
    <GlassPanel className="p-6">
      <div className="flex flex-col items-center">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white self-start mb-6">Reporting Line</h3>

        {/* Manager Node */}
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-white/[0.04] w-64 shadow-sm">
            <Avatar name={emp.reportingManager.name} status="online" size="md" />
            <p className="text-xs font-bold text-slate-900 dark:text-white mt-2">{emp.reportingManager.name}</p>
            <p className="text-[10px] text-slate-400 mt-0.5">{emp.reportingManager.designation}</p>
            <span className="text-[9px] font-bold text-blue-500 bg-blue-50 dark:bg-blue-500/10 px-2 py-0.5 rounded mt-2 uppercase tracking-wider">
              Reporting Manager
            </span>
          </div>

          {/* Connection Line */}
          <div className="h-8 w-0.5 bg-slate-200 dark:bg-slate-800 flex items-center justify-center my-1">
            <ArrowDown className="w-3.5 h-3.5 text-slate-400 -mb-2" />
          </div>
        </div>

        {/* Employee Node (Current User) */}
        <div className="flex flex-col items-center mt-2">
          <div className="flex flex-col items-center p-4 rounded-2xl bg-gradient-to-br from-blue-500/10 to-indigo-500/5 border-2 border-blue-500/30 dark:border-blue-500/20 w-64 shadow-md shadow-blue-500/[0.02]">
            <Avatar name={emp.name} status="online" size="md" />
            <p className="text-xs font-bold text-slate-900 dark:text-white mt-2">{emp.name}</p>
            <p className="text-[10px] text-slate-400 mt-0.5">{emp.designation}</p>
            <span className="text-[9px] font-bold text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded mt-2 uppercase tracking-wider">
              You
            </span>
          </div>
        </div>

        {/* Supporting Partners */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 pt-6 border-t border-slate-100 dark:border-white/[0.04] w-full">
          {/* Tech Lead */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50/50 dark:bg-slate-800/20 border border-slate-100 dark:border-white/[0.03]">
            <div className="w-8 h-8 rounded-lg bg-purple-50 dark:bg-purple-500/10 flex items-center justify-center text-purple-500 flex-shrink-0">
              <Star className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Technical Lead</p>
              <p className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">{emp.techLead.name}</p>
              <p className="text-[10px] text-slate-400">{emp.techLead.designation}</p>
            </div>
          </div>

          {/* HR Partner */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50/50 dark:bg-slate-800/20 border border-slate-100 dark:border-white/[0.03]">
            <div className="w-8 h-8 rounded-lg bg-cyan-50 dark:bg-cyan-500/10 flex items-center justify-center text-cyan-500 flex-shrink-0">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">HR Business Partner</p>
              <p className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">{emp.hrAssigned.name}</p>
              <p className="text-[10px] text-slate-400">{emp.hrAssigned.designation}</p>
            </div>
          </div>
        </div>
      </div>
    </GlassPanel>
  );
}

export default OrgChart;
