import React from 'react';

export default function SettingsView({ activeSection = 'settings', darkMode, setDarkMode, onLogout }) {
  const handleThemeChange = (isDark) => {
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <div className="flex-1 w-full h-full overflow-y-auto hide-scrollbar p-8 bg-background dark:bg-on-secondary-fixed transition-colors duration-200">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <header className="mb-10">
          <h1 className="font-headline text-4xl lg:text-5xl text-on-surface dark:text-surface-bright mb-3 tracking-tight transition-colors">
            {activeSection === 'notifications' ? 'Notifications & Alerts' : 'System & Preferences'}
          </h1>
          <p className="font-body text-on-surface-variant dark:text-secondary-fixed-dim max-w-2xl text-lg leading-relaxed transition-colors">
            {activeSection === 'notifications' 
              ? 'Stay updated with cohort milestones, system alerts, and mentor feedback.' 
              : 'Manage your communication channels, security settings, and interface aesthetics in one unified dashboard.'}
          </p>
        </header>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
          {/* Left Column: Notification Feed */}
          <div className={`${activeSection === 'notifications' ? 'xl:col-span-12' : 'xl:col-span-7'} space-y-6`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-headline text-2xl text-on-surface dark:text-surface-bright transition-colors">Recent Alerts</h2>
              <button className="font-label text-sm text-primary dark:text-primary-fixed-dim hover:text-surface-tint dark:hover:text-primary-fixed transition-colors flex items-center gap-1">
                Mark all read <span className="material-symbols-outlined text-[16px]">done_all</span>
              </button>
            </div>

            {/* Filter Chips */}
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              <button className="px-5 py-2 rounded-full bg-primary text-on-primary font-label text-sm shadow-sm transition-all">All Activity</button>
              <button className="px-5 py-2 rounded-full bg-surface-container-highest dark:bg-inverse-surface text-on-surface-variant dark:text-secondary-fixed-dim font-label text-sm border border-outline-variant/60 dark:border-outline-variant/20 hover:bg-surface-container-high dark:hover:bg-inverse-surface/85 transition-all">Deadlines</button>
              <button className="px-5 py-2 rounded-full bg-surface-container-highest dark:bg-inverse-surface text-on-surface-variant dark:text-secondary-fixed-dim font-label text-sm border border-outline-variant/60 dark:border-outline-variant/20 hover:bg-surface-container-high dark:hover:bg-inverse-surface/85 transition-all">Feedback</button>
              <button className="px-5 py-2 rounded-full bg-surface-container-highest dark:bg-inverse-surface text-on-surface-variant dark:text-secondary-fixed-dim font-label text-sm border border-outline-variant/60 dark:border-outline-variant/20 hover:bg-surface-container-high dark:hover:bg-inverse-surface/85 transition-all flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px]">smart_toy</span> AI Insights
              </button>
            </div>

            {/* Notifications List */}
            <div className="space-y-4">
              {/* Card 1: AI Insight */}
              <div className="bg-surface-container-lowest dark:bg-inverse-surface rounded-xl p-5 shadow-soft border border-outline-variant/40 dark:border-outline-variant/10 flex gap-4 items-start group hover:border-primary/30 transition-all relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-tertiary"></div>
                <div className="w-12 h-12 rounded-full bg-tertiary-fixed text-on-tertiary-fixed-variant flex items-center justify-center shrink-0 mt-1">
                  <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>smart_toy</span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className="font-headline text-xl text-on-surface dark:text-surface-bright mb-1 group-hover:text-tertiary dark:group-hover:text-tertiary-fixed-dim transition-colors">AI Skill Trajectory</h4>
                    <span className="font-label text-xs text-on-surface-variant dark:text-secondary-fixed-dim mt-1">10 mins ago</span>
                  </div>
                  <p className="font-body text-sm text-on-surface-variant dark:text-secondary-fixed-dim leading-relaxed">Based on your recent Python project submissions, you are showing strong aptitude in data visualization. The system recommends enrolling in the upcoming "Advanced Data Narratives" module next week.</p>
                  <div className="mt-4 flex gap-3">
                    <button className="font-label text-xs font-semibold text-tertiary dark:text-tertiary-fixed-dim border border-tertiary/30 px-3 py-1.5 rounded-lg hover:bg-tertiary/5 dark:hover:bg-tertiary/10 transition-colors">View Module</button>
                  </div>
                </div>
              </div>

              {/* Card 2: Deadline */}
              <div className="bg-surface-container-lowest dark:bg-inverse-surface rounded-xl p-5 shadow-soft border border-outline-variant/40 dark:border-outline-variant/10 flex gap-4 items-start group hover:border-primary/30 transition-all relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
                <div className="w-12 h-12 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center shrink-0 mt-1">
                  <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>timer</span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className="font-headline text-xl text-on-surface dark:text-surface-bright mb-1 group-hover:text-primary dark:group-hover:text-primary-fixed-dim transition-colors">Q3 Self-Evaluation Due</h4>
                    <span className="font-label text-xs text-on-surface-variant dark:text-secondary-fixed-dim mt-1">2 hours ago</span>
                  </div>
                  <p className="font-body text-sm text-on-surface-variant dark:text-secondary-fixed-dim leading-relaxed">Your quarterly self-evaluation draft must be submitted by Friday at 5:00 PM EST. You currently have sections 3 and 4 marked as incomplete.</p>
                  <div className="mt-4 flex gap-3">
                    <button className="font-label text-xs font-semibold bg-primary text-on-primary px-3 py-1.5 rounded-lg hover:bg-surface-tint transition-colors shadow-sm">Continue Draft</button>
                  </div>
                </div>
              </div>

              {/* Card 3: Feedback */}
              <div className="bg-surface-container-lowest dark:bg-inverse-surface rounded-xl p-5 shadow-soft border border-outline-variant/40 dark:border-outline-variant/10 flex gap-4 items-start group hover:border-primary/30 transition-all relative overflow-hidden">
                <div className="w-12 h-12 rounded-full bg-surface-variant dark:bg-on-secondary-fixed text-on-surface-variant dark:text-secondary-fixed-dim flex items-center justify-center shrink-0 mt-1">
                  <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>rate_review</span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className="font-headline text-xl text-on-surface dark:text-surface-bright mb-1">Mentor Note: Architecture Review</h4>
                    <span className="font-label text-xs text-on-surface-variant dark:text-secondary-fixed-dim mt-1">Yesterday</span>
                  </div>
                  <p className="font-body text-sm text-on-surface-variant dark:text-secondary-fixed-dim leading-relaxed">Sarah Jenkins left a comment on your recent system architecture diagram. "Excellent structural flow, but consider edge cases for..."</p>
                </div>
              </div>

              {/* Card 4: System */}
              <div className="bg-surface-container-lowest dark:bg-inverse-surface rounded-xl p-5 shadow-soft border border-outline-variant/40 dark:border-outline-variant/10 flex gap-4 items-start group hover:border-primary/30 transition-all relative overflow-hidden">
                <div className="w-12 h-12 rounded-full bg-surface-variant dark:bg-on-secondary-fixed text-on-surface-variant dark:text-secondary-fixed-dim flex items-center justify-center shrink-0 mt-1">
                  <span className="material-symbols-outlined">update</span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className="font-headline text-xl text-on-surface dark:text-surface-bright mb-1">Platform Maintenance</h4>
                    <span className="font-label text-xs text-on-surface-variant dark:text-secondary-fixed-dim mt-1">Oct 12</span>
                  </div>
                  <p className="font-body text-sm text-on-surface-variant dark:text-secondary-fixed-dim leading-relaxed">Scheduled downtime for the main database on Sunday from 2AM to 4AM EST.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Settings Bento */}
          {activeSection !== 'notifications' && (
            <div className="xl:col-span-5 space-y-6 xl:mt-0 mt-8">
              <h2 className="font-headline text-2xl text-on-surface dark:text-surface-bright mb-4 transition-colors">Profile Settings</h2>
              
              {/* Appearance Panel */}
              <div className="bg-surface-container-lowest dark:bg-inverse-surface rounded-xl p-7 shadow-soft border border-outline-variant/40 dark:border-outline-variant/10 transition-colors">
                <div className="flex items-center gap-3 border-b border-outline-variant/40 dark:border-outline-variant/10 pb-4 mb-5">
                  <span className="material-symbols-outlined text-on-surface-variant dark:text-secondary-fixed-dim">palette</span>
                  <h3 className="font-headline text-xl text-on-surface dark:text-surface-bright">Appearance</h3>
                </div>
                <div className="grid grid-cols-2 gap-5">
                  {/* Light Mode Toggle */}
                  <div 
                    onClick={() => handleThemeChange(false)}
                    className={`border-2 rounded-xl p-4 cursor-pointer relative overflow-hidden group transition-all duration-200 ${
                      !darkMode 
                        ? 'border-primary bg-surface dark:bg-surface shadow-md' 
                        : 'border-outline-variant/50 dark:border-outline-variant/20 bg-surface dark:bg-surface opacity-80 hover:opacity-100 hover:border-primary/50'
                    }`}
                  >
                    {!darkMode && (
                      <div className="absolute top-2 right-2 text-primary">
                        <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
                      </div>
                    )}
                    <div className="w-full h-20 bg-background border border-outline-variant/50 rounded-lg mb-3 flex items-center justify-center shadow-inner">
                      <span className="material-symbols-outlined text-primary text-3xl">light_mode</span>
                    </div>
                    <p className="font-label text-sm text-center text-on-surface font-semibold">Warm Linen</p>
                  </div>
                  
                  {/* Dark Mode Toggle */}
                  <div 
                    onClick={() => handleThemeChange(true)}
                    className={`border-2 rounded-xl p-4 cursor-pointer relative overflow-hidden group transition-all duration-200 ${
                      darkMode 
                        ? 'border-primary bg-[#3a302a] dark:bg-[#3a302a] shadow-md' 
                        : 'border-outline-variant/50 dark:border-outline-variant/20 bg-[#3a302a] dark:bg-[#3a302a] opacity-80 hover:opacity-100 hover:border-primary/50'
                    }`}
                  >
                    {darkMode && (
                      <div className="absolute top-2 right-2 text-primary">
                        <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
                      </div>
                    )}
                    <div className="w-full h-20 bg-[#2a2420] border border-[#504840] rounded-lg mb-3 flex items-center justify-center shadow-inner">
                      <span className="material-symbols-outlined text-primary-fixed text-3xl">dark_mode</span>
                    </div>
                    <p className="font-label text-sm text-center text-primary-fixed font-semibold">Sahara Dark</p>
                  </div>
                </div>
              </div>

              {/* Notification Preferences Panel */}
              <div className="bg-surface-container-lowest dark:bg-inverse-surface rounded-xl p-7 shadow-soft border border-outline-variant/40 dark:border-outline-variant/10 transition-colors">
                <div className="flex items-center gap-3 border-b border-outline-variant/40 dark:border-outline-variant/10 pb-4 mb-5">
                  <span className="material-symbols-outlined text-on-surface-variant dark:text-secondary-fixed-dim">campaign</span>
                  <h3 className="font-headline text-xl text-on-surface dark:text-surface-bright">Channels</h3>
                </div>
                <div className="space-y-5">
                  <div className="flex items-center justify-between group">
                    <div>
                      <p className="font-body text-sm text-on-surface dark:text-surface-bright font-semibold">Email Digest</p>
                      <p className="font-label text-xs text-on-surface-variant dark:text-secondary-fixed-dim mt-1">Daily summary of all activity</p>
                    </div>
                    <div className="w-11 h-6 bg-primary rounded-full relative cursor-pointer shadow-inner">
                      <div className="w-5 h-5 bg-on-primary rounded-full absolute top-0.5 right-0.5 shadow-sm"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between group">
                    <div>
                      <p className="font-body text-sm text-on-surface dark:text-surface-bright font-semibold">Push Notifications</p>
                      <p className="font-label text-xs text-on-surface-variant dark:text-secondary-fixed-dim mt-1">Instant alerts for deadlines</p>
                    </div>
                    <div className="w-11 h-6 bg-surface-dim dark:bg-on-secondary-fixed rounded-full relative cursor-pointer border border-outline-variant dark:border-outline-variant/20 shadow-inner">
                      <div className="w-5 h-5 bg-background dark:bg-inverse-surface border border-outline-variant dark:border-outline-variant/30 rounded-full absolute top-px left-px shadow-sm"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between group">
                    <div>
                      <p className="font-body text-sm text-on-surface dark:text-surface-bright font-semibold">Slack Integration</p>
                      <p className="font-label text-xs text-on-surface-variant dark:text-secondary-fixed-dim mt-1">Direct messages from AI</p>
                    </div>
                    <div className="w-11 h-6 bg-primary rounded-full relative cursor-pointer shadow-inner">
                      <div className="w-5 h-5 bg-on-primary rounded-full absolute top-0.5 right-0.5 shadow-sm"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Security Panel */}
              <div className="bg-surface-container-lowest dark:bg-inverse-surface rounded-xl p-7 shadow-soft border border-outline-variant/40 dark:border-outline-variant/10 transition-colors">
                <div className="flex items-center gap-3 border-b border-outline-variant/40 dark:border-outline-variant/10 pb-4 mb-5">
                  <span className="material-symbols-outlined text-on-surface-variant dark:text-secondary-fixed-dim">lock</span>
                  <h3 className="font-headline text-xl text-on-surface dark:text-surface-bright">Security</h3>
                </div>
                <form className="space-y-4">
                  <div>
                    <label className="font-label text-xs text-on-surface-variant dark:text-secondary-fixed-dim font-semibold block mb-1.5 uppercase tracking-wider">Current Password</label>
                    <input className="w-full bg-background dark:bg-on-secondary-fixed border border-outline-variant dark:border-outline-variant/30 rounded-lg px-4 py-2.5 text-sm font-body text-on-surface dark:text-surface-bright focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" placeholder="••••••••" type="password"/>
                  </div>
                  <div>
                    <label className="font-label text-xs text-on-surface-variant dark:text-secondary-fixed-dim font-semibold block mb-1.5 uppercase tracking-wider">New Password</label>
                    <input className="w-full bg-background dark:bg-on-secondary-fixed border border-outline-variant dark:border-outline-variant/30 rounded-lg px-4 py-2.5 text-sm font-body text-on-surface dark:text-surface-bright focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" placeholder="Create new password" type="password"/>
                  </div>
                  <div className="pt-2">
                    <button className="w-full bg-surface-container-highest dark:bg-on-secondary-fixed-variant border border-outline-variant/50 dark:border-outline-variant/10 text-on-surface dark:text-surface-bright py-2.5 rounded-lg font-label text-sm font-semibold hover:bg-surface-container-high dark:hover:bg-on-secondary-fixed transition-colors shadow-sm" type="button">Update Password</button>
                  </div>
                </form>
              </div>

              {/* Account Actions / Logout Panel */}
              <div className="bg-surface-container-lowest dark:bg-inverse-surface rounded-xl p-7 shadow-soft border border-outline-variant/40 dark:border-outline-variant/10 transition-colors">
                <div className="flex items-center gap-3 border-b border-outline-variant/40 dark:border-outline-variant/10 pb-4 mb-5">
                  <span className="material-symbols-outlined text-tertiary dark:text-tertiary-fixed-dim">account_circle</span>
                  <h3 className="font-headline text-xl text-on-surface dark:text-surface-bright">Account Session</h3>
                </div>
                <div className="space-y-4">
                  <p className="font-body text-xs text-on-surface-variant dark:text-secondary-fixed-dim leading-relaxed">
                    Sign out of your active Sahara Enterprise portal session on this device. You will need your credentials to log back in.
                  </p>
                  <button 
                    onClick={onLogout}
                    className="w-full bg-tertiary hover:bg-tertiary/90 text-on-primary py-2.5 rounded-lg font-label text-sm font-semibold transition-colors shadow-sm flex items-center justify-center gap-2"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-sm">logout</span>
                    <span>Log Out of Session</span>
                  </button>
                </div>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}
