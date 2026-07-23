import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Search, Filter, RefreshCw, Download, Plus, Calendar, ChevronRight, Home } from 'lucide-react';

interface CtoPageShellProps {
  title: string;
  description: string;
  children: React.ReactNode;
  breadcrumbs?: Array<{ label: string; path?: string }>;
  actions?: React.ReactNode;
}

const CtoPageShell: React.FC<CtoPageShellProps> = ({ title, description, children, breadcrumbs, actions }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  const handleExport = () => {
    console.log('Export triggered');
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const defaultBreadcrumbs = [
    { label: 'CTO Dashboard', path: '/cto/executive-overview' },
    { label: title },
  ];

  const crumbs = breadcrumbs || defaultBreadcrumbs;

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
        <Link to="/cto/executive-overview" className="hover:text-blue-500 transition-colors">
          <Home className="w-3.5 h-3.5" />
        </Link>
        {crumbs.map((crumb, i) => (
          <React.Fragment key={i}>
            <ChevronRight className="w-3 h-3" />
            {crumb.path ? (
              <Link to={crumb.path} className="hover:text-blue-500 transition-colors font-medium">
                {crumb.label}
              </Link>
            ) : (
              <span className="text-slate-900 dark:text-white font-medium">{crumb.label}</span>
            )}
          </React.Fragment>
        ))}
      </nav>

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">{title}</h1>
          <p className="text-sm text-slate-500 font-medium mt-1">{description}</p>
        </div>
        <div className="flex items-center gap-2">
          {actions}
          <button onClick={handleRefresh} className="px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center gap-2 shadow-sm">
            <RefreshCw className="w-4 h-4" /> Refresh
          </button>
          <button onClick={handleExport} className="px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center gap-2 shadow-sm">
            <Download className="w-4 h-4" /> Export
          </button>
        </div>
      </div>

      {/* Search & Filters Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 transition-colors">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search ${title.toLowerCase()}...`}
            className="w-full pl-9 pr-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="flex items-center gap-1 px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-600 dark:text-slate-300">
            <Calendar className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-medium">Last 30 days</span>
          </div>
          <button className="px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center gap-2">
            <Filter className="w-4 h-4" /> Filters
          </button>
        </div>
      </div>

      {/* Content */}
      {children}
    </div>
  );
};

export default CtoPageShell;
