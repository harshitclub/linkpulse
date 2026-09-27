import { Worker } from 'bullmq';
import { UAParser } from 'ua-parser-js';
import { redis } from '../config/redis.js';
import { Click } from '../models/index.js';

// Background worker that listens to the "clicks" queue and saves data into PostgreSQL
export const clickWorker = new Worker(
  'clicks',
  async (job) => {
    const { linkId, ip, userAgent, referrer } = job.data;

    // Parse Browser and Operating System
    const parser = new UAParser(userAgent);
    const browser = parser.getBrowser().name || 'Unknown';
    const os = parser.getOS().name || 'Unknown';

    // Save click record in database
    await Click.create({
      linkId,
      ipAddress: ip,
      browser,
      os,
      referrer: referrer || 'Direct',
    });

    console.log(`📊 Click saved in database for Link ID: ${linkId}`);
  },
  { connection: redis }
);
