import React, { useState } from 'react';
import { Filter, Download, RefreshCw, Search, FileText, DownloadCloud, User, Building, Calendar, Hash } from 'lucide-react';
import { EmployeePageLayout } from '../../components/EmployeePageLayout';
import { GlassPanel } from '../../components/ui/GlassPanel';
import { StatusBadge } from '../../components/ui/StatusBadge';

const letters = [
  { id: 1, employee: 'Gagan Chaudhary', designation: 'Senior Software Engineer', department: 'Engineering', issueDate: '2026-01-15', docId: 'APPT-2026-001', status: 'Active' },
  { id: 2, employee: 'Priya Patel', designation: 'Product Designer', department: 'Design', issueDate: '2026-02-01', docId: 'APPT-2026-002', status: 'Active' },
  { id: 3, employee: 'Rahul Verma', designation: 'DevOps Engineer', department: 'Engineering', issueDate: '2026-03-10', docId: 'APPT-2026-003', status: 'Active' },
  { id: 4, employee: 'Sneha Reddy', designation: 'Marketing Manager', department: 'Marketing', issueDate: '2026-04-05', docId: 'APPT-2026-004', status: 'Active' },
  { id: 5, employee: 'Amit Singh', designation: 'Backend Developer', department: 'Engineering', issueDate: '2026-05-12', docId: 'APPT-2026-005', status: 'Active' },
];

export default function AppointmentLetter() {
  return (
    <EmployeePageLayout
      title="Appointment Letter"
      description="Official appointment letters issued to employees"
      breadcrumbs={['Employee', 'Documents', 'Appointment Letter']}
      actions={
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition-colors"><Filter className="w-4 h-4" /></button>
          <button className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition-colors"><Download className="w-4 h-4" /></button>
          <button className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition-colors"><RefreshCw className="w-4 h-4" /></button>
        </div>
      }
    >
      <div className="grid grid-cols-1 gap-4">
        {letters.map(l => (
          <GlassPanel key={l.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">{l.employee}</h3>
                  <p className="text-[10px] text-slate-400 mt-0.5">Document ID: {l.docId}</p>
                </div>
              </div>
              <StatusBadge label={l.status} variant="active" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 pt-4 border-t border-slate-100 dark:border-white/[0.06]">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Designation</p>
                <p className="text-xs font-semibold text-slate-900 dark:text-white mt-1">{l.designation}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Department</p>
                <p className="text-xs font-semibold text-slate-900 dark:text-white mt-1">{l.department}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Issue Date</p>
                <p className="text-xs font-semibold text-slate-900 dark:text-white mt-1">{l.issueDate}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Document ID</p>
                <p className="text-xs font-semibold text-slate-900 dark:text-white mt-1">{l.docId}</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-white/[0.06] flex justify-end">
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-lg shadow-blue-500/25 transition-all">
                <Download className="w-3.5 h-3.5" />
                Download Letter
              </button>
            </div>
          </GlassPanel>
        ))}
      </div>
    </EmployeePageLayout>
  );
}
