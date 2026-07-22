import React, { useState, useContext } from 'react';
import { CalendarX, Check, X, Plus, User } from 'lucide-react';
import { useLeaves, useTeam } from '../data/hooks';
import { Modal } from '../components/Modal';
import { QaShellContext } from '../layout/QaShell';

export const LeaveManagement: React.FC = () => {
  const { leaves, addLeave, updateStatus } = useLeaves();
  const { allTeam } = useTeam();
  const { addToast } = useContext(QaShellContext);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({ employeeName: '', startDate: '', endDate: '', type: 'PTO' as const });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.employeeName || !formData.startDate || !formData.endDate) {
      addToast('Please fill in all required fields', 'error'); return;
    }
    addLeave({ employeeName: formData.employeeName, startDate: formData.startDate, endDate: formData.endDate, type: formData.type, status: 'Pending' });
    addToast('Leave request submitted', 'success');
    setShowAddModal(false);
    setFormData({ employeeName: '', startDate: '', endDate: '', type: 'PTO' });
  };

  const handleApprove = (id: string) => {
    updateStatus(id, 'Approved');
    addToast('Leave request approved', 'success');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Leave Management</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage QA team time off and ensure test coverage</p>
        </div>
        <button onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-xl text-sm font-bold shadow-md shadow-violet-600/20 transition-all active:scale-95">
          <Plus className="w-4 h-4" /> Request Leave
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Requests', value: leaves.length, color: 'text-violet-600', bg: 'bg-violet-50 dark:bg-violet-900/20' },
          { label: 'Approved', value: leaves.filter(l => l.status === 'Approved').length, color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
          { label: 'Pending', value: leaves.filter(l => l.status === 'Pending').length, color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-900/20' },
          { label: 'Days Off This Month', value: leaves.reduce((a, l) => { const s = new Date(l.startDate), e = new Date(l.endDate); return a + Math.max(1, Math.round((e.getTime() - s.getTime()) / 86400000) + 1); }, 0), color: 'text-purple-600', bg: 'bg-purple-50 dark:bg-purple-900/20' },
        ].map((s, i) => (
          <div key={i} className={`₹${s.bg} border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm`}>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500 mb-3">{s.label}</h3>
            <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Leave Requests</h2>
        </div>
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {leaves.length === 0 && (
            <div className="p-12 text-center text-sm text-slate-400">No leave requests found</div>
          )}
          {leaves.map(leave => (
            <div key={leave.id} className="p-4 lg:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
              <div className="flex items-center gap-4">
                <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-900/20">
                  <CalendarX className="w-5 h-5 text-rose-500" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">{leave.employeeName}</h4>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      leave.status === 'Approved' ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400' :
                      leave.status === 'Pending' ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400' :
                      'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                    }`}>{leave.status}</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {leave.startDate} → {leave.endDate} · {leave.type}
                  </p>
                </div>
              </div>
              {leave.status === 'Pending' && (
                <div className="flex gap-2">
                  <button onClick={() => handleApprove(leave.id)}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-600/20 transition-all flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5" /> Approve
                  </button>
                  <button onClick={() => { updateStatus(leave.id, 'Rejected'); addToast('Leave request rejected', 'info'); }}
                    className="px-4 py-2 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-xl text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center gap-1.5">
                    <X className="w-3.5 h-3.5" /> Decline
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <Modal open={showAddModal} onClose={() => setShowAddModal(false)} title="Request Leave">
        <form onSubmit={handleAdd} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">Employee *</label>
            <select value={formData.employeeName} onChange={e => setFormData(p => ({ ...p, employeeName: e.target.value }))}
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/30 text-slate-900 dark:text-slate-100 cursor-pointer">
              <option value="">Select team member</option>
              {allTeam.map(m => <option key={m.id} value={m.name}>{m.name}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">Start Date *</label>
              <input type="date" value={formData.startDate} onChange={e => setFormData(p => ({ ...p, startDate: e.target.value }))}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/30 text-slate-900 dark:text-slate-100" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">End Date *</label>
              <input type="date" value={formData.endDate} onChange={e => setFormData(p => ({ ...p, endDate: e.target.value }))}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/30 text-slate-900 dark:text-slate-100" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">Leave Type</label>
            <select value={formData.type} onChange={e => setFormData(p => ({ ...p, type: e.target.value as any }))}
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/30 text-slate-900 dark:text-slate-100 cursor-pointer">
              <option value="PTO">PTO (Paid Time Off)</option>
              <option value="Sick">Sick Leave</option>
              <option value="Personal">Personal Leave</option>
            </select>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setShowAddModal(false)}
              className="px-5 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">Cancel</button>
            <button type="submit"
              className="px-5 py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-xl text-sm font-bold shadow-md shadow-violet-600/20 transition-all active:scale-95">
              <Plus className="w-4 h-4 inline mr-1.5" /> Submit Request
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
