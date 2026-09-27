import Redis from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();

// Connect to Redis running in Docker on port 6379
export const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: 6379,
  maxRetriesPerRequest: null, // Required by BullMQ for background queues
});

redis.on('connect', () => {
  console.log('✅ Redis connected!');
});

redis.on('error', (err) => {
  console.log('❌ Redis error:', err.message);
});
