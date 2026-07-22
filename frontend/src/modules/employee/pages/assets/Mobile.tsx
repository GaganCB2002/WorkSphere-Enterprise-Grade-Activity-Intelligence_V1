import React, { useState, useMemo } from 'react';
import { Filter, Download, RefreshCw, Search, Smartphone, Cpu } from 'lucide-react';
import { EmployeePageLayout } from '../../components/EmployeePageLayout';
import { GlassPanel } from '../../components/ui/GlassPanel';
import { StatusBadge } from '../../components/ui/StatusBadge';

interface MobileInfo {
  id: string;
  model: string;
  imei: string;
  carrier: string;
  phoneNumber: string;
  assignedDate: string;
  condition: string;
}

const mobiles: MobileInfo[] = [
  { id: 'MOB-001', model: 'iPhone 15 Pro Max', imei: '356938123456789', carrier: 'Verizon', phoneNumber: '+1 (555) 123-4567', assignedDate: '2026-01-10', condition: 'Good' },
  { id: 'MOB-002', model: 'Samsung Galaxy S24 Ultra', imei: '358764328765432', carrier: 'AT&T', phoneNumber: '+1 (555) 234-5678', assignedDate: '2026-02-15', condition: 'Excellent' },
  { id: 'MOB-003', model: 'Google Pixel 9 Pro', imei: '352167549032165', carrier: 'T-Mobile', phoneNumber: '+1 (555) 345-6789', assignedDate: '2026-03-01', condition: 'New' },
  { id: 'MOB-004', model: 'iPhone 15 Pro', imei: '359874321098765', carrier: 'Verizon', phoneNumber: '+1 (555) 456-7890', assignedDate: '2026-04-10', condition: 'Good' },
  { id: 'MOB-005', model: 'Samsung Galaxy Z Fold 6', imei: '351298743650123', carrier: 'AT&T', phoneNumber: '+1 (555) 567-8901', assignedDate: '2026-05-20', condition: 'Good' },
  { id: 'MOB-006', model: 'OnePlus 12', imei: '354678901234567', carrier: 'T-Mobile', phoneNumber: '+1 (555) 678-9012', assignedDate: '2026-06-01', condition: 'Fair' },
  { id: 'MOB-007', model: 'iPhone 16 Pro', imei: '353216549876543', carrier: 'Verizon', phoneNumber: '+1 (555) 789-0123', assignedDate: '2026-07-01', condition: 'New' },
  { id: 'MOB-008', model: 'Samsung Galaxy A55', imei: '357891234567890', carrier: 'T-Mobile', phoneNumber: '+1 (555) 890-1234', assignedDate: '2026-06-15', condition: 'Good' },
];

export default function Mobile() {
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return mobiles.filter(m => m.model.toLowerCase().includes(q) || m.imei.includes(q) || m.phoneNumber.includes(q));
  }, [searchQuery]);

  return (
    <EmployeePageLayout
      title="Mobile"
      description="View details of your assigned mobile devices"
      breadcrumbs={['Employee', 'Assets', 'Mobile']}
      actions={
        <div className="flex items-center gap-2">
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
          <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search mobiles..." className="w-full text-xs bg-transparent text-slate-900 dark:text-white outline-none placeholder:text-slate-400" />
        </div>
      </GlassPanel>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(m => (
          <GlassPanel key={m.id} hover>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
                <Smartphone className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white truncate">{m.model}</h3>
                  <StatusBadge label={m.condition} variant={m.condition === 'New' || m.condition === 'Excellent' ? 'active' : m.condition === 'Good' ? 'working' : 'pending'} />
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-[11px]">
                  {[
                    { label: 'IMEI', value: m.imei },
                    { label: 'Carrier', value: m.carrier },
                    { label: 'Phone', value: m.phoneNumber },
                    { label: 'Assigned', value: m.assignedDate },
                  ].map(({ label, value }) => (
                    <div key={label} className="text-slate-500 dark:text-slate-400 flex gap-1">
                      <span className="text-slate-400">{label}:</span>
                      <span className="truncate font-mono">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </GlassPanel>
        ))}
      </div>
    </EmployeePageLayout>
  );
}
