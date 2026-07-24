import React, { useState } from 'react';
import InternPageShell from '../../InternPageShell';
import { motion } from 'framer-motion';
import { Calendar, Clock, CheckCircle2, Circle, Filter } from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const projects = ['Portal Redesign', 'API Gateway', 'Analytics Dashboard'];

const timelineData: Record<string, Array<{
  phase: string; start: string; end: string; progress: number; status: string; color: string;
}>> = {
  'Portal Redesign': [
    { phase: 'Requirements Gathering', start: '2026-06-01', end: '2026-06-15', progress: 100, status: 'Complete', color: 'bg-blue-500' },
    { phase: 'UI/UX Design', start: '2026-06-10', end: '2026-07-05', progress: 100, status: 'Complete', color: 'bg-violet-500' },
    { phase: 'Frontend Development', start: '2026-07-01', end: '2026-08-15', progress: 60, status: 'In Progress', color: 'bg-amber-500' },
    { phase: 'Integration & Testing', start: '2026-08-10', end: '2026-09-01', progress: 0, status: 'Upcoming', color: 'bg-slate-300 dark:bg-slate-600' },
    { phase: 'Deployment', start: '2026-09-01', end: '2026-09-15', progress: 0, status: 'Upcoming', color: 'bg-slate-300 dark:bg-slate-600' },
  ],
  'API Gateway': [
    { phase: 'Architecture Design', start: '2026-05-01', end: '2026-05-20', progress: 100, status: 'Complete', color: 'bg-blue-500' },
    { phase: 'Core Implementation', start: '2026-05-20', end: '2026-07-10', progress: 100, status: 'Complete', color: 'bg-emerald-500' },
    { phase: 'Rate Limiting Module', start: '2026-07-01', end: '2026-07-25', progress: 75, status: 'In Progress', color: 'bg-amber-500' },
    { phase: 'Testing & Documentation', start: '2026-07-20', end: '2026-08-10', progress: 0, status: 'Upcoming', color: 'bg-slate-300 dark:bg-slate-600' },
  ],
  'Analytics Dashboard': [
    { phase: 'Data Modeling', start: '2026-07-01', end: '2026-07-20', progress: 100, status: 'Complete', color: 'bg-blue-500' },
    { phase: 'Chart Components', start: '2026-07-15', end: '2026-08-10', progress: 40, status: 'In Progress', color: 'bg-amber-500' },
    { phase: 'Filter & Export', start: '2026-08-05', end: '2026-08-25', progress: 0, status: 'Upcoming', color: 'bg-slate-300 dark:bg-slate-600' },
    { phase: 'Dashboard Assembly', start: '2026-08-20', end: '2026-09-15', progress: 0, status: 'Upcoming', color: 'bg-slate-300 dark:bg-slate-600' },
    { phase: 'User Acceptance Testing', start: '2026-09-10', end: '2026-10-01', progress: 0, status: 'Upcoming', color: 'bg-slate-300 dark:bg-slate-600' },
  ],
};

const milestones: Record<string, { name: string; date: string; done: boolean }[]> = {
  'Portal Redesign': [
    { name: 'Design Approval', date: '2026-07-05', done: true },
    { name: 'MVP Launch', date: '2026-08-15', done: false },
    { name: 'Full Release', date: '2026-09-15', done: false },
  ],
  'API Gateway': [
    { name: 'Design Review', date: '2026-05-20', done: true },
    { name: 'Core Complete', date: '2026-07-10', done: true },
    { name: 'Final Release', date: '2026-08-10', done: false },
  ],
  'Analytics Dashboard': [
    { name: 'Data Model Done', date: '2026-07-20', done: true },
    { name: 'Charts Complete', date: '2026-08-10', done: false },
    { name: 'UAT Sign-off', date: '2026-10-01', done: false },
  ],
};

const monthLabels = ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];

function getMonthIndex(dateStr: string): number {
  const d = new Date(dateStr);
  return (d.getFullYear() - 2026) * 12 + d.getMonth() - 4; // offset from May 2026 (index 0)
}

