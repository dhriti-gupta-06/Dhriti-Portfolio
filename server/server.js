import { createApp } from './app.js';
import { env } from './config/env.js';
import { connectDatabase, disconnectDatabase } from './config/db.js';

const app = createApp();

const server = app.listen(env.port, () => {
  console.info(`[server] API listening on port ${env.port} (${env.nodeEnv})`);
  console.info(`[server] Allowed client origins: ${env.clientOrigins.join(', ')}`);
});

// Start serving immediately so health checks and resume downloads work even if
// MongoDB is slow; the contact route answers 503 until the database is ready.
connectDatabase(env.mongoUri).catch((err) => {
  console.error('[db] Initial connection failed:', err.message);
  if (env.isProduction) process.exitCode = 1;
});

async function shutdown(signal) {
  console.info(`[server] ${signal} received, shutting down`);
  server.close(async () => {
    await disconnectDatabase().catch(() => {});
    process.exit(0);
  });
  setTimeout(() => process.exit(1), 10_000).unref();
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
