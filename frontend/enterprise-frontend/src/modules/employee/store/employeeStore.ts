// ─────────────────────────────────────────────────────────────
// Employee Module — Zustand State Store (Global Mock Store)
// ─────────────────────────────────────────────────────────────

import { useState, useEffect, useCallback } from 'react';
import type * as T from '../types';
import * as mock from '../data/mockData';

// --- Shared Global State Storage ---
let globalActiveTab = 'dashboard';
let globalSidebarCollapsed = false;
let globalCommandPaletteOpen = false;
let globalIsDark = localStorage.getItem('theme') === 'dark';
const employeeListeners = new Set<() => void>();
const notifyEmployee = () => employeeListeners.forEach(l => l());

export const useEmployeeStore = () => {
  const [activeTab, setActiveTabState] = useState(globalActiveTab);
  const [sidebarCollapsed, setSidebarCollapsedState] = useState(globalSidebarCollapsed);
  const [commandPaletteOpen, setCommandPaletteOpenState] = useState(globalCommandPaletteOpen);
  const [isDark, setIsDarkState] = useState(globalIsDark);

  useEffect(() => {
    const l = () => {
      setActiveTabState(globalActiveTab);
      setSidebarCollapsedState(globalSidebarCollapsed);
      setCommandPaletteOpenState(globalCommandPaletteOpen);
      setIsDarkState(globalIsDark);
    };
    employeeListeners.add(l);
    return () => { employeeListeners.delete(l); };
  }, []);

  const setActiveTab = useCallback((tab: string) => {
    globalActiveTab = tab;
    notifyEmployee();
  }, []);

  const setSidebarCollapsed = useCallback((collapsed: boolean) => {
    globalSidebarCollapsed = collapsed;
    notifyEmployee();
  }, []);

  const setCommandPaletteOpen = useCallback((open: boolean) => {
    globalCommandPaletteOpen = open;
    notifyEmployee();
  }, []);

  const toggleSidebar = useCallback(() => {
    globalSidebarCollapsed = !globalSidebarCollapsed;
    notifyEmployee();
  }, []);

  const toggleTheme = useCallback(() => {
    globalIsDark = !globalIsDark;
    localStorage.setItem('theme', globalIsDark ? 'dark' : 'light');
    if (globalIsDark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
    notifyEmployee();
  }, []);

  return {
    activeTab, setActiveTab,
    sidebarCollapsed, setSidebarCollapsed, toggleSidebar,
    commandPaletteOpen, setCommandPaletteOpen,
    isDark, toggleTheme,
  };
};

// ── Leave Store ─────────────────────────────────────────────
let globalLeaveRequests = [...mock.leaveHistory];
let globalLeaveBalances = [...mock.leaveBalances];
const leaveListeners = new Set<() => void>();
const notifyLeave = () => leaveListeners.forEach(l => l());

export const useLeaveStore = () => {
  const [leaveRequests, setLeaveRequests] = useState<T.LeaveRequest[]>(globalLeaveRequests);
  const [leaveBalances, setLeaveBalances] = useState<T.LeaveBalance[]>(globalLeaveBalances);

  useEffect(() => {
    const l = () => {
      setLeaveRequests(globalLeaveRequests);
      setLeaveBalances(globalLeaveBalances);
    };
    leaveListeners.add(l);
    return () => { leaveListeners.delete(l); };
  }, []);

  const addLeaveRequest = useCallback((request: T.LeaveRequest) => {
    globalLeaveRequests = [request, ...globalLeaveRequests];
    // Deduct leave balance accordingly
    globalLeaveBalances = globalLeaveBalances.map(bal => {
      if (bal.type === request.type) {
        return {
          ...bal,
          pending: bal.pending + request.totalDays,
          remaining: bal.remaining - request.totalDays,
        };
      }
      return bal;
    });
    notifyLeave();
  }, []);

  const cancelLeaveRequest = useCallback((id: string) => {
    const req = globalLeaveRequests.find(r => r.id === id);
    globalLeaveRequests = globalLeaveRequests.map(r => r.id === id ? { ...r, status: 'cancelled' as const } : r);
    if (req && req.status === 'pending') {
      // Revert leave balance
      globalLeaveBalances = globalLeaveBalances.map(bal => {
        if (bal.type === req.type) {
          return {
            ...bal,
            pending: Math.max(0, bal.pending - req.totalDays),
            remaining: bal.remaining + req.totalDays,
          };
        }
        return bal;
      });
    }
    notifyLeave();
  }, []);

  return { leaveRequests, leaveBalances, addLeaveRequest, cancelLeaveRequest };
};

// ── Task Store ──────────────────────────────────────────────
let globalTaskList = [...mock.tasks];
const taskListeners = new Set<() => void>();
const notifyTasks = () => taskListeners.forEach(l => l());

export const useTaskStore = () => {
  const [taskList, setTaskList] = useState<T.Task[]>(globalTaskList);

  useEffect(() => {
    const l = () => setTaskList(globalTaskList);
    taskListeners.add(l);
    return () => { taskListeners.delete(l); };
  }, []);

  const updateTaskStatus = useCallback((taskId: string, status: T.TaskStatus) => {
    globalTaskList = globalTaskList.map(t =>
      t.id === taskId ? { ...t, status, updatedAt: new Date().toISOString() } : t
    );
    notifyTasks();
  }, []);

  const updateTaskProgress = useCallback((taskId: string, progress: number) => {
    globalTaskList = globalTaskList.map(t =>
      t.id === taskId ? { ...t, progress, status: progress === 100 ? 'done' as const : t.status } : t
    );
    notifyTasks();
  }, []);

  const addTask = useCallback((task: T.Task) => {
    globalTaskList = [task, ...globalTaskList];
    notifyTasks();
  }, []);

  const addComment = useCallback((taskId: string, comment: T.TaskComment) => {
    globalTaskList = globalTaskList.map(t =>
      t.id === taskId ? { ...t, comments: [...t.comments, comment] } : t
    );
    notifyTasks();
  }, []);

  return { taskList, updateTaskStatus, updateTaskProgress, addTask, addComment };
};

// ── Notification Store ──────────────────────────────────────
let globalNotifications = [...mock.notifications];
const notificationListeners = new Set<() => void>();
const notifyNotifications = () => notificationListeners.forEach(l => l());

export const useNotificationStore = () => {
  const [notificationList, setNotificationList] = useState<T.Notification[]>(globalNotifications);

  useEffect(() => {
    const l = () => setNotificationList(globalNotifications);
    notificationListeners.add(l);
    return () => { notificationListeners.delete(l); };
  }, []);

  const markAsRead = useCallback((id: string) => {
    globalNotifications = globalNotifications.map(n => n.id === id ? { ...n, isRead: true } : n);
    notifyNotifications();
  }, []);

  const markAllRead = useCallback(() => {
    globalNotifications = globalNotifications.map(n => ({ ...n, isRead: true }));
    notifyNotifications();
  }, []);

  const addNotification = useCallback((n: T.Notification) => {
    globalNotifications = [n, ...globalNotifications];
    notifyNotifications();
  }, []);

  const unreadCount = notificationList.filter(n => !n.isRead).length;

  return { notificationList, markAsRead, markAllRead, addNotification, unreadCount };
};

// ── Chat Store ──────────────────────────────────────────────
let globalChannels = [...mock.chatChannels];
let globalMessages = [...mock.chatMessages];
let globalActiveChannel = 'ch-general';
const chatListeners = new Set<() => void>();
const notifyChat = () => chatListeners.forEach(l => l());

export const useChatStore = () => {
  const [channels, setChannels] = useState<T.ChatChannel[]>(globalChannels);
  const [messages, setMessages] = useState<T.ChatMessage[]>(globalMessages);
  const [activeChannel, setActiveChannelState] = useState<string>(globalActiveChannel);

  useEffect(() => {
    const l = () => {
      setChannels(globalChannels);
      setMessages(globalMessages);
      setActiveChannelState(globalActiveChannel);
    };
    chatListeners.add(l);
    return () => { chatListeners.delete(l); };
  }, []);

  const setActiveChannel = useCallback((channelId: string) => {
    globalActiveChannel = channelId;
    // Clear unread count for this channel
    globalChannels = globalChannels.map(ch =>
      ch.id === channelId ? { ...ch, unreadCount: 0 } : ch
    );
    notifyChat();
  }, []);

  const sendMessage = useCallback((content: string, channelId: string) => {
    const msg: T.ChatMessage = {
      id: `m-${Date.now()}`,
      channelId,
      senderId: 'emp-100',
      senderName: 'Gagan Chaudhary',
      content,
      type: 'text',
      timestamp: new Date().toISOString(),
      isMe: true,
    };
    globalMessages = [...globalMessages, msg];
    // Update channel last message
    globalChannels = globalChannels.map(ch =>
      ch.id === channelId ? { ...ch, lastMessage: msg } : ch
    );
    notifyChat();
  }, []);

  const totalUnread = channels.reduce((sum, ch) => sum + ch.unreadCount, 0);

  return { channels, messages, activeChannel, setActiveChannel, sendMessage, totalUnread };
};

// ── Attendance Store ────────────────────────────────────────
let globalSession = { ...mock.currentSession };
let globalRecords = [...mock.attendanceRecords];
const attendanceListeners = new Set<() => void>();
const notifyAttendance = () => attendanceListeners.forEach(l => l());

export const useAttendanceStore = () => {
  const [session, setSession] = useState<T.ClockSession>(globalSession);
  const [records, setRecords] = useState<T.AttendanceRecord[]>(globalRecords);

  useEffect(() => {
    const l = () => {
      setSession(globalSession);
      setRecords(globalRecords);
    };
    attendanceListeners.add(l);
    return () => { attendanceListeners.delete(l); };
  }, []);

  const clockIn = useCallback(() => {
    globalSession = {
      id: `session-${Date.now()}`,
      clockIn: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      workedMinutes: 0,
      breakMinutes: 0,
      isActive: true,
      breaks: [],
    };
    notifyAttendance();
  }, []);

  const clockOut = useCallback(() => {
    const endTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    globalSession = {
      ...globalSession,
      isActive: false,
      clockOut: endTime,
    };
    
    // Add record to the logs
    const today = new Date().toISOString().split('T')[0];
    const hours = Math.round((globalSession.workedMinutes / 60) * 10) / 10;
    const newRecord: T.AttendanceRecord = {
      date: today,
      status: 'present',
      clockIn: globalSession.clockIn,
      clockOut: endTime,
      workedHours: hours || 8.0,
      breakMinutes: globalSession.breakMinutes,
      overtimeMinutes: hours > 8 ? Math.round((hours - 8) * 60) : 0,
      isLate: false,
      lateMinutes: 0,
      productivity: 92,
    };
    
    // Replace today's record if it exists, otherwise prepend
    const existsIdx = globalRecords.findIndex(r => r.date === today);
    if (existsIdx >= 0) {
      globalRecords[existsIdx] = newRecord;
    } else {
      globalRecords = [newRecord, ...globalRecords];
    }

    notifyAttendance();
  }, []);

  const startBreak = useCallback((type: T.BreakEntry['type']) => {
    const brk: T.BreakEntry = {
      id: `brk-${Date.now()}`,
      startedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      durationMinutes: 0,
      type,
    };
    globalSession = {
      ...globalSession,
      breaks: [...globalSession.breaks, brk],
    };
    notifyAttendance();
  }, []);

  const endBreak = useCallback(() => {
    const endedTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const addedBreakMinutes = 15; // default estimation

    globalSession = {
      ...globalSession,
      breakMinutes: globalSession.breakMinutes + addedBreakMinutes,
      breaks: globalSession.breaks.map((b, i) =>
        i === globalSession.breaks.length - 1 && !b.endedAt
          ? { ...b, endedAt: endedTime, durationMinutes: addedBreakMinutes }
          : b
      ),
    };
    notifyAttendance();
  }, []);

  const updateSessionWorkedMinutes = useCallback((mins: number) => {
    globalSession = {
      ...globalSession,
      workedMinutes: mins,
    };
    notifyAttendance();
  }, []);

  return { session, records, clockIn, clockOut, startBreak, endBreak, updateSessionWorkedMinutes };
};
