import React, { useState } from 'react';
import InternPageShell from '../../InternPageShell';
import { motion } from 'framer-motion';
import { Search, Filter, Eye, Mail, Phone, MapPin, X } from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

interface Employee {
  id: string;
  name: string;
  department: string;
  designation: string;
  email: string;
  phone: string;
  location: string;
}

const employees: Employee[] = [
  { id: 'EMP001', name: 'Sarah Mitchell', department: 'Executive', designation: 'CEO', email: 'sarah.m@worksphere.com', phone: '+1 (555) 101-0001', location: 'New York, NY' },
  { id: 'EMP002', name: 'Michael Chen', department: 'Engineering', designation: 'CTO', email: 'michael.c@worksphere.com', phone: '+1 (555) 101-0002', location: 'San Francisco, CA' },
  { id: 'EMP003', name: 'Rachel Green', department: 'Engineering', designation: 'Engineering Manager', email: 'rachel.g@worksphere.com', phone: '+1 (555) 101-0003', location: 'San Francisco, CA' },
  { id: 'EMP004', name: 'Alice Johnson', department: 'Engineering', designation: 'Senior Developer', email: 'alice.j@worksphere.com', phone: '+1 (555) 101-0004', location: 'Austin, TX' },
  { id: 'EMP005', name: 'David Lee', department: 'Engineering', designation: 'Backend Developer', email: 'david.l@worksphere.com', phone: '+1 (555) 101-0005', location: 'Seattle, WA' },
  { id: 'EMP006', name: 'Karen White', department: 'Engineering', designation: 'Frontend Developer', email: 'karen.w@worksphere.com', phone: '+1 (555) 101-0006', location: 'New York, NY' },
  { id: 'EMP007', name: 'Eva Martinez', department: 'Engineering', designation: 'QA Engineer', email: 'eva.m@worksphere.com', phone: '+1 (555) 101-0007', location: 'Denver, CO' },
  { id: 'EMP008', name: 'Grace Kim', department: 'Engineering', designation: 'DevOps Engineer', email: 'grace.k@worksphere.com', phone: '+1 (555) 101-0008', location: 'Chicago, IL' },
  { id: 'EMP009', name: 'James Wilson', department: 'Product', designation: 'CPO', email: 'james.w@worksphere.com', phone: '+1 (555) 101-0009', location: 'San Francisco, CA' },
  { id: 'EMP010', name: 'Bob Smith', department: 'Product', designation: 'Product Manager', email: 'bob.s@worksphere.com', phone: '+1 (555) 101-0010', location: 'New York, NY' },
  { id: 'EMP011', name: 'Carol Davis', department: 'Design', designation: 'UX Designer', email: 'carol.d@worksphere.com', phone: '+1 (555) 101-0011', location: 'Los Angeles, CA' },
  { id: 'EMP012', name: 'Leo Anderson', department: 'Analytics', designation: 'Business Analyst', email: 'leo.a@worksphere.com', phone: '+1 (555) 101-0012', location: 'Chicago, IL' },
  { id: 'EMP013', name: 'Frank Wilson', department: 'Analytics', designation: 'Data Analyst', email: 'frank.w@worksphere.com', phone: '+1 (555) 101-0013', location: 'Austin, TX' },
  { id: 'EMP014', name: 'Patricia Brown', department: 'HR', designation: 'CHRO', email: 'patricia.b@worksphere.com', phone: '+1 (555) 101-0014', location: 'New York, NY' },
  { id: 'EMP015', name: 'Henry Brown', department: 'HR', designation: 'HR Coordinator', email: 'henry.b@worksphere.com', phone: '+1 (555) 101-0015', location: 'Denver, CO' },
  { id: 'EMP016', name: 'Jack Taylor', department: 'HR', designation: 'Intern Coordinator', email: 'jack.t@worksphere.com', phone: '+1 (555) 101-0016', location: 'San Francisco, CA' },
  { id: 'EMP017', name: 'Isabella Chen', department: 'Marketing', designation: 'Marketing Specialist', email: 'isabella.c@worksphere.com', phone: '+1 (555) 101-0017', location: 'Los Angeles, CA' },
  { id: 'EMP018', name: 'You (Intern)', department: 'Engineering', designation: 'Software Engineering Intern', email: 'intern@worksphere.com', phone: '+1 (555) 101-0018', location: 'San Francisco, CA' },
];

