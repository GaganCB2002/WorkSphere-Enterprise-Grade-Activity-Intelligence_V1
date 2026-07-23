import React, { useState } from 'react';
import InternPageShell from '../../InternPageShell';
import { motion } from 'framer-motion';
import { BookOpen, CheckCircle, Layers, ChevronRight, Circle, Check } from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const learningPaths = [
  {
    id: 1, name: 'Full Stack Development', modules: 8, completedModules: 3, progress: 38, status: 'Active',
    modulesList: ['HTML/CSS Basics', 'JavaScript Fundamentals', 'React Core', 'Node.js Backend', 'Database Design', 'API Development', 'Testing & CI/CD', 'Deployment'],
  },
  {
    id: 2, name: 'Data Engineering Pipeline', modules: 6, completedModules: 6, progress: 100, status: 'Completed',
    modulesList: ['Python for Data', 'SQL Mastery', 'ETL Pipelines', 'Data Warehousing', 'Big Data Tools', 'Data Visualization'],
  },
  {
    id: 3, name: 'Cloud Solutions Architect', modules: 10, completedModules: 4, progress: 40, status: 'Active',
    modulesList: ['Cloud Fundamentals', 'AWS Core Services', 'Networking', 'Security & Compliance', 'Architecture Design', 'Migration', 'Cost Management', 'High Availability', 'DevOps on Cloud', 'Exam Prep'],
  },
  {
    id: 4, name: 'UI/UX Design Mastery', modules: 5, completedModules: 5, progress: 100, status: 'Completed',
    modulesList: ['Design Thinking', 'Wireframing', 'Prototyping', 'User Research', 'Visual Design'],
  },
  {
    id: 5, name: 'DevOps Engineering', modules: 7, completedModules: 2, progress: 29, status: 'Active',
    modulesList: ['CI/CD Pipelines', 'Containerization', 'Orchestration', 'Monitoring', 'Infrastructure as Code', 'Security', 'Site Reliability'],
  },
];

function KpiCard({ label, value, icon: Icon, color }: { label: string; value: string; icon: React.ElementType; color: string }) {
  return (
    <motion.div variants={item} className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className={`p-2.5 rounded-lg ${color}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">{label}</p>
      <p className="text-2xl font-bold text-slate-900 dark:text-white">{value}</p>
    </motion.div>
  );
}

export default function LearningPaths() {
  const [expandedPath, setExpandedPath] = useState<number | null>(null);

  const activePaths = learningPaths.filter(p => p.status === 'Active').length;
  const completedPaths = learningPaths.filter(p => p.status === 'Completed').length;
  const totalModules = learningPaths.reduce((sum, p) => sum + p.modules, 0);

  return (
    <InternPageShell title="Learning Paths" description="Structured learning journeys">
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: 'Active Paths', value: String(activePaths), icon: BookOpen, color: 'text-blue-600 bg-blue-100 dark:bg-blue-500/10 dark:text-blue-400' },
            { label: 'Completed Paths', value: String(completedPaths), icon: CheckCircle, color: 'text-emerald-600 bg-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400' },
            { label: 'Total Modules', value: String(totalModules), icon: Layers, color: 'text-violet-600 bg-violet-100 dark:bg-violet-500/10 dark:text-violet-400' },
          ].map((kpi, i) => <KpiCard key={kpi.label} {...kpi} />)}
        </div>

        {/* Path Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {learningPaths.map(path => (
            <motion.div key={path.id} variants={item} className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden">
              <div className="p-5 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">{path.name}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">{path.completedModules} of {path.modules} modules completed</p>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                    path.status === 'Active' ? 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400' :
                    'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400'
                  }`}>
                    {path.status}
                  </span>
                </div>
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-500">Progress</span>
                    <span className="text-blue-600 dark:text-blue-400">{path.progress}%</span>
                  </div>
                  <div className="h-2 bg-slate-100 dark:bg-slate-700/60 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-violet-500 rounded-full transition-all duration-700" style={{ width: `${path.progress}%` }} />
                  </div>
                </div>
               </div>

               {/* Module Timeline */}
               <div className="border-t border-slate-100 dark:border-slate-700/60 px-5 py-4">
                  <button
                    onClick={() => setExpandedPath(expandedPath === path.id ? null : path.id)}
                    className="flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 transition-colors"
                  >
                    <Layers className="w-3.5 h-3.5" />
                    {expandedPath === path.id ? 'Hide modules' : 'View modules'}
                    <ChevronRight className={`w-3 h-3 transition-transform ${expandedPath === path.id ? 'rotate-90' : ''}`} />
                  </button>
                  {expandedPath === path.id && (
                  <div className="space-y-1.5">
                    {path.modulesList.map((mod, idx) => (
                      <div key={idx} className="flex items-center gap-3 py-1.5">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                          idx < path.completedModules
                            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400'
                            : 'bg-slate-100 dark:bg-slate-700/60 text-slate-400'
                        }`}>
                          {idx < path.completedModules ? <Check className="w-3.5 h-3.5" /> : <Circle className="w-3.5 h-3.5" />}
                        </div>
                        <span className={`text-xs ${idx < path.completedModules ? 'text-slate-700 dark:text-slate-200 font-medium' : 'text-slate-400'}`}>{mod}</span>
                      </div>
                    ))}
                  </div>
                  )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </InternPageShell>
  );
}
