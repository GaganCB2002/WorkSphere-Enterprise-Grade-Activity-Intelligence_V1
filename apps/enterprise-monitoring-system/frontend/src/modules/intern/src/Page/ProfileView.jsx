import React from 'react';

export default function ProfileView() {
  return (
    <div className="flex-1 w-full h-full overflow-y-auto hide-scrollbar bg-background dark:bg-on-secondary-fixed">
      {/* Content Canvas */}
      <div className="pt-6 px-8 pb-12 w-full max-w-7xl mx-auto flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8">
{/* Left Column: Profile Card & Details */}
<aside className="col-span-1 lg:col-span-4 space-y-8">
{/* Main Profile Glass Card */}
<div className="bg-surface-dim border border-outline-variant/30 rounded-2xl p-8 relative overflow-hidden group">
{/* Decorative subtle gradient blob */}
<div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-700"></div>
<div className="relative z-10 flex flex-col items-center text-center">
<div className="relative mb-6">
<div className="w-32 h-32 rounded-full overflow-hidden border-4 border-surface-dim shadow-[0_2px_16px_rgba(58,48,42,0.04)] ring-2 ring-outline-variant/50">
<img alt="Profile" className="w-full h-full object-cover" data-alt="A professional headshot of a young woman with warm, natural lighting. She is smiling subtly, wearing a light beige top against a slightly darker warm grey background. The mood is approachable and professional, fitting for a corporate profile. The color palette emphasizes warm skin tones and earthy neutrals." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCVzkAiZBqP9epYMGppVBrver0ozaNmSnC879COqOEdb1RuluWl3MfSJB8KfGxvUuSSCjQGJVLzK3CmW2FIX9UneNkE_ZGYcUELk2ACd8jn9j4W1o3pacsDeymDn1nch7fA1A2o7zYnGDHXYsZyZJOPFmoAuMH5ChOrO-PE2VdvwdOa-I95xAPK6B8mhC49bLorkoRpA-5g4DzzU_YVHn9dA23OQulz02fc4Z2n8XnXKr58cC2el6CpDGcgOyRZ6hJlM3dPHZTwlLg"/>
</div>
<div className="absolute bottom-1 right-1 w-6 h-6 bg-primary rounded-full border-2 border-surface-dim flex items-center justify-center text-on-primary">
<span className="material-symbols-outlined text-[14px]">check_circle</span>
</div>
</div>
<h1 className="font-headline text-3xl font-bold text-on-surface mb-1">Elena Rostova</h1>
<p className="font-body text-sm text-primary mb-4 font-medium tracking-wide">UX Design Intern</p>
<p className="font-body text-sm text-on-surface-variant leading-relaxed mb-8">
                            Passionate about creating intuitive, human-centered digital experiences. Currently exploring the intersection of warmth and minimalism in enterprise software design.
                        </p>
<div className="flex flex-col w-full gap-3">
<button className="w-full py-2.5 px-4 bg-primary text-on-primary rounded-lg font-body text-sm font-semibold hover:bg-primary/90 transition-colors flex justify-center items-center gap-2">
<span className="material-symbols-outlined text-[18px]">edit</span>
                                Edit Profile
                            </button>
<button className="w-full py-2.5 px-4 bg-transparent text-on-surface border border-outline-variant/60 rounded-lg font-body text-sm font-semibold hover:bg-surface-container-high hover:border-outline-variant transition-colors flex justify-center items-center gap-2">
<span className="material-symbols-outlined text-[18px]">upload_file</span>
                                Upload Resume
                            </button>
</div>
</div>
</div>
{/* Contact & Info */}
<div className="bg-surface-dim border border-outline-variant/30 rounded-2xl p-8">
<h3 className="font-headline text-xl font-bold text-on-surface mb-6 border-b border-outline-variant/30 pb-4">Details</h3>
<ul className="space-y-5">
<li className="flex items-start gap-4">
<div className="mt-0.5 text-primary dark:text-primary-fixed-dim">
<span className="material-symbols-outlined text-[20px]">mail</span>
</div>
<div>
<p className="font-label text-xs text-on-surface-variant mb-0.5">Email</p>
<p className="font-body text-sm text-on-surface font-medium">elena.rostova@sahara.com</p>
</div>
</li>
<li className="flex items-start gap-4">
<div className="mt-0.5 text-primary dark:text-primary-fixed-dim">
<span className="material-symbols-outlined text-[20px]">location_on</span>
</div>
<div>
<p className="font-label text-xs text-on-surface-variant mb-0.5">Location</p>
<p className="font-body text-sm text-on-surface font-medium">San Francisco, CA (Hybrid)</p>
</div>
</li>
<li className="flex items-start gap-4">
<div className="mt-0.5 text-primary dark:text-primary-fixed-dim">
<span className="material-symbols-outlined text-[20px]">domain</span>
</div>
<div>
<p className="font-label text-xs text-on-surface-variant mb-0.5">Department</p>
<p className="font-body text-sm text-on-surface font-medium">Product Design</p>
</div>
</li>
<li className="flex items-start gap-4">
<div className="mt-0.5 text-primary dark:text-primary-fixed-dim">
<span className="material-symbols-outlined text-[20px]">supervisor_account</span>
</div>
<div>
<p className="font-label text-xs text-on-surface-variant mb-0.5">Manager</p>
<p className="font-body text-sm text-on-surface font-medium">Marcus Chen</p>
</div>
</li>
</ul>
</div>
{/* Skills Badges */}
<div className="bg-surface-dim border border-outline-variant/30 rounded-2xl p-8">
<h3 className="font-headline text-xl font-bold text-on-surface mb-6 border-b border-outline-variant/30 pb-4">Skills & Tools</h3>
<div className="flex flex-wrap gap-2">
<span className="px-3 py-1.5 bg-primary/10 text-primary dark:text-primary-fixed-dim text-xs font-semibold rounded-md border border-primary/20">Figma</span>
<span className="px-3 py-1.5 bg-primary/10 text-primary dark:text-primary-fixed-dim text-xs font-semibold rounded-md border border-primary/20">UI/UX Design</span>
<span className="px-3 py-1.5 bg-primary/10 text-primary dark:text-primary-fixed-dim text-xs font-semibold rounded-md border border-primary/20">Wireframing</span>
<span className="px-3 py-1.5 bg-surface-container-high text-on-surface text-xs font-medium rounded-md border border-outline-variant/50">Prototyping</span>
<span className="px-3 py-1.5 bg-surface-container-high text-on-surface text-xs font-medium rounded-md border border-outline-variant/50">User Research</span>
<span className="px-3 py-1.5 bg-surface-container-high text-on-surface text-xs font-medium rounded-md border border-outline-variant/50">HTML/CSS</span>
<span className="px-3 py-1.5 bg-surface-container-high text-on-surface text-xs font-medium rounded-md border border-outline-variant/50">Design Systems</span>
</div>
</div>
</aside>
{/* Main Area: Timeline & Content Bento */}
<div className="col-span-1 lg:col-span-8 space-y-8">
{/* Bento Grid for Milestones & Stats */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
{/* Internship Timeline/Milestones */}
<div className="bg-surface-dim border border-outline-variant/30 rounded-2xl p-8 md:col-span-2 relative overflow-hidden">
<div className="absolute top-0 right-0 w-64 h-64 bg-tertiary/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
<div className="flex justify-between items-center mb-8 relative z-10">
<h3 className="font-headline text-2xl font-bold text-on-surface">Internship Journey</h3>
<span className="text-xs font-label text-primary dark:text-primary-fixed-dim bg-primary/10 px-3 py-1 rounded-full border border-primary/20">Week 8 of 12</span>
</div>
<div className="relative z-10 pl-4 border-l border-outline-variant/50 space-y-8">
{/* Milestone 1 (Completed) */}
<div className="relative">
<div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-primary ring-4 ring-surface-dim"></div>
<div className="mb-1">
<span className="text-xs font-label text-on-surface-variant mr-2">June 1 - June 14</span>
<span className="text-[10px] uppercase tracking-wider font-bold text-primary">Onboarding</span>
</div>
<h4 className="font-headline text-lg font-semibold text-on-surface mb-2">Foundation & Setup</h4>
<p className="font-body text-sm text-on-surface-variant leading-relaxed">Completed company orientation, team introductions, and setup of primary design tools and environment.</p>
</div>
{/* Milestone 2 (Active) */}
<div className="relative">
<div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-primary ring-4 ring-primary/20 animate-pulse"></div>
<div className="mb-1">
<span className="text-xs font-label text-on-surface-variant mr-2">June 15 - Present</span>
<span className="text-[10px] uppercase tracking-wider font-bold text-tertiary dark:text-tertiary-fixed-dim">Active Phase</span>
</div>
<h4 className="font-headline text-lg font-semibold text-on-surface mb-2">Project: Shared Components UI</h4>
<p className="font-body text-sm text-on-surface-variant leading-relaxed">Leading the redesign of the enterprise navigation shell using the new warm-minimalism design tokens.</p>
{/* Interactive sub-task list */}
<div className="mt-4 space-y-2">
<label className="flex items-center gap-3 group cursor-pointer">
<input defaultChecked={true} className="form-checkbox h-4 w-4 text-primary border-outline-variant rounded bg-transparent focus:ring-primary/20 focus:ring-offset-surface-dim" type="checkbox"/>
<span className="font-body text-sm text-on-surface-variant group-hover:text-on-surface transition-colors line-through opacity-70">Audit existing navigation JSON</span>
</label>
<label className="flex items-center gap-3 group cursor-pointer">
<input defaultChecked={true} className="form-checkbox h-4 w-4 text-primary border-outline-variant rounded bg-transparent focus:ring-primary/20 focus:ring-offset-surface-dim" type="checkbox"/>
<span className="font-body text-sm text-on-surface-variant group-hover:text-on-surface transition-colors line-through opacity-70">Define active state logic</span>
</label>
<label className="flex items-center gap-3 group cursor-pointer">
<input className="form-checkbox h-4 w-4 text-primary border-outline-variant rounded bg-transparent focus:ring-primary/20 focus:ring-offset-surface-dim" type="checkbox"/>
<span className="font-body text-sm text-on-surface-variant group-hover:text-on-surface transition-colors">Implement responsive structural shifts</span>
</label>
</div>
</div>
{/* Milestone 3 (Future) */}
<div className="relative opacity-60">
<div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-outline-variant ring-4 ring-surface-dim"></div>
<div className="mb-1">
<span className="text-xs font-label text-on-surface-variant mr-2">Aug 1 - Aug 15</span>
<span className="text-[10px] uppercase tracking-wider font-bold text-outline">Upcoming</span>
</div>
<h4 className="font-headline text-lg font-semibold text-on-surface mb-2">Final Presentation</h4>
<p className="font-body text-sm text-on-surface-variant leading-relaxed">Showcase internship impact, key learnings, and present the final UI implementation to the design guild.</p>
</div>
</div>
</div>
{/* Certifications Carousel (Simplified to scrollable area) */}
<div className="bg-surface-dim border border-outline-variant/30 rounded-2xl p-8 flex flex-col">
<div className="flex justify-between items-center mb-6">
<h3 className="font-headline text-xl font-bold text-on-surface">Certifications</h3>
<button className="text-primary hover:text-primary-fixed transition-colors">
<span className="material-symbols-outlined">arrow_forward</span>
</button>
</div>
<div className="flex-1 overflow-x-auto pb-2 -mx-2 px-2 snap-x flex gap-4 hide-scrollbar">
{/* Cert Card 1 */}
<div className="min-w-[200px] flex-shrink-0 bg-surface-container-high rounded-xl p-5 border border-outline-variant/40 snap-start hover:border-primary/30 transition-colors group cursor-pointer">
<div className="w-10 h-10 rounded-full bg-tertiary/10 text-tertiary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined text-[20px]">workspace_premium</span>
</div>
<h4 className="font-body text-sm font-bold text-on-surface mb-1">Design Systems Foundation</h4>
<p className="font-label text-xs text-on-surface-variant mb-4">Issued by Sahara Guild</p>
<span className="text-[10px] font-bold uppercase tracking-wider text-primary">Completed</span>
</div>
{/* Cert Card 2 */}
<div className="min-w-[200px] flex-shrink-0 bg-surface-container-high rounded-xl p-5 border border-outline-variant/40 snap-start hover:border-primary/30 transition-colors group cursor-pointer">
<div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined text-[20px]">accessibility_new</span>
</div>
<h4 className="font-body text-sm font-bold text-on-surface mb-1">A11y Core Principles</h4>
<p className="font-label text-xs text-on-surface-variant mb-4">Issued by A11y Project</p>
<span className="text-[10px] font-bold uppercase tracking-wider text-outline">In Progress</span>
</div>
</div>

</div>
{/* Quick Stats/Manager Feedback */}
<div className="bg-primary/5 border border-primary/10 rounded-2xl p-8 flex flex-col justify-center relative overflow-hidden">
<div className="absolute bottom-0 right-0 opacity-10 pointer-events-none">
<span className="material-symbols-outlined text-[120px]">format_quote</span>
</div>
<div className="relative z-10">
<div className="flex items-center gap-3 mb-4">
<div className="w-8 h-8 rounded-full bg-surface-container-high overflow-hidden">
<img alt="Manager" className="w-full h-full object-cover" data-alt="A professional headshot of an adult man wearing a casual collared shirt, smiling confidently. Warm, natural lighting highlights his features against a blurred, neutral background. The tone is professional, supportive, and grounded in a modern corporate setting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAg7Sjk5dY-QiDIP5ji79OYcwAnJvz6VQ8Qyoez8koU-wQ18TzuSXBD9qkpCkIyxnxgdzA7y4YHx1gCzzBjdT-WDC3tm5fugijYQK51iDyRG_l__02u6Iq4VkFLe0YakM2vzSzJjudVjhNL3IdmCNwHhzMAGZHPZh3OmDzQgSJ3m8YB40bRcF3gFYOp8C1YTWi3CCokW0nFRhvK2gDsvWomMC8YEnHqsF3XthQRr0d088Q5QRMnqZYfb3NE2eQlcYpEOdYh1IqjlBY"/>
</div>
<div>
<p className="font-body text-sm font-bold text-on-surface">Marcus Chen</p>
<p className="font-label text-xs text-on-surface-variant">Mid-Term Review</p>
</div>
</div>
<p className="font-headline text-lg italic text-on-surface-variant leading-relaxed">
                                "Elena has shown an exceptional grasp of our warm minimalism design language. Her work on the navigation hierarchy is both elegant and structurally sound."
                            </p>
</div>
</div>
</div>
{/* Achievements Gallery */}
<div className="bg-surface-dim border border-outline-variant/30 rounded-2xl p-8">
<div className="flex justify-between items-end mb-6">
<div>
<h3 className="font-headline text-2xl font-bold text-on-surface mb-1">Achievements Gallery</h3>
<p className="font-body text-sm text-on-surface-variant">Visual highlights from recent projects</p>
</div>
<button className="font-body text-sm font-semibold text-primary hover:text-primary-fixed transition-colors">View All</button>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
{/* Gallery Item 1 */}
<div className="group relative rounded-xl overflow-hidden aspect-[4/3] border border-outline-variant/20 cursor-pointer">
<img alt="Project Thumbnail" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="A close-up shot of a modern laptop screen displaying complex design system components and wireframes. The lighting is warm and ambient, reflecting off the screen slightly. Beside the laptop is a stylish notebook and a ceramic mug filled with coffee on a wooden desk. The aesthetic is warm minimalism, industrious, and focused." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdfFR_dZyNzPNLuJgC7HCVxk6E54rfYKaw4pcrxSYXbsGZZqXU3jcCCKfRpqTxY33L7U0lSXiOPBf41CzfcSiLnOAhnaiUsGdJcAisGEd2oGwMKtLnCtZBozbzVpNlykoQ8GiIZq9wM0omLJMMyVdU8EsGOawoDgGIHKX7XTSNnYfC2ChyRr0-JdRb3l5DznYe7HNIjn29L_T2cs5v97vdS6EoGd55zpeE0l8YGqKVLBUsPIKvGt_ycSFU66uPGc4x2qKrC3wLj9M"/>
<div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/90 via-inverse-surface/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
<h4 className="font-headline text-lg font-bold text-on-surface dark:text-surface-bright mb-1 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">Nav Shell Redesign</h4>
<p className="font-body text-xs text-surface-dim translate-y-2 group-hover:translate-y-0 transition-transform duration-300 delay-75">Figma prototype implementation</p>
</div>
</div>
{/* Gallery Item 2 */}
<div className="group relative rounded-xl overflow-hidden aspect-[4/3] border border-outline-variant/20 cursor-pointer">
<img alt="Workshop Thumbnail" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="A warm, candid photo of hands arranging colorful sticky notes on a glass board during a brainstorming session. The scene is brightly lit with a warm hue, suggesting a creative and collaborative environment. The focus is sharp on the notes, with the background softly blurred in a modern office setting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBd8FxrVQzivQAt1B_Aldlc9heSvZZUDqCCB_-mjMygo861XWKUIvfr2IFnBz0mH2epaTn6UQ_E7i7VLmgdXcqTPxfcOxJokMbhDYobb_PiFvyn5NCYg4Rial6Qkfi0Ml7bILbcVusb4Zo0FbcypdUkNbZUjoQCuvlzZ9Umi1ePQ9_BfKEskmbKiZkKj2Vc_XDYVegmhIvljKgPvfDlp0biz_kYw-ZRHu9LJBahRnYZnRsSL6jTZwVn25WJOoKMYVz_A-EAWCRzk7s"/>
<div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/90 via-inverse-surface/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
<h4 className="font-headline text-lg font-bold text-on-surface dark:text-surface-bright mb-1 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">Ideation Workshop</h4>
<p className="font-body text-xs text-surface-dim translate-y-2 group-hover:translate-y-0 transition-transform duration-300 delay-75">Facilitated synthesis session</p>
</div>
</div>
{/* Gallery Item 3 */}
<div className="group relative rounded-xl overflow-hidden aspect-[4/3] border border-outline-variant/20 cursor-pointer bg-surface-container-high flex flex-col items-center justify-center hover:bg-surface-container-highest transition-colors">
<div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-3">
<span className="material-symbols-outlined text-[24px]">add_photo_alternate</span>
</div>
<span className="font-body text-sm font-semibold text-on-surface-variant">Add Achievement</span>
</div>
</div>
</div>
</div>
</div>
    </div>
  );
}
