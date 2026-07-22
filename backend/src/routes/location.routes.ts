import { Router, Request, Response } from 'express';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

// Stores latest locations in memory for simplicity (since user requested "exact" and "each and every moment", we might want a persistent store, but for integration, memory/websocket is best for live tracking)
// We'll also log them to console or a simple file for now.
const liveLocations: Record<string, any> = {};

router.post('/update', authenticate, (req, res) => {
    try {
        const { userId, employeeId, name, latitude, longitude, deviceType } = req.body;
        
        const locationData = {
            userId,
            employeeId,
            name,
            latitude,
            longitude,
            deviceType,
            timestamp: new Date().toISOString()
        };

        liveLocations[userId] = locationData;

        const io = req.app.get('io');
        if (io) io.emit('location_update', locationData);

        res.status(200).json({ status: 'ok' });
    } catch {
        res.status(500).json({ error: 'Failed to update location' }); return;
    }
});

router.get('/live', authenticate, authorize('SUPERADMIN', 'SUPER_ADMIN'), (_req: Request, res: Response) => {
    try {
        res.json(Object.values(liveLocations));
    } catch {
        res.status(500).json({ error: 'Failed to fetch locations.' });
    }
});

export default router;
