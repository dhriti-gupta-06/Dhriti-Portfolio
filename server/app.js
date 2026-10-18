import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { env } from './config/env.js';
import apiRoutes from './routes/index.js';
import { apiLimiter } from './middleware/rateLimiters.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';

export function createApp() {
  const app = express();

  // Render, Railway and most PaaS hosts sit behind one proxy hop.
  app.set('trust proxy', 1);
  app.disable('x-powered-by');

  app.use(
    helmet({
      // Allows the Vercel-hosted frontend to trigger resume downloads.
      crossOriginResourcePolicy: { policy: 'cross-origin' },
    }),
  );

  app.use(
    cors({
      origin(origin, callback) {
        // Same-origin requests, curl and health checkers send no Origin header.
        if (!origin) return callback(null, true);
        if (env.clientOrigins.includes(origin.replace(/\/$/, ''))) return callback(null, true);
        return callback(new Error('CORS_NOT_ALLOWED'));
      },
      methods: ['GET', 'POST', 'OPTIONS'],
      allowedHeaders: ['Content-Type'],
      exposedHeaders: ['Content-Disposition'],
      maxAge: 86400,
    }),
  );

  app.use(express.json({ limit: '10kb' }));

  app.get('/', (req, res) => {
    res.json({ name: 'Dhriti Gupta portfolio API', health: '/api/health' });
  });

  app.use('/api', apiLimiter, apiRoutes);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}
