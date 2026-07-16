"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const hr_routes_1 = __importDefault(require("./routes/hr.routes"));
const analysis_routes_1 = __importDefault(require("./routes/analysis.routes"));
const location_routes_1 = __importDefault(require("./routes/location.routes"));
const contact_routes_1 = __importDefault(require("./routes/contact.routes"));
const helpdesk_routes_1 = __importDefault(require("./routes/helpdesk.routes"));
const ceo_routes_1 = __importDefault(require("./routes/ceo.routes"));
const liveguard_routes_1 = __importDefault(require("./routes/liveguard.routes"));
const db_1 = __importDefault(require("./config/db"));
const seed_1 = require("./scripts/seed");
// Connect to Database
const mongoose_1 = __importDefault(require("mongoose"));
(0, db_1.default)().then(() => {
    if (mongoose_1.default.connection.readyState === 1) {
        (0, seed_1.seedDatabase)().catch(err => console.error("Seed error:", err));
    }
    else {
        console.log("[SERVER] Skipping seed database because MongoDB is not connected.");
    }
}).catch(err => console.error("DB connection error:", err));
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
exports.io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});
app.set('io', exports.io);
const port = Number(process.env.PORT ?? 5000);
app.use((0, cors_1.default)({
    origin: [
        process.env.HR_URL || 'http://127.0.0.1:3005',
        'http://localhost:3005',
    ],
    credentials: true,
    optionsSuccessStatus: 200
}));
app.use((0, helmet_1.default)({
    crossOriginResourcePolicy: false,
}));
app.use(express_1.default.json());
app.use((0, morgan_1.default)('dev'));
app.get('/health', (_req, res) => {
    res.json({
        status: 'ok',
        service: 'WorkSphere API',
        timestamp: new Date().toISOString(),
    });
});
app.use('/api/auth', auth_routes_1.default);
app.use('/api/techlead/analysis', analysis_routes_1.default);
app.use('/api/location', location_routes_1.default);
app.use('/api/helpdesk', helpdesk_routes_1.default);
app.use('/api', hr_routes_1.default);
app.use('/api/contact', contact_routes_1.default);
app.use('/api/ceo', ceo_routes_1.default);
app.use('/api', liveguard_routes_1.default);
exports.io.on('connection', (socket) => {
    console.log('User connected:', socket.id);
    socket.on('join_room', (roomId) => {
        socket.join(roomId);
        console.log(`User ${socket.id} joined room ${roomId}`);
    });
    socket.on('send_message', (message) => {
        exports.io.to(message.groupId).emit('new_message', message);
    });
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});
// Error Handling Middleware
app.use((err, _req, res, _next) => {
    console.error('[SERVER ERROR]:', err);
    res.status(err.status || 500).json({
        error: true,
        message: err.message || 'Internal Server Error',
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
});
httpServer.listen(port, '0.0.0.0', () => {
    console.log(`WorkSphere API (Real-time) listening on http://0.0.0.0:${port}`);
});
