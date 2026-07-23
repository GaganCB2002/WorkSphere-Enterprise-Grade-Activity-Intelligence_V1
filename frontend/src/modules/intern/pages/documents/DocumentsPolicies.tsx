import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FileText, Download, Eye, Calendar, Search, Filter,
  Shield, BookOpen, FileSignature, MoreHorizontal, ChevronDown, ChevronUp, Info
} from 'lucide-react';
import InternPageShell from '../../InternPageShell';

interface DocPolicy {
  id: string;
  name: string;
  documentType: string;
  version: string;
  effectiveDate: string;
  summary: string;
  content: string;
}

const DocumentsPolicies: React.FC = () => {
  const [expandedPolicy, setExpandedPolicy] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const policies: DocPolicy[] = [
    {
      id: 'DP001', name: 'Document Retention Policy', documentType: 'Retention', version: 'v2.1', effectiveDate: '2026-01-01',
      summary: 'Guidelines for how long different document types must be retained before disposal.',
      content: 'All official company documents must be retained for a minimum of 7 years from the date of creation. Financial records must be retained for 10 years. Employee records must be retained for 5 years after employment ends. Document disposal must follow secure shredding protocols and maintain an audit trail of destruction.',
    },
    {
      id: 'DP002', name: 'Document Access Control', documentType: 'Access', version: 'v3.0', effectiveDate: '2026-02-01',
      summary: 'Defines access levels and permissions for different document categories.',
      content: 'Document access is tiered: Public (all employees), Internal (department-specific), Confidential (manager+), and Restricted (executive only). Access requests must be approved by the document owner. Quarterly access audits are mandatory. Violations must be reported within 24 hours.',
    },
    {
      id: 'DP003', name: 'Digital Signature Policy', documentType: 'Signatures', version: 'v1.5', effectiveDate: '2026-03-01',
      summary: 'Standards for using digital signatures on official documents.',
      content: 'All digital signatures must use the company-approved certificate authority. Documents requiring notarization are excluded from digital signature. Signed documents must be stored in the designated document management system with timestamp and certificate validation records.',
    },
    {
      id: 'DP004', name: 'Document Classification Guide', documentType: 'Classification', version: 'v2.0', effectiveDate: '2026-01-15',
      summary: 'How to classify documents based on sensitivity and importance.',
      content: 'Documents are classified into four tiers: Tier 1 (Public) - no sensitivity; Tier 2 (Internal) - company confidential; Tier 3 (Confidential) - sensitive business data; Tier 4 (Restricted) - legally protected or trade secret. Classification must be clearly marked on the document header and metadata.',
    },
    {
      id: 'DP005', name: 'Record Management Procedure', documentType: 'Management', version: 'v3.2', effectiveDate: '2026-04-01',
      summary: 'End-to-end procedure for managing company records throughout their lifecycle.',
      content: 'Records management follows the CREATE-STORE-MAINTAIN-DISPOSE lifecycle. All records must be registered in the document management system within 24 hours of creation. Annual record inventories must be conducted. Disposal requires dual authorization from department head and records manager.',
    },
  ];

  const typeColors: Record<string, string> = {
    Retention: 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300',
    Access: 'bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-300',
    Signatures: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300',
    Classification: 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300',
    Management: 'bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300',
  };

  const typeIcons: Record<string, React.ReactNode> = {
    Retention: <FileText className="w-3.5 h-3.5" />,
    Access: <Shield className="w-3.5 h-3.5" />,
    Signatures: <FileSignature className="w-3.5 h-3.5" />,
    Classification: <BookOpen className="w-3.5 h-3.5" />,
    Management: <Info className="w-3.5 h-3.5" />,
  };

  const filteredPolicies = policies.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.documentType.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <InternPageShell title="Document Policies" description="Policies related to document management">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
              <tr>
                {['Policy Name', 'Document Type', 'Version', 'Effective Date', 'Actions'].map((header) => (
                  <th key={header} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {filteredPolicies.map((policy, i) => (
                <motion.tr
                  key={policy.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                        <FileText className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900 dark:text-white">{policy.name}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{policy.summary}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${typeColors[policy.documentType] || 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'}`}>
                      {typeIcons[policy.documentType]} {policy.documentType}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-mono text-xs text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">{policy.version}</span>
                  </td>
                  <td className="px-4 py-3 text-slate-700 dark:text-slate-300">{policy.effectiveDate}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setExpandedPolicy(expandedPolicy === policy.id ? null : policy.id)}
                        className="px-2.5 py-1.5 bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 rounded-lg text-xs font-medium hover:bg-blue-100 dark:hover:bg-blue-500/20 transition-colors flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" /> {expandedPolicy === policy.id ? 'Hide' : 'View'}
                      </button>
                      <button className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors" title="Download">
                        <Download className="w-4 h-4 text-slate-500" />
                      </button>
                      <button className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                        <MoreHorizontal className="w-4 h-4 text-slate-400" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        {expandedPolicy && (() => {
          const policy = policies.find(p => p.id === expandedPolicy)!;
          return (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="border-t border-slate-200 dark:border-slate-700 p-6 bg-slate-50 dark:bg-slate-800/30"
            >
              <div className="flex items-center gap-2 mb-3">
                <Info className="w-4 h-4 text-blue-500" />
                <h4 className="text-sm font-semibold text-slate-900 dark:text-white">{policy.name}</h4>
                <span className="text-xs text-slate-400">- {policy.version}</span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{policy.content}</p>
              <div className="mt-4 flex items-center gap-4 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  Effective: {policy.effectiveDate}
                </span>
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${typeColors[policy.documentType]}`}>
                  {typeIcons[policy.documentType]} {policy.documentType}
                </span>
              </div>
            </motion.div>
          );
        })()}
        {filteredPolicies.length === 0 && (
          <div className="text-center py-12 text-slate-500 text-sm">No policies match your search criteria.</div>
        )}
      </motion.div>
    </InternPageShell>
  );
};

export default DocumentsPolicies;