const departments = [...new Set(employees.map(e => e.department))];
const locations = [...new Set(employees.map(e => e.location))];

export default function Directory() {
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [locFilter, setLocFilter] = useState('All');
  const [preview, setPreview] = useState<Employee | null>(null);

  const filtered = employees.filter(e => {
    const q = search.toLowerCase();
    const matchesSearch = e.id.toLowerCase().includes(q) || e.name.toLowerCase().includes(q) ||
      e.designation.toLowerCase().includes(q) || e.email.toLowerCase().includes(q);
    return matchesSearch && (deptFilter === 'All' || e.department === deptFilter) && (locFilter === 'All' || e.location === locFilter);
  });

  return (
    <InternPageShell title="Employee Directory" description="Company employee directory">
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
        <motion.div variants={item} className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl p-4 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input type="text" value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search employees..."
                className="w-full pl-9 pr-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="w-4 h-4 text-slate-400" />
              <select value={deptFilter} onChange={e => setDeptFilter(e.target.value)}
                className="px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 focus:outline-none focus:border-blue-500">
                <option value="All">All Departments</option>
                {departments.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
              <select value={locFilter} onChange={e => setLocFilter(e.target.value)}
                className="px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 focus:outline-none focus:border-blue-500">
                <option value="All">All Locations</option>
                {locations.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
          </div>
        </motion.div>

        <motion.div variants={item} className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/40">
                  <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Employee ID</th>
                  <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Name</th>
                  <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Department</th>
                  <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Designation</th>
                  <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Email</th>
                  <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Phone</th>
                  <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Location</th>
                  <th className="text-center px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/40">
                {filtered.map((emp, i) => (
                  <motion.tr key={emp.id} variants={item} className="hover:bg-slate-50 dark:hover:bg-slate-700/20 transition-colors">
                    <td className="px-5 py-3.5 font-mono text-xs text-slate-500">{emp.id}</td>
                    <td className="px-5 py-3.5 font-medium text-slate-800 dark:text-slate-200">{emp.name}</td>
                    <td className="px-5 py-3.5 text-slate-500">{emp.department}</td>
                    <td className="px-5 py-3.5 text-slate-600 dark:text-slate-300">{emp.designation}</td>
                    <td className="px-5 py-3.5 text-slate-500 text-xs">{emp.email}</td>
                    <td className="px-5 py-3.5 text-slate-500 text-xs">{emp.phone}</td>
                    <td className="px-5 py-3.5 text-slate-500 text-xs"><MapPin className="w-3 h-3 inline mr-1" />{emp.location}</td>
                    <td className="px-5 py-3.5 text-center">
                      <button onClick={() => setPreview(emp)}
                        className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-blue-500 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-10 text-slate-400 text-sm">No employees match your criteria.</div>
          )}
        </motion.div>

        {/* Preview Modal */}
        {preview && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm" onClick={() => setPreview(null)}>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 w-full max-w-md mx-4 overflow-hidden"
              onClick={e => e.stopPropagation()}>
              <div className="p-5 border-b border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">Employee Profile</h3>
                <button onClick={() => setPreview(null)} className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="p-5 space-y-3">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-400 to-violet-500 flex items-center justify-center text-white text-lg font-bold">
                    {preview.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <div>
                    <p className="text-base font-bold text-slate-900 dark:text-white">{preview.name}</p>
                    <p className="text-sm text-slate-500">{preview.designation}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-2 text-sm">
                  <div className="flex items-center gap-2 text-slate-500"><Mail className="w-4 h-4 text-slate-400" />{preview.email}</div>
                  <div className="flex items-center gap-2 text-slate-500"><Phone className="w-4 h-4 text-slate-400" />{preview.phone}</div>
                  <div className="flex items-center gap-2 text-slate-500"><MapPin className="w-4 h-4 text-slate-400" />{preview.location}</div>
                </div>
                <div className="flex items-center gap-2 pt-2 text-xs text-slate-400">
                  <span className="px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-700/40">{preview.department}</span>
                  <span className="px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-700/40">{preview.id}</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </motion.div>
    </InternPageShell>
  );
}
