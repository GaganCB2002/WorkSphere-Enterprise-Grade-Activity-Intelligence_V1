import React from 'react';

export default function TeamView({ setCurrentTab }) {
  return (
    <div className="flex-1 w-full h-full overflow-y-auto p-8 bg-background dark:bg-on-secondary-fixed">
      <div className="max-w-7xl mx-auto space-y-10">
{/* Page Header */}
<div>
<h2 className="font-headline text-4xl text-on-background dark:text-surface-bright font-medium mb-2 tracking-tight">Mentor & Team</h2>
<p className="font-body text-on-surface-variant dark:text-secondary-fixed-dim text-base">Collaborate with your assigned guide and track team progress.</p>
</div>
{/* Bento Grid Layout */}
<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
{/* Left Column: Assigned Mentor (Spans 8 cols) */}
<div className="lg:col-span-8 flex flex-col gap-8">
{/* Mentor Profile Card (Glassmorphism inspired warm card) */}
<div className="bg-surface-container-lowest dark:bg-inverse-surface/40 rounded-2xl p-8 border border-outline-variant/40 shadow-[0_2px_16px_rgba(58,48,42,0.04)] relative overflow-hidden group">
{/* Decorative warm gradient blob */}
<div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
<div className="flex flex-col md:flex-row gap-8 relative z-10 items-start">
{/* Mentor Image */}
<div className="w-32 h-32 rounded-xl overflow-hidden shrink-0 border border-outline-variant/30 shadow-sm relative">
<img alt="Mentor Profile" className="w-full h-full object-cover" data-alt="A professional portrait of an experienced mentor in a sunlit, warm-toned minimalist office. The individual is looking slightly off-camera with a thoughtful expression. The background features subtle linen textures and warm earth tones characteristic of the Sahara design system." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBgTAeiWrBLtnLmE9oaVaEKna21yPdazjK06PPYqR31UKBHeYo7c6cZdb0zCGqUpuz7thwLiAxjOev_rGb6A2e6OMyADjpuw-h9BjXL1x7MLkSr5RS8Q3LSLKPoqpKLvL88s59b_qLa6N2Ez0pS0UWGAoT7tIuK_3J8NXFegaS9-J8iAivA0KEqemhDvnIOOLJJJZqWvbwIBSIxvLaWs6ChfjB4SFa_MNIiz1qlA54qNSKENTScaduiKAWku8W24fvFT9FBnYgO1ZI"/>
<div className="absolute bottom-2 right-2 w-4 h-4 bg-[#2ecc71] border-2 border-surface-container-lowest rounded-full shadow-sm" title="Online"></div>
</div>
{/* Mentor Details */}
<div className="flex-1 space-y-4">
<div>
<div className="inline-block px-3 py-1 bg-surface-container border border-outline-variant/30 rounded-full text-xs font-label text-on-surface-variant mb-3 uppercase tracking-wider">Assigned Mentor</div>
<h3 className="font-headline text-3xl text-on-surface dark:text-surface-bright font-medium leading-tight">Dr. Elena Rostova</h3>
<p className="font-body text-primary text-sm mt-1">Lead Data Scientist & Engineering Guide</p>
</div>
<p className="font-body text-on-surface-variant dark:text-secondary-fixed-dim text-sm leading-relaxed max-w-xl">
                                        Elena specializes in machine learning infrastructure and cross-functional team dynamics. She is available for strategic guidance, code reviews, and career development discussions.
                                    </p>
<div className="flex flex-wrap gap-4 pt-2">
<button className="px-6 py-2.5 bg-primary text-on-primary font-label text-sm rounded-lg hover:bg-surface-tint transition-colors shadow-sm flex items-center gap-2">
<span className="material-symbols-outlined text-sm">calendar_month</span>
                                            Schedule Meeting
                                        </button>
<button onClick={() => setCurrentTab('chat')} className="px-6 py-2.5 bg-transparent border border-outline text-on-surface dark:text-surface-bright font-label text-sm rounded-lg hover:bg-surface-container-low transition-colors flex items-center gap-2">
<span className="material-symbols-outlined text-sm">chat_bubble</span>
                                            Send Message
                                        </button>
</div>
</div>
</div>
</div>
{/* One-on-One Session History */}
<div className="bg-surface-container-lowest rounded-2xl p-8 border border-outline-variant/40 shadow-[0_2px_16px_rgba(58,48,42,0.04)]">
<div className="flex justify-between items-end mb-6">
<h3 className="font-headline text-2xl text-on-surface font-medium">Session History</h3>
<a className="font-label text-sm text-primary hover:underline flex items-center gap-1" href="#">
                                    View All <span className="material-symbols-outlined text-sm">arrow_forward</span>
</a>
</div>
<div className="space-y-0">
{/* Item 1 */}
<div className="group flex gap-6 py-5 border-b border-outline-variant/40 hover:bg-surface-container-low/50 transition-colors -mx-4 px-4 rounded-lg">
<div className="w-16 shrink-0 flex flex-col items-center justify-center bg-surface-container rounded-lg p-2 text-center border border-outline-variant/20">
<span className="font-label text-xs text-on-surface-variant uppercase">Oct</span>
<span className="font-headline text-xl text-on-surface font-medium">24</span>
</div>
<div className="flex-1">
<div className="flex justify-between items-start mb-1">
<h4 className="font-body font-semibold text-on-surface text-base">Project Architecture Review</h4>
<span className="inline-flex items-center gap-1 px-2.5 py-1 bg-surface-container-high text-on-surface-variant rounded text-[10px] font-label font-bold uppercase tracking-wide">
<span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> Completed
                                            </span>
</div>
<p className="font-body text-sm text-on-surface-variant mb-2">Discussed the integration of the new caching layer and potential bottlenecks.</p>
<div className="flex items-center gap-4 text-xs font-label text-on-surface-variant">
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">schedule</span> 45 mins</span>
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">videocam</span> Video Call</span>
</div>
</div>
</div>
{/* Item 2 */}
<div className="group flex gap-6 py-5 border-b border-outline-variant/40 hover:bg-surface-container-low/50 transition-colors -mx-4 px-4 rounded-lg">
<div className="w-16 shrink-0 flex flex-col items-center justify-center bg-primary/10 rounded-lg p-2 text-center border border-primary/20 text-primary dark:text-primary-fixed-dim">
<span className="font-label text-xs uppercase">Nov</span>
<span className="font-headline text-xl font-medium">02</span>
</div>
<div className="flex-1">
<div className="flex justify-between items-start mb-1">
<h4 className="font-body font-semibold text-on-surface text-base">Career Path Mapping</h4>
<span className="inline-flex items-center gap-1 px-2.5 py-1 bg-primary/10 text-primary rounded text-[10px] font-label font-bold uppercase tracking-wide">
<span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span> Upcoming
                                            </span>
</div>
<p className="font-body text-sm text-on-surface-variant mb-2">Quarterly review of goals and alignment with full-time opportunities.</p>
<div className="flex items-center gap-4 text-xs font-label text-on-surface-variant">
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">schedule</span> 60 mins</span>
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">location_on</span> Room 4B</span>
</div>
</div>
</div>
</div>
</div>
</div>
{/* Right Column: Scheduler (Spans 4 cols) */}
<div className="lg:col-span-4">
<div className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/40 shadow-[0_2px_16px_rgba(58,48,42,0.04)] h-full">
<h3 className="font-headline text-xl text-on-surface font-medium mb-6">Meeting Scheduler</h3>
{/* Mini Calendar */}
<div className="mb-6">
<div className="flex justify-between items-center mb-4">
<span className="font-label font-semibold text-on-surface">November 2023</span>
<div className="flex gap-1">
<button className="p-1 rounded hover:bg-surface-container text-on-surface-variant"><span className="material-symbols-outlined text-sm">chevron_left</span></button>
<button className="p-1 rounded hover:bg-surface-container text-on-surface-variant"><span className="material-symbols-outlined text-sm">chevron_right</span></button>
</div>
</div>
<div className="grid grid-cols-7 gap-1 text-center font-label text-xs text-on-surface-variant mb-2">
<div>Su</div><div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div>
</div>
<div className="grid grid-cols-7 gap-1 text-center font-body text-sm">
<div className="p-2 text-outline">29</div><div className="p-2 text-outline">30</div><div className="p-2 text-outline">31</div>
<div className="p-2 rounded hover:bg-surface-container cursor-pointer transition-colors">1</div>
<div className="p-2 rounded bg-primary text-on-primary font-semibold shadow-sm cursor-pointer">2</div>
<div className="p-2 rounded hover:bg-surface-container cursor-pointer transition-colors">3</div>
<div className="p-2 rounded hover:bg-surface-container cursor-pointer transition-colors text-outline">4</div>
<div className="p-2 rounded hover:bg-surface-container cursor-pointer transition-colors text-outline">5</div>
<div className="p-2 rounded hover:bg-surface-container cursor-pointer transition-colors">6</div>
<div className="p-2 rounded hover:bg-surface-container cursor-pointer transition-colors relative">
                                        7 <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-tertiary rounded-full"></div>
</div>
<div className="p-2 rounded hover:bg-surface-container cursor-pointer transition-colors">8</div>
<div className="p-2 rounded hover:bg-surface-container cursor-pointer transition-colors">9</div>
<div className="p-2 rounded hover:bg-surface-container cursor-pointer transition-colors relative">
                                        10 <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-tertiary rounded-full"></div>
</div>
<div className="p-2 rounded hover:bg-surface-container cursor-pointer transition-colors text-outline">11</div>
</div>
</div>
{/* Selected Date Info */}
<div className="pt-6 border-t border-outline-variant/40">
<h4 className="font-label text-sm font-semibold text-on-surface mb-4">Available Slots on Nov 02</h4>
<div className="grid grid-cols-2 gap-3">
<button className="py-2 border border-outline-variant rounded-lg font-body text-sm text-on-surface hover:border-primary hover:text-primary transition-colors">09:00 AM</button>
<button className="py-2 border border-outline-variant rounded-lg font-body text-sm text-on-surface hover:border-primary hover:text-primary transition-colors">10:30 AM</button>
<button className="py-2 border border-outline-variant rounded-lg font-body text-sm text-on-surface hover:border-primary hover:text-primary transition-colors bg-surface-container-low opacity-50 cursor-not-allowed">01:00 PM</button>
<button className="py-2 border border-primary bg-primary/5 rounded-lg font-body text-sm text-primary font-medium transition-colors">03:00 PM</button>
</div>
<button className="w-full mt-6 py-2.5 bg-primary text-on-primary font-label text-sm rounded-lg hover:bg-surface-tint transition-colors shadow-sm">
                                    Confirm Time
                                </button>
</div>
</div>
</div>
</div>
{/* Team Members Grid Section */}
<div>
<div className="flex justify-between items-end mb-6">
<div>
<h3 className="font-headline text-2xl text-on-surface font-medium">Project Squad</h3>
<p className="font-body text-on-surface-variant text-sm mt-1">Colleagues in your current active deployment.</p>
</div>
<button className="text-primary hover:text-surface-tint flex items-center gap-1 font-label text-sm transition-colors p-2 hover:bg-primary/5 rounded-lg">
<span className="material-symbols-outlined text-sm">filter_list</span> Filter
                        </button>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
{/* Team Member Card 1 */}
<div className="bg-surface-container-lowest rounded-xl p-5 border border-outline-variant/40 shadow-[0_2px_16px_rgba(58,48,42,0.02)] flex items-center gap-4 hover:shadow-[0_4px_24px_rgba(58,48,42,0.06)] transition-all cursor-pointer group">
<div className="w-14 h-14 rounded-full overflow-hidden relative shrink-0 border border-outline-variant/20">
<img alt="Team Member" className="w-full h-full object-cover" data-alt="A candid portrait of a young male professional in a modern, sunlit office environment. The warm color palette and minimalist background align with the Sahara design system, conveying a collaborative and focused atmosphere." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAIqa3hDeEkL8ZL2N5SRoDMrzWQ3wBNdXmxxEVzf2F73AiQOIbGU_4EOpyYd9-l24E5YhIfCPksxgPkpl2M1bZxuATb3ePa5eCkOxTZkQt1-AZ9ICQOxh9G_I6A8-5DpA5eBrO946S9-q0Ago4P8Owat9BV5hTH4lWz_9eHAFlpVmEvl2cv9sb1tnLZNw1QgRoECRAapEzPanrRlKZ-hq9ryAIqEepnlMRAcINScFsukobFBLCu8qNMwnVaUs9PO8FGIH3EVciu7q8"/>
</div>
<div className="flex-1 min-w-0">
<h4 className="font-body font-semibold text-on-surface truncate group-hover:text-primary transition-colors">Marcus Lin</h4>
<p className="font-body text-xs text-on-surface-variant truncate">Frontend Engineer</p>
<div className="flex items-center gap-1 mt-1">
<span className="w-2 h-2 rounded-full bg-[#2ecc71]"></span>
<span className="font-label text-[10px] text-on-surface-variant uppercase tracking-wider">Online</span>
</div>
</div>
<button className="text-outline hover:text-primary p-2 transition-colors">
<span className="material-symbols-outlined">more_vert</span>
</button>
</div>
{/* Team Member Card 2 */}
<div className="bg-surface-container-lowest rounded-xl p-5 border border-outline-variant/40 shadow-[0_2px_16px_rgba(58,48,42,0.02)] flex items-center gap-4 hover:shadow-[0_4px_24px_rgba(58,48,42,0.06)] transition-all cursor-pointer group">
<div className="w-14 h-14 rounded-full overflow-hidden relative shrink-0 border border-outline-variant/20">
<img alt="Team Member" className="w-full h-full object-cover" data-alt="A portrait of a female professional smiling softly. The image is bathed in warm, golden-hour light, perfectly matching the sun-baked simplicity of the Sahara design system. The setting is minimal and clean." src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2sd0kypG14hN7sy9lfCFa_5ejlv56aQ95vAy8ALw04GAeJKt8NxbU0GRG3Gqxm0Gfpr8l7LDojhCDgz18VE8NaFeQqh6k1ApxGqQnufL8x0fjqdZrUg-azT3iTDv2ZxavLGIwF9ec_N2VHNoPwpIXH-RXdQfLyFICzuiJPmIdJp3RyPnD7Q9lxzqqUzItA2nBo4wVm2FU_08DpjvtbnHqpbtWibT5uhQTJDFnFpuzKgQIZudbRSxmnKvHNGgSxtjRvT4MS5p8xNg"/>
</div>
<div className="flex-1 min-w-0">
<h4 className="font-body font-semibold text-on-surface truncate group-hover:text-primary transition-colors">Sarah Jenkins</h4>
<p className="font-body text-xs text-on-surface-variant truncate">UX Researcher</p>
<div className="flex items-center gap-1 mt-1">
<span className="w-2 h-2 rounded-full bg-outline"></span>
<span className="font-label text-[10px] text-on-surface-variant uppercase tracking-wider">Offline</span>
</div>
</div>
<button className="text-outline hover:text-primary p-2 transition-colors">
<span className="material-symbols-outlined">more_vert</span>
</button>
</div>
{/* Team Member Card 3 */}
<div className="bg-surface-container-lowest rounded-xl p-5 border border-outline-variant/40 shadow-[0_2px_16px_rgba(58,48,42,0.02)] flex items-center gap-4 hover:shadow-[0_4px_24px_rgba(58,48,42,0.06)] transition-all cursor-pointer group">
<div className="w-14 h-14 rounded-full overflow-hidden relative shrink-0 border border-outline-variant/20">
<div className="w-full h-full bg-surface-container-highest flex items-center justify-center font-headline text-xl text-on-surface-variant">
                                    DT
                                </div>
</div>
<div className="flex-1 min-w-0">
<h4 className="font-body font-semibold text-on-surface truncate group-hover:text-primary transition-colors">David Thompson</h4>
<p className="font-body text-xs text-on-surface-variant truncate">Backend Engineer</p>
<div className="flex items-center gap-1 mt-1">
<span className="w-2 h-2 rounded-full bg-[#f39c12]"></span>
<span className="font-label text-[10px] text-on-surface-variant uppercase tracking-wider">In a meeting</span>
</div>
</div>
<button className="text-outline hover:text-primary p-2 transition-colors">
<span className="material-symbols-outlined">more_vert</span>
</button>
</div>
</div>
</div>
</div>
    </div>
  );
}
