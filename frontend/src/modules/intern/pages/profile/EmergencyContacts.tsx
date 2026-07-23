import React, { useState } from 'react';
import InternPageShell from '../../InternPageShell';
import { motion } from 'framer-motion';
import { Plus, Pencil, Trash2, Phone, Mail, MapPin, User } from 'lucide-react';

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

interface Contact {
  id: number;
  name: string;
  relationship: string;
  phone: string;
  email: string;
  address: string;
}

const initialContacts: Contact[] = [
  { id: 1, name: 'Alexei Rostov', relationship: 'Father', phone: '+91 99887 76655', email: 'alexei.r@family.com', address: 'House No. 42, Gandhi Nagar, Mysore' },
  { id: 2, name: 'Irina Rostova', relationship: 'Mother', phone: '+91 88776 65544', email: 'irina.r@family.com', address: 'House No. 42, Gandhi Nagar, Mysore' },
  { id: 3, name: 'Dmitri Rostov', relationship: 'Brother', phone: '+91 77665 54433', email: 'dmitri.r@email.com', address: 'Pune, Maharashtra' },
];

export default function EmergencyContacts() {
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);

  const handleDelete = (id: number) => {
    setContacts(prev => prev.filter(c => c.id !== id));
  };

  const handleAdd = () => {
    const newId = Math.max(...contacts.map(c => c.id), 0) + 1;
    setContacts(prev => [...prev, {
      id: newId,
      name: 'New Contact',
      relationship: '--',
      phone: '--',
      email: '--',
      address: '--',
    }]);
  };

  return (
    <InternPageShell
      title="Emergency Contacts"
      description="Manage emergency contact information"
      breadcrumbs={[
        { label: 'Intern Dashboard', path: '/intern/dashboard' },
        { label: 'Profile' },
        { label: 'Emergency Contacts' },
      ]}
      actions={
        <button
          onClick={handleAdd}
          className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" /> Add Contact
        </button>
      }
    >
      <motion.div variants={container} initial="hidden" animate="show">
        <motion.div variants={item} className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/40 border-b border-slate-100 dark:border-slate-700/60">
                  <th className="text-left px-5 py-3.5 text-xs font-bold text-slate-400 uppercase tracking-wider">Name</th>
                  <th className="text-left px-5 py-3.5 text-xs font-bold text-slate-400 uppercase tracking-wider">Relationship</th>
                  <th className="text-left px-5 py-3.5 text-xs font-bold text-slate-400 uppercase tracking-wider">Phone</th>
                  <th className="text-left px-5 py-3.5 text-xs font-bold text-slate-400 uppercase tracking-wider">Email</th>
                  <th className="text-left px-5 py-3.5 text-xs font-bold text-slate-400 uppercase tracking-wider">Address</th>
                  <th className="text-right px-5 py-3.5 text-xs font-bold text-slate-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/40">
                {contacts.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/20 transition-colors group">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-full bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400">
                          <User className="w-3.5 h-3.5" />
                        </div>
                        <span className="font-semibold text-slate-800 dark:text-slate-200">{c.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-slate-500">{c.relationship}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                        <Phone className="w-3.5 h-3.5 text-slate-400" />
                        {c.phone}
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                        <Mail className="w-3.5 h-3.5 text-slate-400" />
                        {c.email}
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 max-w-[200px] truncate">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                        <span className="truncate">{c.address}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700/40 text-slate-400 hover:text-blue-600 transition-colors"
                          title="Edit contact"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(c.id)}
                          className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 text-slate-400 hover:text-red-600 transition-colors"
                          title="Delete contact"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {contacts.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-5 py-12 text-center text-sm text-slate-400">
                      No emergency contacts added yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </motion.div>
    </InternPageShell>
  );
}
