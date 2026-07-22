import React from 'react';

export default function TasksMobileView() {
  return (
    <div className="flex-1 w-full h-full">
      {/* Top Header Area */}
<header className="bg-surface/90 backdrop-blur-md sticky top-0 z-30 px-4 md:px-8 py-4 border-b border-outline-variant/30">
<div className="flex justify-between items-start mb-4">
<div>
<h1 className="font-headline text-2xl md:text-3xl font-bold text-on-surface">Development Sprint 4</h1>
<p className="font-body text-sm text-secondary mt-1">October 12 - October 26 • 4 active tasks</p>
</div>
<div className="flex items-center gap-2">
<button className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:bg-surface-container-high transition-colors">
<span className="material-symbols-outlined" data-icon="more_vert">more_vert</span>
</button>
</div>
</div>
{/* Search and Filter (Mobile Optimized) */}
<div className="flex gap-3 items-center">
<div className="relative flex-1">
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-xl" data-icon="search">search</span>
<input className="w-full pl-10 pr-4 py-2.5 bg-surface-container-low border border-outline-variant/50 rounded-lg text-sm font-body text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" placeholder="Search tasks..." type="text"/>
</div>
<button className="flex items-center justify-center px-4 py-2.5 bg-surface-container-low border border-outline-variant/50 rounded-lg text-on-surface hover:bg-surface-container transition-colors">
<span className="material-symbols-outlined text-xl" data-icon="filter_list">filter_list</span>
</button>
</div>
</header>
{/* Kanban Mobile Tabs */}
<div className="md:hidden sticky top-[132px] z-20 bg-surface/90 backdrop-blur-md border-b border-outline-variant/30">
<div className="flex overflow-x-auto no-scrollbar py-3 px-4 gap-6" id="kanbanTabs">
<button className="tab-btn font-label text-sm font-semibold text-primary whitespace-nowrap relative active-tab" data-target="todo">
                    To Do <span className="ml-1 bg-primary-container text-on-primary-container text-[10px] px-1.5 py-0.5 rounded-full">2</span>
<div className="absolute -bottom-3 left-0 w-full h-[2px] bg-primary rounded-t-full"></div>
</button>
<button className="tab-btn font-label text-sm font-medium text-secondary whitespace-nowrap relative" data-target="inprogress">
                    In Progress <span className="ml-1 bg-surface-container-high text-on-surface-variant text-[10px] px-1.5 py-0.5 rounded-full">1</span>
<div className="absolute -bottom-3 left-0 w-full h-[2px] bg-transparent rounded-t-full tab-indicator"></div>
</button>
<button className="tab-btn font-label text-sm font-medium text-secondary whitespace-nowrap relative" data-target="review">
                    Review <span className="ml-1 bg-surface-container-high text-on-surface-variant text-[10px] px-1.5 py-0.5 rounded-full">1</span>
<div className="absolute -bottom-3 left-0 w-full h-[2px] bg-transparent rounded-t-full tab-indicator"></div>
</button>
<button className="tab-btn font-label text-sm font-medium text-secondary whitespace-nowrap relative" data-target="completed">
                    Completed <span className="ml-1 bg-surface-container-high text-on-surface-variant text-[10px] px-1.5 py-0.5 rounded-full">0</span>
<div className="absolute -bottom-3 left-0 w-full h-[2px] bg-transparent rounded-t-full tab-indicator"></div>
</button>
</div>
</div>
{/* Task Content Area */}
<div className="flex-1 p-4 md:p-8 bg-surface-container-low/30 overflow-x-hidden">
{/* Mobile View: Tabbed Sections */}
<div className="md:hidden relative w-full overflow-hidden">
<div className="flex transition-transform duration-300 ease-in-out w-[400%]" id="tabContentContainer">
{/* To Do Column (Mobile) */}
<div className="w-1/4 px-1" id="col-todo">
<div className="flex flex-col gap-4">
{/* Task Card 1 */}
<div className="bg-surface-container-lowest border border-outline-variant/40 rounded-xl p-4 shadow-[0_2px_16px_rgba(58,48,42,0.04)] active:scale-[0.98] transition-transform">
<div className="flex justify-between items-start mb-3">
<span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-label font-bold tracking-wide uppercase bg-secondary-container text-on-secondary-container">Low Priority</span>
<button className="text-outline hover:text-on-surface"><span className="material-symbols-outlined text-lg" data-icon="more_horiz">more_horiz</span></button>
</div>
<h3 className="font-headline text-lg font-bold text-on-surface mb-1 leading-tight">Research competitor onboarding flows</h3>
<p className="font-body text-sm text-secondary line-clamp-2 mb-4">Analyze the first 5 minutes of user experience for top 3 competitors. Document drop-off points.</p>
<div className="flex justify-between items-center pt-3 border-t border-outline-variant/30">
<div className="flex items-center gap-1.5 text-secondary text-xs font-label">
<span className="material-symbols-outlined text-sm" data-icon="calendar_today">calendar_today</span>
<span>Oct 15</span>
</div>
<div className="w-7 h-7 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center text-xs font-bold border-2 border-surface-container-lowest">
                                        JS
                                    </div>
</div>
</div>
{/* Task Card 2 */}
<div className="bg-surface-container-lowest border border-outline-variant/40 rounded-xl p-4 shadow-[0_2px_16px_rgba(58,48,42,0.04)] active:scale-[0.98] transition-transform border-l-4 border-l-tertiary">
<div className="flex justify-between items-start mb-3">
<span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-label font-bold tracking-wide uppercase bg-tertiary-container text-on-tertiary-container">High Priority</span>
<button className="text-outline hover:text-on-surface"><span className="material-symbols-outlined text-lg" data-icon="more_horiz">more_horiz</span></button>
</div>
<h3 className="font-headline text-lg font-bold text-on-surface mb-1 leading-tight">Define API endpoints</h3>
<p className="font-body text-sm text-secondary line-clamp-2 mb-4">Draft Swagger documentation for the new user profile management endpoints.</p>
<div className="flex justify-between items-center pt-3 border-t border-outline-variant/30">
<div className="flex items-center gap-1.5 text-tertiary text-xs font-label font-medium">
<span className="material-symbols-outlined text-sm" data-icon="warning">warning</span>
<span>Tomorrow</span>
</div>
<img alt="Avatar" className="w-7 h-7 rounded-full border-2 border-surface-container-lowest object-cover" data-alt="A small circular avatar portrait of a professional woman with a warm smile, well-lit in a studio setting, used as a UI assignee indicator. Warm tone photography." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtymx3c2fmFfQCzjKO14KKZp5VJ7VZ9UFqVuxxdROCuV27dHPpfAC4RrVL7qNqHJKiy_pyFuRCEW_2Z_g2fgDqPKHoCeA2dHh2ZlItJXl1N_bRjvi7KurL1DVVTRjsihU8HK9OJ-LIzVDRo13P1VXAh7ScfSxd8J-WNqIjkktDghOG_fZ-RL4eTwpKR7hxZIaaK2VwBJ2vK55qwVZjd1_CFICHe6yZUa_eUhyBOErXxaqRME9vk3OLbh_DjanctH2wk7c9xSzU1Os"/>
</div>
</div>
</div>
</div>
{/* In Progress Column (Mobile) */}
<div className="w-1/4 px-1" id="col-inprogress">
<div className="flex flex-col gap-4">
{/* Task Card 3 */}
<div className="bg-surface-container-lowest border border-outline-variant/40 rounded-xl p-4 shadow-[0_2px_16px_rgba(58,48,42,0.04)] active:scale-[0.98] transition-transform">
<div className="flex justify-between items-start mb-3">
<span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-label font-bold tracking-wide uppercase bg-primary-container text-on-primary-container">Medium Priority</span>
<button className="text-outline hover:text-on-surface"><span className="material-symbols-outlined text-lg" data-icon="more_horiz">more_horiz</span></button>
</div>
<h3 className="font-headline text-lg font-bold text-on-surface mb-1 leading-tight">Design System Review</h3>
<p className="font-body text-sm text-secondary line-clamp-2 mb-4">Audit current Figma components against the new 'Sahara' brand guidelines.</p>
<div className="flex justify-between items-center pt-3 border-t border-outline-variant/30">
<div className="flex items-center gap-1.5 text-secondary text-xs font-label">
<span className="material-symbols-outlined text-sm" data-icon="calendar_today">calendar_today</span>
<span>Oct 18</span>
</div>
<div className="flex -space-x-2">
<img alt="Avatar" className="w-7 h-7 rounded-full border-2 border-surface-container-lowest object-cover" data-alt="A small circular avatar portrait of a professional woman with a warm smile, well-lit in a studio setting, used as a UI assignee indicator. Warm tone photography." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDwYPvfCZeBIo3K3Viy3rNj5Oq1xkD3I6w9Y8ixICw1HNuaiaBUnoRHkzM3OHSjssWYYr7j_3ugN3bbSwfv_o51KmmK7HBFD6nn7FaZmBx0DtBb3vnC8VwKMnMYBAZn5zRi8kDrv1SX-2KiXOgD0O44WE4P_oLeAoAF78fCxlzN8HZizfQRNTMNVyxWDoVH69efkhX5eyfGzC6vmP_cpeUS8K4IVD8z3KZkSRAOY35hZSfbuYGHliimVwb06wCOrVSNXBWy5ERCZy8"/>
<div className="w-7 h-7 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center text-[10px] font-bold border-2 border-surface-container-lowest z-10">
                                            +1
                                        </div>
</div>
</div>
</div>
</div>
</div>
{/* Review Column (Mobile) */}
<div className="w-1/4 px-1" id="col-review">
<div className="flex flex-col gap-4">
{/* Task Card 4 */}
<div className="bg-surface-container-lowest border border-outline-variant/40 rounded-xl p-4 shadow-[0_2px_16px_rgba(58,48,42,0.04)] active:scale-[0.98] transition-transform border-l-4 border-l-tertiary">
<div className="flex justify-between items-start mb-3">
<span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-label font-bold tracking-wide uppercase bg-tertiary-container text-on-tertiary-container">High Priority</span>
<button className="text-outline hover:text-on-surface"><span className="material-symbols-outlined text-lg" data-icon="more_horiz">more_horiz</span></button>
</div>
<h3 className="font-headline text-lg font-bold text-on-surface mb-1 leading-tight">Implement TopAppBar</h3>
<p className="font-body text-sm text-secondary line-clamp-2 mb-4">Build responsive TopAppBar adhering to the Shared Components JSON logic.</p>
<div className="flex justify-between items-center pt-3 border-t border-outline-variant/30">
<div className="flex items-center gap-1.5 text-secondary text-xs font-label">
<span className="material-symbols-outlined text-sm" data-icon="check_circle">check_circle</span>
<span>Ready for QA</span>
</div>
<div className="w-7 h-7 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center text-xs font-bold border-2 border-surface-container-lowest">
                                        AK
                                    </div>
</div>
</div>
</div>
</div>
{/* Completed Column (Mobile) */}
<div className="w-1/4 px-1" id="col-completed">
<div className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-outline-variant/50 rounded-xl bg-surface-container-lowest/50">
<span className="material-symbols-outlined text-outline mb-2 text-3xl" data-icon="done_all">done_all</span>
<p className="font-body text-sm text-secondary">No completed tasks yet.</p>
</div>
</div>
</div>
</div>
{/* Desktop View: Grid (Hidden on Mobile) */}
<div className="hidden md:flex gap-6 h-full min-h-[500px]">
{/* Columns would normally be replicated here for web view, 
                     but omitting to save space as requested focus is Mobile adaptation. 
                     A true responsive implementation would use CSS Grid/Flex adjustments 
                     rather than duplicate DOM, but tabs vs columns often requires structural changes. */}
<div className="w-full text-center py-20 text-secondary font-body">
                    Desktop grid view hidden. Please view on mobile breakpoint to see the tabbed adaptation.
                </div>
</div>
</div>
{/* Floating Action Button */}
<button className="fixed md:hidden bottom-20 right-4 w-14 h-14 bg-primary text-on-primary rounded-2xl shadow-lg flex items-center justify-center hover:bg-primary/90 active:scale-95 transition-all z-40">
<span className="material-symbols-outlined text-2xl" data-icon="add">add</span>
</button>
    </div>
  );
}
