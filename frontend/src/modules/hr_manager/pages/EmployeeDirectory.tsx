import React, { useState } from 'react';
import { Search, Filter, MoreVertical, Shield, Briefcase, Mail, Phone, MapPin, UserX, Edit2 } from 'lucide-react';

const MOCK_EMPLOYEES = [
  { id: 'EMP-001', name: 'Sarah Connor', role: 'Senior Security Analyst', dept: 'Cybersecurity', status: 'Active', type: 'Full-time', location: 'New York, US' },
  { id: 'EMP-002', name: 'Marcus Wright', role: 'DevOps Lead', dept: 'Engineering', status: 'Active', type: 'Full-time', location: 'Remote, UK' },
  { id: 'EMP-003', name: 'Kyle Reese', role: 'Backend Engineer', dept: 'Engineering', status: 'On Leave', type: 'Contract', location: 'Austin, US' },
  { id: 'EMP-004', name: 'Miles Dyson', role: 'AI Architect', dept: 'R&D', status: 'Active', type: 'Full-time', location: 'San Francisco, US' },
  { id: 'EMP-005', name: 'John Connor', role: 'Product Manager', dept: 'Product', status: 'Suspended', type: 'Full-time', location: 'Remote, US' },
  { id: 'EMP-006', name: 'Kate Brewster', role: 'HR Executive', dept: 'Human Resources', status: 'Active', type: 'Full-time', location: 'New York, US' },
  { id: 'EMP-007', name: 'T-800', role: 'Automation QA', dept: 'Engineering', status: 'Terminated', type: 'Contract', location: 'Berlin, DE' },
];

export const EmployeeDirectory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20';
      case 'On Leave': return 'bg-amber-500/10 text-amber-400 border border-amber-500/20';
      case 'Suspended': return 'bg-rose-500/10 text-rose-400 border border-rose-500/20';
      case 'Terminated': return 'bg-slate-500/10 text-slate-400 border border-slate-500/20';
      default: return 'bg-slate-500/10 text-slate-400';
    }
  };

  return (
    <div className="max-w-7xl mx-auto flex flex-col h-full space-y-4">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#161b22] border border-[#30363d] p-4 rounded-2xl shrink-0">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-slate-200">Employee Directory</h1>
          <p className="text-xs text-[#8b949e] mt-0.5">Manage 1,248 active employees across 12 departments.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8b949e]" />
            <input 
              type="text" 
              placeholder="Search by name, ID, or role..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64 bg-[#0E1117] border border-[#30363d] focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-lg py-2 pl-9 pr-4 text-sm text-slate-900 dark:text-slate-200 placeholder:text-[#8b949e] outline-none transition-all"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#0E1117] border border-[#30363d] hover:bg-[#21262d] text-slate-900 dark:text-slate-200 rounded-lg text-sm font-semibold transition-colors">
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Data Grid */}
      <div className="flex-1 bg-[#161b22] border border-[#30363d] rounded-2xl overflow-hidden flex flex-col">
        <div className="overflow-x-auto flex-1 custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#0E1117] border-b border-[#30363d] sticky top-0 z-10">
              <tr>
                <th className="py-3 px-6 text-xs font-bold text-[#8b949e] uppercase tracking-wider">Employee</th>
                <th className="py-3 px-6 text-xs font-bold text-[#8b949e] uppercase tracking-wider">Role & Dept</th>
                <th className="py-3 px-6 text-xs font-bold text-[#8b949e] uppercase tracking-wider">Type</th>
                <th className="py-3 px-6 text-xs font-bold text-[#8b949e] uppercase tracking-wider">Location</th>
                <th className="py-3 px-6 text-xs font-bold text-[#8b949e] uppercase tracking-wider">Status</th>
                <th className="py-3 px-6 text-xs font-bold text-[#8b949e] uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#21262d]">
              {MOCK_EMPLOYEES.map((emp) => (
                <tr key={emp.id} className="hover:bg-[#21262d]/50 transition-colors group">
                  <td className="py-3 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-indigo-900/40 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold shrink-0">
                        {emp.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-900 dark:text-slate-200 group-hover:text-indigo-400 transition-colors cursor-pointer">{emp.name}</div>
                        <div className="text-xs font-mono text-[#8b949e]">{emp.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-6">
                    <div className="flex items-center gap-2 mb-0.5">
                      <Briefcase className="w-3.5 h-3.5 text-[#8b949e]" />
                      <span className="text-sm text-slate-300 font-medium">{emp.role}</span>
                    </div>
                    <div className="text-xs text-[#8b949e]">{emp.dept}</div>
                  </td>
                  <td className="py-3 px-6">
                    <span className="text-xs font-medium text-slate-300 bg-[#21262d] px-2.5 py-1 rounded-md border border-[#30363d]">
                      {emp.type}
                    </span>
                  </td>
                  <td className="py-3 px-6">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                      <MapPin className="w-3.5 h-3.5" />
                      {emp.location}
                    </div>
                  </td>
                  <td className="py-3 px-6">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${getStatusBadge(emp.status)}`}>
                      {emp.status}
                    </span>
                  </td>
                  <td className="py-3 px-6 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 text-[#8b949e] hover:text-indigo-400 hover:bg-indigo-500/10 rounded transition-colors" title="Edit Profile">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-[#8b949e] hover:text-rose-400 hover:bg-rose-500/10 rounded transition-colors" title="Suspend/Terminate">
                        <UserX className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-[#8b949e] hover:text-slate-900 dark:text-slate-200 hover:bg-[#30363d] rounded transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Footer */}
        <div className="bg-[#0E1117] border-t border-[#30363d] p-4 flex items-center justify-between text-xs text-[#8b949e]">
          <div>Showing 1 to 7 of 1,248 entries</div>
          <div className="flex gap-1">
            <button className="px-3 py-1 border border-[#30363d] rounded hover:bg-[#21262d] disabled:opacity-50">Prev</button>
            <button className="px-3 py-1 bg-indigo-600 text-white rounded font-bold">1</button>
            <button className="px-3 py-1 border border-[#30363d] rounded hover:bg-[#21262d]">2</button>
            <button className="px-3 py-1 border border-[#30363d] rounded hover:bg-[#21262d]">3</button>
            <button className="px-3 py-1 border border-[#30363d] rounded hover:bg-[#21262d]">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};
