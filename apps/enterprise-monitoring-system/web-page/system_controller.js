const { spawn, exec } = require('child_process');
const path = require('path');
const chalk = require('chalk');

const services = [
  { name: 'WORKPULSE_HUB', dir: 'frontend', cmd: 'npm', args: ['run', 'dev'], port: 3005 },
];

function log(service, message, type = 'info') {
  const timestamp = new Date().toLocaleTimeString();
  const color = type === 'error' ? 'red' : type === 'success' ? 'green' : 'blue';
  console.log(`[${chalk.gray(timestamp)}] [${chalk[color](service)}] ${message}`);
}

async function isPortActive(port) {
  return new Promise((resolve) => {
    exec(`netstat -ano | findstr :${port}`, (err, stdout) => {
      resolve(stdout.length > 0);
    });
  });
}

function startService(service) {
  const fullDir = path.resolve(__dirname, service.dir);
  log(service.name, `Initializing on port ${service.port}...`, 'info');

  const child = spawn(service.cmd, service.args, {
    cwd: fullDir,
    shell: true,
    stdio: 'pipe',
    env: { ...process.env, PORT: service.port }
  });

  child.stdout.on('data', (data) => {
    const msg = data.toString().trim();
    if (msg.toLowerCase().includes('ready') || msg.toLowerCase().includes('started') || msg.toLowerCase().includes('running')) {
       log(service.name, chalk.green('Active and Operational'), 'success');
    }
  });

  child.on('error', (err) => {
    log(service.name, `System Error: ${err.message}`, 'error');
  });

  child.on('exit', (code) => {
    log(service.name, `Process terminated (Code ${code}). Attempting automatic recovery...`, 'error');
    setTimeout(() => startService(service), 3000);
  });

  return child;
}

async function bootSystem() {
  console.clear();
  console.log(chalk.bold.cyan('\n🚀 WORKSPHERE UNIFIED PLATFORM\n'));
  console.log(chalk.gray('Checking infrastructure health...\n'));

  for (const service of services) {
    startService(service);
  }

  console.log(chalk.bold.green('\n✅ WORKPULSE HUB DEPLOYED ON PORT 3005\n'));
}

bootSystem();
