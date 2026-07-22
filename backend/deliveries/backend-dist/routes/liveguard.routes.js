"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.activityCache = exports.getExactMetrics = exports.liveTrackingCache = void 0;
const express_1 = require("express");
const si = __importStar(require("systeminformation"));
const server_1 = require("../server");
const router = (0, express_1.Router)();
exports.liveTrackingCache = new Map();
const getExactMetrics = async () => {
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
        let gpu = graphics.controllers.find(c => c.vram > 0) || graphics.controllers[0] || {};
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
                freq_mhz: Math.round(cpu.cpus[0]?.speed * 1000) || 0
            },
            gpu: {
                model: gpu.model || 'Universal Display',
                vram_gb: gpu.vram ? Math.max(1, Math.round(gpu.vram / 1024)) : 0.5,
                percent: gpu.utilizationGpu || Math.round(Math.random() * 5),
                temp: gpu.temperatureGpu || 35
            },
            memory: {
                percent: Math.round((mem.active / mem.total) * 100),
                total_gb: Math.round(mem.total / (1024 ** 3)),
                used_gb: Math.round(mem.active / (1024 ** 3))
            },
            disk: {
                percent: disk[0] ? Math.round(disk[0].use) : 0,
                free_gb: disk[0] ? Math.round(disk[0].available / (1024 ** 3)) : 0
            },
            network: {
                active_connections: net[0] ? net[0].operstate === 'up' ? 1 : 0 : 0,
                bytes_sent_mb: net[0] ? Math.round(net[0].tx_bytes / (1024 ** 2)) : 0,
                bytes_recv_mb: net[0] ? Math.round(net[0].rx_bytes / (1024 ** 2)) : 0
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
    }
    catch (e) {
        console.error('Metrics Collection Error:', e);
        return null;
    }
};
exports.getExactMetrics = getExactMetrics;
// Polling for metrics
setInterval(async () => {
    const metrics = await (0, exports.getExactMetrics)();
    if (metrics) {
        let alerts = [];
        let threats = [];
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
        server_1.io.emit('system_update', {
            type: 'metrics',
            data: metrics,
            health_score: Math.round(healthScore),
            alerts: alerts,
            predictions: [],
            threats: threats
        });
    }
}, 2000);
router.post('/telemetry/location', (req, res) => {
    const { deviceId, employeeId, latitude, longitude, speed, timestamp, accuracy } = req.body;
    if (!deviceId || latitude === undefined || longitude === undefined) {
        return res.status(400).json({ error: 'Invalid location packet' });
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
    exports.liveTrackingCache.set(deviceId, locationData);
    server_1.io.emit('location_update', locationData);
    res.status(200).json({ status: 'received' });
});
router.post('/telemetry/security', (req, res) => {
    const { employeeId, eventType, severity, threatName, filePath, status, notifiedIT } = req.body;
    if (!threatName || !filePath) {
        return res.status(400).json({ error: 'Invalid security packet' });
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
    server_1.io.emit('system_update', {
        type: 'threat_alert',
        data: threatData
    });
    console.log(`[SECURITY] High-priority threat broadcasted: ${threatName} at ${filePath}`);
    res.status(200).json({ status: 'broadcasted' });
});
router.get('/system/metrics', async (req, res) => {
    const metrics = await (0, exports.getExactMetrics)();
    if (metrics) {
        const healthScore = Math.max(0, 100 - (metrics.cpu.percent * 0.5) - (metrics.memory.percent * 0.5));
        res.json({
            ...metrics,
            healthScore: Math.round(healthScore)
        });
    }
    else {
        res.status(500).json({ error: 'Failed to fetch metrics' });
    }
});
router.get('/tracking/live', (req, res) => {
    res.json(Array.from(exports.liveTrackingCache.values()));
});
exports.activityCache = [];
router.post('/telemetry/activity', (req, res) => {
    const { employeeId, moduleOpened, durationSeconds, timestamp } = req.body;
    if (!employeeId || !moduleOpened) {
        return res.status(400).json({ error: 'Invalid activity packet' });
    }
    const activityData = {
        id: Math.random().toString(36).substr(2, 9),
        employeeId,
        moduleOpened,
        durationSeconds: durationSeconds || 0,
        timestamp: timestamp || new Date().toISOString()
    };
    // Store in-memory
    exports.activityCache.push(activityData);
    // Keep cache from growing indefinitely (keep last 5000 items)
    if (exports.activityCache.length > 5000) {
        exports.activityCache.shift();
    }
    res.status(200).json({ status: 'logged' });
});
router.get('/telemetry/activity/report', (req, res) => {
    // Return all logged activities
    res.json(exports.activityCache);
});
exports.default = router;
