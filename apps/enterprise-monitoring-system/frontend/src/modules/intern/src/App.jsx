import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';

// View Imports
import DashboardView from './Page/DashboardView';
import ProfileView from './Page/ProfileView';
import TasksView from './Page/TasksView';
import ProjectsView from './Page/ProjectsView';
import LearningView from './Page/LearningView';
import EvaluationsView from './Page/EvaluationsView';
import TeamView from './Page/TeamView';
import ChatView from './Page/ChatView';
import AIView from './Page/AIView';
import AttendanceView from './Page/AttendanceView';
import SettingsView from './Page/SettingsView';
import AdminView from './Page/AdminView';

export default function App() {
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = () => {
    setLoggingOut(true);
    setTimeout(() => {
      localStorage.removeItem('worksphere-token');
      window.location.reload();
    }, 2000);
  };

  // Load theme preference on load
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const isDark = savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Shared Tasks State
  const [tasks, setTasks] = useState([
    { id: '1', title: 'Research competitor onboarding flows', desc: 'Analyze 3 main competitors and document their user journey for new interns.', priority: 'Low Priority', date: 'Oct 24', assignee: 'Sarah Anderson', column: 'backlog', progress: 0 },
    { id: '2', title: 'Define API endpoints for user profiles', desc: 'Draft technical specs for the new intern profile data structure.', priority: 'High Priority', date: 'Oct 18', assignee: 'Marcus Chen', column: 'backlog', progress: 0 },
    { id: '3', title: 'Design System Review', desc: 'Audit current component library against new Sahara guidelines.', priority: 'Medium Priority', date: 'Oct 20', assignee: 'Elena Rostova', column: 'todo', progress: 0 },
    { id: '4', title: 'Implement TopAppBar navigation logic', desc: 'Ensure responsive pivot between desktop and mobile views per spec.', priority: 'High Priority', date: 'Oct 19', assignee: 'Elena Rostova', column: 'progress', progress: 45 },
    { id: '5', title: 'Update typography tokens in Figma', desc: 'Waiting for final sign-off from lead designer.', priority: 'Medium Priority', date: 'Oct 17', assignee: 'Marcus Chen', column: 'review', progress: 90 },
    { id: '6', title: 'Setup local dev environment', desc: 'Install npm packages and run dev server.', priority: 'Low Priority', date: 'Oct 15', assignee: 'Elena Rostova', column: 'completed', progress: 100 }
  ]);

  // Shared Chat Messages State
  const [chatMessages, setChatMessages] = useState([
    { id: '1', sender: 'Elena Rodriguez', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCubxEbkgIFI637_kuLmDXjbEOv2Wk1boffOYVi2FRT2kzJZUfAOAjSBcXxKKR5ISTPx1MPPksIKygzFIJc1cgrDgRFvDHBJpPNaLorpXy094kmT9A62jg4ey4-wYlw2KB8FfaAF-ntTNW5SCCuGwQR-4sIlmzC52h9ozP29zE5z65soLkhhPiVZKjhQbavOIe8fqjXDSdDXzH5aq9FQ0B0V_SCZm8pU_k4ci_GA310KHf8VOz8k78mvjNQnzrzjc5zYQjZeNHETQ', time: '10:42 AM', content: "Hi everyone! I've just updated the typography tokens in the Figma file. The headings now use EB Garamond and we've tightened the letter spacing slightly for a more editorial feel. Could someone review before we merge?" },
    { id: '2', sender: 'Figma Bot', avatar: null, time: '10:43 AM', isSystem: true, content: 'pushed a new update to Design System v2.4' },
    { id: '3', sender: 'You', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAB22TfSAV7mFlI_Ct5Up3f4eXCStfQq_YjzXKB4cKsKh4IpZwEgsFNPtR2nYme2l2BNt41_bo0h9bfRXwM0dlZGKWUmFtz61u75J7Uz8Z2MQjE7iGEIFp8CSMfVEr3_CKvQ1-GM3nkfI_vtkbi4CvvAWUkQOf7gsfTvuk9vx5nVcaFOv0DThAy7ggFM2WTtfaKRc95H60K8xCAtwdpFNcT_h2eFp3QiIFjGMb2nXl3thwwUmkL1AgVWCuC66u2zzsfzLK8T6QHDPs', time: '10:45 AM', content: "Looking great, Elena. The serif pairing really elevates the warmth we're going for. I've also attached the latest draft for the intern onboarding flow utilizing these new tokens." },
    { id: '4', sender: 'Sarah Anderson', avatar: null, time: '10:50 AM', isInitial: 'SA', content: "Awesome. Let's do a quick sync at 11 to finalize." }
  ]);

  // Shared AI Messages State
  const [aiMessages, setAiMessages] = useState([
    { id: '1', sender: 'AI Coding Helper', time: 'Online', content: "Hello! I'm your AI Coding Helper. I see you're working on the 'User Authentication' module for the main portal. Would you like me to review the recent changes in authUtils.js or suggest some unit tests?" },
    { id: '2', sender: 'You', time: '10:15 AM', content: 'Yes, please generate Jest tests for the new login token validation function.' },
    { id: '3', sender: 'AI Coding Helper', time: '10:16 AM', isCode: true, content: "describe('validateLoginToken', () => {\n  it('should return true for a valid, unexpired token', () => {\n    const validToken = generateMockToken({ expiresIn: '1h' });\n    expect(validateLoginToken(validToken)).toBe(true);\n  });\n\n  it('should return false for an expired token', () => {\n    const expiredToken = generateMockToken({ expiresIn: '-1h' });\n    expect(validateLoginToken(expiredToken)).toBe(false);\n  });\n});" }
  ]);

  const renderView = () => {
    switch (currentTab) {
      case 'dashboard':
        return <DashboardView setCurrentTab={setCurrentTab} tasks={tasks} />;
      case 'profile':
        return <ProfileView />;
      case 'tasks':
        return <TasksView tasks={tasks} setTasks={setTasks} />;
      case 'projects':
        return <ProjectsView />;
      case 'learning':
        return <LearningView />;
      case 'evaluations':
        return <EvaluationsView />;
      case 'team':
        return <TeamView setCurrentTab={setCurrentTab} />;
      case 'chat':
        return <ChatView messages={chatMessages} setMessages={setChatMessages} />;
      case 'ai':
        return <AIView messages={aiMessages} setMessages={setAiMessages} />;
      case 'attendance':
        return <AttendanceView />;
      case 'settings':
        return (
          <SettingsView 
            activeSection="settings" 
            darkMode={darkMode} 
            setDarkMode={setDarkMode} 
            onLogout={handleLogout} 
          />
        );
      case 'notifications':
        return (
          <SettingsView 
            activeSection="notifications" 
            darkMode={darkMode} 
            setDarkMode={setDarkMode} 
            onLogout={handleLogout} 
          />
        );
      case 'admin':
        return <AdminView />;
      default:
        return <DashboardView setCurrentTab={setCurrentTab} tasks={tasks} />;
    }
  };

  return (
    <>
      <Layout 
        currentTab={currentTab} 
        setCurrentTab={setCurrentTab} 
        darkMode={darkMode} 
        setDarkMode={setDarkMode}
        onLogout={handleLogout}
        sidebarCollapsed={sidebarCollapsed}
        onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
      >
        {renderView()}
      </Layout>

      {/* Fullscreen Premium Logout Loader Overlay */}
      {loggingOut && (
        <div className="fixed inset-0 bg-background/90 dark:bg-on-secondary-fixed/90 backdrop-blur-md z-[100] flex flex-col items-center justify-center transition-all duration-500">
          <div className="flex flex-col items-center text-center max-w-sm px-6 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-6 animate-bounce">
              <span className="material-symbols-outlined text-3xl">logout</span>
            </div>
            <h2 className="font-headline text-3xl font-bold text-on-surface dark:text-surface-bright mb-2">Signing Out</h2>
            <p className="font-body text-sm text-on-surface-variant dark:text-secondary-fixed-dim leading-relaxed">
              Securely logging you out of your Sahara session. Redirecting in a moment...
            </p>
            <div className="mt-8 flex items-center gap-1.5 justify-center">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse delay-100"></div>
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse delay-200"></div>
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse delay-300"></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
