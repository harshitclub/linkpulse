import { Queue } from 'bullmq';
import { redis } from '../config/redis.js';

// Queue named "clicks" for sending click tracking jobs in the background
export const clickQueue = new Queue('clicks', { connection: redis });
