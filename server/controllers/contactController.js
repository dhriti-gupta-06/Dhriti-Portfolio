import { Contact } from '../models/Contact.js';
import { isDatabaseConnected } from '../config/db.js';
import { validateContact } from '../utils/validateContact.js';
import { HttpError } from '../utils/HttpError.js';

export async function createContact(req, res) {
  const { data, errors } = validateContact(req.body);
  if (!data) {
    throw new HttpError(400, 'Please fix the highlighted fields.', errors);
  }

  if (!isDatabaseConnected()) {
    throw new HttpError(503, 'The message service is temporarily unavailable. Please try again shortly.');
  }

  const saved = await Contact.create(data);

  // Log only metadata, never the visitor's message or address.
  console.info(`[contact] Stored message ${saved._id}`);

  res.status(201).json({
    success: true,
    message: 'Thanks for reaching out! Your message has been received.',
    data: { id: saved._id, createdAt: saved.createdAt },
  });
}
