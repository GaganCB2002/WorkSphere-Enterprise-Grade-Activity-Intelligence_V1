import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code2, BookOpen, Shield, TestTube, GitBranch,
  ChevronDown, ChevronRight, CheckCircle2, AlertCircle, Info,
  FileCode, Brackets, Layers, Terminal, GitCommit
} from 'lucide-react';
import InternPageShell from '../../InternPageShell';

interface SectionData {
  id: string;
  title: string;
  icon: React.ReactNode;
  color: string;
  rules: { label: string; description: string; examples?: string[] }[];
}

const CodingStandards: React.FC = () => {
  const [expandedSection, setExpandedSection] = useState<string>('naming');
  const [expandedRules, setExpandedRules] = useState<Record<string, boolean>>({});

  const sections: SectionData[] = [
    {
      id: 'naming', title: 'Naming Conventions', color: 'text-blue-600 bg-blue-100 dark:bg-blue-500/10',
      icon: <Brackets className="w-5 h-5" />,
      rules: [
        { label: 'Classes & Components', description: 'Use PascalCase for class names and React components.', examples: ['class UserService', 'const UserProfile: React.FC', 'class DatabaseConnection'] },
        { label: 'Functions & Variables', description: 'Use camelCase for functions, methods, and variables.', examples: ['getUserData()', 'const userCount', 'fetchUserDetails()'] },
        { label: 'Constants', description: 'Use UPPER_SNAKE_CASE for constants and enum values.', examples: ['MAX_RETRY_COUNT', 'API_BASE_URL', 'Status.ACTIVE'] },
        { label: 'Files & Folders', description: 'Use kebab-case for file names and PascalCase for component files.', examples: ['user-service.ts', 'UserProfile.tsx', 'api-client.ts'] },
        { label: 'CSS Classes', description: 'Use kebab-case for CSS class names with BEM when applicable.', examples: ['.user-profile', '.card__title--active', '.btn-primary'] },
      ],
    },
    {
      id: 'structure', title: 'Code Structure', color: 'text-emerald-600 bg-emerald-100 dark:bg-emerald-500/10',
      icon: <Layers className="w-5 h-5" />,
      rules: [
        { label: 'File Organization', description: 'One component per file. Group related components in folders.', examples: ['components/UserProfile/', 'hooks/useAuth.ts', 'utils/validation.ts'] },
        { label: 'Import Order', description: 'External libraries first, then internal modules, then styles.', examples: ['react → lucide-react → ./components → ./styles'] },
        { label: 'Component Structure', description: 'Props interface/type first, then component, then styles.', examples: ['interface Props {} → const Comp: React.FC = () → export default Comp'] },
        { label: 'Directory Pattern', description: 'Feature-based folder structure with shared utilities.', examples: ['features/dashboard/', 'shared/components/', 'utils/helpers/'] },
      ],
    },
    {
      id: 'linting', title: 'Linting Rules', color: 'text-amber-600 bg-amber-100 dark:bg-amber-500/10',
      icon: <Terminal className="w-5 h-5" />,
      rules: [
        { label: 'ESLint Configuration', description: 'Use the project ESLint config. Do not disable rules inline without justification.', examples: ['eslint.config.js', '// eslint-disable-next-line @typescript-eslint/explicit-function-return-type'] },
        { label: 'Prettier Integration', description: 'Format on save. Maintain consistent styling across the codebase.', examples: ['trailingComma: "all"', 'semi: true', 'singleQuote: true', 'printWidth: 120'] },
        { label: 'No Unused Variables', description: 'Remove unused imports and variables. Use underscore prefix for intentionally unused params.', examples: ['_event', '_unusedParam'] },
      ],
    },
    {
      id: 'testing', title: 'Testing Standards', color: 'text-purple-600 bg-purple-100 dark:bg-purple-500/10',
      icon: <TestTube className="w-5 h-5" />,
      rules: [
        { label: 'Unit Tests', description: 'Aim for 80%+ coverage on business logic. Test behavior, not implementation.', examples: ['describe("UserService")', 'it("should return user by id")', 'expect(result).toEqual(expected)'] },
        { label: 'Component Tests', description: 'Test rendering, user interactions, and edge cases using React Testing Library.', examples: ['render(<UserProfile />)', 'fireEvent.click(button)', 'waitFor(() => screen.getByText("Success"))'] },
        { label: 'Integration Tests', description: 'Test critical user flows end-to-end with mocked API calls.', examples: ['user login → dashboard load → profile update'] },
        { label: 'Naming Convention', description: 'Use descriptive test names that explain the expected behavior.', examples: ['it("should show error when email is invalid")', 'it("should redirect unauthenticated user")'] },
      ],
    },
    {
      id: 'git', title: 'Git Conventions', color: 'text-rose-600 bg-rose-100 dark:bg-rose-500/10',
      icon: <GitCommit className="w-5 h-5" />,
      rules: [
        { label: 'Commit Messages', description: 'Use conventional commits: type(scope): description', examples: ['feat(auth): add login page', 'fix(api): handle 404 errors', 'refactor(utils): extract validation logic'] },
        { label: 'Branching Strategy', description: 'feature/ prefix for features, fix/ for bug fixes, chore/ for maintenance.', examples: ['feature/user-profile', 'fix/login-error', 'chore/update-deps'] },
        { label: 'Pull Requests', description: 'Keep PRs small and focused. Include description, screenshots, and testing steps.', examples: ['Closes #123', 'Screenshots attached', 'Test cases updated'] },
        { label: 'Code Review', description: 'Review within 24 hours. Focus on logic, security, and performance.', examples: ['Check for edge cases', 'Verify error handling', 'Review for security vulnerabilities'] },
      ],
    },
  ];

  const toggleRule = (ruleLabel: string) => {
    setExpandedRules(prev => ({ ...prev, [ruleLabel]: !prev[ruleLabel] }));
  };

  return (
    <InternPageShell title="Coding Standards" description="Development best practices and guidelines">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        {sections.map((section) => (
          <motion.button
            key={section.id}
            onClick={() => setExpandedSection(section.id)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-xl border shadow-sm text-left transition-all ${
              expandedSection === section.id
                ? 'border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-500/5 ring-2 ring-blue-500/20'
                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <div className={`w-10 h-10 rounded-lg ${section.color} flex items-center justify-center mb-3`}>
              {section.icon}
            </div>
            <p className="text-sm font-semibold text-slate-900 dark:text-white">{section.title}</p>
            <p className="text-xs text-slate-500 mt-1">{section.rules.length} standards</p>
          </motion.button>
        ))}
      </div>
      {sections.filter(s => s.id === expandedSection).map((section) => (
        <motion.div
          key={section.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg ${section.color} flex items-center justify-center`}>
              {section.icon}
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">{section.title}</h3>
              <p className="text-xs text-slate-500">{section.rules.length} guidelines</p>
            </div>
          </div>
          <div className="divide-y divide-slate-200 dark:divide-slate-700">
            {section.rules.map((rule) => {
              const isExpanded = expandedRules[rule.label] ?? false;
              return (
                <div key={rule.label} className="px-6 py-4">
                  <button
                    onClick={() => toggleRule(rule.label)}
                    className="flex items-start justify-between w-full text-left"
                  >
                    <div className="flex items-start gap-3 flex-1">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-slate-900 dark:text-white">{rule.label}</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">{rule.description}</p>
                      </div>
                    </div>
                    {isExpanded ? <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 ml-2" /> : <ChevronRight className="w-4 h-4 text-slate-400 shrink-0 ml-2" />}
                  </button>
                  <AnimatePresence>
                    {isExpanded && rule.examples && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-3 ml-7"
                      >
                        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-3 border border-slate-200 dark:border-slate-700">
                          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Examples</p>
                          <div className="space-y-1.5">
                            {rule.examples.map((ex, j) => (
                              <code key={j} className="block text-xs font-mono text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">{ex}</code>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </motion.div>
      ))}
    </InternPageShell>
  );
};

export default CodingStandards;
