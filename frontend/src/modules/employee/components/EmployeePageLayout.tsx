import React from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Download, RefreshCw, ChevronRight } from 'lucide-react';

interface Breadcrumb {
  label: string;
  href?: string;
}

interface EmployeePageLayoutProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  breadcrumbs?: (string | Breadcrumb)[];
  actions?: React.ReactNode;
  searchPlaceholder?: string;
  onSearch?: (q: string) => void;
  status?: string;
}

export function EmployeePageLayout({ title, description, children, breadcrumbs, actions, searchPlaceholder, onSearch }: EmployeePageLayoutProps) {
  const [searchValue, setSearchValue] = React.useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchValue(val);
    onSearch?.(val);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col h-full bg-slate-50 dark:bg-slate-900/50"
    >
      <div className="px-6 py-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-white/[0.06] flex-shrink-0">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-3">
            {breadcrumbs.map((crumb, idx) => {
              const label = typeof crumb === 'string' ? crumb : crumb.label;
              const href = typeof crumb === 'string' ? undefined : crumb.href;
              return (
                <React.Fragment key={idx}>
                  {idx > 0 && <ChevronRight className="w-3 h-3 text-slate-400" />}
                  {href && idx < breadcrumbs.length - 1 ? (
                    <a href={href} className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
                      {label}
                    </a>
                  ) : (
                    <span className={idx === breadcrumbs.length - 1 ? "text-slate-900 dark:text-white" : ""}>
                      {label}
                    </span>
                  )}
                </React.Fragment>
              );
            })}
          </nav>
        )}

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">{title}</h1>
            {description && (
              <p className="text-sm text-slate-400 mt-1">{description}</p>
            )}
          </div>

          <div className="flex items-center gap-3">
            {onSearch && (
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchValue}
                  onChange={handleSearchChange}
                  placeholder={searchPlaceholder || 'Search...'}
                  className="pl-9 pr-4 py-2 w-full md:w-56 bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-sm focus:ring-2 focus:ring-brand-500 transition-all dark:text-white placeholder:text-slate-400"
                />
              </div>
            )}
            {actions}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6 scrollbar-thin">
        <div className="max-w-7xl mx-auto space-y-6">
          {children}
        </div>
      </div>
    </motion.div>
  );
}
