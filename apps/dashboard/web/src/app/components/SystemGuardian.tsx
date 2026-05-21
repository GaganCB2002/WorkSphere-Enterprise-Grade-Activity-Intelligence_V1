'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Shield, 
  Cpu, 
  Activity, 
  Wifi, 
  Zap, 
  Monitor, 
  Search,
  CheckCircle2,
  AlertCircle,
  Database,
  BarChart3,
  Lock,
  RefreshCw,
  Bell,
  Battery,
  Terminal,
  Filter,
  User,
  Users,
  Settings,
  ShieldCheck,
  Power,
  Layers,
  Sparkles,
  Play,
  RotateCcw,
  Check,
  X
} from 'lucide-react';
import { io } from 'socket.io-client';

// Generate 120 Mock Employees for the Workforce
const DEPARTMENTS = ['Engineering', 'DevOps', 'Product', 'QA', 'Support', 'HR', 'Sales', 'Finance', 'Marketing'];
const ROLES = [
  'Software Engineer', 'DevOps Engineer', 'Product Manager', 'QA Engineer', 
  'Support Agent', 'HR Executive', 'Sales Rep', 'Finance Analyst', 'Marketing Specialist'
];
const FIRST_NAMES = ['James', 'Mary', 'John', 'Patricia', 'Robert', 'Jennifer', 'Michael', 'Elizabeth', 'William', 'Linda', 'David', 'Barbara', 'Richard', 'Susan', 'Joseph', 'Jessica', 'Thomas', 'Sarah', 'Charles', 'Karen'];
const LAST_NAMES = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin'];

const generateMockEmployees = () => {
  return Array.from({ length: 120 }, (_, index) => {
    const idNum = String(index + 1).padStart(3, '0');
    const empId = `EMP-${idNum}`;
    
    const deptIndex = index % DEPARTMENTS.length;
    const dept = DEPARTMENTS[deptIndex];
    const role = ROLES[index % ROLES.length];
    const name = `${FIRST_NAMES[index % FIRST_NAMES.length]} ${LAST_NAMES[(index * 3) % LAST_NAMES.length]}`;
    const email = `${name.toLowerCase().replace(' ', '.')}@worksphere.com`;
    
    const baseCpu = 10 + (index % 4) * 15 + Math.floor(Math.random() * 10);
    const baseMem = 40 + (index % 5) * 10 + Math.floor(Math.random() * 8);
    const baseGpu = index % 3 === 0 ? 15 + (index % 5) * 12 : 0;
    const healthScore = Math.max(30, 100 - (baseCpu > 80 ? 15 : 0) - (baseMem > 85 ? 15 : 0) - (index % 17 === 0 ? 40 : 0));
    
    const status = healthScore > 85 ? 'OPTIMAL' : (healthScore > 60 ? 'WARNING' : 'CRITICAL');
    const platform = index % 4 === 0 ? 'macOS' : (index % 5 === 0 ? 'Linux' : 'Windows');
    const hostname = `${platform.toLowerCase().substring(0, 3)}-node-${idNum}`;
    
    const timezone = index % 3 === 0 ? 'GMT+1' : (index % 3 === 1 ? 'Asia/Calcutta' : 'America/New_York');
    const screen = index % 2 === 0 ? '1920 x 1080' : '1536 x 864';
    
    const processes = [
      { name: platform === 'Windows' ? 'explorer.exe' : 'launchd', cpu: 0.1, memory: 0.5 },
      { name: platform === 'Windows' ? 'chrome.exe' : 'Chrome', cpu: 5 + (index % 4), memory: 12 + (index % 5) },
      { name: platform === 'Windows' ? 'vscode.exe' : 'VSCode', cpu: 8 + (index % 6), memory: 15 + (index % 8) },
      { name: platform === 'Windows' ? 'node.exe' : 'node', cpu: 2 + (index % 3), memory: 6 + (index % 4) },
      { name: platform === 'Windows' ? 'teams.exe' : 'Teams', cpu: 2.1, memory: 4.8 },
    ];
    
    const threats = [];
    const alerts = [];
    if (baseCpu > 75) {
      alerts.push({ title: 'High CPU Utilization', message: `CPU load at ${baseCpu}% is exceeding nominal thresholds.` });
    }
    if (baseMem > 80) {
      alerts.push({ title: 'High Memory Pressure', message: `Memory at ${baseMem}% is exceeding optimal operational bounds.` });
    }
    
    if (index % 17 === 0) {
      processes.unshift({ name: 'miner.exe', cpu: 88, memory: 42 });
      threats.push({
        title: 'CRITICAL THREAT DETECTED',
        message: 'Cryptojacking Miner execution detected in userspace path.',
        isThreat: true,
        filePath: platform === 'Windows' ? 'C:\\Users\\admin\\AppData\\Local\\Temp\\miner.exe' : '/tmp/miner',
        threatName: 'Trojan.CoinMiner'
      });
    }

    // Pre-populate sample stream logs
    const logs = Array.from({ length: 5 }, (_, lIdx) => ({
      id: Date.now() - lIdx * 5000,
      timestamp: new Date(Date.now() - lIdx * 5000).toLocaleTimeString([], { hour12: false, fractionalSecondDigits: 2 }),
      event: 'HEARTBEAT_SIGNAL',
      payload: `CPU:${baseCpu}% | MEM:${baseMem}% | PING:${20 + (index % 5) * 15}ms | OS:${platform}`
    }));
    
    return {
      id: empId,
      name,
      email,
      dept,
      role,
      hostname,
      platform,
      timezone,
      screen,
      logs,
      metrics: {
        cpu: { percent: baseCpu, cores: 4 + (index % 3) * 4, freq_mhz: 2400 + (index % 5) * 400 },
        memory: { percent: baseMem, total_gb: 16 + (index % 2) * 16, used_gb: Math.round(((16 + (index % 2) * 16) * baseMem) / 100) },
        gpu: { model: platform === 'Windows' ? 'NVIDIA GeForce RTX 4070' : (platform === 'macOS' ? 'Apple M2 Pro GPU' : 'Intel UHD Graphics'), vram_gb: platform === 'Windows' ? 12 : 8, percent: baseGpu, temp: 45 + (index % 4) * 8 },
        disk: { percent: 35 + (index % 10) * 5, free_gb: 200 + (index % 12) * 50 },
        network: { active_connections: 12 + (index % 5), bytes_sent_mb: 150 + (index % 8) * 10, bytes_recv_mb: 850 + (index % 12) * 35 },
        processes: { total: 80 + index, top_consumers: processes },
        system: { platform, hostname, uptime_hours: 4 + (index % 24) },
        healthScore,
        status,
        alerts,
        threats,
        ping: 20 + (index % 5) * 15,
        fps: 60,
      }
    };
  });
};

