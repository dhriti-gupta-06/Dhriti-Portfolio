import path from 'node:path';
import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { HttpError } from '../utils/HttpError.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Resume files live in server/resumes/. RESUME_DIR overrides this (used by tests).
export const RESUME_FORMATS = Object.freeze({
  pdf: {
    file: 'Dhriti_Gupta_Resume.pdf',
    mime: 'application/pdf',
  },
  docx: {
    file: 'Dhriti_Gupta_Resume.docx',
    mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  },
});

function resumeDir() {
  return process.env.RESUME_DIR || path.join(__dirname, '..', 'resumes');
}

export async function downloadResume(req, res) {
  const format = RESUME_FORMATS[req.params.format];
  if (!format) {
    throw new HttpError(404, 'Resume format not found. Use /api/resume/pdf or /api/resume/docx.');
  }

  const filePath = path.join(resumeDir(), format.file);
  try {
    await fs.access(filePath);
  } catch {
    throw new HttpError(404, 'This resume file is not available right now.');
  }

  res.setHeader('Content-Type', format.mime);
  res.setHeader('Cache-Control', 'no-cache');
  res.download(filePath, format.file, { headers: { 'Content-Type': format.mime } });
}
