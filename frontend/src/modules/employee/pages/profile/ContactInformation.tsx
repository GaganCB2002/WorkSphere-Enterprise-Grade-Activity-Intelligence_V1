import React, { useState, useMemo } from 'react';
import { EmployeePageLayout } from '../../components/EmployeePageLayout';
import { GlassPanel } from '../../components/ui/GlassPanel';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Phone, Mail, MapPin, Filter, Download, RefreshCw, Search } from 'lucide-react';

const contact = {
  email: 'gagan.chaudhary@worksphere.com',
  phone: '+91 98765 43210',
  emergencyContact: 'Suman Chaudhary (+91 87654 32109)',
  address: '42, Oakwood Residency, Indiranagar',
  city: 'Bangalore',
  pincode: '560038',
};

export default function ContactInformation() {
  const [searchQuery, setSearchQuery] = useState('');
  const filtered = useMemo(() =>
    Object.entries(contact).filter(([k, v]) =>
      k.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.toLowerCase().includes(searchQuery.toLowerCase())
    ), [searchQuery]);

  return (
    <EmployeePageLayout
      title="Contact Information"
      description="Your contact details and emergency numbers"
      breadcrumbs={[{ label: 'Employee', href: '/employee/dashboard' }, { label: 'Profile' }, { label: 'Contact Information' }]}
      searchPlaceholder="Search contact info..."
      onSearch={setSearchQuery}
      actions={
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition-colors"><Filter className="w-4 h-4" /></button>
          <button className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition-colors"><Download className="w-4 h-4" /></button>
          <button className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition-colors"><RefreshCw className="w-4 h-4" /></button>
        </div>
      }
    >
      <GlassPanel className="p-6">
        <div className="flex items-center gap-4 mb-5">
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center"><Phone className="w-6 h-6" /></div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Primary Contact</h3>
            <p className="text-xs text-slate-400">Verified and active</p>
          </div>
          <div className="ml-auto"><StatusBadge label="Verified" variant="active" /></div>
        </div>
        <div className="space-y-4 text-xs">
          {[
            { label: 'Email', value: contact.email, icon: Mail },
            { label: 'Phone', value: contact.phone, icon: Phone },
            { label: 'Emergency Contact', value: contact.emergencyContact, icon: Phone },
            { label: 'Address', value: contact.address, icon: MapPin },
            { label: 'City', value: contact.city, icon: MapPin },
            { label: 'Pincode', value: contact.pincode, icon: MapPin },
          ].filter(({ label, value }) => !searchQuery || label.toLowerCase().includes(searchQuery.toLowerCase()) || value.toLowerCase().includes(searchQuery.toLowerCase())).map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-white/[0.04]">
                <Icon className="w-4 h-4 text-slate-400" />
                <div>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">{item.label}</p>
                  <p className="text-sm font-medium text-slate-900 dark:text-white mt-0.5">{item.value}</p>
                </div>
              </div>
            );
          })}
        </div>
      </GlassPanel>
    </EmployeePageLayout>
  );
}
