import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Award, Download, Eye, Calendar, Clock, CheckCircle2,
  AlertCircle, Loader2, Printer, Share2, FileText
} from 'lucide-react';
import InternPageShell from '../../InternPageShell';

const CompletionCertificate: React.FC = () => {
  const [status] = useState<'NotYetAvailable' | 'Generated' | 'Downloaded'>('Generated');

  const certDetails = {
    candidateName: 'John Doe',
    internshipRole: 'Software Engineering Intern',
    department: 'Engineering & Technology',
    duration: 'June 2026 - August 2026',
    completionDate: 'August 31, 2026',
    certificateId: 'CERT-2026-0042',
    issuedBy: 'HR & Engineering Department',
  };

  const statusConfig = {
    NotYetAvailable: { icon: AlertCircle, label: 'Not Yet Available', color: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400' },
    Generated: { icon: CheckCircle2, label: 'Generated', color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300' },
    Downloaded: { icon: Download, label: 'Downloaded', color: 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300' },
  };

  const StatusIcon = statusConfig[status].icon;

  return (
    <InternPageShell title="Completion Certificate" description="Internship completion certificate">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden"
          >
            <div className="bg-gradient-to-r from-amber-600 to-orange-600 px-8 py-10 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="w-5 h-5" />
                    <span className="text-sm font-medium opacity-80">Completion Certificate</span>
                  </div>
                  <h2 className="text-2xl font-bold">Certificate of Completion</h2>
                  <p className="text-amber-100 mt-1">{certDetails.certificateId}</p>
                </div>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${statusConfig[status].color}`}>
                  <StatusIcon className="w-4 h-4" />
                  {statusConfig[status].label}
                </span>
              </div>
            </div>
            <div className="p-8">
              {status === 'NotYetAvailable' ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-4">
                    <Loader2 className="w-10 h-10 text-slate-400 animate-spin" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Certificate Not Yet Available</h3>
                  <p className="text-sm text-slate-500 max-w-md mx-auto">Your completion certificate will be generated once your internship concludes and all deliverables have been reviewed by your mentor.</p>
                  <div className="flex items-center justify-center gap-2 mt-4 text-sm text-amber-600 dark:text-amber-400">
                    <Calendar className="w-4 h-4" />
                    Expected: August 31, 2026
                  </div>
                </div>
              ) : (
                <>
                  <div className="text-center mb-8 pb-8 border-b border-slate-200 dark:border-slate-700">
                    <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-500/10 flex items-center justify-center mx-auto mb-4">
                      <Award className="w-8 h-8 text-amber-600 dark:text-amber-400" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Certificate of Completion</h3>
                    <p className="text-slate-500 text-sm mt-1">This is to certify that</p>
                    <h4 className="text-2xl font-bold text-slate-900 dark:text-white mt-2">{certDetails.candidateName}</h4>
                    <p className="text-slate-500 text-sm mt-1">has successfully completed the internship as</p>
                    <p className="text-lg font-semibold text-slate-900 dark:text-white mt-1">{certDetails.internshipRole}</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { label: 'Department', value: certDetails.department, icon: FileText },
                      { label: 'Duration', value: certDetails.duration, icon: Clock },
                      { label: 'Completion Date', value: certDetails.completionDate, icon: Calendar },
                      { label: 'Issued By', value: certDetails.issuedBy, icon: Award },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                        <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-400">
                          <item.icon className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs text-slate-500">{item.label}</p>
                          <p className="text-sm font-medium text-slate-900 dark:text-white">{item.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
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
              {status !== 'NotYetAvailable' ? (
                <>
                  <button className="w-full px-4 py-2.5 bg-amber-600 text-white rounded-lg text-sm font-medium hover:bg-amber-700 transition-colors flex items-center justify-center gap-2">
                    <Eye className="w-4 h-4" /> View Certificate
                  </button>
                  <button className="w-full px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-2">
                    <Download className="w-4 h-4" /> Download PDF
                  </button>
                  <button className="w-full px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-2">
                    <Printer className="w-4 h-4" /> Print
                  </button>
                </>
              ) : (
                <div className="text-center py-4">
                  <Loader2 className="w-8 h-8 text-slate-400 animate-spin mx-auto mb-2" />
                  <p className="text-xs text-slate-500">Awaiting generation</p>
                </div>
              )}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6"
          >
            <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-4">Certificate Info</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Status</span>
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${statusConfig[status].color}`}>
                  <StatusIcon className="w-3 h-3" /> {statusConfig[status].label}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Certificate ID</span>
                <span className="text-slate-900 dark:text-white font-mono text-xs">{certDetails.certificateId}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Completion</span>
                <span className="text-slate-900 dark:text-white font-medium">{certDetails.completionDate}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </InternPageShell>
  );
};

export default CompletionCertificate;
