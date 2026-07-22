import React from 'react';

export default function AttendanceView() {
  return (
    <div className="flex-1 w-full h-full overflow-y-auto p-8 lg:p-12 bg-background dark:bg-on-secondary-fixed">
      <div className="max-w-7xl mx-auto space-y-10">
{/* Header Section */}
<div className="flex justify-between items-end pb-4 border-b border-outline-variant/30">
<div>
<h2 className="font-headline text-4xl text-on-surface tracking-tight">Attendance & Time</h2>
<p className="font-body text-on-surface-variant mt-2 text-lg">Track your hours, view schedules, and manage your time effectively.</p>
</div>
<div className="text-right">
<p className="font-label text-sm text-on-surface-variant uppercase tracking-wider mb-1">Today</p>
<p className="font-headline text-2xl text-on-surface font-semibold" id="current-date">Oct 24, 2023</p>
</div>
</div>
{/* Bento Grid Layout */}
<div className="grid grid-cols-1 md:grid-cols-12 gap-8">
{/* Check-in Widget (Span 4) */}
<div className="col-span-1 md:col-span-4 glass-card rounded-2xl p-8 flex flex-col justify-between relative overflow-hidden group">
<div className="absolute -right-10 -top-10 w-40 h-40 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all duration-700"></div>
<div>
<div className="flex items-center gap-3 mb-6 text-on-surface-variant">
<span className="material-symbols-outlined">schedule</span>
<h3 className="font-label text-sm font-semibold tracking-wider uppercase">Current Status</h3>
</div>
<div className="flex items-baseline gap-2 mb-2">
<span className="w-3 h-3 rounded-full bg-[#8c3c3c] animate-pulse"></span>
<span className="font-body text-on-surface font-medium">Checked In</span>
</div>
<div className="mt-8 mb-10">
<p className="font-headline text-6xl text-primary font-bold tracking-tighter" id="live-timer">04:28</p>
<p className="font-body text-sm text-on-surface-variant mt-1 ml-1 tracking-widest uppercase">Hours Logged</p>
</div>
</div>
<div className="space-y-3">
<button className="w-full bg-primary hover:bg-[#a65421] text-white font-label font-semibold py-4 rounded-xl transition-colors shadow-sm flex justify-center items-center gap-2">
<span className="material-symbols-outlined text-sm">logout</span>
                                Check Out
                             </button>
<button className="w-full bg-transparent border border-outline-variant hover:border-primary/50 text-on-surface font-label py-3 rounded-xl transition-colors flex justify-center items-center gap-2">
<span className="material-symbols-outlined text-sm">coffee</span>
                                Take Break
                             </button>
</div>
</div>
{/* Work Hour Trends Chart (Span 8) */}
<div className="col-span-1 md:col-span-8 glass-card rounded-2xl p-8 flex flex-col">
<div className="flex justify-between items-center mb-8">
<div className="flex items-center gap-3 text-on-surface-variant">
<span className="material-symbols-outlined">show_chart</span>
<h3 className="font-label text-sm font-semibold tracking-wider uppercase">Work Hour Trends</h3>
</div>
<select className="bg-surface border border-outline-variant/50 text-sm font-label rounded-lg px-3 py-1.5 focus:ring-primary focus:border-primary text-on-surface-variant">
<option>This Week</option>
<option>Last Week</option>
<option>This Month</option>
</select>
</div>
<div className="flex-1 relative w-full min-h-[250px] flex items-end gap-4 px-2 pb-6 pt-4">
{/* Abstract Representation of a Line/Bar Chart for high-end feel */}
<div className="absolute bottom-6 left-0 w-full h-[1px] bg-outline-variant/30"></div>
<div className="absolute bottom-1/2 left-0 w-full h-[1px] border-b border-dashed border-outline-variant/30"></div>
<div className="absolute top-4 left-0 w-full h-[1px] border-b border-dashed border-outline-variant/30"></div>
{/* Columns */}
<div className="flex-1 flex flex-col items-center justify-end gap-2 group z-10">
<div className="w-full max-w-[40px] bg-primary-container/40 group-hover:bg-primary-container/60 rounded-t-lg transition-all duration-300" style={{height: '60%'}}></div>
<span className="font-label text-xs text-on-surface-variant">Mon</span>
</div>
<div className="flex-1 flex flex-col items-center justify-end gap-2 group z-10">
<div className="w-full max-w-[40px] bg-primary/80 group-hover:bg-primary rounded-t-lg transition-all duration-300 relative" style={{height: '85%'}}>
<div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface text-xs font-label py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">8.5h</div>
</div>
<span className="font-label text-xs text-on-surface font-semibold">Tue</span>
</div>
<div className="flex-1 flex flex-col items-center justify-end gap-2 group z-10">
<div className="w-full max-w-[40px] bg-primary-container/40 group-hover:bg-primary-container/60 rounded-t-lg transition-all duration-300" style={{height: '75%'}}></div>
<span className="font-label text-xs text-on-surface-variant">Wed</span>
</div>
<div className="flex-1 flex flex-col items-center justify-end gap-2 group z-10">
<div className="w-full max-w-[40px] bg-primary-container/40 group-hover:bg-primary-container/60 rounded-t-lg transition-all duration-300" style={{height: '90%'}}></div>
<span className="font-label text-xs text-on-surface-variant">Thu</span>
</div>
<div className="flex-1 flex flex-col items-center justify-end gap-2 group z-10">
<div className="w-full max-w-[40px] bg-surface-dim group-hover:bg-surface-variant rounded-t-lg transition-all duration-300" style={{height: '20%'}}></div>
<span className="font-label text-xs text-on-surface-variant">Fri</span>
</div>
</div>
</div>
</div>
</div>
</div>
  );
}
