import React from 'react';
import { Search, Filter, Download, RefreshCw, Activity } from 'lucide-react';
import Breadcrumbs from '../common/Breadcrumb/Breadcrumbs';

export default function PageHeader({
  title,
  description,
  quickActions,
  onSearch,
  onFilter,
  onExport,
  onRefresh,
  status = "Active"
}) {
  return (
    <div className="mb-6 space-y-4">
      {/* Breadcrumb is now part of the PageHeader */}
      <Breadcrumbs />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-primary">{title}</h1>
            {status && (
              <span className="px-2 py-0.5 text-[11px] font-medium rounded-full bg-brand-500/10 text-brand-500 border border-brand-500/20">
                {status}
              </span>
            )}
          </div>
          {description && <p className="text-sm text-secondary mt-1">{description}</p>}
        </div>

        <div className="flex items-center gap-2">
          {quickActions}
        </div>
      </div>

      {(onSearch || onFilter || onExport || onRefresh) && (
        <div className="flex flex-wrap items-center gap-3 p-3 bg-surface-elevated border border-subtle rounded-lg">
          {onSearch && (
            <div className="relative flex-1 min-w-[200px] max-w-md">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
              <input
                type="text"
                placeholder="Search..."
                onChange={(e) => onSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-sm bg-surface-hover border border-subtle rounded-md text-primary placeholder-secondary outline-none focus:border-brand-500 transition-colors"
              />
            </div>
          )}
          
          <div className="flex items-center gap-2 ml-auto">
            {onFilter && (
              <button onClick={onFilter} className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md bg-surface-hover border border-subtle text-secondary hover:text-primary transition-colors">
                <Filter className="w-4 h-4" />
                Filters
              </button>
            )}
            {onExport && (
              <button onClick={onExport} className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md bg-surface-hover border border-subtle text-secondary hover:text-primary transition-colors">
                <Download className="w-4 h-4" />
                Export
              </button>
            )}
            {onRefresh && (
              <button onClick={onRefresh} className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md bg-surface-hover border border-subtle text-secondary hover:text-primary transition-colors">
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
