// ============================================================================
// WorkSphere Enterprise-Grade Activity Intelligence
// Unified Service Integration Server (Express.js)
// ============================================================================

const express = require('express');
const http = require('http');
const cors = require('cors');
const jwt = require('jsonwebtoken');

// Secret for JWT Token Signing
const JWT_SECRET = process.env.JWT_SECRET || 'worksphere-enterprise-secret-key-2026';

// ----------------------------------------------------------------------------
// In-Memory Database Emulator (Pre-seeded with mock data)
// ----------------------------------------------------------------------------
const DB = {
  roles: [
    { id: 'ROLE-SA', name: 'SUPER_ADMIN', description: 'Total control override' },
    { id: 'ROLE-A', name: 'ADMIN', description: 'Administrative staff access' },
    { id: 'ROLE-E', name: 'EMPLOYEE', description: 'Standard workspace access' }
  ],
  users: [
    { id: 'USR-1', email: 'super_admin@worksphere.com', passwordHash: '$2b$10$mockhashSA', roleId: 'ROLE-SA', isActive: true },
    { id: 'USR-2', email: 'gagan@worksphere.com', passwordHash: '$2b$10$mockhashGagan', roleId: 'ROLE-SA', isActive: true },
    { id: 'USR-3', email: 'employee@worksphere.com', passwordHash: '$2b$10$mockhashEMP', roleId: 'ROLE-E', isActive: true }
  ],
  employees: [
    { id: 'EMP-GAGAN', userId: 'USR-2', code: 'WS-001', firstName: 'Gagan', lastName: 'Deep', phone: '+1234567890', departmentId: 'DEPT-ENG', designationId: 'DESG-SE', joiningDate: '2024-01-15', isFieldWorker: false },
    { id: 'EMP-002', userId: 'USR-3', code: 'WS-002', firstName: 'John', lastName: 'Doe', phone: '+1987654321', departmentId: 'DEPT-HR', designationId: 'DESG-HRE', joiningDate: '2024-06-01', isFieldWorker: true }
  ],
  departments: [
    { id: 'DEPT-ENG', name: 'Product Engineering', description: 'Software design & execution' },
    { id: 'DEPT-HR', name: 'Human Resources', description: 'Talent development and culture' }
  ],
  designations: [
    { id: 'DESG-SE', title: 'Senior Software Engineer', grade: 'E4' },
    { id: 'DESG-HRE', title: 'HR Executive', grade: 'E2' }
  ],
  attendanceLogs: [
    { id: 'ATT-1', employeeId: 'EMP-GAGAN', checkIn: '2026-05-19T09:02:15Z', checkOut: '2026-05-19T18:04:30Z', latitude: 37.7749, longitude: -122.4194, locationName: 'HQ Main Office', attendanceType: 'web', faceVerified: true, status: 'present' }
  ],
  gpsLogs: [],
  geofences: [
    { id: 'GEO-1', name: 'HQ Corporate Park', latitude: 37.7749, longitude: -122.4194, radiusMeters: 100 }
  ],
  projects: [
    { id: 'PRJ-1', name: 'Enterprise Portal Integration', clientName: 'WorkSphere Global Inc', budgetHours: 500 }
  ],
  tasks: [
    { id: 'TSK-1', projectId: 'PRJ-1', assignedEmployee: 'EMP-GAGAN', name: 'Refactor System Guardian component', status: 'done' },
    { id: 'TSK-2', projectId: 'PRJ-1', assignedEmployee: 'EMP-GAGAN', name: 'Optimize WebSockets payload delivery', status: 'in_progress' }
  ],
  timeEntries: [],
  shifts: [
    { id: 'SHF-1', name: 'General Shift', startTime: '09:00', endTime: '18:00', gracePeriodMinutes: 15 }
  ],
  employeeShifts: [
    { id: 'ES-1', employeeId: 'EMP-GAGAN', shiftId: 'SHF-1', effectiveDate: '2024-01-15', isActive: true }
  ],
  holidays: [
    { id: 'HOL-1', name: 'New Year Day', date: '2026-01-01' }
  ],
  salaryStructures: [
    { id: 'SS-1', employeeId: 'EMP-GAGAN', basicSalary: 8500, allowances: 1500, providentFund: 1000, taxRate: 15.00 },
    { id: 'SS-2', employeeId: 'EMP-002', basicSalary: 4500, allowances: 500, providentFund: 500, taxRate: 10.00 }
  ],
  payrolls: [],
  faceEmbeddings: [
    { id: 'FACE-1', employeeId: 'EMP-GAGAN', vector: '[0.12,-0.43,0.85,0.01]' }
  ],
  faceVerificationLogs: [],
  notifications: []
};

