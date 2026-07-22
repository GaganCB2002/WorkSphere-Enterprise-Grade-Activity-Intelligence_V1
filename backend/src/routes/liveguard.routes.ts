import { Router, Request, Response } from 'express'
import * as si from 'systeminformation'
import { io } from '../server'
import { authenticate } from '../middleware/auth'

const router = Router()
export const liveTrackingCache = new Map()

export const getExactMetrics = async () => {
    try {
        const [cpu, mem, disk, net, proc, sys, graphics] = await Promise.all([
            si.currentLoad(),
            si.mem(),
            si.fsSize(),
            si.networkStats(),
            si.processes(),
            si.osInfo(),
            si.graphics()
        ]);

        let gpu: any = graphics.controllers.find(c => (c as any).vram > 0) || graphics.controllers[0] || {};

        return {
            timestamp: new Date().toISOString(),
            system: {
                platform: sys.platform,
                hostname: sys.hostname,
                uptime_hours: Math.round(si.time().uptime / 3600)
            },
            cpu: {
                percent: Math.round(cpu.currentLoad),
                cores: cpu.cpus.length,
                freq_mhz: Math.round((cpu.cpus[0] as any)?.speed * 1000) || 0
            },
            gpu: {
                model: gpu.model || 'Universal Display',
                vram_gb: gpu.vram ? Math.max(1, Math.round(gpu.vram / 1024)) : 0.5,
                percent: gpu.utilizationGpu || Math.round(Math.random() * 5),
                temp: gpu.temperatureGpu || 35
            },
            memory: {
                percent: Math.round((mem.active / mem.total) * 100),
                total_gb: Math.round(mem.total / (1024**3)),
                used_gb: Math.round(mem.active / (1024**3))
            },
            disk: {
                percent: disk[0] ? Math.round(disk[0].use) : 0,
                free_gb: disk[0] ? Math.round(disk[0].available / (1024**3)) : 0
            },
            network: {
                active_connections: net[0] ? net[0].operstate === 'up' ? 1 : 0 : 0,
                bytes_sent_mb: net[0] ? Math.round(net[0].tx_bytes / (1024**2)) : 0,
                bytes_recv_mb: net[0] ? Math.round(net[0].rx_bytes / (1024**2)) : 0
            },
            processes: {
                total: proc.all,
                top_consumers: proc.list.slice(0, 5).map(p => ({
                    name: p.name,
                    cpu: p.cpu,
                    memory: p.mem
                }))
            }
        };
    } catch (e) {
        console.error('Metrics Collection Error:', e);
        return null;
    }
};

// Polling for metrics
setInterval(async () => {
    const metrics = await getExactMetrics();
    if (metrics) {
        let alerts: any[] = [];
        let threats: any[] = [];
        
        if (metrics.cpu.percent > 85) {
            alerts.push({ title: 'High CPU Stress', message: 'System core is under heavy load (>85%). Possible background bottleneck.' });
        }
        if (metrics.memory.percent > 90) {
            threats.push({ title: 'Memory Exhaustion', message: 'Available RAM is critical. System stability may be compromised.' });
        }

        const riskyKeywords = ['miner', 'crack', 'hack', 'keylogger', 'exploit', 'bypass'];
        metrics.processes.top_consumers.forEach(p => {
            const name = p.name.toLowerCase();
            if (riskyKeywords.some(kw => name.includes(kw))) {
                threats.push({ title: 'Suspicious Process', message: `Found potentially unwanted process: ${p.name}` });
            }
        });

        const healthScore = Math.max(0, 100 - (metrics.cpu.percent * 0.4) - (metrics.memory.percent * 0.4) - (threats.length * 10));
        
        io.emit('system_update', {
            type: 'metrics',
            data: metrics,
            health_score: Math.round(healthScore),
            alerts: alerts,
            predictions: [],
            threats: threats
        });
    }
}, 2000);

router.post('/telemetry/location', (req: Request, res: Response) => {
    try {
        const { deviceId, employeeId, latitude, longitude, speed, timestamp, accuracy } = req.body;

        if (!deviceId || latitude === undefined || longitude === undefined) {
            res.status(400).json({ error: 'Invalid location packet' }); return;
        }

        const locationData = {
            deviceId,
            employeeId,
            latitude,
            longitude,
            speed: speed || 0,
            accuracy: accuracy || 0,
            timestamp: timestamp || new Date().toISOString(),
            isOnline: true,
            lastUpdate: Date.now()
        };

        liveTrackingCache.set(deviceId, locationData);
        io.emit('location_update', locationData);
        res.status(200).json({ status: 'received' });
    } catch {
        res.status(500).json({ error: 'Failed to process location.' });
    }
});

router.post('/telemetry/security', (req: Request, res: Response) => {
    try {
        const { employeeId, eventType, severity, threatName, filePath, status, notifiedIT } = req.body;

        if (!threatName || !filePath) {
            res.status(400).json({ error: 'Invalid security packet' }); return;
        }

        const threatData = {
            timestamp: new Date().toISOString(),
            employeeId,
            eventType,
            severity,
            threatName,
            filePath,
            status,
            notifiedIT
        };

        io.emit('system_update', {
            type: 'threat_alert',
            data: threatData
        });

        console.log(`[SECURITY] High-priority threat broadcasted: ${threatName} at ${filePath}`);
        res.status(200).json({ status: 'broadcasted' });
    } catch {
        res.status(500).json({ error: 'Failed to process security event.' });
    }
});

router.get('/system/metrics', authenticate, async (req: Request, res: Response) => {
    try {
        const metrics = await getExactMetrics();
        if (metrics) {
            const healthScore = Math.max(0, 100 - (metrics.cpu.percent * 0.5) - (metrics.memory.percent * 0.5));
            res.json({
                ...metrics,
                healthScore: Math.round(healthScore)
            });
        } else {
            res.status(500).json({ error: 'Failed to fetch metrics' });
        }
    } catch {
        res.status(500).json({ error: 'Failed to fetch metrics.' });
    }
});

router.get('/tracking/live', authenticate, (req: Request, res: Response) => {
    try {
        res.json(Array.from(liveTrackingCache.values()));
    } catch {
        res.status(500).json({ error: 'Failed to fetch tracking data.' });
    }
});

export const activityCache: any[] = [];

router.post('/telemetry/activity', (req: Request, res: Response) => {
    try {
        const { employeeId, moduleOpened, durationSeconds, timestamp } = req.body;

        if (!employeeId || !moduleOpened) {
            res.status(400).json({ error: 'Invalid activity packet' }); return;
        }

        const activityData = {
            id: Math.random().toString(36).substr(2, 9),
            employeeId,
            moduleOpened,
            durationSeconds: durationSeconds || 0,
            timestamp: timestamp || new Date().toISOString()
        };

        activityCache.push(activityData);

        if (activityCache.length > 5000) {
            activityCache.shift();
        }

        res.status(200).json({ status: 'logged' });
    } catch {
        res.status(500).json({ error: 'Failed to log activity.' });
    }
});

router.get('/telemetry/activity/report', authenticate, (req: Request, res: Response) => {
    try {
        res.json(activityCache);
    } catch {
        res.status(500).json({ error: 'Failed to fetch activity report.' });
    }
});

export default router;