function getDurationMonths(start: string, end: string): number {
  return getMonthIndex(end) - getMonthIndex(start) || 0.5;
}

function ProgressBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    Complete: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400',
    'In Progress': 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400',
    Upcoming: 'bg-slate-100 text-slate-500 dark:bg-slate-500/10 dark:text-slate-400',
  };
  return <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold ${map[status] || ''}`}>{status}</span>;
}

export default function ProjectTimeline() {
  const [selectedProject, setSelectedProject] = useState('Portal Redesign');

  const phases = timelineData[selectedProject] || [];
  const ms = milestones[selectedProject] || [];

  return (
    <InternPageShell title="Project Timeline" description="Timeline view of your projects">
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
        <motion.div variants={item} className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          {projects.map(p => (
            <button
              key={p}
              onClick={() => setSelectedProject(p)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                selectedProject === p
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/40'
              }`}
            >
              {p}
            </button>
          ))}
        </motion.div>

        <motion.div variants={item} className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl p-5 shadow-sm">
          <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider mb-5">Phases & Milestones</h3>

          {/* Month headers */}
          <div className="flex mb-3 ml-28">
            {monthLabels.map((m, i) => (
              <div key={m} className="flex-1 text-center text-[10px] font-bold text-slate-400 uppercase tracking-wider">{m}</div>
            ))}
          </div>

          {/* Gantt bars */}
          <div className="space-y-3">
            {phases.map((phase, i) => {
              const startIdx = getMonthIndex(phase.start);
              const duration = Math.max(getDurationMonths(phase.start, phase.end), 0.5);
              return (
                <div key={phase.phase} className="flex items-center gap-3">
                  <div className="w-28 text-right">
                    <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">{phase.phase}</span>
                  </div>
                  <div className="flex-1 relative h-7 bg-slate-100 dark:bg-slate-700/40 rounded-md overflow-hidden">
                    <div
                      className={`absolute top-0.5 h-6 rounded-md ${phase.color} opacity-80`}
                      style={{
                        left: `${(startIdx / monthLabels.length) * 100}%`,
                        width: `${(duration / monthLabels.length) * 100}%`,
                      }}
                    />
                  </div>
                  <div className="w-24 text-right">
                    <span className="text-[10px] font-bold text-slate-500">{phase.start} – {phase.end}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Milestones */}
          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-700/60">
            <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">Milestones</h4>
            <div className="flex items-center gap-6">
              {ms.map((m, i) => (
                <div key={m.name} className="flex items-center gap-2 text-xs">
                  {m.done ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <Circle className="w-4 h-4 text-slate-300 dark:text-slate-600" />
                  )}
                  <div>
                    <span className={`font-semibold ${m.done ? 'text-slate-700 dark:text-slate-200' : 'text-slate-400'}`}>{m.name}</span>
                    <span className="text-slate-400 ml-2">{m.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div variants={item} className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-700/60">
            <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">Phase Details</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/40">
                  <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Phase / Milestone</th>
                  <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Start Date</th>
                  <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">End Date</th>
                  <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Progress</th>
                  <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/40">
                {phases.map((phase, i) => (
                  <tr key={phase.phase} className="hover:bg-slate-50 dark:hover:bg-slate-700/20 transition-colors">
                    <td className="px-5 py-3.5 font-semibold text-slate-800 dark:text-slate-200">{phase.phase}</td>
                    <td className="px-5 py-3.5 text-slate-500">{phase.start}</td>
                    <td className="px-5 py-3.5 text-slate-500">{phase.end}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-slate-100 dark:bg-slate-700/60 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${phase.progress === 100 ? 'bg-emerald-500' : phase.progress > 0 ? 'bg-amber-500' : 'bg-slate-300 dark:bg-slate-600'}`} style={{ width: `${phase.progress}%` }} />
                        </div>
                        <span className="text-xs font-bold text-slate-500">{phase.progress}%</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5"><ProgressBadge status={phase.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </motion.div>
    </InternPageShell>
  );
}

