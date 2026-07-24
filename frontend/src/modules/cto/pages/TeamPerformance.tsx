import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Legend } from 'recharts';
import { TrendingUp, Clock, Bug, Users, Star, CheckCircle2, Zap, Code, GitPullRequest, MessageSquare } from 'lucide-react';
import CtoPageShell from '../CtoPageShell';
import DataTable, { StatusBadge } from '../../../components/common/DataTable/DataTable';

const kpiData = [
  { label: 'Sprint Velocity', value: '142 pts', sub: '+8 vs previous sprint', icon: TrendingUp, color: 'text-blue-500' },
  { label: 'Story Points Done', value: '1,247', sub: 'Across 12 sprints this quarter', icon: Zap, color: 'text-indigo-500' },
  { label: 'Review Turnaround', value: '4.2h', sub: '-0.8h improvement', icon: Clock, color: 'text-amber-500' },
  { label: 'Bug Rate', value: '2.3%', sub: '23 bugs per 1K story points', icon: Bug, color: 'text-rose-500' },
  { label: 'Team Satisfaction', value: '4.5/5', sub: 'Based on latest survey (n=124)', icon: Star, color: 'text-yellow-500' },
  { label: 'On-time Delivery', value: '91%', sub: 'Last 12 sprints tracked', icon: CheckCircle2, color: 'text-emerald-500' },
];

const velocityByMember = [
  { name: 'Alice Chen', velocity: 28, reviews: 18 }, { name: 'Bob Kumar', velocity: 24, reviews: 22 },
  { name: 'Carol Davis', velocity: 32, reviews: 15 }, { name: 'David Lee', velocity: 20, reviews: 25 },
  { name: 'Eve Martinez', velocity: 26, reviews: 20 }, { name: 'Frank Zhang', velocity: 30, reviews: 12 },
  { name: 'Grace Kim', velocity: 22, reviews: 28 }, { name: 'Henry Park', velocity: 18, reviews: 14 },
];

const skillsMatrix = [
  { skill: 'React/TypeScript', Alice: 5, Bob: 4, Carol: 3, David: 2, Eve: 4, fullMark: 5 },
  { skill: 'Node.js', Alice: 4, Bob: 5, Carol: 3, David: 4, Eve: 3, fullMark: 5 },
  { skill: 'Python', Alice: 3, Bob: 2, Carol: 5, David: 3, Eve: 4, fullMark: 5 },
  { skill: 'DevOps/K8s', Alice: 2, Bob: 4, Carol: 3, David: 5, Eve: 2, fullMark: 5 },
  { skill: 'Databases', Alice: 4, Bob: 3, Carol: 4, David: 3, Eve: 5, fullMark: 5 },
  { skill: 'Architecture', Alice: 5, Bob: 3, Carol: 2, David: 4, Eve: 3, fullMark: 5 },
];

const teamMembers = [
  { name: 'Alice Chen', role: 'Senior Engineer', velocity: 28, reviews: 18, bugs: 2, satisfaction: 4.8 },
  { name: 'Bob Kumar', role: 'Staff Engineer', velocity: 24, reviews: 22, bugs: 1, satisfaction: 4.6 },
  { name: 'Carol Davis', role: 'Principal Engineer', velocity: 32, reviews: 15, bugs: 0, satisfaction: 4.9 },
  { name: 'David Lee', role: 'DevOps Lead', velocity: 20, reviews: 25, bugs: 3, satisfaction: 4.2 },
  { name: 'Eve Martinez', role: 'Data Engineer', velocity: 26, reviews: 20, bugs: 1, satisfaction: 4.5 },
  { name: 'Frank Zhang', role: 'Full Stack Dev', velocity: 30, reviews: 12, bugs: 4, satisfaction: 4.1 },
  { name: 'Grace Kim', role: 'Frontend Lead', velocity: 22, reviews: 28, bugs: 1, satisfaction: 4.7 },
  { name: 'Henry Park', role: 'Backend Dev', velocity: 18, reviews: 14, bugs: 2, satisfaction: 4.3 },
];

const memberColumns = [
  { key: 'name', label: 'Name' },
  { key: 'role', label: 'Role' },
  { key: 'velocity', label: 'Velocity (pts)' },
  { key: 'reviews', label: 'Reviews' },
  { key: 'bugs', label: 'Bugs' },
  { key: 'satisfaction', label: 'Satisfaction', render: (v: any) => `${v}/5` },
  { key: 'status', label: 'Status', render: () => <StatusBadge status="Active" /> },
];

const TeamPerformance = () => (
  <CtoPageShell title="Team Performance" description="Individual and team engineering performance metrics">
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        {kpiData.map((kpi, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{kpi.label}</div>
                <div className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">{kpi.value}</div>
              </div>
              <kpi.icon className={`w-4 h-4 ${kpi.color}`} />
            </div>
            <div className="text-[11px] font-semibold text-slate-500 mt-3">{kpi.sub}</div>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-6">Velocity by Team Member</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={velocityByMember} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} width={90} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
                <Bar dataKey="velocity" fill="#3b82f6" radius={[0, 4, 4, 0]} name="Velocity" />
                <Bar dataKey="reviews" fill="#8b5cf6" radius={[0, 4, 4, 0]} name="Reviews" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-6">Team Skills Matrix</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={skillsMatrix}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="skill" tick={{ fontSize: 10, fill: '#64748b' }} />
                <PolarRadiusAxis angle={30} domain={[0, 5]} tick={false} axisLine={false} />
                <Radar name="Alice" dataKey="Alice" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.1} />
                <Radar name="Bob" dataKey="Bob" stroke="#10b981" fill="#10b981" fillOpacity={0.1} />
                <Radar name="Carol" dataKey="Carol" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.1} />
                <Radar name="David" dataKey="David" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.1} />
                <Radar name="Eve" dataKey="Eve" stroke="#ec4899" fill="#ec4899" fillOpacity={0.1} />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <DataTable columns={memberColumns} data={teamMembers} pageSize={8} searchable />
    </div>
  </CtoPageShell>
);

export default TeamPerformance;



