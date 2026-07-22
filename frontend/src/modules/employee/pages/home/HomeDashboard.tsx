import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  CalendarPlus, Clock, ListTodo, Timer, Zap, Video, Mail, Upload, Ticket,
  Filter, Download, RefreshCw
} from 'lucide-react';
import { useEmployeeStore, useAttendanceStore, useNotificationStore } from '../../store/employeeStore';
import { WelcomeHero } from '../../components/dashboard/WelcomeHero';
import { MetricsGrid } from '../../components/dashboard/MetricsGrid';
import { WidgetGrid } from '../../components/dashboard/WidgetGrid';
import { CalendarWidget } from '../../components/dashboard/CalendarWidget';
import { AnnouncementsWidget } from '../../components/dashboard/AnnouncementsWidget';
import { PerformanceWidget } from '../../components/dashboard/PerformanceWidget';
import { TrainingWidget } from '../../components/dashboard/TrainingWidget';
import { ChatsWidget } from '../../components/dashboard/ChatsWidget';
import { EmailsWidget } from '../../components/dashboard/EmailsWidget';
import { DocumentsWidget } from '../../components/dashboard/DocumentsWidget';
import { NotificationsWidget } from '../../components/dashboard/NotificationsWidget';
import { GlassPanel } from '../../components/ui/GlassPanel';
import { EmployeePageLayout } from '../../components/EmployeePageLayout';
import * as mock from '../../data/mockData';
import type { DashboardStat } from '../../types';

const calendarEvents = [
  { id: 'ce-1', title: 'Daily Standup', date: 'Today', time: '10:00 AM', type: 'meeting' as const, color: '#8b5cf6' },
  { id: 'ce-2', title: 'Sprint Review', date: 'Today', time: '2:00 PM', type: 'meeting' as const, color: '#8b5cf6' },
  { id: 'ce-3', title: '1:1 with Rajesh', date: 'Today', time: '4:30 PM', type: 'meeting' as const, color: '#8b5cf6' },
  { id: 'ce-4', title: 'Project Deadline', date: 'Tomorrow', time: 'EOD', type: 'deadline' as const, color: '#ef4444' },
  { id: 'ce-5', title: 'Team Outing', date: 'Fri', time: '6:00 PM', type: 'personal' as const, color: '#10b981' },
];

const announcements = [
  { id: 'an-1', title: 'Q3 Townhall Scheduled', body: 'Quarterly all-hands meeting on Friday 3 PM in the main auditorium. CEO will present roadmap updates.', date: '2h ago', author: 'CEO Office', priority: 'high' as const },
  { id: 'an-2', title: 'New Learning Platform Live', body: 'Access 200+ courses on the new LMS. Mandatory compliance training due by end of month.', date: '1d ago', author: 'L&D Team', priority: 'normal' as const },
  { id: 'an-3', title: 'Diwali Celebration', body: 'Festive celebrations on Oct 31st. Cultural programs, games, and dinner. RSVP by Oct 25.', date: '2d ago', author: 'HR', priority: 'normal' as const },
  { id: 'an-4', title: 'Security Drill Notice', body: 'Scheduled security drill on Nov 5th. Follow evacuation protocols when警报 sounds.', date: '3d ago', author: 'Security', priority: 'high' as const },
];

const trainingCourses = [
  { id: 'tc-1', title: 'Advanced TypeScript Patterns', progress: 75, category: 'Engineering', dueDate: '2026-08-15' },
  { id: 'tc-2', title: 'AWS Solutions Architect', progress: 45, category: 'Cloud', dueDate: '2026-09-01' },
  { id: 'tc-3', title: 'Leadership Essentials', progress: 20, category: 'Soft Skills', dueDate: '2026-10-01' },
  { id: 'tc-4', title: 'Data Privacy & Compliance', progress: 90, category: 'Compliance', dueDate: '2026-07-30' },
];

const chatConversations = [
  { id: 'ch-1', user: 'Ananya Sharma', avatar: '#8b5cf6', lastMessage: 'PR is ready for review', time: '5m ago', unread: 2, online: true },
  { id: 'ch-2', user: 'Arjun Patel', avatar: '#3b82f6', lastMessage: 'Sprint velocity looks good', time: '15m ago', unread: 0, online: true },
  { id: 'ch-3', user: 'Kavitha Reddy', avatar: '#10b981', lastMessage: 'Can you review the test plan?', time: '1h ago', unread: 1, online: false },
  { id: 'ch-4', user: 'Rajesh Kumar', avatar: '#f59e0b', lastMessage: 'Meeting at 4:30 PM', time: '2h ago', unread: 0, online: true },
];

