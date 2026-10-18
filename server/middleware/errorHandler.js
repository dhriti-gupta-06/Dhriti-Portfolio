import mongoose from 'mongoose';

export function notFound(req, res) {
  res.status(404).json({ success: false, message: `Route not found: ${req.method} ${req.path}` });
}

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  // Malformed JSON body from express.json()
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ success: false, message: 'Request body is not valid JSON.' });
  }
  if (err.type === 'entity.too.large') {
    return res.status(413).json({ success: false, message: 'Request body is too large.' });
  }
  if (err.message === 'CORS_NOT_ALLOWED') {
    return res.status(403).json({ success: false, message: 'Origin not allowed.' });
  }
  if (err instanceof mongoose.Error.ValidationError) {
    const errors = Object.fromEntries(
      Object.entries(err.errors).map(([field, e]) => [field, e.message]),
    );
    return res.status(400).json({ success: false, message: 'Please fix the highlighted fields.', errors });
  }
  if (
    err.name === 'MongooseServerSelectionError' ||
    err.name === 'MongoNetworkError' ||
    /buffering timed out|before initial connection/i.test(err.message || '')
  ) {
    return res.status(503).json({
      success: false,
      message: 'The message service is temporarily unavailable. Please try again shortly.',
    });
  }

  if (err.expose && err.status) {
    return res.status(err.status).json({
      success: false,
      message: err.message,
      ...(err.details ? { errors: err.details } : {}),
    });
  }

  // Unexpected: log server-side, never leak internals to the client.
  console.error('[error]', err.name, err.message);
  return res.status(500).json({ success: false, message: 'Something went wrong on our side.' });
}
