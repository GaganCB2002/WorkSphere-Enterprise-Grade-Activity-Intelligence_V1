import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import { createServer } from 'http'
import { Server } from 'socket.io'
import authRoutes from './routes/auth.routes'
import hrRoutes from './routes/hr.routes'
import analysisRoutes from './routes/analysis.routes'
import locationRoutes from './routes/location.routes'
import contactRoutes from './routes/contact.routes'
import helpdeskRoutes from './routes/helpdesk.routes'
import ceoRoutes from './routes/ceo.routes'
import liveguardRoutes from './routes/liveguard.routes'
import connectDB from './config/db'
import { seedDatabase } from './scripts/seed'
import financeRoutes from './routes/finance.routes'
import techleadRoutes from './routes/techlead.routes'
import softwareEngineerRoutes from './routes/softwareEngineer.routes'
import { setIO } from './services/socket.service'

// Connect to Database
import mongoose from 'mongoose';
connectDB().then(() => {
  if (mongoose.connection.readyState === 1) {
    seedDatabase().catch(err => console.error("Seed error:", err));
  } else {
    console.log("[SERVER] Skipping seed database because MongoDB is not connected.");
  }
}).catch(err => console.error("DB connection error:", err));

const app = express()
const httpServer = createServer(app)
export const io = new Server(httpServer, {
  cors: {
    origin: process.env.CORS_ORIGIN?.split(',') || [
      'http://localhost:3005',
      'http://127.0.0.1:3005',
      'https://worksphere-enterprise-grade-activity.onrender.com',
      'https://work-sphere-enterprise-grade-activi.vercel.app'
    ],
    methods: ['GET', 'POST'],
    credentials: true,
  },
})
app.set('io', io)
setIO(io)

const port = Number(process.env.PORT ?? 5000)

app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(',') || [
      'http://localhost:3005',
      'http://127.0.0.1:3005',
      'http://localhost:5173',
      'https://worksphere-enterprise-grade-activity.onrender.com',
    ],
    credentials: true,
    optionsSuccessStatus: 200
  }),
)
app.use(helmet({
  crossOriginResourcePolicy: false,
}))
app.use(express.json())
app.use(morgan('dev'))

app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'WorkSphere API',
    timestamp: new Date().toISOString(),
  })
})

app.use('/api/auth', authRoutes)
app.use('/api/techlead/analysis', analysisRoutes)
app.use('/api/location', locationRoutes)
app.use('/api/helpdesk', helpdeskRoutes)
app.use('/api/contact', contactRoutes)
app.use('/api/ceo', ceoRoutes)
app.use('/api/finance', financeRoutes)
app.use('/api', liveguardRoutes)
app.use('/api', hrRoutes)
app.use('/api/tech-lead', techleadRoutes)
app.use('/api/software-engineer', softwareEngineerRoutes)

io.on('connection', (socket) => {
  console.log('User connected:', socket.id)
  
  socket.on('join_room', (roomId) => {
    socket.join(roomId)
    console.log(`User ${socket.id} joined room ${roomId}`)
  })

  socket.on('send_message', (message) => {
    io.to(message.groupId).emit('new_message', message)
  })
  
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id)
  })
})

// Error Handling Middleware
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('[SERVER ERROR]:', err);
  res.status(err.status || 500).json({
    error: true,
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

httpServer.listen(port, '0.0.0.0', () => {
  console.log(`WorkSphere API (Real-time) listening on http://0.0.0.0:${port}`)
})
