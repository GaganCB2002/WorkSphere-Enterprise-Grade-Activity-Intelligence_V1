import React, { useState, useEffect } from 'react';
import { useAttendanceStore, useTaskStore } from '../store/employeeStore';
import { WelcomeHero } from '../components/dashboard/WelcomeHero';
import { MetricsGrid } from '../components/dashboard/MetricsGrid';
import { QuickActions } from '../components/dashboard/QuickActions';
import { WidgetGrid } from '../components/dashboard/WidgetGrid';
import * as mock from '../data/mockData';
import type { User } from '../../../types';

interface DashboardPageProps {
  user: User;
  onNavigate: (tab: string) => void;
}

export function DashboardPage({ user, onNavigate }: DashboardPageProps) {
  const { session, clockIn, clockOut } = useAttendanceStore();
  const { taskList } = useTaskStore();
  const [elapsedMinutes, setElapsedMinutes] = useState(session.workedMinutes);

  // Sync elapsed minutes when store session workedMinutes changes
  useEffect(() => {
    setElapsedMinutes(session.workedMinutes);
  }, [session.workedMinutes]);

  // Live timer simulation for active session
  useEffect(() => {
    let interval: any;
    if (session.isActive) {
      interval = setInterval(() => {
        setElapsedMinutes(prev => prev + 1);
      }, 60000); // update every minute
    }
    return () => clearInterval(interval);
  }, [session.isActive]);

  const formatHours = (totalMinutes: number) => {
    const hrs = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;
    return `${hrs}h ${mins.toString().padStart(2, '0')}m`;
  };

  const handleClockToggle = () => {
    if (session.isActive) {
      clockOut();
    } else {
      clockIn();
    }
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Welcome Hero */}
      <WelcomeHero
        user={user}
        sessionTimeText={session.isActive ? formatHours(elapsedMinutes) : '00h 00m'}
        performanceScore={94.2}
      />

      {/* Metrics Grid */}
      <MetricsGrid stats={mock.dashboardStats} />

      {/* Quick Actions */}
      <QuickActions
        onNavigate={onNavigate}
        isClockedIn={session.isActive}
        onClockToggle={handleClockToggle}
        onStartTimer={() => onNavigate('attendance')}
      />

      {/* Widget Grid with active tasks and Recharts visualizations */}
      <WidgetGrid
        tasks={taskList}
        sprint={mock.currentSprint}
        meetings={mock.upcomingMeetings}
        insights={mock.aiInsights}
        activities={mock.activityTimeline}
        weeklyProductivity={mock.weeklyProductivity}
        onNavigate={onNavigate}
      />
    </div>
  );
}

export default DashboardPage;

