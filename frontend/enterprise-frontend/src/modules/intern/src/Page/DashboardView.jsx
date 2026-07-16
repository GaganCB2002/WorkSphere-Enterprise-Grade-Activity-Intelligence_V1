import React from 'react';

export default function DashboardView({ setCurrentTab, tasks }) {
  const completedTasksCount = tasks.filter(t => t.column === 'completed').length;

  return (
    <div className="flex-1 w-full h-full overflow-y-auto p-8 bg-background dark:bg-on-secondary-fixed">
      <div className="max-w-7xl mx-auto space-y-8">
{/* Page Header */}
<div>
<h2 className="font-headline text-3xl font-bold text-on-surface dark:text-surface-bright mb-1 tracking-tight">Intern Management</h2>
<p className="font-body text-sm text-on-surface-variant dark:text-secondary-fixed-dim">Overview and performance metrics for the current cycle.</p>
</div>
    {/* Metrics Row */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Card 1 */}
      <div className="bg-surface-container-low dark:bg-inverse-surface rounded-xl p-6 border border-outline-variant/10 shadow-soft">
        <div className="flex justify-between items-start mb-4">
          <div className="p-2 bg-primary/10 rounded-lg text-primary">
            <span className="material-symbols-outlined">trending_up</span>
          </div>
          <span className="text-xs font-label text-[#8c3c3c] bg-[#8c3c3c]/10 px-2 py-1 rounded-full">+4.2%</span>
        </div>
        <p className="text-on-surface-variant dark:text-secondary-fixed-dim text-sm font-label mb-1">Productivity Score</p>
        <h3 className="font-headline text-3xl font-semibold text-on-surface dark:text-surface-bright">92.4</h3>
      </div>
      {/* Card 2 */}
      <div className="bg-surface-container-low dark:bg-inverse-surface rounded-xl p-6 border border-outline-variant/10 shadow-soft">
        <div className="flex justify-between items-start mb-4">
          <div className="p-2 bg-secondary-container/10 rounded-lg text-on-surface-variant dark:text-secondary-fixed-dim">
            <span className="material-symbols-outlined">task_alt</span>
          </div>
          <span className="text-xs font-label text-on-surface-variant dark:text-secondary-fixed-dim">This week</span>
        </div>
        <p className="text-on-surface-variant dark:text-secondary-fixed-dim text-sm font-label mb-1">Completed Tasks</p>
        <h3 className="font-headline text-3xl font-semibold text-on-surface dark:text-surface-bright">128</h3>
      </div>
      {/* Card 3 */}
      <div className="bg-surface-container-low dark:bg-inverse-surface rounded-xl p-6 border border-outline-variant/10 shadow-soft">
        <div className="flex justify-between items-start mb-4">
          <div className="p-2 bg-primary-container/10 rounded-lg text-primary dark:text-primary-fixed">
            <span className="material-symbols-outlined">folder_open</span>
          </div>
          <span className="text-xs font-label text-on-surface-variant dark:text-secondary-fixed-dim">Active</span>
        </div>
        <p className="text-on-surface-variant dark:text-secondary-fixed-dim text-sm font-label mb-1">Active Projects</p>
        <h3 className="font-headline text-3xl font-semibold text-on-surface dark:text-surface-bright">14</h3>
      </div>
      {/* Card 4 */}
      <div className="bg-surface-container-low dark:bg-inverse-surface rounded-xl p-6 border border-outline-variant/10 shadow-soft">
        <div className="flex justify-between items-start mb-4">
          <div className="p-2 bg-tertiary/10 rounded-lg text-tertiary dark:text-tertiary-fixed-dim">
            <span className="material-symbols-outlined">how_to_reg</span>
          </div>
          <span className="text-xs font-label text-primary bg-primary/10 px-2 py-1 rounded-full">Optimal</span>
        </div>
        <p className="text-on-surface-variant dark:text-secondary-fixed-dim text-sm font-label mb-1">Attendance %</p>
        <h3 className="font-headline text-3xl font-semibold text-on-surface dark:text-surface-bright">98.5%</h3>
      </div>
    </div>
    {/* Charts Row */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Line Chart Placeholder */}
      <div className="lg:col-span-2 bg-surface-container-low dark:bg-inverse-surface rounded-xl p-6 border border-outline-variant/10 shadow-soft flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-headline text-xl font-semibold text-on-surface dark:text-surface-bright">Weekly Performance</h3>
          <button className="text-sm font-label text-on-surface-variant dark:text-secondary-fixed-dim hover:text-primary flex items-center gap-1">
            Last 30 Days <span className="material-symbols-outlined text-sm">expand_more</span>
          </button>
        </div>
        <div className="flex-1 rounded-xl border border-outline-variant/10 bg-surface-container-high dark:bg-[#1E1916] relative overflow-hidden min-h-[250px] flex items-end justify-around p-6 px-12">
          {/* Mockup Chart Columns */}
          <div className="w-12 h-[35%] bg-[#C2652A]/20 rounded-t-md relative flex flex-col justify-end"><div className="h-1.5 bg-[#C2652A] rounded-t-md"></div></div>
          <div className="w-12 h-[55%] bg-[#C2652A]/20 rounded-t-md relative flex flex-col justify-end"><div className="h-1.5 bg-[#C2652A] rounded-t-md"></div></div>
          <div className="w-12 h-[50%] bg-[#C2652A]/20 rounded-t-md relative flex flex-col justify-end"><div className="h-1.5 bg-[#C2652A] rounded-t-md"></div></div>
          <div className="w-12 h-[75%] bg-[#C2652A]/20 rounded-t-md relative flex flex-col justify-end"><div className="h-1.5 bg-[#C2652A] rounded-t-md"></div></div>
          <div className="w-12 h-[90%] bg-[#C2652A]/35 rounded-t-md relative flex flex-col justify-end"><div className="h-1.5 bg-[#C2652A] rounded-t-md"></div></div>
        </div>
      </div>
      {/* Radar Chart Placeholder */}
      <div className="bg-surface-container-low dark:bg-inverse-surface rounded-xl p-6 border border-outline-variant/10 shadow-soft flex flex-col">
        <h3 className="font-headline text-xl font-semibold text-on-surface dark:text-surface-bright mb-6">Team Collaboration</h3>
        <div className="flex-1 flex items-center justify-center relative min-h-[250px]">
          {/* Custom Pentagonal Radar Chart */}
          <div className="w-52 h-52 flex items-center justify-center relative">
            <svg className="absolute inset-0 w-full h-full text-[#C2652A]" viewBox="0 0 100 100">
              {/* Pentagon Grid lines */}
              <polygon points="50,10 88,38 74,82 26,82 12,38" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.15"></polygon>
              <polygon points="50,20 78.5,41 68,74 32,74 21.5,41" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.15"></polygon>
              <polygon points="50,30 69,44 62,66 38,66 31,44" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.15"></polygon>
              <polygon points="50,40 59.5,47 56,58 44,58 40.5,47" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.15"></polygon>

              {/* Spokes */}
              <line x1="50" y1="50" x2="50" y2="10" stroke="currentColor" strokeWidth="0.5" opacity="0.15"></line>
              <line x1="50" y1="50" x2="88" y2="38" stroke="currentColor" strokeWidth="0.5" opacity="0.15"></line>
              <line x1="50" y1="50" x2="74" y2="82" stroke="currentColor" strokeWidth="0.5" opacity="0.15"></line>
              <line x1="50" y1="50" x2="26" y2="82" stroke="currentColor" strokeWidth="0.5" opacity="0.15"></line>
              <line x1="50" y1="50" x2="12" y2="38" stroke="currentColor" strokeWidth="0.5" opacity="0.15"></line>

              {/* Data Area */}
              <polygon points="50,18 83,40 70,75 34,70 20,35" fill="url(#radarGradient)" stroke="currentColor" strokeWidth="1.5"></polygon>
              
              <defs>
                <radialGradient id="radarGradient" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#C2652A" stopOpacity="0.05"></stop>
                  <stop offset="100%" stopColor="#C2652A" stopOpacity="0.45"></stop>
                </radialGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </div>
    {/* Bottom Row Grids */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-12">
      {/* Recent Activities */}
      <div className="bg-surface-container-low dark:bg-inverse-surface rounded-xl p-6 border border-outline-variant/10 shadow-soft">
        <h3 className="font-headline text-xl font-semibold text-on-surface dark:text-surface-bright mb-6">Recent Activities</h3>
        <div className="space-y-6 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-outline-variant/10 before:to-transparent">
          <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-primary bg-surface-container-low dark:bg-inverse-surface shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 ml-[-9px] z-10"></div>
            <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] p-3 rounded-lg border border-outline-variant/5 bg-surface-container-high dark:bg-on-secondary-fixed/30 ml-4">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-label text-sm font-medium text-on-surface dark:text-surface-bright">Code Review</h4>
                <span className="text-xs text-on-surface-variant dark:text-secondary-fixed-dim">10m ago</span>
              </div>
              <p className="text-xs text-on-surface-variant dark:text-secondary-fixed-dim">Sarah approved PR #402</p>
            </div>
          </div>
          <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-outline-variant/30 bg-surface-container-low dark:bg-inverse-surface shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 ml-[-9px] z-10"></div>
            <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] p-3 rounded-lg border border-outline-variant/5 bg-transparent ml-4">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-label text-sm font-medium text-on-surface dark:text-surface-bright">Evaluation</h4>
                <span className="text-xs text-on-surface-variant dark:text-secondary-fixed-dim">2h ago</span>
              </div>
              <p className="text-xs text-on-surface-variant dark:text-secondary-fixed-dim">Mid-term feedback submitted</p>
            </div>
          </div>
        </div>
      </div>
      {/* Upcoming Deadlines */}
      <div className="bg-surface-container-low dark:bg-inverse-surface rounded-xl p-6 border border-outline-variant/10 shadow-soft">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-headline text-xl font-semibold text-on-surface dark:text-surface-bright">Upcoming Deadlines</h3>
          <button className="text-primary text-sm font-label hover:underline">View All</button>
        </div>
        <ul className="space-y-4">
          <li className="flex items-center gap-4 p-3 rounded-lg hover:bg-surface-container-high dark:hover:bg-on-secondary-fixed/50 transition-colors cursor-pointer border border-transparent hover:border-outline-variant/5">
            <div className="w-10 h-10 rounded bg-[#8c3c3c]/10 text-[#8c3c3c] flex flex-col items-center justify-center shrink-0">
              <span className="text-xs font-bold leading-none">24</span>
              <span className="text-[10px] uppercase tracking-wider">Oct</span>
            </div>
            <div>
              <h4 className="font-label text-sm font-medium text-on-surface dark:text-surface-bright">Q3 Presentation Draft</h4>
              <p className="text-xs text-on-surface-variant dark:text-secondary-fixed-dim">Design Team • High Priority</p>
            </div>
          </li>
          <li className="flex items-center gap-4 p-3 rounded-lg hover:bg-surface-container-high dark:hover:bg-on-secondary-fixed/50 transition-colors cursor-pointer border border-transparent hover:border-outline-variant/5">
            <div className="w-10 h-10 rounded bg-primary/10 text-primary flex flex-col items-center justify-center shrink-0">
              <span className="text-xs font-bold leading-none">26</span>
              <span className="text-[10px] uppercase tracking-wider">Oct</span>
            </div>
            <div>
              <h4 className="font-label text-sm font-medium text-on-surface dark:text-surface-bright">API Integration Sync</h4>
              <p className="text-xs text-on-surface-variant dark:text-secondary-fixed-dim">Engineering • Normal</p>
            </div>
          </li>
        </ul>
      </div>
      {/* AI Insights */}
      <div className="bg-gradient-to-br from-primary-container/20 to-surface-container-low dark:to-inverse-surface rounded-xl p-6 border border-primary/20 shadow-soft relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10 transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform duration-500">
          <span className="material-symbols-outlined text-8xl text-primary">smart_toy</span>
        </div>
        <div className="relative z-10 flex flex-col h-full">
          <div className="flex items-center gap-2 mb-4">
            <span className="material-symbols-outlined text-primary">auto_awesome</span>
            <h3 className="font-headline text-xl font-semibold text-primary dark:text-primary-fixed">AI Insights</h3>
          </div>
          <p className="text-sm font-body text-on-surface dark:text-surface-bright leading-relaxed flex-1">
            Based on the current sprint velocity, the engineering intern cohort is likely to finish their deliverables 2 days ahead of schedule. Consider allocating advanced stretch goals.
          </p>
          <button onClick={() => setCurrentTab('ai')} className="mt-6 w-full py-2.5 px-4 bg-primary text-on-primary rounded-lg font-label text-sm font-medium hover:bg-on-primary-fixed-variant transition-colors flex items-center justify-center gap-2 shadow-sm">
            Generate Stretch Goals
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
</div>
    </div>
  );
}
