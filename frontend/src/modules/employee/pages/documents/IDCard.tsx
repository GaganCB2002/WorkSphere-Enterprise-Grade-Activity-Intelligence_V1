import React from 'react';
import { Filter, Download, RefreshCw, IdCard, User, Building, Hash, Calendar, Droplets } from 'lucide-react';
import { EmployeePageLayout } from '../../components/EmployeePageLayout';
import { GlassPanel } from '../../components/ui/GlassPanel';

const idCard = {
  employeeName: 'Gagan Chaudhary',
  employeeId: 'EMP-2026-001',
  department: 'Engineering',
  designation: 'Senior Software Engineer',
  bloodGroup: 'O+',
  issueDate: '2026-01-15',
  expiryDate: '2028-01-15',
};

export default function IDCard() {
  return (
    <EmployeePageLayout
      title="ID Card"
      description="Employee identification card details"
      breadcrumbs={['Employee', 'Documents', 'ID Card']}
      actions={
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition-colors"><Filter className="w-4 h-4" /></button>
          <button className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition-colors"><Download className="w-4 h-4" /></button>
          <button className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition-colors"><RefreshCw className="w-4 h-4" /></button>
        </div>
      }
    >
      <div className="max-w-lg mx-auto">
        <GlassPanel className="p-0 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold">WorkSphere</h2>
                <p className="text-[10px] text-blue-200 mt-0.5">Employee Identification Card</p>
              </div>
              <IdCard className="w-8 h-8 text-blue-200" />
            </div>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-xl font-bold text-white">
                {idCard.employeeName.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h3 className="text-base font-bold text-white">{idCard.employeeName}</h3>
                <p className="text-xs text-blue-200 mt-0.5">{idCard.designation}</p>
              </div>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Employee ID</p>
                <p className="text-sm font-bold text-slate-900 dark:text-white mt-1">{idCard.employeeId}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Department</p>
                <p className="text-sm font-bold text-slate-900 dark:text-white mt-1">{idCard.department}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Designation</p>
                <p className="text-sm font-bold text-slate-900 dark:text-white mt-1">{idCard.designation}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Blood Group</p>
                <p className="text-sm font-bold text-slate-900 dark:text-white mt-1">{idCard.bloodGroup}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Issue Date</p>
                <p className="text-sm font-bold text-slate-900 dark:text-white mt-1">{idCard.issueDate}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Expiry Date</p>
                <p className="text-sm font-bold text-slate-900 dark:text-white mt-1">{idCard.expiryDate}</p>
              </div>
            </div>
          </div>
        </GlassPanel>
      </div>
    </EmployeePageLayout>
  );
}
