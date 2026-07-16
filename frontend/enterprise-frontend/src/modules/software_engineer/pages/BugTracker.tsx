import React, { useState } from 'react';
import { getLiveDate, getLiveTime } from '../../../utils/liveDataHelpers';

import { Bug, Search, Filter, AlertTriangle, AlertCircle, ArrowUpCircle, XCircle } from 'lucide-react';

const mockBugs = [
  { id: 'BUG-4011', title: 'Memory leak in real-time telemetry websocket', severity: 'CRITICAL', status: 'OPEN', assignee: 'alex-dev', created: getLiveTime(120) },
  { id: 'BUG-4008', title: 'Null pointer exception in task allocation engine', severity: 'HIGH', status: 'IN_PROGRESS', assignee: 'sarah-eng', created: getLiveTime(300) },
  { id: 'BUG-3992', title: 'Dark mode toggle flickers on Safari 16', severity: 'MEDIUM', status: 'OPEN', assignee: 'unassigned', created: getLiveTime(1440) },
  { id: 'BUG-3985', title: 'Pagination jumps to page 1 on filter update', severity: 'LOW', status: 'CLOSED', assignee: 'david-ops', created: getLiveTime(4320) },
  { id: 'BUG-3980', title: 'API rate limit exceeded during burst uploads', severity: 'HIGH', status: 'OPEN', assignee: 'alex-dev', created: getLiveTime(4320) },
];

export const BugTracker: React.FC = () => {
  const [search, setSearch] = useState('');

  return (
    <div className="max-w-6xl mx-auto space-y-6 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#21262d]">
        <div>
          <h1 className="text-2xl font-bold text-[#e6edf3]">Bug Tracker</h1>
          <p className="text-sm text-[#8b949e] mt-1">High-density issue tracking and resolution management.</p>
        </div>
        <button className="flex items-center gap-2 px-3 py-1.5 bg-[#f85149] hover:bg-[#ff6a63] text-white text-sm font-medium rounded-md transition-colors shadow-sm border border-[rgba(240,246,252,0.1)]">
          <Bug className="w-4 h-4" />
          <span>Report Bug</span>
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-[#0d1117] border border-[#30363d] rounded-md flex-1 focus-within:border-[#58a6ff] transition-colors">
          <Search className="w-4 h-4 text-[#8b949e]" />
          <input 
            type="text"
            placeholder="Search bugs by ID, title, or assignee..."
            className="bg-transparent border-none outline-none text-sm text-[#e6edf3] w-full placeholder-[#8b949e]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button className="flex items-center gap-2 px-3 py-1.5 bg-[#21262d] border border-[#30363d] text-[#e6edf3] hover:bg-[#30363d] text-sm font-medium rounded-md transition-colors">
          <Filter className="w-4 h-4 text-[#8b949e]" />
          Filters
        </button>
      </div>

      {/* Data Table */}
      <div className="flex-1 bg-[#0d1117] border border-[#30363d] rounded-xl overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#161b22] border-b border-[#30363d] text-[#8b949e] text-xs uppercase tracking-wider">
                <th className="px-4 py-3 font-semibold w-24">ID</th>
                <th className="px-4 py-3 font-semibold">Title</th>
                <th className="px-4 py-3 font-semibold w-32">Severity</th>
                <th className="px-4 py-3 font-semibold w-32">Status</th>
                <th className="px-4 py-3 font-semibold w-40">Assignee</th>
                <th className="px-4 py-3 font-semibold w-32">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#21262d]">
              {mockBugs.map((bug) => (
                <tr key={bug.id} className="hover:bg-[#161b22]/50 transition-colors cursor-pointer group">
                  <td className="px-4 py-3 text-sm font-mono text-[#8b949e] group-hover:text-[#58a6ff] transition-colors">
                    {bug.id}
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-[#e6edf3]">
                    {bug.title}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      {bug.severity === 'CRITICAL' && <XCircle className="w-4 h-4 text-[#f85149]" />}
                      {bug.severity === 'HIGH' && <AlertTriangle className="w-4 h-4 text-[#d29922]" />}
                      {bug.severity === 'MEDIUM' && <AlertCircle className="w-4 h-4 text-[#58a6ff]" />}
                      {bug.severity === 'LOW' && <ArrowUpCircle className="w-4 h-4 text-[#238636]" />}
                      <span className={`text-xs font-bold ${
                        bug.severity === 'CRITICAL' ? 'text-[#f85149]' :
                        bug.severity === 'HIGH' ? 'text-[#d29922]' :
                        bug.severity === 'MEDIUM' ? 'text-[#58a6ff]' :
                        'text-[#238636]'
                      }`}>
                        {bug.severity}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold border ${
                      bug.status === 'OPEN' ? 'bg-[#f85149]/10 text-[#f85149] border-[#f85149]/20' :
                      bug.status === 'IN_PROGRESS' ? 'bg-[#58a6ff]/10 text-[#58a6ff] border-[#58a6ff]/20' :
                      'bg-[#238636]/10 text-[#2ea043] border-[#238636]/20'
                    }`}>
                      {bug.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {bug.assignee !== 'unassigned' ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-blue-900 border border-blue-700 flex items-center justify-center text-[10px] font-bold text-blue-200">
                          {bug.assignee[0].toUpperCase()}
                        </div>
                        <span className="text-xs text-[#e6edf3]">{bug.assignee}</span>
                      </div>
                    ) : (
                      <span className="text-xs text-[#8b949e] italic">Unassigned</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-xs text-[#8b949e]">
                    {bug.created}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
