import React from 'react';
import { Filter, Download, Plus, Search } from 'lucide-react';

export const CtoPlaceholder: React.FC<{ title: string }> = ({ title }) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">{title}</h1>
          <p className="text-sm text-slate-500 font-medium mt-1">Manage and monitor {title.toLowerCase()} configurations</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-200 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" /> Export
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold shadow-sm hover:bg-blue-700 transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" /> Create New
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between transition-colors duration-300">
        <div className="relative w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder={`Search ${title.toLowerCase()}...`}
            className="w-full pl-9 pr-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm bg-transparent dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-2">
            <Filter className="w-4 h-4" /> Filters
          </button>
        </div>
      </div>

      {/* Empty State / Table Skeleton */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden min-h-[400px] flex flex-col items-center justify-center text-center p-8 transition-colors duration-300">
        <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl flex items-center justify-center mb-4 transition-colors duration-300">
          <Search className="w-8 h-8 text-slate-300" />
        </div>
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">No {title.toLowerCase()} found</h3>
        <p className="text-sm text-slate-500 font-medium max-w-sm mt-2">
          You don't have any {title.toLowerCase()} data available in this environment. Create a new entry or adjust your filters.
        </p>
        <button className="mt-6 px-4 py-2 bg-slate-900 dark:bg-blue-600 text-white rounded-lg text-sm font-semibold shadow-sm hover:bg-slate-800 dark:hover:bg-blue-500 transition-colors">
          Get Started
        </button>
      </div>
    </div>
  );
};
