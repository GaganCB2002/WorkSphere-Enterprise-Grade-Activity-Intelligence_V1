import React, { useState } from 'react';
import InternPageShell from '../../InternPageShell';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronRight, User, Users, Target } from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

interface OrgNode {
  id: string;
  name: string;
  designation: string;
  isYou?: boolean;
  children?: OrgNode[];
}

const orgData: OrgNode[] = [
  {
    id: 'ceo',
    name: 'Sarah Mitchell',
    designation: 'Chief Executive Officer',
    children: [
      {
        id: 'cto',
        name: 'Michael Chen',
        designation: 'Chief Technology Officer',
        children: [
          {
            id: 'eng-mgr',
            name: 'Rachel Green',
            designation: 'Engineering Manager',
            children: [
              { id: 'senior-dev', name: 'Alice Johnson', designation: 'Senior Developer' },
              { id: 'backend-dev', name: 'David Lee', designation: 'Backend Developer' },
              { id: 'frontend-dev', name: 'Karen White', designation: 'Frontend Developer' },
              { id: 'qa', name: 'Eva Martinez', designation: 'QA Engineer' },
              { id: 'devops', name: 'Grace Kim', designation: 'DevOps Engineer' },
              { id: 'intern', name: 'You', designation: 'Software Engineering Intern', isYou: true },
            ],
          },
        ],
      },
      {
        id: 'cpo',
        name: 'James Wilson',
        designation: 'Chief Product Officer',
        children: [
          { id: 'pm', name: 'Bob Smith', designation: 'Product Manager' },
          { id: 'ux', name: 'Carol Davis', designation: 'UX Designer' },
          { id: 'ba', name: 'Leo Anderson', designation: 'Business Analyst' },
        ],
      },
      {
        id: 'chro',
        name: 'Patricia Brown',
        designation: 'Chief HR Officer',
        children: [
          { id: 'hr-coord', name: 'Henry Brown', designation: 'HR Coordinator' },
          { id: 'intern-coord', name: 'Jack Taylor', designation: 'Intern Coordinator' },
        ],
      },
    ],
  },
];

function OrgTreeNode({ node, depth = 0 }: { node: OrgNode; depth?: number }) {
  const [expanded, setExpanded] = useState(depth < 2);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="select-none">
      <div className="flex items-center">
        {depth > 0 && (
          <div className="flex items-center">
            {Array.from({ length: depth }).map((_, i) => (
              <div key={i} className="w-6 border-l-2 border-slate-200 dark:border-slate-700 h-8 mr-0" style={{ marginLeft: i === depth - 1 ? 0 : undefined }} />
            ))}
          </div>
        )}
        <div className="relative flex items-center">
          {depth > 0 && (
            <div className="absolute -left-6 top-1/2 w-6 border-t-2 border-slate-200 dark:border-slate-700" />
          )}
          {hasChildren && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="mr-1 p-0.5 rounded hover:bg-slate-100 dark:hover:bg-slate-700/40 transition-colors"
            >
              {expanded ? <ChevronDown className="w-3.5 h-3.5 text-slate-400" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
            </button>
          )}
          {!hasChildren && <div className="w-5" />}
          <div className={`flex items-center gap-2.5 px-3.5 py-2 rounded-lg border transition-colors ${
            node.isYou
              ? 'bg-blue-50 dark:bg-blue-500/10 border-blue-300 dark:border-blue-500/30 shadow-sm'
              : 'bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/60 hover:bg-slate-50 dark:hover:bg-slate-700/30'
          }`}>
            <div className={`p-1.5 rounded-lg ${node.isYou ? 'bg-blue-100 dark:bg-blue-500/20 text-blue-600' : 'bg-slate-100 dark:bg-slate-700/60 text-slate-500'}`}>
              {node.isYou ? <Target className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{node.name}</p>
              <p className="text-xs text-slate-400">{node.designation}</p>
            </div>
            {node.isYou && (
              <span className="ml-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400">YOU</span>
            )}
          </div>
        </div>
      </div>
      {hasChildren && expanded && (
        <div className="mt-1">
          {node.children!.map((child) => (
            <OrgTreeNode key={child.id} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function OrganizationChart() {
  return (
    <InternPageShell title="Organization Chart" description="Team hierarchy">
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
        <motion.div variants={item} className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl p-6 shadow-sm overflow-x-auto">
          <div className="min-w-[600px]">
            {orgData.map((root) => (
              <OrgTreeNode key={root.id} node={root} />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </InternPageShell>
  );
}
