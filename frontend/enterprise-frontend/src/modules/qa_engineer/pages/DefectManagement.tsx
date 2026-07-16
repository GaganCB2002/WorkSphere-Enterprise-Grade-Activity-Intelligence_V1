import React, { useState, useContext } from 'react';
import {
  Download, Bug, AlertTriangle, Timer, ListChecks,
  Filter, Search, ChevronDown, RefreshCw, CheckCircle2, Lock,
  Plus, X, UserCheck, ArrowRight
} from 'lucide-react';
import { useBugs, useTeam } from '../data/hooks';
import { Modal } from '../components/Modal';
import { QaShellContext } from '../layout/QaShell';
import type { Bug as BugType, Severity } from '../data/types';

export const DefectManagement: React.FC = () => {
  const {
    bugs, total, page, totalPages, setPage,
    statusFilter, setStatusFilter, severityFilter, setSeverityFilter,
    moduleFilter, setModuleFilter, searchQuery, setSearchQuery,
    addBug, updateBugStatus, assignBug, allBugs
  } = useBugs();
  const { allTeam } = useTeam();
  const { addToast } = useContext(QaShellContext);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState<string | null>(null);
  const [showDetailModal, setShowDetailModal] = useState<BugType | null>(null);

  const [formData, setFormData] = useState({ title: '', severity: 'MEDIUM' as Severity, module: 'Payment Core', assignee: 'Unassigned', description: '', reporter: 'Alex Mercer', environment: 'Staging' });

  const modules = [...new Set(allBugs.map(b => b.module))];

  const handleAddBug = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) { addToast('Please enter a bug title', 'error'); return; }
    addBug({
      title: formData.title, severity: formData.severity, module: formData.module,
      assignee: { name: formData.assignee, avatar: null }, status: 'Open',
      description: formData.description, reporter: formData.reporter, environment: formData.environment,
    });
    addToast('Defect logged successfully', 'success');
    setShowAddModal(false);
    setFormData({ title: '', severity: 'MEDIUM', module: 'Payment Core', assignee: 'Unassigned', description: '', reporter: 'Alex Mercer', environment: 'Staging' });
  };

  const handleAssign = (bugId: string, memberName: string) => {
    const member = allTeam.find(m => m.name === memberName);
    assignBug(bugId, { name: memberName, avatar: member?.avatar || null });
    addToast(`Bug assigned to ${memberName}`, 'success');
    setShowAssignModal(null);
  };

  const openBugs = allBugs.filter(b => b.status !== 'Closed').length;
  const criticalBugs = allBugs.filter(b => b.severity === 'CRITICAL' && b.status !== 'Closed').length;
  const avgTime = allBugs.filter(b => b.status !== 'Open').length > 0 ? '4.2' : '0';
  const pendingVerify = allBugs.filter(b => b.status === 'Resolved').length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="px-2.5 py-1 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-[10px] font-bold uppercase tracking-wider">
              {criticalBugs} Critical
            </div>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Defect Management</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Track, assign, and resolve system anomalies across all environments</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm">
            <Download className="w-4 h-4" /> Export
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-xl text-sm font-bold shadow-md shadow-violet-600/20 transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" /> Log New Defect
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Open Defects', value: openBugs, icon: ListChecks, color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-900/20', trend: '-12% from last week', up: true },
          { label: 'Critical Priority', value: criticalBugs, icon: AlertTriangle, color: 'text-red-600 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-900/20', trend: '+3 new today', up: false },
          { label: 'Avg Time to Resolve', value: `₹${avgTime}d`, icon: Timer, color: 'text-violet-600 dark:text-violet-400', bg: 'bg-violet-50 dark:bg-violet-900/20', trend: 'Improved by 0.5d', up: true },
          { label: 'Verification Pending', value: pendingVerify, icon: ListChecks, color: 'text-slate-600 dark:text-slate-400', bg: 'bg-slate-50 dark:bg-slate-800/50', trend: 'Awaiting QA sign-off', up: undefined },
        ].map((kpi, i) => (
          <div key={i} className={`₹${kpi.bg} border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm`}>
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400">{kpi.label}</h3>
              <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
            </div>
            <p className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-1">{kpi.value}</p>
            {kpi.trend && (
              <p className={`text-xs font-semibold flex items-center gap-1 ${kpi.up ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                <ArrowRight className={`w-3 h-3 ${kpi.up ? 'rotate-[-45deg]' : 'rotate-45'}`} />
                {kpi.trend}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-1.5">
              <Filter className="w-4 h-4 text-slate-400" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Filters</span>
            </div>

            <select value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1); }}
              className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-violet-500/30 cursor-pointer">
              <option value="All">Status: All</option>
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
              <option value="Closed">Closed</option>
            </select>

            <select value={severityFilter} onChange={e => { setSeverityFilter(e.target.value); setPage(1); }}
              className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-violet-500/30 cursor-pointer">
              <option value="All">Severity: All</option>
              <option value="CRITICAL">Critical</option>
              <option value="HIGH">High</option>
              <option value="MEDIUM">Medium</option>
              <option value="LOW">Low</option>
            </select>

            <select value={moduleFilter} onChange={e => { setModuleFilter(e.target.value); setPage(1); }}
              className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-violet-500/30 cursor-pointer">
              <option value="All">Module: All</option>
              {modules.map(m => <option key={m} value={m}>{m}</option>)}
            </select>

            <div className="relative w-56">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input type="text" value={searchQuery} onChange={e => { setSearchQuery(e.target.value); setPage(1); }}
                placeholder="Search assignee or title..."
                className="w-full pl-8 pr-3 py-1.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-violet-500/30 text-slate-900 dark:text-slate-100 placeholder-slate-400" />
            </div>
          </div>
          <button onClick={() => { setStatusFilter('All'); setSeverityFilter('All'); setModuleFilter('All'); setSearchQuery(''); setPage(1); }}
            className="text-xs font-bold text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 transition-colors">
            Clear All
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700 text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <th className="p-4 pl-6">Bug ID</th>
                <th className="p-4">Title</th>
                <th className="p-4">Status</th>
                <th className="p-4">Severity</th>
                <th className="p-4">Module</th>
                <th className="p-4">Assignee</th>
                <th className="p-4 w-24">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {bugs.map((bug) => (
                <tr key={bug.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group">
                  <td className="p-4 pl-6">
                    <button onClick={() => setShowDetailModal(bug)} className="text-xs font-bold text-violet-600 dark:text-violet-400 hover:underline">{bug.id}</button>
                  </td>
                  <td className="p-4">
                    <button onClick={() => setShowDetailModal(bug)} className={`text-sm font-semibold text-left ${bug.isClosed ? 'text-slate-400 dark:text-slate-500 line-through' : 'text-slate-900 dark:text-slate-100'} hover:text-violet-600 dark:hover:text-violet-400 transition-colors`}>
                      {bug.title}
                    </button>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1.5">
                      {bug.status === 'Open' && <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />}
                      {bug.status === 'In Progress' && <RefreshCw className="w-3.5 h-3.5 text-violet-500 animate-spin" style={{ animationDuration: '3s' }} />}
                      {bug.status === 'Resolved' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
                      {bug.status === 'Closed' && <Lock className="w-3.5 h-3.5 text-slate-400" />}
                      <select value={bug.status} onChange={e => { updateBugStatus(bug.id, e.target.value as BugType['status']); addToast(`₹${bug.id} status updated to ${e.target.value}`, 'info'); }}
                        className={`text-xs font-bold bg-transparent border-none focus:outline-none cursor-pointer ${
                          bug.status === 'Open' ? 'text-amber-600 dark:text-amber-400' :
                          bug.status === 'In Progress' ? 'text-violet-600 dark:text-violet-400' :
                          bug.status === 'Resolved' ? 'text-emerald-600 dark:text-emerald-400' :
                          'text-slate-500 dark:text-slate-400'
                        }`}>
                        <option value="Open">Open</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider ${
                      bug.severity === 'CRITICAL' ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400' :
                      bug.severity === 'HIGH' ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400' :
                      bug.severity === 'MEDIUM' ? 'bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400' :
                      'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                    }`}>{bug.severity}</span>
                  </td>
                  <td className="p-4">
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{bug.module}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => setShowAssignModal(bug.id)} className="flex items-center gap-2 group/assign">
                        {bug.assignee.avatar ? (
                          <img src={bug.assignee.avatar} alt={bug.assignee.name} className="w-6 h-6 rounded-full border border-slate-200 dark:border-slate-700" />
                        ) : (
                          <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 flex items-center justify-center text-[10px] font-bold">
                            {bug.assignee.name === 'Unassigned' ? '?' : bug.assignee.name.charAt(0)}
                          </div>
                        )}
                        <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 group-hover/assign:text-violet-600 dark:group-hover/assign:text-violet-400 transition-colors">
                          {bug.assignee.name}
                        </span>
                      </button>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => setShowAssignModal(bug.id)} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors" title="Assign">
                        <UserCheck className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {bugs.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-12 text-center">
                    <Bug className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                    <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">No defects match your filters</p>
                    <button onClick={() => { setStatusFilter('All'); setSeverityFilter('All'); setModuleFilter('All'); setSearchQuery(''); }}
                      className="mt-2 text-xs font-bold text-violet-600 dark:text-violet-400 hover:underline">Clear all filters</button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            Showing {(page - 1) * 5 + 1}-{Math.min(page * 5, total)} of {total} defects
          </span>
          <div className="flex items-center gap-1">
            <button disabled={page === 1} onClick={() => setPage(page - 1)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${page === 1 ? 'text-slate-300 dark:text-slate-600 cursor-not-allowed' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700'}`}>
              Prev
            </button>
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              const pageNum = i + 1;
              return (
                <button key={pageNum} onClick={() => setPage(pageNum)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${page === pageNum ? 'bg-violet-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700'}`}>
                  {pageNum}
                </button>
              );
            })}
            <button disabled={page === totalPages} onClick={() => setPage(page + 1)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${page === totalPages ? 'text-slate-300 dark:text-slate-600 cursor-not-allowed' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700'}`}>
              Next
            </button>
          </div>
        </div>
      </div>

      <Modal open={showAddModal} onClose={() => setShowAddModal(false)} title="Log New Defect">
        <form onSubmit={handleAddBug} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">Title *</label>
            <input type="text" value={formData.title} onChange={e => setFormData(p => ({ ...p, title: e.target.value }))}
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/30 text-slate-900 dark:text-slate-100 placeholder-slate-400"
              placeholder="Brief description of the defect" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">Severity</label>
              <select value={formData.severity} onChange={e => setFormData(p => ({ ...p, severity: e.target.value as Severity }))}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/30 text-slate-900 dark:text-slate-100 cursor-pointer">
                <option value="CRITICAL">CRITICAL</option>
                <option value="HIGH">HIGH</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="LOW">LOW</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">Module</label>
              <select value={formData.module} onChange={e => setFormData(p => ({ ...p, module: e.target.value }))}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/30 text-slate-900 dark:text-slate-100 cursor-pointer">
                {modules.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">Environment</label>
              <select value={formData.environment} onChange={e => setFormData(p => ({ ...p, environment: e.target.value }))}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/30 text-slate-900 dark:text-slate-100 cursor-pointer">
                <option value="Production">Production</option>
                <option value="Staging">Staging</option>
                <option value="Development">Development</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">Assignee</label>
              <select value={formData.assignee} onChange={e => setFormData(p => ({ ...p, assignee: e.target.value }))}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/30 text-slate-900 dark:text-slate-100 cursor-pointer">
                <option value="Unassigned">Unassigned</option>
                {allTeam.map(m => <option key={m.id} value={m.name}>{m.name}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">Description</label>
            <textarea value={formData.description} onChange={e => setFormData(p => ({ ...p, description: e.target.value }))} rows={3}
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/30 text-slate-900 dark:text-slate-100 placeholder-slate-400 resize-none"
              placeholder="Steps to reproduce, expected vs actual behavior..." />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setShowAddModal(false)}
              className="px-5 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              Cancel
            </button>
            <button type="submit"
              className="px-5 py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-xl text-sm font-bold shadow-md shadow-violet-600/20 transition-all active:scale-95">
              <Bug className="w-4 h-4 inline mr-1.5" /> Log Defect
            </button>
          </div>
        </form>
      </Modal>

      <Modal open={!!showAssignModal} onClose={() => setShowAssignModal(null)} title="Assign Defect">
        <div className="space-y-2">
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">Select an engineer to assign <strong className="text-slate-900 dark:text-slate-100">{showAssignModal}</strong>:</p>
          {allTeam.map(member => (
            <button key={member.id} onClick={() => handleAssign(showAssignModal!, member.name)}
              className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all text-left">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 text-white flex items-center justify-center text-xs font-bold shrink-0">
                {member.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-slate-100">{member.name}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{member.role} · {member.velocity}</p>
              </div>
              <div className={`ml-auto w-2 h-2 rounded-full ${member.status === 'Online' ? 'bg-emerald-500' : member.status === 'In Meeting' ? 'bg-amber-500' : 'bg-slate-400'}`} />
            </button>
          ))}
        </div>
      </Modal>

      <Modal open={!!showDetailModal} onClose={() => setShowDetailModal(null)} title={`Defect ${showDetailModal?.id || ''}`} maxWidth="max-w-xl">
        {showDetailModal && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 flex-wrap">
              <span className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider ${
                showDetailModal.severity === 'CRITICAL' ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400' :
                showDetailModal.severity === 'HIGH' ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400' :
                showDetailModal.severity === 'MEDIUM' ? 'bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400' :
                'bg-slate-100 dark:bg-slate-800 text-slate-500'
              }`}>{showDetailModal.severity}</span>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{showDetailModal.module}</span>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{showDetailModal.environment}</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">{showDetailModal.title}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">{showDetailModal.description}</p>
            <div className="grid grid-cols-2 gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
              <div><span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">Status</span><span className="text-sm font-bold text-slate-900 dark:text-slate-100">{showDetailModal.status}</span></div>
              <div><span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">Assignee</span><span className="text-sm font-bold text-slate-900 dark:text-slate-100">{showDetailModal.assignee.name}</span></div>
              <div><span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">Reporter</span><span className="text-sm font-bold text-slate-900 dark:text-slate-100">{showDetailModal.reporter}</span></div>
              <div><span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">Created</span><span className="text-sm font-bold text-slate-900 dark:text-slate-100">{new Date(showDetailModal.createdAt).toLocaleDateString()}</span></div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
