import { test } from 'node:test';
import assert from 'node:assert/strict';

process.env.NODE_ENV = 'test';
process.env.CONTACT_RATE_LIMIT_MAX = '3';

const { createApp } = await import('../app.js');
const request = (await import('supertest')).default;

test('contact endpoint is rate limited per client', async () => {
  const app = createApp();
  const statuses = [];
  for (let i = 0; i < 5; i += 1) {
    const res = await request(app).post('/api/contact').send({});
    statuses.push(res.status);
  }
  assert.deepEqual(statuses.slice(0, 3), [400, 400, 400]);
  assert.equal(statuses[3], 429);
  assert.equal(statuses[4], 429);
});
