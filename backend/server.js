require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { createServer } = require('http');
const { Server } = require('socket.io');

const logger = require('./config/logger');
const db = require('./config/db');
const redisClient = require('./config/redis');
const { setupBullMQ } = require('./config/bullmq');
const errorHandler = require('./middleware/errorHandler');
const { apiLimiter } = require('./middleware/rateLimiter');
const smsSocket = require('./sockets/smsSocket');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const metaRoutes = require('./routes/meta');
const buyRoutes = require('./routes/buy');
const adminRoutes = require('./routes/admin');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: '*', methods: ['GET', 'POST'] }
});

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10kb' }));
app.use(morgan('combined', { stream: { write: msg => logger.info(msg.trim()) } }));
app.use('/api/', apiLimiter);

// Socket.IO setup
smsSocket(io);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/meta', metaRoutes);
app.use('/api/buy', buyRoutes);
app.use('/api/admin', adminRoutes);

// Health check
app.get('/api/health', (req, res) => res.status(200).send('OK'));

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

// Connect to MongoDB, Redis, and start server
mongoose.connect(process.env.MONGODB_URI)
  .then(() => logger.info('Connected to MongoDB'))
  .catch(err => logger.error('MongoDB connection error:', err));

redisClient.on('connect', () => logger.info('Connected to Redis'));

setupBullMQ();

httpServer.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
