import { rateLimit } from 'express-rate-limit';
import { env } from '../config/env.js';

const rateLimitResponse = (message) => (req, res) => {
  res.status(429).json({ success: false, message });
};

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 300,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  handler: rateLimitResponse('Too many requests. Please slow down and try again later.'),
});

export const contactLimiter = rateLimit({
  windowMs: env.contactRateLimitWindowMs,
  limit: env.contactRateLimitMax,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  handler: rateLimitResponse('Too many messages from this network. Please try again in a few minutes.'),
});
