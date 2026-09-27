import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sequelize } from './config/db.js';
import './config/redis.js';
import './queues/clickWorker.js';

import linkRoutes from './routes/link.routes.js';
import redirectRoutes from './routes/redirect.routes.js';
import { rateLimiter } from './middlewares/rateLimiter.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(rateLimiter); // Protect server with simple rate limiter

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

// Routes
app.use('/api/links', linkRoutes);
app.use('/', redirectRoutes);

// Start server
const startServer = async () => {
  try {
    // 1. Connect and sync PostgreSQL database
    await sequelize.authenticate();
    console.log('✅ PostgreSQL connected successfully!');

    await sequelize.sync();
    console.log('✅ Database tables synchronized!');

    // 2. Start Express server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Server startup error:', error.message);
  }
};

startServer();
