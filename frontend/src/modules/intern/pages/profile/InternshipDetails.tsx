import React from 'react';
import InternPageShell from '../../InternPageShell';
import { motion } from 'framer-motion';
import {
  Building2, User, Calendar, Clock, DollarSign, UserCircle,
  CheckCircle, Circle, Loader2, Briefcase
} from 'lucide-react';

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

const details = [
  { label: 'Department', value: 'Product Design', icon: Building2 },
  { label: 'Mentor', value: 'Marcus Chen', icon: User },
  { label: 'Start Date', value: '01 June 2025', icon: Calendar },
  { label: 'End Date', value: '31 August 2025', icon: Calendar },
  { label: 'Duration', value: '12 Weeks', icon: Clock },
  { label: 'Stipend', value: '₹ 20,000 / month', icon: DollarSign },
  { label: 'Reporting Manager', value: 'Marcus Chen', icon: UserCircle },
  { label: 'Internship Type', value: 'Full-time (Hybrid)', icon: Briefcase },
];

const milestones = [
  { title: 'Onboarding & Orientation', date: '01 - 07 Jun', status: 'Completed' },
  { title: 'Foundation & Tool Setup', date: '08 - 21 Jun', status: 'Completed' },
  { title: 'Core Project Work - Phase I', date: '22 Jun - 19 Jul', status: 'In Progress' },
  { title: 'Mid-term Evaluation', date: '20 - 26 Jul', status: 'Pending' },
  { title: 'Core Project Work - Phase II', date: '27 Jul - 16 Aug', status: 'Pending' },
  { title: 'Final Presentation & Wrap-up', date: '17 - 31 Aug', status: 'Pending' },
];

const statusIcon = (status: string) => {
  switch (status) {
    case 'Completed': return <CheckCircle className="w-5 h-5 text-emerald-500" />;
    case 'In Progress': return <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />;
    default: return <Circle className="w-5 h-5 text-slate-300 dark:text-slate-600" />;
  }
};

const progressPercent = 58;

export default function InternshipDetails() {
  return (
    <InternPageShell
      title="Internship Details"
      description="Your internship program information"
      breadcrumbs={[
        { label: 'Intern Dashboard', path: '/intern/dashboard' },
        { label: 'Profile' },
        { label: 'Internship Details' },
      ]}
    >
      <motion.div variants={container} initial="hidden" animate="show" className="max-w-4xl space-y-6">

        {/* Progress Overview */}
        <motion.div variants={item} className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">Internship Progress</h3>
            <span className="text-xs font-semibold text-slate-400">Week {Math.round(12 * progressPercent / 100)} of 12</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-700/60 rounded-full h-3 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
            />
          </div>
          <div className="flex items-center justify-between mt-2 text-xs text-slate-400">
            <span>Start: 01 Jun 2025</span>
            <span className="font-semibold text-slate-700 dark:text-slate-200">{progressPercent}% Complete</span>
            <span>End: 31 Aug 2025</span>
          </div>
        </motion.div>

        {/* Details Grid */}
        <motion.div variants={item} className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl p-6 shadow-sm">
          <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider mb-5">Program Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {details.map((d) => {
              const Icon = d.icon;
              return (
                <div key={d.label} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40">
                  <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 flex-shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{d.label}</p>
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-0.5">{d.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div variants={item} className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl p-6 shadow-sm">
          <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider mb-5">Internship Timeline</h3>
          <div className="relative pl-8 space-y-6 before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-700/60">
            {milestones.map((m, i) => (
              <div key={i} className="relative">
                <div className="absolute -left-8 top-0.5">{statusIcon(m.status)}</div>
                <div>
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{m.title}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-slate-400">{m.date}</span>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${
                      m.status === 'Completed' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400' :
                      m.status === 'In Progress' ? 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400' :
                      'bg-slate-100 text-slate-500 dark:bg-slate-700/40 dark:text-slate-400'
                    }`}>
                      {m.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </motion.div>
    </InternPageShell>
  );
}
