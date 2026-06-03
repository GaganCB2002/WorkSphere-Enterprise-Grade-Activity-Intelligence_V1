const http = require('http');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const SERVICES = [
  { name: 'WorkPulse Hub (Main)', port: 3005, path: '/', expectedStatus: 200 },
];

async function checkPort(port) {
  try {
    const stdout = execSync(`netstat -ano | findstr :${port}`).toString();
    return stdout.includes('LISTENING');
  } catch (e) {
    return false;
  }
}

async function checkHealth(service) {
  return new Promise((resolve) => {
    const options = {
      hostname: '127.0.0.1',
      port: service.port,
      path: service.path,
      method: 'GET',
      timeout: 2000
    };

    const req = http.request(options, (res) => {
      resolve({
        name: service.name,
        port: service.port,
        reachable: true,
        statusCode: res.statusCode,
        status: res.statusCode === service.expectedStatus ? 'PASS' : 'FAIL'
      });
    });

    req.on('error', () => {
      resolve({
        name: service.name,
        port: service.port,
        reachable: false,
        status: 'DOWN'
      });
    });

    req.end();
  });
}

async function runAudit() {
  console.log('--- NexusHR Enterprise Ecosystem Audit ---');
  console.log('Checking service availability and configuration...\n');

  const results = [];
  for (const service of SERVICES) {
    const isListening = await checkPort(service.port);
    if (!isListening) {
      results.push({ name: service.name, port: service.port, reachable: false, status: 'NOT RUNNING' });
      continue;
    }
    const health = await checkHealth(service);
    results.push(health);
  }

  // Check critical files
  const criticalFiles = [
    'startup_master.js',
    'backend/.env',
    'frontend/src/App.tsx',
    'master-dashboard/src/App.tsx'
  ];

  const fileStatus = criticalFiles.map(f => ({
    file: f,
    exists: fs.existsSync(path.resolve(__dirname, f)) ? 'OK' : 'MISSING'
  }));

  const report = {
    timestamp: new Date().toISOString(),
    services: results,
    files: fileStatus
  };

  fs.writeFileSync('audit_report.json', JSON.stringify(report, null, 2));
  console.log('Audit complete. Report saved to audit_report.json');
  
  // Output summary to console
  console.table(results);
}

runAudit();
