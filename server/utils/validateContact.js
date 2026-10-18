import validator from 'validator';
import { CONTACT_LIMITS } from '../models/Contact.js';

// Strip ASCII control characters except tab and newline.
const CONTROL_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;

function clean(value) {
  return value.replace(CONTROL_CHARS, '').replace(/\r\n?/g, '\n').trim();
}

/**
 * Validates and normalises a contact submission.
 * Only plain strings are accepted, which also blocks operator-injection
 * payloads such as { "email": { "$gt": "" } }.
 *
 * @returns {{ data: {name:string,email:string,message:string} | null, errors: Record<string,string> }}
 */
export function validateContact(body) {
  const errors = {};

  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return { data: null, errors: { body: 'Request body must be a JSON object.' } };
  }

  const raw = {
    name: body.name,
    email: body.email,
    message: body.message,
  };

  for (const [field, value] of Object.entries(raw)) {
    if (value === undefined || value === null || value === '') {
      errors[field] = `${field[0].toUpperCase()}${field.slice(1)} is required.`;
    } else if (typeof value !== 'string') {
      errors[field] = `${field[0].toUpperCase()}${field.slice(1)} must be text.`;
    }
  }
  if (Object.keys(errors).length) return { data: null, errors };

  const data = {
    name: clean(raw.name).replace(/\s+/g, ' '),
    email: clean(raw.email).toLowerCase(),
    message: clean(raw.message),
  };

  const { name, email, message } = CONTACT_LIMITS;

  if (!data.name) errors.name = 'Name is required.';
  else if (data.name.length < name.min) errors.name = `Name must be at least ${name.min} characters.`;
  else if (data.name.length > name.max) errors.name = `Name must be at most ${name.max} characters.`;

  if (!data.email) errors.email = 'Email is required.';
  else if (data.email.length > email.max || !validator.isEmail(data.email)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!data.message) errors.message = 'Message is required.';
  else if (data.message.length < message.min) {
    errors.message = `Message must be at least ${message.min} characters.`;
  } else if (data.message.length > message.max) {
    errors.message = `Message must be at most ${message.max} characters.`;
  }

  return Object.keys(errors).length ? { data: null, errors } : { data, errors: {} };
}
