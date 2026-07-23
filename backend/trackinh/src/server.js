const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = (() => { const s = process.env.JWT_SECRET; if (!s) throw new Error('JWT_SECRET environment variable is required'); return s; })();

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', service: 'trackinh', timestamp: new Date().toISOString() });
});

// Mock auth endpoint
app.post('/auth/login', (req, res) => {
    const { username, password } = req.body;
    
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password required' });
    }

    // Mock token generation
    const token = jwt.sign({ username, id: 'user-123' }, JWT_SECRET, { expiresIn: '24h' });
    res.json({ token, user: { username, id: 'user-123' } });
});

// JWT verification middleware
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

// Protected route
app.get('/api/user/profile', verifyToken, (req, res) => {
    res.json({ user: req.user, profile: { role: 'admin', dept: 'IT' } });
});

// Mock data endpoints
app.get('/api/employees', (req, res) => {
    res.json({
        employees: [
            { id: 1, name: 'John Doe', role: 'Software Engineer', dept: 'Engineering' },
            { id: 2, name: 'Jane Smith', role: 'HR Manager', dept: 'HR' }
        ]
    });
});

app.post('/api/telemetry', (req, res) => {
    const { deviceId, timestamp, metrics } = req.body;
    
    if (!deviceId || !metrics) {
        return res.status(400).json({ error: 'deviceId and metrics required' });
    }

    res.json({ 
        status: 'received', 
        deviceId, 
        timestamp: new Date().toISOString(),
        metricsCount: Object.keys(metrics).length 
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err.message);
    res.status(500).json({ error: 'Internal server error', message: err.message });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint not found', path: req.path });
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
    console.log(`Trackinh service running on port ${PORT}`);
    console.log(`Health check available at http://localhost:${PORT}/health`);
});