/**
 * API tests. Each test file runs in its own process (node --test).
 *
 * Database tests run against a real MongoDB-compatible server when
 * TEST_MONGODB_URI is set, e.g.
 *   TEST_MONGODB_URI=mongodb://127.0.0.1:27017/portfolio_test npm test
 * Without it, they are reported as skipped (never as passed).
 */
import { test, describe, before, after } from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import os from 'node:os';
import fs from 'node:fs/promises';

process.env.NODE_ENV = 'test';
process.env.CLIENT_URL = 'http://localhost:5173,https://portfolio.example.com';
process.env.CONTACT_RATE_LIMIT_MAX = '100';

const { createApp } = await import('../app.js');
const { connectDatabase, disconnectDatabase } = await import('../config/db.js');
const { Contact } = await import('../models/Contact.js');
const request = (await import('supertest')).default;

const app = createApp();
const TEST_DB = process.env.TEST_MONGODB_URI;
const valid = { name: 'Ada Lovelace', email: 'ada@example.com', message: 'Hello Dhriti, I enjoyed your projects!' };

describe('health', () => {
  test('GET /api/health returns ok', async () => {
    const res = await request(app).get('/api/health');
    assert.equal(res.status, 200);
    assert.equal(res.body.status, 'ok');
    assert.ok(['connected', 'disconnected'].includes(res.body.database));
  });

  test('unknown route returns JSON 404', async () => {
    const res = await request(app).get('/api/nope');
    assert.equal(res.status, 404);
    assert.equal(res.body.success, false);
  });
});

describe('resume downloads', () => {
  test('GET /api/resume/pdf streams the PDF as an attachment', async () => {
    const res = await request(app).get('/api/resume/pdf').buffer(true);
    assert.equal(res.status, 200);
    assert.match(res.headers['content-type'], /^application\/pdf/);
    assert.match(res.headers['content-disposition'], /attachment; filename="?Dhriti_Gupta_Resume\.pdf"?/);
    assert.equal(Buffer.from(res.body).subarray(0, 4).toString(), '%PDF');
  });

  test('GET /api/resume/docx streams the Word file as an attachment', async () => {
    const res = await request(app)
      .get('/api/resume/docx')
      .buffer(true)
      .parse((r, cb) => {
        const chunks = [];
        r.on('data', (c) => chunks.push(c));
        r.on('end', () => cb(null, Buffer.concat(chunks)));
      });
    assert.equal(res.status, 200);
    assert.match(res.headers['content-type'], /wordprocessingml\.document/);
    assert.match(res.headers['content-disposition'], /attachment; filename="?Dhriti_Gupta_Resume\.docx"?/);
    assert.equal(res.body.subarray(0, 2).toString(), 'PK'); // .docx is a zip container
  });

  test('unsupported format returns 404', async () => {
    const res = await request(app).get('/api/resume/txt');
    assert.equal(res.status, 404);
  });

  test('missing resume file returns 404 JSON', async () => {
    const emptyDir = await fs.mkdtemp(path.join(os.tmpdir(), 'resume-'));
    process.env.RESUME_DIR = emptyDir;
    try {
      const res = await request(app).get('/api/resume/pdf');
      assert.equal(res.status, 404);
      assert.equal(res.body.success, false);
    } finally {
      delete process.env.RESUME_DIR;
    }
  });
});

describe('CORS', () => {
  test('allows a configured origin', async () => {
    const res = await request(app).get('/api/health').set('Origin', 'https://portfolio.example.com');
    assert.equal(res.headers['access-control-allow-origin'], 'https://portfolio.example.com');
  });

  test('preflight from allowed origin succeeds', async () => {
    const res = await request(app)
      .options('/api/contact')
      .set('Origin', 'http://localhost:5173')
      .set('Access-Control-Request-Method', 'POST');
    assert.equal(res.status, 204);
    assert.equal(res.headers['access-control-allow-origin'], 'http://localhost:5173');
  });

  test('rejects an unknown origin', async () => {
    const res = await request(app).get('/api/health').set('Origin', 'https://evil.example.net');
    assert.equal(res.status, 403);
    assert.equal(res.headers['access-control-allow-origin'], undefined);
  });
});

describe('contact validation (no database needed)', () => {
  test('rejects missing fields', async () => {
    const res = await request(app).post('/api/contact').send({});
    assert.equal(res.status, 400);
    assert.ok(res.body.errors.name && res.body.errors.email && res.body.errors.message);
  });

  test('rejects an invalid email', async () => {
    const res = await request(app).post('/api/contact').send({ ...valid, email: 'not-an-email' });
    assert.equal(res.status, 400);
    assert.ok(res.body.errors.email);
  });

  test('rejects an oversized message', async () => {
    const res = await request(app).post('/api/contact').send({ ...valid, message: 'x'.repeat(2001) });
    assert.equal(res.status, 400);
    assert.ok(res.body.errors.message);
  });

  test('rejects whitespace-only values', async () => {
    const res = await request(app).post('/api/contact').send({ ...valid, name: '    ' });
    assert.equal(res.status, 400);
    assert.ok(res.body.errors.name);
  });

  test('rejects operator-injection objects', async () => {
    const res = await request(app).post('/api/contact').send({ ...valid, email: { $gt: '' } });
    assert.equal(res.status, 400);
    assert.ok(res.body.errors.email);
  });

  test('rejects malformed JSON', async () => {
    const res = await request(app)
      .post('/api/contact')
      .set('Content-Type', 'application/json')
      .send('{"name": "Ada",');
    assert.equal(res.status, 400);
    assert.equal(res.body.message, 'Request body is not valid JSON.');
  });

  test('rejects bodies above 10kb', async () => {
    const res = await request(app).post('/api/contact').send({ ...valid, message: 'y'.repeat(20_000) });
    assert.equal(res.status, 413);
  });

  test('returns 503 (not a fake success) when the database is unavailable', async () => {
    const res = await request(app).post('/api/contact').send(valid);
    assert.equal(res.status, 503);
    assert.equal(res.body.success, false);
    assert.doesNotMatch(JSON.stringify(res.body), /stack|Mongo/i);
  });
});

describe('contact persistence (real database)', { skip: !TEST_DB && 'TEST_MONGODB_URI not set' }, () => {
  before(async () => {
    await connectDatabase(TEST_DB);
    await Contact.deleteMany({});
  });

  after(async () => {
    await Contact.deleteMany({});
    await disconnectDatabase();
  });

  test('stores a valid message and returns 201', async () => {
    const res = await request(app)
      .post('/api/contact')
      .send({ name: '  Ada   Lovelace ', email: 'ADA@Example.com ', message: valid.message });
    assert.equal(res.status, 201);
    assert.equal(res.body.success, true);
    assert.ok(res.body.data.id);

    const doc = await Contact.findById(res.body.data.id).lean();
    assert.equal(doc.name, 'Ada Lovelace');
    assert.equal(doc.email, 'ada@example.com');
    assert.equal(doc.message, valid.message);
    assert.ok(doc.createdAt instanceof Date);
    assert.equal(doc.status, 'new');
  });

  test('health reports the database as connected', async () => {
    const res = await request(app).get('/api/health');
    assert.equal(res.body.database, 'connected');
  });
});
