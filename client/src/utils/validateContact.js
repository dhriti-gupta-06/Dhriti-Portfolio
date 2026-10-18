// Mirrors server/utils/validateContact.js so visitors get instant feedback.
export const CONTACT_LIMITS = {
  name: { min: 2, max: 80 },
  email: { max: 254 },
  message: { min: 10, max: 2000 },
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContactForm({ name = '', email = '', message = '' }) {
  const errors = {};
  const n = name.trim().replace(/\s+/g, ' ');
  const e = email.trim();
  const m = message.trim();

  if (!n) errors.name = 'Please enter your name.';
  else if (n.length < CONTACT_LIMITS.name.min) errors.name = 'Name must be at least 2 characters.';
  else if (n.length > CONTACT_LIMITS.name.max) errors.name = 'Name must be at most 80 characters.';

  if (!e) errors.email = 'Please enter your email.';
  else if (e.length > CONTACT_LIMITS.email.max || !EMAIL_RE.test(e)) errors.email = 'Please enter a valid email address.';

  if (!m) errors.message = 'Please write a message.';
  else if (m.length < CONTACT_LIMITS.message.min) errors.message = 'Message must be at least 10 characters.';
  else if (m.length > CONTACT_LIMITS.message.max) errors.message = 'Message must be at most 2000 characters.';

  return errors;
}
