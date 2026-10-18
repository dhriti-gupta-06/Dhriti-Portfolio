import 'dotenv/config';

const nodeEnv = process.env.NODE_ENV || 'development';

/**
 * CLIENT_URL may hold one origin or a comma-separated list,
 * e.g. "https://dhriti.vercel.app,https://www.dhritigupta.dev".
 */
const clientOrigins = (process.env.CLIENT_URL || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim().replace(/\/$/, ''))
  .filter(Boolean);

export const env = {
  nodeEnv,
  isProduction: nodeEnv === 'production',
  isTest: nodeEnv === 'test',
  port: Number(process.env.PORT) || 5000,
  mongoUri: process.env.MONGODB_URI || '',
  clientOrigins,
  contactRateLimitMax: Number(process.env.CONTACT_RATE_LIMIT_MAX) || 5,
  contactRateLimitWindowMs: Number(process.env.CONTACT_RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
};
