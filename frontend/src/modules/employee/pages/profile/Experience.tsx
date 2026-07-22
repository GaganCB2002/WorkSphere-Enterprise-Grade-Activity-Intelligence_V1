import React, { useState, useMemo } from 'react';
import { EmployeePageLayout } from '../../components/EmployeePageLayout';
import { GlassPanel } from '../../components/ui/GlassPanel';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Briefcase, Clock, Filter, Download, RefreshCw, Search } from 'lucide-react';

const experiences = [
  { company: 'WorkSphere Technologies', role: 'Senior Software Engineer', from: 'Jan 2024', to: 'Present', description: 'Building enterprise workforce intelligence platform. Architected microservices and led a team of 5 developers.', location: 'Bangalore, India' },
  { company: 'TechCorp Solutions', role: 'Software Engineer III', from: 'Jun 2021', to: 'Dec 2023', description: 'Developed cloud-native SaaS products. Improved system performance by 40% through caching strategies.', location: 'Bangalore, India' },
  { company: 'DataFlow Systems', role: 'Software Engineer', from: 'Aug 2019', to: 'May 2021', description: 'Built real-time data processing pipelines. Worked on distributed systems and event-driven architecture.', location: 'Pune, India' },
  { company: 'StartupX', role: 'Junior Developer', from: 'Jan 2018', to: 'Jul 2019', description: 'Full-stack development of web applications using React and Node.js. Contributed to 3 product launches.', location: 'Noida, India' },
  { company: 'Freelance', role: 'Web Developer', from: 'Jun 2016', to: 'Dec 2017', description: 'Built websites and web apps for small businesses. Managed 10+ client projects simultaneously.', location: 'Remote' },
];

export default function Experience() {
  const [searchQuery, setSearchQuery] = useState('');
  const filtered = useMemo(() => experiences.filter(e =>
    e.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.description.toLowerCase().includes(searchQuery.toLowerCase())
  ), [searchQuery]);

  return (
    <EmployeePageLayout
      title="Experience"
      description="Previous employment and work history"
      breadcrumbs={[{ label: 'Employee', href: '/employee/dashboard' }, { label: 'Profile' }, { label: 'Experience' }]}
      searchPlaceholder="Search experience..."
      onSearch={setSearchQuery}
      actions={
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition-colors"><Filter className="w-4 h-4" /></button>
          <button className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition-colors"><Download className="w-4 h-4" /></button>
          <button className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition-colors"><RefreshCw className="w-4 h-4" /></button>
        </div>
      }
    >
      <GlassPanel className="p-6">
        <div className="relative">
          {filtered.map((e, i) => (
            <div key={i} className="relative flex gap-4 pb-7 last:pb-0">
              {i < filtered.length - 1 && <div className="absolute left-[19px] top-10 bottom-0 w-px bg-slate-200 dark:bg-slate-700" />}
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center flex-shrink-0 z-10"><Briefcase className="w-5 h-5" /></div>
              <div className="flex-1 min-w-0 pt-1">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{e.role}</h3>
                  <StatusBadge label={e.to === 'Present' ? 'Current' : 'Past'} variant={e.to === 'Present' ? 'active' : 'default'} />
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{e.company}</p>
                <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-1">
                  <Clock className="w-3 h-3" />
                  <span>{e.from} - {e.to}</span>
                  <span>•</span>
                  <span>{e.location}</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">{e.description}</p>
              </div>
            </div>
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
            <p className="text-sm text-slate-400">No experience records match your search</p>
          </div>
        )}
      </GlassPanel>
    </EmployeePageLayout>
  );
}
