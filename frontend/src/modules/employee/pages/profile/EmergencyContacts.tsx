import React, { useState, useMemo } from 'react';
import { EmployeePageLayout } from '../../components/EmployeePageLayout';
import { GlassPanel } from '../../components/ui/GlassPanel';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { PhoneCall, AlertTriangle, Filter, Download, RefreshCw, Search } from 'lucide-react';

const contacts = [
  { name: 'Suman Chaudhary', relationship: 'Spouse', phone: '+91 87654 32109', alternatePhone: '+91 76543 21098', address: '42, Oakwood Residency, Indiranagar, Bangalore' },
  { name: 'Rajesh Chaudhary', relationship: 'Father', phone: '+91 98765 01234', alternatePhone: '+91 87654 09876', address: '15, Green Park Colony, Sector 12, Noida' },
  { name: 'Neha Chaudhary', relationship: 'Sibling', phone: '+91 76543 21098', alternatePhone: '', address: '201, Lake View Apartments, Whitefield, Bangalore' },
  { name: 'Arun Verma', relationship: 'Friend', phone: '+91 998877 6655', alternatePhone: '+91 887766 5544', address: '7B, Silver Oak, Koramangala, Bangalore' },
];

export default function EmergencyContacts() {
  const [searchQuery, setSearchQuery] = useState('');
  const filtered = useMemo(() => contacts.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.relationship.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.phone.includes(searchQuery)
  ), [searchQuery]);

  return (
    <EmployeePageLayout
      title="Emergency Contacts"
      description="People to reach in case of an emergency"
      breadcrumbs={[{ label: 'Employee', href: '/employee/dashboard' }, { label: 'Profile' }, { label: 'Emergency Contacts' }]}
      searchPlaceholder="Search contacts..."
      onSearch={setSearchQuery}
      actions={
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition-colors"><Filter className="w-4 h-4" /></button>
          <button className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition-colors"><Download className="w-4 h-4" /></button>
          <button className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition-colors"><RefreshCw className="w-4 h-4" /></button>
        </div>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((c, i) => (
          <GlassPanel key={i} className="p-5">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center text-sm font-bold flex-shrink-0">{c.name.split(' ').map(n => n[0]).join('')}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{c.name}</h3>
                  <StatusBadge label={c.relationship} variant={c.relationship === 'Spouse' ? 'active' : c.relationship === 'Parent' ? 'admin' : 'working'} />
                </div>
                <div className="mt-2 space-y-1 text-xs">
                  <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400"><PhoneCall className="w-3.5 h-3.5" /><span>{c.phone}</span></div>
                  {c.alternatePhone && <div className="flex items-center gap-2 text-slate-400"><PhoneCall className="w-3.5 h-3.5" /><span>{c.alternatePhone} (Alt)</span></div>}
                  <div className="flex items-start gap-2 text-slate-400 mt-1"><AlertTriangle className="w-3.5 h-3.5 mt-0.5" /><span className="text-[10px]">{c.address}</span></div>
                </div>
              </div>
            </div>
          </GlassPanel>
        ))}
      </div>
      {filtered.length === 0 && (
        <GlassPanel className="p-6 text-center py-12">
          <Search className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
          <p className="text-sm text-slate-400">No emergency contacts match your search</p>
        </GlassPanel>
      )}
    </EmployeePageLayout>
  );
}
