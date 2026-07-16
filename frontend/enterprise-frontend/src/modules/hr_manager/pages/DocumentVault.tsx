import React from 'react';
import { FileText, Folder, Shield, Download, Lock, Search, Filter, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

export const DocumentVault: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="max-w-7xl mx-auto flex flex-col h-full space-y-6"
    >
      <div className="flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-200">Document Vault</h1>
          <p className="text-sm text-[#8b949e] mt-1">Secure repository for employee agreements, compliance policies, and HR forms.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm">
            <Plus className="w-4 h-4" />
            <span>Upload Document</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1 min-h-0">
        
        {/* Left Sidebar: Folders */}
        <div className="lg:col-span-1 bg-[#161b22] border border-[#30363d] rounded-2xl p-4 flex flex-col">
          <h3 className="text-xs font-bold text-[#8b949e] uppercase tracking-wider mb-4 px-2">Vault Directories</h3>
          <div className="space-y-1">
            {[
              { name: 'Corporate Policies', icon: Shield, active: true },
              { name: 'Offer Letters', icon: FileText, active: false },
              { name: 'NDAs & Agreements', icon: Lock, active: false },
              { name: 'Tax Forms', icon: Folder, active: false },
              { name: 'Training Materials', icon: Folder, active: false },
            ].map((folder, i) => (
              <button 
                key={i}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  folder.active ? 'bg-indigo-500/10 text-indigo-400' : 'text-slate-300 hover:bg-[#21262d]'
                }`}
              >
                <folder.icon className="w-4 h-4" />
                {folder.name}
              </button>
            ))}
          </div>
        </div>

        {/* Right Area: Document List */}
        <div className="lg:col-span-3 flex flex-col space-y-4">
          <div className="flex items-center justify-between bg-[#161b22] border border-[#30363d] p-3 rounded-xl shrink-0">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8b949e]" />
              <input 
                type="text" 
                placeholder="Search Corporate Policies..." 
                className="w-full bg-[#0E1117] border border-[#30363d] focus:border-indigo-500 rounded-lg py-1.5 pl-9 pr-4 text-sm text-slate-200 outline-none"
              />
            </div>
            <button className="p-2 text-[#8b949e] hover:text-slate-200 hover:bg-[#21262d] rounded-lg transition-colors">
              <Filter className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 bg-[#161b22] border border-[#30363d] rounded-2xl overflow-hidden flex flex-col">
            <div className="overflow-y-auto custom-scrollbar">
              <table className="w-full text-left">
                <thead className="bg-[#0E1117] border-b border-[#30363d] sticky top-0">
                  <tr>
                    <th className="py-3 px-6 text-xs font-bold text-[#8b949e] uppercase tracking-wider">Document Name</th>
                    <th className="py-3 px-6 text-xs font-bold text-[#8b949e] uppercase tracking-wider">Last Updated</th>
                    <th className="py-3 px-6 text-xs font-bold text-[#8b949e] uppercase tracking-wider">Access</th>
                    <th className="py-3 px-6 text-xs font-bold text-[#8b949e] uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#21262d]">
                  {[
                    { name: 'Employee Handbook v4.2.pdf', date: 'May 10, 2026', access: 'All Employees' },
                    { name: 'Remote Work Policy_2026.pdf', date: 'Apr 22, 2026', access: 'All Employees' },
                    { name: 'Executive Compensation Guidelines.pdf', date: 'Jan 15, 2026', access: 'HR & Execs Only' },
                    { name: 'Code of Conduct.pdf', date: 'Dec 01, 2025', access: 'All Employees' },
                    { name: 'Information Security Policy.pdf', date: 'Nov 18, 2025', access: 'All Employees' },
                  ].map((doc, i) => (
                    <tr key={i} className="hover:bg-[#21262d]/50 transition-colors group">
                      <td className="py-3 px-6">
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-indigo-400" />
                          <span className="text-sm font-semibold text-slate-200 group-hover:text-indigo-400 transition-colors cursor-pointer">{doc.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-6 text-xs text-[#8b949e]">{doc.date}</td>
                      <td className="py-3 px-6">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full border ${
                          doc.access === 'All Employees' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                        }`}>
                          {doc.access}
                        </span>
                      </td>
                      <td className="py-3 px-6 text-right">
                        <button className="p-1.5 text-[#8b949e] hover:text-indigo-400 hover:bg-indigo-500/10 rounded transition-colors opacity-0 group-hover:opacity-100">
                          <Download className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
};
