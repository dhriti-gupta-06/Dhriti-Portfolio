/**
 * All network access for the client lives here.
 * VITE_API_BASE_URL is the deployed Express origin (e.g. https://dhriti-api.onrender.com).
 * Leave it empty in development: Vite proxies /api to localhost:5000.
 */
const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');

export const apiUrl = (path) => `${API_BASE_URL}${path}`;

export const resumeDownloadUrl = (format) => apiUrl(`/api/resume/${format}`);

export class ApiError extends Error {
  constructor(message, status, fieldErrors = {}) {
    super(message);
    this.status = status;
    this.fieldErrors = fieldErrors;
  }
}

async function request(path, { timeoutMs = 20000, ...options } = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  let response;
  try {
    response = await fetch(apiUrl(path), {
      ...options,
      signal: controller.signal,
      headers: { 'Content-Type': 'application/json', ...options.headers },
    });
  } catch (err) {
    const message =
      err.name === 'AbortError'
        ? 'The server took too long to respond. It may be waking up — please try again in a moment.'
        : 'Could not reach the server. Check your connection and try again.';
    throw new ApiError(message, 0);
  } finally {
    clearTimeout(timer);
  }

  let body = null;
  try {
    body = await response.json();
  } catch {
    /* non-JSON response */
  }

  if (!response.ok) {
    throw new ApiError(
      body?.message || `Request failed (${response.status}).`,
      response.status,
      body?.errors || {},
    );
  }
  return body;
}

export function submitContact(payload) {
  // Render's free tier can cold-start slowly, so allow extra time.
  return request('/api/contact', { method: 'POST', body: JSON.stringify(payload), timeoutMs: 60000 });
}

export function getHealth() {
  return request('/api/health', { timeoutMs: 60000 });
}
