import { describe, expect, test } from 'vitest';
import { validateContactForm } from './validateContact.js';
import { projects } from '../data/projects.js';

describe('validateContactForm', () => {
  const ok = { name: 'Ada', email: 'ada@example.com', message: 'Hello there, great work!' };

  test('accepts a valid submission', () => {
    expect(validateContactForm(ok)).toEqual({});
  });

  test('requires every field', () => {
    expect(Object.keys(validateContactForm({}))).toEqual(['name', 'email', 'message']);
  });

  test('rejects malformed emails', () => {
    expect(validateContactForm({ ...ok, email: 'ada@' }).email).toBeTruthy();
    expect(validateContactForm({ ...ok, email: 'ada example.com' }).email).toBeTruthy();
  });

  test('enforces message length', () => {
    expect(validateContactForm({ ...ok, message: 'short' }).message).toBeTruthy();
    expect(validateContactForm({ ...ok, message: 'x'.repeat(2001) }).message).toBeTruthy();
  });
});

describe('project data integrity', () => {
  test('at least three featured projects, each with a repository link', () => {
    const featured = projects.filter((p) => p.featured);
    expect(featured.length).toBeGreaterThanOrEqual(3);
    featured.forEach((p) => expect(p.repo).toMatch(/^https:\/\/github\.com\//));
  });

  test('slugs are unique and links are https', () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    projects.forEach((p) => {
      if (p.repo) expect(p.repo).toMatch(/^https:\/\//);
      if (p.live) expect(p.live).toMatch(/^https:\/\//);
    });
  });
});
