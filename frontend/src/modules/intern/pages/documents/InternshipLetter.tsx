import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FileText, Download, Eye, Calendar, Building2, Clock, User,
  CheckCircle2, AlertCircle, Printer, Share2, ArrowRight
} from 'lucide-react';
import InternPageShell from '../../InternPageShell';

const InternshipLetter: React.FC = () => {
  const [status] = useState<'Issued' | 'Acknowledged'>('Acknowledged');

  const letterDetails = {
    issueDate: '2026-05-28',
    appointmentDate: '2026-06-01',
    department: 'Engineering & Technology',
    reportingTo: 'Dr. Sarah Mitchell',
    duration: '3 months (Jun 2026 - Aug 2026)',
    workLocation: 'San Francisco, CA (Hybrid)',
    letterId: 'APPT-2026-0042',
    candidateName: 'John Doe',
  };

  const statusConfig = {
    Issued: { icon: AlertCircle, color: 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300' },
    Acknowledged: { icon: CheckCircle2, color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300' },
  };

  const StatusIcon = statusConfig[status].icon;

  return (
    <InternPageShell title="Internship Letter" description="Internship appointment letter">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden"
          >
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-10 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="w-5 h-5" />
                    <span className="text-sm font-medium opacity-80">Appointment Letter</span>
                  </div>
                  <h2 className="text-2xl font-bold">Internship Appointment</h2>
                  <p className="text-emerald-100 mt-1">{letterDetails.letterId}</p>
                </div>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${statusConfig[status].color}`}>
                  <StatusIcon className="w-4 h-4" />
                  {status}
                </span>
              </div>
            </div>
            <div className="p-8">
              <div className="text-center mb-8 pb-8 border-b border-slate-200 dark:border-slate-700">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Internship Appointment Letter</h3>
                <p className="text-slate-500 text-sm mt-1">Date: {letterDetails.issueDate}</p>
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed space-y-4">
                <p>Dear {letterDetails.candidateName},</p>
                <p>Following the acceptance of your internship offer, we are pleased to confirm your appointment as a Software Engineering Intern with our organization. This letter serves as your official appointment document.</p>
                <p>You will be working under the guidance of {letterDetails.reportingTo} and will be an integral part of the {letterDetails.department} team.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                {[
                  { label: 'Department', value: letterDetails.department, icon: Building2 },
                  { label: 'Reports To', value: letterDetails.reportingTo, icon: User },
                  { label: 'Appointment Date', value: letterDetails.appointmentDate, icon: Calendar },
                  { label: 'Issue Date', value: letterDetails.issueDate, icon: Calendar },
                  { label: 'Duration', value: letterDetails.duration, icon: Clock },
                  { label: 'Work Location', value: letterDetails.workLocation, icon: Building2 },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                      <item.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">{item.label}</p>
                      <p className="text-sm font-medium text-slate-900 dark:text-white">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
        <div className="lg:col-span-1 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6"
          >
            <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-4">Actions</h3>
            <div className="space-y-3">
              <button className="w-full px-4 py-2.5 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2">
                <Eye className="w-4 h-4" /> View Full Document
              </button>
              <button className="w-full px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-2">
                <Download className="w-4 h-4" /> Download PDF
              </button>
              <button className="w-full px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-2">
                <Printer className="w-4 h-4" /> Print
              </button>
              <button className="w-full px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-2">
                <Share2 className="w-4 h-4" /> Share
              </button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6"
          >
            <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-4">Quick Info</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Status</span>
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${statusConfig[status].color}`}>
                  <StatusIcon className="w-3 h-3" /> {status}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Mentor</span>
                <span className="text-slate-900 dark:text-white font-medium">{letterDetails.reportingTo}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Duration</span>
                <span className="text-slate-900 dark:text-white font-medium">3 months</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Location</span>
                <span className="text-slate-900 dark:text-white font-medium">Hybrid</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </InternPageShell>
  );
};

export default InternshipLetter;
