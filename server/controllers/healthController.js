import { isDatabaseConnected } from '../config/db.js';

export function getHealth(req, res) {
  const database = isDatabaseConnected() ? 'connected' : 'disconnected';
  res.status(200).json({
    status: 'ok',
    database,
    uptimeSeconds: Math.round(process.uptime()),
    timestamp: new Date().toISOString(),
  });
}
