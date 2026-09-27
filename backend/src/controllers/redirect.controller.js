import { redis } from '../config/redis.js';
import { Link } from '../models/index.js';
import { clickQueue } from '../queues/clickQueue.js';

// Redirect visitor to the original URL
export const handleRedirect = async (req, res) => {
  try {
    const { code } = req.params;

    // 1. Check Redis Cache in RAM (super fast!)
    let url = await redis.get(`url:${code}`);
    let linkId = await redis.get(`id:${code}`);

    // 2. If missing from Redis, look up in PostgreSQL database
    if (!url || !linkId) {
      const link = await Link.findOne({ where: { shortCode: code } });

      if (!link) {
        return res.status(404).send('Link not found');
      }

      url = link.originalUrl;
      linkId = link.id;

      // Save in Redis for future requests (1-hour expiration)
      await redis.set(`url:${code}`, url, 'EX', 3600);
      await redis.set(`id:${code}`, linkId, 'EX', 3600);
    }

    // 3. Push click event to background queue (non-blocking)
    clickQueue.add('save-click', {
      linkId: Number(linkId),
      ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1',
      userAgent: req.headers['user-agent'] || '',
      referrer: req.headers['referer'] || 'Direct',
    });

    // 4. Redirect visitor immediately
    return res.redirect(url);
  } catch (error) {
    return res.status(500).send('Server Error');
  }
};
