import React from 'react';
import InternPageShell from '../../InternPageShell';
import { motion } from 'framer-motion';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';
import { Award, FileText, MessageSquare, CheckCircle, Clock, AlertTriangle } from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const radarData = [
  { skill: 'Technical Skills', score: 4.3, fullMark: 5 },
  { skill: 'Communication', score: 4.0, fullMark: 5 },
  { skill: 'Teamwork', score: 4.5, fullMark: 5 },
  { skill: 'Initiative', score: 3.8, fullMark: 5 },
  { skill: 'Learning Agility', score: 4.6, fullMark: 5 },
];

const overallScore = (radarData.reduce((a, b) => a + b.score, 0) / radarData.length).toFixed(1);
const overallPercentage = ((parseFloat(overallScore) / 5) * 100).toFixed(0);

const sectionRatings = [
  { label: 'Technical Skills', score: 4.3, icon: Award, color: 'text-blue-600', barColor: 'bg-blue-500' },
  { label: 'Communication', score: 4.0, icon: MessageSquare, color: 'text-emerald-600', barColor: 'bg-emerald-500' },
  { label: 'Teamwork', score: 4.5, icon: Award, color: 'text-violet-600', barColor: 'bg-violet-500' },
  { label: 'Initiative', score: 3.8, icon: FileText, color: 'text-amber-600', barColor: 'bg-amber-500' },
  { label: 'Learning Agility', score: 4.6, icon: Award, color: 'text-rose-600', barColor: 'bg-rose-500' },
];

const statusConfig = {
  Pending: { icon: Clock, color: 'text-slate-500 bg-slate-100 dark:bg-slate-700/40', text: 'Pending' },
  'In Progress': { icon: AlertTriangle, color: 'text-amber-600 bg-amber-100 dark:bg-amber-500/10', text: 'In Progress' },
  Completed: { icon: CheckCircle, color: 'text-emerald-600 bg-emerald-100 dark:bg-emerald-500/10', text: 'Completed' },
};

type EvaluationStatus = keyof typeof statusConfig;
const currentStatus: EvaluationStatus = 'In Progress';
const StatusIcon = statusConfig[currentStatus].icon;

export default function FinalEvaluation() {
  return (
    <InternPageShell title="Final Evaluation" description="End of internship evaluation"
      actions={
        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${statusConfig[currentStatus].color}`}>
          <StatusIcon className="w-3.5 h-3.5" /> {statusConfig[currentStatus].text}
        </span>
      }
    >
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">

        {/* Overall Score */}
        <motion.div variants={item} className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl p-6 shadow-sm">
          <div className="flex flex-col lg:flex-row items-center gap-6">
            <div className="flex-shrink-0 w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shadow-lg">
              <div className="text-center">
                <p className="text-4xl font-extrabold text-white">{overallScore}</p>
                <p className="text-xs text-blue-100 font-medium">/ 5.0</p>
              </div>
            </div>
            <div className="flex-1 text-center lg:text-left">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Overall Performance Score</h3>
              <p className="text-sm text-slate-500 mt-1">{overallPercentage}% — Exceeds expectations</p>
              <div className="mt-3 w-full max-w-md h-2.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-violet-500 transition-all duration-700" style={{ width: `${overallPercentage}%` }} />
              </div>
              <div className="flex items-center gap-4 mt-3 justify-center lg:justify-start">
                <span className="text-xs text-slate-400">Pending: <strong className="text-slate-600 dark:text-slate-300">Mentor Review</strong></span>
                <span className="text-xs text-slate-400">Updated: <strong className="text-slate-600 dark:text-slate-300">Jul 23, 2026</strong></span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Section Ratings & Radar Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div variants={item} className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl p-5 shadow-sm">
            <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider mb-4">Section Ratings</h3>
            <div className="space-y-4">
              {sectionRatings.map(sr => {
                const Icon = sr.icon;
                const pct = (sr.score / 5) * 100;
                return (
                  <div key={sr.label}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <Icon className={`w-4 h-4 ${sr.color}`} />
                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{sr.label}</span>
                      </div>
                      <span className="text-sm font-bold text-slate-900 dark:text-white">{sr.score.toFixed(1)}</span>
                    </div>
                    <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full transition-all duration-500 ${sr.barColor}`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          <motion.div variants={item} className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl p-5 shadow-sm">
            <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider mb-4">Skill Radar</h3>
            <ResponsiveContainer width="100%" height={280}>
              <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="70%">
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="skill" tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <PolarRadiusAxis angle={30} domain={[0, 5]} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <Radar name="Scores" dataKey="score" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.2} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Mentor's Final Comments */}
        <motion.div variants={item} className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <MessageSquare className="w-4 h-4 text-slate-400" />
            <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">Mentor's Final Comments</h3>
          </div>
          <div className="bg-slate-50 dark:bg-slate-700/30 rounded-lg p-4 border border-slate-100 dark:border-slate-700/40">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-violet-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">
                JM
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">Jane Mentor</p>
                <p className="text-xs text-slate-400">Senior Developer · Mentor</p>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                  Overall a great internship performance. Demonstrated strong technical aptitude and excellent teamwork.
                  Shows initiative in learning new technologies. Recommend focusing on proactive communication and
                  documentation practices. Has the potential to be a valuable full-time team member.
                </p>
                <p className="text-xs text-slate-400 mt-2">Reviewed: Jul 22, 2026</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </InternPageShell>
  );
}