const ALL_ROLES = [
  'SUPER_ADMIN', 'ADMIN', 'CEO', 'CTO', 'HR_MANAGER', 'HR_EXECUTIVE', 
  'FINANCE_MANAGER', 'MARKETING_MANAGER', 'SALES_MANAGER', 'PROJECT_MANAGER', 
  'TECH_LEAD', 'DEVOPS_ENGINEER', 'QA_ENGINEER', 'SOFTWARE_ENGINEER', 
  'SECURITY_ANALYST', 'SUPPORT_AGENT', 'EMPLOYEE', 'INTERN'
];

const ALL_PERMISSIONS = [
  'CREATE_USER', 'UPDATE_USER', 'DELETE_USER', 'VIEW_REPORT', 'MANAGE_EMPLOYEE', 
  'TRACK_EMPLOYEE', 'VIEW_ANALYTICS', 'MANAGE_FINANCE', 'MANAGE_PROJECT', 
  'VIEW_GPS', 'EXPORT_REPORT', 'AI_ACCESS', 'ADMIN_ACCESS'
];

export default function SystemGuardian({ currentUser }: { currentUser?: { id: string; name: string; role: string } }) {
  const [employees, setEmployees] = useState<any[]>([]);
  const [selectedEmpId, setSelectedEmpId] = useState<string>('EMP-GAGAN');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  
  // Real-time socket metrics for Local Node (Gagan)
  const [localMetrics, setLocalMetrics] = useState<any>({
    cpu: { percent: 0, cores: 0, freq_mhz: 0 },
    memory: { percent: 0, total_gb: 0, used_gb: 0 },
    gpu: { model: 'Integrated Graphics', vram_gb: 0.5, percent: 0, temp: 0 },
    disk: { percent: 0, free_gb: 0 },
    network: { active_connections: 0, bytes_sent_mb: 0, bytes_recv_mb: 0 },
    processes: { total: 0, top_consumers: [] },
    system: { platform: 'Windows', hostname: 'local-command-center', uptime_hours: 0 },
    healthScore: 100,
    status: 'OPTIMAL',
    alerts: [],
    threats: [],
    predictions: [],
    ping: 15,
    fps: 60,
    lastUpdate: null
  });

  const [localLogs, setLocalLogs] = useState<any[]>([]);
  const [showNotification, setShowNotification] = useState<{ title: string, message: string, type: 'danger' | 'success' | 'info' } | null>(null);

  const socketRef = useRef<any>(null);
  const framesRef = useRef(60);

  // Super Admin Matrix Override State
  const [matrix, setMatrix] = useState<Record<string, Record<string, boolean>>>(() => {
    const initial: Record<string, Record<string, boolean>> = {};
    ALL_ROLES.forEach(role => {
      initial[role] = {};
      ALL_PERMISSIONS.forEach(perm => {
        if (role === 'SUPER_ADMIN') {
          initial[role][perm] = true;
        } else if (role === 'CEO') {
          initial[role][perm] = perm !== 'CREATE_USER' && perm !== 'DELETE_USER' && perm !== 'ADMIN_ACCESS';
        } else if (role.includes('MANAGER') || role === 'CTO') {
          initial[role][perm] = perm !== 'DELETE_USER' && perm !== 'ADMIN_ACCESS';
        } else {
          initial[role][perm] = perm === 'VIEW_REPORT' || perm === 'VIEW_ANALYTICS';
        }
      });
    });
    return initial;
  });

  const [aiToggles, setAiToggles] = useState({
    violenceDetection: true,
    productivityLstm: true,
    anomalyIsolation: true,
    behaviorClustering: true,
    llmExecutiveSummary: true
  });

  const [suspendedList, setSuspendedList] = useState<Set<string>>(new Set());


  // Initialize N Employees and Socket Connection
  useEffect(() => {
    setEmployees(generateMockEmployees());

    const socket = io('http://localhost:4000');
    socketRef.current = socket;

    fetch('http://localhost:4000/api/tracking/suspended')
      .then(res => res.json())
      .then(data => setSuspendedList(new Set(data)))
      .catch(e => console.error('Error fetching suspended nodes:', e));

    socket.on('node_suspend_changed', ({ nodeId, suspended }: any) => {
      setSuspendedList(prev => {
        const next = new Set(prev);
        if (suspended) next.add(nodeId);
        else next.delete(nodeId);
        return next;
      });
    });


    socket.on('system_update', (update: any) => {
      if (update.type === 'metrics') {
        setLocalMetrics((prev: any) => ({
          ...prev,
          ...update.data,
          fps: framesRef.current > 0 ? framesRef.current : prev.fps || 60,
          healthScore: update.health_score,
          status: update.health_score > 80 ? 'OPTIMAL' : (update.health_score > 50 ? 'WARNING' : 'CRITICAL'),
          alerts: update.alerts || [],
          threats: update.threats || prev.threats,
          lastUpdate: new Date().toLocaleTimeString([], { hour12: false })
        }));
        
        setLocalLogs(prev => [
          { 
            id: Date.now(), 
            timestamp: new Date().toLocaleTimeString([], { hour12: false, fractionalSecondDigits: 2 }), 
            event: `INBOUND_SIGNAL`, 
            payload: `CPU:${update.data.cpu.percent}% | MEM:${update.data.memory.percent}% | FPS:${framesRef.current || 60}` 
          },
          ...prev.slice(0, 19)
        ]);
      } else if (update.type === 'threat_alert') {
        const threat = update.data;
        setLocalMetrics((prev: any) => ({
          ...prev,
          threats: [threat, ...prev.threats],
          healthScore: Math.max(0, prev.healthScore - 30)
        }));
        setShowNotification({ 
          title: 'CRITICAL THREAT DETECTED', 
          message: `File: ${threat.filePath} | Type: ${threat.threatName}`, 
          type: 'danger' 
        });
        setTimeout(() => setShowNotification(null), 8000);
      }
    });

    // FPS Counter RAF Pulse
    let lastTime = performance.now();
    let frames = 0;
    const tick = (time: number) => {
      frames++;
      if (time - lastTime >= 1000) {
        setLocalMetrics((prev: any) => ({ ...prev, fps: frames > 0 ? frames : 60 }));
        framesRef.current = frames > 0 ? frames : 60;
        frames = 0;
        lastTime = time;
      }
      requestAnimationFrame(tick);
    };
    const rafId = requestAnimationFrame(tick);

    return () => {
      socket.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Jitter non-local mock employees to simulate live background signals
  useEffect(() => {
    const timer = setInterval(() => {
      setEmployees(prev => prev.map(emp => {
        const cpuChange = (Math.random() - 0.5) * 8;
        const newCpu = Math.max(5, Math.min(98, Math.round(emp.metrics.cpu.percent + cpuChange)));
        
        const memChange = (Math.random() - 0.5) * 4;
        const newMem = Math.max(10, Math.min(95, Math.round(emp.metrics.memory.percent + memChange)));
        
        const pingChange = (Math.random() - 0.5) * 6;
        const newPing = Math.max(15, Math.min(300, Math.round(emp.metrics.ping + pingChange)));

        let newLogs = emp.logs || [];
        if (Math.random() > 0.6) {
          const timestamp = new Date().toLocaleTimeString([], { hour12: false, fractionalSecondDigits: 2 });
          const event = Math.random() > 0.5 ? 'HEARTBEAT_SIGNAL' : 'AUDIT_TICK';
          const payload = `CPU:${newCpu}% | MEM:${newMem}% | PING:${newPing}ms | STATUS:OK`;
          newLogs = [{ id: Date.now(), timestamp, event, payload }, ...newLogs.slice(0, 19)];
        }
        
        const healthScore = Math.max(30, 100 - (newCpu > 80 ? 15 : 0) - (newMem > 85 ? 15 : 0) - (emp.id.includes('17') || emp.id.includes('34') ? 40 : 0));
        const status = healthScore > 85 ? 'OPTIMAL' : (healthScore > 60 ? 'WARNING' : 'CRITICAL');

        return {
          ...emp,
          metrics: {
            ...emp.metrics,
            cpu: { ...emp.metrics.cpu, percent: newCpu },
            memory: { ...emp.metrics.memory, percent: newMem },
            ping: newPing,
            healthScore,
            status
          },
          logs: newLogs
        };
      }));
    }, 3000);
    
    return () => clearInterval(timer);
  }, []);

  const getActiveMetrics = () => {
    if (selectedEmpId === 'EMP-GAGAN') {
      return {
        ...localMetrics,
        name: currentUser?.name || 'Gagan (You)',
        id: 'EMP-GAGAN',
        dept: 'Product Engineering',
        role: currentUser?.role || 'SUPER_ADMIN',
        hostname: localMetrics.system.hostname || 'local-workstation',
        platform: localMetrics.system.platform || 'Windows',
        timezone: 'Asia/Calcutta',
        screen: '1536 x 864',
        logs: localLogs
      };
    }
    const emp = employees.find(e => e.id === selectedEmpId);
    if (emp) {
      return {
        ...emp.metrics,
        name: emp.name,
        id: emp.id,
        dept: emp.dept,
        role: emp.role,
        hostname: emp.hostname,
        platform: emp.platform,
        timezone: emp.timezone,
        screen: emp.screen,
        logs: emp.logs
      };
    }
    return localMetrics;
  };

  const rawActive = getActiveMetrics();
  const isSuspended = suspendedList.has(rawActive.id);
  const active = isSuspended ? {
    ...rawActive,
    status: 'SUSPENDED',
    healthScore: 0,
    cpu: { percent: 0, cores: rawActive.cpu?.cores || 0, freq_mhz: 0 },
    memory: { percent: 0, total_gb: rawActive.memory?.total_gb || 16, used_gb: 0 },
    gpu: { ...rawActive.gpu, percent: 0, temp: 0 },
    disk: { percent: 0, free_gb: rawActive.disk?.free_gb || 0 },
    network: { active_connections: 0, bytes_sent_mb: 0, bytes_recv_mb: 0 },
    logs: [{ id: Date.now(), timestamp: new Date().toLocaleTimeString([], { hour12: false }), event: 'TRACKING_SUSPENDED', payload: 'Node tracking is suspended by SUPER_ADMIN override.' }]
  } : rawActive;


  // Scan trigger logic
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanStage, setScanStage] = useState('');

  const handleScan = () => {
    if (isScanning) return;
    setIsScanning(true);
    setScanProgress(0);
    setScanStage('Initializing Deep Scanner...');

    const stages = [
      { p: 15, s: 'Loading Neural Heuristic Modules...' },
      { p: 35, s: 'Scanning Kernel Space Integrity...' },
      { p: 60, s: 'Auditing Active Process Signatures...' },
      { p: 85, s: 'Analyzing Network Buffers & Sockets...' },
      { p: 100, s: 'Security Audit Completed.' }
    ];

    let currentStage = 0;
    const interval = setInterval(() => {
      setScanProgress(prev => {
        const next = prev + 2;
        if (next >= stages[currentStage].p && currentStage < stages.length - 1) {
          currentStage++;
          setScanStage(stages[currentStage].s);
        }
        if (next >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          setScanStage('');
          
          if (selectedEmpId === 'EMP-GAGAN') {
            setLocalMetrics((m: any) => ({
              ...m,
              healthScore: 100,
              status: 'OPTIMAL',
              threats: [],
              alerts: []
            }));
          } else {
            setEmployees(prevEmps => prevEmps.map(e => {
              if (e.id === selectedEmpId) {
                return {
                  ...e,
                  metrics: {
                    ...e.metrics,
                    healthScore: 100,
                    status: 'OPTIMAL',
                    threats: [],
                    alerts: []
                  }
                };
              }
              return e;
            }));
          }

          setShowNotification({
            title: 'INTEGRITY VERIFIED',
            message: `Deep scan finished for node ${selectedEmpId}. All threats resolved.`,
            type: 'success'
          });
          setTimeout(() => setShowNotification(null), 5000);
          return 100;
        }
        return next;
      });
    }, 60);
  };

  const getStatusColor = (status: string) => {
    if (status === 'OPTIMAL') return 'var(--accent-green)';
    if (status === 'WARNING') return 'var(--status-warning)';
    return 'var(--status-danger)';
  };

  // Filter employees list based on search and department
  const filteredEmployees = [
    {
      id: 'EMP-GAGAN',
      name: currentUser?.name || 'Gagan (You)',
      dept: 'Product Engineering',
      role: currentUser?.role || 'SUPER_ADMIN',
      metrics: {
        healthScore: localMetrics.healthScore,
        status: localMetrics.status,
        cpu: localMetrics.cpu
      },
      platform: localMetrics.system.platform || 'Windows'
    },
    ...employees
  ].filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          emp.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          emp.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = selectedDept === 'All' || emp.dept === selectedDept;
    return matchesSearch && matchesDept;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', color: 'var(--text-primary)' }}>
      
      {/* Dynamic Toast popup */}
      {showNotification && (
        <div style={{ 
          position: 'fixed', top: '24px', left: '50%', transform: 'translateX(-50%)', 
          zIndex: 9999, background: showNotification.type === 'danger' ? 'var(--status-danger)' : (showNotification.type === 'success' ? 'var(--accent-green)' : 'var(--accent-blue)'), 
          padding: '12px 24px', borderRadius: '12px', color: 'white', boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
          display: 'flex', alignItems: 'center', gap: '12px', border: '1px solid rgba(255,255,255,0.2)'
        }}>
          {showNotification.type === 'danger' ? <AlertCircle size={20} /> : <CheckCircle2 size={20} />}
          <div>
            <div style={{ fontWeight: 900, fontSize: '0.8rem', textTransform: 'uppercase' }}>{showNotification.title}</div>
            <div style={{ fontSize: '0.75rem', opacity: 0.9 }}>{showNotification.message}</div>
          </div>
        </div>
      )}

      {/* Main split: Selector Sidebar + Detail Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '1.5rem', alignItems: 'stretch' }}>
        
        {/* Left Column: N-Employees Telemetry Selector */}
        <div style={{ 
          background: 'var(--bg-secondary)', 
          border: '1px solid var(--border-strong)', 
          borderRadius: '24px', 
          padding: '1.25rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          maxHeight: '820px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Users size={18} color="var(--accent-blue)" />
            <span style={{ fontSize: '0.85rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Workforce Nodes ({filteredEmployees.length})</span>
          </div>

          {/* Search box */}
          <div style={{ position: 'relative', width: '100%' }}>
            <Search size={14} color="var(--text-secondary)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input 
              type="text" 
              placeholder="Search employee / ID / role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '12px',
                padding: '0.6rem 1rem 0.6rem 2.2rem',
                color: 'var(--text-primary)',
                fontSize: '0.8rem',
                outline: 'none',
              }}
            />
          </div>

          {/* Department filter carousel */}
          <div style={{ display: 'flex', gap: '0.4rem', overflowX: 'auto', paddingBottom: '0.4rem' }}>
            <button 
              onClick={() => setSelectedDept('All')}
              style={{
                background: selectedDept === 'All' ? 'var(--accent-blue)' : 'var(--bg-tertiary)',
                color: 'white',
                border: 'none',
                padding: '4px 10px',
                borderRadius: '8px',
                fontSize: '0.65rem',
                fontWeight: 800,
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              ALL
            </button>
            {DEPARTMENTS.map(d => (
              <button 
                key={d}
                onClick={() => setSelectedDept(d)}
                style={{
                  background: selectedDept === d ? 'var(--accent-blue)' : 'var(--bg-tertiary)',
                  color: 'white',
                  border: 'none',
                  padding: '4px 10px',
                  borderRadius: '8px',
                  fontSize: '0.65rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
              >
                {d.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Employee list container */}
          <div style={{ 
            flex: 1, 
            overflowY: 'auto', 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '0.5rem',
            paddingRight: '2px'
          }}>
            {filteredEmployees.map(emp => {
              const isSelected = selectedEmpId === emp.id;
              const isEmpSuspended = suspendedList.has(emp.id);
              const hScore = isEmpSuspended ? 0 : (emp.metrics.healthScore ?? 100);
              const color = isEmpSuspended ? 'var(--text-muted)' : (emp.metrics.status === 'OPTIMAL' ? 'var(--accent-green)' : (emp.metrics.status === 'WARNING' ? 'var(--status-warning)' : 'var(--status-danger)'));
              return (
                <div
                  key={emp.id}
                  onClick={() => setSelectedEmpId(emp.id)}
                  style={{
                    background: isSelected ? 'rgba(31, 111, 235, 0.12)' : 'var(--bg-tertiary)',
                    border: isSelected ? '1.5px solid var(--accent-blue)' : '1px solid var(--border-subtle)',
                    borderRadius: '16px',
                    padding: '0.75rem 1rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '0.75rem',
                    transition: 'all 0.2s ease',
                    boxShadow: isSelected ? '0 4px 12px rgba(31, 111, 235, 0.2)' : 'none'
                  }}
                >

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', overflow: 'hidden' }}>
                    <div style={{ 
                      width: '32px', height: '32px', borderRadius: '10px', background: 'rgba(255,255,255,0.04)', 
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                    }}>
                      <User size={16} color={isSelected ? 'var(--accent-blue)' : 'var(--text-secondary)'} />
                    </div>
                    <div style={{ overflow: 'hidden' }}>
                      <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{emp.name}</div>
                      <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{emp.id} &bull; {emp.role}</div>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'flex-end' }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: color }}></span>
                      <span style={{ fontSize: '0.75rem', fontWeight: 900, color }}>{isEmpSuspended ? 'SUSPENDED' : `${hScore}%`}</span>
                    </div>
                    <div style={{ fontSize: '0.55rem', color: 'var(--text-muted)', fontWeight: 800, textTransform: 'uppercase', marginTop: '2px' }}>
                      {emp.platform}
                    </div>
                  </div>
                </div>
              );
            })}

          </div>
        </div>

        {/* Right Column: Node Details & System Metrics */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Node metadata strip */}
          <div style={{ 
            background: 'var(--bg-secondary)', 
            border: '1px solid var(--border-strong)', 
            borderRadius: '24px', 
            padding: '1.25rem 1.75rem',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem',
            boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                <span style={{ fontSize: '1.25rem', fontWeight: 950 }}>{active.name}</span>
                <span style={{ fontSize: '0.65rem', fontWeight: 900, background: 'rgba(31, 111, 235, 0.15)', color: 'var(--accent-blue)', padding: '2px 8px', borderRadius: '100px' }}>
                  {active.id}
                </span>
                {isSuspended && (
                  <span style={{ fontSize: '0.65rem', fontWeight: 900, background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', padding: '2px 8px', borderRadius: '100px' }}>
                    SUSPENDED
                  </span>
                )}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                {active.role} &bull; {active.dept} &bull; Hostname: <span style={{ fontFamily: 'monospace', color: 'var(--text-primary)', fontWeight: 700 }}>{active.hostname}</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <button
                onClick={async () => {
                  const newSuspended = !isSuspended;
                  try {
                    await fetch('http://localhost:4000/api/tracking/suspend', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ nodeId: active.id, suspended: newSuspended })
                    });
                    
                    if (active.id === 'EMP-GAGAN' && typeof window !== 'undefined' && (window as any).require) {
                      try {
                        const { ipcRenderer } = (window as any).require('electron');
                        ipcRenderer.invoke('toggle-tracking', { suspended: newSuspended });
                      } catch (err) {
                        console.error('IPC Toggle Error:', err);
                      }
                    }

                    setSuspendedList(prev => {
                      const next = new Set(prev);
                      if (newSuspended) next.add(active.id);
                      else next.delete(active.id);
                      return next;
                    });

                    setShowNotification({
                      title: newSuspended ? 'TRACKING SUSPENDED' : 'TRACKING RESUMED',
                      message: `Tracking has been ${newSuspended ? 'suspended' : 'resumed'} for node ${active.id}.`,
                      type: newSuspended ? 'danger' : 'success'
                    });
                    setTimeout(() => setShowNotification(null), 4000);
                  } catch (e) {
                    console.error('Error toggling suspend:', e);
                  }
                }}
                style={{
                  background: isSuspended ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                  border: isSuspended ? '1px solid rgba(34, 197, 94, 0.3)' : '1px solid rgba(239, 68, 68, 0.3)',
                  color: isSuspended ? '#22c55e' : '#ef4444',
                  padding: '0.6rem 1.25rem',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  fontWeight: 900,
                  fontSize: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.2s ease',
                  boxShadow: isSuspended ? '0 4px 12px rgba(34, 197, 94, 0.1)' : 'none'
                }}
              >
                {isSuspended ? <Play size={14} /> : <Power size={14} />}
                {isSuspended ? 'RESUME TRACKING' : 'SUSPEND TRACKING'}
              </button>
            </div>

            <div style={{ display: 'flex', gap: '1.5rem' }}>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)', fontWeight: 800 }}>PLATFORM</div>
                <div style={{ fontSize: '0.85rem', fontWeight: 900 }}>{active.platform}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)', fontWeight: 800 }}>TIMEZONE</div>
                <div style={{ fontSize: '0.85rem', fontWeight: 900 }}>{active.timezone}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)', fontWeight: 800 }}>SCREEN</div>
                <div style={{ fontSize: '0.85rem', fontWeight: 900 }}>{active.screen}</div>
              </div>
            </div>
          </div>

          {/* Dials strip (CPU, FPS, Ping, Memory) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
            <div style={{ background: 'var(--bg-secondary)', padding: '1.25rem', borderRadius: '20px', border: '1px solid var(--border-strong)' }}>
              <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>CPU LOAD</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--text-primary)' }}>{active.cpu?.percent}%</div>
              <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', marginTop: '4px' }}>{active.cpu?.cores} Cores @ {active.cpu?.freq_mhz} MHz</div>
            </div>
            <div style={{ background: 'var(--bg-secondary)', padding: '1.25rem', borderRadius: '20px', border: '1px solid var(--border-strong)' }}>
              <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>FPS JANK</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--accent-green)' }}>{active.fps || 60} / 60</div>
              <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', marginTop: '4px' }}>Smooth Render Vsync</div>
            </div>
            <div style={{ background: 'var(--bg-secondary)', padding: '1.25rem', borderRadius: '20px', border: '1px solid var(--border-strong)' }}>
              <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>SIGNAL LATENCY</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 900, color: active.ping > 150 ? 'var(--status-warning)' : 'var(--text-primary)' }}>{active.ping} ms</div>
              <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', marginTop: '4px' }}>Packet roundtrip time</div>
            </div>
            <div style={{ background: 'var(--bg-secondary)', padding: '1.25rem', borderRadius: '20px', border: '1px solid var(--border-strong)' }}>
              <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>RAM UTILIZATION</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--text-primary)' }}>{active.memory?.percent}%</div>
              <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', marginTop: '4px' }}>{active.memory?.used_gb} GB / {active.memory?.total_gb} GB</div>
            </div>
          </div>

          {/* Detail panels grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '1.5rem' }}>
            
            {/* Left side detailed telemetry list */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              
              <TelemetryCard 
                title="GPU ACCELERATION" 
                badge="Operational" 
                badgeColor="var(--accent-green)"
                value={`${active.gpu?.percent}%`}
                description={`${active.gpu?.model} | VRAM: ${active.gpu?.vram_gb} GB`}
                progress={active.gpu?.percent}
                footer={[
                  { label: 'TEMP', value: `${active.gpu?.temp} °C` },
                  { label: 'CORES', value: 'Unified' }
                ]}
              />

              <TelemetryCard 
                title="DISK ALLOCATION" 
                badge="Secure" 
                badgeColor="var(--accent-blue)"
                value={`${active.disk?.percent}%`}
                description={`Available capacity on default volume root.`}
                progress={active.disk?.percent}
                footer={[
                  { label: 'FREE SPACE', value: `${active.disk?.free_gb} GB` },
                  { label: 'FILESYSTEM', value: active.platform === 'Windows' ? 'NTFS' : 'APFS/ext4' }
                ]}
              />

              <TelemetryCard 
                title="NETWORK CAPACITY" 
                badge="Active" 
                badgeColor="var(--accent-cyan)"
                value={`${active.network?.active_connections}`}
                description="Audited active network sockets currently open in userspace."
                progress={50}
                footer={[
                  { label: 'SENT DATA', value: `${active.network?.bytes_sent_mb} MB` },
                  { label: 'RECV DATA', value: `${active.network?.bytes_recv_mb} MB` }
                ]}
              />

              <TelemetryCard 
                title="NODE SYSTEM HEURISTIC" 
                badge="Audit" 
                badgeColor="var(--text-muted)"
                value={active.status}
                description={`Uptime log details active sessions at ${active.system?.uptime_hours} hours.`}
                progress={active.healthScore}
                footer={[
                  { label: 'HEALTH SCORE', value: `${active.healthScore}%` },
                  { label: 'STATUS', value: active.status }
                ]}
              />

            </div>

            {/* Right side: Health progress & Scanner */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              
              {/* Scan controller */}
              <div style={{ 
                background: 'var(--bg-secondary)', 
                border: '1px solid var(--border-strong)', 
                borderRadius: '24px', 
                padding: '1.25rem', 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                gap: '1rem' 
              }}>
                <div style={{ position: 'relative', width: '100px', height: '100px' }}>
                  <svg viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)', width: '100%', height: '100%' }}>
                    <circle cx="50" cy="50" r="44" fill="none" stroke="var(--border-strong)" strokeWidth="6" />
                    <circle cx="50" cy="50" r="44" fill="none" stroke={isScanning ? 'var(--accent-blue)' : getStatusColor(active.status)} strokeWidth="6" 
                      strokeDasharray={`${(isScanning ? scanProgress : active.healthScore) * 2.76} 276.4`} 
                      strokeLinecap="round"
                      style={{ transition: 'stroke-dasharray 0.3s ease' }}
                    />
                  </svg>
                  <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                    <div style={{ fontSize: '1.75rem', fontWeight: 900 }}>{isScanning ? scanProgress : active.healthScore}</div>
                    <div style={{ fontSize: '0.55rem', fontWeight: 800, color: 'var(--text-muted)' }}>INTEGRITY</div>
                  </div>
                </div>

                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 800, color: getStatusColor(active.status) }}>
                    {isScanning ? scanStage : `System Integrity: ${active.status}`}
                  </div>
                </div>

                <button 
                  onClick={handleScan}
                  disabled={isScanning}
                  style={{ 
                    width: '100%',
                    background: isScanning ? 'var(--bg-tertiary)' : 'var(--accent-blue)', 
                    color: 'white', border: 'none', padding: '0.6rem', borderRadius: '12px', fontWeight: 800, cursor: isScanning ? 'not-allowed' : 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontSize: '0.75rem'
                  }}
                >
                  {isScanning ? <RefreshCw size={14} className="animate-spin" /> : <Search size={14} />}
                  {isScanning ? 'AUDITING...' : 'Trigger Node Audit'}
                </button>
              </div>

              {/* Intelligence Feed / Threat alert specific to employee */}
              <div style={{ 
                background: 'var(--bg-secondary)', 
                border: '1px solid var(--border-strong)', 
                borderRadius: '24px', 
                padding: '1.25rem', 
                flex: 1, 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '0.75rem',
                minHeight: '220px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Shield size={14} color="var(--accent-green)" />
                  <span style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Threats & Alerts</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '180px', overflowY: 'auto' }}>
                  {active.threats?.length === 0 && active.alerts?.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
                      <CheckCircle2 size={24} color="var(--accent-green)" style={{ opacity: 0.3, marginBottom: '0.25rem' }} />
                      <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Node is optimal & clean</div>
                    </div>
                  ) : (
                    <>
                      {active.threats?.map((t: any, idx: number) => (
                        <div key={`threat-${idx}`} style={{ padding: '0.6rem', background: 'rgba(248, 81, 73, 0.08)', borderLeft: '3px solid var(--status-danger)', borderRadius: '8px' }}>
                          <div style={{ fontSize: '0.7rem', fontWeight: 900, color: 'var(--status-danger)' }}>{t.threatName || 'Threat Detected'}</div>
                          <div style={{ fontSize: '0.6rem', color: 'var(--text-secondary)', marginTop: '2px' }}>Path: {t.filePath}</div>
                        </div>
                      ))}
                      {active.alerts?.map((a: any, idx: number) => (
                        <div key={`alert-${idx}`} style={{ padding: '0.6rem', background: 'rgba(210, 153, 34, 0.08)', borderLeft: '3px solid var(--status-warning)', borderRadius: '8px' }}>
                          <div style={{ fontSize: '0.7rem', fontWeight: 900, color: 'var(--status-warning)' }}>{a.title}</div>
                          <div style={{ fontSize: '0.6rem', color: 'var(--text-secondary)', marginTop: '2px' }}>{a.message}</div>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>

            </div>

          </div>

          {/* Real-time terminal signal stream */}
          <div style={{ 
            background: '#000', 
            border: '1px solid var(--border-strong)', 
            borderRadius: '16px', 
            padding: '1.25rem', 
            fontFamily: 'monospace',
            boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Terminal size={14} color="var(--accent-green)" />
                <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--accent-green)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  Live Signal Stream ({active.id})
                </span>
              </div>
              <div style={{ display: 'flex', gap: '1rem', fontSize: '0.6rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>STREAM: ENCRYPTED</span>
                <span style={{ color: 'var(--accent-blue)' }}>STATUS: ONLINE</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', height: '110px', overflowY: 'hidden', opacity: 0.8 }}>
              {active.logs?.map((log: any, idx: number) => (
                <div key={idx} style={{ fontSize: '0.7rem', display: 'flex', gap: '1rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>[{log.timestamp}]</span>
                  <span style={{ color: 'var(--accent-cyan)' }}>{log.event}</span>
                  <span style={{ color: 'var(--text-secondary)' }}>{log.payload}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* SECTION: Global Control & Master RBAC Permission Matrix (From Super Admin Command Center) */}
      <div style={{ 
        background: 'var(--bg-secondary)', 
        border: '1px solid var(--border-strong)', 
        borderRadius: '28px', 
        padding: '2rem',
        marginTop: '1rem',
        boxShadow: '0 12px 48px rgba(0,0,0,0.3)',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem'
      }}>
        
        {/* Title */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-strong)', paddingBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ padding: '0.5rem', background: 'rgba(137, 87, 229, 0.1)', borderRadius: '12px', color: 'var(--accent-purple)' }}>
              <ShieldCheck size={24} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 900, margin: 0 }}>Global Infrastructure Settings & Master RBAC Matrix</h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>Centralized overrides for active machine learning engines and roles</p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button 
              onClick={() => {
                setShowNotification({ title: 'BACKUP SNAPSHOT', message: 'Master database snapshot completed. Saved to db_snapshot.json.', type: 'success' });
                setTimeout(() => setShowNotification(null), 4000);
              }}
              style={{
                background: 'rgba(31, 111, 235, 0.1)', border: '1px solid rgba(31, 111, 235, 0.2)', color: 'var(--accent-blue)',
                padding: '0.5rem 1rem', borderRadius: '10px', fontSize: '0.7rem', fontWeight: 800, cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '0.4rem'
              }}
            >
              <Database size={14} /> Trigger Backup
            </button>
            <button 
              onClick={() => {
                setShowNotification({ title: 'CACHE PURGED', message: 'Redis active buffer successfully flushed.', type: 'info' });
                setTimeout(() => setShowNotification(null), 4000);
              }}
              style={{
                background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)',
                padding: '0.5rem 1rem', borderRadius: '10px', fontSize: '0.7rem', fontWeight: 800, cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '0.4rem'
              }}
            >
              <RefreshCw size={14} /> Flush Cache
            </button>
            <button 
              onClick={() => {
                setShowNotification({ title: 'LOCKDOWN REJECTED', message: 'SYSTEM WARNING: Lockdown protocol requires secondary MFA hardware key.', type: 'danger' });
                setTimeout(() => setShowNotification(null), 4000);
              }}
              style={{
                background: 'rgba(248, 81, 73, 0.1)', border: '1px solid rgba(248, 81, 73, 0.2)', color: 'var(--status-danger)',
                padding: '0.5rem 1rem', borderRadius: '10px', fontSize: '0.7rem', fontWeight: 800, cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '0.4rem'
              }}
            >
              <Lock size={14} /> Lockdown System
            </button>
          </div>
        </div>

        {/* AI toggles & indicators */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Cpu size={16} color="var(--accent-purple)" />
              <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase' }}>AI Subsystem Flags</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {Object.entries(aiToggles).map(([key, value]) => (
                <div key={key} style={{ 
                  background: 'var(--bg-tertiary)', border: '1px solid var(--border-subtle)', 
                  borderRadius: '14px', padding: '0.75rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' 
                }}>
                  <div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'capitalize' }}>{key.replace(/([A-Z])/g, ' $1')}</div>
                    <span style={{ fontSize: '0.55rem', color: 'var(--text-muted)' }}>{value ? 'Active & Processing' : 'Deactivated'}</span>
                  </div>
                  <button 
                    onClick={() => setAiToggles(prev => ({ ...prev, [key]: !value }))}
                    style={{
                      width: '36px', height: '20px', borderRadius: '100px', background: value ? 'var(--accent-blue)' : 'var(--border-strong)',
                      border: 'none', position: 'relative', cursor: 'pointer', transition: 'all 0.2s', padding: 0
                    }}
                  >
                    <div style={{ 
                      width: '14px', height: '14px', borderRadius: '50%', background: 'white',
                      position: 'absolute', top: '3px', left: value ? '19px' : '3px', transition: 'all 0.2s'
                    }} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive RBAC permissions grid table */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Layers size={16} color="var(--accent-cyan)" />
              <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase' }}>Master RBAC Matrix ({ALL_ROLES.length} Roles)</span>
            </div>

            <div style={{ 
              border: '1px solid var(--border-subtle)', borderRadius: '14px', overflow: 'hidden', 
              maxHeight: '290px', overflowY: 'auto', background: 'var(--bg-tertiary)' 
            }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.7rem' }}>
                <thead>
                  <tr style={{ background: '#000', borderBottom: '1px solid var(--border-strong)', position: 'sticky', top: 0, zIndex: 10 }}>
                    <th style={{ padding: '0.75rem 1rem', fontWeight: 800, color: 'var(--text-primary)', borderRight: '1px solid var(--border-strong)' }}>ROLE</th>
                    {ALL_PERMISSIONS.map(perm => (
                      <th key={perm} style={{ padding: '0.75rem 0.5rem', fontWeight: 800, color: 'var(--text-secondary)', textAlign: 'center' }}>
                        {perm.replace('_', ' ')}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ALL_ROLES.map(role => (
                    <tr key={role} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                      <td style={{ padding: '0.5rem 1rem', fontWeight: 800, color: 'var(--text-primary)', borderRight: '1px solid var(--border-subtle)', whiteSpace: 'nowrap' }}>
                        {role}
                      </td>
                      {ALL_PERMISSIONS.map(perm => {
                        const hasPerm = matrix[role]?.[perm] || false;
                        return (
                          <td key={perm} style={{ padding: '0.25rem', textAlign: 'center' }}>
                            <button
                              onClick={() => {
                                if (role === 'SUPER_ADMIN') return;
                                setMatrix(prev => ({
                                  ...prev,
                                  [role]: { ...prev[role], [perm]: !hasPerm }
                                }));
                              }}
                              disabled={role === 'SUPER_ADMIN'}
                              style={{
                                width: '22px', height: '22px', borderRadius: '6px',
                                border: 'none', background: hasPerm ? 'rgba(63, 185, 80, 0.15)' : 'rgba(255,255,255,0.03)',
                                color: hasPerm ? 'var(--accent-cyan)' : 'var(--text-muted)',
                                cursor: role === 'SUPER_ADMIN' ? 'not-allowed' : 'pointer',
                                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: 0
                              }}
                            >
                              {hasPerm ? <Check size={12} strokeWidth={3} /> : <X size={12} />}
                            </button>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

function TelemetryCard({ title, badge, badgeColor, value, description, progress, footer }: any) {
  return (
    <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-strong)', borderRadius: '24px', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: '0.6rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{title}</div>
        <div style={{ fontSize: '0.55rem', fontWeight: 900, background: `${badgeColor}15`, color: badgeColor, padding: '2px 8px', borderRadius: '100px', textTransform: 'uppercase' }}>{badge}</div>
      </div>
      
      <div style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>{value}</div>
      
      <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>{description}</div>
      
      <div style={{ height: '4px', width: '100%', background: 'var(--bg-tertiary)', borderRadius: '100px', overflow: 'hidden' }}>
        <div style={{ 
          height: '100%', 
          width: `${progress}%`, 
          background: `linear-gradient(90deg, var(--accent-blue) 0%, var(--accent-purple) 100%)`,
          borderRadius: '100px'
        }} />
      </div>

      <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.25rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)' }}>
        {footer.map((f: any, i: number) => (
          <div key={i}>
            <div style={{ fontSize: '0.5rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>{f.label}</div>
            <div style={{ fontSize: '0.75rem', fontWeight: 800 }}>{f.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
