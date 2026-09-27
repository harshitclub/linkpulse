import rateLimit from 'express-rate-limit';

// Simple rate limiter: limit each IP to 60 requests every 15 minutes
export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 60, // Maximum 60 requests per 15 minutes per IP
  message: {
    message: 'Too many requests from this IP, please try again after 15 minutes.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});
