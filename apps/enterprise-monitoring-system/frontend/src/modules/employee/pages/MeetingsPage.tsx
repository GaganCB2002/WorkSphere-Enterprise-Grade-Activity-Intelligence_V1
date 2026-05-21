import React from 'react';
import { Video, Calendar as CalendarIcon, Users, Clock, Plus, MonitorPlay, CalendarDays, ExternalLink, MessageSquare } from 'lucide-react';

const MOCK_MEETINGS = [
  { id: 1, title: 'Daily Standup - Engineering Core', time: '09:00 AM - 09:30 AM', attendees: 8, host: 'Elena Manager', status: 'completed', platform: 'Internal' },
  { id: 2, title: 'Sprint 42 Planning & OKR Sync', time: '11:00 AM - 12:30 PM', attendees: 12, host: 'Elena Manager', status: 'ongoing', platform: 'Meet' },
  { id: 3, title: '1:1 with Alex Developer', time: '02:00 PM - 02:30 PM', attendees: 2, host: 'You', status: 'upcoming', platform: 'Internal' },
  { id: 4, title: 'Architecture Review: gRPC Streaming', time: '04:00 PM - 05:00 PM', attendees: 5, host: 'Sarah Engineer', status: 'upcoming', platform: 'Zoom' },
];

export function MeetingsPage() {
  return (
    <div className="h-full flex flex-col space-y-6 overflow-y-auto emp-scrollbar p-1">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <MonitorPlay className="w-6 h-6 text-indigo-500" />
            Video Meetings
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage your video conferences, virtual rooms, and schedule.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            <CalendarDays className="w-4 h-4" />
            <span>Calendar Sync</span>
          </button>
          <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-md shadow-indigo-500/20">
            <Plus className="w-4 h-4" />
            <span>New Meeting</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Schedule */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200">Today's Schedule</h2>
            <span className="text-sm font-medium text-slate-500 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
              May 21, 2026
            </span>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/[0.04] rounded-2xl overflow-hidden">
            <div className="divide-y divide-slate-100 dark:divide-white/[0.04]">
              {MOCK_MEETINGS.map((meeting) => (
                <div key={meeting.id} className={`p-5 flex flex-col sm:flex-row sm:items-center gap-4 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50 ${meeting.status === 'ongoing' ? 'bg-indigo-50/50 dark:bg-indigo-900/10' : ''}`}>
                  
                  <div className="w-40 shrink-0">
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
                      <Clock className="w-4 h-4 text-slate-400" />
                      {meeting.time.split(' - ')[0]}
                    </div>
                    <div className="text-xs text-slate-500 ml-6 mt-0.5">
                      to {meeting.time.split(' - ')[1]}
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-slate-900 dark:text-white text-base truncate mb-1">
                      {meeting.title}
                    </h3>
                    <div className="flex items-center gap-4 text-xs text-slate-500 font-medium">
                      <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5" /> {meeting.attendees} attendees</span>
                      <span className="flex items-center gap-1.5"><CalendarIcon className="w-3.5 h-3.5" /> Host: {meeting.host}</span>
                      <span className={`px-2 py-0.5 rounded border ${
                        meeting.platform === 'Internal' ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800/50' :
                        meeting.platform === 'Meet' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/50' :
                        'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800/50'
                      }`}>{meeting.platform}</span>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center justify-end">
                    {meeting.status === 'completed' && (
                      <span className="text-sm font-semibold text-slate-400 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-lg">Completed</span>
                    )}
                    {meeting.status === 'upcoming' && (
                      <button className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 hover:bg-indigo-100 dark:hover:bg-indigo-500/20 px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
                        Details
                      </button>
                    )}
                    {meeting.status === 'ongoing' && (
                      <button className="text-sm font-bold text-white bg-emerald-500 hover:bg-emerald-600 px-6 py-2 rounded-lg transition-colors flex items-center gap-2 shadow-lg shadow-emerald-500/20 animate-pulse-slow">
                        <Video className="w-4 h-4" />
                        Join Now
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar Widgets */}
        <div className="space-y-6">
          {/* Quick Rooms */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/[0.04] rounded-2xl p-5">
            <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
              <Video className="w-5 h-5 text-indigo-500" /> My Personal Room
            </h3>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 text-center mb-4">
              <p className="text-sm font-mono text-slate-600 dark:text-slate-400 select-all">meet.worksphere.ent/alex-room</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button className="flex flex-col items-center justify-center gap-2 p-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-colors font-medium text-sm shadow-md">
                <Video className="w-5 h-5" /> Start Meeting
              </button>
              <button className="flex flex-col items-center justify-center gap-2 p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl transition-colors font-medium text-sm">
                <ExternalLink className="w-5 h-5" /> Copy Link
              </button>
            </div>
          </div>

          {/* Connected Integrations */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/[0.04] rounded-2xl p-5">
            <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-4">Integrations</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg border border-emerald-200 dark:border-emerald-900/30 bg-emerald-50 dark:bg-emerald-900/10">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold text-xs">GM</div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">Google Meet</p>
                    <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold uppercase">Connected</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 cursor-pointer transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-xs">ZM</div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">Zoom</p>
                    <p className="text-[10px] text-slate-500 font-medium">Click to connect</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