const emailList = [
  { id: 'em-1', from: 'Ananya Sharma', subject: 'RE: Employee Dashboard Code Review', preview: 'The changes look good overall. Just a few comments on the...', time: '10m ago', starred: true, unread: true },
  { id: 'em-2', from: 'Rajesh Kumar', subject: 'Sprint 8 Retrospective Notes', preview: 'Please review the retrospective document before tomorrow\'s...', time: '1h ago', starred: false, unread: true },
  { id: 'em-3', from: 'HR Department', subject: 'Mandatory Compliance Training', preview: 'All employees must complete the data privacy training by...', time: '3h ago', starred: false, unread: false },
  { id: 'em-4', from: 'Priya Menon', subject: 'Performance Review Schedule', preview: 'Your mid-year performance review is scheduled for next...', time: '1d ago', starred: true, unread: false },
];

const documentList = [
  { id: 'doc-1', name: 'Sprint_8_Report.pdf', type: 'PDF', size: '2.4 MB', updatedAt: 'Today', sharedBy: 'Ananya Sharma' },
  { id: 'doc-2', name: 'Employee_Dashboard_Design.fig', type: 'Figma', size: '12 MB', updatedAt: 'Yesterday', sharedBy: 'Design Team' },
  { id: 'doc-3', name: 'Q3_Roadmap.pptx', type: 'PPT', size: '5.1 MB', updatedAt: '2d ago', sharedBy: 'Rajesh Kumar' },
  { id: 'doc-4', name: 'Architecture_Overview.drawio', type: 'Drawio', size: '840 KB', updatedAt: '3d ago', sharedBy: 'Tech Lead' },
];

const performanceTrend = [
  { month: 'Jan', score: 82 },
  { month: 'Feb', score: 85 },
  { month: 'Mar', score: 88 },
  { month: 'Apr', score: 91 },
  { month: 'May', score: 94 },
];