// Start Express Server
const app = express();
const server = http.createServer(app);

app.use(cors({ origin: '*' }));
app.use(express.json());

// ----------------------------------------------------------------------------
// Authentication Middleware
// ----------------------------------------------------------------------------
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) return res.status(403).json({ error: true, message: 'Invalid or expired auth token' });
      req.user = user;
      next();
    });
  } else {
    res.status(401).json({ error: true, message: 'Authorization header is missing' });
  }
};

// ----------------------------------------------------------------------------
// API Gateways & Endpoints
// ----------------------------------------------------------------------------

// 0. Base Console / Swagger landing
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>WorkSphere API Core</title>
        <style>
          body { font-family: -apple-system, sans-serif; background: #0f172a; color: #f8fafc; padding: 3rem; }
          h1 { color: #3b82f6; margin-bottom: 0.5rem; }
          .badge { background: #1e293b; color: #3b82f6; padding: 0.3rem 0.6rem; border-radius: 4px; font-size: 0.8rem; font-weight: bold; border: 1px solid #3b82f6; }
          pre { background: #1e293b; padding: 1.5rem; border-radius: 8px; overflow-x: auto; color: #10b981; }
        </style>
      </head>
      <body>
        <h1>WorkSphere API Integration Gateway</h1>
        <p>10 Unified Core Modules Booted successfully: <span class="badge">LIVE</span></p>
        <p>Service endpoint tests listening on port <code>5002</code>.</p>
        <h2>Status Matrix</h2>
        <pre>${JSON.stringify({
          database: 'Connected (Memory-Relational)',
          activeConnections: 1,
          seededRecords: {
            users: DB.users.length,
            employees: DB.employees.length,
            geofences: DB.geofences.length,
            salaryStructures: DB.salaryStructures.length
          }
        }, null, 2)}</pre>
      </body>
    </html>
  `);
});

// 1. Authentication Service
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = DB.users.find(u => u.email === email);
  if (!user) return res.status(400).json({ error: true, message: 'User profile not found' });
  
  const role = DB.roles.find(r => r.id === user.roleId);
  const employee = DB.employees.find(e => e.userId === user.id);

  // Issue Token
  const token = jwt.sign({
    id: user.id,
    email: user.email,
    role: role ? role.name : 'EMPLOYEE',
    employeeId: employee ? employee.id : null
  }, JWT_SECRET, { expiresIn: '8h' });

  // Record session
  DB.notifications.push({
    id: `NOT-${Date.now()}`,
    userId: user.id,
    title: 'Login Detected',
    message: `Account logged in from IP address at ${new Date().toISOString()}`,
    isRead: false,
    notificationType: 'system',
    createdAt: new Date().toISOString()
  });

  res.json({
    success: true,
    token,
    user: { id: user.id, email: user.email, role: role ? role.name : 'EMPLOYEE' }
  });
});

// 2. Employee Service
app.get('/api/employees', authenticateJWT, (req, res) => {
  const list = DB.employees.map(emp => {
    const user = DB.users.find(u => u.id === emp.userId);
    const dept = DB.departments.find(d => d.id === emp.departmentId);
    const desg = DB.designations.find(d => d.id === emp.designationId);
    return {
      ...emp,
      email: user ? user.email : '',
      department: dept ? dept.name : 'Unassigned',
      designation: desg ? desg.title : 'Unassigned'
    };
  });
  res.json(list);
});

// 3. Attendance Service
app.post('/api/attendance/checkin', authenticateJWT, (req, res) => {
  const { latitude, longitude, locationName, attendanceType, faceVerified } = req.body;
  const employeeId = req.user.employeeId || 'EMP-GAGAN';

  const newLog = {
    id: `ATT-${Date.now()}`,
    employeeId,
    checkIn: new Date().toISOString(),
    checkOut: null,
    latitude,
    longitude,
    locationName: locationName || 'WorkSphere Node Office',
    attendanceType: attendanceType || 'web',
    faceVerified: !!faceVerified,
    status: 'present'
  };

  DB.attendanceLogs.push(newLog);
  res.status(201).json({ success: true, log: newLog });
});

app.post('/api/attendance/checkout/:id', authenticateJWT, (req, res) => {
  const logId = req.params.id;
  const log = DB.attendanceLogs.find(l => l.id === logId);
  if (!log) return res.status(404).json({ error: true, message: 'Attendance session not found' });
  
  log.checkOut = new Date().toISOString();
  res.json({ success: true, log });
});

// 4. Time Tracking Service
app.post('/api/time/start', authenticateJWT, (req, res) => {
  const { projectId, taskId, description } = req.body;
  const employeeId = req.user.employeeId || 'EMP-GAGAN';

  const newEntry = {
    id: `TE-${Date.now()}`,
    employeeId,
    projectId,
    taskId,
    startTime: new Date().toISOString(),
    endTime: null,
    description: description || 'Active production session'
  };

  DB.timeEntries.push(newEntry);
  res.status(201).json({ success: true, entry: newEntry });
});

app.post('/api/time/stop/:id', authenticateJWT, (req, res) => {
  const entryId = req.params.id;
  const entry = DB.timeEntries.find(e => e.id === entryId);
  if (!entry) return res.status(404).json({ error: true, message: 'Active timer session not found' });
  
  entry.endTime = new Date().toISOString();
  const durMs = new Date(entry.endTime) - new Date(entry.startTime);
  entry.durationMinutes = Math.max(1, Math.round(durMs / (1000 * 60)));

  res.json({ success: true, entry });
});

// 5. Shift Management Service
app.get('/api/shifts/schedule/:employeeId', authenticateJWT, (req, res) => {
  const empId = req.params.employeeId;
  const empShift = DB.employeeShifts.find(s => s.employeeId === empId && s.isActive);
  if (!empShift) return res.status(404).json({ error: true, message: 'No shift assigned to employee' });
  
  const shiftDetails = DB.shifts.find(s => s.id === empShift.shiftId);
  res.json({ employeeId: empId, shift: shiftDetails, effectiveDate: empShift.effectiveDate });
});

// 6. Payroll Service
app.get('/api/payroll/calculate/:employeeId', authenticateJWT, (req, res) => {
  const empId = req.params.employeeId;
  const salaryStructure = DB.salaryStructures.find(ss => ss.employeeId === empId);
  if (!salaryStructure) return res.status(404).json({ error: true, message: 'No salary structure configured for this employee' });

  // Mock time inputs for salary calculation
  const totalWorkedMinutes = 9600; // ~160 hours
  const overtimeMinutes = 1200; // ~20 hours
  
  const hourlyRate = Number(salaryStructure.basicSalary) / 160;
  const overtimeAmount = (overtimeMinutes / 60) * (hourlyRate * 1.5);
  
  const gross = Number(salaryStructure.basicSalary) + Number(salaryStructure.allowances) + overtimeAmount;
  const deductions = Number(salaryStructure.providentFund) + (gross * (Number(salaryStructure.taxRate) / 100));
  const finalSalary = gross - deductions;

  res.json({
    employeeId: empId,
    calculationDetails: {
      basicSalary: salaryStructure.basicSalary,
      allowances: salaryStructure.allowances,
      overtimeAmount: parseFloat(overtimeAmount.toFixed(2)),
      deductions: parseFloat(deductions.toFixed(2)),
      finalSalary: parseFloat(finalSalary.toFixed(2))
    }
  });
});

// 7. Face Recognition Service (Biometric verification check)
app.post('/api/biometric/face/verify', (req, res) => {
  const { employeeId, imageBase64 } = req.body;
  if (!employeeId || !imageBase64) {
    return res.status(400).json({ error: true, message: 'Missing parameters. Requires employeeId and image base64 data' });
  }

  // Simulate TensorFlow/FaceNet verification calculation
  const matchScore = 0.9421; // Mock confidence score
  const isLivenessVerified = true;
  
  const isMatch = matchScore > 0.85;

  DB.faceVerificationLogs.push({
    id: `F-LOG-${Date.now()}`,
    employeeId,
    timestamp: new Date().toISOString(),
    isSuccess: isMatch && isLivenessVerified,
    confidenceScore: matchScore
  });

  res.json({
    verified: isMatch && isLivenessVerified,
    confidence: matchScore,
    model: 'FaceNet-v2.1',
    livenessScore: 0.985,
    timestamp: new Date().toISOString()
  });
});

// 8. GPS & Location Geofence Validation
app.post('/api/gps/track', authenticateJWT, (req, res) => {
  const { latitude, longitude, speed } = req.body;
  const employeeId = req.user.employeeId || 'EMP-GAGAN';

  const log = {
    id: `GPS-${Date.now()}`,
    employeeId,
    latitude,
    longitude,
    speedKmh: speed || 0,
    timestamp: new Date().toISOString()
  };

  DB.gpsLogs.push(log);

  // Check geofences (simple Haversine validation)
  const geofence = DB.geofences[0]; // HQ
  const R = 6371e3; // Earth radius in meters
  const phi1 = (latitude * Math.PI) / 180;
  const phi2 = (geofence.latitude * Math.PI) / 180;
  const deltaPhi = ((geofence.latitude - latitude) * Math.PI) / 180;
  const deltaLambda = ((geofence.longitude - longitude) * Math.PI) / 180;

  const a = Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
            Math.cos(phi1) * Math.cos(phi2) *
            Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // in meters

  const inside = distance <= geofence.radiusMeters;

  res.json({
    success: true,
    latitude,
    longitude,
    distanceFromHQMeters: parseFloat(distance.toFixed(1)),
    insideGeofence: inside,
    geofenceName: geofence.name
  });
});

// 9. Reporting & Analytics Service
app.get('/api/analytics/export', authenticateJWT, (req, res) => {
  // Emulate CSV Export
  const headers = ['Employee ID', 'Check-In', 'Check-Out', 'Hours Worked', 'Location', 'Status'];
  const rows = DB.attendanceLogs.map(log => {
    const hours = log.checkOut ? ((new Date(log.checkOut) - new Date(log.checkIn)) / (1000 * 60 * 60)).toFixed(2) : 'Active';
    return [log.employeeId, log.checkIn, log.checkOut || 'N/A', hours, log.locationName, log.status];
  });

  const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename=productivity_report.csv');
  res.status(200).send(csvContent);
});

// 10. Notification Service
app.get('/api/notifications', authenticateJWT, (req, res) => {
  const userNotifications = DB.notifications.filter(n => n.userId === req.user.id);
  res.json(userNotifications);
});

// Start Gateway Server
const PORT = 5002;
server.listen(PORT, () => {
  console.log(`\n=============================================================`);
  console.log(`🚀 WorkSphere Integrated Express Server running on Port ${PORT}`);
  console.log(`📖 Endpoint mappings and internal database arrays loaded.`);
  console.log(`=============================================================\n`);
});
