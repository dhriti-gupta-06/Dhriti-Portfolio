import dns from 'node:dns';
import mongoose from 'mongoose';

// Some home routers (e.g. JioFiber) refuse the DNS SRV lookups that
// "mongodb+srv://" URIs need, giving "querySrv ECONNREFUSED". Setting
// DNS_SERVERS=8.8.8.8,1.1.1.1 makes Node use public resolvers instead.
if (process.env.DNS_SERVERS) {
  const servers = process.env.DNS_SERVERS.split(',').map((s) => s.trim()).filter(Boolean);
  dns.setServers(servers);
  dns.promises.setServers(servers);
}

// Fail fast instead of queueing writes while the database is unreachable.
mongoose.set('bufferCommands', false);
mongoose.set('strictQuery', true);

export function isDatabaseConnected() {
  return mongoose.connection.readyState === 1;
}

export async function connectDatabase(uri) {
  if (!uri) {
    throw new Error('MONGODB_URI is not set. Add it to server/.env (see .env.example).');
  }

  mongoose.connection.on('disconnected', () => console.warn('[db] MongoDB disconnected'));
  mongoose.connection.on('reconnected', () => console.info('[db] MongoDB reconnected'));
  mongoose.connection.on('error', (err) => console.error('[db] MongoDB error:', err.message));

  await mongoose.connect(uri, { serverSelectionTimeoutMS: 10_000 });
  console.info(`[db] Connected to MongoDB database "${mongoose.connection.name}"`);
}

export async function disconnectDatabase() {
  await mongoose.connection.close();
}