export function HomeDashboard() {
  const navigate = useNavigate();
  const { activeTab, setActiveTab } = useEmployeeStore();
  const { notificationList } = useNotificationStore();
  const { session, clockIn, clockOut, startBreak } = useAttendanceStore();

  const widgetNotifications = useMemo(() =>
    notificationList.slice(0, 5).map(n => ({
      id: n.id,
      title: n.title,
      message: n.message,
      time: new Date(n.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: (n.priority === 'high' ? 'warning' : n.priority === 'low' ? 'success' : 'info') as 'info' | 'warning' | 'success' | 'error',
      read: n.isRead,
    })),
    [notificationList]
  );

  const sessionTimeText = session.isActive
    ? `${String(Math.floor(session.workedMinutes / 60)).padStart(2, '0')}h ${String(session.workedMinutes % 60).padStart(2, '0')}m`
    : '--h --m';

  const handleNavigate = (route: string) => {
    setActiveTab(route.replace('/employee/', ''));
    navigate(route);
  };

  const stats: DashboardStat[] = [
    { id: 's1', label: 'Attendance Rate', value: '97.2%', change: 2.1, trend: 'up', icon: 'clock', color: '#3b82f6', bgColor: '#eff6ff' },
    { id: 's2', label: 'Weekly Hours', value: '42h', change: -1.5, trend: 'down', icon: 'timer', color: '#f59e0b', bgColor: '#fef3c7' },
    { id: 's3', label: 'Leave Balance', value: '14 days', change: 0, trend: 'neutral', icon: 'calendar', color: '#10b981', bgColor: '#ecfdf5' },
    { id: 's4', label: 'Productivity', value: '94.2%', change: 3.8, trend: 'up', icon: 'chart', color: '#8b5cf6', bgColor: '#f5f3ff' },
    { id: 's5', label: 'Tasks Completed', value: '24', change: 12.5, trend: 'up', icon: 'tasks', color: '#06b6d4', bgColor: '#ecfeff' },
    { id: 's6', label: 'Sprint Progress', value: '68%', change: 5.2, trend: 'up', icon: 'target', color: '#ef4444', bgColor: '#fef2f2' },
  ];

  const isClockedIn = session.isActive;

  const quickActions = [
    { label: isClockedIn ? 'Clock Out' : 'Clock In', icon: Clock, color: isClockedIn ? 'text-red-500 bg-red-50 dark:bg-red-500/10' : 'text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10', onClick: () => isClockedIn ? clockOut() : clockIn() },
    { label: 'Apply Leave', icon: CalendarPlus, color: 'text-blue-500 bg-blue-50 dark:bg-blue-500/10', onClick: () => handleNavigate('/employee/leave') },
    { label: 'Create Task', icon: ListTodo, color: 'text-purple-500 bg-purple-50 dark:bg-purple-500/10', onClick: () => handleNavigate('/employee/tasks') },
    { label: 'Open Chat', icon: Zap, color: 'text-amber-500 bg-amber-50 dark:bg-amber-500/10', onClick: () => handleNavigate('/employee/chat') },
    { label: 'Schedule Meeting', icon: Video, color: 'text-cyan-500 bg-cyan-50 dark:bg-cyan-500/10', onClick: () => {} },
    { label: 'Compose Mail', icon: Mail, color: 'text-sky-500 bg-sky-50 dark:bg-sky-500/10', onClick: () => handleNavigate('/employee/email') },
    { label: 'Upload Document', icon: Upload, color: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-500/10', onClick: () => handleNavigate('/employee/documents') },
    { label: 'Start Timer', icon: Timer, color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10', onClick: () => startBreak('lunch') },
    { label: 'Raise Ticket', icon: Ticket, color: 'text-rose-500 bg-rose-50 dark:bg-rose-500/10', onClick: () => {} },
  ];

  return (
    <EmployeePageLayout
      title="Dashboard"
      description="Your personal workspace overview — track productivity, attendance, and team updates at a glance."
      breadcrumbs={[{ label: 'Employee', href: '/employee/dashboard' }, { label: 'Dashboard' }]}
      actions={
        <div className="flex items-center gap-2">
          <button className="p-2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors border border-slate-200 dark:border-slate-700 shadow-sm bg-white dark:bg-slate-900">
            <Filter className="w-4 h-4" />
          </button>
          <button className="p-2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors border border-slate-200 dark:border-slate-700 shadow-sm bg-white dark:bg-slate-900">
            <Download className="w-4 h-4" />
          </button>
          <button className="p-2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors border border-slate-200 dark:border-slate-700 shadow-sm bg-white dark:bg-slate-900">
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      }
    >
      <WelcomeHero user={mock.currentEmployee} sessionTimeText={sessionTimeText} performanceScore={94} />

      <MetricsGrid stats={stats} />

      <GlassPanel padding="sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Quick Actions</h3>
          <span className="text-[10px] text-slate-400 font-semibold">Instant action launchpad</span>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2">
          {quickActions.map(action => (
            <button
              key={action.label}
              onClick={action.onClick}
              className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group cursor-pointer"
            >
              <div className={`w-10 h-10 rounded-xl ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm`}>
                <action.icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 text-center leading-tight">{action.label}</span>
            </button>
          ))}
        </div>
      </GlassPanel>

      <WidgetGrid
        tasks={mock.tasks}
        sprint={mock.currentSprint}
        meetings={mock.upcomingMeetings}
        insights={mock.aiInsights}
        activities={mock.activityTimeline}
        weeklyProductivity={mock.weeklyProductivity}
        onNavigate={(tab) => handleNavigate(`/employee/${tab}`)}
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CalendarWidget events={calendarEvents} />
            <AnnouncementsWidget announcements={announcements} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ChatsWidget chats={chatConversations} />
            <EmailsWidget emails={emailList} />
          </div>
        </div>
        <div className="space-y-6">
          <NotificationsWidget notifications={widgetNotifications} />
          <TrainingWidget courses={trainingCourses} />
          <PerformanceWidget score={94} trend={performanceTrend} feedback="Excellent performance this quarter. Consistently exceeding targets." departmentAvg={82} />
          <DocumentsWidget documents={documentList} />
        </div>
      </div>
    </EmployeePageLayout>
  );
}

export default HomeDashboard;
