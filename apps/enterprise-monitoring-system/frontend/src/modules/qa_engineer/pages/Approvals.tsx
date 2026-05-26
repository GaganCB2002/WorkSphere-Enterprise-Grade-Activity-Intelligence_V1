import React, { useContext } from 'react';
import { CheckSquare, ShieldCheck, XCircle, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { useApprovals } from '../data/hooks';
import { QaShellContext } from '../layout/QaShell';

export const Approvals: React.FC = () => {
  const { approvals, approve, reject } = useApprovals();
  const { addToast } = useContext(QaShellContext);

  const handleApprove = (id: string, title: string) => {
    approve(id);
    addToast(`${title} approved successfully`, 'success');
  };

  const handleReject = (id: string, title: string) => {
    reject(id);
    addToast(`${title} rejected`, 'info');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Approvals</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Sign-off on release candidates and staging deployments</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Pending', value: approvals.filter(a => a.status === 'Pending').length, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-900/20' },
          { label: 'Approved', value: approvals.filter(a => a.status === 'Approved').length, icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
          { label: 'Rejected', value: approvals.filter(a => a.status === 'Rejected').length, icon: XCircle, color: 'text-red-600', bg: 'bg-red-50 dark:bg-red-900/20' },
          { label: 'High Priority', value: approvals.filter(a => a.priority === 'High' && a.status === 'Pending').length, icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50 dark:bg-red-900/20' },
        ].map((s, i) => (
          <div key={i} className={`${s.bg} border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm`}>
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">{s.label}</h3>
              <s.icon className={`w-5 h-5 ${s.color}`} />
            </div>
            <p className="text-3xl font-bold text-slate-900 dark:text-slate-100">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        {approvals.map(approval => (
          <div key={approval.id} className={`bg-white dark:bg-slate-900 border rounded-2xl p-6 shadow-sm transition-all ${
            approval.status === 'Pending' ? 'border-amber-200 dark:border-amber-900/50 bg-amber-50/30 dark:bg-amber-900/5' :
            approval.status === 'Approved' ? 'border-slate-200 dark:border-slate-800' :
            'border-slate-200 dark:border-slate-800'
          }`}>
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl shrink-0 ${
                  approval.status === 'Pending' ? 'bg-amber-100 dark:bg-amber-900/30' :
                  approval.status === 'Approved' ? 'bg-emerald-100 dark:bg-emerald-900/30' :
                  'bg-red-100 dark:bg-red-900/30'
                }`}>
                  <ShieldCheck className={`w-6 h-6 ${
                    approval.status === 'Pending' ? 'text-amber-600 dark:text-amber-400' :
                    approval.status === 'Approved' ? 'text-emerald-600 dark:text-emerald-400' :
                    'text-red-600 dark:text-red-400'
                  }`} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">{approval.title}</h3>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      approval.status === 'Pending' ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400' :
                      approval.status === 'Approved' ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400' :
                      'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                    }`}>{approval.status}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      approval.priority === 'High' ? 'bg-red-50 dark:bg-red-900/20 text-red-600' :
                      approval.priority === 'Medium' ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-600' :
                      'bg-slate-100 dark:bg-slate-800 text-slate-500'
                    }`}>{approval.priority}</span>
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{approval.description}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-slate-400">
                    <span>Requested by: {approval.requestedBy}</span>
                    <span>{approval.date}</span>
                  </div>
                </div>
              </div>
              {approval.status === 'Pending' && (
                <div className="flex gap-3 shrink-0">
                  <button onClick={() => handleApprove(approval.id, approval.title)}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold shadow-md shadow-emerald-600/20 transition-all active:scale-95 flex items-center gap-2">
                    <CheckSquare className="w-4 h-4" /> Approve
                  </button>
                  <button onClick={() => handleReject(approval.id, approval.title)}
                    className="px-5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl text-sm font-bold transition-all flex items-center gap-2">
                    <XCircle className="w-4 h-4" /> Reject
                  </button>
                </div>
              )}
              {approval.status !== 'Pending' && (
                <div className="shrink-0">
                  <span className={`text-xs font-bold flex items-center gap-1 ${
                    approval.status === 'Approved' ? 'text-emerald-600' : 'text-red-600'
                  }`}>
                    {approval.status === 'Approved' ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                    {approval.status}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
