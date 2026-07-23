import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FileText, Download, Eye, Search, BookOpen,
  Code2, User, Clock, Tag, MoreHorizontal, ChevronRight
} from 'lucide-react';
import InternPageShell from '../../InternPageShell';

interface Doc {
  id: string;
  name: string;
  technology: string;
  type: 'Guide' | 'API' | 'Reference';
  author: string;
  lastUpdated: string;
  description: string;
  tags: string[];
}

const Documentation: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTech, setSelectedTech] = useState<string>('All');

  const docs: Doc[] = [
    { id: 'D001', name: 'React Component Best Practices', technology: 'React', type: 'Guide', author: 'Engineering Team', lastUpdated: '2026-07-15', description: 'Guidelines for building reusable React components', tags: ['react', 'components', 'best-practices'] },
    { id: 'D002', name: 'REST API Integration Guide', technology: 'API', type: 'Guide', author: 'Platform Team', lastUpdated: '2026-07-10', description: 'How to integrate with internal REST APIs', tags: ['api', 'rest', 'integration'] },
    { id: 'D003', name: 'TypeScript Utility Types', technology: 'TypeScript', type: 'Reference', author: 'Frontend Team', lastUpdated: '2026-07-08', description: 'Common utility types and patterns', tags: ['typescript', 'types', 'utilities'] },
    { id: 'D004', name: 'Authentication Service API', technology: 'API', type: 'API', author: 'Security Team', lastUpdated: '2026-07-05', description: 'Auth service endpoints and usage', tags: ['auth', 'api', 'security'] },
    { id: 'D005', name: 'Database Migration Guide', technology: 'Database', type: 'Guide', author: 'Backend Team', lastUpdated: '2026-06-28', description: 'How to create and run database migrations', tags: ['database', 'migrations', 'sql'] },
    { id: 'D006', name: 'Docker Development Setup', technology: 'DevOps', type: 'Guide', author: 'Infra Team', lastUpdated: '2026-06-20', description: 'Setting up local development with Docker', tags: ['docker', 'devops', 'setup'] },
    { id: 'D007', name: 'GraphQL Schema Reference', technology: 'GraphQL', type: 'Reference', author: 'API Team', lastUpdated: '2026-06-15', description: 'Complete GraphQL schema documentation', tags: ['graphql', 'schema', 'api'] },
    { id: 'D008', name: 'Python SDK Reference', technology: 'Python', type: 'Reference', author: 'SDK Team', lastUpdated: '2026-06-10', description: 'Python SDK class and method reference', tags: ['python', 'sdk', 'reference'] },
  ];

  const technologies = ['All', ...new Set(docs.map(d => d.technology))];

  const typeColors: Record<string, string> = {
    Guide: 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300',
    API: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300',
    Reference: 'bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-300',
  };

  const filteredDocs = docs.filter(d => {
    const matchesSearch = d.name.toLowerCase().includes(searchQuery.toLowerCase()) || d.description.toLowerCase().includes(searchQuery.toLowerCase()) || d.tags.some(t => t.includes(searchQuery.toLowerCase()));
    const matchesTech = selectedTech === 'All' || d.technology === selectedTech;
    return matchesSearch && matchesTech;
  });

  return (
    <InternPageShell title="Technical Documentation" description="Technical guides and references">
      <div className="flex flex-wrap items-center gap-2">
        {technologies.map(tech => (
          <button
            key={tech}
            onClick={() => setSelectedTech(tech)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              selectedTech === tech
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            {tech}
          </button>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
              <tr>
                {['Document Name', 'Technology', 'Type', 'Author', 'Last Updated', 'Actions'].map((header) => (
                  <th key={header} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {filteredDocs.map((doc, i) => (
                <motion.tr
                  key={doc.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center">
                        <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900 dark:text-white">{doc.name}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{doc.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded text-xs font-medium">
                      {doc.technology}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${typeColors[doc.type]}`}>
                      {doc.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-700 dark:text-slate-300">
                    <span className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      {doc.author}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-700 dark:text-slate-300">{doc.lastUpdated}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button className="px-2.5 py-1.5 bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 rounded-lg text-xs font-medium hover:bg-blue-100 dark:hover:bg-blue-500/20 transition-colors flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5" /> View
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
        {filteredDocs.length === 0 && (
          <div className="text-center py-12 text-slate-500 text-sm">No documents match your search criteria.</div>
        )}
      </motion.div>
    </InternPageShell>
  );
};

export default Documentation;
