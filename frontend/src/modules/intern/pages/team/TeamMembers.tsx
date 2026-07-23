import React, { useState } from 'react';
import InternPageShell from '../../InternPageShell';
import { motion } from 'framer-motion';
import { Users, Mail, MapPin, Search, Filter } from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

interface TeamMember {
  id: number;
  name: string;
  role: string;
  department: string;
  email: string;
  avatar: string;
  online: boolean;
}

const teamMembers: TeamMember[] = [
  { id: 1, name: 'Alice Johnson', role: 'Senior Developer', department: 'Engineering', email: 'alice.j@worksphere.com', avatar: 'AJ', online: true },
  { id: 2, name: 'Bob Smith', role: 'Product Manager', department: 'Product', email: 'bob.s@worksphere.com', avatar: 'BS', online: true },
  { id: 3, name: 'Carol Davis', role: 'UX Designer', department: 'Design', email: 'carol.d@worksphere.com', avatar: 'CD', online: false },
  { id: 4, name: 'David Lee', role: 'Backend Developer', department: 'Engineering', email: 'david.l@worksphere.com', avatar: 'DL', online: true },
  { id: 5, name: 'Eva Martinez', role: 'QA Engineer', department: 'Engineering', email: 'eva.m@worksphere.com', avatar: 'EM', online: false },
  { id: 6, name: 'Frank Wilson', role: 'Data Analyst', department: 'Analytics', email: 'frank.w@worksphere.com', avatar: 'FW', online: true },
  { id: 7, name: 'Grace Kim', role: 'DevOps Engineer', department: 'Engineering', email: 'grace.k@worksphere.com', avatar: 'GK', online: true },
  { id: 8, name: 'Henry Brown', role: 'HR Coordinator', department: 'HR', email: 'henry.b@worksphere.com', avatar: 'HB', online: false },
  { id: 9, name: 'Isabella Chen', role: 'Marketing Specialist', department: 'Marketing', email: 'isabella.c@worksphere.com', avatar: 'IC', online: true },
  { id: 10, name: 'Jack Taylor', role: 'Intern Coordinator', department: 'HR', email: 'jack.t@worksphere.com', avatar: 'JT', online: false },
  { id: 11, name: 'Karen White', role: 'Frontend Developer', department: 'Engineering', email: 'karen.w@worksphere.com', avatar: 'KW', online: true },
  { id: 12, name: 'Leo Anderson', role: 'Business Analyst', department: 'Analytics', email: 'leo.a@worksphere.com', avatar: 'LA', online: false },
];

const departments = [...new Set(teamMembers.map(m => m.department))];

const avatarColors = [
  'from-blue-400 to-blue-600', 'from-emerald-400 to-emerald-600', 'from-violet-400 to-violet-600',
  'from-amber-400 to-amber-600', 'from-rose-400 to-rose-600', 'from-cyan-400 to-cyan-600',
  'from-pink-400 to-pink-600', 'from-indigo-400 to-indigo-600',
];

function Avatar({ initials, online }: { initials: string; online: boolean }) {
  const colorIndex = initials.charCodeAt(0) % avatarColors.length;
  return (
    <div className="relative flex-shrink-0">
      <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${avatarColors[colorIndex]} flex items-center justify-center text-white text-sm font-bold`}>
        {initials}
      </div>
      <span className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white dark:border-slate-800 ${online ? 'bg-emerald-500' : 'bg-slate-400'}`} />
    </div>
  );
}

export default function TeamMembers() {
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');

  const filtered = teamMembers.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.role.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase());
    const matchesDept = deptFilter === 'All' || m.department === deptFilter;
    return matchesSearch && matchesDept;
  });

  const onlineCount = teamMembers.filter(m => m.online).length;

  return (
    <InternPageShell title="Team Members" description="Your team members">
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
        <motion.div variants={item} className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl p-4 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text" value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search team members..."
                className="w-full pl-9 pr-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Filter className="w-4 h-4 text-slate-400" />
              <select
                value={deptFilter} onChange={e => setDeptFilter(e.target.value)}
                className="px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 focus:outline-none focus:border-blue-500"
              >
                <option value="All">All Departments</option>
                {departments.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
              <div className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 dark:bg-slate-700/40 rounded-lg text-xs font-semibold text-slate-500">
                <Users className="w-4 h-4" />
                <span>{onlineCount} online</span>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((member, i) => (
            <motion.div key={member.id} variants={item} className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3">
                <Avatar initials={member.avatar} online={member.online} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-100 truncate">{member.name}</p>
                  <p className="text-xs text-slate-500 truncate">{member.role}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{member.department}</p>
                  <div className="flex items-center gap-1 mt-2 text-xs text-slate-400 truncate">
                    <Mail className="w-3 h-3 flex-shrink-0" />
                    <span className="truncate">{member.email}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-slate-400 text-sm">No team members match your criteria.</div>
        )}
      </motion.div>
    </InternPageShell>
  );
}
