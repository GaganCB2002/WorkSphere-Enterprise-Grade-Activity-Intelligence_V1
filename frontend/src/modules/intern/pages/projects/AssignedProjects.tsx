import React, { useState } from 'react';
import InternPageShell from '../../InternPageShell';
import { motion } from 'framer-motion';
import {
  FolderOpen, CheckCircle2, PauseCircle, Search,
  Users, Calendar, UserCheck, ArrowUpRight, ArrowDownRight
} from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const projects = [
  {
    name: 'Portal Redesign',
    description: 'Modernizing the user portal with React 18 and Tailwind CSS. Includes new dashboard, profile pages, and navigation overhaul.',
    teamSize: 5,
    role: 'Frontend Developer',
    timeline: 'Jun 2026 - Sep 2026',
    progress: 65,
    status: 'Active',
  },
  {
    name: 'API Gateway',
    description: 'Building a centralized API gateway with rate limiting, authentication, and request logging for all microservices.',
    teamSize: 4,
    role: 'Backend Intern',
    timeline: 'May 2026 - Aug 2026',
    progress: 80,
    status: 'Active',
  },
  {
    name: 'Analytics Dashboard',
    description: 'Developing real-time analytics dashboard with interactive charts, data export, and custom report builder.',
    teamSize: 3,
    role: 'Full Stack Intern',
    timeline: 'Jul 2026 - Oct 2026',
    progress: 30,
    status: 'Active',
  },
  {
    name: 'DevOps Pipeline',
    description: 'Automating build, test, and deployment pipelines using GitHub Actions, Docker, and AWS ECS.',
    teamSize: 2,
    role: 'DevOps Intern',
    timeline: 'Apr 2026 - Jun 2026',
    progress: 100,
    status: 'Completed',
  },
  {
    name: 'Mobile App MVP',
    description: 'Creating a cross-platform mobile app using React Native for task management and team communication.',
    teamSize: 6,
    role: 'Mobile Intern',
    timeline: 'Aug 2026 - Dec 2026',
    progress: 15,
    status: 'On Hold',
  },
];

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    Active: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400',
    Completed: 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400',
    'On Hold': 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400',
  };
  return <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold ${map[status] || ''}`}>{status}</span>;
}

export default function AssignedProjects() {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const kpis = [
    { label: 'Active Projects', value: projects.filter(p => p.status === 'Active').length, icon: FolderOpen, color: 'text-emerald-600 bg-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400' },
    { label: 'Completed', value: projects.filter(p => p.status === 'Completed').length, icon: CheckCircle2, color: 'text-blue-600 bg-blue-100 dark:bg-blue-500/10 dark:text-blue-400' },
    { label: 'On Hold', value: projects.filter(p => p.status === 'On Hold').length, icon: PauseCircle, color: 'text-amber-600 bg-amber-100 dark:bg-amber-500/10 dark:text-amber-400' },
    { label: 'Total Projects', value: projects.length, icon: FolderOpen, color: 'text-violet-600 bg-violet-100 dark:bg-violet-500/10 dark:text-violet-400' },
  ];

  const filtered = projects.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'All' || p.status === filterStatus;
    return matchSearch && matchStatus;
  });

  return (
    <InternPageShell title="Assigned Projects" description="Projects you are contributing to">
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map((kpi, i) => {
            const Icon = kpi.icon;
            return (
              <motion.div key={kpi.label} variants={item} className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className={`p-2.5 rounded-lg ${kpi.color}`}><Icon className="w-5 h-5" /></div>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full text-emerald-700 bg-emerald-50 dark:bg-emerald-500/10 dark:text-emerald-400">
                    <ArrowUpRight className="w-3 h-3" /> Current
                  </span>
                </div>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">{kpi.label}</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{kpi.value}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div variants={item} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search projects..." className="w-full pl-9 pr-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm bg-white dark:bg-slate-800/60 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" />
          </div>
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 focus:outline-none focus:border-blue-500">
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
            <option value="On Hold">On Hold</option>
          </select>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((proj, i) => (
            <motion.div key={proj.name} variants={item} className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">{proj.name}</h3>
                <StatusBadge status={proj.status} />
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4 line-clamp-2">{proj.description}</p>
              <div className="mt-auto space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="inline-flex items-center gap-1"><Users className="w-3.5 h-3.5" />{proj.teamSize} members</span>
                  <span className="inline-flex items-center gap-1"><UserCheck className="w-3.5 h-3.5" />{proj.role}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Calendar className="w-3.5 h-3.5" />
                  {proj.timeline}
                </div>
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-semibold text-slate-600 dark:text-slate-300">Progress</span>
                    <span className="font-bold text-slate-700 dark:text-slate-200">{proj.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 dark:bg-slate-700/60 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${proj.progress === 100 ? 'bg-blue-500' : proj.progress > 50 ? 'bg-emerald-500' : 'bg-amber-500'}`}
                      style={{ width: `${proj.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full text-center py-12 text-sm text-slate-400">No projects found matching your criteria.</div>
          )}
        </div>
      </motion.div>
    </InternPageShell>
  );
}
