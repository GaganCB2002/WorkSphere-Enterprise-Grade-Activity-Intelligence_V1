import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar, Clock, Hash, BookOpen, ListTodo, CheckCircle2, XCircle,
  FileText, MoreHorizontal, ChevronDown, ChevronUp, Target, Users
} from 'lucide-react';
import InternPageShell from '../../InternPageShell';

interface Session {
  id: string;
  sessionNumber: number;
  date: string;
  duration: string;
  topic: string;
  keyTakeaways: string[];
  actionItems: string[];
  status: 'Completed' | 'Cancelled' | 'Scheduled';
  notes?: string;
}

const Sessions: React.FC = () => {
  const [expandedSession, setExpandedSession] = useState<string | null>(null);
  const [sessions] = useState<Session[]>([
    {
      id: 'S001', sessionNumber: 6, date: '2026-07-18', duration: '45 min',
      topic: 'System Design Deep Dive',
      keyTakeaways: ['Understood microservices vs monolith trade-offs', 'Learned about CQRS pattern', 'Designed a simple event-driven architecture'],
      actionItems: ['Read chapter 5 on distributed systems', 'Implement a sample event bus', 'Prepare questions for next session'],
      status: 'Completed',
      notes: 'Great session! Sarah walked through a real-world system design. Need to practice more whiteboarding.',
    },
    {
      id: 'S002', sessionNumber: 5, date: '2026-07-11', duration: '45 min',
      topic: 'Code Review Best Practices',
      keyTakeaways: ['Review formatting before logic', 'Use semantic PR descriptions', 'Focus on patterns not preferences'],
      actionItems: ['Apply learnings to current PR #142', 'Create a personal checklist', 'Review 2 peer PRs this week'],
      status: 'Completed',
    },
    {
      id: 'S003', sessionNumber: 4, date: '2026-07-04', duration: '30 min',
      topic: 'Career Growth Planning',
      keyTakeaways: ['Define 30-60-90 day goals', 'Build a learning roadmap', 'Network within the organization'],
      actionItems: ['Create career roadmap doc', 'Schedule coffee chats with 3 seniors', 'Identify a mentor outside team'],
      status: 'Completed',
    },
    {
      id: 'S004', sessionNumber: 3, date: '2026-06-27', duration: '45 min',
      topic: 'Debugging Techniques',
      keyTakeaways: ['Use conditional breakpoints', 'Read stack traces systematically', 'Log strategically'],
      actionItems: ['Refactor logging in current module', 'Practice with 3 historical bugs'],
      status: 'Completed',
    },
    {
      id: 'S005', sessionNumber: 2, date: '2026-06-20', duration: '45 min',
      topic: 'Agile & Sprint Methodology',
      keyTakeaways: ['Sprint ceremonies purpose', 'Story point estimation', 'Handling mid-sprint changes'],
      actionItems: ['Volunteer for sprint demo', 'Read Scrum guide'],
      status: 'Completed',
    },
    {
      id: 'S006', sessionNumber: 1, date: '2026-06-13', duration: '30 min',
      topic: 'Kickoff & Goal Setting',
      keyTakeaways: ['Internship roadmap overview', 'Expectations alignment', 'Communication channels'],
      actionItems: ['Complete onboarding checklist', 'Set up development environment'],
      status: 'Completed',
    },
    {
      id: 'S007', sessionNumber: 7, date: '2026-07-25', duration: '45 min',
      topic: 'Performance Optimization',
      keyTakeaways: [],
      actionItems: [],
      status: 'Scheduled',
    },
  ]);

  const totalSessions = sessions.length;
  const totalHours = sessions.filter(s => s.status === 'Completed').reduce((acc, s) => {
    const mins = parseInt(s.duration);
    return acc + (isNaN(mins) ? 45 : mins);
  }, 0);
  const avgDuration = Math.round(totalHours / sessions.filter(s => s.status === 'Completed').length);

  const statusColors: Record<string, string> = {
    Completed: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300',
    Cancelled: 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-300',
    Scheduled: 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300',
  };

  const statusIcons: Record<string, React.ReactNode> = {
    Completed: <CheckCircle2 className="w-3.5 h-3.5" />,
    Cancelled: <XCircle className="w-3.5 h-3.5" />,
    Scheduled: <Calendar className="w-3.5 h-3.5" />,
  };

  return (
    <InternPageShell title="1-on-1 Sessions" description="Your one-on-one sessions with mentor">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Sessions', value: totalSessions, icon: Hash, color: 'text-blue-600 bg-blue-100 dark:bg-blue-500/10' },
          { label: 'Total Hours', value: `${Math.floor(totalHours / 60)}h ${totalHours % 60}m`, icon: Clock, color: 'text-purple-600 bg-purple-100 dark:bg-purple-500/10' },
          { label: 'Avg Duration', value: `${avgDuration} min`, icon: Target, color: 'text-amber-600 bg-amber-100 dark:bg-amber-500/10' },
        ].map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-5"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{kpi.label}</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{kpi.value}</p>
              </div>
              <div className={`p-3 rounded-lg ${kpi.color}`}>
                <kpi.icon className="w-5 h-5" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
              <tr>
                {['Session #', 'Date', 'Duration', 'Topic', 'Key Takeaways', 'Action Items', 'Status', 'Actions'].map((header) => (
                  <th key={header} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {sessions.map((session, i) => (
                <motion.tr
                  key={session.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors"
                >
                  <td className="px-4 py-3">
                    <span className="font-mono text-sm font-semibold text-blue-600 dark:text-blue-400">#{session.sessionNumber}</span>
                  </td>
                  <td className="px-4 py-3 text-slate-700 dark:text-slate-300 whitespace-nowrap">{session.date}</td>
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {session.duration}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">{session.topic}</td>
                  <td className="px-4 py-3">
                    <div className="flex -space-x-1">
                      {session.keyTakeaways.slice(0, 2).map((_, j) => (
                        <div key={j} className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center border-2 border-white dark:border-slate-900">
                          <BookOpen className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                        </div>
                      ))}
                      {session.keyTakeaways.length > 2 && (
                        <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center border-2 border-white dark:border-slate-900 text-[10px] font-medium text-slate-500">
                          +{session.keyTakeaways.length - 2}
                        </div>
                      )}
                      {session.keyTakeaways.length === 0 && <span className="text-slate-400 text-xs">—</span>}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex -space-x-1">
                      {session.actionItems.slice(0, 2).map((_, j) => (
                        <div key={j} className="w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-500/20 flex items-center justify-center border-2 border-white dark:border-slate-900">
                          <ListTodo className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                        </div>
                      ))}
                      {session.actionItems.length > 2 && (
                        <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center border-2 border-white dark:border-slate-900 text-[10px] font-medium text-slate-500">
                          +{session.actionItems.length - 2}
                        </div>
                      )}
                      {session.actionItems.length === 0 && <span className="text-slate-400 text-xs">—</span>}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[session.status]}`}>
                      {statusIcons[session.status]}
                      {session.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => setExpandedSession(expandedSession === session.id ? null : session.id)}
                      className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                    >
                      {expandedSession === session.id ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        {expandedSession && (() => {
          const session = sessions.find(s => s.id === expandedSession)!;
          return (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="border-t border-slate-200 dark:border-slate-700 p-6 bg-slate-50 dark:bg-slate-800/30"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-blue-500" />
                    Key Takeaways
                  </h4>
                  {session.keyTakeaways.length > 0 ? (
                    <ul className="space-y-2">
                      {session.keyTakeaways.map((takeaway, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                          {takeaway}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-slate-400 italic">No takeaways recorded yet.</p>
                  )}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                    <ListTodo className="w-4 h-4 text-amber-500" />
                    Action Items
                  </h4>
                  {session.actionItems.length > 0 ? (
                    <ul className="space-y-2">
                      {session.actionItems.map((item, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                          <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-slate-400 italic">No action items yet.</p>
                  )}
                </div>
              </div>
              {session.notes && (
                <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-slate-500" />
                    Session Notes
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{session.notes}</p>
                </div>
              )}
            </motion.div>
          );
        })()}
      </motion.div>
    </InternPageShell>
  );
};

export default Sessions;
