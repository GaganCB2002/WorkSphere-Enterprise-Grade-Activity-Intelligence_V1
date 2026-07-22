import React, { useState, useMemo } from 'react';
import { Filter, Download, RefreshCw, Search, Plus } from 'lucide-react';
import { EmployeePageLayout } from '../../components/EmployeePageLayout';
import { GlassPanel } from '../../components/ui/GlassPanel';
import { StatusBadge } from '../../components/ui/StatusBadge';

interface AssetRequest {
  id: string;
  assetType: string;
  priority: string;
  reason: string;
  status: string;
  date: string;
}

const requests: AssetRequest[] = [
  { id: 'REQ-001', assetType: 'MacBook Pro 16"', priority: 'High', reason: 'Current laptop performance issues', status: 'Approved', date: '2026-07-01' },
  { id: 'REQ-002', assetType: 'Dell UltraSharp Monitor', priority: 'Medium', reason: 'Dual monitor setup needed', status: 'Pending', date: '2026-07-05' },
  { id: 'REQ-003', assetType: 'Noise Cancelling Headset', priority: 'Low', reason: 'Open office noise reduction', status: 'Pending', date: '2026-07-08' },
  { id: 'REQ-004', assetType: 'Standing Desk', priority: 'Medium', reason: 'Ergonomic improvement', status: 'Approved', date: '2026-06-20' },
  { id: 'REQ-005', assetType: 'Mechanical Keyboard', priority: 'Low', reason: 'Replace faulty keyboard', status: 'Rejected', date: '2026-06-15' },
  { id: 'REQ-006', assetType: 'External GPU Dock', priority: 'High', reason: 'Video rendering workload', status: 'Pending', date: '2026-07-12' },
  { id: 'REQ-007', assetType: 'Webcam 4K', priority: 'Medium', reason: 'Client meeting quality upgrade', status: 'Approved', date: '2026-06-28' },
  { id: 'REQ-008', assetType: 'iPad Pro', priority: 'Low', reason: 'On-site presentation needs', status: 'Pending', date: '2026-07-15' },
  { id: 'REQ-009', assetType: 'Laptop Stand', priority: 'High', reason: 'Neck strain prevention', status: 'Approved', date: '2026-07-02' },
  { id: 'REQ-010', assetType: 'Wireless Mouse', priority: 'Low', reason: 'Current mouse intermittently failing', status: 'Rejected', date: '2026-06-10' },
];

export default function AssetRequests() {
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return requests.filter(r => r.id.toLowerCase().includes(q) || r.assetType.toLowerCase().includes(q) || r.reason.toLowerCase().includes(q));
  }, [searchQuery]);

  return (
    <EmployeePageLayout
      title="Asset Requests"
      description="Track and manage your asset requisition requests"
      breadcrumbs={['Employee', 'Assets', 'Asset Requests']}
      actions={
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium shadow-sm transition-colors">
            <Plus className="w-4 h-4" />
            <span>Request New Asset</span>
          </button>
          {[{ icon: Filter }, { icon: Download }, { icon: RefreshCw }].map(({ icon: Icon }) => (
            <button key={Icon.name} className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition-colors">
              <Icon className="w-4 h-4" />
            </button>
          ))}
        </div>
      }
    >
      <GlassPanel className="p-4 flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/[0.04] rounded-xl flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400" />
          <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search requests..." className="w-full text-xs bg-transparent text-slate-900 dark:text-white outline-none placeholder:text-slate-400" />
        </div>
      </GlassPanel>
      <GlassPanel padding="none">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 dark:border-white/[0.06]">
                {['Request ID', 'Asset Type', 'Priority', 'Reason', 'Date', 'Status'].map(h => (
                  <th key={h} className="text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider px-5 py-3.5">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(r => (
                <tr key={r.id} className="border-b border-slate-100 dark:border-white/[0.04] hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="px-5 py-3.5 text-xs font-mono text-slate-500 dark:text-slate-400">{r.id}</td>
                  <td className="px-5 py-3.5 text-sm font-semibold text-slate-900 dark:text-white">{r.assetType}</td>
                  <td className="px-5 py-3.5"><span className={`text-xs font-bold px-2 py-0.5 rounded-full ${r.priority === 'High' ? 'text-rose-600 bg-rose-50 dark:text-rose-400 dark:bg-rose-500/10' : r.priority === 'Medium' ? 'text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-500/10' : 'text-slate-500 bg-slate-50 dark:text-slate-400 dark:bg-slate-800'}`}>{r.priority}</span></td>
                  <td className="px-5 py-3.5 text-xs text-slate-500 dark:text-slate-400 max-w-[200px] truncate">{r.reason}</td>
                  <td className="px-5 py-3.5 text-xs text-slate-500 dark:text-slate-400">{r.date}</td>
                  <td className="px-5 py-3.5"><StatusBadge label={r.status} variant={r.status === 'Approved' ? 'active' : r.status === 'Pending' ? 'pending' : 'leave'} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassPanel>
    </EmployeePageLayout>
  );
}
